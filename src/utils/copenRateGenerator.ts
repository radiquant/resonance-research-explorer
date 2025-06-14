
/**
 * Bruce Copen Rate Generator - Authentischer Algorithmus (1978-1995)
 * Konvertiert Wortenergien zu numerischen Raten nach Original-Copen-Methode
 */

export interface CopenRateResult {
  word: string;
  potency: number;
  potencyType: 'D' | 'C' | 'LM' | 'M';
  rate: number;
  calculation: {
    letterSum: number;
    baseRate: number;
    fibonacciRate: number;
    potencyModifier: number;
  };
}

export interface WordEnergyInput {
  word: string;
  potency?: number;
  potencyType?: 'D' | 'C' | 'LM' | 'M';
}

/**
 * Modernisierte Wortenergie-Normalisierung
 * - Leerzeichen werden als Trennzeichen beibehalten
 * - Umlaute werden korrekt umgewandelt (ä→ae, ö→oe, ü→ue, ß→ss)
 * - Potenzangaben und Zahlen werden entfernt
 * - Sonderzeichen werden entfernt
 */
function normalizeWordEnergy(word: string): string {
  return word
    .toUpperCase()
    // Umlaute umwandeln
    .replace(/Ä/g, 'AE')
    .replace(/Ö/g, 'OE') 
    .replace(/Ü/g, 'UE')
    .replace(/ß/g, 'SS')
    // Potenzangaben entfernen (D6, C200, LM1, etc.)
    .replace(/\s*[DCLM]+\d+/g, '')
    // Zahlen entfernen
    .replace(/\d+/g, '')
    // Sonderzeichen entfernen, aber Leerzeichen beibehalten
    .replace(/[^A-Z\s]/g, '')
    // Mehrfache Leerzeichen durch einzelne ersetzen
    .replace(/\s+/g, ' ')
    // Führende und nachfolgende Leerzeichen entfernen
    .trim();
}

/**
 * Berechnet authentische Bruce Copen Rate aus Wortenergie
 */
export function calculateCopenRate(
  word: string, 
  potency: number = 6, 
  potencyType: 'D' | 'C' | 'LM' | 'M' = 'D'
): CopenRateResult {
  // Modernisierte Wortenergie-Normalisierung
  const cleanWord = normalizeWordEnergy(word);
  
  // Originales Copen-Buchstabensystem
  const letterValues: { [key: string]: number } = {};
  for (let i = 1; i <= 26; i++) {
    letterValues[String.fromCharCode(64 + i)] = i;
  }
  
  // Schritt 1: Buchstabenwerte mit Positionsgewichtung
  let letterSum = 0;
  let position = 1;
  
  for (let i = 0; i < cleanWord.length; i++) {
    const char = cleanWord[i];
    if (char === ' ') {
      // Leerzeichen überspringen, aber Position nicht erhöhen
      continue;
    }
    const letterValue = letterValues[char] || 0;
    letterSum += letterValue * position;
    position++;
  }
  
  // Schritt 2: Baserate (minimum 4-stellig)
  const baseRate = letterSum * 1000;
  
  // Schritt 3: Fibonacci-Modulation (8./9. Fibonacci-Zahlen: 21/34)
  const fibonacciRate = Math.floor((baseRate / 21) * 34);
  
  // Schritt 4: Potenzanpassung nach Copen-Standard
  let potencyModifier = 0;
  const digits = fibonacciRate.toString().length;
  
  switch (potencyType) {
    case 'D':
      potencyModifier = potency * Math.pow(10, digits - 1);
      break;
    case 'C':
      potencyModifier = potency * Math.pow(10, digits);
      break;
    case 'LM':
      potencyModifier = 50 * Math.pow(10, digits);
      break;
    case 'M':
      potencyModifier = 100 * Math.pow(10, digits);
      break;
  }
  
  // Finale Rate
  const finalRate = fibonacciRate + potencyModifier;
  
  return {
    word: cleanWord,
    potency,
    potencyType,
    rate: finalRate,
    calculation: {
      letterSum,
      baseRate,
      fibonacciRate,
      potencyModifier
    }
  };
}

/**
 * Batch-Verarbeitung für mehrere Wortenergien
 */
export function batchCalculateCopenRates(inputs: WordEnergyInput[]): CopenRateResult[] {
  return inputs.map(input => 
    calculateCopenRate(
      input.word, 
      input.potency || 6, 
      input.potencyType || 'D'
    )
  );
}

/**
 * Excel/CSV Import Parser
 */
export function parseWordEnergyData(csvText: string): WordEnergyInput[] {
  const lines = csvText.split('\n').filter(line => line.trim());
  const results: WordEnergyInput[] = [];
  
  // Skip header if present
  const startIndex = lines[0].toLowerCase().includes('wort') || 
                     lines[0].toLowerCase().includes('word') ? 1 : 0;
  
  for (let i = startIndex; i < lines.length; i++) {
    const columns = lines[i].split(/[,;\t]/).map(col => col.trim());
    
    if (columns.length >= 1 && columns[0]) {
      const input: WordEnergyInput = {
        word: columns[0].replace(/"/g, ''), // Remove quotes
        potency: columns[1] ? parseInt(columns[1]) || 6 : 6,
        potencyType: (columns[2] as 'D' | 'C' | 'LM' | 'M') || 'D'
      };
      
      results.push(input);
    }
  }
  
  return results;
}

/**
 * Export zu CSV Format
 */
export function exportCopenRatesToCSV(results: CopenRateResult[]): string {
  const header = 'Wortenergie,Potenz,Typ,Copen-Rate,Buchstabensumme,Baserate,Fibonacci-Rate,Potenzmodifikator\n';
  
  const rows = results.map(result => [
    result.word,
    result.potency,
    result.potencyType,
    result.rate,
    result.calculation.letterSum,
    result.calculation.baseRate,
    result.calculation.fibonacciRate,
    result.calculation.potencyModifier
  ].join(','));
  
  return header + rows.join('\n');
}

/**
 * Validierung der Eingabedaten
 */
export function validateWordEnergy(word: string): { valid: boolean; error?: string } {
  if (!word || word.trim().length === 0) {
    return { valid: false, error: 'Wort darf nicht leer sein' };
  }
  
  if (!/^[a-zA-ZäöüÄÖÜß\s\d\-\.]+$/.test(word)) {
    return { valid: false, error: 'Nur Buchstaben, Leerzeichen und gängige Zeichen erlaubt' };
  }
  
  if (word.length > 50) {
    return { valid: false, error: 'Wort zu lang (max. 50 Zeichen)' };
  }
  
  return { valid: true };
}
