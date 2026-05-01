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
3. pruefen, ob der Mirror-Worktree sauber ist oder nur erwartete Sync-Aenderungen enthaelt
4. den Mirror-Checkout nur nach ausdruecklicher User-Freigabe fuer Live-Publish committen und nach GitHub pushen

## Verbindliche Agent-Regel

Fuer Codex gilt:
- die aktive sichtbare Design-Library-Quelle ist `design-system/design-library/index.html`
- der Publish-Mirror liegt unter `.publish/design-library-repo/`
- das separate Live-Repo ist `s24-creative-ops/design-library`
- Aenderungen an der sichtbaren Design-Library gelten nicht als live, nur weil sie im Hauptrepo committed oder gepusht wurden
- wenn eine Aenderung die sichtbare Design-Library betrifft, muss Codex vor Abschluss klar berichten, ob der Publish-Mirror synchronisiert wurde und ob das Live-Repo aktualisiert wurde
- Codex darf das separate Publish-Repo nur nach ausdruecklicher User-Freigabe fuer Live-Publish aktualisieren
- wenn im Mirror fremde oder unklare Aenderungen liegen, ein Push blockiert wird oder ein PR-/Branch-Protection-Flow noetig ist, muss Codex stoppen und berichten
- ein Design-Library-Fix gilt erst als vollstaendig abgeschlossen, wenn entweder Quelle, Mirror und Live-Repo aktualisiert wurden oder Codex klar berichtet, dass der Live-Publish noch aussteht
