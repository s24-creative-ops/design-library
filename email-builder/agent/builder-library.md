# Builder Library

Diese Datei enthaelt die fachliche Builder-Logik fuer Startkomposition, Pflichtmodule, Templates und Moduluebersicht.
Die technische Export-Wahrheit liegt in `export-map.json`.

## Agent-Upload-Bundle

- Fuer Custom-GPT-/Agent-Setups ist das Standard-Knowledge-Format eine einzelne gebuendelte Markdown-Datei mit exakten Repo-Pfadueberschriften als virtuelle Dateien.
- Der Standardordner dafuer ist `agent-upload/email-builder-agent/` mit `systemprompt.md` und `emb_knowledge.md`.
- `agent/` bleibt die kanonische Quelle; der Upload-Ordner ist nur das daraus abgeleitete Paket.
- Dieses Bundle muss die aktiven Kern-, Preview- und Export-Regeln, die Export-Basis, den Template-Contract, den `email_state`-Contract, die zentrale Salutation-Registry `product-salutations.json`, operative Icon- und Tonalitaetsquellen, `email/templates/template-main.html` sowie alle aktiven `template-<id>.definition.json`, `template-<id>.preview.html` und `email/templates/<id>.html` enthalten.
- Nach produktiven Aenderungen an Modulen, Templates, Regeldateien oder `export-map.json` muss das Bundle neu erzeugt werden.

## Typography-Regeln

- Nur Hero-Headlines duerfen im EMB groessenverstellbar sein.
- Erlaubte Hero-Groessen sind ausschliesslich `s`, `m` und `l`.
- Das Hero-Mapping folgt immer direkt den Typography-Tokens:
  - `s` = `heading-s`
  - `m` = `heading-m`
  - `l` = `heading-l`
- Der reguläre Hero-Default ist `l`.
- Nicht-Hero-Modulheadlines sind nicht usersteuerbar.
- Die erste sichtbare Hauptheadline eines Nicht-Hero-Moduls ist immer `heading-m`.
- Weitere Unter-Headlines, Abschnittstitel oder Zwischenueberschriften innerhalb eines Nicht-Hero-Moduls sind immer `heading-s`.
- Bodytexte bleiben standardmaessig `body-standard`.
- Freie Heading-Klassen, freie CSS-Werte, freie Font-Size-Werte, freies HTML oder freie Style-Werte sind fuer Typography-Steuerung nicht zulaessig.

## Composition-Templates

- Operative Composition-Templates liegen im flachen `agent/`-Ordner, aber immer namespacet ueber `template_id`.
- Die operativen Dateinamen werden immer aus `template_id` abgeleitet:
  - `template-<template_id>.definition.json`
  - `template-<template_id>.preview.html`
- Neue oder geaenderte Templates werden fuer die Pruefung in den Review-Dateien unter `development/review/` dargestellt.
- Review-Dateien sind reine Test-Artefakte und nie operative Builder- oder Export-Wahrheit.
- Review-Dateien duerfen fuer Template-Tests vollstaendig zusammengebaut sein und Demo-Content oder Beispielmodule enthalten.
- Der Ablauf bleibt immer: zuerst nur `development/review/preview-index.html` und `development/review/email-index.html` als Review-Entwurf aktualisieren, User-Freigabe einholen und erst danach operative Zielpfade oder zentrale Builder-/Template-Dokumentation anpassen.
- `development/templates/searcher-standard/*` bleibt bis zur finalen Prozessentscheidung als historischer Prozessbeleg erhalten, ist aber kein verpflichtender Startpunkt fuer neue Template-Arbeit.
- Ein Composition-Template ist nur aktiv nutzbar, wenn diese beiden Dateien vorhanden sind und der Status in `template-<template_id>.definition.json` auf `active` steht.
- Bei Template-Nutzung ist `template-<template_id>.preview.html` die visuelle Preview-Basis.
- `template-<template_id>.definition.json` ist die verbindliche Agent-Logik.
- Regeln duerfen niemals aus `template-<template_id>.preview.html` abgeleitet werden.
- Vorhandene CSS- und Asset-Links aus `template-<template_id>.preview.html` muessen bei Template-Nutzung unveraendert erhalten bleiben.
- Finale EMB-Previews duerfen dabei kein externes Design-Library- oder `preview/token-runtime.js`-Script laden; operative Template-Previews verlassen sich nur auf die EMB-Preview-CSS und statisch materialisierte Werte.
- Die Slot-Reihenfolge aus `template-<template_id>.definition.json` ist verbindlich.
- Neue Modultypen ausserhalb der Slots sind verboten.
- Entfernen oder Duplizieren ist nur erlaubt, wenn `template-<template_id>.definition.json` es erlaubt.
- Jedes Composition-Template braucht zusaetzlich ein eigenes Iterable-Basistemplate unter `email/templates/<template_id>.html`.
- Dieses Iterable-Basistemplate enthaelt nur E-Mail-Shell, benoetigtes CSS und Content-Einfuegepunkt, aber keine festen Module oder festen Snippet-Calls.
- Operative Template-Dateien duerfen nicht zu vollstaendig zusammengebauten Testmails oder Demo-Templates umgebaut werden.
- Vollstaendig zusammengebaute Preview- oder E-Mail-Tests fuer Templates gehoeren ausschliesslich in `development/review/preview-index.html` und `development/review/email-index.html`.
- Ohne ausdrueckliche User-Freigabe des aktuellen Review-Stands duerfen weder operative Template-Zielpfade wie `agent/template-<template_id>.*` und `email/templates/<template_id>.html` noch zentrale Anschlussdateien wie `agent/builder-library.md`, Template-Uebersichten oder weitere Library-Dateien angepasst werden.
- Nach ausdruecklicher User-Freigabe erfolgt die Template-Integration direkt in den operativen Zielpfaden:
  - `agent/template-<template_id>.definition.json`
  - `agent/template-<template_id>.preview.html`
  - `email/templates/<template_id>.html`
- Relevante Library- oder Regeldateien werden dabei nur bei konkretem Bedarf nachgezogen; pauschale Anschlussaenderungen sind verboten.
- Die Review-Dateien koennen nach der Integration als finaler Teststand aktualisiert werden, bleiben aber reine Test-Artefakte und nie operative Builder-Wahrheit.
- Aktuell bekanntes aktives Composition-Template:
  - `loft-snl`
    - `template-loft-snl.definition.json`
    - `template-loft-snl.preview.html`
    - Iterable Template-ID `615576`
    - Preview-first bleibt Pflicht; Iterable-Export startet erst nach expliziter User-Freigabe.
  - `loft-rnl-dev`
    - `template-loft-rnl-dev.definition.json`
    - `template-loft-rnl-dev.preview.html`
    - Iterable Template-ID `618734`
    - Preview-first bleibt Pflicht; Iterable-Export startet erst nach expliziter User-Freigabe.

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
- Die Wahl eines Composition-Templates bestimmt nur die Startkomposition und bedeutet nie automatisch Export oder Iterable-Update.
- Wenn kein Template genannt wird, bleibt der normale Mail-Flow mit dem Standard-Blueprint unveraendert.

## Salutation-Kontext

- Die zentrale Registry fuer Anrede-Zuordnungen ist `agent/product-salutations.json`.
- `salutationContext` ist ein eigener Resolver-Kontext fuer Anrede-Logik und getrennt von `templateContext` und vom inhaltlichen Produktkontext.
- Der Resolver arbeitet in genau dieser Reihenfolge:
  1. `salutation_context_id` des aktiven Composition-Templates
  2. explizite User-Nennung ueber `aliases` oder `template_ids` aus `agent/product-salutations.json`
  3. bei From-scratch oder Blank ohne erkennbare Zuordnung genau eine Rueckfrage: `Fuer welches Team oder Produkt ist die Mail gedacht? Zum Beispiel RLE, Loft SNL oder Loft RNL (Dev).`
  4. wenn danach weiter keine eindeutige Zuordnung moeglich ist: `generic`
