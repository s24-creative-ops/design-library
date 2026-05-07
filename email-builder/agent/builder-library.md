# Builder Library

Diese Datei enthaelt die fachliche Builder-Logik fuer Startkomposition, Pflichtmodule, Templates und Moduluebersicht.
Die technische Export-Wahrheit liegt in `export-map.json`.

## Agent-Upload-Bundle

- Fuer Custom-GPT-/Agent-Setups ist das Standard-Knowledge-Format eine einzelne gebuendelte Markdown-Datei mit exakten Repo-Pfadueberschriften als virtuelle Dateien.
- Der EMB Custom GPT nutzt ausschliesslich die kuratierten Runtime-Dateien aus `agent-upload/email-builder-agent/`.
- Der Upload-Ordner enthaelt:
  - `systemprompt.md`
  - `emb_knowledge.md`
- Dokumentierte Fast-Path-Starter duerfen dort zusaetzlich als direkte Upload-Dateien liegen.
- Aktuell sind das:
  - `starter-standard-blueprint.preview.html`
  - `starter-standard-blueprint.state.json`
  - `starter-ho-esg.preview.html`
  - `starter-ho-esg.state.json`
  - `starter-seeker-mle.preview.html`
  - `starter-seeker-mle.state.json`
- `agent/` bleibt die kanonische Quelle; der Upload-Ordner ist nur das daraus abgeleitete Paket.
- Dieses Bundle muss die aktiven Kern-, Preview- und Export-Regeln, die Export-Basis, den kompakten Export-Runtime-Vertrag `export-runtime.md`, den Template-Contract, den `email_state`-Contract, die zentrale Salutation-Registry `product-salutations.json`, operative Icon- und Tonalitaetsquellen, `email/templates/template-main.html` sowie alle aktiven `template-<id>.definition.json`, `template-<id>.preview.html` und `email/templates/<id>.html` enthalten.
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
  - `loft-regio-resi`
    - `template-loft-regio-resi.definition.json`
    - `template-loft-regio-resi.preview.html`
    - Iterable Template-ID `619002`
    - Preview-first bleibt Pflicht; Iterable-Export startet erst nach expliziter User-Freigabe.

- Editable Starter Blueprints:
  - `standard-blueprint`
  - `ho-esg` (`Homeowner | ESG`)
    - Fast-Path-Preview: `starter-ho-esg.preview.html`
    - Fast-Path-State: `starter-ho-esg.state.json`
  - `seeker-mle` (`Seeker | MLE`)
    - Fast-Path-Preview: `starter-seeker-mle.preview.html`
    - Fast-Path-State: `starter-seeker-mle.state.json`

## Startlogik

Der initiale Creation-Mode ist geschlossen.

Nutze beim allerersten Start genau diese Reihenfolge:

1. Explizit angefordertes Fixed Composition Template oder dokumentierter Starter Blueprint
2. Standard-Blueprint

- Der freie Blueprint-Start darf nur Module verwenden, die in `preview-module-library.md` und `preview-modules.html` vorhanden sind.
- Im Bootstrap-Start darf Preview, Composition oder Builder-State noch fehlen.
- Mit dem ersten erfolgreichen Preview-Render wird die Startkomposition zur aktuellen Composition.
- Mit jedem erfolgreichen Preview-Render wird parallel ein strukturierter `email_state` aktualisiert.
- Wenn der User explizit ein bekanntes Fixed Composition Template oder einen dokumentierten Starter Blueprint anfordert, gewinnt diese Startoption vor dem Standard-Blueprint.
- Aktive Composition-Templates sind aktuell nur:
  - `loft-snl`
  - `loft-rnl-dev`
  - `loft-regio-resi`
- Dokumentierte editable Starter Blueprints sind aktuell:
  - `standard-blueprint`
  - `ho-esg`
  - `seeker-mle`
