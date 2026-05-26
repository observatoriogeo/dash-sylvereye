---
id: example1
title: Examples
sidebar_label: Basic visualization
---

## Example: Minimal application

The shortest possible Dash app that renders a road network: one `SylvereyeRoadNetwork` component, one OSMnx-loaded network, one tile layer. **No interactivity, no per-element styling, no markers**, those come in the later examples.

### What this example shows

- How to mount a `SylvereyeRoadNetwork` inside a Dash layout.
- How to load a road network from [OpenStreetMap](https://openstreetmap.org/) through [OSMnx](https://github.com/gboeing/osmnx) and hand it to the component.
- The minimum set of map / tile-layer keyword arguments you need to fill in.

### Live demo

:::tip
A live deployment of this example is hosted on the Observatorio Metropolitano dashboards.

<a className="button button--primary button--lg" href="https://visualizacion.observatoriogeo.mx/sylvereye_examples/dashboard/sylvereye_examples/example-1" target="_blank" rel="noopener noreferrer">Open the live demo ↗</a>
:::

### Walkthrough

#### 1. Mount the component

The visualization is a single Dash component. Drop it into your `app.layout` like any other component:

```python
from dash import Dash, html
from dash_sylvereye import SylvereyeRoadNetwork

app = Dash()
app.layout = html.Div([
    SylvereyeRoadNetwork(id='sylvereye-roadnet')
])
```

That alone renders an empty Leaflet map. To draw a road network on top of it, you need two more things: the network data, and the tile layer settings.

#### 2. Load a road network

`SylvereyeRoadNetwork` consumes road networks as two flat lists of dictionaries: `nodes_data` and `edges_data`. You can populate them by hand (see [Road network format](data_format)), but for OpenStreetMap data the [`load_from_osmnx_graph`](data_loading#load_from_osmnx_graph) helper does it in one line.

```python
import osmnx as ox
from dash_sylvereye.utils import load_from_osmnx_graph

# Fetch the road network from OpenStreetMap.
road_network = ox.graph_from_place('Kamppi, Helsinki, Finland', network_type='drive')

# Convert the OSMnx graph into Dash Sylvereye's data format.
nodes_data, edges_data = load_from_osmnx_graph(road_network)
```

:::tip
`ox.graph_from_place` hits the Overpass API every time. For repeatable runs, save the result to disk with [`ox.save_graphml`](https://osmnx.readthedocs.io/en/stable/osmnx.html#osmnx.io.save_graphml) and reload it with `ox.load_graphml`, then pass the loaded graph to `load_from_osmnx_graph` (or use [`load_from_osmnx_graphml`](data_loading#load_from_osmnx_graphml) directly). The shipped examples do this and ship the cached fixture under `examples/cache/`.
:::

#### 3. Configure the tile layer and map view

`SylvereyeRoadNetwork` follows Leaflet's tile-layer model. You provide a URL template, the subdomain list it expands `{s}` against, an attribution string, and an opacity:

```python
TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
TILE_LAYER_SUBDOMAINS = 'abcde'
TILE_LAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
TILE_LAYER_OPACITY = 0.9
```

:::caution
`tile_layer_opacity` is a **`float` between 0 and 1**, not a CSS percentage string. Passing `'20%'` will silently produce an empty map.
:::

The map view itself is controlled by three more arguments: where the camera starts (`map_center`), how zoomed-in it is (`map_zoom`), and the CSS dimensions of the container (`map_style`):

```python
MAP_CENTER = [60.1663, 24.9313]   # Kamppi, Helsinki, [lat, lon]
MAP_ZOOM = 15
MAP_STYLE = {'width': '100%', 'height': '98vh'}
```

#### 4. Assemble the component

Pass all of the above to `SylvereyeRoadNetwork`:

```python
app.layout = html.Div([
    SylvereyeRoadNetwork(
        id='sylvereye-roadnet',
        nodes_data=nodes_data,
        edges_data=edges_data,
        tile_layer_url=TILE_LAYER_URL,
        tile_layer_subdomains=TILE_LAYER_SUBDOMAINS,
        tile_layer_attribution=TILE_LAYER_ATTRIBUTION,
        tile_layer_opacity=TILE_LAYER_OPACITY,
        map_center=MAP_CENTER,
        map_zoom=MAP_ZOOM,
        map_style=MAP_STYLE,
    )
])
```

All of these arguments are reactive. Any Dash callback can update them at runtime, see [Example 2](example2) for the click-driven version.

### Full example

```python
import osmnx as ox
from dash import Dash, html
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph

OSMNX_QUERY = 'Kamppi, Helsinki, Finland'
TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
TILE_LAYER_SUBDOMAINS = 'abcde'
TILE_LAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
MAP_CENTER = [60.1663, 24.9313]
MAP_ZOOM = 15
MAP_STYLE = {'width': '100%', 'height': '98vh'}
TILE_LAYER_OPACITY = 0.9

# Fetch the road network from OpenStreetMap and convert it.
road_network = ox.graph_from_place(OSMNX_QUERY, network_type='drive')
nodes_data, edges_data = load_from_osmnx_graph(road_network)

app = Dash()
app.layout = html.Div([
    SylvereyeRoadNetwork(
        id='sylvereye-roadnet',
        nodes_data=nodes_data,
        edges_data=edges_data,
        tile_layer_url=TILE_LAYER_URL,
        tile_layer_subdomains=TILE_LAYER_SUBDOMAINS,
        tile_layer_attribution=TILE_LAYER_ATTRIBUTION,
        tile_layer_opacity=TILE_LAYER_OPACITY,
        map_center=MAP_CENTER,
        map_zoom=MAP_ZOOM,
        map_style=MAP_STYLE,
    )
])

if __name__ == '__main__':
    app.run()
```

### Next

[Example 2 — Basic interactivity](example2) wires up `clicked_node` and `clicked_edge` so the dashboard reacts when the user clicks on the network.
