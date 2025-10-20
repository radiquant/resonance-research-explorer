
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
  alphabetType: AlphabetType = 'latin',
  imageSignature?: string,
  useImageSignature: boolean = false
): CopenRateResult => {
  // 1) Normalisierung nach Bruce Copen
  const normalize = (w: string) =>
    w
      .toUpperCase()
      .replace(/Ä/g, 'AE')
      .replace(/Ö/g, 'OE')
      .replace(/Ü/g, 'UE')
      .replace(/ß/g, 'SS')
      .replace(/\s*[DCLM]+\d+/g, '') // Potenzangaben entfernen
      .replace(/\d+/g, '')            // Zahlen entfernen
      .replace(/[^A-Z\s]/g, '')       // Sonderzeichen entfernen
      .replace(/\s+/g, ' ')
      .trim();

  const getLetterValue = (ch: string) => ch.charCodeAt(0) - 64; // A=1..Z=26

  const computePrimarySum = (text: string) => {
    let sum = 0;
    let pos = 1;
    for (const ch of text) {
      if (ch === ' ') continue;
      sum += getLetterValue(ch) * pos;
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
  // 3) Fibonacci-Modulation (34/21)
  const fibonacciRate = Math.floor((baseRate / 21) * 34);

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
    },
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

export const exportCopenRatesToCSV = (results: CopenRateResult[]): string => {
  const header = 'Wortenergie,Potenz,Typ,Alphabet,Copen-Rate\n';
  const rows = results.map(result => {
    return `${result.word},${result.potency},${result.potencyType},${result.alphabetType},${result.rate}`;
  });
  return header + rows.join('\n');
};
