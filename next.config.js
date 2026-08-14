// eslint-disable-next-line @typescript-eslint/no-require-imports -- this file is CommonJS
const { execSync } = require("node:child_process");

/**
 * Date of the most recent commit, as YYYY-MM-DD, inlined at build time for the
 * footer's "Last updated" line.
 *
 * It is the commit date rather than the build clock for the same reason
 * sitemap.ts stamps no lastmod: a rebuild that changed nothing should not
 * advance the date. Returns "" when git is unavailable or this is not a
 * checkout (a source tarball, a shallow export), and the footer then renders
 * nothing rather than a wrong date.
 */
function lastCommitDate() {
  try {
    return execSync("git log -1 --format=%cs", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_LAST_UPDATED: lastCommitDate(),
  },
};

module.exports = nextConfig;
