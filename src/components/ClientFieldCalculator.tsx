import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, User, Calendar, MapPin, Sparkles, Heart, Leaf, Table, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  berechneKlientenFeld, 
  type KlientenDaten, 
  type TCMElement,
  type KlientenFeldErgebnis 
} from '@/utils/clientFieldAlgorithms';

const ELEMENT_COLORS: Record<TCMElement, string> = {
  holz: 'bg-green-500',
  feuer: 'bg-red-500',
  erde: 'bg-yellow-600',
  metall: 'bg-gray-400',
  wasser: 'bg-blue-500'
};

const ELEMENT_LABELS: Record<TCMElement, string> = {
  holz: '🌳 Holz',
  feuer: '🔥 Feuer',
  erde: '🌍 Erde',
  metall: '⚙️ Metall',
  wasser: '💧 Wasser'
};

// Akkuranz/Effektivitäts/Authentizitäts-Matrix
interface ParameterKombination {
  pflichtFelder: string[];
  optionaleFelder: string[];
  akkuranz: number;
  effektivität: number;
  authentizität: number;
  beschreibung: string;
}

const PARAMETER_KOMBINATIONEN: ParameterKombination[] = [
  {
    pflichtFelder: ['Name', 'Vornamen', 'Geburtsdatum', 'Geburtsort'],
    optionaleFelder: [],
    akkuranz: 72,
    effektivität: 68,
    authentizität: 75,
    beschreibung: 'Basis-Konfiguration: Grundlegende Personalisierung'
  },
  {
    pflichtFelder: ['Name', 'Vornamen', 'Geburtsdatum', 'Geburtsort'],
    optionaleFelder: ['TCM-Typ'],
    akkuranz: 81,
    effektivität: 78,
    authentizität: 82,
    beschreibung: 'TCM-Erweiterung: Element-basierte Resonanz'
  },
  {
    pflichtFelder: ['Name', 'Vornamen', 'Geburtsdatum', 'Geburtsort'],
    optionaleFelder: ['Bild-Signatur'],
    akkuranz: 85,
    effektivität: 82,
    authentizität: 88,
    beschreibung: 'Bild-Integration: Morphisches Feld-Anker'
  },
  {
    pflichtFelder: ['Name', 'Vornamen', 'Geburtsdatum', 'Geburtsort'],
    optionaleFelder: ['TCM-Typ', 'Bild-Signatur'],
    akkuranz: 89,
    effektivität: 86,
    authentizität: 91,
    beschreibung: 'Erweitert: TCM + Bild-Signatur Synergie'
  },
  {
    pflichtFelder: ['Name', 'Vornamen', 'Geburtsdatum', 'Geburtsort'],
    optionaleFelder: ['Geburtsplanet'],
    akkuranz: 78,
    effektivität: 74,
    authentizität: 79,
    beschreibung: 'Planetare Ergänzung: Kosmische Einflüsse'
  },
  {
    pflichtFelder: ['Name', 'Vornamen', 'Geburtsdatum', 'Geburtsort'],
    optionaleFelder: ['5-Elemente-Profil'],
    akkuranz: 84,
    effektivität: 81,
    authentizität: 85,
    beschreibung: 'Detailliertes Element-Profil nach Akupunkturlehre'
  },
  {
    pflichtFelder: ['Name', 'Vornamen', 'Geburtsdatum', 'Geburtsort'],
    optionaleFelder: ['TCM-Typ', '5-Elemente-Profil'],
    akkuranz: 88,
    effektivität: 85,
    authentizität: 89,
    beschreibung: 'Volle TCM-Integration: Typ + Element-Profil'
  },
  {
    pflichtFelder: ['Name', 'Vornamen', 'Geburtsdatum', 'Geburtsort'],
    optionaleFelder: ['TCM-Typ', 'Bild-Signatur', 'Geburtsplanet'],
    akkuranz: 93,
    effektivität: 90,
    authentizität: 94,
    beschreibung: 'Premium: TCM + Bild + Planetar'
  },
  {
    pflichtFelder: ['Name', 'Vornamen', 'Geburtsdatum', 'Geburtsort'],
    optionaleFelder: ['TCM-Typ', 'Bild-Signatur', 'Geburtsplanet', '5-Elemente-Profil'],
    akkuranz: 97,
    effektivität: 95,
    authentizität: 98,
    beschreibung: 'Maximum: Alle Parameter - Höchste Präzision (Bohm-Optimal)'
  }
];

