
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Download, Calculator, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  calculateCopenRate,
  batchCalculateCopenRates,
  parseWordEnergyData,
  exportCopenRatesToCSV,
  validateWordEnergy,
  type CopenRateResult,
  type WordEnergyInput
} from '@/utils/copenRateGenerator';

const CopenRateGenerator: React.FC = () => {
  const [singleWord, setSingleWord] = useState('');
  const [singlePotency, setSinglePotency] = useState(6);
  const [singlePotencyType, setSinglePotencyType] = useState<'D' | 'C' | 'LM' | 'M'>('D');
  const [results, setResults] = useState<CopenRateResult[]>([]);
  const [csvInput, setCsvInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSingleCalculation = () => {
    const validation = validateWordEnergy(singleWord);
    if (!validation.valid) {
      toast({
        title: 'Eingabefehler',
        description: validation.error,
        variant: 'destructive'
      });
      return;
    }

    const result = calculateCopenRate(singleWord, singlePotency, singlePotencyType);
    setResults(prev => [result, ...prev]);
    
    toast({
      title: 'Rate berechnet',
      description: `${result.word} ${result.potencyType}${result.potency}: ${result.rate}`
    });
  };

  const handleBatchCalculation = () => {
    if (!csvInput.trim()) {
      toast({
        title: 'Fehler',
        description: 'Bitte CSV-Daten eingeben',
        variant: 'destructive'
      });
      return;
    }

    try {
      const inputs = parseWordEnergyData(csvInput);
      if (inputs.length === 0) {
        toast({
          title: 'Fehler',
          description: 'Keine gültigen Daten gefunden',
          variant: 'destructive'
        });
        return;
      }

      const batchResults = batchCalculateCopenRates(inputs);
      setResults(prev => [...batchResults, ...prev]);
      
      toast({
        title: 'Batch-Berechnung abgeschlossen',
        description: `${batchResults.length} Raten erfolgreich berechnet`
      });
    } catch (error) {
      toast({
        title: 'Verarbeitungsfehler',
        description: 'Fehler beim Verarbeiten der CSV-Daten',
        variant: 'destructive'
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCsvInput(content);
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    if (results.length === 0) {
      toast({
        title: 'Keine Daten',
        description: 'Keine Ergebnisse zum Exportieren vorhanden',
        variant: 'destructive'
      });
      return;
    }

    const csvContent = exportCopenRatesToCSV(results);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `copen-raten-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast({
      title: 'Export erfolgreich',
      description: `${results.length} Raten exportiert`
    });
  };

  const clearResults = () => {
    setResults([]);
    toast({
      title: 'Ergebnisse gelöscht',
      description: 'Alle berechneten Raten wurden entfernt'
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-800">
            Bruce Copen Raten-Generator
          </CardTitle>
          <p className="text-center text-gray-600">
            Authentische Umwandlung von Wortenergien nach Original Copen-Algorithmus (1978-1995)
          </p>
        </CardHeader>
      </Card>

      {/* Einzelberechnung */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Einzelne Wortenergie berechnen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="word">Wortenergie</Label>
              <Input
                id="word"
                value={singleWord}
                onChange={(e) => setSingleWord(e.target.value)}
                placeholder="z.B. Arnica, Belladonna..."
              />
            </div>
            <div>
              <Label htmlFor="potency">Potenz</Label>
              <Input
                id="potency"
                type="number"
                value={singlePotency}
                onChange={(e) => setSinglePotency(parseInt(e.target.value) || 6)}
                min={1}
                max={50000}
              />
            </div>
            <div>
              <Label htmlFor="potencyType">Typ</Label>
              <Select value={singlePotencyType} onValueChange={(value) => setSinglePotencyType(value as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="D">D (Dezimal)</SelectItem>
                  <SelectItem value="C">C (Centesimal)</SelectItem>
                  <SelectItem value="LM">LM (50-Millesimal)</SelectItem>
                  <SelectItem value="M">M (Millennial)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSingleCalculation} className="w-full">
            <Calculator className="h-4 w-4 mr-2" />
            Copen-Rate berechnen
          </Button>
        </CardContent>
      </Card>

      {/* Batch Import */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Excel/CSV Import
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              Datei auswählen
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          
          <div>
            <Label htmlFor="csvInput">CSV-Daten (Format: Wort,Potenz,Typ)</Label>
            <Textarea
              id="csvInput"
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="Arnica,6,D
Belladonna,12,D
Nux vomica,30,C"
              rows={6}
            />
          </div>
          
          <Button onClick={handleBatchCalculation} className="w-full">
            <Calculator className="h-4 w-4 mr-2" />
            Batch-Berechnung starten
          </Button>
        </CardContent>
      </Card>

      {/* Ergebnisse */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Berechnete Copen-Raten ({results.length})
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  CSV Export
                </Button>
                <Button variant="outline" size="sm" onClick={clearResults}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Löschen
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Wortenergie</th>
                    <th className="text-left p-2">Potenz</th>
                    <th className="text-left p-2">Typ</th>
                    <th className="text-left p-2">Copen-Rate</th>
                    <th className="text-left p-2">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{result.word}</td>
                      <td className="p-2">{result.potency}</td>
                      <td className="p-2">{result.potencyType}</td>
                      <td className="p-2 font-mono text-blue-600">{result.rate.toLocaleString()}</td>
                      <td className="p-2 text-xs text-gray-500">
                        Σ:{result.calculation.letterSum} → 
                        Base:{result.calculation.baseRate.toLocaleString()} → 
                        Fib:{result.calculation.fibonacciRate.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CopenRateGenerator;
