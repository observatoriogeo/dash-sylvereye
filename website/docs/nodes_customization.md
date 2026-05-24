---
id: nodes_customization
title: API
sidebar_label: Node options
---

## Node options

The visual options of nodes are set by filling the `node_options` dictionary and then passing it to the `SylvereyeRoadNetwork` component.

You can get a `node_options` dictionary pre-filled with default settings as follows:

```python
from dash_sylvereye.defaults import get_default_node_options

node_options = get_default_node_options()
```

Then, you can customize `node_options` as desired before passing it to the `SylvereyeRoadNetwork` component.

The following visual node features can be customized: **visibility**, **alpha**, **color**, and **size**.

Each visual feature has a number of methods associated. 

For example, the are 3 node color methods: `NodeColorMethod.DEFAULT`, `NodeColorMethod.SCALE`, and `NodeColorMethod.CUSTOM`. 

Say you want to set the color of all nodes to the default color.

To do so, first import the color methods enum `NodeColorMethod` and the `get_default_node_options` function:

```python
from dash_sylvereye.enums import NodeColorMethod
from dash_sylvereye.defaults import get_default_node_options
```

Then, get a pre-filled `node_options` dictionary and use the `color_method` key to set the corresponding color method:

```python
node_options = get_default_node_options()
node_options['color_method'] = NodeColorMethod.DEFAULT
```

Finally, pass the `node_options` dictionary to the `SylvereyeRoadNetwork` component:

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

Each visibility/alpha/color/size method can have a different number of parameters which are also set in the `node_options` dictionary, as documented in the following sections.

## Visibility

The 'visibility' feature of a node allows you to hide it. No interaction is possible with a non-visible node, i.e. users cannot click hidden nodes. 

### Visibility methods

There are 2 visibility methods for nodes: `NodeVisibilityMethod.ALWAYS` and `NodeVisibilityMethod.CUSTOM`.

Use the `visibility_method` key of the `node_options` dictionary to set the visibility method.

---

### `visibility_method` 

**Kind**: `node_options` dictionary key <br />
**Type**: `str`

Sets the visibility method for all nodes. Use the `NodeVisibilityMethod` enum to set the method.

---

### 'Always' visibility

The `NodeVisibilityMethod.ALWAYS` visibility method makes all nodes to be visible.

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

The `NodeVisibilityMethod.CUSTOM` visibility method allows you to define the visibility of each node, individually. 

To make a node visible, set the `visibility` key of the node to `True`. To hide it, set it to `False`.

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

Alpha refers to the transparency of nodes. The alpha value ranges from 0 to 1. It is inversely proportional to the transparency. 

An alpha of 1.0 (100%) denotes a transparency of 0% (fully visible). An alpha of 0.5 (50%) denotes a transparency of 50% (translucent). An alpha of 0 (0%) denotes a transparency of 100% (fully hidden).

Unlike visibility, nodes with an alpha of 0 are interactive, i.e. users can still click them.

### Alpha methods

There are 3 alpha methods for nodes: `NodeAlphaMethod.DEFAULT`, `NodeAlphaMethod.SCALE`, and `NodeAlphaMethod.CUSTOM`. 

Use the `alpha_method` key of the `node_options` dictionary to set the alpha method.

---

### `alpha_method` 

**Kind**: `node_options` dictionary key <br />
**Type**: `str`

Sets the alpha method for all nodes. Use the `NodeAlphaMethod` enum to set the method.  

---

### Default alpha

Use the `NodeAlphaMethod.DEFAULT` alpha method to set the alpha of all nodes to the same alpha value. 

>**Note**
>
>The default node alpha is 1.0.

The following example sets the alpha of all nodes to the default one:

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

The following example sets the alpha of all nodes to 0.5 by updating the `alpha_default` key of the `node_options` dictionary:

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

Sets the default alpha value of all nodes. It must be a float value between 0 and 1 (inclusive). Use it with the `NodeAlphaMethod.DEFAULT` node alpha method.

---

### Scaled alpha

Use the `NodeAlphaMethod.SCALE` alpha method to automatically set the alpha of all nodes in proportion to a numeric node data field. 

Nodes with the largest data value will be assigned an alpha of 1.0, whereas nodes with the smallest data value will be assigned an alpha of 0. The rest of the nodes will be assigned a proportional alpha value.

The following example sets a random value to the `weight` data field of all nodes. Then, it sets the alpha of nodes in proportion to the node `weight` field by using the `NodeAlphaMethod.SCALE` alpha method:

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

Note in the example that the name of the node data field can be arbitrary. Use the `alpha_scale_field` key of the `node_options` dictionary to indicate the name of the node data field.

---

### `alpha_scale_field` 

**Kind**: `node_options` dictionary key <br />
**Type**: `str`

Sets the name of the node data field for calculating the scaled alpha of nodes. Use it with the `NodeAlphaMethod.SCALE` node alpha method.

---

### Custom alpha

Use the `NodeAlphaMethod.CUSTOM` node alpha method to set the alpha of nodes to the `alpha` node field. This allows you to manually manipulate the alpha of individual nodes. `alpha` must be a float value between 0 and 1 (inclusive).

The following example assigns a random value to the `alpha` field of all nodes. Then, it sets the alpha of all nodes to that field by using the `NodeAlphaMethod.CUSTOM` node alpha method:

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

