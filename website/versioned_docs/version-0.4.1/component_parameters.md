---
id: component_parameters
title: Reference
sidebar_label: Keyword arguments
---

## Keyword arguments

`SylvereyeRoadNetwork` is the core component of the Dash Sylvereye library.

Import it from the `dash_sylvereye` module:

```python
from dash_sylvereye import SylvereyeRoadNetwork
```

`SylvereyeRoadNetwork` accepts 21 keyword arguments, grouped into six categories:

- Dash keyword arguments
- Data keyword arguments
- Options keyword arguments
- Show/hide keyword arguments
- Map keyword arguments
- Tile-layer keyword arguments

A complete picture of every keyword argument, with its default value:

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

None of the keyword arguments are mandatory.

Thanks to Dash's callback architecture, every `SylvereyeRoadNetwork` keyword argument other than `id` can be updated at runtime to drive the visualization, typically in response to the user's interaction with other Dash components.

## Dash keyword arguments

These are the keyword arguments mandated by Dash itself. For now there is only one, `id`:

---

### `id`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `str`<br />
**Default**: Empty string<br />

The identifier of the Dash component.

---

## Data keyword arguments

`SylvereyeRoadNetwork` needs two pieces of data to describe a road-network topology: nodes and edges. They are supplied separately through the `nodes_data` and `edges_data` keyword arguments.

