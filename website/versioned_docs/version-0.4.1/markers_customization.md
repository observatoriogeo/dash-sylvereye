---
id: markers_customization
title: API
sidebar_label: Marker options
---

## Marker options

Visual options for markers are set by populating the `marker_options` dictionary and passing it to the `SylvereyeRoadNetwork` component.

Fetch a pre-filled `marker_options` dictionary like this:

```python
from dash_sylvereye.defaults import get_default_marker_options

marker_options = get_default_marker_options()
```

Customize the returned `marker_options` as needed, then pass it to the `SylvereyeRoadNetwork` component.

Five visual features of a marker can be customized: **visibility**, **alpha**, **color**, **icon**, and **size**.

Each visual feature has a small set of *methods* associated with it.

For example, there are three marker color methods: `MarkerColorMethod.DEFAULT`, `MarkerColorMethod.SCALE`, and `MarkerColorMethod.CUSTOM`.

Say you want to set the color of all markers to the default color.

To do so, first import the color methods enum `MarkerColorMethod` and the `get_default_marker_options` function:

```python
from dash_sylvereye.enums import MarkerColorMethod
from dash_sylvereye.defaults import get_default_marker_options
```

Then, get a pre-filled `marker_options` dictionary and use the `color_method` key to set the corresponding color method:

```python
marker_options = get_default_marker_options()
marker_options['color_method'] = MarkerColorMethod.DEFAULT
```

Finally, pass the `marker_options` dictionary to the `SylvereyeRoadNetwork` component:

```python
# 'app' is the Dash app object
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...
                         marker_options=marker_options,
                         ...
                        )
])
```

Each visibility/alpha/color/size/icon method can have a different number of parameters which are also set in the `marker_options` dictionary, as documented in the following sections.

## Visibility

The 'visibility' feature of a marker allows you to hide it. No interaction is possible with a non-visible marker, i.e. users cannot click hidden markers. 

### Visibility methods

There are two visibility methods for markers: `MarkerVisibilityMethod.ALWAYS` and `MarkerVisibilityMethod.CUSTOM`.

Use the `visibility_method` key of the `marker_options` dictionary to set the visibility method.

---

### `visibility_method` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `str`

Sets the visibility method for all markers. Pass a value from the `MarkerVisibilityMethod` enum.

---

### 'Always' visibility

The `MarkerVisibilityMethod.ALWAYS` visibility method renders every markers visible.

Example:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerVisibilityMethod
from dash_sylvereye.defaults import get_default_marker_options

# markers options setup
marker_options = get_default_marker_options()
marker_options['visibility_method'] = MarkerVisibilityMethod.ALWAYS

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

### Custom visibility

The `MarkerVisibilityMethod.CUSTOM` visibility method allows you to define the visibility of each marker, individually. 

To make a marker visible, set the `visibility` key of the marker to `True`. To hide it, set it to `False`.

The following example hides markers at random:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerVisibilityMethod
from dash_sylvereye.defaults import get_default_marker_options

# assign a random visibility to every marker
# 'markers_data' is a previously loaded Sylvereye markers list
for marker in markers_data:
    marker['visibility'] = random.choice([True, False])

# markers options setup
marker_options = get_default_marker_options()
marker_options['visibility_method'] = MarkerVisibilityMethod.CUSTOM

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

## Alpha

Alpha refers to the transparency of markers. The alpha value ranges from 0 to 1. It is inversely proportional to the transparency. 

An alpha of 1.0 (100%) denotes a transparency of 0% (fully visible). An alpha of 0.5 (50%) denotes a transparency of 50% (translucent). An alpha of 0 (0%) denotes a transparency of 100% (fully hidden).

Unlike visibility, markers with an alpha of 0 are interactive, i.e. users can still click them.

### Alpha methods

There are three alpha methods for markers: `MarkerAlphaMethod.DEFAULT`, `MarkerAlphaMethod.SCALE`, and `MarkerAlphaMethod.CUSTOM`. 

Use the `alpha_method` key of the `marker_options` dictionary to set the alpha method.

---

### `alpha_method` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `str`

Sets the alpha method for all markers. Pass a value from the `MarkerAlphaMethod` enum.  

---

### Default alpha

Use the `MarkerAlphaMethod.DEFAULT` alpha method to set the alpha of all markers to the same alpha value. 

:::note
The default marker alpha is 1.0.
:::

The following example sets the alpha of all markers to the default one:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerAlphaMethod
from dash_sylvereye.defaults import get_default_marker_options

