
import { type AlphabetType, alphabetSystems, calculateLetterSum } from './alphabetSystems';

export interface CopenRateResult {
  word: string;
  potency: number;
  potencyType: 'D' | 'C' | 'LM' | 'M';
  rate: number;
  alphabetType: AlphabetType;
  calculation: {
    letterSum: number;
    baseRate: number;
    fibonacciRate: number;
  };
}

export interface WordEnergyInput {
  word: string;
  potency: number;
  potencyType: 'D' | 'C' | 'LM' | 'M';
  alphabetType?: AlphabetType;
}

const fibonacciCache: { [key: number]: number } = {};

const getFibonacciMultiplier = (n: number): number => {
  if (n <= 0) return 1;
  if (n === 1) return 1;
  if (fibonacciCache[n]) return fibonacciCache[n];

  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }

  fibonacciCache[n] = b;
  return b;
};

interface ValidationResult {
  valid: boolean;
  error?: string;
}

export const validateWordEnergy = (word: string): ValidationResult => {
  if (!word.trim()) {
    return { valid: false, error: 'Wortenergie darf nicht leer sein' };
  }

  if (word.length > 50) {
    return { valid: false, error: 'Wortenergie darf maximal 50 Zeichen enthalten' };
  }

  return { valid: true };
};

export const calculateCopenRate = (
  word: string, 
  potency: number, 
  potencyType: 'D' | 'C' | 'LM' | 'M',
  alphabetType: AlphabetType = 'latin'
): CopenRateResult => {
  const letterSum = calculateLetterSum(word, alphabetType);
  
  const potencyMultipliers = {
    'D': 1,
    'C': 100,
    'LM': 50000,
    'M': 1000
  };
  
  const adjustedPotency = potency === 0 ? 1 : potency;
  const baseRate = letterSum * adjustedPotency * potencyMultipliers[potencyType];
  const fibonacciRate = baseRate * getFibonacciMultiplier(letterSum);
  
  return {
    word,
    potency,
    potencyType,
    rate: fibonacciRate,
    alphabetType,
    calculation: {
      letterSum,
      baseRate,
      fibonacciRate
    }
  };
};

export const batchCalculateCopenRates = (inputs: WordEnergyInput[]): CopenRateResult[] => {
  return inputs.map(input => calculateCopenRate(
    input.word, 
    input.potency, 
    input.potencyType,
    input.alphabetType || 'latin'
  ));
};

export const parseWordEnergyData = (csvData: string): WordEnergyInput[] => {
  const lines = csvData.trim().split('\n');
  const results: WordEnergyInput[] = [];
  
  for (const line of lines) {
    const parts = line.split(',').map(part => part.trim());
    if (parts.length >= 3) {
      const [word, potencyStr, potencyType, alphabetType] = parts;
      const potency = parseInt(potencyStr);
      
      if (!isNaN(potency) && ['D', 'C', 'LM', 'M'].includes(potencyType)) {
        results.push({
          word,
          potency,
          potencyType: potencyType as 'D' | 'C' | 'LM' | 'M',
          alphabetType: (alphabetType as AlphabetType) || 'latin'
        });
      }
    }
  }
  
  return results;
};

// ============= Kozyrev Hardware-Dioden (Echtzeit-Sensoren) =============
// Nutzt CPU-Timestamp-Jitter als Quanten-Zufallsquelle für Effektivitätsoptimierung
// WICHTIG: Ändert die Basis-Rate NICHT, nur minimale Feinabstimmung für Effektivität

export const getQuantumSeed = (): number => {
  // Nutze performance.now() Mikrosekunden-Jitter als Quanten-Sensor
  const t1 = performance.now();
  const t2 = performance.now();
  const jitter = Math.abs(t2 - t1);
  
  // Extrahiere Nachkommastellen als Seed (0.0 - 1.0)
  const seed = (jitter % 1);
  return seed;
};

export const applyQuantumFluctuation = (baseRate: number, enabled: boolean = false): number => {
  if (!enabled) return baseRate;
  
  // Sehr kleine Fluktuation basierend auf Quanten-Jitter (±0.01% max)
  const seed = getQuantumSeed();
  const fluctuation = 1 + (seed - 0.5) * 0.0001; // ±0.01% Variation
  
  return Math.round(baseRate * fluctuation);
};

export const exportCopenRatesToCSV = (results: CopenRateResult[]): string => {
  const header = 'Wortenergie,Potenz,Typ,Alphabet,Copen-Rate\n';
  const rows = results.map(result => {
    return `${result.word},${result.potency},${result.potencyType},${result.alphabetType},${result.rate}`;
  });
  return header + rows.join('\n');
};
