import { coerce, compare } from "semver";

export function getMajorVersion(minecraftVersion: string) {
  if (parseInt(minecraftVersion.split(".")[0]) >= 26) {
    // Strip any qualifier off, i.e. 26.1-snapshot...
    const unqualified = minecraftVersion.split('-')[0];
    return unqualified.split(".").slice(0, 2).join(".");
  }

  return minecraftVersion.split(".").slice(0, 2).join(".");
}

export function compareMinecraftVersion(a: string, b: string) {
  const aVersion = coerce(a) ?? "0.0.0";
  const bVersion = coerce(b) ?? "0.0.0";
  return compare(aVersion, bVersion);
}

export function isSameMinecraftMajor(a: string, b: string) {
  return getMajorVersion(a) === getMajorVersion(b);
}
