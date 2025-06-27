
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
  const lines = csvData.trim().split('\n').filter(line => line.trim().length > 0);
  const results: WordEnergyInput[] = [];
  
  console.log('Parsing lines:', lines.length);
  
  for (const line of lines) {
    const cleanLine = line.trim();
    if (!cleanLine) continue;
    
    console.log('Processing line:', cleanLine);
    
    // Format 1: CSV mit Kommas (Wort,Potenz,Typ,Alphabet)
    if (cleanLine.includes(',')) {
      const parts = cleanLine.split(',').map(part => part.trim());
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
          console.log('Added CSV format:', word);
          continue;
        }
      }
    }
    
    // Format 2: Wort mit Potenz (z.B. "Arnica 6D", "Belladonna C12")
    const wordPotencyMatch = cleanLine.match(/^([a-zA-ZäöüÄÖÜß\s]+?)\s*([0-9]*)\s*([DCM]|LM)([0-9]*)$/i);
    if (wordPotencyMatch) {
      const [, word, potency1, type, potency2] = wordPotencyMatch;
      const potency = parseInt(potency1 || potency2 || '6');
      const potencyType = type.toUpperCase() as 'D' | 'C' | 'LM' | 'M';
      
      results.push({
        word: word.trim(),
        potency: isNaN(potency) ? 6 : potency,
        potencyType,
        alphabetType: 'latin'
      });
      console.log('Added word+potency format:', word.trim());
      continue;
    }
    
    // Format 3: Nur Wortname (Standard: 6D)
    if (cleanLine.length > 1 && cleanLine.length < 50 && /^[a-zA-ZäöüÄÖÜß\s\-\.]+$/.test(cleanLine)) {
      results.push({
        word: cleanLine,
        potency: 6,
        potencyType: 'D',
        alphabetType: 'latin'
      });
      console.log('Added simple word format:', cleanLine);
      continue;
    }
    
    // Format 4: Zeilen mit Tabs oder Semikolons
    const altSeparators = cleanLine.split(/[\t;]/);
    if (altSeparators.length >= 3) {
      const [word, potencyStr, potencyType] = altSeparators.map(s => s.trim());
      const potency = parseInt(potencyStr);
      
      if (!isNaN(potency) && ['D', 'C', 'LM', 'M'].includes(potencyType.toUpperCase())) {
        results.push({
          word,
          potency,
          potencyType: potencyType.toUpperCase() as 'D' | 'C' | 'LM' | 'M',
          alphabetType: 'latin'
        });
        console.log('Added tab/semicolon format:', word);
      }
    }
  }
  
  console.log('Total results found:', results.length);
  return results;
};

export const exportCopenRatesToCSV = (results: CopenRateResult[]): string => {
  const header = 'Wortenergie,Potenz,Typ,Alphabet,Copen-Rate\n';
  const rows = results.map(result => {
    return `${result.word},${result.potency},${result.potencyType},${result.alphabetType},${result.rate}`;
  });
  return header + rows.join('\n');
};
