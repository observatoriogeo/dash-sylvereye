---
id: component_parameters
title: Reference
sidebar_label: Keyword arguments
---

## Keyword arguments

The `SylvereyeRoadNetwork` Dash component is the core component of the Dash Sylvereye library.

The `SylvereyeRoadNetwork` component can be imported from the `dash_sylvereye` module as follows:

```python
from dash_sylvereye import SylvereyeRoadNetwork
```

The `SylvereyeRoadNetwork` component supports 21 keyword arguments classified as follows: 

- Dash keyword arguments
- Data keyword arguments
- Options keyword arguments
- Show/hide keyword arguments
- Map keyword arguments
- Tile layer keyword arguments

The following is a depiction of all `SylvereyeRoadNetwork` keyword arguments, including their default values:

```python
SylvereyeRoadNetwork(# Dash keyword arguments
                     id='',
                     # Data keyword arguments
                     nodes_data=[],
                     edges_data=[],
                     markers_data=[],
                     # Options keyword arguments
                     node_options={ see below },
                     edge_options={ see below },
                     marker_options={ see below },
                     debug_options={},
                     # Show/hide keyword arguments
                     show_nodes=True,
                     show_edges=True,
                     show_arrows=True,
                     show_markers=True,
                     # Map keyword arguments
                     map_center=[],
                     map_zoom=3,
                     map_min_zoom=3,
                     map_max_zoom=20,
                     map_style={},
                     # Tile layer keyword arguments
                     tile_layer_url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                     tile_layer_subdomains='',
                     tile_layer_attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                     tile_layer_opacity=1.0)
```

Any of the keyword arguments is mandatory.

Thanks to Dash's architecture, any of the `SylvereyeRoadNetwork` keyword arguments (excepting `id`) can be updated at runtime to update the visualization, usually as a reaction to the user's interaction with other Dash components.

## Dash keyword arguments

These are keyword arguments mandated by Dash. For now the only Dash keyword argument is `id`:

---

### `id`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `str`<br />
**Default**: Empty string<br />

The identifier of the Dash component.

---

## Data keyword arguments

`SylvereyeRoadNetwork` needs to pieces of data to know the road network topology: nodes and edges. Nodes and edges are supplied separately through the `nodes_data` and `edges_data` keyword arguments, respectively.

