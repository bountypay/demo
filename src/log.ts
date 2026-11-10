import { readFileSync } from "node:fs";

export function parseLog(path: string): Entry[] {
  return readFileSync(path, "utf8")
    .split("\n")
    .filter(Boolean)
    .map(parseLine);
}

export interface Entry {
  time: string;
  level: string;
  message: string;
}

/** Parses one `<time> <level> <message>` line. */
export function parseLine(line: string): Entry {
  const [time = "", level = "", ...rest] = line.split(" ");
  return { time, level, message: rest.join(" ") };
}