- Wenn ein Template eine `salutation_context_id` traegt, wird `salutationContext` automatisch gesetzt; es ist keine Rueckfrage noetig.
- Direkte User-Angaben wie `Mail fuer RLE` oder `Newsletter fuer Loft RNL` muessen ueber die Registry ohne unnoetige Rueckfrage aufgeloest werden.
- `mode = template_builtin` bedeutet: bestehende template- oder snippet-spezifische Anrede-Logik weiterverwenden.
- Eine dokumentierte Ausnahme ist erlaubt, wenn `agent/product-salutations.json` fuer einen bestehenden Template-Kontext genau ein kontrolliertes Feld-Override definiert, das keinen freien User-Raw-Code eroeffnet.
- `mode = hero_snippet_flag` bedeutet: nur das bestehende Hero-Pattern mit sichtbarer Preview-Anrede und technischem Export-Flag nutzen.
- `mode = plain_default` bedeutet: sichtbare Preview-Anrede aus `preview_default`, keine Spezial-Exportlogik.

## Pflichtmodule

- Standard: `logo`, `hero-image-top`, `footer`
- Logo steht immer an Position `1`.
- Hero steht immer an Position `2`.
- Footer steht immer an letzter Position.
- Wenn die finale Modulfolge eines der Center-Hero-Module `hero-image-top-center`, `hero-image-top-bleed-center`, `hero-cta-top-center`, `hero-cta-top-no-bottom-center`, `hero-image-head-copy-bleed-center` oder `hero-image-textbox-cta-center` enthaelt, muss das Pflicht-Logo an Position `1` als `logo-centered` statt `logo` aufgeloest werden.
- Diese Logo-Normalisierung aendert nur das Logo-Modul; die Reihenfolge der Mail bleibt unveraendert.

## Hintergrund-Rhythmus

- Der Hintergrund-Rhythmus wird erst angewendet, nachdem die finale Modulfolge feststeht und alle Pflichtmodule korrekt eingesetzt wurden.
- Die verbindliche technische Farbquelle fuer die Rhythmus-Aufloesung ist `agent/preview-styles.css`.
- Dort gelten fuer den produktiven Hintergrund-Rhythmus genau diese Flaechenwerte:
  - weiss / white = `#FFFFFF` aus `--surface-white`
  - grau / gray = `#F5F5F5` aus `--surface-gray`
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
- Bei Preview- und State-Erstellung muss dieser Rhythmus vor dem Mitschreiben in `email_state.content` immer in konkrete Hexwerte aufgeloest werden.
- `theme-white`, `theme-gray` oder andere Preview-Klassen sind nur visuelle Preview-Hilfen und nie zulaessige Exportwerte fuer `email_state.content`.
- Wenn fuer ein Modul mit required `*_bg_color` kein konkreter Hexwert aus dieser verbindlichen Farbquelle aufloesbar ist, gilt die Preview als nicht exportfaehig und der Agent muss stoppen.

## Standard-Blueprint

Modulfolge:

1. `logo`
2. `hero-image-top`
3. `steps-3col`
4. `footer`

Inhalt fuer den ersten Entwurf:

- Subject: klare Nutzenaussage in einem Satz
- Preheader: kurze Ergaenzung zum Subject
- Hero: Headline, kurzer Einstieg, ein CTA mit Label und URL
- `steps-3col`: drei kurze Schritte plus CTA mit Label und URL

Wenn kein Thema genannt ist:

- neutralen, plausiblen Demo-Fokus nutzen
- kein Platzhaltersprech
- keine Rueckfragepflicht fuer den ersten Wurf
- Fuer Demo-CTAs ohne explizites User-Ziel die kanonische Standard-URL `https://www.immobilienscout24.de/` verwenden.

## Direkte User-Module

- Bei direkter Modulliste die User-Reihenfolge uebernehmen.
- Fehlende Pflichtmodule automatisch ergaenzen.
- Allgemeine Mails nutzen `logo`.
- Center-Hero-Mails nutzen als Logo-Variante `logo-centered`.
- Eine unspezifische `hero`-Anforderung wird immer als `hero-image-top` aufgeloest.
- Bei Hero-Strukturwuenschen immer die passende feste Hero-Variante einsetzen und das Modul austauschen.
- Im Hero sind keine freie Umordnung und keine interne Variantenlogik zulaessig.
- `Bild nach unten` bedeutet Wechsel zu `hero-cta-top`.
- `Bleed` bedeutet Wechsel zu `hero-image-top-bleed`.
- `Bild oben und zentriert` bedeutet Wechsel zu `hero-image-top-center`.
- `Bleed und zentriert` bedeutet Wechsel zu `hero-image-top-bleed-center`.
- `Bild zuerst, zentriert und Bleed` bedeutet Wechsel zu `hero-image-head-copy-bleed-center`.
- `Bild nach unten und zentriert` bedeutet Wechsel zu `hero-cta-top-center`.
- `Bild nach unten ohne unteren Abschluss` bedeutet Wechsel zu `hero-cta-top-no-bottom`.
- `Bild nach unten ohne unteren Abschluss und zentriert` bedeutet Wechsel zu `hero-cta-top-no-bottom-center`.
- Wenn die finale Modulfolge eines der Center-Hero-Module `hero-image-top-center`, `hero-image-top-bleed-center`, `hero-cta-top-center`, `hero-cta-top-no-bottom-center`, `hero-image-head-copy-bleed-center` oder `hero-image-textbox-cta-center` enthaelt oder eine bestehende Hero-Variante dorthin gewechselt wird, muss ein vorhandenes `logo` an derselben Position zu `logo-centered` normalisiert werden.
- Wenn in diesem Center-Hero-Kontext bereits `logo-centered` vorhanden ist, darf kein zweites Logo eingefuegt werden.
- Wenn in diesem Center-Hero-Kontext kein Logo vorhanden ist, greift nur die normale Pflichtmodul-Ergaenzung mit `logo-centered`; ausserhalb eines Center-Hero-Kontexts bleibt `logo` regulaer zulaessig.
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
| `hero-image-top-center` | `emb_hero_image_top_center` |
| `hero-image-top-bleed` | `emb_hero_image_top_bleed` |
| `hero-image-top-bleed-center` | `emb_hero_image_top_bleed_center` |
| `hero-image-head-copy-bleed-center` | `emb_hero_image_head_copy_bleed_center` |
| `hero-image-textbox-cta-center` | `emb_hero_image_textbox_cta_center` |
| `hero-cta-top` | `emb_hero_cta_top` |
| `hero-cta-top-center` | `emb_hero_cta_top_center` |
| `hero-cta-top-no-bottom` | `emb_hero_cta_top_no_bottom` |
| `hero-cta-top-no-bottom-center` | `emb_hero_cta_top_no_bottom_center` |
| `teaser-1col` | `emb_teaser_1col` |
| `loft-snl-copy-cta` | `emb_loft_snl_copy_cta` |
| `loft-snl-copy-sections-cta` | `emb_loft_snl_copy_sections_cta` |
| `loft-rnl-dev-intro` | `emb_loft_rnl_dev_intro` |
| `loft-rnl-dev-teaser-1col` | `emb_loft_rnl_dev_teaser_1col` |
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
- Pro Mail ist genau ein primaerer `button-filled-brand` vorgesehen.
- Wenn ein Hero-Modul einen Button-CTA hat, ist dieser Hero-CTA immer der primaere `button-filled-brand`.
- Fuer Nicht-Hero-Button-CTAs bleibt der Preview-Default `button-outline-strong`.
- Wenn eine Mail ausnahmsweise keinen Hero-Button hat, darf stattdessen genau ein anderer primaerer CTA `button-filled-brand` sein.