You can manipulate the color of nodes. Color values are expressed as hex integers between `0x000000` and `0xffffff` (inclusive).

### Color methods

There are 3 color methods for nodes: `NodeColorMethod.DEFAULT`, `NodeColorMethod.SCALE`, and `NodeColorMethod.CUSTOM`. 

Use the `color_method` key of the `node_options` dictionary to set the color method.

---

### `color_method` 

**Kind**: `node_options` dictionary key <br />
**Type**: `str`

Sets the color method for all nodes. Use the `NodeColorMethod` enum to set the method.  

---

### Default color

Use the `NodeColorMethod.DEFAULT` node color method to set the same color to all nodes.

>**Note**
>
>The default node color is `0xa10000`.

The following example resets the color of all nodes to the default color.

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

The following example changes the color of all nodes to `0xaad28c` by updating the `color_default` key of the `node_options` dictionary:

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

Sets the default color value of all nodes. It must be an hex integer between `0x000000` and `0xffffff` (inclusive). Use it with the `NodeColorMethod.DEFAULT` node color method.

---

### Scaled color

Use the `NodeColorMethod.SCALE` node color method to automatically scale the color of all nodes to the numeric node data field `color_scale_field`. 

Nodes with the smallest data value will be assigned the color `color_scale_left`, whereas nodes with the largest data value will be assigned the color `color_scale_right`. The rest of the nodes will be assigned a scaled color between `color_scale_left` and `color_scale_right` (inclusive).

>**Note**
>
>Color scales are computed with chroma.js on the client side.
>
>Visit [chroma.js website](https://gka.github.io/chroma.js/) for more details on how color scales are computed.

The following example sets the `weight` data field of all nodes with a random value. Then, it sets the color of nodes scaled by `weight` according to the color scale `0xaad28c`-`0xa10000` by using the `NodeColorMethod.SCALE` alpha method:

Example:

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

Sets the name of the node data field to use to compute the scaled color. Use it with the `NodeColorMethod.SCALE` node color method. 

---

### `color_scale_left` 

**Kind**: `node_options` dictionary key <br />
**Type**: `int`

Sets the 'left end' of the color scale. It must be an hex integer between `0x000000` and `0xffffff` (inclusive). Use it with the `NodeColorMethod.SCALE` node color method.

---

### `color_scale_right` 

**Kind**: `node_options` dictionary key <br />
**Type**: `int`

Sets the 'right end' of the color scale. It must be an hex integer between `0x000000` and `0xffffff` (inclusive). Use it with the `NodeColorMethod.SCALE` node color method.

---

### Custom color

Use the `NodeColorMethod.CUSTOM` node color method to set the color of nodes to the `color` node field. This allows you to manually manipulate the color of individual nodes. `color` must be an hex integer between `0x000000` and `0xffffff` (inclusive).

The following example assigns a random color to the `color` field of all nodes. Then, it sets the color of all nodes to that field by using the `NodeColorMethod.CUSTOM` node color method:
 
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

The size of nodes refer to their diameter. The size of a node is expressed as a positive float number or 0.

### Size methods

There are 3 size methods for nodes: `NodeSizeMethod.DEFAULT`, `NodeSizeMethod.SCALE`, and `NodeSizeMethod.CUSTOM`. 

Use the `size_method` key of the `node_options` dictionary to set the size method.

---

### `size_method` 

**Kind**: `node_options` dictionary key <br />
**Type**: `str`

Sets the size method for all nodes. Use the `NodeSizeMethod` enum to set the method.  

---

### Default size

Use the `NodeSizeMethod.DEFAULT` node size method to set the same size to all nodes.

>**Note**
>
>The default node size is 0.005.

The following example resets the size of all nodes to the default size:

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

The following example changes the size of all nodes to 0.010 by updating the `size_default` key of the `node_options` dictionary:

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

Sets the default size value of all nodes. It must be positive float value or 0. Use it with the `NodeSizeMethod.DEFAULT` node color method.

---

### Scaled size

Use the `NodeSizeMethod.SCALE` node size method to automatically scale the size of all nodes to the numeric node data field `size_scale_field`. 

Nodes with the smallest data value will be assigned the smallest size, whereas nodes with the largest data value will be assigned the largest size. The rest of the nodes will be assigned a scaled size in between.

>**Note**
>
>The formula for scaling the size of a node is the following:
>```javascript
>size = 0.005 + 0.025 * normalizedWeight;
>```
>where `normalizedWeight` is the normalized node data value (a value between 0 and 1 (inclusive)). The formula above implies that the minimum size possible is 0.005 and the maximum size possible is 0.03.
 
The following example sets a random value to the `weight` data field of all nodes. Then, it sets the size method to `NodeSizeMethod.SCALE` and sets `weight` as the `size_scale_field`:

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

Sets the name of the node data field to use to compute the scaled size. Use it with the `NodeSizeMethod.SCALE` node size method.  
 
---

### Custom size

Use the `NodeSizeMethod.CUSTOM` size color method to set the size of nodes to the `size` node field. This allows you to manually manipulate the size of individual nodes. `size` must be a positive float number or 0.

The following example assigns a random size to the `size` field of all nodes. Then, it sets the size of all nodes to that field by using the `NodeSizeMethod.CUSTOM` node size method:

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

