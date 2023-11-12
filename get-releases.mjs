import { Octokit } from "@octokit/rest";

import AdmZip from "adm-zip";
import fs from "fs";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const repoInfo = {
  owner: "AppliedEnergistics",
  repo: "Applied-Energistics-2",
};

const { data } = await octokit.rest.repos.listReleases({
  ...repoInfo,
  per_page: 50,
});

// Find the latest release from main that has javadocs attached
const mainRelease = data.find((r) => {
  return (
    (r.target_commitish === "master" || r.target_commitish === "main") &&
    r.assets.find((a) => a.name.endsWith("-javadoc.jar"))
  );
});

if (!mainRelease) {
  throw new Error("Couldn't find latest master/main release!)");
}

// Find the javadoc jar
const javadocJar = mainRelease.assets.find((a) =>
  a.name.endsWith("-javadoc.jar")
);
if (!javadocJar) {
  throw new Error("No javadoc asset found!");
}

const javadocJarAsset = await octokit.repos.getReleaseAsset({
  ...repoInfo,
  asset_id: javadocJar.id,
  headers: {
    accept: "application/octet-stream",
  },
});

console.log("Downloaded", javadocJar.name);

const zip = new AdmZip(Buffer.from(javadocJarAsset.data));
fs.mkdirSync("public/javadoc", { recursive: true });
zip.extractAllTo("public/javadoc/", true);

// Grab API.md from Repository.
const apiContent = await octokit.repos.getContent({
  ...repoInfo,
  path: "API.md",
  headers: {
    accept: "application/vnd.github.v3.raw",
  },
});
// fs.writeFileSync("content/api.md", apiContent.data);
