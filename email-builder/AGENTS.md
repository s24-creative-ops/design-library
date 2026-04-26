# AGENTS.md

## Zweck

Diese Datei ist die einzige zentrale Prozess- und Steuerdatei fuer `email-builder/`.

Sie definiert:
- die vereinfachte aktive Struktur
- die Einordnung unter `GPT Agents/`
- was Preview-Wahrheit ist
- was E-Mail-Wahrheit ist
- was die gemeinsame Token-Wahrheit ist
- was der kompakte Agent-Arbeitslayer ist
- wie Codex bei neuen oder geaenderten Modulen und Templates vorgeht

## Uebergeordnete Projektstruktur

Dieses Projekt ist Teil der Top-Level-Struktur unter `GPT Agents/`:

- `GPT Agents/email-builder/`
- `GPT Agents/lp-builder/`
- `GPT Agents/design-system/`

Dabei gilt:
- `email-builder/` bleibt die technische E-Mail-Produktionsstruktur.
- `lp-builder/` ist als technische Schwesterstruktur vorbereitet.
- `design-system/` ist die gemeinsame Token- und Component-Library-Ebene.
- `design-system/` ist sichtbare Hauptoberflaeche fuer Tokens und Vorschau.
- `../.publish/design-library-repo/` ist der generierte Publish-Mirror fuer `s24-creative-ops/design-library`.

## Aktive Struktur in `email-builder/`

Die aktive Struktur ist jetzt bewusst schlicht:

- `preview/`
- `email/`
- `agent/`

### `preview/`

`preview/` ist die aktive Wahrheit fuer Vorschau und Arbeitsmodell.

Hier liegen:
- `preview/modules/<modul>.html`
- `preview/modules/catalog.yaml`
- `preview/modules/rules.md`
- `preview/templates/<template>.html`
- `preview/templates/catalog.yaml`
- `preview/templates/rules.md`
- `preview/brand-map.json`

### `email/`

`email/` ist die aktive Wahrheit fuer die finale E-Mail-HTML.

Hier liegen:
- `email/modules/<snippet>.html`
- `email/templates/<template>.html`

Es gibt keinen separaten aktiven Iterable-Spiegel mehr, solange diese Dateien bereits die operative E-Mail-Fassung tragen.

### `agent/`

`agent/` ist der kompakte Arbeitslayer fuer Codex.

Er ist keine zweite Produktionswahrheit. Er wird aus `preview/` und `email/` nachgezogen.

## Gemeinsame Design-Ebene

Die gemeinsame Design-Ebene liegt uebergeordnet in `../design-system/`.

Wichtig:
- `../design-system/tokens/` ist die fuehrende Token-Ebene fuer Builder.
- `../design-system/design-library/` ist die sichtbare Hauptoberflaeche fuer Vorschau und Team-QA.
- `../.publish/design-library-repo/` ist der lokale Mirror fuer den spaeteren GitHub-Publish der echten Library.
- Die technische E-Mail-Wahrheit liegt weiterhin in `preview/` und `email/`.

## Prioritaet der Wahrheit

Es gilt immer:
1. `preview/` ist die Vorschau-Wahrheit.
2. `email/` ist die finale E-Mail-Wahrheit.
3. `../design-system/tokens/` ist die gemeinsame Token-Wahrheit.
4. `../design-system/design-library/` ist die sichtbare Preview-Wahrheit fuer Menschen.
5. `agent/` ist der abgeleitete Arbeitslayer.

## Arbeitsregel fuer Codex

Bei neuen oder geaenderten Modulen und Templates arbeitet Codex immer in dieser Reihenfolge:
1. Erst `preview/` aktualisieren.
2. Dann `email/` aktualisieren.
3. Danach pruefen, ob `../design-system/tokens/` betroffen ist.
4. Danach die sichtbare Library-Datei in `../design-system/design-library/` nachziehen.
5. Danach den Publish-Mirror synchronisieren:
   `python3 ../design-system/scripts/sync_design_library_publish.py`
6. Danach pruefen, welche kompakten Agent-Dateien in `agent/` nachgezogen werden muessen.
7. Offene Luecken klar markieren statt sie zu kaschieren.

## Pflichtpfad bei Modul-Arbeit

