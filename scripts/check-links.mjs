#!/usr/bin/env node
/**
 * Internal link checker for the built site.
 *
 * Walks every HTML file in dist/ and verifies that each internal link and
 * asset reference actually resolves:
 *
 *   - page links   (/about, /about/)      -> a built HTML file exists
 *   - assets       (/brand.css, *.webp)   -> the file exists in dist/
 *   - fragments    (#exam-picker)         -> an element with that id exists
 *                                            on the page being linked to
 *
 * Fragment checking is the point: a link can return HTTP 200 and still be
 * broken because the anchor it targets does not exist, or because a <base>
 * tag silently re-resolves it to another page. Both happened on this site.
 *
 * External URLs (http, mailto, tel, data) are not checked -- that needs
 * network access and would make the build flaky.
 *
 * Usage: node scripts/check-links.mjs [distDir]
 * Exits 1 if any link is broken, so it can gate a build or CI run.
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, posix } from 'node:path';

const DIST = process.argv[2] ?? 'dist';

if (!existsSync(DIST)) {
  console.error(`link-check: "${DIST}" does not exist -- run the build first.`);
  process.exit(1);
}

/** Recursively collect files under dir, optionally filtered by extension. */
function walk(dir, ext) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full, ext));
    else if (!ext || full.endsWith(ext)) out.push(full);
  }
  return out;
}

const htmlFiles = walk(DIST, '.html');
const allFiles = new Set(walk(DIST).map((f) => '/' + relative(DIST, f).split(/[\\/]/).join('/')));

/** Collect every id="..." and name="..." anchor target on a page. */
const idsByPage = new Map();
const pageSource = new Map();
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  pageSource.set(file, html);
  const ids = new Set();
  for (const m of html.matchAll(/\bid="([^"]+)"/g)) ids.add(m[1]);
  for (const m of html.matchAll(/<a[^>]+\bname="([^"]+)"/g)) ids.add(m[1]);
  idsByPage.set(file, ids);
}

/** Map a site path like /about or /about/ to the HTML file that serves it. */
function htmlFileForPath(urlPath) {
  const clean = urlPath.replace(/\/+$/, '');
  for (const candidate of [
    join(DIST, clean, 'index.html'),
    join(DIST, `${clean}.html`),
    join(DIST, clean === '' ? 'index.html' : ''),
  ]) {
    if (candidate && existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

/** True if a non-HTML asset exists in dist/. */
function assetExists(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  return allFiles.has(urlPath) || allFiles.has(decoded);
}

const problems = [];
const ATTR = /(?:href|src)="([^"]*)"/g;
const SKIP = /^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i;
const NOINDEX = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i;

// Pages excluded from search are also excluded here: they are unshipped
// work-in-progress, so links out of them may legitimately not exist yet.
// The count is reported so this never fails silently.
const skipped = [];

for (const file of htmlFiles) {
  const pagePath = '/' + relative(DIST, file).split(/[\\/]/).join('/');
  const html = pageSource.get(file);

  if (NOINDEX.test(html)) {
    skipped.push(pagePath);
    continue;
  }

  for (const [, raw] of html.matchAll(ATTR)) {
    const value = raw.trim();
    if (!value || SKIP.test(value) || value === '#') continue;

    const [rawPath, fragment] = value.split('#');

    // Bare fragment -- must exist on this same page.
    if (rawPath === '') {
      if (fragment && !idsByPage.get(file).has(decodeURIComponent(fragment))) {
        problems.push(`${pagePath}  ->  #${fragment}  (no element with that id on this page)`);
      }
      continue;
    }

    // Only absolute site paths are checked; relative paths are ambiguous
    // without a <base>, and this site deliberately has none.
    if (!rawPath.startsWith('/')) {
      problems.push(`${pagePath}  ->  ${value}  (relative URL; use an absolute path or a bare #fragment)`);
      continue;
    }

    const target = htmlFileForPath(rawPath);
    if (target) {
      if (fragment && !idsByPage.get(target).has(decodeURIComponent(fragment))) {
        const shown = '/' + posix.relative(DIST, target.split(/[\\/]/).join('/'));
        problems.push(`${pagePath}  ->  ${value}  (page exists at ${shown}, but has no id "${fragment}")`);
      }
      continue;
    }

    if (!assetExists(rawPath)) {
      problems.push(`${pagePath}  ->  ${value}  (no page or file in ${DIST})`);
    }
  }
}

const linkCount = htmlFiles.reduce(
  (n, f) => n + [...pageSource.get(f).matchAll(ATTR)].filter(([, v]) => v && !SKIP.test(v.trim())).length,
  0,
);

const note = skipped.length ? ` (skipped ${skipped.length} noindex page(s): ${skipped.join(', ')})` : '';

if (problems.length) {
  const unique = [...new Set(problems)].sort();
  console.error(`\nlink-check: ${unique.length} broken link(s)${note}\n`);
  for (const p of unique) console.error('  ' + p);
  console.error('');
  process.exit(1);
}

console.log(
  `link-check: OK -- ${linkCount} internal links across ` +
    `${htmlFiles.length - skipped.length} pages${note}`,
);
