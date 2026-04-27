# Export Rules

Diese Datei ist die einzige operative Export-Regelbasis im flachen Agent-Satz unter `builder/`.
Die uebrigen operativen Agent-Dateien liegen direkt daneben in `builder/`.

## Trigger

- Export startet nur bei einer expliziten Anweisung wie `Exportiere die Mail zu Iterable`.
- Diese Anweisung bedeutet: aktuelle Preview-Komposition in die kanonische Snippet-Call-Version uebersetzen und dann das HTML des campaign-owned Templates der zu dieser Preview gehoerenden Campaign aktualisieren.
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
- Required `*_bg_color` Felder muessen aus dem fachlichen Hintergrund-Rhythmus bereits im `email_state.content` vorliegen; sie werden nicht durch freie Export-Defaults ersetzt.
- Text-, `rich_inline`- und `rich_full`-Felder im `email_state.content` enthalten aktuell Plain Text und keinen freien HTML-Code.
- Blueprint-basierte Previews duerfen nur exportiert werden, wenn ihr `email_state` zuvor auf das vollstaendige Feldset der verwendeten Module aus `export-map.json` normalisiert wurde.
- Wenn der `email_state` fehlt oder fuer die aktuelle Preview unvollstaendig ist, darf genau einmal ein enger Recovery-Fallback aus der letzten sichtbaren Preview aufgebaut werden.
- Dieser Recovery-Fallback bleibt streng begrenzt:
  - nur letzte sichtbare Preview
  - nur registrierte Module
  - nur marker-basierte sichtbare Felder, marker-basierte URL-Felder aus `data-export-url-field`, registrierte Icon-Slots, registrierte Bild-Slots, Moduldefaults aus `export-map.json` und Hintergrund-Rhythmus
  - danach vollstaendige Validierung gegen `export-map.json`
  - anschliessend den reparierten `email_state` wieder als operative JSON-Arbeitsdatei fortschreiben
- Snippet-HTML bleibt auch im Recovery-Fallback verboten als Export-Erkennungsquelle.

## Ziel und Save-Shell

- Freie und Blueprint-Mails basieren in Iterable auf Template `569946`.
- Das Template `Viessmann` basiert auf `594116`.
- Der erste Export einer Preview erzeugt genau eine neue Campaign.
- Jeder Folge-Export derselben fortgeschriebenen Preview muss dieselbe bereits zugeordnete Campaign wiederverwenden und darf keine zweite Campaign erzeugen.
- Draft ist kein Standard- und kein Fallback-Ziel.
- Im Save-Flow wird immer das campaign-owned `templateId` der zur aktuellen Preview zugeordneten Campaign aktualisiert.
- Die zuletzt aus Iterable gelesene campaign-owned HTML-Shell ist byte-faithful die einzige zulaessige Export-Basis.
- Preview-HTML, lokal gebaute Shell-HTML, `preview-template.html`, `preview-modules.html` und lokale Dateien unter `iterable/templates/` duerfen nie Export-Basis sein.
- Die gelesene campaign-owned Shell bleibt ausserhalb klar definierter Replace-Zonen unveraendert erhalten.
- `SNIPPET_CALLS` duerfen nie als nacktes Komplett-HTML gespeichert werden.
- Das finale `html` fuer `updateEmailTemplate` oder einen gleichwertigen Save-Schritt muss immer die vollstaendige HTML-Shell des campaign-owned Templates enthalten.
- Ein Standalone-Template-Save ist verboten, solange der User nicht ausdruecklich `Speichere als Template in Iterable` verlangt.

## Finaler HTML-Schritt

- Der finale HTML-Schritt besteht genau aus zwei lokalen Teilphasen und einem Write:
  1. Snippet-Call-Block lokal vollstaendig bauen.
  2. In der exakt gelesenen campaign-owned HTML-Shell genau die erlaubten Replace-Zonen identifizieren und nur dort Subject, Preheader und den modularen Snippet-Call-Block einsetzen.
  3. Genau diese finale HTML-Payload nach Iterable schreiben.
