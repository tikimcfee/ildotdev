// The writing store. Every piece is one markdown file in
// src/content/writing/<slug>.md with simple `key: value` frontmatter
// (title, date, by, gloss, optional headline). The body is plain markdown;
// raw HTML passes straight through marked, so asides (<div class="aside">…)
// and interactive embeds (<div class="embed" data-embed="NAME">) just work.
//
// This file is .server.js so marked never reaches the client bundle — the
// site stays prerendered static HTML that reads fine with JS off.
import { marked } from 'marked';

// Eager raw import: at build time Vite hands us every piece's source text.
const files = import.meta.glob('/src/content/writing/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

// Minimal frontmatter: a leading `---` block of `key: value` lines.
// Values may be optionally quoted. No YAML engine, no nesting — by design.
function parseFrontmatter(raw) {
	const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
	if (!m) return { meta: {}, body: raw };
	const meta = {};
	for (const line of m[1].split(/\r?\n/)) {
		const mm = /^([\w-]+):\s*(.*)$/.exec(line);
		if (!mm) continue;
		let v = mm[2].trim();
		if (
			(v.startsWith('"') && v.endsWith('"')) ||
			(v.startsWith("'") && v.endsWith("'"))
		) {
			v = v.slice(1, -1);
		}
		meta[mm[1]] = v;
	}
	return { meta, body: raw.slice(m[0].length) };
}

const slugOf = (path) => path.split('/').pop().replace(/\.md$/, '');

const posts = Object.entries(files).map(([path, raw]) => {
	const { meta, body } = parseFrontmatter(raw);
	return { slug: slugOf(path), meta, body };
});

// Newest first; date is a sortable string ("2026-05" / "2026-05-17").
const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

export function getSlugs() {
	return posts.map((p) => p.slug);
}

export function getAllPosts() {
	return posts
		.map(({ slug, meta }) => ({
			slug,
			title: meta.title ?? slug,
			date: meta.date ?? '',
			by: meta.by ?? '',
			gloss: meta.gloss ?? ''
		}))
		.sort(byDateDesc);
}

export function getPost(slug) {
	const p = posts.find((x) => x.slug === slug);
	if (!p) return null;
	return {
		slug: p.slug,
		title: p.meta.title ?? p.slug,
		headline: p.meta.headline ?? p.meta.title ?? p.slug,
		date: p.meta.date ?? '',
		by: p.meta.by ?? '',
		gloss: p.meta.gloss ?? '',
		html: marked.parse(p.body)
	};
}
