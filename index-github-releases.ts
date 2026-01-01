import PersistentCache from "./lib/releases/PersistentCache.js";
import { Octokit } from "@octokit/rest";
import { components } from "@octokit/openapi-types";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import extractModMetadata from "./lib/releases/extractModMetadata.js";
import getMinecraftVersions from "./lib/releases/getMinecraftVersions.js";
import {
  GithubRelease,
  GithubReleaseCache,
  ModLoader,
  ModReleaseAsset,
  ReleaseAssetType,
  ReleaseType,
} from "./lib/releases/types.js";

type ApiGithubRelease = components["schemas"]["release"];
type ApiGithubReleaseAsset = components["schemas"]["release-asset"];

const githubToken = process.env.GITHUB_TOKEN;
if (typeof githubToken !== "string") {
  throw new Error("Set GITHUB_TOKEN environment variable.");
}

const PaginatingOctokit = Octokit.plugin(paginateRest);
const octokit = new PaginatingOctokit({
  auth: githubToken,
  userAgent: "AE2-Release-Indexer",
});

const owner = "AppliedEnergistics";
const repo = "Applied-Energistics-2";

const tagPatterns: [RegExp, ModLoader[]][] = [
  [/^fabric\/v([0-9].*)$/, [ModLoader.FABRIC]],
  [/^forge\/v([0-9].*)$/, [ModLoader.FORGE]],
  [/^v([0-9].*)$/, [ModLoader.FORGE]],
  [/^(rv.*)/, [ModLoader.FORGE]],
];

async function listReleases(): Promise<
  Awaited<ReturnType<(typeof octokit)["rest"]["repos"]["listReleases"]>>["data"]
> {
  const options = octokit.rest.repos.listReleases.endpoint.merge({
    owner,
    repo,
    per_page: 100,
  });
  return await octokit.paginate(options);
}

/**
 * Given a list of strings, find the longest common prefix for all of them.
 */
function longestCommonPrefix(strings: string[]): string {
  if (!strings.length) {
    return "";
  }

  // Sort the array (puts shortest first, longest last)
  strings.sort();

  const first = strings[0];
  const last = strings[strings.length - 1];
  let i = 0;

  // Compare characters of the first and last strings
  while (i < first.length && first[i] === last[i]) {
    i++;
  }

  // Return the common prefix
  return first.slice(0, i);
}

const jarSuffixToAssetType: [string, ReleaseAssetType][] = [
  ["-javadoc.jar", ReleaseAssetType.API],
  ["-api.jar", ReleaseAssetType.API],
  ["-dev.jar", ReleaseAssetType.UNOBF],
  [".jar", ReleaseAssetType.MOD],
];

/**
 * Try to find the mod jar among the release assets and download it.
 */
function classifyReleaseAssets(
  assets: ApiGithubReleaseAsset[],
): Partial<Record<ReleaseAssetType, ApiGithubReleaseAsset>> {
  const result: Partial<Record<ReleaseAssetType, ApiGithubReleaseAsset>> = {};

  const assetsByName = Object.fromEntries(
    assets.map((asset) => [asset.name, asset]),
  );

  // Special case for guide assets
  if (assetsByName["guide-assets.zip"]) {
    result[ReleaseAssetType.GUIDE_ASSETS] = assetsByName["guide-assets.zip"];
    delete assetsByName["guide-assets.zip"];
  }

  // For releases that have assets like these:
  // appliedenergistics2-rv2-beta-1-api.jar
  // appliedenergistics2-rv2-beta-1-dev.jar
  // appliedenergistics2-rv2-beta-1.jar
  // The longest common prefix is usually the basename of the actual mod jar
  const jarBaseName = longestCommonPrefix(
    Object.keys(assetsByName).filter((name) => name.endsWith(".jar")),
  );

  for (const [classifier, assetType] of jarSuffixToAssetType) {
    if (assets.length === 1 && assets[0].name.endsWith(classifier)) {
      result[assetType] = assets[0];
      delete assetsByName[assets[0].name];
      break;
    }

    const asset = assetsByName[jarBaseName + classifier];
    if (asset) {
      result[assetType] = asset;
      delete assetsByName[jarBaseName + classifier];
    }
  }

  const unclassifiedAssets = Object.keys(assetsByName);
  if (unclassifiedAssets.length > 0) {
    console.warn("Release has unclassified assets: %o", unclassifiedAssets);
  }

  return result;
}

async function processRelease(
  cache: GithubReleaseCache,
  release: ApiGithubRelease,
  allMinecraftVersions: string[],
) {
  const { tag_name: tagName } = release;
  // Ignore drafts
  if (release.draft) {
    return;
  }

  let oldCachedData = cache.get(tagName);
  const assetsByType = classifyReleaseAssets(release.assets);

  // Update basic release properties we can gather from the top-level listing
  const assets: GithubRelease["assets"] = Object.fromEntries(
    Object.entries(assetsByType).map(([type, asset]) => [
      type,
      {
        filename: asset.name,
        size: asset.size,
        browser_download_url: asset.browser_download_url,
        url: asset.url,
      } satisfies ModReleaseAsset,
    ]),
  );

  // Try deducing a version from the tag first, which will then be overwritten by the mod-data if successful
  let modVersion: string | undefined;
  let modLoaders: ModLoader[] | undefined;
  for (const [pattern, loaders] of tagPatterns) {
    const m = tagName.match(pattern);
    if (m) {
      modVersion = m[1];
      // rv.beta.1 is actually versioned rv-beta-1 in the mod metadata
      if (tagName.match(/^(rv.*)/)) {
        modVersion = modVersion.replaceAll(".", "-");
      }
      modLoaders = loaders.slice();
      break;
    }
  }

  if (!modVersion || !modLoaders) {
    console.warn("Failed to determine mod version from tag name: %s", tagName);
    return;
  }

  let releaseType = ReleaseType.STABLE;

  const releaseInfo: GithubRelease = {
    ...oldCachedData,
    source: "github",
    modVersion,
    modLoaders,
    releaseType,
    gameVersions: [],
    url: release.html_url,
    tagName,
    published: new Date(release.published_at ?? release.created_at).getTime(),
    changelog: release.body?.replaceAll("\r\n", "\n") ?? undefined,
    assets,
  };
  cache.set(tagName, releaseInfo);

  // Try updating mod metadata if it's missing
  if (!releaseInfo.gameVersions || !releaseInfo.modLoaders) {
    const modJarAsset = assetsByType[ReleaseAssetType.MOD];
    if (!modJarAsset) {
      console.warn(
        "Couldn't find a mod jar in the release assets of %s",
        tagName,
      );
      return;
    }

    const { data } = await octokit.request(modJarAsset.url, {
      headers: {
        accept: "application/octet-stream",
      },
    });
    const modMetadata = extractModMetadata(data, allMinecraftVersions);
    // Remove anything that is not in the version list. Sometimes this includes "Java" or "Forge"
    releaseInfo.gameVersions = modMetadata.minecraftVersions;
    releaseInfo.modLoaders = modMetadata.modLoaders;
    cache.set(tagName, releaseInfo);
  }
}

const allMinecraftVersions = await getMinecraftVersions();
console.info(
  "Found %d Minecraft versions overall",
  allMinecraftVersions.length,
);

const releases = await listReleases();
console.info("Read %d releases", releases.length);

const cache = new PersistentCache<GithubRelease>("caches/github_releases.json");
try {
  for (const release of releases) {
    try {
      await processRelease(cache, release, allMinecraftVersions);
    } catch (e) {
      console.error("Failed to process release %s", release.tag_name, e);
    }
    cache.save();
  }
} finally {
  cache.save();
}
