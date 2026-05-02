# Export Rules

Diese Datei ist die einzige operative Export-Regelbasis im flachen Agent-Satz unter `agent/`.
Die uebrigen operativen Agent-Dateien liegen direkt daneben in `agent/`.

## Trigger

- Export startet nur bei einer expliziten Anweisung wie `Exportiere die Mail zu Iterable`.
- Gleichwertige explizite Trigger sind nur klare Export-/Upload-/Update-Anweisungen des Users fuer Iterable.
- Eine Preview-Anfrage, eine Template-Auswahl oder ein erfolgreicher Preview-Lauf gelten nie als Export-Trigger.
- Nach erfolgreicher Preview bleibt der Agent im Preview-Modus, bis der User den Export ausdruecklich bestaetigt oder selbst Export/Upload/Update verlangt.
- Diese Anweisung bedeutet: aktuelle Preview-Komposition in den finalen modularen Snippet-Call-Block uebersetzen, diesen in die vollstaendige campaign-owned HTML-Shell einsetzen und genau diese finale HTML-Payload nach erfolgreichem `createCampaign` genau einmal in die zugehoerige Iterable-Campaign schreiben.
- Sie bedeutet nicht: Preview-HTML speichern, Preview-HTML als Template anlegen, Draft als Standardziel nutzen oder nackte Snippet-Codes als Komplett-HTML schreiben.

## Quelle

- Die operative Exportquelle ist ausschliesslich der aktuelle `email_state` zusammen mit `export-map.json`.
- Wenn noch keine Preview existiert, wird zuerst eine Preview erstellt und dabei parallel ein `email_state` aufgebaut.
- Der `email_state` muss als strukturierte JSON-Arbeitsdatei zur aktuellen Preview verfuegbar bleiben und im Export-Lauf direkt wiederverwendet werden.
- Der Export darf Preview-HTML oder Snippet-HTML nicht regulaer als Quelle rekonstruieren.
- Preview-DOM oder markierte Preview-Knoten sind nur als Debug- oder Recovery-Fallback zulaessig, nicht im regulaeren Happy Path.
- `export-map.json` ist die einzige technische Quelle fuer erlaubte Module, Snippet-Namen, Feldnamen, Feldtypen, Required-Flags und Defaults.
- Jedes Feld im `email_state.content`, das fuer das jeweilige Modul nicht in `export-map.json` registriert ist, ist ein Unknown Field und fuehrt zu einem Export-Fehler.
- Required Felder duerfen nur aus `content` oder aus dem Default der Export-Map befuellt werden.
- Felder ohne Content und ohne Default werden nie frei erfunden.
- Nur Hero-Headlines duerfen im Export-State ueber ein kanonisches Groessenfeld steuerbar sein.
- Erlaubte Hero-Groessen sind ausschliesslich `s`, `m` und `l`; ihr Mapping ist direkt `heading-s`, `heading-m`, `heading-l`.
- Der reguläre Hero-Default ist `l`.
- Nicht-Hero-Modulheadlines sind nicht usersteuerbar:
  - erste Hauptheadline = `heading-m`
  - Unter-Headlines, Abschnittstitel und Zwischenueberschriften = `heading-s`
  - Bodytexte = `body-standard`
- Freie Heading-Klassen, freie CSS-Werte, freie Font-Size-Werte, freies HTML oder freie Style-Werte sind fuer Typography-Steuerung unzulaessig.
- Wenn eine Felddefinition in `export-map.json` `allowed_values` definiert, muss der konkrete Feldwert exakt einem dieser erlaubten Werte entsprechen; jeder andere Wert ist ein lokaler State-Fehler und stoppt den Export vor dem Snippet-Build.
- Ein `email_state` ist nur export-ready, wenn `subject`, `preheader` und ein eindeutiger Template-Kontext bereits vorliegen.
- Der aktive Template-Kontext ist nur in diesen beiden Formen zulaessig:
  - freier Modulbau oder Blueprint: `templateContext.mode = default_template` und `templateContext.resolvedBaseTemplateId = 569946`
  - Composition-Template: `templateContext.mode = composition_template`, `templateContext.compositionTemplateId`, `templateContext.iterableTemplateId` und `templateContext.resolvedBaseTemplateId = iterable_template_id`
- Bei Re-Export duerfen `campaignId` und campaign-owned `templateId` nur wiederverwendet werden, wenn sie im State ueber einen stabilen `previewBranchKey` eindeutig demselben fortgeschriebenen Preview-/Composition-Zweig zugeordnet sind.
- Ein required Feld ist nur dann export-ready, wenn genau eine dieser drei Quellen greift:
  - konkreter Wert in `email_state.content`
  - eindeutiger technischer Default aus `export-map.json`
  - bereits vor dem Export konkret materialisierter Resolver-Wert aus einer dokumentierten technischen Quelle
- Dokumentierte technische Resolver-Quellen sind nur:
  - Hintergrund-Rhythmus aus `builder-library.md` plus `preview-styles.css`
  - Icon-Auswahl aus `icon-library.md`
  - finale Button-Farbwerte aus `builder-library.md`
- Der Export-Happy-Path prueft nur den vorhandenen export-ready State gegen `export-map.json`.
- Der Export darf fehlende required Werte nicht aus Preview-HTML, DOM, sichtbarer Darstellung, Button-Klassen oder freiem Modulkontext raten.
- Fuer `hero-image-top` ist `emb_hero_image_top_headline_size` das einzige kanonische Groessenfeld fuer die Headline und darf nur `s`, `m` oder `l` tragen.
- Neue reguläre Default-States fuer `hero-image-top` muessen vor dem Export immer `emb_hero_image_top_headline_size = l`, `emb_hero_image_top_show_small_headline = false` und `emb_hero_image_top_show_large_headline = true` enthalten.
- Legacy-Normalisierung fuer `hero-image-top` ist nur vor dem regulären Export-Happy-Path zulaessig:
  - wenn `emb_hero_image_top_headline_size` fehlt oder leer ist und `emb_hero_image_top_show_large_headline = true`, wird kanonisch zu `l` normalisiert
  - wenn `emb_hero_image_top_headline_size` fehlt oder leer ist und `emb_hero_image_top_show_large_headline = false` oder leer ist, wird kanonisch zu `m` normalisiert
