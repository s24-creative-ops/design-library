# Preview Rules

Diese Datei ist die einzige operative Preview-Regelbasis im flachen Agent-Satz unter `agent/`.
Die uebrigen operativen Agent-Dateien liegen direkt daneben in `agent/`.

## Zweck

Die Preview ist die sichtbare HTML-Arbeitsmail im Canvas und die Basis fuer spaetere Iterationen.

## Output

- Jede Preview muss als HTML-Code-Datei im Canvas erstellt oder aktualisiert werden.
- Eine Chat-Outline, Textzusammenfassung oder Blueprint-Antwort ist keine zulaessige Preview.
- Subject, Preheader, Modulfolge und Modulinhalt muessen in der HTML-Preview selbst vorliegen.
- Lokale Review-Dateien unter `development/review/*` sind reine Test-Artefakte und weder operative Preview-Wahrheit noch Exportquelle.

## Render-Regeln

- Starte jede Preview mit einer exakten Kopie von `preview-template.html`.
- Ersetze nur `[data-preview-subject-text]`, `[data-preview-preheader-text]` und den Bereich zwischen den Modul-Slot-Kommentaren.
- Modulbloecke duerfen nur aus `preview-modules.html` stammen.
- Die Modulwahl muss in `preview-module-library.md` registriert sein.
- Wenn ein Modul dort nicht angebunden ist, klar fehlschlagen statt Ersatz-HTML zu bauen.
- Vorhandene Marker in `preview-modules.html` duerfen zur konsistenten Preview-Befuellung und fuer Debug oder Recovery genutzt werden, sind aber nicht die regulaere Exportquelle.
- Nach dem Einsetzen der finalen Modulfolge muessen die Modulhintergruende in der Preview exakt dem operativen Hintergrund-Rhythmus aus `builder-library.md` folgen.
- Statische `theme-white`- oder `theme-gray`-Annahmen einzelner Quellbloecke aus `preview-modules.html` sind dafuer nicht bindend und muessen bei Bedarf fuer die finale Preview normalisiert werden.
- Die konkrete technische Aufloesung dieses Rhythmus erfolgt ueber `agent/preview-styles.css`:
  - weiss / white = `#FFFFFF` aus `--surface-white`
  - grau / gray = `#F5F5F5` aus `--surface-gray`
- Die oeffentliche Canvas-/Preview-HTML-Ausgabe verwendet fuer das globale Preview-CSS immer exakt `https://s24-creative-ops.github.io/email-builder/preview-styles.css`.
- `agent/preview-styles.css` bleibt dabei die interne Repo-Quelldatei; die oeffentliche Preview darf nicht auf `/agent/preview-styles.css` zeigen.

## Typography-Regeln

- Nur Hero-Headlines duerfen im Preview-/State-Flow ueber ein kanonisches Groessenfeld steuerbar sein.
- Erlaubte Hero-Groessen sind ausschliesslich `s`, `m` und `l`; ihr Mapping ist direkt `heading-s`, `heading-m`, `heading-l`.
- Der reguläre Hero-Default ist `l`.
- Nicht-Hero-Modulheadlines sind nicht usersteuerbar:
  - erste Hauptheadline = `heading-m`
  - Unter-Headlines, Abschnittstitel und Zwischenueberschriften = `heading-s`
  - Bodytexte = `body-standard`
- Freie Heading-Klassen, freie CSS-Werte, freie Font-Size-Werte, freies HTML oder freie Style-Werte sind fuer Typography-Steuerung unzulaessig.

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
- Vor dem ersten erfolgreichen Preview-Render muss die Modulfolge auf Logo-Hero-Konsistenz normalisiert werden:
  - Wenn die finale Modulfolge eines der Center-Hero-Module `hero-image-top-center`, `hero-image-top-bleed-center`, `hero-cta-top-center`, `hero-cta-top-no-bottom-center`, `hero-image-head-copy-bleed-center` oder `hero-image-textbox-cta-center` enthaelt, wird ein vorhandenes `logo` an derselben Position zu `logo-centered` normalisiert.
  - Wenn in diesem Center-Hero-Kontext bereits `logo-centered` vorhanden ist, darf kein zweites Logo eingefuegt werden.
  - Wenn in diesem Center-Hero-Kontext kein Logo vorhanden ist, darf nur die bestehende Pflichtmodul-Logik das passende Logo ergaenzen.
  - Ohne Center-Hero-Kontext bleibt `logo` regulaer zulaessig.
