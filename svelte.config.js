import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			// /ide, /prior-art, /resume, /oath, /downloads are served by Caddy
			// or as static files — not SvelteKit routes. Don't fail the build
			// when the crawler can't resolve them; everything else must resolve.
			handleHttpError: ({ path, message }) => {
				const external = ['/ide', '/prior-art', '/resume', '/oath', '/downloads'];
				if (external.some((p) => path === p || path.startsWith(p + '/') || path.startsWith(p))) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
