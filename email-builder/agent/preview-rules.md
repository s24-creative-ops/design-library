# Preview Rules

- Jede Preview basiert auf `preview-template.html`.
- Ersetze in der Shell nur Subject, Preheader und den Modul-Slot.
- Modulbloecke duerfen nur aus `preview-modules.html` stammen.
- Nutze nur Module, die in `preview-module-library.md` angebunden sind.
- Preview ist die sichtbare Arbeitsbasis, aber nicht die Produktionswahrheit.
- Hintergrund-Rhythmus folgt `builder-library.md`.
- Bilder bleiben ohne echte URL als Placeholder sichtbar.
- Benefit-Icons duerfen nur aus `icon-library.md` kommen.
- Wenn Preview-Marker fuer Export-Felder vorhanden sind, muessen genau diese Marker spaeter fuer den Export gelesen werden.
