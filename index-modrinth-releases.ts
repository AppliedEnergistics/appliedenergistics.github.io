import { writeFileSync } from "node:fs";
import { ModReleaseInfo, ModrinthRelease, ReleaseAssetType, ReleaseType } from "./lib/releases/types.js";

function getReleaseType(record: any): ReleaseType {
  switch (record.version_type) {
    case "beta":
      return ReleaseType.BETA;
    case "alpha":
      return ReleaseType.ALPHA;
    default:
      return ReleaseType.STABLE;
  }
}

function getModAssets(record: any): ModrinthRelease["assets"] {
  let primaryFile = record.files.find((f: any) => f.primary);
  if (!primaryFile) {
    if (record.files.length === 1) {
      primaryFile = record.files[0];
    } else {
      return {};
    }
  }

  if (record.files.length > 1) {
    console.warn("Modrinth Release has more than one file: %o", record);
  }

  return {
    [ReleaseAssetType.MOD]: {
      filename: primaryFile.filename,
      size: primaryFile.size,
      url: primaryFile.url
    }
  };
}

function getModVersion(record: any) {
  const version = record.version_number;
  // Some older releases had "fabric-" or "forge-" prefixes
  return version.replace(/^(fabric|forge)-/, "");
}

async function fetchReleases(): Promise<ModrinthRelease[]> {
  const url = "https://api.modrinth.com/v2/project/XxWD5pD3/version";

  console.info("Requesting %s", url);
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ae2"
    }
  });

  if (!response.ok) {
    throw new Error(
      "Failed to fetch. " +
      response.status +
      " (" +
      (await response.text()) +
      ")"
    );
  }

  const data = await response.json();

  return data.map(
    (record: any) =>
      ({
        source: "modrinth",
        url: "https://modrinth.com/mod/ae2/version/" + record.id,
        id: record.id,
        modVersion: getModVersion(record),
        gameVersions: record.game_versions,
        published: new Date(record.date_published).getTime(),
        releaseType: getReleaseType(record),
        modLoaders: record.loaders,
        assets: getModAssets(record),
        changelog: record.changelog,
        totalDownloads: record.downloads,
      } satisfies ModrinthRelease)
  );
}

const releases = await fetchReleases();
writeFileSync(
  "caches/modrinth_releases.json",
  JSON.stringify(releases, null, 2),
  {
    encoding: "utf-8"
  }
);
