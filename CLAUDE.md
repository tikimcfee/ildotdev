# CLAUDE.md — ildotdev

Every claim below is backed by a command and the output it produced when this
file was last updated. Re-run the command to get current truth; if reality has
drifted, update the captured block (and the date) rather than rewriting prose.

`# captured 2026-05-17 01:31 UTC` markers are the last verification.

---

## What this is

`ivanlugo.dev` — Ivan's personal site. Plain static HTML/CSS, no build step.
Sibling to `~/dev/glyph3d-js/`; extracted from that repo on 2026-05-12.

```
$ git -C ~/dev/ildotdev log --oneline -5
97b1370 resume: <link> font loading + preconnect; relax mobile media query
23e3382 drop cross-ref-viz links — example was removed from glyph3d-js
e2c8a1a README: record path-based routing decision, note cross-ref-viz dead link
fad4e16 projects: repoint glyph3d-js links under /ide/
0451a9a index.html: repoint glyph3d links to /ide/ for the path-based split
# captured 2026-05-17 01:31 UTC
```

## Repo shape

```
$ ls ~/dev/ildotdev/
CLAUDE.md
favicon.ico
index.html
nav.js
oath.html
projects
README.md
resume
style
styles.css
THEME.md
work
writing

$ ls ~/dev/ildotdev/projects ~/dev/ildotdev/resume ~/dev/ildotdev/style ~/dev/ildotdev/work ~/dev/ildotdev/writing
/home/ivan/dev/ildotdev/projects:
index.html

/home/ivan/dev/ildotdev/resume:
index.html

/home/ivan/dev/ildotdev/style:
index.html

/home/ivan/dev/ildotdev/work:
index.html

/home/ivan/dev/ildotdev/writing:
building-glyph3d.html
index.html
_template.html
# captured 2026-05-17 03:30 UTC
```

No `package.json`, no `Makefile`, no test runner. Edit, commit, push, pull on box.

## Design system

The site uses a single stylesheet (`/styles.css`) and a tiny script
(`/nav.js`). Theme is *espresso & sage* — warm dark serif, sage/olive
accent. Tokens, contrast targets, and copy-paste component snippets are
documented in `THEME.md`. A live render of every component lives at
`/style/` (visit directly; not linked from nav).

- **Add a writing piece:** copy `writing/_template.html`, fill the slots,
  add a `.entry` block in `writing/index.html`.
- **Add a top-level page:** copy any sibling (e.g. `projects/index.html`),
  add a corresponding `<a>` to **every** `<nav class="bar">` in the repo
  (no template system — duplicated by design).
- **Retheme:** edit `:root` in `/styles.css`; verify visually at `/style/`.
- **The "slot" pattern:** pages can ship with `<div class="slot" data-name="...">`
  placeholders. They render as left-bordered passages with hint text and a small
  `[name]` floater. Replace the whole `<div class="slot">…</div>` with real
  content when ready. The slot UI is in `styles.css` — leave it; future pages
  may want it.
- **Resume (`/resume/`) and Oath (`/oath.html`) are intentionally outside the
  system.** They have their own inline styles and don't link `/styles.css`.

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

To ship: `git push` locally, then `ssh nerdcave 'git -C /srv/www/ildotdev pull'`.
Always run `git status` on the remote tree first — a pull will either
merge-conflict or stomp local edits if anything was changed directly on the box.
Confirm with the user before the pull.

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
- `ivanlugo.dev/` → `/srv/www/ildotdev/` (this repo)
- `ivanlugo.dev/ide` and `/ide/*` → `/srv/www/glyph3d-js/`
- `/oath` → `/oath.html`
- `/downloads/*` → `/srv/downloads/` (not in any repo)
- `txtspc3d.space` and `vis3d.space` go straight to glyph3d-js, no `/ide/` prefix

## Operating notes

- Single-user box. No auth, no staging, no CDN. A bad push is live immediately.
- Intentionally low-JS, low-dependency. Resist adding a build step or framework.
  If a change wants tooling, that's usually a signal to do less, not more.
- `oath.html` is content, not template — edit directly.

## When in doubt

Re-run the commands above. The Caddyfile and the deploy tree on `nerdcave` are
ground truth; this file is a cache of them.
