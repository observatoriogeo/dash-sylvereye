// Author: Alberto Garcia-Robledo
// Copyright (c) 2020 Centro de Investigación en Ciencias de Información Geoespacial, A.C.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Map as LeafletMap } from 'react-leaflet';
import { TileLayer as LeafletTileLayer } from 'react-leaflet';

import '../../../node_modules/leaflet/dist/leaflet.css';

import LeafletSylvereyeRoadNetwork from '../LeafletSylvereyeRoadNetwork';
import { NodeColorMethod, NodeSizeMethod, NodeAlphaMethod, NodeVisibilityMethod, EdgeColorMethod, EdgeWidthMethod, EdgeAlphaMethod, EdgeVisibilityMethod, MarkerColorMethod, MarkerIconMethod, MarkerSizeMethod, MarkerAlphaMethod, MarkerVisibilityMethod } from '../LeafletSylvereyeRoadNetwork';

export default class SylvereyeRoadNetwork extends Component {
    render() {
        const nProps = Object.assign({}, this.props);

        nProps.onNodeClick = (e) => {
            nProps.setProps({ clicked_node: e });
        }

        nProps.onEdgeClick = (e) => {
            nProps.setProps({ clicked_edge: e });
        }

        nProps.onMarkerClick = (e) => {
            nProps.setProps({ clicked_marker: e });
        }

        nProps.onStateChange = (e) => {
            nProps.setProps({ current_state: e });
        }

        const onViewportChangedHandler = (e) => {
            nProps.setProps({ map_zoom: e.zoom, map_center: e.center });
        };

        // Render the leaflet component.
        return <LeafletMap center={nProps.map_center} zoom={nProps.map_zoom} minZoom={nProps.map_min_zoom} maxZoom={nProps.map_max_zoom} style={nProps.map_style} onViewportChanged={onViewportChangedHandler}>
            <LeafletTileLayer url={nProps.tile_layer_url} attribution={nProps.tile_layer_attribution} opacity={nProps.tile_layer_opacity} subdomains={nProps.tile_layer_subdomains} />
            <LeafletSylvereyeRoadNetwork {...nProps} />
        </LeafletMap>
    }
}

SylvereyeRoadNetwork.defaultProps = {
    edges_data: [],
    nodes_data: [],
    markers_data: [],
    show_arrows: true,
    show_edges: true,
    show_nodes: true,
    clicked_node: null,
    clicked_edge: null,
    clicked_marker: null,
    node_options: {
        color_method: NodeColorMethod.DEFAULT,
        size_method: NodeSizeMethod.DEFAULT,
        alpha_method: NodeAlphaMethod.DEFAULT,
        visibility_method: NodeVisibilityMethod.ALWAYS,
        color_default: 0xa10000,
        size_default: 0.005,
        alpha_default: 1.0
    },
    edge_options: {
        color_method: EdgeColorMethod.DEFAULT,
        width_method: EdgeWidthMethod.DEFAULT,
        alpha_method: EdgeAlphaMethod.DEFAULT,
        visibility_method: EdgeVisibilityMethod.ALWAYS,
        color_default: 0x06696,
        width_default: 0.25,
        alpha_default: 1.0,
        alpha_min: 0.0,
        show_edge_hit_polygons: false
    },
    marker_options: {
        color_method: MarkerColorMethod.DEFAULT,
        icon_method: MarkerIconMethod.DEFAULT,
        size_method: MarkerSizeMethod.DEFAULT,
        alpha_method: MarkerAlphaMethod.DEFAULT,
        visibility_method: MarkerVisibilityMethod.ALWAYS,
        color_default: 0x066cc,
        size_default: 0.25,
        size_default_scale_min: 0.25,
        size_default_scale_max: 0.5,
        alpha_default: 1.0,
        enable_tooltips: false,
        enable_zoom_scaling: false
    },
    debug_options: {

    },
    map_center: [38.64, -90.24],
    map_zoom: 3,
    map_max_zoom: 20,
    map_min_zoom: 3,
    map_style: {'width': '100%', 'height': '98vh'},
    tile_layer_url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    tile_layer_attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    tile_layer_subdomains: "abc",
    tile_layer_opacity: 1.0

};

SylvereyeRoadNetwork.propTypes = {

    // Inherited from MapLayer

    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * The children of this component
     */
    children: PropTypes.node,

    /**
     * The leaflet pane of the component
     */
    pane: PropTypes.string,

    /**
     * Edges data
     */
    edges_data: PropTypes.array,

    /**
    * Nodes data
    */
    nodes_data: PropTypes.array,

    /**
     * Node options
     */
    node_options: PropTypes.object,

    /**
     * Edge options
     */
    edge_options: PropTypes.object,

    /**
     * Marker options
     */
    marker_options: PropTypes.object,

    /**
     * Markers data
     */
    markers_data: PropTypes.array,

    /**
     * Show/hide arrows
     */
    show_arrows: PropTypes.bool,

    /**
     * Show/hide edges
     */
    show_edges: PropTypes.bool,

    /**
     * Show/hide nodes
     */
    show_nodes: PropTypes.bool,

    /**
     * Show/hide markers
     */
    show_markers: PropTypes.bool,

    /**
     * Debug options
     */
    debug_options: PropTypes.object,

    // Events
    setProps: PropTypes.func,

    /**
     * Clicked node  
     */
    clicked_node: PropTypes.object,

    /**
     * Clicked edge  
     */
    clicked_edge: PropTypes.object,

    /**
     * Clicked marker  
     */
    clicked_marker: PropTypes.object,

    /**
     * Current state
     */
    current_state: PropTypes.object,

    /**
     * Map center
     */
    map_center: PropTypes.array,

    /**
     * Map zoom
     */
    map_zoom: PropTypes.number,

    /**
     * Map min zoom
     */
    map_min_zoom: PropTypes.number,

    /**
     * Map max zoom
     */
    map_max_zoom: PropTypes.number,

    /**
     * Map style
     */
    map_style: PropTypes.object,

    /**
     * Tile layer URL
     */
    tile_layer_url: PropTypes.string,

    /**
     * Tile layer attribution
     */
    tile_layer_attribution: PropTypes.string,

    /**
     * Tile layer subdomains
     */
    tile_layer_subdomains: PropTypes.string,

    /**
     * Tile layer opacity
     */
    tile_layer_opacity: PropTypes.number

};

