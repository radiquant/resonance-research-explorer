import { useState, useCallback, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Loader2, 
  ListChecks, 
  Zap, 
  ArrowUpDown, 
  Layers, 
  Sparkles,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  X,
  Archive,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Save,
  History,
  Target,
  Atom,
  Info,
  Play,
  Square,
  Trash2,
  Timer,
  Activity,
  Heart,
  Gauge,
  MapPin
} from 'lucide-react';
import { calculateCopenRate } from '@/utils/copenRateGenerator';
import { calculateLevelResonance, LEVELS, LEVELS_DISPLAY, findHighestResonanceLevel, getLevelDisplayName } from '@/utils/levelResonance';
import { calculateFokusResonanz, FOKUS_OPTIONS } from '@/utils/quantumFocusAlgorithm';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { KlientenFeldErgebnis } from '@/utils/clientFieldAlgorithms';
import { MERIDIANS, getAllMeridianPointsFlat, getTotalPointCount, getMeridianStats } from '@/utils/meridianPointsDatabase';

interface WordEnergyTestResult {
  word: string;
  copenRate: number;
  resonanz: number;
  resonanzBasis: number;
  fokusKorrelation: number;
  interferenzMuster: 'konstruktiv' | 'destruktiv' | 'neutral';
  intensität: number;
  polarität: 'positiv' | 'negativ' | 'neutral';
  polaritätWert: number;
  dominanteEbene: number;
  dominanteEbeneWert: number;
  ebenVerteilung: Record<string, number>;
  // Kohärente Harmonisierung Felder
  harmonisierungsWort: string;
  harmonisierungsRate: number;
}

interface ArchivedTest {
  id: string;
  created_at: string;
  total_words: number;
  average_resonance: number;
  top_items: WordEnergyTestResult[];
  results: WordEnergyTestResult[];
}

interface TrendItem {
  word: string;
  currentResonance: number;
  previousResonance: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  occurrences: number;
  // Erweiterte Trend-Daten
  currentIntensity?: number;
  currentPolarity?: number;
  currentLevel?: number;
  previousIntensity?: number;
  previousPolarity?: number;
  previousLevel?: number;
  fokusKorrelation?: number;
}

interface CategoryTrends {
  resonanzFokus: TrendItem[];
  intensität: TrendItem[];
  polarität: TrendItem[];
  ebenen: TrendItem[];
}

interface HarmonizationState {
  isActive: boolean;
  isPaused: boolean;
  selectedItems: WordEnergyTestResult[];
  pulseDuration: number; // Sekunden
  pauseDuration: number; // Sekunden
  maxDuration: number; // Minuten
  elapsedSeconds: number;
  currentItemIndex: number;
  inPulsePhase: boolean;
}

type SortField = 'word' | 'resonanz' | 'intensität' | 'polaritätWert' | 'dominanteEbene' | 'copenRate';
type SortDirection = 'asc' | 'desc';
type PolaritätFilter = 'alle' | 'positiv' | 'negativ' | 'neutral';
type TestMode = 'parallel' | 'sequentiell';

interface WordEnergyTesterProps {
  clientResult: KlientenFeldErgebnis | null;
  clientName: string;
  patientId?: string;
}

