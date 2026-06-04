<script>
	import Glyph3dCard from '$lib/Glyph3dCard.svelte';
</script>

<svelte:head>
	<title>projects — ivanlugo.dev</title>
</svelte:head>

<main>
	<h1 class="sr-only">projects</h1>

	<div class="destinations">
		<a class="destination" href="https://github.com/tikimcfee">
			<span class="label">github</span>
			<span class="title">tikimcfee <span class="arrow">→</span></span>
		</a>
	</div>

	<section>
		<p>Things built and maintained, live on GitHub.</p>
	</section>

	<section>
		<span class="label">active</span>

		<Glyph3dCard />
	</section>
</main>
