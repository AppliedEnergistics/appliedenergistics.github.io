import matter, { GrayMatterFile } from "gray-matter";
import path from "path";
import fs from "fs";
import { sync as glob } from "glob";

// POSTS_PATH is useful when you want to get the path to a specific file
export const CONTENT_PATH = path.join(process.cwd(), "content");

export let pagesFilePaths: string[] = [];
for (let match of glob(path.join(CONTENT_PATH, "**/*.md"))) {
  pagesFilePaths.push(path.relative(CONTENT_PATH, match).replaceAll("\\", "/"));
}

export function getPageUrl(pagePath: string): string {
  let slug = pagePath.replace(/\.mdx?$/, "");
  let result: string;
  if (slug === "index") {
    result = "/";
  } else {
    result = "/" + slug + "/";
  }
  // Normalize slashes
  return result.replaceAll(/\/+/g, "/");
}

export function readPage(pagePath: string): GrayMatterFile<Buffer> {
  const postFilePath = path.join(CONTENT_PATH, pagePath);
  const source = fs.readFileSync(postFilePath);
  return matter(source);
}
