---
id: data_format
title: API
sidebar_label: Road network format
---

## Road network format

Dash Sylverey’s road network data representation is straightforward: nodes and edges are provided in two separated lists of dictionaries.

Each dictionary in the `nodes_data` node list represents a node. Similarly, each dictionary in the `edges_data` edge list represents an edge. 

Similarly to nodes and edges, markers are provided as a separated list of dictionaries `markers_data` where each dictionary represents a marker.
 

## Nodes data format

Every node dictionary in the `nodes_data` list has to include the node’s latitude and longitude in the `lon` and `lat` keys, respectively.

For visualization purposes, nodes must also include the following keys: `weight`, `size`, `color`, `transparency`, and `visibility`.

Nodes can optionally hold arbitrary data under the `data` key. 

Example of a node dictionary:

```python
{
    'lon': 20.5858171,
    'lat': -100.3888608,            
    'visible': True,
    'alpha': 1.0,
    'size': 0.005,
    'color': 0xa10000,
    'data': { 
        'foo1': 'bar', 
        'foo2': 'baz' 
    }
}
```
### Dictionary keys

---

### `lon`

**Kind**: Node dictionary key <br />
**Type**: `float`<br />

Node's longitute coordinate. This key is mandatory.

---

### `lat`

**Kind**: Node dictionary key <br />
**Type**: `float`<br />

Node's latitude coordinate. This key is mandatory.

---

### `visible`

**Kind**: Node dictionary key <br />
**Type**: `bool`<br />