- Erhalten bleiben muss immer die vollstaendige exakt gelesene campaign-owned HTML-Shell.
- Ersetzt oder aktualisiert werden duerfen ausschliesslich Subject, Preheader und der vorhandene modulare Slot beziehungsweise Snippet-Call-Block der aktuellen Mail.
- Der modulare Snippet-Call-Block muss genau in die bestehende campaign-owned Shell eingesetzt werden, nicht daneben und nicht als Standalone-HTML.
- Alle anderen Head-, Style-, Meta-, Conditional-Comment-, CSS-, Wrapper-, Tabellen-, VML- und Shell-Bereiche muessen byte-faithful unveraendert erhalten bleiben.
- Ein Neubau, Neuschreiben, Vereinfachen, Verkuerzen, Reformatten oder Normalisieren der HTML-Shell ist verboten.
- Die finale HTML-Payload gilt nur dann als write-faehig, wenn sie lokal vollstaendig gebaut wurde und weiterhin eine vollstaendige HTML-Shell enthaelt.
- Ein lokaler Fehler beim Snippet-Call-Block, beim Shell-Merge oder bei der Payload-Vollstaendigkeit ist kein Write-Fehler, sondern ein lokaler Build-Fehler.

## Lokale Payload-Pruefung vor dem Write

- Direkt vor dem finalen Write laeuft genau eine kleine lokale Vorpruefung.
- Diese Vorpruefung muss mindestens bestaetigen:
  - campaign-owned Template-HTML ist vorhanden
  - die gelesene campaign-owned HTML-Shell ist die einzige verwendete Export-Basis
  - Subject ist vorhanden
  - Preheader ist vorhanden
  - Snippet-Call-Block ist vorhanden
  - genau ein eindeutiger vorhandener Replace-Bereich fuer den modularen Slot oder Snippet-Call-Block wurde in der gelesenen campaign-owned Shell identifiziert
  - finale HTML-Payload ist nicht leer
  - finale HTML-Payload enthaelt weiterhin eine vollstaendige HTML-Shell
  - finale HTML-Payload ist nicht nur nackter Snippet-Text
  - finale HTML-Payload enthaelt den eingesetzten modularen Block
  - der Head- und Style-Bereich ausserhalb der Replace-Zonen ist byte-faithful unveraendert zur gelesenen campaign-owned Shell geblieben
  - ausserhalb der erlaubten Replace-Zonen gibt es keine Abweichung zur gelesenen campaign-owned Shell
- Wenn eine dieser Pruefungen scheitert, wird kein Write versucht.
- In diesem Fall endet derselbe Export sofort mit einer klaren lokalen Fehlerklasse.

## CreateCampaign Gate

- Der CreateCampaign-Schritt ist ein harter Gate-Step.
- CreateCampaign ist nur zulaessig, wenn die aktuelle Preview noch keine zugeordnete verwertbare `campaignId` hat.
- Der Export darf nur fortgesetzt werden, wenn die CreateCampaign-Antwort verwertbar ist.
- Mindestanforderung fuer eine verwertbare CreateCampaign-Antwort ist `campaignId`.
- `templateId` darf in der CreateCampaign-Antwort fehlen.
- Wenn `campaignId` fehlt, ist der Export sofort fehlgeschlagen.
- Wenn die Tool-Antwort leer, unparsebar, unvollstaendig oder anderweitig nicht verwertbar ist, endet dieser Export sofort.
- Ohne `campaignId` darf kein Campaign-Read, kein Template-Read, kein HTML-Write und kein weiterer Exportschritt starten.
- Ohne `campaignId` gibt es keinen zweiten best-effort-Lauf und keinen impliziten Reparaturversuch im selben Export.
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
5. Nur wenn keine verwertbare `campaignId` fuer diese Mail vorliegt: genau eine neue Campaign auf Basis des passenden Basis-Templates erzeugen.
6. Wenn Schritt `5` lief: Create-Antwort auf verwertbare `campaignId` pruefen. Wenn `campaignId` fehlt oder die Antwort leer, unparsebar oder unvollstaendig ist: Export sofort abbrechen.
7. Wenn eine `campaignId` bereits vorlag oder in Schritt `6` erfolgreich erzeugt wurde, genau das campaign-owned `templateId` dieser Campaign verwenden; falls es lokal oder aus der Create-Antwort noch nicht vorliegt, die Campaign genau einmal lesen und holen.
8. Das aktuelle HTML des campaign-owned Templates lesen.
9. Snippet-Call-Block lokal deterministisch aus `email_state + export-map.json` bauen.
10. In genau diesem gelesenen HTML genau einen eindeutigen vorhandenen Replace-Bereich fuer Subject, Preheader und den modularen Snippet-Call-Block identifizieren.
11. Nur in genau diesen Replace-Zonen Subject, Preheader und den modularen Snippet-Call-Block der aktuellen Mail lokal einsetzen.
12. Finale HTML-Payload lokal kurz pruefen und bestaetigen, dass ausserhalb der Replace-Zonen keine Abweichung zur gelesenen campaign-owned Shell vorliegt.
13. Nur wenn diese Payload lokal vollstaendig, write-faehig und ausserhalb der Replace-Zonen byte-faithful unveraendert ist: genau dieses vollstaendige HTML auf dem campaign-owned Template schreiben.
14. Nach einem erfolgreichen erstmaligen Export die `campaignId` und das campaign-owned `templateId` an genau diese aktuelle Mail und ihren `email_state` zurueckschreiben.

