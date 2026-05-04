# Content Rules

## Zweck

- Diese Datei sammelt inhaltliche Regeln fuer die Content-Erstellung im EMB.
- Sie ergaenzt `guardrails.md` um Content-spezifische Layout-, Balance- und Textvorgaben.
- Technische Struktur-, Preview- und Exportregeln bleiben in `guardrails.md`.
- Sprachstil, Ansprache und Schreibweisen bleiben in `tone-of-voice.md`.

## Allgemeine Content-Regeln

- Sichtbarer Mail-Content fuer Preview und Iterable-Export ist standardmaessig Deutsch, wenn der User keine andere Mail-Sprache ausdruecklich verlangt.
- Englische Arbeitsanweisungen oder Tool-Begriffe allein sind kein Sprachsignal fuer englischen Mail-Content.
- Inhalte muessen pro Modul klar fokussiert und leicht erfassbar bleiben.
- Ein Modul soll keine Landingpage-Langform werden.
- Pflichtinhalte duerfen nicht leer, sinnlos oder rein generisch sein.

## Salutation-Kontext

- Die zentrale Registry fuer Anrede-Zuordnungen ist `agent/product-salutations.json`.
- `salutationContext` ist ein technischer Resolver fuer Anrede-Logik und kein sichtbares User-Textfeld.
- Wenn ein aktives Composition-Template eine `salutation_context_id` traegt, wird dieser Kontext automatisch gesetzt; es ist keine Rueckfrage noetig.
- Wenn der User explizit `Mail fuer RLE`, `Loft SNL` oder `Loft RNL` sagt, muss der EMB die Zuordnung ueber `aliases` oder `template_ids` der Registry ohne unnoetige Rueckfrage aufloesen.
- Wenn bei From-scratch oder Blank kein Team, Produkt oder Kontext erkennbar ist, fragt der EMB genau einmal: `Fuer welches Team oder Produkt ist die Mail gedacht? Zum Beispiel RLE, Loft SNL oder Loft RNL (Dev).`
- Wenn danach weiter keine eindeutige Zuordnung moeglich ist, gilt `salutationContext = generic`.
- Sichtbare Preview-Anreden muessen menschenlesbar bleiben; Raw-Handlebars, freie Snippetcalls oder freie Iterable-Logik im User-Content bleiben verboten.
- Fuer `salutationContext = loft-rnl-dev` bleibt die sichtbare Intro-Anrede im Builder `Hallo Anrede`; der produktive Handlebars-Ausdruck ist ein kontrollierter Exportwert und kein editierbarer User-Text.

## Produktkontext

- Produktdefaults duerfen nur aus den dokumentierten Resolver-Regeln in `builder-library.md` kommen.
- Aktuell ist nur der Produktkontext `RLE` fuer zusaetzliche Inhaltsdefaults erlaubt; andere Registry-Kontexte aktivieren keine weiteren Produktdefaults.
- Wenn der User einen unbekannten expliziten Produktnamen nennt, muss der Agent nachfragen statt zu raten.
- Produktdefaults sind Start-Defaults und nie staerker als explizite spaetere User-Vorgaben fuer konkrete Felder.
- Wenn `RLE` aktiv ist und der User keine abweichenden Contact-Werte vorgibt, muessen fuer das `contact`-Modul exakt die dokumentierten RLE-Defaults aus `builder-library.md` verwendet werden.
- Wenn `RLE` aktiv ist, darf der Hero-Salutation-Snippetcall nur ueber die dokumentierten technischen Export-Flags `*_use_snippetcall_salutation` aktiviert werden.
- Freie User-Snippetcalls, freie Raw-Logik oder freier HTML-Code in Hero-Salutations bleiben verboten.

## Hero

- Im Hero ist nur eines von beiden erlaubt: `eyebrow` oder `badge`.
- `eyebrow` und `badge` duerfen nie gleichzeitig sichtbar sein.
- Wenn der User fuer ein Hero-Modul ein Badge verlangt, muss eine vorhandene `eyebrow` ausgeblendet werden.
- Wenn der User fuer ein Hero-Modul eine `eyebrow` verlangt, muss ein vorhandenes Badge ausgeblendet werden.

## CTA-Buttons

- Pro Mail ist genau ein primaerer `button-filled-brand` vorgesehen.
- Wenn ein Hero-Modul einen Button-CTA hat, ist dieser Hero-CTA immer der primaere `button-filled-brand`.
- Weitere Button-CTAs in derselben Mail muessen auf andere erlaubte Button-Typen ausweichen.
- Fuer Nicht-Hero-Button-CTAs bleibt der Preview-Standard `button-outline-strong`.
- Wenn eine Mail ausnahmsweise keinen Hero-Button hat, darf stattdessen genau ein anderer primaerer CTA `button-filled-brand` sein.

## Mehrspaltige Module

- Bei Modulen mit `2` oder `3` nebeneinanderstehenden Spalten sollen die Textmengen pro Spalte moeglichst aehnlich lang sein.
- Exakte Zeichengleichheit ist nicht noetig, aber starke Laengenunterschiede sind zu vermeiden.
- Das Ziel ist ein ruhiges, visuell ausgewogenes Layout.

## Benefits-3col

- Die drei Benefit-Texte sollen moeglichst aehnliche Textmengen haben.
- Es darf keine deutlich ueberladene Einzelspalte neben zwei sehr kurzen Spalten geben.
- Unterschiede sind erlaubt, solange das Modul visuell ausgewogen bleibt.

## Table-Comparison

- Fuer `table-comparison` gilt eine strengere Balance-Regel als fuer andere Mehrspalter.
- Beide Spalten-Headlines sollen in ihrer Laenge so nah beieinander liegen, dass sie moeglichst gleich viele Zeilen einnehmen.
- Es soll vermieden werden, dass eine Spalten-Headline einzeilig und die andere zweizeilig ist.
- Inhalte desselben Zeilenpaars links und rechts sollen moeglichst aehnlich lang sein.
- Es soll vermieden werden, dass eine Zelle eines Zeilenpaars sehr kurz und die gegenueberliegende Zelle deutlich laenger ist.
- Ziel ist, dass beide Vergleichsspalten visuell synchron und direkt vergleichbar bleiben.
