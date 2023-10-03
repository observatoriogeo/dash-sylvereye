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
MAP_STYLE = {'width': '100%', 'height': '98vh'}
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