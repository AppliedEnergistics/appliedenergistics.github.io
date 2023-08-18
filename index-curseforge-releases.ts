import { writeFileSync } from "node:fs";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchReleases(): Promise<CurseforgeRelease[]> {
  const urlPattern =
    "https://www.curseforge.com/api/v1/mods/223794/files?pageIndex=%PAGE%&pageSize=%PAGESIZE%&sort=dateCreated&sortDescending=true&removeAlphas=false";
  const pageSize = 50;

  const data: any[] = [];
  let nextPageIndex: number | undefined = 0;
  while (nextPageIndex !== undefined) {
    const url = urlPattern
      .replace("%PAGESIZE%", "" + pageSize)
      .replace("%PAGE%", "" + nextPageIndex);
    console.info("Requesting %s", url);
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
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

    const page = await response.json();
    const { index, totalCount } = page.pagination;
    data.push(...page.data);

    if ((index + 1) * pageSize <= totalCount) {
      nextPageIndex = index + 1;
    } else {
      nextPageIndex = undefined;
    }

    await sleep(1000);
  }

  // Dedup
  for (let i = 0; i < data.length; i++) {
    const id = data[i].id;
    for (let j = i + 1; j < data.length; j++) {
      if (data[j].id === id) {
        console.info("Removing duplicate file %d", id);
        data.splice(j, 1);
      }
    }
  }

  return data.map((record: any) => ({
    id: record.id,
    filename: record.fileName,
    displayName: record.displayName,
    type: record.releaseType,
    gameVersions: record.gameVersions,
    published: record.dateCreated,
  }));
}

const releases = await fetchReleases();
writeFileSync(
  "caches/curseforge_releases.json",
  JSON.stringify(releases, null, 2),
  {
    encoding: "utf-8",
  }
);