## Produktkontext

- Produktkontext ist eine fachliche Start-Default-Logik fuer Inhalte und getrennt von `templateContext` und `salutationContext`.
- `salutationContext` kann ueber `agent/product-salutations.json` mehr Kontexte kennen als der Produktkontext; zusaetzliche Inhaltsdefaults duerfen trotzdem nur aus dokumentierten Produkt-Resolvern kommen.
- Produktkontext darf nur dann aktiviert werden, wenn der User am Chat-Anfang explizit ein Produkt nennt, zum Beispiel `Erstelle ein Mailing fuer RLE`, `Produkt: RLE` oder `fuer rle`.
- Die Erkennung ist strikt case-insensitive, aber nur fuer diesen einen dokumentierten Produktnamen erlaubt:
  - `RLE` -> normalisiert zu `RLE`
- `RLE` steht fuer `Realtor Lead Engine`, aber der ausgeschriebene Name ist aktuell keine zusaetzliche Resolver-Form.
- Weitere Produktnamen, aehnliche Schreibweisen oder freie Produktableitungen sind fuer Produktdefaults verboten.
- Wenn der User explizit einen unbekannten Produktnamen nennt, muss der Agent nachfragen statt zu raten.
- Wenn kein Produkt genannt wird, bleiben die neutralen EMB-Defaults aktiv.
- Produktdefaults sind nur Start-Defaults.
- Wenn der User spaeter konkrete Werte fuer Hero-Salutation, Contact-Felder oder andere Inhalte vorgibt, haben diese User-Vorgaben immer Vorrang.

### `RLE`

- Normalisierter Produktkontext: `RLE`
- Produktname: `Realtor Lead Engine`
- Wenn `RLE` explizit als Produkt genannt oder ueber `salutationContext = rle` aufgeloest wurde, bleibt die Preview-Hero-Anrede in allen zehn Hero-Modulen die normale sichtbare Vorschau-Anrede:
  - `Hallo Anrede,`
- Export-Ziel fuer die Hero-Anrede ist fuer `RLE` genau dieser whitelisted Iterable-Logik-Block:
  - `{{#ifContainsStr firstName 'NULL'}} Hallo, {{else if firstName}} Hallo {{firstName}}, {{else}} Hallo, {{/ifContainsStr}}`
- Dieser Export-Zielwert bleibt export-only.
- In der Preview bleibt `*_salutation` sichtbarer Plain Text; fuer RLE wird stattdessen pro Hero-Modul nur das technische Export-Flag `*_use_snippetcall_salutation = true` materialisiert.
- Wenn ein `contact`-Modul in der Mail vorkommt und der User keine abweichenden Contact-Werte vorgibt, muessen diese RLE-Defaults in die bestehenden Contact-Felder materialisiert werden:
  - `emb_contact_show_image` = `true`
  - `emb_contact_image_url` = `https://library.eu.iterable.com/33/98/732ff156cb6b4fc188b76f0e07b2744e-avatar-woman.png`
  - `emb_contact_image_alt` = `Beraterin aus dem ImmoScout24-Team`
  - `emb_contact_headline` = `Hast Du noch Fragen?`
  - `emb_contact_body_intro` = `Unser Experten-Team berät dich gern:`
  - `emb_contact_phone` = `030 24 301 1361`
  - `emb_contact_phone_hours` = `Mo-Fr. von 09:00 - 20:00 Uhr`
  - `emb_contact_email_intro` = `Oder du schreibst uns:`
  - `emb_contact_email_address` = `immobilienberatung@scout24.com`
  - `emb_contact_email_url` = `mailto:immobilienberatung@scout24.com`
  - `emb_contact_closing_line_1` = `Freundliche Grüße`
  - `emb_contact_closing_line_2` = `Dein ImmoScout24-Team`
- Fuer RLE muessen bei Hero-Modulen zusaetzlich diese technischen Export-Flags auf `true` gesetzt werden, wenn die Hero-Anrede sichtbar bleibt:
  - `emb_hero_image_top_use_snippetcall_salutation`
  - `emb_hero_image_top_center_use_snippetcall_salutation`
  - `emb_hero_image_top_bleed_use_snippetcall_salutation`
  - `emb_hero_image_top_bleed_center_use_snippetcall_salutation`
  - `emb_hero_image_head_copy_bleed_center_use_snippetcall_salutation`
  - `emb_hero_image_textbox_cta_center_use_snippetcall_salutation`
  - `emb_hero_cta_top_use_snippetcall_salutation`
  - `emb_hero_cta_top_center_use_snippetcall_salutation`
  - `emb_hero_cta_top_no_bottom_use_snippetcall_salutation`
  - `emb_hero_cta_top_no_bottom_center_use_snippetcall_salutation`

## Export-Ready Resolver

- Ein `email_state` ist nur export-ready, wenn der aktive Template-Kontext bereits vor dem Export eindeutig im State festgehalten wurde.
- Freier Modulbau und Blueprint-Mails nutzen immer:
  - `templateContext.mode = default_template`
  - `templateContext.resolvedBaseTemplateId = 569946`
- Composition-Templates nutzen immer:
  - `templateContext.mode = composition_template`
  - `templateContext.compositionTemplateId = <template_id>`
  - `templateContext.iterableTemplateId = <iterable_template_id>`
  - `templateContext.resolvedBaseTemplateId = <iterable_template_id>`
- Diese Template-Kontextwerte muessen beim Preview-Bau oder spaetestens beim direkten State-Mitschreiben gesetzt werden, nicht erst im Export.
- Exportrelevante technische Resolver duerfen nur aus dokumentierten Quellen kommen:
  - Hintergrund-Rhythmus aus diesem Dokument plus `agent/preview-styles.css`
  - Icon-Auswahl aus `icon-library.md`
  - finale Button-Farbwerte aus diesem Dokument
- Wenn ein required Feld weder im `email_state.content` steht noch einen eindeutigen Default in `export-map.json` hat noch aus einer dokumentierten technischen Resolver-Quelle konkret aufgeloest werden kann, ist der State nicht export-ready.

## Button-Farbaufloesung

- Wenn ein Modul required Button-Farbwerte fuer den Export braucht, muessen diese bereits beim Preview-Bau konkret in `email_state.content` stehen.
- Die Aufloesung erfolgt ausschliesslich aus dem kanonischen Button-Typ:
  - `button-filled-brand` -> `bg_color = #74FFDF`, `border_color = #74FFDF`
  - `button-filled-default` -> `bg_color = #333333`, `border_color = #333333`
  - `button-outline-strong` -> `bg_color = #FFFFFF`, `border_color = #333333`
  - `button-outline-weak` -> `bg_color = #FFFFFF`, `border_color = #D9D9D9`
- Diese Aufloesung ist eine technische Resolver-Regel fuer den `email_state`, kein Freiraum fuer den Export, spaeter aus Klassen oder sichtbarem Styling zu raten.

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
- Pflicht-Logo, wenn die Mail eines der Center-Hero-Module `hero-image-top-center`, `hero-image-top-bleed-center`, `hero-cta-top-center`, `hero-cta-top-no-bottom-center`, `hero-image-head-copy-bleed-center` oder `hero-image-textbox-cta-center` enthaelt.
- Nur verwenden, wenn das Standard-Logo zentriert statt linksbuendig erscheinen soll.
- Statisches Snippet ohne Export-Parameter.

### Hero-Module

