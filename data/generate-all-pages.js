// POSTS_PATH is useful when you want to get the path to a specific file
const path = require("path");
const glob = require("glob").sync;
const matter = require("gray-matter");
const fs = require("fs");

const CONTENT_PATH = path.join(process.cwd(), "content");

let pagesFilePaths = [];
for (let match of glob(path.join(CONTENT_PATH, "**/*.md"))) {
  pagesFilePaths.push(path.relative(CONTENT_PATH, match).replaceAll("\\", "/"));
}

function getPageUrl(pagePath) {
  let slug = pagePath.replace(/\.mdx?$/, "");
  let result;
  if (slug === "index") {
    result = "/";
  } else {
    result = "/" + slug + "/";
  }
  // Normalize slashes
  return result.replaceAll(/\/+/g, "/");
}

function readPage(pagePath) {
  const postFilePath = path.join(CONTENT_PATH, pagePath);
  const source = fs.readFileSync(postFilePath);
  return matter(source);
}

module.exports = function () {
  const pages = [];

  for (let pagePath of pagesFilePaths) {
    const { data } = readPage(pagePath);
    let { item_ids: itemIds, title, categories } = data;
    itemIds ??= [];
    categories ??= [];

    pages.push({
      path: pagePath,
      url: getPageUrl(pagePath),
      title,
      categories,
      itemIds,
    });
  }

  console.log(`Generated all-pages.json with ${pages.length} entries.`);

  return {
    cacheable: true,
    code: JSON.stringify(pages),
    contextDependencies: [CONTENT_PATH],
  };
};
