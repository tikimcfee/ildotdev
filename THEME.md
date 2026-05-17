# THEME — espresso & sage

The site's design system. One stylesheet (`/styles.css`), one script
(`/nav.js`), a handful of composable components. No build step.

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
Already at the top of every page. Mark one item `class="active"`.
```html
<nav class="bar">
  <a href="/" class="active">home</a>
  <a href="/projects/">projects</a>
  ...
</nav>
```

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
Project, writing piece, or any titled list item.
```html
<div class="entry">
  <div class="meta">2026-04</div>          <!-- optional -->
  <h3><a href="...">title</a></h3>
  <p class="gloss">one-line description.</p>
</div>
```
Stack multiple `.entry` blocks; they auto-divide with hairlines.

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

1. `cp writing/_template.html writing/your-slug.html`
2. Fill in `[title]`, `YYYY-MM`, and the article body.
3. Open `writing/index.html` and replace the `piece-1` slot with a real `.entry` pointing at your new piece.

---

## Adding a new top-level page

1. Copy any existing top-level page (e.g. `projects/index.html`).
2. Update the `<title>` and `<nav>` (give the new page's link `class="active"`).
3. Add a link to the new page inside the `<nav class="bar">` on **every** page (it's duplicated by design — there's no template system).

---

## Changing the palette

1. Edit `:root` in `/styles.css`. That's the only place colors live.
2. Visit `/style/` and eyeball every component on the new palette.
3. Re-verify contrast for `--fg`, `--dim`, `--accent` against `--bg`.

If you want to prototype multiple palettes side-by-side again, the
old pattern was a `drafts/` directory with sub-folders per palette
sharing a `_palette.css` — that scaffold is gone but easy to rebuild.

---

## Conventions

- **No build step.** Edit, commit, push, pull on box. See root `CLAUDE.md` for deploy.
- **No JS frameworks.** One tiny script (`/nav.js`) for nav scroll-to-active. Anything else needs a strong reason.
- **Resist tooling.** If a change wants a bundler or templating engine, that's usually a signal to do less, not more.
- **Resume and oath are their own worlds.** They have their own inline styles and don't pull `/styles.css`. Don't try to harmonize them unless you're rewriting both intentionally.