- Nach der kanonischen Aufloesung von `emb_hero_image_top_headline_size` muessen die technischen Bridge-Felder fuer `hero-image-top` exakt so gesetzt sein:
  - `s` => `emb_hero_image_top_show_small_headline = true` und `emb_hero_image_top_show_large_headline = false`
  - `m` => `emb_hero_image_top_show_small_headline = false` und `emb_hero_image_top_show_large_headline = false`
  - `l` => `emb_hero_image_top_show_small_headline = false` und `emb_hero_image_top_show_large_headline = true`
- Wenn bei `hero-image-top` `emb_hero_image_top_show_small_headline = true` und `emb_hero_image_top_show_large_headline = true` gleichzeitig vorliegen, ist das ein Bridge-Konflikt und der Export stoppt fail-closed vor dem Snippet-Build.
- Wenn die Bridge-Felder von `hero-image-top` nicht exakt zur kanonischen `emb_hero_image_top_headline_size` passen, ist das ein lokaler State-Fehler und der Export stoppt vor dem Snippet-Build.
- Fuer `hero-image-top-bleed`, `hero-cta-top` und `hero-cta-top-no-bottom` gilt dasselbe kanonische Hero-Modell:
  - genau ein `*_headline_size`-Feld mit nur `s`, `m` oder `l`
  - neue reguläre Default-States muessen `headline_size = l`, `show_small_headline = false` und `show_large_headline = true` enthalten
  - die technischen Bridge-Felder muessen exakt aus dem kanonischen `headline_size` abgeleitet werden
  - `show_small_headline = true` und `show_large_headline = true` gleichzeitig ist ein Bridge-Konflikt und stoppt fail-closed vor dem Snippet-Build
- Fuer `hero-image-head-copy-bleed-center` gilt dasselbe kanonische Hero-Modell:
  - genau ein `emb_hero_image_head_copy_bleed_center_headline_size`-Feld mit nur `s`, `m` oder `l`
  - neue reguläre Default-States muessen `headline_size = l`, `show_small_headline = false` und `show_large_headline = true` enthalten
  - die technischen Bridge-Felder muessen exakt aus dem kanonischen `headline_size` abgeleitet werden
  - `show_small_headline = true` und `show_large_headline = true` gleichzeitig ist ein Bridge-Konflikt und stoppt fail-closed vor dem Snippet-Build
- Fuer `hero-image-textbox-cta-center` gilt dasselbe kanonische Hero-Modell:
  - genau ein `emb_hero_image_textbox_cta_center_headline_size`-Feld mit nur `s`, `m` oder `l`
  - neue reguläre Default-States muessen `headline_size = l`, `show_small_headline = false` und `show_large_headline = true` enthalten
  - die technischen Bridge-Felder muessen exakt aus dem kanonischen `headline_size` abgeleitet werden
  - `show_small_headline = true` und `show_large_headline = true` gleichzeitig ist ein Bridge-Konflikt und stoppt fail-closed vor dem Snippet-Build
- Required `*_bg_color` Felder muessen aus dem fachlichen Hintergrund-Rhythmus bereits im `email_state.content` vorliegen; sie werden nicht durch freie Export-Defaults ersetzt.
- Required `*_bg_color` Felder muessen im `email_state.content` bereits als konkrete produktive Hexwerte vorliegen.
- Preview-Klassen wie `theme-white`, `theme-gray` oder andere semantische Rhythmus-Marker sind als Exportwerte fuer `*_bg_color` unzulaessig.
- Wenn ein required `*_bg_color` im `email_state` nicht als konkreter Hexwert aus der verbindlichen Rhythmus-Farbquelle vorliegt, ist das ein lokaler State-Fehler und der Export stoppt vor jedem Write.
- Normale Text-Felder im `email_state.content` enthalten Plain Text.
- Salutation-/Anredezeilen sind eigene kurze Textkontexte vor einem nachfolgenden Body und duerfen nicht im HTML-Fragment eines `rich_full`-Feldes mitgefuehrt werden.
- Salutation-/Anredezeilen duerfen keine Listen enthalten und sind im Feldtyp nur Plain Text oder hoechstens `rich_inline`, niemals `rich_full`.
- Der Abstand zwischen Salutation und nachfolgendem Body ist ein externer Kontextabstand und keine Aufgabe des `rich_full`-Feldwerts selbst.
- Fuer alle sechs Hero-Module gilt zusaetzlich:
  - `*_show_salutation` ist das kanonische Show-/Hide-Feld fuer die Hero-Anrede
  - `*_salutation` bleibt ein eigener Plain-Text-Kontext vor dem Body
  - neue Hero-Default-States muessen `show_salutation = true` und `salutation = Hallo Anrede,` enthalten
  - eine Iterable-Snippetcall-Ersetzung fuer Hero-Anreden ist in diesem Schritt explizit nicht Teil des Exportvertrags
- `rich_inline`-Felder im `email_state.content` duerfen nur sanitisiertes builder-eigenes Inline-HTML enthalten.
- `rich_full`-Felder im `email_state.content` duerfen nur sanitisiertes builder-eigenes Richtext-HTML enthalten.
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
- Wenn ein Modul-Snippet `{{{...}}}` fuer `rich_inline` oder `rich_full` nutzt, muss der Export den bereits sanitisierten HTML-Fragmentwert aus `email_state.content` unveraendert in den Snippet-Call uebernehmen und darf ihn nicht zu Plain Text abwerten.
- Vertikale Abstaende zwischen Absaetzen und Listen innerhalb eines `rich_full`-Felds bleiben ausschliesslich Aufgabe des allgemeinen `rich_full`-Renderkontexts, nicht des Feldinhalts vor oder ausserhalb davon.
- Fuer den allgemeinen `rich_full`-Renderkontext gilt:
  - Text zu Text = 16px
  - Text zu Liste = 8px
  - Liste zu Text = 8px
  - Liste zu Liste = 8px
