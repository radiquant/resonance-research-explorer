import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, User, Calendar, MapPin, Sparkles, Heart, Leaf } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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

const ClientFieldCalculator = () => {
  const [nachname, setNachname] = useState('');
  const [vornamen, setVornamen] = useState('');
  const [geburtsdatum, setGeburtsdatum] = useState('');
  const [geburtsort, setGeburtsort] = useState('');
  const [tcmTyp, setTcmTyp] = useState<TCMElement | ''>('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<KlientenFeldErgebnis | null>(null);

  const handleCalculate = async () => {
    if (!nachname || !vornamen || !geburtsdatum || !geburtsort) return;

    setIsCalculating(true);
    try {
      const klient: KlientenDaten = {
        nachname,
        vornamen: vornamen.split(' ').filter(v => v.trim()),
        geburtsdatum: new Date(geburtsdatum),
        geburtsort,
        tcmTyp: tcmTyp || undefined
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nachname">Nachname *</Label>
              <Input id="nachname" placeholder="Müller" value={nachname} onChange={(e) => setNachname(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vornamen">Vorname(n) * (durch Leerzeichen getrennt)</Label>
              <Input id="vornamen" placeholder="Hans Peter" value={vornamen} onChange={(e) => setVornamen(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="geburtsdatum"><Calendar className="w-4 h-4 inline mr-1" />Geburtsdatum *</Label>
              <Input id="geburtsdatum" type="date" value={geburtsdatum} onChange={(e) => setGeburtsdatum(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="geburtsort"><MapPin className="w-4 h-4 inline mr-1" />Geburtsort *</Label>
              <Input id="geburtsort" placeholder="München" value={geburtsort} onChange={(e) => setGeburtsort(e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>TCM-Konstitution (optional)</Label>
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
