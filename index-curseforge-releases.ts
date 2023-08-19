import { writeFileSync } from "node:fs";
import {
  CurseforgeRelease,
  CurseforgeReleaseType,
} from "./lib/releases/CurseforgeRelease";
import { coerce, lte } from "semver";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Describes shape of data observed that CF website API returns for each release
type ReleaseApiRecord = {
  totalDownloads: number;
  dateCreated: string;
  releaseType: CurseforgeReleaseType;
  displayName: string;
  fileLength: number;
  fileName: string;
  id: number;
  // These are labels for supported versions
  gameVersions: string[];
};

/**
 * Anything that looks like a Minecraft-Version is returned.
 */
function getGameVersions(record: ReleaseApiRecord) {
  return record.gameVersions.filter((v) => v.match(/\d+\.\d+(\.\d+|)/));
}

function getModLoaders(record: ReleaseApiRecord) {
  let loaders = record.gameVersions.map((v) => {
    switch (v) {
      case "Forge":
        return "forge";
      case "NeoForge":
        return "neoforge";
      case "Fabric":
        return "fabric";
      default:
        // Anything below 1.16.2 had to be Forge
        if (v.match(/\d+\.\d+(\.\d+|)/)) {
          if (lte(coerce(v) ?? "0.0.0", "1.16.1")) {
            return "forge";
          }
        }
    }
  });

  loaders = loaders.filter(Boolean); // Filter out undefined values

  if (loaders.length === 0) {
    console.warn(
      "Failed to determine the mod loader for Curseforge release %s",
      record.displayName
    );
  }
  return loaders;
}

async function fetchReleases(): Promise<CurseforgeRelease[]> {
  const urlPattern =
    "https://www.curseforge.com/api/v1/mods/223794/files?pageIndex=%PAGE%&pageSize=%PAGESIZE%&sort=dateCreated&sortDescending=true&removeAlphas=false";
  const pageSize = 50;

  const data: any[] = [];
  let nextPageIndex: number | undefined = 0;
  while (nextPageIndex !== undefined) {
    const url = urlPattern
      .replace("%PAGESIZE%", "" + pageSize)
      .replace("%PAGE%", "" + nextPageIndex);
    console.info("Requesting %s", url);
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
      },
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

    const page = await response.json();
    const { index, totalCount } = page.pagination;
    data.push(...page.data);

    if ((index + 1) * pageSize <= totalCount) {
      nextPageIndex = index + 1;
    } else {
      nextPageIndex = undefined;
    }

    await sleep(1000);
  }

  // Dedup
  for (let i = 0; i < data.length; i++) {
    const id = data[i].id;
    for (let j = i + 1; j < data.length; j++) {
      if (data[j].id === id) {
        console.info("Removing duplicate file %d", id);
        data.splice(j, 1);
      }
    }
  }

  return data.map((record: ReleaseApiRecord) => ({
    id: record.id,
    filename: record.fileName,
    fileSize: record.fileLength,
    displayName: record.displayName,
    type: record.releaseType,
    gameVersions: getGameVersions(record),
    modLoaders: getModLoaders(record),
    published: record.dateCreated,
    totalDownloads: record.totalDownloads,
  }));
}

const releases = await fetchReleases();
writeFileSync(
  "caches/curseforge_releases.json",
  JSON.stringify(releases, null, 2),
  {
    encoding: "utf-8",
  }
);