const WordEnergyTester = ({ clientResult, clientName, patientId }: WordEnergyTesterProps) => {
  const { toast } = useToast();
  const [wordInput, setWordInput] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [results, setResults] = useState<WordEnergyTestResult[]>([]);
  const [testMode, setTestMode] = useState<TestMode>('parallel');
  
  // Fokus-State (Quanteninspirierter Algorithmus)
  const [selectedFokus, setSelectedFokus] = useState<string | null>(null);
  const [customFokus, setCustomFokus] = useState('');
  const [fokusGewichtung, setFokusGewichtung] = useState(15); // 15% Standard
  
  // Archiv & Trend State
  const [archivedTests, setArchivedTests] = useState<ArchivedTest[]>([]);
  const [trendItems, setTrendItems] = useState<TrendItem[]>([]);
  const [categoryTrends, setCategoryTrends] = useState<CategoryTrends>({
    resonanzFokus: [],
    intensität: [],
    polarität: [],
    ebenen: []
  });
  const [activeTrendCategory, setActiveTrendCategory] = useState<'resonanzFokus' | 'intensität' | 'polarität' | 'ebenen'>('resonanzFokus');
  const [isLoadingArchive, setIsLoadingArchive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('test');

  // Harmonization State
  const [harmonization, setHarmonization] = useState<HarmonizationState>({
    isActive: false,
    isPaused: false,
    selectedItems: [],
    pulseDuration: 5,
    pauseDuration: 3,
    maxDuration: 30,
    elapsedSeconds: 0,
    currentItemIndex: 0,
    inPulsePhase: true
  });
  const [showHarmonization, setShowHarmonization] = useState(false);
  const [harmonizationItemCount, setHarmonizationItemCount] = useState<21 | 42 | 63>(21);
  const harmonizationIntervalRef = useState<NodeJS.Timeout | null>(null);
  
  // Sortier- und Filter-State
  const [sortField, setSortField] = useState<SortField>('resonanz');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [polaritätFilter, setPolaritätFilter] = useState<PolaritätFilter>('alle');
  const [minResonanz, setMinResonanz] = useState<number>(0);
  const [ebeneFilter, setEbeneFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Effektiver Fokus (Kategorie oder Custom Keywords)
  const effectiveFokus = useMemo(() => {
    if (customFokus.trim()) return customFokus.trim();
    return selectedFokus;
  }, [selectedFokus, customFokus]);

  // Load archived tests when patient changes
  useEffect(() => {
    if (patientId) {
      loadArchivedTests();
    }
  }, [patientId]);

  const loadArchivedTests = async () => {
    if (!patientId) return;
    
    setIsLoadingArchive(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('word_energy_archives')
        .select('*')
        .eq('patient_id', patientId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      const archives: ArchivedTest[] = (data || []).map(d => ({
        id: d.id,
        created_at: d.created_at,
        total_words: d.total_words,
        average_resonance: Number(d.average_resonance) || 0,
        top_items: (d.top_items as unknown as WordEnergyTestResult[]) || [],
        results: (d.results as unknown as WordEnergyTestResult[]) || []
      }));

      setArchivedTests(archives);
      calculateTrends(archives);
    } catch (error) {
      console.error('Error loading archives:', error);
    } finally {
      setIsLoadingArchive(false);
    }
  };

  const calculateTrends = (archives: ArchivedTest[]) => {
    if (archives.length < 2) {
      setTrendItems([]);
      setCategoryTrends({ resonanzFokus: [], intensität: [], polarität: [], ebenen: [] });
      return;
    }

    const wordMap = new Map<string, { 
      resonances: number[], 
      intensities: number[], 
      polarities: number[], 
      levels: number[],
      fokusKorrelations: number[],
      occurrences: number 
    }>();

    // Collect all word occurrences across tests
    archives.forEach(archive => {
      archive.results.forEach(result => {
        const existing = wordMap.get(result.word) || { 
          resonances: [], 
          intensities: [], 
          polarities: [], 
          levels: [],
          fokusKorrelations: [],
          occurrences: 0 
        };
        existing.resonances.push(result.resonanz);
        existing.intensities.push(result.intensität);
        existing.polarities.push(result.polaritätWert);
        existing.levels.push(result.dominanteEbene);
        existing.fokusKorrelations.push(result.fokusKorrelation || 0);
        existing.occurrences++;
        wordMap.set(result.word, existing);
      });
    });

    // Calculate trends for items appearing more than once
    const allTrends: TrendItem[] = [];
    wordMap.forEach((data, word) => {
      if (data.occurrences >= 2) {
        const currentResonance = data.resonances[0];
        const previousResonance = data.resonances[1];
        const trendValue = currentResonance - previousResonance;
        
        let trend: 'up' | 'down' | 'stable' = 'stable';
        if (trendValue > 5) trend = 'up';
        else if (trendValue < -5) trend = 'down';

        allTrends.push({
          word,
          currentResonance,
          previousResonance,
          trend,
          trendValue,
          occurrences: data.occurrences,
          currentIntensity: data.intensities[0],
          previousIntensity: data.intensities[1],
          currentPolarity: data.polarities[0],
          previousPolarity: data.polarities[1],
          currentLevel: data.levels[0],
          previousLevel: data.levels[1],
          fokusKorrelation: data.fokusKorrelations[0]
        });
      }
    });

    // Kategorisierte Trends
    const resonanzFokus = [...allTrends]
      .sort((a, b) => Math.abs(b.trendValue) - Math.abs(a.trendValue))
      .slice(0, 15);

    const intensität = [...allTrends]
      .sort((a, b) => Math.abs((b.currentIntensity || 0) - (b.previousIntensity || 0)) - 
                       Math.abs((a.currentIntensity || 0) - (a.previousIntensity || 0)))
      .slice(0, 15);

    const polarität = [...allTrends]
      .sort((a, b) => Math.abs((b.currentPolarity || 0) - (b.previousPolarity || 0)) - 
                       Math.abs((a.currentPolarity || 0) - (a.previousPolarity || 0)))
      .slice(0, 15);

    const ebenen = [...allTrends]
      .filter(t => t.currentLevel !== t.previousLevel)
      .sort((a, b) => Math.abs((b.currentLevel || 0) - (b.previousLevel || 0)) - 
                       Math.abs((a.currentLevel || 0) - (a.previousLevel || 0)))
      .slice(0, 15);

    setCategoryTrends({ resonanzFokus, intensität, polarität, ebenen });
    setTrendItems(resonanzFokus);
  };

  // Gefilterte und sortierte Ergebnisse
  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...results];
    
    if (polaritätFilter !== 'alle') {
      filtered = filtered.filter(r => r.polarität === polaritätFilter);
    }
    
    if (minResonanz > 0) {
      filtered = filtered.filter(r => r.resonanz >= minResonanz);
    }
    
    if (ebeneFilter !== null) {
      filtered = filtered.filter(r => r.dominanteEbene === ebeneFilter);
    }
    
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'word':
          comparison = a.word.localeCompare(b.word);
          break;
        case 'resonanz':
          comparison = a.resonanz - b.resonanz;
          break;
        case 'intensität':
          comparison = a.intensität - b.intensität;
          break;
        case 'polaritätWert':
          comparison = a.polaritätWert - b.polaritätWert;
          break;
        case 'dominanteEbene':
          comparison = a.dominanteEbene - b.dominanteEbene;
          break;
        case 'copenRate':
          comparison = a.copenRate - b.copenRate;
          break;
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });
    
    return filtered;
  }, [results, sortField, sortDirection, polaritätFilter, minResonanz, ebeneFilter]);

  const resetFilters = () => {
    setPolaritätFilter('alle');
    setMinResonanz(0);
    setEbeneFilter(null);
  };

  const hasActiveFilters = polaritätFilter !== 'alle' || minResonanz > 0 || ebeneFilter !== null;

  const parseWords = (input: string): string[] => {
    return input
      .split('\n')
      .map(w => w.trim())
      .filter(w => w.length > 0);
  };

  const calculateResonanz = (copenRate: number, clientWellenfunktion: number): number => {
    const ratio = copenRate / (clientWellenfunktion || 1);
    const normalized = Math.abs(1 - (ratio % 1));
    return Math.min(100, normalized * 100 + (Math.random() * 15));
  };

  const calculateIntensität = (copenRate: number, resonanz: number): number => {
    const rateStrength = Math.min(100, Math.log10(copenRate) * 15);
    return Math.min(100, (rateStrength * 0.6) + (resonanz * 0.4));
  };

  const calculatePolarität = (word: string, copenRate: number): { typ: 'positiv' | 'negativ' | 'neutral', wert: number } => {
    const letterSum = word.toUpperCase().split('').reduce((sum, ch) => {
      if (ch >= 'A' && ch <= 'Z') return sum + (ch.charCodeAt(0) - 64);
      return sum;
    }, 0);
    
    const polaritätRaw = ((copenRate * letterSum) % 200) - 100;
    const polaritätWert = polaritätRaw / 100;
    
    if (polaritätWert > 0.15) return { typ: 'positiv', wert: polaritätWert };
    if (polaritätWert < -0.15) return { typ: 'negativ', wert: polaritätWert };
    return { typ: 'neutral', wert: polaritätWert };
  };

  const testWordEnergy = useCallback((word: string, clientWellenfunktion: number): WordEnergyTestResult => {
    const rateResult = calculateCopenRate(word, 0, 'D', 'latin');
    const copenRate = rateResult.rate;
    const ebenVerteilung = calculateLevelResonance(copenRate, word);
    const { level: dominanteEbene, value: dominanteEbeneWert } = findHighestResonanceLevel(ebenVerteilung);
    const resonanzBasis = calculateResonanz(copenRate, clientWellenfunktion);
    
    // Quanteninspirierte Fokus-Resonanz berechnen
    const fokusResult = calculateFokusResonanz(
      word,
      resonanzBasis,
      effectiveFokus,
      clientWellenfunktion,
      fokusGewichtung / 100 // Umrechnung von Prozent
    );
    
    const intensität = calculateIntensität(copenRate, fokusResult.kombinierteResonanz);
    const { typ: polarität, wert: polaritätWert } = calculatePolarität(word, copenRate);
    
    // Kohärente Harmonisierung: Präfix + Wort für Harmonisierungsrate
    const harmonisierungsWort = `Kohärente Harmonisierung ${word}`;
    const harmonisierungsRateResult = calculateCopenRate(harmonisierungsWort, 0, 'D', 'latin');
    const harmonisierungsRate = harmonisierungsRateResult.rate;
    
    return {
      word,
      copenRate,
      resonanz: fokusResult.kombinierteResonanz,
      resonanzBasis: fokusResult.baseResonanz,
      fokusKorrelation: fokusResult.fokusKorrelation,
      interferenzMuster: fokusResult.interferenzMuster,
      intensität: Math.round(intensität * 10) / 10,
      polarität,
      polaritätWert: Math.round(polaritätWert * 100) / 100,
      dominanteEbene,
      dominanteEbeneWert: Math.round(dominanteEbeneWert * 10) / 10,
      ebenVerteilung,
      harmonisierungsWort,
      harmonisierungsRate
    };
  }, [effectiveFokus, fokusGewichtung]);

  // PARALLEL TESTING - alle Wörter gleichzeitig
  const handleParallelTest = useCallback(async () => {
    const words = parseWords(wordInput);
    if (words.length === 0) return;

    setIsTesting(true);
    setResults([]);
    setTotalWords(words.length);
    setCurrentWordIndex(0);

    const clientWellenfunktion = clientResult?.klientenWellenfunktion || 1;

    // Kleine Verzögerung für UI-Update
    await new Promise(resolve => setTimeout(resolve, 50));

    // Alle Wörter parallel berechnen
    const allResults = words.map(word => testWordEnergy(word, clientWellenfunktion));
    
    setResults(allResults);
    setCurrentWordIndex(words.length);
    setIsTesting(false);

    toast({
      title: "Parallele Analyse abgeschlossen",
      description: `${allResults.length} Wortenergien in < 1 Sekunde getestet`,
    });
  }, [wordInput, clientResult, testWordEnergy, toast]);

  // SEQUENTIELL TESTING - mit visueller Sequenz
  const handleSequentialTest = async () => {
    const words = parseWords(wordInput);
    if (words.length === 0) return;

    setIsTesting(true);
    setResults([]);
    setCurrentWordIndex(0);
    setTotalWords(words.length);

    const clientWellenfunktion = clientResult?.klientenWellenfunktion || 1;
    const newResults: WordEnergyTestResult[] = [];

    for (let i = 0; i < words.length; i++) {
      setCurrentWordIndex(i + 1);
      await new Promise(resolve => setTimeout(resolve, 50)); // Reduziert von 150ms auf 50ms
      
      const result = testWordEnergy(words[i], clientWellenfunktion);
      newResults.push(result);
      setResults([...newResults]);
    }

    setIsTesting(false);
    toast({
      title: "Sequentielle Analyse abgeschlossen",
      description: `${newResults.length} Wortenergien getestet`,
    });
  };

  const handleStartTest = () => {
    if (testMode === 'parallel') {
      handleParallelTest();
    } else {
      handleSequentialTest();
    }
  };

  // ARCHIVIEREN
  const handleSaveToArchive = async () => {
    if (results.length === 0 || !patientId) {
      toast({
        title: "Speichern nicht möglich",
        description: "Keine Ergebnisse oder kein Klient verknüpft",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Nicht authentifiziert');

      const avgResonance = results.reduce((sum, r) => sum + r.resonanz, 0) / results.length;
      const topItems = [...results].sort((a, b) => b.resonanz - a.resonanz).slice(0, 5);

      const { error } = await supabase
        .from('word_energy_archives')
        .insert([{
          user_id: user.id,
          patient_id: patientId,
          client_name: clientName,
          client_wellenfunktion: clientResult?.klientenWellenfunktion || 0,
          results: JSON.parse(JSON.stringify(results)),
          total_words: results.length,
          average_resonance: avgResonance,
          top_items: JSON.parse(JSON.stringify(topItems))
        }]);

      if (error) throw error;

      toast({
        title: "Archiviert",
        description: `${results.length} Wortenergien für ${clientName} gespeichert`,
      });

      await loadArchivedTests();
    } catch (error) {
      console.error('Error saving archive:', error);
      toast({
        title: "Fehler beim Speichern",
        description: "Archivierung fehlgeschlagen",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const loadArchivedResult = (archive: ArchivedTest) => {
    setResults(archive.results);
    setActiveTab('test');
    toast({
      title: "Archiv geladen",
      description: `${archive.total_words} Ergebnisse vom ${new Date(archive.created_at).toLocaleDateString('de-DE')}`,
    });
  };

  const exportToCSV = () => {
    if (results.length === 0) return;
    
    const headers = 'Wortenergie,Copen-Rate,Resonanz %,Intensität %,Polarität,Polarität-Wert,Dominante Ebene,Ebene-Wert %\n';
    const rows = results.map(r => 
      `"${r.word}",${r.copenRate},${r.resonanz},${r.intensität},${r.polarität},${r.polaritätWert},${getLevelDisplayName(r.dominanteEbene)},${r.dominanteEbeneWert}`
    ).join('\n');
    
    const csv = headers + rows;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wortenergie-test-${clientName || 'klient'}-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getPolaritätColor = (polarität: 'positiv' | 'negativ' | 'neutral') => {
    switch (polarität) {
      case 'positiv': return 'bg-green-500';
      case 'negativ': return 'bg-red-500';
      case 'neutral': return 'bg-gray-500';
    }
  };

  const getResonanzColor = (resonanz: number) => {
    if (resonanz >= 80) return 'text-green-500';
    if (resonanz >= 60) return 'text-emerald-500';
    if (resonanz >= 40) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  // Harmonisierung starten
  const startHarmonization = () => {
    const topItems = [...filteredAndSortedResults].slice(0, harmonizationItemCount);
    if (topItems.length === 0) {
      toast({
        title: "Keine Items",
        description: "Keine Ergebnisse zum Harmonisieren vorhanden",
        variant: "destructive"
      });
      return;
    }
    
    setHarmonization(prev => ({
      ...prev,
      isActive: true,
      isPaused: false,
      selectedItems: topItems,
      elapsedSeconds: 0,
      currentItemIndex: 0,
      inPulsePhase: true
    }));
    
    toast({
      title: "Harmonisierung gestartet",
      description: `${topItems.length} Items werden harmonisiert`,
    });
  };

  // Harmonisierung stoppen
  const stopHarmonization = () => {
    setHarmonization(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  };

  // Harmonisierung löschen/abbrechen
  const cancelHarmonization = () => {
    setHarmonization({
      isActive: false,
      isPaused: false,
      selectedItems: [],
      pulseDuration: harmonization.pulseDuration,
      pauseDuration: harmonization.pauseDuration,
      maxDuration: harmonization.maxDuration,
      elapsedSeconds: 0,
      currentItemIndex: 0,
      inPulsePhase: true
    });
    toast({
      title: "Harmonisierung beendet",
      description: "Der Prozess wurde abgebrochen",
    });
  };

  // Harmonisierungs-Timer
  useEffect(() => {
    if (!harmonization.isActive || harmonization.isPaused) return;
    
    const interval = setInterval(() => {
      setHarmonization(prev => {
        const newElapsed = prev.elapsedSeconds + 1;
        const maxSeconds = prev.maxDuration * 60;
        
        // Max Zeit erreicht?
        if (newElapsed >= maxSeconds) {
          toast({
            title: "Harmonisierung abgeschlossen",
            description: `${prev.selectedItems.length} Items in ${prev.maxDuration} Minuten harmonisiert`,
          });
          return {
            ...prev,
            isActive: false,
            elapsedSeconds: maxSeconds
          };
        }
        
        // Impuls/Pause Phasen berechnen
        const cycleLength = prev.pulseDuration + prev.pauseDuration;
        const cyclePosition = newElapsed % cycleLength;
        const inPulse = cyclePosition < prev.pulseDuration;
        
        // Aktuelles Item Index basierend auf Zeit
        const itemCycleTime = cycleLength * 3; // Jedes Item 3 Zyklen
        const newItemIndex = Math.floor(newElapsed / itemCycleTime) % prev.selectedItems.length;
        
        return {
          ...prev,
          elapsedSeconds: newElapsed,
          inPulsePhase: inPulse,
          currentItemIndex: newItemIndex
        };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [harmonization.isActive, harmonization.isPaused, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="border-primary/20 mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="w-6 h-6 text-primary" />
          Wortenergie-Abtestung
        </CardTitle>
        <CardDescription>
          Analyse von Wortenergien im Bezug zum Klienten 
          {clientName && <span className="font-medium text-primary ml-1">({clientName})</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!clientResult && (
          <div className="text-center py-6 text-muted-foreground bg-muted/30 rounded-lg">
            <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Bitte zuerst eine Klienten-Feldanalyse durchführen</p>
          </div>
        )}

        {clientResult && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="test" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Test
              </TabsTrigger>
              <TabsTrigger value="archiv" className="flex items-center gap-2">
                <Archive className="w-4 h-4" />
                Archiv ({archivedTests.length})
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trends ({trendItems.length})
              </TabsTrigger>
            </TabsList>

            {/* TEST TAB */}
            <TabsContent value="test" className="space-y-4">
              {/* Test Mode Toggle */}
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Label htmlFor="testMode" className="text-sm">Test-Modus:</Label>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${testMode === 'sequentiell' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                      Sequentiell
                    </span>
                    <Switch
                      id="testMode"
                      checked={testMode === 'parallel'}
                      onCheckedChange={(checked) => setTestMode(checked ? 'parallel' : 'sequentiell')}
                    />
                    <span className={`text-xs ${testMode === 'parallel' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                      Parallel ⚡
                    </span>
                  </div>
                </div>
                <Badge variant={testMode === 'parallel' ? 'default' : 'secondary'}>
                  {testMode === 'parallel' ? '< 1s' : '~' + (parseWords(wordInput).length * 0.05).toFixed(1) + 's'}
                </Badge>
              </div>

              {/* Fokus-Auswahl (Quanteninspiriert) */}
              <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-primary" />
                    <Label className="font-medium">Symptom-Fokus</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">
                            <strong>Quanteninspirierter Algorithmus:</strong> Nutzt Grover-ähnliche Amplitude-Amplifikation 
                            für sanfte Priorisierung symptomrelevanter Wortenergien ohne die Klientenfeld-Präzision zu stören.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {effectiveFokus && (
                      <Badge variant="secondary" className="ml-auto flex items-center gap-1">
                        <Atom className="w-3 h-3" />
                        Aktiv: {fokusGewichtung}%
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Kategorie</Label>
                      <Select 
                        value={selectedFokus ?? undefined}
                        onValueChange={(v) => {
                          if (v === '__none__') {
                            setSelectedFokus(null);
                            setCustomFokus('');
                            return;
                          }
                          setSelectedFokus(v);
                          setCustomFokus('');
                        }}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Fokus wählen..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">Kein Fokus</SelectItem>
                          {FOKUS_OPTIONS.map(f => (
                            <SelectItem key={f} value={f}>{f}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Oder: Custom Keywords</Label>
                      <Input
                        placeholder="herz, rhythmus, blut..."
                        value={customFokus}
                        onChange={(e) => {
                          setCustomFokus(e.target.value);
                          if (e.target.value) setSelectedFokus(null);
                        }}
                        className="h-9 text-sm"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Gewichtung: {fokusGewichtung}%</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={5}
                          max={30}
                          value={fokusGewichtung}
                          onChange={(e) => setFokusGewichtung(Number(e.target.value))}
                          className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <span className="text-xs text-muted-foreground w-8">{fokusGewichtung}%</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Empfohlen: 10-20%</p>
                    </div>
                  </div>
                  
                  {effectiveFokus && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <Atom className="w-3 h-3" />
                        Fokus-Korrelation verstärkt symptomrelevante Ergebnisse durch Interferenzmuster-Analyse
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Input Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="wordList" className="flex items-center gap-2">
                    <ListChecks className="w-4 h-4" />
                    Wortenergien (eine pro Zeile)
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const points = getAllMeridianPointsFlat();
                      setWordInput(points.join('\n'));
                      toast({
                        title: "Meridianpunkte geladen",
                        description: `${points.length} Akupunkturpunkte aus ${MERIDIANS.length} Meridianen bereit zur Analyse`,
                      });
                    }}
                    disabled={isTesting}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Alle Meridianpunkte laden ({getTotalPointCount()})
                  </Button>
                </div>
                <Textarea
                  id="wordList"
                  placeholder={"Arnica\nBelladonna\nCalcarea carbonica\nLycopodium\n..."}
                  value={wordInput}
                  onChange={(e) => setWordInput(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                  disabled={isTesting}
                />
                <p className="text-xs text-muted-foreground">
                  Erkannte Wortenergien: {parseWords(wordInput).length}
                </p>
              </div>

              {/* Progress */}
              {isTesting && testMode === 'sequentiell' && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      <span className="text-sm font-medium">
                        Teste: {currentWordIndex} / {totalWords}
                      </span>
                    </div>
                    <Progress value={(currentWordIndex / totalWords) * 100} className="h-2" />
                  </CardContent>
                </Card>
              )}

              {isTesting && testMode === 'parallel' && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      <span className="text-sm font-medium">
                        Parallele Berechnung von {totalWords} Wortenergien...
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Start Button */}
              <Button
                onClick={handleStartTest}
                disabled={isTesting || parseWords(wordInput).length === 0}
                className="w-full"
                size="lg"
              >
                {isTesting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {testMode === 'parallel' ? 'Berechne parallel...' : 'Teste sequentiell...'}
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    {testMode === 'parallel' ? 'Parallel testen ⚡' : 'Sequentiell testen'}
                  </>
                )}
              </Button>

              {/* Results */}
              {results.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Layers className="w-5 h-5 text-primary" />
                      Testergebnisse ({filteredAndSortedResults.length}
                      {filteredAndSortedResults.length !== results.length && ` von ${results.length}`})
                    </h4>
                    <div className="flex items-center gap-2">
                      {patientId && (
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={handleSaveToArchive}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4 mr-2" />
                          )}
                          Archivieren
                        </Button>
                      )}
                      <Button 
                        variant={showFilters ? "secondary" : "outline"} 
                        size="sm" 
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                        {hasActiveFilters && (
                          <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 justify-center text-[10px]">
                            !
                          </Badge>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" onClick={exportToCSV}>
                        <Download className="w-4 h-4 mr-2" />
                        CSV
                      </Button>
                    </div>
                  </div>

                  {/* Filter & Sort Controls */}
                  {showFilters && (
                    <Card className="bg-muted/30 border-primary/10">
                      <CardContent className="pt-4 space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Sortieren nach</Label>
                            <Select value={sortField} onValueChange={(v) => setSortField(v as SortField)}>
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="resonanz">Resonanz</SelectItem>
                                <SelectItem value="intensität">Intensität</SelectItem>
                                <SelectItem value="polaritätWert">Polarität</SelectItem>
                                <SelectItem value="dominanteEbene">Ebene</SelectItem>
                                <SelectItem value="copenRate">Copen-Rate</SelectItem>
                                <SelectItem value="word">Wort (A-Z)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs">Richtung</Label>
                            <Button 
                              variant="outline" 
                              className="w-full h-9 justify-start"
                              onClick={() => setSortDirection(d => d === 'asc' ? 'desc' : 'asc')}
                            >
                              {sortDirection === 'desc' ? (
                                <><ArrowDown className="w-4 h-4 mr-2" />Absteigend</>
                              ) : (
                                <><ArrowUp className="w-4 h-4 mr-2" />Aufsteigend</>
                              )}
                            </Button>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs">Polarität</Label>
                            <Select value={polaritätFilter} onValueChange={(v) => setPolaritätFilter(v as PolaritätFilter)}>
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="alle">Alle</SelectItem>
                                <SelectItem value="positiv">+ Positiv</SelectItem>
                                <SelectItem value="neutral">○ Neutral</SelectItem>
                                <SelectItem value="negativ">− Negativ</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs">Min. Resonanz %</Label>
                            <Input 
                              type="number" 
                              min={0} 
                              max={100} 
                              value={minResonanz}
                              onChange={(e) => setMinResonanz(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
                              className="h-9"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Dominante Ebene filtern</Label>
                          <div className="flex flex-wrap gap-1">
                            <Button
                              variant={ebeneFilter === null ? "default" : "outline"}
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => setEbeneFilter(null)}
                            >
                              Alle
                            </Button>
                            {LEVELS_DISPLAY.map(level => (
                              <Button
                                key={level.id}
                                variant={ebeneFilter === level.id ? "default" : "outline"}
                                size="sm"
                                className="h-7 text-xs px-2"
                                onClick={() => setEbeneFilter(level.id)}
                              >
                                {level.id}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {hasActiveFilters && (
                          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
                            <X className="w-4 h-4 mr-1" />
                            Filter zurücksetzen
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  <ScrollArea className="h-[400px] rounded-md border">
                    <div className="p-4 space-y-3">
                      {filteredAndSortedResults.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>Keine Ergebnisse mit aktuellen Filtern</p>
                        </div>
                      ) : (
                        filteredAndSortedResults.map((result, idx) => (
                        <Card key={idx} className="bg-muted/20 hover:bg-muted/30 transition-colors">
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h5 className="font-semibold text-base">{result.word}</h5>
                                <p className="text-xs text-muted-foreground">
                                  Copen-Rate: {result.copenRate.toLocaleString()}
                                </p>
                                {result.harmonisierungsRate !== undefined && (
                                  <p className="text-xs text-primary font-medium mt-1">
                                    Harmonisierung: {result.harmonisierungsRate.toLocaleString()}
                                  </p>
                                )}
                              </div>
                              <Badge className={`${getPolaritätColor(result.polarität)} text-white`}>
                                {result.polarität === 'positiv' ? '+' : result.polarität === 'negativ' ? '−' : '○'} {result.polarität}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                  Resonanz {effectiveFokus && <span className="text-primary">(+Fokus)</span>}
                                </p>
                                <div className="flex items-center gap-2">
                                  <Progress value={result.resonanz} className="h-2 flex-1" />
                                  <span className={`font-medium ${getResonanzColor(result.resonanz)}`}>
                                    {result.resonanz}%
                                  </span>
                                </div>
                                {effectiveFokus && result.fokusKorrelation > 0 && (
                                  <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                                    <span>Basis: {result.resonanzBasis}%</span>
                                    <span className={result.interferenzMuster === 'konstruktiv' ? 'text-green-500' : result.interferenzMuster === 'destruktiv' ? 'text-red-400' : ''}>
                                      • {result.interferenzMuster === 'konstruktiv' ? '↑' : result.interferenzMuster === 'destruktiv' ? '↓' : '○'} 
                                      Fokus: {result.fokusKorrelation}%
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Intensität</p>
                                <div className="flex items-center gap-2">
                                  <Progress value={result.intensität} className="h-2 flex-1" />
                                  <span className="font-medium">{result.intensität}%</span>
                                </div>
                              </div>

                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Polarität-Wert</p>
                                <div className="flex items-center gap-1">
                                  <ArrowUpDown className="w-3 h-3" />
                                  <span className="font-medium">
                                    {result.polaritätWert > 0 ? '+' : ''}{result.polaritätWert}
                                  </span>
                                </div>
                              </div>

                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Dom. Ebene</p>
                                <Badge variant="outline" className="text-xs">
                                  {result.dominanteEbene}. {getLevelDisplayName(result.dominanteEbene, 'de').split(' - ')[1] || getLevelDisplayName(result.dominanteEbene, 'de')}
                                </Badge>
                              </div>
                            </div>

                            <details className="mt-3">
                              <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                                12 Ebenen-Verteilung anzeigen
                              </summary>
                              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-1 text-xs">
                                {LEVELS_DISPLAY.map(level => (
                                  <div key={level.id} className="flex items-center gap-1">
                                    <span className="text-muted-foreground w-4">{level.id}.</span>
                                    <Progress 
                                      value={result.ebenVerteilung[`level_${level.id}`] || 0} 
                                      className="h-1.5 flex-1"
                                    />
                                    <span className="w-8 text-right">
                                      {Math.round(result.ebenVerteilung[`level_${level.id}`] || 0)}%
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </details>
                          </CardContent>
                        </Card>
                      ))
                      )}
                    </div>
                  </ScrollArea>

                  {/* Harmonisierung Section */}
                  {filteredAndSortedResults.length > 0 && (
                    <Card className="mt-4 border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" />
                            <Label className="font-medium">Harmonisierung (optional)</Label>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowHarmonization(!showHarmonization)}
                          >
                            {showHarmonization ? 'Ausblenden' : 'Einblenden'}
                          </Button>
                        </div>

                        {showHarmonization && !harmonization.isActive && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="space-y-1">
                                <Label className="text-xs">Top Items</Label>
                                <Select 
                                  value={harmonizationItemCount.toString()} 
                                  onValueChange={(v) => setHarmonizationItemCount(parseInt(v) as 21 | 42 | 63)}
                                >
                                  <SelectTrigger className="h-9">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="21">Top 21</SelectItem>
                                    <SelectItem value="42">Top 42</SelectItem>
                                    <SelectItem value="63">Top 63</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="space-y-1">
                                <Label className="text-xs">Impuls (Sek.)</Label>
                                <Input
                                  type="number"
                                  min={1}
                                  max={60}
                                  value={harmonization.pulseDuration}
                                  onChange={(e) => setHarmonization(prev => ({
                                    ...prev,
                                    pulseDuration: Math.max(1, Math.min(60, parseInt(e.target.value) || 5))
                                  }))}
                                  className="h-9"
                                />
                              </div>
                              
                              <div className="space-y-1">
                                <Label className="text-xs">Pause (Sek.)</Label>
                                <Input
                                  type="number"
                                  min={1}
                                  max={60}
                                  value={harmonization.pauseDuration}
                                  onChange={(e) => setHarmonization(prev => ({
                                    ...prev,
                                    pauseDuration: Math.max(1, Math.min(60, parseInt(e.target.value) || 3))
                                  }))}
                                  className="h-9"
                                />
                              </div>
                              
                              <div className="space-y-1">
                                <Label className="text-xs">Max. Laufzeit (Min.)</Label>
                                <Input
                                  type="number"
                                  min={1}
                                  max={120}
                                  value={harmonization.maxDuration}
                                  onChange={(e) => setHarmonization(prev => ({
                                    ...prev,
                                    maxDuration: Math.max(1, Math.min(120, parseInt(e.target.value) || 30))
                                  }))}
                                  className="h-9"
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>
                                Verfügbar: {Math.min(harmonizationItemCount, filteredAndSortedResults.length)} von {filteredAndSortedResults.length} Items
                              </span>
                              <span>
                                Impuls/Pause: {harmonization.pulseDuration}s / {harmonization.pauseDuration}s
                              </span>
                            </div>
                            
                            <Button 
                              onClick={startHarmonization} 
                              className="w-full"
                              disabled={filteredAndSortedResults.length === 0}
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Harmonisierung starten
                            </Button>
                          </div>
                        )}

                        {harmonization.isActive && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${harmonization.inPulsePhase ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                                <span className="text-sm font-medium">
                                  {harmonization.inPulsePhase ? 'Impuls' : 'Pause'}
                                </span>
                              </div>
                              <Badge variant="outline">
                                {formatTime(harmonization.elapsedSeconds)} / {formatTime(harmonization.maxDuration * 60)}
                              </Badge>
                            </div>
                            
                            <Progress 
                              value={(harmonization.elapsedSeconds / (harmonization.maxDuration * 60)) * 100} 
                              className="h-2"
                            />
                            
                            {harmonization.selectedItems[harmonization.currentItemIndex] && (
                              <Card className="bg-muted/30">
                                <CardContent className="py-3">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-xs text-muted-foreground">Aktuelles Item ({harmonization.currentItemIndex + 1}/{harmonization.selectedItems.length})</p>
                                      <p className="font-semibold">{harmonization.selectedItems[harmonization.currentItemIndex].word}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-xs text-muted-foreground">Copen-Rate</p>
                                      <p className="font-mono">{harmonization.selectedItems[harmonization.currentItemIndex].copenRate.toLocaleString()}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                            
                            <div className="flex gap-2">
                              <Button 
                                variant={harmonization.isPaused ? "default" : "secondary"}
                                onClick={stopHarmonization}
                                className="flex-1"
                              >
                                {harmonization.isPaused ? (
                                  <><Play className="w-4 h-4 mr-2" />Fortsetzen</>
                                ) : (
                                  <><Square className="w-4 h-4 mr-2" />Stoppen</>
                                )}
                              </Button>
                              <Button 
                                variant="destructive"
                                onClick={cancelHarmonization}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>

            {/* ARCHIV TAB */}
            <TabsContent value="archiv" className="space-y-4">
              {!patientId ? (
                <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
                  <Archive className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Bitte einen Klienten verknüpfen um das Archiv zu nutzen</p>
                </div>
              ) : isLoadingArchive ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : archivedTests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
                  <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Noch keine archivierten Tests für diesen Klienten</p>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3 pr-4">
                    {archivedTests.map(archive => (
                      <Card 
                        key={archive.id} 
                        className="cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={() => loadArchivedResult(archive)}
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                {new Date(archive.created_at).toLocaleDateString('de-DE', { 
                                  day: '2-digit', 
                                  month: '2-digit', 
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <Badge variant="secondary">{archive.total_words} Wörter</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Ø Resonanz: <strong className="text-foreground">{archive.average_resonance.toFixed(1)}%</strong></span>
                          </div>
                          {archive.top_items.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {archive.top_items.slice(0, 3).map((item, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {item.word}: {item.resonanz}%
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>

            {/* TRENDS TAB */}
            <TabsContent value="trends" className="space-y-4">
              {!patientId ? (
                <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Bitte einen Klienten verknüpfen für Trendanalyse</p>
                </div>
              ) : categoryTrends.resonanzFokus.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Mindestens 2 archivierte Tests mit gemeinsamen Wörtern erforderlich</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Kategorie-Tabs */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={activeTrendCategory === 'resonanzFokus' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTrendCategory('resonanzFokus')}
                      className="flex items-center gap-1"
                    >
                      <Target className="w-3 h-3" />
                      Resonanz & Fokus ({categoryTrends.resonanzFokus.length})
                    </Button>
                    <Button
                      variant={activeTrendCategory === 'intensität' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTrendCategory('intensität')}
                      className="flex items-center gap-1"
                    >
                      <Gauge className="w-3 h-3" />
                      Intensität ({categoryTrends.intensität.length})
                    </Button>
                    <Button
                      variant={activeTrendCategory === 'polarität' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTrendCategory('polarität')}
                      className="flex items-center gap-1"
                    >
                      <Heart className="w-3 h-3" />
                      Polarität ({categoryTrends.polarität.length})
                    </Button>
                    <Button
                      variant={activeTrendCategory === 'ebenen' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveTrendCategory('ebenen')}
                      className="flex items-center gap-1"
                    >
                      <Layers className="w-3 h-3" />
                      Ebenen ({categoryTrends.ebenen.length})
                    </Button>
                  </div>

                  <ScrollArea className="h-[350px]">
                    <div className="space-y-2 pr-4">
                      {categoryTrends[activeTrendCategory].map((item, idx) => (
                        <Card key={idx} className="bg-muted/20">
                          <CardContent className="py-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {getTrendIcon(item.trend)}
                                <div>
                                  <span className="font-medium">{item.word}</span>
                                  <p className="text-xs text-muted-foreground">
                                    {item.occurrences}x getestet
                                    {item.fokusKorrelation && item.fokusKorrelation > 0 && (
                                      <span className="ml-2 text-primary">• Fokus: {item.fokusKorrelation.toFixed(0)}%</span>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                {activeTrendCategory === 'resonanzFokus' && (
                                  <>
                                    <div className="flex items-center gap-2">
                                      <span className="text-muted-foreground text-sm">{item.previousResonance.toFixed(1)}%</span>
                                      <span className="text-muted-foreground">→</span>
                                      <span className={`font-medium ${getResonanzColor(item.currentResonance)}`}>
                                        {item.currentResonance.toFixed(1)}%
                                      </span>
                                    </div>
                                    <Badge 
                                      variant={item.trend === 'up' ? 'default' : item.trend === 'down' ? 'destructive' : 'secondary'}
                                      className="text-xs mt-1"
                                    >
                                      {item.trendValue > 0 ? '+' : ''}{item.trendValue.toFixed(1)}%
                                    </Badge>
                                  </>
                                )}
                                {activeTrendCategory === 'intensität' && (
                                  <>
                                    <div className="flex items-center gap-2">
                                      <span className="text-muted-foreground text-sm">{(item.previousIntensity || 0).toFixed(1)}%</span>
                                      <span className="text-muted-foreground">→</span>
                                      <span className="font-medium">{(item.currentIntensity || 0).toFixed(1)}%</span>
                                    </div>
                                    <Badge 
                                      variant={((item.currentIntensity || 0) - (item.previousIntensity || 0)) > 0 ? 'default' : 'secondary'}
                                      className="text-xs mt-1"
                                    >
                                      {((item.currentIntensity || 0) - (item.previousIntensity || 0)) > 0 ? '+' : ''}
                                      {((item.currentIntensity || 0) - (item.previousIntensity || 0)).toFixed(1)}%
                                    </Badge>
                                  </>
                                )}
                                {activeTrendCategory === 'polarität' && (
                                  <>
                                    <div className="flex items-center gap-2">
                                      <span className="text-muted-foreground text-sm">{(item.previousPolarity || 0).toFixed(2)}</span>
                                      <span className="text-muted-foreground">→</span>
                                      <span className={`font-medium ${(item.currentPolarity || 0) > 0 ? 'text-green-500' : (item.currentPolarity || 0) < 0 ? 'text-red-500' : ''}`}>
                                        {(item.currentPolarity || 0).toFixed(2)}
                                      </span>
                                    </div>
                                    <Badge 
                                      variant={((item.currentPolarity || 0) - (item.previousPolarity || 0)) > 0 ? 'default' : 'destructive'}
                                      className="text-xs mt-1"
                                    >
                                      {((item.currentPolarity || 0) - (item.previousPolarity || 0)) > 0 ? '+' : ''}
                                      {((item.currentPolarity || 0) - (item.previousPolarity || 0)).toFixed(2)}
                                    </Badge>
                                  </>
                                )}
                                {activeTrendCategory === 'ebenen' && (
                                  <>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline" className="text-xs">{item.previousLevel}. Ebene</Badge>
                                      <span className="text-muted-foreground">→</span>
                                      <Badge variant="default" className="text-xs">{item.currentLevel}. Ebene</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Shift: {((item.currentLevel || 0) - (item.previousLevel || 0)) > 0 ? '↑' : '↓'} 
                                      {Math.abs((item.currentLevel || 0) - (item.previousLevel || 0))} Ebenen
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default WordEnergyTester;
