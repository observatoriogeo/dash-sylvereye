---
id: edges_customization
title: API
sidebar_label: Edge options
---

## Edge options

Visual options for edges are set by populating the `edge_options` dictionary and passing it to the `SylvereyeRoadNetwork` component.

Fetch a pre-filled `edge_options` dictionary like this:

```python
from dash_sylvereye.defaults import get_default_edge_options

edge_options = get_default_edge_options()
```

Customize the returned `edge_options` as needed, then pass it to the `SylvereyeRoadNetwork` component.

Four visual features of an edge can be customized: **visibility**, **alpha**, **color**, and **width**.

Each visual feature has a small set of *methods* associated with it.

For example, there are three edge color methods: `EdgeColorMethod.DEFAULT`, `EdgeColorMethod.SCALE`, and `EdgeColorMethod.CUSTOM`.

Say you want to set the color of all edges to the default color.

To do so, first import the color methods enum `EdgeColorMethod` and the `get_default_edge_options` function:

```python
from dash_sylvereye.enums import EdgeColorMethod
from dash_sylvereye.defaults import get_default_edge_options
```

Then, get a pre-filled `edge_options` dictionary and use the `color_method` key to set the corresponding color method:

```python
edge_options = get_default_edge_options()
edge_options['color_method'] = EdgeColorMethod.DEFAULT
```

Finally, pass the `edge_options` dictionary to the `SylvereyeRoadNetwork` component:

```python
# 'app' is the Dash app object
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...
                         edge_options=edge_options,
                         ...
                        )
])
```

Each visibility/alpha/color/width method can have a different number of parameters which are also set in the `edge_options` dictionary, as documented in the following sections.

## Visibility

The 'visibility' feature of an edge allows you to hide it. No interaction is possible with a non-visible edge, i.e. users cannot click hidden edges. 

### Visibility methods

There are two visibility methods for edges: `EdgeVisibilityMethod.ALWAYS` and `EdgeVisibilityMethod.CUSTOM`.

Use the `visibility_method` key of the `edge_options` dictionary to set the visibility method.

---

### `visibility_method` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `str`


Sets the visibility method for all edges. Pass a value from the `EdgeVisibilityMethod` enum.

---

### 'Always' visibility

The `EdgeVisibilityMethod.ALWAYS` visibility method renders every edges visible.

Example:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeVisibilityMethod
from dash_sylvereye.defaults import get_default_edge_options

# edges options setup
edge_options = get_default_edge_options()
edge_options['visibility_method'] = EdgeVisibilityMethod.ALWAYS

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

### Custom visibility

The `EdgeVisibilityMethod.CUSTOM` visibility method allows you to define the visibility of each edge, individually. 

To make an edge visible, set the `visibility` key of the edge to `True`. To hide it, set it to `False`.

The following example hides edges at random:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeVisibilityMethod
from dash_sylvereye.defaults import get_default_edge_options

# assign a random visibility to every edge
# 'edges_data' is a previously loaded Sylvereye edges list
for edge in edges_data:
    edge['visibility'] = random.choice([True, False])

# edges options setup
edge_options = get_default_edge_options()
edge_options['visibility_method'] = EdgeVisibilityMethod.CUSTOM

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

## Alpha

Alpha refers to the transparency of edges. The alpha value ranges from 0 to 1. It is inversely proportional to the transparency. 

An alpha of 1.0 (100%) denotes a transparency of 0% (fully visible). An alpha of 0.5 (50%) denotes a transparency of 50% (translucent). An alpha of 0 (0%) denotes a transparency of 100% (fully hidden).

Unlike visibility, edges with an alpha of 0 are interactive, i.e. users can still click them.

### Alpha methods

There are three alpha methods for edges: `EdgeAlphaMethod.DEFAULT`, `EdgeAlphaMethod.SCALE`, and `EdgeAlphaMethod.CUSTOM`. 

Use the `alpha_method` key of the `edge_options` dictionary to set the alpha method.

---

### `alpha_method` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `str`

Sets the alpha method for all edges. Pass a value from the `EdgeAlphaMethod` enum.  

---

### The minimum alpha

The formula for computing the final alpha value of an edge is as follows:

```javascript
Math.min(edge_alpha + edge_options.alpha_min, 1.0)
```

