
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, Calculator, Zap } from 'lucide-react';

const CopenAlgorithmVisualization: React.FC = () => {
  const [word, setWord] = useState('ARNICA');
  const [potency, setPotency] = useState(6);
  const [potencyType, setPotencyType] = useState<'D' | 'C' | 'LM' | 'M'>('D');
  const [showCalculation, setShowCalculation] = useState(false);

  // Buchstabenwerte A=1, B=2, etc.
  const getLetterValue = (letter: string): number => {
    return letter.toUpperCase().charCodeAt(0) - 64;
  };

  // Schritt 1: Buchstabenwerte berechnen
  const letterValues = word.split('').map((letter, index) => ({
    letter: letter.toUpperCase(),
    value: getLetterValue(letter),
    position: index + 1,
    weighted: getLetterValue(letter) * (index + 1)
  }));

  // Schritt 2: Primärsumme
  const primarySum = letterValues.reduce((sum, item) => sum + item.weighted, 0);

  // Schritt 3: Baserate
  const baseRate = primarySum * 1000;

  // Schritt 4: Fibonacci-Modulation (21 = 8. Fib, 34 = 9. Fib)
  const fibonacciRate = Math.floor((baseRate / 21) * 34);

  // Schritt 5: Potenzanpassung
  const getPotencyModifier = () => {
    const digits = fibonacciRate.toString().length;
    switch (potencyType) {
      case 'D':
        return potency * Math.pow(10, digits - 1);
      case 'C':
        return potency * Math.pow(10, digits);
      case 'LM':
        return 50 * Math.pow(10, digits);
      case 'M':
        return 100 * Math.pow(10, digits);
      default:
        return 0;
    }
  };

  const potencyModifier = getPotencyModifier();
  const finalRate = fibonacciRate + potencyModifier;

  const handleCalculate = () => {
    setShowCalculation(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-800 flex items-center justify-center gap-2">
            <Zap className="h-6 w-6" />
            Bruce Copen Algorithmus - Grafische Darstellung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="word">Wortenergie</Label>
              <Input
                id="word"
                value={word}
                onChange={(e) => setWord(e.target.value.toUpperCase())}
                placeholder="z.B. ARNICA"
              />
            </div>
            <div>
              <Label htmlFor="potency">Potenz</Label>
              <Input
                id="potency"
                type="number"
                value={potency}
                onChange={(e) => setPotency(parseInt(e.target.value) || 6)}
                min={1}
                max={50000}
              />
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
            Algorithmus visualisieren
          </Button>
        </CardContent>
      </Card>

      {showCalculation && (
        <div className="space-y-6">
          {/* Schritt 1: Buchstabenwerte */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-green-700">
                Schritt 1: Buchstabenwerte mit Positionsgewichtung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {letterValues.map((item, index) => (
                  <div key={index} className="bg-green-50 p-3 rounded-lg text-center border">
                    <div className="text-2xl font-bold text-green-800">{item.letter}</div>
                    <div className="text-sm text-gray-600">Wert: {item.value}</div>
                    <div className="text-sm text-gray-600">Pos: {item.position}</div>
                    <div className="text-lg font-semibold text-green-700 mt-2 border-t pt-2">
                      {item.value} × {item.position} = {item.weighted}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <div className="text-center text-lg">
                  <strong>Primärsumme = {letterValues.map(item => `${item.weighted}`).join(' + ')} = {primarySum}</strong>
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

          {/* Schritt 4: Potenzanpassung */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-orange-700">
                Schritt 4: Potenzanpassung ({potencyType}{potency})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold text-orange-800">
                    Potenz-Modifier für {potencyType}{potency}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">Fibonacci-Rate</div>
                    <div className="text-lg font-bold">{fibonacciRate.toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">Potenz-Modifier</div>
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
                🎯 Authentische Bruce Copen Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg text-center">
                <div className="text-lg text-gray-700 mb-2">
                  {word} {potencyType}{potency}
                </div>
                <div className="text-4xl font-bold text-green-800 mb-4">
                  {finalRate.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Berechnet nach Original Copen-Algorithmus (1978-1995)
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
