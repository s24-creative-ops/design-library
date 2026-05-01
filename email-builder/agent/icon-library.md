# Purpose

Builder-interne Single Source of Truth fuer erlaubte Benefit-Icons im E-Mail Builder.

# Usage

- Diese Datei ist eine reine Datenquelle.
- Keine Renderlogik.
- Keine freie Auswahl- oder Renderlogik ausserhalb des hier definierten kanonischen Fallbacks.
- Keine HTML-Ausgabe.
- Erlaubte Icon-URLs duerfen nur aus dieser Datei kommen.
- Operativ wird diese Datei aktuell nur fuer `benefits-3col` verwendet.

# Canonical Fallback

- Wenn kein Bucket klar passt, nutze `icon-11` aus `general-positive` als kanonischen neutralen Fallback.
- Fallback-URL: `https://www.static-immobilienscout24.de/fro/emb/_/s24_checkmark_circle_48.png`

# Buckets

- `security-trust`: Sicherheit, Vertrauen, gepruefte Qualitaet
- `general-positive`: allgemeiner Vorteil, neutraler positiver Fallback
- `price-saving`: Preis, Sparen, transparente Kosten
- `speed-process`: Geschwindigkeit, effizienter Ablauf, strukturierter Prozess
- `performance-success`: Leistung, Sichtbarkeit, Erfolg
- `expertise-advice`: Fachwissen, Beratung, professionelle Begleitung
- `communication-service`: Kontakt, Betreuung, Service, Kommunikation
- `reach-location`: Reichweite, Lage, Zielerreichung
- `home-property`: Immobilie, Zuhause, Objektbezug
- `target-group`: Nutzerinnen, Nutzer, Zielgruppe
- `documents-contract`: Unterlagen, Dokumente, Vertrag
- `calendar-time`: Termin, Planung, Zeit
- `support-clarity`: Hilfe, Orientierung, Klarheit
- `digital-comfort`: digitale, komfortable Abwicklung

# Icons

## security-trust

- `icon-09`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_shield_checkmark_48.png`
  - meaning: `Sicherheit und gepruefte Anbieter`
- `icon-17`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_lock_close_48.png`
  - meaning: `Sicherheit und Schutz`
- `icon-18`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_user_tie_48.png`
  - meaning: `Vertrauensvolle Begleitung`

## general-positive

- `icon-10`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_smiley_positive_48.png`
  - meaning: `Allgemeiner positiver Vorteil`
- `icon-11`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_checkmark_circle_48.png`
  - meaning: `Allgemeiner Vorteil bestaetigt`
- `icon-12`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_thump_up_48.png`
  - meaning: `Positiver Servicevorteil`
- `icon-13`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_checkmark_48.png`
  - meaning: `Allgemeiner Nutzen`
- `icon-38`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_checkmark_48.png`
  - meaning: `Allgemeiner Vorteil`
- `icon-39`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_smiley_positive_48.png`
  - meaning: `Allgemeiner Servicevorteil`

## price-saving

- `icon-14`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_piggy_bank_48.png`
  - meaning: `Sparvorteil`
- `icon-15`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_euro_circle_48.png`
  - meaning: `Preisvorteile`
- `icon-16`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_plus_nebenkosten_check_48.png`
  - meaning: `Transparente Kosten`

## speed-process

- `icon-19`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_stopwatch_48.png`
  - meaning: `Schneller Ablauf`
- `icon-20`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_arrows_cycle_48.png`
  - meaning: `Strukturierter Prozess`
- `icon-21`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_timer_48.png`
  - meaning: `Zuegiger Abschluss`

## performance-success

- `icon-22`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_chart_48.png`
  - meaning: `Starke Performance`
- `icon-23`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_chart_bars_vertical_48.png`
  - meaning: `Mehr Sichtbarkeit`
- `icon-24`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_thump_up_48.png`
  - meaning: `Erfolgreiche Vermarktung`

## expertise-advice

- `icon-25`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_user_tie_48.png`
  - meaning: `Fachkundige Beratung`
- `icon-26`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_user_checkmark_48.png`
  - meaning: `Professionelle Unterstuetzung`

## communication-service

- `icon-27`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_chat_bubble_2_48.png`
  - meaning: `Kommunikation und Kontakt`
- `icon-28`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_user_tie_48.png`
  - meaning: `Persoenliche Betreuung`
- `icon-42`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_letter_sent_48.png`
  - meaning: `E-Mail-Kommunikation`

## reach-location

- `icon-29`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_location_pin_2_48.png`
  - meaning: `Immobilie und Lage`
- `icon-30`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_users_three_48.png`
  - meaning: `Reichweite und Zielgruppen`

## home-property

- `icon-41`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_map_magnifier_48.png`
  - meaning: `Immobilie und Zuhause`

## target-group

- `icon-43`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_users_three_48.png`
  - meaning: `Zielgruppen und Nutzerinnen`

## documents-contract

- `icon-31`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_document_check_48.png`
  - meaning: `Unterlagen und Dokumente`
- `icon-32`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_document_lock_48.png`
  - meaning: `Vertrag und Vereinbarungen`
- `icon-33`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_document_pdf_48.png`
  - meaning: `Dokumente und Formulare`

## calendar-time

- `icon-34`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_calendar_checkmark_48.png`
  - meaning: `Termin und Planung`
- `icon-35`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_timer_48.png`
  - meaning: `Schnelle Terminprozesse`

## support-clarity

- `icon-36`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_lightbulb_48.png`
  - meaning: `Hilfe und Unterstuetzung`

## digital-comfort

- `icon-40`
  - url: `https://www.static-immobilienscout24.de/fro/emb/_/s24_arrows_cycle_48.png`
  - meaning: `Digitale und komfortable Abwicklung`