# markers options setup
marker_options = get_default_marker_options()
marker_options['alpha_method'] = MarkerAlphaMethod.DEFAULT

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

The following example sets the alpha of all markers to 0.5 by updating the `alpha_default` key of the `marker_options` dictionary:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerAlphaMethod
from dash_sylvereye.defaults import get_default_marker_options

# markers options setup
marker_options = get_default_marker_options()
marker_options['alpha_method'] = MarkerAlphaMethod.DEFAULT
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

### `alpha_default` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `float`

Sets the default alpha value of all markers. It must be a float value between 0 and 1, inclusive. Use it with the `MarkerAlphaMethod.DEFAULT` marker alpha method.

---

### Scaled alpha

Use the `MarkerAlphaMethod.SCALE` alpha method to automatically set the alpha of all markers in proportion to a numeric marker data field. 

Markers with the largest data value will be assigned an alpha of 1.0, whereas markers with the smallest data value will be assigned an alpha of 0. The rest of the markers will be assigned a proportional alpha value.

The following example sets a random value to the `weight` data field of all markers. Then, it sets the alpha of markers in proportion to the marker `weight` field with the `MarkerAlphaMethod.SCALE` alpha method:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerAlphaMethod
from dash_sylvereye.defaults import get_default_marker_options

# assign a random weight to every marker in the 'weight' data property
# 'markers_data' is a previously loaded Sylvereye markers list
for marker in markers_data:
    marker['data']['weight'] = random.random()

# markers options setup
marker_options = get_default_marker_options()
marker_options['alpha_method'] = MarkerAlphaMethod.SCALE
marker_options['alpha_scale_field'] = 'weight'

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

Note in the example that the name of the marker data field can be arbitrary. Use the `alpha_scale_field` key of the `marker_options` dictionary to indicate the name of the marker data field.

---

### `alpha_scale_field` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `str`

Sets the name of the marker data field for calculating the scaled alpha of markers. Use it with the `MarkerAlphaMethod.SCALE` marker alpha method.

---

### Custom alpha

Use the `MarkerAlphaMethod.CUSTOM` marker alpha method to set the alpha of markers to the `alpha` marker field. This allows you to manually manipulate the alpha of individual markers. `alpha` must be a float value between 0 and 1, inclusive.

The following example assigns a random value to the `alpha` field of all markers. Then, it sets the alpha of all markers to that field with the `MarkerAlphaMethod.CUSTOM` marker alpha method:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerAlphaMethod
from dash_sylvereye.defaults import get_default_marker_options

# assign a random alpha to every marker
# 'markers_data' is a previously loaded Sylvereye markers list
for marker in markers_data:
    marker['alpha'] = random.random()

# markers options setup
marker_options = get_default_marker_options()
marker_options['alpha_method'] = MarkerAlphaMethod.CUSTOM

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

## Color

Marker colors are expressed as hex integers between `0x000000` and `0xffffff`, inclusive.

:::caution
The `DEFAULT`, `SCALE`, and `CUSTOM` color methods all work by **tinting** the marker icon. They assume the source SVG is **white**; tinting a non-white icon produces a blend of the tint with the icon's native colors.

