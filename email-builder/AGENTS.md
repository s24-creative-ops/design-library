ZWECK
Dieses Dokument definiert den vollständigen Arbeitsprozess für den E-Mail Builder (EMB).
Es ist die einzige maßgebliche Quelle für:

* Modul-Erstellung
* Modul-Integration
* Automatisierte Verarbeitung durch Codex

---

## SYSTEMKONTEXT

Der E-Mail Builder ist Teil einer übergeordneten Projektstruktur:

* email-builder/
* lp-builder/
* design-system/

Dabei gilt:

* email-builder/ enthält die vollständige Logik für E-Mail-Erstellung und Export
* design-system/ enthält Tokens und die visuelle Design-Library
* lp-builder/ ist ein separates System und nutzt eine eigene Logik

Dieses Dokument gilt ausschließlich für email-builder/.

---

## WAHRHEITSEBENEN

Im System existieren klare Zuständigkeiten:

* preview/ = Vorschau-Wahrheit (visuelles Modell)
* email/ = Produktions-Wahrheit (finale E-Mail HTML)
* design-system/tokens/ = Design-Wahrheit (Farben, Typografie etc.)
* agent/ = abgeleiteter Arbeitslayer (keine eigene Wahrheit)

Wichtig:

* Export basiert ausschließlich auf email/ und export-map.json
* Preview dient nur der visuellen Darstellung

---

## ROLLE DES AGENT-LAYERS

Der Ordner agent/ ist keine eigenständige Produktionsquelle.

Er ist ein verdichteter Arbeitslayer für Codex und wird aus:

* preview/
* email/

abgeleitet.

Änderungen im agent/ dürfen niemals die einzige Quelle sein.
Alle Änderungen müssen immer zuerst in preview/ und/oder email/ erfolgen.

---

KONTEXT
Dieses Dokument definiert den vollständigen Arbeitsprozess für den E-Mail Builder (EMB).
Es ist die einzige maßgebliche Quelle für:

* Modul-Erstellung
* Modul-Integration
* Automatisierte Verarbeitung durch Codex

KONTEXT
Der E-Mail Builder (EMB) ist ein System zur Erstellung von Marketing-E-Mails
auf Basis von modularen Snippets (Iterable).

Der Workflow besteht aus:

* Preview-Generierung (HTML)
* Modul-Auswahl
* Export in Snippets + JSON

Diese Datei definiert, wie neue Module in dieses System integriert werden.

---

## GRUNDPRINZIPIEN

1. Es gibt drei Phasen:
   Phase 1: Co-Creation (User + Agent)
   Phase 2: Codex Automation (vollautomatisch)
   Phase 3: Manuelle QA (User)

2. Ein Modul darf niemals direkt in Builder, Export oder Snippets erstellt werden.

3. Jedes Modul MUSS zuerst in der Development Zone entstehen:
   email-builder/development/modules/

4. Export basiert ausschließlich auf:

   * agent/export-map.json
   * email/modules/

   NICHT auf Preview HTML.

5. Bestehende Muster, Strukturen und Klassen dürfen nicht neu erfunden werden.

---

## PHASE 1 — CO-CREATION (USER + AGENT)

Ziel:
Definition und visuelle Ausarbeitung eines neuen Moduls.

Ort:

* email-builder/development/modules/
* Development Umgebung (Sandbox)

Inhalt:

* Modul-Zweck
* Layout / Struktur
* Inhalte / editierbare Felder
* Regeln (z. B. Richtext, optional sichtbar, etc.)
* Naming (module_id, Felder)

Output:

* funktionierendes Preview-Modul
* alle relevanten Felder und Regeln definiert

Abschluss:
Phase 2 darf erst starten, wenn der User explizit bestätigt:
"Modul ist freigegeben"

---

## PHASE 2 — CODEX AUTOMATION (PFLICHT, ATOMAR)

Diese Phase wird vollständig von Codex ausgeführt.
Kein Schritt darf ausgelassen werden.

Reihenfolge ist strikt einzuhalten.

WICHTIG:

* Jeder Schritt MUSS aktiv ausgeführt werden (kein "ist bereits vorhanden" als Begründung zum Überspringen)
* Codex darf NICHT nur prüfen, sondern MUSS alle relevanten Dateien aktiv erstellen oder aktualisieren
* Wenn Inhalte bereits existieren, müssen sie validiert und ggf. überschrieben werden, um Konsistenz sicherzustellen

---

1. PREVIEW MODUL FINALISIEREN

---

* Datei prüfen/erstellen:
  preview/modules/<module>.html

* Sicherstellen:

  * korrektes data-module
  * alle data-export-field / data-image-field / data-export-url-field gesetzt

---

2. MODUL REGISTRIEREN

---

* Datei:
  preview/modules/catalog.yaml

* Ergänzen:

  * id
  * snippet
  * preview
  * email

---

3. PRODUKTIONS-SNIPPET ERSTELLEN

---

* Datei:
  email/modules/emb_<module>.html

* Regeln:

  * gleiche Struktur wie Preview
  * Variablenformat:
    emb_<module>_<field>
  * kein HTML in Variablen

---

4. EXPORT-MAPPING DEFINIEREN

---

* Datei:
  agent/export-map.json

* Ergänzen:

  * module_id
  * snippet_name
  * alle Felder:

    * type
    * required
    * default

* Pflicht:
  Keine fehlenden required fields

---

5. AGENT RUNTIME INTEGRATION

---

Alle agent-relevanten Dateien müssen synchron aktualisiert werden.

* agent/preview-modules.html aktualisieren
* agent/preview-module-library.md ergänzen
* agent/builder-library.md ergänzen
* agent/preview-styles.css prüfen und nur bei Bedarf erweitern

Diese Dateien bilden gemeinsam die Runtime des Builders und müssen konsistent sein.

---

6. PRODUKTIONS-CSS PRÜFEN

---

* Dateien:
  email/templates/template-main.html
  email/templates/template-main-opt.html

* Nur anpassen wenn Layout betroffen ist

---

7. DESIGN LIBRARY INTEGRATION

---

* Dateien:
  design-system/design-library/index.html
  design-system/design-library/frames/email/modules/<module>.html
  design-system/design-library/frames/email/snippets/<module>.html
  design-system/design-library/frames/email/test-mobile/<module>.html

---

8. SYNC AUSFÜHREN

---

* Befehl:
  python3 design-system/scripts/sync_design_library_publish.py

* Ziel:
  .publish/design-library-repo aktualisieren

---

9. KONSISTENZ-CHECK

---

Sicherstellen:

* Alle Phase-2 Dateien wurden aktiv verändert oder validiert (kein reines "keine Änderung nötig")

* Modul existiert in:

  * Preview
  * Catalog
  * Snippet
  * Export-Map
  * Builder

* Naming konsistent:
  module_id vs emb_<module>

* alle required Felder vorhanden

---

PHASE 2 IST NUR ABGESCHLOSSEN,
WENN ALLE OBIGEN SCHRITTE ERFÜLLT SIND
--------------------------------------

---

## PHASE 3 — MANUELLE QA (USER)

Ziel:
Finale Validierung im echten System

User Aufgaben:

* Snippet in Iterable prüfen/anlegen
* Template prüfen
* Test-Mail im Builder erstellen
* visuelle QA durchführen

---

## KRITISCHE REGELN

* Keine Module ohne export-map Eintrag
* Keine neuen Felder ohne Mapping
* Keine inkonsistenten Namen
* Keine Änderungen am Publish-Mirror direkt
* Keine neuen strukturellen Patterns ohne Abstimmung

---

## TRIGGER

Phase 2 startet ausschließlich wenn der User sagt:

"Modul ist freigegeben"
