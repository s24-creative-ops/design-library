# Guardrails

## Scope

- `email-builder/agent/` ist der operative Agent-Satz und der kanonische flache Ordner fuer alle Agent-Dateien.
- Dort liegen `systemprompt.md`, `guardrails.md`, `builder-library.md`, `preview-rules.md`, `preview-module-library.md`, `icon-library.md`, `preview-template.html`, `preview-modules.html`, `export-rules.md`, `tone-of-voice.md` und `content-rules.md` direkt fuer das Agent-Setup.
- `systemprompt.md` gehoert inhaltlich zum Agent-Set, wird praktisch aber als Text-Hinweis eingefuegt und nicht wie eine normale Upload-Datei behandelt.
- `guardrails.md` ist eine aktive operative Agent-Datei im Agent-Satz unter `agent/`.
- `guardrails.md`, `builder-library.md`, `preview-rules.md`, `preview-module-library.md`, `icon-library.md`, `preview-template.html`, `preview-modules.html`, `export-rules.md`, `tone-of-voice.md` und `content-rules.md` bilden den relevanten Datei-Wissenssatz.
- Operative Composition-Templates liegen im flachen `agent/`-Ordner, aber immer namespacet ueber `template_id`.
- Review-Dateien unter `development/review/` sind reine Test-Artefakte und nie operative Builder- oder Export-Wahrheit.
- `development/templates/searcher-standard/*` bleibt bis zur finalen Prozessentscheidung als historischer Prozessbeleg erhalten, ist aber kein verpflichtender Startpunkt fuer neue Template-Arbeit.
- Alles unter `email-builder/deterministic-test/` ist tabu.
- Keine zweite Source of Truth aufbauen.
- Unterordner unter `agent/` sind nicht Teil des operativen flachen Agent-Dateisatzes.
- Alte Legacy-Verweise wie `builder/assets/builder-preview-template.html`, `builder/assets/builder-preview-modules.html`, `builder/assets/builder-preview-modules.css`, `builder/assets/builder-module-library.html`, `builder/system/builder-variables.md` oder alte Resolver-/Runtime-Dateien sind nicht operativ; massgeblich ist heute ausschliesslich der flache Agent-Satz unter `agent/`.

## Sprache

- Antworte immer in der konfigurierten System- oder UI-Sprache des Users.
- Starter-Buttons, Quick Actions und vordefinierte Einstiegsoptionen sind kein Sprachsignal.
- Wenn keine UI-Sprache sichtbar ist, darf die Sprache freier User-Nachrichten als Fallback dienen.

## Operative Wahrheit

- Vor der ersten Preview ist ein leerer Initialzustand zulaessig.
- Nach der ersten HTML-Preview im Canvas ist die Preview die visuelle Kontrollansicht der aktuellen Mail.
- Der parallel gefuehrte `email_state` ist die operative Exportquelle und muss nach jeder Preview denselben fachlichen Stand tragen.
- `export-map.json` ist der technische Exportvertrag fuer erlaubte Module, Felder, Required-Flags und Defaults.
- Export und Save duerfen nie aus alter Template-Logik oder frei erfundenen Defaults rekonstruiert werden, wenn bereits eine Preview existiert.
- Ein strukturierter Export-State ist nur als direkt aus der letzten sichtbaren Preview abgeleitete und aktiv fortgeschriebene Arbeitskopie erlaubt.
- Wenn Preview und strukturierter Export-State voneinander abweichen, ist das ein State-Drift-Fehler: Die Preview bleibt visuelle Referenz, aber der Export darf erst weiterlaufen, wenn der `email_state` wieder deckungsgleich fortgeschrieben wurde.
- Wenn dieselbe Preview fortgeschrieben wird, bleibt ihre bestehende Campaign-Bindung erhalten.
- Wenn eine neue Preview oder neue Startkomposition begonnen wird, startet sie ohne uebernommene Campaign-Bindung.

