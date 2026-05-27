---
id: data_utils
title: Reference
sidebar_label: Utility functions
---

## Utility functions

Dash Sylvereye ships a handful of utility functions for common tasks such as building marker lists and fetching default option dictionaries.

## `generate_markers_from_coords`

`generate_markers_from_coords` builds a Dash Sylvereye marker list from a list of `[lat, lon]` coordinates.

It can be imported from the `dash_sylvereye.utils` module.

The following example places a marker on top of each node in the road network:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import generate_markers_from_coords

# fill a list with the coordinates of every node
# 'nodes_data' is a preloaded Dash Sylvereye nodes list
markers_coords = [[node["lat"], node["lon"]] for node in nodes_data]

# make markers out of the list of node coordinates
markers_data = generate_markers_from_coords(markers_coords)

# dashboard setup
# 'app' is the app Dash object
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...                         
                         nodes_data=nodes_data,
                         markers_data=markers_data
                         ...
                        )
                         
])
```

The following example places a custom marker on top of each node, with a tooltip that displays the marker's coordinates on hover:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import generate_markers_from_coords

CUSTOM_ICON_ID = "my_custom_marker"
CUSTOM_ICON_FILEN = "custom_marker.svg"

# fill a list with the coordinates of every node
# 'nodes_data' is a preloaded Dash Sylvereye nodes list
markers_coords = [[node["lat"], node["lon"]] for node in nodes_data]

# make tooltips out of the coordinates of every marker
markers_tooltips = [f'My coords are: {coords}' for coords in markers_coords] 

# make markers out of the list of node coordinates
markers_data = generate_markers_from_coords(markers_coords, CUSTOM_ICON_ID, CUSTOM_ICON_FILEN, markers_tooltips)

# dashboard setup
# 'app' is the app Dash object
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...                         
                         nodes_data=nodes_data,
                         markers_data=markers_data
                         ...
                        )
                         
])
```

---

### Parameters

**Name**: `coords` <br />
**Type**: `list` of `list` 

List of coordinate pairs, one `[lat, lon]` pair per marker.

**Name**: `icon_id` <br />
**Type**: `str` <br />
**Default**:  `'custom_marker'` 

Optional custom ID for the custom icon.

**Name**: `icon_filen` <br />
**Type**: `str` <br />
**Default**: Empty string 

Optional file name of a custom SVG icon to assign to every marker.

**Name**: `tooltips` <br />
**Type**: `list` of `str` <br />
**Default**: Empty list 

Optional list of tooltip strings, one tooltip string per marker.

### Returns

**Type**: `list` of `dict` 

Dash Sylvereye markers list.

---

## `get_edge_middle_coords`

`get_edge_middle_coords` returns the `[lat, lon]` coordinates at the midpoint of the given edge.

This is useful when you want to draw markers directly on top of edges.

It can be imported from the `dash_sylvereye.utils` module.

The following example places a marker at the midpoint of each edge in the road network:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.utils import generate_markers_from_coords, get_edge_middle_coords

# fill a list with the coordinates at the middle of each edge
# 'edges_data' is a preloaded Dash Sylvereye edges list
marker_coords = [get_edge_middle_coords(edge['coords']) for edge in edges_data]

# make markers out of the list of edge coordinates
markers_data = generate_markers_from_coords(marker_coords)

# dashboard setup
# 'app' is the app Dash object
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...                         
                         edges_data=edges_data,
                         markers_data=markers_data
                         ...
                        )
                         
])
```

---

### Parameters

**Name**: edge <br />
**Type**: `list` of `list` 

The list of coordinate pairs that make up the edge.

### Returns

**Type**: `list` of `float` 

The pair of coordinates at the midpoint of the edge.

---
 
## `get_default_node_options`

`get_default_node_options` returns a fresh copy of the default `node_options` dictionary.

The usual flow: call this function to obtain the pre-filled defaults, override the keys you want to change, and pass the result to `SylvereyeRoadNetwork` through the [`node_options` parameter](component_parameters#node_options).

The returned dictionary looks like this:

```python
{
    "color_method": NodeColorMethod.DEFAULT,
    "color_default": 0xa10000,
    "size_method": NodeSizeMethod.DEFAULT,
    "size_default": 0.005,
    "alpha_method": NodeAlphaMethod.DEFAULT,
    "alpha_default": 1.0,
    "visibility_method": NodeVisibilityMethod.ALWAYS
}
```

This function can be imported from the `dash_sylvereye.defaults` module.

:::note
The returned dictionary is a fresh copy.

Mutating it does not affect future calls to `get_default_node_options`, nor the defaults used internally by the Dash Sylvereye component.
:::

The following example uses `get_default_node_options` to set the alpha of every node to 0.5:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.defaults import get_default_node_options

# nodes options setup
node_options = get_default_node_options()
node_options['alpha_default'] = 0.5

# set the 'node_options' parameter of the SylvereyeRoadNetwork component
# 'app' is the Dash app object.
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...
                         node_options=node_options,
                         ...
                        )
])
```
---