- Blueprint-Module duerfen nie nur als sichtbare Preview ohne gleichwertigen `email_state` weiterlaufen.
- Der `email_state` soll mindestens enthalten:
  - Subject
  - Preheader
  - eindeutigen Template-Kontext
  - Modulfolge
  - Modultyp pro Block
  - alle exportrelevanten Felder pro Modul
  - sichtbare Item-Anzahl pro Multi-Item-Modul
  - relevante Show-Flags sowie Bild- und Iconquellen pro Slot
  - die aktuell zugeordnete Iterable-`campaignId` und das campaign-owned `templateId`, sobald fuer genau diese Preview bereits ein erfolgreicher Export vorliegt
- Fuer exportfaehige States muessen `subject` und `preheader` bereits vor dem Export als konkrete String-Werte im State vorliegen.
- Der aktive Template-Kontext muss bereits beim Preview-Bau eindeutig im State stehen:
  - freier Modulbau oder Blueprint -> `templateContext.mode = default_template` und `templateContext.resolvedBaseTemplateId = 569946`
  - Composition-Template -> `templateContext.mode = composition_template`, `templateContext.compositionTemplateId`, `templateContext.iterableTemplateId` und `templateContext.resolvedBaseTemplateId = iterable_template_id`
- Wenn dieselbe Preview fortgeschrieben wird, muss ihre Campaign-Bindung ueber einen stabilen `previewBranchKey` im State nachvollziehbar bleiben; Re-Export darf `campaignId` und campaign-owned `templateId` nur fuer genau diesen Zweig wiederverwenden.
- Exportrelevante technische Werte muessen bereits beim Preview-Bau in `email_state.content` geschrieben werden und duerfen nicht erst im Export rekonstruiert werden.
- Produktkontext-Defaults muessen bereits vor oder spaetestens waehrend des Preview-Baus in die bestehenden Modulfelder materialisiert werden; ein freies Produkt-Raten waehrend des State-Baus ist verboten.
- Aktuell darf nur der case-insensitive Produktkontext `RLE` aufgeloest werden; unbekannte explizite Produktnamen muessen vor dem Preview geklaert werden.
- Dazu gehoeren insbesondere:
  - alle required `*_bg_color`
  - alle required `show_*`- und `hide_*`-Flags
  - alle required `*_icon_url`
  - alle required finalen `*_button_bg_color`- und `*_button_border_color`-Werte
  - getrennte `salutation`- und `rich_*`-Werte, wenn ein Modul beides nutzt
- Fuer alle zehn Hero-Module ist die Anrede ein optionaler eigener Textblock vor dem Body:
  - `*_show_salutation` ist das kanonische Show-/Hide-Feld
  - `*_salutation` bleibt Plain Text
  - `*_use_snippetcall_salutation` ist nur ein technisches Export-Flag fuer freigegebene Produktkontexte und wird in der Preview nie roh sichtbar
  - neue Hero-Default-States muessen `show_salutation = true` und `salutation = Hallo Anrede,` materialisieren
- Wenn der aktive Produktkontext `RLE` ist, bleibt die sichtbare Preview-Hero-Anrede trotzdem unveraendert `Hallo Anrede,`; der spaetere RLE-Export-Zielwert darf in der Preview nie sichtbar werden.
- Wenn der aktive Produktkontext `RLE` ist, muessen fuer Hero-Module zusaetzlich die passenden technischen Export-Flags `*_use_snippetcall_salutation = true` in den `email_state` materialisiert werden, ohne die sichtbare Preview-Anrede zu veraendern.
- Wenn der aktive Produktkontext `RLE` ist und ein `contact`-Modul genutzt wird, muessen ohne explizite User-Overrides diese bestehenden Contact-Felder im Preview-/State-Bau mit den RLE-Defaults materialisiert werden:
  - `emb_contact_show_image`
  - `emb_contact_image_url`
  - `emb_contact_image_alt`
  - `emb_contact_headline`
  - `emb_contact_body_intro`
  - `emb_contact_phone`
  - `emb_contact_phone_hours`
  - `emb_contact_email_intro`
  - `emb_contact_email_address`
  - `emb_contact_email_url`
  - `emb_contact_closing_line_1`
  - `emb_contact_closing_line_2`
