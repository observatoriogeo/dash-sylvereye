---
id: nodes_customization
title: Reference
sidebar_label: Node options
---

## Node options

Visual options for nodes are set by populating the `node_options` dictionary and passing it to the `SylvereyeRoadNetwork` component.

Fetch a pre-filled `node_options` dictionary like this:

```python
from dash_sylvereye.defaults import get_default_node_options

node_options = get_default_node_options()
```

Customize the returned `node_options` as needed, then pass it to the `SylvereyeRoadNetwork` component.

Four visual features of a node can be customized: **visibility**, **alpha**, **color**, and **size**.

Each visual feature has a small set of *methods* associated with it.

For example, there are three node color methods: `NodeColorMethod.DEFAULT`, `NodeColorMethod.SCALE`, and `NodeColorMethod.CUSTOM`.

Suppose you want every node to use the default color. First, import the `NodeColorMethod` enum and `get_default_node_options`:

```python
from dash_sylvereye.enums import NodeColorMethod
from dash_sylvereye.defaults import get_default_node_options
```

Then fetch a pre-filled `node_options` dictionary and set the `color_method` key:

```python
node_options = get_default_node_options()
node_options['color_method'] = NodeColorMethod.DEFAULT
```

Finally, pass `node_options` to the `SylvereyeRoadNetwork` component:

```python
# 'app' is the Dash app object
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...
                         node_options=node_options,
                         ...
                        )
])
```

Each visibility, alpha, color, and size method may take additional parameters, also set on the `node_options` dictionary. The sections below document them.

## Visibility

The *visibility* feature of a node controls whether the node is shown. A hidden node is also non-interactive: clicks on it do not register.

### Visibility methods

There are two visibility methods for nodes: `NodeVisibilityMethod.ALWAYS` and `NodeVisibilityMethod.CUSTOM`.

Use the `visibility_method` key of `node_options` to choose between them.

---

### `visibility_method` 

**Kind**: `node_options` dictionary key <br />
**Type**: `str`

Sets the visibility method for every node. Pass a value from the `NodeVisibilityMethod` enum.

---

### 'Always' visibility

The `NodeVisibilityMethod.ALWAYS` visibility method renders every node visible.

Example:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeVisibilityMethod
from dash_sylvereye.defaults import get_default_node_options

# nodes options setup
node_options = get_default_node_options()
node_options['visibility_method'] = NodeVisibilityMethod.ALWAYS

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

### Custom visibility

The `NodeVisibilityMethod.CUSTOM` visibility method lets you control each node's visibility individually.

To show a node, set its `visibility` key to `True`. To hide it, set it to `False`.

The following example hides nodes at random:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeVisibilityMethod
from dash_sylvereye.defaults import get_default_node_options

# assign a random visibility to every node
# 'nodes_data' is a previously loaded Sylvereye nodes list
for node in nodes_data:
    node['visibility'] = random.choice([True, False])

# nodes options setup
node_options = get_default_node_options()
node_options['visibility_method'] = NodeVisibilityMethod.CUSTOM

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

## Alpha

The *alpha* value controls the transparency of a node. It ranges from 0 to 1 and is inverse to transparency.

An alpha of 1.0 means 0% transparent (fully opaque). An alpha of 0.5 means 50% transparent (translucent). An alpha of 0 means fully transparent (invisible).

Unlike hidden nodes, nodes with an alpha of 0 are still interactive: clicks on their location still register.

### Alpha methods

There are three alpha methods for nodes: `NodeAlphaMethod.DEFAULT`, `NodeAlphaMethod.SCALE`, and `NodeAlphaMethod.CUSTOM`.

Use the `alpha_method` key of `node_options` to choose between them.

---

### `alpha_method` 

**Kind**: `node_options` dictionary key <br />
**Type**: `str`

Sets the alpha method for every node. Pass a value from the `NodeAlphaMethod` enum.

---

### Default alpha

Use the `NodeAlphaMethod.DEFAULT` alpha method to give every node the same alpha value.

:::note
The default node alpha is 1.0.
:::

The following example sets every node to the default alpha:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeAlphaMethod
from dash_sylvereye.defaults import get_default_node_options

# nodes options setup
node_options = get_default_node_options()
node_options['alpha_method'] = NodeAlphaMethod.DEFAULT

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

The following example sets every node's alpha to 0.5 by overriding the `alpha_default` key:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeAlphaMethod
from dash_sylvereye.defaults import get_default_node_options

# nodes options setup
node_options = get_default_node_options()
node_options['alpha_method'] = NodeAlphaMethod.DEFAULT
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

### `alpha_default` 

**Kind**: `node_options` dictionary key <br />
**Type**: `float`

