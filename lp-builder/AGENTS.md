# AGENTS.md

## Zweck

Diese Datei ist die zentrale Prozess- und Steuerdatei fuer `lp-builder/`.

Sie definiert:
- die aktive LP-Struktur
- die Einordnung unter `GPT Agents/`
- was die technische LP-Vorschau-Wahrheit ist
- wie die gemeinsamen LP-Core-Dateien einzuordnen sind
- wie Codex bei neuen oder geaenderten LP-Modulen vorgeht

## Uebergeordnete Projektstruktur

Dieses Projekt ist Teil der Top-Level-Struktur unter `GPT Agents/`:

- `GPT Agents/email-builder/`
- `GPT Agents/lp-builder/`
- `GPT Agents/design-system/`

Dabei gilt:
- `lp-builder/` ist die technische LP-Quelle.
- `design-system/` ist die sichtbare Component-Library- und Token-Ebene.
- `email-builder/` bleibt davon getrennt die technische E-Mail-Quelle.
- `../.publish/design-library-repo/` ist der generierte Publish-Mirror fuer `s24-creative-ops/design-library`.

## Aktive Struktur in `lp-builder/`

Die aktive Struktur ist aktuell bewusst kompakt:

- `preview/`
- die gemeinsamen LP-Core-Dateien im Projekt-Root

### `preview/`

`preview/` ist die aktive Wahrheit fuer die einzelnen LP-Module.

Hier liegen:
- `preview/modules/<modul>.html`
- `preview/modules/catalog.yaml`
- `preview/modules/rules.md`
- `preview/frame-base.css`
- `preview/frame-bridge.js`

### Gemeinsame LP-Core-Dateien

Die gemeinsamen LP-Core-Dateien bleiben vorerst im Root von `lp-builder/`:

- `component-library.html`
- `core-foundations.css`
- `core-buttons.css`
- `core-components.css`
- `core-interactions.js`

Wichtig:
- `component-library.html` ist die importierte Rohquelle aus dem aktuellen LP Builder.
- Die aktive Modul-Arbeit soll kuenftig in `preview/modules/*.html` stattfinden.
- Gemeinsame Stil- oder Interaktionslogik wird weiterhin in den Core-Dateien gepflegt, solange sie noch nicht tokenisiert oder anders aufgeteilt ist.

## Gemeinsame Design-Ebene

Die gemeinsame sichtbare Ebene liegt unter:

- `../design-system/tokens/`
- `../design-system/design-library/`

Dabei gilt:
- `lp-builder/preview/modules/*.html` sind die technischen LP-Modulquellen.
- `../design-system/design-library/` laedt diese Quellen fuer die sichtbare Library.
- `../.publish/design-library-repo/` ist der lokale Mirror fuer den spaeteren GitHub-Publish derselben Library.
- Die Token-Zuordnung fuer LP wird erst in einem spaeteren Schritt sauber nachgezogen.

## Prioritaet der Wahrheit

Es gilt fuer LP aktuell:
1. `preview/modules/*.html` ist die aktive Modul-Wahrheit.
2. `core-foundations.css`, `core-buttons.css`, `core-components.css`, `core-interactions.js` sind die gemeinsame LP-Core-Wahrheit.
3. `../design-system/design-library/` ist die sichtbare Vorschau fuer Menschen.
4. `component-library.html` bleibt als Roh- und Referenzquelle erhalten, ist aber nicht mehr die bevorzugte Bearbeitungsebene fuer einzelne Module.

## Arbeitsregel fuer Codex

Bei neuen oder geaenderten LP-Modulen arbeitet Codex immer in dieser Reihenfolge:
1. Erst das betroffene Modul in `preview/modules/` aktualisieren.
2. Danach pruefen, ob gemeinsame LP-Core-Dateien betroffen sind.
3. Danach `preview/modules/catalog.yaml` nachziehen, falls sich Modulmenge oder Einordnung aendert.
4. Danach die sichtbare Library unter `../design-system/design-library/` nachziehen.
5. Danach den Publish-Mirror synchronisieren:
   `python3 ../design-system/scripts/sync_design_library_publish.py`
6. Tokens erst dann anbinden, wenn die Modulstruktur sauber steht.

## Pflichtpfad bei Modul-Arbeit

Wenn ein LP-Modul neu entsteht oder geaendert wird:
1. `preview/modules/<modul>.html` aktualisieren.
2. Falls noetig `preview/frame-base.css` aktualisieren.
3. Falls noetig `preview/frame-bridge.js` aktualisieren.
4. Falls noetig gemeinsame LP-Core-Dateien aktualisieren:
   - `core-foundations.css`
   - `core-buttons.css`
   - `core-components.css`
   - `core-interactions.js`
5. Falls noetig `preview/modules/catalog.yaml` aktualisieren.
6. Danach die sichtbare Library in `../design-system/design-library/` nachziehen.
7. Danach den Publish-Mirror synchronisieren:
   `python3 ../design-system/scripts/sync_design_library_publish.py`

## Aktueller Fokus

Der aktuelle Struktur-Schritt baut die LP-Module aus der bisherigen Sammeldatei in Einzeldateien um.

Noch nicht Teil dieses Schritts:
- saubere Token-Zuordnung
- Template-Struktur fuer LP
- eigener LP-Agent-Layer
