ZWECK
Dieses Dokument definiert den Arbeitsprozess für den E-Mail Builder (EMB) und steuert die Zusammenarbeit mit Codex.

---

## SYSTEMKONTEXT

* email-builder/ → E-Mail Erstellung & Export
* design-system/ → Tokens & Design Library
* lp-builder/ → separates System

Gilt ausschließlich für email-builder/.

---

## REGELQUELLE

* `AGENTS.md` ist die einzige operative Regelquelle fuer Codex in `email-builder/`.
* Bestehende `README.md`-Dateien duerfen nicht als operative Regelquelle verwendet werden.
* Codex darf keine neuen `README.md`-Dateien erstellen.
* Bestehende `README.md`-Dateien duerfen nur dann neu angelegt oder gepflegt werden, wenn der User dies ausdruecklich fuer menschliche Dokumentation verlangt.
* Wenn eine neue verbindliche Regel dokumentiert werden muss, dann in `AGENTS.md` und nicht in einer README-Datei.

---

## AGENT-SETUP

* Die kanonische Systemprompt-Datei fuer Custom-GPT-/Agent-Setups ist `agent/systemprompt.md`.
* Standard fuer Agent-Knowledge ist eine einzelne gebuendelte Markdown-Datei, nicht ZIP und nicht lokale Ordnerstruktur.
* Wenn eine gebuendelte Knowledge-Datei mit Abschnitten unter exakten Originalpfaden hochgeladen ist, gelten diese Abschnitte als virtuelle Repo-Dateien.
* Der Agent darf in diesem Fall keinen Zugriff auf lokale Ordner erwarten; massgeblich bleiben die Inhalte unter den jeweiligen Pfadueberschriften.
* `agent/` ist die kanonische Quelle fuer Systemprompt, Regeldateien, Templates und Export-Basis.
* Der Standardordner fuer den Agent-Upload ist `agent-upload/email-builder-agent/`.
* Dieses Upload-Paket ist eine abgeleitete Kopie aus `agent/`.
* In diesem Standardordner liegen genau `systemprompt.md` und `emb_knowledge.md`.
* Nach produktiven Aenderungen an Modulen, Templates, Regeldateien oder `agent/export-map.json` muss dieses Agent-Upload-Bundle neu erzeugt werden.

---

## WAHRHEITSEBENEN

* preview/ = visuelle Wahrheit
* email/ = Produktions-HTML (Quelle für Export)
* design-system/tokens/ = Design-Wahrheit
* agent/ = abgeleiteter Arbeitslayer (keine eigene Wahrheit)

Export basiert nur auf email/ + export-map.json.

---

## GRUNDPRINZIPIEN

1. Neue visuelle oder strukturelle Modulvarianten sind grundsätzlich zu vermeiden, aber ERLAUBT wenn kein bestehendes Modul die Anforderung abbilden kann.

   * Bestehende Patterns sind immer der erste Weg
   * Wenn kein passendes visuelles oder strukturelles Modulmuster existiert, darf eine neue Modulvariante erstellt werden
   * Neue visuelle oder strukturelle Modulvarianten muessen sich an bestehenden Tokens, Spacing-Regeln und Strukturprinzipien orientieren
   * Neue visuelle oder strukturelle Modulvarianten duerfen keine bestehenden Regeln verletzen (Container, Spacing, Background etc.)
   * Neue technische E-Mail-/Responsive-Patterns sind davon ausgenommen und ohne ausdrueckliche User-Freigabe VERBOTEN

2. Neue oder geaenderte Module und Templates starten immer im Review-Layer und werden zuerst nur in zwei Review-Dateien geprueft:

   * `development/review/preview-index.html`
   * `development/review/email-index.html`

3. Diese Review-Dateien sind reine Test-Artefakte:

   * sie duerfen jederzeit ueberschrieben werden
   * sie sind nie fachliche Quelle
   * sie ersetzen keine produktiven Modul-, Template- oder Exportdateien

4. Fachliche Quellen bleiben ausschliesslich:

   * `preview/modules/*`
   * `email/modules/*`
   * `agent/template-*.preview.html`
   * `agent/template-*.definition.json`
   * `email/templates/*.html`
   * `agent/export-map.json`
   * `AGENTS.md`

5. Vor einer eindeutigen Review-Freigabe duerfen keine produktiven Modul-, Template-, Export- oder Library-Dateien veraendert werden.

---

## PATTERN-BINDING (VERBINDLICH)

* Bestehende Patterns aus preview/ MÜSSEN bevorzugt verwendet werden
* "Ähnlich bauen" ist NICHT erlaubt
* Struktur, Klassen und Hierarchie werden übernommen
* Fuer jedes neue Modul sind zwei bestehende produktive Referenzmodule verpflichtend:
  * `preview_reference_module`
  * `email_reference_module`
