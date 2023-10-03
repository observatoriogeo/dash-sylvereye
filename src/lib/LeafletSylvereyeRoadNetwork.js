import { useEffect, useState} from 'react';
import L from 'leaflet';
import * as PIXI from 'pixi.js';
import 'leaflet-pixi-overlay';
import { useLeafletMap } from 'use-leaflet';

import Coordinate from 'jsts/org/locationtech/jts/geom/Coordinate.js';
import GeometryFactory from 'jsts/org/locationtech/jts/geom/GeometryFactory.js';
import BufferOp from 'jsts/org/locationtech/jts/operation/buffer/BufferOp';
import BufferParameters from 'jsts/org/locationtech/jts/operation/buffer/BufferParameters';

import RBush from 'rbush';
import chroma from 'chroma-js';
import randomString from 'random-string';


////////////////////////////////////////////////////////////
// enums
////////////////////////////////////////////////////////////

export const NodeColorMethod = {
	DEFAULT: "default",
	SCALE: "scale",
	CUSTOM: "custom"
};
Object.freeze(NodeColorMethod);

export const NodeSizeMethod = {
	DEFAULT: "default",
	SCALE: "scale",
	CUSTOM: "custom"
};
Object.freeze(NodeSizeMethod);

export const NodeAlphaMethod = {
	DEFAULT: "default",
	SCALE: "scale",
	CUSTOM: "custom"
};
Object.freeze(NodeAlphaMethod);

export const NodeVisibilityMethod = {
	ALWAYS: "always",
	CUSTOM: "custom"
};
Object.freeze(NodeVisibilityMethod);

export const EdgeColorMethod = {
	DEFAULT: "default",
	SCALE: "scale",
	CUSTOM: "custom"
};
Object.freeze(EdgeColorMethod);

export const EdgeWidthMethod = {
	DEFAULT: "default",
	SCALE: "scale",
	CUSTOM: "custom"
};
Object.freeze(EdgeWidthMethod);

export const EdgeAlphaMethod = {
	DEFAULT: "default",
	SCALE: "scale",
	CUSTOM: "custom"
};
Object.freeze(EdgeAlphaMethod);

export const EdgeVisibilityMethod = {
	ALWAYS: "always",
	CUSTOM: "custom"
};
Object.freeze(EdgeVisibilityMethod);

export const MarkerColorMethod = {
	DEFAULT: "default",
	SCALE: "scale",
	CUSTOM: "custom",
	ORIGINAL: "original"
};
Object.freeze(MarkerColorMethod);

export const MarkerIconMethod = {
	DEFAULT: "default",
	CUSTOM: "custom"
};
Object.freeze(MarkerIconMethod);

export const MarkerSizeMethod = {
	DEFAULT: "default",
	SCALE: "scale",
	CUSTOM: "custom"
};
Object.freeze(MarkerSizeMethod);

export const MarkerAlphaMethod = {
	DEFAULT: "default",
	SCALE: "scale",
	CUSTOM: "custom"
};
Object.freeze(MarkerAlphaMethod);

export const MarkerVisibilityMethod = {
	ALWAYS: "always",
	CUSTOM: "custom"
};
Object.freeze(MarkerVisibilityMethod);

////////////////////////////////////////////////////////////
// status panel
////////////////////////////////////////////////////////////

L.Control.MyControl = L.Control.extend({
	onAdd: function (map) {

		var el = L.DomUtil.create('div', 'leaflet-bar my-control hide');
		el.id = "my-control"
		el.innerHTML = '';
		el.style = "background:white"

		return el;
	}	 
});

L.control.myControl = function (opts) {
	return new L.Control.MyControl(opts);
}

////////////////////////////////////////////////////////////
// LeafletSylvereyeRoadNetwork
////////////////////////////////////////////////////////////

