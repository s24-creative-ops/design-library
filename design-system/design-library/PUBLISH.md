# Design Library Publish

## Ziel

`s24-creative-ops/design-library` soll die offizielle Projekt-Library spiegeln und nicht als separat nachgebaute Web-Version gepflegt werden.

Die aktive sichtbare Quelle ist:

`design-system/design-library/index.html`

Die zentrale Token-Wahrheit bleibt:

`design-system/tokens/brands/immoscout24.json`

## Mirror-Ordner

Der lokale Publish-Mirror liegt standardmaessig unter:

`../.publish/design-library-repo/`

Am besten ist dieser Ordner ein lokaler Git-Checkout von:

`https://github.com/s24-creative-ops/design-library`

## Source-Sync vor Publish

Wenn Builder- oder Token-Quellen in die sichtbare Library einfliessen, zuerst die generierten Library-Artefakte aktualisieren:

```bash
python3 design-system/scripts/sync_design_library_sources.py
```

Nur pruefen:

```bash
python3 design-system/scripts/sync_design_library_sources.py --check
```

## Mirror-Sync

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

Der Mirror zieht die aktive Projektstruktur fuer die Library nach:

- `design-system/AGENTS.md`
- `design-system/design-library/`
- `design-system/tokens/`
- `design-system/scripts/`
- `email-builder/AGENTS.md`
- `email-builder/preview/`
- `email-builder/email/`
- `email-builder/agent/`

Zusätzlich erzeugt der Sync im Publish-Repo:

- `.nojekyll`
- `index.html` als Root-Redirect auf die offizielle Library
- `README.md` mit kurzer Mirror-Erklaerung

## LP-Hinweis

`lp-builder/` ist die aktive Quelle fuer LP-Module.

LP-Inhalte in `design-system/design-library/` werden aus `lp-builder/` ueber `python3 design-system/scripts/sync_lp_builder_to_design_library.py` in generierte LP-Artefakte ueberfuehrt.

Produktive LP-Interaktionen werden dabei nicht vollstaendig in die Preview uebernommen.
Preview-tauglich und offiziell freigegeben sind aktuell nur:
- `accordion`
- `counter-animated`
- `video--youtube`

`lp-sticky-footer` wird in der Preview statisch oder entschaerft gezeigt.
`lp-builder/runtime/integrations/*` sowie Legacy-Carousel-/jQuery-Logik bleiben ausserhalb der aktiven Library-Preview.

Die Library darf erst published werden, wenn sie visuell und inhaltlich final geprueft ist.
Ein Publish bleibt bis dahin blockiert und ist zusaetzlich nur nach ausdruecklichem User-Go erlaubt.

## Update-Regel

Wenn Tokens, Library-Dateien oder relevante Builder-Quellen geaendert werden:
1. echte Projektdateien aktualisieren
2. bei Bedarf `python3 design-system/scripts/sync_design_library_sources.py` ausfuehren
3. `python3 design-system/scripts/sync_design_library_publish.py` ausfuehren
4. pruefen, ob der Mirror-Worktree sauber ist oder nur erwartete Sync-Aenderungen enthaelt
5. den Mirror-Checkout nur nach ausdruecklicher User-Freigabe fuer Live-Publish committen und nach GitHub pushen

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
