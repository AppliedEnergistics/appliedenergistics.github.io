import { InferGetStaticPropsType } from "next";
import { getGuideVersions } from "../lib/guides";
import { compareMinecraftVersion } from "../lib/util";
import openGuideImage from "./open_guide_tooltip.png";
import openGuideGuiImage from "./open_guide_gui.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Icon from "@mdi/react";
import {
  mdiBookOpenPageVariant,
  mdiDiscord,
  mdiDownload,
  mdiHome,
} from "@mdi/js";
import ButtonBar from "../components/ButtonBar";

type GuideProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Guides({ guides }: GuideProps) {
  return (
    <>
      <h1 className="title">Guides</h1>

      <ButtonBar />

      <div className="content">
        <h3 className="subtitle is-3">In-Game Version</h3>
        <div className="box">
          <p>Since Minecraft 1.20, AE2 offers an in-game guide.</p>
          <p>
            While hovering over an item that has a guide page, hold the <b>W</b>{" "}
            key to open the corresponding guide page.
            <br />
            <Image src={openGuideImage} alt={""} />
          </p>
          <p>
            Most AE2 user interfaces will also offer a help button to open the
            most relevant guide page.
            <br />
            <Image src={openGuideGuiImage} alt={""} />
          </p>
        </div>

        <h3 className="subtitle is-3">Browser Version</h3>
        <div className="box">
          <p>
            The guide is also accessible directly from your web browser. Pick
            the most applicable Minecraft version below.
          </p>
          <div
            className="is-inline-flex is-flex-direction-column"
            style={{ gap: "10px" }}
          >
            {guides.map((guide) => (
              <a
                href={guide.url}
                rel="noopener"
                className="button is-large is-align-self-stretch"
                key={guide.minecraftVersion}
              >
                Minecraft {guide.minecraftVersion}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  let guides = await getGuideVersions();
  guides.sort((a, b) =>
    compareMinecraftVersion(b.minecraftVersion, a.minecraftVersion),
  );
  return { props: { guides } };
};
