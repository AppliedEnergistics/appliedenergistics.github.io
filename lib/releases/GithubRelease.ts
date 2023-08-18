import { ModLoader, ReleaseAssetType } from "./types";

export type CachedGithubRelease = {
  /**
   * When this release was published.
   */
  published?: string;
  /**
   * Name of the Git tag backing this release.
   */
  tagName: string;
  /**
   * URL for linking a user to this release.
   */
  url: string;
  /**
   * Markdown code of the changelog.
   */
  changelog?: string;
  /**
   * Mod version extracted from the release.
   */
  version?: string;
  /**
   * Minecraft versions supported by this release.
   */
  minecraftVersions?: string[];
  /**
   * Mod-Loaders supported by this release.
   */
  modLoaders?: ModLoader[];
  /**
   * Files attached to the release.
   */
  assets: Partial<Record<ReleaseAssetType, CachedGithubAsset>>;
};

export type CachedGithubAsset = {
  filename: string;
  size: number;
  url: string;
  browser_download_url: string;
};