Sets the default alpha value applied to every node. Must be a float between 0 and 1, inclusive. Use it with the `NodeAlphaMethod.DEFAULT` alpha method.

---

### Scaled alpha

Use the `NodeAlphaMethod.SCALE` alpha method to derive each node's alpha from a numeric data field.

Nodes with the largest value get an alpha of 1.0; nodes with the smallest value get an alpha of 0. Every other node falls on a linear interpolation between the two.

The following example assigns a random `weight` to every node and then scales each node's alpha by that weight using the `NodeAlphaMethod.SCALE` alpha method:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeAlphaMethod
from dash_sylvereye.defaults import get_default_node_options

# assign a random weight to every node in the 'weight' data property
# 'nodes_data' is a previously loaded Sylvereye nodes list
for node in nodes_data:
    node['data']['weight'] = random.random()

# nodes options setup
node_options = get_default_node_options()
node_options['alpha_method'] = NodeAlphaMethod.SCALE
node_options['alpha_scale_field'] = 'weight'

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

The name of the data field is arbitrary. Use the `alpha_scale_field` key of `node_options` to point at the field you want to scale by.

---

### `alpha_scale_field` 

**Kind**: `node_options` dictionary key <br />
**Type**: `str`

Names the node data field used to compute the scaled alpha. Use it with the `NodeAlphaMethod.SCALE` alpha method.

---

### Custom alpha

Use the `NodeAlphaMethod.CUSTOM` alpha method to read each node's alpha from its own `alpha` field. This lets you control the alpha of individual nodes by hand. The value of `alpha` must be a float between 0 and 1, inclusive.

The following example assigns a random alpha to every node and then renders with the `NodeAlphaMethod.CUSTOM` alpha method:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeAlphaMethod
from dash_sylvereye.defaults import get_default_node_options

# assign a random alpha to every node
# 'nodes_data' is a previously loaded Sylvereye nodes list
for node in nodes_data:
    node['alpha'] = random.random()

# nodes options setup
node_options = get_default_node_options()
node_options['alpha_method'] = NodeAlphaMethod.CUSTOM

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

## Color

Node colors are expressed as hex integers between `0x000000` and `0xffffff`, inclusive.

### Color methods

There are three color methods for nodes: `NodeColorMethod.DEFAULT`, `NodeColorMethod.SCALE`, and `NodeColorMethod.CUSTOM`.

Use the `color_method` key of `node_options` to choose between them.

---

### `color_method` 

**Kind**: `node_options` dictionary key <br />
**Type**: `str`

Sets the color method for every node. Pass a value from the `NodeColorMethod` enum.

---

### Default color

Use the `NodeColorMethod.DEFAULT` color method to give every node the same color.

:::note
The default node color is `0xa10000`.
:::

The following example resets every node to the default color:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeColorMethod
from dash_sylvereye.defaults import get_default_node_options

# nodes options setup
node_options = get_default_node_options()
node_options['color_method'] = NodeColorMethod.DEFAULT

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

The following example changes every node's color to `0xaad28c` by overriding the `color_default` key:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeColorMethod
from dash_sylvereye.defaults import get_default_node_options

# nodes options setup
node_options = get_default_node_options()
node_options['color_method'] = NodeColorMethod.DEFAULT
node_options['color_default'] = 0xaad28c

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

### `color_default` 

**Kind**: `node_options` dictionary key <br />
**Type**: `int`

Sets the default color value applied to every node. Must be a hex integer between `0x000000` and `0xffffff`, inclusive. Use it with the `NodeColorMethod.DEFAULT` color method.

---

### Scaled color

Use the `NodeColorMethod.SCALE` color method to derive each node's color from the numeric data field named by `color_scale_field`.

Nodes with the smallest value get `color_scale_left`; nodes with the largest get `color_scale_right`. Every other node gets a color interpolated between the two.

:::note
Color scales are computed with chroma.js on the client side.

