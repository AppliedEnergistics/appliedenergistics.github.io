import AdmZip from "adm-zip";
import * as toml from "toml";
import * as semver from "semver";
import {ModLoader} from "./types.js";

export type ModMetadata = {
  /**
   * The version number of the mod. May have -beta or -alpha suffixes.
   */
  modVersion: string;
  /**
   * Minecraft versions supported by this release.
   */
  minecraftVersions: string[];
  /**
   * Modloader supported by this release.
   */
  modLoaders: ModLoader[];
};

function arraysHaveSameContent<T>(a: T[], b: T[]) {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((el) => b.includes(el)) && b.every((el) => a.includes(el));
}

function mcToSemver(mcVersion: string): string {
  if (mcVersion.split(".").length === 2) {
    return mcVersion + ".0";
  }
  return mcVersion;
}

function findMinecraftVersions(
  allMinecraftVersions: string[],
  minecraftDependency: string
) {
  // Remove trailing dash from MC versions
  minecraftDependency = minecraftDependency.replaceAll(
    /(\d+(?:\.\d+)*)-/g,
    "$1"
  );

  // Only consider versions that are within the same x.y range since Mods never
  // supported different minors
  const minVersion = semver.minSatisfying(
    allMinecraftVersions,
    minecraftDependency
  );
  const minecraftVersions = allMinecraftVersions.filter(
    (mcVersion) =>
      semver.satisfies(mcToSemver(mcVersion), minecraftDependency) &&
      (!minVersion || semver.satisfies(mcToSemver(mcVersion), "~" + minVersion))
  );
  if (!minecraftVersions.length) {
    throw new Error(`MC Version ${minecraftDependency} didn't match any.`);
  }
  return minecraftVersions;
}

function mergeLoaderResults(
  forgeMetadata: ModMetadata | undefined,
  fabricMetadata: ModMetadata | undefined
): ModMetadata {
  if (forgeMetadata && fabricMetadata) {
    // Make sure they agree
    if (
      forgeMetadata.modVersion !== fabricMetadata.modVersion ||
      !arraysHaveSameContent(
        forgeMetadata.minecraftVersions,
        fabricMetadata.minecraftVersions
      )
    ) {
      throw new Error(
        "Fabric and Forge don't agree: " +
          JSON.stringify(fabricMetadata) +
          " != " +
          JSON.stringify(forgeMetadata)
      );
    }
    return {
      modVersion: fabricMetadata.modVersion,
      minecraftVersions: fabricMetadata.minecraftVersions,
      modLoaders: [...fabricMetadata.modLoaders, ...forgeMetadata.modLoaders],
    };
  } else if (fabricMetadata) {
    return fabricMetadata;
  } else if (forgeMetadata) {
    return forgeMetadata;
  } else {
    throw new Error("mod jar does not contain any mod-loader metadata");
  }
}

export default function extractModMetadata(
  modJarData: ArrayBuffer,
  allMinecraftVersions: string[]
): ModMetadata {
  const zip = new AdmZip(Buffer.from(modJarData));

  // check for different ModLoader metadata
  // Forge >=1.13
  const modsToml = zip.readAsText("META-INF/mods.toml");
  // Forge <1.13
  const mcmodInfo = zip.readAsText("mcmod.info");
  const fabricModInfo = zip.readAsText("fabric.mod.json");

  // For Forge mods, prefer the newer 1.13 format
  let forgeMetadata: ModMetadata | undefined;
  let fabricMetadata: ModMetadata | undefined;
  if (modsToml) {
    const tomlMetadata = toml.parse(modsToml);
    const modVersion = tomlMetadata.mods?.find(
      (e: any) => e.modId === "ae2" || e.modId == "appliedenergistics2"
    )?.version;
    if (!modVersion) {
      throw new Error("Couldn't extract mod version from mods.toml");
    }

    const minecraftVersions: string[] = [];
    const dependencies =
      tomlMetadata.dependencies?.["ae2"] ??
      tomlMetadata.dependencies?.["appliedenergistics2"] ??
      [];
    for (const { modId, versionRange } of dependencies) {
      if (modId === "minecraft") {
        console.info("AE2 %s Forge MC: %s", modVersion, versionRange);

        // Convert to a range that semver actually understands
        const semverConditions: string[] = [];
        let [lower, upper] = versionRange.split(",");
        if (lower.startsWith("[")) {
          lower = lower.substring(1);
          if (lower.endsWith("-")) {
            lower = lower.substring(0, lower.length - 1);
          }
          if (!upper && lower.endsWith("]")) {
            lower = lower.substring(0, lower.length - 1);
          }
          semverConditions.push(">=" + lower);
        } else {
          throw new Error("Cannot parse lower version range: " + lower);
        }
        if (upper) {
          let op: string;
          if (upper.endsWith(")")) {
            op = "<";
          } else if (upper.endsWith("]")) {
            op = "<=";
          } else {
            throw new Error("Cannot parse upper version range: " + upper);
          }
          upper = upper.substring(0, upper.length - 1);
          if (upper.endsWith("-")) {
            upper = upper.substring(0, upper.length - 1);
          }
          semverConditions.push(op + upper);
        }
        const semverCondition = semverConditions.join(" ");
        minecraftVersions.push(
          ...findMinecraftVersions(allMinecraftVersions, semverCondition)
        );
      }
    }

    forgeMetadata = {
      modVersion,
      minecraftVersions,
      modLoaders: [ModLoader.FORGE],
    };
  } else if (mcmodInfo) {
    const mods = JSON.parse(mcmodInfo);
    const { version, mcversion } = mods.find(
      ({ modid }: any) => modid === "appliedenergistics2"
    );
    if (!version || !mcversion) {
      throw new Error("Malformed mcmod.info");
    }

    forgeMetadata = {
      modVersion: version,
      minecraftVersions: [mcversion],
      modLoaders: [ModLoader.FORGE],
    };
  }
  if (fabricModInfo) {
    const metadataRoot = JSON.parse(fabricModInfo);
    const modVersion = metadataRoot["version"];

    const minecraftDependency = metadataRoot.depends.minecraft;
    console.info("AE 2 %s, Fabric MC: %s", modVersion, minecraftDependency);

    const minecraftVersions = findMinecraftVersions(
      allMinecraftVersions,
      minecraftDependency
    );

    fabricMetadata = {
      modVersion,
      modLoaders: [ModLoader.FABRIC],
      minecraftVersions,
    };
  }

  const modMetadata = mergeLoaderResults(forgeMetadata, fabricMetadata);

  console.info(
    "Mod Version: %s, Minecraft Versions: %s, Loaders: %s",
    modMetadata.modVersion,
    modMetadata.minecraftVersions,
    modMetadata.modLoaders
  );

  return modMetadata;
}
