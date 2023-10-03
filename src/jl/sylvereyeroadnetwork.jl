# AUTO GENERATED FILE - DO NOT EDIT

export sylvereyeroadnetwork

"""
    sylvereyeroadnetwork(;kwargs...)
    sylvereyeroadnetwork(children::Any;kwargs...)
    sylvereyeroadnetwork(children_maker::Function;kwargs...)


A SylvereyeRoadNetwork component.

Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The children of this component
- `id` (String; optional): The ID used to identify this component in Dash callbacks
- `clicked_edge` (Dict; optional): Clicked edge
- `clicked_marker` (Dict; optional): Clicked marker
- `clicked_node` (Dict; optional): Clicked node
- `current_state` (Dict; optional): Current state
- `debug_options` (Dict; optional): Debug options
- `edge_options` (Dict; optional): Edge options
- `edges_data` (Array; optional): Edges data
- `map_center` (Array; optional): Map center
- `map_max_zoom` (Real; optional): Map max zoom
- `map_min_zoom` (Real; optional): Map min zoom
- `map_style` (Dict; optional): Map style
- `map_zoom` (Real; optional): Map zoom
- `marker_options` (Dict; optional): Marker options
- `markers_data` (Array; optional): Markers data
- `node_options` (Dict; optional): Node options
- `nodes_data` (Array; optional): Nodes data
- `pane` (String; optional): The leaflet pane of the component
- `show_arrows` (Bool; optional): Show/hide arrows
- `show_edges` (Bool; optional): Show/hide edges
- `show_markers` (Bool; optional): Show/hide markers
- `show_nodes` (Bool; optional): Show/hide nodes
- `tile_layer_attribution` (String; optional): Tile layer attribution
- `tile_layer_opacity` (Real; optional): Tile layer opacity
- `tile_layer_subdomains` (String; optional): Tile layer subdomains
- `tile_layer_url` (String; optional): Tile layer URL
"""
function sylvereyeroadnetwork(; kwargs...)
        available_props = Symbol[:children, :id, :clicked_edge, :clicked_marker, :clicked_node, :current_state, :debug_options, :edge_options, :edges_data, :map_center, :map_max_zoom, :map_min_zoom, :map_style, :map_zoom, :marker_options, :markers_data, :node_options, :nodes_data, :pane, :show_arrows, :show_edges, :show_markers, :show_nodes, :tile_layer_attribution, :tile_layer_opacity, :tile_layer_subdomains, :tile_layer_url]
        wild_props = Symbol[]
        return Component("sylvereyeroadnetwork", "SylvereyeRoadNetwork", "dash_sylvereye", available_props, wild_props; kwargs...)
end

sylvereyeroadnetwork(children::Any; kwargs...) = sylvereyeroadnetwork(;kwargs..., children = children)
sylvereyeroadnetwork(children_maker::Function; kwargs...) = sylvereyeroadnetwork(children_maker(); kwargs...)

