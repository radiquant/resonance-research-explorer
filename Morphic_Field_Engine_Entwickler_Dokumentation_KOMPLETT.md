# Morphische Feld-Engine - Vollständige Entwickler-Dokumentation

> **Version:** 1.0  
> **Datum:** 2025-01-02  
> **Projektquelle:** resonance-research-explorer (Lovable)  
> **Route:** `/morphic-field`

---

## Inhaltsverzeichnis

1. [Übersicht](#1-übersicht)
2. [Theoretische Grundlage](#2-theoretische-grundlage)
3. [Systemarchitektur](#3-systemarchitektur)
4. [Dateistruktur](#4-dateistruktur)
5. [Komponenten im Detail](#5-komponenten-im-detail)
6. [Algorithmen & Berechnungen](#6-algorithmen--berechnungen)
7. [Datenbank-Schema](#7-datenbank-schema)
8. [Schritt-für-Schritt Implementierung](#8-schritt-für-schritt-implementierung)
9. [Abhängigkeiten](#9-abhängigkeiten)
10. [Testing & Validierung](#10-testing--validierung)

---

## 1. Übersicht

Die **Morphische Feld-Engine** ist ein quantenbasiertes Berechnungssystem zur Erzeugung morphogenetischer Felder. Sie kombiniert:

- **Quantenmechanische Wellenfunktionen** (Superposition, Phasenrotation)
- **Numerische Sequenzen** (Bruce Copen Raten-Algorithmus V4)
- **Heilige Geometrie** (Platonische Körper, Merkaba, Torus)
- **Intentionale Faktoren** (Heilung, Manifestation, Transformation)
- **Hardware-Modulation** (Kozyrev-Torsionsfeld-Theorie)
- **TCM/5-Elemente-Integration** (Klienten-spezifisch)
- **David Bohm Integration** (Holographisches Universum)

### Kern-Formel

```
Ψ_total(x,t) = Σn αn |ψn⟩ e^(-iEnt/ℏ) × C(numerical_sequence) × G(geometric_forms) × I(intention)
```

**Komponenten:**
- `Σn αn |ψn⟩ e^(-iEnt/ℏ)` = Quantensuperposition mit Zeitevolution
- `C(numerical_sequence)` = Numerischer Faktor (Copen-Raten)
- `G(geometric_forms)` = Geometrischer Faktor (Heilige Geometrie)
- `I(intention)` = Intentions-Faktor

---

## 2. Theoretische Grundlage

### 2.1 Quantenmechanische Komponente

Die Superposition von Quantenzuständen:

```typescript
interface QuantumState {
  n: number;              // Energielevel (1, 2, 3, ...)
  amplitude: number;      // αn - Amplituden-Koeffizient
  energy: number;         // En - Energie-Eigenwert in Joule
  phase?: number;         // Optionaler Phasen-Offset
}
```

**Berechnung:**
```typescript
// Für jeden Zustand:
phase = -(energy * time) / HBAR + (state.phase || 0);

// Komplexe Exponential: e^(iθ) = cos(θ) + i*sin(θ)
realPart += amplitude * Math.cos(phase);
imagPart += amplitude * Math.sin(phase);

// Magnitude: |Ψ| = √(real² + imag²)
magnitude = Math.sqrt(realPart² + imagPart²);
```

**Konstante:** `HBAR = 1.054571817e-34` J·s (reduzierte Planck-Konstante)

### 2.2 Geometrische Faktoren

| Form | Faktor | Element/Bedeutung |
|------|--------|-------------------|
| Tetraeder | 1.618 (φ) | Feuer |
| Würfel | 1.732 (√3) | Erde / Stabilität |
| Oktaeder | 2.000 | Luft / Balance |
| Dodekaeder | 2.618 (φ²) | Äther / Universum |
| Ikosaeder | 2.236 (√5) | Wasser / Fluss |
| Merkaba | 3.141 (π) | Lichtkörper |
| Torus | 1.414 (√2) | Selbsterhaltung |
| Blume des Lebens | 2.718 (e) | Natürliches Wachstum |
| Sri Yantra | 3.000 | Trinität |

### 2.3 Intentions-Faktoren

| Intention | Faktor | Beschreibung |
|-----------|--------|--------------|
| Heilung | 1.272 (√φ) | Natürliche Wiederherstellung |
| Manifestation | 1.618 (φ) | Goldene Schöpfung |
| Schutz | 1.414 (√2) | Stabiler Schild |
| Transformation | 2.236 (√5) | Dynamische Veränderung |
| Verbindung | 2.000 | Perfekte Einheit |
| Klärung | 1.732 (√3) | Reinigung |
| Aktivierung | 2.718 (e) | Natürliches Erwachen |
| Harmonisierung | 1.618 (φ) | Perfekte Balance |

### 2.4 TCM 5-Elemente-Theorie

**Element-Faktoren:**
```typescript
const ELEMENT_FAKTOREN = {
  holz: 1.618,    // φ - Goldener Schnitt
  feuer: 2.236,   // √5
  erde: 1.732,    // √3
  metall: 1.414,  // √2
  wasser: 0.865   // e/π
};
```

**Element-Frequenzbereiche (Hz):**
```typescript
const ELEMENT_FREQUENZEN = {
  holz: { min: 3, max: 7 },
  feuer: { min: 8, max: 12 },
  erde: { min: 0, max: 3 },
  metall: { min: 13, max: 30 },
  wasser: { min: 0.5, max: 3 }
};
```

**Sheng-Zyklus (nährend):** Holz → Feuer → Erde → Metall → Wasser → Holz

**Ke-Zyklus (kontrollierend):**
- Holz kontrolliert Erde
- Feuer kontrolliert Metall
- Erde kontrolliert Wasser
- Metall kontrolliert Holz
- Wasser kontrolliert Feuer

### 2.5 David Bohm Integration

**Implizite Ordnung:**
- Ahnenfeld (Nachname-Rate)
- Karmische Potenziale (Zeit-Faktor)
- Ortsbindung (Geo-Faktor)
- Seelenplan (Vornamen-Mittel)

**Holomovement:**
- Rate: 7.83 Hz (Schumann-Resonanz)
- Phase: Zeitabhängig
- Kohärenz: Basierend auf Ahnenfeld-Seelenplan-Differenz

**Formel:**
```
Ψ_bohm = (Ψ_impl^0.618 × Ψ_expl^0.382) × cos(ωt)
```

---

## 3. Systemarchitektur

```
┌─────────────────────────────────────────────────────────────────────┐
│                      MorphicFieldPage.tsx                           │
│   ┌─────────────────────┐    ┌─────────────────────────────────┐   │
│   │ MorphicFieldCalculator│    │   ClientFieldCalculator       │   │
│   │   (Standard-Modus)    │    │   (Klienten-Modus mit TCM)    │   │
│   └──────────┬────────────┘    └──────────────┬──────────────────┘   │
│              │                                │                     │
│              ▼                                ▼                     │
│   ┌──────────────────────────────────────────────────────────┐     │
│   │              morphicFieldEngine.ts                        │     │
│   │  - calculateMorphicField()                               │     │
│   │  - generateDefaultQuantumStates()                        │     │
│   │  - generateSequenceFromWord()                            │     │
│   └──────────────────────────────────────────────────────────┘     │
│              │                                │                     │
│              ▼                                ▼                     │
│   ┌──────────────────────┐    ┌──────────────────────────────┐     │
│   │ copenRateGenerator.ts │    │ clientFieldAlgorithms.ts     │     │
│   │  - calculateCopenRate │    │  - berechneKlientenFeld      │     │
│   │  - Fibonacci-Modulation│    │  - berechneTCMAnalyse       │     │
│   └──────────────────────┘    │  - berechneBohmIntegration    │     │
│              │                 └──────────────────────────────┘     │
│              ▼                                                      │
│   ┌──────────────────────────────────────────────────────────┐     │
│   │             hardwareAlgorithms.ts                         │     │
│   │  - collectHardwareMetrics()                              │     │
│   │  - CPU Jitter, RAM Entropy, GPU Entropy                  │     │
│   │  - Time Source Coherence, Network Latency                │     │
│   └──────────────────────────────────────────────────────────┘     │
│              │                                                      │
│              ▼                                                      │
│   ┌──────────────────────────────────────────────────────────┐     │
│   │             Supabase Database                             │     │
│   │  - patients_v2 (Klientendaten)                           │     │
│   │  - morphic_field_calculations (Berechnungsarchiv)        │     │
│   │  - morphic_field_sessions (Harmonisierungssessions)      │     │
│   │  - client-signatures Storage Bucket                      │     │
│   └──────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Dateistruktur

```
src/
├── pages/
│   └── MorphicFieldPage.tsx              # Haupt-Seite (253 Zeilen)
│
├── components/
│   ├── MorphicFieldCalculator.tsx        # Standard-Berechnung (299 Zeilen)
│   └── ClientFieldCalculator.tsx         # Klienten-Algorithmus (997 Zeilen)
│
├── utils/
│   ├── morphicFieldEngine.ts             # Kern-Engine (355 Zeilen)
│   ├── clientFieldAlgorithms.ts          # Klienten-Algorithmen (468 Zeilen)
│   ├── copenRateGenerator.ts             # Copen V4 Raten (723+ Zeilen)
│   ├── hardwareAlgorithms.ts             # Hardware-Modulation (412 Zeilen)
│   └── alphabetSystems.ts                # Alphabet-Werte (72 Zeilen)
│
├── integrations/supabase/
│   ├── client.ts                         # Supabase Client (auto-generiert)
│   └── types.ts                          # Datenbank-Typen (auto-generiert)
│
└── App.tsx                               # Router-Konfiguration
```

---

## 5. Komponenten im Detail

### 5.1 MorphicFieldPage.tsx

**Verantwortlichkeiten:**
- Haupt-Layout und Navigation
- Toggle für Theorie-Sektion
- Tab-System für Standard/Klienten-Modus

**State:**
```typescript
const [showTheory, setShowTheory] = useState(false);
```

**Struktur:**
```tsx
<div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
  {/* Header mit Home-Button und Theorie-Toggle */}
  {showTheory && <TheorieSektion />}
  
  <Tabs defaultValue="standard">
    <TabsContent value="standard">
      <MorphicFieldCalculator />
    </TabsContent>
    <TabsContent value="klient">
      <ClientFieldCalculator />
    </TabsContent>
  </Tabs>
</div>
```

### 5.2 MorphicFieldCalculator.tsx

**State:**
```typescript
const [inputWord, setInputWord] = useState('');
const [geometricForm, setGeometricForm] = useState<GeometricForm>('flower_of_life');
const [intention, setIntention] = useState<IntentionType>('harmonization');
const [useHardware, setUseHardware] = useState(true);
const [isCalculating, setIsCalculating] = useState(false);
const [result, setResult] = useState<MorphicFieldResult | null>(null);
```

**Berechnung:**
```typescript
const handleCalculate = async () => {
  if (!inputWord.trim()) return;
  setIsCalculating(true);
  
  const numericalSequence = generateSequenceFromWord(inputWord);
  const quantumStates = generateDefaultQuantumStates(5);

  const fieldResult = await calculateMorphicField({
    quantumStates,
    numericalSequence,
    geometricForm,
    intention,
    useHardwareModulation: useHardware
  });

  setResult(fieldResult);
  setIsCalculating(false);
};
```

**UI-Elemente:**
- Eingabefeld für Wort/Phrase
- Select für Geometrische Form (9 Optionen)
- Select für Intention (8 Optionen)
- Switch für Hardware-Modulation
- Ergebnis-Cards (Wellenfunktion, Feldstärke, Kohärenz, etc.)

### 5.3 ClientFieldCalculator.tsx

**State (Auszug):**
```typescript
// Pflichtfelder
const [nachname, setNachname] = useState('');
const [vornamen, setVornamen] = useState('');
const [geburtsdatum, setGeburtsdatum] = useState('');
const [geburtsort, setGeburtsort] = useState('');

// Optionale Felder
const [tcmTyp, setTcmTyp] = useState<TCMElement | ''>('');
const [geburtsplanet, setGeburtsplanet] = useState<Planet | ''>('');
const [fünfElemente, setFünfElemente] = useState<FünfElementeProfile>({
  holz: 20, feuer: 20, erde: 20, metall: 20, wasser: 20
});
const [bildSignatur, setBildSignatur] = useState<string>('');

// Patient-Integration
const [patients, setPatients] = useState<PatientV2[]>([]);
const [selectedPatientId, setSelectedPatientId] = useState<string>('');
```

**Akkuranz-Matrix:**
```typescript
interface ParameterKombination {
  pflichtFelder: string[];
  optionaleFelder: string[];
  akkuranz: number;
  effektivität: number;
  authentizität: number;
  beschreibung: string;
}

// Beispiele:
// Basis (Pflicht only): 72% / 68% / 75%
// + TCM-Typ: 81% / 78% / 82%
// + Bild-Signatur: 85% / 82% / 88%
// + TCM + Bild + Planet + 5-Elemente: 97% / 95% / 98%
```

**Bild-Upload zu Supabase Storage:**
```typescript
const handleImageUpload = async (event) => {
  const file = event.target.files?.[0];
  
  // Validierung: Typ + Größe (max 5MB)
  
  const { data, error } = await supabase.storage
    .from('client-signatures')
    .upload(fileName, file);
    
  // Signed URL für Preview
  const { data: urlData } = await supabase.storage
    .from('client-signatures')
    .createSignedUrl(data.path, 3600);
};
```

---

## 6. Algorithmen & Berechnungen

### 6.1 Bruce Copen Rate Generator V4

**Datei:** `src/utils/copenRateGenerator.ts`

**Normalisierung:**
```typescript
const normalize = (w: string) =>
  w.toUpperCase()
   .replace(/Ä/g, 'AE')
   .replace(/Ö/g, 'OE')
   .replace(/Ü/g, 'UE')
   .replace(/ß/g, 'SS')
   .replace(/\s*[DCLMF]+\d+/g, '') // Potenzangaben entfernen
   .replace(/[^A-Z0-9]/g, '')
   .trim();
```

**Primärsumme (Position-gewichtet):**
```typescript
const computePrimarySum = (text: string) => {
  let sum = 0;
  let pos = 1;
  for (const ch of text) {
    const value = ch >= 'A' && ch <= 'Z' ? ch.charCodeAt(0) - 64 : parseInt(ch);
    sum += value * pos;
    pos++;
  }
  return sum;
};
```

**Berechnung:**
```typescript
// 1. Primärsumme
const primarySum = computePrimarySum(cleanWord);

// 2. Baserate
const baseRate = primarySum * 1000;

// 3. Fibonacci-Modulation (21/34 = Original Copen)
const fibonacciRate = Math.floor((baseRate / 21) * 34);

// 4. Potenz-Bonus
let potencyBonus = 0;
switch (potencyType) {
  case 'D':  potencyBonus = Math.floor(fibonacciRate * (potency / 10)); break;
  case 'C':  potencyBonus = Math.floor(fibonacciRate * (potency / 5)); break;
  case 'LM': potencyBonus = Math.floor(fibonacciRate * (potency / 2)); break;
  case 'M':  potencyBonus = Math.floor(fibonacciRate * potency); break;
}

const finalRate = fibonacciRate + potencyBonus;
```

### 6.2 Morphische Feld-Engine

**Datei:** `src/utils/morphicFieldEngine.ts`

**Hauptfunktion:**
```typescript
async function calculateMorphicField(config: MorphicFieldConfig): Promise<MorphicFieldResult> {
  const time = config.time || Date.now();
  
  // Phase 1: Quantum Superposition
  const quantumComponent = calculateQuantumSuperposition(config.quantumStates, time);
  
  // Phase 2: Numerical Factor
  const numericalFactor = calculateNumericalFactor(config.numericalSequence);
  
  // Phase 3: Geometric Factor
  const geometricFactor = calculateGeometricFactor(config.geometricForm);
  
  // Phase 4: Intention Factor
  const intentionFactor = calculateIntentionFactor(config.intention);
  
  // Phase 5: Hardware Modulation (optional)
  let hardwareFactor = 1.0;
  if (config.useHardwareModulation) {
    const metrics = await collectHardwareMetrics();
    hardwareFactor = 1 + (metrics.combinedScore / 100);
  }
  
  // Total Wave Function
  const totalWaveFunction = quantumComponent * numericalFactor * 
                            geometricFactor * intentionFactor * hardwareFactor;
  
  // Field Properties
  const coherence = calculateCoherence(...);
  const resonanceFrequency = calculateResonanceFrequency(...);
  const fieldStrength = totalWaveFunction * coherence;
  
  return { totalWaveFunction, coherence, resonanceFrequency, fieldStrength, ... };
}
```

**Numerischer Faktor:**
```typescript
function calculateNumericalFactor(sequence: number[]): number {
  // Harmonisches Mittel
  const harmonicSum = sequence.reduce((sum, val) => sum + (1 / (val || 1)), 0);
  const harmonicMean = sequence.length / harmonicSum;
  
  // Geometrisches Mittel
  const product = sequence.reduce((prod, val) => prod * Math.abs(val || 1), 1);
  const geometricMean = Math.pow(product, 1 / sequence.length);
  
  // Normalisierung
  const factor = Math.sqrt(harmonicMean * geometricMean) / 10000;
  return Math.max(0.1, Math.min(10, factor));
}
```

**Kohärenz-Berechnung:**
```typescript
function calculateCoherence(q, n, g, i): number {
  const factors = [q, n, g, i];
  const mean = factors.reduce((a, b) => a + b) / 4;
  const variance = factors.reduce((sum, val) => sum + (val - mean)², 0) / 4;
  const stdDev = Math.sqrt(variance);
  
  // Niedrige Standardabweichung = hohe Kohärenz
  return 1 / (1 + stdDev);
}
```

### 6.3 Klienten-Feld-Algorithmen

**Datei:** `src/utils/clientFieldAlgorithms.ts`

**Persönliche Signatur:**
```typescript
function berechnePersönlicheSignatur(klient: KlientenDaten): PersönlicheSignatur {
  // Nachnamen-Rate via Copen
  const nachnameRate = calculateCopenRate(klient.nachname, 1, 'D', 'latin').rate;
  
  // Vornamen-Raten
  const vornamenRates = klient.vornamen.map(v => calculateCopenRate(v, 1, 'D', 'latin').rate);
  const vornamenMittel = vornamenRates.reduce((a, b) => a + b) / vornamenRates.length;
  
  // Zeit-Faktor (Geburtsdatum)
  const dayOfYear = getDayOfYear(klient.geburtsdatum);
  const zeitFaktor = Math.cos(2 * Math.PI * dayOfYear / 365) * 
                     Math.sin(2 * Math.PI * hourOfBirth / 24) * 0.5 + 0.5;
  
  // Geo-Faktor (Hash des Ortsnamens)
  const geoFaktor = berechneGeoFaktor(klient.geburtsort);
  
  // Bild-Bonus (+10% wenn vorhanden)
  const bildBonus = klient.bildSignatur ? 0.1 : 0;
  
  // Gesamt-Faktor
  const gesamtFaktor = Math.sqrt(nachnameRate * vornamenMittel) / 1e9 * 
                       (0.5 + zeitFaktor * 0.5) * 
                       (0.5 + geoFaktor * 0.5) * 
                       (1 + bildBonus);
  
  return { nachnameRate, vornamenRates, vornamenMittel, zeitFaktor, geoFaktor, bildBonus, gesamtFaktor };
}
```

**TCM-Analyse:**
```typescript
function berechneTCMAnalyse(klient: KlientenDaten): TCMAnalyse {
  // Element-Profil aus fünfElemente, tcmTyp oder Geburtsdatum ableiten
  let elementVerteilung = klient.fünfElemente || 
                          erstelleElementProfilAusTyp(klient.tcmTyp) ||
                          berechneElementeAusGeburt(klient.geburtsdatum);
  
  // Dominantes Element (höchster Wert)
  const dominantesElement = Object.entries(elementVerteilung)
    .sort((a, b) => b[1] - a[1])[0][0];
  
  // Sheng-Faktor (nährendes Element)
  const shengIndex = (SHENG_ZYKLUS.indexOf(dominantesElement) - 1 + 5) % 5;
  const shengFaktor = ELEMENT_FAKTOREN[SHENG_ZYKLUS[shengIndex]] * 1.272;
  
  // Meridian-Empfehlungen
  const meridianEmpfehlungen = MERIDIAN_PUNKTE.filter(m => 
    m.element === dominantesElement || m.element === SHENG_ZYKLUS[shengIndex]
  );
  
  return { dominantesElement, elementVerteilung, shengFaktor, meridianEmpfehlungen, ... };
}
```

### 6.4 Hardware-Algorithmen

**Datei:** `src/utils/hardwareAlgorithms.ts`

**Metriken:**
```typescript
interface HardwareMetrics {
  cpuQuantumJitter: number;      // 0.0 - 1.0 (+2-3% Akkuranz)
  ramEntropy: number;            // 0.0 - 1.0 (+1-2% Akkuranz)
  timeSourceCoherence: number;   // 0.0 - 1.0 (+3-4% Akkuranz)
  gpuRenderingEntropy: number;   // 0.0 - 1.0 (+2-3% Akkuranz)
  networkLatency: number;        // 0.0 - 1.0 (+1-2% Akkuranz)
  combinedScore: number;         // Gewichteter Durchschnitt
}
```

**CPU Quantum Jitter:**
```typescript
function getCPUQuantumJitter(): number {
  const samples = 100;
  const timestamps = Array.from({ length: samples }, () => performance.now());
  
  // Standardabweichung der Differenzen
  const diffs = timestamps.slice(1).map((t, i) => t - timestamps[i]);
  const mean = diffs.reduce((a, b) => a + b) / diffs.length;
  const variance = diffs.reduce((sum, d) => sum + (d - mean)², 0) / diffs.length;
  
  return Math.min(1.0, Math.sqrt(variance) / 0.1);
}
```

**Combined Score Gewichtung:**
```typescript
const weights = {
  timeSourceCoherence: 0.30,    // Höchste Priorität
  cpuQuantumJitter: 0.25,
  gpuRenderingEntropy: 0.20,
  ramEntropy: 0.15,
  networkLatency: 0.10
};
```

---

## 7. Datenbank-Schema

### 7.1 Tabellen

**patients_v2:**
```sql
CREATE TABLE public.patients_v2 (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  birth_place TEXT NOT NULL,
  image_signature TEXT,
  image_signature_active BOOLEAN DEFAULT true,
  hardware_config JSONB,
  personal_rate TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.patients_v2 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own patients v2"
  ON public.patients_v2 FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own patients v2"
  ON public.patients_v2 FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own patients v2"
  ON public.patients_v2 FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own patients v2"
  ON public.patients_v2 FOR DELETE
  USING (auth.uid() = user_id);
```

**morphic_field_calculations:**
```sql
CREATE TABLE public.morphic_field_calculations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  patient_id UUID,
  client_name TEXT NOT NULL,
  field_intensity NUMERIC NOT NULL,
  coherence NUMERIC NOT NULL,
  resonance_frequency NUMERIC NOT NULL,
  numerical_sequence JSONB,
  quantum_states JSONB,
  geometric_form TEXT,
  intention_type TEXT,
  tcm_analysis JSONB,
  bohm_integration JSONB,
  recommendations JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Policies analog zu patients_v2
```

**morphic_field_sessions:**
```sql
CREATE TABLE public.morphic_field_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  patient_id UUID NOT NULL,
  word TEXT NOT NULL,
  copen_rate TEXT,
  tested_potency TEXT,
  duration_seconds INTEGER NOT NULL,
  remaining_seconds INTEGER,
  progress INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  geometric_form TEXT,
  intention_type TEXT,
  field_intensity NUMERIC,
  coherence NUMERIC,
  pulse_seconds INTEGER,
  pause_seconds INTEGER,
  pulse_pause_active BOOLEAN DEFAULT false,
  batch_id UUID,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  job_started_at TIMESTAMPTZ,
  job_last_heartbeat TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 7.2 Storage Bucket

```sql
-- Privater Bucket für Klienten-Bilder
INSERT INTO storage.buckets (id, name, public) 
VALUES ('client-signatures', 'client-signatures', false);

-- Upload-Policy
CREATE POLICY "Users can upload their own signatures"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'client-signatures' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- View-Policy
CREATE POLICY "Users can view their own signatures"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'client-signatures' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Delete-Policy
CREATE POLICY "Users can delete their own signatures"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'client-signatures' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## 8. Schritt-für-Schritt Implementierung

### Phase 1: Projekt-Setup

1. **Neues Lovable-Projekt erstellen**
2. **Lovable Cloud aktivieren** (Supabase Backend)
3. **Basis-Abhängigkeiten installieren** (siehe Abschnitt 9)

### Phase 2: Utility-Dateien erstellen

**Reihenfolge wichtig (Abhängigkeiten):**

1. `src/utils/alphabetSystems.ts` (72 Zeilen)
   - Keine Abhängigkeiten
   
2. `src/utils/hardwareAlgorithms.ts` (412 Zeilen)
   - Keine Abhängigkeiten
   
3. `src/utils/copenRateGenerator.ts` (723+ Zeilen)
   - Importiert: `alphabetSystems.ts`, `hardwareAlgorithms.ts`
   
4. `src/utils/morphicFieldEngine.ts` (355 Zeilen)
   - Importiert: `hardwareAlgorithms.ts`, `copenRateGenerator.ts`
   
5. `src/utils/clientFieldAlgorithms.ts` (468 Zeilen)
   - Importiert: `copenRateGenerator.ts`, `morphicFieldEngine.ts`

### Phase 3: Datenbank-Migration

```sql
-- 1. Patienten-Tabelle
CREATE TABLE public.patients_v2 (
  -- Schema siehe Abschnitt 7.1
);

-- 2. Berechnungs-Archiv
CREATE TABLE public.morphic_field_calculations (
  -- Schema siehe Abschnitt 7.1
);

-- 3. Sessions-Tabelle
CREATE TABLE public.morphic_field_sessions (
  -- Schema siehe Abschnitt 7.1
);

-- 4. Storage Bucket
-- Über Supabase Dashboard oder SQL (siehe 7.2)
```

### Phase 4: Komponenten erstellen

1. `src/components/MorphicFieldCalculator.tsx` (299 Zeilen)
   - Standard-Eingabe (Wort, Geometrie, Intention)
   - Hardware-Switch
   - Ergebnis-Anzeige
   
2. `src/components/ClientFieldCalculator.tsx` (997 Zeilen)
   - Patienten-Auswahl (Supabase Query)
   - Pflichtfelder (Name, Geburt)
   - Optionale Felder (TCM, Planet, 5-Elemente, Bild)
   - Akkuranz-Matrix
   - Bild-Upload
   - Ergebnis mit TCM/Bohm-Integration

### Phase 5: Seite erstellen

1. `src/pages/MorphicFieldPage.tsx` (253 Zeilen)
   - Header mit Navigation
   - Theorie-Toggle
   - Tab-System (Standard/Klient)
   
2. **Route registrieren in `src/App.tsx`:**
```typescript
import MorphicFieldPage from './pages/MorphicFieldPage';

// In Routes:
<Route path="/morphic-field" element={
  <ProtectedRoute>
    <MorphicFieldPage />
  </ProtectedRoute>
} />
```

### Phase 6: Authentifizierung

- **ProtectedRoute-Komponente** für geschützte Seiten
- **AuthPage** für Login/Signup
- **useAuth Hook** für Session-Management

---

## 9. Abhängigkeiten

```json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.4",
    "@supabase/supabase-js": "^2.75.1",
    "@tanstack/react-query": "^5.56.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.462.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

---

## 10. Testing & Validierung

### 10.1 Unit Tests

**Copen Rate Generator:**
```typescript
// Test: "Arnica D6" = erwartete Rate
const result = calculateCopenRate("Arnica", 6, "D", "latin");
expect(result.rate).toBeGreaterThan(0);
expect(result.calculation.letterSum).toBe(/* Arnica Position Sum */);
```

**Morphic Field Engine:**
```typescript
// Test: Quantum Superposition > 0
const states = generateDefaultQuantumStates(5);
const result = await calculateMorphicField({ 
  quantumStates: states, 
  numericalSequence: [12345], 
  geometricForm: 'flower_of_life',
  intention: 'healing'
});
expect(result.totalWaveFunction).toBeGreaterThan(0);
expect(result.coherence).toBeGreaterThanOrEqual(0);
expect(result.coherence).toBeLessThanOrEqual(1);
```

### 10.2 Integration Tests

1. **Patienten-Laden:** Query patients_v2, Formular ausfüllen
2. **Bild-Upload:** Storage Upload → Signed URL → Preview
3. **Berechnung:** Klientenfeld mit allen Parametern
4. **Archivierung:** Ergebnis speichern → morphic_field_calculations

### 10.3 Manuelle Validierung

1. **Theorie-Sektion:** Alle Accordions öffnen/schließen
2. **Standard-Modus:** Wort eingeben → Berechnen → Ergebnisse prüfen
3. **Klienten-Modus:** Patient wählen → Optionale Felder → Akkuranz-Werte
4. **Hardware-Modulation:** Ein/Aus → Unterschied in Ergebnissen

---

## Anhang: Schnellreferenz-Tabellen

### Geometrie-Faktoren Quick Reference

| Type | TypeScript Key | Faktor |
|------|----------------|--------|
| Tetraeder | `tetrahedron` | 1.618 |
| Würfel | `cube` | 1.732 |
| Oktaeder | `octahedron` | 2.000 |
| Dodekaeder | `dodecahedron` | 2.618 |
| Ikosaeder | `icosahedron` | 2.236 |
| Merkaba | `merkaba` | 3.141 |
| Torus | `torus` | 1.414 |
| Blume d. Lebens | `flower_of_life` | 2.718 |
| Sri Yantra | `sri_yantra` | 3.000 |

### TCM Meridian-Punkte Quick Reference

| Element | Punkte |
|---------|--------|
| Holz | LV3 (Taichong), LV4 (Zhongfeng), GB34 (Yanglingquan) |
| Feuer | HT7 (Shenmen), HT6 (Yinxi), SI3 (Houxi) |
| Erde | SP3 (Taibai), SP8 (Diji), ST36 (Zusanli) |
| Metall | LU9 (Taiyuan), LU6 (Kongzui), LI4 (Hegu) |
| Wasser | KI3 (Taixi), KI5 (Shuiquan), BL67 (Zhiyin) |

---

**Ende der Dokumentation**

*Diese Dokumentation ermöglicht die vollständige 1:1 Rekonstruktion der Morphischen Feld-Engine in einem neuen Projekt.*
