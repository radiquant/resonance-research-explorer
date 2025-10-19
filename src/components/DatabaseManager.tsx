import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Download, Database, FileText, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { calculateCopenRate, type CopenRateResult } from '@/utils/copenRateGenerator';

interface CloudPatient {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  birth_place: string;
}

interface DatabaseManagerProps {
  selectedPatient: CloudPatient | null;
}

interface ResonanceResult {
  word: string;
  potency: number;
  potencyType: 'D' | 'C' | 'LM' | 'M';
  rate: number;
  resonanceScore: number;
  clientResonance: number;
}

const DatabaseManager: React.FC<DatabaseManagerProps> = ({ selectedPatient }) => {
  const [importData, setImportData] = useState('');
  const [resonanceResults, setResonanceResults] = useState<ResonanceResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const parseImportData = (data: string): string[] => {
    // Auto-detect format: CSV or TXT
    const lines = data.trim().split('\n');
    const words: string[] = [];

    for (const line of lines) {
      if (line.includes(',')) {
        // CSV format
        const parts = line.split(',').map(p => p.trim());
        words.push(...parts.filter(p => p.length > 0));
      } else {
        // TXT format - one word per line
        const word = line.trim();
        if (word.length > 0) words.push(word);
      }
    }

    return [...new Set(words)]; // Remove duplicates
  };

  const calculateClientRate = (patient: CloudPatient): number => {
    const clientData = `${patient.first_name} ${patient.last_name} ${patient.birth_date} ${patient.birth_place}`;
    let sum = 0;
    
    for (const char of clientData.toUpperCase().replace(/[^A-Z]/g, '')) {
      sum += char.charCodeAt(0) - 64;
    }
    
    const clientBaseRate = sum * 1000;
    return Math.floor((clientBaseRate / 21) * 34);
  };

  const analyzeResonance = (wordRate: number, clientRate: number): number => {
    // Harmonische Resonanz-Analyse nach Fibonacci-Verhältnis
    const ratio = wordRate / clientRate;
    const phi = 1.618033988749895; // Goldener Schnitt
    
    // Nähe zum Goldenen Schnitt = höhere Resonanz
    const deviation = Math.abs(ratio - phi) + Math.abs(ratio - (1/phi));
    const resonanceScore = Math.max(0, 100 - (deviation * 10));
    
    return Math.round(resonanceScore);
  };

  const handleAnalyzeDatabase = () => {
    if (!selectedPatient) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie zuerst einen Patienten aus",
        variant: "destructive"
      });
      return;
    }

    if (!importData.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie Daten ein oder importieren Sie eine Datei",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    const words = parseImportData(importData);
    const clientRate = calculateClientRate(selectedPatient);
    const results: ResonanceResult[] = [];

    // Analysiere jedes Wort mit verschiedenen Potenzen
    for (const word of words) {
      const potencies: Array<{ type: 'D' | 'C' | 'LM' | 'M', value: number }> = [
        { type: 'D', value: 6 },
        { type: 'D', value: 12 },
        { type: 'D', value: 30 },
        { type: 'C', value: 30 },
        { type: 'C', value: 200 },
        { type: 'LM', value: 6 },
        { type: 'M', value: 1 }
      ];

      for (const pot of potencies) {
        const result = calculateCopenRate(word, pot.value, pot.type);
        const resonanceScore = analyzeResonance(result.rate, clientRate);
        
        results.push({
          word,
          potency: pot.value,
          potencyType: pot.type,
          rate: result.rate,
          resonanceScore,
          clientResonance: clientRate
        });
      }
    }

    // Sortiere nach Resonanz-Score
    results.sort((a, b) => b.resonanceScore - a.resonanceScore);
    
    setResonanceResults(results);
    setIsAnalyzing(false);
    
    toast({
      title: "Analyse abgeschlossen",
      description: `${results.length} Resonanzen berechnet für ${words.length} Wortenergien`,
    });
  };

  const exportResults = (format: 'csv' | 'txt') => {
    if (resonanceResults.length === 0) {
      toast({
        title: "Fehler",
        description: "Keine Ergebnisse zum Exportieren",
        variant: "destructive"
      });
      return;
    }

    let content = '';
    if (format === 'csv') {
      content = 'Wortenergie,Potenz,Typ,Copen-Rate,Resonanz-Score,Klienten-Rate\n';
      content += resonanceResults.map(r => 
        `${r.word},${r.potency},${r.potencyType},${r.rate},${r.resonanceScore},${r.clientResonance}`
      ).join('\n');
    } else {
      content = `Resonanz-Analyse für: ${selectedPatient?.first_name} ${selectedPatient?.last_name}\n\n`;
      content += resonanceResults.map(r => 
        `${r.word} ${r.potencyType}${r.potency} | Rate: ${r.rate.toLocaleString()} | Resonanz: ${r.resonanceScore}%`
      ).join('\n');
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resonanz-analyse-${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export erfolgreich",
      description: `Ergebnisse als ${format.toUpperCase()} exportiert`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Datenbank-Import & Resonanz-Analyse
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Datenbank importieren (.txt oder .csv)</Label>
            <Textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Fügen Sie Ihre Datenbank ein (ein Wort pro Zeile oder CSV-Format)&#10;Beispiel:&#10;ARNICA&#10;BELLADONNA&#10;CALCIUM&#10;oder: ARNICA, BELLADONNA, CALCIUM"
              className="min-h-32 font-mono text-sm"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAnalyzeDatabase} disabled={isAnalyzing} className="flex-1">
              <Database className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analysiere...' : 'Resonanzen analysieren'}
            </Button>
          </div>

          {resonanceResults.length > 0 && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button onClick={() => exportResults('csv')} variant="outline" size="sm">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  CSV Export
                </Button>
                <Button onClick={() => exportResults('txt')} variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  TXT Export
                </Button>
              </div>

              <div className="border rounded-lg max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="p-2 text-left">Wortenergie</th>
                      <th className="p-2 text-left">Potenz</th>
                      <th className="p-2 text-right">Copen-Rate</th>
                      <th className="p-2 text-right">Resonanz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resonanceResults.slice(0, 50).map((result, index) => (
                      <tr key={index} className={`border-b ${
                        result.resonanceScore >= 80 ? 'bg-green-50' :
                        result.resonanceScore >= 60 ? 'bg-yellow-50' :
                        ''
                      }`}>
                        <td className="p-2 font-medium">{result.word}</td>
                        <td className="p-2">{result.potencyType}{result.potency}</td>
                        <td className="p-2 text-right font-mono">{result.rate.toLocaleString()}</td>
                        <td className="p-2 text-right">
                          <span className={`font-bold ${
                            result.resonanceScore >= 80 ? 'text-green-600' :
                            result.resonanceScore >= 60 ? 'text-yellow-600' :
                            'text-gray-600'
                          }`}>
                            {result.resonanceScore}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {resonanceResults.length > 50 && (
                <p className="text-sm text-muted-foreground text-center">
                  Zeige Top 50 von {resonanceResults.length} Ergebnissen. Exportieren Sie für alle Ergebnisse.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseManager;
