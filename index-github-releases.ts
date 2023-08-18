import PersistentCache from "./lib/releases/PersistentCache.js";
import { Octokit } from "@octokit/rest";
import { components } from "@octokit/openapi-types";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import extractModMetadata from "./lib/releases/extractModMetadata.js";
import getMinecraftVersions from "./lib/releases/getMinecraftVersions.js";
import {
  GithubReleaseCache,
  ModLoader,
  ReleaseAssetType,
} from "./lib/releases/types.js";
import {
  CachedGithubAsset,
  CachedGithubRelease,
} from "./lib/releases/GithubRelease.js";

type GithubRelease = components["schemas"]["release"];
type GithubReleaseAsset = components["schemas"]["release-asset"];

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
  Awaited<ReturnType<typeof octokit["rest"]["repos"]["listReleases"]>>["data"]
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
  assets: GithubReleaseAsset[]
): Partial<Record<ReleaseAssetType, GithubReleaseAsset>> {
  const result: Partial<Record<ReleaseAssetType, GithubReleaseAsset>> = {};

  const assetsByName = Object.fromEntries(
    assets.map((asset) => [asset.name, asset])
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
    Object.keys(assetsByName).filter((name) => name.endsWith(".jar"))
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
  release: GithubRelease,
  allMinecraftVersions: string[]
) {
  const { tag_name: tagName } = release;
  // Ignore drafts
  if (release.draft) {
    return;
  }

  let cachedData = cache.get(tagName);
  if (!cachedData) {
    cachedData = {
      tagName,
      url: release.html_url,
      assets: {},
    };
  }

  const assetsByType = classifyReleaseAssets(release.assets);

  // Update basic release properties we can gather from the top-level listing
  cachedData.tagName = tagName;
  cachedData.url = release.html_url;
  cachedData.assets = Object.fromEntries(
    Object.entries(assetsByType).map(([type, asset]) => [
      type,
      {
        filename: asset.name,
        size: asset.size,
        browser_download_url: asset.browser_download_url,
        url: asset.url,
      } as CachedGithubAsset,
    ])
  );
  cachedData.published = release.published_at ?? undefined;
  cachedData.changelog = release.body?.replaceAll("\r\n", "\n") ?? undefined;
  cache.set(tagName, cachedData);

  // Update Mod metadata if it's missing
  if (
    !cachedData.version ||
    !cachedData.minecraftVersions ||
    !cachedData.modLoaders
  ) {
    // Try deducing a version from the tag first, which will then be overwritten by the mod-data if successful
    for (const [pattern, loaders] of tagPatterns) {
      const m = tagName.match(pattern);
      if (m) {
        cachedData.version = m[1];
        cachedData.modLoaders = loaders.slice();
        break;
      }
    }

    const modJarAsset = assetsByType[ReleaseAssetType.MOD];
    if (!modJarAsset) {
      console.warn(
        "Couldn't find a mod jar in the release assets of %s",
        tagName
      );
      return;
    }

    const { data } = await octokit.request(modJarAsset.url, {
      headers: {
        accept: "application/octet-stream",
      },
    });
    const modMetadata = extractModMetadata(data, allMinecraftVersions);
    cachedData.version = modMetadata.modVersion;
    // Remove anything that is not in the version list. Sometimes this includes "Java" or "Forge"
    cachedData.minecraftVersions = modMetadata.minecraftVersions;
    cachedData.modLoaders = modMetadata.modLoaders;
    cache.set(tagName, cachedData);
  }
}

const allMinecraftVersions = await getMinecraftVersions();
console.info(
  "Found %d Minecraft versions overall",
  allMinecraftVersions.length
);

const releases = await listReleases();
console.info("Read %d releases", releases.length);

const cache = new PersistentCache<CachedGithubRelease>(
  "caches/github_releases.json"
);
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
