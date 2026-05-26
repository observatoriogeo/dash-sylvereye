---
id: overview
title: Overview
sidebar_label: What is Dash Sylvereye?
---

## What is Dash Sylvereye?

Dash Sylvereye is a [Plotly Dash](https://plotly.com/dash/) component library for producing interactive, web-based visualizations of large primal [road networks](https://en.wikipedia.org/wiki/Street_network) in Python.

A *primal* road network is one whose edges represent roads or streets, and whose nodes represent the crossings or junctions where those roads meet.

The main elements of a Dash Sylvereye visualization are nodes, edges, and markers. Edges can optionally show direction arrows. All of these elements are drawn with [WebGL](https://en.wikipedia.org/wiki/WebGL) on top of [tiled web maps](https://en.wikipedia.org/wiki/Tiled_web_map).

The goal of Dash Sylvereye is to render interactive road networks with tens of thousands of nodes, edges, and markers smoothly on commodity hardware, such as mid-range laptops and workstations.

Thanks to its integration with Dash, every element of a Dash Sylvereye visualization can be updated at runtime by other components inside a Dash dashboard.

Visualizations are highly customizable: colors, sizes, opacity, and visibility can be manipulated programmatically for each individual node, edge, and marker.

Markers can display custom popup messages on hover, and the default marker icon can be replaced with a custom SVG on a per-marker basis.

Nodes, edges, and markers are interactive. Dash Sylvereye exposes callback properties that let the programmer define what happens when an individual element of a visualization is clicked.