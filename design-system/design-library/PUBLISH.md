# Design Library Publish

## Ziel

`s24-creative-ops/design-library` soll die offizielle Projekt-Library spiegeln und nicht als separat nachgebaute Web-Version gepflegt werden.

Die aktive sichtbare Quelle ist:

`design-system/design-library/index.html`

Die zentrale Token-Wahrheit bleibt:

`Design System/tokens/brands/immoscout24.json`

## Mirror-Ordner

Der lokale Publish-Mirror liegt standardmaessig unter:

`Archive/publish-mirrors/.publish/design-library-repo/`

Am besten ist dieser Ordner ein lokaler Git-Checkout von:

`https://github.com/s24-creative-ops/design-library`

## Source-Sync vor Publish

Wenn Builder- oder Token-Quellen in die sichtbare Library einfliessen, zuerst die generierten Library-Artefakte aktualisieren:

```bash
python3 design-system/scripts/sync_design_library_sources.py \
  --email-builder-dir /pfad/zum/email-builder \
  --lp-builder-dir /pfad/zum/lp-builder
```

Nur pruefen:

```bash
python3 design-system/scripts/sync_design_library_sources.py \
  --email-builder-dir /pfad/zum/email-builder \
  --lp-builder-dir /pfad/zum/lp-builder \
  --check
```

Die Checkout-Pfade sind bewusst konfigurierbar. Lokal dürfen die Builder an beliebigen Orten liegen; der GitHub-Actions-Workflow übergibt die Pfade seiner temporären Checkouts selbst.

## Mirror-Sync

Aus dem Projekt-Root:

```bash
python3 "Design System/scripts/sync_design_library_publish.py"
```

Optional mit eigenem Zielordner:

```bash
python3 "Design System/scripts/sync_design_library_publish.py" --output /pfad/zum/design-library-checkout
```

Den Mirror nur vorbereiten (kein Commit, kein Push):

```bash
bash "Design System/scripts/publish_design_library.sh"
```

## Was gespiegelt wird

Der Mirror zieht nur den selbststaendigen statischen Library-Stand nach:

- `design-system/design-library/`

`email-preview-styles.css` wird beim Source-Sync aus Email Builder in `design-system/design-library/` generiert. Die Publish-Ausgabe referenziert keine Email- oder LP-Builder-Pfade mehr.

Zusätzlich erzeugt der Sync im Publish-Repo:

- `.nojekyll`
- `index.html` als Root-Redirect auf die offizielle Library
- `README.md` mit kurzer Mirror-Erklaerung

## LP-Hinweis

`lp-builder/` ist die aktive Quelle fuer LP-Module.

LP-Inhalte in `design-system/design-library/` werden aus `lp-builder/` ueber `python3 design-system/scripts/sync_lp_builder_to_design_library.py` in generierte LP-Artefakte ueberfuehrt.

Produktive LP-Interaktionen werden dabei nicht vollstaendig in die Preview uebernommen.
Preview-tauglich und offiziell freigegeben sind aktuell nur:
- `accordion`
- `counter-animated`
- `video--youtube`

`lp-sticky-footer` wird in der Preview statisch oder entschaerft gezeigt.
`lp-builder/runtime/integrations/*` sowie Legacy-Carousel-/jQuery-Logik bleiben ausserhalb der aktiven Library-Preview.

### B2B Package List

- **Kategorie:** LP Builder / Tiles
- **Einsatzbereich:** Drei B2B-Mitgliedschafts- oder Leistungspakete vergleichbar darstellen.
- **Aufbau:** Optionaler Heading-Block, drei Pakete in der Reihenfolge Silber, Gold, Bronze und ein optionaler CTA-Block.
- **Regeln:** Gold bleibt visuell hervorgehoben; jedes Paket verwendet eine Checkmark-Liste fuer seine Leistungen.
- **Technik:** Das sichtbare Markup und die Preview-CSS werden aus dem aktiven `lp-builder` generiert. Die produktive Runtime bleibt im `lp-builder`.

