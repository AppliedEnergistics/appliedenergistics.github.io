import { compareMinecraftVersion, isSameMinecraftMajor } from "./util";

export type GuideVersion = {
  minecraftVersion: string;
  url: string;
};

export async function getGuideVersions(): Promise<GuideVersion[]> {
  const response = await fetch(
    "https://guide-assets.appliedenergistics.org/index.json",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch guide index: " + response.status);
  }
  const guideIndex = await response.json();
  let versions = guideIndex.versions;
  if (!Array.isArray(versions)) {
    throw new Error("Corrupt guide index");
  }

  let filteredVersions = versions
    .filter((version) => !version.development)
    .map(
      (version) =>
        ({
          minecraftVersion: version.gameVersion,
          url:
            "https://guide.appliedenergistics.org/#/" +
            version.gameVersion +
            "/",
        }) satisfies GuideVersion,
    );

  // Add the old wiki as a guide for 1.7
  filteredVersions.unshift({
    minecraftVersion: "1.7.10",
    url: "https://appliedenergistics.org/ae2-site-archive/",
  });

  return filteredVersions;
}

export function getGuideUrl(
  guideVersions: GuideVersion[],
  releaseMinecraftVersion: string,
): string | undefined {
  // 1) Exact match always wins
  for (const guideVersion of guideVersions) {
    if (guideVersion.minecraftVersion === releaseMinecraftVersion) {
      return guideVersion.url;
    }
  }

  // Split the list into two parts: one with older and one with newer
  const olderVersions: GuideVersion[] = [];
  const newerVersions: GuideVersion[] = [];
  for (const guideVersion of guideVersions) {
    if (
      compareMinecraftVersion(
        guideVersion.minecraftVersion,
        releaseMinecraftVersion,
      ) < 0
    ) {
      olderVersions.push(guideVersion);
    } else {
      newerVersions.push(guideVersion);
    }
  }
  // For versions older than the release, the newest is closest
  olderVersions.sort((a, b) =>
    compareMinecraftVersion(b.minecraftVersion, a.minecraftVersion),
  );
  // For versions newer than the release, the oldest is closest
  newerVersions.sort((a, b) =>
    compareMinecraftVersion(a.minecraftVersion, b.minecraftVersion),
  );

  // Prefer a pick from the same major version
  if (
    olderVersions.length > 0 &&
    isSameMinecraftMajor(
      olderVersions[0].minecraftVersion,
      releaseMinecraftVersion,
    )
  ) {
    return olderVersions[0].url;
  }
  if (
    newerVersions.length > 0 &&
    isSameMinecraftMajor(
      newerVersions[0].minecraftVersion,
      releaseMinecraftVersion,
    )
  ) {
    return newerVersions[0].url;
  }

  // Otherwise, prefer older, and if that isn't available, newer
  return olderVersions[0]?.url ?? newerVersions[0]?.url;
}
