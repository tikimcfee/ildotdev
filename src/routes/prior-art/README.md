# Prior Art — rendering a whole codebase, spatially

A field survey of everything that has tried to put an entire git repository in front of you
as one navigable thing — code cities, VR IDEs, source-text-in-3D prototypes, web toys, and
the GPU text engines underneath all of it — with an honest account of what is actually alive.

Assembled from a deep multi-pass literature and tooling search in **May 2026**: VISSOFT /
SOFTVIS proceedings back to 2003, IEEE VR / ISMAR / CHI programming-tools tracks, university
thesis repositories, abandoned startups, low-star GitHub repos, and the GPU text-rendering
literature. Every link was checked at the time of writing. Status labels are a snapshot.

Meant to be **linked to** as much as from. If you build in this space and were left out,
that's a bug — the email's in the repo.

## Read it

Open [`index.html`](./index.html) in a browser. Six volumes:

| # | File | What's in it |
|---|------|--------------|
| 01 | [`rendered-text.html`](./rendered-text.html) | The rare prototypes that render **actual readable source code** spatially — Code Bubbles, Code Canvas, **Code Park** (the UCF one), CodeHouse, IDEvelopAR, Primrose, VRIDE, Haystack, Padioleau's Codemap — plus the empirical evidence that people can read code in 3D at all. The volume that matters most. |
| 02 | [`code-cities.html`](./code-cities.html) | The big branch: Wettel's CodeCity → ExplorViz, IslandViz, CodeMetropolis, EvoStreets/SoftVis3D, CityVR, VR City, GoCity/JSCity/PHPCity, CodeCharta, SecCityVR. Buildings, not text. What's alive, what's archived. |
| 03 | [`vr-commercial.html`](./vr-commercial.html) | The money side: Primitive.io, CodeSee (→ GitKraken), Sourcetrail (→ petermost fork), CodeScene, CAST Imaging, Structure101, Glamorous Toolkit — and a confirmation that the web IDEs do nothing spatial. |
| 04 | [`web-generative.html`](./web-generative.html) | The fun, link-rotted end: Gource, code_swarm, Codeology, CodeFlower, GitHub's repo-visualizer, anvaka's galaxies, contribution-graph cities, GitDiagram, CodeBoarding, Adam Tornhill's crime-scene tooling. Which can you still open? |
| 05 | [`gpu-text.html`](./gpu-text.html) | The engine layer: Slug (now public domain), MSDF, troika-three-text and why it falls over at ~500 instances, Zed's GPUI, Makepad, the instanced-glyph papers, the 2002 Linux-kernel-in-3D demo. |
| 06 | [`positioning.html`](./positioning.html) | The synthesis: the exact unoccupied niche, the three engineering choices that historically broke the would-be competitors, the closest living siblings, and the citations to anchor a paper or a pitch. |

`prior-art.css` is the shared stylesheet.

## The one-paragraph version

"Render a codebase spatially" splits in two. The large, well-cited branch renders *metaphors*
— buildings, islands, streets, galaxies — where the source text is at most a tooltip. The
small branch renders *the actual source text* as the spatial primitive. That second branch
has roughly six research prototypes in fifteen years; almost none were open-sourced, none are
GPU-instanced at repo scale, and the closest published 3D precedent is
[Code Park](./rendered-text.html#code-park), a 2017 UCF master's thesis that was never
released. The slot — real glyphs, whole repo, navigable, browser-deliverable, maintained — is
where glyph3d-js falls; [`positioning.html`](./positioning.html) lays out who occupied it
before and why it keeps emptying out.