- Fuer RLE nutzt das Contact-Modul an der bestehenden Placeholder-Position ein normales Bildslot:
  - `emb_contact_show_image = true`
  - `emb_contact_image_url = https://library.eu.iterable.com/33/98/732ff156cb6b4fc188b76f0e07b2744e-avatar-woman.png`
  - `emb_contact_image_alt = Beraterin aus dem ImmoScout24-Team`
- Finale required Button-Farbwerte muessen beim Preview-Bau ueber die dokumentierte Button-Farbaufloesung aus `builder-library.md` konkret in `email_state.content` materialisiert werden.
- Fehlende required Werte duerfen beim Preview-Bau nur aus zwei eng begrenzten Quellen ergaenzt werden:
  - aus einem eindeutigen technischen Default der `export-map.json`
  - aus einer dokumentierten technischen Resolver-Quelle
- Wenn eine Felddefinition in `export-map.json` `allowed_values` definiert, muss der beim Preview-Bau materialisierte Feldwert exakt einem dieser erlaubten Werte entsprechen; jeder andere Wert ist ein lokaler State-Fehler und die Preview ist nicht export-ready.
- Wenn ein required Wert weder aus dem State-Inhalt noch aus einem eindeutigen technischen Default der `export-map.json` noch aus einer dokumentierten technischen Resolver-Quelle konkret befuellt werden kann, ist die Preview nicht export-ready und der Agent muss vor dem Export stoppen.
- Fuer `hero-image-top` ist `emb_hero_image_top_headline_size` das einzige kanonische Groessenfeld fuer die Headline und darf nur `s`, `m` oder `l` tragen.
- Neue reguläre Default-States fuer `hero-image-top` muessen schon beim Preview-Bau `emb_hero_image_top_headline_size = l`, `emb_hero_image_top_show_small_headline = false` und `emb_hero_image_top_show_large_headline = true` materialisieren.
- Legacy-Normalisierung fuer `hero-image-top` ist nur waehrend des Preview-Baus zulaessig:
  - wenn `emb_hero_image_top_headline_size` fehlt oder leer ist und `emb_hero_image_top_show_large_headline = true`, wird kanonisch zu `l` normalisiert
  - wenn `emb_hero_image_top_headline_size` fehlt oder leer ist und `emb_hero_image_top_show_large_headline = false` oder leer ist, wird kanonisch zu `m` normalisiert
- Nach der kanonischen Aufloesung von `emb_hero_image_top_headline_size` muessen die technischen Bridge-Felder fuer `hero-image-top` direkt in `email_state.content` materialisiert werden:
  - `s` => `emb_hero_image_top_show_small_headline = true` und `emb_hero_image_top_show_large_headline = false`
  - `m` => `emb_hero_image_top_show_small_headline = false` und `emb_hero_image_top_show_large_headline = false`
  - `l` => `emb_hero_image_top_show_small_headline = false` und `emb_hero_image_top_show_large_headline = true`
- Wenn bei `hero-image-top` `emb_hero_image_top_show_small_headline = true` und `emb_hero_image_top_show_large_headline = true` gleichzeitig vorliegen, ist die Preview nicht export-ready und der Agent muss vor dem Export stoppen.
- Wenn die Bridge-Felder von `hero-image-top` nicht exakt zur kanonischen `emb_hero_image_top_headline_size` passen, ist das ein lokaler State-Fehler und die Preview ist nicht export-ready.
- Fuer `hero-image-top-center`, `hero-image-top-bleed`, `hero-image-top-bleed-center`, `hero-cta-top`, `hero-cta-top-center`, `hero-cta-top-no-bottom` und `hero-cta-top-no-bottom-center` gilt dasselbe kanonische Hero-Modell:
  - genau ein `*_headline_size`-Feld mit nur `s`, `m` oder `l`
  - neue reguläre Default-States muessen `headline_size = l`, `show_small_headline = false` und `show_large_headline = true` materialisieren
  - die technischen Bridge-Felder muessen exakt aus dem kanonischen `headline_size` abgeleitet werden
  - `show_small_headline = true` und `show_large_headline = true` gleichzeitig ist ungueltig und macht die Preview nicht export-ready
