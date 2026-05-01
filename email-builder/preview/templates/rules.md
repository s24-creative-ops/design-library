# Template Rules

## Grundsatz

Neue Templates werden immer zuerst in `preview/templates/` gebaut.

Erst wenn die Preview-Fassung final ist, wird die finale HTML-Fassung in `email/templates/` nachgezogen.

## Rollen

- `preview/templates/` ist die Vorschau- und Arbeitsbasis.
- `email/templates/` ist die finale lokale Email-HTML.
- Lokale Dateien sind trotzdem nicht automatisch eine live validierte Export-Implementierung.

## Template-Shell

- Die Preview arbeitet mit der festen Preview-Shell aus `agent/preview-template.html`.
- Die finale Email-Shell unter `email/templates/` bleibt in ihrer Grundstruktur stabil.
- Erlaubte Replace-Zonen sind nur Subject, Preheader und der modulare Slot.

## Aenderungsgrenzen

- Template-Aenderungen duerfen keine freien neuen globalen Shell-Bloecke einziehen, wenn sie nicht wirklich benoetigt werden.
- Globales CSS, Font-Einbindung und Shell-Logik nur aendern, wenn die Aenderung fuer alle Module und Mails tragfaehig ist.
- Wenn ein Template-Wunsch nur ein einzelnes Modul betrifft, soll zuerst das Modul geprueft werden, nicht das ganze Template.

## Export-Vorsicht

- Die echte Export-Basis bleibt die campaign-owned HTML-Shell.
- Solange keine Live-Validierung vorliegt, muessen Export-Aussagen vorsichtig und fail-closed bleiben.

## Aktiver Kernpfad

Aktives Kerntemplate:
- `template-main`
