# Template Definition Contract

Diese Datei beschreibt verbindlich, wie eine `template-<template_id>.definition.json` fuer EMB-Composition-Templates aufgebaut sein muss.

Im flachen Agent-Setup liegen die operativen Template-Dateien direkt in `agent/` und werden immer aus `template_id` abgeleitet:

- `template-<template_id>.definition.json`
- `template-<template_id>.preview.html`
- `template-definition.contract.md`

## Zweck

- `template-<template_id>.definition.json` ist die maschinenlesbare Agent-Logik eines Templates.
- `template-<template_id>.preview.html` ist die visuelle Vorschau-Basis des Templates.
- Der Agent darf Regeln niemals aus `template-<template_id>.preview.html` ableiten.
- `template-<template_id>.preview.html` und `template-<template_id>.definition.json` gehoeren immer zusammen.
- Das zugehoerige Iterable-Basis-Template unter `email/templates/<template_id>.html` ist nur die HTML-Shell fuer den Export.
- Iterable-Basis-Templates duerfen keine festen Module und keine festen Snippet-Calls enthalten.
- `email/templates/<template_id>.html` enthaelt genau das CSS, das fuer die Module dieses Templates benoetigt wird.
- Die konkrete Modul-Komposition kommt ausschliesslich aus `template-<template_id>.definition.json` und wird erst beim Export erzeugt.
- Operative Template-Dateien duerfen nicht zu vollstaendig zusammengebauten Testmails oder Demo-Templates werden.

## Prozess

- Der Contract beschreibt den Aufbau und die operative Nutzung der namespaceten Template-Dateien im Agent-Layer.
- Fuer neue oder geaenderte Templates startet der erste Entwurf ausschliesslich in den Review-Dateien unter `development/review/`.
- Diese Review-Dateien sind reine Test-Artefakte und nie operative Builder- oder Export-Wahrheit.
- Review-Dateien duerfen fuer Template-Tests vollstaendig zusammengebaut sein und Demo-Content oder Beispielmodule enthalten.
- Vollstaendig zusammengebaute Preview- oder E-Mail-Tests gehoeren nur in `development/review/preview-index.html` und `development/review/email-index.html`, nicht in operative Template-Dateien.
- Der Ablauf bleibt auch fuer Templates immer: zuerst nur `development/review/preview-index.html` und `development/review/email-index.html` als Review-Entwurf aktualisieren, User-Freigabe einholen und erst danach die abschliessende Template-Integration oder zentrale Dokumentation nachziehen.
- Vor ausdruecklicher User-Freigabe duerfen `agent/template-<template_id>.definition.json`, `agent/template-<template_id>.preview.html` und `email/templates/<template_id>.html` fuer neue oder geaenderte Templates nicht angepasst werden.
- Nach ausdruecklicher User-Freigabe fuehrt Codex die Template-Integration direkt in den operativen Zielpfaden durch:
  - `agent/template-<template_id>.definition.json` fuer die strukturelle Template-Definition und Modulreihenfolge
  - `agent/template-<template_id>.preview.html` fuer die operative Preview-/Template-Logik
  - `email/templates/<template_id>.html` als Iterable-Base-/Shell-Datei mit genau dem benoetigten Template-CSS
- Relevante Library- oder Regeldateien werden nur bei konkretem Bedarf angepasst.
- `development/review/preview-index.html` und `development/review/email-index.html` koennen danach als finaler Teststand aktualisiert werden, bleiben aber reine Test-Artefakte und nie operative Quelle.
- `development/templates/searcher-standard/*` bleibt bis zur finalen Prozessentscheidung als historischer Prozessbeleg erhalten, ist aber kein verpflichtender Startpunkt fuer neue Template-Arbeit.
- Im operativen Agent-Layer sind nur namespacete Template-Dateien erlaubt.
- Generische operative Template-Dateien wie `agent/preview.html` oder `agent/template-definition.json` sind verboten.

## Operative Dateinamen

- Die Definition MUSS als `template-<template_id>.definition.json` gespeichert werden.
- Die Preview MUSS als `template-<template_id>.preview.html` gespeichert werden.
- `<template_id>` im Dateinamen MUSS exakt dem Wert von `template_id` in der Definition entsprechen.
- Nach dem manuellen Anlegen des zugehoerigen Iterable-Basistemplates wird die echte Iterable-ID in `iterable_template_id` eingetragen.
- Solange `iterable_template_id = null` ist, ist Iterable-Export fuer dieses Template blockiert.

## Pflichtfelder