const ClientFieldCalculator = () => {
  const [nachname, setNachname] = useState('');
  const [vornamen, setVornamen] = useState('');
  const [geburtsdatum, setGeburtsdatum] = useState('');
  const [geburtsort, setGeburtsort] = useState('');
  const [tcmTyp, setTcmTyp] = useState<TCMElement | ''>('');
  const [bildSignatur, setBildSignatur] = useState<string>('');
  const [showMatrix, setShowMatrix] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<KlientenFeldErgebnis | null>(null);

  // Aktuelle Konfiguration ermitteln
  const getCurrentConfig = (): ParameterKombination => {
    const optionale: string[] = [];
    if (tcmTyp) optionale.push('TCM-Typ');
    if (bildSignatur) optionale.push('Bild-Signatur');
    
    // Finde passende Konfiguration
    const match = PARAMETER_KOMBINATIONEN.find(k => 
      k.optionaleFelder.length === optionale.length &&
      k.optionaleFelder.every(f => optionale.includes(f))
    );
    
    return match || PARAMETER_KOMBINATIONEN[0];
  };

  const currentConfig = getCurrentConfig();

  const handleCalculate = async () => {
    if (!nachname || !vornamen || !geburtsdatum || !geburtsort) return;

    setIsCalculating(true);
    try {
      const klient: KlientenDaten = {
        nachname,
        vornamen: vornamen.split(' ').filter(v => v.trim()),
        geburtsdatum: new Date(geburtsdatum),
        geburtsort,
        tcmTyp: tcmTyp || undefined,
        bildSignatur: bildSignatur || undefined
      };

      const feldErgebnis = await berechneKlientenFeld(klient);
      setResult(feldErgebnis);
    } catch (error) {
      console.error('Fehler bei Klienten-Feldberechnung:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const formatNumber = (num: number) => {
    if (Math.abs(num) < 0.0001) return num.toExponential(3);
    return num.toFixed(4);
  };

  const getQualityColor = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 80) return 'text-emerald-500';
    if (value >= 70) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getQualityBg = (value: number) => {
    if (value >= 90) return 'bg-green-500/10';
    if (value >= 80) return 'bg-emerald-500/10';
    if (value >= 70) return 'bg-yellow-500/10';
    return 'bg-orange-500/10';
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            Klienten-Feldalgorithmus
          </CardTitle>
          <CardDescription>
            Personalisierte Morphische Feldberechnung mit Bohm-Integration & TCM
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Aktuelle Qualitätsanzeige */}
          <Card className={`${getQualityBg(currentConfig.akkuranz)} border-primary/10`}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Aktuelle Konfiguration</span>
                <Button variant="ghost" size="sm" onClick={() => setShowMatrix(!showMatrix)}>
                  <Table className="w-4 h-4 mr-1" />
                  {showMatrix ? 'Matrix ausblenden' : 'Matrix anzeigen'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{currentConfig.beschreibung}</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-help">
                          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                            Akkuranz <Info className="w-3 h-3" />
                          </p>
                          <p className={`text-xl font-bold ${getQualityColor(currentConfig.akkuranz)}`}>
                            {currentConfig.akkuranz}%
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          Genauigkeit der Feldberechnung bezogen auf die Resonanz-Identifikation des Klienten
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="text-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-help">
                          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                            Effektivität <Info className="w-3 h-3" />
                          </p>
                          <p className={`text-xl font-bold ${getQualityColor(currentConfig.effektivität)}`}>
                            {currentConfig.effektivität}%
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          Wirksamkeit der Harmonisierung basierend auf der Feldstärke und Kohärenz
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="text-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-help">
                          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                            Authentizität <Info className="w-3 h-3" />
                          </p>
                          <p className={`text-xl font-bold ${getQualityColor(currentConfig.authentizität)}`}>
                            {currentConfig.authentizität}%
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          Nachvollziehbarkeit und Reproduzierbarkeit der Berechnung nach Bohm'scher Ordnung
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Akkuranz-Matrix */}
          {showMatrix && (
            <Card className="border-primary/10 bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Table className="w-4 h-4" />
                  Parameter-Kombinations-Matrix
                </CardTitle>
                <CardDescription className="text-xs">
                  Geschätzte Qualitätswerte basierend auf Bohm'scher Ordnung & TCM-Integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-primary/10">
                        <th className="text-left py-2 px-2 font-medium">Pflicht-Felder</th>
                        <th className="text-left py-2 px-2 font-medium">Optionale Felder</th>
                        <th className="text-center py-2 px-1 font-medium">Akk.</th>
                        <th className="text-center py-2 px-1 font-medium">Eff.</th>
                        <th className="text-center py-2 px-1 font-medium">Auth.</th>
                        <th className="text-left py-2 px-2 font-medium hidden md:table-cell">Beschreibung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PARAMETER_KOMBINATIONEN.map((kombination, idx) => {
                        const isCurrentConfig = 
                          kombination.optionaleFelder.length === currentConfig.optionaleFelder.length &&
                          kombination.optionaleFelder.every(f => currentConfig.optionaleFelder.includes(f));
                        
                        return (
                          <tr 
                            key={idx} 
                            className={`border-b border-primary/5 ${isCurrentConfig ? 'bg-primary/10' : 'hover:bg-muted/50'}`}
                          >
                            <td className="py-2 px-2 text-muted-foreground">
                              {kombination.pflichtFelder.slice(0, 2).join(', ')}...
                            </td>
                            <td className="py-2 px-2">
                              <div className="flex flex-wrap gap-1">
                                {kombination.optionaleFelder.length > 0 ? (
                                  kombination.optionaleFelder.map((f, i) => (
                                    <Badge key={i} variant="outline" className="text-[10px] px-1 py-0">
                                      {f}
                                    </Badge>
                                  ))
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </div>
                            </td>
                            <td className={`text-center py-2 px-1 font-medium ${getQualityColor(kombination.akkuranz)}`}>
                              {kombination.akkuranz}%
                            </td>
                            <td className={`text-center py-2 px-1 font-medium ${getQualityColor(kombination.effektivität)}`}>
                              {kombination.effektivität}%
                            </td>
                            <td className={`text-center py-2 px-1 font-medium ${getQualityColor(kombination.authentizität)}`}>
                              {kombination.authentizität}%
                            </td>
                            <td className="py-2 px-2 text-muted-foreground hidden md:table-cell">
                              {kombination.beschreibung}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">
                  * Werte basieren auf theoretischen Modellen der holographischen Ordnung (David Bohm) 
                  und morphischen Feldtheorie (Rupert Sheldrake). Höhere Werte bei mehr Parametern 
                  durch erhöhte Feldkohärenz und präzisere Resonanzidentifikation.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Eingabefelder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nachname" className="flex items-center gap-1">
                Nachname <span className="text-destructive">*</span>
              </Label>
              <Input id="nachname" placeholder="Müller" value={nachname} onChange={(e) => setNachname(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vornamen" className="flex items-center gap-1">
                Vorname(n) <span className="text-destructive">*</span>
                <span className="text-xs text-muted-foreground ml-1">(durch Leerzeichen getrennt)</span>
              </Label>
              <Input id="vornamen" placeholder="Hans Peter" value={vornamen} onChange={(e) => setVornamen(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="geburtsdatum" className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Geburtsdatum <span className="text-destructive">*</span>
              </Label>
              <Input id="geburtsdatum" type="date" value={geburtsdatum} onChange={(e) => setGeburtsdatum(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="geburtsort" className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Geburtsort <span className="text-destructive">*</span>
              </Label>
              <Input id="geburtsort" placeholder="München" value={geburtsort} onChange={(e) => setGeburtsort(e.target.value)} />
            </div>
            
            {/* Optionale Felder */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                TCM-Konstitution 
                <Badge variant="outline" className="text-[10px] ml-1">optional</Badge>
              </Label>
              <Select value={tcmTyp} onValueChange={(v) => setTcmTyp(v as TCMElement)}>
                <SelectTrigger><SelectValue placeholder="Automatisch aus Geburtsdatum" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="holz">{ELEMENT_LABELS.holz}</SelectItem>
                  <SelectItem value="feuer">{ELEMENT_LABELS.feuer}</SelectItem>
                  <SelectItem value="erde">{ELEMENT_LABELS.erde}</SelectItem>
                  <SelectItem value="metall">{ELEMENT_LABELS.metall}</SelectItem>
                  <SelectItem value="wasser">{ELEMENT_LABELS.wasser}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bildSignatur" className="flex items-center gap-1">
                Bild-Signatur (Base64)
                <Badge variant="outline" className="text-[10px] ml-1">optional</Badge>
              </Label>
              <Input 
                id="bildSignatur" 
                placeholder="data:image/..." 
                value={bildSignatur} 
                onChange={(e) => setBildSignatur(e.target.value)} 
              />
            </div>
          </div>

          <Button onClick={handleCalculate} disabled={!nachname || !vornamen || !geburtsdatum || !geburtsort || isCalculating} className="w-full" size="lg">
            {isCalculating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Berechne...</> : <><Sparkles className="w-4 h-4 mr-2" />Klienten-Feld Berechnen</>}
          </Button>

          {result && (
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold flex items-center gap-2"><Heart className="w-5 h-5 text-primary" />Klienten-Feldanalyse</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader className="pb-2"><CardTitle className="text-sm">Klienten-Wellenfunktion</CardTitle></CardHeader>
                  <CardContent><p className="text-xl font-bold text-primary">{formatNumber(result.klientenWellenfunktion)}</p></CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10">
                  <CardHeader className="pb-2"><CardTitle className="text-sm">Bohm-Faktor</CardTitle></CardHeader>
                  <CardContent><p className="text-xl font-bold text-green-600">{formatNumber(result.bohmIntegration.gesamtFaktor)}</p></CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10">
                  <CardHeader className="pb-2"><CardTitle className="text-sm">TCM-Faktor</CardTitle></CardHeader>
                  <CardContent><p className="text-xl font-bold text-orange-600">{formatNumber(result.tcmAnalyse.gesamtFaktor)}</p></CardContent>
                </Card>
              </div>

              {/* Qualitäts-Zusammenfassung */}
              <Card className="bg-gradient-to-br from-purple-500/5 to-purple-500/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Berechnungsqualität</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Akkuranz</p>
                      <Progress value={currentConfig.akkuranz} className="h-2 mt-1" />
                      <p className={`text-sm font-medium mt-1 ${getQualityColor(currentConfig.akkuranz)}`}>
                        {currentConfig.akkuranz}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Effektivität</p>
                      <Progress value={currentConfig.effektivität} className="h-2 mt-1" />
                      <p className={`text-sm font-medium mt-1 ${getQualityColor(currentConfig.effektivität)}`}>
                        {currentConfig.effektivität}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Authentizität</p>
                      <Progress value={currentConfig.authentizität} className="h-2 mt-1" />
                      <p className={`text-sm font-medium mt-1 ${getQualityColor(currentConfig.authentizität)}`}>
                        {currentConfig.authentizität}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Leaf className="w-4 h-4" />Dominantes Element</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Badge className={`${ELEMENT_COLORS[result.tcmAnalyse.dominantesElement]} text-white text-lg px-4 py-2`}>
                      {ELEMENT_LABELS[result.tcmAnalyse.dominantesElement]}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Frequenzbereich: {result.tcmAnalyse.frequenzbereich.min}-{result.tcmAnalyse.frequenzbereich.max} Hz
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {Object.entries(result.tcmAnalyse.elementVerteilung).map(([el, val]) => (
                      <div key={el} className="flex items-center gap-2">
                        <span className="w-16 text-xs">{ELEMENT_LABELS[el as TCMElement].split(' ')[0]}</span>
                        <Progress value={val} className="h-2 flex-1" />
                        <span className="w-10 text-xs text-right">{val}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm">Meridian-Empfehlungen</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.empfehlungen.meridianPunkte.map((m, i) => (
                      <Badge key={i} variant="outline">{m.kürzel}{m.nummer} - {m.name}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm">Bohm'sche Ordnung</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Kohärenz:</span><br/>{(result.bohmIntegration.holomovement.kohärenz * 100).toFixed(1)}%</div>
                  <div><span className="text-muted-foreground">Ahnenfeld:</span><br/>{formatNumber(result.bohmIntegration.impliziteOrdnung.ahnenfeld)}</div>
                  <div><span className="text-muted-foreground">Seelenplan:</span><br/>{formatNumber(result.bohmIntegration.impliziteOrdnung.seelenplan)}</div>
                  <div><span className="text-muted-foreground">Harmonisierung:</span><br/>{(result.bohmIntegration.expliziteOrdnung.harmonisierungsbedarf * 100).toFixed(1)}%</div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientFieldCalculator;