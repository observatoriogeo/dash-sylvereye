import osmnx as ox
from dash import Dash
from dash.dependencies import Input, Output
from dash_html_components import Div
from dash_html_components import H2, H3
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph

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
                        ),
    H2("Clicked elements:"),
    H3(id='h3-clicked-node-coords'),
    H3(id='h3-clicked-edge-coords')    
])

@app.callback(
    Output('h3-clicked-node-coords', 'children'),
    [Input('sylvereye-roadnet', 'clicked_node')])
def update_node_data(clicked_node):    
    if clicked_node:
        return f'Clicked node coords: {clicked_node["data"]["lat"]}, \
                                      {clicked_node["data"]["lon"]}'

@app.callback(
    Output('h3-clicked-edge-coords', 'children'),
    [Input('sylvereye-roadnet', 'clicked_edge')])
def update_edge_data(clicked_edge):    
    if clicked_edge:
        return f'Clicked edge coords: {clicked_edge["data"]["coords"]}'

if __name__ == '__main__':
    app.run_server()