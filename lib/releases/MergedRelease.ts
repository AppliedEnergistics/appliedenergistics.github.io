import {
  CurseforgeRelease,
  GithubRelease,
  ModLoader,
  ModRelease,
  ModrinthRelease,
} from "./types";
import { Release } from "./Release";
import { isUndefined, omitBy } from "lodash-es";

function omitUndefined<T extends object>(obj: T): T {
  return omitBy(obj, isUndefined) as T;
}

/**
 * Accumulates and merges release info from different sources (Github,
 * Curseforge, Modrinth).
 */
export class MergedRelease {
  constructor(readonly version: string) {}

  private published: Date | undefined;

  private githubRelease: GithubRelease | undefined;

  private curseforgeRelease: CurseforgeRelease | undefined;

  private modrinthRelease: ModrinthRelease | undefined;

  private markdownChangelog: string | undefined;

  private gameVersions = new Set<string>();

  private modLoaders = new Set<ModLoader>();

  private totalDownloads: number = 0;

  toReleases(): Release[] {
    if (!this.published) {
      console.warn("Release %s has no publication date.", this.version);
      return [];
    }

    const base = omitUndefined({
      modVersion: this.version,
      published: this.published.getTime(),
      githubRelease: this.githubRelease,
      curseforgeRelease: this.curseforgeRelease,
      modrinthRelease: this.modrinthRelease,
      markdownChangelog: this.markdownChangelog,
      totalDownloads: this.totalDownloads,
    } satisfies Partial<Release>);

    const minecraftVersions = [...this.gameVersions];
    const modLoaders = [...this.modLoaders];
    return minecraftVersions.flatMap((minecraftVersion) =>
      modLoaders.map((modLoader) => ({
        ...base,
        minecraftVersion,
        modLoader,
      }))
    );
  }

  mergeRelease(release: ModRelease) {
    switch (release.source) {
      case "github":
        this.githubRelease = release;
        break;
      case "curseforge":
        this.curseforgeRelease = release;
        this.totalDownloads += release.totalDownloads;
        break;
      case "modrinth":
        this.modrinthRelease = release;
        this.totalDownloads += release.totalDownloads;
        break;
    }
    if (release.published && !this.published) {
      this.published = new Date(release.published);
    }
    if (release.changelog && !this.markdownChangelog) {
      this.markdownChangelog = release.changelog;
    }
    release.gameVersions?.forEach((v) => this.gameVersions.add(v));
    release.modLoaders?.forEach((v) => this.modLoaders.add(v));
  }
}
