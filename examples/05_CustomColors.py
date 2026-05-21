"""Demonstrate per-element custom colors, node sizes, and edge widths.

When node_options["color_method"] == NodeColorMethod.CUSTOM, the component
reads the "color" field on each node dict instead of using node_options
["color_default"] or interpolating a scale. The same per-element override
pattern applies to size (NodeSizeMethod.CUSTOM reads node["size"]) and to
edge width (EdgeWidthMethod.CUSTOM reads edge["width"]). This lets you
encode any classification or measurement you compute in Python directly
into the visual properties of each element.

Here we derive:
  - node color and size from node degree (junction complexity):
    degree >= 4 -> red + large, degree == 3 -> orange + medium,
    degree <= 2 -> green + small.
  - edge color and width from length quartile (Viridis-style sequence,
    width grows with length).
"""
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

CACHE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cache', 'kamppi.graphml')
if os.path.exists(CACHE_FILE):
    road_network = ox.load_graphml(CACHE_FILE)
else:
    road_network = ox.graph_from_place(OSMNX_QUERY, network_type='drive')
    os.makedirs(os.path.dirname(CACHE_FILE), exist_ok=True)
    ox.save_graphml(road_network, CACHE_FILE)
nodes_data, edges_data = load_from_osmnx_graph(road_network)

# Color and SIZE nodes by their degree (number of incident edges).
# Warm-to-cool gradient: vivid red for the busiest junctions, fading to
# muted green for endpoints. Diameter grows with degree.
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

# Color and WIDTH edges by length quartile (Viridis-style; both color and
# width grow with edge length).
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

# Switch to CUSTOM methods so the component reads color/size/width from
# each element's dict instead of using the *_default options.
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
        tile_layer_opacity=TILE_LAYER_OPACITY,
    )
])

if __name__ == '__main__':
    app.run()
