---
id: running_examples
title: Examples
sidebar_label: Running the examples
---

## Running the examples

Start by cloning this repository:

```bash
git clone https://github.com/observatoriogeo/dash-sylvereye.git
cd dash-sylvereye/examples
```

Next, create a virtual environment and install the Python dependencies:

```bash
python -m venv venv && . venv/bin/activate
pip install -r requirements-examples.txt
```

Finally, try to run a simple example:

```bash
cd examples
python 01_BasicVisualization.py
```

If you visit http://127.0.0.1:8050/ in your browser, you should see a Dash Sylvereye visualization.

 