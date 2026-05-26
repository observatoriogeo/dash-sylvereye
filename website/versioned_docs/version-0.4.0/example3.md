---
id: example3
title: Examples
sidebar_label: Nodes/edges customization
---

## Example: Nodes/edges customization

This example renders the same road network as Example 1, but with **per-element visuals derived from a numeric attribute**. Each node and edge gets a random `weight`; nodes are sized by their weight, edges are widened and colored by theirs.

### What this example shows

- How to build a `node_options` / `edge_options` dictionary from the project defaults.
- How the `SCALE` methods (size, width, color) work, and where the scale field needs to live on each element.
- How to define a color scale by its two endpoints.

### Live demo

:::tip
A live deployment of this example is hosted on the Observatorio Metropolitano dashboards.

<a className="button button--primary button--lg" href="https://visualizacion.observatoriogeo.mx/sylvereye_examples/dashboard/sylvereye_examples/example-3" target="_blank" rel="noopener noreferrer">Open the live demo ↗</a>
:::

### Walkthrough

#### 1. Where the scale value has to live

Every `SCALE` method reads its input from `<element>['data'][<field_name>]`, **not** from the top of the element dict. The element's top-level keys (`lat`, `lon`, `color`, `size`, `alpha`, …) carry per-element render state for the `CUSTOM` methods; the `data` sub-dict carries arbitrary user attributes, which is where scale fields belong.

So if you want to scale node size by a "weight" attribute, you store it like this:

```python
import numpy as np

# Assign a random weight to every node (under 'data', not at the top level).
for node in nodes_data:
    node['data']['weight'] = 1 - np.random.power(a=3, size=None)

# Same idea for edges.
for edge in edges_data:
    edge['data']['weight'] = 1 - np.random.power(a=3, size=None)
```

A power-law distribution is used here only because it gives a wide spread; any positive numeric attribute already on the data works (edge length, node degree, betweenness, vehicle count, …). See [Road network format](data_format) for the keys that already live on each element when you load from OSMnx.

#### 2. Build a node-options dict

The pattern is the same every time: fetch the defaults, override the keys you care about, pass the dict to the component.

```python
from dash_sylvereye.enums import NodeSizeMethod
from dash_sylvereye.defaults import get_default_node_options

node_options = get_default_node_options()

# Render all nodes translucent so the road network underneath stays readable.
node_options['alpha_default'] = 0.25

# Scale node size by the 'weight' attribute we put under data above.
node_options['size_method'] = NodeSizeMethod.SCALE
node_options['size_scale_field'] = 'weight'
```

Under `SCALE`, the rendered node diameter is interpolated linearly from `0.005` (smallest weight) to `0.03` (largest weight), see [Node options → Scaled size](nodes_customization#scaled-size) for the formula.

#### 3. Build an edge-options dict

The edge config does two things at once: scale the **width** by weight, and scale the **color** by weight too. The color method needs two extra keys, the endpoints of the color scale:

```python
from dash_sylvereye.enums import EdgeColorMethod, EdgeWidthMethod
from dash_sylvereye.defaults import get_default_edge_options

edge_options = get_default_edge_options()

# Scale edge width by 'weight'.
edge_options['width_method'] = EdgeWidthMethod.SCALE
edge_options['width_scale_field'] = 'weight'

# Scale edge color by 'weight' too, between two hex values.
edge_options['color_method'] = EdgeColorMethod.SCALE
edge_options['color_scale_field'] = 'weight'
edge_options['color_scale_left']  = 0xcbdbff   # color for the smallest weight
edge_options['color_scale_right'] = 0x06696    # color for the largest weight
```

:::note
Color scales are computed on the client with [chroma.js](https://gka.github.io/chroma.js/). You only set the two endpoints; the smooth interpolation across the spectrum is automatic.
:::

#### 4. Hand the dicts to the component

Pass the two option dicts alongside the network data:

```python
app.layout = html.Div([
    SylvereyeRoadNetwork(
        id='sylvereye-roadnet',
        nodes_data=nodes_data,
        edges_data=edges_data,
        node_options=node_options,
        edge_options=edge_options,
        ...
    )
])
```

The option dicts are themselves reactive props, so a Dash callback can swap a `SCALE` for a `CUSTOM` (or change which field is being scaled) at runtime.

### Full example

```python
import osmnx as ox
import numpy as np
from dash import Dash, html
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph
from dash_sylvereye.enums import NodeSizeMethod, EdgeColorMethod, EdgeWidthMethod
from dash_sylvereye.defaults import get_default_node_options, get_default_edge_options

OSMNX_QUERY = 'Kamppi, Helsinki, Finland'
TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
TILE_LAYER_SUBDOMAINS = 'abcde'
TILE_LAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
MAP_CENTER = [60.1663, 24.9313]
MAP_ZOOM = 15
MAP_STYLE = {'width': '100%', 'height': '98vh'}
TILE_LAYER_OPACITY = 0.9

road_network = ox.graph_from_place(OSMNX_QUERY, network_type='drive')
nodes_data, edges_data = load_from_osmnx_graph(road_network)

# Random weights for nodes and edges.
for node in nodes_data:
    node['data']['weight'] = 1 - np.random.power(a=3, size=None)
for edge in edges_data:
    edge['data']['weight'] = 1 - np.random.power(a=3, size=None)

# Node options: translucent, sized by weight.
node_options = get_default_node_options()
node_options['alpha_default'] = 0.25
node_options['size_method'] = NodeSizeMethod.SCALE
node_options['size_scale_field'] = 'weight'

# Edge options: width and color both scaled by weight.
edge_options = get_default_edge_options()
edge_options['width_method'] = EdgeWidthMethod.SCALE
edge_options['width_scale_field'] = 'weight'
edge_options['color_method'] = EdgeColorMethod.SCALE
edge_options['color_scale_field'] = 'weight'
edge_options['color_scale_left']  = 0xcbdbff
edge_options['color_scale_right'] = 0x06696

app = Dash()
app.layout = html.Div([
    SylvereyeRoadNetwork(
        id='sylvereye-roadnet',
        nodes_data=nodes_data,
        edges_data=edges_data,
        node_options=node_options,
        edge_options=edge_options,
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

### See also

- [Node options](nodes_customization) and [Edge options](edges_customization) for the full set of methods (default / scale / custom) and the keys they read.
- [Example 4](example4) introduces markers, which follow the same options pattern.
