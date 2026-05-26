# CLAUDE.md — ildotdev

Every claim below is backed by a command and the output it produced when this
file was last updated. Re-run the command to get current truth; if reality has
drifted, update the captured block (and the date) rather than rewriting prose.

`# captured 2026-05-17 01:31 UTC` markers are the last verification.

---

## What this is

`ivanlugo.dev` — Ivan's personal site. **SvelteKit app prerendered to
static HTML** (`@sveltejs/adapter-static`, full prerender). Built locally
with `npm run build`; the prerendered `build/` dir is committed and is
what the box serves — the box has no Node (see Deploy). Sibling to
`~/dev/glyph3d-js/`; extracted from that repo on 2026-05-12. Adopted
SvelteKit on 2026-05-25 to kill nav duplication (one shared `Nav.svelte`).

Node lives at `~/.local/node` (not system-wide). Prepend
`~/.local/node/bin` to PATH before `node`/`npm`:
`export PATH="$HOME/.local/node/bin:$PATH"`.

```
$ git -C ~/dev/ildotdev log --oneline -5
17072e5 prior-art: embed the spatial-codebase field survey
60cd7a8 redesign: descriptive index pages, whole-card links
bf1c1af fix: card-bg/code-bg tokens were self-referential
2b1d268 cleanup: tokenize warm-sage tints used by cards and code
8502213 CLAUDE.md: refresh ls capture, add Design system section
# captured 2026-05-26 02:56 UTC — the SvelteKit migration commit lands on top of these
```

## Repo shape

```
$ ls ~/dev/ildotdev/        # (node_modules, .svelte-kit gitignored)
CLAUDE.md
README.md
THEME.md
build            # committed prerender output — what the box serves
package.json
package-lock.json
src
static
svelte.config.js
vite.config.js

$ find ~/dev/ildotdev/src -type f
src/app.html                              # HTML shell; links /styles.css (not bundled)
src/lib/Nav.svelte                        # the one shared nav — edit links here
src/lib/PriorArtNav.svelte                # prior-art volume bar
src/routes/+layout.js                     # prerender = true, trailingSlash = 'always'
src/routes/+layout.svelte                 # root: <Nav/> + page
src/routes/+page.svelte                   # home
src/routes/projects/+page.svelte
src/routes/writing/+page.svelte
src/routes/work/+page.svelte
src/routes/prior-art/+layout.svelte       # nests under root layout; adds PriorArtNav
src/routes/prior-art/prior-art.css        # survey's own stylesheet (its own world)
src/routes/prior-art/+page.svelte         # survey index
src/routes/prior-art/{rendered-text,code-cities,vr-commercial,web-generative,gpu-text,positioning}/+page.svelte

$ ls ~/dev/ildotdev/static    # served as-is, not prerendered
favicon.ico  nav.js  oath.html  resume/  style/  styles.css  writing/
# (static/style/ = the unlisted styleguide; static/writing/ = building-glyph3d.html
#  draft + _template.html; both still plain static HTML, own inline <nav>)
# captured 2026-05-26 02:56 UTC
```

`package.json` scripts: `npm run dev` (live edit), `npm run build`
(regenerate `build/`), `npm run preview`. No test runner. Always
`npm run build` before committing — `build/` is the deployed artifact.

## Design system

Core styles: `static/styles.css` (served at `/styles.css`, **not** bundled —
single source of truth, linked from `app.html`). The nav is the shared
`src/lib/Nav.svelte`. Theme is *espresso & sage* — warm dark serif,
sage/olive accent. Tokens, contrast targets, and component snippets are in
`THEME.md`. A live render of every component lives at `/style/` (visit
directly; not linked from nav).

- **Add a writing piece:** create `src/routes/writing/<slug>/+page.svelte`,
  then add an `<a class="entry">` for it in `src/routes/writing/+page.svelte`.
- **Add a top-level page:** create `src/routes/<page>/+page.svelte`, then add
  one entry to the `links` array in `src/lib/Nav.svelte` (the only place the
  nav is defined — every page picks it up).
- **Retheme:** edit `:root` in `static/styles.css`; `npm run build`; verify at
  `/style/`. The prior-art survey has its own `:root` in
  `src/routes/prior-art/prior-art.css`, kept on the same values.
- **The "slot" pattern:** the slot CSS still lives in `styles.css` for future
  use, but the current pages ship real descriptive content, not slots.
- **Resume (`/resume/`), Oath (`/oath.html`), and the styleguide (`/style/`)
  are plain static files in `static/`** with their own styles — outside the
  Svelte system. The prior-art survey has its own stylesheet too but **does**
  reuse the shared `Nav.svelte`.

## Sibling project

```
$ ls ~/dev/glyph3d-js/CLAUDE.md ~/.claude/projects/-home-ivan-dev-glyph3d-js/memory/MEMORY.md
/home/ivan/dev/glyph3d-js/CLAUDE.md
/home/ivan/.claude/projects/-home-ivan-dev-glyph3d-js/memory/MEMORY.md
# captured 2026-05-17 01:31 UTC
```

Anything touching the IDE or 3D rendering belongs over there — read its
`CLAUDE.md` and memory dir; don't duplicate that context into this repo. The
link between the two repos is path-based Caddy routing (see below), not a
code dependency.

## Local git state

```
$ cd ~/dev/ildotdev && git remote -v && git status -sb
origin	git@github.com:tikimcfee/ildotdev (fetch)
origin	git@github.com:tikimcfee/ildotdev (push)
## main...origin/main
?? CLAUDE.md
# captured 2026-05-17 01:31 UTC
```

