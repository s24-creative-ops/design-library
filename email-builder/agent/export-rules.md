# Export Rules

- Export startet nur auf explizite Anweisung.
- Exportquelle ist die letzte freigegebene Preview-Komposition.
- `email/` enthaelt die aktive finale HTML-Fassung; direkte Modellierung in alten Spiegelordnern ist verboten.
- Die echte Export-Basis bleibt die campaign-owned HTML-Shell, nicht lokale Preview-HTML.
- Erlaubte Replace-Zonen sind nur Subject, Preheader und der modulare Slot.
- Wenn Replace-Zonen, Mapping oder Payload nicht sauber sind, fail-closed abbrechen.
- Keine Live-Iterable-Sicherheit behaupten, solange die campaign-owned Shell nicht echt validiert wurde.
- Bei Modul- oder Template-Aenderungen muessen `email/` und `agent/` nachgezogen werden, nachdem `preview/` fest ist.
