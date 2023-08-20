import modrinthReleases from "../caches/modrinth_releases.json";
import curseforgeReleases from "../caches/curseforge_releases.json";
import githubReleases from "../caches/github_releases.json";
import { MergedRelease } from "./releases/MergedRelease";
import { Release } from "./releases/Release";
import {
  CurseforgeRelease,
  GithubRelease,
  ModrinthRelease,
} from "./releases/types";
import { coerce } from "semver";
import { compareMinecraftVersion } from "./util";

// Load caches. Updated by external scripts.
console.info("Loaded %d Github Releases", Object.keys(githubReleases).length);
console.info("Loaded %d Curseforge Releases", curseforgeReleases.length);
console.info("Loaded %d Modrinth Releases", modrinthReleases.length);

// Indexed by version
const releases = new Map<string, MergedRelease>();

function getOrCreateRelease(version: string): MergedRelease {
  let release = releases.get(version);
  if (release) {
    return release;
  }
  release = new MergedRelease(version);
  releases.set(version, release);
  return release;
}

for (let ghRelease of Object.values(githubReleases)) {
  const release = getOrCreateRelease(ghRelease.modVersion);
  release.mergeRelease(ghRelease as GithubRelease);
}

for (const cfRelease of curseforgeReleases) {
  const release = getOrCreateRelease(cfRelease.modVersion);
  release.mergeRelease(cfRelease as CurseforgeRelease);
}

for (const modrinthRelease of modrinthReleases) {
  const release = getOrCreateRelease(modrinthRelease.modVersion);
  release.mergeRelease(modrinthRelease as ModrinthRelease);
}

const flattenedReleases = [...releases.values()].flatMap((r) => r.toReleases());

// Order releases by minecraft version in descending order
flattenedReleases.sort((a, b) => {
  return compareMinecraftVersion(b.minecraftVersion, a.minecraftVersion);
});

/**
 * Returns releases for each minecraft / mod-loader combination.
 * Returns the same release multiple times if it supports multiple
 * Minecraft or Mod-Loader versions.
 */
export function getFlattenedReleases(): Release[] {
  return flattenedReleases;
}
