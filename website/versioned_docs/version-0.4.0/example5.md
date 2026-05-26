---
id: example5
title: Examples
sidebar_label: Custom colors
---

## Example: Custom colors

Where [Example 3](example3) used the `SCALE` methods to let chroma.js interpolate colors and sizes across a numeric range, this example uses the **`CUSTOM` methods**. Each node and edge carries its **own** color, size, or width on its dict, and the component reads those values directly. This is the right tool when the value you want to display is **categorical** rather than continuous, e.g. a junction class, a road-length quartile, a routing role.

### What this example shows

- How the `CUSTOM` methods differ from the `SCALE` methods: the component reads the rendered value from the element's own top-level key (`node["color"]`, `node["size"]`, `edge["color"]`, `edge["width"]`).
- How to color and size nodes by **junction degree** (number of incident edges).
- How to color and widen edges by **length quartile**, using a Viridis-style palette.

### Walkthrough

#### 1. SCALE vs CUSTOM

The two methods read from different places on the element dict:

| Method | Reads from | Use when |
|---|---|---|
| `*Method.SCALE` | `element["data"][<scale_field>]` (a number) | The visual attribute should vary continuously with a numeric measurement. |
| `*Method.CUSTOM` | `element[<attribute>]` (already a color, size, or width) | You've already computed the exact value per element. |

So under `CUSTOM`, **you** assign the final color/size/width on the element dict; the component just renders what you wrote. No interpolation, no scale endpoints.

#### 2. Color and size nodes by junction degree

The OSMnx graph's degree (number of incident edges per node) is a natural categorical attribute: degree ≥ 4 is a busy multi-way junction, degree 3 is a T-intersection, degree ≤ 2 is an endpoint or pass-through. Map each class to a hex color and a node diameter on the node's own dict:

```python
degrees = dict(road_network.degree())

for node in nodes_data:
    deg = degrees.get(node["data"]["osmid"], 0)
    if deg >= 4:
        node["color"] = 0xd62828      # vivid red:    busy junction
        node["size"]  = 0.020
    elif deg == 3:
        node["color"] = 0xf77f00      # warm orange:  T-intersection
        node["size"]  = 0.012
    else:
        node["color"] = 0x52b788      # muted green:  endpoint / pass-through
        node["size"]  = 0.005
```

:::tip
The degree lookup is keyed by `node["data"]["osmid"]` (the OSM node identifier the loader puts under `data`). Don't confuse it with the node's list index, which is *not* the OSM ID.
:::

#### 3. Color and widen edges by length quartile

Edges are colored by which quartile of the length distribution they fall into. Compute the quartile cutoffs once, then walk the edges and assign a color + width per quartile:

```python
lengths = sorted(e["data"]["length"] for e in edges_data if e["data"]["length"] is not None)
q1 = lengths[len(lengths) // 4]
q2 = lengths[len(lengths) // 2]
q3 = lengths[(3 * len(lengths)) // 4]

for edge in edges_data:
    length = edge["data"]["length"] or 0
    if length >= q3:
        edge["color"] = 0x440154      # deep purple:  longest 25%
        edge["width"] = 1.2
    elif length >= q2:
        edge["color"] = 0x3b528b      # indigo
        edge["width"] = 0.8
    elif length >= q1:
        edge["color"] = 0x21918c      # teal
        edge["width"] = 0.5
    else:
        edge["color"] = 0x5ec962      # mint green:   shortest 25%
        edge["width"] = 0.3
```

The four colors are sampled by hand from the [Viridis](https://bids.github.io/colormap/) sequential palette, the same family `EdgeColorMethod.SCALE` would interpolate. Using `CUSTOM` here gives crisp quartile bands instead of a smooth gradient.

#### 4. Switch the option dicts to CUSTOM

The data is in place; now tell the component to read from it. Build the option dicts the usual way (fetch defaults, override) and flip each method enum:

```python
from dash_sylvereye.enums import (
    NodeColorMethod, NodeSizeMethod,
    EdgeColorMethod, EdgeWidthMethod,
)
from dash_sylvereye.defaults import get_default_node_options, get_default_edge_options

node_options = get_default_node_options()
node_options["color_method"] = NodeColorMethod.CUSTOM
node_options["size_method"]  = NodeSizeMethod.CUSTOM

edge_options = get_default_edge_options()
edge_options["color_method"] = EdgeColorMethod.CUSTOM
edge_options["width_method"] = EdgeWidthMethod.CUSTOM
```

Any visual attribute whose method you *don't* switch (e.g. `alpha_method`) stays on its default.

### Full example

```python
import os
import osmnx as ox
from dash import Dash, html
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph
from dash_sylvereye.enums import (
    NodeColorMethod, NodeSizeMethod,
    EdgeColorMethod, EdgeWidthMethod,
)
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

# Color and size nodes by junction degree.
degrees = dict(road_network.degree())
for node in nodes_data:
    deg = degrees.get(node["data"]["osmid"], 0)
    if deg >= 4:
        node["color"] = 0xd62828
        node["size"]  = 0.020
    elif deg == 3:
        node["color"] = 0xf77f00
        node["size"]  = 0.012
    else:
        node["color"] = 0x52b788
        node["size"]  = 0.005

# Color and widen edges by length quartile (Viridis-style).
lengths = sorted(e["data"]["length"] for e in edges_data if e["data"]["length"] is not None)
q1 = lengths[len(lengths) // 4]
q2 = lengths[len(lengths) // 2]
q3 = lengths[(3 * len(lengths)) // 4]
for edge in edges_data:
    length = edge["data"]["length"] or 0
    if length >= q3:
        edge["color"] = 0x440154
        edge["width"] = 1.2
    elif length >= q2:
        edge["color"] = 0x3b528b
        edge["width"] = 0.8
    elif length >= q1:
        edge["color"] = 0x21918c
        edge["width"] = 0.5
    else:
        edge["color"] = 0x5ec962
        edge["width"] = 0.3

# Switch to CUSTOM so the component reads color/size/width from each element.
node_options = get_default_node_options()
node_options["color_method"] = NodeColorMethod.CUSTOM
node_options["size_method"]  = NodeSizeMethod.CUSTOM

edge_options = get_default_edge_options()
edge_options["color_method"] = EdgeColorMethod.CUSTOM
edge_options["width_method"] = EdgeWidthMethod.CUSTOM

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
    ),
])

if __name__ == '__main__':
    app.run()
```

### See also

- [Example 3](example3) for the continuous-scale counterpart (`SCALE` methods + chroma.js).
- [Node options](nodes_customization) and [Edge options](edges_customization) for every method's exact semantics and what keys it reads.
