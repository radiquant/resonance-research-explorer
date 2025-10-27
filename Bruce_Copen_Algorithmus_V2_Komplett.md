# Bruce Copen Algorithmus V2 - Vollständige Systemdokumentation

## Übersicht

Der Bruce Copen Algorithmus V2 ist ein hochentwickeltes System zur Berechnung, Verwaltung und Harmonisierung von Copen-Raten. Das System verwendet authentische Algorithmen und bietet Cloud-Synchronisation.

### Hauptmerkmale
- **Ratengenerator**: Berechnung von Copen-Raten aus Wortenergien
- **Auto-Potenz-Projektion**: Automatische Ermittlung der optimalen Potenz
- **Parallele Harmonisierungen**: Mehrere Behandlungen gleichzeitig
- **Cloud-Synchronisation**: Persistente Backend-Speicherung
- **Neue Harmonisierungs-Syntax**: `Harmonisierung mit [ermittelte Rate]`

## Harmonisierungs-Syntax (NEU)

### Aktuelle Syntax
```
Harmonisierung mit 1234567
```

**Wichtig**: Es wird nur noch die ermittelte Rate zur Besendung verwendet - keine zusätzlichen Texte oder Beschreibungen mehr. Die Rate wird ohne Anführungszeichen übermittelt.

### Frühere Syntax (veraltet)
```
Optimale Harmonisierung von "Eliminiere saemtliche versteckten Fremdenergien" 
und Projizierung von "1.549.788.000" in der benötigten Autopotenz auf das Ziel.
```

## Datenbank-Analyse

### 💡 Wichtiger Hinweis
- Bei Datenbanken mit bestehenden Zahlenraten wird keine neue Copen-Rate berechnet
- Format mit Rate: `Wortenergie,12345` (Rate wird übernommen)
- Format ohne Rate: `Wortenergie` (neue Rate wird berechnet)
- Die Analyse zeigt maximal 35 Top-Ergebnisse nach Resonanz sortiert

## Komponenten

### CopenAlgorithmVisualizationV2
Hauptkomponente mit Ratengenerator, Auto-Potenz und Harmonisierungen

### PatientManagerCloudV2
- Personalisierte Rate (8-12 Stellen) optional
- Bildsignatur-Integration
- Hardware-Konfiguration pro Patient

### DatabaseManager
Datenbank-Analyse mit Fokus-Worten und Rate-Übernahme

### HarmonizationArchiveCloud
Archiv mit Reaktivierungs-Funktion

### AnalysisArchiveCloud
Separates Archiv für Datenbank-Analysen

## Standardwerte

```typescript
const DEFAULTS = {
  duration: 42,
  unit: 'minutes',
  pulseSeconds: 21,
  pauseSeconds: 42,
};
```

## Cloud-Integration

### Supabase Tabellen (V2)
- `patients_v2`: Patientendaten mit personal_rate
- `harmonization_sessions_v2`: Sessions mit pulse/pause
- `analysis_archives_v2`: Analyse-Historie

### Edge Function
`harmonization-worker`: Cron-basierte Verarbeitung aller 10 Sekunden

---

**Version**: 2.0.0  
**Letzte Aktualisierung**: 2025-01-26