- `hero-image-top`, `hero-image-top-center`, `hero-image-top-bleed`, `hero-image-top-bleed-center`, `hero-image-head-copy-bleed-center`, `hero-image-textbox-cta-center`, `hero-cta-top`, `hero-cta-top-center`, `hero-cta-top-no-bottom` und `hero-cta-top-no-bottom-center` sind feste Varianten.
- Hero-Strukturwuensche werden nur durch Modultausch geloest, nie durch internes Umordnen.
- `preheadline` und Badge sind gegenseitig exklusiv.
- Alle zehn Hero-Module nutzen fuer die optionale Anrede vor dem Body denselben Feldvertrag:
  - `emb_<hero>_show_salutation`
  - `emb_<hero>_use_snippetcall_salutation`
  - `emb_<hero>_salutation`
  - Default ist immer `show_salutation = true` und `salutation = Hallo Anrede,`
  - Die Hero-Anrede ist ein eigener Plain-Text-Block vor dem Body und wird nie in das `rich_*`-Body-Feld integriert.
- `use_snippetcall_salutation` ist ausschliesslich ein technisches Export-Flag fuer freigegebene Produktkontexte wie `RLE`; freie User-Raw-Logik bleibt verboten.
- Fehlende echte Bild-URL nutzt den passenden Hero-Placeholder aus dem technischen Mapping.

### `hero-image-top`

- Snippet: `emb_hero_image_top`
- Verbindlicher Snippet-Call-Vertrag: genau 20 Snippet-Parameter in dieser Reihenfolge
  - `emb_hero_image_top_bg_color`
  - `emb_hero_image_top_show_preheadline`
  - `emb_hero_image_top_preheadline`
  - `emb_hero_image_top_show_badge`
  - `emb_hero_image_top_badge_bg_color`
  - `emb_hero_image_top_badge_text_color`
  - `emb_hero_image_top_badge_label`
  - `emb_hero_image_top_show_small_headline`
  - `emb_hero_image_top_show_large_headline`
  - `emb_hero_image_top_headline`
  - `emb_hero_image_top_image_url`
  - `emb_hero_image_top_image_alt`
  - `emb_hero_image_top_show_salutation`
  - `emb_hero_image_top_use_snippetcall_salutation`
  - `emb_hero_image_top_salutation`
  - `emb_hero_image_top_body`
  - `emb_hero_image_top_button_url`
  - `emb_hero_image_top_button_bg_color`
  - `emb_hero_image_top_button_border_color`
  - `emb_hero_image_top_button_label`
- Headline-Groessenvariante:
  - `emb_hero_image_top_headline_size` ist das einzige kanonische Groessenfeld.
  - `emb_hero_image_top_headline_size` gehoert zum kanonischen State-/Exportvertrag, ist aber kein direkt gerenderter Snippet-Parameter.
  - Erlaubte Werte sind nur `s`, `m` und `l`; Default ist `l`.
  - Das Groessen-Mapping folgt festen Typography-Tokens:
    - Desktop:
      - `s` => `heading-s` => `20px / 30px`
      - `m` => `heading-m` => `26px / 36px`
      - `l` => `heading-l` => `34px / 44px`
    - Mobile:
      - `s` => `heading-s mobile` => `20px / 30px`
      - `m` => `heading-m mobile` => `24px / 34px`
      - `l` => `heading-l mobile` => `28px / 36px`
  - Die Snippet-Bridge ist fest:
    - `s` => `emb_hero_image_top_show_small_headline = true` und `emb_hero_image_top_show_large_headline = false`
    - `m` => `emb_hero_image_top_show_small_headline = false` und `emb_hero_image_top_show_large_headline = false`
    - `l` => `emb_hero_image_top_show_small_headline = false` und `emb_hero_image_top_show_large_headline = true`
  - Neue Default-States fuer dieses Modul muessen immer `emb_hero_image_top_headline_size = l`, `emb_hero_image_top_show_small_headline = false` und `emb_hero_image_top_show_large_headline = true` erzeugen.
  - `emb_hero_image_top_show_large_headline` ist nur noch ein Legacy-/Bridge-Feld; wenn es ohne kanonisches `headline_size` auf `true` steht, wird zu `headline_size = l` normalisiert, sonst zu `headline_size = m`.
  - `emb_hero_image_top_show_small_headline = true` und `emb_hero_image_top_show_large_headline = true` gleichzeitig sind ungueltig und muessen fail-closed stoppen.
  - Es gibt kein freies Headline-Style-, HTML- oder CSS-Feld fuer dieses Modul.

### `hero-image-top-center`

- Snippet: `emb_hero_image_top_center`
- Layout: Eyebrow oder Badge, Headline, Anrede, Body und CTA sind zentriert.
- Verbindlicher Snippet-Call-Vertrag: genau 20 Snippet-Parameter in dieser Reihenfolge
  - `emb_hero_image_top_center_bg_color`
  - `emb_hero_image_top_center_show_preheadline`
  - `emb_hero_image_top_center_preheadline`
  - `emb_hero_image_top_center_show_badge`
  - `emb_hero_image_top_center_badge_bg_color`
  - `emb_hero_image_top_center_badge_text_color`
  - `emb_hero_image_top_center_badge_label`
  - `emb_hero_image_top_center_show_small_headline`
  - `emb_hero_image_top_center_show_large_headline`
  - `emb_hero_image_top_center_headline`
  - `emb_hero_image_top_center_image_url`
  - `emb_hero_image_top_center_image_alt`
  - `emb_hero_image_top_center_show_salutation`
  - `emb_hero_image_top_center_use_snippetcall_salutation`
  - `emb_hero_image_top_center_salutation`
  - `emb_hero_image_top_center_body`
  - `emb_hero_image_top_center_button_url`
  - `emb_hero_image_top_center_button_bg_color`
  - `emb_hero_image_top_center_button_border_color`
  - `emb_hero_image_top_center_button_label`
- Headline-Groessenvariante:
  - `emb_hero_image_top_center_headline_size` ist das einzige kanonische Groessenfeld.
  - `emb_hero_image_top_center_headline_size` gehoert zum kanonischen State-/Exportvertrag, ist aber kein direkt gerenderter Snippet-Parameter.
  - Erlaubte Werte sind nur `s`, `m` und `l`; Default ist `l`.
  - Das Groessen-Mapping folgt festen Typography-Tokens:
    - Desktop:
      - `s` => `heading-s` => `20px / 30px`
      - `m` => `heading-m` => `26px / 36px`
      - `l` => `heading-l` => `34px / 44px`
    - Mobile:
      - `s` => `heading-s mobile` => `20px / 30px`
      - `m` => `heading-m mobile` => `24px / 34px`
      - `l` => `heading-l mobile` => `28px / 36px`
  - Die Snippet-Bridge ist fest:
    - `s` => `emb_hero_image_top_center_show_small_headline = true` und `emb_hero_image_top_center_show_large_headline = false`
    - `m` => `emb_hero_image_top_center_show_small_headline = false` und `emb_hero_image_top_center_show_large_headline = false`
    - `l` => `emb_hero_image_top_center_show_small_headline = false` und `emb_hero_image_top_center_show_large_headline = true`
  - Neue Default-States fuer dieses Modul muessen immer `emb_hero_image_top_center_headline_size = l`, `emb_hero_image_top_center_show_small_headline = false` und `emb_hero_image_top_center_show_large_headline = true` erzeugen.
  - `emb_hero_image_top_center_show_large_headline` ist nur noch ein Legacy-/Bridge-Feld; wenn es ohne kanonisches `headline_size` auf `true` steht, wird zu `headline_size = l` normalisiert, sonst zu `headline_size = m`.
  - `emb_hero_image_top_center_show_small_headline = true` und `emb_hero_image_top_center_show_large_headline = true` gleichzeitig sind ungueltig und muessen fail-closed stoppen.
  - Es gibt kein freies Headline-Style-, HTML- oder CSS-Feld fuer dieses Modul.

