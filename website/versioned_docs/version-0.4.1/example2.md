---
id: example2
title: Examples
sidebar_label: Basic interactivity
---

## Example: Basic interactivity

A small extension of [Example 1](example1) that **listens for clicks** on nodes and edges. Each click updates a text panel below the map with the coordinates of the clicked element. This is the same Dash callback pattern you use with any other Dash component.

### What this example shows

- How to react to a node click by listening to the `clicked_node` callback property.
- How to react to an edge click by listening to `clicked_edge`.
- The exact shape of those payloads, so you know which keys to read.

### Live demo

:::tip
A live deployment of this example is hosted on the Observatorio Metropolitano dashboards.

<a className="button button--primary button--lg" href="https://visualizacion.observatoriogeo.mx/sylvereye_examples/dashboard/sylvereye_examples/example-2" target="_blank" rel="noopener noreferrer">Open the live demo ↗</a>
:::

### Walkthrough

#### 1. The interactivity model

`SylvereyeRoadNetwork` doesn't take `onClick` callbacks the way a JS Leaflet handler would. Instead, it exposes **callback properties** that are updated by the component when the user clicks something:

- `clicked_node` — populated when a node is clicked.
- `clicked_edge` — populated when an edge is clicked.
- `clicked_marker` — populated when a marker is clicked (see [Example 4](example4)).

A standard Dash `@app.callback` then listens to changes on one of these properties and runs whatever code you want.

#### 2. Listen for node clicks

Add an `H3` to the layout so we have somewhere to write the result, then wire a callback that reads from `clicked_node` and writes into the `H3`:

```python
from dash import Dash, html
from dash.dependencies import Input, Output
from dash_sylvereye import SylvereyeRoadNetwork

app = Dash()
app.layout = html.Div([
    SylvereyeRoadNetwork(id='sylvereye-roadnet', ...),
    html.H2("Clicked elements:"),
    html.H3(id='h3-clicked-node-coords'),
])

@app.callback(
    Output('h3-clicked-node-coords', 'children'),
    [Input('sylvereye-roadnet', 'clicked_node')])
def update_node_data(clicked_node):
    if clicked_node:
        lat = clicked_node['data']['lat']
        lon = clicked_node['data']['lon']
        return f'Clicked node coords: {lat}, {lon}'
```

`clicked_node` is a small dict with this shape:

```python
{
    'index': <int>,    # position in the nodes_data list
    'data':  <dict>,   # a deep copy of the clicked node's dict from nodes_data
}
```

So `clicked_node['data']['lat']` and `clicked_node['data']['lon']` get you the node's geographic coordinates. Any OSM attributes the loader attached to the node live under `clicked_node['data']['data']`, see [Callback properties](click_events) for the full schema.

:::caution
The callback fires **only when `clicked_node` changes**. The very first time the user clicks any node, the value changes from `None` to the click payload, the callback runs. Clicking the *same node* a second time does not change the property, so the callback does not fire again. Click any other node first, then come back to the original.
:::

#### 3. Listen for edge clicks

Same pattern for edges. The payload follows the same `{index, data}` shape, with `data` carrying the original edge dict from `edges_data`. The most useful field there is `coords`, the polyline that draws the edge:

```python
app.layout = html.Div([
    SylvereyeRoadNetwork(id='sylvereye-roadnet', ...),
    html.H2("Clicked elements:"),
    html.H3(id='h3-clicked-node-coords'),
    html.H3(id='h3-clicked-edge-coords'),
])

@app.callback(
    Output('h3-clicked-edge-coords', 'children'),
    [Input('sylvereye-roadnet', 'clicked_edge')])
def update_edge_data(clicked_edge):
    if clicked_edge:
        return f'Clicked edge coords: {clicked_edge["data"]["coords"]}'
```

### Full example

```python
import osmnx as ox
from dash import Dash, html
from dash.dependencies import Input, Output
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph

OSMNX_QUERY = 'Kamppi, Helsinki, Finland'
TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
TILE_LAYER_SUBDOMAINS = 'abcde'
TILE_LAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
MAP_CENTER = [60.1663, 24.9313]
MAP_ZOOM = 15
MAP_STYLE = {'width': '100%', 'height': '84vh'}
TILE_LAYER_OPACITY = 0.9

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
    ),
    html.H2("Clicked elements:"),
    html.H3(id='h3-clicked-node-coords'),
    html.H3(id='h3-clicked-edge-coords'),
])

@app.callback(
    Output('h3-clicked-node-coords', 'children'),
    [Input('sylvereye-roadnet', 'clicked_node')])
def update_node_data(clicked_node):
    if clicked_node:
        lat = clicked_node['data']['lat']
        lon = clicked_node['data']['lon']
        return f'Clicked node coords: {lat}, {lon}'

@app.callback(
    Output('h3-clicked-edge-coords', 'children'),
    [Input('sylvereye-roadnet', 'clicked_edge')])
def update_edge_data(clicked_edge):
    if clicked_edge:
        return f'Clicked edge coords: {clicked_edge["data"]["coords"]}'

if __name__ == '__main__':
    app.run()
```

### Next

[Example 3 — Nodes/edges customization](example3) shows how to change the size, color, and transparency of nodes and edges based on data.
