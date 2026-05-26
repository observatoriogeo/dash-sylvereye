---
id: data_loading
title: API
sidebar_label: Road network loading functions
---

## Road network loading functions

Dash Sylvereye provides helpers for loading and visualizing [OpenStreetMap](https://www.openstreetmap.org/) (OSM) road-network data produced by the [OSMnx](https://github.com/gboeing/osmnx) library.

The loading functions documented below live in the `dash_sylvereye.utils` module.

## `load_from_osmnx_graph`

`load_from_osmnx_graph` converts a NetworkX graph returned by OSMnx's [`graph_from_place`](https://osmnx.readthedocs.io/en/stable/osmnx.html#osmnx.graph.graph_from_place) into the `nodes_data` and `edges_data` lists consumed by Dash Sylvereye.

For each node, `load_from_osmnx_graph` copies the following OSM fields (when present) into the node's `data` key:

- `osmid` (OSM ID)
- [highway](https://wiki.openstreetmap.org/wiki/Key:highway)
- `x` (longitude)
- `y` (latitude)

Example contents of a node's `data` key:

```python
{'highway': None,
 'osmid': 3015359332,
 'x': -100.4082449,
 'y': 20.5537155}
```

For each edge, `load_from_osmnx_graph` copies the following OSM fields (when present) into the edge's `data` key:

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

Example contents of an edge's `data` key:

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

The following example fetches the road-network topology of Querétaro through OSMnx and visualizes the result with `SylvereyeRoadNetwork`:

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

The following example pretty-prints the OSM data attached to the Dash Sylvereye nodes and edges:

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

**Type**: `list` of `dict`

List of Dash Sylvereye nodes.

**Type**: `list` of `dict`

List of Dash Sylvereye edges.

---

## `load_from_osmnx_graphml`

`load_from_osmnx_graphml` reads a GraphML file produced by OSMnx's [`save_graphml`](https://osmnx.readthedocs.io/en/stable/osmnx.html#osmnx.io.save_graphml) and returns the Dash Sylvereye `nodes_data` and `edges_data` lists, plus the underlying NetworkX graph.

For each node, `load_from_osmnx_graphml` copies the following OSM fields (when present) into the node's `data` key:

- `osmid` (OSM ID)
- [highway](https://wiki.openstreetmap.org/wiki/Key:highway)
- `x` (longitude)
- `y` (latitude)

Example contents of a node's `data` key:

```python
{'highway': None,
 'osmid': 3015359332,
 'x': -100.4082449,
 'y': 20.5537155}
```

For each edge, `load_from_osmnx_graphml` copies the following OSM fields (when present) into the edge's `data` key:

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

Example contents of an edge's `data` key:

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

The following example loads a road network from `Queretaro.graphml` and visualizes it with `SylvereyeRoadNetwork`:

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

The following example pretty-prints the OSM data attached to the Dash Sylvereye nodes and edges loaded from disk:

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

**Type**: `list` of `dict`

List of Dash Sylvereye nodes.

**Type**: `list` of `dict`

List of Dash Sylvereye edges.

**Type**: NetworkX graph

NetworkX graph of the loaded road network.

---

## `load_from_sumo_network`

`load_from_sumo_network` builds a Dash Sylvereye road network from a [SUMO](https://eclipse.dev/sumo/) `.net.xml` network file. It returns the same `(nodes_data, edges_data, g)` triple as `load_from_osmnx_graphml`, where `g` is the underlying SUMO `sumolib.net.Net` object.

It can be imported from the `dash_sylvereye.utils` module.

:::caution
This function requires the [SUMO](https://eclipse.dev/sumo/) traffic simulator's Python bindings (`sumolib`). They are not installed with the base `dash-sylvereye` package. Either:

- Install the optional extra: `pip install dash-sylvereye[sumolib]` (pulls `sumolib` from PyPI).
- Or install SUMO system-wide (`apt install sumo` on Debian/Ubuntu) and leave the default `sumolib_path` so the system package is found on `sys.path`.

Without one of those, calling `load_from_sumo_network` raises `ModuleNotFoundError: No module named 'sumolib'`.
:::

The following example loads a SUMO network from disk and visualizes it with `SylvereyeRoadNetwork`:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_sumo_network

SUMO_NET_FILEN = "data/queretaro.net.xml"

# load road network topology from a SUMO net.xml file
nodes_data, edges_data, g = load_from_sumo_network(SUMO_NET_FILEN)

# 'app' is the app Dash object
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...
                         nodes_data=nodes_data,
                         edges_data=edges_data,
                         ...
                        )
])
```

Each node's `data` dict carries: `id`, `type`, `lat`, `lon`. Each edge's `data` dict carries: `id`, `from_node_id`, `to_node_id`, `length`, `name`, `priority`, `is_special`, `speed`, `function`, `lane_number`, and a `lanes` sub-list with per-lane `id`, `length`, `speed`, `width`, and `coords`.

---

### Parameters

**Name**: `filen` <br />
**Type**: `str`

File name of the SUMO `.net.xml` network file.

**Name**: `sumolib_path` <br />
**Type**: `str` <br />
**Default**: `"/usr/share/sumo/tools"`

Filesystem path to the SUMO `sumolib` library, usually the `tools/` directory of the SUMO install. Ignored when `sumolib` is already importable (e.g. installed via the `sumolib` extra).

### Returns

The function returns 3 values:

**Type**: `list` of `dict`

List of Dash Sylvereye nodes.

**Type**: `list` of `dict`

List of Dash Sylvereye edges.

**Type**: `sumolib.net.Net`

The SUMO road network object.

---