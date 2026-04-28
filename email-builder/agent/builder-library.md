# Builder Library

Diese Datei enthaelt die fachliche Builder-Logik fuer Startkomposition, Pflichtmodule, Templates und Moduluebersicht.
Die technische Export-Wahrheit liegt in `export-map.json`.

## Composition-Templates

- Operative Composition-Templates liegen im flachen `agent/`-Ordner, aber immer namespacet ueber `template_id`.
- Die operativen Dateinamen werden immer aus `template_id` abgeleitet:
  - `template-<template_id>.definition.json`
  - `template-<template_id>.preview.html`
- Neue Templates entstehen zuerst unter `development/templates/<template_id>/` und bleiben dort reine Sandbox.
- Aus `development/templates/` darf nie operative Builder- oder Export-Wahrheit abgeleitet werden.
- Ein Composition-Template ist nur aktiv nutzbar, wenn diese beiden Dateien vorhanden sind und der Status in `template-<template_id>.definition.json` auf `active` steht.
- Bei Template-Nutzung ist `template-<template_id>.preview.html` die visuelle Preview-Basis.
- `template-<template_id>.definition.json` ist die verbindliche Agent-Logik.
- Regeln duerfen niemals aus `template-<template_id>.preview.html` abgeleitet werden.
- Vorhandene CSS- und Asset-Links aus `template-<template_id>.preview.html` muessen bei Template-Nutzung unveraendert erhalten bleiben.
- Die Slot-Reihenfolge aus `template-<template_id>.definition.json` ist verbindlich.
- Neue Modultypen ausserhalb der Slots sind verboten.
- Entfernen oder Duplizieren ist nur erlaubt, wenn `template-<template_id>.definition.json` es erlaubt.
- Jedes Composition-Template braucht zusaetzlich ein eigenes Iterable-Basistemplate unter `email/templates/<template_id>.html`.
- Dieses Iterable-Basistemplate enthaelt nur E-Mail-Shell, benoetigtes CSS und Content-Einfuegepunkt, aber keine festen Module oder festen Snippet-Calls.
- Aktuell bekanntes aktives Composition-Template:
  - `searcher-standard`
    - `template-searcher-standard.definition.json`
    - `template-searcher-standard.preview.html`
    - Iterable Template-ID `611779`

## Startlogik

Nutze genau diese Reihenfolge:

1. Direkte User-Module
2. Explizit angefordertes aktives Composition-Template
3. Standard-Blueprint

- Alle Startpfade duerfen nur Module verwenden, die in `preview-module-library.md` und `preview-modules.html` vorhanden sind.
- Im Bootstrap-Start darf Preview, Composition oder Builder-State noch fehlen.
- Mit dem ersten erfolgreichen Preview-Render wird die Startkomposition zur aktuellen Composition.
- Mit jedem erfolgreichen Preview-Render wird parallel ein strukturierter `email_state` aktualisiert.
- Wenn der User explizit ein bekanntes aktives Composition-Template anfordert, gewinnt dieses Template vor dem Standard-Blueprint.
- Wenn kein Template genannt wird, bleibt der normale Mail-Flow mit dem Standard-Blueprint unveraendert.

## Pflichtmodule

- Standard: `logo`, `hero-image-top`, `footer`
- Logo steht immer an Position `1`.
- Hero steht immer an Position `2`.
- Footer steht immer an letzter Position.

## Hintergrund-Rhythmus

- Der Hintergrund-Rhythmus wird erst angewendet, nachdem die finale Modulfolge feststeht und alle Pflichtmodule korrekt eingesetzt wurden.
- Alle Hero-Varianten haben immer weissen Hintergrund.
- Footer hat immer weissen Hintergrund.
- Standardfall:
  - Das erste Modul nach dem Hero hat immer grauen Hintergrund.
  - Das zweite Modul nach dem Hero hat immer weissen Hintergrund.
  - Danach wechseln die Modulhintergruende strikt weiter grau, weiss, grau, weiss.