const LeafletSylvereyeRoadNetwork = ({
	edges_data, nodes_data, markers_data, show_arrows, show_edges, show_nodes, show_markers, onNodeClick, onEdgeClick, onMarkerClick, node_options, edge_options, marker_options, debug_options, map_center, map_zoom, map_min_zoom, map_max_zoom, map_style, tile_layer_url, tile_layer_attribution, tile_layer_opacity, tile_layer_subdomains
}) => {

	const [mainOverlay, setMainOverlay] = useState(null);

	const [mainContainer, setMainContainer] = useState(null);
	const [arrowsContainer, setArrowsContainer] = useState(null);
	const [edgesContainer, setEdgesContainer] = useState(null);
	const [nodesContainer, setNodesContainer] = useState(null);
	const [markersContainer, setMarkersContainer] = useState(null);

	const [arrowheadLoaded, setArrowheadLoaded] = useState(false);
	const [nodeIconLoaded, setNodeIconLoaded] = useState(false);
	const [markersLoaded, setMarkersLoaded] = useState(false);

	const [ignoreEdgeClick, setIgnoreEdgeClick] = useState(false);
	const [edgesQtree, setEdgesQtree] = useState(null);

	const [currentZoom, setCurrentZoom] = useState(null); // for triggering zoom re-scaling after changing the zoom level in the map
	const [markersResized, setMarkersResized] = useState(false); // for triggering zoom re-scaling of markers after resizing the markers

	const [arrowDrawCounter, setArrowDrawCounter] = useState(0); // for triggering arrow drawing
	const [edgeDrawCounter, setEdgeDrawCounter] = useState(0); // for triggering edge drawing
	const [nodeDrawCounter, setNodeDrawCounter] = useState(0); // for triggering node drawing
	const [markerDrawCounter, setMarkerDrawCounter] = useState(0); // for triggering marker drawing

	const PIXILoader = PIXI.Loader.shared;
	const map = useLeafletMap(); // map 	 
	const pass_id = randomString(); // for debugging 

	console.log(`[${pass_id}] Starting pass ============================`);

	////////////////////////////////////////////////////////////
	// utility functions
	////////////////////////////////////////////////////////////

	function getSVGIcon(iconName, customSVG = "") {
		var iconSVG = "";
		if (iconName === "arrow_head") {
			iconSVG = '<svg   xmlns:dc="http://purl.org/dc/elements/1.1/"   xmlns:cc="http://creativecommons.org/ns#"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"   xmlns:svg="http://www.w3.org/2000/svg"   xmlns="http://www.w3.org/2000/svg"   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"   width="24"   height="24"   viewBox="0 0 24 24"   version="1.1"   id="svg58"   sodipodi:docname="iconmonstr-triangle-1.svg"   inkscape:version="1.0 (b51213c273, 2020-08-10)">  <metadata     id="metadata64">    <rdf:RDF>      <cc:Work         rdf:about="">        <dc:format>image/svg+xml</dc:format>        <dc:type           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />      </cc:Work>    </rdf:RDF>  </metadata>  <defs     id="defs62" />  <sodipodi:namedview     pagecolor="#ffffff"     bordercolor="#666666"     borderopacity="1"     objecttolerance="10"     gridtolerance="10"     guidetolerance="10"     inkscape:pageopacity="0"     inkscape:pageshadow="2"     inkscape:window-width="1440"     inkscape:window-height="838"     id="namedview60"     showgrid="false"     inkscape:zoom="27.416667"     inkscape:cx="5.5987842"     inkscape:cy="12"     inkscape:window-x="0"     inkscape:window-y="25"     inkscape:window-maximized="1"     inkscape:current-layer="svg58" />  <path     d="M 2,24 V 0 l 20,12 z"     id="path56"     style="fill:#fffffd;fill-opacity:1" /></svg>';
		} else if (iconName === "node") {
			iconSVG = '<?xml version="1.0"?><svg viewBox="0 0 120 120" version="1.1"  xmlns="http://www.w3.org/2000/svg">  <circle cx="60" cy="60" r="50" fill="white"/></svg>';
		} else if (iconName === "marker_default") {
			iconSVG = '<svg style="-webkit-filter: drop-shadow( 1px 1px 1px rgba(0, 0, 0, .4));filter: drop-shadow( 1px 1px 1px rgba(0, 0, 0, .4));" xmlns="http://www.w3.org/2000/svg" fill="white" width="36" height="36" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 6.243 6.377 6.903 8 16.398 1.623-9.495 8-10.155 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.342-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>';
		} else if (iconName === "custom") {
			iconSVG = customSVG;
		} else {
			console.log(`ERROR: Unknown icon: ${iconName}.`);
		}
		return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(iconSVG)))}`;
	}

	function getMinMaxFromObjArray(objArray, attrName) {
		const attrArray = [];
		for (var obj of objArray)
			attrArray.push(obj.data[attrName]);
		const min = Math.min(...attrArray);
		const max = Math.max(...attrArray);
		return [min, max];
	}

	function stringToHex(string) {
		return parseInt(string.replace(/^#/, ''), 16); // https://stackoverflow.com/a/10288464
	}

	// find the edge clicked by the user (if any) given the
	// click point and the q-tree of the edge hit polygons.
	// adapted and simplified version of the feature finding routines in the Leaflet.PixiOverlay docs
	function findClickedEdge(latlng, qtree) {
		var i, j, k;
		const utils = mainOverlay.utils;		
		const project = utils.latLngToLayerPoint;
		const point = project(latlng);		
		var hitPolygons = qtree.search({ // search for edge hit polygons in the q-tree
			minX: point.x,
			minY: point.y,
			maxX: point.x,
			maxY: point.y
		});
		for (i = 0; i < hitPolygons.length; i++) { // for each hit polygon found in the q-tree
			const hitPolygon = hitPolygons[i].feature;
			var inside = false;
			var p1, p2, len;
			// determine if our click point is in the hit polygon by means of ray casting
			for (j = 0, len = hitPolygon.length, k = len - 1; j < len; k = j++) {
				p1 = hitPolygon[j];
				p2 = hitPolygon[k];
				if (((p1[1] > point.y) !== (p2[1] > point.y)) && (point.x < (p2[0] - p1[0]) * (point.y - p1[1]) / (p2[1] - p1[1]) + p1[0]))
					inside = !inside;
			}
			if (inside) return hitPolygon; // bingo!
		}
	}

	////////////////////////////////////////////////////////////
	// message panel functions
	////////////////////////////////////////////////////////////

	function showMessagePanel(innerHTML) {
		console.log(`[${pass_id}] Showing message panel ...`);
		var el = L.DomUtil.get('my-control');
		if (L.DomUtil.hasClass(el, 'hide')) {
			L.DomUtil.removeClass(el, 'hide');
		}
		el.innerHTML = innerHTML;
	}

	function hideMessagePanel() {
		console.log(`[${pass_id}] Hidding message panel ...`);
		var el = L.DomUtil.get('my-control');
		if (!L.DomUtil.hasClass(el, 'hide')) {
			L.DomUtil.addClass(el, 'hide');
		}
		el.innerHTML = "";
	}

	////////////////////////////////////////////////////////////
	// main overlay 
	//////////////////////////////////////////////////////////// 

	// main overlay
	useEffect(() => {

		var pixiContainer = new PIXI.Container();

		let overlay = L.pixiOverlay(utils => {
			utils.getRenderer().render(utils.getContainer()); // redraw everything, reposition everything 

		}, pixiContainer);

		overlay.addTo(map);

		setMainOverlay(overlay);
		setMainContainer(pixiContainer);

		// add message panel to the map
		L.control.myControl({
			position: 'topright'
		}).addTo(map);

		return () => pixiContainer.removeChildren();

	}, [map]);
	// }, [map], ["map"], "useEffect: redraw main overlay");

	////////////////////////////////////////////////////////////
	// ** arrows conainer **
	////////////////////////////////////////////////////////////

	// load arrowhead sprite	
	useEffect(() => {

		// console.log("[useEffect  ** load arrow sprite **")

		var loadingAny = false;

		// skip if already cached
		if (!PIXILoader.resources["arrow_head"]) {
			PIXILoader.add("arrow_head", getSVGIcon("arrow_head"));
			loadingAny = true;
		}

		if (loadingAny) {
			setArrowheadLoaded(false);
			PIXILoader.load(() => setArrowheadLoaded(true));
		}

	}, [edges_data]);
	// }, [edges_data], ["edges_data"], `[useEffect - ${pass_id}] load arrow sprite`);

	// load particle container for arrows when map changes
	useEffect(() => {

		// console.log("[useEffect] ** load particle container for arrow heads **")

		if (mainContainer && edges_data) {
			var pixiContainer = new PIXI.ParticleContainer(edges_data.length, { vertices: true });
			mainContainer.addChild(pixiContainer);
			setArrowsContainer(pixiContainer)
		}

	}, [map, mainContainer]);
	// }, [map, mainContainer], ["map", "mainContainer"], "useEffect: redraw arrowheads"); 

	useEffect(() => {

		if (mainOverlay && arrowsContainer && edges_data && arrowheadLoaded && edge_options) {

			console.log(`[${pass_id}] Triggering drawing arrows ...`);

			showMessagePanel("<b>&nbsp;&nbsp;Drawing ...&nbsp;&nbsp;</b>")
			function triggerWithTimer(msecs) {
				setTimeout(function () {
					setArrowDrawCounter(arrowDrawCounter + 1);
				}, msecs);
			}
			triggerWithTimer(500);

		}
	}, [arrowsContainer, edges_data, arrowheadLoaded, edge_options]);
	// }, [arrowsContainer, edges_data, arrowheadLoaded, edge_options], ["arrowsContainer", "edges_data", "arrowheadLoaded", "edge_options"], "useEffect: draw arrowheads");

	// draw arrows for the first time
	useEffect(() => {

		// console.log("[useEffect] ** first-time arrow heads drawing **")

		//TODO: If show_arrows === false, exit the function right here to improve the performance of future re-drawings. Same goes for nodes, edges, and markers.

		if (arrowDrawCounter === 0)
			return;

		const utils = mainOverlay.utils;
		var container = utils.getContainer();
		var renderer = utils.getRenderer();
		var project = utils.latLngToLayerPoint;

		console.log(`[${pass_id}] Drawing ${edges_data.length} arrows ...`);

		var container2 = arrowsContainer;
		container2.removeChildren();

		if (!PIXILoader.resources["arrow_head"] || !PIXILoader.resources["arrow_head"].texture) {
			//TODO: issue warning
			// console.log("[useEffect] arrow_head resource not loaded!")
			return;
		}
		const arrow_head_texture = PIXILoader.resources["arrow_head"].texture;

		// color
		var scale = null;
		var colorMinWeight = 0;
		var colorMaxWeight = 0;
		var widthMinWeight = 0;
		var widthMaxWeight = 0;
		var alphaMinWeight = 0;
		var alphaMaxWeight = 0;

		if (edge_options.color_method === EdgeColorMethod.SCALE) {
			[colorMinWeight, colorMaxWeight] = getMinMaxFromObjArray(edges_data, edge_options.color_scale_field);
			scale = chroma.scale([edge_options.color_scale_left, edge_options.color_scale_right]);
		}

		// size (in function of the width of edges)
		if (edge_options.width_method === EdgeWidthMethod.SCALE) {
			[widthMinWeight, widthMaxWeight] = getMinMaxFromObjArray(edges_data, edge_options.width_scale_field);
		}

		// alpha
		if (edge_options.alpha_method === EdgeAlphaMethod.SCALE) {
			[alphaMinWeight, alphaMaxWeight] = getMinMaxFromObjArray(edges_data, edge_options.alpha_scale_field);
		}

		for (var i = 0; i < edges_data.length; i++) {

			var edge = edges_data[i];
			var edge_coords_list = edge.coords
			var projectedPolygon = edge_coords_list.map(function (coords) { return project(coords); });

			var arrow_tint = 0x0;
			var arrow_scale = 0;
			var arrow_alpha = 0;

			// visibility
			if ((edge_options.visibility_method === EdgeVisibilityMethod.CUSTOM) && (edge.visible === false)) {
				continue; // don't draw arrow
			}

			// color
			if (edge_options.color_method === EdgeColorMethod.SCALE) {
				var normalizedWeight = 0;
				if(colorMaxWeight - colorMinWeight > 0)
					normalizedWeight = (edge.data[edge_options.color_scale_field] - colorMinWeight) / (colorMaxWeight - colorMinWeight);
				var scaled_color = stringToHex(scale(normalizedWeight).hex());
				arrow_tint = scaled_color;
			} else if (edge_options.color_method === EdgeColorMethod.CUSTOM) {
				arrow_tint = edge.color;
			} else if (edge_options.color_method === EdgeColorMethod.DEFAULT) {
				arrow_tint = edge_options.color_default;
			} else { // unrecognized method, falling back to default
				// TODO: issue warning
				arrow_tint = edge_options.color_default;
			}

			// size (in function of the width of edges)
			// the size (scale) of arrows holds a ratio 1:10 in relation to the width of edges
			if (edge_options.width_method === EdgeWidthMethod.SCALE) {
				var normalizedWeight = 0;
				if(widthMaxWeight - widthMinWeight > 0)
					normalizedWeight = (edge.data[edge_options.width_scale_field] - widthMinWeight) / (widthMaxWeight - widthMinWeight);
				var width = 0.025 + normalizedWeight / 10.0;
				arrow_scale = width;
			} else if (edge_options.width_method === EdgeWidthMethod.CUSTOM) {
				arrow_scale = edge.width / 10.0;
			} else if (edge_options.width_method === EdgeWidthMethod.DEFAULT) {
				arrow_scale = edge_options.width_default / 10.0;
			} else { // unrecognized method, falling back to default
				// TODO: issue warning
				arrow_scale = edge_options.width_default / 10.0;
			}

			// alpha (transparency)
			if (edge_options.alpha_method === EdgeAlphaMethod.SCALE) {
				var normalizedWeight = 0;
				if(alphaMaxWeight - alphaMinWeight > 0)
					normalizedWeight = (edge.data[edge_options.alpha_scale_field] - alphaMinWeight) / (alphaMaxWeight - alphaMinWeight);
				arrow_alpha = normalizedWeight;
			} else if (edge_options.alpha_method === EdgeAlphaMethod.CUSTOM) {
				arrow_alpha = edge.alpha;
			} else if (edge_options.alpha_method === EdgeAlphaMethod.DEFAULT) {
				arrow_alpha = edge_options.alpha_default;
			}
			else { // unrecognized method, falling back to default
				// TODO: issue warning
				arrow_alpha = edge_options.alpha_default;
			}

			projectedPolygon.forEach(function (coords, index) {

				// draw arrow head for last coord
				if (index == projectedPolygon.length - 1) { // TODO: this can be optimized by accesing the last projectedPolygon directly

					var arrow_head_sprite = new PIXI.Sprite(arrow_head_texture);
					arrow_head_sprite.x = coords.x;
					arrow_head_sprite.y = coords.y;
					arrow_head_sprite.tint = arrow_tint;
					arrow_head_sprite.alpha = Math.min(arrow_alpha + edge_options.alpha_min, 1.0);
					arrow_head_sprite.scale.set(arrow_scale);
					arrow_head_sprite.anchor.set(0.5, 0.5);
					var c1 = projectedPolygon[projectedPolygon.length - 2];
					var c2 = projectedPolygon[projectedPolygon.length - 1];
					var dy = c2.y - c1.y;
					var dx = c2.x - c1.x;
					var rotation = Math.atan2(dy, dx); // in radians 
					arrow_head_sprite.rotation = rotation;
					container2.addChild(arrow_head_sprite);

				}
			});
		}

		renderer.render(container);

	}, [arrowDrawCounter]);
	// }, [arrowDrawCounter], ["arrowDrawCounter"], "useEffect: draw arrowheads");

	// show/hide arrows
	useEffect(() => {

		// console.log("[useEffect] ** show/hide arrows **")

		if (arrowsContainer && mainOverlay) {
			if (show_arrows === true) {
				arrowsContainer.visible = true;
			} else {
				arrowsContainer.visible = false;
			}
			mainOverlay.redraw();
		}

	}, [show_arrows]);
	// }, [show_arrows], ["show_arrows"], "useEffect: show/hide arrows");

	////////////////////////////////////////////////////////////
	// ** edges container **
	////////////////////////////////////////////////////////////

	// load PIXI container for edges when map changes
	useEffect(() => {

		// console.log("[useEffect] ** loading PIXI container for edges **")
		if (mainContainer) {
			var pixiContainer = new PIXI.Container();
			mainContainer.addChild(pixiContainer);
			setEdgesContainer(pixiContainer)
		}

	}, [map, mainContainer]);
	// }, [map, mainContainer], ["map", "mainContainer"], "useEffect: redraw edges"); 

	useEffect(() => {
		//NOTE: arrowheadLoaded here is not needed, but a useful hack for avoiding loading 
		//the edges twice at startup. Edge loading is delayed until a resource is 
		//ready (arrowheadLoaded). This is why nodes/arrows/markers only load once at startup
		//as expected (they also wait for the loading of a resource)
		if (mainOverlay && edgesContainer && edges_data && edge_options && arrowheadLoaded) {

			console.log(`[${pass_id}] Triggering drawing edges ...`);

			// showMessagePanel("<b>&nbsp;&nbsp;Drawing edges ...&nbsp;&nbsp;</b>")

			function triggerWithTimer(msecs) {
				setTimeout(function () {
					setEdgeDrawCounter(edgeDrawCounter + 1);
				}, msecs);
			}
			triggerWithTimer(500);

		}
	}, [edgesContainer, edges_data, edge_options, arrowheadLoaded]);
	//NOTE: arrowheadLoaded is needed here to trigger the drawing of edges at startup, given the hack in the condition of the main if-block in the function.
	// }, [edgesContainer, edges_data, edge_options, arrowheadLoaded], ["edgesContainer", "edges_data", "edge_options", "arrowheadLoaded"], `useEffect (${pass_id}): trigger draw edges`);

	// draw edges
	useEffect(() => {

		if (edgeDrawCounter === 0)
			return

		const utils = mainOverlay.utils;
		var container = utils.getContainer();
		var renderer = utils.getRenderer();
		var project = utils.latLngToLayerPoint;

		console.log(`[${pass_id}] Drawing ${edges_data.length} edges ...`);

		var container2 = edgesContainer;
		container2.removeChildren();

		// add children for edges
		var edge_graphics_dic = [];
		for (var i = 0; i < edges_data.length; i++) {
			var edge_graphics = new PIXI.Graphics();
			container2.addChild(edge_graphics);
			edge_graphics_dic.push(edge_graphics);
		}

		var qtree = new RBush();
		setEdgesQtree(qtree);

		var hitPolygons = [] // debugging

		var scale = null;
		var colorMinWeight = 0;
		var colorMaxWeight = 0;
		var widthMinWeight = 0;
		var widthMaxWeight = 0;
		var alphaMinWeight = 0;
		var alphaMaxWeight = 0;

		// color
		if (edge_options.color_method === EdgeColorMethod.SCALE) {
			[colorMinWeight, colorMaxWeight] = getMinMaxFromObjArray(edges_data, edge_options.color_scale_field);
			scale = chroma.scale([edge_options.color_scale_left, edge_options.color_scale_right]);
		}

		// width
		if (edge_options.width_method === EdgeWidthMethod.SCALE) {
			[widthMinWeight, widthMaxWeight] = getMinMaxFromObjArray(edges_data, edge_options.width_scale_field);
		}

		// alpha
		if (edge_options.alpha_method === EdgeAlphaMethod.SCALE) {
			[alphaMinWeight, alphaMaxWeight] = getMinMaxFromObjArray(edges_data, edge_options.alpha_scale_field);
		}

		// draw edge lines/polylines
		// for each edge			
		for (var i = 0; i < edges_data.length; i++) {

			var edge = edges_data[i];
			var edge_coords_list = edge.coords;
			var edge_graphics = edge_graphics_dic[i];
			var edge_tint = 0x0;
			var edge_width = 0;
			var edge_alpha = 0;

			// visibility
			if ((edge_options.visibility_method === EdgeVisibilityMethod.CUSTOM) && (edge.visible === false)) {
				continue; // don't draw edge
			}

			// color
			if (edge_options.color_method === EdgeColorMethod.SCALE) {
				var normalizedWeight = 0;
				if(colorMaxWeight - colorMinWeight > 0)
					normalizedWeight = (edge.data[edge_options.color_scale_field] - colorMinWeight) / (colorMaxWeight - colorMinWeight);
				var scaled_color = stringToHex(scale(normalizedWeight).hex());
				edge_tint = scaled_color;
			} else if (edge_options.color_method === EdgeColorMethod.CUSTOM) {
				edge_tint = edge.color;
			} else if (edge_options.color_method === EdgeColorMethod.DEFAULT) {
				edge_tint = edge_options.color_default;
			} else { // unrecognized method, falling back to default
				// TODO: issue warning
				edge_tint = edge_options.color_default;
			}

			// width
			if (edge_options.width_method === EdgeWidthMethod.SCALE) {
				var normalizedWeight = 0;
				if(widthMaxWeight - widthMinWeight > 0)
					normalizedWeight = (edge.data[edge_options.width_scale_field] - widthMinWeight) / (widthMaxWeight - widthMinWeight);
				var width = edge_options.width_default + normalizedWeight;
				edge_width = width;				
			} else if (edge_options.width_method === EdgeWidthMethod.CUSTOM) {
				edge_width = edge.width;
			} else if (edge_options.width_method === EdgeWidthMethod.DEFAULT) {
				edge_width = edge_options.width_default;
			} else { // unrecognized method, falling back to default
				// TODO: issue warning
				edge_width = edge_options.width_default;
			}

			// alpha (transparency)
			if (edge_options.alpha_method === EdgeAlphaMethod.SCALE) {
				var normalizedWeight = 0;
				if(alphaMaxWeight - alphaMinWeight > 0)
					normalizedWeight = (edge.data[edge_options.alpha_scale_field] - alphaMinWeight) / (alphaMaxWeight - alphaMinWeight);	
				edge_alpha = normalizedWeight;
			} else if (edge_options.alpha_method === EdgeAlphaMethod.CUSTOM) {
				edge_alpha = edge.alpha;
			} else if (edge_options.alpha_method === EdgeAlphaMethod.DEFAULT) {
				edge_alpha = edge_options.alpha_default;
			}
			else { // unrecognized method, falling back to default
				// TODO: issue warning
				edge_alpha = edge_options.alpha_default;
			}

			edge_graphics.clear();
			edge_graphics.lineStyle(edge_width, edge_tint, Math.min(edge_alpha + edge_options.alpha_min, 1.0));

			var projectedPolygon = edge_coords_list.map(function (coords) { return project(coords); });

			projectedPolygon.forEach(function (coords, index) {
				if (index == 0) edge_graphics.moveTo(coords.x, coords.y);
				else edge_graphics.lineTo(coords.x, coords.y);
			});

			// create buffer polygons for the hit areas

			//pathCoords should be an array of Coordinate
			var pathCoords = [];
			edge_coords_list.forEach(function (coords, index) {
				pathCoords.push(new Coordinate(coords[0], coords[1]));
			});

			var geometryFactory = new GeometryFactory();

			// on what distance the new polygon should be built			
			var meters = 100 + (200 * (edge_width - edge_options.width_default)); //TODO: width default should be smaller than any other edge width?
			var distance = (meters * 0.0001) / 111.12;
			var shell = geometryFactory.createLineString(pathCoords);

			// building a new polygon			
			const bufferParams = new BufferParameters();
    		bufferParams.setJoinStyle(2);
			const buff = new BufferOp(shell, bufferParams);
        	const polygon = buff.getResultGeometry(distance);

			// finally, get your new polygon coordinates
			var polygonCoords = polygon.getCoordinates();
			var hitPolygonPoints = []
			var hitPolygonPoints2 = []
			polygonCoords.forEach(function (coords, index) {
				var projection = project([coords.x, coords.y]);
				hitPolygonPoints2.push([projection.x, projection.y])

				// DEBUG: render polygon
				if (edge_options.show_edge_hit_polygons === true) {
					hitPolygonPoints.push(projection.x)
					hitPolygonPoints.push(projection.y)
				}
			});

			// render hit area polygon
			if (edge_options.show_edge_hit_polygons === true) {
				var hitPolygon = new PIXI.Polygon(hitPolygonPoints)
				var g = new PIXI.Graphics();
				g.beginFill(0x5d0015);
				g.drawPolygon(
					hitPolygon
				);
				g.endFill();
				g.alpha = 0.25
				container2.addChild(g);
			}

			// add polygon to the quad-tree for interactivity
			var bounds = L.bounds(hitPolygonPoints2);
			hitPolygonPoints2._i = i
			qtree.insert({
				minX: bounds.min.x,
				minY: bounds.min.y,
				maxX: bounds.max.x,
				maxY: bounds.max.y,
				feature: hitPolygonPoints2
			});
		}

		hideMessagePanel();

		////////////// interactivity code starts

		// this is to enable the finger pointer (interactivity) 
		// in the leaflet map when hovering over an edge
		utils.getMap().on('mousemove', L.Util.throttle(function (e) {
			var feat = findClickedEdge(e.latlng, qtree);
			if (feat) {
				L.DomUtil.addClass(mainOverlay._container, 'leaflet-interactive');
			} else {
				L.DomUtil.removeClass(mainOverlay._container, 'leaflet-interactive');
			}
		}, 32));

		////////////// interactivity code ends 

		renderer.render(container);

	}, [edgeDrawCounter], ["edgeDrawCounter"]);
	// }, [edgeDrawCounter], ["edgeDrawCounter"], `useEffect (${pass_id}): draw edges`);

	useEffect(() => {

		function handleClick(e) {
			var feat = findClickedEdge(e.latlng, edgesQtree);
			if (feat) {
				console.log("clicked on edge ", feat._i)
				var edge_obj = {
					index: feat._i,
					data: edges_data[feat._i] //TODO: double check this still works after updating edges_data
				}
				onEdgeClick(edge_obj); // Dash callback
			}
		}

		if (mainOverlay && edgesQtree) {
			const utils = mainOverlay.utils;
			if (ignoreEdgeClick === true) {
				utils.getMap().off('click');
			} else {
				utils.getMap().on('click', handleClick);
			}
		}
	}, [ignoreEdgeClick, mainOverlay, edgesQtree]);
	// }, [ignoreEdgeClick, mainOverlay, edgesQtree], ["ignoreEdgeClick", "mainOverlay", "edgesQtree"], "useEffect: ignore edge click?");

	// show/hide edges
	useEffect(() => {

		// console.log("[useEffect] ** show/hide edges **")

		if (edgesContainer && mainOverlay) {
			if (show_edges === true) {
				edgesContainer.visible = true;
			} else {
				edgesContainer.visible = false;
			}
			mainOverlay.redraw();
		}

	}, [show_edges]);
	// }, [show_edges], ["show_edges"], "useEffect: show/hide edges");

	////////////////////////////////////////////////////////////
	// ** nodes container **
	////////////////////////////////////////////////////////////

	// load node sprite	
	useEffect(() => {

		if (arrowheadLoaded) {

			// console.log("[useEffect] ** load node sprite **")

			var loadingAny = false;

			// skip if already cached
			if (!PIXILoader.resources["node"]) {
				PIXILoader.add("node", getSVGIcon("node"));
				loadingAny = true;
			}

			if (loadingAny) {
				setNodeIconLoaded(false);
				PIXILoader.load(() => setNodeIconLoaded(true));
			}

		}

	}, [nodes_data, arrowheadLoaded]);
	// }, [nodes_data, arrowheadLoaded], ["nodes_data", "arrowheadLoaded"], `[useEffect - ${pass_id}] load node sprite`);


	// load PIXI container for nodes when map changes
	useEffect(() => {

		if (mainContainer) {
			var pixiContainer = new PIXI.Container();
			mainContainer.addChild(pixiContainer);
			setNodesContainer(pixiContainer);
		}

	}, [map, mainContainer], ["map", "mainContainer"], "useEffect: redraw nodes");
	// }, [map, mainContainer], ["map", "mainContainer"], "useEffect: redraw nodes");

	// trigger draw nodes
	useEffect(() => {

		if (mainOverlay && nodesContainer && nodes_data && nodeIconLoaded && node_options) {

			console.log(`[${pass_id}] Triggering drawing nodes ...`);

			showMessagePanel("<b>&nbsp;&nbsp;Drawing ...&nbsp;&nbsp;</b>")

			function triggerWithTimer(msecs) {
				setTimeout(function () {
					setNodeDrawCounter(nodeDrawCounter + 1);
				}, msecs);
			}
			triggerWithTimer(500);
		}

	}, [nodesContainer, nodes_data, nodeIconLoaded, node_options]);
	// }, [nodesContainer, nodes_data, nodeIconLoaded, node_options], ["nodesContainer", "nodes_data", "nodeIconLoaded", "node_options"], "useEffect: trigger draw nodes");

	// draw nodes
	useEffect(() => {

		if (nodeDrawCounter === 0)
			return;

		console.log(`[${pass_id}] Drawing ${nodes_data.length} nodes ...`);

		const utils = mainOverlay.utils;
		var container = utils.getContainer();
		var renderer = utils.getRenderer();
		var project = utils.latLngToLayerPoint;

		var container2 = nodesContainer;
		container2.removeChildren();

		var colorMinWeight = 0;
		var colorMaxWeight = 0;
		var scale = null;

		var sizeMinWeight = 0;
		var sizeMaxWeight = 0;

		var alphaMinWeight = 0;
		var alphaMaxWeight = 0;

		// color
		if (node_options.color_method === NodeColorMethod.SCALE) {
			[colorMinWeight, colorMaxWeight] = getMinMaxFromObjArray(nodes_data, node_options.color_scale_field);
			scale = chroma.scale([node_options.color_scale_left, node_options.color_scale_right]);
		}

		// size
		if (node_options.size_method === NodeSizeMethod.SCALE) {
			[sizeMinWeight, sizeMaxWeight] = getMinMaxFromObjArray(nodes_data, node_options.size_scale_field);
		}

		// alpha
		if (node_options.alpha_method === NodeAlphaMethod.SCALE) {
			[alphaMinWeight, alphaMaxWeight] = getMinMaxFromObjArray(nodes_data, node_options.alpha_scale_field);
		}

		// draw node circles 
		nodes_data.forEach((node, i) => {

			// visibility
			if ((node_options.visibility_method === NodeVisibilityMethod.CUSTOM) && (node.visible === false)) {
				return; // don't draw node
			}

			if (!PIXILoader.resources[`node`] || !PIXILoader.resources[`node`].texture) {
				//TODO: issue warning
				return;
			}

			const nodeTexture = PIXILoader.resources[`node`].texture;

			nodeTexture.anchor = { x: 0.5, y: 0.5 };

			const nodeSprite = PIXI.Sprite.from(nodeTexture);
			nodeSprite.anchor.set(0.5, 0.5);

			const nodeCoords = project([node.lat, node.lon]);
			nodeSprite.x = nodeCoords.x;
			nodeSprite.y = nodeCoords.y;

			// color
			if (node_options.color_method === NodeColorMethod.SCALE) {
				var normalizedWeight = 0;
				if(colorMaxWeight - colorMinWeight > 0)
					normalizedWeight = (node.data[node_options.color_scale_field] - colorMinWeight) / (colorMaxWeight - colorMinWeight);
				var scaled_color = stringToHex(scale(normalizedWeight).hex());
				nodeSprite.tint = scaled_color;
			} else if (node_options.color_method === NodeColorMethod.CUSTOM) {
				nodeSprite.tint = node.color;
			} else if (node_options.color_method === NodeColorMethod.DEFAULT) {
				nodeSprite.tint = node_options.color_default;
			} else { // unrecognized method, falling back to default
				// TODO: issue warning
				nodeSprite.tint = node_options.color_default;
			}

			// size
			if (node_options.size_method === NodeSizeMethod.SCALE) {
				var normalizedWeight = 0;
				if(sizeMaxWeight - sizeMinWeight > 0)
					normalizedWeight = (node.data[node_options.size_scale_field] - sizeMinWeight) / (sizeMaxWeight - sizeMinWeight);
				var size = 0.005 + 0.025 * normalizedWeight;
				nodeSprite.scale.set(size);
			} else if (node_options.size_method === NodeSizeMethod.CUSTOM) {
				nodeSprite.scale.set(node.size);
			} else if (node_options.size_method === NodeSizeMethod.DEFAULT) {
				nodeSprite.scale.set(node_options.size_default);
			} else { // unrecognized method, falling back to default
				// TODO: issue warning
				nodeSprite.scale.set(node_options.size_default);
			}

			// alpha (transparency)
			if (node_options.alpha_method === NodeAlphaMethod.SCALE) {
				var normalizedWeight = 0;
				if(alphaMaxWeight - alphaMinWeight > 0)
					normalizedWeight = (node.data[node_options.alpha_scale_field] - alphaMinWeight) / (alphaMaxWeight - alphaMinWeight);
				nodeSprite.alpha = normalizedWeight;
			} else if (node_options.alpha_method === NodeAlphaMethod.CUSTOM) {
				nodeSprite.alpha = node.alpha;
			} else if (node_options.alpha_method === NodeAlphaMethod.DEFAULT) {
				nodeSprite.alpha = node_options.alpha_default;
			}
			else { // unrecognized method, falling back to default
				// TODO: issue warning
				nodeSprite.alpha = node_options.alpha_default;
			}

			// interactivity
			nodeSprite.interactive = true;
			node._i = i;
			nodeSprite.on('click', () => {
				console.log("clicked on node ", node._i);
				var node_obj = {
					index: node._i,
					data: node
				}
				onNodeClick(node_obj); // Dash callback
			});
			nodeSprite.on('mouseover', () => {
				setIgnoreEdgeClick(true);
			});
			nodeSprite.on('mouseout', () => {
				setIgnoreEdgeClick(false);
			});
			nodeSprite.defaultCursor = 'pointer';
			nodeSprite.buttonMode = true;

			// add sprite to the nodes container
			container2.addChild(nodeSprite);
		});

		hideMessagePanel();
		renderer.render(container);

	}, [nodeDrawCounter]);
	// }, [nodeDrawCounter], ["nodeDrawCounter"], "useEffect: draw nodes");

	// show/hide nodes
	useEffect(() => {

		// console.log("[useEffect] ** show/hide nodes **")

		if (nodesContainer && mainOverlay) {
			if (show_nodes === true) {
				nodesContainer.visible = true;
			} else {
				nodesContainer.visible = false;
			}
			mainOverlay.redraw();
		}

	}, [show_nodes]);
	// }, [show_nodes], ["show_nodes"], "useEffect: show/hide nodes");

	////////////////////////////////////////////////////////////
	// ** markers container **
	////////////////////////////////////////////////////////////

	// load marker sprites	
	var loading_markers = false; // this is a flag to indicate to the next useEffect (draw markers) in the current React pass that it should not draw markers since PIXI was asked to load new marker resources (again, in this pass). This strategy assumes that in the next React pass the marker resources will be ready.
	useEffect(() => {

		// console.log("[useEffect] ** load marker sprites **")

		// wait until the previous icon (node icon) has been loaded 
		// before adding the marker icon to the PIXI loader queue, 
		// otherwise we will get an error
		if (nodeIconLoaded && marker_options) {

			var loadingAny = false;

			if (marker_options.icon_method === MarkerIconMethod.DEFAULT) {
				if (!PIXILoader.resources["marker_default"]) {
					console.log(`DEBUG loading resource marker_default`)
					// "white" since sprite icons will be colored by PIXI
					PIXILoader.add('marker_default', getSVGIcon('marker_default'));
					loadingAny = true;
				}
			} else {
				for (let marker of markers_data) {
					if (!PIXILoader.resources[`marker_${marker.icon_id}`]) {
						console.log(`DEBUG loading resource marker_${marker.icon_id}`)
						PIXILoader.add(`marker_${marker.icon_id}`, getSVGIcon("custom", marker.icon_image));
						loadingAny = true;
					}
				}
			}

			if (loadingAny) {
				setMarkersLoaded(false)
				loading_markers = true;
				PIXILoader.load(() => setMarkersLoaded(true));
			}

		}

	}, [markers_data, nodeIconLoaded, marker_options]);
	// }, [markers_data, nodeIconLoaded, marker_options], ["markers_data", "nodeIconLoaded", "marker_options"], `[useEffect - ${pass_id}] load marker sprites`);

	// load markers overlay when map changes
	useEffect(() => {

		// console.log("[useEffect] ** loading markers overlay when map changes **")
		if (mainContainer) {

			let pixiContainer = new PIXI.Container();
			mainContainer.addChild(pixiContainer);
			setMarkersContainer(pixiContainer);

		}

	}, [map, mainContainer]);
	// }, [map, mainContainer], ["map", "mainContainer"], "useEffect: redraw markers");

	// marker draw trigger
	useEffect(() => {

		if (mainOverlay && markersContainer && markers_data && markersLoaded && marker_options) {

			if (loading_markers === true) {
				console.log(`[${pass_id}] Marker resources loading in this pass. Not drawing markers yet. ...`)
				return;
			}

			console.log(`[${pass_id}] Triggering drawing markers ...`);

			showMessagePanel("<b>&nbsp;&nbsp;Drawing ...&nbsp;&nbsp;</b>")

			function triggerWithTimer(msecs) {
				setTimeout(function () {
					setMarkerDrawCounter(markerDrawCounter + 1);
				}, msecs);
			}
			triggerWithTimer(500);
		}

	}, [markersContainer, markers_data, markersLoaded, marker_options]);
	// }, [markersContainer, markers_data, markersLoaded, marker_options], ["markersContainer", "markers_data", "markersLoaded", "marker_options"], `useEffect (${pass_id}): trigger draw markers`);

	// draw markers
	useEffect(() => {

		if (markerDrawCounter === 0)
			return

		console.log(`[${pass_id}] Drawing ${markers_data.length} markers ...`);

		const utils = mainOverlay.utils;
		let container = utils.getContainer();
		let renderer = utils.getRenderer();
		let project = utils.latLngToLayerPoint;
		let scale = utils.getScale();

		var container2 = markersContainer;
		container2.removeChildren();

		var colorMinWeight = 0;
		var colorMaxWeight = 0;
		var color_scale = null;
		var sizeMinWeight = 0;
		var sizeMaxWeight = 0;
		var alphaMinWeight = 0;
		var alphaMaxWeight = 0;

		// color
		if (marker_options.color_method === MarkerColorMethod.SCALE) {
			[colorMinWeight, colorMaxWeight] = getMinMaxFromObjArray(markers_data, marker_options.color_scale_field);
			color_scale = chroma.scale([marker_options.color_scale_left, marker_options.color_scale_right]);
		}

		// size
		if (marker_options.size_method === MarkerSizeMethod.SCALE) {
			[sizeMinWeight, sizeMaxWeight] = getMinMaxFromObjArray(markers_data, marker_options.size_scale_field);
		}

		// alpha
		if (marker_options.alpha_method === MarkerAlphaMethod.SCALE) {
			[alphaMinWeight, alphaMaxWeight] = getMinMaxFromObjArray(markers_data, marker_options.alpha_scale_field);
		}

		console.log(`drawing ${markers_data.length} markers ...`);

		markers_data.forEach((marker, i) => {

			const id = marker.id;
			const position = [marker.lat, marker.lon];
			var markerTexture = null;
			var markerAlpha = 0;

			// visibility
			if ((marker_options.visibility_method === MarkerVisibilityMethod.CUSTOM) && (marker.visible === false)) {
				return; // don't draw marker
			}

			// load texture
			if (marker_options.icon_method == MarkerIconMethod.DEFAULT) {
				if (PIXILoader.resources["marker_default"]) {
					markerTexture = PIXILoader.resources["marker_default"].texture;
					console.log("USING TEXTURE marker_default")
					if (!markerTexture) {
						console.log(`(${pass_id}) WARNING: Could not get a texture from resource marker_default. Skipping marker.`)
						return;
					}
				} else {
					//TODO: issue awarning, icon resource wasn't ready (bug?)
					return;
				}
			} else {
				if (PIXILoader.resources[`marker_${marker.icon_id}`]) {
					markerTexture = PIXILoader.resources[`marker_${marker.icon_id}`].texture;
					console.log(`USING TEXTURE marker_${marker.icon_id}`)
					if (!markerTexture) {
						console.log(`(${pass_id}) WARNING: Could not get a texture from resource marker_${marker.icon_id}. Skipping marker.`)
						return;
					}
				} else {
					//TODO: issue awarning, icon resource wasn't ready (bug?)
					console.log(`WARINING: Resource marker_${marker.icon_id} has not been loaded. Skipping marker.`)
					return;
				}
			}

			// color
			var marker_color = 0x0;
			if (marker_options.color_method === MarkerColorMethod.SCALE) {
				var normalizedWeight = 0;
				if(colorMaxWeight - colorMinWeight > 0)
					normalizedWeight = (marker.data[marker_options.color_scale_field] - colorMinWeight) / (colorMaxWeight - colorMinWeight);
				var scaled_color = stringToHex(color_scale(normalizedWeight).hex());
				marker_color = scaled_color;
			} else if (marker_options.color_method === MarkerColorMethod.CUSTOM) {
				marker_color = marker.color;
			} else if (marker_options.color_method === MarkerColorMethod.DEFAULT) {
				marker_color = marker_options.color_default;
			} else { // unrecognized method, falling back to default
				// TODO: issue warning
				marker_color = marker_options.color_default;
			}

			// size
			var marker_size = 0;
			if (marker_options.size_method === MarkerSizeMethod.SCALE) {

				var size_scale_min = 0;
				var size_scale_max = 0;

				if (marker_options.icon_method === MarkerIconMethod.DEFAULT) {
					// if the icon method is "default", take the min and max sizes from the options
					size_scale_min = marker_options.size_default_scale_min;
					size_scale_max = marker_options.size_default_scale_max;
				} else {
					// otherwise, take the min and max sizes from the marker itself
					size_scale_min = marker.size_scale_min;
					size_scale_max = marker.size_scale_max;
				}
				
				var normalizedWeight = 0;
				if(sizeMaxWeight - sizeMinWeight > 0)
					normalizedWeight = (marker.data[marker_options.size_scale_field] - sizeMinWeight) / (sizeMaxWeight - sizeMinWeight);

				marker_size = size_scale_min + size_scale_max * normalizedWeight;

			} else if (marker_options.size_method === MarkerSizeMethod.CUSTOM) {
				marker_size = marker.size;
			} else if (marker_options.size_method === MarkerSizeMethod.DEFAULT) {
				marker_size = marker_options.size_default;
			} else { // unrecognized method, falling back to default
				// TODO: issue warning
				marker_size = marker_options.size_default;
			}
			setMarkersResized(true); // trigger the re-scaling to zoom

			// alpha (transparency)
			if (marker_options.alpha_method === MarkerAlphaMethod.SCALE) {
				var normalizedWeight = 0;
				if(alphaMaxWeight - alphaMinWeight > 0)
					normalizedWeight = (marker.data[marker_options.alpha_scale_field] - alphaMinWeight) / (alphaMaxWeight - alphaMinWeight);
				markerAlpha = normalizedWeight;
			} else if (marker_options.alpha_method === MarkerAlphaMethod.CUSTOM) {
				markerAlpha = marker.alpha;
			} else if (marker_options.alpha_method === MarkerAlphaMethod.DEFAULT) {
				markerAlpha = marker_options.alpha_default;
			}
			else { // unrecognized method, falling back to default
				// TODO: issue warning
				markerAlpha = marker_options.alpha_default;
			}

			markerTexture.anchor = { x: 0.5, y: 1 };

			const markerSprite = PIXI.Sprite.from(markerTexture);
			markerSprite.anchor.set(0.5, 1);

			const markerCoords = project(position);
			markerSprite.x = markerCoords.x;
			markerSprite.y = markerCoords.y;

			// do not tint the marker if we want the ORIGINAL color
			if (marker_options.color_method !== MarkerColorMethod.ORIGINAL) {
				markerSprite.tint = marker_color;
			}

			markerSprite.scale.set(marker_size); // 0.1
			markerSprite.base_size = marker_size;
			markerSprite.alpha = markerAlpha;

			// interactivity code 

			markerSprite.interactive = true;
			markerSprite.defaultCursor = 'pointer';
			markerSprite.buttonMode = true;

			// click handler
			marker._i = i;
			markerSprite.on('click', () => {
				console.log('clicked on marker ', marker._i);
				var marker_obj = {
					index: marker._i,
					marker: marker
				}
				onMarkerClick(marker_obj); // Dash callback
			});

			// mouseover and mouseout handlers to ignore clicks on edges when hovering over a marker	
			markerSprite.on('mouseover', () => {
				setIgnoreEdgeClick(true);
			});
			markerSprite.on('mouseout', () => {
				setIgnoreEdgeClick(false);
			});

			// mouseover and mouseout handlers to show a tooltip
			if (marker_options.enable_tooltips === true) {
				markerSprite.on('mouseover', () => {
					L.popup({ offset: [0, -35] })
						.setLatLng(position)
						.setContent(marker.tooltip)
						.openOn(map);
				});
				markerSprite.on('mouseout', () => {
					map.closePopup();
				});
			}

			container2.addChild(markerSprite);
		});

		// map zoom handler for markers
		utils.getMap().off('zoomend');
		utils.getMap().on('zoomend', L.Util.throttle(function (e) {
			setCurrentZoom(map.getZoom()); // update currentZoom to trigger zoom re-scaling of markers in the next pass
		}, 32));

		hideMessagePanel();

		renderer.render(container);

		console.log(`done drawing markers.`);

	}, [markerDrawCounter]);
	// }, [markerDrawCounter], ["markerDrawCounter"], `useEffect (${pass_id}): draw markers`);

	// show/hide markers
	useEffect(() => {

		// console.log("[useEffect] ** show/hide markers **")

		if (markersContainer && mainOverlay) {
			if (show_markers === true) {
				markersContainer.visible = true;
			} else {
				markersContainer.visible = false;
			}
			mainOverlay.redraw();
		}

	}, [show_markers]);
	// }, [show_markers], ["show_markers"], "useEffect: show/hide markers");

	// zoom re-scaling of markers	
	useEffect(() => {

		// re-scaling of markers
		if (markersContainer && marker_options) {
			if (marker_options.enable_zoom_scaling === true) {

				console.log("re-scaling markers");
				const utils = mainOverlay.utils;
				const scale = utils.getScale();

				markersContainer.children.forEach(child => {
					var zoom_factor = 1 / scale;
					var scaled_size = (child.base_size * zoom_factor) * 5
					child.scale.set(scaled_size);
				});

				mainOverlay.redraw();
				setMarkersResized(false); // reset this flag
			}
		}

	}, [currentZoom, marker_options, markersResized]);
	// }, [currentZoom, marker_options, markersResized], ["currentZoom", "marker_options", "markersResized"], "zoom re-scaling of markers");

	return null;

} // end of LeafletSylvereyeRoadNetwork

export default LeafletSylvereyeRoadNetwork;