### `hero-image-top-bleed`

- Snippet: `emb_hero_image_top_bleed`
- Verbindlicher Snippet-Call-Vertrag: genau 20 Snippet-Parameter in dieser Reihenfolge
  - `emb_hero_image_top_bleed_bg_color`
  - `emb_hero_image_top_bleed_show_preheadline`
  - `emb_hero_image_top_bleed_preheadline`
  - `emb_hero_image_top_bleed_show_badge`
  - `emb_hero_image_top_bleed_badge_bg_color`
  - `emb_hero_image_top_bleed_badge_text_color`
  - `emb_hero_image_top_bleed_badge_label`
  - `emb_hero_image_top_bleed_show_small_headline`
  - `emb_hero_image_top_bleed_show_large_headline`
  - `emb_hero_image_top_bleed_headline`
  - `emb_hero_image_top_bleed_image_url`
  - `emb_hero_image_top_bleed_image_alt`
  - `emb_hero_image_top_bleed_show_salutation`
  - `emb_hero_image_top_bleed_use_snippetcall_salutation`
  - `emb_hero_image_top_bleed_salutation`
  - `emb_hero_image_top_bleed_body`
  - `emb_hero_image_top_bleed_button_url`
  - `emb_hero_image_top_bleed_button_bg_color`
  - `emb_hero_image_top_bleed_button_border_color`
  - `emb_hero_image_top_bleed_button_label`
- Headline-Groessenvariante:
  - `emb_hero_image_top_bleed_headline_size` ist das einzige kanonische Groessenfeld.
  - `emb_hero_image_top_bleed_headline_size` gehoert zum kanonischen State-/Exportvertrag, ist aber kein direkt gerenderter Snippet-Parameter.
  - Erlaubte Werte sind nur `s`, `m` und `l`; Default ist `l`.
  - Das Groessen-Mapping folgt festen Typography-Tokens:
    - Desktop:
      - `s` => `heading-s` => `20px / 30px`
      - `m` => `heading-m` => `26px / 36px`
      - `l` => `heading-l` => `34px / 44px`
    - Mobile:
      - `s` => `heading-s mobile` => `20px / 30px`
      - `m` => `heading-m mobile` => `24px / 34px`
      - `l` => `heading-l mobile` => `28px / 36px`
  - Die Snippet-Bridge ist fest:
    - `s` => `emb_hero_image_top_bleed_show_small_headline = true` und `emb_hero_image_top_bleed_show_large_headline = false`
    - `m` => `emb_hero_image_top_bleed_show_small_headline = false` und `emb_hero_image_top_bleed_show_large_headline = false`
    - `l` => `emb_hero_image_top_bleed_show_small_headline = false` und `emb_hero_image_top_bleed_show_large_headline = true`
  - Neue Default-States fuer dieses Modul muessen immer `emb_hero_image_top_bleed_headline_size = l`, `emb_hero_image_top_bleed_show_small_headline = false` und `emb_hero_image_top_bleed_show_large_headline = true` erzeugen.
  - Legacy-Bridge-Felder sind nur technische Kompatibilitaetsfelder; `true/true` gleichzeitig ist ungueltig und muss fail-closed stoppen.
  - Es gibt kein freies Headline-Style-, HTML- oder CSS-Feld fuer dieses Modul.

### `hero-image-top-bleed-center`

- Snippet: `emb_hero_image_top_bleed_center`
- Layout: Eyebrow oder Badge, Headline, Anrede, Body und CTA sind zentriert.
- Verbindlicher Snippet-Call-Vertrag: genau 20 Snippet-Parameter in dieser Reihenfolge
  - `emb_hero_image_top_bleed_center_bg_color`
  - `emb_hero_image_top_bleed_center_show_preheadline`
  - `emb_hero_image_top_bleed_center_preheadline`
  - `emb_hero_image_top_bleed_center_show_badge`
  - `emb_hero_image_top_bleed_center_badge_bg_color`
  - `emb_hero_image_top_bleed_center_badge_text_color`
  - `emb_hero_image_top_bleed_center_badge_label`
  - `emb_hero_image_top_bleed_center_show_small_headline`
  - `emb_hero_image_top_bleed_center_show_large_headline`
  - `emb_hero_image_top_bleed_center_headline`
  - `emb_hero_image_top_bleed_center_image_url`
  - `emb_hero_image_top_bleed_center_image_alt`
  - `emb_hero_image_top_bleed_center_show_salutation`
  - `emb_hero_image_top_bleed_center_use_snippetcall_salutation`
  - `emb_hero_image_top_bleed_center_salutation`
  - `emb_hero_image_top_bleed_center_body`
  - `emb_hero_image_top_bleed_center_button_url`
  - `emb_hero_image_top_bleed_center_button_bg_color`
  - `emb_hero_image_top_bleed_center_button_border_color`
  - `emb_hero_image_top_bleed_center_button_label`
- Headline-Groessenvariante:
  - `emb_hero_image_top_bleed_center_headline_size` ist das einzige kanonische Groessenfeld.
  - `emb_hero_image_top_bleed_center_headline_size` gehoert zum kanonischen State-/Exportvertrag, ist aber kein direkt gerenderter Snippet-Parameter.
  - Erlaubte Werte sind nur `s`, `m` und `l`; Default ist `l`.
  - Das Groessen-Mapping folgt festen Typography-Tokens:
    - Desktop:
      - `s` => `heading-s` => `20px / 30px`
      - `m` => `heading-m` => `26px / 36px`
      - `l` => `heading-l` => `34px / 44px`
    - Mobile:
      - `s` => `heading-s mobile` => `20px / 30px`
      - `m` => `heading-m mobile` => `24px / 34px`
      - `l` => `heading-l mobile` => `28px / 36px`
  - Die Snippet-Bridge ist fest:
    - `s` => `emb_hero_image_top_bleed_center_show_small_headline = true` und `emb_hero_image_top_bleed_center_show_large_headline = false`
    - `m` => `emb_hero_image_top_bleed_center_show_small_headline = false` und `emb_hero_image_top_bleed_center_show_large_headline = false`
    - `l` => `emb_hero_image_top_bleed_center_show_small_headline = false` und `emb_hero_image_top_bleed_center_show_large_headline = true`
  - Neue Default-States fuer dieses Modul muessen immer `emb_hero_image_top_bleed_center_headline_size = l`, `emb_hero_image_top_bleed_center_show_small_headline = false` und `emb_hero_image_top_bleed_center_show_large_headline = true` erzeugen.
  - Legacy-Bridge-Felder sind nur technische Kompatibilitaetsfelder; `true/true` gleichzeitig ist ungueltig und muss fail-closed stoppen.
  - Es gibt kein freies Headline-Style-, HTML- oder CSS-Feld fuer dieses Modul.

### `hero-image-head-copy-bleed-center`

- Snippet: `emb_hero_image_head_copy_bleed_center`
- Verbindlicher Snippet-Call-Vertrag: genau 14 Snippet-Parameter in dieser Reihenfolge
  - `emb_hero_image_head_copy_bleed_center_bg_color`
  - `emb_hero_image_head_copy_bleed_center_show_small_headline`
  - `emb_hero_image_head_copy_bleed_center_show_large_headline`
  - `emb_hero_image_head_copy_bleed_center_image_url`
  - `emb_hero_image_head_copy_bleed_center_image_alt`
  - `emb_hero_image_head_copy_bleed_center_headline`
  - `emb_hero_image_head_copy_bleed_center_show_salutation`
  - `emb_hero_image_head_copy_bleed_center_use_snippetcall_salutation`
  - `emb_hero_image_head_copy_bleed_center_salutation`
  - `emb_hero_image_head_copy_bleed_center_body`
  - `emb_hero_image_head_copy_bleed_center_button_url`
  - `emb_hero_image_head_copy_bleed_center_button_bg_color`
  - `emb_hero_image_head_copy_bleed_center_button_border_color`
  - `emb_hero_image_head_copy_bleed_center_button_label`