- Ausnahme `hero-cta-top-no-bottom`:
  - Das erste Modul nach diesem Hero hat immer weissen Hintergrund.
  - Das zweite Modul nach diesem Hero hat immer grauen Hintergrund.
  - Danach wechseln die Modulhintergruende strikt weiter weiss, grau, weiss, grau.
- Diese Hintergrundfolge gilt fuer die gesamte Modul-Komposition und darf nicht aus statischen Moduldefaults frei uminterpretiert werden.
- User-Wuensche zur Modulreihenfolge duerfen die Hintergrundfolge nur indirekt ueber die finale Modulposition beeinflussen; der Rhythmus selbst ist nicht frei ueberschreibbar.

## Standard-Blueprint

Modulfolge:

1. `logo`
2. `hero-image-top`
3. `benefits-3col`
4. `teaser-1col`
5. `footer`

Inhalt fuer den ersten Entwurf:

- Subject: klare Nutzenaussage in einem Satz
- Preheader: kurze Ergaenzung zum Subject
- Hero: Headline, kurzer Einstieg, ein CTA mit Label und URL
- `benefits-3col`: drei kurze Vorteile plus CTA mit Label und URL
- `teaser-1col`: ein vertiefender Inhaltsblock mit CTA mit Label und URL

Wenn kein Thema genannt ist:

- neutralen, plausiblen Demo-Fokus nutzen
- kein Platzhaltersprech
- keine Rueckfragepflicht fuer den ersten Wurf
- Fuer Demo-CTAs ohne explizites User-Ziel die kanonische Standard-URL `https://www.immobilienscout24.de/` verwenden.

## Direkte User-Module

- Bei direkter Modulliste die User-Reihenfolge uebernehmen.
- Fehlende Pflichtmodule automatisch ergaenzen.
- Allgemeine Mails nutzen `logo`.
- Eine unspezifische `hero`-Anforderung wird immer als `hero-image-top` aufgeloest.
- Bei Hero-Strukturwuenschen immer die passende feste Hero-Variante einsetzen und das Modul austauschen.
- Im Hero sind keine freie Umordnung und keine interne Variantenlogik zulaessig.
- `Bild nach unten` bedeutet Wechsel zu `hero-cta-top`.
- `Bleed` bedeutet Wechsel zu `hero-image-top-bleed`.
- `Bild zuerst, zentriert und Bleed` bedeutet Wechsel zu `hero-image-head-copy-bleed-center`.
- `Bild nach unten ohne unteren Abschluss` bedeutet Wechsel zu `hero-cta-top-no-bottom`.
- Pflicht-Ergaenzung:
  - fehlendes Logo an Position `1`
  - fehlendes `hero-image-top` an Position `2`
  - fehlender Footer an letzter Position

## Unterstuetzte Builder-Module

| Builder-Modul | Iterable-Snippet |
| --- | --- |
| `logo` | `emb_logo` |
| `logo-centered` | `emb_logo_centered` |
| `hero-image-top` | `emb_hero_image_top` |
| `hero-image-top-bleed` | `emb_hero_image_top_bleed` |
| `hero-image-head-copy-bleed-center` | `emb_hero_image_head_copy_bleed_center` |
| `hero-image-textbox-cta-center` | `emb_hero_image_textbox_cta_center` |
| `hero-cta-top` | `emb_hero_cta_top` |
| `hero-cta-top-no-bottom` | `emb_hero_cta_top_no_bottom` |
| `teaser-1col` | `emb_teaser_1col` |
| `teaser-2col-horizontal` | `emb_teaser_2col_horizontal` |
| `teaser-2col-vertical` | `emb_teaser_2col_vertical` |
| `teaser-2col-alternating` | `emb_teaser_2col_alternating` |
| `teaser-2col-listing` | `emb_teaser_2col_listing` |
| `teaser-2col-gallery` | `emb_teaser_2col_gallery` |
| `benefits-3col` | `emb_benefits_3col` |
| `steps-3col` | `emb_steps_3col` |
| `steps-horizontal` | `emb_steps_horizontal` |
| `table` | `emb_table` |
| `table-comparison` | `emb_table_comparison` |
| `contact` | `emb_contact` |
| `footer` | `emb_footer_marketing` |

