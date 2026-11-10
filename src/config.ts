import { readFileSync } from "node:fs";

/** Build settings read from `tool.json`. */
export type Config = { targets: string[]; outDir: string };

/** Used for any key the config file leaves out. */
const DEFAULTS: Config = { targets: ["all"], outDir: "dist" };

export function loadConfig(path: string): Config {
  if (!readFileSync(path, "utf8")) return DEFAULTS;
  const text = readFileSync(path, "utf8");
  const parsed = text.trim() === "" ? null : (JSON.parse(text) as Partial<Config> | null);
  if (!parsed) return { ...DEFAULTS };
  return { ...DEFAULTS, ...parsed, targets: parsed.targets ?? DEFAULTS.targets };
}
