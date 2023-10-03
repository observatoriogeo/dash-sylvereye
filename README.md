<p align="center">
  <img src="website_logo_solid_background.png" width="375" height="275" title="Logo">
</p>

**Dash Sylvereye** is a [Plotly Dash](https://plotly.com/dash) component library for producing interactive web-based visualizations of large primal road networks in Python.

The main elements of a Dash Sylvereye visualization are nodes, edges, and markers. Edges can have direction arrows, too. All of these elements are drawn through WebGL on top of tiled web maps.

The goal of Dash Sylvereye is to allow users to smoothly render interactive road networks with dozens of thousands of nodes and edges, as well as dozens of thousands of interactive markers, in commodity systems such as mid-range laptops and workstations.

Thanks to its integration with Dash, the various elements of a Dash Sylvereye visualization can be updated at runtime by other Dash components in a Dash dashboard.

Dash Sylvereye visualizations are customizable, allowing for the programmatic manipulation of colors, sizes, alpha, and visibility of individual nodes, edges, and markers.

Markers can show custom popup messages when hovered over and the default marker icon can be replaced by custom SVG images on a marker-by-marker basis.

Nodes, edges, and markers are interactive. Dash Sylvereye supports for various callback properties allowing the programmer to define the behavior when the individual elements of a visualization are clicked.

## Features

* WebGL-accelerated drawing of nodes and edges allowing for a smooth navigation on road networks with dozens of thousands of nodes and edges on budget systems.
* WebGL-accelerated drawing of markers allowing for a smooth navigation on visualizations with dozens of thousands of markers on budget systems.
* Full integration with Plotly Dash: road network data and visual properties can be dinamically updated by reacting to other Dash components.
* Dash click events for individual nodes, edges, and markers.
* Support for any map tiles supported by Leaflet.js.
* Loading of road networks from NetworkX graphs produced by OSMnx.
* Loading of road networks from GraphML files produced by OSMnx.
* Simple list-of-dictionaries road network data format for easy loading of networks from any source.
* Customization of visibility, transparency, color, and size of individual nodes, edges, and markers.
* Automatic color scaling of nodes, edges, and markers via Chroma.js.
* Support for customizable markers via custom SVG files.
* Support for marker tooltips.

## Documentation

Coming soon.

## Running the examples

Start by cloning this repository:

````
git clone https://github.com/observatoriogeo/dash-sylvereye.git
cd dash-sylvereye/examples
````

Next, create a virtual environment and install the Python dependencies:

````
python -m venv venv && . venv/bin/activate
pip install -r requirements-examples.txt
````

Finally, try to run an example:

````
cd examples
python 01_BasicVisualization.py
````

If you visit http://127.0.0.1:8050/ in your browser, you should see a Dash Sylvereye visualization.

## Build instructions

Start by cloning this repository:

````
git clone https://github.com/observatoriogeo/dash-sylvereye.git
cd dash-sylvereye
````

Next, create a virtual environment and install the Python dependencies:

````
python -m venv venv && . venv/bin/activate
pip install -r requirements-dev.txt
````

Finally, install packages via npm (ignore errors) and run the build script,

````
npm i --ignore-scripts 
npm run build
````

## Citation

If you use Dash Sylvereye in your work, please cite the following article:

Garcia-Robledo, A., & Zangiabady, M. (2023). Dash Sylvereye: A WebGL-powered Library for Dashboard-driven Visualization of Large Street Networks. arXiv preprint arXiv:2105.14362v2. https://doi.org/10.48550/arXiv.2105.14362