* Beide Referenzen MUESSEN aus bereits bestehenden produktiven Modulen stammen
* Der User muss diese Referenzen nicht vorgeben
* Codex MUSS die Referenzen automatisch bestimmen, indem es die bestehenden produktiven Module und ihre Agent-Dokumentation prueft
* `preview_reference_module` bestimmt das strukturelle Preview-Muster
* `email_reference_module` bestimmt das technische E-Mail-, Responsive-, CTA- und VML-Muster
* Neue Module duerfen visuell neu sein, aber ihre technische Preview- und E-Mail-Struktur darf nicht frei neu erfunden werden, wenn ein bestehendes Produktionsmuster die Aufgabe bereits tragen kann
* Neue visuelle oder strukturelle Modulvarianten sind erlaubt, wenn kein bestehendes Modul die Anforderung abbildet
* Neue technische E-Mail-/Responsive-Patterns sind ohne ausdrueckliche User-Freigabe verboten
* Fuer diese automatische Referenzwahl MUSS Codex vor neuer Modul- oder Template-Arbeit mindestens pruefen:
  * `preview/modules/`
  * `email/modules/`
  * `agent/preview-module-library.md`
  * `agent/builder-library.md`
  * bei Bedarf `preview/modules/catalog.yaml`
* Ziel dieser Pruefung ist:
  * zu erkennen, welches bestehende Modul dem neuen Modul strukturell, visuell und responsiv am naechsten kommt
* Die Auswahlkriterien fuer `preview_reference_module` und `email_reference_module` sind mindestens:
  * gleicher oder aehnlicher Modultyp
  * gleiche Grundstruktur
  * aehnliche Spaltenlogik
  * aehnliche Bild-/Text-Anordnung
  * aehnliche CTA-Logik
  * aehnliches Mobile-Verhalten
  * gleiche oder aehnliche E-Mail-Responsive-Struktur
  * vorhandene VML-/Outlook-Muster, falls relevant
  * vorhandene Padding-/Spacer-/Container-Logik

AUSNAHME:

* Wenn kein passendes visuelles oder strukturelles Modulmuster existiert, darf eine neue Modulvariante erstellt werden
* In diesem Fall gilt:

  * Aufbau muss sich an bestehender Modul-Architektur orientieren (.module / .module__inner)
  * Tokens und bestehende Utility-Klassen müssen verwendet werden
  * Spacing-Regeln müssen eingehalten werden
  * Kein eigenständiges Design-System erfinden
* Wenn stattdessen ein neues technisches E-Mail-/Responsive-Pattern noetig waere, MUSS Codex stoppen und User-Freigabe einholen

Ziel:

* Erst wiederverwenden
* Nur wenn notwendig erweitern

---

## LAYOUT-GRUNDSTRUKTUR

* Outer: `.module`
* Inner: `.module__inner`
* max-width: 600px (CSS-gesteuert)

NICHT erlaubt:

* eigene Container
* Wrapper verändern

---

## SPACING

Preview:

* keine freien Padding-Werte im HTML definieren
* freie Inline-Padding-Werte (`style="padding: ..."`) sind VERBOTEN
* eigene Padding-Klassen sind VERBOTEN
* Spacing kommt ausschliesslich aus bestehenden Preview-Klassen oder der Struktur des `preview_reference_module`
* Codex MUSS vorhandene Klassen vom Referenz-Modul übernehmen (z. B. module__inner Varianten)

E-Mail:

* Inline-Padding ist erlaubt, wenn es aus dem gewaehlten `email_reference_module` uebernommen wird oder fuer E-Mail-Kompatibilitaet noetig ist
* Codex darf Inline-Padding nicht frei neu erfinden
* Die folgenden Padding-Regeln sind Entwicklungsregeln fuer Codex bei Repo-Arbeit an neuen EMB-Modulen, template-spezifischen Modulen und Review-Modulen
* Sie gelten nicht als Freigabe oder Auftrag, dass der EMB-Agent beim normalen Mail-Bau neue Module konstruieren soll
* Neue EMB-Module, template-spezifische Module und Review-Module verwenden standardmaessig `60 / 40` Desktop und `40 / 20` Mobile
* Mobile `60 / 20` ist KEIN Default und darf nur bei einer dokumentierten Modul-Ausnahme beibehalten werden
* Padding muss dem `email_reference_module` oder dem Standard `60 / 40` Desktop und `40 / 20` Mobile folgen
* Abweichungen brauchen eine Begruendung oder ausdrueckliche User-Freigabe

Allgemein:

* Wenn kein Pattern klar ist:

  * Desktop: 60 / 40
  * Mobile: 40 / 20
* 24px Padding ist NICHT erlaubt
* Historische Mobile-Helper in bestehenden produktiven E-Mail-Modulen oder in `template-main.html` mit `24px` sind KEIN Default fuer neue Module
* Wenn ein Referenz-Modul genutzt wird, MUSS dessen Spacing exakt übernommen werden, aber nur wenn die Abweichung als dokumentierte Modul-Ausnahme belegt ist
* Wenn ein bestehendes Pattern oder Helper dem Standard `40 / 20` Mobile widerspricht und keine dokumentierte Ausnahme belegt ist, MUSS Codex stoppen und berichten
* Codex darf keine Mobile-Padding-Werte aus Desktop-Padding ableiten oder Desktop-Werte nach Mobile kopieren
* Review-spezifische `data-module`-Namen in `preview-index.html` erben mobile `module__inner`-Top-/Bottom-Paddings aus `preview-styles.css` nicht automatisch; Codex MUSS dort mobil explizit `40 / 20` oder eine dokumentierte Ausnahme absichern

DEFAULT (wenn kein Pattern klar ist):

* Desktop: 60 / 40
* Mobile: 40 / 20

Wenn Referenz-Modul gewählt:
→ dessen Spacing 1:1 übernehmen

---

## RICHTEXT-KONTEXTE

* Salutation-/Anredezeilen sind eigene kurze Textkontexte vor einem nachfolgenden Body
* Sie duerfen nie Teil eines `rich_full`-Body-Feldes oder `rich_full`-Wrappers sein
* Sie duerfen keine Listen enthalten
* Sie sind fachlich Plain Text oder hoechstens `rich_inline`, aber niemals `rich_full`
* Der Abstand zwischen Salutation und nachfolgendem Body ist ein externer Kontextabstand und betraegt standardmaessig 16px
* Absaetze, Listen und ihre vertikalen Abstaende innerhalb des Bodys bleiben ausschliesslich Aufgabe des allgemeinen `rich_full`-Flows
* Fuer `rich_full` gilt allgemein:
  * Text zu Text = 16px
  * Text zu Liste = 8px
  * Liste zu Text = 8px
  * Liste zu Liste = 8px
* Der Abstand zwischen einer Headline und dem ersten `rich_full`-Element ist immer externer Kontextabstand und wird nicht durch die interne Listenregel erzeugt
* Wenn eine Liste das erste Element im `rich_full`-Body ist, bekommt sie keinen zusaetzlichen internen Top-Abstand
* Listen bleiben im allgemeinen `rich_full`-Kontext optisch auf 20px eingerueckt
* `p`, `ul` und `ol` tragen im allgemeinen `rich_full`-Kontext keine eigenen allgemeinen Top-/Bottom-Defaults ausserhalb der zentralen Flow-Regeln
* `rich_inline` bleibt davon unberuehrt und erlaubt weiterhin keine Listen

---

## HINTERGRUND

* Module setzen KEINEN Background
* Es ist VERBOTEN:

  * `theme-gray`, `theme-white` oder ähnliche Klassen im Development zu setzen
  * inline background styles zu setzen
* Background wird ausschließlich im Builder gesteuert

VERBINDLICH:

* Wenn ein Referenz-Modul verwendet wird, MUSS Codex ALLE Background-bezogenen Klassen aktiv entfernen
* Dazu gehören insbesondere:

  * `.theme-gray`
  * `.theme-white`
  * jede andere theme-* Klasse

WICHTIG:

* Codex darf Background NICHT "übernehmen" oder "beibehalten"
* Background ist IMMER zu entfernen, auch wenn er im Referenz-Modul vorhanden ist

---

## REVIEW-ARBEITSWEISE

Ziel: Neue oder geaenderte Module und Templates in einem echten Preview- und E-Mail-Kontext pruefen, ohne daraus eine zweite fachliche Quelle zu machen.

Regeln:

* Fuer jede Modul- oder Template-Arbeit werden genau zwei Review-Dateien erzeugt oder aktualisiert:
  * `development/review/preview-index.html`
  * `development/review/email-index.html`
* `development/review/preview-index.html` ist die Browser-Testdatei:
  * nutzt den echten Preview-CSS-Kontext aus `agent/preview-styles.css`
  * zeigt nur das aktuell bearbeitete Preview-Modul oder Preview-Template
  * dient nur der visuellen Pruefung
* `development/review/email-index.html` ist die E-Mail-Testdatei:
  * nutzt den CSS-/Shell-Kontext aus `email/templates/template-main.html`
  * zeigt nur das aktuell bearbeitete E-Mail-Modul oder E-Mail-Template
  * kann direkt als Testmail in Iterable verwendet werden
* Fuer Modul-Arbeit gilt in beiden Review-Dateien ein festes Testgeruest:
  1. `logo`
  2. `hero-image-top`
  3. aktuelles neues oder geaendertes Modul
  4. `footer`
* `logo`, `hero-image-top` und `footer` dienen dort nur als stabiler Testkontext fuer Modul-Arbeit.
* Wenn das aktuell bearbeitete Modul selbst `logo`, `hero-image-top` oder `footer` ist, darf Codex keine doppelte Instanz einbauen und erstellt stattdessen eine sinnvolle Minimal-Testmail mit kurzem Hinweis im Bericht.
* Diese feste Reihenfolge gilt nur fuer Modul-Arbeit; Template-Arbeit nutzt weiterhin die tatsaechlich gewuenschte oder definierte Template-Reihenfolge.
* Review-Dateien sind reine Test-Artefakte:
  * sie duerfen jederzeit ueberschrieben werden
  * sie sind nie fachliche Quelle
  * sie duerfen keine produktive Wahrheit ersetzen
  * sie duerfen vollstaendig zusammengebaute Demo-Mails oder Demo-Templates mit Beispielmodulen und Demo-Content enthalten
  * Demo-Texte und Demo-Bilder sind erlaubt, aber erfundene Styles, Farben, Spacings, CTA-Farben oder Modul-Defaults sind verboten
  * Review-Defaults muessen immer aus bestehenden EMB-Quellen kommen, insbesondere aus `agent/export-map.json`, produktiven Preview-Modulen, produktiven E-Mail-Modulen, `email/templates/template-main.html` und `agent/preview-styles.css`
  * wenn ein benoetigter Default nicht eindeutig aus diesen Quellen ableitbar ist, muss Codex stoppen und den fehlenden Default berichten, statt einen Wert zu erfinden
* Der Ablauf fuer neue Module, Modul-Iterationen, neue Templates und Template-Iterationen ist immer:
  * zuerst nur `development/review/preview-index.html` und `development/review/email-index.html` als Review-Entwurf aktualisieren
  * Review-Dateien aktualisieren
  * User-Freigabe einholen
  * erst danach produktive Integration oder zentrale Dokumentation abschliessen
* Vor ausdruecklicher User-Freigabe des aktuellen Review-Stands sind Aenderungen an produktiven Zielpfaden fuer neue oder geaenderte Module und Templates verboten. Dazu gehoeren insbesondere:
  * `preview/modules/*`
  * `email/modules/*`
  * `agent/template-*.preview.html`
  * `agent/template-*.definition.json`
  * `email/templates/*.html`
  * `agent/export-map.json`
  * `design-system/design-library/index.html`
* Vor dem ersten Review-Schritt MUSS Codex fuer neue Module weiterhin `preview_reference_module` und `email_reference_module` aus bestehenden produktiven Mustern bestimmen und kurz begruenden.
* Referenzmuster, Tokens, Spacing-Regeln und bestehende technische E-Mail-Patterns bleiben verbindlich.
* Ohne ausdrueckliche User-Freigabe darf Codex kein neues technisches E-Mail-/Responsive-Pattern einfuehren.
* Die Review-Dateien duerfen sichtbaren Beispielcontent tragen.
* Produktiv relevantes CSS darf in Review-Dateien nur dann zusaetzlich vorkommen, wenn der vorhandene operative Kontext das Modul nachweislich noch nicht traegt.
* Wenn Review-CSS spaeter produktiv benoetigt wird, MUSS Codex den korrekten Zielort dafuer bestimmen:
  * `agent/preview-styles.css`
  * modulnaher Preview-Styleblock
  * Inline-Styles im E-Mail-Modul
  * `email/templates/template-main.html`
  * passende Design-Library-Dateien

---

## PRODUKTIVE INTEGRATION

Start nur nach eindeutiger User-Freigabe des aktuellen Review-Stands.

Regeln:

* Die produktive Integration arbeitet erst nach ausdruecklicher User-Freigabe direkt in den fachlichen Zielpfaden.
* Review-Dateien bleiben dabei nur Pruefflaechen und werden nicht 1:1 zur fachlichen Quelle umgedeutet.
* Ohne ausdrueckliche User-Freigabe des aktuellen Review-Stands darf Codex keine abschliessende produktive Integration in zentrale Dateien wie Libraries, Kataloge, Export-Maps, Template-Definitionen oder Uebersichten vornehmen.
* Bei der produktiven Integration darf Codex sichtbare Gestaltung oder Struktur nicht frei neu interpretieren.
* Zulaessig sind nur notwendige produktive Schritte wie:
  1. `preview/modules/<module_id>.html` erstellen oder anpassen
  2. `email/modules/emb_<module_id>.html` erstellen oder anpassen
  3. Render-Anbindung herstellen
  4. `export-map.json` ergaenzen oder anpassen
  5. relevante Agent-Dateien aktualisieren
  6. CSS nur wenn noetig an den korrekten produktiven Zielort uebernehmen
  7. `preview/modules/catalog.yaml` nur dann erweitern, wenn das Modul ausdruecklich ein allgemeines Library-/Core-Modul werden soll
* Wenn ein neues Modul im EMB renderbar sein soll, MUSS Codex weiterhin die operative Render-Anbindung herstellen:
  * registrierbares Preview-Markup in `agent/preview-modules.html`
  * Modulvertrag in `agent/preview-module-library.md`
  * Builder-Anbindung in `agent/builder-library.md`, wenn das Modul per Prompt oder Composition direkt ansprechbar sein soll
* Wenn der User ausdruecklich sagt, dass ein Modul nicht in die Library soll, dann gilt:
  * keine Aufnahme als allgemeines Core-/Library-Modul
  * kein automatisches Erweitern von `preview/modules/catalog.yaml`, ausser der User verlangt es ausdruecklich
  * keine automatische Aufnahme in allgemeine Design-Library-Dateien
  * aber weiterhin alle noetigen Agent-Dateien aktualisieren, falls das Modul im EMB renderbar oder per Prompt nutzbar sein soll
* Vor der produktiven Integration MUSS Codex pruefen:
  * ob `preview/modules/<module_id>.html` strukturell auf `preview_reference_module` basiert
  * ob `email/modules/emb_<module_id>.html` technisch und responsiv auf `email_reference_module` basiert
  * ob die responsive Grundstruktur des `email_reference_module` uebernommen wurde
  * ob keine neue Device-Switch-Logik eingefuehrt wurde
  * ob keine neuen globalen Responsive-Regeln ohne Freigabe eingefuehrt wurden
  * ob Review-CSS Development-only oder produktiv relevant ist
* Harte CSS-Regeln fuer die produktive Integration:
  * Development-only CSS darf nicht produktiv uebernommen werden
  * produktiv relevantes Modul-CSS darf nicht nur in Review-Dateien verbleiben
  * kein neues CSS in globale Dateien schreiben, wenn die Regel besser inline oder modulnah geloest werden kann
  * bestehende globale Styles nicht unnoetig aufblasen
