import modrinthReleases from "../caches/modrinth_releases.json";
import curseforgeReleases from "../caches/curseforge_releases.json";
import githubReleases from "../caches/github_releases.json";
import { MergedRelease } from "./releases/MergedRelease";
import { CachedGithubRelease } from "./releases/GithubRelease";
import { CurseforgeRelease } from "./releases/CurseforgeRelease";
import { Release } from "./releases/Release";
import { release } from "os";
import { ModrinthRelease } from "./releases/ModrinthRelease";

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
  let version = ghRelease.version;
  if (!version) {
    console.warn("Github release for tag %s has no version", ghRelease.tagName);
    continue;
  }

  const release = getOrCreateRelease(version);
  release.mergeGithubRelease(ghRelease as CachedGithubRelease);
}

function guessModVersionFromFilename(filename: string): string | undefined {
  const m = filename.match(
    /^appliedenergistics2-(?:forge-|fabric-|)(.+)\.jar$/
  );
  return m ? m[1] : undefined;
}

for (const cfRelease of curseforgeReleases) {
  const modVersion = guessModVersionFromFilename(cfRelease.filename);
  if (!modVersion) {
    console.warn(
      "Cannot guess Mod version from filename: %s",
      modVersion,
      cfRelease.filename
    );
    continue;
  }

  const release = getOrCreateRelease(modVersion);
  release.mergeCurseforgeRelease(cfRelease as CurseforgeRelease);
}

for (const modrinthRelease of modrinthReleases) {
  const modVersion = guessModVersionFromFilename(modrinthRelease.filename);
  if (!modVersion) {
    console.warn(
      "Cannot guess Mod version from Modrinth filename: %s (%s)",
      modVersion,
      modrinthRelease.filename,
      modrinthRelease.displayName
    );
    continue;
  }

  const release = getOrCreateRelease(modVersion);
  release.mergeModrinthRelease(modrinthRelease as ModrinthRelease);
}

/**
 * Returns releases for each minecraft / mod-loader combination.
 * Returns the same release multiple times if it supports multiple
 * Minecraft or Mod-Loader versions.
 */
export function getFlattenedReleases(): Release[] {
  return [...releases.values()].flatMap((r) => r.toReleases());
}
