export enum CurseforgeReleaseType {
  RELEASE = 1,
  BETA = 2,
  ALPHA = 3,
}

export type CurseforgeRelease = {
  id: number;
  filename: string;
  fileSize: number;
  displayName: string;
  type: CurseforgeReleaseType;
  gameVersions: string[];
  totalDownloads: number;
  published: string;
};