- Der Abstand zwischen einer Headline und dem ersten `rich_full`-Element ist externer Kontextabstand und keine Aufgabe des `rich_full`-Feldwerts.
- Wenn eine Liste das erste Element im `rich_full`-Feld ist, bekommt sie keinen zusaetzlichen internen Top-Abstand.
- Listen bleiben im allgemeinen `rich_full`-Kontext optisch auf 20px eingerueckt.
- `p`, `ul` und `ol` tragen im allgemeinen `rich_full`-Kontext keine eigenen allgemeinen Top-/Bottom-Defaults ausserhalb der zentralen Flow-Regeln.
- Blueprint-basierte Previews duerfen nur exportiert werden, wenn ihr `email_state` zuvor auf das vollstaendige Feldset der verwendeten Module aus `export-map.json` normalisiert wurde.
- Wenn der `email_state` fehlt oder fuer die aktuelle Preview unvollstaendig ist, darf genau einmal ein enger Recovery-Fallback aus der letzten sichtbaren Preview aufgebaut werden.
- Dieser Recovery-Fallback bleibt streng begrenzt:
  - nur letzte sichtbare Preview
  - nur registrierte Module
  - nur explizit markierte sichtbare Felder, marker-basierte URL-Felder aus `data-export-url-field`, registrierte Icon-Slots, registrierte Bild-Slots, Moduldefaults aus `export-map.json` und dokumentierte technische Resolver-Quellen
  - kein Raten aus Button-Klassen, freiem Modulkontext, sichtbarem CSS-Styling oder unmarkierter DOM-Struktur
  - danach vollstaendige Validierung gegen `export-map.json`
  - anschliessend den reparierten `email_state` wieder als operative JSON-Arbeitsdatei fortschreiben
- Snippet-HTML bleibt auch im Recovery-Fallback verboten als Export-Erkennungsquelle.

## Ziel und Save-Shell

- `DEFAULT_TEMPLATE_ID = 569946`
- Freie und Blueprint-Mails ohne aktives Composition-Template nutzen im Export immer `DEFAULT_TEMPLATE_ID`.
- Builder-Export erzeugt bewusst keine Blast-/Send-Campaign und uebergibt deshalb keine Versandliste an `createCampaign`.
- Review-Dateien unter `development/review/` sind fuer Modul- und Template-Arbeit reine Test-Artefakte und nie operativ.
- Review-Dateien unter `development/review/` duerfen fuer Template-Tests vollstaendig zusammengebaut sein, sind aber nie Quelle fuer den Export.
- Review-Dateien duerfen Demo-Texte und Demo-Bilder enthalten, aber keine frei erfundenen Styles, Farben, Spacings, CTA-Farben oder Modul-Defaults.
- Wenn Review-Dateien bestehende Defaults brauchen, muessen diese aus den operativen EMB-Quellen kommen, insbesondere aus `export-map.json`, produktiven Modulen, `email/templates/template-main.html` und `agent/preview-styles.css`.
- Wenn ein aktives Composition-Template genutzt wird, wird dessen Definition immer ueber `template_id` adressiert:
  - `agent/template-<template_id>.definition.json`
- Wenn `iterable_template_id` in dieser namespaceten Definition eine Zahl ist, muss diese ID als Basis-`templateId` fuer `createCampaign` verwendet werden.
- Wenn ein aktives Composition-Template genutzt wird und `iterable_template_id = null` ist, darf kein Iterable-Export stattfinden.
- Das zugehoerige Iterable-Basistemplate liegt fuer Composition-Templates immer unter `email/templates/<template_id>.html` und darf keine festen Module oder festen Snippet-Calls enthalten.
- Der erste Export einer Preview erzeugt genau eine neue Campaign.
- Jeder Folge-Export derselben fortgeschriebenen Preview muss dieselbe bereits zugeordnete Campaign wiederverwenden und darf keine zweite Campaign erzeugen.
- Draft ist kein Standard- und kein Fallback-Ziel.
- Im regulaeren Export gibt es genau vier externe Export-Aktionen: `createCampaign`, genau einen `campaignRead` nur fuer die campaign-owned `templateId` und den `campaignState`, genau einen `templateRead` der aktuellen campaign-owned HTML-Shell und den finalen HTML-Write.
- Campaign-Read ist nur direkt nach `createCampaign` zum Holen der campaign-owned `templateId` und zur Status-Validierung erlaubt.
- Template-Read ist genau einmal erlaubt und dient ausschliesslich dazu, die aktuelle campaign-owned HTML-Shell fuer den finalen Shell-Merge zu lesen.
- `SNIPPET_CALLS` duerfen nie als nacktes Komplett-HTML gespeichert werden.
- Das finale `html` fuer den Write-Schritt entsteht lokal genau einmal aus `email_state + export-map.json` plus der genau einmal gelesenen campaign-owned HTML-Shell und wird danach genau einmal auf dem campaign-owned Template geschrieben.
- Ein Standalone-Template-Save ist verboten, solange der User nicht ausdruecklich `Speichere als Template in Iterable` verlangt.

## Finaler HTML-Schritt

- Der finale HTML-Schritt besteht genau aus zwei lokalen Teilphasen und einem Write:
  1. Modularen Snippet-Call-Block lokal exakt einmal aus `email_state + export-map.json` bauen.
  2. In der genau einmal gelesenen campaign-owned HTML-Shell ausschliesslich die erlaubten Replace-Zonen fuer Subject, Preheader und den modularen Slot identifizieren und nur dort den neuen Inhalt einsetzen.
  3. Genau diese vollstaendige finale HTML-Payload nach Iterable schreiben.
- Die Payload wird lokal nur einmal zusammengefuegt; doppelte HTML-Builds, Shell-Neubauten oder nachgelagerte Rebuilds sind verboten.
- Die campaign-owned HTML-Shell muss ausserhalb der erlaubten Replace-Zonen byte-faithful erhalten bleiben.
- Die finale HTML-Payload gilt nur dann als write-faehig, wenn sie lokal vollstaendig gebaut wurde, weiterhin eine vollstaendige HTML-Shell enthaelt und keine freie Minimal-Shell ist.
- Ein lokaler Fehler beim Snippet-Block, beim Shell-Merge oder bei der Payload-Vollstaendigkeit ist kein Write-Fehler, sondern ein lokaler Build-Fehler.

## HTML WRITE - VERBINDLICH

- Nach `createCampaign` und genau einem `campaignRead` gilt fuer den finalen Write-Step ausschliesslich dieser technische Vertrag.
- Die campaign-owned `templateId` muss ausschliesslich aus `response.templateId` der `campaignRead`-Response extrahiert werden.
- Fuer den HTML-Write ist ausschliesslich dieser Endpoint erlaubt:
  - `POST /api/templates/email/update`
