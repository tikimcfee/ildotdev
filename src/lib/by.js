// Provenance chip inner markup — who wrote a piece. Client-safe (no marked),
// shared by the writing index and each piece's byline. "by" + the separators
// stay neutral via CSS; only the author word(s) take the human/ai colors.
// See .by / .by-human / .by-ai in static/styles.css.
export function byInner(by) {
	switch (by) {
		case 'human':
			return '<span class="by-human">human</span>';
		case 'ai':
			return '<span class="by-ai">ai</span>';
		case 'human+ai':
			return '<span class="by-human">human</span> + <span class="by-ai">ai</span>';
		default:
			return '';
	}
}