- Headline-Groessenvariante:
  - `emb_hero_image_head_copy_bleed_center_headline_size` ist das einzige kanonische Groessenfeld.
  - `emb_hero_image_head_copy_bleed_center_headline_size` gehoert zum kanonischen State-/Exportvertrag, ist aber kein direkt gerenderter Snippet-Parameter.
  - Erlaubte Werte sind nur `s`, `m` und `l`; Default ist `l`.
  - Das Groessen-Mapping folgt festen Typography-Tokens:
    - Desktop:
      - `s` => `heading-s` => `20px / 30px`
      - `m` => `heading-m` => `26px / 36px`
      - `l` => `heading-l` => `34px / 44px`
    - Mobile:
      - `s` => `heading-s mobile` => `20px / 30px`
      - `m` => `heading-m mobile` => `24px / 34px`
      - `l` => `heading-l mobile` => `28px / 36px`
  - Die Snippet-Bridge ist fest:
    - `s` => `emb_hero_image_head_copy_bleed_center_show_small_headline = true` und `emb_hero_image_head_copy_bleed_center_show_large_headline = false`
    - `m` => `emb_hero_image_head_copy_bleed_center_show_small_headline = false` und `emb_hero_image_head_copy_bleed_center_show_large_headline = false`
    - `l` => `emb_hero_image_head_copy_bleed_center_show_small_headline = false` und `emb_hero_image_head_copy_bleed_center_show_large_headline = true`
  - Neue Default-States fuer dieses Modul muessen immer `emb_hero_image_head_copy_bleed_center_headline_size = l`, `emb_hero_image_head_copy_bleed_center_show_small_headline = false` und `emb_hero_image_head_copy_bleed_center_show_large_headline = true` erzeugen.
  - Legacy-Bridge-Felder sind nur technische Kompatibilitaetsfelder; `true/true` gleichzeitig ist ungueltig und muss fail-closed stoppen.
  - Es gibt kein freies Headline-Style-, HTML- oder CSS-Feld fuer dieses Modul.

### `hero-image-textbox-cta-center`

- Snippet: `emb_hero_image_textbox_cta_center`
- Verbindlicher Snippet-Call-Vertrag: genau 17 Snippet-Parameter in dieser Reihenfolge
  - `emb_hero_image_textbox_cta_center_bg_color`
  - `emb_hero_image_textbox_cta_center_show_small_headline`
  - `emb_hero_image_textbox_cta_center_show_large_headline`
  - `emb_hero_image_textbox_cta_center_headline`
  - `emb_hero_image_textbox_cta_center_image_url`
  - `emb_hero_image_textbox_cta_center_image_alt`
  - `emb_hero_image_textbox_cta_center_show_salutation`
  - `emb_hero_image_textbox_cta_center_use_snippetcall_salutation`
  - `emb_hero_image_textbox_cta_center_salutation`
  - `emb_hero_image_textbox_cta_center_body`
  - `emb_hero_image_textbox_cta_center_question`
  - `emb_hero_image_textbox_cta_center_entry_url`
  - `emb_hero_image_textbox_cta_center_entry_text`
  - `emb_hero_image_textbox_cta_center_button_url`
  - `emb_hero_image_textbox_cta_center_button_bg_color`
  - `emb_hero_image_textbox_cta_center_button_border_color`
  - `emb_hero_image_textbox_cta_center_button_label`
- Headline-Groessenvariante:
  - `emb_hero_image_textbox_cta_center_headline_size` ist das einzige kanonische Groessenfeld.
  - `emb_hero_image_textbox_cta_center_headline_size` gehoert zum kanonischen State-/Exportvertrag, ist aber kein direkt gerenderter Snippet-Parameter.
  - Erlaubte Werte sind nur `s`, `m` und `l`; Default ist `l`.
  - Das Groessen-Mapping folgt festen Typography-Tokens:
    - Desktop:
      - `s` => `heading-s` => `20px / 30px`
      - `m` => `heading-m` => `26px / 36px`
      - `l` => `heading-l` => `34px / 44px`
    - Mobile:
      - `s` => `heading-s mobile` => `20px / 30px`
      - `m` => `heading-m mobile` => `24px / 34px`
      - `l` => `heading-l mobile` => `28px / 36px`
  - Die Snippet-Bridge ist fest:
    - `s` => `emb_hero_image_textbox_cta_center_show_small_headline = true` und `emb_hero_image_textbox_cta_center_show_large_headline = false`
    - `m` => `emb_hero_image_textbox_cta_center_show_small_headline = false` und `emb_hero_image_textbox_cta_center_show_large_headline = false`
    - `l` => `emb_hero_image_textbox_cta_center_show_small_headline = false` und `emb_hero_image_textbox_cta_center_show_large_headline = true`
  - Neue Default-States fuer dieses Modul muessen immer `emb_hero_image_textbox_cta_center_headline_size = l`, `emb_hero_image_textbox_cta_center_show_small_headline = false` und `emb_hero_image_textbox_cta_center_show_large_headline = true` erzeugen.
  - Legacy-Bridge-Felder sind nur technische Kompatibilitaetsfelder; `true/true` gleichzeitig ist ungueltig und muss fail-closed stoppen.
  - Es gibt kein freies Headline-Style-, HTML- oder CSS-Feld fuer dieses Modul.
- Export-Hinweis:
  - `entry_url` kommt im produktiven E-Mail-Modul vor dem sichtbaren `entry_text`, weil die Kontur-Flaeche als kompletter Link gerendert wird.
  - Fuer den Export ist genau diese Reihenfolge verbindlich.

### `hero-cta-top`

- Snippet: `emb_hero_cta_top`
- Verbindlicher Snippet-Call-Vertrag: genau 20 Snippet-Parameter in dieser Reihenfolge
  - `emb_hero_cta_top_bg_color`
  - `emb_hero_cta_top_show_preheadline`
  - `emb_hero_cta_top_preheadline`
  - `emb_hero_cta_top_show_badge`
  - `emb_hero_cta_top_badge_bg_color`
  - `emb_hero_cta_top_badge_text_color`
  - `emb_hero_cta_top_badge_label`
  - `emb_hero_cta_top_show_small_headline`
  - `emb_hero_cta_top_show_large_headline`
  - `emb_hero_cta_top_headline`
  - `emb_hero_cta_top_show_salutation`
  - `emb_hero_cta_top_use_snippetcall_salutation`
  - `emb_hero_cta_top_salutation`
  - `emb_hero_cta_top_body`
  - `emb_hero_cta_top_button_url`
  - `emb_hero_cta_top_button_bg_color`
  - `emb_hero_cta_top_button_border_color`
  - `emb_hero_cta_top_button_label`
  - `emb_hero_cta_top_image_url`
  - `emb_hero_cta_top_image_alt`
