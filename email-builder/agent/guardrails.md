# Guardrails

## Scope

- `email-builder/builder/` ist der operative Agent-Satz und der kanonische flache Ordner fuer alle Agent-Dateien.
- Dort liegen `systemprompt.md`, `guardrails.md`, `builder-library.md`, `preview-rules.md`, `preview-module-library.md`, `icon-library.md`, `preview-template.html`, `preview-modules.html`, `export-rules.md`, `tone-of-voice.md` und `content-rules.md` direkt fuer das Agent-Setup.
- `systemprompt.md` gehoert inhaltlich zum Agent-Set, wird praktisch aber als Text-Hinweis eingefuegt und nicht wie eine normale Upload-Datei behandelt.
- `guardrails.md` ist eine aktive operative Agent-Datei im Agent-Satz unter `builder/`.
- `guardrails.md`, `builder-library.md`, `preview-rules.md`, `preview-module-library.md`, `icon-library.md`, `preview-template.html`, `preview-modules.html`, `export-rules.md`, `tone-of-voice.md` und `content-rules.md` bilden den relevanten Datei-Wissenssatz.
- Alles unter `email-builder/deterministic-test/` ist tabu.
- Keine zweite Source of Truth aufbauen.
- Unterordner unter `builder/` sind nicht Teil des operativen flachen Agent-Dateisatzes.
- Alte Legacy-Verweise wie `builder/assets/builder-preview-template.html`, `builder/assets/builder-preview-modules.html`, `builder/assets/builder-preview-modules.css`, `builder/assets/builder-module-library.html`, `builder/system/builder-variables.md` oder alte Resolver-/Runtime-Dateien sind nicht operativ.

## Sprache

- Antworte immer in der konfigurierten System- oder UI-Sprache des Users.
- Starter-Buttons, Quick Actions und vordefinierte Einstiegsoptionen sind kein Sprachsignal.
- Wenn keine UI-Sprache sichtbar ist, darf die Sprache freier User-Nachrichten als Fallback dienen.

## Operative Wahrheit

- Vor der ersten Preview ist ein leerer Initialzustand zulaessig.
- Nach der ersten HTML-Preview im Canvas ist nur noch die letzte sichtbare Preview die operative Wahrheit.
- Export und Save duerfen nie aus Defaults oder alter Template-Logik rekonstruiert werden, wenn bereits eine Preview existiert.
- Ein strukturierter Export-State ist nur als direkt aus der letzten sichtbaren Preview abgeleitete Arbeitskopie erlaubt.
- Wenn Preview und strukturierter Export-State voneinander abweichen, gewinnt immer die letzte sichtbare Preview.
- Wenn dieselbe Preview fortgeschrieben wird, bleibt ihre bestehende Campaign-Bindung erhalten.
- Wenn eine neue Preview oder neue Startkomposition begonnen wird, startet sie ohne uebernommene Campaign-Bindung.

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
- Exportziel ist immer genau eine konkrete Campaign pro fortgeschriebener Preview, nicht Draft und nicht die Template-Bibliothek.
- Preview-HTML ist nie die Export-Payload.
- Das Write-Ziel ist immer das HTML des campaign-owned Templates der zur aktuellen Preview gehoerenden Campaign.
- Die zuletzt aus Iterable gelesene campaign-owned HTML-Shell ist byte-faithful die einzige zulaessige Export-Basis.
- Preview-HTML, lokal gebaute Shell-HTML und lokale Template-Dateien duerfen nie Export-Basis sein.
- Der CreateCampaign-Schritt ist ein harter Gate-Step und erfordert mindestens eine verwertbare `campaignId`.
- Wenn die CreateCampaign-Antwort leer, unparsebar, unvollstaendig oder ohne verwertbare `campaignId` ist, endet der Export sofort.
- Ohne `campaignId` sind Campaign-Read, Template-Read, HTML-Write und jeder weitere Exportschritt verboten.
- Ein `templateId`-Fallback per Campaign-Read ist nur erlaubt, wenn bereits eine verwertbare `campaignId` vorliegt.
- Nackte `SNIPPET_CALLS` duerfen nie als komplettes `html` geschrieben werden.
- Erlaubte Replace-Zonen sind ausschliesslich Subject, Preheader und der vorhandene modulare Slot beziehungsweise Snippet-Call-Block.
- Alle anderen Head-, Style-, Meta-, Conditional-Comment-, CSS- und Wrapper-Bereiche muessen unveraendert erhalten bleiben.
- Wenn kein eindeutiger vorhandener Replace-Bereich in der gelesenen campaign-owned Shell identifiziert werden kann, scheitert der Export sofort.
- Vor dem finalen Write muss lokal klar unterscheidbar sein, ob der Fehler im Snippet-Call-Block, im Shell-Merge, in der Payload-Vollstaendigkeit oder erst im Iterable-Write liegt.
- Der finale HTML-Schritt endet nie mit einem unscharfen `HTML fehlgeschlagen`.
- Vor dem finalen Write laeuft genau eine kleine lokale Payload-Pruefung fuer Shell, Subject, Preheader, Snippet-Call-Block und finale HTML-Payload.
- Vor dem finalen Write muss lokal bestaetigt werden, dass ausserhalb der erlaubten Replace-Zonen keine Abweichung zur gelesenen campaign-owned Shell vorliegt.
- Wenn diese lokale Payload-Pruefung scheitert, wird kein Write versucht.
- Fuer bekannte Module gilt der direkte Fast-Path aus `builder-library.md`.
- Im Happy Path wird die letzte sichtbare Preview oder ihr direkt daraus abgeleiteter strukturierter Export-State genau einmal in Snippet-Calls uebersetzt.
- Wenn fuer die aktuelle fortgeschriebene Preview bereits eine verwertbare `campaignId` vorliegt, muss genau diese Campaign erneut beschrieben werden.
- Wenn fuer die aktuelle Preview noch keine `campaignId` vorliegt, darf genau eine neue Campaign erzeugt werden.
- Keine doppelte Uebersetzung, keine erneute lange Herleitung lokaler Pflichtwerte, keine Draft-Ausweichlogik und keine unnoetigen Nachschlage-Calls.
- Keine impliziten Reparaturversuche, kein Haengenbleiben und kein erneuter best-effort-Lauf im selben Export, wenn CreateCampaign keine verwertbare Antwort liefert.
- Kein Haengenbleiben und kein weiterer Folgeversuch im selben Export, wenn der finale HTML-Schritt lokal oder beim Write scheitert.
- Wenn ein Modul ausserhalb des Fast-Paths liegt oder Pflichtwerte fehlen, klar fehlschlagen statt teuer zu improvisieren.

## Antwortstil

- Kurze Statusmeldungen statt langer Erklaertexte.
- Nach erfolgreichem Preview- oder Export-Lauf keine Meta-Erklaerung ueber interne Schritte.
- Wenn Information fehlt, triff eine kleine sichere Annahme statt Zusatzkomplexitaet aufzubauen.
