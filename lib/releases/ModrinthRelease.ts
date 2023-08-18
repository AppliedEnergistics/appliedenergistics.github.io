
export enum ModrinthReleaseType {
  RELEASE = "release",
  BETA = "beta",
  ALPHA = "alpha",
}

export type ModrinthRelease = {
  id: string;
  filename: string;
  version: string;
  displayName: string;
  type: ModrinthReleaseType;
  gameVersions: string[];
  published: string;
  loaders: string[];
};
