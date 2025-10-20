import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, Download, Database, FileText, FileSpreadsheet, Image as ImageIcon, Sparkles, Save, Loader2, Archive, Zap } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { calculateCopenRate, type CopenRateResult } from '@/utils/copenRateGenerator';
import { analyzeImageWithOllama, compareImageSignatures, checkOllamaConnection } from '@/utils/ollamaClient';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { calculateLevelResonance, findHighestResonanceLevel } from '@/utils/levelResonance';
import { analyzeRates, DEFAULT_ANALYSIS_CONFIG, type RateObject } from '@/utils/resonanceAnalysis';
import { interpretAnalysisResults, type AnalysisInterpretation } from '@/utils/analysisInterpreter';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface ColumnSize {
  word: number;
  potency: number;
  rate: number;
  resonance: number;
  level: number;
  actions: number;
}

const DatabaseManager: React.FC<DatabaseManagerProps> = ({ selectedPatient }) => {
  const [importData, setImportData] = useState('');
  const [databaseName, setDatabaseName] = useState('');
  const [resonanceResults, setResonanceResults] = useState<ResonanceResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedForHarmonization, setSelectedForHarmonization] = useState<Set<string>>(new Set());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSignature, setImageSignature] = useState<string>('');
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [imageResonanceResults, setImageResonanceResults] = useState<Array<{word: string; score: number; analysis: string}>>([]);
  const [ollamaConnected, setOllamaConnected] = useState(false);
  const [interpretation, setInterpretation] = useState<AnalysisInterpretation | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const [savedDatabases, setSavedDatabases] = useState<Array<{ id: string; name: string; entries: string[] }>>([]);
  const [loadingDatabases, setLoadingDatabases] = useState(false);
  
  // Sortierung für Analyseergebnisse
  const [sortBy, setSortBy] = useState<'resonance' | 'level' | 'potency' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (user) loadSavedDatabases();
  }, [user]);
  useEffect(() => {
    checkOllamaConnection().then(setOllamaConnected);
  }, []);

  // Spaltenbreiten (Drag-Resize)
  const [columnSizes, setColumnSizes] = useState<ColumnSize>({
    word: 420,
    potency: 90,
    rate: 160,
    resonance: 120,
    level: 160,
    actions: 120,
  });
  const [resizing, setResizing] = useState<{ key: keyof ColumnSize | null; startX: number; startWidth: number }>({ key: null, startX: 0, startWidth: 0 });
  const startResize = (key: keyof ColumnSize, e: React.MouseEvent) => {
    e.preventDefault();
    setResizing({ key, startX: e.clientX, startWidth: columnSizes[key] });
  };
  useEffect(() => {
    const onMove = (ev: MouseEvent) => {
      if (!resizing.key) return;
      const dx = ev.clientX - resizing.startX;
      const newWidth = Math.max(80, resizing.startWidth + dx);
      setColumnSizes(prev => ({ ...prev, [resizing.key!]: newWidth }));
    };
    const onUp = () => setResizing(prev => ({ ...prev, key: null }));
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [resizing]);

  // Anzeige: Copen-Rate vollständig anzeigen (deutsche Gruppierung)
  const formatRate12 = (value: number): string => {
    if (!Number.isFinite(value)) return '';
    const rounded = Math.trunc(Math.abs(value));
    return rounded.toLocaleString('de-DE');
  };

  // Sortierfunktion
  const handleSort = (column: 'resonance' | 'level' | 'potency') => {
    if (sortBy === column) {
      // Toggle Reihenfolge
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  // Sortierte Ergebnisse
  const sortedResults = React.useMemo(() => {
    if (!sortBy) return resonanceResults;
    
    const sorted = [...resonanceResults].sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'resonance':
          compareValue = a.resonanceScore - b.resonanceScore;
          break;
        case 'level':
          compareValue = (a.highestLevel || 0) - (b.highestLevel || 0);
          break;
        case 'potency':
          compareValue = a.potency - b.potency;
          break;
      }
      
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });
    
    return sorted;
  }, [resonanceResults, sortBy, sortOrder]);

  const parseImportData = (data: string): string[] => {
    // Auto-detect format: CSV (mit Potenz/Typ) oder TXT (eine Zeile = ein Datensatz)
    // WICHTIG: Ganze Sätze werden als EIN Datensatz behandelt – Kommata in Sätzen werden NICHT getrennt
    const lines = data.trim().split('\n');
    const entries: string[] = [];

    // Helper: Erkennen, ob eine Zeile wie unser CSV-Format aussieht: Wort,Potenz,Typ,(Alphabet?)
    const looksLikeCsvRecord = (line: string) => {
      const parts = line.split(',').map(p => p.trim());
      if (parts.length < 3) return false;
      const potencyNum = parseInt(parts[1], 10);
      const type = (parts[2] || '').toUpperCase();
      const validType = ['D', 'C', 'LM', 'M'].includes(type);
      return !isNaN(potencyNum) && validType;
    };

    // Wenn mindestens eine Zeile nach CSV aussieht, verarbeiten wir NUR zeilenweise CSV, sonst zeilenweise TXT
    const anyCsv = lines.some(l => looksLikeCsvRecord(l));

    for (const raw of lines) {
      const line = raw.trim();
      if (line.length === 0) continue;

      if (anyCsv) {
        // CSV-Modus: jede Zeile ist ein Datensatz (auch wenn sie Kommata enthält)
        entries.push(line);
      } else {
        // TXT-Modus: eine Zeile = ein Datensatz (Sätze bleiben zusammen, Kommata werden NICHT aufgetrennt)
        entries.push(line);
      }
    }

    return [...new Set(entries)]; // Deduplizieren
  };
  const calculateClientRate = (patient: CloudPatient, useImageSig: boolean = true): number => {
    let clientData = `${patient.first_name} ${patient.last_name} ${patient.birth_date} ${patient.birth_place}`;
    
    // Bildsignatur hinzufügen, wenn aktiv und vorhanden
    if (useImageSig && patient.image_signature_active && patient.image_signature) {
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
    
    // Erstelle Rates-Array für den Java-Algorithmus
    const useImgSig = selectedPatient?.image_signature_active ?? false;
    const imgSig = selectedPatient.image_signature ?? undefined;
    
    // Prüfe, ob Datenbank bereits Raten enthält
    let hasAnyExistingRates = false;
    
    const ratesInput = words.map(word => {
      // Prüfe, ob das Wort bereits eine Copen-Rate enthält (Format: "Wort,Rate" oder nur Zahl)
      const parts = word.split(',').map(p => p.trim());
      const hasExistingRate = parts.length >= 2 && !isNaN(Number(parts[1]));
      
      if (hasExistingRate) {
        hasAnyExistingRates = true;
        // Nutze die vorhandene Rate
        const existingRate = Number(parts[1]);
        console.log(`[DB] Nutze vorhandene Rate für "${parts[0]}": ${existingRate}`);
        return {
          name: parts[0],
          copenRate: existingRate,
          hasExistingRate: true
        };
      } else {
        // Berechne neue Copen-Rate (mit D30 als Standard-Potenz)
        const result = calculateCopenRate(word, 30, 'D', 'latin', imgSig, useImgSig);
        return {
          name: word,
          copenRate: result.rate,
          hasExistingRate: false
        };
      }
    });
    
    // Zeige Hinweis wenn Datenbank bereits Raten enthält
    if (hasAnyExistingRates) {
      toast({
        title: "ℹ️ Hinweis",
        description: "Datenbank enthält bereits Raten - diese werden verwendet, keine neue Copen-Rate Berechnung",
      });
    }

    // Führe Resonanzanalyse nach Java-Algorithmus durch (DB-optimiert: alle Einträge, höhere Max-Ergebnisse)
    const analysisConfig = {
      ...DEFAULT_ANALYSIS_CONFIG,
      selectionFraction: 1, // ALLE Einträge analysieren
      minSelection: 1,
      maxSelection: 10000,
      maxEntries: 200,
    } as const;
    const analysisResult = analyzeRates(ratesInput, analysisConfig);
    
    // Konvertiere zu ResonanceResult-Format und berechne Copen Rates mit korrekter Potenz
    const results: ResonanceResult[] = analysisResult.rateObjects.map((rateObj: RateObject) => {
      // Finde den ursprünglichen Input um zu prüfen ob bereits eine Rate existiert
      const originalInput = ratesInput.find(r => r.name === rateObj.rateName);
      const hasExistingRate = originalInput?.hasExistingRate || false;
      
      // Berechne die Copen Rate für dieses Wort mit der ermittelten Potenz NUR wenn keine Rate existiert
      const calculatedRate = hasExistingRate 
        ? { rate: rateObj.copenRate } 
        : calculateCopenRate(
            rateObj.rateName,
            rateObj.potency,
            'D',
            'latin',
            imgSig,
            useImgSig
          );

      // Berechne Level-Resonanz mit dem originalen Algorithmus
      const levelResonance = calculateLevelResonance(calculatedRate.rate, rateObj.rateName);
      const { level: highestLevel, value: highestLevelValue } = findHighestResonanceLevel(levelResonance);
      
      // Resonanz-Score aus energeticValue normalisieren
      const resonanceScore = Math.min(100, Math.round((rateObj.energeticValue / 100) * 100));
      
      // Nutze die dominante Ebene aus der Level-Verteilung (1-12)
      const dominantLevelFromDistribution = rateObj.dominantLevel;
      const dominantLevelPercentage = rateObj.levelDistribution[dominantLevelFromDistribution] || 0;
      
      console.log(`[Result] ${rateObj.rateName}: Potenz=${rateObj.potency}, DominantLevel=${dominantLevelFromDistribution} (${dominantLevelPercentage}%), HasExistingRate=${hasExistingRate}`);
      
      return {
        word: rateObj.rateName,
        potency: rateObj.potency,
        potencyType: 'D' as const,
        rate: calculatedRate.rate,
        resonanceScore,
        clientResonance: clientRate,
        levelResonance,
        highestLevel: dominantLevelFromDistribution, // Nutze dominante Ebene aus Verteilung (1-12)
        highestLevelValue: dominantLevelPercentage, // Zeige Prozent-Wert der dominanten Ebene
      };
    });
    
    setResonanceResults(results);
    setIsAnalyzing(false);
    setSortBy(null); // Reset Sortierung bei neuer Analyse
    
    toast({
      title: "Analyse abgeschlossen",
      description: `${results.length} Einträge analysiert (${analysisResult.numberOfTrials} Durchläufe) - Java-Algorithmus`,
    });

    // LLM-Interpretation im Hintergrund starten (nicht blockierend)
    interpretAnalysisResults(
      results.map(r => ({
        word: r.word,
        resonanceScore: r.resonanceScore,
        highestLevel: r.highestLevel || 1,
        testedPotency: `${r.potencyType}${r.potency}`
      })),
      selectedPatient ? `${selectedPatient.first_name} ${selectedPatient.last_name}` : undefined
    ).then(interp => {
      setInterpretation(interp);
      console.log('✨ LLM Interpretation:', interp);
    }).catch(err => {
      console.error('LLM Interpretation fehlgeschlagen:', err);
      // Fallback ist in der Funktion bereits eingebaut
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

  const exportResults = (format: 'csv' | 'txt' | 'pdf') => {
    if (resonanceResults.length === 0) {
      toast({
        title: "Fehler",
        description: "Keine Ergebnisse zum Exportieren",
        variant: "destructive"
      });
      return;
    }

    if (format === 'pdf') {
      const doc = new jsPDF({ orientation: 'landscape' });
      const title = `Resonanz-Analyse für: ${selectedPatient?.first_name ?? ''} ${selectedPatient?.last_name ?? ''}`.trim();
      doc.setFontSize(12);
      doc.text(title, 14, 14);

      const head = [["Wortenergie", "Potenz", "Copen-Rate", "Resonanz", "Höchste Ebene"]];
      const body = resonanceResults.map(r => [
        r.word,
        `${r.potencyType}${r.potency}`,
        formatRate12(r.rate),
        `${r.resonanceScore}%`,
        r.highestLevel ? `Ebene ${r.highestLevel} (${(r.highestLevelValue ?? 0).toFixed(0)}%)` : '-'
      ]);

      const pageWidth = (doc.internal as any).pageSize.getWidth();
      const margins = { left: 14, right: 14 } as const;
      const usableWidth = pageWidth - margins.left - margins.right;
      const colPotency = 16;
      const colRate = 40;
      const colRes = 20;
      const colLevel = 42;
      const colWord = Math.max(60, usableWidth - (colPotency + colRate + colRes + colLevel));

      autoTable(doc, {
        head,
        body,
        startY: 20,
        styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak', cellWidth: 'wrap' },
        headStyles: { fillColor: [33, 33, 33] },
        margin: margins,
        columnStyles: {
          0: { cellWidth: colWord },
          1: { cellWidth: colPotency },
          2: { cellWidth: colRate, halign: 'right' },
          3: { cellWidth: colRes, halign: 'right' },
          4: { cellWidth: colLevel }
        },
        didDrawPage: () => {
          const pageWidth = (doc.internal as any).pageSize.getWidth();
          const pageHeight = (doc.internal as any).pageSize.getHeight();
          doc.setFontSize(8);
          doc.text(new Date().toLocaleString('de-DE'), margins.left, pageHeight - 8);
          const pageNum = (doc as any).getNumberOfPages?.() || 1;
          const current = (doc as any).internal?.getCurrentPageInfo?.().pageNumber || 1;
          doc.text(`Seite ${current}/${pageNum}` as any, pageWidth - margins.right, pageHeight - 8, { align: 'right' } as any);
        }
      });

      doc.save(`resonanz-analyse-${Date.now()}.pdf`);
      toast({ title: "Export erfolgreich", description: "Ergebnisse als PDF exportiert" });
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
        `${r.word} ${r.potencyType}${r.potency} | Rate: ${formatRate12(r.rate)} | Resonanz: ${r.resonanceScore}%`
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
  
  // Gespeicherte Datenbanken laden/verwalten
  async function loadSavedDatabases() {
    try {
      setLoadingDatabases(true);
      const { data, error } = await supabase
        .from('word_databases')
        .select('id,name,entries')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setSavedDatabases(data || []);
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Fehler', description: e.message });
    } finally {
      setLoadingDatabases(false);
    }
  }

  const handleLoadDatabase = (db: { id: string; name: string; entries: string[] }) => {
    setImportData((db.entries || []).join('\n'));
    setDatabaseName(db.name || '');
    toast({ title: 'Geladen', description: `Datenbank "${db.name}" geladen` });
  };

  const handleDeleteDatabase = async (id: string) => {
    if (!confirm('Datenbank wirklich löschen?')) return;
    try {
      const { error } = await supabase.from('word_databases').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Erfolg', description: 'Datenbank gelöscht' });
      await loadSavedDatabases();
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Fehler', description: e.message });
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
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-3 text-sm">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">💡 Hinweis zur Datenbank-Analyse:</p>
            <ul className="text-blue-800 dark:text-blue-200 space-y-0.5 list-disc list-inside">
              <li>Bei Datenbanken mit bestehenden Zahlenraten wird <strong>keine neue Copen-Rate</strong> berechnet</li>
              <li>Format mit Rate: <code>Wortenergie,12345</code> (Rate wird übernommen)</li>
              <li>Format ohne Rate: <code>Wortenergie</code> (neue Rate wird berechnet)</li>
              <li>Die Analyse zeigt maximal <strong>35 Top-Ergebnisse</strong> nach Resonanz sortiert</li>
            </ul>
          </div>
          
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
            <div className="relative">
              <Textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder="Fügen Sie Ihre Datenbank ein (Wortenergien oder ganze Sätze)&#10;TXT: Eine Zeile = Ein Datensatz&#10;Beispiel:&#10;ARNICA&#10;Chronische Schmerzen im Kopf&#10;BELLADONNA&#10;&#10;CSV: Eine Zeile pro Datensatz im Format Wort,Potenz,Typ,Alphabet"
                className="min-h-32 font-mono text-sm"
              />
              {importData && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setImportData("")}
                  className="absolute top-2 right-2"
                  title="Feld leeren"
                >
                  ×
                </Button>
              )}
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <Label>Gespeicherte Datenbanken</Label>
            <div className="flex gap-2 mb-2">
              <Button size="sm" variant="outline" onClick={loadSavedDatabases}>Aktualisieren</Button>
            </div>
            {loadingDatabases ? (
              <p className="text-sm text-muted-foreground">Lade Datenbanken...</p>
            ) : savedDatabases.length === 0 ? (
              <p className="text-sm text-muted-foreground">Keine Datenbanken gespeichert</p>
            ) : (
              <div className="max-h-40 overflow-y-auto space-y-2">
                {savedDatabases.map((db) => (
                  <div key={db.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium text-sm">{db.name}</p>
                      <p className="text-xs text-muted-foreground">{db.entries?.length || 0} Einträge</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => handleLoadDatabase(db)}>Laden</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteDatabase(db.id)}>Löschen</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

          {interpretation && (
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="h-5 w-5 text-primary" />
                  💡 KI-Interpretation (Hybrid LLM + Algorithmus)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1 text-sm">Zusammenfassung</h4>
                  <p className="text-sm text-muted-foreground">{interpretation.summary}</p>
                </div>
                {interpretation.insights.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Erkenntnisse</h4>
                    <ul className="text-sm text-muted-foreground space-y-0.5">
                      {interpretation.insights.map((insight, i) => (
                        <li key={i}>• {insight}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {interpretation.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Empfehlungen</h4>
                    <ul className="text-sm text-muted-foreground space-y-0.5">
                      {interpretation.recommendations.map((rec, i) => (
                        <li key={i}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

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
                <Button onClick={() => exportResults('pdf')} variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  PDF Export
                </Button>
                <Button
                  onClick={() => { 
                    setResonanceResults([]); 
                    setInterpretation(null);
                    setSelectedForHarmonization(new Set());
                    toast({ title: 'Gelöscht', description: 'Alle Analyse-Ergebnisse wurden entfernt' }); 
                  }}
                  variant="destructive"
                  size="sm"
                >
                  Alle löschen
                </Button>
                {selectedForHarmonization.size > 0 && (
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Zur Harmonisierung übergeben",
                        description: `${selectedForHarmonization.size} Einträge werden vorbereitet`,
                      });
                      // TODO: Integration mit Harmonisierung
                    }}
                    size="sm"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Zur Harmonisierung ({selectedForHarmonization.size})
                  </Button>
                )}
              </div>

              <div className="border rounded-lg max-h-96 overflow-y-auto overflow-x-auto">
                <table className="w-full text-sm table-auto">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="p-0 text-center align-top" style={{ width: 50, minWidth: 50 }}>
                        <div className="p-2 flex items-center justify-center">
                          <Checkbox
                            checked={selectedForHarmonization.size === sortedResults.length && sortedResults.length > 0}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedForHarmonization(new Set(sortedResults.map(r => r.word)));
                              } else {
                                setSelectedForHarmonization(new Set());
                              }
                            }}
                          />
                        </div>
                      </th>
                      <th className="p-0 text-left align-top" style={{ width: columnSizes.word, minWidth: columnSizes.word }}>
                        <div className="p-2 relative">
                          Wortenergie
                          <span
                            onMouseDown={(e) => startResize('word', e)}
                            className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-primary/30 active:bg-primary/50"
                          />
                        </div>
                      </th>
                      <th className="p-0 text-left align-top" style={{ width: columnSizes.potency, minWidth: columnSizes.potency }}>
                        <div className="p-2 relative cursor-pointer hover:bg-muted-foreground/10 whitespace-nowrap" onClick={() => handleSort('potency')}>
                          Potenz {sortBy === 'potency' && (sortOrder === 'asc' ? '↑' : '↓')}
                          <span
                            onMouseDown={(e) => { e.stopPropagation(); startResize('potency', e); }}
                            className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-primary/30 active:bg-primary/50"
                          />
                        </div>
                      </th>
                      <th className="p-0 text-right align-top" style={{ width: columnSizes.rate, minWidth: columnSizes.rate }}>
                        <div className="p-2 relative whitespace-nowrap">
                          Copen-Rate
                          <span
                            onMouseDown={(e) => startResize('rate', e)}
                            className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-primary/30 active:bg-primary/50"
                          />
                        </div>
                      </th>
                      <th className="p-0 text-right align-top" style={{ width: columnSizes.resonance, minWidth: columnSizes.resonance }}>
                        <div className="p-2 relative cursor-pointer hover:bg-muted-foreground/10 whitespace-nowrap" onClick={() => handleSort('resonance')}>
                          Resonanz {sortBy === 'resonance' && (sortOrder === 'asc' ? '↑' : '↓')}
                          <span
                            onMouseDown={(e) => { e.stopPropagation(); startResize('resonance', e); }}
                            className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-primary/30 active:bg-primary/50"
                          />
                        </div>
                      </th>
                      <th className="p-0 text-left align-top" style={{ width: columnSizes.level, minWidth: columnSizes.level }}>
                        <div className="p-2 relative cursor-pointer hover:bg-muted-foreground/10 whitespace-nowrap" onClick={() => handleSort('level')}>
                          Höchste Ebene {sortBy === 'level' && (sortOrder === 'asc' ? '↑' : '↓')}
                          <span
                            onMouseDown={(e) => { e.stopPropagation(); startResize('level', e); }}
                            className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-primary/30 active:bg-primary/50"
                          />
                        </div>
                      </th>
                      <th className="p-0 text-right align-top" style={{ width: columnSizes.actions, minWidth: columnSizes.actions }}>
                        <div className="p-2 relative whitespace-nowrap">
                          Aktionen
                          <span
                            onMouseDown={(e) => startResize('actions', e)}
                            className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-primary/30 active:bg-primary/50"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedResults.slice(0, 200).map((result, index) => (
                      <tr key={index} className={`border-b ${
                        result.resonanceScore >= 80 ? 'bg-green-50' :
                        result.resonanceScore >= 60 ? 'bg-yellow-50' :
                        ''
                      }`}>
                        <td className="p-2 text-center" style={{ width: 50, minWidth: 50 }}>
                          <Checkbox
                            checked={selectedForHarmonization.has(result.word)}
                            onCheckedChange={(checked) => {
                              const newSelected = new Set(selectedForHarmonization);
                              if (checked) {
                                newSelected.add(result.word);
                              } else {
                                newSelected.delete(result.word);
                              }
                              setSelectedForHarmonization(newSelected);
                            }}
                          />
                        </td>
                        <td className="p-2 font-medium whitespace-normal break-words" style={{ width: columnSizes.word, minWidth: columnSizes.word }}>{result.word}</td>
                        <td className="p-2 whitespace-nowrap" style={{ width: columnSizes.potency, minWidth: columnSizes.potency }}>{result.potencyType}{result.potency}</td>
                        <td className="p-2 text-right font-mono whitespace-nowrap" style={{ width: columnSizes.rate, minWidth: columnSizes.rate }}>
                          {formatRate12(result.rate)}
                        </td>
                        <td className="p-2 text-right" style={{ width: columnSizes.resonance, minWidth: columnSizes.resonance }}>
                          <span className={`font-bold ${
                            result.resonanceScore >= 80 ? 'text-green-600' :
                            result.resonanceScore >= 60 ? 'text-yellow-600' :
                            'text-gray-600'
                          }`}>
                            {result.resonanceScore}%
                          </span>
                        </td>
                        <td className="p-2 text-xs" style={{ width: columnSizes.level, minWidth: columnSizes.level }}>
                          {result.highestLevel && (
                            <span className="text-primary font-semibold">
                              Ebene {result.highestLevel} ({result.highestLevelValue?.toFixed(0)}%)
                            </span>
                          )}
                        </td>
                        <td className="p-2 text-right" style={{ width: columnSizes.actions, minWidth: columnSizes.actions }}>
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
              
              {resonanceResults.length > 200 && (
                <p className="text-sm text-muted-foreground text-center">
                  Zeige Top 200 von {resonanceResults.length} Ergebnissen. Exportieren Sie für alle Ergebnisse.
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
