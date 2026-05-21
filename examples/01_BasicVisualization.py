import os
import osmnx as ox
from dash import Dash, html
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph

OSMNX_QUERY = 'Kamppi, Helsinki, Finland'
TILE_LAYER_URL = '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
TILE_LAYER_SUBDOMAINS = 'abcd'
TILE_LAYER_ATTRIBUTION = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
MAP_CENTER = [60.1663, 24.9313]
MAP_ZOOM = 15
MAP_STYLE = {'width': '100%', 'height': '98vh'}
TILE_LAYER_OPACITY = 0.2

# Load the road network: use the committed graphml fixture if present,
# otherwise download from OSM and cache it for next time.
CACHE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cache', 'kamppi.graphml')
if os.path.exists(CACHE_FILE):
    road_network = ox.load_graphml(CACHE_FILE)
else:
    road_network = ox.graph_from_place(OSMNX_QUERY, network_type='drive')
    os.makedirs(os.path.dirname(CACHE_FILE), exist_ok=True)
    ox.save_graphml(road_network, CACHE_FILE)
nodes_data, edges_data = load_from_osmnx_graph(road_network)

# dashboard setup
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
                         tile_layer_opacity=TILE_LAYER_OPACITY
                        )
])

if __name__ == '__main__':
    app.run()