// Author: Alberto Garcia-Robledo
// Copyright (c) 2020 Centro de Investigación en Ciencias de Información Geoespacial, A.C.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import LeafletSylvereyeRoadNetwork from '../LeafletSylvereyeRoadNetwork';
import {
    NodeColorMethod, NodeSizeMethod, NodeAlphaMethod, NodeVisibilityMethod,
    EdgeColorMethod, EdgeWidthMethod, EdgeAlphaMethod, EdgeVisibilityMethod,
    MarkerColorMethod, MarkerIconMethod, MarkerSizeMethod, MarkerAlphaMethod, MarkerVisibilityMethod,
} from '../LeafletSylvereyeRoadNetwork';

const COORD_EPSILON = 1e-9;

// Child of MapContainer: bridges Leaflet map state with Dash props. Replaces
// the onViewportChanged prop that react-leaflet 2 exposed on <Map>.
const MapStateSync = ({ setProps, map_center, map_zoom }) => {
    const map = useMap();

    useMapEvents({
        moveend: () => {
            const c = map.getCenter();
            setProps({ map_center: [c.lat, c.lng], map_zoom: map.getZoom() });
        },
        zoomend: () => {
            const c = map.getCenter();
            setProps({ map_center: [c.lat, c.lng], map_zoom: map.getZoom() });
        },
    });

    // Apply programmatic map_center / map_zoom updates (from Dash callbacks)
    // by calling setView. Skip when the map already matches to avoid an
    // infinite moveend -> setProps -> useEffect loop.
    useEffect(() => {
        if (!Array.isArray(map_center) || typeof map_zoom !== 'number') {
            return;
        }
        const cur = map.getCenter();
        const sameCenter =
            Math.abs(cur.lat - map_center[0]) < COORD_EPSILON &&
            Math.abs(cur.lng - map_center[1]) < COORD_EPSILON;
        const sameZoom = map.getZoom() === map_zoom;
        if (!sameCenter || !sameZoom) {
            map.setView(map_center, map_zoom);
        }
    }, [map, map_center, map_zoom]);

    return null;
};

MapStateSync.propTypes = {
    setProps: PropTypes.func,
    map_center: PropTypes.array,
    map_zoom: PropTypes.number,
};

const SylvereyeRoadNetwork = (props) => {
    const setProps = props.setProps || (() => {});

    const handlers = {
        onNodeClick: (e) => setProps({ clicked_node: e }),
        onEdgeClick: (e) => setProps({ clicked_edge: e }),
        onMarkerClick: (e) => setProps({ clicked_marker: e }),
    };

    return (
        <MapContainer
            center={props.map_center}
            zoom={props.map_zoom}
            minZoom={props.map_min_zoom}
            maxZoom={props.map_max_zoom}
            style={props.map_style}
        >
            <TileLayer
                url={props.tile_layer_url}
                attribution={props.tile_layer_attribution}
                opacity={props.tile_layer_opacity}
                subdomains={props.tile_layer_subdomains}
            />
            <MapStateSync
                setProps={setProps}
                map_center={props.map_center}
                map_zoom={props.map_zoom}
            />
            <LeafletSylvereyeRoadNetwork {...props} {...handlers} />
        </MapContainer>
    );
};

export default SylvereyeRoadNetwork;

SylvereyeRoadNetwork.defaultProps = {
    edges_data: [],
    nodes_data: [],
    markers_data: [],
    show_arrows: true,
    show_edges: true,
    show_nodes: true,
    show_markers: true,
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