Bewusst nicht angebunden:

- `servicetiles-4up`

## CTA-Button-Typen

- Kanonische Button-Namen im EMB sind:
  - `button-filled-brand`
  - `button-filled-default`
  - `button-outline-strong`
  - `button-outline-weak`
- Bedeutung:
  - `button-filled-brand`: gefuellter Mint-Button
  - `button-filled-default`: gefuellter Charcoal-Button
  - `button-outline-strong`: Outline-Button mit dunkler Kontur
  - `button-outline-weak`: Outline-Button mit heller Kontur
- `teaser-link` und `contact-link` sind keine Buttons.
- Die alten technischen Klassennamen `button`, `button--outline` und `button--outline-soft` sind nur Legacy-Aliasse und sollen im EMB nicht mehr als kanonische Namen verwendet werden.
- Pro Mail ist hoechstens ein `button-filled-brand` erlaubt.
- Preview-Default fuer Button-CTAs ist `button-outline-strong`.
- `button-filled-brand` wird nur gezielt fuer genau einen primaeren Akzent-CTA der Mail eingesetzt.

## Export-Basis

- Freie oder Blueprint-Mails nutzen das Basis-Template `569946`.
- `Exportiere die Mail zu Iterable` nutzt fuer die aktuelle Preview immer genau die bereits zu dieser Preview gehoerende Campaign oder erzeugt beim ersten Export genau eine neue Campaign auf Basis des festen Iterable-Basis-Templates.
- Draft ist kein Standard- und kein Fallback-Ziel.

## Technische Export-Hinweise

- Der technische Export nutzt den parallel gefuehrten `email_state` und `export-map.json`.
- `export-map.json` ist die einzige technische Quelle fuer:
  - erlaubte Module
  - Snippet-Namen
  - erlaubte Feldnamen
  - Feldtypen
  - Required/Optional
  - Defaults
- Der Export arbeitet im Happy Path nicht aus Preview-HTML oder Snippet-HTML.
- Der Export nutzt nur den parallel gefuehrten `email_state`.
- Unknown Fields sind Export-Fehler.
- Felder ohne Content und ohne Default werden nicht frei erfunden.
- Detaillierte Export- und Shell-Logik steht in `export-rules.md`.

## Modulhinweise

### `logo`

- Snippet: `emb_logo`
- Statisches Snippet ohne Export-Parameter.

### `logo-centered`

- Snippet: `emb_logo_centered`
- Nur verwenden, wenn das Standard-Logo zentriert statt linksbuendig erscheinen soll.
- Statisches Snippet ohne Export-Parameter.

### Hero-Module

- `hero-image-top`, `hero-image-top-bleed`, `hero-image-head-copy-bleed-center`, `hero-cta-top` und `hero-cta-top-no-bottom` sind feste Varianten.
- Hero-Strukturwuensche werden nur durch Modultausch geloest, nie durch internes Umordnen.
- `preheadline` und Badge sind gegenseitig exklusiv.
- Fehlende echte Bild-URL nutzt den passenden Hero-Placeholder aus dem technischen Mapping.

### `hero-image-top`

- Snippet: `emb_hero_image_top`
- Verbindlicher Snippet-Call-Vertrag: genau 15 Parameter in dieser Reihenfolge
  - `emb_hero_image_top_bg_color`
  - `emb_hero_image_top_show_preheadline`
  - `emb_hero_image_top_preheadline`
  - `emb_hero_image_top_show_badge`
  - `emb_hero_image_top_badge_label`
  - `emb_hero_image_top_badge_bg_color`
  - `emb_hero_image_top_badge_text_color`
  - `emb_hero_image_top_headline`
  - `emb_hero_image_top_image_url`
  - `emb_hero_image_top_image_alt`
  - `emb_hero_image_top_body`
  - `emb_hero_image_top_button_url`
  - `emb_hero_image_top_button_bg_color`
  - `emb_hero_image_top_button_border_color`
  - `emb_hero_image_top_button_label`

