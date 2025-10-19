import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, Download, Database, FileText, FileSpreadsheet, Image as ImageIcon, Sparkles, Save, Loader2, Archive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { calculateCopenRate, type CopenRateResult } from '@/utils/copenRateGenerator';
import { analyzeImageWithOllama, compareImageSignatures, checkOllamaConnection } from '@/utils/ollamaClient';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { calculateLevelResonance, findHighestResonanceLevel } from '@/utils/levelResonance';

interface CloudPatient {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  birth_place: string;
  image_signature?: string | null;
  image_signature_active?: boolean;
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
  levelResonance?: Record<string, number>;
  highestLevel?: number;
  highestLevelValue?: number;
}

const DatabaseManager: React.FC<DatabaseManagerProps> = ({ selectedPatient }) => {
  const [importData, setImportData] = useState('');
  const [databaseName, setDatabaseName] = useState('');
  const [resonanceResults, setResonanceResults] = useState<ResonanceResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSignature, setImageSignature] = useState<string>('');
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [imageResonanceResults, setImageResonanceResults] = useState<Array<{word: string; score: number; analysis: string}>>([]);
  const [ollamaConnected, setOllamaConnected] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    checkOllamaConnection().then(setOllamaConnected);
  }, []);

  const parseImportData = (data: string): string[] => {
    // Auto-detect format: CSV or TXT
    // WICHTIG: Ganze Sätze werden als EIN Datensatz behandelt
    const lines = data.trim().split('\n');
    const entries: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.length === 0) continue;

      if (trimmedLine.includes(',')) {
        // CSV format - Split bei Komma, jeder Teil ist ein Datensatz (kann Satz sein)
        const parts = trimmedLine.split(',').map(p => p.trim());
        entries.push(...parts.filter(p => p.length > 0));
      } else {
        // TXT format - eine Zeile = ein Datensatz (kann ganzer Satz sein)
        entries.push(trimmedLine);
      }
    }

    return [...new Set(entries)]; // Remove duplicates
  };

  const calculateClientRate = (patient: CloudPatient): number => {
    let clientData = `${patient.first_name} ${patient.last_name} ${patient.birth_date} ${patient.birth_place}`;
    
    // Bildsignatur nur einbeziehen wenn aktiv
    if (patient.image_signature_active && patient.image_signature) {
      clientData += ` ${patient.image_signature}`;
    }
    
    let sum = 0;
    
    for (const char of clientData.toUpperCase().replace(/[^A-Z0-9]/g, '')) {
      if (char >= 'A' && char <= 'Z') {
        sum += char.charCodeAt(0) - 64;
      } else {
        sum += parseInt(char);
      }
    }
    
    const clientBaseRate = sum * 1000;
    return Math.floor((clientBaseRate / 21) * 34);
  };

  const analyzeResonance = (wordRate: number, clientRate: number): number => {
    // KOZYREV-ERWEITERTE Harmonische Resonanz-Analyse
    const ratio = wordRate / clientRate;
    const phi = 1.618033988749895; // Goldener Schnitt
    
    // Nähe zum Goldenen Schnitt = höhere Resonanz (Fibonacci/Kozyrev)
    const deviation = Math.abs(ratio - phi) + Math.abs(ratio - (1/phi));
    const baseResonance = Math.max(0, 100 - (deviation * 10));
    
    // Morphische Feld-Verstärkung (Sheldrake/Kozyrev)
    const harmonicMultiplier = Math.cos(ratio * Math.PI / 2);
    const morphicResonance = baseResonance * (1 + 0.2 * harmonicMultiplier);
    
    return Math.min(100, Math.round(morphicResonance));
  };

  const saveToArchive = async (result: ResonanceResult) => {
    if (!user || !selectedPatient) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: 'Kein Benutzer oder Patient ausgewählt'
      });
      return;
    }

    try {
      const archiveData: any = {
        user_id: user.id,
        patient_id: selectedPatient.id,
        word: result.word,
        copen_rate: result.rate.toString(),
        tested_potency: `${result.potencyType}${result.potency}`,
        highest_resonance_level: result.highestLevel,
        highest_resonance_value: result.highestLevelValue,
        patient_data: selectedPatient,
        database_entries: parseImportData(importData)
      };

      // Füge Ebenen-Resonanzwerte hinzu
      if (result.levelResonance) {
        archiveData.level_1_physical_particles = result.levelResonance.level_1;
        archiveData.level_2_physical_structure = result.levelResonance.level_2;
        archiveData.level_3_etheric_prana = result.levelResonance.level_3;
        archiveData.level_4_etheric_meridians = result.levelResonance.level_4;
        archiveData.level_5_astral_emotions = result.levelResonance.level_5;
        archiveData.level_6_astral_thoughts = result.levelResonance.level_6;
        archiveData.level_7_mental_time = result.levelResonance.level_7;
        archiveData.level_8_mental_constructs = result.levelResonance.level_8;
        archiveData.level_9_causal_blueprints = result.levelResonance.level_9;
        archiveData.level_10_causal_alchemy = result.levelResonance.level_10;
        archiveData.level_11_atmic_identity = result.levelResonance.level_11;
        archiveData.level_12_atmic_love = result.levelResonance.level_12;
        archiveData.level_13_creator = result.levelResonance.level_13;
      }

      const { error } = await supabase
        .from('analysis_archives')
        .insert(archiveData);

      if (error) throw error;

      toast({
        title: 'Erfolg',
        description: 'Analyse im Archiv gespeichert'
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: error.message
      });
    }
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
        
        // Berechne Ebenen-Resonanz
        const levelResonance = calculateLevelResonance(result.rate, word);
        const { level: highestLevel, value: highestLevelValue } = findHighestResonanceLevel(levelResonance);
        
        results.push({
          word,
          potency: pot.value,
          potencyType: pot.type,
          rate: result.rate,
          resonanceScore,
          clientResonance: clientRate,
          levelResonance,
          highestLevel,
          highestLevelValue
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setAnalyzingImage(true);

    try {
      const result = await analyzeImageWithOllama(file);
      
      if (result.error) {
        throw new Error(result.error);
      }

      setImageSignature(result.signature);
      const isPerceptualHash = result.signature.startsWith('PHASH:');
      toast({
        title: "Bild analysiert",
        description: isPerceptualHash 
          ? "Perceptual Hash Signatur erstellt (Ollama Fallback)" 
          : "Bildsignatur wurde mit Ollama llava erstellt",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Bildanalyse fehlgeschlagen",
        description: error.message,
      });
    } finally {
      setAnalyzingImage(false);
    }
  };

  const handleImageResonanceAnalysis = async () => {
    if (!imageSignature || !importData.trim()) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bitte laden Sie ein Bild hoch und importieren Sie eine Datenbank",
      });
      return;
    }

    setIsAnalyzing(true);
    const words = parseImportData(importData);
    const results: Array<{word: string; score: number; analysis: string}> = [];

    try {
      for (const word of words.slice(0, 20)) { // Limit für Demo
        const wordSignature = `Wortenergie: ${word}`;
        const comparison = await compareImageSignatures(imageSignature, wordSignature);
        
        results.push({
          word,
          score: comparison.resonanceScore,
          analysis: comparison.analysis
        });
      }

      results.sort((a, b) => b.score - a.score);
      setImageResonanceResults(results);

      toast({
        title: "Bild-Resonanz-Analyse abgeschlossen",
        description: `${results.length} Vergleiche durchgeführt`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message,
      });
    } finally {
      setIsAnalyzing(false);
    }
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

  const handleSaveDatabase = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Sie müssen angemeldet sein",
      });
      return;
    }

    if (!importData.trim()) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Keine Daten zum Speichern vorhanden",
      });
      return;
    }

    if (!databaseName.trim()) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bitte geben Sie einen Datenbanknamen ein",
      });
      return;
    }

    setIsSaving(true);
    try {
      const entries = parseImportData(importData);
      
      const { error } = await supabase
        .from('word_databases')
        .insert({
          user_id: user.id,
          name: databaseName,
          entries: entries,
        });

      if (error) throw error;

      toast({
        title: "Datenbank gespeichert",
        description: `${entries.length} Einträge gespeichert als "${databaseName}"`,
      });
      setDatabaseName('');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <Label>Datenbank-Name (für Speicherung)</Label>
              <Input
                value={databaseName}
                onChange={(e) => setDatabaseName(e.target.value)}
                placeholder="z.B. Homöopathie Hauptmittel"
              />
            </div>
          </div>
          <div>
            <Label>Datenbank importieren (.txt oder .csv)</Label>
            <Textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Fügen Sie Ihre Datenbank ein (Wortenergien oder ganze Sätze)&#10;TXT: Eine Zeile = Ein Datensatz&#10;Beispiel:&#10;ARNICA&#10;Chronische Schmerzen im Kopf&#10;BELLADONNA&#10;&#10;CSV: Komma-getrennt&#10;Beispiel:&#10;ARNICA, Chronische Schmerzen, BELLADONNA"
              className="min-h-32 font-mono text-sm"
            />
          </div>

          {/* Bild-Upload für Resonanzanalyse */}
          <div className="border-t pt-4 space-y-3">
            <Label className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Bild-Resonanzanalyse (Ollama llava)
              {ollamaConnected && <Sparkles className="h-3 w-3 text-green-500" />}
            </Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={analyzingImage || !ollamaConnected}
            />
            {analyzingImage && (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Sparkles className="h-3 w-3 animate-pulse" />
                Analysiere Bild mit Ollama llava...
              </p>
            )}
            {!ollamaConnected && (
              <p className="text-sm text-yellow-600">
                ⚠️ Ollama nicht verbunden. Starten Sie: OLLAMA_ORIGINS=* ollama serve
              </p>
            )}
            {imageSignature && (
              <div className="p-2 bg-primary/5 rounded text-xs">
                <strong>Bildsignatur:</strong> {imageSignature.substring(0, 200)}...
              </div>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleSaveDatabase} disabled={isSaving} variant="secondary">
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Datenbank speichern
            </Button>
            <Button onClick={handleAnalyzeDatabase} disabled={isAnalyzing || !selectedPatient} className="flex-1">
              <Database className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analysiere...' : 'Text-Resonanzen analysieren'}
            </Button>
            {imageSignature && (
              <Button 
                onClick={handleImageResonanceAnalysis} 
                disabled={isAnalyzing || !importData.trim()} 
                variant="secondary"
                className="flex-1"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                {isAnalyzing ? 'Analysiere...' : 'Bild-Resonanzen analysieren'}
              </Button>
            )}
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
                      <th className="p-2 text-left">Höchste Ebene</th>
                      <th className="p-2 text-right">Aktionen</th>
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
                        <td className="p-2 text-xs">
                          {result.highestLevel && (
                            <span className="text-primary font-semibold">
                              Ebene {result.highestLevel} ({result.highestLevelValue?.toFixed(0)}%)
                            </span>
                          )}
                        </td>
                        <td className="p-2 text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => saveToArchive(result)}
                            title="In Analysearchiv speichern"
                          >
                            <Archive className="h-3 w-3" />
                          </Button>
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

          {/* Bild-Resonanz-Ergebnisse */}
          {imageResonanceResults.length > 0 && (
            <div className="space-y-3 border-t pt-4">
              <h3 className="font-semibold flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Bild-Resonanz-Ergebnisse
              </h3>
              
              <div className="border rounded-lg max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="p-2 text-left">Wortenergie</th>
                      <th className="p-2 text-right">Resonanz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {imageResonanceResults.map((result, index) => (
                      <tr key={index} className={`border-b ${
                        result.score >= 80 ? 'bg-green-50' :
                        result.score >= 60 ? 'bg-yellow-50' :
                        ''
                      }`}>
                        <td className="p-2 font-medium">{result.word}</td>
                        <td className="p-2 text-right">
                          <span className={`font-bold ${
                            result.score >= 80 ? 'text-green-600' :
                            result.score >= 60 ? 'text-yellow-600' :
                            'text-gray-600'
                          }`}>
                            {result.score}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseManager;