- Der Write-Payload muss immer exakt diese Felder enthalten:
  - `templateId`: campaign-owned `templateId` aus `response.templateId`
  - `html`: finale HTML-Payload
  - `subject`: Subject der aktuellen Mail
  - `preheaderText`: Preheader der aktuellen Mail
- Vor dem Write muessen verbindlich genau diese Bedingungen erfuellt sein:
  - `templateId` ist vorhanden
  - `html` ist nicht leer
  - `subject` ist vorhanden
  - `preheaderText` ist vorhanden
- Wenn eine dieser Bedingungen nicht erfuellt ist, endet der Export sofort vor dem Write.
- Nach dem Write muss der HTTP-Status geprueft werden.
- Bei Write-Fehlern muessen HTTP-Status und vollstaendiger Response-Body lokal geloggt werden.
- Der Write gilt nur dann als erfolgreich, wenn kein API-Fehler zurueckkommt.
- Alternative Write-Endpoints, alternative Write-Payloads oder implizite Write-Methoden sind verboten.

## Lokale Payload-Pruefung vor dem Write

- Direkt vor dem finalen Write laeuft genau eine kleine lokale Vorpruefung.
- Diese Vorpruefung muss mindestens bestaetigen:
  - campaign-owned HTML-Shell ist vorhanden
  - Subject ist vorhanden
  - Preheader ist vorhanden
  - modularer Snippet-Call-Block ist vorhanden
  - die finale HTML-Payload wurde lokal genau einmal zusammengefuegt
  - finale HTML-Payload ist nicht leer
  - finale HTML-Payload enthaelt weiterhin eine vollstaendige HTML-Shell
  - finale HTML-Payload ist nicht nur nackter Snippet-Text
  - finale HTML-Payload enthaelt den eingesetzten modularen Block
  - ausserhalb der erlaubten Replace-Zonen gibt es keine Abweichung zur gelesenen campaign-owned HTML-Shell
- Wenn eine dieser Pruefungen scheitert, wird kein Write versucht.
- In diesem Fall endet derselbe Export sofort mit einer klaren lokalen Fehlerklasse.

## CreateCampaign Gate

- `DEFAULT_TEMPLATE_ID = 569946`
- Der CreateCampaign-Schritt ist ein harter Gate-Step.
- CreateCampaign ist nur zulaessig, wenn die aktuelle Preview noch keine zugeordnete verwertbare `campaignId` hat.
- Wenn ein aktives Composition-Template genutzt wird, ist dessen `iterable_template_id` die einzige erlaubte Basis-`templateId` fuer `createCampaign`.
- Wenn kein Composition-Template genutzt wird, bleibt `DEFAULT_TEMPLATE_ID = 569946` die einzige erlaubte Basis-`templateId` fuer `createCampaign`.
- Wenn ein aktives Composition-Template genutzt wird und dessen `iterable_template_id = null` ist, endet der Export sofort vor dem API-Call.
- Der CreateCampaign-Basispayload muss immer exakt diese Felder enthalten:
  - `name`: `CreativeOps_emb_YYYY-MM-DD`
  - `templateId`: aktive Template-ID aus dem Exportkontext:
    - bei aktivem Composition-Template: `iterable_template_id` aus `agent/template-<template_id>.definition.json`
    - sonst: `569946` aus `DEFAULT_TEMPLATE_ID`
- Die fuer `createCampaign` verwendete Basis-`templateId` ist ausschliesslich der Basis-Template-Parameter fuer `createCampaign`.
- Der finale HTML-Write darf nie `569946` oder `campaignId` als `templateId` verwenden.
- `listIds`, `sendAt`, `scheduleSend`, `sendMode` und `recipientTimeZone` sind im CreateCampaign-Request des Builder-Exports verboten.
- Der Builder-Export darf keine Scheduling- oder Versandparameter an `createCampaign` uebergeben.
- Falls spaeter eine Versandliste benoetigt wird, ist das ein separater manueller Iterable-Schritt ausserhalb dieses Export-Flows.
- Platzhalterwerte, leere Arrays und frei erfundene Versand- oder Scheduling-Felder sind im CreateCampaign-Request verboten.
- Der Export darf nur fortgesetzt werden, wenn die CreateCampaign-Antwort verwertbar ist.
- Eine verwertbare CreateCampaign-Antwort braucht genau eine extrahierbare Campaign-ID.
- Als ID-Kandidaten duerfen nur diese Felder geprueft werden:
  - `campaignId`
  - `id`
  - `response.campaignId`
  - `response.id`
  - `data.campaignId`
  - `data.id`
  - `campaign.campaignId`
  - `campaign.id`
- Jeder ID-Kandidat ist nur gueltig, wenn er als `number` oder `string` vorliegt.
- Die erste verwertbare extrahierte Campaign-ID muss intern als String normalisiert werden.
- Wenn aus diesen Kandidaten keine verwertbare ID extrahiert werden kann, ist der Export sofort fehlgeschlagen.
- Direkt nach dem CreateCampaign-Call muessen der finale Request ohne Secrets, die Information ueber vorhandenen oder fehlenden HTTP-Status, die Information ueber vorhandenen oder fehlenden Raw-Response-Body sowie die komplette verwertbare Tool-Antwort lokal erfasst werden.
- Auf den CreateCampaign-Call muss explizit gewartet werden; der Export darf erst weiterlaufen, wenn die vollstaendige Response technisch empfangen und lokal verfuegbar ist.
- Die Response-Verarbeitung von CreateCampaign besteht verbindlich aus:
  1. API-Call echt ausfuehren
  2. Response vollstaendig empfangen
  3. nur die erlaubten ID-Kandidaten pruefen
  4. extrahierte Campaign-ID validieren und intern zu String normalisieren
  5. genau einen `campaignRead` mit dieser normalisierten `campaignId` ausfuehren
  6. aus diesem `campaignRead` ausschliesslich `response.templateId` als campaign-owned `templateId` und `response.campaignState` zur Status-Validierung lesen
  7. genau einen `templateRead` der aktuellen campaign-owned HTML-Shell mit diesem `templateId` ausfuehren
  8. nur dann den HTML-Write starten, wenn `campaignState` explizit editierbar ist; `Ready` ist der bevorzugte erwartete Status
