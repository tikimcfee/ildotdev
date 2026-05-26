<script>
	import { page } from '$app/state';

	const vols = [
		{ href: '/prior-art/', label: 'prior art' },
		{ href: '/prior-art/rendered-text/', label: 'rendered text' },
		{ href: '/prior-art/code-cities/', label: 'code cities' },
		{ href: '/prior-art/vr-commercial/', label: 'vr & commercial' },
		{ href: '/prior-art/web-generative/', label: 'web & generative' },
		{ href: '/prior-art/gpu-text/', label: 'gpu text' },
		{ href: '/prior-art/positioning/', label: 'positioning' }
	];
</script>

<div class="topbar"><nav>
	{#each vols as v}
		<a href={v.href} class:here={page.url.pathname === v.href}>{v.label}</a>
	{/each}
	<span class="spacer"></span>
	<a href="/ide">↩ glyph3d</a>
</nav></div>
