# Preview Module Library

Diese Datei beschreibt die Preview-Module, ihre sichtbaren Eingaben und ihre Render-Bedeutung.
Die technische Export-Wahrheit liegt ausschliesslich in `export-map.json`.

## Render-Regel

- Jedes Modul muss mit seiner HTML-Struktur aus `preview-modules.html` gerendert werden.
- Die Preview beginnt immer mit `preview-template.html`.
- Wenn ein Modul hier nicht registriert ist, darf es nicht gerendert werden.
- Wenn fuer einen registrierten Bild-Slot keine echte User-Bild-URL vorliegt, bleibt in der Preview die graue Placeholder-Flaeche aus `preview-modules.html` sichtbar.
- Wenn fuer einen registrierten Bild-Slot eine echte User-Bild-URL vorliegt, ersetzt diese URL in der Preview die graue Placeholder-Flaeche fuer genau diesen Slot.
- Die Preview dient der visuellen Iteration. Die regulaere Exportlogik arbeitet nicht aus Preview-HTML.

## Technische Trennung

- `export-map.json` ist die einzige technische Quelle fuer erlaubte Export-Felder, Defaults und Snippet-Namen.
- `email_state.content` ist die einzige Exportquelle fuer Iterable-Variablen.
- Preview-Marker oder Preview-DOM duerfen hoechstens fuer Debug oder Recovery erwaehnt werden, nie als regulaerer Happy Path.

## Iconslot-Registry

- `benefits-3col`
  - `emb_benefits_3col_col_1_icon_url`
  - `emb_benefits_3col_col_2_icon_url`
  - `emb_benefits_3col_col_3_icon_url`

Regeln:

- Erlaubte Icon-URLs duerfen nur aus `icon-library.md` kommen.
- Wenn ein Modul mit registrierten Icon-Slots gerendert wird, muessen alle diese Slots befuellt werden.
- Wenn kein Bucket klar passt, nutze den kanonischen `general-positive`-Fallback aus `icon-library.md`.

## Bildslot-Registry

### 16:9-Slots

- `hero-image-top`
  - `emb_hero_image_top_image_url`
- `hero-image-top-bleed`
  - `emb_hero_image_top_bleed_image_url`
- `hero-image-head-copy-bleed-center`
  - `emb_hero_image_head_copy_bleed_center_image_url`
- `hero-image-textbox-cta-center`
  - `emb_hero_image_textbox_cta_center_image_url`
- `hero-cta-top`
  - `emb_hero_cta_top_image_url`
- `hero-cta-top-no-bottom`
  - `emb_hero_cta_top_no_bottom_image_url`
- `teaser-1col`
  - `emb_teaser_1col_image_url`
- `teaser-2col-vertical`
  - `emb_teaser_2col_vertical_col_1_image_url`
  - `emb_teaser_2col_vertical_col_2_image_url`
- `teaser-2col-horizontal`
  - `emb_teaser_2col_horizontal_col_1_image_url`
  - `emb_teaser_2col_horizontal_col_2_image_url`
  - `emb_teaser_2col_horizontal_col_3_image_url`
  - `emb_teaser_2col_horizontal_col_4_image_url`
- `teaser-2col-gallery`
  - `emb_teaser_2col_gallery_col_1_image_url`
  - `emb_teaser_2col_gallery_col_2_image_url`
  - `emb_teaser_2col_gallery_col_3_image_url`
  - `emb_teaser_2col_gallery_col_4_image_url`

### 4:3-Slots

- `teaser-2col-alternating`
  - `emb_teaser_2col_alternating_col_1_image_url`
  - `emb_teaser_2col_alternating_col_2_image_url`
- `teaser-2col-listing`
  - `emb_teaser_2col_listing_col_1_image_url`
  - `emb_teaser_2col_listing_col_2_image_url`
  - `emb_teaser_2col_listing_col_3_image_url`
  - `emb_teaser_2col_listing_col_4_image_url`

## Unterstuetzte Module

### `logo`

- Snippet: `emb_logo`
- Preview-Quelle: `preview-modules.html`, Block `data-module="logo"`
- Sichtbare Felder:
  - Logo
- Fuellhinweis: unveraendert verwenden
- Technische Regel: statisches Export-Snippet ohne Parameter.

### `logo-centered`

- Snippet: `emb_logo_centered`
- Preview-Quelle: `preview-modules.html`, Block `data-module="logo-centered"`
- Sichtbare Felder:
  - Logo
- Fuellhinweis: verwenden, wenn das Standard-Logo zentriert statt linksbuendig erscheinen soll
- Technische Regel: statisches Export-Snippet ohne Parameter.

### `hero-image-top`

- Snippet: `emb_hero_image_top`
- Preview-Quelle: `preview-modules.html`, Block `data-module="hero-image-top"`
- Sichtbare Felder:
  - Eyebrow
  - Headline
  - Anrede
  - Body
  - Button-Label
  - Button-URL
  - Bild-URL
  - Bild-Alt
