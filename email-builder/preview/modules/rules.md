# Module Rules

## Grundsatz

`preview/modules/` ist nicht die Review-Flaeche fuer neue oder geaenderte Arbeit.

Fuer die Pruefung werden stattdessen zwei ueberschreibbare Review-Dateien genutzt:

- `development/review/preview-index.html`
- `development/review/email-index.html`

Diese beiden Dateien sind reine Test-Artefakte:

- sie duerfen jederzeit ueberschrieben werden
- sie sind nie fachliche Quelle
- sie ersetzen keine produktiven Modul-, Template- oder Exportdateien

Fachliche Quellen bleiben:

- `preview/modules/*`
- `email/modules/*`
- `agent/template-*.preview.html`
- `agent/template-*.definition.json`
- `email/templates/*.html`
- `agent/export-map.json`
- `AGENTS.md`

## Review-Regeln

- `development/review/preview-index.html` nutzt den echten Preview-CSS-Kontext aus `agent/preview-styles.css`.
- `development/review/email-index.html` nutzt den CSS-/Shell-Kontext aus `email/templates/template-main.html`.
- Jede Review-Datei zeigt nur das aktuell bearbeitete Modul oder Template.
- Bei Modul-Arbeit nutzen beide Review-Dateien fest dieses Testgeruest:
  1. `logo`
  2. `hero-image-top`
  3. aktuelles neues oder geaendertes Modul
  4. `footer`
- `logo`, `hero-image-top` und `footer` dienen dabei nur als stabiler Testkontext.
- Wenn das aktuell bearbeitete Modul selbst `logo`, `hero-image-top` oder `footer` ist, darf keine doppelte Instanz entstehen; stattdessen ist eine sinnvolle Minimal-Testmail zu bauen und kurz zu berichten.
- Diese feste Reihenfolge gilt nur fuer Modul-Arbeit. Template-Arbeit nutzt weiterhin die tatsaechlich gewuenschte oder definierte Template-Reihenfolge.
- Review-Dateien duerfen sichtbaren Beispielcontent tragen.
- Demo-Texte und Demo-Bilder sind in Review-Dateien erlaubt, aber erfundene Styles, Farben, Spacings, CTA-Farben oder Modul-Defaults sind verboten.
- Review-Defaults muessen aus bestehenden EMB-Quellen kommen, insbesondere aus `agent/export-map.json`, produktiven Preview-Modulen, produktiven E-Mail-Modulen, `email/templates/template-main.html` und `agent/preview-styles.css`.
- Wenn ein benoetigter Default nicht eindeutig aus diesen Quellen ableitbar ist, muss Codex stoppen und berichten, statt einen Wert zu erfinden.
- Review-Dateien sind Pruefflaechen und keine 1:1-Quellartefakte fuer produktive Dateien.
- Der Ablauf ist immer: fachlichen Entwurf bauen oder aendern, Review-Dateien aktualisieren, User-Freigabe abwarten, erst danach produktive Integration abschliessen.

## Produktive Integration

- `preview/modules/` ist Ziel der freigegebenen produktiven Integration.
- Produktive Preview- und E-Mail-Dateien werden direkt in ihren fachlichen Zielpfaden bearbeitet.
- Eine produktive Integration darf erst nach ausdruecklicher User-Freigabe des aktuellen Review-Stands starten.
- Ohne ausdrueckliche User-Freigabe duerfen auch zentrale Anschlussdateien wie `preview/modules/catalog.yaml`, `agent/preview-module-library.md`, `agent/builder-library.md` oder `agent/export-map.json` nicht abschliessend nachgezogen werden.
- Die sichtbare Gestaltung und Struktur duerfen bei der produktiven Integration nicht frei neu interpretiert werden.
- Erlaubt sind nur notwendige produktive Transformationen wie:
  - finale Variablen einsetzen
  - Render-Anbindung herstellen
  - Export-Mapping anpassen
  - produktiv relevantes CSS an den korrekten Zielort uebernehmen

## Modulstruktur

- Bestehende Modulstruktur nicht frei umbauen, wenn ein vorhandenes Muster reicht.
- Keine neuen Wrapper, Spalten oder Layoutlogiken erfinden, nur um einen Wunsch passend zu machen.
- Wenn ein Wunsch die Struktur bricht, ist entweder ein anderes Modul oder eine neue klar benannte Modulvariante noetig.

## Pflichtmodule

- Jede Mail enthaelt genau ein Logo, genau ein Hero und genau ein Footer-Modul.
- Logo steht immer an Position `1`.
- Hero steht immer an Position `2`.
- Footer steht immer am Ende.
- Pflichtmodule duerfen nicht entfernt, verschoben oder dupliziert werden.

## Rhythmus und Flaechen

- Alle Hero-Varianten sind weiss.
- Footer ist weiss.
- Standard nach dem Hero: grau, weiss, grau, weiss.
- Ausnahme `hero-cta-top-no-bottom`: weiss, grau, weiss, grau.

## CTA-Logik

- Kanonische Button-Typen sind:
  - `button-filled-brand`
  - `button-filled-default`
  - `button-outline-strong`
  - `button-outline-weak`
- `teaser-link` und `contact-link` sind keine Buttons.
- Wenn ein Hero-Modul einen Button-CTA hat, ist dieser Hero-CTA immer der primaere `button-filled-brand`.
- Weitere Button-CTAs bleiben standardmaessig `button-outline-strong`.

## Inhalte

- Builder- und Modulvariablen enthalten standardmaessig kein freies HTML.
- Richtext-Ausnahmen muessen bewusst begruendet und knapp gehalten werden.
- Bilder brauchen echte URLs; Placeholder oder Demo-Werte sind keine finale Email-Wahrheit.

## Aktiver Kernpfad

Aktive Kernmodule:
- `logo`
- `logo-centered`
- `hero-image-top`
- `hero-image-top-bleed`
- `hero-image-head-copy-bleed-center`
- `hero-image-textbox-cta-center`
- `hero-cta-top`
- `hero-cta-top-no-bottom`
- `teaser-1col`
- `teaser-2col-horizontal`
- `teaser-2col-vertical`
- `teaser-2col-alternating`
- `teaser-2col-listing`
- `teaser-2col-gallery`
- `benefits-3col`
- `steps-3col`
- `steps-horizontal`
- `table`
- `table-comparison`
- `contact`
- `footer`
