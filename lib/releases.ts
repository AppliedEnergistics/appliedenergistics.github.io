import modrinthReleases from "../caches/modrinth_releases.json";
import curseforgeReleases from "../caches/curseforge_releases.json";
import githubReleases from "../caches/github_releases.json";
import { MergedRelease } from "./releases/MergedRelease";
import { CachedGithubRelease } from "./releases/GithubRelease";
import { CurseforgeRelease } from "./releases/CurseforgeRelease";
import { Release } from "./releases/Release";

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

const tagNamePatterns = [
  /^fabric\/v(.*)$/,
  /^forge\/v(.*)$/,
  /^v(.*)$/,
  /^(rv.*)$/
];

function guessVersionFromTag(tagName: string): string | undefined {
  for (let pattern of tagNamePatterns) {
    const m = tagName.match(pattern);
    if (m) {
      return m[1];
    }
  }
}

for (let [key, ghRelease] of Object.entries(githubReleases)) {
  let version = guessVersionFromTag(key);
  if (!version) {
    console.warn("Cannot determine version from tag %s", key);
    continue;
  }

  const release = getOrCreateRelease(version);
  release.mergeGithubRelease(ghRelease as CachedGithubRelease);
}

function guessModVersionFromFilename(filename: string): string | undefined {
  const m = filename.match(/^appliedenergistics2-(?:forge-|fabric-|)(.+)\.jar$/);
  return m ? m[1] : undefined;
}

for (const cfRelease of curseforgeReleases) {
  const modVersion = guessModVersionFromFilename(cfRelease.filename);
  if (!modVersion) {
    console.warn("Cannot guess Mod version from filename: %s", modVersion, cfRelease.filename);
    continue;
  }

  const release = getOrCreateRelease(modVersion);
  release.mergeCurseforgeRelease(cfRelease as CurseforgeRelease);
}

export function getConsolidatedReleases(): Release[] {
  let result = [];
  for (let mergedRelease of releases.values()) {
    const release = mergedRelease.toRelease();
    if (release) {
      result.push(release);
    }
  }
  return result;
}
