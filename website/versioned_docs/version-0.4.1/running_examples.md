---
id: running_examples
title: Examples
sidebar_label: Running the examples
---

## Running the examples

The examples are Python scripts under the `examples/` directory of the repository. They depend on [`osmnx`](https://github.com/gboeing/osmnx) and `numpy`, both bundled in the `examples` extras group of `pyproject.toml`.

Start by cloning the repository and installing the dependencies with [uv](https://docs.astral.sh/uv/):

```bash
git clone https://github.com/observatoriogeo/dash-sylvereye.git
cd dash-sylvereye
uv sync --extra examples
```

Run an example with `uv run`:

```bash
uv run python examples/01_BasicVisualization.py
```

Open `http://127.0.0.1:8050/` in your browser and you should see a Dash Sylvereye visualization.

:::tip
A pre-cached OSMnx road network for Kamppi, Helsinki ships at `examples/cache/kamppi.graphml`. The examples load this fixture when present, so the first run works offline. Without it, the examples fall back to `ox.graph_from_place()` and cache the result for next time.
:::
