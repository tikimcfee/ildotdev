<!-- The glyph3d card. Used on home and /projects so both stay identical and
     afford BOTH destinations — the live product and the source — rather than
     one card linking different places depending on the page. The card box
     itself isn't a link (it can't be, with two links inside); the two arrow
     affordances are the click targets. -->
<div class="entry glyph3d">
	<h3>glyph3d</h3>
	<p class="gloss">GPU-instanced 3D text rendering for Three.js — thousands of glyphs in a single draw call.</p>
	<div class="links">
		<a href="https://glyph3d.dev">glyph3d.dev <span class="arrow">→</span></a>
		<a href="https://github.com/tikimcfee/glyph3d-js">source <span class="arrow">→</span></a>
	</div>
</div>

<style>
	/* The card box is not itself a link (two affordances live inside it). */
	.glyph3d { cursor: default; }
	.glyph3d .links {
		display: flex;
		gap: 1.5rem;
		margin-top: 0.7rem;
		font-family: var(--mono);
		font-size: 0.8rem;
	}
	.glyph3d .links a {
		color: var(--accent);
		border-bottom: 0;
	}
	.glyph3d .links .arrow { transition: margin-left 120ms; }
	.glyph3d .links a:hover .arrow { margin-left: 0.3rem; }
</style>