* Die produktive E-Mail-Datei MUSS die responsive Grundstruktur des gewaehlten `email_reference_module` uebernehmen.
* Wenn die sichtbare Review-Version technisch nicht sauber auf finale Iterable-Variablen abbildbar ist:
  * produktive Integration stoppen
  * zuerst den Review-Stand korrigieren
  * keine unvollstaendigen Module in produktive Dateien uebernehmen
* Wenn die produktive Integration oder Validierung fehlschlaegt:
  * keine erfolgreiche Integrationsmeldung ausgeben
  * keinen automatischen Reset von Review-Dateien ausfuehren
  * konkret berichten, was fehlt oder korrigiert werden muss

---

## COMPOSITION TEMPLATES

* Auch Template-Arbeit nutzt die beiden Review-Dateien:
  * `development/review/preview-index.html`
  * `development/review/email-index.html`
* Review-Dateien sind auch fuer Templates nie fachliche Quelle.
* Operative Template-Dateien liegen namespacet im flachen Agent-Layer:
  * `agent/template-<template_id>.preview.html`
  * `agent/template-<template_id>.definition.json`
* Generische operative Template-Dateien wie `agent/preview.html` oder `agent/template-definition.json` sind verboten
* Die Preview-Datei darf fertige Preview-Module enthalten und ist die visuelle Startbasis fuer den EMB
* Die Definition ist die verbindliche Agent-Logik
* Operative Template-Dateien duerfen nicht zu vollstaendig zusammengebauten Testmails oder Test-Templates umgebaut werden
* Templates duerfen keine neuen Module einfuehren
* Templates duerfen keine freie Reihenfolge definieren
* Entfernen oder Duplizieren ist nur erlaubt, wenn `template-<template_id>.definition.json` es explizit erlaubt
* Jedes Composition-Template braucht zusaetzlich ein eigenes Iterable-Basistemplate unter `email/templates/<template_id>.html`
* Dieses Basistemplate darf keine festen Module und keine festen Snippet-Calls enthalten
* `email/templates/<template_id>.html` ist die Iterable-Base-/Shell-Datei und enthaelt genau das CSS, das fuer die Module dieses Templates benoetigt wird
* Vollstaendig zusammengebaute Preview- oder E-Mail-Tests fuer Templates gehoeren ausschliesslich in die Review-Dateien unter `development/review/`
* Auch fuer Templates ist die ausdrueckliche User-Freigabe des aktuellen Review-Stands das Gate vor jeder abschliessenden produktiven Integration oder zentralen Dokumentation.
* Nach ausdruecklicher User-Freigabe fuehrt Codex bei neuen Templates oder Template-Iterationen die produktive Integration direkt in den echten Zielpfaden durch.
* Je nach Aenderung betrifft diese Template-Integration:
  * `agent/template-<template_id>.definition.json` als strukturelle Template-Definition und Modulreihenfolge fuer den EMB
  * `agent/template-<template_id>.preview.html` als operative Preview-/Template-Logik
  * `email/templates/<template_id>.html` als Iterable-Base-/Shell-Datei mit genau dem CSS, das fuer die Module dieses Templates benoetigt wird
  * relevante Library-/Regeldateien nur bei konkretem Bedarf, z. B. `agent/builder-library.md` oder `agent/template-definition.contract.md`
  * `development/review/preview-index.html` und `development/review/email-index.html` optional als finalen Teststand
* Auch nach der Integration bleiben die Review-Dateien reine Test-Artefakte; die fachliche Wahrheit liegt in den produktiven Template-Zielpfaden.
* `development/templates/searcher-standard/*` bleibt bis zur finalen Prozessentscheidung als historischer Prozessbeleg erhalten, ist aber kein verpflichtender Startpunkt und keine operative Wahrheit
* Vor Freigabe muss jedes Template end-to-end geprueft werden:
  * Preview funktioniert im EMB
  * Slot-Reihenfolge wird eingehalten
  * locked Module koennen nicht entfernt werden
  * repeatable Module koennen dupliziert werden
  * keine neuen Module entstehen
  * Iterable-Shell enthaelt keine Module oder Snippet-Calls
  * Export nutzt die template-spezifische Iterable Template-ID
  * normaler Export ohne Template bleibt unveraendert

---

## DESIGN LIBRARY INTEGRATION (VERBINDLICH)

Ziel: Die sichtbare E-Mail-Library bleibt konsistent mit dem aktuellen statischen Library-Setup in `design-system/`.

AKTIVE QUELLEN (VERBINDLICH):

* Fuer sichtbare E-Mail-Module in der Library ist `email-builder/preview/modules/` die relevante Quellbasis.
* Der Preview-CSS-Kontext dafuer bleibt `email-builder/agent/preview-styles.css`.
* Die sichtbare Einbettung fuer E-Mail-Module erfolgt statisch in `design-system/design-library/index.html`.
* `design-system/design-library/frames/email/**` ist keine aktive Quelle mehr fuer die sichtbare E-Mail-Library.

INDEX-INTEGRATION (VERBINDLICH):