See the [chroma.js website](https://gka.github.io/chroma.js/) for details on how the interpolation works.
:::

The following example assigns a random `weight` to every node and scales node colors across the `0xaad28c` to `0xa10000` range with the `NodeColorMethod.SCALE` color method:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeColorMethod
from dash_sylvereye.defaults import get_default_node_options

# assign a random weight to every node in the 'weight' data property
# 'nodes_data' is a previously loaded Sylvereye nodes list
for node in nodes_data:
    node['data']['weight'] = random.random()

# nodes options setup
node_options = get_default_node_options()
node_options['color_method'] = NodeColorMethod.SCALE
node_options['color_scale_field'] = 'weight'
node_options['color_scale_left'] = 0xaad28c
node_options['color_scale_right'] = 0xa10000

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

### `color_scale_field` 

**Kind**: `node_options` dictionary key <br />
**Type**: `str`

Names the node data field used to compute the scaled color. Use it with the `NodeColorMethod.SCALE` color method.

---

### `color_scale_left` 

**Kind**: `node_options` dictionary key <br />
**Type**: `int`

The "left" end of the color scale. Must be a hex integer between `0x000000` and `0xffffff`, inclusive. Use it with the `NodeColorMethod.SCALE` color method.

---

### `color_scale_right` 

**Kind**: `node_options` dictionary key <br />
**Type**: `int`

The "right" end of the color scale. Must be a hex integer between `0x000000` and `0xffffff`, inclusive. Use it with the `NodeColorMethod.SCALE` color method.

---

### Custom color

Use the `NodeColorMethod.CUSTOM` color method to read each node's color from its own `color` field. This lets you control the color of individual nodes by hand. The value of `color` must be a hex integer between `0x000000` and `0xffffff`, inclusive.

The following example assigns a random color to every node and then renders with the `NodeColorMethod.CUSTOM` color method:
 
```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeColorMethod
from dash_sylvereye.defaults import get_default_node_options

# assign a random color to every node
# 'nodes_data' is a previously loaded Sylvereye nodes list
for node in nodes_data:
    node['color'] = int('%02X%02X%02X' % (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)), base=16)

# nodes options setup
node_options = get_default_node_options()
node_options['color_method'] = NodeColorMethod.CUSTOM

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

## Size

A node's size is its diameter, expressed as 0 or a positive float.

### Size methods

There are three size methods for nodes: `NodeSizeMethod.DEFAULT`, `NodeSizeMethod.SCALE`, and `NodeSizeMethod.CUSTOM`.

Use the `size_method` key of `node_options` to choose between them.

---

### `size_method` 

**Kind**: `node_options` dictionary key <br />
**Type**: `str`

Sets the size method for every node. Pass a value from the `NodeSizeMethod` enum.

---

### Default size

Use the `NodeSizeMethod.DEFAULT` size method to give every node the same size.

:::note
The default node size is 0.005.
:::

The following example resets every node to the default size:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeSizeMethod
from dash_sylvereye.defaults import get_default_node_options

# nodes options setup
node_options = get_default_node_options()
node_options['size_method'] = NodeSizeMethod.DEFAULT

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

The following example changes every node's size to 0.010 by overriding the `size_default` key:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeSizeMethod
from dash_sylvereye.defaults import get_default_node_options

# nodes options setup
node_options = get_default_node_options()
node_options['size_method'] = NodeSizeMethod.DEFAULT
node_options['size_default'] = 0.010

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

### `size_default` 

**Kind**: `node_options` dictionary key <br />
**Type**: `float`

Sets the default size value applied to every node. Must be either 0 or a positive float. Use it with the `NodeSizeMethod.DEFAULT` size method.

---

### Scaled size

Use the `NodeSizeMethod.SCALE` size method to derive each node's size from the numeric data field named by `size_scale_field`.

Nodes with the smallest value get the smallest size; nodes with the largest value get the largest size. Every other node falls on a linear interpolation between the two.

:::note
The scaling formula is:
```javascript
size = 0.005 + 0.025 * normalizedWeight;
```
`normalizedWeight` is the node's data value normalized to the range `[0, 1]`. The minimum scaled size is therefore 0.005 and the maximum is 0.03.
:::

The following example assigns a random `weight` to every node, then activates `NodeSizeMethod.SCALE` with `weight` as the `size_scale_field`:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeSizeMethod
from dash_sylvereye.defaults import get_default_node_options

# assign a random weight to every node in the 'weight' data property
# 'nodes_data' is a previously loaded Sylvereye nodes list
for node in nodes_data:
    node['data']['weight'] = random.random()

# nodes options setup
node_options = get_default_node_options()
node_options['size_method'] = NodeSizeMethod.SCALE
node_options['size_scale_field'] = 'weight'

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

### `size_scale_field` 

**Kind**: `node_options` dictionary key <br />
**Type**: `str`

Names the node data field used to compute the scaled size. Use it with the `NodeSizeMethod.SCALE` size method.
 
---

### Custom size

Use the `NodeSizeMethod.CUSTOM` size method to read each node's size from its own `size` field. This lets you control the size of individual nodes by hand. The value of `size` must be either 0 or a positive float.

The following example assigns a random size to every node and then renders with the `NodeSizeMethod.CUSTOM` size method:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import NodeSizeMethod
from dash_sylvereye.defaults import get_default_node_options

# assign a random size to every node
# 'nodes_data' is a previously loaded Sylvereye nodes list
for node in nodes_data:
    node['size'] = random.random() / 10.0

# nodes options setup
node_options = get_default_node_options()
node_options['size_method'] = NodeSizeMethod.CUSTOM

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

