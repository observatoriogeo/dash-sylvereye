---
id: data_loading
title: API
sidebar_label: Road network loading functions
---

## Road network loading functions

Dash Sylvereye provides convenient functions to load and visualize [OpenStreetMap](https://www.openstreetmap.org/) (OSM) road network data retrieved with the excellent [OSMnx](https://github.com/gboeing/osmnx) library.

The data loading functions documented below are imported from the `dash_sylvereye.utils` module.

## `load_from_osmnx_graph`

Use the `load_from_osmnx_graph` function to get the Dash Sylvereye's `nodes_data` and `edges_data` lists out of a NetworkX graph returned by the [graph_from_place](https://osmnx.readthedocs.io/en/stable/osmnx.html#osmnx.graph.graph_from_place) function of the OSMnx library.

`load_from_osmnx_graph` populates the following OSM node data (when available) found in the source graph under the nodes `data` key:

- `osmid` (OSM ID)
- [highway](https://wiki.openstreetmap.org/wiki/Key:highway)
- `x` (longitude)
- `y` (latitude)

Content example of a nodes's `data` key:

```python
{'highway': None,
 'osmid': 3015359332,
 'x': -100.4082449,
 'y': 20.5537155}
```

`load_from_osmnx_graph` also populates the following OSM edge data (when available) found in the source graph under the edges `data` key:

- `source_osmid` (OSM ID of the edge's source node)
- `target_osmid` (OSM ID of the edge's target node)
- [access](https://wiki.openstreetmap.org/wiki/Key:access)
- [bridge](https://wiki.openstreetmap.org/wiki/Key:bridge)
- `geometry` (edge's LineString)
- [highway](https://wiki.openstreetmap.org/wiki/Key:highway)
- [junction](https://wiki.openstreetmap.org/wiki/Key:junction)
- [lanes](https://wiki.openstreetmap.org/wiki/Key:lanes)
- [length](https://wiki.openstreetmap.org/wiki/Key:length)
- [maxspeed](https://wiki.openstreetmap.org/wiki/Key:maxspeed)
- [name](https://wiki.openstreetmap.org/wiki/Key:name)
- [oneway](https://wiki.openstreetmap.org/wiki/Key:oneway)
- `osmid`
- [ref](https://wiki.openstreetmap.org/wiki/Key:ref)
- [service](https://wiki.openstreetmap.org/wiki/Key:service)

Content example of an edge's `data` key:

```python
{'access': None,
 'bridge': None,
 'geometry': 'LINESTRING (-100.3859634 20.5416189,  '
            '-100.3857662 20.5422811, -100.3856528  '
             '20.5432228, -100.38552 20.5441006,    '
             '-100.3854999 20.5444598, -100.3854269 '
             '20.5447641, -100.3851515 20.5451256)  ',
 'highway': 'unclassified',
 'id': None,
 'junction': None,
 'lanes': None,
 'length': '404.454',
 'maxspeed': None,
 'name': None,
 'oneway': 'False',
 'osmid': 351963225,
 'ref': None,
 'service': None,
 'source_osmid': '3577605387',
 'target_osmid': '3577605678'}
```

The following example retrieves the road network topology of Queretaro City with OSMnx and visualizes the data with the `SylvereyeRoadNetwork` component:

```python
import osmnx as ox
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph

OSMNX_QUERY = "Santiago de Queretaro, Queretaro, Mexico"

# retrieve road network topology and data from OSM
road_network = ox.graph_from_place(OSMNX_QUERY, network_type='drive') 
nodes_data, edges_data = load_from_osmnx_graph(road_network)

# dashboard setup
# 'app' is the app Dash object
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...
                         nodes_data=nodes_data,
                         edges_data=edges_data
                         ...
                        )
                         
])
```

The following example will pretty print the OSM data in the Dash Sylvereye nodes and edges:

```python
import pprint
import osmnx as ox
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph

OSMNX_QUERY = "Santiago de Queretaro, Queretaro, Mexico"

# retrieve the road network topology and data from OSM
road_network = ox.graph_from_place(OSMNX_QUERY, network_type='drive') 
nodes_data, edges_data = load_from_osmnx_graph(road_network)

# print the data in nodes
for node in nodes_data:
    print(f"Node {node['osmid']}:")
    pprint.pprint(node['data'])

# print the data in edges
for edge in edges_data:
    print(f"Edge {edge['data']['source_osmid']} -> {edge['data']['target_osmid']}:")
    pprint.pprint(edge['data'])
```

---

### Parameters

**Name**: g <br />
**Type**: NetworkX graph

NetworkX graph returned by the `graph_from_place` function of the OSMnx library.

### Returns

The function returns 2 values:

**Type**: `list` of `list` 

List of Dash Sylvereye nodes.

**Type**: `list` of `list` 

List of Dash Sylvereye edges.

---

## `load_from_osmnx_graphml`

Use the `load_from_osmnx_graphml` function to get the Dash Sylvereye's `nodes_data` and `edges_data` from a GraphML file saved by the [save_graphml](https://osmnx.readthedocs.io/en/stable/osmnx.html#osmnx.io.save_graphml) function of the OSMnx library. It also returns the loaded road network as a NetworkX graph.

`load_from_osmnx_graphml` populates the following OSM node data (when available) found in the source graph under the nodes `data` key:

- `osmid` (OSM ID)
- [highway](https://wiki.openstreetmap.org/wiki/Key:highway)
- `x` (longitude)
- `y` (latitude)

Content example of a nodes's `data` key:

```python
{'highway': None,
 'osmid': 3015359332,
 'x': -100.4082449,
 'y': 20.5537155}
```

`load_from_osmnx_graphml` also populates the following OSM edge data (when available) found in the source graph under the edges `data` key:

- `source_osmid` (OSM ID of the edge's source node)
- `target_osmid` (OSM ID of the edge's target node)
- [access](https://wiki.openstreetmap.org/wiki/Key:access)
- [bridge](https://wiki.openstreetmap.org/wiki/Key:bridge)
- `geometry` (edge's LineString)
- [highway](https://wiki.openstreetmap.org/wiki/Key:highway)
- [junction](https://wiki.openstreetmap.org/wiki/Key:junction)
- [lanes](https://wiki.openstreetmap.org/wiki/Key:lanes)
- [length](https://wiki.openstreetmap.org/wiki/Key:length)
- [maxspeed](https://wiki.openstreetmap.org/wiki/Key:maxspeed)
- [name](https://wiki.openstreetmap.org/wiki/Key:name)
- [oneway](https://wiki.openstreetmap.org/wiki/Key:oneway)
- `osmid`
- [ref](https://wiki.openstreetmap.org/wiki/Key:ref)
- [service](https://wiki.openstreetmap.org/wiki/Key:service)

Content example of an edge's `data` key:

```python
{'access': None,
 'bridge': None,
 'geometry': 'LINESTRING (-100.3859634 20.5416189,  '
            '-100.3857662 20.5422811, -100.3856528  '
             '20.5432228, -100.38552 20.5441006,    '
             '-100.3854999 20.5444598, -100.3854269 '
             '20.5447641, -100.3851515 20.5451256)  ',
 'highway': 'unclassified',
 'id': None,
 'junction': None,
 'lanes': None,
 'length': '404.454',
 'maxspeed': None,
 'name': None,
 'oneway': 'False',
 'osmid': 351963225,
 'ref': None,
 'service': None,
 'source_osmid': '3577605387',
 'target_osmid': '3577605678'}
```

The following example loads from disk the road network topology from the `Queretaro.graphml` file and visualizes the data with the `SylvereyeRoadNetwork` component:

```python
import osmnx as ox
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graphml

GRAPHML_FILEN = "data/Queretaro.graphml"

# load road network topology and data from disk
nodes_data, edges_data, g = load_from_osmnx_graphml(GRAPHML_FILEN)

# print number of nodes and edges from the loaded NetworkX graph
print(f'Nodes: {g.number_of_nodes()} / Edges: {g.number_of_edges()}')

# dashboard setup
# 'app' is the app Dash object
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...
                         nodes_data=nodes_data,
                         edges_data=edges_data
                         ...
                        )
                         
])
```

The following example will pretty print the OSM data in the Dash Sylvereye nodes and edges loaded from disk:

```python
import pprint
import osmnx as ox
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graphml

GRAPHML_FILEN = "data/Queretaro.graphml"

# load road network topology and data from disk
nodes_data, edges_data, g = load_from_osmnx_graphml(GRAPHML_FILEN)

# print number of nodes and edges from the loaded NetworkX graph
print(f'Nodes: {g.number_of_nodes()} / Edges: {g.number_of_edges()}')

# print the data in nodes
for node in nodes_data:
    print(f"Node {node['osmid']}:")
    pprint.pprint(node['data'])

# print the data in edges
for edge in edges_data:
    print(f"Edge {edge['data']['source_osmid']} -> {edge['data']['target_osmid']}:")
    pprint.pprint(edge['data'])
```

---

### Parameters

**Name**: `filen` <br />
**Type**: `str`

File name of the GraphML file generated by the `save_graphml` function of the OSMnx library.

### Returns

The function returns 3 values:

**Type**: `list` of `list` 

List of Dash Sylvereye nodes.

**Type**: `list` of `list` 

List of Dash Sylvereye edges.

**Type**: NetworkX graph. 

NetworkX graph of the loaded road network.
 
---