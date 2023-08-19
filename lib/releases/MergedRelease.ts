import { ModLoader } from "./types";
import { CachedGithubRelease } from "./GithubRelease";
import { CurseforgeRelease } from "./CurseforgeRelease";
import { Release } from "./Release";
import { isUndefined, omitBy } from "lodash-es";
import { ModrinthRelease } from "./ModrinthRelease";

function omitUndefined<T extends object>(obj: T): T {
  return omitBy(obj, isUndefined) as T;
}

export class MergedRelease {
  constructor(readonly version: string) {}

  published: Date | undefined;

  githubReleasePage: string | undefined;

  curseforgePage: string | undefined;

  modrinthPage: string | undefined;

  markdownChangelog: string | undefined;

  minecraftVersions = new Set<string>();

  modLoaders = new Set<ModLoader>();

  toReleases(): Release[] {
    if (!this.published) {
      console.warn("Release %s has no publication date.", this.version);
      return [];
    }

    const base = omitUndefined({
      modVersion: this.version,
      published: this.published.getTime(),
      githubReleasePage: this.githubReleasePage,
      curseforgePage: this.curseforgePage,
      modrinthPage: this.modrinthPage,
      markdownChangelog: this.markdownChangelog,
    });

    const minecraftVersions = [...this.minecraftVersions];
    const modLoaders = [...this.modLoaders];
    return minecraftVersions.flatMap((minecraftVersion) =>
      modLoaders.map((modLoader) => ({
        ...base,
        minecraftVersion,
        modLoader,
      }))
    );
  }

  mergeGithubRelease(ghRelease: CachedGithubRelease) {
    this.githubReleasePage = ghRelease.url;
    if (ghRelease.published && !this.published) {
      this.published = new Date(ghRelease.published);
    }
    if (ghRelease.changelog && !this.markdownChangelog) {
      this.markdownChangelog = ghRelease.changelog;
    }
    ghRelease.minecraftVersions?.forEach((v) => this.minecraftVersions.add(v));
    ghRelease.modLoaders?.forEach((v) => this.modLoaders.add(v));
  }

  mergeCurseforgeRelease(cfRelease: CurseforgeRelease) {
    const curseforgeUrl = `https://www.curseforge.com/minecraft/mc-mods/applied-energistics-2/files/${cfRelease.id}`;
    this.curseforgePage = curseforgeUrl;

    for (let gameVersion of cfRelease.gameVersions) {
      switch (gameVersion) {
        case "Forge":
          this.modLoaders.add(ModLoader.FORGE);
          break;
        case "NeoForge":
          this.modLoaders.add(ModLoader.NEOFORGE);
          break;
        case "Fabric":
          this.modLoaders.add(ModLoader.FABRIC);
          break;
        default:
          if (gameVersion.startsWith("Java ")) {
            // ignore Java version
          } else if (gameVersion.match(/\d+\.\d+(\.\d+|)/)) {
            this.minecraftVersions.add(gameVersion);
          } else {
            console.warn(
              "Cannot handle CurseForge Game Version '%s' for %s",
              gameVersion,
              curseforgeUrl
            );
          }
          break;
      }
    }

    if (!this.published) {
      this.published = new Date(cfRelease.published);
    }
  }

  mergeModrinthRelease(modrinthRelease: ModrinthRelease) {
    const modrinthUrl = `https://modrinth.com/mod/ae2/version/${modrinthRelease.version}`;
    this.modrinthPage = modrinthUrl;

    for (let loader of modrinthRelease.loaders) {
      switch (loader) {
        case "forge":
          this.modLoaders.add(ModLoader.FORGE);
          break;
        case "neoforge":
          this.modLoaders.add(ModLoader.NEOFORGE);
          break;
        case "fabric":
          this.modLoaders.add(ModLoader.FABRIC);
          break;
        default:
          console.warn(
            "Cannot handle Modrinth loader '%s' for %s",
            loader,
            modrinthUrl
          );
          break;
      }
    }

    for (const minecraftVersion of modrinthRelease.gameVersions) {
      this.minecraftVersions.add(minecraftVersion);
    }

    if (!this.published) {
      this.published = new Date(modrinthRelease.published);
    }
  }
}