where `edge_alpha` is the default alpha if using the `EdgeAlphaMethod.DEFAULT` method, the scaled alpha if using the `EdgeAlphaMethod.SCALE`, or a custom alpha if using the `EdgeAlphaMethod.CUSTOM` method.

The above formula implies that the minimum posible edge alpha is `alpha_min` and the maximum posible edge alpha is 1.0. 

The default value of `alpha_min` is 0. Thus, `alpha_min` has no effect unless you decide to set it to any value higher than 0. You can do so by setting the `alpha_min` key of the `edge_options` dictionary.

`alpha_min` is useful to prevent edges to become fully transparent regardless of the alpha method used.

---

### `alpha_min` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `float`

The minimum possible alpha value for edges. It must be a float value between 0 and 1, inclusive. Use it with any edge alpha method.

---

### Default alpha

Use the `EdgeAlphaMethod.DEFAULT` alpha method to set the alpha of all edges to the same alpha value. 

:::note
The default edge alpha is 1.0.
:::

The following example sets the alpha of all edges to the default one:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeAlphaMethod
from dash_sylvereye.defaults import get_default_edge_options

# edges options setup
edge_options = get_default_edge_options()
edge_options['alpha_method'] = EdgeAlphaMethod.DEFAULT

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

The following example sets the alpha of all edges to 0.5 by updating the `alpha_default` key of the `edge_options` dictionary:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeAlphaMethod
from dash_sylvereye.defaults import get_default_edge_options

# edges options setup
edge_options = get_default_edge_options()
edge_options['alpha_method'] = EdgeAlphaMethod.DEFAULT
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

:::note
If `alpha_min` is set to any value higher than 0, the resulting edge alpha value for any edge will be `alpha_min` + `alpha_default`.
:::

---

### `alpha_default` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `float`

Sets the default alpha value of all edges. It must be a float value between 0 and 1, inclusive. Use it with the `EdgeAlphaMethod.DEFAULT` edge alpha method.

---

### Scaled alpha

Use the `EdgeAlphaMethod.SCALE` alpha method to automatically set the alpha of all edges in proportion to a numeric edge data field. 

Edges with the largest data value will be assigned an alpha of 1.0, whereas edges with the smallest data value will be assigned an alpha of 0. The rest of the edges will be assigned a proportional alpha value.

:::note
If `alpha_min` is set to any value higher than 0, the resulting edge alpha value for any edge will be `alpha_min` + the scaled alpha value.
:::

The following example sets a random value to the `weight` data field of all edges. Then, it sets the alpha of edges in proportion to the edge `weight` field with the `EdgeAlphaMethod.SCALE` alpha method:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeAlphaMethod
from dash_sylvereye.defaults import get_default_edge_options

# assign a random weight to every edge in the 'weight' data property
# 'edges_data' is a previously loaded Sylvereye edges list
for edge in edges_data:
    edge['data']['weight'] = random.random()

# edges options setup
edge_options = get_default_edge_options()
edge_options['alpha_method'] = EdgeAlphaMethod.SCALE
edge_options['alpha_scale_field'] = 'weight'

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

Note in the example that the name of the edge data field can be arbitrary. Use the `alpha_scale_field` key of the `edge_options` dictionary to indicate the name of the edge data field.

---

### `alpha_scale_field` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `str`

Sets the name of the edge data field for calculating the scaled alpha of edges. Use it with the `EdgeAlphaMethod.SCALE` edge alpha method.

---

### Custom alpha

Use the `EdgeAlphaMethod.CUSTOM` edge alpha method to set the alpha of edges to the `alpha` edge field. This allows you to manually manipulate the alpha of individual edges. `alpha` must be a float value between 0 and 1, inclusive.

:::note
If `alpha_min` is set to any value higher than 0, the resulting edge alpha value for any edge will be `alpha_min` + the custom alpha value.
:::

The following example assigns a random value to the `alpha` field of all edges. Then, it sets the alpha of all edges to that field with the `EdgeAlphaMethod.CUSTOM` edge alpha method:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeAlphaMethod
from dash_sylvereye.defaults import get_default_edge_options

