import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

export async function* parseLog(path: string): AsyncGenerator<Entry> {
  const lines = createInterface({ input: createReadStream(path), crlfDelay: Infinity });
  for await (const line of lines) {
    if (line) yield parseLine(line);
  }
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
