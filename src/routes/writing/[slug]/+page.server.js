import { error } from '@sveltejs/kit';
import { getPost, getSlugs } from '$lib/writing.server.js';

// Enumerate every markdown piece so adapter-static prerenders each one.
export function entries() {
	return getSlugs().map((slug) => ({ slug }));
}

export function load({ params }) {
	const post = getPost(params.slug);
	if (!post) error(404, `no writing piece: ${params.slug}`);
	return { post };
}
