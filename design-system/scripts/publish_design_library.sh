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

WORKTREE_CLEAN=0
AHEAD_COUNT=0

if git -C "$TARGET_DIR" diff --quiet && git -C "$TARGET_DIR" diff --cached --quiet && [ -z "$(git -C "$TARGET_DIR" ls-files --others --exclude-standard)" ]; then
  WORKTREE_CLEAN=1
fi

if git -C "$TARGET_DIR" rev-parse --abbrev-ref '@{upstream}' >/dev/null 2>&1; then
  AHEAD_COUNT="$(git -C "$TARGET_DIR" rev-list --count '@{upstream}..HEAD')"
fi

if [ "$WORKTREE_CLEAN" -eq 1 ] && [ "$AHEAD_COUNT" -eq 0 ]; then
  echo ""
  echo "Keine Aenderungen zum Committen."
  exit 0
fi

if [ "$WORKTREE_CLEAN" -eq 0 ]; then
  git -C "$TARGET_DIR" add .
  git -C "$TARGET_DIR" commit -m "$COMMIT_MESSAGE"
else
  echo ""
  echo "Arbeitskopie ist sauber, aber es gibt noch lokale Commits zum Pushen."
fi

git -C "$TARGET_DIR" push origin main
