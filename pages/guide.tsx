import { InferGetStaticPropsType } from "next";
import { getGuideVersions } from "../lib/guides";
import { compareMinecraftVersion } from "../lib/util";

type GuideProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Guide({ guides }: GuideProps) {
  return (
    <>
      <h2 className="subtitle is-2">Guide</h2>
      <h3 className="subtitle is-3">In-Game Version</h3>
      Since Minecraft 1.20, AE2 offers an in-game guide.
      <h3 className="subtitle is-3">Browser Version</h3>
      {guides.map((guide) => (
        <div key={guide.minecraftVersion}>
          <a href={guide.url} rel="noopener">
            Minecraft {guide.minecraftVersion}
          </a>
        </div>
      ))}
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
