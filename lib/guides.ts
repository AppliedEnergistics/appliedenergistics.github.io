export type GuideVersion = {
  minecraftVersion: string;
  url: string;
};

export async function getGuideVersions(): Promise<GuideVersion[]> {
  const response = await fetch(
    "https://guide-assets.appliedenergistics.org/index.json"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch guide index: " + response.status);
  }
  const guideIndex = await response.json();
  const versions = guideIndex.versions;
  if (!Array.isArray(versions)) {
    throw new Error("Corrupt guide index");
  }

  return versions
    .filter((version) => !version.development)
    .map((version) => ({
      minecraftVersion: version.gameVersion,
      url:
        "https://guide.appliedenergistics.org/#/" + version.gameVersion + "/",
    } satisfies GuideVersion));
}
