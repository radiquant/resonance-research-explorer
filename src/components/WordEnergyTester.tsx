import { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
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
  X
} from 'lucide-react';
import { calculateCopenRate } from '@/utils/copenRateGenerator';
import { calculateLevelResonance, LEVELS, findHighestResonanceLevel, getLevelDisplayName } from '@/utils/levelResonance';
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

type SortField = 'word' | 'resonanz' | 'intensität' | 'polaritätWert' | 'dominanteEbene' | 'copenRate';
type SortDirection = 'asc' | 'desc';
type PolaritätFilter = 'alle' | 'positiv' | 'negativ' | 'neutral';

interface WordEnergyTesterProps {
  clientResult: KlientenFeldErgebnis | null;
  clientName: string;
}

const WordEnergyTester = ({ clientResult, clientName }: WordEnergyTesterProps) => {
  const [wordInput, setWordInput] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [results, setResults] = useState<WordEnergyTestResult[]>([]);
  
  // Sortier- und Filter-State
  const [sortField, setSortField] = useState<SortField>('resonanz');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [polaritätFilter, setPolaritätFilter] = useState<PolaritätFilter>('alle');
  const [minResonanz, setMinResonanz] = useState<number>(0);
  const [ebeneFilter, setEbeneFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Gefilterte und sortierte Ergebnisse
  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...results];
    
    // Polarität-Filter
    if (polaritätFilter !== 'alle') {
      filtered = filtered.filter(r => r.polarität === polaritätFilter);
    }
    
    // Minimum Resonanz Filter
    if (minResonanz > 0) {
      filtered = filtered.filter(r => r.resonanz >= minResonanz);
    }
    
    // Ebene-Filter
    if (ebeneFilter !== null) {
      filtered = filtered.filter(r => r.dominanteEbene === ebeneFilter);
    }
    
    // Sortierung
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
    // Resonanz basiert auf harmonischem Verhältnis
    const ratio = copenRate / (clientWellenfunktion || 1);
    const normalized = Math.abs(1 - (ratio % 1));
    return Math.min(100, normalized * 100 + (Math.random() * 15));
  };

  const calculateIntensität = (copenRate: number, resonanz: number): number => {
    // Intensität kombiniert Rate-Stärke mit Resonanz
    const rateStrength = Math.min(100, Math.log10(copenRate) * 15);
    return Math.min(100, (rateStrength * 0.6) + (resonanz * 0.4));
  };

  const calculatePolarität = (word: string, copenRate: number): { typ: 'positiv' | 'negativ' | 'neutral', wert: number } => {
    // Polarität basiert auf Buchstabensumme und Rate-Modulation
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
    // Berechne Copen-Rate für das Wort
    const rateResult = calculateCopenRate(word, 0, 'D', 'latin');
    const copenRate = rateResult.rate;
    
    // Berechne Ebenen-Resonanz
    const ebenVerteilung = calculateLevelResonance(copenRate, word);
    const { level: dominanteEbene, value: dominanteEbeneWert } = findHighestResonanceLevel(ebenVerteilung);
    
    // Berechne Resonanz zum Klienten
    const resonanz = calculateResonanz(copenRate, clientWellenfunktion);
    
    // Berechne Intensität
    const intensität = calculateIntensität(copenRate, resonanz);
    
    // Berechne Polarität
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

  const handleStartTest = async () => {
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
      
      // Kleine Verzögerung für visuelle Sequenz
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const result = testWordEnergy(words[i], clientWellenfunktion);
      newResults.push(result);
      setResults([...newResults]);
    }

    setIsTesting(false);
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

  return (
    <Card className="border-primary/20 mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="w-6 h-6 text-primary" />
          Wortenergie-Abtestung
        </CardTitle>
        <CardDescription>
          Sequentielle Analyse von Wortenergien im Bezug zum Klienten 
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
          <>
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
            {isTesting && (
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
                  Teste sequentiell...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Wortenergie-Abtestung starten
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
                        {/* Sortierung */}
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

                        {/* Sortierrichtung */}
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

                        {/* Polarität Filter */}
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

                        {/* Min Resonanz */}
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

                      {/* Ebene Filter */}
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
                              onClick={() => setEbeneFilter(ebeneFilter === level.id ? null : level.id)}
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
                            {/* Resonanz */}
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Resonanz</p>
                              <div className="flex items-center gap-2">
                                <Progress value={result.resonanz} className="h-2 flex-1" />
                                <span className={`font-medium ${getResonanzColor(result.resonanz)}`}>
                                  {result.resonanz}%
                                </span>
                              </div>
                            </div>

                            {/* Intensität */}
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Intensität</p>
                              <div className="flex items-center gap-2">
                                <Progress value={result.intensität} className="h-2 flex-1" />
                                <span className="font-medium">{result.intensität}%</span>
                              </div>
                            </div>

                            {/* Polarität Wert */}
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Polarität-Wert</p>
                              <div className="flex items-center gap-1">
                                <ArrowUpDown className="w-3 h-3" />
                                <span className="font-medium">
                                  {result.polaritätWert > 0 ? '+' : ''}{result.polaritätWert}
                                </span>
                              </div>
                            </div>

                            {/* Dominante Ebene */}
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Dom. Ebene</p>
                              <Badge variant="outline" className="text-xs">
                                {result.dominanteEbene}. {getLevelDisplayName(result.dominanteEbene, 'de').split(' - ')[1] || getLevelDisplayName(result.dominanteEbene, 'de')}
                              </Badge>
                            </div>
                          </div>

                          {/* Ebenen-Verteilung kompakt */}
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WordEnergyTester;