You usually populate `nodes_data` and `edges_data` from OSMnx-generated data using the [load_from_osmnx_graph](data_loading#load_from_osmnx_graph) and [load_from_osmnx_graphml](data_loading#load_from_osmnx_graphml) helpers, but you can also build the lists by hand.

`SylvereyeRoadNetwork` also supports map markers, supplied through the `markers_data` keyword argument.

You usually populate `markers_data` from a list of coordinate pairs with the [generate_markers_from_coords](data_utils#generate_markers_from_coords) helper, but again you can build the list by hand if you prefer.

---

### `nodes_data`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `list` of `dict`<br />
**Default**: Empty list<br />

The list of the road network's nodes. Each item must be a node. See the [nodes data format](data_format#nodes-data-format) for the schema each node item must follow.

---

### `edges_data`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `list` of `dict`<br />
**Default**: Empty list<br />

The list of the road network's edges. Each item must be an edge. See the [edges data format](data_format#edges-data-format) for the schema each edge item must follow.

---

### `markers_data`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `list` of `dict`<br />
**Default**: Empty list<br />

The list of map markers. Each item must be a marker. See the [markers data format](data_format#markers-data-format) for the schema each marker item must follow.

---

## Options keyword arguments

The visualization options for nodes, edges, and markers are supplied as separate dictionaries.

`node_options` controls the color, size, and transparency methods used for nodes.

The usual flow: fetch a pre-filled default with `get_default_node_options`, override the keys you care about, and pass the result to `SylvereyeRoadNetwork` as `node_options`.

`edge_options` controls the color, width, and transparency methods used for edges.

The usual flow: fetch a pre-filled default with `get_default_edge_options`, override the keys you care about, and pass the result to `SylvereyeRoadNetwork` as `edge_options`.

`marker_options` controls the color, size, transparency, and icon methods used for markers.

The usual flow: fetch a pre-filled default with `get_default_marker_options`, override the keys you care about, and pass the result to `SylvereyeRoadNetwork` as `marker_options`.

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

The visual options dictionary for nodes. See [Node options](nodes_customization) for the supported keys and their semantics.

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

The visual options dictionary for edges. See [Edge options](edges_customization) for the supported keys and their semantics.

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

The visual options dictionary for markers. See [Marker options](markers_customization) for the supported keys and their semantics.

---

### `debug_options`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `dict`<br />
**Default**: Empty dictionary<br />

The debug options. #TODO

## Show/hide keyword arguments

You can hide any combination of the four visualization layers (nodes, edges, direction arrows, markers) with the `show_nodes`, `show_edges`, `show_arrows`, and `show_markers` keyword arguments.

Hiding a layer often improves the visualization's responsiveness.

:::note
To hide the map layer, set the [tile_layer_opacity](#tile_layer_opacity) component keyword argument to 0.
:::


---

### `show_nodes`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `bool`<br />
**Default**: True<br />

Set to `False` to hide the nodes layer (hides every node). Set to `True` to show the layer.

:::caution
Setting this keyword argument to `True` does not re-reveal nodes that were hidden through the `NodeVisibilityMethod.CUSTOM` visibility method. The two controls compose: a node is shown only if `show_nodes` is `True` *and* the per-node `visible` field permits it.
:::

---

### `show_edges`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `bool`<br />
**Default**: `True`<br />

Set to `False` to hide the edges layer (hides every edge). Set to `True` to show the layer.

:::caution
Setting this keyword argument to `True` does not re-reveal edges that were hidden through the `EdgeVisibilityMethod.CUSTOM` visibility method.
:::

---

### `show_arrows`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `bool`<br />
**Default**: `True`<br />

Set to `False` to hide the direction-arrows layer (hides every arrow). Set to `True` to show the layer.

:::caution
Setting this keyword argument to `True` does not re-reveal arrows that belong to edges hidden through the `EdgeVisibilityMethod.CUSTOM` visibility method.
:::

---

### `show_markers`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `bool`<br />
**Default**: `True`<br />

Set to `False` to hide the markers layer (hides every marker). Set to `True` to show the layer.

:::caution
Setting this keyword argument to `True` does not re-reveal markers that were hidden through the `MarkerVisibilityMethod.CUSTOM` visibility method.
:::

---

## Map keyword arguments

The map keyword arguments configure the center, zoom level, and CSS style of the underlying map.

See the [Leaflet.js documentation](https://leafletjs.com/) for the format and accepted values of these arguments.

---

### `map_center`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `list`<br />
**Default**: `[38.64, -90.24]` (St. Louis, MO)<br />

Sets or updates the map center, given as a pair of `[lat, lon]` coordinates.

:::tip
Always set `map_center` to a location relevant to your road network. The fallback is St. Louis only because the underlying map needs a starting position before your data loads.
:::

---

### `map_zoom`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `int`<br />
**Default**: 3<br />

Sets or updates the map zoom level.

---
 
### `map_min_zoom`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `int`<br />
**Default**: 3<br />

Sets or updates the minimum allowed zoom level.

---

### `map_max_zoom`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `int`<br />
**Default**: 20<br />

Sets or updates the maximum allowed zoom level.

---

### `map_style`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `dict`<br />
**Default**: `{'width': '100%', 'height': '98vh'}`<br />

Sets or updates the CSS style applied to the map. The value is a dictionary mapping CSS property names to their values.

:::note
Use this keyword argument to set the dimensions (width and height) of the Dash Sylvereye visualization.

Example:
```python
{'width': '100%', 'height': '98vh'}
```
:::

---

## Tile-layer keyword arguments

The tile-layer keyword arguments configure the URL, attribution, subdomains, and opacity of the map's tile layer.

Any tile layer that works with Leaflet.js will work with Dash Sylvereye.

See the [Leaflet.js documentation](https://leafletjs.com/) for the format and accepted values of these arguments.

---

### `tile_layer_url`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `str`<br />
**Default**: ```'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'```<br />

The tile-layer URL template.

---

### `tile_layer_attribution`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `str`<br />
**Default**: ```'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'```<br />

The HTML attribution displayed for the tile layer.

---

### `tile_layer_subdomains`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `str`<br />
**Default**: `"abc"`<br />

The subdomains used to load tiles. Each character is interpreted as a single subdomain that may replace the `{s}` token in `tile_layer_url`.

:::caution
A tile-layer URL that contains `{s}` requires a non-empty `tile_layer_subdomains`. The OpenStreetMap default URL uses `{s}` and the default `"abc"` covers it. If you swap in a tile provider whose URL has no `{s}`, the value is ignored.
:::

---

### `tile_layer_opacity`

**Kind**: `SylvereyeRoadNetwork` component keyword argument <br />
**Type**: `float`<br />
**Default**: 1.0<br />

The tile-layer opacity. Must be a value between 0 and 1.0, inclusive.

:::tip
Set this keyword argument to 0 to hide the tile layer entirely (useful when you want to render only the road network on a blank background).
:::

---