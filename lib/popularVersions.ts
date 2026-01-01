import { groupBy, mapValues } from "lodash-es";
import { compare } from "semver";
import { getFlattenedReleases } from "./releases";
import { getMajorVersion } from "./util";

// For every Minecraft major version, pick the one with the most overall downloads as the popular one.
const versionsByMajor = groupBy(
  getFlattenedReleases(),
  ({ minecraftVersion }) => getMajorVersion(minecraftVersion),
);

const mostPopularByMajor = mapValues(versionsByMajor, (versionGroup) => {
  return versionGroup.sort((a, b) => b.totalDownloads - a.totalDownloads)[0]
    .minecraftVersion;
});

const latestMajor = Object.keys(versionsByMajor).sort((a, b) =>
  compare(b + ".0", a + ".0"),
)[0];

// Completely hide major versions that in total have less than a million downloads,
// if they are not the latest major version.
for (let [majorVersion, releases] of Object.entries(versionsByMajor)) {
  const total = releases.reduce((a, b) => a + b.totalDownloads, 0);
  if (majorVersion !== latestMajor && total < 1_000_000) {
    mostPopularByMajor[majorVersion] = "NONE";
  }
}

/**
 * For any given Minecraft version, returns whether it is the most popular
 * within that major version. (i.e. 1.16.5 for 1.16.x).
 */
export function isPopularVersion(version: string): boolean {
  const major = getMajorVersion(version);
  // It defaults to true for unknown majors
  return (mostPopularByMajor[major] ?? version) === version;
}