- Die Wahl eines Composition-Templates bestimmt nur die Startkomposition und bedeutet nie automatisch Export oder Iterable-Update.
- Ein Starter Blueprint verhaelt sich wie der Standard-Blueprint: feste Erstkomposition, feste Defaults, `default_template`-Flow, direkte erste Preview, danach freie Iteration.
- Wenn der User `Create from scratch`, `from scratch`, `blank`, `frei starten` oder ohne Template-Vorgabe eine neue Mail starten will, startet der normale Mail-Flow immer sofort mit dem Standard-Blueprint.
- Fuer diesen freien Initialstart sind keine Rueckfragen zu Produkt, Thema, Ziel, Tonalitaet oder Inhalt erlaubt; die erste Preview nutzt neutrale Blindtexte und bestehende Moduldefaults.
- Fuer `Start mit Blueprint`, `Create from scratch`, `from scratch`, `blank`, `frei starten` oder sinngemaess freien Start nutzt der Agent als einzige sichtbare Startnachricht: `Ich starte nun mit dem Blueprint-Aufbau und erstelle die erste Vorschau.`
- Wenn fuer den Standard-Blueprint ein fertiges `starter-standard-blueprint.preview.html` und `starter-standard-blueprint.state.json` vorliegen, uebernimmt der Agent diese beiden Artefakte direkt als erste Preview und als ersten State.
- Dieser erste Standard-Blueprint-State ist nicht nur Referenz, sondern sofort der aktuelle operative `email_state` genau dieser Mail.
- Wenn der User `Start mit Template`, `Choose template` oder sinngemaess eine Template-Auswahl anfragt, baut der Agent noch keine freie Mail, sondern sagt genau oder sinngemaess:
  - `Bitte nenne mir die Nummer des Templates, mit dem du starten möchtest:`
  - `1. Loft | SNL`
  - `2. Loft | RNL (Dev)`
  - `3. Loft | Regio (Resi)`
  - `4. Homeowner | ESG`
  - `5. Seeker | MLE`
- Internes Template-Mapping fuer die Start-UX:
  - `1` oder `Loft | SNL` oder `loft-snl` -> `loft-snl` -> `template-loft-snl.preview.html`
  - `2` oder `Loft | RNL (Dev)` oder `loft-rnl-dev` -> `loft-rnl-dev` -> `template-loft-rnl-dev.preview.html`
  - `3` oder `Loft | Regio (Resi)` oder `loft-regio-resi` -> `loft-regio-resi` -> `template-loft-regio-resi.preview.html`
  - `4` oder `Homeowner | ESG` oder `ho-esg` -> Starter Blueprint `ho-esg`
  - `5` oder `Seeker | MLE` oder `seeker-mle` -> Starter Blueprint `seeker-mle`
- Wenn der User `1`, `2`, `3`, `4`, `5`, einen Anzeigenamen oder die technische ID nennt, startet der Agent direkt mit diesem Template und nutzt als sichtbaren Startsatz: `Ich starte nun mit dem Template „<Anzeigename>“ und erstelle die erste Vorschau.`
- Beim allerersten Start eines aktiven Composition-Templates ist ausschliesslich die jeweilige `template-<template_id>.preview.html` die visuelle Quelle.
- In diesem initialen Template-Start sind freie Modulplanung, Einzelmodulsuche, Modulrekonstruktion, generische Ersatzmodule und `preview-modules.html` als primaere visuelle Quelle verboten.
- Starter Blueprints nutzen keine `template-*.preview.html`, keine Composition-Template-Pruefung und keine neue Copy-Generierung.
- Wenn fuer einen Starter Blueprint ein fertiges `starter-<id>.preview.html` und `starter-<id>.state.json` vorliegen, uebernimmt der Agent diese beiden Artefakte direkt als erste Preview und als ersten State.
- Dieser erste Starter-State ist nicht nur Referenz, sondern sofort der aktuelle operative `email_state` genau dieser Mail.
- Preview und Starter-State gelten damit sofort als zusammengehoerige Arbeitsbasis derselben Mail; ein zusaetzlicher separater Export-State wird fuer diesen unveraenderten Startfall nicht erwartet.
- Fuer den Standard-Blueprint sowie fuer Auswahl `4` und `5` sind im Upload-Paket die separaten `starter-*.preview.html`- und `starter-*.state.json`-Dateien die primaere Quelle; `emb_knowledge.md` bleibt allgemeines Wissen, ist fuer diese Langartefakte aber nicht mehr die primaere Upload-Quelle.
- Wenn diese direkten Starter-Dateien fuer `4` oder `5` im Upload-Paket fehlen, stoppt der Agent statt aus `emb_knowledge.md`, `preview-modules.html` oder anderen Quellen neu zu rekonstruieren.
- `1` bis `3` bleiben die einzigen Fixed Composition Templates in der Startauswahl. `4` und `5` sind immer Editable Starter Blueprints im `default_template`-Flow.
- Diese Startauswahl gilt nur fuer den ersten Start einer neuen Mail; ein spaeterer Export derselben Mail nutzt nie erneut diese Auswahl, sondern immer den aktuellen `email_state`.
- Fuer `ho-esg` sind diese Fast-Path-Artefakte die einzige kanonische Quelle fuer:
  - die erste sichtbare Preview
  - die feste Erstkomposition
  - die festen Preset-Texte
  - die vier aufgeloesten `servicetiles`-Services `ELE`, `NDG`, `EA48`, `KWATT`
- Beim `ho-esg`-Start darf der Agent deshalb weder Module neu zusammensuchen noch Services neu aufloesen noch die erste Copy neu formulieren.
- Fuer `seeker-mle` sind diese Fast-Path-Artefakte die einzige kanonische Quelle fuer:
  - die erste sichtbare Preview
  - die feste Erstkomposition
  - die festen Preset-Texte
  - die feste Modulfolge `logo-centered`, `hero-fakeform-buttons-image`, `benefits-3col`, `teaser-1col`, `contact-signoff`, `footer`
- Beim `seeker-mle`-Start darf der Agent deshalb weder Module neu zusammensuchen noch die erste Copy neu formulieren.
- `5` / `Seeker | MLE` / `seeker-mle` ist ein absoluter Fast-Path:
  - keine Composition-Template-Pruefung
  - keine Suche nach `template-*.preview.html`
  - keine Modulplanung
  - keine Modulherleitung
  - keine Copy-Generierung
  - kein Lesen aus `preview-modules.html` als primaere Quelle
  - sofort `starter-seeker-mle.preview.html` als erste Preview
  - sofort `starter-seeker-mle.state.json` als erster State
- Solange nach dem Starter-Start keine inhaltliche oder strukturelle Aenderung erfolgt, bleibt der direkt gesetzte `starter-*.state.json` unveraendert der aktuelle `email_state` und damit die Exportquelle.
- Dasselbe gilt fuer den unveraenderten Standard-Blueprint-Start: `starter-standard-blueprint.state.json` bleibt Exportquelle, bis der User diese Mail aendert.
- Dieser Starter Blueprint ist kein Composition-Template:
  - `templateContext.mode = default_template`
  - `templateContext.resolvedBaseTemplateId = 569946`
  - kein `compositionTemplateId`
  - kein `iterableTemplateId`
- Beim Start von Templates oder Starter Blueprints gibt der Agent nie HTML, Quelltext, sichtbaren State oder Modulmarkup im Chat aus; er sendet nur den kurzen Startsatz und erstellt dann direkt die Preview im Canvas.
- Erst nach der ersten erfolgreichen Template-Preview gelten fuer Modul-Aenderungen wieder die normalen Source-Fidelity-Regeln ueber bestehende Modulquellen.
- Wenn der User beim allerersten Start nur eine freie Modulliste nennt, darf diese Struktur noch nicht direkt gebaut werden; der Agent klaert kurz, ob mit dem Standard-Blueprint oder einem aktiven Composition-Template gestartet werden soll.
- Erst nach dem ersten erfolgreichen Preview-Render darf die bestehende Mail frei um Module erweitert, reduziert, ersetzt oder umsortiert werden.

## Salutation-Kontext

- Die zentrale Registry fuer Anrede-Zuordnungen ist `agent/product-salutations.json`.
- `salutationContext` ist ein eigener Resolver-Kontext fuer Anrede-Logik und getrennt von `templateContext` und vom inhaltlichen Produktkontext.
- Der Resolver arbeitet in genau dieser Reihenfolge:
  1. `salutation_context_id` des aktiven Composition-Templates
  2. explizite User-Nennung ueber `aliases` oder `template_ids` aus `agent/product-salutations.json`
  3. freier Initialstart ohne erkennbare Zuordnung -> `generic`
  4. spaetere explizite User-Nennung oder eindeutige Iteration darf den Kontext weiter verfeinern
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
- Wenn die finale Modulfolge eines der Center-Hero-Module `hero-image-top-center`, `hero-image-top-bleed-center`, `hero-cta-top-center`, `hero-cta-top-no-bottom-center`, `hero-image-head-copy-bleed-center`, `hero-image-textbox-cta-center` oder `hero-fakeform-buttons-image` enthaelt, muss das Pflicht-Logo an Position `1` als `logo-centered` statt `logo` aufgeloest werden.
- Diese Logo-Normalisierung aendert nur das Logo-Modul; die Reihenfolge der Mail bleibt unveraendert.

## Hintergrund-Rhythmus

- Der Hintergrund-Rhythmus wird erst angewendet, nachdem die finale Modulfolge feststeht und alle Pflichtmodule korrekt eingesetzt wurden.
- Die verbindliche technische Farbquelle fuer die Rhythmus-Aufloesung ist `agent/preview-styles.css`.
- Dort gelten fuer den produktiven Hintergrund-Rhythmus genau diese Flaechenwerte:
  - weiss / white = `#FFFFFF` aus `--surface-white`
  - grau / gray = `#F5F5F5` aus `--surface-gray`
- Alle Hero-Varianten haben immer weissen Hintergrund.
- `logo`, `footer`, `contact` und `contact-signoff` haben immer weissen Hintergrund.
- `logo`, `footer`, `contact` und `contact-signoff` sind feste Struktur-/Utility-Module und nehmen nicht an der Hintergrund-Alternierung teil.
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
- Nach Einfuegen, Entfernen oder Umsortieren von Content-Modulen muss der komplette Hintergrund-Rhythmus fuer die gesamte finale Modulfolge neu materialisiert werden.
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

- Subject: neutraler Blindtext in einem Satz
- Preheader: neutrale kurze Ergaenzung zum Subject
- Hero: neutrale Blindtext-Headline, kurzer neutraler Einstieg und CTA `Mehr erfahren`
- `steps-3col`: drei kurze neutrale Blindtext-Schritte plus CTA mit bestehendem Standardziel

Wenn kein Thema genannt ist:

- neutrale Blindtexte oder lorem-ipsum-nahe Platzhalter verwenden
- keine Rueckfragepflicht fuer den ersten Wurf
- Fuer Demo-CTAs ohne explizites User-Ziel die kanonische Standard-URL `https://www.immobilienscout24.de/` verwenden.

## Direkte User-Module

- Diese Regeln gelten erst nach der ersten erfolgreichen Preview oder wenn eine bestehende Preview fortgeschrieben wird.
- Vor der ersten Preview ist freie Modulwahl nicht erlaubt; dann gilt ausschliesslich die geschlossene Startlogik aus `## Startlogik`.
- Bei bestehenden Preview-Modulen darf nach der Auswahl des passenden `data-module`-Blocks aus `agent/preview-modules.html` nur Feldinhalt ersetzt werden; Wrapper, Klassen, Responsive-Klassen, Tabellenstruktur und Inline-Styles bleiben unveraendert.
- Umliegende bereits korrekt gesetzte Module bleiben bei spaeteren Aenderungen zustandsbasiert erhalten und duerfen nicht aus aehnlichen Modulen oder Beschreibungen neu konstruiert werden.
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
- Wenn die finale Modulfolge eines der Center-Hero-Module `hero-image-top-center`, `hero-image-top-bleed-center`, `hero-cta-top-center`, `hero-cta-top-no-bottom-center`, `hero-image-head-copy-bleed-center`, `hero-image-textbox-cta-center` oder `hero-fakeform-buttons-image` enthaelt oder eine bestehende Hero-Variante dorthin gewechselt wird, muss ein vorhandenes `logo` an derselben Position zu `logo-centered` normalisiert werden.
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
| `hero-fakeform-buttons-image` | `emb_hero_fakeform_buttons_image` |
| `hero-cta-top` | `emb_hero_cta_top` |
| `hero-cta-top-center` | `emb_hero_cta_top_center` |
| `hero-cta-top-no-bottom` | `emb_hero_cta_top_no_bottom` |
| `hero-cta-top-no-bottom-center` | `emb_hero_cta_top_no_bottom_center` |
| `teaser-1col` | `emb_teaser_1col` |
| `loft-snl-copy-cta` | `emb_loft_snl_copy_cta` |
| `loft-snl-copy-sections-cta` | `emb_loft_snl_copy_sections_cta` |
| `loft-rnl-dev-intro` | `emb_loft_rnl_dev_intro` |
| `loft-rnl-dev-teaser-1col` | `emb_loft_rnl_dev_teaser_1col` |
| `loft-regio-resi-intro` | `emb_loft_regio_resi_intro` |
| `loft-regio-resi-teaser-1col` | `emb_loft_regio_resi_teaser_1col` |
| `teaser-2col-horizontal` | `emb_teaser_2col_horizontal` |
| `teaser-2col-vertical` | `emb_teaser_2col_vertical` |
| `teaser-2col-alternating` | `emb_teaser_2col_alternating` |
| `teaser-2col-listing` | `emb_teaser_2col_listing` |
| `teaser-2col-gallery` | `emb_teaser_2col_gallery` |
| `benefits-3col` | `emb_benefits_3col` |
| `servicetiles` | `emb_servicetiles` |
| `steps-3col` | `emb_steps_3col` |
| `steps-horizontal` | `emb_steps_horizontal` |
| `table` | `emb_table` |
| `table-comparison` | `emb_table_comparison` |
| `contact` | `emb_contact` |
| `contact-signoff` | `emb_contact_signoff` |
| `footer` | `emb_footer_marketing` |

Bewusst nicht angebunden:

- `servicetiles-4up`

## Service Products Registry

- Die zentrale Produktquelle fuer das spaetere Modul `servicetiles` ist `agent/service-products.json`.
- Diese Registry enthaelt pro Service genau:
  - `id`
  - `original_snippet_name`
  - `aliases`
  - `title`
  - `description`
  - `icon_url`
  - `target_url`
- User nennen im EMB fachlich genau `4` Services; die Aufloesung erfolgt nur ueber `id` oder `aliases` der Registry.
- Wenn weniger oder mehr als `4` Services genannt werden, muss der Agent nachfragen statt still zu normalisieren.
- Wenn ein genannter Service nicht eindeutig in `agent/service-products.json` vorhanden ist, muss der Agent nachfragen und darf nicht raten.
- Die bestehenden `servicetile_*`-Snippets bleiben nur Migrations- und Datenquelle; sie sind nicht das technische Zielmodell des spaeteren `servicetiles`-Moduls.
- User sehen im regulaeren EMB-Flow keine Iterable-Snippetnamen.

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
- Wenn `RLE` explizit als Produkt genannt oder ueber `salutationContext = rle` aufgeloest wurde, bleibt die Preview-Hero-Anrede in allen elf Hero-Modulen die normale sichtbare Vorschau-Anrede:
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
- Editable Starter Blueprints wie `ho-esg` oder `seeker-mle` nutzen ebenfalls immer:
  - `templateContext.mode = default_template`
  - `templateContext.resolvedBaseTemplateId = 569946`
  - kein `compositionTemplateId`
  - kein `iterableTemplateId`
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
- `Exportiere die Mail zu Iterable` bedeutet immer Export der aktuell bestehenden Mail; diese Anweisung startet nie erneut Blueprint-, Starter- oder Template-Auswahl.
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
- Starter-Artefakte und Template-Preview-Dateien sind Startquellen, aber keine regulaeren Exportquellen fuer eine bereits bestehende Mail mit gueltigem State.
- Unknown Fields sind Export-Fehler.
- Felder ohne Content und ohne Default werden nicht frei erfunden.
- Detaillierte Export- und Shell-Logik steht in `export-rules.md`.

## Modulhinweise

### `logo`

- Snippet: `emb_logo`
- Statisches Snippet ohne Export-Parameter.

### `logo-centered`

- Snippet: `emb_logo_centered`
- Pflicht-Logo, wenn die Mail eines der Center-Hero-Module `hero-image-top-center`, `hero-image-top-bleed-center`, `hero-cta-top-center`, `hero-cta-top-no-bottom-center`, `hero-image-head-copy-bleed-center`, `hero-image-textbox-cta-center` oder `hero-fakeform-buttons-image` enthaelt.
- Nur verwenden, wenn das Standard-Logo zentriert statt linksbuendig erscheinen soll.
- Statisches Snippet ohne Export-Parameter.

### Hero-Module