- Bildformat in der Preview: `16:9 | 960 x 540 px`
- Fuellhinweis: feste Hero-Variante mit Bild oberhalb von Body und CTA beibehalten; die Preview-Anrede bleibt immer `Hallo Anrede,`

### `hero-image-top-bleed`

- Snippet: `emb_hero_image_top_bleed`
- Preview-Quelle: `preview-modules.html`, Block `data-module="hero-image-top-bleed"`
- Sichtbare Felder:
  - Eyebrow
  - Headline
  - Anrede
  - Body
  - Button-Label
  - Button-URL
  - Bild-URL
  - Bild-Alt
- Bildformat in der Preview: `16:9 | 960 x 540 px`
- Fuellhinweis: feste Hero-Variante mit Bleed-Bild oberhalb von Body und CTA beibehalten; die Preview-Anrede bleibt immer `Hallo Anrede,`

### `hero-image-head-copy-bleed-center`

- Snippet: `emb_hero_image_head_copy_bleed_center`
- Preview-Quelle: `preview-modules.html`, Block `data-module="hero-image-head-copy-bleed-center"`
- Sichtbare Felder:
  - Bild-URL
  - Bild-Alt
  - Headline
  - Body
  - Button-Label
  - Button-URL
- Bildformat in der Preview: `16:9 | 1200 x 600 px`
- Fuellhinweis: feste Hero-Variante mit Bleed-Bild oben, zentrierter Headline, zentriertem Body und gefuelltem Brand-CTA beibehalten

### `hero-image-textbox-cta-center`

- Snippet: `emb_hero_image_textbox_cta_center`
- Preview-Quelle: `preview-modules.html`, Block `data-module="hero-image-textbox-cta-center"`
- Sichtbare Felder:
  - Headline
  - Bild-URL
  - Bild-Alt
  - Body
  - Kurzfrage
  - Feldtext in der Kontur-Flaeche
  - Button-Label
  - Button-URL
- Bildformat in der Preview: `16:9 | 960 x 540 px`
- Fuellhinweis: zentrierte Headline, Bild, zweistufiger Copy-Bereich, Kontur-Flaeche und gefuellter CTA bleiben in dieser Reihenfolge erhalten

### `hero-cta-top`

- Snippet: `emb_hero_cta_top`
- Preview-Quelle: `preview-modules.html`, Block `data-module="hero-cta-top"`
- Sichtbare Felder:
  - Eyebrow
  - Headline
  - Anrede
  - Body
  - Button-Label
  - Button-URL
  - Bild-URL
  - Bild-Alt
- Bildformat in der Preview: `16:9 | 960 x 540 px`
- Fuellhinweis: feste Hero-Variante mit Bild unterhalb von Body und CTA beibehalten; die Preview-Anrede bleibt immer `Hallo Anrede,`

### `hero-cta-top-no-bottom`

- Snippet: `emb_hero_cta_top_no_bottom`
- Preview-Quelle: `preview-modules.html`, Block `data-module="hero-cta-top-no-bottom"`
- Sichtbare Felder:
  - Eyebrow
  - Headline
  - Anrede
  - Body
  - Button-Label
  - Button-URL
  - Bild-URL
  - Bild-Alt
- Bildformat in der Preview: `16:9 | 960 x 540 px`
- Fuellhinweis: feste Hero-Variante ohne unteren Modulabschluss beibehalten; die Preview-Anrede bleibt immer `Hallo Anrede,`

### `teaser-1col`

- Snippet: `emb_teaser_1col`
- Preview-Quelle: `preview-modules.html`, Block `data-module="teaser-1col"`
- Sichtbare Felder:
  - Headline
  - Bild-URL
  - Bild-Alt
  - Body
  - Button-Label
  - Button-URL
- Bildformat in der Preview: `16:9 | 960 x 540 px`
- Fuellhinweis: Bild, Richtextbereich und CTA beibehalten

### `teaser-2col-vertical`

- Snippet: `emb_teaser_2col_vertical`
- Preview-Quelle: `preview-modules.html`, Block `data-module="teaser-2col-vertical"`
- Sichtbare Felder:
  - Headline
  - linke Spalte: Bild-URL, Bild-Alt, Body, Link-Label, Link-URL
  - rechte Spalte: Bild-URL, Bild-Alt, Body, Link-Label, Link-URL
- Bildformat in der Preview: `16:9 | 960 x 540 px` pro Spalte
- Fuellhinweis: feste Zweispalten-Struktur mit gemeinsamer Headline beibehalten

### `teaser-2col-horizontal`

- Snippet: `emb_teaser_2col_horizontal`
- Preview-Quelle: `preview-modules.html`, Block `data-module="teaser-2col-horizontal"`
- Sichtbare Felder:
  - Headline
  - bis zu vier Items mit je Bild-URL, Bild-Alt, Body, Link-Label und Link-URL
- Bildformat in der Preview: `16:9 | 960 x 540 px` pro Item
- Fuellhinweis: die hinterlegte Vier-Item-Struktur beibehalten

