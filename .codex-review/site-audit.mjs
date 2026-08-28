import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const ignoredDirectories = new Set([".git", "cloudflare", "node_modules"]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".") || ignoredDirectories.has(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));
const errors = [];
const warnings = [];
const idsByFile = new Map();

function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
      .map((match) => [match[1].toLowerCase(), match[2] ?? match[3] ?? ""]),
  );
}

function record(collection, file, message) {
  collection.push(`${relative(file)}: ${message}`);
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const ids = [...html.matchAll(/\sid=(?:"([^"]+)"|'([^']+)')/g)].map((match) => match[1] ?? match[2]);
  idsByFile.set(file, new Set(ids));
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  for (const id of new Set(duplicates)) record(errors, file, `duplicate id \"${id}\"`);

  const htmlLang = html.match(/<html\b[^>]*\blang=(?:"([^"]+)"|'([^']+)')/i);
  if (!htmlLang) record(errors, file, "missing html lang attribute");
  if (!/<title>[^<]+<\/title>/i.test(html)) record(errors, file, "missing or empty title");
  if (!/<meta\s+name=["']description["'][^>]+content=["'][^"']+/i.test(html)) {
    record(warnings, file, "missing or empty meta description");
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    if (!("alt" in attrs)) record(errors, file, `image missing alt text (${attrs.src || "unknown source"})`);
    if (attrs.alt === "undefined") record(errors, file, `image has alt=\"undefined\" (${attrs.src || "unknown source"})`);
  }
}

function localTarget(sourceFile, rawUrl) {
  if (!rawUrl || rawUrl.startsWith("#")) return null;
  if (/^(?:mailto:|tel:|javascript:|data:)/i.test(rawUrl)) return null;
  const [withoutHash, fragment = ""] = rawUrl.split("#", 2);
  let clean = decodeURIComponent(withoutHash.split("?", 1)[0]);
  if (/^https?:/i.test(clean)) {
    const absolute = new URL(clean);
    if (absolute.origin !== "https://yutakwing.github.io" || !absolute.pathname.startsWith("/TakWing/")) return null;
    clean = absolute.pathname;
  }
  let target;
  if (clean.startsWith("/TakWing/")) target = path.join(root, clean.slice("/TakWing/".length));
  else if (clean.startsWith("/")) target = path.join(root, clean.slice(1));
  else target = path.resolve(path.dirname(sourceFile), clean || path.basename(sourceFile));
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, "index.html");
  return { target, fragment };
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const canonical = [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)];
  const alternates = [...html.matchAll(/<link\b[^>]*rel=["']alternate["'][^>]*>/gi)]
    .map((match) => attributes(match[0]).hreflang)
    .filter(Boolean);
  if (canonical.length) {
    const expectedAlternates = ["en", "zh-Hant", "zh-Hans", "x-default"];
    for (const hreflang of expectedAlternates) {
      if (!alternates.includes(hreflang)) record(errors, file, `missing hreflang \"${hreflang}\"`);
    }
  }
  for (const match of html.matchAll(/<(?:a|link|script|img|source)\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    const rawUrl = attrs.href ?? attrs.src;
    const resolved = localTarget(file, rawUrl);
    if (!resolved) continue;
    if (!fs.existsSync(resolved.target)) {
      record(errors, file, `broken internal URL \"${rawUrl}\"`);
      continue;
    }
    if (resolved.fragment && resolved.target.endsWith(".html")) {
      const targetIds = idsByFile.get(resolved.target) ?? new Set();
      if (!targetIds.has(resolved.fragment)) {
        record(errors, file, `missing fragment #${resolved.fragment} in ${relative(resolved.target)}`);
      }
    }
  }
}

const localeRoots = ["", "zh-hant", "zh-hans"];
const postCounts = localeRoots.map((locale) => {
  const directory = path.join(root, locale, "posts");
  return fs.readdirSync(directory).filter((file) => file.endsWith(".html")).length;
});
if (!postCounts.every((count) => count === postCounts[0])) {
  errors.push(`post count mismatch: en=${postCounts[0]}, zh-Hant=${postCounts[1]}, zh-Hans=${postCounts[2]}`);
}

for (const locale of localeRoots) {
  const indexFile = path.join(root, locale, "search-index.json");
  let items;
  try {
    items = JSON.parse(fs.readFileSync(indexFile, "utf8"));
  } catch (error) {
    errors.push(`${relative(indexFile)}: invalid JSON (${error.message})`);
    continue;
  }
  if (!Array.isArray(items) || items.length === 0) errors.push(`${relative(indexFile)}: empty search index`);
  for (const item of items) {
    const resolved = localTarget(indexFile, item.href);
    if (!item.title || !item.description || !item.content) {
      record(errors, indexFile, `incomplete search entry for \"${item.href || "unknown"}\"`);
    }
    if (resolved && !fs.existsSync(resolved.target)) {
      record(errors, indexFile, `broken search destination \"${item.href}\"`);
    }
  }
}

console.log(`Audited ${htmlFiles.length} HTML files and ${localeRoots.length} search indexes.`);
console.log(`Post parity: ${postCounts.join(" / ")}.`);
if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  warnings.forEach((warning) => console.log(`- ${warning}`));
}
if (errors.length) {
  console.error(`\nErrors (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log("No structural errors found.");
}