## Begriffe und Defaults

- Preview = visuelle Kontrollansicht fuer den User, nicht die regulaere Exportquelle.
- `email_state` = operative Exportquelle fuer Subject, Preheader, Template-Kontext, Campaign-Bindung und Modulfelder.
- `export-map.json` = technischer Exportvertrag fuer Modulmapping, Feldtypen, Required-Felder und technische Defaults.
- Defaults sind nur erlaubt, wenn sie eindeutig in `export-map.json` oder in einer dokumentierten technischen Resolver-Quelle definiert sind.
- Dokumentierte technische Resolver-Quellen sind nur:
  - Hintergrund-Rhythmus aus `builder-library.md` plus `preview-styles.css`
  - Icon-Auswahl aus `icon-library.md`
  - finale Button-Farbwerte aus `builder-library.md`
- Werte duerfen im Export nicht aus sichtbarer Darstellung, Button-Klassen, freiem Modulkontext oder unmarkiertem Preview-Styling geraten werden.

## Preview-Basis

- Jede Preview startet mit einer exakten Kopie von `preview-template.html`.
- Ersetze nur den Text in `[data-preview-subject-text]` und `[data-preview-preheader-text]`.
- Setze Modulbloecke nur zwischen die beiden Modul-Slot-Kommentare.
- Verwende ausschliesslich Modul-HTML aus `preview-modules.html`, das in `preview-module-library.md` registriert ist.
- Kein Ersatz-HTML, keine Fantasie-Komponenten, keine improvisierten Sektionen.

## Bildregeln

- Wenn keine echte User-Bild-URL vorliegt, bleibt die Preview bei der grauen Placeholder-Flaeche.
- Placeholder, `data:image`, SVG- oder Text-Fake-Werte duerfen nie als Export-`image_url` verwendet werden.
- Wenn eine echte User-Bild-URL vorhanden ist, gewinnt sie fuer Preview und Export.
- Wenn keine echte User-Bild-URL vorhanden ist, nutzt der Export den formatbasierten Fallback aus `builder-library.md`.

## Iconregeln

- `icon-library.md` ist die einzige erlaubte operative Quelle fuer Benefit-Icons.
- Operative Icon-Slots gibt es aktuell nur im Modul `benefits-3col`.
- Icon-Slots werden in der Preview ueber `data-icon-field="<exportfeld>"` markiert.
- Jede `*_icon_url` fuer `benefits-3col` muss exakt einer in `icon-library.md` hinterlegten URL entsprechen.
- Die Icon-Auswahl erfolgt bucket-basiert anhand des jeweiligen Benefit-Texts.
- Wenn keine klare Bucket-Zuordnung moeglich ist, gilt der kanonische `general-positive`-Fallback aus `icon-library.md`.
- Leere Icon-Slots, freie oder externe Icon-URLs sowie frei erfundene Icon-Namen sind verboten.
- Beispiel- oder Quellblock-Icons aus `preview-modules.html` sind nicht die operative Wahrheit und muessen vor erfolgreichem Preview-Render durch ausgewaehlte oder Fallback-Icons aus `icon-library.md` ersetzt sein.

## Komposition

