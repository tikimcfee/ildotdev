#!/usr/bin/env node
// Scaffold a new writing piece.  Usage:  npm run write -- "My Piece Title"
// Creates src/content/writing/<slug>.md with frontmatter prefilled, then
// tells you how to preview it live.
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
	console.error('usage: npm run write -- "My Piece Title"');
	process.exit(1);
}

const slug = title
	.toLowerCase()
	.replace(/['’"“”]/g, '')
	.replace(/[^a-z0-9]+/g, '-')
	.replace(/^-+|-+$/g, '');

const root = resolve(fileURLToPath(import.meta.url), '../..');
const file = resolve(root, 'src/content/writing', `${slug}.md`);
if (existsSync(file)) {
	console.error(`✗ already exists: src/content/writing/${slug}.md`);
	process.exit(1);
}

const now = new Date();
const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

const template = `---
title: ${title}
date: ${date}
by: human
gloss:
---

Write here. Plain markdown — one blank line between paragraphs.

Inline \`code\`, **bold**, _italics_, and [links](https://example.com) all work.

> A blockquote, if you want one.

<!-- Images: drop the file under static/ and link it (uncomment with a real file):
![alt text](/writing/${slug}/image.png) -->

<!-- An aside (the grey box): raw HTML passes straight through.
<div class="aside"><p>Side note here.</p></div> -->

<!-- An interactive embed loads a prebuilt bundle from static/embeds/NAME/:
<div class="embed" data-embed="NAME"></div> -->
`;

mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, template);

console.log(`✓ created src/content/writing/${slug}.md`);
console.log('  → fill in the gloss line, then write your piece');
console.log(`  → preview live:  npm run dev   →  http://localhost:5173/writing/${slug}/`);
console.log(`  → publish:       npm run ship -- "writing: add ${title}"`);
