# Design Library — veröffentlichte Ausgabe

Dieses Repository stellt die öffentliche Design Library bereit. Es ist keine Entwicklungsquelle.

## Verbindliche Quellen

- Library und Tokens: https://github.com/scout24-creative-ops/design-system
- E-Mail Builder: https://github.com/scout24-creative-ops/email-builder
- Contentful LP Builder: https://github.com/scout24-creative-ops/lp-builder-contentful

Änderungen zuerst in der jeweiligen Quelle umsetzen. Die freigegebenen statischen Ausgaben werden anschließend hierher synchronisiert und per Pull Request veröffentlicht.

## Inhalt dieses Repositories

- `design-system/design-library/`: bestehende allgemeine Library einschließlich E-Mail-Vorschauen und eigenständigem LP-Snapshot
- `design-system/contentful-design-library/`: separate Contentful-LP-Library
- `index.html`: Weiterleitung zur bestehenden allgemeinen Library
- `.nojekyll`: statische GitHub-Pages-Auslieferung

Beide Library-Verzeichnisse enthalten die für ihre Darstellung benötigten HTML-, CSS-, JavaScript- und Bilddateien. Erzeugte Modul- und Token-Snapshots sind Veröffentlichungsdateien und keine separat gepflegten Quellen.

Frühere komplette Builder-Quellkopien, lokale Sync-Skripte, alte Arbeitsanweisungen, der separate Token-Quellbaum und Bootstrap-Testdateien gehören nicht in diese Distribution.

## Bestehende URLs erhalten

Dieses Repository wird weiterhin für die bekannten öffentlichen Library-URLs benötigt. Nicht löschen, umbenennen, privatisieren oder GitHub Pages deaktivieren, solange kein separat geprüfter Hosting-Umzug einschließlich URL-Erhalt abgeschlossen ist.

Alte technische Direktlinks in entfernte Builder-Quellkopien gehören nicht zu den beiden erhaltenen Library-Einstiegspunkten. Der öffentliche E-Mail-CSS-Endpunkt im separaten Repository `s24-creative-ops/email-builder` wird durch diese Bereinigung nicht verändert.

## Veröffentlichungsweg

Die Quelle `scout24-creative-ops/design-system` stellt die Sync-Skripte und den manuellen Review-PR-Workflow bereit. Hier keine zweite Modulbibliothek, Token-Wahrheit oder Entwicklungslogik aufbauen.
