# ivanlugo.dev

Personal site. Static HTML/CSS, no build step.

Deployed to `nerdcave` (Hetzner) and served via Caddy at `ivanlugo.dev`.

## History

Extracted from [`tikimcfee/glyph3d-js`](https://github.com/tikimcfee/glyph3d-js)
on 2026-05-12 via `git-filter-repo` (source branch `experiment/webgpu-v4`).
The homepage, resume, writing, projects pages, and the Programmer's Oath
previously lived in that repo's root; they now live here, and `glyph3d-js`
keeps the IDE / rendering codebase.

## Layout

```
index.html              homepage
styles.css              site styles
favicon.ico
resume/index.html
projects/index.html
writing/index.html
writing/building-glyph3d.html
oath.html               the Programmer's Oath (2025 revision)
```

## Pointers to glyph3d-js

`index.html` and `projects/index.html` link to the IDE and its demos under
`/ide/...` (e.g. `/ide`, `/ide/tools/bake-atlas.html`,
`/ide/examples/word-wall/`). Path-based hosting: Caddy on `nerdcave` serves
this repo at `/` and the glyph3d-js deployment at `/ide/`.