Wenn ein Modul neu entsteht oder geaendert wird:
1. `preview/modules/<modul>.html` aktualisieren.
2. `email/modules/<snippet>.html` aktualisieren.
3. Falls noetig `preview/modules/catalog.yaml` aktualisieren.
4. Falls noetig `preview/brand-map.json` nachziehen.
5. Falls noetig `preview/modules/rules.md` nachziehen.
6. Falls noetig `../design-system/tokens/brands/immoscout24.json` mitziehen.
7. Danach die sichtbare Library unter `../design-system/design-library/index.html` aktualisieren.
8. Danach den Publish-Mirror synchronisieren:
   `python3 ../design-system/scripts/sync_design_library_publish.py`
9. Danach den Agent-Layer aktualisieren:
   `agent/preview-modules.html`, `agent/builder-library.md`, `agent/preview-module-library.md`, `agent/components.css`

## Pflichtpfad bei Template-Arbeit

Wenn ein Template neu entsteht oder geaendert wird:
1. `preview/templates/<template>.html` aktualisieren.
2. `email/templates/<template>.html` aktualisieren.
3. Falls noetig `preview/templates/catalog.yaml` aktualisieren.
4. Falls noetig `preview/brand-map.json` nachziehen.
5. Falls noetig `preview/templates/rules.md` nachziehen.
6. Falls noetig `../design-system/tokens/brands/immoscout24.json` mitziehen.
7. Danach pruefen, ob `../design-system/design-library/index.html` fuer sichtbare Template-Darstellung mitgezogen werden muss.
8. Danach den Publish-Mirror synchronisieren:
   `python3 ../design-system/scripts/sync_design_library_publish.py`
9. Danach den Agent-Layer aktualisieren:
   `agent/preview-template.html`, `agent/export-rules.md`, `agent/builder-library.md`, `agent/components.css`

## Synchronisationslogik

Die operative Nachziehlogik liegt ebenfalls in dieser Datei.

Grundsatz:
- `preview/` modelliert die technische Vorschau-Basis.
- `email/` traegt die finale E-Mail-HTML.
- `../design-system/tokens/` traegt die gemeinsamen Design-Tokens.
- `../design-system/design-library/` zeigt die sichtbare Vorschau fuer Menschen.
- `agent/` verdichtet dieselbe Wahrheit in einen kompakten Arbeitslayer.

Bei Modul-Aenderungen immer zusammen denken:
- `preview/modules/<modul>.html`
- `email/modules/<snippet>.html`
- `preview/modules/catalog.yaml`
- `preview/brand-map.json`
- `preview/modules/rules.md`
- `../design-system/tokens/brands/immoscout24.json`
- `../design-system/design-library/index.html`
- `agent/preview-modules.html`
- `agent/preview-module-library.md`
- `agent/builder-library.md`
- `agent/components.css`

Bei Template-Aenderungen immer zusammen denken:
- `preview/templates/<template>.html`
- `email/templates/<template>.html`
- `preview/templates/catalog.yaml`
- `preview/brand-map.json`
- `preview/templates/rules.md`
- `../design-system/tokens/brands/immoscout24.json`
- `../design-system/design-library/index.html`
- `agent/preview-template.html`
- `agent/export-rules.md`
- `agent/builder-library.md`
- `agent/components.css`

## Tokens

Die gemeinsame aktive Token-Datei fuer den aktuellen E-Mail-Stand liegt unter
`../design-system/tokens/brands/immoscout24.json`.

Wichtig:
- Die Datei ist noch keine vollstaendige Token-Quelle.
- Sie buendelt aktuell nur sicher sichtbare Grundwerte.
- Vor einer spaeteren strengeren Token-Logik muss entschieden werden, welche Werte dort dauerhaft leben und welche spaeter in ein breiteres Brand-System wandern.

## Aktive Ausschluesse

In diesem Struktur-Schritt nicht aktiv migrieren oder inhaltlich umbauen:
- `servicetiles-4up`
- `template-vissmann` / `viessmann`
- `logo-viessmann`
- `teaser-2col-listing-compact`

## Alltag fuer den Agent

Wenn Codex schnell arbeitsfaehig sein muss, ist der bevorzugte Einstieg:
1. `AGENTS.md`
2. `agent/systemprompt.md`
3. `agent/builder-library.md`
4. `agent/preview-module-library.md`
5. `agent/preview-rules.md`
6. `agent/export-rules.md`
7. `agent/preview-template.html`
8. `agent/preview-modules.html`
9. `agent/components.css`
10. die konkret betroffenen Dateien unter `preview/` und `email/`