- Fuer `hero-image-head-copy-bleed-center` gilt dasselbe kanonische Hero-Modell:
  - genau ein `emb_hero_image_head_copy_bleed_center_headline_size`-Feld mit nur `s`, `m` oder `l`
  - neue reguläre Default-States muessen `headline_size = l`, `show_small_headline = false` und `show_large_headline = true` materialisieren
  - die technischen Bridge-Felder muessen exakt aus dem kanonischen `headline_size` abgeleitet werden
  - `show_small_headline = true` und `show_large_headline = true` gleichzeitig ist ungueltig und macht die Preview nicht export-ready
- Fuer jedes Modul mit required `*_bg_color` in `export-map.json` muss der `email_state` dieses Feld direkt aus dem operativen Hintergrund-Rhythmus in `content` mitschreiben.
- Required `*_bg_color`-Felder muessen dabei immer als konkrete produktive Hexwerte in `content` stehen, nicht als semantische Farbnamen, nicht als `theme-*`-Klassen und nicht als offene Rhythmus-Markierung.
- Wenn ein required `*_bg_color` fuer ein Modul nicht gesetzt werden kann, ist das ein Fehler und kein Default-Fallback-Fall.
- Wenn der operative Hintergrund-Rhythmus fuer ein required `*_bg_color` nicht eindeutig bis zu einem konkreten Hexwert aufgeloest werden kann, gilt die Preview als nicht exportfaehig und der Agent muss vor dem Mitschreiben oder Fortfuehren stoppen.
- Normale Text-Felder im `email_state.content` enthalten Plain Text.
- `rich_inline`-Felder im `email_state.content` duerfen nur sanitisiertes builder-eigenes Inline-HTML enthalten.
- `rich_full`-Felder im `email_state.content` duerfen nur sanitisiertes builder-eigenes Richtext-HTML enthalten.
- Beim Mitschreiben des `email_state` muessen `rich_inline`- und `rich_full`-Felder ihre sichtbare Struktur aus dem gerenderten Modul in sanitisiertem Builder-HTML behalten.
- Fuer `rich_inline` sind nur diese Tags erlaubt:
  - `strong`
  - `em`
  - `a`
  - `br`
- Fuer `rich_full` sind nur diese Tags erlaubt:
  - `p`
  - `ul`
  - `ol`
  - `li`
  - `strong`
  - `em`
  - `a`
  - `br`
- Andere Tags, freie Wrapper, Skripte, Styles, Event-Handler, Klassen und freie Attribute sind verboten.
- Erlaubte Attribute in Richtext-Feldern sind auf sichere Link-Attribute begrenzt:
  - bei `a`: `href`, `target`, `rel`