### Parameters

This function has no parameters.

### Returns

**Type**: `dict`

A fresh copy of the default `node_options` dictionary.

---

## `get_default_edge_options`

`get_default_edge_options` returns a fresh copy of the default `edge_options` dictionary.

The usual flow: call this function to obtain the pre-filled defaults, override the keys you want to change, and pass the result to `SylvereyeRoadNetwork` through the [`edge_options` parameter](component_parameters#edge_options).

The returned dictionary looks like this:

```python
{
    "color_method": EdgeColorMethod.DEFAULT,
    "color_default": 0x06696,
    "width_method": EdgeWidthMethod.DEFAULT,
    "width_default": 0.25,
    "alpha_method": EdgeAlphaMethod.DEFAULT,
    "alpha_default": 1.0,
    "alpha_min": 0.0,
    "visibility_method": EdgeVisibilityMethod.ALWAYS,
    "show_edge_hit_polygons": False
}
```

This function can be imported from the `dash_sylvereye.defaults` module.

:::note
The returned dictionary is a fresh copy.

Mutating it does not affect future calls to `get_default_edge_options`, nor the defaults used internally by the Dash Sylvereye component.
:::

The following example uses `get_default_edge_options` to set the alpha of every edge to 0.5:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.defaults import get_default_edge_options

# edges options setup
edge_options = get_default_edge_options()
edge_options['alpha_default'] = 0.5

# set the 'edge_options' parameter of the SylvereyeRoadNetwork component
# 'app' is the Dash app object.
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...
                         edge_options=edge_options,
                         ...
                        )
])
```
---

### Parameters

This function has no parameters.

### Returns

**Type**: `dict`

A fresh copy of the default `edge_options` dictionary.

---

## `get_default_marker_options`

`get_default_marker_options` returns a fresh copy of the default `marker_options` dictionary.

The usual flow: call this function to obtain the pre-filled defaults, override the keys you want to change, and pass the result to `SylvereyeRoadNetwork` through the [`marker_options` parameter](component_parameters#marker_options).

The returned dictionary looks like this:

```python
{
    "color_method": MarkerColorMethod.DEFAULT,
    "color_default": 0x066cc,
    "icon_method": MarkerIconMethod.DEFAULT,
    "size_method": MarkerSizeMethod.DEFAULT,
    "size_default": 0.25,
    "size_default_scale_min": 0.25,
    "size_default_scale_max": 0.5,
    "alpha_method": MarkerAlphaMethod.DEFAULT,
    "alpha_default": 1.0,
    "visibility_method": MarkerVisibilityMethod.ALWAYS,
    "enable_zoom_scaling": False,
    "enable_tooltips": False
}
```

This function can be imported from the `dash_sylvereye.defaults` module.

:::note
The returned dictionary is a fresh copy.

Mutating it does not affect future calls to `get_default_marker_options`, nor the defaults used internally by the Dash Sylvereye component.
:::

The following example uses `get_default_marker_options` to set the alpha of every marker to 0.5:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.defaults import get_default_marker_options

# markers options setup
marker_options = get_default_marker_options()
marker_options['alpha_default'] = 0.5

# set the 'marker_options' parameter of the SylvereyeRoadNetwork component
# 'app' is the Dash app object.
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...
                         marker_options=marker_options,
                         ...
                        )
])
```
---

### Parameters

This function has no parameters.

### Returns

**Type**: `dict`

A fresh copy of the default `marker_options` dictionary.

---

TODO: debug_options