# assign a random alpha to every edge
# 'edges_data' is a previously loaded Sylvereye edges list
for edge in edges_data:
    edge['alpha'] = random.random()

# edges options setup
edge_options = get_default_edge_options()
edge_options['alpha_method'] = EdgeAlphaMethod.CUSTOM

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

## Color

You can manipulate the color of edges. Color values are expressed as hex integers between `0x000000` and `0xffffff`, inclusive.

### Color methods

There are three color methods for edges: `EdgeColorMethod.DEFAULT`, `EdgeColorMethod.SCALE`, and `EdgeColorMethod.CUSTOM`. 

Use the `color_method` key of the `edge_options` dictionary to set the color method.
 
---

### `color_method` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `str`

Sets the color method for all edges. Pass a value from the `EdgeColorMethod` enum.  

---

### Default color

Use the `EdgeColorMethod.DEFAULT` edge color method to set every edges the same color.

:::note
The default edge color is `0x06696`.
:::

The following example resets the color of all edges to the default color.

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeColorMethod
from dash_sylvereye.defaults import get_default_edge_options

# edges options setup
edge_options = get_default_edge_options()
edge_options['color_method'] = EdgeColorMethod.DEFAULT

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

The following example changes the color of all edges to `0xaad28c` by updating the `color_default` key of the `edge_options` dictionary:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeColorMethod
from dash_sylvereye.defaults import get_default_edge_options

# edges options setup
edge_options = get_default_edge_options()
edge_options['color_method'] = EdgeColorMethod.DEFAULT
edge_options['color_default'] = 0xaad28c

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

### `color_default` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `int`

Sets the default color value of all edges. Must be a hex integer between `0x000000` and `0xffffff`, inclusive. Use it with the `EdgeColorMethod.DEFAULT` edge color method.

---

### Scaled color

Use the `EdgeColorMethod.SCALE` edge color method to automatically scale the color of all edges to the numeric edge data field `color_scale_field`. 

Edges with the smallest data value will be assigned the color `color_scale_left`, whereas edges with the largest data value will be assigned the color `color_scale_right`. The rest of the edges will be assigned a scaled color between `color_scale_left` and `color_scale_right`, inclusive.

:::note
Color scales are computed with chroma.js on the client side.

