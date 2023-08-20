import Icon from "@mdi/react";
import {
  mdiArrowRightBold,
  mdiChevronRight,
  mdiGithub,
  mdiLink,
} from "@mdi/js";
import React, { useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getFlattenedReleases } from "../lib/releases";
import { Release } from "../lib/releases/Release";
import { groupBy, mapValues } from "lodash-es";
import { getGuideUrl, getGuideVersions } from "../lib/guides";
import { isPopularVersion } from "../lib/popularVersions";
import { compareMinecraftVersion } from "../lib/util";

const GithubIcon = (
  <Icon
    path={mdiGithub}
    color="#181717"
    style={{ maxWidth: "1em", maxHeight: "1em" }}
  />
);

const ModrinthIcon = (
  <svg style={{ maxWidth: "1em", maxHeight: "1em" }}>
    <use href="#modrinth-icon" />
  </svg>
);

const CurseforgeIcon = (
  <svg style={{ maxWidth: "1em", maxHeight: "1em" }}>
    <use href="#curseforge-icon" />
  </svg>
);

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
  forge,
  neoforge,
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

function Index({
  latestReleases,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [onlyShowRelevant, setOnlyShowRelevant] = useState(true);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "none" }}
        version="2.0"
      >
        <defs>
          <symbol id="curseforge-icon" viewBox="-2017 853 43 23">
            <path
              d="M-2005.7,853l0.7,3c-3.5,0-12,0-12,0s0.2,0.9,0.3,1c0.3,0.5,0.6,1.1,1,1.5c1.9,2.2,5.2,3.1,7.9,3.6
c1.9,0.4,3.8,0.5,5.7,0.6l2.2,5.9h1.2l0.7,1.9h-1l-1.7,5.5h16.7l-1.7-5.5h-1l0.7-1.9h1.2c0,0,1-6.1,4.1-8.9c3-2.8,6.7-3.2,6.7-3.2
V853H-2005.7z M-1988.9,868.1c-0.8,0.5-1.7,0.5-2.3,0.9c-0.4,0.2-0.6,0.8-0.6,0.8c-0.4-0.9-0.9-1.2-1.5-1.4
c-0.6-0.2-1.7-0.1-3.2-1.4c-1-0.9-1.1-2.1-1-2.7v-0.1c0-0.1,0-0.1,0-0.2s0-0.2,0.1-0.3l0,0l0,0c0.2-0.6,0.7-1.2,1.7-1.6
c0,0-0.7,1,0,2c0.4,0.6,1.2,0.9,1.9,0.5c0.3-0.2,0.5-0.6,0.6-0.9c0.2-0.7,0.2-1.4-0.4-1.9c-0.9-0.8-1.1-1.9-0.5-2.6
c0,0,0.2,0.9,1.1,0.8c0.6,0,0.6-0.2,0.4-0.4c-0.1-0.3-1.4-2.2,0.5-3.6c0,0,1.2-0.8,2.6-0.7c-0.8,0.1-1.7,0.6-2,1.4c0,0,0,0,0,0.1
c-0.3,0.8-0.1,1.7,0.5,2.5c0.4,0.6,0.9,1.1,1.1,1.9c-0.3-0.1-0.5,0-0.7,0.2c-0.2,0.2-0.3,0.6-0.2,0.9c0.1,0.2,0.3,0.4,0.5,0.4
c0.1,0,0.1,0,0.2,0h0.1c0.3-0.1,0.5-0.5,0.4-0.8c0.2,0.2,0.3,0.7,0.2,1c0,0.3-0.2,0.6-0.3,0.8c-0.1,0.2-0.3,0.4-0.4,0.6
s-0.2,0.4-0.2,0.6c0,0.2,0,0.5,0.1,0.7c0.4,0.6,1.2,0,1.4-0.5c0.3-0.6,0.2-1.3-0.2-1.9c0,0,0.7,0.4,1.2,1.8
C-1987.4,866.2-1988.1,867.6-1988.9,868.1z"
            />
          </symbol>
          <symbol id="modrinth-icon" viewBox="0 0 512 514">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M503.16 323.56C514.55 281.47 515.32 235.91 503.2 190.76C466.57 54.2299 326.04 -26.8001 189.33 9.77991C83.8101 38.0199 11.3899 128.07 0.689941 230.47H43.99C54.29 147.33 113.74 74.7298 199.75 51.7098C306.05 23.2598 415.13 80.6699 453.17 181.38L411.03 192.65C391.64 145.8 352.57 111.45 306.3 96.8198L298.56 140.66C335.09 154.13 364.72 184.5 375.56 224.91C391.36 283.8 361.94 344.14 308.56 369.17L320.09 412.16C390.25 383.21 432.4 310.3 422.43 235.14L464.41 223.91C468.91 252.62 467.35 281.16 460.55 308.07L503.16 323.56Z"
            />
            <path d="M321.99 504.22C185.27 540.8 44.7501 459.77 8.11011 323.24C3.84011 307.31 1.17 291.33 0 275.46H43.27C44.36 287.37 46.4699 299.35 49.6799 311.29C53.0399 323.8 57.45 335.75 62.79 347.07L101.38 323.92C98.1299 316.42 95.39 308.6 93.21 300.47C69.17 210.87 122.41 118.77 212.13 94.7601C229.13 90.2101 246.23 88.4401 262.93 89.1501L255.19 133C244.73 133.05 234.11 134.42 223.53 137.25C157.31 154.98 118.01 222.95 135.75 289.09C136.85 293.16 138.13 297.13 139.59 300.99L188.94 271.38L174.07 231.95L220.67 184.08L279.57 171.39L296.62 192.38L269.47 219.88L245.79 227.33L228.87 244.72L237.16 267.79C237.16 267.79 253.95 285.63 253.98 285.64L277.7 279.33L294.58 260.79L331.44 249.12L342.42 273.82L304.39 320.45L240.66 340.63L212.08 308.81L162.26 338.7C187.8 367.78 226.2 383.93 266.01 380.56L277.54 423.55C218.13 431.41 160.1 406.82 124.05 361.64L85.6399 384.68C136.25 451.17 223.84 484.11 309.61 461.16C371.35 444.64 419.4 402.56 445.42 349.38L488.06 364.88C457.17 431.16 398.22 483.82 321.99 504.22Z" />
          </symbol>
        </defs>
      </svg>

      <h1 className="title">Downloads</h1>

      <div className="content">
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
              <th>Forge</th>
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
                          <Icon
                            path={mdiArrowRightBold}
                            color="#ffffff"
                            size={"20px"}
                          />
                          Mod Guide
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

export default Index;
