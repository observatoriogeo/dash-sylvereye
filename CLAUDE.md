# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Dash Sylvereye is a Plotly Dash component library that renders large primal road networks (nodes/edges/markers) interactively in the browser via WebGL. The package is generated from a single React component using the [dash-component-boilerplate](https://github.com/plotly/dash-component-boilerplate) toolchain — the Python (`dash_sylvereye/`), R (`R/`), and Julia (`src/jl/`, `DashSylvereye.jl`) wrappers are **generated artifacts**, not hand-edited code.

Authoritative source lives under [src/lib/](src/lib/):
- [src/lib/components/SylvereyeRoadNetwork.react.js](src/lib/components/SylvereyeRoadNetwork.react.js) — thin Dash-facing wrapper, a **function component**. Owns the `<MapContainer>` and `<TileLayer>`, syncs `map_center`/`map_zoom` between Leaflet and Dash via the inner `<MapStateSync>` child (which uses `useMapEvents({moveend, zoomend})` and a guarded `useEffect → map.setView` to avoid an infinite loop). Defines `propTypes`/`defaultProps`; `react-docgen` reads these to generate the backend wrappers.
- [src/lib/LeafletSylvereyeRoadNetwork.js](src/lib/LeafletSylvereyeRoadNetwork.js) — the real implementation (~1300 lines). Uses `leaflet-pixi-overlay` to draw nodes/edges/markers in a PIXI.js WebGL canvas on top of a Leaflet map, plus `rbush` for spatial hit-testing, `chroma-js` for color scales, and `jsts` for edge hit polygons.

The bundled JS output ships into the Python package directory as [dash_sylvereye/dash_sylvereye.min.js](dash_sylvereye/dash_sylvereye.min.js); the Python `__init__.py` registers it as the component's `_js_dist`.

## Toolchain (current versions)

