const launcherMetaUrl =
  "https://launchermeta.mojang.com/mc/game/version_manifest.json";

export default async function getMinecraftVersions(): Promise<string[]> {
  const response = await fetch(launcherMetaUrl);
  if (!response.ok) {
    throw new Error(
      "Failed to query Minecraft version list from " + launcherMetaUrl
    );
  }

  const json = await response.json();
  // The Minecraft releases in order
  return json.versions
    .filter((v: any) => v.type === "release")
    .map((v: any) => v.id);
}
