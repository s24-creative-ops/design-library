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
5. Email-Module in der sichtbaren Design Library werden nicht per iframe gerendert, sondern als statisch eingebettete Fragmente aus `email-builder/preview/modules/`.
6. `design-library/frames/email/`, `frames/email/snippets/`, `frames/email/test-desktop/` und `frames/email/test-mobile/` sind keine aktive Quelle mehr fuer die sichtbare Email-Library.
7. Wenn ein sichtbares Email-Preview-Modul in `email-builder/preview/modules/` geaendert wird, muss die statische Einbettung in `design-library/index.html` mit aktualisiert und danach der Publish-Mirror neu synchronisiert werden.

## Publish-Mirror

Der GitHub-Publish-Stand fuer `s24-creative-ops/design-library` wird lokal nicht manuell gepflegt.

Stattdessen gilt:
- `../.publish/design-library-repo/` ist der lokale Publish-Mirror bzw. bevorzugte lokale Checkout des GitHub-Repos.
- Dieser Mirror wird aus den aktiven Projektquellen generiert.
- Die Mirror-Synchronisation laeuft ueber:
  `scripts/sync_design_library_publish.py`
- Die sichtbare Design-Library gilt nicht als live aktualisiert, nur weil Aenderungen im Hauptrepo committed oder gepusht wurden.

## Verbindliche Publish-Regel

Wenn eine Aenderung die sichtbare Design-Library betrifft, gilt verbindlich:
1. die aktive sichtbare Library-Quelle ist `design-library/index.html`
2. der Publish-Mirror liegt unter `../.publish/design-library-repo/`
3. der Mirror wird ueber `python3 design-system/scripts/sync_design_library_publish.py` synchronisiert
4. das separate Live-Repo ist `s24-creative-ops/design-library`
5. vor Abschluss muss Codex klar berichten, ob der Publish-Mirror synchronisiert wurde und ob das Live-Repo aktualisiert wurde
6. Codex darf das separate Publish-Repo nur nach ausdruecklicher User-Freigabe fuer Live-Publish aktualisieren
7. vor einem Live-Publish muss Codex pruefen, ob der Mirror-Worktree sauber ist oder nur erwartete Sync-Aenderungen enthaelt
8. wenn im Mirror fremde oder unklare Aenderungen liegen, ein Push blockiert wird oder ein PR-/Branch-Protection-Flow noetig ist, muss Codex stoppen und den offenen Publish-Schritt berichten
9. ein Design-Library-Fix gilt erst als vollstaendig abgeschlossen, wenn entweder
   - Quelle, Mirror und Live-Repo aktualisiert wurden, oder
   - Codex klar berichtet, dass der Live-Publish noch aussteht

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
6. wenn der Mirror ein Git-Checkout mit nutzbarem Remote ist und der User ausdruecklich Live-Publish freigegeben hat, den bestehenden Publish-Prozess ueber den Mirror-Checkout aktualisieren, optional ueber `bash design-system/scripts/publish_design_library.sh`
7. vor einem Live-Publish den Mirror-Worktree auf fremde oder unklare Aenderungen pruefen und nur bei sauberem oder erwartbarem Sync-Stand fortfahren
8. wenn kein nutzbarer Mirror-Checkout, kein klarer Push-Zugang, ein blockierter Push oder ein PR-/Branch-Protection-Flow vorliegt, stoppen und den fehlenden Publish-Schritt berichten
9. am Ende berichten, ob der Publish-Mirror synchron ist und ob ein GitHub-Update durchgefuehrt wurde oder warum nicht

## Grundsatz

Die GitHub-Library soll immer die echte Projekt-Library spiegeln.

Deshalb gilt:
- keine separate nachgebaute Publish-Library pflegen
- keine zweite manuelle Token-Struktur pflegen
- keine gesonderten Web-Sonderdateien als neue Wahrheit etablieren
- Aenderungen immer zuerst im Projekt, dann im Mirror
