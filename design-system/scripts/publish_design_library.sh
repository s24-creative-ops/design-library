#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TARGET_DIR="${1:-$PROJECT_ROOT/.publish/design-library-repo}"
COMMIT_MESSAGE="${2:-Sync design library mirror}"

python3 "$PROJECT_ROOT/design-system/scripts/sync_design_library_publish.py" --output "$TARGET_DIR"

if [ ! -d "$TARGET_DIR/.git" ]; then
  echo ""
  echo "Kein Git-Checkout im Zielordner gefunden: $TARGET_DIR"
  echo "Bitte das Repo dort klonen und den Befehl erneut ausfuehren."
  exit 0
fi

git -C "$TARGET_DIR" status --short

if git -C "$TARGET_DIR" diff --quiet && git -C "$TARGET_DIR" diff --cached --quiet && [ -z "$(git -C "$TARGET_DIR" ls-files --others --exclude-standard)" ]; then
  echo ""
  echo "Keine Aenderungen zum Committen."
  exit 0
fi

git -C "$TARGET_DIR" add .
git -C "$TARGET_DIR" commit -m "$COMMIT_MESSAGE"
git -C "$TARGET_DIR" push origin main
