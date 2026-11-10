import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { loadConfig } from "./config.ts";

const fixture = (name: string) => join(import.meta.dirname, "..", "test", "fixtures", name);
const tmp = join(mkdtempSync(join(tmpdir(), "tool-")), "tool.json");

test("fills in outDir from the defaults", () => {
  writeFileSync(tmp, JSON.stringify({ targets: ["cli"] }));
  const config = loadConfig(tmp);
  assert.equal(config.outDir, "dist");
  assert.deepEqual(config.targets, ["cli"]);
});

test("reads targets", () => {
  assert.deepEqual(loadConfig(fixture("targets.json")).targets, ["web"]);
});

test("an empty file falls back to the defaults", () => {
  writeFileSync(tmp, "");
  assert.deepEqual(loadConfig(tmp), { targets: ["all"], outDir: "dist" });
});