- `hero-image-top`, `hero-image-top-center`, `hero-image-top-bleed`, `hero-image-top-bleed-center`, `hero-image-head-copy-bleed-center`, `hero-image-textbox-cta-center`, `hero-fakeform-buttons-image`, `hero-cta-top`, `hero-cta-top-center`, `hero-cta-top-no-bottom` und `hero-cta-top-no-bottom-center` sind feste Varianten.
- Hero-Strukturwuensche werden nur durch Modultausch geloest, nie durch internes Umordnen.
- `preheadline` und Badge sind gegenseitig exklusiv.
- Alle elf Hero-Module nutzen fuer die optionale Anrede vor dem Body denselben Feldvertrag:
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
  - Wenn das kanonische `emb_hero_image_top_headline_size` in einem bestehenden State fehlt oder leer ist, wird fuer Builder, Preview und Export direkt der Default `l` angenommen und die Bridge-Felder werden daraus auf `false / true` materialisiert.
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
  - Wenn das kanonische `emb_hero_image_top_center_headline_size` in einem bestehenden State fehlt oder leer ist, wird fuer Builder, Preview und Export direkt der Default `l` angenommen und die Bridge-Felder werden daraus auf `false / true` materialisiert.
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
  - Wenn das kanonische `emb_hero_image_top_bleed_headline_size` in einem bestehenden State fehlt oder leer ist, wird fuer Builder, Preview und Export direkt der Default `l` angenommen und die Bridge-Felder werden daraus auf `false / true` materialisiert.
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
  - Wenn das kanonische `emb_hero_image_top_bleed_center_headline_size` in einem bestehenden State fehlt oder leer ist, wird fuer Builder, Preview und Export direkt der Default `l` angenommen und die Bridge-Felder werden daraus auf `false / true` materialisiert.
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
  - Wenn das kanonische `emb_hero_image_head_copy_bleed_center_headline_size` in einem bestehenden State fehlt oder leer ist, wird fuer Builder, Preview und Export direkt der Default `l` angenommen und die Bridge-Felder werden daraus auf `false / true` materialisiert.
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
  - Wenn das kanonische `emb_hero_image_textbox_cta_center_headline_size` in einem bestehenden State fehlt oder leer ist, wird fuer Builder, Preview und Export direkt der Default `l` angenommen und die Bridge-Felder werden daraus auf `false / true` materialisiert.
  - Legacy-Bridge-Felder sind nur technische Kompatibilitaetsfelder; `true/true` gleichzeitig ist ungueltig und muss fail-closed stoppen.
  - Es gibt kein freies Headline-Style-, HTML- oder CSS-Feld fuer dieses Modul.
- Export-Hinweis:
  - `entry_url` kommt im produktiven E-Mail-Modul vor dem sichtbaren `entry_text`, weil die Kontur-Flaeche als kompletter Link gerendert wird.
  - Fuer den Export ist genau diese Reihenfolge verbindlich.

### `hero-fakeform-buttons-image`

- Snippet: `emb_hero_fakeform_buttons_image`
- Layout: zentrierte Hero-Headline, vertikal gestapelte Auswahlbuttons, Bild, Anrede, Body und finaler Brand-CTA.
- Verbindlicher Snippet-Call-Vertrag: genau 31 Snippet-Parameter in dieser Reihenfolge
  - `emb_hero_fakeform_buttons_image_bg_color`
  - `emb_hero_fakeform_buttons_image_show_small_headline`
  - `emb_hero_fakeform_buttons_image_show_large_headline`
  - `emb_hero_fakeform_buttons_image_headline`
  - `emb_hero_fakeform_buttons_image_choice_button_1_url`
  - `emb_hero_fakeform_buttons_image_choice_button_1_label`
  - `emb_hero_fakeform_buttons_image_show_item_2`
  - `emb_hero_fakeform_buttons_image_choice_button_2_url`
  - `emb_hero_fakeform_buttons_image_choice_button_2_label`
  - `emb_hero_fakeform_buttons_image_show_item_3`
  - `emb_hero_fakeform_buttons_image_choice_button_3_url`
  - `emb_hero_fakeform_buttons_image_choice_button_3_label`
  - `emb_hero_fakeform_buttons_image_show_item_4`
  - `emb_hero_fakeform_buttons_image_choice_button_4_url`
  - `emb_hero_fakeform_buttons_image_choice_button_4_label`
  - `emb_hero_fakeform_buttons_image_show_item_5`
  - `emb_hero_fakeform_buttons_image_choice_button_5_url`
  - `emb_hero_fakeform_buttons_image_choice_button_5_label`
  - `emb_hero_fakeform_buttons_image_show_item_6`
  - `emb_hero_fakeform_buttons_image_choice_button_6_url`
  - `emb_hero_fakeform_buttons_image_choice_button_6_label`
  - `emb_hero_fakeform_buttons_image_image_url`
  - `emb_hero_fakeform_buttons_image_image_alt`
  - `emb_hero_fakeform_buttons_image_show_salutation`
  - `emb_hero_fakeform_buttons_image_use_snippetcall_salutation`
  - `emb_hero_fakeform_buttons_image_salutation`
  - `emb_hero_fakeform_buttons_image_body`
  - `emb_hero_fakeform_buttons_image_button_url`
  - `emb_hero_fakeform_buttons_image_button_bg_color`
  - `emb_hero_fakeform_buttons_image_button_border_color`
  - `emb_hero_fakeform_buttons_image_button_label`
