<!--
  Logo is served from the live docs site (GitHub Pages, behind the
  dashsylvereye.observatoriogeo.mx vanity domain). Absolute URL so the
  image also renders on PyPI's project page; PyPI's long-description
  renderer does not follow relative paths.
-->
<p align="center">
  <img src="https://dashsylvereye.observatoriogeo.mx/img/website_logo_solid_background.png" width="320" height="242" alt="Dash Sylvereye" title="Dash Sylvereye">
</p>

<p align="center">
  <em>Featured by Plotly as <a href="https://medium.com/plotly/dash-club-13-langchain-plotly-upcoming-webinar-dash-online-course-dash-langchain-challenge-6820b39caa08#5bf0">Dash Club Component of the Month</a> and <a href="https://www.linkedin.com/posts/plotly_dash-sylvereye-is-a-component-library-for-activity-7145797976215404545-uSN8">on Plotly's LinkedIn</a>, January 2024.</em>
</p>

<p align="center">
  <b>WebGL-accelerated visualization of large primal road networks for Plotly Dash dashboards.</b>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=ovs8hJxJQjg" title="Watch the Dash Sylvereye demo on YouTube">
    <img src="https://img.youtube.com/vi/ovs8hJxJQjg/maxresdefault.jpg" width="640" alt="Watch the Dash Sylvereye demo on YouTube">
  </a>
</p>

<p align="center">
  Tens of thousands of interactive nodes, edges, and markers, smoothly, in the browser. Tied into Dash callbacks: every visual property is reactive, every element is clickable. Loads networks straight from OpenStreetMap through <a href="https://github.com/gboeing/osmnx">OSMnx</a>.
</p>

<p align="center">
  <a href="https://dashsylvereye.observatoriogeo.mx"><img src="https://img.shields.io/badge/docs-dashsylvereye.observatoriogeo.mx-0470bc.svg" alt="Documentation"></a>
  <a href="https://pypi.org/project/dash-sylvereye/"><img src="https://img.shields.io/pypi/v/dash-sylvereye" alt="PyPI"></a>
  <a href="https://pepy.tech/project/dash-sylvereye"><img src="https://img.shields.io/pepy/dt/dash-sylvereye.svg" alt="Downloads"></a>
  <a href="https://pypi.org/project/dash-sylvereye/"><img src="https://img.shields.io/badge/python-3.11+-blue.svg" alt="Python 3.11+"></a>
  <a href="https://plotly.com/dash/"><img src="https://img.shields.io/badge/dash-4.x-3F4F75.svg" alt="Plotly Dash 4.x"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT"></a>
  <a href="https://doi.org/10.1109/ACCESS.2023.3327008"><img src="https://img.shields.io/badge/DOI-10.1109%2FACCESS.2023.3327008-blue.svg" alt="DOI"></a>
</p>

---

