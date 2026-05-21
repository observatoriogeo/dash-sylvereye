"""Regression test for the show_nodes/show_edges/show_arrows/show_markers
initial-value bug.

Each `useEffect` that toggles a PIXI container's `visible` flag previously
listed only `[show_*]` in its deps array, but its body guarded on the
container being non-null. On first mount the container is null, so the
effect's body was skipped; later renders never re-ran the effect, so
passing show_nodes=False (etc.) at startup was silently ignored.

This test loads example 05 (where the busiest nodes render as a vivid red,
0xd62828) twice: once with default props, once with show_nodes=False
applied to the layout before app.run(). The second case must produce
substantially fewer red pixels than the first.
"""
import base64
import os
import socket
import subprocess
import sys
import time
from io import BytesIO

import pytest

selenium = pytest.importorskip("selenium")
PIL = pytest.importorskip("PIL")

from PIL import Image
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
RED_NODE_RGB = (0xd6, 0x28, 0x28)


def _free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def _wait_for_http(url, timeout=45):
    deadline = time.time() + timeout
    import urllib.request
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=2) as r:
                if r.status == 200:
                    return
        except Exception:
            time.sleep(0.5)
    raise AssertionError(f"server at {url} never came up")


def _count_red_pixels(driver):
    img = Image.open(BytesIO(driver.get_screenshot_as_png())).convert("RGBA")
    px = img.load()
    w, h = img.size
    n = 0
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            r, g, b, a = px[x, y]
            if r > 180 and g < 80 and b < 80 and a > 200:
                n += 1
    return n


@pytest.fixture(scope="module")
def driver():
    opts = Options()
    opts.add_argument("--headless=new")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument("--window-size=1280,800")
    drv = webdriver.Chrome(options=opts)
    yield drv
    drv.quit()


def _run_and_count(driver, runner_script, port):
    proc = subprocess.Popen(
        [sys.executable, runner_script, str(port)],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    try:
        url = f"http://127.0.0.1:{port}/"
        _wait_for_http(url)
        driver.get(url)
        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".leaflet-container canvas"))
        )
        time.sleep(3)  # let PIXI paint
        return _count_red_pixels(driver)
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()


def test_show_nodes_false_at_startup_hides_nodes(driver, tmp_path):
    """Default example 05 renders red node sprites; the same app with
    show_nodes=False applied before app.run() must render zero red pixels
    (or at least an order of magnitude fewer)."""

    # 1) Baseline: default example 05 with show_nodes=True (default).
    default_runner = tmp_path / "run_default.py"
    default_runner.write_text(
        "import importlib.util, sys\n"
        f"spec = importlib.util.spec_from_file_location('_e', {os.path.join(ROOT, 'examples/05_CustomColors.py')!r})\n"
        "mod = importlib.util.module_from_spec(spec)\n"
        "spec.loader.exec_module(mod)\n"
        "mod.app.run(port=int(sys.argv[1]), debug=False)\n"
    )
    baseline_red = _run_and_count(driver, str(default_runner), _free_port())

    # 2) Same app, but flip show_nodes=False on the SylvereyeRoadNetwork
    #    child of the layout before app.run.
    hidden_runner = tmp_path / "run_hidden.py"
    hidden_runner.write_text(
        "import importlib.util, sys\n"
        f"spec = importlib.util.spec_from_file_location('_e', {os.path.join(ROOT, 'examples/05_CustomColors.py')!r})\n"
        "mod = importlib.util.module_from_spec(spec)\n"
        "spec.loader.exec_module(mod)\n"
        "mod.app.layout.children[0].show_nodes = False\n"
        "mod.app.run(port=int(sys.argv[1]), debug=False)\n"
    )
    hidden_red = _run_and_count(driver, str(hidden_runner), _free_port())

    assert baseline_red > 500, (
        f"Baseline produced only {baseline_red} red pixels — the test fixture "
        f"itself is broken (red nodes not rendering)."
    )
    assert hidden_red <= baseline_red // 20, (
        f"show_nodes=False at startup still rendered {hidden_red} red pixels "
        f"(baseline {baseline_red}). The visibility-effect deps-array bug is back."
    )