- `campaignId` identifiziert die Campaign-Bindung und darf nie als `templateId` interpretiert oder weitergereicht werden.
- Der finale HTML-Write braucht die campaign-owned `templateId` der neu erstellten oder bereits gebundenen Campaign.
- Bei Erfolg ist nur ein Minimal-Log mit `campaignId` und `name` zulaessig.
- Bei Fehlern ist ein Voll-Log mit finalem Request ohne Secrets, HTTP-Status-Info, Raw-Body-Info, geprueften ID-Kandidaten, Ablehnungsgrund der Kandidaten und Tool-Antwort-/Envelope-Info Pflicht.
- Wenn die Tool-Antwort leer, unparsebar, unvollstaendig oder anderweitig nicht verwertbar ist, endet dieser Export sofort als Tool-Runtime-/Envelope-Fehler.
- Wenn ein HTTP-Status vorliegt, aber der Status oder Body keine verwertbare ID liefert, endet dieser Export sofort als Iterable-API-Fehler.
- Wenn ein Body vorliegt, aber die ID nur in einer unbekannten Struktur liegt, endet dieser Export sofort als Parser-Fehler.
- Ohne `campaignId` darf kein HTML-Write und kein weiterer Exportschritt starten.
- Ohne `campaignId` gibt es keinen zweiten best-effort-Lauf und keinen impliziten Reparaturversuch im selben Export.
- Nach einem fehlgeschlagenen Create ohne verwertbare `campaignId` darf weder automatisch ein neuer Create noch ein Update-/Write-Versuch gestartet werden.
- Ein erneuter Exportversuch ist erst nach neuer expliziter User-Freigabe zulaessig.
- Im Export-Flow sind automatische Send-, Schedule- und weitere Template-Read-Schritte nach `createCampaign` verboten.
- Nach `createCampaign` ist genau ein `campaignRead` erlaubt, und zwar ausschliesslich zum Holen der campaign-owned `templateId` und zur Status-Validierung.
- Nach bekanntem `templateId` ist genau ein `templateRead` der aktuellen campaign-owned HTML-Shell erlaubt.
- Der Builder-Export erwartet nach `createCampaign` bevorzugt `campaignState = Ready`.
- Bei `Scheduled`, `Running`, `Finished`, `Archived`, `Recurring`, `Aborted` oder jedem anderen nicht explizit als editierbar belegten Status stoppt der Export sofort vor dem Write.
- Ein zusaetzlicher Status-Reset-Call ist im Export nicht erlaubt, solange Iterable dafuer keinen offiziell dokumentierten Endpoint fuer `Ready` oder `Draft` bereitstellt.
- Kein Status-Reset, kein Cancel, kein Archive und keine sonstige Reparatur einer nicht editierbaren Campaign per Agent.
- Neue Campaigns muessen beim Create-Schritt standardmaessig nach dem festen Schema `CreativeOps_emb_YYYY-MM-DD` benannt werden.
- Dabei ist `CreativeOps_emb` der feste Prefix; das Datum muss aus dem aktuellen Lauf stammen und im Format `YYYY-MM-DD` gesetzt werden.
- Freie generische Namen wie `Test Mail`, `Preview Mail` oder aehnliche Platzhalter sind fuer neue Campaigns nicht zulaessig.
- Wenn fuer die aktuelle Preview bereits eine verwertbare `campaignId` im aktuellen Export-State vorliegt, ist ein erneuter CreateCampaign-Schritt verboten; dann muss genau diese bestehende Campaign aktualisiert werden.

## Verbindlicher Happy Path

Im direkten Happy Path laeuft der Export genau in dieser Reihenfolge:

1. Aktuellen `email_state` lesen.
2. Wenn dieser `email_state` fehlt oder unvollstaendig ist: genau einmal einen engen Recovery-Fallback aus der letzten sichtbaren Preview aufbauen und anschliessend als `email_state` fortschreiben.
3. Gegen `export-map.json` jedes Modul, `snippet_name` und jedes Feld validieren.
4. Required Felder aus `content` oder den Defaults der Export-Map befuellen.
5. Nur wenn keine verwertbare `campaignId` fuer diese Mail vorliegt: den CreateCampaign-Request exakt mit `name` und der aktiven Basis-`templateId` aus dem Exportkontext bauen.
6. Wenn Schritt `5` lief: genau einen CreateCampaign-Call ausfuehren, explizit auf die vollstaendige Response warten und bei Fehlern finalen Request ohne Secrets, HTTP-Status-Info, Raw-Body-Info und Tool-Antwort-/Envelope-Info lokal erfassen.
7. Wenn Schritt `6` lief: aus der vollstaendig empfangenen Create-Antwort nur die erlaubten ID-Kandidaten pruefen, die erste verwertbare Campaign-ID extrahieren, validieren und intern als String normalisieren. Wenn keine verwertbare ID extrahierbar ist oder die Antwort leer, unparsebar oder unvollstaendig ist: Export sofort abbrechen.
8. Wenn Schritt `6` lief: genau einen `campaignRead` mit dieser `campaignId` ausfuehren und daraus ausschliesslich `response.templateId` als campaign-owned `templateId` sowie `response.campaignState` lesen. Wenn `templateId` fehlt, `campaignState` nicht explizit editierbar ist oder `campaignState` nicht als `Ready` oder anderer belegter editierbarer Status akzeptiert werden kann: Export sofort abbrechen. Bei `Scheduled`, `Running`, `Finished`, `Archived`, `Recurring` oder `Aborted` stoppt der Export immer sofort. Wenn Schritt `6` nicht lief, muss die bereits gebundene campaign-owned `templateId` fuer genau diese Mail im aktuellen Export-State vorliegen; fehlt sie, Export sofort abbrechen.
9. Mit diesem verfuegbaren campaign-owned `templateId` genau einen `templateRead` der aktuellen campaign-owned HTML-Shell ausfuehren. Wenn die Shell leer, unvollstaendig oder nicht lesbar ist, Export sofort abbrechen.
10. Modularen Snippet-Call-Block lokal genau einmal aus `email_state + export-map.json` bauen und nur in die erlaubten Replace-Zonen der gelesenen campaign-owned HTML-Shell einsetzen.
11. Finale HTML-Payload lokal kurz pruefen.
12. Nur wenn `templateId`, `html`, `subject` und `preheaderText` vollstaendig vorliegen, `campaignState` explizit editierbar ist, `campaignState` nicht `Scheduled`, `Running`, `Finished`, `Archived`, `Recurring` oder `Aborted` ist und die campaign-owned HTML-Shell ausserhalb der Replace-Zonen unveraendert blieb: genau einen Write ueber `POST /api/templates/email/update` mit `templateId`, `html`, `subject` und `preheaderText` ausfuehren.
13. Beim Write den HTTP-Status pruefen; bei Fehlern HTTP-Status und vollstaendigen Response-Body loggen und Export sofort abbrechen.
14. Nach einem erfolgreichen erstmaligen Export die `campaignId` und die campaign-owned `templateId` an genau diese aktuelle Mail und ihren `email_state` zurueckschreiben.