[**Dash Sylvereye**](https://dashsylvereye.observatoriogeo.mx) is a [Plotly Dash](https://plotly.com/dash/) component library, developed at the [Observatorio Metropolitano CentroGeo](https://observatoriogeo.mx) at [CentroGeo](https://www.centrogeo.org.mx/), that renders interactive web-based visualizations of large *primal* [road networks](https://en.wikipedia.org/wiki/Street_network) in Python. The geometry is drawn with WebGL on top of a tiled Leaflet map; every node, edge, and marker is independently styleable and clickable, and every visual property is wired through Dash's callback architecture so the visualization reacts to anything else in the dashboard at runtime.

It's aimed at:

- **Mobility, transportation, and urban-data researchers** who need to display real-world street networks (tens of thousands of segments) and overlay analytics on top.
- **Dashboard developers** who already build Plotly Dash apps and want a first-class road-network component, not a generic Plotly trace.
- **Anyone working with OSMnx output** who wants to render the resulting `MultiDiGraph` directly, without falling back to Matplotlib or a generic map widget.

## Status

Current release: **`0.4.1`**. Runs on Python 3.11+ and Dash 4.x. Distributed under the MIT license.

| Surface | State |
|---|---|
| Source layout | `dash_sylvereye/` (PEP 621, hatchling, [`uv.lock`](https://github.com/observatoriogeo/dash-sylvereye/blob/main/uv.lock) committed) |
| JS source | [`src/lib/`](https://github.com/observatoriogeo/dash-sylvereye/tree/main/src/lib) (React 18 + react-leaflet 4 + PIXI.js 7 + leaflet-pixi-overlay) |
| Tests | Selenium integration suite under [`tests/`](https://github.com/observatoriogeo/dash-sylvereye/tree/main/tests) (drives headless Chrome) |
| Docs | Live at [dashsylvereye.observatoriogeo.mx](https://dashsylvereye.observatoriogeo.mx) (Docusaurus 3.10, source under [`website/`](https://github.com/observatoriogeo/dash-sylvereye/tree/main/website)) |
| Examples | 5 runnable end-to-end scripts under [`examples/`](https://github.com/observatoriogeo/dash-sylvereye/tree/main/examples) |
| Distribution | [PyPI](https://pypi.org/project/dash-sylvereye/) (also publishes R and Julia wrappers via [`dash-generate-components`](https://dash.plotly.com/plugins)) |

Release history: [GitHub Releases](https://github.com/observatoriogeo/dash-sylvereye/releases).

## What it does

A `SylvereyeRoadNetwork` component takes three flat lists, `nodes_data`, `edges_data`, `markers_data`, and renders them on top of a Leaflet tile layer through a WebGL overlay. Each element is independently controlled:

| Element | Customizable visual properties | Click event |
|---|---|---|
| Node | color, size, alpha, visibility | `clicked_node` |
| Edge | color, width, alpha, visibility | `clicked_edge` |
| Marker | color, size, alpha, visibility, icon, tooltip | `clicked_marker` |
| Direction arrows | follow edge geometry, can be toggled globally | (not interactive) |
| Tile layer | URL, opacity, attribution, subdomains | (n/a) |

Three methods per visual property:

- **`DEFAULT`**: one value applies to every element.
- **`SCALE`**: interpolate from a numeric data field on each element (color scales are computed client-side with [chroma.js](https://gka.github.io/chroma.js/)).
- **`CUSTOM`**: read the rendered value from each element's own dict.

Networks load from a NetworkX graph or a GraphML file produced by [OSMnx](https://github.com/gboeing/osmnx) in one line, or you can build the data lists by hand. SUMO `.net.xml` traffic-simulation networks are supported as an optional extra.

See the [Overview](https://dashsylvereye.observatoriogeo.mx/docs/overview) page for the full feature tour.

## Quickstart

A minimal Dash app rendering the road network of Kamppi (Helsinki) from OpenStreetMap:

```python
import osmnx as ox
from dash import Dash, html
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph

road_network = ox.graph_from_place('Kamppi, Helsinki, Finland', network_type='drive')
nodes_data, edges_data = load_from_osmnx_graph(road_network)

app = Dash()
app.layout = html.Div([
    SylvereyeRoadNetwork(
        id='sylvereye-roadnet',
        nodes_data=nodes_data,
        edges_data=edges_data,
        tile_layer_url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        tile_layer_subdomains='abcde',
        tile_layer_opacity=0.9,
        map_center=[60.1663, 24.9313],
        map_zoom=15,
        map_style={'width': '100%', 'height': '98vh'},
    ),
])

if __name__ == '__main__':
    app.run()
```

Walk-throughs of the click callbacks, scaled visuals, markers, and per-element customization live under [Examples](https://dashsylvereye.observatoriogeo.mx/docs/example1).

## Install

```bash
pip install dash-sylvereye
```

> If you use [uv](https://docs.astral.sh/uv/): `uv add dash-sylvereye`.

Optional extras:

| Extra | What it pulls | When to use it |
|---|---|---|
| `examples` | `osmnx>=2.0`, `numpy` | To run the scripts under [`examples/`](https://github.com/observatoriogeo/dash-sylvereye/tree/main/examples). |
| `sumolib` | `sumolib>=1.0` | To use `load_from_sumo_network` for SUMO `.net.xml` networks. |
| `dev` | `dash[dev]>=4.0.0` | To regenerate the Python/R/Julia wrappers (`dash-generate-components`). |
| `test` | `pytest`, `selenium`, `pillow`, plus `examples` | To run the integration suite. |

Install one with `pip install dash-sylvereye[examples]` or several with `pip install dash-sylvereye[examples,sumolib]`.

## Architecture

```
   Python (Dash callback graph)
              │
              ▼
   SylvereyeRoadNetwork component  (Dash → React → react-leaflet)
              │
              ▼
   Leaflet map (tile layer + zoom/pan)
              │
              ▼
   leaflet-pixi-overlay
              │
              ▼
   PIXI.js WebGL scene  (nodes, edges, markers, arrows)
```

A `SylvereyeRoadNetwork` JSX component wraps a `<MapContainer>` from [react-leaflet](https://react-leaflet.js.org/) with a [`leaflet-pixi-overlay`](https://github.com/manubb/Leaflet.PixiOverlay) instance underneath; nodes, edges, markers, and arrows are drawn into a [PIXI.js](https://pixijs.com/) container by hand-written sprite code. Spatial hit-testing for edge clicks uses [RBush](https://github.com/mourner/rbush) + [JSTS](https://github.com/bjornharrtell/jsts); color scales use [chroma.js](https://gka.github.io/chroma.js/). The whole React surface is transpiled by [`dash-generate-components`](https://dash.plotly.com/plugins) into a Dash component, so the Python side ships only PropTypes and defaultProps definitions, no live React.

Full walk-through at [Software stack](https://dashsylvereye.observatoriogeo.mx/docs/software_stack).

## Documentation

All documentation lives at **[dashsylvereye.observatoriogeo.mx](https://dashsylvereye.observatoriogeo.mx)**. Highlights:

| Section | Pointer |
|---|---|
| What is Dash Sylvereye? | [/docs/overview](https://dashsylvereye.observatoriogeo.mx/docs/overview) |
| Installation | [/docs/installation](https://dashsylvereye.observatoriogeo.mx/docs/installation) |
| Examples (5 walk-throughs) | [/docs/example1](https://dashsylvereye.observatoriogeo.mx/docs/example1) |
| Component keyword arguments | [/docs/component_parameters](https://dashsylvereye.observatoriogeo.mx/docs/component_parameters) |
| Click events (`clicked_*` payloads) | [/docs/click_events](https://dashsylvereye.observatoriogeo.mx/docs/click_events) |
| Data format (nodes, edges, markers) | [/docs/data_format](https://dashsylvereye.observatoriogeo.mx/docs/data_format) |
| Loading networks (OSMnx / GraphML / SUMO) | [/docs/data_loading](https://dashsylvereye.observatoriogeo.mx/docs/data_loading) |
| Per-element customization | [/docs/nodes_customization](https://dashsylvereye.observatoriogeo.mx/docs/nodes_customization) · [/docs/edges_customization](https://dashsylvereye.observatoriogeo.mx/docs/edges_customization) · [/docs/markers_customization](https://dashsylvereye.observatoriogeo.mx/docs/markers_customization) |
| Citation | [/docs/citation](https://dashsylvereye.observatoriogeo.mx/docs/citation) |

## Running the examples

```bash
git clone https://github.com/observatoriogeo/dash-sylvereye.git
cd dash-sylvereye
uv sync --extra examples
uv run python examples/01_BasicVisualization.py
```

Then open <http://127.0.0.1:8050/> in your browser. The first run downloads the Kamppi road network from OpenStreetMap and caches it to `examples/cache/kamppi.graphml`; subsequent runs are offline.

The other scripts demonstrate further features:

- [`02_BasicInteractivity.py`](examples/02_BasicInteractivity.py): `clicked_node` and `clicked_edge` callbacks.
- [`03_BasicCustomization.py`](examples/03_BasicCustomization.py): `SCALE` methods (color, size, width interpolated by a data field).
- [`04_AddingMarkers.py`](examples/04_AddingMarkers.py): zoom-aware markers + `clicked_marker`.
- [`05_CustomColors.py`](examples/05_CustomColors.py): `CUSTOM` methods (per-element colors and diameters from categorical attributes).

## Development

[`uv`](https://docs.astral.sh/uv/) is the project's package and environment manager. The full build needs both Node (≥18.18) and the `dev` Python extras (which provide `dash-generate-components`):

```bash
git clone https://github.com/observatoriogeo/dash-sylvereye.git
cd dash-sylvereye
uv sync --all-extras
npm install
uv run -- npm run build      # webpack bundle + Python/R/Julia wrapper regen
```

Run the integration tests (headless Chrome must be installed and on PATH; Selenium Manager auto-fetches a matching ChromeDriver):

```bash
uv run pytest tests/
```

Full development workflow, including the JS → Python regeneration loop and the validation gate, lives in [`CLAUDE.md`](CLAUDE.md).

## Citation

If you use Dash Sylvereye in your research, please cite:

> A. Garcia-Robledo and M. Zangiabady, "Dash Sylvereye: A Python Library for Dashboard-Driven Visualization of Large Street Networks," in *IEEE Access*, vol. **11**, pp. 121142–121161, 2023. [https://doi.org/10.1109/ACCESS.2023.3327008](https://doi.org/10.1109/ACCESS.2023.3327008)

BibTeX:

```bibtex
@article{garciarobledo2023sylvereye,
  author  = {Garcia-Robledo, Alberto and Zangiabady, Mahboobeh},
  title   = {Dash {S}ylvereye: A {P}ython Library for Dashboard-Driven Visualization of Large Street Networks},
  journal = {IEEE Access},
  volume  = {11},
  pages   = {121142--121161},
  year    = {2023},
  doi     = {10.1109/ACCESS.2023.3327008},
}
```

## License

Dash Sylvereye is distributed under the **MIT License**. See [`LICENSE`](LICENSE) for the full text. Copyright © 2021-present Centro de Investigación en Ciencias de Información Geoespacial, A.C. (CentroGeo) and Alberto García-Robledo.

## Origin and authorship

Dash Sylvereye was developed at the [Observatorio Metropolitano CentroGeo](https://observatoriogeo.mx), [CentroGeo](https://www.centrogeo.org.mx/), México. The library's source code was authored by **Alberto García-Robledo** and is registered with Mexico's national copyright authority (**INDAUTOR**, Registro Público del Derecho de Autor № **03-2021-091714185400-01**, 22 September 2021) as a *programa de cómputo*; CentroGeo holds the patrimonial rights under Art. 83 LFDA. The canonical scientific reference, co-authored with **Mahboobeh Zangiabady**, is [Garcia-Robledo & Zangiabady, *IEEE Access* (2023)](https://doi.org/10.1109/ACCESS.2023.3327008).

Distributed under the [MIT License](LICENSE). No patents have been granted on, or licensed from, this work. Any third-party publication, patent application, or commercial offering that claims authorship or invention of "Dash Sylvereye" or its methods is unauthorized. See [NOTICE.md](NOTICE.md) for the formal authorship, copyright, license, and patent-status statement.

## Contact

- Bug reports and feature requests: [GitHub Issues](https://github.com/observatoriogeo/dash-sylvereye/issues).
- Academic and collaboration enquiries: [algarcia@centrogeo.edu.mx](mailto:algarcia@centrogeo.edu.mx).
