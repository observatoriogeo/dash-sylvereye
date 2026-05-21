"""Launch an example Dash app on a configurable port for integration tests.

Usage: python tests/_run_example.py <path/to/example.py> <port>

Imports the example module by file path (so we don't depend on filenames
being valid Python identifiers) and invokes app.run(port=PORT, debug=False).
"""
import importlib.util
import sys


def main():
    if len(sys.argv) != 3:
        print("usage: python tests/_run_example.py <script.py> <port>", file=sys.stderr)
        sys.exit(2)
    script_path = sys.argv[1]
    port = int(sys.argv[2])
    spec = importlib.util.spec_from_file_location("_example_under_test", script_path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    mod.app.run(port=port, debug=False)


if __name__ == "__main__":
    main()