### `teaser-2col-alternating`

- Snippet: `emb_teaser_2col_alternating`
- Preview-Quelle: `preview-modules.html`, Block `data-module="teaser-2col-alternating"`
- Sichtbare Felder:
  - Headline
  - erste Zeile: Bild-URL, Bild-Alt, Body, Link-Label, Link-URL
  - zweite Zeile: Bild-URL, Bild-Alt, Body, Link-Label, Link-URL
- Bildformat in der Preview: `4:3 | 800 x 600 px` pro Zeile
- Fuellhinweis: die feste zweizeilige Alternating-Struktur beibehalten

### `teaser-2col-listing`

- Snippet: `emb_teaser_2col_listing`
- Preview-Quelle: `preview-modules.html`, Block `data-module="teaser-2col-listing"`
- Sichtbare Felder:
  - Headline
  - bis zu vier Items mit je Bild-URL, Bild-Alt, Body, Link-Label und Link-URL
  - optionaler Abschluss-CTA mit Button-Label und Button-URL
- Bildformat in der Preview: `4:3 | 800 x 600 px` pro Item
- Fuellhinweis: die hinterlegte Listing-Struktur beibehalten; den Abschluss-CTA nur bei Bedarf einblenden und sonst verborgen lassen

### `teaser-2col-gallery`

- Snippet: `emb_teaser_2col_gallery`
- Preview-Quelle: `preview-modules.html`, Block `data-module="teaser-2col-gallery"`
- Sichtbare Felder:
  - Headline
  - zwei bis vier Bild-URLs
  - zwei bis vier Bild-Alt-Texte
  - optionales Mobile-Flag fuer die untere Bildreihe
- Bildformat in der Preview: `16:9 | 960 x 540 px` pro Bild
- Fuellhinweis: obere Reihe immer mit zwei Bildern befuellen; die untere Reihe nur ueber `show_item_3` und `show_item_4` erweitern

### `benefits-3col`

- Snippet: `emb_benefits_3col`
- Preview-Quelle: `preview-modules.html`, Block `data-module="benefits-3col"`
- Sichtbare Felder:
  - Headline
  - drei Benefit-Texte
  - drei Icon-URLs
  - Button-Label
  - Button-URL
- Fuellhinweis: Dreierkarten-Struktur mit einem CTA darunter beibehalten; Icons nie leer lassen

### `steps-3col`

- Snippet: `emb_steps_3col`
- Preview-Quelle: `preview-modules.html`, Block `data-module="steps-3col"`
- Sichtbare Felder:
  - Headline
  - drei Schritt-Texte
  - Button-Label
  - Button-URL
- Fuellhinweis: feste Drei-Schritte-Struktur mit CTA beibehalten
- Technische Regel: Das Modul wird genau einmal exportiert. Desktop- und Mobile-Markup im echten Snippet sind reine Renderdetails und kein Export-Signal.

### `steps-horizontal`

- Snippet: `emb_steps_horizontal`
- Preview-Quelle: `preview-modules.html`, Block `data-module="steps-horizontal"`
- Sichtbare Felder:
  - Headline
  - drei Schritt-Texte
  - Button-Label
  - Button-URL
- Fuellhinweis: feste vertikale Step-Line mit drei Schritten und CTA beibehalten

### `table`

- Snippet: `emb_table`
- Preview-Quelle: `preview-modules.html`, Block `data-module="table"`
- Sichtbare Felder:
  - Headline
  - drei Spalten-Headlines
  - drei Tabellenzeilen mit je drei Zellen
  - Button-Label
  - Button-URL
- Fuellhinweis: feste Dreispalten-Tabelle mit drei Datenzeilen und CTA beibehalten

### `table-comparison`

- Snippet: `emb_table_comparison`
- Preview-Quelle: `preview-modules.html`, Block `data-module="table-comparison"`
- Sichtbare Felder:
  - Headline
  - linke Vergleichsspalte: Spalten-Headline und drei Textzeilen
  - rechte Vergleichsspalte: Spalten-Headline und drei Textzeilen
  - Button-Label
  - Button-URL
- Fuellhinweis: feste Zweispalten-Vergleichsstruktur mit je drei Punkten und CTA beibehalten

### `contact`

- Snippet: `emb_contact`
- Preview-Quelle: `preview-modules.html`, Block `data-module="contact"`
- Sichtbare Felder:
  - Headline
  - Intro-Text
  - Telefonnummer
  - Telefonzeiten
  - E-Mail-Intro
  - E-Mail-URL
  - E-Mail-Adresse
  - Abschlusszeile 1
  - Abschlusszeile 2
- Fuellhinweis: feste Kontaktstruktur mit Intro, Telefon, E-Mail und Abschluss beibehalten

### `footer`

- Snippet: `emb_footer_marketing`
- Preview-Quelle: `preview-modules.html`, Block `data-module="footer"`
- Sichtbare Felder:
  - Footer
- Fuellhinweis: unveraendert verwenden
