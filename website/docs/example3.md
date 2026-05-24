---
id: example3
title: Examples
sidebar_label: Nodes/edges customization
---

## Example: Nodes/edges customization

### Live visualization

>**Note**
>
>The example below is a live visualization. Please wait until the Dash Sylvereye component finishes loading and drawing the road network.


<iframe src="https://visualizacion.observatoriogeo.mx/sylvereye_examples/dashboard/sylvereye_examples/example-3" title="" style={{overflow:'hidden',height:'500px',width:'100%'}}></iframe>
<br />
<form action="https://visualizacion.observatoriogeo.mx/sylvereye_examples/dashboard/sylvereye_examples/example-3">
    <input type="submit" value="View in full-window" style={{float: 'right'}}/>
</form>
<br />

### Description

The programmer can configure the visuals of the road network visualization to the detail by filling option dictionaries available for nodes, edges, and markers. 

In this example, the alpha of all nodes is set to 0.25 to make them translucent. 

Likewise, the size method is set to `NodeSizeMethod.SCALE` in order to instruct the visualization to set the diameter of all nodes in proportion to their weight:

```python
from dash_sylvereye.enums import NodeSizeMethod, ...
from dash_sylvereye.defaults import get_default_node_options, ...
...
# assign random weights to nodes by using a power-law distribution
for node in nodes_data: node["data"]["weight"] = 1 - np.random.power(a=3, size=None)
...
# set visual options for nodes
node_options = get_default_node_options()
node_options["alpha_default"] = 0.25
node_options["size_method"] = NodeSizeMethod.SCALE
node_options["size_scale_field"] = "weight"
...
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...                         
                         node_options=node_options,
                         ...
                        )    
])
...
```

As for the visuals of edges, the edge width method is set to `EdgeWidthMethod.SCALE` to be computed in proportion to the weights of edges. 

The same goes for the edge color method, which is set to `EdgeColorMethod.SCALE` to be computed in proportion to the weights of edges. You only need to specify the `color_scale_left` and `color_scale_right` ends of the color scale:

```python
from dash_sylvereye.enums import ... , EdgeColorMethod, EdgeWidthMethod
from dash_sylvereye.defaults import ... , get_default_edge_options
...
# assign random weights to edges by using a power-law distribution
for edge in edges_data: edge["data"]["weight"] = 1 - np.random.power(a=3, size=None)
...
# set visual options for edges
edge_options = get_default_edge_options()
edge_options["width_method"] = EdgeWidthMethod.SCALE
edge_options["width_scale_field"] = "weight"
edge_options["color_method"] = EdgeColorMethod.SCALE
edge_options["color_scale_field"] = "weight"
edge_options["color_scale_left"] = 0xcbdbff
edge_options["color_scale_right"] = 0x06696
...
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...
                         edge_options=edge_options
                        )    
])
...
```

### Full example

The full example is as follows:

```python
import osmnx as ox
import numpy as np
from dash import Dash
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph 
from dash_sylvereye.enums import NodeSizeMethod, EdgeColorMethod, EdgeWidthMethod
from dash_sylvereye.defaults import get_default_node_options, get_default_edge_options

OSMNX_QUERY = 'Kamppi, Helsinki, Finland'
TILE_LAYER_URL = '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
TILE_LAYER_SUBDOMAINS = 'abcd'
TILE_LAYER_ATTRIBUTION = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
MAP_CENTER = [60.1663, 24.9313]
MAP_ZOOM = 15
MAP_STYLE = {'width': '100%', 'height': '84vh'}
TILE_LAYER_OPACITY = '20%'

# retrieve the road network topology and data from OSM
road_network = ox.graph_from_place(OSMNX_QUERY, network_type='drive') 
nodes_data, edges_data = load_from_osmnx_graph(road_network)

# assign random weights to nodes and edges by using a power-law distribution
for node in nodes_data: node["data"]["weight"] = 1 - np.random.power(a=3, size=None)
for edge in edges_data: edge["data"]["weight"] = 1 - np.random.power(a=3, size=None)

# set visual options for nodes
node_options = get_default_node_options()
node_options["alpha_default"] = 0.25
node_options["size_method"] = NodeSizeMethod.SCALE
node_options["size_scale_field"] = "weight"

# set visual options for edges
edge_options = get_default_edge_options()
edge_options["width_method"] = EdgeWidthMethod.SCALE
edge_options["width_scale_field"] = "weight"
edge_options["color_method"] = EdgeColorMethod.SCALE
edge_options["color_scale_field"] = "weight"
edge_options["color_scale_left"] = 0xcbdbff
edge_options["color_scale_right"] = 0x06696

# dashboard setup
app = Dash()
app.layout = Div([
    SylvereyeRoadNetwork(
                         id='sylvereye-roadnet',
                         tile_layer_url=TILE_LAYER_URL,
                         tile_layer_subdomains=TILE_LAYER_SUBDOMAINS,
                         tile_layer_attribution=TILE_LAYER_ATTRIBUTION,
                         map_center=MAP_CENTER,
                         map_zoom=MAP_ZOOM,
                         map_style=MAP_STYLE,
                         nodes_data=nodes_data,
                         edges_data=edges_data,
                         node_options=node_options,
                         edge_options=edge_options,
                         tile_layer_opacity=TILE_LAYER_OPACITY
                        )    
])

if __name__ == '__main__':
    app.run_server()
```
