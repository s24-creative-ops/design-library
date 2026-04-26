#!/usr/bin/env python3

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_OUTPUT = PROJECT_ROOT / ".publish" / "design-library-repo"
IGNORED_NAMES = {".DS_Store", "Thumbs.db"}

MANAGED_PATHS = [
    ("design-system", PROJECT_ROOT / "design-system"),
    ("email-builder/AGENTS.md", PROJECT_ROOT / "email-builder" / "AGENTS.md"),
    ("email-builder/preview", PROJECT_ROOT / "email-builder" / "preview"),
    ("email-builder/email", PROJECT_ROOT / "email-builder" / "email"),
    ("email-builder/agent", PROJECT_ROOT / "email-builder" / "agent"),
    ("lp-builder/AGENTS.md", PROJECT_ROOT / "lp-builder" / "AGENTS.md"),
    ("lp-builder/preview", PROJECT_ROOT / "lp-builder" / "preview"),
    ("lp-builder/component-library.html", PROJECT_ROOT / "lp-builder" / "component-library.html"),
    ("lp-builder/core-foundations.css", PROJECT_ROOT / "lp-builder" / "core-foundations.css"),
    ("lp-builder/core-buttons.css", PROJECT_ROOT / "lp-builder" / "core-buttons.css"),
    ("lp-builder/core-components.css", PROJECT_ROOT / "lp-builder" / "core-components.css"),
    ("lp-builder/core-interactions.js", PROJECT_ROOT / "lp-builder" / "core-interactions.js"),
]

ROOT_FILES = {
    ".nojekyll": "",
    "index.html": """<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Design Library</title>
  <meta http-equiv="refresh" content="0; url=./design-system/design-library/index.html" />
  <script>window.location.replace('./design-system/design-library/index.html' + window.location.hash);</script>
</head>
<body>
  <p>Weiterleitung zur <a href="./design-system/design-library/index.html">Design Library</a>.</p>
</body>
</html>
""",
    "README.md": """# Design Library Mirror

Dieses Repository ist der Publish-Mirror der aktiven Projekt-Library unter `GPT Agents/`.

Source of Truth:
- `design-system/`
- `email-builder/`
- `lp-builder/`

Der Mirror wird lokal aus dem Projekt synchronisiert ueber:

```bash
python3 design-system/scripts/sync_design_library_publish.py
```

Wichtig:
- keine separate nachgebaute Web-Version pflegen
- Aenderungen immer zuerst im Projekt vornehmen
- danach den Mirror synchronisieren und erst dann nach GitHub pushen
""",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Synchronisiert den Publish-Mirror fuer s24-creative-ops/design-library."
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT,
        help=f"Zielordner fuer den Publish-Mirror. Standard: {DEFAULT_OUTPUT}",
    )
    return parser.parse_args()


def ensure_safe_output(output_dir: Path) -> None:
    resolved_output = output_dir.resolve()
    source_roots = [
        (PROJECT_ROOT / "design-system").resolve(),
        (PROJECT_ROOT / "email-builder").resolve(),
        (PROJECT_ROOT / "lp-builder").resolve(),
    ]
    for source_root in source_roots:
        if resolved_output == source_root or resolved_output.is_relative_to(source_root):
            raise SystemExit(
                f"Unsicherer Output-Pfad: {resolved_output} liegt innerhalb von {source_root}. "
                "Bitte einen Mirror-Ordner ausserhalb der Quellordner verwenden."
            )


def remove_path(path: Path) -> None:
    if not path.exists():
        return
    if path.is_dir():
        shutil.rmtree(path)
    else:
        path.unlink()


def copy_directory(source: Path, target: Path) -> None:
    def ignore(_dir: str, names: list[str]) -> set[str]:
        return {name for name in names if name in IGNORED_NAMES}

    shutil.copytree(source, target, ignore=ignore)


def remove_ignored_files(path: Path) -> None:
    if path.is_file():
        return
    for ignored_name in IGNORED_NAMES:
        for ignored_path in path.rglob(ignored_name):
            ignored_path.unlink()


def copy_managed_paths(output_dir: Path) -> list[str]:
    copied = []
    for rel_target, source in MANAGED_PATHS:
        if not source.exists():
            raise SystemExit(f"Fehlende Quelle: {source}")
        target = output_dir / rel_target
        remove_path(target)
        target.parent.mkdir(parents=True, exist_ok=True)
        if source.is_dir():
            copy_directory(source, target)
            remove_ignored_files(target)
        else:
            shutil.copy2(source, target)
        copied.append(rel_target)
    return copied


def write_root_files(output_dir: Path) -> list[str]:
    written = []
    for rel_target, content in ROOT_FILES.items():
        target = output_dir / rel_target
        remove_path(target)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
        written.append(rel_target)
    return written


def main() -> None:
    args = parse_args()
    output_dir = args.output.expanduser()

    ensure_safe_output(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    copied = copy_managed_paths(output_dir)
    written = write_root_files(output_dir)

    print("Design Library Publish-Mirror synchronisiert.")
    print(f"Quelle: {PROJECT_ROOT}")
    print(f"Ziel:   {output_dir.resolve()}")
    print("")
    print("Nachgezogene Pfade:")
    for item in copied:
        print(f"- {item}")
    for item in written:
        print(f"- {item}")
    print("")
    if (output_dir / ".git").exists():
        print("Git-Checkout erkannt. Naechste sinnvolle Schritte:")
        print(f"- cd {output_dir.resolve()}")
        print("- git status")
        print("- git add .")
        print("- git commit -m \"Sync design library mirror\"")
        print("- git push")
    else:
        print("Hinweis: Im Zielordner wurde kein .git-Checkout gefunden.")
        print("Wenn dies das GitHub-Repo werden soll, am besten zuerst dort klonen und dann den Sync erneut ausfuehren.")


if __name__ == "__main__":
    main()
