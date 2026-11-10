import { readFileSync } from "node:fs";

/** Build settings read from `tool.json`. */
export type Config = { targets: string[]; outDir: string };

/** Used for any key the config file leaves out. */
const DEFAULTS: Config = { targets: ["all"], outDir: "dist" };

export function loadConfig(path: string): Config {
  const text = readFileSync(path, "utf8");
  const parsed = JSON.parse(text) as Config;
  return { ...DEFAULTS, ...parsed, targets: parsed.targets };
}