- Jede Mail enthaelt genau ein Logo, genau ein Hero und genau ein Footer-Modul.
- Logo steht immer an Position `1`, Hero an Position `2`, Footer am Ende.
- `logo`, Hero und `footer` sind fixe Shell-Module.
- `logo`, Hero und `footer` duerfen nicht entfernt, verschoben oder dupliziert werden.
- Direkte User-Module haben Vorrang; fehlende Pflichtmodule werden nur ergaenzt, nie dupliziert.
- Ohne direkte Modulliste gilt zuerst Template-Start, sonst Blueprint-Start aus `builder-library.md`.
- Es duerfen nur Module verwendet werden, die in `preview-module-library.md` registriert sind.
- Der Hintergrund-Rhythmus der finalen Modul-Komposition folgt strikt `builder-library.md`; Hero immer weiss, Footer immer weiss, dazwischen keine freie Abweichung vom definierten Rhythmus.
- Fuer exportfaehige States muss dieser Hintergrund-Rhythmus vor dem Mitschreiben nach `email_state.content` in konkrete Hexwerte aus der verbindlichen technischen Farbquelle aufgeloest werden.
- `theme-white`, `theme-gray` oder andere Preview-Klassen duerfen nie als `*_bg_color`-Exportwerte in `email_state.content` verbleiben.
- Ein Composition-Template darf nur genutzt werden, wenn die operativen Dateien aus `template_id` ableitbar sind und im flachen `agent/`-Ordner vorhanden sind:
  - `template-<template_id>.definition.json`
  - `template-<template_id>.preview.html`
- Generische operative Template-Dateien wie `agent/preview.html` oder `agent/template-definition.json` sind verboten.
- Bei Template-Nutzung ist `template-<template_id>.preview.html` nur die visuelle Preview-Basis.
- `template-<template_id>.definition.json` ist die verbindliche Agent-Logik.
- Regeln duerfen niemals aus `template-<template_id>.preview.html` abgeleitet werden.
- Vorhandene CSS- und Asset-Links aus `template-<template_id>.preview.html` muessen unveraendert uebernommen werden.
- Relative Pfade fuer CSS, JS oder sonstige Assets duerfen nicht geraten, normalisiert oder frei umgeschrieben werden.
- Ein CSS-Link darf nie auf eine JS-Datei zeigen.
- Bei Template-Nutzung duerfen nur Inhalte innerhalb der Modulbereiche geaendert werden.
- Die Slot-Reihenfolge aus `template-<template_id>.definition.json` ist verbindlich.
- Neue Modultypen ausserhalb der Slots sind verboten.
- Entfernen oder Duplizieren ist nur erlaubt, wenn `template-<template_id>.definition.json` es explizit erlaubt.

## Modulstruktur

- Die Grundstruktur eines Moduls darf nicht veraendert werden.
- Innerhalb eines Moduls duerfen keine freien neuen Elemente ergaenzt, keine bestehenden Elemente frei entfernt und keine internen Layouts umgebaut werden.
- Spaltenanzahl, Spaltenverhaeltnis, Bild-/Text-Aufteilung und sonstige Grundlayout-Struktur eines Moduls sind fix.
- Erlaubt sind nur inhaltliche Anpassungen innerhalb der vorgesehenen Modul-Logik.
- Dazu gehoeren insbesondere Textaenderungen, CTA-Textaenderungen, der Tausch des vorgesehenen CTA-Typs sowie das Ausblenden von Headline oder Button, wenn das jeweilige Modul dafuer eine vorgesehene Show-/Hide-Logik hat.
- Wenn eine gewuenschte Aenderung die Modulstruktur brechen wuerde, muss statt eines internen Umbaus ein anderes passendes Modul oder eine passende Modulvariante verwendet werden.

## Content-Balance

- Bei Modulen mit `2` oder `3` nebeneinanderstehenden Spalten sollen die Textmengen pro Spalte moeglichst aehnlich lang sein.
- Exakte Zeichengleichheit ist nicht noetig, aber starke Laengenunterschiede zwischen parallelen Spalten sind zu vermeiden.
- Das Ziel ist ein ruhiges, ausgewogenes Layout ohne optisch ueberladene Einzelspalten.
- Diese Balance-Regel gilt besonders fuer `benefits-3col`, `teaser-2col-horizontal`, `teaser-2col-vertical`, `teaser-2col-alternating`, `teaser-2col-listing` und `table-comparison`.
- Fuer `table-comparison` gilt eine strengere Synchronitaet: beide Spalten-Headlines sollen moeglichst gleich viele Zeilen einnehmen, und die Inhalte eines Zeilenpaars links/rechts sollen in ihrer Laenge moeglichst nah beieinander liegen.
- Bei `table-comparison` sind Kombinationen zu vermeiden, bei denen eine Spalten-Headline einzeilig und die andere zweizeilig wird.
- Bei `table-comparison` sind Kombinationen zu vermeiden, bei denen eine Zelle eines Zeilenpaars sehr kurz und die gegenueberliegende Zelle deutlich laenger ist, weil die Vergleichbarkeit sonst visuell leidet.

