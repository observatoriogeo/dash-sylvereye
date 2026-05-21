"""Integration tests: each example must boot, serve, and render a PIXI canvas
inside the leaflet container with no SEVERE browser console errors."""
import os
import socket
import subprocess
import sys
import time
import urllib.request

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
RUNNER = os.path.join(ROOT, "tests", "_run_example.py")

EXAMPLES = [
    "examples/01_BasicVisualization.py",
    "examples/02_BasicInteractivity.py",
    "examples/03_BasicCustomization.py",
    "examples/04_AddingMarkers.py",
    "usage.py",
]


def _free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def _wait_for_http(url, timeout=45):
    deadline = time.time() + timeout
    last_err = None
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=2) as r:
                if r.status == 200:
                    return True
        except Exception as e:
            last_err = e
            time.sleep(0.5)
    raise AssertionError(f"server at {url} never came up: {last_err!r}")


@pytest.fixture(scope="module")
def driver():
    opts = Options()
    opts.add_argument("--headless=new")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument("--window-size=1280,800")
    opts.set_capability("goog:loggingPrefs", {"browser": "ALL"})
    drv = webdriver.Chrome(options=opts)
    yield drv
    drv.quit()


@pytest.mark.parametrize("script", EXAMPLES)
def test_example_renders(driver, script):
    port = _free_port()
    abs_script = os.path.join(ROOT, script)
    proc = subprocess.Popen(
        [sys.executable, RUNNER, abs_script, str(port)],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    try:
        url = f"http://127.0.0.1:{port}/"
        try:
            _wait_for_http(url)
        except AssertionError:
            # Surface subprocess stderr to make CI failures debuggable.
            proc.terminate()
            out, err = proc.communicate(timeout=5)
            raise AssertionError(
                f"{script}: server never came up\nstdout:\n{out.decode(errors='replace')}\n"
                f"stderr:\n{err.decode(errors='replace')}"
            )

        driver.get(url)
        wait = WebDriverWait(driver, 30)
        wait.until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, ".leaflet-container canvas")
            )
        )
        time.sleep(2)  # let PIXI finish the first paint

        logs = driver.get_log("browser")
        severe = [l for l in logs if l["level"] == "SEVERE"]
        # Filter out tile-server 4xx/5xx — those are external infra noise.
        severe = [
            l for l in severe
            if "basemaps.cartocdn.com" not in l.get("message", "")
            and "tile.openstreetmap.org" not in l.get("message", "")
        ]
        assert not severe, f"{script}: JS console errors: {severe}"
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
