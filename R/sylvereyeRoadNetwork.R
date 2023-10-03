# AUTO GENERATED FILE - DO NOT EDIT

#' @export
sylvereyeRoadNetwork <- function(children=NULL, id=NULL, clicked_edge=NULL, clicked_marker=NULL, clicked_node=NULL, current_state=NULL, debug_options=NULL, edge_options=NULL, edges_data=NULL, map_center=NULL, map_max_zoom=NULL, map_min_zoom=NULL, map_style=NULL, map_zoom=NULL, marker_options=NULL, markers_data=NULL, node_options=NULL, nodes_data=NULL, pane=NULL, show_arrows=NULL, show_edges=NULL, show_markers=NULL, show_nodes=NULL, tile_layer_attribution=NULL, tile_layer_opacity=NULL, tile_layer_subdomains=NULL, tile_layer_url=NULL) {
    
    props <- list(children=children, id=id, clicked_edge=clicked_edge, clicked_marker=clicked_marker, clicked_node=clicked_node, current_state=current_state, debug_options=debug_options, edge_options=edge_options, edges_data=edges_data, map_center=map_center, map_max_zoom=map_max_zoom, map_min_zoom=map_min_zoom, map_style=map_style, map_zoom=map_zoom, marker_options=marker_options, markers_data=markers_data, node_options=node_options, nodes_data=nodes_data, pane=pane, show_arrows=show_arrows, show_edges=show_edges, show_markers=show_markers, show_nodes=show_nodes, tile_layer_attribution=tile_layer_attribution, tile_layer_opacity=tile_layer_opacity, tile_layer_subdomains=tile_layer_subdomains, tile_layer_url=tile_layer_url)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'SylvereyeRoadNetwork',
        namespace = 'dash_sylvereye',
        propNames = c('children', 'id', 'clicked_edge', 'clicked_marker', 'clicked_node', 'current_state', 'debug_options', 'edge_options', 'edges_data', 'map_center', 'map_max_zoom', 'map_min_zoom', 'map_style', 'map_zoom', 'marker_options', 'markers_data', 'node_options', 'nodes_data', 'pane', 'show_arrows', 'show_edges', 'show_markers', 'show_nodes', 'tile_layer_attribution', 'tile_layer_opacity', 'tile_layer_subdomains', 'tile_layer_url'),
        package = 'dashSylvereye'
        )

    structure(component, class = c('dash_component', 'list'))
}