- Ein zusaetzlicher QA-Read ist optional, nicht verpflichtend.
- Weitere Iterable-Reads ausser Schritt `6` und Schritt `7` sind im Happy Path verboten, wenn die Information bereits lokal oder aus der Create-Antwort vorliegt.

## Happy Path

- Fuer die unterstuetzten Module gilt das statische Export-Mapping aus `export-map.json`.
- Im direkten Happy Path wird der aktuelle `email_state` genau einmal lokal in die Snippet-Call-Version uebersetzt.
- Der `email_state` ist dabei die einzige feldnahe Arbeitskopie fuer den Export.
- `export-map.json` ist die einzige technische Feld- und Modulwahrheit fuer den Export.
- Bekannte Snippet-Namen, Pflichtparameter, feste Werte und Basis-Templates werden nicht erneut lang hergeleitet.
- Keine doppelte Uebersetzung, keine doppelte Rekonstruktion, keine schrittweise Technik-Erklaerung im Chat.
- Keine unnoetigen Iterable-Read-Backs fuer Informationen, die lokal bereits feststehen.
- Keine Snippet-Inspection-Schleifen fuer bekannte Module im Fast-Path.
- Keine erneute Signatur-Pruefung einzelner Fast-Path-Module waehrend des Exports.
- Wenn `export-map.json` fuer ein Modul ein vollstaendiges Feldset definiert, ist genau dieses Feldset direkt auszufuehren.
- Preview-HTML oder Snippet-HTML werden im Happy Path nicht gescannt.
- Der Recovery-Fallback ist kein zweiter Happy Path, sondern nur ein einmaliger Reparaturschritt, wenn `email_state` fehlt oder unvollstaendig ist.

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

- Vor dem finalen Campaign-Write deutsche Fliesstexte auf Umlautschreibweise pruefen.
- `ae`, `oe`, `ue` und `ss` sind in normalem deutschem Fliesstext nicht zulaessig, ausser bei Eigennamen, URLs, E-Mail-Adressen und technischen Werten.
- Eindeutig normalisierbare Schreibungen muessen vor dem Export in echte Umlaute oder `ss` normalisiert werden.
- Nicht eindeutig normalisierbare Faelle blockieren den Export.

## Fail Closed