- Recovery-Fallback aus der letzten sichtbaren Preview darf fuer `rich_inline` und `rich_full` genau diese erlaubten HTML-Fragmente rekonstruieren.
- Die technische Felddefinition je Modul kommt ausschliesslich aus `export-map.json`.
- Bei Multi-Item-Modulen folgen Feldzuordnung und sichtbare Item-Anzahl direkt den markierten sichtbaren Items mit ihren Indizes.
- Bei blueprintbasierten Mails muessen alle required Felder pro Modul direkt aus Blueprint-Inhalt, erlaubten Defaults aus `export-map.json`, dem operativen Hintergrund-Rhythmus oder den kanonischen Builder-Defaults befuellt werden.
- Bei blueprintbasierten Mails duerfen required `*_bg_color`-Felder nicht als `theme-white`, `theme-gray` oder aehnliche Preview-Zustaende im `email_state` verbleiben; sie muessen vor dem Speichern konkret zu `#FFFFFF` oder `#F5F5F5` aus der verbindlichen Farbquelle aufgeloest sein.
- Fuer `hero-image-top` im Standard-Blueprint muessen mindestens `emb_hero_image_top_headline_size`, `emb_hero_image_top_show_small_headline`, `emb_hero_image_top_show_large_headline`, `emb_hero_image_top_show_salutation`, `emb_hero_image_top_headline`, `emb_hero_image_top_salutation`, `emb_hero_image_top_body`, `emb_hero_image_top_button_label`, `emb_hero_image_top_button_url` und `emb_hero_image_top_bg_color` sicher im `email_state` vorliegen; `image_url`, `image_alt` und Button-Farben duerfen ueber die erlaubten Defaults aus `export-map.json` kommen.
- Fuer `hero-image-textbox-cta-center` muessen mindestens `emb_hero_image_textbox_cta_center_bg_color`, `emb_hero_image_textbox_cta_center_headline_size`, `emb_hero_image_textbox_cta_center_show_small_headline`, `emb_hero_image_textbox_cta_center_show_large_headline`, `emb_hero_image_textbox_cta_center_show_salutation`, `emb_hero_image_textbox_cta_center_headline`, `emb_hero_image_textbox_cta_center_image_url`, `emb_hero_image_textbox_cta_center_salutation`, `emb_hero_image_textbox_cta_center_body`, `emb_hero_image_textbox_cta_center_question`, `emb_hero_image_textbox_cta_center_entry_url`, `emb_hero_image_textbox_cta_center_entry_text`, `emb_hero_image_textbox_cta_center_button_label` und `emb_hero_image_textbox_cta_center_button_url` sicher im `email_state` vorliegen; `image_alt`, `button_bg_color` und `button_border_color` duerfen ueber die erlaubten Defaults aus `export-map.json` kommen.
- Fuer `hero-image-textbox-cta-center` gilt dasselbe kanonische Hero-Modell:
  - genau ein `emb_hero_image_textbox_cta_center_headline_size`-Feld mit nur `s`, `m` oder `l`
  - neue reguläre Default-States muessen `headline_size = l`, `show_small_headline = false` und `show_large_headline = true` materialisieren
  - die technischen Bridge-Felder muessen exakt aus dem kanonischen `headline_size` abgeleitet werden
  - `show_small_headline = true` und `show_large_headline = true` gleichzeitig ist ungueltig und macht die Preview nicht export-ready
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
- Auch im Recovery-Fallback muessen required `*_bg_color`-Felder vor dem Fortschreiben des reparierten `email_state` wieder als konkrete Hexwerte und nie als `theme-*`-Klassen vorliegen.
- Danach muss der reparierte `email_state` wieder als JSON-Arbeitsdatei fortgeschrieben werden.

## Erfolg

- `Preview-Erfolg` liegt nur vor, wenn die HTML-Preview-Datei im Canvas erstellt oder aktualisiert wurde.
- Eine Textvorschau im Chat ist nie `Preview-Erfolg`.

## Chat-Ausgabe

- Die komplette HTML-Preview darf im normalen Preview-/Export-Flow nicht automatisch vollstaendig im Chat ausgegeben werden.
- Wenn die Laufzeit eine kompakte Preview-Karte, Canvas-Preview oder andere kurze Vorschauform bietet, soll diese statt eines grossen HTML-Blocks genutzt werden.
- Wenn keine kompakte Kartenansicht verfuegbar ist, bleibt die Chat-Ausgabe bei einer kurzen Bestaetigung plus Hinweis auf die erstellte Preview-Datei oder Vorschau.
- Vollstaendiges Preview-HTML darf nur ausgegeben werden, wenn der User ausdruecklich danach fragt.
- Vor dem eigentlichen Preview-Bau muss sichtbar dieser Statuspunkt ausgegeben werden:
  - `1. Preview-Erstellung gestartet`
- Nach erfolgreichem Preview-Lauf muss sichtbar dieser Statuspunkt ausgegeben werden:
  - `2. Preview fertig`
- Nach erfolgreicher Preview darf kein automatischer Exportversuch, kein automatischer Iterable-Connect und kein impliziter CreateCampaign-Start folgen.
- Hoechstens eine kurze Anschlussfrage zum Export ist zulaessig, z. B. ob diese Version nach Iterable exportiert werden soll.
- Deutsch:
  - `Die Preview-Mail wurde erstellt. Wenn Sie moechten, koennen wir Komponenten, Reihenfolge oder Texte weiter anpassen.`
  - `Einen Ueberblick ueber alle verfuegbaren Komponenten finden Sie hier: [E-Mail component library](https://s24-creative-ops.github.io/builder-library/#email-logo)`
- Englisch:
  - `The preview mail has been created. If you like, we can further adjust components, order, or texts.`
  - `You can find an overview of all available components here: [E-Mail component library](https://s24-creative-ops.github.io/builder-library/#email-logo)`
- Interne Speicher-, State-, Recovery- oder Zwischenmeldungen duerfen im normalen User-Flow nicht als eigene Chat-Ereignisse sichtbar werden.
