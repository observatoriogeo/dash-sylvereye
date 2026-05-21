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

**react-leaflet 4 caveat**: `<MapContainer>`'s `center` / `zoom` and `<TileLayer>`'s `url` are mount-only. `<MapStateSync>` makes `map_center` / `map_zoom` reactive via `map.setView`, but `tile_layer_url` is not reactive — if you ever drive it from a Dash callback at runtime, add a similar sync child or pass a changing `key` prop.

## Validation gate

`npm run prepublishOnly` runs `_validate_init.py`, which checks that every `.js`/`.css` file in `dash_sylvereye/` is referenced in `_js_dist`/`_css_dist` of `__init__.py` and listed in `MANIFEST.in`.