- Ein zusaetzlicher QA-Read ist optional, nicht verpflichtend.
- Weitere Iterable-Calls ausser `createCampaign`, genau einem `campaignRead` fuer die campaign-owned `templateId`, genau einem `templateRead` der campaign-owned HTML-Shell und dem finalen HTML-Write sind im Happy Path verboten.

## Happy Path

- Fuer die unterstuetzten Module gilt das statische Export-Mapping aus `export-map.json`.
- Im direkten Happy Path wird der aktuelle `email_state` genau einmal lokal in den modularen Snippet-Call-Block uebersetzt und genau einmal mit der gelesenen campaign-owned HTML-Shell zusammengefuehrt.
- Der `email_state` ist dabei die einzige feldnahe Arbeitskopie fuer den Export.
- `export-map.json` ist die einzige technische Feld- und Modulwahrheit fuer den Export.
- Bekannte Snippet-Namen, Pflichtparameter, feste Werte und Defaults werden nicht erneut lang hergeleitet.
- Keine doppelte Uebersetzung, keine doppelte Rekonstruktion, keine schrittweise Technik-Erklaerung im Chat.
- Keine unnoetigen Iterable-Read-Backs fuer Informationen, die lokal bereits feststehen, ausser dem verpflichtenden einen `templateRead` der campaign-owned HTML-Shell.
- Keine Snippet-Inspection-Schleifen fuer bekannte Module im Fast-Path.
- Keine erneute Signatur-Pruefung einzelner Fast-Path-Module waehrend des Exports.
- Wenn `export-map.json` fuer ein Modul ein vollstaendiges Feldset definiert, ist genau dieses Feldset direkt auszufuehren.
- Preview-HTML oder Snippet-HTML werden im Happy Path nicht gescannt.
- Der Recovery-Fallback ist kein zweiter Happy Path, sondern nur ein einmaliger Reparaturschritt, wenn `email_state` fehlt oder unvollstaendig ist.

## Export Fast Path

- Der normale Export-Happy-Path ist ein Runtime-Fast-Path und bewertet nur die fuer den Write unmittelbar noetigen Quellen und Schritte.
- Dieser Runtime-Fast-Path veraendert den fachlichen Export-Flow nicht, sondern begrenzt nur den regulaeren Pruefkontext im fehlerfreien Exportfall.
- Im normalen Export ohne Fehler und ohne Recovery-Fallback gilt genau diese operative Reihenfolge:
  1. vorhandenen `email_state` verwenden
  2. gegen `export-map.json` validieren
  3. `createCampaign` nur mit `name` und `templateId`, falls keine verwertbare `campaignId` existiert
  4. genau einen `campaignRead`
  5. genau einen `templateRead` der campaign-owned `templateId`
  6. Snippet-Block und finale HTML-Payload lokal bauen
  7. finale Payload lokal pruefen
  8. genau einen HTML-Write ausfuehren
  9. kurze Abschlussmeldung ausgeben
- Solange kein Fehler, kein fehlender `email_state` und kein ausdruecklich benoetigter Recovery-Fallback vorliegt, wertet der Agent fuer den normalen Export-Happy-Path diese Quellen und Kontexte nicht erneut aus:
  - `preview-modules.html`
  - `preview-module-library.md`
  - `preview-template.html`
  - `template-*.preview.html`
  - Preview-HTML-Strukturen der letzten sichtbaren Mail
  - Modul-Design-Dokumentation
  - Parity-, Integrations- oder Modulpflege-Regeln
  - Design-Library-Regeln
- Diese Ausschluesse gelten nur fuer den normalen Export-Happy-Path.
- Fuer Preview-Erstellung, Recovery-Fallback, Modulpflege, Template-Arbeit, Integrationsarbeit und Fehleranalyse bleiben diese Dateien und Regelbereiche weiterhin gueltige Agent-Quellen.
- Wenn der normale Export-Happy-Path wegen fehlendem oder unvollstaendigem `email_state`, Mapping-Fehlern, Payload-Fehlern oder API-/Status-Fehlern verlassen werden muss, greifen wieder die regulaeren Fail-Closed-, Recovery- und Fehlerregeln dieser Datei.
- Auch im Runtime-Fast-Path bleiben alle Sicherheitsstopps, Pflichtvalidierungen, Statuspruefungen, Write-Voraussetzungen und Fail-Closed-Regeln vollstaendig aktiv.

## Exporttreue

- Die technische Iterable-Mail muss dieselbe Mail sein wie die letzte Preview:
  - gleiches Subject
  - gleicher Preheader
  - gleiche Modulfolge
  - gleiche Modultypen
  - gleiche Inhalte
  - gleiche CTA-Ziele
  - gleiche sichtbare Teilbereiche
  - gleiche sichtbare Item-Anzahl

## Text-QA

- Vor dem finalen Campaign-Write muessen generierte deutsche Fliesstexte bereits direkt korrekt mit echten Umlauten vorliegen.
- `ae`, `oe` und `ue` sind als Umlaut-Ersatz in normalem deutschem Fliesstext nicht zulaessig, ausser bei Eigennamen, URLs, E-Mail-Adressen und technischen Werten.
- Im Export gibt es keine nachgelagerte Umlaut-Korrektur, keine ASCII-Normalisierung und keine sonstige Zeichenumwandlung.
- Wenn generierter deutscher Fliesstext vor dem Export noch Umlaut-Ersatzschreibungen enthaelt, ist das ein lokaler Textfehler und der Export blockiert.

