---
id: software_stack
title: Development
sidebar_label: Software stack
---

## Software stack

![Software stack](/img/dash_sylvereye_software_stack.png)

To render road networks on the GPU in the browser, Dash Sylvereye relies on the [Leaflet.js](https://leafletjs.com/) and [PixiJS](https://www.pixijs.com/) JavaScript libraries, transparently to the developer.

Leaflet.js supplies the tiled-map layer along with zoom and pan interactions, while PixiJS, a WebGL-accelerated 2D rendering library, draws the road-network primitives.

[Leaflet.PixiOverlay](https://github.com/manubb/Leaflet.PixiOverlay) bridges the two: it exposes a Leaflet.js overlay that embeds a PixiJS scene on top of the tile layer.

All of this is wrapped in a [React](https://reactjs.org/) component and then transpiled into a [Plotly Dash](https://plotly.com/dash/) component.

Dash Sylvereye also uses a handful of other JavaScript libraries: [JSTS](https://github.com/bjornharrtell/jsts) to define edge hit polygons, [RBush](https://github.com/mourner/rbush) to look up the hit polygons under a click efficiently, and [chroma.js](https://gka.github.io/chroma.js/) to compute color scales for nodes, edges, and markers.

On the Python side, the network-loading helpers use [NetworkX](https://networkx.org/) and [Shapely](https://github.com/Toblerity/Shapely), which lets Dash Sylvereye import road networks from [OpenStreetMap](https://www.openstreetmap.org/) through [OSMnx](https://github.com/gboeing/osmnx), or directly from GraphML files.
