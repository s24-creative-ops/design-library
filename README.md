# Design Library Mirror

Dieses Repository ist der Publish-Mirror der aktiven Projekt-Library unter `GPT Agents/`.

Source of Truth:
- `design-system/design-library/`
- `design-system/tokens/`
- `design-system/scripts/`
- `email-builder/preview/`
- `email-builder/email/`
- `email-builder/agent/`

LP-Inhalte werden aktuell nur als konservierte Snapshots innerhalb von `design-system/design-library/` gehalten.

Der Mirror wird lokal aus dem Projekt synchronisiert ueber:

```bash
python3 design-system/scripts/sync_design_library_publish.py
```

Wichtig:
- keine separate nachgebaute Web-Version pflegen
- Aenderungen immer zuerst im Projekt vornehmen
- danach den Mirror synchronisieren und erst dann nach GitHub pushen
