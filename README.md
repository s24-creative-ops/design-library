# Design Library Mirror

Dieses Repository ist der statische Publish-Mirror der aktiven Projekt-Library.

Source of Truth:
- `Design System/design-library/` nach einem erfolgreichen Source-Sync

E-Mail- und LP-Inhalte sowie die benoetigten Preview-Styles liegen als generierte Snapshots in `Design System/design-library/`.

Der Mirror wird lokal aus dem Projekt synchronisiert ueber:

```bash
python3 "Design System/scripts/sync_design_library_publish.py"
```

Wichtig:
- keine separate nachgebaute Web-Version pflegen
- Aenderungen immer zuerst im Projekt vornehmen
- danach den Mirror synchronisieren und einen Pull Request im Publish-Repo erstellen
