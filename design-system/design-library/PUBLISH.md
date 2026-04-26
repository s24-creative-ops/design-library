# Design Library Publish

## Ziel

`s24-creative-ops/design-library` soll die echte Projekt-Library spiegeln und nicht als separat nachgebaute Web-Version gepflegt werden.

## Mirror-Ordner

Der lokale Publish-Mirror liegt standardmaessig unter:

`../.publish/design-library-repo/`

Am besten ist dieser Ordner ein lokaler Git-Checkout von:

`https://github.com/s24-creative-ops/design-library`

## Sync-Befehl

Aus dem Projekt-Root:

```bash
python3 design-system/scripts/sync_design_library_publish.py
```

Optional mit eigenem Zielordner:

```bash
python3 design-system/scripts/sync_design_library_publish.py --output /pfad/zum/design-library-checkout
```

Direkt synchronisieren, committen und pushen:

```bash
bash design-system/scripts/publish_design_library.sh
```

## Was gespiegelt wird

Der Sync zieht die aktive Projektstruktur fuer die Library nach:

- `design-system/`
- `email-builder/AGENTS.md`
- `email-builder/preview/`
- `email-builder/email/`
- `email-builder/agent/`
- `lp-builder/AGENTS.md`
- `lp-builder/preview/`
- `lp-builder/component-library.html`
- `lp-builder/core-foundations.css`
- `lp-builder/core-buttons.css`
- `lp-builder/core-components.css`
- `lp-builder/core-interactions.js`

Zusätzlich erzeugt der Sync im Publish-Repo:

- `.nojekyll`
- `index.html` als Root-Redirect auf die Library
- `README.md` mit kurzer Mirror-Erklaerung

## Update-Regel

Wenn Tokens, Library-Dateien oder Modulquellen geaendert werden:
1. echte Projektdateien aktualisieren
2. `python3 design-system/scripts/sync_design_library_publish.py` ausfuehren
3. den Mirror-Checkout committen und nach GitHub pushen
