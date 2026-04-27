# Preview Rules

Diese Datei ist die einzige operative Preview-Regelbasis im flachen Agent-Satz unter `builder/`.
Die uebrigen operativen Agent-Dateien liegen direkt daneben in `builder/`.

## Zweck

Die Preview ist die sichtbare HTML-Arbeitsmail im Canvas und die Basis fuer spaetere Iterationen.

## Output

- Jede Preview muss als HTML-Code-Datei im Canvas erstellt oder aktualisiert werden.
- Eine Chat-Outline, Textzusammenfassung oder Blueprint-Antwort ist keine zulaessige Preview.
- Subject, Preheader, Modulfolge und Modulinhalt muessen in der HTML-Preview selbst vorliegen.

## Render-Regeln

- Starte jede Preview mit einer exakten Kopie von `preview-template.html`.
- Ersetze nur `[data-preview-subject-text]`, `[data-preview-preheader-text]` und den Bereich zwischen den Modul-Slot-Kommentaren.
- Modulbloecke duerfen nur aus `preview-modules.html` stammen.
- Die Modulwahl muss in `preview-module-library.md` registriert sein.
- Wenn ein Modul dort nicht angebunden ist, klar fehlschlagen statt Ersatz-HTML zu bauen.
- Vorhandene Marker in `preview-modules.html` duerfen zur konsistenten Preview-Befuellung und fuer Debug oder Recovery genutzt werden, sind aber nicht die regulaere Exportquelle.
- Nach dem Einsetzen der finalen Modulfolge muessen die Modulhintergruende in der Preview exakt dem operativen Hintergrund-Rhythmus aus `builder-library.md` folgen.
- Statische `theme-white`- oder `theme-gray`-Annahmen einzelner Quellbloecke aus `preview-modules.html` sind dafuer nicht bindend und muessen bei Bedarf fuer die finale Preview normalisiert werden.

## Icons

- Icon-Slots duerfen nur fuer Module verwendet werden, die in `preview-module-library.md` ausdruecklich Icon-Felder registrieren.
- Wenn ein `data-icon-field` vorhanden ist, muss die Preview dort eine gueltige Icon-URL aus `icon-library.md` tragen.
- Vor erfolgreichem Preview-Render muessen Beispiel- oder Quellblock-Icons aus `preview-modules.html` durch die operative Auswahl aus `icon-library.md` ersetzt sein.
- Wenn keine klare semantische Bucket-Zuordnung moeglich ist, nutzt die Preview den kanonischen `general-positive`-Fallback aus `icon-library.md`.
- Ein leerer Icon-Slot ist in der Preview nie zulaessig.

## Bilder

- Ohne echte User-Bild-URL bleibt die graue Placeholder-Flaeche aus `preview-modules.html` sichtbar.
- Mit echter User-Bild-URL wird genau diese URL in den passenden Slot eingebaut.
- Fuer fehlende Bilder darf die Preview keine technische Placeholder-URL oder `data:image`-Werte materialisieren.
- Hero-Placeholder:
  - `16:9 | 960 x 540 px`
  - `(Hi-Res 1920 x 1080)`
- Alle anderen Bild-Placeholder:
  - `16:9 | 960 x 540 px`
  - oder `4:3 | 800 x 600 px`

## Ablauf

1. Startkomposition bestimmen.
2. Inhalte fuer diese Komposition erzeugen.
3. HTML-Preview im Canvas erstellen oder aktualisieren.
4. Diese Preview zur operativen Wahrheit machen.
5. Parallel direkt einen strukturierten `email_state` aktualisieren.

- Im Initiallauf darf Preview, Composition oder State noch fehlen.
- Der Initiallauf ist ein Erzeugungsfall, kein Validierungsfall.
- Nach jeder inhaltlichen oder strukturellen Aenderung wird genau die bestehende Preview fortgeschrieben.

## email_state

- Nach jedem erfolgreichen Preview-Render muss der Agent unmittelbar einen strukturierten `email_state` parallel direkt mitschreiben.
- Dieser `email_state` ist die leichte, feldnahe Arbeitskopie der aktuellen E-Mail und die vorgesehene Happy-Path-Quelle fuer den Export.
- Der `email_state` muss nicht nur konzeptionell bestehen, sondern als eigene strukturierte JSON-Arbeitsdatei neben der aktuellen Preview fortgeschrieben werden.
- Diese JSON-Arbeitsdatei muss nach jedem erfolgreichen Preview-Render denselben Stand wie die sichtbare Preview haben und im spaeteren Export-Lauf direkt wiederverwendbar sein.
- Bei blueprintbasierter Startkomposition muessen die Blueprint-Module vor oder spaetestens mit dem ersten erfolgreichen Preview-Render in einen vollstaendigen `email_state` normalisiert werden.
- Blueprint-Module duerfen nie nur als sichtbare Preview ohne gleichwertigen `email_state` weiterlaufen.
- Der `email_state` soll mindestens enthalten:
  - Subject
  - Preheader
  - Modulfolge
  - Modultyp pro Block
  - alle exportrelevanten Felder pro Modul
  - sichtbare Item-Anzahl pro Multi-Item-Modul
  - relevante Show-Flags sowie Bild- und Iconquellen pro Slot
  - die aktuell zugeordnete Iterable-`campaignId` und das campaign-owned `templateId`, sobald fuer genau diese Preview bereits ein erfolgreicher Export vorliegt
