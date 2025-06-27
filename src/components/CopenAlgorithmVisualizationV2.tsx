
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDown, Calculator, Zap, Upload, Brain, Target, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WordRatePair {
  word: string;
  rate: number;
  normalizedWord: string;
  letterSum: number;
  letterCount: number;
  analysis?: AlgorithmAnalysis;
}

interface AlgorithmAnalysis {
  fibonacciCorrelation: number;
  linearCorrelation: number;
  exponentialCorrelation: number;
  positionWeightCorrelation: number;
  possibleFormula: string;
  confidence: number;
}

const CopenAlgorithmVisualizationV2: React.FC = () => {
  const [wordRatePairs, setWordRatePairs] = useState<WordRatePair[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [currentRate, setCurrentRate] = useState('');
  const [bulkInput, setBulkInput] = useState('');
  const [analysis, setAnalysis] = useState<AlgorithmAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Modernisierte Wortenergie-Normalisierung
  const normalizeWordEnergy = (word: string): string => {
    return word
      .toUpperCase()
      .replace(/Ä/g, 'AE')
      .replace(/Ö/g, 'OE') 
      .replace(/Ü/g, 'UE')
      .replace(/ß/g, 'SS')
      .replace(/\s*[DCLM]+\d+/g, '')
      .replace(/\d+/g, '')
      .replace(/[^A-Z\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Buchstabenwerte berechnen
  const calculateLetterSum = (word: string): number => {
    const cleanWord = normalizeWordEnergy(word);
    let sum = 0;
    let position = 1;
    
    for (let i = 0; i < cleanWord.length; i++) {
      const char = cleanWord[i];
      if (char === ' ') continue;
      
      const value = char.charCodeAt(0) - 64; // A=1, B=2, etc.
      sum += value * position; // Positionsgewichtung
      position++;
    }
    
    return sum;
  };

  // Fibonacci-Zahlen berechnen
  const fibonacci = (n: number): number => {
    if (n <= 2) return 1;
    let a = 1, b = 1;
    for (let i = 3; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    return b;
  };

  // Einzelnes Wort-Rate-Paar hinzufügen
  const addWordRatePair = () => {
    if (!currentWord.trim() || !currentRate.trim()) {
      toast({
        title: 'Eingabe unvollständig',
        description: 'Bitte sowohl Wort als auch Rate eingeben',
        variant: 'destructive'
      });
      return;
    }

    const rate = parseFloat(currentRate);
    if (isNaN(rate)) {
      toast({
        title: 'Ungültige Rate',
        description: 'Rate muss eine Zahl sein',
        variant: 'destructive'
      });
      return;
    }

    const normalizedWord = normalizeWordEnergy(currentWord);
    const letterSum = calculateLetterSum(currentWord);
    
    const newPair: WordRatePair = {
      word: currentWord.trim(),
      rate,
      normalizedWord,
      letterSum,
      letterCount: normalizedWord.replace(/\s/g, '').length
    };

    setWordRatePairs(prev => [...prev, newPair]);
    setCurrentWord('');
    setCurrentRate('');
    
    toast({
      title: 'Wort-Rate-Paar hinzugefügt',
      description: `"${currentWord}" = ${rate}`
    });
  };

  // Bulk-Import verarbeiten
  const processBulkInput = () => {
    if (!bulkInput.trim()) {
      toast({
        title: 'Keine Daten',
        description: 'Bitte Daten eingeben',
        variant: 'destructive'
      });
      return;
    }

    const lines = bulkInput.trim().split('\n');
    const newPairs: WordRatePair[] = [];

    for (const line of lines) {
      const cleanLine = line.trim();
      if (!cleanLine) continue;

      // Format: "WORT = RATE" oder "WORT,RATE" oder "WORT\tRATE"
      let word = '', rateStr = '';
      
      if (cleanLine.includes('=')) {
        [word, rateStr] = cleanLine.split('=').map(s => s.trim());
      } else if (cleanLine.includes(',')) {
        [word, rateStr] = cleanLine.split(',').map(s => s.trim());
      } else if (cleanLine.includes('\t')) {
        [word, rateStr] = cleanLine.split('\t').map(s => s.trim());
      } else {
        const parts = cleanLine.split(/\s+/);
        if (parts.length >= 2) {
          word = parts.slice(0, -1).join(' ');
          rateStr = parts[parts.length - 1];
        }
      }

      const rate = parseFloat(rateStr);
      if (word && !isNaN(rate)) {
        const normalizedWord = normalizeWordEnergy(word);
        const letterSum = calculateLetterSum(word);
        
        newPairs.push({
          word: word.trim(),
          rate,
          normalizedWord,
          letterSum,
          letterCount: normalizedWord.replace(/\s/g, '').length
        });
      }
    }

    if (newPairs.length > 0) {
      setWordRatePairs(prev => [...prev, ...newPairs]);
      setBulkInput('');
      toast({
        title: 'Bulk-Import erfolgreich',
        description: `${newPairs.length} Wort-Rate-Paare hinzugefügt`
      });
    } else {
      toast({
        title: 'Keine gültigen Daten',
        description: 'Unterstützte Formate: WORT=RATE, WORT,RATE, WORT RATE',
        variant: 'destructive'
      });
    }
  };

  // Datei-Upload verarbeiten
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setBulkInput(content);
    };
    reader.readAsText(file);
  };

  // Algorithmus-Analyse durchführen
  const analyzeAlgorithm = () => {
    if (wordRatePairs.length < 3) {
      toast({
        title: 'Zu wenige Daten',
        description: 'Mindestens 3 Wort-Rate-Paare für Analyse benötigt',
        variant: 'destructive'
      });
      return;
    }

    // Verschiedene Korrelationsanalysen
    const analyses = wordRatePairs.map(pair => {
      const { letterSum, rate } = pair;
      
      // Fibonacci-Korrelation
      const fibRate = fibonacci(letterSum);
      const fibCorr = Math.abs(rate - fibRate) / rate;
      
      // Lineare Korrelation (Rate = Buchstabensumme * Faktor)
      const linearFactor = rate / letterSum;
      const linearCorr = Math.abs(linearFactor - Math.round(linearFactor)) / linearFactor;
      
      // Exponential-Korrelation
      const expCorr = Math.abs(Math.log(rate) - letterSum) / Math.log(rate);
      
      // Position-Weight-Korrelation
      const posWeightCorr = Math.abs(rate - (letterSum * 1000)) / rate;
      
      return {
        fibonacciCorrelation: 1 - fibCorr,
        linearCorrelation: 1 - linearCorr,
        exponentialCorrelation: 1 - expCorr,
        positionWeightCorrelation: 1 - posWeightCorr,
        possibleFormula: `Rate = ${Math.round(linearFactor)} × Buchstabensumme`,
        confidence: Math.max(1 - fibCorr, 1 - linearCorr, 1 - expCorr, 1 - posWeightCorr)
      };
    });

    // Durchschnittliche Korrelationen berechnen
    const avgAnalysis: AlgorithmAnalysis = {
      fibonacciCorrelation: analyses.reduce((sum, a) => sum + a.fibonacciCorrelation, 0) / analyses.length,
      linearCorrelation: analyses.reduce((sum, a) => sum + a.linearCorrelation, 0) / analyses.length,
      exponentialCorrelation: analyses.reduce((sum, a) => sum + a.exponentialCorrelation, 0) / analyses.length,
      positionWeightCorrelation: analyses.reduce((sum, a) => sum + a.positionWeightCorrelation, 0) / analyses.length,
      possibleFormula: 'Wird basierend auf höchster Korrelation bestimmt...',
      confidence: 0
    };

    // Beste Korrelation finden
    const correlations = [
      { name: 'Fibonacci', value: avgAnalysis.fibonacciCorrelation, formula: 'Rate = Fibonacci(Buchstabensumme)' },
      { name: 'Linear', value: avgAnalysis.linearCorrelation, formula: 'Rate = Faktor × Buchstabensumme' },
      { name: 'Exponential', value: avgAnalysis.exponentialCorrelation, formula: 'Rate = e^Buchstabensumme' },
      { name: 'Positionsgewichtet', value: avgAnalysis.positionWeightCorrelation, formula: 'Rate = Buchstabensumme × 1000' }
    ];

    const bestCorrelation = correlations.reduce((best, current) => 
      current.value > best.value ? current : best
    );

    avgAnalysis.possibleFormula = bestCorrelation.formula;
    avgAnalysis.confidence = bestCorrelation.value;

    setAnalysis(avgAnalysis);
    setShowAnalysis(true);

    toast({
      title: 'Algorithmus-Analyse abgeschlossen',
      description: `Beste Korrelation: ${bestCorrelation.name} (${Math.round(bestCorrelation.value * 100)}%)`
    });
  };

  const clearData = () => {
    setWordRatePairs([]);
    setAnalysis(null);
    setShowAnalysis(false);
    toast({
      title: 'Daten gelöscht',
      description: 'Alle Wort-Rate-Paare wurden entfernt'
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-800 flex items-center justify-center gap-2">
            <Brain className="h-6 w-6" />
            Bruce Copen Algorithmus V2 - Reverse Engineering
          </CardTitle>
          <p className="text-center text-sm text-gray-600 mt-2">
            🔍 Analysiert echte Wort-Rate-Paare • 🧮 Entschlüsselt den dahinterliegenden Algorithmus • 📊 Mathematische Musteranalyse
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="input" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="input">Daten eingeben</TabsTrigger>
              <TabsTrigger value="analysis">Algorithmus-Analyse</TabsTrigger>
              <TabsTrigger value="results">Ergebnisse</TabsTrigger>
            </TabsList>

            <TabsContent value="input" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Einzeleingabe */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Einzelne Wort-Rate-Paare
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="word">Wortenergie</Label>
                      <Input
                        id="word"
                        value={currentWord}
                        onChange={(e) => setCurrentWord(e.target.value)}
                        placeholder="z.B. LIEBE, Arnica, Heilung"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rate">Copen-Rate</Label>
                      <Input
                        id="rate"
                        value={currentRate}
                        onChange={(e) => setCurrentRate(e.target.value)}
                        placeholder="z.B. 123456, 789012"
                        type="number"
                      />
                    </div>
                    <Button onClick={addWordRatePair} className="w-full">
                      <Target className="h-4 w-4 mr-2" />
                      Paar hinzufügen
                    </Button>
                  </CardContent>
                </Card>

                {/* Bulk-Import */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Bulk-Import & Dateien
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="bulk">Bulk-Daten (WORT=RATE)</Label>
                      <Textarea
                        id="bulk"
                        value={bulkInput}
                        onChange={(e) => setBulkInput(e.target.value)}
                        placeholder={`LIEBE = 123456
HEILUNG = 789012
ARNICA,345678
Belladonna	987654`}
                        rows={6}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={processBulkInput} className="flex-1">
                        Bulk verarbeiten
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        .txt/.csv
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Aktuelle Daten */}
              {wordRatePairs.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Gesammelte Wort-Rate-Paare ({wordRatePairs.length})</span>
                      <div className="flex gap-2">
                        <Button onClick={analyzeAlgorithm} size="sm">
                          <Brain className="h-4 w-4 mr-2" />
                          Analysieren
                        </Button>
                        <Button onClick={clearData} variant="outline" size="sm">
                          Löschen
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                      {wordRatePairs.map((pair, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-semibold text-blue-800">{pair.word}</div>
                          <div className="text-lg font-bold text-green-700">
                            {pair.rate.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            Norm: {pair.normalizedWord} | Sum: {pair.letterSum}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analysis">
              {analysis ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-green-700 flex items-center gap-2">
                        <TrendingUp className="h-6 w-6" />
                        Algorithmus-Analyse Ergebnisse
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Korrelations-Analyse</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                              <span>Fibonacci-Korrelation</span>
                              <span className="font-bold">{Math.round(analysis.fibonacciCorrelation * 100)}%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                              <span>Lineare Korrelation</span>
                              <span className="font-bold">{Math.round(analysis.linearCorrelation * 100)}%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                              <span>Exponential-Korrelation</span>
                              <span className="font-bold">{Math.round(analysis.exponentialCorrelation * 100)}%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                              <span>Positionsgewichtung</span>
                              <span className="font-bold">{Math.round(analysis.positionWeightCorrelation * 100)}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Erkannter Algorithmus</h3>
                          <div className="p-4 bg-green-100 rounded-lg">
                            <div className="text-sm text-gray-600 mb-2">Wahrscheinlichste Formel:</div>
                            <div className="font-mono text-lg font-bold text-green-800">
                              {analysis.possibleFormula}
                            </div>
                            <div className="text-sm text-gray-600 mt-2">
                              Konfidenz: {Math.round(analysis.confidence * 100)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calculator className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Noch keine Analyse durchgeführt
                    </h3>
                    <p className="text-gray-500">
                      Fügen Sie Wort-Rate-Paare hinzu und starten Sie die Analyse
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>Detaillierte Ergebnisse</CardTitle>
                </CardHeader>
                <CardContent>
                  {wordRatePairs.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 p-2 text-left">Wort</th>
                            <th className="border border-gray-300 p-2 text-right">Rate</th>
                            <th className="border border-gray-300 p-2 text-left">Normalisiert</th>
                            <th className="border border-gray-300 p-2 text-right">Buchstabensumme</th>
                            <th className="border border-gray-300 p-2 text-right">Faktor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wordRatePairs.map((pair, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="border border-gray-300 p-2 font-semibold">{pair.word}</td>
                              <td className="border border-gray-300 p-2 text-right font-mono">
                                {pair.rate.toLocaleString()}
                              </td>
                              <td className="border border-gray-300 p-2 text-sm text-gray-600">
                                {pair.normalizedWord}
                              </td>
                              <td className="border border-gray-300 p-2 text-right">{pair.letterSum}</td>
                              <td className="border border-gray-300 p-2 text-right">
                                {Math.round(pair.rate / pair.letterSum)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Keine Daten vorhanden
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CopenAlgorithmVisualizationV2;