You usally populate `nodes_data` and `edges_data` from OSMnx-generated data by using [load_from_osmnx_graph](data_loading#load_from_osmnx_graph) and [load_from_osmnx_graphml](data_loading#load_from_osmnx_graphml) functions. You can populate  `nodes_data` and `edges_data` manually, as well.

In addition, `SylvereyeRoadNetwork` supports the visualization of markers. Markers data are supplied through the `markers_data` keyword argument. 

You usually populate `markers_data` from a list of coordinates pairs by using the [generate_markers_from_coords](data_utils#generate_markers_from_coords) function. You can populate `markers_data` manually, as well.

---

### `nodes_data`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `list` of `dict`<br />
**Default**: Empty list<br />

The list of the road network's nodes. Each item of the list must be a node. Please refer to [this page](data_format#nodes-data-format) to see the format each node item must follow.

---

### `edges_data`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `list` of `dict`<br />
**Default**: Empty list<br />

The list of the road network's edges. Each item of the list must be and edge. Please refer to [this page](data_format#edges-data-format) to see the format each edge item must follow.

---

### `markers_data`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `list` of `dict`<br />
**Default**: Empty list<br />

The list of map markers. Each item of the list must be a marker. Please refer to [this page](data_format#markers-data-format) to see the format each marker item must follow.

---

## Options keyword arguments

The visualization options for nodes, edges, and markers are provided as dictionaries, separately.

The `node_options` keyword argument allows the programmer to set up different color, size, and transparency methods for nodes. 

You usually first get a pre-filled default `node_options` dictionary by using the `get_default_node_options` function, then modify it according to your needs, and finally pass it to `SylvereyeRoadNetwork` through the `node_options` keyword argument.
 
The `edge_options` keyword argument allows the programmer to set up different color, width, and transparency methods for edges. 

You usually first get a pre-filled default `edge_options` dictionary by using the `get_default_edge_options` function, then modify it according to your needs, and finally pass it to `SylvereyeRoadNetwork` through the `edge_options` keyword argument.


The `marker_options` keyword argument allows the programmer to set up different color, size, transparency, and icon methods for markers. 

You usually first get a pre-filled default `marker_options` dictionary by using the `get_default_marker_options` function, then modify it according to your needs, and finally pass it to `SylvereyeRoadNetwork` through the `marker_options` keyword argument.

---

### `node_options`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `dict`<br />
**Default**: <br />

```python
{
    'color_method': NodeColorMethod.DEFAULT,
    'size_method': NodeSizeMethod.DEFAULT,
    'alpha_method': NodeAlphaMethod.DEFAULT,
    'visibility_method': NodeVisibilityMethod.ALWAYS,
    'color_default': 0xa10000,
    'size_default': 0.005,
    'alpha_default': 1.0
}
```

The visual options dictionary for nodes. Please refer [to this page](nodes_customization) to see how to set up the supported marker visual options.

---

### `edge_options`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `dict`<br />
**Default**: <br />

```python
{
    'color_method': EdgeColorMethod.DEFAULT,
    'width_method': EdgeWidthMethod.DEFAULT,
    'alpha_method': EdgeAlphaMethod.DEFAULT,
    'visibility_method': EdgeVisibilityMethod.ALWAYS,
    'color_default': 0x06696,
    'width_default': 0.25,
    'alpha_default': 1.0,
    'alpha_min': 0.0,
    'show_edge_hit_polygons': False
}
```

The visual options dictionary for edges. Please refer [to this page](edges_customization) to see how to set up the supported edge visual options.

---

### `marker_options`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `dict`<br />
**Default**: <br />

```python
{
    'color_method': MarkerColorMethod.DEFAULT,
    'icon_method': MarkerIconMethod.DEFAULT,
    'size_method': MarkerSizeMethod.DEFAULT,
    'alpha_method': MarkerAlphaMethod.DEFAULT,
    'visibility_method': MarkerVisibilityMethod.ALWAYS,
    'color_default': 0x066cc,
    'size_default': 0.5,
    'size_default_scale_min': 0.25,
    'size_default_scale_max': 0.5,
    'alpha_default': 1.0,
    'enable_tooltips': False,
    'enable_zoom_scaling': False
}
```

The visual options dictionary for markers. Please refer [to this page](markers_customization) to see how to set up the supported marker visual options.

---

### `debug_options`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `dict`<br />
**Default**: Empty dictionary<br />

The debug options. #TODO

## Show/hide keyword arguments

You can hide the different layers of a Dash Sylvereye visualization, namely the nodes, edges, direction arrows, and markers layers, through the `show_nodes`, `show_edges`, `show_arrows`, and `show_markers` component keyword arguments, respectively.

Note that by hidding any combination of the layers mentioned above you may speed up the visualization response.

>**Note**
>
>To hide the map layer, you can set the [tile_layer_opacity](#tile_layer_opacity) component keyword argument to 0.


---

### `show_nodes`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `bool`<br />
**Default**: True<br />

Set to `False` to hide the nodes layer, i.e. to hide all nodes. Set to `True` to show the nodes layer.

>**Note**
>
>Setting this keyword argument to `True` won't show any node hidden through the `NodeVisibilityMethod.CUSTOM` visibility method.

---

### `show_edges`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `bool`<br />
**Default**: `True`<br />

Set to `False` to hide the edges layer, i.e. to hide all edges. Set to `True` to show the edges layer.

>**Note**
>
>Setting this keyword argument to `True` won't show any edge hidden through the `EdgeVisibilityMethod.CUSTOM` visibility method.

---

### `show_arrows`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `bool`<br />
**Default**: `True`<br />

Set to `False` to hide the direction arrows layer, i.e. to hide all direction arrows. Set to `True` to show the direction arrows layer.

>**Note**
>
>Setting this keyword argument to `True` won't show any direction arrow hidden through the `EdgeVisibilityMethod.CUSTOM` visibility method.

---

### `show_markers`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `bool`<br />
**Default**: `True`<br />

Set to `False` to hide the markers layer, i.e. to hide all markers. Set to `True` to show the markers layer.

>**Note**
>
>Setting this keyword argument to `True` won't show any marker hidden through the `MarkerVisibilityMethod.CUSTOM` visibility method.

---

## Map keyword arguments

Map keyword arguments allow you to setup the center, zoom, and CSS style of the map.  

Please refer to the docs in the [Leaflet.js website](https://leafletjs.com/) for more information about the format/values of these keyword arguments.

---

### `map_center`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `list`<br />
**Default**: Empty list<br />

Use this keyword argument to initialize/update the map center. The center is a pair of `[lat, lon]` coordinates.

---

### `map_zoom`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `int`<br />
**Default**: 3<br />

Use this keyword argument to initialize/update the map zoom level. 

---
 
### `map_min_zoom`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `int`<br />
**Default**: 3<br />

Use this keyword argument to initialize/update the minimum allowed map level. 

---

### `map_max_zoom`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `int`<br />
**Default**: 20<br />

Use this keyword argument to initialize/update the maximum allowed map level. 

---

### `map_style`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `dict`<br />
**Default**: Empty dictionary<br />

Use this keyword argument to initialize/update the map CSS style. It is a dictionary where keys are style names and values are style values. 

>**Note**
>
>You can use this keyword argument to set the dimensions (width, height) of the Dash Sylvereye visualization. 
>
>Example:
>```python
>{'width': '100%', 'height': '98vh'}
>```

---

## Tile layer keyword arguments

Map keyword arguments allow you to setup the following properties of the tile map layer: URL, attribution, subdomains, and opacity.

Any tile layer that works with Leaflet.js should work with Dash Sylvereye.

Please refer to the docs in the [Leaflet.js website](https://leafletjs.com/) for more information about the format/values of these keyword arguments.

---

### `tile_layer_url`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `str`<br />
**Default**: ```'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'```<br />

The tile layer URL template. 

---

### `tile_layer_attribution`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `str`<br />
**Default**: ```'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'```<br />

The tile layer attribution HTML text.

---

### `tile_layer_subdomains`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `str`<br />
**Default**: Empty string<br />

The tile layer subdomains.

---

### `tile_layer_opacity`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `float`<br />
**Default**: 1.0<br />

The tile layer opacity. It must be a value between 0 and 1.0 (inclusive).

>**Note**
>
>Set this keyword argument to 0 to hide the tile map layer.

---