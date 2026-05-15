# AGENTS.md

## Zweck

Diese Datei ist die zentrale Prozess- und Steuerdatei fuer `design-system/`.

Sie definiert:
- die aktive Rolle von Tokens und Design Library
- welche Projektteile fuer die sichtbare Library relevant sind
- wie der GitHub-Publish-Mirror aufgebaut ist
- wie Codex bei Aenderungen an Tokens, Modulen und Library-Dateien vorgeht

## Rolle von `design-system/`

`design-system/` ist die gemeinsame sichtbare Ebene fuer:
- Design-Tokens
- die offizielle Design Library
- die Team-Vorschau ueber Email-Module und die aus Builder-Quellen synchronisierten LP-Inhalte

Dabei gilt:
- `design-library/` ist die einzige aktive sichtbare Library-Oberflaeche.
- `tokens/` ist die gemeinsame Token-Wahrheit.
- `archive/design-library-legacy/` ist nur Archivmaterial und keine aktive Quelle.
- `design-system/` haengt aktuell an den aktiven Builder-Quellen in `email-builder/` und `lp-builder/`.
- `lp-builder/` ist die aktive Quelle fuer LP-Module.
- LP-Inhalte in der offiziellen Library werden ueber generierte LP-Artefakte aus `lp-builder/` gespeist.
- Die sichtbare Library bleibt bis zur finalen visuellen und inhaltlichen Pruefung ein nicht zu publishender Arbeitsstand.

## Aktive Wahrheit

Fuer die sichtbare Library gilt:
1. `design-library/index.html` ist die aktive Library-Oberflaeche.
2. `tokens/brands/immoscout24.json` ist die einzige zentrale Token-Wahrheit.
3. `email-builder/preview/`, `email-builder/email/` und `email-builder/agent/` liefern die relevanten Email-Quellen.
   Sichtbare E-Mail-Preview-Inhalte fuer die Library kommen primaer aus `email-builder/preview/modules/`.
4. `lp-builder/` ist die aktive Source of Truth fuer Landingpage-Module.
5. `design-library/content-data.js`, `design-library/lp-module-markup.js` und `design-library/lp-shadow-styles.js` sind generierte Library-Artefakte, nicht manuelle Primaerquellen.
6. Diese Artefakte werden aktualisiert ueber:
   `python3 design-system/scripts/sync_design_library_sources.py`
   sowie fuer LP-spezifische Artefakte ueber:
   `python3 design-system/scripts/sync_lp_builder_to_design_library.py`
7. Drift wird geprueft ueber:
   `python3 design-system/scripts/sync_design_library_sources.py --check`
   sowie fuer LP-Artefakte ueber:
   `python3 design-system/scripts/sync_lp_builder_to_design_library.py --check`
8. `archive/design-library-legacy/` und fruehere `frames/**`-Artefakte sind keine aktive Quelle mehr fuer die sichtbare Library.
9. LP-Artefakte in `design-library/` duerfen nur dann als aktuell gelten, wenn der LP-Sync erfolgreich gelaufen ist oder `python3 design-system/scripts/sync_lp_builder_to_design_library.py --check` sauber ist.
10. Produktive LP-Interaktionen werden nicht vollstaendig in die Preview uebernommen. Fuer die Library-Preview gilt eine explizite Preview-Whitelist:
   - `accordion`
   - `counter-animated`
   - `video--youtube`
11. `lp-sticky-footer` wird in der Preview statisch oder entschaerft gezeigt.
12. `lp-builder/runtime/integrations/*` sowie Legacy-Carousel-/jQuery-Logik aus `lp-builder/runtime/legacy/*` sind nicht Teil der aktiven Design-Library-Preview.

## Builder-Sync

Wenn relevante Quellen geaendert werden, gilt:
- Aenderungen an `tokens/brands/immoscout24.json` muessen in der offiziellen Library per Sync nachvollzogen werden.
- Aenderungen an `email-builder/preview/modules/`, `email-builder/agent/preview-styles.css` oder `email-builder/agent/service-products.json` muessen ueber `sync_design_library_sources.py` in die sichtbare Library nachgezogen werden.
- Aenderungen an `lp-builder/knowledge/component-library.html`, `lp-builder/knowledge/module-metadata.json` oder relevanten LP-Core-Styles muessen ueber `sync_lp_builder_to_design_library.py` in die sichtbare Library nachgezogen werden.
- Aenderungen an `lp-builder/runtime/core/core-interactions.js` fuehren nicht automatisch dazu, dass dieselbe Runtime in der Preview geladen werden darf.
- Produktionsnahe Integrationen aus `lp-builder/runtime/integrations/*` bleiben ausserhalb der Preview, sofern der User nicht ausdruecklich eine neue Preview-Policy freigibt.

## Publish-Mirror

Der GitHub-Publish-Stand fuer `s24-creative-ops/design-library` wird lokal nicht manuell gepflegt.

