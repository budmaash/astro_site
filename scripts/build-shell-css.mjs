#!/usr/bin/env node
/**
 * Post-build: slim and fingerprint the legacy Squarespace stylesheets.
 *
 * The layout links six files from public/sqs-shell/ (about 1.7 MB raw, most of
 * it rules for Squarespace features this site never renders). They block
 * first paint on every page, and their fixed filenames mean they can never be
 * cached long-term.
 *
 * This script runs after `astro build` and:
 *   1. concatenates the six files in their original cascade order,
 *   2. drops every rule whose selectors match nothing in the built site
 *      (PurgeCSS, scanning all HTML -- inline scripts included -- and JS),
 *   3. writes the result to dist/_astro/sqs-shell.<hash>.css, and
 *   4. swaps the six <link> tags in every page for one link to that file,
 *      at the position of the first, so the cascade order is unchanged.
 *
 * Because it scans the built output, a class used on a new page is kept
 * automatically. Classes that only ever appear at runtime from a script
 * outside dist/ would need adding to SAFELIST.
 *
 * Usage: node scripts/build-shell-css.mjs [distDir]
 */

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { PurgeCSS } from 'purgecss';

const DIST = process.argv[2] ?? 'dist';

// Cascade order -- must match the <link> order in SquarespaceShellLayout.astro.
const SHELL_FILES = [
  'user-account-core-deec763d109d5251-min.en-US.css',
  'website.components.code.styles.css',
  'website.components.html.styles.css',
  'website.components.button.styles.css',
  'site.css',
  'static.css',
];

// Toggled by scripts but never present in the markup as written.
const SAFELIST = { standard: [], deep: [], greedy: [] };

// Read HTML for selectors only from tags (names and attributes) and inline
// scripts. Visible text can't put a class on an element, and scanning it let
// ordinary words such as "events" or "bright" in the SAT vocabulary list keep
// large Squarespace rule blocks that match nothing.
const htmlExtractor = (content) => {
  const markup = [
    ...content.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/gi),
    ...content.matchAll(/<[^>]+>/g),
  ].map(([match]) => match).join(' ');
  return markup.match(/[\w-/:]+(?<!:)/g) ?? [];
};

if (!existsSync(DIST)) {
  console.error(`shell-css: "${DIST}" does not exist -- run the build first.`);
  process.exit(1);
}

const walk = (dir, ext) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path, ext);
    return entry.name.endsWith(ext) ? [path] : [];
  });

const htmlFiles = walk(DIST, '.html');
const jsFiles = walk(DIST, '.js');

const original = SHELL_FILES.map((name) => readFileSync(join(DIST, 'sqs-shell', name), 'utf8')).join('\n');

const [purged] = await new PurgeCSS().purge({
  content: [...htmlFiles, ...jsFiles],
  css: [{ raw: original }],
  safelist: SAFELIST,
  extractors: [{ extractor: htmlExtractor, extensions: ['html'] }],
});

const css = purged.css;
const hash = createHash('sha256').update(css).digest('base64url').slice(0, 10);
const href = `/_astro/sqs-shell.${hash}.css`;
writeFileSync(join(DIST, href), css);

const linkPattern = (name) =>
  new RegExp(`<link[^>]*href="/sqs-shell/${name.replace(/\./g, '\\.')}"[^>]*>\\s*`, 'g');

let rewritten = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const first = html.search(linkPattern(SHELL_FILES[0]));
  if (first === -1) continue;

  let out = html.slice(0, first) + `<link rel="stylesheet" href="${href}">` + html.slice(first);
  for (const name of SHELL_FILES) out = out.replace(linkPattern(name), '');
  writeFileSync(file, out);
  rewritten++;
}

const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(0)} KB`;
console.log(`shell-css: ${kb(original)} -> ${kb(css)} (${href}), ${rewritten} page(s) relinked`);
