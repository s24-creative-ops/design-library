# Module Rules

## Grundsatz

`preview/modules/*.html` ist die aktive LP-Modul-Ebene.

Jedes Modul liegt als eigene, iframe-faehige Datei vor und wird spaeter in `design-system/design-library/` sichtbar geladen.

## Modulstruktur

- Die Modulstruktur soll sich am aktuell importierten LP Builder orientieren.
- Bestehende Wrapper, Grid-Strukturen und Modulklassen nur dann aendern, wenn es fachlich wirklich noetig ist.
- Gemeinsame Stil- und Interaktionslogik gehoert weiterhin in die LP-Core-Dateien, nicht dupliziert in jede Moduldatei.

## Frame-Logik

- Jedes Modul bindet dieselben gemeinsamen LP-Core-Dateien ein:
  - `core-foundations.css`
  - `core-buttons.css`
  - `core-components.css`
  - `core-interactions.js`
- Gemeinsame iframe-Hilfen liegen in:
  - `preview/frame-base.css`
  - `preview/frame-bridge.js`

## Placeholder

- Placeholder sollen projektweit einheitlich sein.
- Leere LP-Media-Flaechen werden ueber `preview/frame-base.css` neutral dargestellt.
- Platzhalterdarstellung nicht pro Modul frei erfinden.

## Kategorien im aktiven Katalog

- `heros`
- `teaser`
- `steps`
- `accordion`
- `counter`
- `callouts`
- `benefits`
- `reviews`
- `service-tiles`
- `checkmark-list`
- `sticky-footer`
- `content-cards`
- `action-tiles`
- `video`

## Aktueller Stand

- Die Module wurden aus `component-library.html` in Einzeldateien ueberfuehrt.
- Die Token-Zuordnung wird in einem spaeteren Schritt nachgezogen.
- Solange diese Zuordnung noch fehlt, bleiben gemeinsame visuelle Regeln in den LP-Core-Dateien verankert.
