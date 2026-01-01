import Icon from "@mdi/react";
import { mdiBookOpenPageVariant } from "@mdi/js";
import React, { useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getFlattenedReleases } from "../lib/releases";
import { Release } from "../lib/releases/Release";
import { groupBy, mapValues } from "lodash-es";
import { getGuideUrl, getGuideVersions } from "../lib/guides";
import { isPopularVersion } from "../lib/popularVersions";
import { compareMinecraftVersion } from "../lib/util";
import ButtonBar from "../components/ButtonBar";
import Head from "next/head";

interface ReleaseTableRow {
  minecraftVersion: string;
  fabric: Release | null;
  popularVersion: boolean;
  forge: {
    release: Release | null;
    neoforge: boolean;
    forge: boolean;
  };
  guideUrl: string | null;
}

function ForgeRelease({
  release,
}: {
  release: Release | null;
  forge: boolean;
  neoforge: boolean;
}) {
  if (!release) {
    return <>&mdash;</>;
  }

  return (
    <>
      <h4>{release.modVersion}</h4>
      {release.curseforgeRelease && (
        <div>
          <a href={release.curseforgeRelease.url}>Download from Curseforge</a>
        </div>
      )}
      {release.modrinthRelease && (
        <div>
          <a href={release.modrinthRelease.url}>Download from Modrinth</a>
        </div>
      )}
      {release.githubRelease && (
        <div>
          <a href={release.githubRelease.url}>Download from Github</a>
        </div>
      )}
    </>
  );
}

function FabricRelease({ release }: { release: Release | null }) {
  if (!release) {
    return <>&mdash;</>;
  }
  return (
    <>
      <h4>{release.modVersion}</h4>
      {release.curseforgeRelease && (
        <div>
          <a href={release.curseforgeRelease.url}>Download from Curseforge</a>
        </div>
      )}
      {release.modrinthRelease && (
        <div>
          <a href={release.modrinthRelease.url}>Download from Modrinth</a>
        </div>
      )}
      {release.githubRelease && (
        <div>
          <a href={release.githubRelease.url}>Download from Github</a>
        </div>
      )}
    </>
  );
}

function Download({
  latestReleases,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [onlyShowRelevant, setOnlyShowRelevant] = useState(true);

  return (
    <>
      <Head>
        <title>Applied Energistics 2 - Download</title>
      </Head>

      <h1 className="title">Downloads</h1>

      <ButtonBar />

      <div className="content box">
        <p>
          You can download AE2 from{" "}
          <a
            rel="noopener"
            href="https://www.curseforge.com/minecraft/mc-mods/applied-energistics-2/files"
          >
            CurseForge
          </a>
          ,{" "}
          <a rel="noopener" href="https://modrinth.com/mod/ae2/versions">
            Modrinth
          </a>{" "}
          and{" "}
          <a
            rel="noopener"
            href="https://github.com/AppliedEnergistics/Applied-Energistics-2/releases/"
          >
            Github
          </a>
          .
        </p>

        <div className="is-justify-content-end is-flex">
          <div>
            <label className="checkbox">
              <input
                type="checkbox"
                onChange={(e) => setOnlyShowRelevant(e.target.checked)}
                checked={onlyShowRelevant}
              />{" "}
              Only show most relevant
            </label>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Game Version</th>
              <th>NeoForge/Forge</th>
              <th>Fabric</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {latestReleases
              .filter((release) => !onlyShowRelevant || release.popularVersion)
              .map(({ minecraftVersion, fabric, forge, guideUrl }) => {
                return (
                  <tr key={minecraftVersion}>
                    <td>
                      <h3>Minecraft {minecraftVersion}</h3>
                    </td>

                    <td>
                      <ForgeRelease {...forge} />
                    </td>

                    <td>
                      <FabricRelease release={fabric} />
                    </td>

                    <td>
                      {guideUrl && (
                        <a className="button is-primary" href={guideUrl}>
                          <span className="icon">
                            <Icon path={mdiBookOpenPageVariant} />
                          </span>
                          <span>Mod Guide</span>
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <p>
          AE2 is open-source, and can be freely redistributed as part of a
          non-commercial mod-pack (see{" "}
          <a href="https://github.com/AppliedEnergistics/Applied-Energistics-2/#license">
            license
          </a>
          ).
        </p>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  latestReleases: ReleaseTableRow[];
}> = async () => {
  // Group by minecraft version
  const groupedByMc = groupBy(
    getFlattenedReleases(),
    (v) => v.minecraftVersion,
  );
  const guideVersions = await getGuideVersions();

  // And then by mod-loader
  const latestByMcAndModLoader = mapValues(groupedByMc, (releases) =>
    mapValues(
      // Group by loader
      groupBy(releases, (release) => release.modLoader),
      // Then select the latest version per loader
      (releases) => releases.sort((a, b) => b.published - a.published)[0],
    ),
  );

  // Produce a table
  const latestReleases = Object.entries(latestByMcAndModLoader).map(
    ([minecraftVersion, releasesByLoader]) => {
      const fabricRelease = releasesByLoader["fabric"];
      const forgeRelease = releasesByLoader["forge"];
      const neoforgeRelease = releasesByLoader["neoforge"];

      return {
        minecraftVersion,
        fabric: fabricRelease ?? null,
        forge: {
          release: neoforgeRelease ?? forgeRelease ?? null,
          forge: Boolean(forgeRelease),
          neoforge: Boolean(neoforgeRelease),
        },
        guideUrl: getGuideUrl(guideVersions, minecraftVersion) ?? null,
        popularVersion: isPopularVersion(minecraftVersion),
      } satisfies ReleaseTableRow;
    },
  );

  latestReleases.sort((a, b) => {
    return compareMinecraftVersion(b.minecraftVersion, a.minecraftVersion);
  });

  return { props: { latestReleases } };
};

export default Download;