Die Library darf erst published werden, wenn sie visuell und inhaltlich final geprueft ist.
Ein Publish bleibt bis dahin blockiert und ist zusaetzlich nur nach ausdruecklichem User-Go erlaubt.

## Update-Regel

Wenn Tokens, Library-Dateien oder relevante Builder-Quellen geaendert werden:
1. echte Projektdateien aktualisieren
2. bei Bedarf `python3 design-system/scripts/sync_design_library_sources.py` ausfuehren
3. `python3 "Design System/scripts/sync_design_library_publish.py"` ausfuehren
4. pruefen, ob der Mirror-Worktree sauber ist oder nur erwartete Sync-Aenderungen enthaelt
5. im Publish-Repo einen Branch und Pull Request erstellen; ein Merge bzw. Live-Publish bleibt eine ausdrueckliche Freigabe

## Reproduzierbarer PR-Flow

`.github/workflows/prepare-design-library-pr.yml` wird nur manuell gestartet. Er checkt die drei Quell-Repositories sowie das Publish-Repository in einem temporären GitHub-Actions-Workspace aus, erzeugt die Library-Artefakte, synchronisiert den Mirror und erstellt einen Pull Request. Damit müssen Beitragende weder einen lokalen Email-Builder-Checkout noch einen lokalen Publish-Mirror pflegen.

Der Workflow veröffentlicht nicht automatisch: Er läuft nicht bei Pushes, und der Pull Request muss im Publish-Repository geprüft und gemergt werden.

## Verbleibende Zugriffsanforderungen

- **Lokaler Source-Sync:** Lesender Zugriff auf `Email/Email Builder` und `LP/LP Builder` bleibt erforderlich, wenn deren Quellen in die Library übernommen werden sollen. Reine Änderungen an bereits generierten, sichtbaren Library-Dateien benötigen diese Checkouts nicht für den Publish-Mirror-Sync.
- **Lokaler Publish-Mirror:** Lesender Zugriff auf `Design System` und ein lokaler Checkout von `s24-creative-ops/design-library` sind nur nötig, wenn der Mirror lokal vorbereitet wird. Schreibzugriff bleibt für einen Branch/PR im Publish-Repository erforderlich.
- **Actions-PR-Flow:** Der Workflow nutzt eine GitHub App, die in beiden Organisationen installiert ist. In `scout24-creative-ops/design-system` müssen die Actions-Variable `DESIGN_LIBRARY_PUBLISHER_APP_ID` und das Actions-Secret `DESIGN_LIBRARY_PUBLISHER_PRIVATE_KEY` hinterlegt sein. Die App benötigt Leserechte für die Builder-Quellen und Contents-/Pull-Request-Schreibrechte für `s24-creative-ops/design-library`.

## Verbindliche Agent-Regel

Fuer Codex gilt:
- die aktive sichtbare Design-Library-Quelle ist `design-system/design-library/index.html`
- der Publish-Mirror liegt unter `.publish/design-library-repo/`
- das separate Live-Repo ist `s24-creative-ops/design-library`
- Aenderungen an der sichtbaren Design-Library gelten nicht als live, nur weil sie im Hauptrepo committed oder gepusht wurden
- wenn eine Aenderung die sichtbare Design-Library betrifft, muss Codex vor Abschluss klar berichten, ob der Publish-Mirror synchronisiert wurde und ob das Live-Repo aktualisiert wurde
- Codex darf das separate Publish-Repo nur nach ausdruecklicher User-Freigabe fuer Live-Publish aktualisieren
- wenn im Mirror fremde oder unklare Aenderungen liegen, ein Push blockiert wird oder ein PR-/Branch-Protection-Flow noetig ist, muss Codex stoppen und berichten
- ein Design-Library-Fix gilt erst als vollstaendig abgeschlossen, wenn entweder Quelle, Mirror und Live-Repo aktualisiert wurden oder Codex klar berichtet, dass der Live-Publish noch aussteht