## Fail Closed

- Eine bestehende `campaignId` darf nur dann wiederverwendet werden, wenn sie im aktuellen Export-State genau der aktuellen fortgeschriebenen Preview zugeordnet ist.
- Eine Campaign-Bindung aus einer frueheren, verlassenen oder neu gestarteten Preview darf nie auf eine neue Preview uebertragen werden.
- Vor jedem weiteren Exportschritt nach CreateCampaign muss eine verwertbare `campaignId` vorliegen.
- Wenn im Builder-Export `listIds` im CreateCampaign-Request auftaucht, scheitert der Export sofort vor dem API-Call.
- Wenn kein Composition-Template genutzt wird und der CreateCampaign-Request vom Standard-Payload mit `templateId = 569946` ohne weitere Versand- oder Scheduling-Felder abweicht, scheitert der Export sofort vor dem API-Call.
- Wenn ein aktives Composition-Template genutzt wird und der CreateCampaign-Request nicht exakt dessen `iterable_template_id` als `templateId` sowie sonst keine Versand- oder Scheduling-Felder verwendet, scheitert der Export sofort vor dem API-Call.
- Wenn ein aktives Composition-Template genutzt wird und `iterable_template_id = null` ist, scheitert der Export sofort vor dem API-Call.
- Wenn `sendAt` im CreateCampaign-Request auftaucht, scheitert der Export sofort vor dem API-Call.
- Wenn `scheduleSend` im CreateCampaign-Request auftaucht, scheitert der Export sofort vor dem API-Call.
- Wenn `sendMode` oder `recipientTimeZone` im CreateCampaign-Request auftauchen, scheitert der Export sofort vor dem API-Call.
- Wenn die CreateCampaign-Antwort keine verwertbare extrahierbare Campaign-ID in den erlaubten Kandidaten enthaelt, scheitert der Export sofort.
- Wenn die CreateCampaign-Antwort leer, unparsebar oder unvollstaendig ist, scheitert der Export sofort.
- Wenn auf die CreateCampaign-Response nicht explizit gewartet wurde oder die Response-Verarbeitung offen bleibt, scheitert der Export sofort.
- Wenn `campaignId` im Write-Schritt als `templateId` verwendet oder an einen Template-Write gebunden wuerde, scheitert der Export sofort.
- Wenn fuer den Write-Schritt keine campaign-owned `templateId` fuer genau diese Campaign vorliegt, scheitert der Export sofort.
- Wenn die campaign-owned `templateId` nicht explizit aus `response.templateId` des einen erlaubten `campaignRead` stammt, scheitert der Export sofort.
- Wenn der eine erlaubte `campaignRead` nach `createCampaign` nicht ausgefuehrt oder fuer etwas anderes als die campaign-owned `templateId` und den `campaignState` genutzt wird, scheitert der Export sofort.
- Wenn der eine erlaubte `campaignRead` `campaignState = Scheduled` zurueckliefert, scheitert der Export sofort vor dem Write.
- Wenn der eine erlaubte `campaignRead` `campaignState = Running`, `Finished`, `Archived`, `Recurring` oder `Aborted` zurueckliefert oder der Status sonst nicht explizit als editierbar belegbar ist, scheitert der Export sofort vor dem Write.
- Ohne `campaignId` sind HTML-Write und jeder weitere Exportschritt verboten.
- Wenn fuer die aktuelle Preview bereits eine verwertbare `campaignId` vorliegt, darf kein zweiter CreateCampaign-Schritt fuer denselben Preview-Zweig gestartet werden.
- Bei leerer oder unbrauchbarer CreateCampaign-Antwort endet derselbe Lauf sofort; kein spontaner Reparaturversuch, kein zweiter best-effort-Write und kein weiterer Folgeversuch im selben Export.
- Wenn keine verwertbare Campaign-ID extrahiert werden kann, muss die Fehlerausgabe exakt `Iterable createCampaign hat keine gueltige campaignId zurueckgegeben` enthalten, die Fehlerklasse benennen, den finalen Request ohne Secrets, die HTTP-Status-Info, die Raw-Body-Info, die geprueften ID-Kandidaten, den Ablehnungsgrund und den Hinweis `Kein Campaign-Read und kein HTML-Write wurden ausgefuehrt.` enthalten.
- Wenn `campaignId` nach CreateCampaign fehlt, darf der Agent nicht automatisch eine weitere Kampagne anlegen und nicht selbststaendig in einen neuen Exportlauf wechseln.
- Wenn fuer einen Folge-Export mit bereits vorhandener `campaignId` keine bereits gebundene campaign-owned `templateId` im aktuellen Export-State vorliegt, scheitert der Export sofort.
- Wenn kein `templateRead` der aktuellen campaign-owned HTML-Shell ausgefuehrt wurde, scheitert der Export sofort.
- Wenn mehr als ein `templateRead` im selben Export-Lauf ausgefuehrt wurde, scheitert der Export sofort.
- Im selben Export-Lauf ist nur genau ein `campaignRead` erlaubt, und zwar ausschliesslich direkt nach `createCampaign` zum Holen der campaign-owned `templateId`.
- Im selben Export-Lauf ist nur genau ein `templateRead` erlaubt, und zwar ausschliesslich zum Lesen der aktuellen campaign-owned HTML-Shell.
- Vor dem Write muss ein gueltiger `email_state` vorliegen.
- Wenn die finale HTML-Payload lokal mehr als einmal zusammengefuegt wuerde, scheitert der Export sofort.
- Wenn keine Campaign-ID sauber aus den erlaubten ID-Kandidaten der vollstaendig empfangenen CreateCampaign-Response extrahiert und als String normalisiert werden kann, scheitert der Export sofort.
- Wenn die campaign-owned `templateId` nicht verfuegbar ist, darf kein Write mit `campaignId` als Ersatzwert gestartet werden.
- Wenn fuer den Write ein anderer Endpoint als `POST /api/templates/email/update` verwendet wuerde, scheitert der Export sofort.
- Wenn der Write-Payload nicht exakt `templateId`, `html`, `subject` und `preheaderText` enthaelt, scheitert der Export sofort.
- Wenn `subject` oder `preheaderText` vor dem Write fehlen, scheitert der Export sofort.
- Wenn die finale HTML-Payload lokal leer, unvollstaendig oder ohne vollstaendige HTML-Shell ist, scheitert der Export sofort.
- Wenn die finale HTML-Payload die gelesene campaign-owned HTML-Shell ausserhalb der erlaubten Replace-Zonen veraendert, scheitert der Export sofort.
- Wenn die finale HTML-Payload eine freie Minimal-Shell, eine lokal neu erfundene Shell oder nur einen modularen Block ohne vollstaendige Template-Shell enthaelt, scheitert der Export sofort.
- Wenn die finale HTML-Payload lokal nur aus nacktem Snippet-Text besteht, scheitert der Export sofort.
- Wenn die lokale Payload-Pruefung scheitert, wird kein Write versucht.
- Jedes aktive Modul im `email_state` muss genau ein eindeutiges Export-Mapping aus `export-map.json` haben.
- Es duerfen nur Felder geschrieben werden, die fuer dieses Modul dort registriert sind.
- Unknown Fields im `email_state.content` fuehren sofort zu einem Fehler und werden nie exportiert.
- Pflichtfelder muessen ueber `content` oder Defaults der Export-Map vollstaendig befuellt werden.
- Wenn Modultyp, Mapping, Pflichtfelder oder `snippet_name` nicht sauber zusammenpassen, scheitert der Export.
- Wenn ein required `*_bg_color` im `email_state.content` fehlt, scheitert der Export.
- Wenn ein required `*_bg_color` im `email_state.content` nur als `theme-*`-Klasse, semantischer Farbname oder anderer nicht-konkreter Marker vorliegt, scheitert der Export.
- Wenn nach dem einmaligen Recovery-Fallback weiterhin kein vollstaendiger `email_state` vorliegt, scheitert der Export.
- `steps-3col` wird genau einmal ueber `module_id`, `snippet_name` und `content` exportiert; Desktop- und Mobile-Markup im Snippet sind reine Renderdetails.
- Wenn keine vollstaendige finale HTML-Payload lokal vorliegt, scheitert der Export.
- Wenn nur nackte `SNIPPET_CALLS` oder ein isolierter Modulblock geschrieben wuerden, scheitert der Export.
- Bei Write- oder Parameterfehlern endet derselbe Lauf sofort; kein spontaner Reparaturversuch und kein zweiter best-effort-Write.