* Wenn sichtbare E-Mail-Library-Inhalte geaendert werden sollen, ist nach User-Freigabe die statische Einbettung in `design-system/design-library/index.html` an die aktiven Quellen anzupassen.
* Keine alten Frame-Pfade aus `design-system/design-library/frames/email/` neu einfuehren oder pflegen.
* Keine fachlichen Regeln aus `frames/email/**` ableiten.

---

## PUBLISH / GITHUB (VERBINDLICH)

* Veroeffentlichung ist Teil der produktiven Integration und wird automatisch von Codex ausgefuehrt.
* Nach Library-Integration MUSS der Publish-Mirror aktualisiert werden:
  python3 design-system/scripts/sync_design_library_publish.py
* Anschließend MUSS Codex die Änderungen auf GitHub (main) pushen.

VOR DEM PUSH (PFLICHT-CHECK):

* Codex MUSS das Modul visuell validieren – aber NICHT zwingend über echten Browser
* Falls Browser-Rendering (z. B. safaridriver) nicht möglich ist, gilt:

  * Vergleich mit bestehenden funktionierenden statischen E-Mail-Library-Einbettungen
  * Sicherstellen, dass `agent/preview-styles.css` korrekt beruecksichtigt ist
  * Sicherstellen, dass keine neuen Wrapper/Strukturen eingefuehrt wurden
* Modul darf KEINEN eigenen Rendering-Kontext erzeugen

REGEL:

* Push ist erlaubt, wenn strukturelle Gleichheit mit bestehenden statischen E-Mail-Library-Einbettungen sichergestellt ist (auch ohne echten Browser-Render)

EINSCHRÄNKUNG:

* Es dürfen NUR die Änderungen des aktuellen Moduls enthalten sein
* Keine Testreste oder unvollständigen Module mit veröffentlichen
* Keine parallelen oder abgebrochenen Experimente mit pushen

REGEL:

* Push auf main darf nur erfolgen, wenn diese Checks bestanden sind

EINSCHRÄNKUNG:

* Es dürfen NUR die Änderungen des aktuellen Moduls enthalten sein
* Keine Testreste oder unvollständigen Module mit veröffentlichen
* Keine parallelen oder abgebrochenen Experimente mit pushen

---

## VERIFIKATION VOR PUSH (VERBINDLICH)

Vor Veröffentlichung MUSS geprüft werden:

* Modul rendert in der Library identisch zu bestehenden Modulen (Typografie, Spacing, Grid)
* Statische Einbettung in `design-system/design-library/index.html` ist korrekt
* CSS wird korrekt geladen (`agent/preview-styles.css` aktiv)
* Kein Layout-Drift im Grid/Index

Erst danach darf ein Push auf main erfolgen.

---

## EXPORT FLOW — FINAL (VERBINDLICH)

Der Export-Flow ist FINAL definiert und darf nicht verändert werden.

Er besteht ausschließlich aus:

1. createCampaign
2. genau ein Campaign-Read zum Holen der campaign-owned `templateId` und des `campaignState`
3. genau ein Template-Read zum Holen der aktuellen campaign-owned HTML-Shell
4. finaler HTML Write, bei dem nur Subject, Preheader sowie Snippet Calls plus Parameterwerte in die bestehenden Replace-Zonen eingesetzt werden

WICHTIG:

Dieser Flow definiert ausschließlich die fachlichen Business-Schritte.

Er schränkt NICHT ein:

* die echte Tool-Execution des createCampaign API-Calls
* die technische Ausführung des genau einen erlaubten Campaign-Reads
* die technische Ausführung des genau einen erlaubten Template-Reads
* die technische Ausführung des finalen HTML Writes
* das vollständige Response-Handling der verwendeten Tools
* das Auslesen und Validieren der API-Antwort

VERBINDLICH:

* createCampaign MUSS als echter API-Call ausgeführt werden
* die Response MUSS vollständig zurückgegeben werden
* eine verwertbare Campaign-ID MUSS aus der echten API-Response extrahiert und validiert werden
* als erlaubte ID-Kandidaten gelten nur `campaignId`, `id`, `response.campaignId`, `response.id`, `data.campaignId`, `data.id`, `campaign.campaignId` und `campaign.id`
* ein ID-Kandidat ist nur gueltig, wenn er als `number` oder `string` vorliegt; die erste verwertbare ID MUSS intern zu String normalisiert werden
* direkt nach `createCampaign` MUSS genau ein echter Campaign-Read mit dieser `campaignId` ausgeführt werden, um daraus ausschließlich die campaign-owned `templateId` und den aktuellen `campaignState` zu lesen
* aus diesem Campaign-Read darf ausschließlich die campaign-owned `templateId` und der aktuelle `campaignState` zur Status-Validierung vor dem Write gelesen werden
* nach bekanntem `templateId` MUSS genau ein echter Template-Read der aktuellen campaign-owned HTML-Shell ausgeführt werden
* technische Execution, Response-Rückgabe und Response-Parsing dürfen nicht durch Guardrails blockiert oder verkürzt werden
* auf die createCampaign-Response MUSS explizit gewartet werden, bevor der Export weiterläuft
* createCampaign darf nicht offen bleiben, hängen oder ohne abgeschlossene Response-Verarbeitung enden
* der CreateCampaign-Request des Builder-Exports MUSS exakt `name` und `templateId` enthalten und darf keine Versand- oder Scheduling-Felder enthalten
* `listIds`, `sendAt`, `scheduleSend`, `sendMode` und `recipientTimeZone` sind im CreateCampaign-Request des Builder-Exports verboten
* falls spaeter eine Versandliste benoetigt wird, ist das ein separater manueller Iterable-Schritt ausserhalb dieses Export-Flows
* vor dem finalen HTML Write MUSS der eine erlaubte `campaignRead` bestaetigen, dass der `campaignState` explizit editierbar ist; `Ready` ist der bevorzugte erwartete Status
* bei `Scheduled`, `Running`, `Finished`, `Archived`, `Recurring`, `Aborted` oder jedem anderen nicht explizit als editierbar belegten Status MUSS der Export vor dem Write stoppen
* `569946` oder eine alternative `iterable_template_id` darf nur als Basis-`templateId` fuer `createCampaign` verwendet werden, nie als frei neu zu schreibende Minimal-Shell
* die gelesene campaign-owned HTML-Shell MUSS ausserhalb der erlaubten Replace-Zonen vollstaendig erhalten bleiben
* wenn keine verwertbare Campaign-ID extrahierbar ist, MUSS der Export als Tool-Runtime-/Envelope-Fehler, Iterable-API-Fehler oder Parser-Fehler klassifiziert werden und vor jedem Read/Write stoppen
* bei fehlgeschlagenem CreateCampaign MUSS das Logging mindestens finalen Request ohne Secrets, HTTP-Status-Info, Raw-Body-Info, gepruefte ID-Kandidaten, Ablehnungsgrund und den Hinweis auf den unterbliebenen Read/Write enthalten
* ersetzt werden duerfen ausschliesslich Subject, Preheader und der vorhandene modulare Slot beziehungsweise Snippet-Call-Block

--------------------------------------------------
VERBOTENE ÄNDERUNGEN
--------------------------------------------------

Es ist NICHT erlaubt:

* zusätzliche Iterable API Calls einzubauen, die über `createCampaign`, genau einen Campaign-Read fuer die campaign-owned `templateId` und den `campaignState`, genau einen Template-Read der campaign-owned HTML-Shell sowie den finalen HTML Write hinausgehen
* den erlaubten Campaign-Read für andere Daten oder weitere Logik zu nutzen
* mehr als einen Template-Read einzubauen
* zusätzliche Transformationsschritte einzubauen
* HTML mehrfach zu generieren
* alternative Exportpfade zu definieren
* automatische Retries einzubauen
* `listIds` im CreateCampaign-Request des Builder-Exports zu verwenden
* `sendAt` im CreateCampaign-Request zu verwenden
* `scheduleSend` im CreateCampaign-Request des Builder-Exports zu verwenden
* `sendMode` oder `recipientTimeZone` im CreateCampaign-Request des Builder-Exports zu verwenden
* einen nicht offiziell dokumentierten Status-Reset- oder Update-State-Call einzubauen, um `Scheduled` nachtraeglich auf `Ready` oder `Draft` zu setzen
* die campaign-owned HTML-Shell durch eine freie Minimal-Shell, eine lokal neu erfundene Shell oder nackte `SNIPPET_CALLS` als Komplett-HTML zu ersetzen

--------------------------------------------------
REGEL
--------------------------------------------------

Wenn Codex Änderungen am Export-Flow vornimmt:

→ MUSS er prüfen:
„Verändert diese Änderung den definierten Flow?“

Wenn JA:
→ Änderung ist VERBOTEN

--------------------------------------------------
ZIEL
--------------------------------------------------

Der Export-Flow ist:

* minimal
* deterministisch
* reproduzierbar

Er darf nicht erweitert oder „optimiert“ werden.

---

## ITERABLE-PARAMETER-PARITAET (VERBINDLICH)

Fuer jedes Modul gilt:

* Die produktive Integration gilt fuer neue Module nur dann als erfolgreich, wenn die Iterable-Parameter-Paritaet vollstaendig bestanden ist.
* Primaere Quelle fuer die kanonische Variablenliste ist immer das produktive E-Mail-Modul: `email/modules/emb_<module_id>.html`
* Codex MUSS daraus alle `{{...}}` Variablen extrahieren.
* Zusaetzlich MUSS Codex alle Variablen pruefen, die fuer optionale Zustaende, Fallbacks, Background-Farben, Visibility-Flags oder CTA-Logik benoetigt werden, auch wenn sie nicht als einfacher sichtbarer Textknoten erscheinen.
* Diese kanonische Variablenliste MUSS exakt konsistent sein zwischen:
  * `email/modules/emb_<module_id>.html`
  * `agent/export-map.json`
  * `agent/builder-library.md`
  * `agent/preview-module-library.md`
  * weiteren relevanten Agent-Dateien mit Modulvertrag, Defaults oder Exportlogik
  * allen Variablen, die das Snippet erwartet
  * allen Variablen, die der Export-Payload an Iterable uebergeben koennen muss
