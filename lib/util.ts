import { coerce, compare } from "semver";

export function getMajorVersion(minecraftVersion: string) {
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