If `False`, the node will be hidden when using the [`NodeVisibilityMethod.CUSTOM` visibility method](nodes_customization#custom-visibility). Thus, it is mandatory when using the aforementioned visibility method.

---

### `alpha`

**Kind**: Node dictionary key <br />
**Type**: `float`<br />

Node's alpha (transparency) value. Must be a number between 0 and 1 (inclusive). Mandatory when using the [`NodeAlphaMethod.CUSTOM` alpha method](nodes_customization#custom-alpha).

---

### `size`

**Kind**: Node dictionary key <br />
**Type**: `float`<br />

Node's size. It must be either 0 or a positive float value. Mandatory when using the [`NodeSizeMethod.CUSTOM` size method](nodes_customization#custom-size).

---

### `color`

**Kind**: Node dictionary key <br />
**Type**: `int`<br />

Node's color in [hex format](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet). It must be an hex integer between `0x000000` and `0xffffff` (inclusive). Mandatory when using the [`NodeColorMethod.CUSTOM` color method](nodes_customization#custom-color).

---

### `data`

**Kind**: Node dictionary key <br />
**Type**: `dict`<br />

Optional node's data dictionary. Use it to store arbitrary data inside a node.

---

## Edges data format

Every edge dictionary in the `edges_data` list has to include the line’s list of coordinates under the `coords` keys.

For visualization purposes, edges must also include the following keys: `weight`, `width`, `color`, `transparency`, and `visibility`.

Edges can optionally hold arbitrary data under the `data` key. 

Example of an edge dictionary:

```python
{
    'coords': [[20.6377171, -100.4298833], [20.6362819, -100.4329804], [20.6360693, -100.4334094], [20.6348112, -100.4360734]],
    'visible': True,
    'alpha': 1.0,
    'width': 0.25,
    'color': 0x06696,
    'data': { 
        'foo1': 'bar', 
        'foo2': 'baz' 
    }
}
```

### Dictionary keys

---

### `coords`

**Kind**: Edge dictionary key <br />
**Type**: `list` of `list`<br />

List of coordinate pairs `[lat, lon]`. Each coordinate pair is a point of the edge line. This key is mandatory.

---

### `visible`

**Kind**: Edge dictionary key <br />
**Type**: `bool`<br />

If `False`, the edge will be hidden when using the [`EdgeVisibilityMethod.CUSTOM` visibility method](edges_customization#custom-visibility). Thus, it is mandatory when using the aforementioned visibility method.

---

### `alpha`

**Kind**: Edge dictionary key <br />
**Type**: `float`<br />

Edge's alpha (transparency) value. Must be a number between 0 and 1 (inclusive). Mandatory when using the [`EdgeAlphaMethod.CUSTOM` alpha method](edges_customization#custom-alpha).

---

### `width`

**Kind**: Edge dictionary key <br />
**Type**: `float`<br />

Edge's width. It must be either 0 or a positive float value. Mandatory when using the [`EdgeSizeMethod.CUSTOM` width method](edges_customization#custom-width).

---

### `color`

**Kind**: Edge dictionary key <br />
**Type**: `int`<br />

Edge's color in [hex format](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet). It must be an hex integer between `0x000000` and `0xffffff` (inclusive). Mandatory when using the [`EdgeColorMethod.CUSTOM` color method](edges_customization#custom-color).

---

### `data`

**Kind**: Edge dictionary key <br />
**Type**: `dict`<br />

Optional edge's data dictionary. Use it to store arbitrary data inside a edge.

---

## Markers data format

Every marker dictionary in the `markers_data` list has to include the marker’s latitude and longitude under the `lon` and `lat` keys, respectively.

For visualization purposes, markers must also include the following keys: `weight`, `size`, `color`, `transparency`, `size_scale_min`, `size_scale_max`, and `visibility`.

In addition, each marker can have a custom icon under the `icon_id` and `icon_image` keys. Each marker can also hold a tooltip text under the `tooltip` key.

Markers can optionally hold arbitrary data under the `data` key. 

Example of a marker dictionary:
  
```python
{
    'icon_id': 'sample_marker',
    'icon_image': '<svg height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>',
    'lat': 20.5858171,
    'lon': -100.3888608,
    'color': 0x066cc,
    'visible': True,
    'alpha': 1.0,
    'size': 0.25,
    'size_scale_min': 0.25,
    'size_scale_max': 0.5,
    'data': { 
        'foo1': 'bar', 
        'foo2': 'baz' 
    }
    'tooltip': 'This is the tooltip text.'
}
```

### Dictionary keys

---

### `icon_id`

**Kind**: Marker dictionary key <br />
**Type**: `str`<br />

Arbitrary string to identify a custom icon. Mandatory when using the [`MarkerIconMethod.CUSTOM` icon method](markers_customization#custom-icon).

---

### `icon_image`

**Kind**: Marker dictionary key <br />
**Type**: `str`<br />

SVG string of a custom icon. Mandatory when using the [`MarkerIconMethod.CUSTOM` icon method](markers_customization#custom-icon).

---

### `lat`

**Kind**: Marker dictionary key <br />
**Type**: `float`<br />

Marker's latitude coordinate. This key is mandatory.

---

### `lon`

**Kind**: Marker dictionary key <br />
**Type**: `float`<br />

Marker's longitute coordinate. This key is mandatory.

---

### `color`

**Kind**: Marker dictionary key <br />
**Type**: `int`<br />

---

### `visible`

**Kind**: Marker dictionary key <br />
**Type**: `bool`<br />

Marker's color in [hex format](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet). It must be an hex integer between `0x000000` and `0xffffff` (inclusive). Mandatory when using the [`MarkerColorMethod.CUSTOM` color method](markers_customization#custom-color).

---

### `alpha`

**Kind**: Marker dictionary key <br />
**Type**: `float`<br />

Marker's alpha (transparency) value. Must be a number between 0 and 1 (inclusive). Mandatory when using the [`MarkerAlphaMethod.CUSTOM` alpha method](markers_customization#custom-alpha).

---

### `size`

**Kind**: Marker dictionary key <br />
**Type**: `float`<br />

Marker's size. It must be either 0 or a positive float value. Mandatory when using the [`MarkerSizeMethod.CUSTOM` size method](markers_customization#custom-size).

---

### `size_scale_min`

**Kind**: Marker dictionary key <br />
**Type**: `float`<br />

Sets the minimum marker size for a custom marker icon. 

Mandatory when combining the [`MarkerIconMethod.CUSTOM` icon method](markers_customization#custom-icon) and the [`MarkerSizeMethod.SCALE` size method](markers_customization#scaled-size).

---

### `size_scale_max`

**Kind**: Marker dictionary key <br />
**Type**: `float`<br />

Bounds the maximum marker size for a custom marker icon. 

Mandatory when combining the [`MarkerIconMethod.CUSTOM` icon method](markers_customization#custom-icon) and the [`MarkerSizeMethod.SCALE` size method](markers_customization#scaled-size).

---

### `data`

**Kind**: Marker dictionary key <br />
**Type**: `dict`<br />

Optional node's data dictionary. Use it to store arbitrary data inside a node.

---

### `tooltip`

**Kind**: Marker dictionary key <br />
**Type**: `str`<br />

String to show in the marker's tooltip. 

Mandatory when the [`enable_tooltips` marker option](markers_customization#icon-tooltip) is set to `True`.

---