Jede `template-<template_id>.definition.json` MUSS genau diese Top-Level-Felder enthalten:

- `template_id`
- `template_name`
- `version`
- `status`
- `preview_file`
- `iterable_template_id`
- `rules`
- `slots`

## Feldregeln

### `template_id`

- eindeutige technische ID
- muss `kebab-case` sein
- beschreibt die technische Template-Identitaet des Templates
- MUSS exakt dem `<template_id>` in `template-<template_id>.definition.json` und `template-<template_id>.preview.html` entsprechen

### `template_name`

- lesbarer Name fuer Menschen

### `version`

- Zahl
- startet bei `1`

### `status`

- erlaubte Werte:
  - `draft`
  - `active`
  - `deprecated`

### `preview_file`

- muss immer exakt `template-<template_id>.preview.html` sein
- `<template_id>` darin MUSS exakt dem Feld `template_id` entsprechen
- die Preview-Datei darf fertige Preview-Module enthalten
- CSS- und Asset-Links aus der Preview duerfen nicht frei neu erzeugt, geraten oder normalisiert werden
- der kanonische CSS-Link fuer operative Template-Previews ist `https://s24-creative-ops.github.io/email-builder/preview-styles.css`

### `iterable_template_id`

- erlaubt sind `number` oder `null`
- `null` bedeutet: Template ist lokal vorbereitet, aber noch nicht in Iterable angelegt
- `number` bedeutet: echte Iterable Template-ID

## `rules`

`rules` MUSS genau diese Felder enthalten:

- `order_locked`: `true`
- `forbid_new_modules`: `true`
- `allow_remove_modules`: boolean
- `allow_duplicate_modules`: boolean

Regeln:

- `order_locked` MUSS immer `true` sein.
- `forbid_new_modules` MUSS immer `true` sein.
- `allow_remove_modules` steuert, ob nicht-gesperrte Slots entfernt werden duerfen.
- `allow_duplicate_modules` steuert, ob duplizierbare Slots vervielfaeltigt werden duerfen.

## `slots`

- `slots` ist ein Array.
- Die Reihenfolge im Array ist verbindlich.
- Jeder Slot MUSS genau diese Felder enthalten:
  - `slot_id`
  - `module_id`
  - `locked`
  - `removable`
  - `repeatable`

## Slot-Regeln

### `slot_id`

- eindeutig innerhalb des Templates

### `module_id`

- muss einem bestehenden Modul entsprechen

### `locked`

- `true` bedeutet:
  - Slot darf nicht entfernt werden
  - Slot darf nicht dupliziert werden
  - Slot darf nicht verschoben werden

### `removable`

- darf nur `true` sein, wenn `locked = false`

### `repeatable`

- darf nur `true` sein, wenn `locked = false`

## Template-Regeln

- neue Modultypen ausserhalb der definierten `slots` sind verboten
- Duplikate duerfen nur aus Slots mit `repeatable = true` entstehen
- Duplikate werden direkt nach der letzten Instanz derselben `module_id` eingefuegt

## QA vor Freigabe

- Preview muss im EMB funktionieren.
- Die Slot-Reihenfolge muss eingehalten werden.
- locked Module duerfen nicht entfernbar sein.
- repeatable Module duerfen nur im erlaubten Rahmen dupliziert werden.
- Es duerfen keine neuen Module ausserhalb der Slots entstehen.
- Das Iterable-Basistemplate unter `email/templates/<template_id>.html` darf nur Shell, benoetigtes CSS und Content-Einfuegepunkt enthalten.
- Der Export muss die template-spezifische `iterable_template_id` verwenden.
- Der normale Export ohne Composition-Template muss unveraendert bleiben.

## Minimales JSON-Beispiel

```json
{
  "template_id": "template-example",
  "template_name": "Template Example",
  "version": 1,
  "status": "draft",
  "preview_file": "template-template-example.preview.html",
  "iterable_template_id": null,
  "rules": {
    "order_locked": true,
    "forbid_new_modules": true,
    "allow_remove_modules": false,
    "allow_duplicate_modules": false
  },
  "slots": [
    {
      "slot_id": "logo-1",
      "module_id": "logo",
      "locked": true,
      "removable": false,
      "repeatable": false
    },
    {
      "slot_id": "hero-1",
      "module_id": "hero-image-top",
      "locked": true,
      "removable": false,
      "repeatable": false
    },
    {
      "slot_id": "footer-1",
      "module_id": "footer",
      "locked": true,
      "removable": false,
      "repeatable": false
    }
  ]
}
```
