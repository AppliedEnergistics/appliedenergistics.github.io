import { CurseforgeRelease, GithubRelease, ModrinthRelease } from "./types";

/**
 * This must be JSON serializable.
 */
export interface Release {
  modVersion: string;

  minecraftVersion: string;

  modLoader: string;

  published: number;

  markdownChangelog?: string;

  totalDownloads: number;

  githubRelease?: GithubRelease;

  curseforgeRelease?: CurseforgeRelease;

  modrinthRelease?: ModrinthRelease;
}
