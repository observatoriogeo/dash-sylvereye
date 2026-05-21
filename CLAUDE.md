# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Dash Sylvereye is a Plotly Dash component library that renders large primal road networks (nodes/edges/markers) interactively in the browser via WebGL. The package is generated from a single React component using the [dash-component-boilerplate](https://github.com/plotly/dash-component-boilerplate) toolchain — the Python (`dash_sylvereye/`), R (`R/`), and Julia (`src/jl/`, `DashSylvereye.jl`) wrappers are **generated artifacts**, not hand-edited code.

Authoritative source lives under [src/lib/](src/lib/):
- [src/lib/components/SylvereyeRoadNetwork.react.js](src/lib/components/SylvereyeRoadNetwork.react.js) — thin Dash-facing wrapper. Defines `propTypes`/`defaultProps`; `react-docgen` reads these to generate the backend wrappers.
- [src/lib/LeafletSylvereyeRoadNetwork.js](src/lib/LeafletSylvereyeRoadNetwork.js) — the real implementation (~1300 lines). Uses `leaflet-pixi-overlay` to draw nodes/edges/markers in a PIXI.js WebGL canvas on top of a Leaflet map, plus `rbush` for spatial hit-testing, `chroma-js` for color scales, and `jsts` for edge hit polygons.

The bundled JS output ships into the Python package directory as [dash_sylvereye/dash_sylvereye.min.js](dash_sylvereye/dash_sylvereye.min.js); the Python `__init__.py` registers it as the component's `_js_dist`.

## Build & generate

The build has two stages — JS bundle, then backend wrapper generation. They must run in this order; `npm run build` chains them.

```
npm i --ignore-scripts          # node_modules; ignore-scripts is intentional per README
npm run build:js                # webpack bundle → dash_sylvereye/dash_sylvereye.min.js
npm run build:backends          # dash-generate-components → Python + R + Julia wrappers
npm run build                   # both, in order
npm run build:activated         # same, but activates ./venv first (needs dash[dev])
```

`build:backends` invokes `dash-generate-components ./src/lib/components dash_sylvereye -p package-info.json --r-prefix '' --jl-prefix ''`. **Editing files inside `dash_sylvereye/_imports_.py`, the generated `SylvereyeRoadNetwork.py`'s docstring, `R/sylvereyeRoadNetwork.R`, or `src/jl/` directly will be overwritten** — change `src/lib/components/SylvereyeRoadNetwork.react.js` instead and re-run the build.

Hand-written Python lives alongside the generated wrappers: [dash_sylvereye/utils.py](dash_sylvereye/utils.py) (OSMnx graph/graphml loaders, marker helpers), [dash_sylvereye/defaults.py](dash_sylvereye/defaults.py), [dash_sylvereye/enums.py](dash_sylvereye/enums.py).

Dev server for the React component in isolation:
```
npm start                        # webpack-dev-server, serves index.html
```

## Run / test

Tests are Selenium-driven via Dash's `dash_duo` fixture and require a running app:
```
pip install -r tests/requirements.txt
pytest                           # uses pytest.ini → testpaths=tests/
pytest tests/test_usage.py::test_render_component
```
`tests/test_usage.py` imports the top-level [usage.py](usage.py) app — that file is the test fixture, not just a demo. `usage.py` loads `data/Queretaro.graphml`, which is **not in the repo**; either swap in an available graph or call `ox.graph_from_place` before running tests locally.

Examples in [examples/](examples/) are standalone Dash apps; run any directly with `python examples/01_BasicVisualization.py` after `pip install -r requirements-examples.txt` (pulls `osmnx`).

## Component model — what to know before editing props

`SylvereyeRoadNetwork` takes three data arrays — `nodes_data`, `edges_data`, `markers_data` — each a list of dicts. For every element kind (node, edge, marker) the visual attributes (color, size/width, alpha, visibility) are governed by a `*_method` enum in the corresponding `*_options` prop:
- `DEFAULT` — use `*_default` value from options
- `CUSTOM` — read per-element value from the data dict
- `SCALE` — interpolate via chroma.js between `*_scale_min`/`*_scale_max` values stored on each element
- `ALWAYS` (visibility only) — ignore per-element flag

The method enums are defined twice and must stay in sync: as JS exports near the top of [src/lib/LeafletSylvereyeRoadNetwork.js](src/lib/LeafletSylvereyeRoadNetwork.js) and as Python `Enum` classes in [dash_sylvereye/enums.py](dash_sylvereye/enums.py).

Click handlers are wired through Dash's `setProps` pattern in `SylvereyeRoadNetwork.react.js` — `onNodeClick` / `onEdgeClick` / `onMarkerClick` populate the `clicked_node` / `clicked_edge` / `clicked_marker` props, which Dash callbacks then observe. `current_state`, `map_zoom`, and `map_center` are similarly synced back.

## Validation gate

`npm run prepublishOnly` runs `_validate_init.py`, which checks that `dash_sylvereye/__init__.py` has not drifted from the generator's expected template. If you edit `__init__.py` by hand, this will fail publish.
