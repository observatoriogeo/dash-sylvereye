# import osmnx as ox
from dash import Dash
from dash_html_components import Div
from dash.dependencies import Input, Output
from dash_sylvereye import SylvereyeRoadNetwork
# from dash_sylvereye.utils import load_from_osmnx_graph
from dash_sylvereye.utils import load_from_osmnx_graphml  # debug

OSMNX_QUERY = "Santiago de Queretaro, Queretaro, Mexico"
TILE_LAYER_URL = '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
TILE_LAYER_SUBDOMAINS = 'abcd'
TILE_LAYER_ATTRIBUTION = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
MAP_CENTER = [20.5858171, -100.3888608]
MAP_ZOOM = 14
MAP_STYLE = {'width': '100%', 'height': '98vh'}

# road_network = ox.graph_from_place(OSMNX_QUERY, network_type='drive')
# nodes_data, edges_data = load_from_osmnx_graph(road_network)

nodes_data, edges_data, _ = load_from_osmnx_graphml("data/Queretaro.graphml")

app = Dash()
app.layout = Div([
    SylvereyeRoadNetwork(id='sylvereye-roadnet',
                            tile_layer_url=TILE_LAYER_URL,
                            tile_layer_subdomains=TILE_LAYER_SUBDOMAINS,
                            tile_layer_attribution=TILE_LAYER_ATTRIBUTION,
                            map_center=MAP_CENTER,
                            map_zoom=MAP_ZOOM,
                            map_style=MAP_STYLE,
                            nodes_data=nodes_data,
                            edges_data=edges_data
                         )
])


if __name__ == '__main__':
    app.run_server(port=8084)