If your icon is multi-color (or any non-white color), use [`MarkerColorMethod.ORIGINAL`](#original-color) instead, which renders the SVG without tinting.
:::

### Color methods

There are four color methods for markers: `MarkerColorMethod.DEFAULT`, `MarkerColorMethod.SCALE`, `MarkerColorMethod.CUSTOM`, and `MarkerColorMethod.ORIGINAL`.

Use the `color_method` key of the `marker_options` dictionary to set the color method.

---

### `color_method` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `str`

Sets the color method for all markers. Pass a value from the `MarkerColorMethod` enum.  

---

### Default color

Use the `MarkerColorMethod.DEFAULT` marker color method to set every markers the same color.

:::note
The default marker color is `0x066cc`.
:::

The following example resets the color of all markers to the default color.

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerColorMethod
from dash_sylvereye.defaults import get_default_marker_options

# markers options setup
marker_options = get_default_marker_options()
marker_options['color_method'] = MarkerColorMethod.DEFAULT

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

The following example changes the color of all markers to `0xaad28c` by updating the `color_default` key of the `marker_options` dictionary:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerColorMethod
from dash_sylvereye.defaults import get_default_marker_options

# markers options setup
marker_options = get_default_marker_options()
marker_options['color_method'] = MarkerColorMethod.DEFAULT
marker_options['color_default'] = 0xaad28c

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

### `color_default` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `int`

Sets the default color value of all markers. Must be a hex integer between `0x000000` and `0xffffff`, inclusive. Use it with the `MarkerColorMethod.DEFAULT` marker color method.

---

### Scaled color

Use the `MarkerColorMethod.SCALE` marker color method to automatically scale the color of all markers to the numeric marker data field `color_scale_field`. 

Markers with the smallest data value will be assigned the color `color_scale_left`, whereas markers with the largest data value will be assigned the color `color_scale_right`. The rest of the markers will be assigned a scaled color between `color_scale_left` and `color_scale_right`, inclusive.

:::note
Color scales are computed with chroma.js on the client side.

Visit [chroma.js website](https://gka.github.io/chroma.js/) for more details on how color scales are computed.
:::

The following example sets the `weight` data field of all markers with a random value. Then, it sets the color of markers scaled by `weight` according to the color scale `0xaad28c`-`0xa10000` with the `MarkerColorMethod.SCALE` alpha method:

Example:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerColorMethod
from dash_sylvereye.defaults import get_default_marker_options

# assign a random weight to every marker in the 'weight' data property
# 'markers_data' is a previously loaded Sylvereye markers list
for marker in markers_data:
    marker['data']['weight'] = random.random()

# markers options setup
marker_options = get_default_marker_options()
marker_options['color_method'] = MarkerColorMethod.SCALE
marker_options['color_scale_field'] = 'weight'
marker_options['color_scale_left'] = 0xaad28c
marker_options['color_scale_right'] = 0xa10000

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

### `color_scale_field` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `str`

Sets the name of the marker data field to use to compute the scaled color. Use it with the `MarkerColorMethod.SCALE` marker color method. 

---

### `color_scale_left` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `int`

Sets the 'left end' of the color scale. Must be a hex integer between `0x000000` and `0xffffff`, inclusive. Use it with the `MarkerColorMethod.SCALE` marker color method.

---

### `color_scale_right` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `int`

Sets the 'right end' of the color scale. Must be a hex integer between `0x000000` and `0xffffff`, inclusive. Use it with the `MarkerColorMethod.SCALE` marker color method.

---

### Custom color

Use the `MarkerColorMethod.CUSTOM` marker color method to set the color of markers to the `color` marker field. This allows you to manually manipulate the color of individual markers. `color` must be a hex integer between `0x000000` and `0xffffff`, inclusive.

The following example assigns a random color to the `color` field of all markers. Then, it sets the color of all markers to that field with the `MarkerColorMethod.CUSTOM` marker color method:
 
```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerColorMethod
from dash_sylvereye.defaults import get_default_marker_options

# assign a random color to every marker
# 'markers_data' is a previously loaded Sylvereye markers list
for marker in markers_data:
    marker['color'] = int('%02X%02X%02X' % (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)), base=16)

# markers options setup
marker_options = get_default_marker_options()
marker_options['color_method'] = MarkerColorMethod.CUSTOM

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

### Original color

Use the `MarkerColorMethod.ORIGINAL` color method to **disable tinting entirely** and render every marker with the colors baked into its SVG icon. This is the only color method that preserves multi-color SVG icons faithfully; the other three methods overlay a single tint on top of the icon (which works correctly only when the source icon is white).

:::tip
Use `MarkerColorMethod.ORIGINAL` when you ship a custom SVG that already encodes its own colors (a logo, a multi-color glyph, a photograph rendered as SVG). Combine it with `MarkerIconMethod.CUSTOM` and a per-marker `icon_image` to render arbitrary visuals at each marker location.
:::

The following example renders custom SVGs at their native colors:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerColorMethod, MarkerIconMethod
from dash_sylvereye.defaults import get_default_marker_options

marker_options = get_default_marker_options()
marker_options['color_method'] = MarkerColorMethod.ORIGINAL
marker_options['icon_method'] = MarkerIconMethod.CUSTOM

# 'markers_data' must include 'icon_id' and 'icon_image' on each marker;
# the SVG payload in 'icon_image' will be drawn as-is.
app.layout = Div([
    SylvereyeRoadNetwork(
                         ...
                         marker_options=marker_options,
                         markers_data=markers_data,
                         ...
                        )
])
```

## Icon

You can use the default marker icon provided with Dash Sylvereye or you can provide your own icon. Currently, the only supported image format for marker icons is SVG.

### Icon methods

There are 2 icon methods for markers: `MarkerIconMethod.DEFAULT` and `MarkerIconMethod.CUSTOM`.

Use the `icon_method` key of the `marker_options` dictionary to set the icon method.

---

### `icon_method` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `str`

Sets the icon method for all markers. Pass a value from the `MarkerIconMethod` enum.

---

### Default icon

Use the `MarkerIconMethod.DEFAULT` marker icon method to use the default marker icon. 

:::note
The default marker icon resembles a standard map blue marker.
:::

Example:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerIconMethod
from dash_sylvereye.defaults import get_default_marker_options

# markers options setup
marker_options = get_default_marker_options()
marker_options['icon_method'] = MarkerIconMethod.DEFAULT

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

### Custom icon

The `MarkerIconMethod.CUSTOM` marker icon method allows you to set your own marker icon for each marker, individually. 

The marker must be in SVG format and has to be set in the `icon_image` field of each marker. Note that you need to dump the whole text content of the SVG image into the `icon_image` field. 

Also, note that you need to specify an ID for the custom marker via the `icon_id` marker field.

You can have as many custom marker icons as individual markers. Each different marker icon has to be associated with a unique ID.

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerIconMethod
from dash_sylvereye.defaults import get_default_marker_options

# 'markers_data' is a previously loaded Sylvereye markers list.
for marker in markers_data:    
    # set the custom icon for this marker    
    marker['icon_id'] = 'custom_icon'
    marker['icon_image'] = open('custom_icon.svg', 'r+').read()
    
# markers options setup
marker_options = get_default_marker_options()
marker_options['icon_method'] = MarkerIconMethod.CUSTOM

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

### Icon tooltip

You can set a custom tooltip text for each marker, which will be displayed when the mouse hovers the markers. 

To do so, set the `enable_tooltips` key of the `marker_options` dictionary to `True` and provide the tooltip text of each marker in the `tooltip` marker field. 

Example:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerIconMethod
from dash_sylvereye.defaults import get_default_marker_options

# 'markers_data' is a previously loaded Sylvereye markers list.
for i, marker in enumerate(markers_data):    
    # set the tooltip text for this marker
    marker['tooltip'] = f'Tooltip for marker {i}'

# markers options setup
marker_options = get_default_marker_options()
marker_options['icon_method'] = MarkerIconMethod.DEFAULT
marker_options['enable_tooltips'] = True
    
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

### `enable_tooltips` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `bool`

If set to `True`, shows a tooltip on top of each marker when the mouse hovers on. The tooltip of each marker text will be taken from its `tooltip` marker field. Use it with any marker icon method.

---

## Size

A marker's size is their diameter. The size of a marker is expressed as a positive float number or 0.

### Size methods

There are three size methods for markers: `MarkerSizeMethod.DEFAULT`, `MarkerSizeMethod.SCALE`, and `MarkerSizeMethod.CUSTOM`. 

Use the `size_method` key of the `marker_options` dictionary to set the size method.

---

### `size_method` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `str`

Sets the size method for all markers. Pass a value from the `MarkerSizeMethod` enum.  

---

### Default size

Use the `MarkerSizeMethod.DEFAULT` marker size method to set every markers the same size.

:::note
The default marker size is 0.25.
:::

The following example resets the size of all markers to the default size:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerSizeMethod
from dash_sylvereye.defaults import get_default_marker_options

# markers options setup
marker_options = get_default_marker_options()
marker_options['size_method'] = MarkerSizeMethod.DEFAULT

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

The following example changes the size of all markers to 0.010 by updating the `size_default` key of the `marker_options` dictionary:

```python
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerSizeMethod
from dash_sylvereye.defaults import get_default_marker_options

# markers options setup
marker_options = get_default_marker_options()
marker_options['size_method'] = MarkerSizeMethod.DEFAULT
marker_options['size_default'] = 0.010

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

### `size_default` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `float`

Sets the default size value of all markers. It must be positive float value or 0. Use it with the `MarkerSizeMethod.DEFAULT` marker color method.

---

### Scaled size

Use the `MarkerSizeMethod.SCALE` marker size method to automatically scale the size of all markers to the numeric marker data field `size_scale_field`. 

Markers with the smallest data value will be assigned the smallest size, whereas markers with the largest data value will be assigned the largest size. The rest of the markers will be assigned a scaled size in between.

Depending on the used icon, you may want to adjust the minimum possible size and bound the maximum possible size. You can configure these values via `size_scale_min` and `size_scale_max`.

If you are using the default marker icon via the `MarkerIconMethod.DEFAULT` method, the values for `size_scale_min` and `size_scale_max` will be taken from the `marker_options` dictionary, so you don't have to worry about them. 

:::note
The default `size_scale_min` in the `marker_options` dictionary is 0.25, and the default `size_scale_max` is 0.5.
:::
 

In contrast, if you are using a custom marker icon via the `MarkerIconMethod.CUSTOM` method, then you have to provide `size_scale_min` and `size_scale_max` as markers fields. 

---

### `size_scale_min` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `str`

Sets the minimum marker size for the default marker icon. Use it with the `MarkerSizeMethod.SCALE` marker size method and the `MarkerIconMethod.DEFAULT` marker icon method.  
 
---

### `size_scale_max` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `str`

Bounds the maximum marker size for the default marker icon. Use it with the `MarkerSizeMethod.SCALE` marker size method and the `MarkerIconMethod.DEFAULT` marker icon method.  
 
---

:::note
The scaling formula is:
```javascript
marker_size = size_scale_min + size_scale_max * normalizedWeight;
```
`normalizedWeight` is the marker's data value normalized to the range `[0, 1]`. The minimum scaled size is therefore `size_scale_min` and the maximum is `size_scale_min + size_scale_max`.
:::
 
The following example uses the default marker icon, and sets a random value to the `weight` data field of all markers. Then, it sets the size method to `MarkerSizeMethod.SCALE` and sets `weight` as the `size_scale_field`. 

Note that `size_scale_min` and `size_scale_max` will be automatically taken from `marker_options`:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerIconMethod, MarkerSizeMethod
from dash_sylvereye.defaults import get_default_marker_options

# assign a random weight to every marker in the 'weight' data property
# 'markers_data' is a previously loaded Sylvereye markers list
for marker in markers_data:
    marker['data']['weight'] = random.random()

# markers options setup
marker_options = get_default_marker_options()
marker_options['icon_method'] = MarkerIconMethod.DEFAULT
marker_options['size_method'] = MarkerSizeMethod.SCALE
marker_options['size_scale_field'] = 'weight'

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


The following example uses a custom marker icon, and sets the `weight` data field of all markers with a random value. Then, it sets the size of markers scaled by `weight`. 

Note that you have to provide your own `size_scale_min` and `size_scale_max` for each marker:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerIconMethod, MarkerSizeMethod
from dash_sylvereye.defaults import get_default_marker_options

# assign a random weight to every marker in the 'weight' data property
# 'markers_data' is a previously loaded Sylvereye markers list
for marker in markers_data:
    marker['data']['weight'] = random.random()    

    # set the custom icon for this marker
    # you have to provide 'size_scale_min' and 'size_scale_max'
    marker['icon_id'] = 'custom_icon'
    marker['icon_image'] = open('custom_icon.svg', 'r+').read()
    marker['size_scale_min'] = 0.25
    marker['size_scale_max'] = 0.5

# markers options setup
marker_options = get_default_marker_options()
marker_options['icon_method'] = MarkerIconMethod.CUSTOM
marker_options['size_method'] = MarkerSizeMethod.SCALE
marker_options['size_scale_field'] = 'weight'

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

### `size_scale_field` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `str`

Sets the name of the marker data field to use to compute the scaled size. Use it with the `MarkerSizeMethod.SCALE` marker size method.  
 
---

### Custom size

Use the `MarkerSizeMethod.CUSTOM` size color method to set the size of markers to the `size` marker field. This allows you to manually manipulate the size of individual markers. `size` must be a positive float number or 0.

The following example assigns a random size to the `size` field of all markers. Then, it sets the size of all markers to that field with the `MarkerSizeMethod.CUSTOM` marker size method:

```python
import random
from dash_html_components import Div
from dash_sylvereye import SylvereyeRoadNetwork
from dash_sylvereye.enums import MarkerSizeMethod
from dash_sylvereye.defaults import get_default_marker_options

# assign a random size to every marker
# 'markers_data' is a previously loaded Sylvereye markers list
for marker in markers_data:
    marker['size'] = random.random() / 10.0

# markers options setup
marker_options = get_default_marker_options()
marker_options['size_method'] = MarkerSizeMethod.CUSTOM

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

### Icon zoom scaling

By default, the size of icons is static and is not adjusted with the zoom of the map. This might make the markers difficult to spot when zooming out the map.

To instruct the `SylvereyeRoadNetwork` component to automatically adjust the size of markers when changing the map zoom level, set to `True` the `enable_zoom_scaling` key of the `marker_options` dictionary. By default it is set to `False`.

---

### `enable_zoom_scaling` 

**Kind**: `marker_options` dictionary key <br />
**Type**: `str`

If set to `True`, automatically adjusts the size of markers when changing the map zoom level. Use it with any marker size method.

---


