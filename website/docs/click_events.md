---
id: click_events
title: Reference
sidebar_label: Callback properties
---

# Callback properties

Nodes, edges, and markers are interactive in a `SylvereyeRoadNetwork` component. When you click any of these elements, `SylvereyeRoadNetwork` updates the value of a callback property.

The `SylvereyeRoadNetwork` component provides support for three callback properties: `clicked_node`, `clicked_edge`, and `clicked_marker`.

You can listen to changes to any of these callback properties in order to trigger a callback function that, for instance, updates the properties of a `SylvereyeRoadNetwork` component or any other Dash component at runtime.

## Callback properties

## `clicked_node`

**Kind**: `SylvereyeRoadNetwork` component callback property. <br />
**Type**: `dict`

Listen to `clicked_node` to trigger a callback that defines the behavior when the user clicks on a node.

`clicked_node` will contain a deep copy of the clicked node's data under the `data` key. The following is an example of the content of `clicked_node`:

```python
{'data': {'_i': 9560,
          'alpha': 1,
          'color': 10551296,
          'data': {'highway': None,
                   'osmid': 3015359332,
                   'x': -100.4082449,
                   'y': 20.5537155},
          'lat': 20.5537155,
          'lon': -100.4082449,
          'size': 0.005,
          'visible': True},
 'index': 9560}
```

>**Note**
>
>The data available in `clicked_node['data']['data']` will depend on the data available in the source Dash Sylvereye `nodes_data` list.
>
>If you used the `load_from_osmnx_graph` or the `load_from_osmnx_graphml` functions to load the road network, please refer to [this page](data_loading) to see the possible data keys in `clicked_node['data']['data']`.

The following example from [this example application](example2) will print the coordinates of the clicked node:

```python
@app.callback(
    Output('h3-clicked-node-coords', 'children'),
    [Input('sylvereye-roadnet', 'clicked_node')])
def update_node_data(clicked_node): 
    if clicked_node:   
        return f'Clicked node coords: {clicked_node["data"]["lat"]}, \
                                  {clicked_node["data"]["lon"]}'
```
 
## `clicked_edge`

**Kind**: `SylvereyeRoadNetwork` component callback property. <br />
**Type**: `dict`

Listen to `clicked_edge` to trigger a callback that defines the behavior when the user clicks on an edge.

`clicked_edge` will contain a deep copy of the clicked edge's data under the `data` key. The following is an example of the content of `clicked_edge`:

```python
{'data': {'alpha': 1,
          'color': 26262,
          'coords': [[20.5491204, -100.3705049], [20.5504062, -100.3692541]],
          'data': {'access': None,
                   'bridge': None,
                   'geometry': None,
                   'highway': 'residential',
                   'id': None,
                   'junction': None,
                   'lanes': None,
                   'length': '193.397',
                   'maxspeed': None,
                   'name': 'Calle Bosques de Chapultepec',
                   'oneway': 'False',
                   'osmid': 372268480,
                   'ref': None,
                   'service': None,
                   'source_osmid': '3758222160',
                   'target_osmid': '3758222180'},
          'visible': True,
          'width': 0.25},
 'index': 41472}
```

>**Note**
>
>The data available in `clicked_edge['data']['data']` will depend on the data available in the source Dash Sylvereye `edges_data` list.
>
>If you used the `load_from_osmnx_graph` or the `load_from_osmnx_graphml` functions to load the road network, please refer to [this page](data_loading) to see the possible data keys in `clicked_edge['data']['data']`.

The following example from [this example application](example2) will print the coordinate pairs that integrate the clicked edge:

```python
@app.callback(
    Output('h3-clicked-edge-coords', 'children'),
    [Input('sylvereye-roadnet', 'clicked_edge')])
def update_edge_data(clicked_edge):  
    if clicked_edge:  
        return f'Clicked edge coords: {clicked_edge["data"]["coords"]}'
```

## `clicked_marker`

**Kind**: `SylvereyeRoadNetwork` component callback property. <br />
**Type**: `dict`

Listen to `clicked_marker` to trigger a callback that defines the behavior when the user clicks on a marker.

`clicked_marker` will contain a deep copy of the clicked marker's data under the `marker` field. The following is an example of the content of `clicked_marker`:

```python
{'index': 96,
 'marker': {'_i': 96,
            'alpha': 1,
            'color': 26316,
            'data': {},
            'icon_id': 'custom_marker',
            'icon_image': '',
            'lat': 20.556441,
            'lon': -100.4080412,
            'size': 0.25,
            'size_scale_max': 0.25,
            'size_scale_min': 0.25,
            'tooltip': '',
            'visible': True}}
```

The following example from [this example application](example4) will print the coordinates of the clicked marker:

```python
@app.callback(
    Output('h3-clicked-marker-coords', 'children'),
    [Input('sylvereye-roadnet', 'clicked_marker')])
def update_marker_data(clicked_marker):  
    if clicked_marker:          
        return f'Clicked marker coords: {[ clicked_marker["marker"]["lat"], clicked_marker["marker"]["lon"] ]}'
```

>**Note**
>
>The data available in `clicked_edge['marker']['data']` will depend on the data available in the source Dash Sylvereye `markers_data` list.

## Updating the road network at runtime

Thanks to Dash’s architecture, any of the `SylvereyeRoadNetwork` component properties, including the road network’s node, edge, and marker lists, can be updated to change the visualized road network at runtime.

For example, if you want to replace the road network with a new one, you only need to create a callback having as outputs the `nodes_data` and `edges_data` component properties:

```python
@app.callback(
    [Output('sylvereye-roadnet', 'nodes_data'), Output('sylvereye-roadnet', 'edges_data')],
    [Input( ... )])
def update_roadnet_data(input):      
    if input:
        # code to update 'nodes_data' and 'edges_data' by using 'input' goes here
        # return the updated 'nodes_data' and 'edges_data'
        return nodes_data, edges_data
```