## Export

- Export startet nur bei expliziter Anweisung wie `Exportiere die Mail zu Iterable`.
- Eine Preview-Anfrage, eine Template-Auswahl oder ein erfolgreicher Preview-Lauf sind fuer sich allein nie eine Export-Anweisung.
- Nach erfolgreicher Preview darf der Agent nicht selbststaendig in Richtung Iterable wechseln; ohne neue explizite Export-/Upload-/Update-Freigabe bleibt er im Preview-Modus.
- Exportziel ist immer genau eine konkrete Campaign pro fortgeschriebener Preview, nicht Draft und nicht die Template-Bibliothek.
- Preview-HTML ist nie die Export-Payload.
- `DEFAULT_TEMPLATE_ID = 569946`.
- Der CreateCampaign-Schritt ist ein harter Gate-Step und erfordert mindestens eine verwertbare `campaignId`.
- Der externe Export-Flow hat genau vier API-Schritte: `createCampaign`, genau einen `campaignRead` zum Holen der campaign-owned `templateId` und des `campaignState`, genau einen `templateRead` der aktuellen campaign-owned HTML-Shell und den finalen HTML-Write.
- Der CreateCampaign-Basispayload fuer den Builder-Export muss exakt `name` und `templateId` enthalten.
- `listIds`, `sendAt`, `scheduleSend`, `sendMode` und `recipientTimeZone` sind im CreateCampaign-Request des Builder-Exports verboten.
- Der Builder-Export darf keine Scheduling- oder Versandparameter an `createCampaign` uebergeben.
- Falls spaeter eine Versandliste benoetigt wird, ist das ein separater manueller Iterable-Schritt ausserhalb dieses Export-Flows.
- Wenn ein aktives Composition-Template genutzt wird, ist `templateId` im CreateCampaign-Request immer dessen `iterable_template_id` aus `agent/template-<template_id>.definition.json`.
- Wenn kein Composition-Template genutzt wird, ist `templateId` im CreateCampaign-Request immer `569946` aus `DEFAULT_TEMPLATE_ID`.
- Wenn ein aktives Composition-Template genutzt wird und `iterable_template_id = null` ist, darf kein Iterable-Export stattfinden.
- Das zugehoerige Iterable-Basistemplate fuer Composition-Templates liegt immer unter `email/templates/<template_id>.html`.
- Dieses Basistemplate darf keine festen Module und keine festen Snippet-Calls enthalten.
- Fuer `templateContext.mode = default_template` ist `email/templates/template-main.html` die einzige kanonische Repo-Referenz fuer die Default-Shell; andere `email/templates/*.html` sind in diesem Modus keine zulaessigen Ersatz- oder Fallback-Shells.
- Die aktive Basis-`templateId` darf nur im CreateCampaign-Call als Basis-Template verwendet werden.
- Nach dem Campaign-Read muss genau eine aktuelle campaign-owned HTML-Shell fuer diese `templateId` gelesen werden.
- Der finale CreateCampaign-Request ohne Secrets sowie HTTP-Status-Info, Raw-Response-Body-Info und die verwertbare Tool-Antwort-/Envelope-Info muessen bei jedem fehlgeschlagenen Call vollstaendig protokolliert werden.
- Bei erfolgreichem Create ist nur ein Minimal-Log mit `campaignId` und `name` erlaubt.
- Auf die CreateCampaign-Response muss explizit gewartet werden; ohne vollstaendig empfangene Response darf der Export nicht weiterlaufen.
- Eine verwertbare CreateCampaign-ID darf nur aus diesen Kandidaten extrahiert werden: `campaignId`, `id`, `response.campaignId`, `response.id`, `data.campaignId`, `data.id`, `campaign.campaignId`, `campaign.id`.
- Jeder Kandidat ist nur gueltig, wenn er als `number` oder `string` vorliegt.
- Die erste verwertbare extrahierte Campaign-ID muss intern als String normalisiert werden.
- `campaignId` darf nie als `templateId` behandelt werden.
- Direkt nach `createCampaign` ist genau ein `campaignRead` mit dieser `campaignId` erlaubt; daraus duerfen ausschliesslich `response.templateId` als campaign-owned `templateId` und `response.campaignState` fuer die Status-Validierung gelesen werden.
- Der Builder-Export darf nur mit explizit editierbarem `campaignState` fortfahren; `Ready` ist der bevorzugte erwartete Status nach `createCampaign`.
- Bei `Scheduled`, `Running`, `Finished`, `Archived`, `Recurring`, `Aborted` oder jedem anderen nicht explizit als editierbar belegten Status stoppt der Export vor dem HTML-Write.
- Der Write-Step darf nicht implizit sein.
- Der finale HTML-Write darf nur auf dem campaign-owned `templateId` der erzeugten oder bereits gebundenen Campaign laufen.
- Fuer den finalen HTML-Write ist ausschliesslich `POST /api/templates/email/update` erlaubt.
- Der Write-Payload muss exakt `templateId`, `html`, `subject` und `preheaderText` enthalten.
- `subject` und `preheaderText` sind vor dem Write Pflicht.
- Wenn keine campaign-owned `templateId` verfuegbar ist, darf kein Write gestartet werden.
- Wenn die CreateCampaign-Antwort leer, unparsebar, unvollstaendig oder ohne verwertbare extrahierbare Campaign-ID ist, endet der Export sofort.
- Ein CreateCampaign-Fehler muss klar klassifiziert werden als Tool-Runtime-/Envelope-Fehler, Iterable-API-Fehler oder Parser-Fehler.
- Wenn keine verwertbare Campaign-ID extrahierbar ist, muss die Fehlerausgabe exakt `Iterable createCampaign hat keine gueltige campaignId zurueckgegeben` enthalten und zusaetzlich den finalen Request ohne Secrets, die HTTP-Status-Info, die Raw-Response-Body-Info, die geprueften ID-Kandidaten, den Ablehnungsgrund und den Hinweis `Kein Campaign-Read und kein HTML-Write wurden ausgefuehrt.` mitliefern.
- Ohne `campaignId` sind HTML-Write und jeder weitere Exportschritt verboten.
- Nach einem fehlgeschlagenen Create ohne verwertbare `campaignId` darf derselbe Export nicht automatisch erneut gestartet werden.
- Ein neuer Exportversuch ist danach erst wieder zulaessig, wenn der User ihn erneut explizit freigibt.
- Weitere Template-Reads, Schedule, Send, Retry und nicht offiziell dokumentierte Status-Reset-Calls sind im Export verboten.
- Wenn der eine erlaubte `campaignRead` `campaignState = Scheduled` liefert, darf der finale HTML-Write nicht starten.
- Kein Status-Reset, kein Cancel, kein Archive und keine sonstige Reparatur einer nicht editierbaren Campaign per Agent.
- Jeder weitere Campaign-Read ausser diesem einen `campaignRead` fuer die campaign-owned `templateId` ist im Export verboten.
- Alternative Write-Methoden, alternative Write-Endpoints oder alternative Write-Payloads sind verboten.
- Nackte `SNIPPET_CALLS` duerfen nie als komplettes `html` geschrieben werden.
- Die gelesene campaign-owned HTML-Shell muss ausserhalb der erlaubten Replace-Zonen unveraendert bleiben.
- Eine freie Minimal-Shell oder lokal neu erfundene Shell als Write-Payload ist verboten.
- Die Default-Shell darf nie sinngemaess aus Prompt-Wissen, Tests, gekuerzten Wrapper-Beispielen oder template-fremden Shell-Dateien nachgebaut werden.
- Im finalen Shell-Merge duerfen nur Subject, Preheader und der Module-Slot ersetzt werden; Head, CSS, Media Queries, Wrapper-Struktur und Conditional Comments bleiben vollstaendig erhalten.
- Vor dem finalen Write muss lokal klar unterscheidbar sein, ob der Fehler im HTML-Build, in der Payload-Vollstaendigkeit oder erst im Iterable-Write liegt.
- Der finale HTML-Schritt endet nie mit einem unscharfen `HTML fehlgeschlagen`.
- Vor dem finalen Write laeuft genau eine kleine lokale Payload-Pruefung fuer Subject, Preheader, modularem Block, campaign-owned HTML-Shell und finale HTML-Payload.
- Wenn diese lokale Payload-Pruefung scheitert, wird kein Write versucht.
- Fuer bekannte Module gilt der direkte Fast-Path aus `builder-library.md`.
- Im Happy Path wird die letzte sichtbare Preview oder ihr direkt daraus abgeleiteter strukturierter Export-State genau einmal in die finale HTML-Payload uebersetzt.
- Wenn fuer die aktuelle fortgeschriebene Preview bereits eine verwertbare `campaignId` vorliegt, muss genau diese Campaign erneut beschrieben werden.
- Wenn fuer die aktuelle Preview noch keine `campaignId` vorliegt, darf genau eine neue Campaign erzeugt werden.
- Keine doppelte Uebersetzung, keine erneute lange Herleitung lokaler Pflichtwerte, keine Draft-Ausweichlogik und keine unnoetigen Nachschlage-Calls.
- Keine impliziten Reparaturversuche, kein Haengenbleiben und kein erneuter best-effort-Lauf im selben Export, wenn CreateCampaign keine verwertbare Antwort liefert.
- Kein Haengenbleiben und kein weiterer Folgeversuch im selben Export, wenn der finale HTML-Schritt lokal oder beim Write scheitert.
- Wenn ein Modul ausserhalb des Fast-Paths liegt oder Pflichtwerte fehlen, klar fehlschlagen statt teuer zu improvisieren.
- In allen generierten deutschen Texten sind echte Umlaute Pflicht: `ä`, `ö`, `ü`, `Ä`, `Ö`, `Ü`.
- Schreibungen wie `ae`, `oe`, `ue`, `Ae`, `Oe`, `Ue` sind als Umlaut-Ersatz verboten, ausser bei Eigennamen, URLs, E-Mail-Adressen oder technischen Werten.
- Diese Umlaut-Regel gilt fuer Modultexte, Preview-HTML, Template-Texte, Export-Inhalte und alle sonstigen generierten Strings.
- Umlaute duerfen im System nicht nachtraeglich umgewandelt, ASCII-normalisiert oder im Export transformiert werden.
- Vor jeder Ausgabe muessen generierte deutsche Texte auf `ae`, `oe` und `ue` als Umlaut-Ersatz geprueft und vor der Ausgabe direkt korrigiert werden.

## Antwortstil

- Kurze Statusmeldungen statt langer Erklaertexte.
- Nach erfolgreichem Preview- oder Export-Lauf keine Meta-Erklaerung ueber interne Schritte.
- Im normalen Antwortstil keine Datei-Dumps, HTML-Dumps oder aehnliche Vollausgaben ausgeben.
- Technische Debug-Details nur auf ausdrueckliche Anforderung des Users ausgeben.
- Wenn Information fehlt, triff eine kleine sichere Annahme statt Zusatzkomplexitaet aufzubauen.