(Local push uses SSH; the box pulls over HTTP — see deploy section.)

## Box health

```
$ ssh nerdcave 'uptime; df -h / | tail -1; systemctl is-active caddy'
 01:31:20 up 49 days,  3:18,  2 users,  load average: 0.00, 0.00, 0.00
/dev/sda1        75G  7.3G   65G  11% /
active
# captured 2026-05-17 01:31 UTC
```

Hetzner box in Falkenstein. `ssh nerdcave` works directly. Caddy is a systemd
unit; config lives at `/etc/caddy/Caddyfile`.

## Deploy: `/srv/www/ildotdev` is a git clone

```
$ ssh nerdcave 'git -C /srv/www/ildotdev remote -v; git -C /srv/www/ildotdev branch --show-current; git -C /srv/www/ildotdev log --oneline -1; git -C /srv/www/ildotdev status -sb'
origin	http://github.com/tikimcfee/ildotdev (fetch)
origin	http://github.com/tikimcfee/ildotdev (push)
main
97b1370 resume: <link> font loading + preconnect; relax mobile media query
## main...origin/main
# captured 2026-05-17 01:31 UTC
```

To ship: `npm run build` locally (regenerates `build/`), commit source +
`build/`, `git push`, then `ssh nerdcave 'git -C /srv/www/ildotdev pull'`.
The box runs no build — it just pulls the committed `build/`. Always run
`git status` on the remote tree first — a pull will either merge-conflict
or stomp local edits if anything was changed directly on the box. Confirm
with the user before the pull.

**One-time Caddy change (required for the SvelteKit cutover):** the
`ivanlugo.dev` root must point at the build output, not the repo root:

```
# in the `handle { ... }` block of /etc/caddy/Caddyfile:
-   root * /srv/www/ildotdev
+   root * /srv/www/ildotdev/build
```

then `ssh nerdcave 'systemctl reload caddy'`. `/ide`, `/oath`,
`/downloads` are unaffected (separate handle blocks). Until this lands the
site still serves the pre-migration flat files. **Pending as of the
migration commit — not yet applied to the box.**

## Deploy paths exist

```
$ ssh nerdcave 'ls /srv/www/ildotdev/; echo ---; ls -d /srv/www/glyph3d-js'
favicon.ico
index.html
oath.html
projects
README.md
resume
styles.css
writing
---
/srv/www/glyph3d-js
# captured 2026-05-17 01:31 UTC
```

## Caddy routing (the actual glue between the two repos)

```
$ ssh nerdcave 'cat /etc/caddy/Caddyfile'
ivanlugo.dev, www.ivanlugo.dev {
	log {
		output file /var/log/caddy/ivanlugo.log {
			roll_size 10mb
			roll_keep 10
			roll_keep_for 720h
		}
		format json
	}

	# Paid downloads — tracked separately, not in the site repo
	handle_path /downloads/* {
		root * /srv/downloads
		file_server
	}

	# bare /ide → IDE shell
	redir /ide /ide/app/ide.html

	# /oath → 2025 Programmer Oath (lives in the personal site repo)
	redir /oath /oath.html

	# /ide/* → glyph3d-js repo (IDE shell + src + examples + tools)
	handle_path /ide/* {
		root * /srv/www/glyph3d-js

		# /ide/ → IDE shell entry
		@ide-root path /
		redir @ide-root /ide/app/ide.html

		# /ide/owner/repo[/branch] → IDE with query params (preserves relative imports), skip real files
		@ide-repo {
			not file
			path_regexp ide ^/([^/]+)/([^/]+)(?:/(.+))?$
		}
		redir @ide-repo /ide/app/ide.html?repo={re.ide.1}/{re.ide.2}&branch={re.ide.3}

		file_server
	}

	# everything else → personal site repo
	handle {
		root * /srv/www/ildotdev
		file_server
	}
}

txtspc3d.space, www.txtspc3d.space, vis3d.space, www.vis3d.space {
	root * /srv/www/glyph3d-js
	...
	redir / /app/ide.html
	...
}
# captured 2026-05-17 01:31 UTC — full file is ~80 lines; the txtspc3d/vis3d block is elided here, re-run to see all of it
```

Summary you can lean on (but verify if it matters):
- `ivanlugo.dev/` → `/srv/www/ildotdev/build/` (after the Caddy root change
  above; was `/srv/www/ildotdev/` pre-migration)
- `ivanlugo.dev/ide` and `/ide/*` → `/srv/www/glyph3d-js/`
- `/oath` → `/oath.html`
- `/downloads/*` → `/srv/downloads/` (not in any repo)
- `txtspc3d.space` and `vis3d.space` go straight to glyph3d-js, no `/ide/` prefix

## Operating notes

- Single-user box. No auth, no staging, no CDN. A bad push is live immediately.
- The build step (SvelteKit) exists to remove nav duplication — output stays
  fully prerendered static HTML that works without JS. Keep it that way:
  `adapter-static`, no server routes, no runtime data loading. Resist piling on
  further tooling; new deps need a strong reason.
- `static/oath.html` is content, not template — edit directly. Same for
  `static/style/` and `static/writing/building-glyph3d.html` (plain static).

## When in doubt

Re-run the commands above. The Caddyfile and the deploy tree on `nerdcave` are
ground truth; this file is a cache of them.