### `hero-image-top-bleed`

- Snippet: `emb_hero_image_top_bleed`
- Verbindlicher Snippet-Call-Vertrag: genau 15 Parameter in dieser Reihenfolge
  - `emb_hero_image_top_bleed_bg_color`
  - `emb_hero_image_top_bleed_show_preheadline`
  - `emb_hero_image_top_bleed_preheadline`
  - `emb_hero_image_top_bleed_show_badge`
  - `emb_hero_image_top_bleed_badge_label`
  - `emb_hero_image_top_bleed_badge_bg_color`
  - `emb_hero_image_top_bleed_badge_text_color`
  - `emb_hero_image_top_bleed_headline`
  - `emb_hero_image_top_bleed_image_url`
  - `emb_hero_image_top_bleed_image_alt`
  - `emb_hero_image_top_bleed_body`
  - `emb_hero_image_top_bleed_button_url`
  - `emb_hero_image_top_bleed_button_bg_color`
  - `emb_hero_image_top_bleed_button_border_color`
  - `emb_hero_image_top_bleed_button_label`

### `hero-image-head-copy-bleed-center`

- Snippet: `emb_hero_image_head_copy_bleed_center`
- Verbindlicher Snippet-Call-Vertrag: genau 9 Parameter in dieser Reihenfolge
  - `emb_hero_image_head_copy_bleed_center_bg_color`
  - `emb_hero_image_head_copy_bleed_center_image_url`
  - `emb_hero_image_head_copy_bleed_center_image_alt`
  - `emb_hero_image_head_copy_bleed_center_headline`
  - `emb_hero_image_head_copy_bleed_center_body`
  - `emb_hero_image_head_copy_bleed_center_button_url`
  - `emb_hero_image_head_copy_bleed_center_button_bg_color`
  - `emb_hero_image_head_copy_bleed_center_button_border_color`
  - `emb_hero_image_head_copy_bleed_center_button_label`

### `hero-image-textbox-cta-center`

- Snippet: `emb_hero_image_textbox_cta_center`
- Verbindlicher Snippet-Call-Vertrag: genau 11 Parameter in dieser Reihenfolge
  - `emb_hero_image_textbox_cta_center_bg_color`
  - `emb_hero_image_textbox_cta_center_headline`
  - `emb_hero_image_textbox_cta_center_image_url`
  - `emb_hero_image_textbox_cta_center_image_alt`
  - `emb_hero_image_textbox_cta_center_body`
  - `emb_hero_image_textbox_cta_center_question`
  - `emb_hero_image_textbox_cta_center_entry_text`
  - `emb_hero_image_textbox_cta_center_button_url`
  - `emb_hero_image_textbox_cta_center_button_bg_color`
  - `emb_hero_image_textbox_cta_center_button_border_color`
  - `emb_hero_image_textbox_cta_center_button_label`

### `hero-cta-top`

- Snippet: `emb_hero_cta_top`
- Verbindlicher Snippet-Call-Vertrag: genau 15 Parameter in dieser Reihenfolge
  - `emb_hero_cta_top_bg_color`
  - `emb_hero_cta_top_show_preheadline`
  - `emb_hero_cta_top_preheadline`
  - `emb_hero_cta_top_show_badge`
  - `emb_hero_cta_top_badge_label`
  - `emb_hero_cta_top_badge_bg_color`
  - `emb_hero_cta_top_badge_text_color`
  - `emb_hero_cta_top_headline`
  - `emb_hero_cta_top_body`
  - `emb_hero_cta_top_button_url`
  - `emb_hero_cta_top_button_bg_color`
  - `emb_hero_cta_top_button_border_color`
  - `emb_hero_cta_top_button_label`
  - `emb_hero_cta_top_image_url`
  - `emb_hero_cta_top_image_alt`

