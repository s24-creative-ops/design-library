# Builder Library

Diese Datei enthaelt die fachliche Builder-Logik fuer Startkomposition, Pflichtmodule, Templates und Moduluebersicht.
Die technische Export-Wahrheit liegt in `export-map.json`.

## Startlogik

Nutze genau diese Reihenfolge:

1. Direkte User-Module
2. Bekanntes Template
3. Standard-Blueprint

- Alle Startpfade duerfen nur Module verwenden, die in `preview-module-library.md` und `preview-modules.html` vorhanden sind.
- Im Bootstrap-Start darf Preview, Composition oder Builder-State noch fehlen.
- Mit dem ersten erfolgreichen Preview-Render wird die Startkomposition zur aktuellen Composition.
- Mit jedem erfolgreichen Preview-Render wird parallel ein strukturierter `email_state` aktualisiert.
- Vor dem finalen Export muss die Mail immer einem Produkt oder Template zugeordnet sein, damit produktspezifische Export-Regeln korrekt aufgeloest werden koennen.

## Pflichtmodule

- Standard: `logo`, `hero-image-top`, `footer`
- Template `Viessmann`: `logo-viessmann`, `hero-image-top`, `footer`
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

## Templates

### Viessmann

- User-Aliasse: `Viessmann`, `Viessmann E-Mail`
- Technische Template-ID: `template-vissmann`
- Iterable-Basis-Template: `594116`
- Derzeit nur preview-faehig. Export ist gesperrt, solange kein lokales `emb_logo_viessmann.html` vorhanden ist.
- Feste Modulfolge:
  1. `logo-viessmann`
  2. `hero-image-top`
  3. `teaser-2col-listing`
  4. `footer`

## Produktgesteuerte Anrede

- Alle Hero-Varianten enthalten immer eine Anrede direkt oberhalb des Hero-Bodytexts.
- In der Preview lautet diese Anrede immer `Hallo Anrede,`.
- Beim Export wird die Hero-Anrede anhand des gewaehlten Produkts oder Templates aus `product-salutations.json` befuellt.
- Wenn kein Produkttreffer vorhanden ist, bleibt der Export-Fallback `Hallo Anrede,`.
- Die Produktzuordnung darf ueber benannte Produkte, bekannte User-Aliasse oder das aktive Template erfolgen.

## Direkte User-Module

- Bei direkter Modulliste die User-Reihenfolge uebernehmen.
- Fehlende Pflichtmodule automatisch ergaenzen.
- Allgemeine Mails nutzen `logo`.
- Viessmann-Previews nutzen `logo-viessmann`.
- Eine unspezifische `hero`-Anforderung wird immer als `hero-image-top` aufgeloest.
- Bei Hero-Strukturwuenschen immer die passende feste Hero-Variante einsetzen und das Modul austauschen.
- Im Hero sind keine freie Umordnung und keine interne Variantenlogik zulaessig.
- `Bild nach unten` bedeutet Wechsel zu `hero-cta-top`.
- `Bleed` bedeutet Wechsel zu `hero-image-top-bleed`.
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
| `hero-cta-top` | `emb_hero_cta_top` |
| `hero-cta-top-no-bottom` | `emb_hero_cta_top_no_bottom` |
| `eyebrow-headline-button` | `emb_eyebrow_headline_button` |
| `teaser-1col` | `emb_teaser_1col` |
| `teaser-2col-horizontal` | `emb_teaser_2col_horizontal` |
| `teaser-2col-vertical` | `emb_teaser_2col_vertical` |
| `teaser-2col-alternating` | `emb_teaser_2col_alternating` |
| `teaser-2col-listing` | `emb_teaser_2col_listing` |
| `benefits-3col` | `emb_benefits_3col` |
| `steps-3col` | `emb_steps_3col` |
| `steps-horizontal` | `emb_steps_horizontal` |
| `table` | `emb_table` |
| `table-comparison` | `emb_table_comparison` |
| `contact` | `emb_contact` |
| `footer` | `emb_footer_marketing` |

Bewusst nicht angebunden:

- `logo-viessmann`
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
- `Viessmann` nutzt das Basis-Template `594116`.
- `Exportiere die Mail zu Iterable` nutzt fuer die aktuelle Preview immer genau die bereits zu dieser Preview gehoerende Campaign oder erzeugt beim ersten Export genau eine neue Campaign auf Basis des passenden Iterable-Basis-Templates.
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

### `logo-viessmann`

- Snippet: `emb_logo_viessmann`
- Nur fuer das Template `Viessmann` verwenden.
- Derzeit nicht exportfaehig, solange das lokale Snippet fehlt.

### Hero-Module

- `hero-image-top`, `hero-image-top-bleed`, `hero-cta-top` und `hero-cta-top-no-bottom` sind feste Varianten.
- Alle Hero-Varianten fuehren die Anrede als eigenes Feld vor dem Richtext-Body.
- Hero-Strukturwuensche werden nur durch Modultausch geloest, nie durch internes Umordnen.
- `preheadline` und Badge sind gegenseitig exklusiv.
- Fehlende echte Bild-URL nutzt den passenden Hero-Placeholder aus dem technischen Mapping.

### `eyebrow-headline-button`

- Kompakter CTA-Block mit optionalem Eyebrow, Headline und genau einem Button.
- Kein Hero-Ersatz: Pflicht-Hero, Logo und Footer-Regeln bleiben unveraendert.
- Das Modul exportiert keine Bild-, Badge- oder Richtext-Felder.

### Teaser-Module

- `teaser-1col` behaelt Bild, Richtextbereich und CTA.
- `teaser-2col-horizontal` nutzt bis zu vier Items; `show_item_2..4` folgen exakt der sichtbaren Item-Anzahl.
- `teaser-2col-vertical` nutzt genau zwei Spalten.
- `teaser-2col-alternating` nutzt genau zwei Zeilen.
- `teaser-2col-listing` nutzt bis zu vier Items; sichtbare spaetere Zeilen duerfen nie auf `col_1_*` reduziert werden.
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