Stattdessen gilt:
- `../.publish/design-library-repo/` ist der lokale Publish-Mirror bzw. bevorzugte lokale Checkout des GitHub-Repos.
- Dieser Mirror ist kein Source of Truth.
- Die Mirror-Synchronisation laeuft ueber:
  `python3 design-system/scripts/sync_design_library_publish.py`
- Die sichtbare Design-Library gilt nicht als live aktualisiert, nur weil Aenderungen im Hauptrepo committed oder gepusht wurden.
- Ein Commit oder Push im Hauptrepo ist nicht dasselbe wie ein Design-Library-Publish.

## Verbindliche Publish-Regel

Wenn eine Aenderung die sichtbare Design-Library betrifft, gilt verbindlich:
1. die aktive sichtbare Library-Quelle ist `design-library/index.html`
2. der Publish-Mirror liegt unter `../.publish/design-library-repo/`
3. der Mirror wird ueber `python3 design-system/scripts/sync_design_library_publish.py` synchronisiert
4. das separate Live-Repo ist `s24-creative-ops/design-library`
5. vor Abschluss muss Codex klar berichten, ob der Publish-Mirror synchronisiert wurde und ob das Live-Repo aktualisiert wurde
6. Codex darf das separate Publish-Repo nur nach ausdruecklicher User-Freigabe fuer Live-Publish aktualisieren
7. Ein Live-Publish ist zusaetzlich blockiert, solange die sichtbare Library nicht visuell und inhaltlich final geprueft ist
8. vor einem Live-Publish muss Codex pruefen, ob der Mirror-Worktree sauber ist oder nur erwartete Sync-Aenderungen enthaelt
9. wenn im Mirror fremde oder unklare Aenderungen liegen, ein Push blockiert wird oder ein PR-/Branch-Protection-Flow noetig ist, muss Codex stoppen und den offenen Publish-Schritt berichten
10. ein Design-Library-Fix gilt erst als vollstaendig abgeschlossen, wenn entweder
   - Quelle, Mirror und Live-Repo aktualisiert wurden, oder
   - Codex klar berichtet, dass der Live-Publish noch aussteht

## Arbeitsregel fuer Codex

Wenn Tokens, Library-Dateien oder Email-Quellen geaendert werden, die fuer die sichtbare Library relevant sind:
1. erst die echte Projektquelle aktualisieren
2. dann die generierten Library-Artefakte in `design-library/` synchronisieren
3. danach den Publish-Mirror synchronisieren
4. danach den GitHub-Stand von `s24-creative-ops/design-library` aktualisieren, wenn ein Repo-Checkout oder Push-Zugang vorhanden ist und der User dies ausdruecklich freigibt

Fuer LP-bezogene Arbeit gilt zusaetzlich:
- `lp-builder/` ist die aktive LP-Quelle und speist die generierten LP-Artefakte der Design Library.
- Nicht jede produktive LP-Runtime ist automatisch preview-tauglich.
- Preview-Interaktionen duerfen nur explizit und Shadow-DOM-tauglich nachgebildet werden.
- Aenderungen an `lp-builder/` bleiben Design-Library-relevant, sind aber kein automatischer Publish-Anlass.

## Pflichtpfad fuer Library-relevante Aenderungen

Wenn eine Aenderung sichtbare Auswirkungen auf die Library haben kann:
1. `design-library/` pruefen und aktualisieren
2. `tokens/` pruefen und aktualisieren, falls Token betroffen sind
3. `email-builder/` pruefen und aktualisieren, falls Email-Quellen betroffen sind
4. `lp-builder/` pruefen und aktualisieren, falls LP-Quellen oder LP-Drift betroffen sind
5. `python3 design-system/scripts/sync_design_library_sources.py` oder `--check` ausfuehren, wenn generierte Library-Artefakte betroffen sind
6. `python3 design-system/scripts/sync_design_library_publish.py` ausfuehren, wenn der Mirror nachgezogen werden soll
7. den Mirror unter `../.publish/design-library-repo/` auf den neuen Stand pruefen
8. wenn der Mirror ein Git-Checkout mit nutzbarem Remote ist und der User ausdruecklich Live-Publish freigegeben hat, den bestehenden Publish-Prozess ueber den Mirror-Checkout aktualisieren, optional ueber `bash design-system/scripts/publish_design_library.sh`
9. vor einem Live-Publish den Mirror-Worktree auf fremde oder unklare Aenderungen pruefen und nur bei sauberem oder erwartbarem Sync-Stand fortfahren
10. wenn kein nutzbarer Mirror-Checkout, kein klarer Push-Zugang, ein blockierter Push oder ein PR-/Branch-Protection-Flow vorliegt, stoppen und den fehlenden Publish-Schritt berichten
11. am Ende berichten, ob der Publish-Mirror synchron ist und ob ein GitHub-Update durchgefuehrt wurde oder warum nicht

## Grundsatz

Die GitHub-Library soll immer die echte Projekt-Library spiegeln.

Deshalb gilt:
- keine separate nachgebaute Publish-Library pflegen
- `.publish/` niemals als Source of Truth behandeln
- keine zweite manuelle Token-Struktur pflegen
- Aenderungen immer zuerst im Projekt, dann im Mirror
