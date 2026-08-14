#!/usr/bin/env node
/**
 * Runs a Python script with whichever interpreter this machine actually has.
 *
 * `python3 scripts/optimize-images.py` is correct on macOS and most Linux
 * distros but fails on Windows, where the name resolves to a Microsoft Store
 * stub that exits 9009 with "Python was not found" even when a real Python is
 * installed as `python`. Trying `python3` first and falling back to `python`
 * keeps one set of npm scripts working on every machine.
 *
 * Usage: node scripts/python.mjs <script.py> [args...]
 */
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("usage: node scripts/python.mjs <script.py> [args...]");
  process.exit(2);
}

// Probe with a no-op program and a silenced stdio before handing over the real
// arguments. Probing separately is what keeps the Store stub quiet: it writes
// its "Python was not found" pitch to stderr, so discovering it via the actual
// run would leak that line into every build even after the fallback succeeded.
const spawn = (interpreter, argv, stdio) =>
  spawnSync(interpreter, argv, { stdio, shell: process.platform === "win32" });

for (const interpreter of ["python3", "python"]) {
  // `-V` and not `-c ""`: on Windows the shell joins argv by hand, and an empty
  // quoted argument vanishes in the join, so `-c ""` reaches Python as a bare
  // `-c` and every interpreter fails the probe.
  if (spawn(interpreter, ["-V"], "ignore").status !== 0) continue;
  const result = spawn(interpreter, args, "inherit");
  if (result.error) throw result.error;
  process.exit(result.signal ? 1 : (result.status ?? 1));
}

console.error(
  "No working Python interpreter found (tried python3, python).\n" +
    "Install Python 3 and make sure it is on PATH.",
);
process.exit(1);
