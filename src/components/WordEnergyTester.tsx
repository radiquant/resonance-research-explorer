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
  History
} from 'lucide-react';
import { calculateCopenRate } from '@/utils/copenRateGenerator';
import { calculateLevelResonance, LEVELS, findHighestResonanceLevel, getLevelDisplayName } from '@/utils/levelResonance';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { KlientenFeldErgebnis } from '@/utils/clientFieldAlgorithms';

interface WordEnergyTestResult {
  word: string;
  copenRate: number;
  resonanz: number;
  intensität: number;
  polarität: 'positiv' | 'negativ' | 'neutral';
  polaritätWert: number;
  dominanteEbene: number;
  dominanteEbeneWert: number;
  ebenVerteilung: Record<string, number>;
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
  
  // Archiv & Trend State
  const [archivedTests, setArchivedTests] = useState<ArchivedTest[]>([]);
  const [trendItems, setTrendItems] = useState<TrendItem[]>([]);
  const [isLoadingArchive, setIsLoadingArchive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('test');
  
  // Sortier- und Filter-State
  const [sortField, setSortField] = useState<SortField>('resonanz');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [polaritätFilter, setPolaritätFilter] = useState<PolaritätFilter>('alle');
  const [minResonanz, setMinResonanz] = useState<number>(0);
  const [ebeneFilter, setEbeneFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

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
      return;
    }

    const wordMap = new Map<string, { values: number[], occurrences: number }>();

    // Collect all word occurrences across tests
    archives.forEach(archive => {
      archive.results.forEach(result => {
        const existing = wordMap.get(result.word) || { values: [], occurrences: 0 };
        existing.values.push(result.resonanz);
        existing.occurrences++;
        wordMap.set(result.word, existing);
      });
    });

    // Calculate trends for items appearing more than once
    const trends: TrendItem[] = [];
    wordMap.forEach((data, word) => {
      if (data.occurrences >= 2) {
        const currentResonance = data.values[0];
        const previousResonance = data.values[1];
        const trendValue = currentResonance - previousResonance;
        
        let trend: 'up' | 'down' | 'stable' = 'stable';
        if (trendValue > 5) trend = 'up';
        else if (trendValue < -5) trend = 'down';

        trends.push({
          word,
          currentResonance,
          previousResonance,
          trend,
          trendValue,
          occurrences: data.occurrences
        });
      }
    });

    // Sort by absolute trend value
    trends.sort((a, b) => Math.abs(b.trendValue) - Math.abs(a.trendValue));
    setTrendItems(trends.slice(0, 15)); // Top 15 trending items
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
    const resonanz = calculateResonanz(copenRate, clientWellenfunktion);
    const intensität = calculateIntensität(copenRate, resonanz);
    const { typ: polarität, wert: polaritätWert } = calculatePolarität(word, copenRate);
    
    return {
      word,
      copenRate,
      resonanz: Math.round(resonanz * 10) / 10,
      intensität: Math.round(intensität * 10) / 10,
      polarität,
      polaritätWert: Math.round(polaritätWert * 100) / 100,
      dominanteEbene,
      dominanteEbeneWert: Math.round(dominanteEbeneWert * 10) / 10,
      ebenVerteilung
    };
  }, []);

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

              {/* Input Area */}
              <div className="space-y-2">
                <Label htmlFor="wordList" className="flex items-center gap-2">
                  <ListChecks className="w-4 h-4" />
                  Wortenergien (eine pro Zeile)
                </Label>
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
                            {LEVELS.map(level => (
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
                              </div>
                              <Badge className={`${getPolaritätColor(result.polarität)} text-white`}>
                                {result.polarität === 'positiv' ? '+' : result.polarität === 'negativ' ? '−' : '○'} {result.polarität}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Resonanz</p>
                                <div className="flex items-center gap-2">
                                  <Progress value={result.resonanz} className="h-2 flex-1" />
                                  <span className={`font-medium ${getResonanzColor(result.resonanz)}`}>
                                    {result.resonanz}%
                                  </span>
                                </div>
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
                                12+1 Ebenen-Verteilung anzeigen
                              </summary>
                              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-1 text-xs">
                                {LEVELS.map(level => (
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
              ) : trendItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Mindestens 2 archivierte Tests mit gemeinsamen Wörtern erforderlich</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Vergleich der Resonanzwerte über mehrere Tests hinweg
                  </p>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2 pr-4">
                      {trendItems.map((item, idx) => (
                        <Card key={idx} className="bg-muted/20">
                          <CardContent className="py-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {getTrendIcon(item.trend)}
                                <div>
                                  <span className="font-medium">{item.word}</span>
                                  <p className="text-xs text-muted-foreground">
                                    {item.occurrences}x getestet
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
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
