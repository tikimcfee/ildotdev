<script>
	import { byInner } from '$lib/by.js';
	let { data } = $props();
	const { post } = data;
</script>

<svelte:head>
	<title>{post.title} — ivanlugo.dev</title>
</svelte:head>

<main>
	<h1>{post.headline}</h1>
	<div class="article-date">{post.date}</div>
	{#if post.by}
		<p class="provenance"><span class="by">{@html byInner(post.by)}</span></p>
	{/if}

	<article>{@html post.html}</article>
</main>
