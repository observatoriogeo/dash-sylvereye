---
id: example4
title: Examples
sidebar_label: Adding markers
---

## Example: Adding markers

This example places **markers on top of every node** in the road network, makes them rescale automatically with the map zoom, and wires up a callback that reacts when the user clicks one.

### What this example shows

- How to build a `markers_data` list from a set of `[lat, lon]` coordinates using `generate_markers_from_coords`.
- How to enable automatic zoom-driven marker resizing through the `marker_options` dictionary.
- How to listen for marker clicks, and **the one detail that's different from node and edge clicks**: the payload key is `marker`, not `data`.

### Live demo

:::tip
A live deployment of this example is hosted on the Observatorio Metropolitano dashboards.

<a className="button button--primary button--lg" href="https://visualizacion.observatoriogeo.mx/sylvereye_examples/dashboard/sylvereye_examples/example-4" target="_blank" rel="noopener noreferrer">Open the live demo ↗</a>
:::

### Walkthrough

#### 1. Build a markers_data list

Markers are described by the same kind of list-of-dictionaries data structure that nodes and edges use, but you rarely need to build it from scratch. The [`generate_markers_from_coords`](data_utils#generate_markers_from_coords) helper turns a flat list of `[lat, lon]` pairs into a ready-to-render marker list:

```python
from dash_sylvereye.utils import generate_markers_from_coords

# One marker per node of the road network.
markers_coords = [[node['lat'], node['lon']] for node in nodes_data]
markers_data = generate_markers_from_coords(markers_coords)
```

Each marker gets the default icon, the default color, full opacity, and an empty `data` sub-dict. If you want custom icons, custom colors, or per-marker user data, post-process the returned list, or build it from scratch, see [Markers data format](data_format#markers-data-format) for the schema.

#### 2. Make marker size react to zoom level

By default a marker keeps the same screen-space size regardless of zoom, so it shrinks (relative to the map) as you zoom out. Set `enable_zoom_scaling` to `True` to keep the marker proportional to the map instead:

```python
from dash_sylvereye.defaults import get_default_marker_options

marker_options = get_default_marker_options()
marker_options['enable_zoom_scaling'] = True
```

:::tip
`enable_zoom_scaling` is the right knob when markers represent *physical* things on the map (vehicles, buildings, stops) that should look bigger as the camera moves closer. Leave it off when markers are *labels* or *pins*, things that should stay the same screen size whether the user zooms in or out.
:::

#### 3. Hand both to the component

Pass `markers_data` (the list) and `marker_options` (the styling dict) to `SylvereyeRoadNetwork`:

```python
SylvereyeRoadNetwork(
    id='sylvereye-roadnet',
    nodes_data=nodes_data,
    edges_data=edges_data,
    markers_data=markers_data,
    marker_options=marker_options,
    ...
)
```

#### 4. React to marker clicks

The pattern is the same as Example 2's `clicked_node` / `clicked_edge`, with **one difference in the payload shape** that's easy to miss:

```python
@app.callback(
    Output('h3-clicked-marker-coords', 'children'),
    [Input('sylvereye-roadnet', 'clicked_marker')])
def update_marker_data(clicked_marker):
    if clicked_marker:
        marker = clicked_marker['marker']            # note: 'marker', not 'data'
        return f'Clicked marker coords: {[marker["lat"], marker["lon"]]}'
```

:::caution
For nodes and edges the click payload is `{'index': ..., 'data': <element>}`. For markers it is `{'index': ..., 'marker': <element>}`. Reading `clicked_marker['data']` returns `None` and is a common source of "why is my callback silent" bugs.
:::

Any custom attributes you stored under the marker's own `data` sub-dict live at `clicked_marker['marker']['data']`, mirroring the node and edge layout.

### Full example

```python
import osmnx as ox
from dash import Dash, html
from dash.dependencies import Input, Output
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph, generate_markers_from_coords
from dash_sylvereye.defaults import get_default_marker_options

OSMNX_QUERY = 'Kamppi, Helsinki, Finland'
TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
TILE_LAYER_SUBDOMAINS = 'abcde'
TILE_LAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
MAP_CENTER = [60.1663, 24.9313]
MAP_ZOOM = 15
MAP_STYLE = {'width': '100%', 'height': '80vh'}
TILE_LAYER_OPACITY = 0.9

road_network = ox.graph_from_place(OSMNX_QUERY, network_type='drive')
nodes_data, edges_data = load_from_osmnx_graph(road_network)

# One marker per road-network node.
markers_coords = [[node['lat'], node['lon']] for node in nodes_data]
markers_data = generate_markers_from_coords(markers_coords)

# Rescale marker size with the zoom level.
marker_options = get_default_marker_options()
marker_options['enable_zoom_scaling'] = True

app = Dash()
app.layout = html.Div([
    SylvereyeRoadNetwork(
        id='sylvereye-roadnet',
        nodes_data=nodes_data,
        edges_data=edges_data,
        markers_data=markers_data,
        marker_options=marker_options,
        tile_layer_url=TILE_LAYER_URL,
        tile_layer_subdomains=TILE_LAYER_SUBDOMAINS,
        tile_layer_attribution=TILE_LAYER_ATTRIBUTION,
        tile_layer_opacity=TILE_LAYER_OPACITY,
        map_center=MAP_CENTER,
        map_zoom=MAP_ZOOM,
        map_style=MAP_STYLE,
    ),
    html.H2("Clicked elements:"),
    html.H3(id='h3-clicked-marker-coords'),
])

@app.callback(
    Output('h3-clicked-marker-coords', 'children'),
    [Input('sylvereye-roadnet', 'clicked_marker')])
def update_marker_data(clicked_marker):
    if clicked_marker:
        marker = clicked_marker['marker']
        return f'Clicked marker coords: {[marker["lat"], marker["lon"]]}'

if __name__ == '__main__':
    app.run()
```

### See also

- [Marker options](markers_customization) for custom icons, tooltips, per-marker colors, and the `MarkerColorMethod.ORIGINAL` color method for multi-color SVG icons.
- [Callback properties](click_events) for the full payload shapes of `clicked_node`, `clicked_edge`, and `clicked_marker`.