- Headline-Groessenvariante:
  - `emb_hero_cta_top_headline_size` ist das einzige kanonische Groessenfeld.
  - `emb_hero_cta_top_headline_size` gehoert zum kanonischen State-/Exportvertrag, ist aber kein direkt gerenderter Snippet-Parameter.
  - Erlaubte Werte sind nur `s`, `m` und `l`; Default ist `l`.
  - Das Groessen-Mapping folgt festen Typography-Tokens:
    - Desktop:
      - `s` => `heading-s` => `20px / 30px`
      - `m` => `heading-m` => `26px / 36px`
      - `l` => `heading-l` => `34px / 44px`
    - Mobile:
      - `s` => `heading-s mobile` => `20px / 30px`
      - `m` => `heading-m mobile` => `24px / 34px`
      - `l` => `heading-l mobile` => `28px / 36px`
  - Die Snippet-Bridge ist fest:
    - `s` => `emb_hero_cta_top_show_small_headline = true` und `emb_hero_cta_top_show_large_headline = false`
    - `m` => `emb_hero_cta_top_show_small_headline = false` und `emb_hero_cta_top_show_large_headline = false`
    - `l` => `emb_hero_cta_top_show_small_headline = false` und `emb_hero_cta_top_show_large_headline = true`
  - Neue Default-States fuer dieses Modul muessen immer `emb_hero_cta_top_headline_size = l`, `emb_hero_cta_top_show_small_headline = false` und `emb_hero_cta_top_show_large_headline = true` erzeugen.
  - Legacy-Bridge-Felder sind nur technische Kompatibilitaetsfelder; `true/true` gleichzeitig ist ungueltig und muss fail-closed stoppen.
  - Es gibt kein freies Headline-Style-, HTML- oder CSS-Feld fuer dieses Modul.

### `hero-cta-top-center`

- Snippet: `emb_hero_cta_top_center`
- Layout: Eyebrow oder Badge, Headline, Anrede, Body und CTA sind zentriert.
- Verbindlicher Snippet-Call-Vertrag: genau 20 Snippet-Parameter in dieser Reihenfolge
  - `emb_hero_cta_top_center_bg_color`
  - `emb_hero_cta_top_center_show_preheadline`
  - `emb_hero_cta_top_center_preheadline`
  - `emb_hero_cta_top_center_show_badge`
  - `emb_hero_cta_top_center_badge_bg_color`
  - `emb_hero_cta_top_center_badge_text_color`
  - `emb_hero_cta_top_center_badge_label`
  - `emb_hero_cta_top_center_show_small_headline`
  - `emb_hero_cta_top_center_show_large_headline`
  - `emb_hero_cta_top_center_headline`
  - `emb_hero_cta_top_center_show_salutation`
  - `emb_hero_cta_top_center_use_snippetcall_salutation`
  - `emb_hero_cta_top_center_salutation`
  - `emb_hero_cta_top_center_body`
  - `emb_hero_cta_top_center_button_url`
  - `emb_hero_cta_top_center_button_bg_color`
  - `emb_hero_cta_top_center_button_border_color`
  - `emb_hero_cta_top_center_button_label`
  - `emb_hero_cta_top_center_image_url`
  - `emb_hero_cta_top_center_image_alt`
- Headline-Groessenvariante:
  - `emb_hero_cta_top_center_headline_size` ist das einzige kanonische Groessenfeld.
  - `emb_hero_cta_top_center_headline_size` gehoert zum kanonischen State-/Exportvertrag, ist aber kein direkt gerenderter Snippet-Parameter.
  - Erlaubte Werte sind nur `s`, `m` und `l`; Default ist `l`.
  - Das Groessen-Mapping folgt festen Typography-Tokens:
    - Desktop:
      - `s` => `heading-s` => `20px / 30px`
      - `m` => `heading-m` => `26px / 36px`
      - `l` => `heading-l` => `34px / 44px`
    - Mobile:
      - `s` => `heading-s mobile` => `20px / 30px`
      - `m` => `heading-m mobile` => `24px / 34px`
      - `l` => `heading-l mobile` => `28px / 36px`
  - Die Snippet-Bridge ist fest:
    - `s` => `emb_hero_cta_top_center_show_small_headline = true` und `emb_hero_cta_top_center_show_large_headline = false`
    - `m` => `emb_hero_cta_top_center_show_small_headline = false` und `emb_hero_cta_top_center_show_large_headline = false`
    - `l` => `emb_hero_cta_top_center_show_small_headline = false` und `emb_hero_cta_top_center_show_large_headline = true`
  - Neue Default-States fuer dieses Modul muessen immer `emb_hero_cta_top_center_headline_size = l`, `emb_hero_cta_top_center_show_small_headline = false` und `emb_hero_cta_top_center_show_large_headline = true` erzeugen.
  - Legacy-Bridge-Felder sind nur technische Kompatibilitaetsfelder; `true/true` gleichzeitig ist ungueltig und muss fail-closed stoppen.
  - Es gibt kein freies Headline-Style-, HTML- oder CSS-Feld fuer dieses Modul.

### `hero-cta-top-no-bottom`

- Snippet: `emb_hero_cta_top_no_bottom`
- Verbindlicher Snippet-Call-Vertrag: genau 20 Snippet-Parameter in dieser Reihenfolge
  - `emb_hero_cta_top_no_bottom_bg_color`
  - `emb_hero_cta_top_no_bottom_show_preheadline`
  - `emb_hero_cta_top_no_bottom_preheadline`
  - `emb_hero_cta_top_no_bottom_show_badge`
  - `emb_hero_cta_top_no_bottom_badge_bg_color`
  - `emb_hero_cta_top_no_bottom_badge_text_color`
  - `emb_hero_cta_top_no_bottom_badge_label`
  - `emb_hero_cta_top_no_bottom_show_small_headline`
  - `emb_hero_cta_top_no_bottom_show_large_headline`
  - `emb_hero_cta_top_no_bottom_headline`
  - `emb_hero_cta_top_no_bottom_show_salutation`
  - `emb_hero_cta_top_no_bottom_use_snippetcall_salutation`
  - `emb_hero_cta_top_no_bottom_salutation`
  - `emb_hero_cta_top_no_bottom_body`
  - `emb_hero_cta_top_no_bottom_button_url`
  - `emb_hero_cta_top_no_bottom_button_bg_color`
  - `emb_hero_cta_top_no_bottom_button_border_color`
  - `emb_hero_cta_top_no_bottom_button_label`
  - `emb_hero_cta_top_no_bottom_image_url`
  - `emb_hero_cta_top_no_bottom_image_alt`
- Headline-Groessenvariante:
  - `emb_hero_cta_top_no_bottom_headline_size` ist das einzige kanonische Groessenfeld.
  - `emb_hero_cta_top_no_bottom_headline_size` gehoert zum kanonischen State-/Exportvertrag, ist aber kein direkt gerenderter Snippet-Parameter.
  - Erlaubte Werte sind nur `s`, `m` und `l`; Default ist `l`.
  - Das Groessen-Mapping folgt festen Typography-Tokens:
    - Desktop:
      - `s` => `heading-s` => `20px / 30px`
      - `m` => `heading-m` => `26px / 36px`
      - `l` => `heading-l` => `34px / 44px`
    - Mobile:
      - `s` => `heading-s mobile` => `20px / 30px`
      - `m` => `heading-m mobile` => `24px / 34px`
      - `l` => `heading-l mobile` => `28px / 36px`
  - Die Snippet-Bridge ist fest:
    - `s` => `emb_hero_cta_top_no_bottom_show_small_headline = true` und `emb_hero_cta_top_no_bottom_show_large_headline = false`
    - `m` => `emb_hero_cta_top_no_bottom_show_small_headline = false` und `emb_hero_cta_top_no_bottom_show_large_headline = false`
    - `l` => `emb_hero_cta_top_no_bottom_show_small_headline = false` und `emb_hero_cta_top_no_bottom_show_large_headline = true`
  - Neue Default-States fuer dieses Modul muessen immer `emb_hero_cta_top_no_bottom_headline_size = l`, `emb_hero_cta_top_no_bottom_show_small_headline = false` und `emb_hero_cta_top_no_bottom_show_large_headline = true` erzeugen.
  - Legacy-Bridge-Felder sind nur technische Kompatibilitaetsfelder; `true/true` gleichzeitig ist ungueltig und muss fail-closed stoppen.
  - Es gibt kein freies Headline-Style-, HTML- oder CSS-Feld fuer dieses Modul.

### Teaser-Module

