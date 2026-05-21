import os
import osmnx as ox
from dash import Dash, html
from dash.dependencies import Input, Output
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graph, generate_markers_from_coords
from dash_sylvereye.defaults import get_default_marker_options

OSMNX_QUERY = 'Kamppi, Helsinki, Finland'
TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
TILE_LAYER_SUBDOMAINS = 'abcde'
TILE_LAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
MAP_CENTER = [60.1663, 24.9313]
MAP_ZOOM = 15
MAP_STYLE = {'width': '100%', 'height': '80vh'}
TILE_LAYER_OPACITY = 0.9

CACHE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cache', 'kamppi.graphml')
if os.path.exists(CACHE_FILE):
    road_network = ox.load_graphml(CACHE_FILE)
else:
    road_network = ox.graph_from_place(OSMNX_QUERY, network_type='drive')
    os.makedirs(os.path.dirname(CACHE_FILE), exist_ok=True)
    ox.save_graphml(road_network, CACHE_FILE)
nodes_data, edges_data = load_from_osmnx_graph(road_network)

# make 1k markers out of the coordinates of 1k randomly selected nodes
markers_coords = [ [node_data["lat"], node_data["lon"]] for node_data in nodes_data ]
markers_data = generate_markers_from_coords(markers_coords)

# automatically scale the size of markers to the zoom level
marker_options = get_default_marker_options()
marker_options["enable_zoom_scaling"] = True

# setup dashboard
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
                         markers_data=markers_data,
                         marker_options=marker_options,
                         tile_layer_opacity=TILE_LAYER_OPACITY
                        ),
    html.H2("Clicked elements:"),
    html.H3(id='h3-clicked-marker-coords')
])

@app.callback(
    Output('h3-clicked-marker-coords', 'children'),
    [Input('sylvereye-roadnet', 'clicked_marker')])
def update_marker_data(clicked_marker):  
    if clicked_marker:  
        marker = clicked_marker["marker"]
        return f'Clicked marker coords: {[ marker["lat"], marker["lon"] ]}'

if __name__ == '__main__':
    app.run()