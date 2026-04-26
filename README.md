# Design Library Mirror

Dieses Repository ist der Publish-Mirror der aktiven Projekt-Library unter `GPT Agents/`.

Source of Truth:
- `design-system/`
- `email-builder/`
- `lp-builder/`

Der Mirror wird lokal aus dem Projekt synchronisiert ueber:

```bash
python3 design-system/scripts/sync_design_library_publish.py
```

Wichtig:
- keine separate nachgebaute Web-Version pflegen
- Aenderungen immer zuerst im Projekt vornehmen
- danach den Mirror synchronisieren und erst dann nach GitHub pushen