## Fehlerklassen fuer Schritt 5

- A. `Finale HTML-Payload konnte nicht vollstaendig gebaut werden.`
- B. `Finale HTML-Payload verletzte die Template-Shell-Regel.`
- C. `Finale HTML-Payload wurde lokal gebaut, aber der Iterable-Write ist fehlgeschlagen.`
- D. `Finale HTML-Payload war lokal leer oder unvollstaendig.`
- E. `Finale HTML-Payload verletzt eine Fail-Closed-Regel und wurde nicht geschrieben.`

## Fehlerklassen fuer CreateCampaign

- A. `Tool-Runtime-/Envelope-Fehler bei Iterable createCampaign.` Dieser Fall gilt, wenn kein HTTP-Status, kein Raw-Body und keine sonst verwertbare Tool-Antwort vorliegen.
- B. `Iterable-API-Fehler bei createCampaign.` Dieser Fall gilt, wenn ein HTTP-Status vorliegt, aber der Status oder der Body keine verwertbare extrahierbare Campaign-ID liefert.
- C. `Parser-Fehler bei createCampaign.` Dieser Fall gilt, wenn ein Body vorliegt, aber keine ID in den erlaubten Kandidatenpfaden gefunden oder akzeptiert werden kann.

## Chat-Ausgabe

- Im normalen Exportmodus nur userfreundliche Kurzmeldungen ausgeben.
- Vor dem Export:
  - `Ich exportiere die E-Mail jetzt nach Iterable.`
- Bei laengerer Verarbeitung optional:
  - `Der Export laeuft noch. Ich aktualisiere gerade die E-Mail in Iterable.`
- Nach erfolgreichem Export:
  - `Fertig — Export erfolgreich. campaignId=<id>, name=<name>.`
- Optional darf nach erfolgreichem Export eine kurze statusorientierte Ausgabe ohne Secrets folgen:
  - `createCampaign: ok` oder `createCampaign: skip`
  - `campaignRead: ok`
  - `templateRead: ok`
  - `htmlWrite: ok`
  - `result: campaignId=<id>, name=<name>`
- Bei Fehlern:
  - `Der Export konnte nicht abgeschlossen werden. Grund: <kurze verstaendliche Ursache>.`
- Ausnahme fuer CreateCampaign-Fehler:
  - Wenn `createCampaign` keine gueltige `campaignId` liefert, muessen die Fehlermeldung `Iterable createCampaign hat keine gueltige campaignId zurueckgegeben`, die Fehlerklasse, der finale Request ohne Secrets, die HTTP-Status-Info, die Raw-Response-Body-Info, die geprueften ID-Kandidaten, der Ablehnungsgrund und der Hinweis `Kein Campaign-Read und kein HTML-Write wurden ausgefuehrt.` ausgegeben werden.
- Im normalen Exportmodus keine technischen Zwischenmeldungen ausgeben wie:
  - API-Hostnames
  - Endpoint-Namen
  - Recovery-Fallback
  - `export-map.json`
  - `email_state`
  - campaign-owned Template
  - Template-Shell
  - Replace-Zone
  - Slot-Erkennung
  - Snippet-Call-Block
  - HTML-Shell
  - interne IDs, ausser sie sind fuer den User wirklich noetig
  - technische Aussagen wie `ich lese jetzt`, `ich schreibe nun` oder aehnliche Debug-Schritte
- Auch wenn intern der Recovery-Fallback genutzt wurde, bleibt die Chat-Ausgabe im normalen User-Modus bei denselben kurzen Statusmeldungen und nennt diesen technischen Sonderfall nicht.
- Wenn der User ausdruecklich technische Details anfordert, duerfen Debug-Infos getrennt vom normalen Exportprozess erklaert werden, zum Beispiel zu API-Schritten, Ursache langer Laufzeiten oder technischer Fehleranalyse.
- Verlaessliche Timing-Werte sind fuer diese Kurz-Statusausgabe nicht verpflichtend; wenn die Runtime keine belastbaren Zeitstempel liefert, bleibt die Ausgabe rein statusorientiert.
