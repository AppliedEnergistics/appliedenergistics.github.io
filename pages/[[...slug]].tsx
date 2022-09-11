import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import ItemLink from "../components/ItemLink";
import RecipeFor from "../components/recipes/RecipeFor";
import CategoryIndex from "../components/CategoryIndex";
import { GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types";
import Head from "next/head";
import {
  CONTENT_PATH,
  getPageUrl,
  pagesFilePaths,
  readPage,
} from "../data/pages";
import MdxLink from "../components/MdxLink";
import { Plugin } from "unified";
import { CONTINUE, visit } from "unist-util-visit";
import { Link } from "mdast";
import path from "path";
import fs from "fs";
import MdxImage from "../components/MdxImage";
import sizeOf from "image-size";
import SubCategories from "../components/SubCategories";
import MdxParagraph from "../components/MdxParagraph";
import InscriberRecipes from "../components/recipes/InscriberRecipes";
import ItemGrid from "../components/ItemGrid";
import ItemIcon from "../components/ItemIcon";
import P2PTunnelTypes from "../components/P2PTunnelTypes";
import remarkSlugs from "remark-slug";
import remarkGfm from "remark-gfm";

const components = {
  a: MdxLink,
  img: MdxImage,
  ItemGrid,
  ItemIcon,
  ItemLink,
  RecipeFor,
  CategoryIndex,
  SubCategories,
  InscriberRecipes,
  p: MdxParagraph,
  P2PTunnelTypes,
};

interface ContentPageProps {
  source: MDXRemoteSerializeResult;
  frontMatter: Record<string, any>;
  pagePath: string;
}

export default function ContentPage({ source, frontMatter }: ContentPageProps) {
  return (
    <>
      <Head>
        <title>AE2 - {frontMatter.title}</title>
      </Head>
      <h1 className="title">{frontMatter.title}</h1>
      <div className="content">
        <MDXRemote {...source} components={components} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string[];
  const pagePath = "/" + (slug?.join("/") ?? "index") + ".md";
  const { content, data } = readPage(pagePath);

  /**
   * This rewrites internal links to markdown files into links that point to the
   * rendered URL of that Markdown file.
   * i.e. [Blah](../some/markdown.md) -> (/some/markdown/).
   */
  const rewriteInternalLinks: Plugin<[]> = function () {
    return (tree) => {
      visit(tree, "link", (node) => {
        const link = node as Link;
        // Resolve .md links
        const [linkPath, fragment] = link.url.split("#");
        if (!linkPath.includes("://") && linkPath.endsWith(".md")) {
          let absolute = path.join(path.dirname(pagePath), linkPath);
          absolute = absolute.replaceAll("\\", "/");

          if (!fs.existsSync(path.join(CONTENT_PATH, absolute))) {
            throw new Error(`Broken link '${linkPath}' in ${pagePath}`);
          }

          link.url = getPageUrl(absolute);
          if (fragment) {
            link.url += "#" + fragment;
          }
        }
      });
    };
  };

  /**
   * Next.JS can't deal with relative paths to images from markdown files.
   * This rewrites them into absolute URLs. Since this skips image optimization,
   * they have to be in the public/ folder.
   */
  const rewriteInternalImages: Plugin<[]> = function () {
    return (tree) => {
      visit(tree, ["element"], (node) => {
        const { tagName, properties } = node as any;
        if (tagName !== "img") {
          return CONTINUE;
        }

        const { src } = properties;
        if (src.startsWith("http://") || src.startsWith("https://")) {
          return CONTINUE;
        }
        let absolute = path.join(path.dirname(pagePath), src);
        absolute = path.join(process.cwd(), absolute);
        if (!fs.existsSync(absolute)) {
          throw new Error(
            `Broken image '${src}' in ${pagePath} (Resolved to '${absolute}')`
          );
        }

        const { width, height } = sizeOf(absolute);
        properties.src =
          "/" +
          path
            .relative(path.join(process.cwd(), "public"), absolute)
            .replaceAll("\\", "/");
        properties.width = width;
        properties.height = height;
        return CONTINUE;
      });
    };
  };

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkSlugs as any, rewriteInternalLinks, remarkGfm],
      rehypePlugins: [rewriteInternalImages],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      pagePath,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = pagesFilePaths
    .map((pagePath) => getPageUrl(pagePath).substr(1).split("/"))
    .map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};
