// Resonanzanalyse basierend auf dem originalen Java-Algorithmus
// DefaultAnalysisEngine.java, DefaultSelectionStrategy.java, DefaultChargingStrategy.java

export interface AnalysisConfig {
  selectionFraction: number; // Standard 0.1 (10%)
  minSelection: number;
  maxSelection: number;
  chargingThreshold: number; // Standard 100
  maxEntries?: number;
}

export interface RateObject {
  rateName: string;
  copenRate: number;
  energeticValue: number;
  potency: number; // 1-12, gewichtete Ebene
  levelDistribution: Record<number, number>; // Verteilung über 100 Ziehungen
  dominantLevel: number; // Ebene mit meisten Treffern
}

export interface AnalysisResult {
  rateObjects: RateObject[];
  numberOfTrials: number;
}

// Level-Gewichte für gewichtete Zufallsauswahl (1-12)
// Basierend auf levels.json aus dem Java-Projekt
const LEVEL_WEIGHTS = [
  { level: 1, weight: 15 }, // Physical Particles
  { level: 2, weight: 14 }, // Physical Structure
  { level: 3, weight: 13 }, // Etheric Prana
  { level: 4, weight: 12 }, // Etheric Meridians
  { level: 5, weight: 11 }, // Astral Emotions
  { level: 6, weight: 10 }, // Astral Thoughts
  { level: 7, weight: 9 },  // Mental Time
  { level: 8, weight: 8 },  // Mental Constructs
  { level: 9, weight: 7 },  // Causal Blueprints
  { level: 10, weight: 6 }, // Causal Alchemy
  { level: 11, weight: 3 }, // Atmic Identity
  { level: 12, weight: 2 }, // Atmic Love
];

const TOTAL_WEIGHT = LEVEL_WEIGHTS.reduce((sum, lw) => sum + lw.weight, 0);

/**
 * Fisher-Yates Shuffle für zufällige Selektion
 */
function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gewichtete Zufallsauswahl einer Ebene (1-12)
 * Entspricht LevelsConfig.weightedPick(r) aus Java
 */
function weightedPickLevel(): number {
  const r = Math.random() * TOTAL_WEIGHT;
  let cumulative = 0;
  
  for (const { level, weight } of LEVEL_WEIGHTS) {
    cumulative += weight;
    if (r < cumulative) {
      return level;
    }
  }
  
  return 1; // Fallback
}

/**
 * Selektion: Wählt zufällig einen Prozentsatz der Rates aus
 * DefaultSelectionStrategy.java
 */
function selectRates(
  rates: Array<{ name: string; copenRate: number }>,
  config: AnalysisConfig
): Array<{ name: string; copenRate: number }> {
  const targetCount = Math.ceil(rates.length * config.selectionFraction);
  const actualCount = Math.max(
    config.minSelection,
    Math.min(config.maxSelection, targetCount)
  );
  
  const shuffled = fisherYatesShuffle(rates);
  return shuffled.slice(0, actualCount);
}

/**
 * Energetisches Laden: Simuliert das schrittweise "Aufladen" der Rates
 * DefaultChargingStrategy.java
 */
function chargeRates(
  selectedRates: Array<{ name: string; copenRate: number }>,
  threshold: number
): { energies: Record<string, number>; trials: number } {
  const energies: Record<string, number> = {};
  selectedRates.forEach(rate => {
    energies[rate.name] = 0;
  });
  
  let trials = 0;
  let maxEnergy = 0;
  
  while (maxEnergy < threshold) {
    selectedRates.forEach(rate => {
      const boost = Math.floor(Math.random() * 10); // 0-9
      energies[rate.name] += boost;
      maxEnergy = Math.max(maxEnergy, energies[rate.name]);
    });
    trials++;
    
    // Sicherheit: Maximale Anzahl an Versuchen
    if (trials > 10000) break;
  }
  
  return { energies, trials };
}

/**
 * Potenz- und Level-Zuweisung
 * DefaultPotencyAssigner.assignPotency() + assignLevels()
 */
function assignPotencyAndLevels(rateName: string): {
  potency: number;
  levelDistribution: Record<number, number>;
  dominantLevel: number;
} {
  // 1. Potenz = erste gewichtete Ebene
  const potency = weightedPickLevel();
  
  // 2. Level-Verteilung: 100 Ziehungen
  const levelDistribution: Record<number, number> = {};
  for (let i = 1; i <= 12; i++) {
    levelDistribution[i] = 0;
  }
  
  for (let i = 0; i < 100; i++) {
    const level = weightedPickLevel();
    levelDistribution[level]++;
  }
  
  // 3. Dominante Ebene = Maximum der Verteilung
  let dominantLevel = potency;
  let maxCount = 0;
  
  for (let level = 1; level <= 12; level++) {
    if (levelDistribution[level] > maxCount) {
      maxCount = levelDistribution[level];
      dominantLevel = level;
    }
  }
  
  return { potency, levelDistribution, dominantLevel };
}

/**
 * Haupt-Analyse-Engine
 * Entspricht DefaultAnalysisEngine.analyze() aus Java
 */
export function analyzeRates(
  rates: Array<{ name: string; copenRate: number }>,
  config: AnalysisConfig
): AnalysisResult {
  // 1. Selektion
  const selected = selectRates(rates, config);
  
  // 2. Energetisches Laden
  const { energies, trials } = chargeRates(selected, config.chargingThreshold);
  
  // 3. RateObjects erstellen mit Potenz und Level
  const rateObjects: RateObject[] = selected.map(rate => {
    const { potency, levelDistribution, dominantLevel } = assignPotencyAndLevels(rate.name);
    
    return {
      rateName: rate.name,
      copenRate: rate.copenRate,
      energeticValue: energies[rate.name],
      potency,
      levelDistribution,
      dominantLevel,
    };
  });
  
  // 4. Sortieren nach energeticValue (absteigend)
  rateObjects.sort((a, b) => b.energeticValue - a.energeticValue);
  
  // 5. Optional auf maxEntries kürzen
  const finalRates = config.maxEntries 
    ? rateObjects.slice(0, config.maxEntries)
    : rateObjects;
  
  return {
    rateObjects: finalRates,
    numberOfTrials: trials,
  };
}

/**
 * Standard-Konfiguration
 */
export const DEFAULT_ANALYSIS_CONFIG: AnalysisConfig = {
  selectionFraction: 0.1, // 10%
  minSelection: 1,
  maxSelection: 100,
  chargingThreshold: 100,
  maxEntries: 50,
};