- `loft-rnl-dev-intro` ist ein template-spezifisches Loft-RNL-Dev-Intro mit editierbarer `heading-l`-Headline, kontrolliertem Salutation-Feld und einem frei editierbaren `rich_full`-Body.
- Das Modul nutzt genau diese Builder-Felder:
  - `emb_loft_rnl_dev_intro_headline`
  - `emb_loft_rnl_dev_intro_salutation`
  - `emb_loft_rnl_dev_intro_body`
- In der Preview bleibt `emb_loft_rnl_dev_intro_salutation` menschenlesbarer Plain Text `Hallo Anrede`.
- Die finale EMB-Preview materialisiert die Intro-Headline im Markup explizit als `font-heading-large-bold`, damit die bestehende `heading-l`-Typografie ohne Loft-Sonderannahmen im Preview-Pfad landet.
- Fuer `salutationContext = loft-rnl-dev` wird der produktive Exportwert von `emb_loft_rnl_dev_intro_salutation` kontrolliert aus `agent/product-salutations.json` materialisiert.
- `teaser-1col` behaelt Bild, Richtextbereich und CTA.
- `loft-rnl-dev-teaser-1col` ist ein template-spezifisches Loft-RNL-Dev-Modul mit Badge, `heading-l`-Headline, Bild, Richtext-Body, festem Detailtitel, Richtext-Detailbereich und CTA.
- `loft-rnl-dev-teaser-1col` ist repeatable; neue Instanzen werden direkt nach der letzten vorhandenen Instanz derselben `module_id` eingefuegt.
- `loft-rnl-dev-teaser-1col` nutzt fuer `emb_loft_rnl_dev_teaser_1col_bg_color` immer den globalen Hintergrund-Rhythmus:
  - erste Instanz nach dem Intro = grau `#F5F5F5`
  - zweite Instanz = weiss `#FFFFFF`
  - danach strikt weiter grau, weiss, grau, weiss
- Die Badge-Flaeche von `loft-rnl-dev-teaser-1col` ist keine freie User-Entscheidung; sie ist immer invers zur finalen Hintergrundflaeche des Moduls.
- Die finale EMB-Preview materialisiert diese Badge-Inversion direkt im Markup:
  - graues Modul `#F5F5F5` => `module__badge module__badge--surface-white`
  - weisses Modul `#FFFFFF` => `module__badge module__badge--surface-gray`
- Die finale EMB-Preview materialisiert die Teaser-Headline im Markup explizit als `font-heading-large-bold`, damit die bestehende `heading-l`-Typografie ohne groessere Hero-/XL-Klassen im Preview-Pfad landet.
- `teaser-2col-horizontal` nutzt bis zu vier Items; `show_item_2..4` folgen exakt der sichtbaren Item-Anzahl.
- `teaser-2col-vertical` nutzt genau zwei Spalten.
- `teaser-2col-alternating` nutzt genau zwei Zeilen.
- `teaser-2col-listing` nutzt bis zu vier Items; sichtbare spaetere Zeilen duerfen nie auf `col_1_*` reduziert werden.
- `teaser-2col-gallery` nutzt immer zwei Bilder in der ersten Reihe; `show_item_3` und `show_item_4` erweitern die untere Reihe.
- `teaser-2col-gallery` erlaubt zusaetzlich `hide_bottom_row_mobile`; damit verschwindet die untere Reihe nur in der mobilen Ausgabe.
- Fehlende echte Bild-URL nutzt den passenden `16:9`- oder `4:3`-Placeholder aus dem technischen Mapping.

### `hero-cta-top-no-bottom-center`

- Snippet: `emb_hero_cta_top_no_bottom_center`
- Layout: Eyebrow oder Badge, Headline, Anrede, Body und CTA sind zentriert.
- Verbindlicher Snippet-Call-Vertrag: genau 20 Snippet-Parameter in dieser Reihenfolge
  - `emb_hero_cta_top_no_bottom_center_bg_color`
  - `emb_hero_cta_top_no_bottom_center_show_preheadline`
  - `emb_hero_cta_top_no_bottom_center_preheadline`
  - `emb_hero_cta_top_no_bottom_center_show_badge`
  - `emb_hero_cta_top_no_bottom_center_badge_bg_color`
  - `emb_hero_cta_top_no_bottom_center_badge_text_color`
  - `emb_hero_cta_top_no_bottom_center_badge_label`
  - `emb_hero_cta_top_no_bottom_center_show_small_headline`
  - `emb_hero_cta_top_no_bottom_center_show_large_headline`
  - `emb_hero_cta_top_no_bottom_center_headline`
  - `emb_hero_cta_top_no_bottom_center_show_salutation`
  - `emb_hero_cta_top_no_bottom_center_use_snippetcall_salutation`
  - `emb_hero_cta_top_no_bottom_center_salutation`
  - `emb_hero_cta_top_no_bottom_center_body`
  - `emb_hero_cta_top_no_bottom_center_button_url`
  - `emb_hero_cta_top_no_bottom_center_button_bg_color`
  - `emb_hero_cta_top_no_bottom_center_button_border_color`
  - `emb_hero_cta_top_no_bottom_center_button_label`
  - `emb_hero_cta_top_no_bottom_center_image_url`
  - `emb_hero_cta_top_no_bottom_center_image_alt`
- Headline-Groessenvariante:
  - `emb_hero_cta_top_no_bottom_center_headline_size` ist das einzige kanonische Groessenfeld.
  - `emb_hero_cta_top_no_bottom_center_headline_size` gehoert zum kanonischen State-/Exportvertrag, ist aber kein direkt gerenderter Snippet-Parameter.
  - Erlaubte Werte sind nur `s`, `m` und `l`; Default ist `l`.
  - Das Groessen-Mapping folgt festen Typography-Tokens:
    - Desktop:
      - `s` => `heading-s` => `20px / 30px`
      - `m` => `heading-m` => `26px / 36px`
      - `l` => `heading-l` => `34px / 44px`
    - Mobile:
      - `s` => `heading-s mobile` => `20px / 30px`
      - `m` => `heading-m mobile` => `24px / 34px`
      - `l` => `heading-l mobile` => `28px / 36px`
  - Die Snippet-Bridge ist fest:
    - `s` => `emb_hero_cta_top_no_bottom_center_show_small_headline = true` und `emb_hero_cta_top_no_bottom_center_show_large_headline = false`
    - `m` => `emb_hero_cta_top_no_bottom_center_show_small_headline = false` und `emb_hero_cta_top_no_bottom_center_show_large_headline = false`
    - `l` => `emb_hero_cta_top_no_bottom_center_show_small_headline = false` und `emb_hero_cta_top_no_bottom_center_show_large_headline = true`
  - Neue Default-States fuer dieses Modul muessen immer `emb_hero_cta_top_no_bottom_center_headline_size = l`, `emb_hero_cta_top_no_bottom_center_show_small_headline = false` und `emb_hero_cta_top_no_bottom_center_show_large_headline = true` erzeugen.
  - Legacy-Bridge-Felder sind nur technische Kompatibilitaetsfelder; `true/true` gleichzeitig ist ungueltig und muss fail-closed stoppen.
  - Es gibt kein freies Headline-Style-, HTML- oder CSS-Feld fuer dieses Modul.

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
- Das Contact-Modul nutzt an der bestehenden Placeholder-Position optional genau diese Bildfelder:
  - `emb_contact_show_image`
  - `emb_contact_image_url`
  - `emb_contact_image_alt`
- Ohne echte Bild-URL bleibt in der Preview der vorhandene Avatar-Placeholder sichtbar und im E-Mail-Snippet der neutrale graue Kreis aktiv.

### `footer`

- `emb_footer_marketing` bleibt im Minimal-Setup parameterlos.
