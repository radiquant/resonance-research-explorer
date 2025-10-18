
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, Calculator, Zap, User, Play, Pause, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const CopenAlgorithmVisualization: React.FC = () => {
  const [word, setWord] = useState('NUX VOMICA');
  const [potency, setPotency] = useState(6);
  const [potencyType, setPotencyType] = useState<'D' | 'C' | 'LM' | 'M'>('D');
  const [showCalculation, setShowCalculation] = useState(false);

  // Klientendaten
  const [clientFirstName, setClientFirstName] = useState('');
  const [clientLastName, setClientLastName] = useState('');
  const [clientBirthDate, setClientBirthDate] = useState('');
  const [clientBirthPlace, setClientBirthPlace] = useState('');

  // Harmonisierungs-Timer
  const [harmonizationDuration, setHarmonizationDuration] = useState(60); // Sekunden
  const [isHarmonizing, setIsHarmonizing] = useState(false);
  const [harmonizationProgress, setHarmonizationProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Modernisierte Wortenergie-Normalisierung
  const normalizeWordEnergy = (word: string): string => {
    return word
      .toUpperCase()
      // Umlaute umwandeln
      .replace(/Ä/g, 'AE')
      .replace(/Ö/g, 'OE') 
      .replace(/Ü/g, 'UE')
      .replace(/ß/g, 'SS')
      // Potenzangaben entfernen (D6, C200, LM1, etc.)
      .replace(/\s*[DCLM]+\d+/g, '')
      // Zahlen entfernen
      .replace(/\d+/g, '')
      // Sonderzeichen entfernen, aber Leerzeichen beibehalten
      .replace(/[^A-Z\s]/g, '')
      // Mehrfache Leerzeichen durch einzelne ersetzen
      .replace(/\s+/g, ' ')
      // Führende und nachfolgende Leerzeichen entfernen
      .trim();
  };

  // Buchstabenwerte A=1, B=2, etc.
  const getLetterValue = (letter: string): number => {
    return letter.toUpperCase().charCodeAt(0) - 64;
  };

  const cleanWord = normalizeWordEnergy(word);

  // Schritt 1: Buchstabenwerte berechnen (Leerzeichen überspringen)
  const letterValues = [];
  let position = 1;
  
  for (let i = 0; i < cleanWord.length; i++) {
    const char = cleanWord[i];
    if (char === ' ') {
      letterValues.push({
        letter: ' ',
        value: 0,
        position: '-',
        weighted: 0,
        isSpace: true
      });
      continue;
    }
    
    letterValues.push({
      letter: char,
      value: getLetterValue(char),
      position: position,
      weighted: getLetterValue(char) * position,
      isSpace: false
    });
    position++;
  }

  // Schritt 2: Primärsumme (nur Buchstaben, keine Leerzeichen)
  const primarySum = letterValues
    .filter(item => !item.isSpace)
    .reduce((sum, item) => sum + item.weighted, 0);

  // Schritt 3: Baserate
  const baseRate = primarySum * 1000;

  // Schritt 4: Fibonacci-Modulation (21 = 8. Fib, 34 = 9. Fib)
  const fibonacciRate = Math.floor((baseRate / 21) * 34);

  // Schritt 4: Korrigierte Potenzanpassung
  const getPotencyModifier = () => {
    if (potency === 0) {
      return 0; // Ursubstanz - keine Potenzierung
    }
    
    switch (potencyType) {
      case 'D':
        return Math.floor(fibonacciRate * (potency / 10));
      case 'C':
        return Math.floor(fibonacciRate * (potency / 5));
      case 'LM':
        return Math.floor(fibonacciRate * (potency / 2));
      case 'M':
        return Math.floor(fibonacciRate * potency);
      default:
        return 0;
    }
  };

  const potencyModifier = getPotencyModifier();
  // HIER WAR DER FEHLER: Die finale Rate wurde nicht korrekt berechnet
  const finalRate = fibonacciRate + potencyModifier;

  // Klienten-Rate berechnen
  const calculateClientRate = () => {
    const clientData = `${clientFirstName} ${clientLastName} ${clientBirthDate} ${clientBirthPlace}`;
    const cleanClientData = normalizeWordEnergy(clientData);
    
    let position = 1;
    let clientSum = 0;
    
    for (let i = 0; i < cleanClientData.length; i++) {
      const char = cleanClientData[i];
      if (char === ' ') continue;
      
      const value = getLetterValue(char);
      clientSum += value * position;
      position++;
    }
    
    const clientBaseRate = clientSum * 1000;
    const clientFibonacciRate = Math.floor((clientBaseRate / 21) * 34);
    
    return clientFibonacciRate;
  };

  const clientRate = calculateClientRate();

  const handleCalculate = () => {
    setShowCalculation(true);
  };

  // Harmonisierungs-Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isHarmonizing && elapsedTime < harmonizationDuration) {
      interval = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 0.1;
          if (newTime >= harmonizationDuration) {
            setIsHarmonizing(false);
            return harmonizationDuration;
          }
          return newTime;
        });
        setHarmonizationProgress(prev => {
          const newProgress = (elapsedTime / harmonizationDuration) * 100;
          return Math.min(newProgress, 100);
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isHarmonizing, elapsedTime, harmonizationDuration]);

  const startHarmonization = () => {
    setElapsedTime(0);
    setHarmonizationProgress(0);
    setIsHarmonizing(true);
  };

  const pauseHarmonization = () => {
    setIsHarmonizing(false);
  };

  const resetHarmonization = () => {
    setIsHarmonizing(false);
    setElapsedTime(0);
    setHarmonizationProgress(0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-800 flex items-center justify-center gap-2">
            <Zap className="h-6 w-6" />
            Modernisierter Bruce Copen Algorithmus
          </CardTitle>
          <p className="text-center text-sm text-gray-600 mt-2">
            ✓ Leerzeichen als Trennzeichen • ✓ Umlaute-Konvertierung (ä→ae, ö→oe, ü→ue, ß→ss) • ✓ D0 Ursubstanz
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="word">Wortenergie</Label>
              <Input
                id="word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="z.B. Nux vomica, Schüßler Nr.1"
              />
              <div className="text-xs text-gray-500 mt-1">
                Normalisiert: "{cleanWord}"
              </div>
            </div>
            <div>
              <Label htmlFor="potency">Potenz</Label>
              <Input
                id="potency"
                type="number"
                value={potency}
                onChange={(e) => setPotency(parseInt(e.target.value) || 0)}
                min={0}
                max={50000}
              />
              <div className="text-xs text-gray-500 mt-1">
                0 = Ursubstanz/Urtinktur
              </div>
            </div>
            <div>
              <Label htmlFor="potencyType">Typ</Label>
              <Select value={potencyType} onValueChange={(value) => setPotencyType(value as any)}>
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
          <Button onClick={handleCalculate} className="w-full">
            <Calculator className="h-4 w-4 mr-2" />
            Modernisierten Algorithmus visualisieren
          </Button>
          
          {/* LIVE PREVIEW der finalen Rate */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg text-center border-2 border-green-300">
            <div className="text-lg text-gray-700 mb-2">
              "{cleanWord}" {potencyType}{potency}{potency === 0 ? ' (Ursubstanz)' : ''}
            </div>
            <div className="text-3xl font-bold text-green-800">
              {finalRate.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Live-Vorschau der Bruce Copen Rate
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Klientendaten Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-purple-800 flex items-center justify-center gap-2">
            <User className="h-6 w-6" />
            Klientendaten & Personalisierte Rate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Vorname</Label>
              <Input
                id="firstName"
                value={clientFirstName}
                onChange={(e) => setClientFirstName(e.target.value)}
                placeholder="z.B. Max"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Nachname</Label>
              <Input
                id="lastName"
                value={clientLastName}
                onChange={(e) => setClientLastName(e.target.value)}
                placeholder="z.B. Mustermann"
              />
            </div>
            <div>
              <Label htmlFor="birthDate">Geburtsdatum</Label>
              <Input
                id="birthDate"
                type="date"
                value={clientBirthDate}
                onChange={(e) => setClientBirthDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="birthPlace">Geburtsort</Label>
              <Input
                id="birthPlace"
                value={clientBirthPlace}
                onChange={(e) => setClientBirthPlace(e.target.value)}
                placeholder="z.B. Berlin"
              />
            </div>
          </div>

          {/* Klienten-Rate Anzeige */}
          {(clientFirstName || clientLastName || clientBirthDate || clientBirthPlace) && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg text-center border-2 border-purple-300 mt-4">
              <div className="text-lg text-gray-700 mb-2">
                Persönliche Rate: {clientFirstName} {clientLastName}
              </div>
              <div className="text-3xl font-bold text-purple-800">
                {clientRate.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Berechnet aus Klientendaten nach Copen-Algorithmus
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Harmonisierungs-Timer Card */}
      <Card className="border-2 border-blue-400">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-800 flex items-center justify-center gap-2">
            <Zap className="h-6 w-6" />
            Zeitgesteuerte Harmonisierung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Harmonisierungsdauer (Sekunden)</Label>
              <Input
                id="duration"
                type="number"
                value={harmonizationDuration}
                onChange={(e) => setHarmonizationDuration(parseInt(e.target.value) || 60)}
                min={1}
                max={3600}
                disabled={isHarmonizing}
              />
            </div>
            <div className="flex items-end gap-2">
              <Button 
                onClick={startHarmonization} 
                disabled={isHarmonizing}
                className="flex-1"
              >
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
              <Button 
                onClick={pauseHarmonization} 
                disabled={!isHarmonizing}
                variant="outline"
                className="flex-1"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button 
                onClick={resetHarmonization}
                variant="outline"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Fortschrittsanzeige */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{elapsedTime.toFixed(1)}s / {harmonizationDuration}s</span>
              <span>{harmonizationProgress.toFixed(1)}%</span>
            </div>
            <Progress value={harmonizationProgress} className="h-3" />
          </div>

          {/* Aktive Harmonisierung - Raten-Anzeige */}
          {(isHarmonizing || elapsedTime > 0) && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wortenergie-Rate */}
                <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-lg border-2 border-green-400">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Wortenergie-Rate</div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {cleanWord} {potencyType}{potency}
                    </div>
                    <div className={`text-2xl font-bold text-green-800 ${isHarmonizing ? 'animate-pulse' : ''}`}>
                      {finalRate.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Klienten-Rate */}
                <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-4 rounded-lg border-2 border-purple-400">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Klienten-Rate</div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {clientFirstName} {clientLastName}
                    </div>
                    <div className={`text-2xl font-bold text-purple-800 ${isHarmonizing ? 'animate-pulse' : ''}`}>
                      {clientRate.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className={`text-center p-3 rounded-lg ${
                isHarmonizing 
                  ? 'bg-blue-100 border-2 border-blue-400' 
                  : elapsedTime >= harmonizationDuration 
                    ? 'bg-green-100 border-2 border-green-400'
                    : 'bg-yellow-100 border-2 border-yellow-400'
              }`}>
                <div className="font-semibold">
                  {isHarmonizing 
                    ? '⚡ Harmonisierung läuft...' 
                    : elapsedTime >= harmonizationDuration 
                      ? '✅ Harmonisierung abgeschlossen'
                      : '⏸️ Harmonisierung pausiert'}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showCalculation && (
        <div className="space-y-6">
          {/* Schritt 1: Buchstabenwerte */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-green-700">
                Schritt 1: Modernisierte Buchstabenwerte (Leerzeichen beibehalten)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                {letterValues.map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-lg text-center border text-sm ${
                      item.isSpace 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-green-50 border-green-200'
                    }`}
                  >
                    {item.isSpace ? (
                      <>
                        <div className="text-lg text-gray-400">⎵</div>
                        <div className="text-xs text-gray-400">Leer</div>
                      </>
                    ) : (
                      <>
                        <div className="text-lg font-bold text-green-800">{item.letter}</div>
                        <div className="text-xs text-gray-600">W: {item.value}</div>
                        <div className="text-xs text-gray-600">P: {item.position}</div>
                        <div className="text-sm font-semibold text-green-700 border-t pt-1 mt-1">
                          {item.weighted}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <div className="text-center text-lg">
                  <strong>Primärsumme = {letterValues
                    .filter(item => !item.isSpace)
                    .map(item => `${item.weighted}`)
                    .join(' + ')} = {primarySum}</strong>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <ArrowDown className="h-8 w-8 text-blue-500" />
          </div>

          {/* Schritt 2: Baserate */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">
                Schritt 2: Baserate-Multiplikation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-800">
                  Baserate = Primärsumme × 1000
                </div>
                <div className="text-lg mt-2">
                  {primarySum} × 1000 = <span className="font-bold text-blue-900">{baseRate.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <ArrowDown className="h-8 w-8 text-blue-500" />
          </div>

          {/* Schritt 3: Fibonacci-Modulation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-purple-700">
                Schritt 3: Fibonacci-Modulation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold text-purple-800">
                    Fibonacci-Zahlen: 8. = 21, 9. = 34
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Fibonacci-Rate = (Baserate ÷ 21) × 34
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">Baserate ÷ 21</div>
                    <div className="text-lg font-bold">{Math.floor(baseRate / 21).toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">× 34</div>
                    <div className="text-lg font-bold">×34</div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded border-2 border-purple-300">
                    <div className="text-sm text-gray-600">Fibonacci-Rate</div>
                    <div className="text-lg font-bold text-purple-800">{fibonacciRate.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <ArrowDown className="h-8 w-8 text-blue-500" />
          </div>

          {/* Schritt 4: Korrigierte Potenzanpassung */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-orange-700">
                Schritt 4: Korrigierte Potenzanpassung ({potencyType}{potency}{potency === 0 ? ' (Ursubstanz)' : ''})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold text-orange-800">
                    {potency === 0 ? 'Ursubstanz - Keine Potenzierung' : `Potenz-Faktor für ${potencyType}${potency}`}
                  </div>
                  {potency === 0 ? (
                    <div className="text-sm text-gray-600 mt-2">
                      Bei D0/C0 (Ursubstanz) wird die reine Fibonacci-Rate verwendet
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600 mt-2">
                      Potenz beeinflusst die Rate multiplikativ: 
                      {potencyType === 'D' && ` Fibonacci-Rate × (${potency}/10)`}
                      {potencyType === 'C' && ` Fibonacci-Rate × (${potency}/5)`}
                      {potencyType === 'LM' && ` Fibonacci-Rate × (${potency}/2)`}
                      {potencyType === 'M' && ` Fibonacci-Rate × ${potency}`}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">Fibonacci-Rate</div>
                    <div className="text-lg font-bold">{fibonacciRate.toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">Potenz-Bonus</div>
                    <div className="text-lg font-bold">+{potencyModifier.toLocaleString()}</div>
                  </div>
                  <div className="bg-orange-100 p-3 rounded border-2 border-orange-300">
                    <div className="text-sm text-gray-600">Finale Rate</div>
                    <div className="text-xl font-bold text-orange-800">{finalRate.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endergebnis */}
          <Card className="border-2 border-green-400">
            <CardHeader>
              <CardTitle className="text-xl text-center text-green-800">
                🎯 Modernisierte Bruce Copen Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg text-center">
                <div className="text-lg text-gray-700 mb-2">
                  "{cleanWord}" {potencyType}{potency}{potency === 0 ? ' (Ursubstanz)' : ''}
                </div>
                <div className="text-4xl font-bold text-green-800 mb-4">
                  {finalRate.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Berechnet mit modernisiertem Copen-Algorithmus<br/>
                  ✓ Leerzeichen-Erhaltung ✓ Umlaut-Konvertierung {potency === 0 ? '✓ D0 Ursubstanz-Unterstützung' : ''}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CopenAlgorithmVisualization;
