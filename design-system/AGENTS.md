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
- die Design Library
- die Team-Vorschau ueber Email- und LP-Module hinweg

Dabei gilt:
- `design-library/` ist die echte sichtbare Library-Oberflaeche.
- `tokens/` ist die gemeinsame Token-Wahrheit.
- `design-system/` ist keine isolierte Parallelwelt, sondern haengt an den aktiven Builder-Quellen in `email-builder/` und `lp-builder/`.

## Aktive Wahrheit

Fuer die sichtbare Library gilt:
1. `design-library/index.html` ist die aktive Library-Oberflaeche.
2. `tokens/brands/immoscout24.json` ist die aktive Token-Wahrheit.
3. `email-builder/preview/`, `email-builder/email/`, `email-builder/agent/` liefern die relevanten Email-Quellen.
4. `lp-builder/preview/` und die aktiven LP-Core-Dateien liefern die relevanten LP-Quellen.

## Publish-Mirror

Der GitHub-Publish-Stand fuer `s24-creative-ops/design-library` wird lokal nicht manuell gepflegt.

Stattdessen gilt:
- `../.publish/design-library-repo/` ist der lokale Publish-Mirror bzw. bevorzugte lokale Checkout des GitHub-Repos.
- Dieser Mirror wird aus den aktiven Projektquellen generiert.
- Die Mirror-Synchronisation laeuft ueber:
  `scripts/sync_design_library_publish.py`

## Arbeitsregel fuer Codex

Wenn Tokens, Library-Dateien, Email-Quellen oder LP-Quellen geaendert werden, die fuer die sichtbare Library relevant sind:
1. erst die echte Projektquelle aktualisieren
2. dann die sichtbare Library in `design-library/` aktualisieren
3. danach den Publish-Mirror synchronisieren
4. danach den GitHub-Stand von `s24-creative-ops/design-library` aktualisieren, wenn ein Repo-Checkout oder Push-Zugang vorhanden ist

## Pflichtpfad fuer Library-relevante Aenderungen

Wenn eine Aenderung sichtbare Auswirkungen auf die Library haben kann:
1. `design-library/` pruefen und aktualisieren
2. `tokens/` pruefen und aktualisieren, falls Token betroffen sind
3. `email-builder/` oder `lp-builder/` pruefen und aktualisieren, falls Modulquellen betroffen sind
4. `python3 design-system/scripts/sync_design_library_publish.py` ausfuehren
5. den Mirror unter `../.publish/design-library-repo/` auf den neuen Stand pruefen
6. danach den GitHub-Stand aktualisieren

## Grundsatz

Die GitHub-Library soll immer die echte Projekt-Library spiegeln.

Deshalb gilt:
- keine separate nachgebaute Publish-Library pflegen
- keine zweite manuelle Token-Struktur pflegen
- keine gesonderten Web-Sonderdateien als neue Wahrheit etablieren
- Aenderungen immer zuerst im Projekt, dann im Mirror