- Headline-Groessenvariante:
  - `emb_hero_fakeform_buttons_image_headline_size` ist das einzige kanonische Groessenfeld.
  - `emb_hero_fakeform_buttons_image_headline_size` gehoert zum kanonischen State-/Exportvertrag, ist aber kein direkt gerenderter Snippet-Parameter.
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
    - `s` => `emb_hero_fakeform_buttons_image_show_small_headline = true` und `emb_hero_fakeform_buttons_image_show_large_headline = false`
    - `m` => `emb_hero_fakeform_buttons_image_show_small_headline = false` und `emb_hero_fakeform_buttons_image_show_large_headline = false`
    - `l` => `emb_hero_fakeform_buttons_image_show_small_headline = false` und `emb_hero_fakeform_buttons_image_show_large_headline = true`
  - Neue Default-States fuer dieses Modul muessen immer `emb_hero_fakeform_buttons_image_headline_size = l`, `emb_hero_fakeform_buttons_image_show_small_headline = false` und `emb_hero_fakeform_buttons_image_show_large_headline = true` erzeugen.
  - Wenn das kanonische `emb_hero_fakeform_buttons_image_headline_size` in einem bestehenden State fehlt oder leer ist, wird fuer Builder, Preview und Export direkt der Default `l` angenommen und die Bridge-Felder werden daraus auf `false / true` materialisiert.
  - Legacy-Bridge-Felder sind nur technische Kompatibilitaetsfelder; `true/true` gleichzeitig ist ungueltig und muss fail-closed stoppen.
  - Es gibt kein freies Headline-Style-, HTML- oder CSS-Feld fuer dieses Modul.
- Button-Regel:
  - Default sichtbar sind `5` Auswahlbuttons; das Modul unterstuetzt technisch `2` bis `6`.
  - Button `1` bleibt immer sichtbar.
  - `show_item_2` bleibt fuer dieses Modul verpflichtend `true`, damit die Mindestanzahl `2` eingehalten wird.
  - `show_item_3..6` steuern die spaeteren Auswahlbuttons.
  - Die Auswahlbuttons nutzen im ersten produktiven Stand das bestehende Pattern `button-outline-strong`.
  - Der finale CTA nutzt wie andere Hero-Module `button-filled-brand`.

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
  - Wenn das kanonische `emb_hero_cta_top_headline_size` in einem bestehenden State fehlt oder leer ist, wird fuer Builder, Preview und Export direkt der Default `l` angenommen und die Bridge-Felder werden daraus auf `false / true` materialisiert.
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
  - Wenn das kanonische `emb_hero_cta_top_center_headline_size` in einem bestehenden State fehlt oder leer ist, wird fuer Builder, Preview und Export direkt der Default `l` angenommen und die Bridge-Felder werden daraus auf `false / true` materialisiert.
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
  - Wenn das kanonische `emb_hero_cta_top_no_bottom_headline_size` in einem bestehenden State fehlt oder leer ist, wird fuer Builder, Preview und Export direkt der Default `l` angenommen und die Bridge-Felder werden daraus auf `false / true` materialisiert.
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
- `loft-regio-resi-intro` ist ein template-spezifisches Loft-Regio-Resi-Intro mit editierbarer `heading-l`-Headline, kontrolliertem Salutation-Feld und einem frei editierbaren `rich_full`-Body.
- Das Modul nutzt genau diese Builder-Felder:
  - `emb_loft_regio_resi_intro_headline`
  - `emb_loft_regio_resi_intro_salutation`
  - `emb_loft_regio_resi_intro_body`