- React 18.3.1 + react-leaflet 4.2.1 (matches Dash 4's bundled React).
- pixi.js 7.4 (Loader → Assets API; Sprite uses `eventMode='static'` + `cursor='pointer'`, not the deprecated `.interactive`/`.buttonMode`).
- webpack 5 + CLI 7 + dev-server 5; ESLint 9 flat config in [eslint.config.mjs](eslint.config.mjs).
- Dash 4.1+, Python ≥3.11, Node ≥18.18.
- Python project managed by **uv** (`pyproject.toml` + `uv.lock`); no `setup.py` / `requirements*.txt`.

## Python env: uv

```
uv sync --all-extras          # creates .venv, installs dash_sylvereye + all extras (dev, examples, test)
uv run pytest tests/test_examples.py   # run the integration suite
uv run python examples/01_BasicVisualization.py
```

`uv sync` reads optional-deps groups from [pyproject.toml](pyproject.toml):
- `dev` → `dash[dev]` (provides `dash-generate-components`)
- `examples` → `osmnx>=2`, `numpy`
- `test` → adds `pytest`, `selenium>=4.20` (intentionally past `dash[testing]`'s `<=4.2` ceiling, because the integration suite drives Chrome directly — see below)

`pyproject.toml` hardcodes `version = "0.3.0"`. Keep it in sync with `package.json`'s `version` — both are needed because `dash-generate-components` writes the npm version into `package-info.json`, which `dash_sylvereye.__version__` reads at runtime.

## Build & generate

The build has two stages — JS bundle, then backend wrapper generation. `npm run build` chains them.

```
npm install                   # node_modules
npm run build:js              # webpack bundle → dash_sylvereye/dash_sylvereye.min.js
npm run build:backends        # dash-generate-components → Python + R + Julia wrappers (needs dash[dev] on PATH)
npm run build                 # both, in order
```

`build:backends` needs the Python venv active so `dash-generate-components` is on `PATH`. Either `source .venv/bin/activate && npm run build` or `uv run -- npm run build`.

`build:backends` invokes `dash-generate-components ./src/lib/components dash_sylvereye -p package-info.json --r-prefix '' --jl-prefix ''`. **Files inside `dash_sylvereye/_imports_.py`, the docstring of `dash_sylvereye/SylvereyeRoadNetwork.py`, `R/sylvereyeRoadNetwork.R`, and `src/jl/` are overwritten on regeneration** — change `src/lib/components/SylvereyeRoadNetwork.react.js` instead. The hand-written portion of `dash_sylvereye/__init__.py` (the dash version check + `_js_dist`) is preserved by the current generator template; verify with `git diff` after `build:backends`.

Hand-written Python alongside the generated wrappers: [dash_sylvereye/utils.py](dash_sylvereye/utils.py) (OSMnx graph/graphml loaders, marker helpers), [dash_sylvereye/defaults.py](dash_sylvereye/defaults.py), [dash_sylvereye/enums.py](dash_sylvereye/enums.py).

Dev server for the React component in isolation: `npm start` (webpack-dev-server, serves `index.html`).

## Full workflow: modifying a feature from JS to Python

The Python side imports a **pre-built JS bundle** from disk at app startup — there is no live binding between `src/lib/*.js` and a running Dash example. So the inner loop has an explicit rebuild step.

### Inner loop (typical edit → see-it-work)

1. **Edit the JS source** under [src/lib/](src/lib/):
   - Rendering / behavior changes: [src/lib/LeafletSylvereyeRoadNetwork.js](src/lib/LeafletSylvereyeRoadNetwork.js).
   - Dash-facing surface (propTypes, defaultProps, the React tree, click→`setProps` wiring): [src/lib/components/SylvereyeRoadNetwork.react.js](src/lib/components/SylvereyeRoadNetwork.react.js).
   - JS-side method enums (e.g. `NodeColorMethod.CUSTOM`): the top of `LeafletSylvereyeRoadNetwork.js`. **If you add or rename a method, mirror it in [dash_sylvereye/enums.py](dash_sylvereye/enums.py)** — these two files are the same enum maintained in parallel.

2. **Rebuild the JS bundle**:
   ```
   npm run build:js
   ```
   Writes `dash_sylvereye/dash_sylvereye.min.js` (+ `.map` and `.LICENSE.txt`). Webpack output is non-deterministic across runs even with identical input — `git diff` may show a churn-only delta; safe to discard with `git checkout -- dash_sylvereye/dash_sylvereye.min.js*` if no source change drove the rebuild.

3. **If you changed propTypes or defaultProps on `SylvereyeRoadNetwork.react.js`, also regenerate the backend wrappers**:
   ```
   uv run -- npm run build:backends
   ```
   `dash-generate-components` (from `dash[dev]`) emits a new [dash_sylvereye/SylvereyeRoadNetwork.py](dash_sylvereye/SylvereyeRoadNetwork.py) (constructor signature + docstring), [dash_sylvereye/metadata.json](dash_sylvereye/metadata.json), the R wrapper, and the Julia wrapper. The hand-written part of `dash_sylvereye/__init__.py` (dash version check + `_js_dist`) survives the regeneration with current generator versions — confirm with `git diff dash_sylvereye/__init__.py` after the first regen if you're worried.

   `npm run build` chains both stages and is the right one when you don't know which you need.

4. **Restart the running Dash example** so Python re-imports the new bundle. Examples don't watch the bundle file. The harness for one-off launches:
   ```
   uv run python tests/_run_example.py examples/01_BasicVisualization.py 8060
   ```
   (Kill the previous process first: `kill $(lsof -ti:8060)`.)

5. **Hard-refresh the browser** (Ctrl+Shift+R / Cmd+Shift+R). Dash serves `dash_sylvereye.min.js` with a content-hash query string most of the time, but during edit-loop development the browser will happily reuse a cached copy if a soft reload hits the same URL. Hard-refresh sidesteps this.

6. **Run the integration suite** when the change looks right:
   ```
   uv run pytest tests/
   ```

### Common pitfalls

- **Editing the generated Python wrapper directly.** Files clobbered by `npm run build:backends`: `dash_sylvereye/SylvereyeRoadNetwork.py`, `dash_sylvereye/_imports_.py`, `dash_sylvereye/metadata.json`, `dash_sylvereye/package-info.json`, `R/sylvereyeRoadNetwork.R`, `src/jl/*`, `src/DashSylvereye.jl`, `Project.toml`, `DESCRIPTION`. Edit the React source, then re-run the generator.
- **Forgetting to rebuild after a JS edit.** The Dash app keeps serving the old bundle until you re-run `build:js` and restart the Python process.
- **Forgetting to bump both versions.** `package.json` and `pyproject.toml` both carry `0.3.0`. `dash-generate-components` writes the npm version into `package-info.json` → `__init__.py` reads it → `dash_sylvereye.__version__`. So a Python-side version bump that doesn't update `package.json` will be silently ignored after the next backend regen.
- **Adding a new `.js`/`.css` artifact under `dash_sylvereye/` without adding it to [MANIFEST.in](MANIFEST.in) and to `_js_dist` in `dash_sylvereye/__init__.py`.** `_validate_init.py` (run by `npm run prepublishOnly`) will warn.

### Verifying a feature has a visible effect

The integration suite under `tests/test_examples.py` only proves "the canvas mounts and no JS errors" — it doesn't verify any particular visual outcome. For feature-level verification:

- **Manual eyeball**: launch the example via `_run_example.py`, look at the page, click around.
- **Selenium pixel test**: see [tests/test_visibility.py](tests/test_visibility.py) for the pattern — spin up an app subprocess, drive Selenium to it, call `driver.get_screenshot_as_png()` (a viewport screenshot captures composited WebGL output, unlike `canvas.toDataURL()` which returns blank for WebGL canvases without `preserveDrawingBuffer:true`), and count pixels matching a known sprite color. This is how I verified the `show_nodes=False` fix (7285→0 red pixels). Pillow is in the `test` extra.

### When a "bug" turns out not to be one

Several internal effects rebuild dependent state on prop changes (e.g. the edge-drawing effect rebuilds `edgesQtree` whenever `edges_data` changes, which then re-triggers the click-binding effect). This means that some plausible-looking bugs (stale closures, stale-when-prop-changed handlers, missing-dep `useEffect`s) are self-healed by these chains in practice. When auditing, always trace the actual render/effect order before claiming user-visible behavior is broken — write a quantitative test (pixel count, DOM state) and run it against both the "buggy" and "fixed" code paths to confirm a real behavioral difference.

## Integration tests

The suite is in [tests/test_examples.py](tests/test_examples.py); the SUMO-era `tests/test_usage.py` was removed because it never matched the actual `usage.py`.

```
uv sync --all-extras
uv run pytest tests/test_examples.py -v
```

Each test parametrizes over `examples/01_*.py` … `examples/04_*.py` + `usage.py`. The helper [tests/_run_example.py](tests/_run_example.py) launches an example by file path on a configurable port (importlib by path, sidestepping the digit-prefixed filenames not being valid Python module names), and the test:
1. Waits for HTTP 200 on `/`.
2. Drives headless Chrome to it via Selenium (Selenium Manager auto-fetches a matching ChromeDriver, so no manual driver install).
3. Waits for `<canvas>` inside `.leaflet-container` (proves PIXI overlay mounted).
4. Asserts `driver.get_log('browser')` returns no SEVERE entries, after filtering tile-server (`basemaps.cartocdn.com`, `tile.openstreetmap.org`) network noise.

Chrome must be on PATH (`apt install google-chrome-stable`).

## Network fixture for offline tests

`examples/cache/kamppi.graphml` (121 nodes / 246 edges, Kamppi/Helsinki) is committed so the suite runs offline. All four examples and `usage.py` load this fixture if present; otherwise they fall back to `ox.graph_from_place(OSMNX_QUERY, network_type='drive')` and cache the result for next time. `examples/cache/*.json` (OSMnx's HTTP cache) is gitignored.

The integration tests use CartoDB Positron tiles (`https://{s}.basemaps.cartocdn.com/light_all/...`). Stamen's `*.a.ssl.fastly.net` URL — used in the original examples — returns HTTP 503 since Stamen's tile service moved to Stadia Maps in 2023.

## Component model — what to know before editing props

`SylvereyeRoadNetwork` takes three data arrays — `nodes_data`, `edges_data`, `markers_data` — each a list of dicts. For every element kind (node, edge, marker) the visual attributes (color, size/width, alpha, visibility) are governed by a `*_method` enum in the corresponding `*_options` prop:
- `DEFAULT` — use `*_default` value from options
- `CUSTOM` — read per-element value from the data dict
- `SCALE` — interpolate via chroma.js between `*_scale_min`/`*_scale_max` values stored on each element
- `ALWAYS` (visibility only) — ignore per-element flag

The method enums are defined twice and must stay in sync: as JS exports near the top of [src/lib/LeafletSylvereyeRoadNetwork.js](src/lib/LeafletSylvereyeRoadNetwork.js) and as Python `Enum` classes in [dash_sylvereye/enums.py](dash_sylvereye/enums.py).

Click handlers are wired through Dash's `setProps` pattern in `SylvereyeRoadNetwork.react.js` — `onNodeClick` / `onEdgeClick` / `onMarkerClick` populate the `clicked_node` / `clicked_edge` / `clicked_marker` props, which Dash callbacks then observe. `current_state`, `map_zoom`, and `map_center` are similarly synced back.

**react-leaflet 4 caveat**: `<MapContainer>`'s `center` / `zoom` / `minZoom` / `maxZoom` are mount-only — once the map is created, react-leaflet won't push later prop changes through. `<MapStateSync>` makes `map_center` / `map_zoom` reactive via `map.setView` (with an epsilon guard to avoid a `moveend → setProps → useEffect` loop). `<TileLayer>` is the opposite: its `url`, `opacity`, `zIndex`, and `attribution` props **are** reactive in v4 (see `node_modules/react-leaflet/lib/TileLayer.js` — the update callback calls `layer.setUrl`, `setOpacity`, etc.); only `subdomains` is constructor-only. So `tile_layer_url` works reactively from Dash callbacks out of the box.

## Validation gate

`npm run prepublishOnly` runs `_validate_init.py`, which checks that every `.js`/`.css` file in `dash_sylvereye/` is referenced in `_js_dist`/`_css_dist` of `__init__.py` and listed in `MANIFEST.in`.