- Eine bestehende `campaignId` darf nur dann wiederverwendet werden, wenn sie im aktuellen Export-State genau der aktuellen fortgeschriebenen Preview zugeordnet ist.
- Eine Campaign-Bindung aus einer frueheren, verlassenen oder neu gestarteten Preview darf nie auf eine neue Preview uebertragen werden.
- Vor jedem weiteren Exportschritt nach CreateCampaign muss eine verwertbare `campaignId` vorliegen.
- Wenn die CreateCampaign-Antwort keine verwertbare `campaignId` enthaelt, scheitert der Export sofort.
- Wenn die CreateCampaign-Antwort leer, unparsebar oder unvollstaendig ist, scheitert der Export sofort.
- Ohne `campaignId` sind Campaign-Read, Template-Read, HTML-Write und jeder weitere Exportschritt verboten.
- Der `templateId`-Fallback per Campaign-Read ist nur erlaubt, wenn bereits eine verwertbare `campaignId` vorliegt.
- Wenn fuer die aktuelle Preview bereits eine verwertbare `campaignId` vorliegt, darf kein zweiter CreateCampaign-Schritt fuer denselben Preview-Zweig gestartet werden.
- Bei leerer oder unbrauchbarer CreateCampaign-Antwort endet derselbe Lauf sofort; kein spontaner Reparaturversuch, kein zweiter best-effort-Write und kein weiterer Folgeversuch im selben Export.
- Vor dem Write muss ein gueltiger `email_state` vorliegen.
- Wenn der Snippet-Call-Block lokal nicht vollstaendig gebaut werden kann, scheitert der Export sofort.
- Wenn die gelesene campaign-owned HTML-Shell nicht als byte-faithful einzige Export-Basis vorliegt, scheitert der Export sofort.
- Wenn kein eindeutiger vorhandener Replace-Bereich fuer den modularen Slot oder Snippet-Call-Block in der gelesenen campaign-owned Shell identifiziert werden kann, scheitert der Export sofort.
- Wenn Subject, Preheader und Snippet-Call-Block nicht sauber nur in die erlaubten Replace-Zonen der gelesenen campaign-owned Shell eingesetzt werden koennen, scheitert der Export sofort.
- Wenn ausserhalb der erlaubten Replace-Zonen Abweichungen zur gelesenen campaign-owned Shell vorliegen, scheitert der Export sofort.
- Wenn Head-, Style-, Meta-, Conditional-Comment-, CSS-, Wrapper-, Tabellen- oder VML-Bereiche ausserhalb der Replace-Zonen veraendert wurden, scheitert der Export sofort.
- Wenn die HTML-Shell lokal neu gebaut, umgeschrieben, vereinfacht, verkuerzt oder normalisiert wuerde, scheitert der Export sofort.
- Wenn die finale HTML-Payload lokal leer, unvollstaendig oder ohne vollstaendige HTML-Shell ist, scheitert der Export sofort.
- Wenn die finale HTML-Payload lokal nur aus nacktem Snippet-Text besteht, scheitert der Export sofort.
- Wenn die lokale Payload-Pruefung scheitert, wird kein Write versucht.
- Jedes aktive Modul im `email_state` muss genau ein eindeutiges Export-Mapping aus `export-map.json` haben.
- Es duerfen nur Felder geschrieben werden, die fuer dieses Modul dort registriert sind.
- Unknown Fields im `email_state.content` fuehren sofort zu einem Fehler und werden nie exportiert.
- Pflichtfelder muessen ueber `content` oder Defaults der Export-Map vollstaendig befuellt werden.
- Wenn Modultyp, Mapping, Pflichtfelder oder `snippet_name` nicht sauber zusammenpassen, scheitert der Export.
- Wenn ein required `*_bg_color` im `email_state.content` fehlt, scheitert der Export.
- Wenn nach dem einmaligen Recovery-Fallback weiterhin kein vollstaendiger `email_state` vorliegt, scheitert der Export.
- `steps-3col` wird genau einmal ueber `module_id`, `snippet_name` und `content` exportiert; Desktop- und Mobile-Markup im Snippet sind reine Renderdetails.
- Wenn kein vollstaendiges HTML des campaign-owned Templates vorliegt, scheitert der Export.
- Wenn nur nackte `SNIPPET_CALLS` oder ein isolierter Modulblock geschrieben wuerden, scheitert der Export.
- Bei Write- oder Parameterfehlern endet derselbe Lauf sofort; kein spontaner Reparaturversuch und kein zweiter best-effort-Write.

## Fehlerklassen fuer Schritt 5

- A. `Snippet-Call-Block konnte nicht vollstaendig gebaut werden.`
- B. `Finale HTML-Shell konnte nicht sauber zusammengesetzt werden.`
- C. `Finale HTML-Payload wurde lokal gebaut, aber der Iterable-Write ist fehlgeschlagen.`
- D. `Finale HTML-Payload war lokal leer oder unvollstaendig.`
- E. `Finale HTML-Payload verletzt eine Fail-Closed-Regel und wurde nicht geschrieben.`

## Chat-Ausgabe

- Im normalen Exportmodus nur userfreundliche Kurzmeldungen ausgeben.
- Vor dem Export:
  - `Ich exportiere die E-Mail jetzt nach Iterable.`
- Bei laengerer Verarbeitung optional:
  - `Der Export laeuft noch. Ich aktualisiere gerade die E-Mail in Iterable.`
- Nach erfolgreichem Export:
  - `Fertig — die E-Mail wurde in Iterable angelegt und aktualisiert.`
- Bei Fehlern:
  - `Der Export konnte nicht abgeschlossen werden. Grund: <kurze verstaendliche Ursache>.`
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
