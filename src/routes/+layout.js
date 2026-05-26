// Static site: prerender everything to plain HTML.
export const prerender = true;
// Emit directory-style URLs (/projects/ -> projects/index.html) to match
// the existing site and Caddy's file_server directory indexes.
export const trailingSlash = 'always';
