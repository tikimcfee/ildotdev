<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	const links = [
		{ href: '/', label: 'home' },
		{ href: '/projects/', label: 'projects' },
		{ href: '/writing/', label: 'writing' },
		{ href: '/work/', label: 'work' }
	];

	let bar;
	// Center the active item in view on load (was nav.js, for the mobile strip).
	onMount(() => {
		bar?.querySelector('a.active')?.scrollIntoView({ inline: 'center', block: 'nearest' });
	});
</script>

<nav class="bar" bind:this={bar}>
	{#each links as l}
		<a href={l.href} class:active={page.url.pathname === l.href}>{l.label}</a>
	{/each}
</nav>
