---
id: software_stack
title: Development
sidebar_label: Software stack
---

## Software stack

![Software stack](/img/dash_sylvereye_software_stack.png)

In order to exploit the GPU for rendering the road networks in a Web browser, Dash Sylvereye makes use of the [Leaflet.js](https://leafletjs.com/) and [PixiJS](https://www.pixijs.com/) JavaScript libraries in a transparent way for the developer. 

Leaflet.js provides the layer of tiled Web maps as well as zooming and panning capabilities, whereas the 2D animation library PixiJS provides the road network drawing primitives accelerated by WebGL. 

[Leaflet.PixiOverlay](https://github.com/manubb/Leaflet.PixiOverlay) provides a Leaflet.js overlay that embeds PixiJS drawings into a Leaflet.js map tile layer behind the scenes. 

All these elements are encapsulated inside a [React](https://reactjs.org/) component and then transpiled to build a [Plotly Dash](https://plotly.com/dash/) component. 

Dash Sylvereye also makes use of other third-party JavaScript libraries, such as [JSTS](https://github.com/bjornharrtell/jsts) for defining edge hit polygons, [RBush](https://github.com/mourner/rbush) for efficiently finding edge hit polygons that has been clicked by the user, and [Chroma.js](https://gka.github.io/chroma.js/) for computing color scales for edges, nodes, and markers. 

Likewise, Dash Sylvereye network loading routines make use of [NetworkX](https://networkx.org/) and [Shapely](https://github.com/Toblerity/Shapely) to enable Dash Sylvereye to import road networks from the [OpenStreetMap project](https://www.openstreetmap.org/) via [OSMnx](https://github.com/gboeing/osmnx) or from GraphML files.
