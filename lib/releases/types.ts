import PersistentCache from "./PersistentCache.js";

export type GithubReleaseCache = PersistentCache<GithubRelease>;

export enum ModLoader {
  NEOFORGE = "neoforge",
  FORGE = "forge",
  FABRIC = "fabric",
}

export enum ReleaseType {
  STABLE = "stable",
  BETA = "beta",
  ALPHA = "alpha",
}

export interface ModReleaseInfo<Source extends string> {
  /**
   * Identifies the source of the information.
   */
  source: Source;
  /**
   * The version number of the mod. May have -beta or -alpha suffixes.
   */
  modVersion: string;
  /**
   * Minecraft versions supported by this release.
   */
  gameVersions: string[];
  /**
   * Modloader supported by this release.
   */
  modLoaders: ModLoader[];
  /**
   * When this release was published.
   * @see Date
   */
  published: number;
  /**
   * URL for linking a user to this release.
   */
  url: string;
  /**
   * Markdown code of the changelog.
   */
  changelog?: string;
  /**
   * The type of release.
   */
  releaseType: ReleaseType;
  /**
   * Files attached to the release.
   */
  assets: Partial<Record<ReleaseAssetType, ModReleaseAsset>>;
}

export interface ModrinthRelease extends ModReleaseInfo<"modrinth"> {
  /**
   * Release-ID on Modrinth.
   */
  id: string;
  /**
   * The total number of downloads for this release.
   */
  totalDownloads: number;
}

export interface GithubRelease extends ModReleaseInfo<"github"> {
  /**
   * Name of the Git tag backing this release.
   */
  tagName: string;
}

export interface CurseforgeRelease extends ModReleaseInfo<"curseforge"> {
  /**
   * Release-ID on Curseforge.
   */
  id: string;
  /**
   * The total number of downloads for this release.
   */
  totalDownloads: number;
}

export type ModRelease = GithubRelease | ModrinthRelease | CurseforgeRelease;

export type ModReleaseAsset = {
  filename: string;
  size: number;
  /**
   * Direct download URL for tools and such.
   */
  url?: string;
  /**
   * URL to direct a browser to for downloading.
   */
  browser_download_url?: string;
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
