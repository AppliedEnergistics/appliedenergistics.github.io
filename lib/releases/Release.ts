/**
 * This must be JSON serializable.
 */
export interface Release {
  modVersion: string;

  minecraftVersions: string[];

  published: number;

  githubReleasePage?: string;

  curseforgePage?: string;

  modrinthPage?: string;

  markdownChangelog?: string;

  modLoaders: string[];
}
