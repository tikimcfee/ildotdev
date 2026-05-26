# THEME — espresso & sage

The site's design system. A single served stylesheet (`/styles.css`,
on disk at `static/styles.css`) plus Svelte components. The site is a
SvelteKit app (`adapter-static`) prerendered to plain static HTML —
`npm run dev` to edit with live reload, `npm run build` to regenerate
the committed `build/`. See root `CLAUDE.md` for build & deploy.

For a live render of every component, visit `/style/` in the browser.

---

## Tokens

All defined in `:root` at the top of `/styles.css`. Change them there
to retheme the whole site.

| Token | Value | Use | Contrast vs `--bg` |
|---|---|---|---|
| `--bg` | `#0e0c08` | background | — |
| `--fg` | `#e6dec9` | body text | ~13:1 · AAA |
| `--dim` | `#a39a7f` | secondary text, nav, glosses | ~7:1 · AAA |
| `--accent` | `#a8a072` | links, labels, active nav | ~6.7:1 · AA+ |
| `--rule` | `#2a261b` | hairlines, borders | decorative |
| `--slot-bg` | `rgba(168,160,114,0.04)` | slot interior tint | — |
| `--slot-border` | `rgba(168,160,114,0.3)` | softened accent for slot left stripe | — |
| `--card-bg` | `rgba(168,160,114,0.02)` | destination + entry resting bg | — |
| `--card-bg-hover` | `rgba(168,160,114,0.05)` | destination + entry hover bg | — |
| `--code-bg` | `rgba(168,160,114,0.08)` | inline `<code>` background | — |
| `--serif` | Iowan Old Style stack | body type | — |
| `--mono` | IBM Plex Mono stack | labels, nav, meta | — |

**Contrast targets:** body text ≥ 7:1 (AAA), secondary text ≥ 4.5:1
(AA), decorative ≥ 3:1. If you swap palette, verify with a tool like
[WebAIM contrast checker](https://webaim.org/resources/contrastchecker/)
before merging.

---

## Components

Every component below has a live preview in `/style/`. Snippets here
are for copy-paste convenience.

### nav.bar
The shared nav is `src/lib/Nav.svelte`, rendered once by the root
`+layout.svelte`. Active state is derived from the current route — no
manual `class="active"`. To add or rename a link, edit the `links`
array in `Nav.svelte` (one place, every page updates). Its CSS still
lives under `nav.bar` in `/styles.css`.
```svelte
const links = [
  { href: '/', label: 'home' },
  { href: '/projects/', label: 'projects' },
  ...
];
```
The prior-art survey reuses this same component via its nested layout,
so its top pill can't drift from the core pages.

### section + label
```html
<section>
  <span class="label">work</span>
  <p>section content.</p>
</section>
```

### destinations
Header cards for prominent app/external links. Used at the top of `/projects/` for IDE and GitHub. Two-column on desktop, stacked on mobile.
```html
<div class="destinations">
  <a class="destination" href="/ide">
    <span class="label">ide</span>
    <span class="title">open the IDE <span class="arrow">→</span></span>
  </a>
  <a class="destination" href="https://github.com/...">
    <span class="label">github</span>
    <span class="title">handle <span class="arrow">→</span></span>
  </a>
</div>
```

### entry
Project, writing piece, or any titled list item. The whole card is the link.
```html
<a class="entry" href="...">
  <div class="meta">2026-04</div>          <!-- optional -->
  <h3>title</h3>
  <p class="gloss">one-line description.</p>
</a>
```
Stack multiple `.entry` blocks; they sit with a small gap between them.

### slot
Placeholder waiting for words. Replace the entire `<div class="slot">…</div>`
with your real content when ready.
```html
<div class="slot" data-name="opening">
  <p>Hint text describing what to write.</p>
  <p class="shape">small mono guidance</p>
</div>
```

### article
For a writing piece. See `/writing/_template.html` for the starter.
```html
<main>
  <h1>piece title</h1>
  <div class="article-date">2026-05</div>
  <article>
    <p>body prose. inline <code>code()</code> works.</p>
    <p class="byline">optional byline note.</p>
  </article>
</main>
```

### helpers
- `.accent` — set any text to the accent color.
- `.sr-only` — visually hidden, screen-reader-accessible. Sub-pages use this for an invisible `<h1>` so the page isn't anonymous to assistive tech.

---

## Adding a writing piece

1. Create `src/routes/writing/your-slug/+page.svelte` (inherits the
   shared nav from the layout). Use a `<svelte:head><title>…</title>`
   and the `article` markup below.
2. Add an `<a class="entry">` for it in `src/routes/writing/+page.svelte`,
   pointing at `/writing/your-slug/`.
3. `npm run build` to regenerate `build/`.

(The old `static/writing/_template.html` remains as a plain-HTML
reference, but new pieces are routes.)

---

## Adding a new top-level page

1. Create `src/routes/your-page/+page.svelte`.
2. Add one entry to the `links` array in `src/lib/Nav.svelte` — that's
   the **only** place the nav is defined; every page picks it up.
3. `npm run build`.

---

## Changing the palette

1. Edit `:root` in `static/styles.css` (served at `/styles.css`). That's
   the only place the core palette lives. The prior-art survey has its
   own `:root` in `src/routes/prior-art/prior-art.css`, kept on the same
   espresso & sage values.
2. `npm run build`, then visit `/style/` and eyeball every component.
3. Re-verify contrast for `--fg`, `--dim`, `--accent` against `--bg`.

---

## Conventions

- **Build step (SvelteKit).** `npm run build` prerenders to `build/`, which is committed and served. The box has no Node — it just `git pull`s the built output. See root `CLAUDE.md` for deploy.
- **Keep the output static.** `adapter-static` with full prerender — every page is plain HTML that works without JS. Don't add server routes, runtime data loading, or anything that breaks prerendering.
- **Resist further tooling.** The framework earns its place by killing nav duplication; it's not an invitation to pile on. New dependencies need a strong reason.
- **Resume and oath are their own worlds.** Plain static files in `static/`, their own inline styles, no `/styles.css`. Don't harmonize them unless you're rewriting both intentionally. The prior-art survey is similar — its own stylesheet — but does reuse the shared nav.
