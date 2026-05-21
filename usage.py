import os
from dash import Dash, html
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import load_from_osmnx_graphml

TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
TILE_LAYER_SUBDOMAINS = 'abcde'
TILE_LAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
MAP_CENTER = [60.1663, 24.9313]
MAP_ZOOM = 15
MAP_STYLE = {'width': '100%', 'height': '98vh'}

GRAPHML_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'examples', 'cache', 'kamppi.graphml')
nodes_data, edges_data, _ = load_from_osmnx_graphml(GRAPHML_FILE)

app = Dash()
app.layout = html.Div([
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
    app.run(port=8084)
