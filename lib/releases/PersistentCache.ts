import { existsSync, readFileSync, writeFileSync } from "node:fs";

/**
 * Maps tag name to release information.
 */
export default class PersistentCache<T> {
  private readonly root: Record<string, T>;

  constructor(private readonly path: string) {
    this.root = {};

    if (!existsSync(this.path)) {
      console.info("Initializing new metadata cache");
    } else {
      console.info("Loading metadata cache from %s", this.path);
      const modIndexJson = readFileSync(this.path, {
        encoding: "utf-8",
      });
      // This ensures new properties in this.root are taken from the default instead of being undefined
      Object.assign(this.root, JSON.parse(modIndexJson));
    }
  }

  keys(): string[] {
    return Object.keys(this.root);
  }

  has(key: string) {
    return this.get(key) !== undefined;
  }

  get(key: string): T | undefined {
    return this.root[key];
  }

  set(key: string, data: T) {
    this.root[key] = data;
  }

  save() {
    const json = JSON.stringify(this.root, null, 2);
    writeFileSync(this.path, json, { encoding: "utf-8" });
  }
}