- Fuer jedes Modul mit required `*_bg_color` in `export-map.json` muss der `email_state` dieses Feld direkt aus dem operativen Hintergrund-Rhythmus in `content` mitschreiben.
- Wenn ein required `*_bg_color` fuer ein Modul nicht gesetzt werden kann, ist das ein Fehler und kein Default-Fallback-Fall.
- Text-, `rich_inline`- und `rich_full`-Felder im `email_state.content` enthalten aktuell Plain Text und keinen freien HTML-Code.
- HTML bleibt ausschliesslich in den Modul- und Snippet-Strukturen.
- Die technische Felddefinition je Modul kommt ausschliesslich aus `export-map.json`.
- Bei Multi-Item-Modulen folgen Feldzuordnung und sichtbare Item-Anzahl direkt den markierten sichtbaren Items mit ihren Indizes.
- Bei blueprintbasierten Mails muessen alle required Felder pro Modul direkt aus Blueprint-Inhalt, erlaubten Defaults aus `export-map.json`, dem operativen Hintergrund-Rhythmus oder den kanonischen Builder-Defaults befuellt werden.
- Fuer `hero-image-top` im Standard-Blueprint muessen mindestens `emb_hero_image_top_headline`, `emb_hero_image_top_body`, `emb_hero_image_top_button_label`, `emb_hero_image_top_button_url` und `emb_hero_image_top_bg_color` sicher im `email_state` vorliegen; `image_url` und Button-Farben duerfen ueber die erlaubten Defaults aus `export-map.json` kommen.
- Fuer die regulare Standard-Testkombination `logo`, `hero-image-top`, `benefits-3col`, `footer` muss der `email_state` nach dem Preview-Bau mindestens sicher enthalten:
  - fuer `logo`: leeres `content` ist zulaessig, weil `emb_logo` aktuell als statisches Snippet ohne Export-Parameter aufgerufen wird
  - fuer `hero-image-top`: alle required Content-Felder plus `emb_hero_image_top_bg_color`
  - fuer `benefits-3col`: `emb_benefits_3col_bg_color`, alle drei `icon_url`-Felder, alle drei Bodies sowie CTA-Felder
  - fuer `footer`: leeres `content` ist zulaessig
- Nach einem erfolgreichen ersten Export wird die erzeugte `campaignId` fest an genau diese bestehende Preview und ihren aktuellen `email_state` gebunden.
- Solange dieselbe Preview nur fortgeschrieben wird, bleibt diese Campaign-Bindung erhalten und ist beim Re-Export wiederzuverwenden.
- Wenn eine wirklich neue Preview oder neue Startkomposition begonnen wird, darf keine alte Campaign-Bindung uebernommen werden; der neue Preview-Zweig startet ohne `campaignId`.
- Preview-DOM oder markierte Preview-Knoten duerfen nur als Debug- oder Recovery-Fallback erwaehnt werden, nicht als regulaerer Happy Path.
- Wenn kein vollstaendiger `email_state` vorhanden ist, darf genau einmal ein enger Recovery-Fallback aus der letzten sichtbaren Preview erzeugt werden.
- Dieser Recovery-Fallback darf nur aus der letzten sichtbaren Preview, ihren markierten Knoten, markierten URL-Feldern ueber `data-export-url-field`, den registrierten Icon-Slots, den Bild-Slots, den Moduldefaults aus `export-map.json` und dem operativen Hintergrund-Rhythmus ableiten.
- Danach muss der reparierte `email_state` wieder als JSON-Arbeitsdatei fortgeschrieben werden.

## Erfolg

- `Preview-Erfolg` liegt nur vor, wenn die HTML-Preview-Datei im Canvas erstellt oder aktualisiert wurde.
- Eine Textvorschau im Chat ist nie `Preview-Erfolg`.

## Chat-Ausgabe

- Nach erfolgreichem Preview-Lauf nur die feste Kurzantwort in der erkannten UI-Sprache ausgeben.
- Deutsch:
  - `Die Preview-Mail wurde erstellt. Wenn Sie moechten, koennen wir Komponenten, Reihenfolge oder Texte weiter anpassen.`
  - `Einen Ueberblick ueber alle verfuegbaren Komponenten finden Sie hier: [E-Mail component library](https://s24-creative-ops.github.io/builder-library/#email-logo)`
- Englisch:
  - `The preview mail has been created. If you like, we can further adjust components, order, or texts.`
  - `You can find an overview of all available components here: [E-Mail component library](https://s24-creative-ops.github.io/builder-library/#email-logo)`
