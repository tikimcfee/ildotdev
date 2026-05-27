<script>
	// The survey is its own visual world (its own stylesheet, headed for a
	// render lib later). It nests under the root layout, so it inherits the
	// shared <Nav> pill — single source, can't drift from the core pages —
	// and adds the volume bar beneath it.
	import './prior-art.css';
	import PriorArtNav from '$lib/PriorArtNav.svelte';
	let { children } = $props();
</script>

<PriorArtNav />
<p class="provenance"><span class="by by-ai">ai</span> Written by Claude — a research survey, not Ivan's prose.</p>
{@render children()}