- In der Preview bleibt `emb_loft_regio_resi_intro_salutation` menschenlesbarer Plain Text `Hallo Anrede`.
- Die finale EMB-Preview materialisiert die Intro-Headline im Markup explizit als `font-heading-large-bold`, damit die bestehende `heading-l`-Typografie ohne Loft-Sonderannahmen im Preview-Pfad landet.
- Fuer `salutationContext = loft-regio-resi` wird der produktive Exportwert von `emb_loft_regio_resi_intro_salutation` kontrolliert aus `agent/product-salutations.json` materialisiert.
- `loft-regio-resi-teaser-1col` ist ein template-spezifisches Loft-Regio-Residential-Modul mit `heading-l`-Headline, Richtext-Body, Bild, drei editierbaren Kennzahlen und CTA.
- `loft-regio-resi-teaser-1col` ist repeatable; neue Instanzen werden direkt nach der letzten vorhandenen Instanz derselben `module_id` eingefuegt.
- `loft-regio-resi-teaser-1col` nutzt fuer `emb_loft_regio_resi_teaser_1col_bg_color` immer den globalen Hintergrund-Rhythmus:
  - erste Instanz nach dem Intro = grau `#F5F5F5`
  - zweite Instanz = weiss `#FFFFFF`
  - danach strikt weiter grau, weiss, grau, weiss
- Die Kennzahlen von `loft-regio-resi-teaser-1col` sind keine getrennten Desktop-/Mobile-Felder; dieselben `metric_1..3_label`- und `metric_1..3_value`-Felder speisen die Desktop-Dreispalter und die mobile Bullet-Liste.
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
  - Wenn das kanonische `emb_hero_cta_top_no_bottom_center_headline_size` in einem bestehenden State fehlt oder leer ist, wird fuer Builder, Preview und Export direkt der Default `l` angenommen und die Bridge-Felder werden daraus auf `false / true` materialisiert.
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

### `servicetiles`

- Snippet: `emb_servicetiles`
- Das Modul rendert genau eine Headline und genau vier Service-Cards.
- Fachlich genannte Services werden vor Preview und Export ausschliesslich ueber `agent/service-products.json` via `id` oder `aliases` aufgeloest.
- Wenn nicht genau `4` Services eindeutig aufloesbar sind, muss der Agent nachfragen und darf das Modul nicht stillschweigend normalisieren.
- Der produktive Snippet-Vertrag rendert nur die aufgeloesten Card-Felder:
  - `emb_servicetiles_headline`
  - `emb_servicetiles_col_1_url`
  - `emb_servicetiles_col_1_icon_url`
  - `emb_servicetiles_col_1_title`
  - `emb_servicetiles_col_1_description`
  - `emb_servicetiles_col_2_url`
  - `emb_servicetiles_col_2_icon_url`
  - `emb_servicetiles_col_2_title`
  - `emb_servicetiles_col_2_description`
  - `emb_servicetiles_col_3_url`
  - `emb_servicetiles_col_3_icon_url`
  - `emb_servicetiles_col_3_title`
  - `emb_servicetiles_col_3_description`
  - `emb_servicetiles_col_4_url`
  - `emb_servicetiles_col_4_icon_url`
  - `emb_servicetiles_col_4_title`
  - `emb_servicetiles_col_4_description`
- Fachliche Service-Namen und `original_snippet_name` sind Resolver-Eingaben, aber keine direkten Snippet-Parameter des finalen Moduls.
- Das E-Mail-Markup bleibt ein einzelnes Modul mit `2 x 2` auf Desktop und `1` Spalte auf Mobile; diese Layoutlogik ist reine Renderlogik und kein zweites Export-Signal.

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
- `contact` hat immer weissen Hintergrund und nutzt kein editierbares oder alternierendes `bg_color`-Feld.
- Das Contact-Modul nutzt an der bestehenden Placeholder-Position optional genau diese Bildfelder:
  - `emb_contact_show_image`
  - `emb_contact_image_url`
  - `emb_contact_image_alt`
- Ohne echte Bild-URL bleibt in der Preview der vorhandene Avatar-Placeholder sichtbar und im E-Mail-Snippet der neutrale graue Kreis aktiv.

### `footer`

- `emb_footer_marketing` bleibt im Minimal-Setup parameterlos.
