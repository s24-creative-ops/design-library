# Builder Library

## Rolle

Diese Datei ist der kompakte Agent-Katalog fuer Komposition, Pflichtmodule, Modulverwendung und den Nachzug in `email/` und `agent/`.

Die Produktionswahrheit liegt weiterhin in:
- `preview/`
- `email/`
- `preview/modules/`
- `preview/templates/`
- `../design-system/tokens/brands/immoscout24.json`

## Pflichtmodule

- Logo immer an Position `1`
- Hero immer an Position `2`
- Footer immer am Ende

Standardpflichtmodule:
- `logo`
- `hero-image-top`
- `footer`

## Aktive Kernmodule

- `logo`
- `logo-centered`
- `hero-image-top`
- `hero-image-top-bleed`
- `hero-cta-top`
- `hero-cta-top-no-bottom`
- `teaser-1col`
- `teaser-2col-horizontal`
- `teaser-2col-vertical`
- `teaser-2col-alternating`
- `teaser-2col-listing`
- `benefits-3col`
- `steps-3col`
- `steps-horizontal`
- `table`
- `table-comparison`
- `contact`
- `footer`

Nicht Teil dieses Kernpfads:
- `logo-viessmann`
- `servicetiles-4up`
- `teaser-2col-listing-compact`
- `template-vissmann` / `viessmann`

## Hintergrund-Rhythmus

- Alle Hero-Varianten: weiss
- Footer: weiss
- Standard nach dem Hero: grau, weiss, grau, weiss
- Ausnahme `hero-cta-top-no-bottom`: weiss, grau, weiss, grau

## CTA-Modell

- Kanonische Button-Typen:
  - `button-filled-brand`
  - `button-filled-default`
  - `button-outline-strong`
  - `button-outline-weak`
- `teaser-link` und `contact-link` sind keine Buttons.
- Pro Mail hoechstens ein `button-filled-brand`.

## Template

Aktives Kerntemplate:
- `template-main`

Wichtige Ableitung:
- Preview-Shell aus `preview-template.html`
- aktive E-Mail-Templates unter `../email/templates/`
- aktive Produktionsquellen unter `../preview/templates/` und `../email/templates/`

## Sync-Pflicht

Wenn ein Modul geaendert wird, pruefe immer zusammen:
- `../preview/modules/<modul>.html`
- `../email/modules/<snippet>.html`
- `../preview/modules/catalog.yaml`
- `../preview/brand-map.json`
- `../preview/modules/rules.md`
- `../../design-system/tokens/brands/immoscout24.json`
- `../AGENTS.md`
- `../../design-system/design-library/index.html`
- `preview-modules.html`
- `preview-module-library.md`
- `components.css`

Wenn ein Template geaendert wird, pruefe immer zusammen:
- `../preview/templates/<template>.html`
- `../email/templates/<template>.html`
- `../preview/templates/catalog.yaml`
- `../preview/brand-map.json`
- `../preview/templates/rules.md`
- `../../design-system/tokens/brands/immoscout24.json`
- `../AGENTS.md`
- `../../design-system/design-library/index.html`
- `preview-template.html`
- `export-rules.md`
- `components.css`
