import { writeFileSync } from "node:fs";
import { coerce, lte } from "semver";
import {
  CurseforgeRelease,
  ModLoader,
  ReleaseAssetType,
  ReleaseType,
} from "./lib/releases/types.js";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function filterTruthy<T>(values: (T | undefined | null)[]): T[] {
  return values.filter(Boolean) as T[];
}

export enum CurseforgeReleaseType {
  RELEASE = 1,
  BETA = 2,
  ALPHA = 3,
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

function getModLoaders(record: ReleaseApiRecord): ModLoader[] {
  let loaders = record.gameVersions.map((v) => {
    switch (v) {
      case "Forge":
        return ModLoader.FORGE;
      case "NeoForge":
        return ModLoader.NEOFORGE;
      case "Fabric":
        return ModLoader.FABRIC;
      default:
        // Anything below 1.16.2 had to be Forge
        if (v.match(/\d+\.\d+(\.\d+|)/)) {
          if (lte(coerce(v) ?? "0.0.0", "1.16.1")) {
            return ModLoader.FORGE;
          }
        }
    }
  });

  const actualLoaders = filterTruthy(loaders); // Filter out undefined values

  if (actualLoaders.length === 0) {
    console.warn(
      "Failed to determine the mod loader for Curseforge release %s",
      record.displayName,
    );
  }
  return actualLoaders;
}

function convertReleaseType(releaseType: CurseforgeReleaseType): ReleaseType {
  switch (releaseType) {
    case CurseforgeReleaseType.BETA:
      return ReleaseType.BETA;
    case CurseforgeReleaseType.ALPHA:
      return ReleaseType.ALPHA;
    default:
      return ReleaseType.STABLE;
  }
}

function guessModVersionFromFilename(filename: string): string | undefined {
  const m = filename.match(
    /^appliedenergistics2-(?:forge-|fabric-|)(.+)\.jar$/,
  );
  return m ? m[1] : undefined;
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
          ")",
      );
    }

    const page = await response.json();
    const { index, totalCount } = page.pagination;
    if (Array.isArray(page.data)) {
      data.push(...page.data);
    }

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

  return data.flatMap((record: ReleaseApiRecord) => {
    const modVersion = guessModVersionFromFilename(record.fileName);
    if (!modVersion) {
      console.warn(
        "Cannot deduce Mod version from Curseforge filename: %s",
        record.fileName,
      );
      return [];
    }

    return [
      {
        source: "curseforge",
        id: String(record.id),
        url:
          "https://www.curseforge.com/minecraft/mc-mods/applied-energistics-2/files/" +
          record.id,
        modVersion,
        releaseType: convertReleaseType(record.releaseType),
        gameVersions: getGameVersions(record),
        modLoaders: getModLoaders(record),
        published: new Date(record.dateCreated).getTime(),
        totalDownloads: record.totalDownloads,
        assets: {
          [ReleaseAssetType.MOD]: {
            filename: record.fileName,
            size: record.fileLength,
            browser_download_url:
              "https://www.curseforge.com/minecraft/mc-mods/applied-energistics-2/download/" +
              record.id,
          },
        },
      } satisfies CurseforgeRelease,
    ];
  });
}

const releases = await fetchReleases();
writeFileSync(
  "caches/curseforge_releases.json",
  JSON.stringify(releases, null, 2),
  {
    encoding: "utf-8",
  },
);