* Die Parameterreihenfolge in `export-map.json` MUSS exakt der Reihenfolge im Snippet entsprechen.
* Die Anzahl der Parameter MUSS identisch sein.
* Modulvariablen muessen konsistent dem Prefix `emb_<module_id>_...` folgen.
* Abweichungen sind nur fuer ausdruecklich dokumentierte globale Systemfelder erlaubt; fuer modulbezogene Felder sind sie VERBOTEN.
* Es ist NICHT erlaubt:
  * Parameter hinzuzufuegen
  * Parameter zu entfernen
  * Parameter umzubenennen
  * Parameter zu verschieben
  * Modulvariablen ohne gueltigen Prefix einzufuehren
  * Required-Variablen ohne brauchbaren Default oder ohne sichere Befuellungsquelle zu definieren

--------------------------------------------------
VALIDATION PFLICHT
--------------------------------------------------

Nach jeder Änderung an:

* `export-map.json`
* Snippets
* `builder-library`
* `preview-module-library`
* weiteren relevanten Agent-Dateien mit Modulvertrag, Defaults oder Exportlogik

MUSS Codex prüfen:

1. Fuer jedes neue Modul:
   - leite die kanonische Variablenliste primaer aus allen `{{...}}` Variablen in `email/modules/emb_<module_id>.html` ab
   - ergaenze diese Liste um Variablen fuer optionale Zustaende, Fallbacks, Background-Farben, Visibility-Flags und CTA-Logik
   - extrahiere die Variablen aus `export-map.json`
   - extrahiere die Variablenlisten aus `agent/builder-library.md`, `agent/preview-module-library.md` und weiteren relevanten Agent-Dateien
   - pruefe die Variablen, Required-/Default-Definitionen und die exportierbare Iterable-Payload gegeneinander
2. Vergleiche:
   - Anzahl
   - Reihenfolge
   - Namen
   - Prefix
   - Required-/Default-Status
   - Vollstaendigkeit des Iterable-Export-Payloads
3. Wenn Abweichung:

→ Aenderung ist UNGUELTIG
→ Codex MUSS sie korrigieren, bevor er fortfaehrt
→ Codex MUSS die produktive Integration stoppen
→ Codex darf keine erfolgreiche Integrationsmeldung ausgeben

--------------------------------------------------
HARTE FEHLERBEDINGUNGEN
--------------------------------------------------

Die produktive Integration darf NICHT als erfolgreich gelten, wenn:

* eine Variable im E-Mail-Modul existiert, aber in `export-map.json` fehlt
* eine Variable in `export-map.json` existiert, aber im Modul nicht genutzt wird und nicht ausdruecklich begruendet ist
* eine Variable in Agent-/Builder-Dateien inkonsistent oder anders benannt ist
* eine Required-Variable keinen brauchbaren Default und keine sichere Befuellungsquelle hat
* eine Variable nicht dem Prefix `emb_<module_id>_...` folgt
* Variablen doppelt oder inkonsistent vorkommen
* die Anzahl erwarteter Snippet-/Iterable-Parameter nicht mit der Anzahl der Export-Parameter uebereinstimmt
* optionale Parameter, Visibility-Flags oder Fallbacks nicht sauber definiert sind
* der Export-Payload nicht alle von Iterable erwarteten Parameter liefern kann

Wenn eine dieser Pruefungen fehlschlaegt:

* Codex MUSS stoppen
* Codex darf keine erfolgreiche Integrationsmeldung ausgeben
* Codex MUSS konkret berichten:
  * welche Variable fehlt
  * wo sie fehlt
  * ob sie required, defaulted oder optional ist
  * wie sie korrigiert werden muss

--------------------------------------------------
REGEL
--------------------------------------------------

`export-map.json` darf nur existieren, wenn:

→ SNIPPET = EXPORT-MAP (1:1)
→ E-MAIL-MODUL = EXPORT-MAP = BUILDER-/AGENT-VERTRAG = ITERABLE-PAYLOAD

## DO NOT DO

* KEINE Nutzung von modules-Frames für finale E-Mail-Module
* KEIN neuer Frame-Typ ohne Referenz zu bestehenden Modulen
* KEIN Push auf main ohne Sichtprüfung in der Library
* KEIN Mischen von Frame-Typen (z. B. modules + snippets)
* KEINE Veröffentlichung von Testständen oder abgebrochenen Modulen

---

## QA

* Builder testen
* Export prüfen
* visuelle QA

---

## CSS STANDARD

* components.css = deprecated
* `agent/preview-styles.css` bleibt die globale Preview-CSS-Quelle
* Der kanonische oeffentliche Preview-CSS-Link ist `https://s24-creative-ops.github.io/email-builder/preview-styles.css`
* Inhaltliche globale Preview-CSS-Regeln werden nur in `agent/preview-styles.css` gepflegt; weitere Preview-CSS-Dateien als zweite CSS-Wahrheit sind verboten
* modulrelevantes CSS darf zusaetzlich modulnah oder inline definiert werden, wenn das fuer das einzelne Modul oder fuer E-Mail-Kompatibilitaet der richtige Ort ist
* globale CSS-Dateien nur erweitern, wenn die Regel wirklich global benoetigt wird
* Development-only CSS gehoert nie in produktive CSS-Dateien oder produktive Module

---

## KRITISCHE REGELN

* Kein Modul ohne export-map
* Keine neuen Felder ohne Mapping
* Keine inkonsistenten Namen
* Kein Direktzugriff auf .publish

---

## TRIGGER

Die produktive Integration startet nur bei eindeutiger User-Freigabe des aktuellen Review-Stands.
