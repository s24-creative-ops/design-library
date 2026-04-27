# Module Rules

## Grundsatz

Neue Module werden immer zuerst in `preview/modules/` gebaut.

Erst wenn die Preview-Fassung in Struktur, Inhalt und Verhalten final ist, wird die zugehoerige finale HTML-Fassung in `email/modules/` angelegt oder nachgezogen.

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
- Pro Mail ist hoechstens ein `button-filled-brand` erlaubt.

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
- `hero-cta-top`
- `hero-cta-top-no-bottom`
- `teaser-1col`
- `teaser-1col-eyebrow`
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

Bewusst ausserhalb des aktiven Kernpfads:
- `logo-viessmann`
- `servicetiles-4up`
- `teaser-2col-listing-compact`
