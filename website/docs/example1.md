---
id: example1
title: Examples
sidebar_label: Basic visualization
---

## Example: Minimal application

### Live visualization

>**Note**
>
>The example below is a live visualization. Please wait until the Dash Sylvereye component finishes loading and drawing the road network.

<iframe src="https://visualizacion.observatoriogeo.mx/sylvereye_examples/dashboard/sylvereye_examples/example-1" title="" style={{overflow:'hidden',height:'500px',width:'100%'}}></iframe>
<br />
<form action="https://visualizacion.observatoriogeo.mx/sylvereye_examples/dashboard/sylvereye_examples/example-1">
    <input type="submit" value="View in full-window" style={{float: 'right'}}/>
</form>
<br />

### Description

To insert a road network visualization in a Dash dashboard, just nest a `SylvereyeRoadNetwork` component inside a `Div` Dash component:

```python
from dash_sylvereye import SylvereyeRoadNetwork
...
app = Dash()
app.layout = Div([
    SylvereyeRoadNetwork(
                         id='sylvereye-roadnet',
                         ...
                        )
])
...
```

Dash Sylvereye provides functions to load networks produced by the [OSMnx library](https://github.com/gboeing/osmnx). 

In this example, the road network of Kamppi, Helsinki, Finland is obtained from [OpenStreetMap](http://openstreetmap.org/) via OSMnx and then transformed into a Dash Sylvereye’s road network by using the `load_from_osmnx_graph` function:

```python
...
OSMNX_QUERY = 'Kamppi, Helsinki, Finland'

# retrieve the road network topology and data from OSM
road_network = ox.graph_from_place(OSMNX_QUERY, network_type='drive') 
nodes_data, edges_data = load_from_osmnx_graph(road_network)
...
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...
                         nodes_data=nodes_data,
                         edges_data=edges_data,
                         ...
                        )
])
...
```

Apart from the road network’s data, you only have to provide information about the map and the web tile layer by using an interface similar to that of [Leaflet.js](https://leafletjs.com/):

```python
...
TILE_LAYER_URL = '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
TILE_LAYER_SUBDOMAINS = 'abcd'
TILE_LAYER_ATTRIBUTION = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
MAP_CENTER = [60.1663, 24.9313]
MAP_ZOOM = 15
MAP_STYLE = {'width': '100%', 'height': '98vh'}
TILE_LAYER_OPACITY = '20%'
...
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...                   
                         tile_layer_url=TILE_LAYER_URL,
                         tile_layer_subdomains=TILE_LAYER_SUBDOMAINS,
                         tile_layer_attribution=TILE_LAYER_ATTRIBUTION,      
                         map_center=MAP_CENTER,
                         map_zoom=MAP_ZOOM,
                         map_style=MAP_STYLE,
                         tile_layer_opacity=TILE_LAYER_OPACITY
                        )
])
...
```

### Full example

The full example is listed as follows:

```python
import osmnx as ox
from dash import Dash
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph

OSMNX_QUERY = 'Kamppi, Helsinki, Finland'
TILE_LAYER_URL = '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
TILE_LAYER_SUBDOMAINS = 'abcd'
TILE_LAYER_ATTRIBUTION = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
MAP_CENTER = [60.1663, 24.9313]
MAP_ZOOM = 15
MAP_STYLE = {'width': '100%', 'height': '98vh'}
TILE_LAYER_OPACITY = '20%'

# retrieve the road network topology and data from OSM
road_network = ox.graph_from_place(OSMNX_QUERY, network_type='drive') 
nodes_data, edges_data = load_from_osmnx_graph(road_network)

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
                         tile_layer_opacity=TILE_LAYER_OPACITY
                        )
])

if __name__ == '__main__':
    app.run_server()
```



