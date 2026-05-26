---
id: build_instructions
title: Development
sidebar_label: Build instructions
---

## Build instructions

Dash Sylvereye uses [uv](https://docs.astral.sh/uv/) for Python dependency management. Make sure `uv` and Node.js (≥18.18) are installed before continuing.

Start by cloning the [GitHub repository](https://github.com/observatoriogeo/dash-sylvereye):

```bash
git clone https://github.com/observatoriogeo/dash-sylvereye.git
cd dash-sylvereye
```

Install the Python development dependencies. `uv sync --all-extras` creates a `.venv/`, installs `dash_sylvereye` in editable mode, and pulls in every optional-extras group declared in `pyproject.toml` (dev, examples, test):

```bash
uv sync --all-extras
```

Install the npm packages. The `--ignore-scripts` flag suppresses optional postinstall hooks that can fail on fresh clones:

```bash
npm install --ignore-scripts
```

Build the JS bundle and regenerate the Python wrapper. Either source the virtual environment first or wrap with `uv run` so that `dash-generate-components` is on `PATH`:

```bash
uv run -- npm run build
```

`npm run build` chains two stages: `build:js` produces the webpack bundle at `dash_sylvereye/dash_sylvereye.min.js`, and `build:backends` runs `dash-generate-components` to emit the Python, R, and Julia wrappers.

:::caution
The Python wrapper files under `dash_sylvereye/` (`SylvereyeRoadNetwork.py`, `_imports_.py`, `metadata.json`, `package-info.json`), the R wrapper `R/sylvereyeRoadNetwork.R`, and the Julia wrapper `src/jl/*` are **overwritten on each regeneration**. Edit `src/lib/components/SylvereyeRoadNetwork.react.js` instead, then re-run the build.
:::

Run the integration tests with:

```bash
uv run pytest tests/
```

Chrome must be installed and on `PATH` (the test suite drives a headless browser via Selenium).
