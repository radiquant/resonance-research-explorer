
import { type AlphabetType, alphabetSystems, calculateLetterSum } from './alphabetSystems';
import { 
  collectHardwareMetrics, 
  modulateRateWithHardware, 
  HardwareConfig,
  DEFAULT_HARDWARE_CONFIG 
} from './hardwareAlgorithms';

export interface CopenRateResult {
  word: string;
  potency: number;
  potencyType: 'D' | 'C' | 'LM' | 'M' | 'F1' | 'F2' | 'F3';
  rate: number;
  alphabetType: AlphabetType;
  calculation: {
    letterSum: number;
    baseRate: number;
    fibonacciRate: number;
    fibonacciPair?: { div: number; mult: number }; // Nur bei adaptiver Modulation
  };
  isAdaptive?: boolean;
}

export interface WordEnergyInput {
  word: string;
  potency: number;
  potencyType: 'D' | 'C' | 'LM' | 'M' | 'F1' | 'F2' | 'F3';
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

/**
 * Wortlängen-adaptive Fibonacci-Modulation
 * Wählt Fibonacci-Paare basierend auf der Länge der Wortenergie
 * 
 * @param wordLength - Anzahl der Buchstaben (ohne Leerzeichen)
 * @returns Fibonacci-Paar { div, mult } zur Modulation
 */
export const getAdaptiveFibonacciPair = (wordLength: number): { div: number; mult: number } => {
  // Fibonacci-Sequenz: 1,1,2,3,5,8,13,21,34,55,89,144...
  
  if (wordLength <= 0) {
    return { div: 21, mult: 34 }; // Fallback auf Standard
  }
  
  if (wordLength >= 1 && wordLength <= 4) {
    // Sehr kurze Wörter: OM, LUX, GOLD
    return { div: 13, mult: 21 }; // Verhältnis ≈ 1.615
  }
  
  if (wordLength >= 5 && wordLength <= 10) {
    // Mittlere Wörter: ARNICA, HEILUNG, GESUNDHEIT (Standard)
    return { div: 21, mult: 34 }; // Verhältnis ≈ 1.619 (Original Copen)
  }
  
  if (wordLength >= 11 && wordLength <= 20) {
    // Lange Wörter: ARSENICUM ALBUM, CALCAREA CARBONICA
    return { div: 34, mult: 55 }; // Verhältnis ≈ 1.618
  }
  
  // Sehr lange Wörter: > 20 Buchstaben
  return { div: 55, mult: 89 }; // Verhältnis ≈ 1.618
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
  potencyType: 'D' | 'C' | 'LM' | 'M' | 'F1' | 'F2' | 'F3',
  alphabetType: AlphabetType = 'latin',
  imageSignature?: string,
  useImageSignature: boolean = false,
  useAdaptiveFibonacci: boolean = false
): CopenRateResult => {
  // 1) Normalisierung nach Bruce Copen Klassik V4 (mit Zahlenverarbeitung)
  const normalize = (w: string) =>
    w
      .toUpperCase()
      .replace(/Ä/g, 'AE')
      .replace(/Ö/g, 'OE')
      .replace(/Ü/g, 'UE')
      .replace(/ß/g, 'SS')
      .replace(/\s*[DCLMF]+\d+/g, '') // Potenzangaben entfernen (D, C, LM, M, F)
      .replace(/[^A-Z0-9]/g, '')       // Nur Buchstaben und Zahlen behalten, alle anderen Zeichen entfernen
      .trim();

  const getCharValue = (ch: string): number => {
    // A-Z = 1-26, 0-9 = 0-9
    if (ch >= 'A' && ch <= 'Z') {
      return ch.charCodeAt(0) - 64; // A=1..Z=26
    }
    if (ch >= '0' && ch <= '9') {
      return parseInt(ch, 10); // 0-9
    }
    return 0;
  };

  const computePrimarySum = (text: string) => {
    let sum = 0;
    let pos = 1;
    for (const ch of text) {
      const value = getCharValue(ch);
      sum += value * pos;
      pos++;
    }
    return sum;
  };

  const cleanWord = normalize(word);
  let primarySum = computePrimarySum(cleanWord);

  // Bildsignatur optional integrieren (arithmetisches Mittel der Primärsummen)
  if (useImageSignature && imageSignature && imageSignature.trim().length > 0) {
    const cleanSig = normalize(imageSignature);
    const imgPrimary = computePrimarySum(cleanSig);
    const original = primarySum;
    primarySum = Math.floor((primarySum + imgPrimary) / 2);
    console.log('✅ Bildsignatur angewendet (Bruce Copen Pfad):', { original, imgPrimary, adjusted: primarySum });
  }

  // 2) Baserate
  const baseRate = primarySum * 1000;
  
  // 3) Fibonacci-Modulation
  let fibonacciRate: number;
  let fibonacciPair: { div: number; mult: number } | undefined;
  
  if (useAdaptiveFibonacci) {
    // Wortlängen-adaptive Modulation
    const wordLengthWithoutSpaces = cleanWord.replace(/\s/g, '').length;
    fibonacciPair = getAdaptiveFibonacciPair(wordLengthWithoutSpaces);
    fibonacciRate = Math.floor((baseRate / fibonacciPair.div) * fibonacciPair.mult);
    console.log('🔄 Adaptive Fibonacci-Modulation:', { 
      wortlänge: wordLengthWithoutSpaces, 
      pair: fibonacciPair, 
      verhältnis: (fibonacciPair.mult / fibonacciPair.div).toFixed(4) 
    });
  } else {
    // Original Copen: Feste Modulation (21/34)
    fibonacciRate = Math.floor((baseRate / 21) * 34);
  }

  // 4) Potenz-Bonus nach Dokumentation
  let potencyBonus = 0;
  const p = Math.max(0, potency);
  if (p > 0) {
    switch (potencyType) {
      case 'D':
        potencyBonus = Math.floor(fibonacciRate * (p / 10));
        break;
      case 'C':
        potencyBonus = Math.floor(fibonacciRate * (p / 5));
        break;
      case 'LM':
        potencyBonus = Math.floor(fibonacciRate * (p / 2));
        break;
      case 'M':
        potencyBonus = Math.floor(fibonacciRate * p);
        break;
      case 'F1':
        potencyBonus = Math.floor(fibonacciRate * (p / 6));
        break;
      case 'F2':
        potencyBonus = Math.floor(fibonacciRate * (p / 4));
        break;
      case 'F3':
        potencyBonus = Math.floor(fibonacciRate * (p / 3));
        break;
    }
  }

  const finalRate = fibonacciRate + potencyBonus;

  return {
    word,
    potency,
    potencyType,
    rate: finalRate,
    alphabetType,
    calculation: {
      letterSum: primarySum, // historisch: Primärsumme
      baseRate,
      fibonacciRate,
      fibonacciPair: useAdaptiveFibonacci ? fibonacciPair : undefined,
    },
    isAdaptive: useAdaptiveFibonacci,
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
      
      if (!isNaN(potency) && ['D', 'C', 'LM', 'M', 'F1', 'F2', 'F3'].includes(potencyType)) {
        results.push({
          word,
          potency,
          potencyType: potencyType as 'D' | 'C' | 'LM' | 'M' | 'F1' | 'F2' | 'F3',
          alphabetType: (alphabetType as AlphabetType) || 'latin'
        });
      }
    }
  }
  
  return results;
};

export const exportCopenRatesToCSV = (results: CopenRateResult[]): string => {
  const header = 'Wortenergie,Potenz,Typ,Alphabet,Copen-Rate\n';
  const rows = results.map(result => {
    return `${result.word},${result.potency},${result.potencyType},${result.alphabetType},${result.rate}`;
  });
  return header + rows.join('\n');
};
