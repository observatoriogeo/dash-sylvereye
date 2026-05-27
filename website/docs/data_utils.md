---
id: data_utils
title: Reference
sidebar_label: Utility functions
---

## Utility functions

Dash Sylvereye provides convenient utility functions for tasks like markers generation and getting default options.

## `generate_markers_from_coords`

Use `generate_markers_from_coords` to generate a Dash Sylvereye marker list out of a list of [lat, lon] coordinates.

It be imported from the `dash_sylvereye.utils` module.

The following example will draw a marker on top of each node in the road network:

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

The following example will draw a custom marker on top of each node in the road network. Each marker will show a tooltip with its coordinates when hovered on:

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

List of pairs of coordinates, one pair of [lat, lon] coordinates per marker.

**Name**: `icon_id` <br />
**Type**: `str` <br />
**Default**:  `'custom_marker'` 

Optional custom ID for the custom icon.

**Name**: `icon_filen` <br />
**Type**: `str` <br />
**Default**: Empty string 

Optional file name of a custom SVG icon which will be assigned to all markers.

**Name**: `tooltips` <br />
**Type**: `list` of `str` <br />
**Default**: Empty list 

Optional list of tooltip strings, one tooltip string per marker.

### Returns

**Type**: `list` of `dict` 

Dash Sylvereye markers list.

---

## `get_edge_middle_coords`

Use `get_edge_middle_coords` to get the (lat, lon) coordinates at the middle of the provided edge. 

This function is useful to draw markers on top of edges. 

It can be imported from the `dash_sylvereye.utils` module.

The following example will draw a marker at the middle point of each edge in the road network:

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

The list of pairs of coordinates of an edge.

### Returns

**Type**: `list` of `float` 

The pair of coordinates located at the middle of the edge.

---
 
## `get_default_node_options`

Use `get_default_node_options` to get a copy of the default `node_options` dictionary.

You usually first get a pre-filled default `node_options` dictionary by using this function, then customize the returned `node_options` according to your needs, and finally pass it to `SylvereyeRoadNetwork` through the [`node_options` parameter](component_parameters#node_options).

The content of the returned `node_options` is as follows:

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

>**Note**
>
>This function returns a full copy of the default `node_options` dictionary. 
>
>Modifying the returned copy won't change the `node_options` dictionary returned by future calls to this function, nor the node options that come by default with the Dash Sylvereye component.

The following example employs `get_default_node_options` to set the alpha of all nodes to 0.5:

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

Returns a copy of the default `node_options` dictionary.

---

## `get_default_edge_options`

Use `get_default_edge_options` to get a copy of the default `edge_options` dictionary.

You usually first get a pre-filled default `edge_options` dictionary by using this function, then customize the returned `edge_options` according to your needs, and finally pass it to `SylvereyeRoadNetwork` through the [`edge_options` parameter](component_parameters#edge_options).

The content of the returned `edge_options` is as follows:

```python
{
    "color_method": EdgeColorMethod.DEFAULT,
    "color_default": 0x06696,
    "width_method": EdgeWidthMethod.DEFAULT,
    "width_default": 0.25,
    "alpha_method": EdgeAlphaMethod.DEFAULT,
    "alpha_default": 1.0,
    "alpha_min": 0.0,
    "visibility_method": EdgeVisibilityMethod.ALWAYS
}
```

This function can be imported from the `dash_sylvereye.defaults` module.

>**Note**
>
>This function returns a full copy of the default `edge_options` dictionary. 
>
>Modifying the returned copy won't change the `edge_options` dictionary returned by future calls to this function, nor the edge options that come by default with the Dash Sylvereye component.

The following example employs `get_default_edge_options` to set the alpha of all edges to 0.5:

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

Returns a copy of the default `edge_options` dictionary.

---

## `get_default_marker_options`

Use `get_default_marker_options` to get a copy of the default `marker_options` dictionary.

You usually first get a pre-filled default `marker_options` dictionary by using this function, then customize the returned `marker_options` according to your needs, and finally pass it to `SylvereyeRoadNetwork` through the [`marker_options` parameter](component_parameters#marker_options).

The content of the returned `marker_options` is as follows:

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

>**Note**
>
>This function returns a full copy of the default `marker_options` dictionary. 
>
>Modifying the returned copy won't change the `marker_options` dictionary returned by future calls to this function, nor the marker options that come by default with the Dash Sylvereye component.

The following example employs `get_default_marker_options` to set the alpha of all markers to 0.5:

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

Returns a copy of the default `marker_options` dictionary.

---

TODO: debug_options