Visit [chroma.js website](https://gka.github.io/chroma.js/) for more details on how color scales are computed.
:::

The following example sets the `weight` data field of all edges with a random value. Then, it sets the color of edges scaled by `weight` according to the color scale `0xaad28c`-`0xa10000` with the `EdgeColorMethod.SCALE` alpha method:

Example:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeColorMethod
from dash_sylvereye.defaults import get_default_edge_options

# assign a random weight to every edge in the 'weight' data property
# 'edges_data' is a previously loaded Sylvereye edges list
for edge in edges_data:
    edge['data']['weight'] = random.random()

# edges options setup
edge_options = get_default_edge_options()
edge_options['color_method'] = EdgeColorMethod.SCALE
edge_options['color_scale_field'] = 'weight'
edge_options['color_scale_left'] = 0xaad28c
edge_options['color_scale_right'] = 0xa10000

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

### `color_scale_field` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `str`

Sets the name of the edge data field to use to compute the scaled color. Use it with the `EdgeColorMethod.SCALE` edge color method. 


---

### `color_scale_left` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `int`

Sets the 'left end' of the color scale. Must be a hex integer between `0x000000` and `0xffffff`, inclusive. Use it with the `EdgeColorMethod.SCALE` edge color method.

---

### `color_scale_right` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `int`

Sets the 'right end' of the color scale. Must be a hex integer between `0x000000` and `0xffffff`, inclusive. Use it with the `EdgeColorMethod.SCALE` edge color method.

---

### Custom color

Use the `EdgeColorMethod.CUSTOM` edge color method to set the color of edges to the `color` edge field. This allows you to manually manipulate the color of individual edges. `color` must be a hex integer between `0x000000` and `0xffffff`, inclusive.

The following example assigns a random color to the `color` field of all edges. Then, it sets the color of all edges to that field with the `EdgeColorMethod.CUSTOM` edge color method:
 
```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeColorMethod
from dash_sylvereye.defaults import get_default_edge_options

# assign a random color to every edge
# 'edges_data' is a previously loaded Sylvereye edges list
for edge in edges_data:
    edge['color'] = int('%02X%02X%02X' % (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)), base=16)

# edges options setup
edge_options = get_default_edge_options()
edge_options['color_method'] = EdgeColorMethod.CUSTOM

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

## Width

You can manipulate the width of edges. The width of an edge is expressed as a positive float number or 0.

### Width methods

There are three width methods for edges: `EdgeWidthMethod.DEFAULT`, `EdgeWidthMethod.SCALE`, and `EdgeWidthMethod.CUSTOM`. 

Use the `width_method` key of the `edge_options` dictionary to set the width method.

---

### `width_method` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `str`

Sets the width method for all edges. Pass a value from the `EdgeWidthMethod` enum.  

---

### Default width

Use the `EdgeWidthMethod.DEFAULT` edge width method to set every edges the same width.

:::note
The default edge width is 0.25.
:::

The following example resets the width of all edges to the default width:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeWidthMethod
from dash_sylvereye.defaults import get_default_edge_options

# edges options setup
edge_options = get_default_edge_options()
edge_options['width_method'] = EdgeWidthMethod.DEFAULT

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

The following example changes the width of all edges to 0.35 by updating the `width_default` key of the `edge_options` dictionary:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeWidthMethod
from dash_sylvereye.defaults import get_default_edge_options

# edges options setup
edge_options = get_default_edge_options()
edge_options['width_method'] = EdgeWidthMethod.DEFAULT
edge_options['width_default'] = 0.35

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

### `width_default` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `float`

Sets the default width value of all edges. It must be a positive float value or 0. Use it with the `EdgeWidthMethod.DEFAULT` edge color method.

---

### Scaled width

Use the `EdgeWidthMethod.SCALE` width method to derive each edge's width from the numeric data field named by `width_scale_field`.

Edges with the smallest value get the thinnest width; edges with the largest value get the thickest. Every other edge falls on a linear interpolation between the two.

:::note
The scaling formula is:
```javascript
width = edge_options.width_default + normalizedWeight;
```
`normalizedWeight` is the edge's data value normalized to the range `[0, 1]`. With the default `width_default` of 0.25, the scaled width therefore ranges from 0.25 (smallest) to 1.25 (largest).
:::

The following example assigns a random `weight` to every edge, then activates `EdgeWidthMethod.SCALE` with `weight` as the `width_scale_field`:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeWidthMethod
from dash_sylvereye.defaults import get_default_edge_options

# assign a random weight to every edge in the 'weight' data property
# 'edges_data' is a previously loaded Sylvereye edges list
for edge in edges_data:
    edge['data']['weight'] = random.random()

# edges options setup
edge_options = get_default_edge_options()
edge_options['width_method'] = EdgeWidthMethod.SCALE
edge_options['width_scale_field'] = 'weight'

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

### `width_scale_field` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `str`

Sets the name of the edge data field to use to compute the scaled width. Use it with the `EdgeWidthMethod.SCALE` edge width method.  
 
---

### Custom width

Use the `EdgeWidthMethod.CUSTOM` width color method to set the width of edges to the `width` edge field. This allows you to manually manipulate the width of individual edges. `width` must be a positive float number or 0.

The following example assigns a random width to the `width` field of all edges. Then, it sets the width of all edges to that field with the `EdgeWidthMethod.CUSTOM` edge width method:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import EdgeWidthMethod
from dash_sylvereye.defaults import get_default_edge_options

# assign a random width to every edge
# 'edges_data' is a previously loaded Sylvereye edges list
for edge in edges_data:
    edge['width'] = random.random() 

# edges options setup
edge_options = get_default_edge_options()
edge_options['width_method'] = EdgeWidthMethod.CUSTOM

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

## Other options

For debugging purposes, the `SylvereyeRoadNetwork` component can be instructed to show the edge hit polygons, i.e. the polygons that wrap every edge and that define the edge click detection area.

To do so, just switch the `show_edge_hit_polygons` key of the `node_options` dictionary to `True`. The default value is `False`.

---

### `show_edge_hit_polygons` 

**Kind**: `edge_options` dictionary key <br />
**Type**: `bool`

If set to `True`, shows the hit polygon of all edges. 

---