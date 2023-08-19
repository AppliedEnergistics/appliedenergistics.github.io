/**
 * This must be JSON serializable.
 */
export interface Release {
  modVersion: string;

  minecraftVersion: string;

  modLoader: string;

  published: number;

  githubReleasePage?: string;

  curseforgePage?: string;

  modrinthPage?: string;

  markdownChangelog?: string;
}
