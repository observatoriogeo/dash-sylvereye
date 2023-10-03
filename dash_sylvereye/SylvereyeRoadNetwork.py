# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class SylvereyeRoadNetwork(Component):
    """A SylvereyeRoadNetwork component.


Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The children of this component.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- clicked_edge (dict; optional):
    Clicked edge.

- clicked_marker (dict; optional):
    Clicked marker.

- clicked_node (dict; optional):
    Clicked node.

- current_state (dict; optional):
    Current state.

- debug_options (dict; default {}):
    Debug options.

- edge_options (dict; default {    color_method: EdgeColorMethod.DEFAULT,    width_method: EdgeWidthMethod.DEFAULT,    alpha_method: EdgeAlphaMethod.DEFAULT,    visibility_method: EdgeVisibilityMethod.ALWAYS,    color_default: 0x06696,    width_default: 0.25,    alpha_default: 1.0,    alpha_min: 0.0,    show_edge_hit_polygons: False}):
    Edge options.

- edges_data (list; optional):
    Edges data.

- map_center (list; default [38.64, -90.24]):
    Map center.

- map_max_zoom (number; default 20):
    Map max zoom.

- map_min_zoom (number; default 3):
    Map min zoom.

- map_style (dict; default {'width': '100%', 'height': '98vh'}):
    Map style.

- map_zoom (number; default 3):
    Map zoom.

- marker_options (dict; default {    color_method: MarkerColorMethod.DEFAULT,    icon_method: MarkerIconMethod.DEFAULT,    size_method: MarkerSizeMethod.DEFAULT,    alpha_method: MarkerAlphaMethod.DEFAULT,    visibility_method: MarkerVisibilityMethod.ALWAYS,    color_default: 0x066cc,    size_default: 0.25,    size_default_scale_min: 0.25,    size_default_scale_max: 0.5,    alpha_default: 1.0,    enable_tooltips: False,    enable_zoom_scaling: False}):
    Marker options.

- markers_data (list; optional):
    Markers data.

- node_options (dict; default {    color_method: NodeColorMethod.DEFAULT,    size_method: NodeSizeMethod.DEFAULT,    alpha_method: NodeAlphaMethod.DEFAULT,    visibility_method: NodeVisibilityMethod.ALWAYS,    color_default: 0xa10000,    size_default: 0.005,    alpha_default: 1.0}):
    Node options.

- nodes_data (list; optional):
    Nodes data.

- pane (string; optional):
    The leaflet pane of the component.

- show_arrows (boolean; default True):
    Show/hide arrows.

- show_edges (boolean; default True):
    Show/hide edges.

- show_markers (boolean; optional):
    Show/hide markers.

- show_nodes (boolean; default True):
    Show/hide nodes.

- tile_layer_attribution (string; default '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'):
    Tile layer attribution.

- tile_layer_opacity (number; default 1.0):
    Tile layer opacity.

- tile_layer_subdomains (string; default "abc"):
    Tile layer subdomains.

- tile_layer_url (string; default "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"):
    Tile layer URL."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_sylvereye'
    _type = 'SylvereyeRoadNetwork'
    @_explicitize_args
    def __init__(self, children=None, id=Component.UNDEFINED, pane=Component.UNDEFINED, edges_data=Component.UNDEFINED, nodes_data=Component.UNDEFINED, node_options=Component.UNDEFINED, edge_options=Component.UNDEFINED, marker_options=Component.UNDEFINED, markers_data=Component.UNDEFINED, show_arrows=Component.UNDEFINED, show_edges=Component.UNDEFINED, show_nodes=Component.UNDEFINED, show_markers=Component.UNDEFINED, debug_options=Component.UNDEFINED, clicked_node=Component.UNDEFINED, clicked_edge=Component.UNDEFINED, clicked_marker=Component.UNDEFINED, current_state=Component.UNDEFINED, map_center=Component.UNDEFINED, map_zoom=Component.UNDEFINED, map_min_zoom=Component.UNDEFINED, map_max_zoom=Component.UNDEFINED, map_style=Component.UNDEFINED, tile_layer_url=Component.UNDEFINED, tile_layer_attribution=Component.UNDEFINED, tile_layer_subdomains=Component.UNDEFINED, tile_layer_opacity=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'clicked_edge', 'clicked_marker', 'clicked_node', 'current_state', 'debug_options', 'edge_options', 'edges_data', 'map_center', 'map_max_zoom', 'map_min_zoom', 'map_style', 'map_zoom', 'marker_options', 'markers_data', 'node_options', 'nodes_data', 'pane', 'show_arrows', 'show_edges', 'show_markers', 'show_nodes', 'tile_layer_attribution', 'tile_layer_opacity', 'tile_layer_subdomains', 'tile_layer_url']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'clicked_edge', 'clicked_marker', 'clicked_node', 'current_state', 'debug_options', 'edge_options', 'edges_data', 'map_center', 'map_max_zoom', 'map_min_zoom', 'map_style', 'map_zoom', 'marker_options', 'markers_data', 'node_options', 'nodes_data', 'pane', 'show_arrows', 'show_edges', 'show_markers', 'show_nodes', 'tile_layer_attribution', 'tile_layer_opacity', 'tile_layer_subdomains', 'tile_layer_url']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        super(SylvereyeRoadNetwork, self).__init__(children=children, **args)
