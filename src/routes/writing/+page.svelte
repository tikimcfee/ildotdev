<svelte:head>
	<title>writing — ivanlugo.dev</title>
</svelte:head>

<main>
	<h1 class="sr-only">writing</h1>

	<section>
		<p>Notes and writeups — mostly on the things in <a href="/projects/">projects</a>: rendering, performance, and the road from idea to shipped.</p>
	</section>

	<section>
		<span class="label">pieces</span>

		<a class="entry" href="/prior-art/">
			<span class="by"><span class="by-ai">ai</span></span>
			<div class="meta">2026-05</div>
			<h3>prior art: rendering a whole codebase, spatially</h3>
			<p class="gloss">A field survey of every tool that has tried to render an entire repository as one navigable thing — code cities, VR IDEs, source-in-3D prototypes, and the GPU text engines underneath. Honest status, real links.</p>
		</a>

		<!-- To add a piece: create src/routes/writing/your-slug/+page.svelte
		     (it inherits the shared nav), then add an <a class="entry"> here:

		     <a class="entry" href="/writing/your-slug/">
		       <div class="meta">2026-05</div>
		       <h3>piece title</h3>
		       <p class="gloss">one-line description.</p>
		     </a>

		     static/writing/building-glyph3d.html exists but is unlisted —
		     its body was Claude-drafted, awaiting your call to keep/rewrite/cut. -->
	</section>
</main>
