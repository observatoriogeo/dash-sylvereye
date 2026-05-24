---
id: overview
title: Overview
sidebar_label: What is Dash Sylvereye?
---

## What is Dash Sylvereye?

Dash Sylvereye is a [Plotly Dash](https://plotly.com/dash/) component library for producing interactive web-based visualizations of large primal [road networks](https://en.wikipedia.org/wiki/Street_network) in Python. 

By primal road networks we mean networks were edges represent roads/streets, and nodes represent road/street crossings or junctions.

The main elements of a Dash Sylvereye visualization are nodes, edges, and markers. Edges can have direction arrows, too. All of these elements are drawn through [WebGL](https://en.wikipedia.org/wiki/WebGL) on top of [tiled web maps](https://en.wikipedia.org/wiki/Tiled_web_map).

The goal of Dash Sylvereye is to allow users to smoothly render interactive road networks with dozens of thousands of nodes and edges, as well as dozens of thousands of interactive markers, in commodity systems such as mid-range laptops and workstations.

Thanks to its integration with Dash, the various elements of a Dash Sylvereye visualization can be updated at runtime by other Dash components in a Dash dashboard.

Dash Sylvereye visualizations are customizable, allowing for the programmatic manipulation of colors, sizes, alpha, and visibility of individual nodes, edges, and markers.

Markers can show custom popup messages when hovered over and the default marker icon can be replaced by custom SVG images on a marker-by-marker basis.

Nodes, edges, and markers are interactive. Dash Sylvereye supports for various callback properties allowing the programmer to define the behavior when the individual elements of a visualization are clicked.