### `hero-cta-top-no-bottom`

- Snippet: `emb_hero_cta_top_no_bottom`
- Verbindlicher Snippet-Call-Vertrag: genau 15 Parameter in dieser Reihenfolge
  - `emb_hero_cta_top_no_bottom_bg_color`
  - `emb_hero_cta_top_no_bottom_show_preheadline`
  - `emb_hero_cta_top_no_bottom_preheadline`
  - `emb_hero_cta_top_no_bottom_show_badge`
  - `emb_hero_cta_top_no_bottom_badge_label`
  - `emb_hero_cta_top_no_bottom_badge_bg_color`
  - `emb_hero_cta_top_no_bottom_badge_text_color`
  - `emb_hero_cta_top_no_bottom_headline`
  - `emb_hero_cta_top_no_bottom_body`
  - `emb_hero_cta_top_no_bottom_button_url`
  - `emb_hero_cta_top_no_bottom_button_bg_color`
  - `emb_hero_cta_top_no_bottom_button_border_color`
  - `emb_hero_cta_top_no_bottom_button_label`
  - `emb_hero_cta_top_no_bottom_image_url`
  - `emb_hero_cta_top_no_bottom_image_alt`

### Teaser-Module

- `teaser-1col` behaelt Bild, Richtextbereich und CTA.
- `teaser-2col-horizontal` nutzt bis zu vier Items; `show_item_2..4` folgen exakt der sichtbaren Item-Anzahl.
- `teaser-2col-vertical` nutzt genau zwei Spalten.
- `teaser-2col-alternating` nutzt genau zwei Zeilen.
- `teaser-2col-listing` nutzt bis zu vier Items; sichtbare spaetere Zeilen duerfen nie auf `col_1_*` reduziert werden.
- `teaser-2col-gallery` nutzt immer zwei Bilder in der ersten Reihe; `show_item_3` und `show_item_4` erweitern die untere Reihe.
- `teaser-2col-gallery` erlaubt zusaetzlich `hide_bottom_row_mobile`; damit verschwindet die untere Reihe nur in der mobilen Ausgabe.
- Fehlende echte Bild-URL nutzt den passenden `16:9`- oder `4:3`-Placeholder aus dem technischen Mapping.

### `benefits-3col`

- Vor dem Preview-Render alle drei Icon-URLs bucket-basiert aus `icon-library.md` setzen.
- Erlaubte Icon-URLs duerfen nur aus `icon-library.md` kommen.
- Wenn kein Bucket klar passt, den kanonischen `general-positive`-Fallback aus `icon-library.md` verwenden.
- Die drei Benefit-Texte sollen visuell aehnliche Textmengen ergeben.

### `steps-3col`

- Die drei Preview-Schritte werden direkt in die drei Export-Schritte uebersetzt.
- Das Modul wird genau einmal ueber `module_id`, `snippet_name` und `content` exportiert.
- Desktop- und Mobile-Markup im echten Snippet sind reine Renderdetails und kein Export-Signal.

### `steps-horizontal`

- Die drei Preview-Schritte werden direkt in die drei Export-Schritte uebersetzt.

### Tabellen-Module

- `table` behaelt genau drei Spalten und drei Datenzeilen.
- `table-comparison` behaelt genau zwei Vergleichsspalten mit je drei Zeilen.
- Struktur und Reihenfolge muessen im Export mit der Preview uebereinstimmen.

### `contact`

- Die Contact-Preview wird direkt ueber den strukturierten `email_state` in den Contact-Snippet-Call uebersetzt.

### `footer`

- `emb_footer_marketing` bleibt im Minimal-Setup parameterlos.
