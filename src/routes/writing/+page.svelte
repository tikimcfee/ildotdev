<script>
	import { byInner } from '$lib/by.js';
	let { data } = $props();
</script>

<svelte:head>
	<title>writing — ivanlugo.dev</title>
</svelte:head>

<main>
	<h1 class="sr-only">writing</h1>

	<section>
		<p>Notes and writeups. Things I think about, care about, want to share.</p>
	</section>

	<section>
		<span class="label">pieces</span>

		<!-- This list builds itself from src/content/writing/*.md (newest first),
		     merged with the `extra` routes in +page.server.js. To add a piece:
		     `npm run write -- "Title"`, write it, `npm run ship -- "msg"`. -->
		{#each data.posts as p (p.href)}
			<a class="entry" href={p.href}>
				{#if p.by}<span class="by">{@html byInner(p.by)}</span>{/if}
				<div class="meta">{p.date}</div>
				<h3>{p.title}</h3>
				<p class="gloss">{p.gloss}</p>
			</a>
		{/each}
	</section>
</main>
