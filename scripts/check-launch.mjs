// Runs before every build ("prebuild"). While the site is a draft (site.launched = false) it only
// reports. Once launched, it FAILS the build if any unconfirmed data is still in the site:
// [PENDIENTE]/[PENDING] markers, the placeholder phone or the example domain.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const siteFile = readFileSync(join(root, "src/config/site.ts"), "utf8");
const launched = /launched:\s*true/.test(siteFile);

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(name) ? [p] : [];
  });
}

const problems = [];
for (const file of files(join(root, "src"))) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (/\[(PENDIENTE|PENDING)\b/.test(line)) problems.push(`${file.slice(root.length)}:${i + 1}  ${line.trim().slice(0, 90)}`);
    });
}
if (siteFile.includes('"+34000000000"')) problems.push("src/config/site.ts  phone is still the placeholder +34000000000");
if (siteFile.includes("calipro.example")) problems.push("src/config/site.ts  url is still the example domain");

if (!problems.length) {
  console.log("check-launch: no pending data.");
} else if (launched) {
  console.error(`check-launch: site.launched is true but ${problems.length} pending item(s) remain:\n  ${problems.join("\n  ")}`);
  process.exit(1);
} else {
  console.log(`check-launch: draft mode, ${problems.length} pending item(s) (the build continues).`);
}
