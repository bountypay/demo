#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { loadConfig } from "./config.ts";

const USAGE = "usage: tool build [--dry-run] [--config <path>]";

function main(argv: string[]): number {
  const [command, ...rest] = argv;
  if (command !== "build") {
    console.error(USAGE);
    return 1;
  }

  let configPath = "tool.json";
  let dryRun = false;
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    const next = rest[i + 1];
    if (arg === "--dry-run") {
      dryRun = true;
    } else if (arg === "--config" && next !== undefined) {
      configPath = next;
      i++;
    } else {
      console.error(USAGE);
      return 1;
    }
  }

  const config = loadConfig(configPath);
  for (const target of config.targets) {
    const out = join(config.outDir, `${target}.json`);
    if (dryRun) {
      console.log(`would build ${target} -> ${out}`);
      continue;
    }
    mkdirSync(config.outDir, { recursive: true });
    writeFileSync(out, JSON.stringify({ target, builtAt: new Date().toISOString() }, null, 2) + "\n");
    console.log(`built ${target} -> ${out}`);
  }
  return 0;
}

process.exitCode = main(process.argv.slice(2));
