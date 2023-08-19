import PersistentCache from "./PersistentCache.js";
import { CachedGithubRelease } from "./GithubRelease";

export type GithubReleaseCache = PersistentCache<CachedGithubRelease>;

export enum ModLoader {
  NEOFORGE = "neoforge",
  FORGE = "forge",
  FABRIC = "fabric",
}

export type ModReleaseInfo = {
  /**
   * Git tag for the source.
   */
  tagName: string;
  /**
   * The version number of the mod. May have -beta or -alpha suffixes.
   */
  modVersion: string;
  /**
   * Minecraft versions supported by this release.
   */
  minecraftVersions: string[];
  /**
   * Modloader supported by this release.
   */
  modLoaders: ModLoader[];
};

export enum ReleaseAssetType {
  MOD = "mod",
  API = "api",
  JAVADOC = "javadoc",
  /**
   * Version of the mod that has not been remapped to the production namespace.
   * Used in older versions of Forge for running in the dev-environment of addons.
   */
  UNOBF = "unobf",
  /**
   * Assets for the online-version of the guidebook.
   */
  GUIDE_ASSETS = "guide-assets",
}
