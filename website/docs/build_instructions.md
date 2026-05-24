---
id: build_instructions
title: Development
sidebar_label: Build instructions
---

## Build instructions

Start by cloning Dash Sylvereye's [GitHub repository](https://github.com/albertogarob/dash-sylvereye):

```bash
git clone https://github.com/albertogarob/dash-sylvereye.git
cd dash-sylvereye
```

Next, create a virtual environment and install the Python dependencies:

```bash
python -m venv venv && . venv/bin/activate
pip install -r requirements-dev.txt
pip install -r requirements-test.txt
```

Finally, install packages via npm (ignore errors) and run the build script,

```bash
npm i --ignore-scripts 
npm run build:all
```

 