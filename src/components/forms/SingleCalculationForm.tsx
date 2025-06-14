
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator } from 'lucide-react';
import { alphabetSystems, type AlphabetType } from '@/utils/alphabetSystems';

interface SingleCalculationFormProps {
  word: string;
  potency: number;
  potencyType: 'D' | 'C' | 'LM' | 'M';
  alphabetType: AlphabetType;
  onWordChange: (word: string) => void;
  onPotencyChange: (potency: number) => void;
  onPotencyTypeChange: (type: 'D' | 'C' | 'LM' | 'M') => void;
  onAlphabetTypeChange: (type: AlphabetType) => void;
  onCalculate: () => void;
}

const SingleCalculationForm: React.FC<SingleCalculationFormProps> = ({
  word,
  potency,
  potencyType,
  alphabetType,
  onWordChange,
  onPotencyChange,
  onPotencyTypeChange,
  onAlphabetTypeChange,
  onCalculate
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Einzelne Wortenergie berechnen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="word">Wortenergie</Label>
            <Input
              id="word"
              value={word}
              onChange={(e) => onWordChange(e.target.value)}
              placeholder="z.B. Arnica, Belladonna..."
            />
          </div>
          <div>
            <Label htmlFor="potency">Potenz</Label>
            <Input
              id="potency"
              type="number"
              value={potency}
              onChange={(e) => onPotencyChange(parseInt(e.target.value) || 0)}
              min={0}
              max={50000}
            />
            <div className="text-xs text-gray-500 mt-1">
              0 = Ursubstanz/Urtinktur
            </div>
          </div>
          <div>
            <Label htmlFor="potencyType">Typ</Label>
            <Select value={potencyType} onValueChange={onPotencyTypeChange}>
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
          <div>
            <Label htmlFor="alphabetType">Alphabet</Label>
            <Select value={alphabetType} onValueChange={onAlphabetTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(alphabetSystems).map(([key, system]) => (
                  <SelectItem key={key} value={key}>
                    {system.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-xs text-gray-500 mt-1">
              {alphabetSystems[alphabetType].description}
            </div>
          </div>
        </div>
        <Button onClick={onCalculate} className="w-full">
          <Calculator className="h-4 w-4 mr-2" />
          Copen-Rate berechnen
        </Button>
      </CardContent>
    </Card>
  );
};

export default SingleCalculationForm;
