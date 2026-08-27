import { getAllPosts } from '$lib/writing.server.js';

// Pieces that live as their own routes (not markdown files) but still belong
// in the writing index. Keep this list short — it's the manual escape hatch.
const extra = [
	{
		slug: 'prior-art',
		href: '/prior-art/',
		title: 'prior art: rendering a whole codebase, spatially',
		date: '2026-05',
		by: 'ai',
		gloss: 'A field survey of every tool that has tried to render an entire repository as one navigable thing — code cities, VR IDEs, source-in-3D prototypes, and the GPU text engines underneath. Honest status, real links.'
	}
];

export function load() {
	const posts = getAllPosts().map((p) => ({ ...p, href: `/writing/${p.slug}/` }));
	return {
		posts: [...posts, ...extra].sort((a, b) =>
			a.date < b.date ? 1 : a.date > b.date ? -1 : 0
		)
	};
}
