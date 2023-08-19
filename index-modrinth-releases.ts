import {writeFileSync} from "node:fs";
import { ModrinthRelease } from "./lib/releases/ModrinthRelease";

async function fetchReleases(): Promise<ModrinthRelease[]> {
  const url = "https://api.modrinth.com/v2/project/XxWD5pD3/version";

  console.info("Requesting %s", url);
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ae2",
    },
  });

  if (!response.ok) {
    throw new Error(
      "Failed to fetch. " +
      response.status +
      " (" +
      (await response.text()) +
      ")"
    );
  }

  const data = await response.json();

  return data.map(
    (record: any) =>
      ({
        id: record.id,
        displayName: record.name,
        version: record.version_number,
        type: record.version_type,
        gameVersions: record.game_versions,
        published: record.date_published,
        filename: record.files.find((f: any) => f.primary)?.filename ?? "",
        loaders: record.loaders,
      } satisfies ModrinthRelease)
  );
}

const releases = await fetchReleases();
writeFileSync(
  "caches/modrinth_releases.json",
  JSON.stringify(releases, null, 2),
  {
    encoding: "utf-8",
  }
);
