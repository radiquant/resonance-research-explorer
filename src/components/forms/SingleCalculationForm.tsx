
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
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6 text-blue-300" />
          Einzelne Wortenergie berechnen
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="word" className="text-white">Wortenergie</Label>
          <Input
            id="word"
            value={word}
            onChange={(e) => onWordChange(e.target.value)}
            placeholder="z.B. Arnica, Belladonna..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        <div>
          <Label htmlFor="potency" className="text-white">Potenz</Label>
          <Input
            id="potency"
            type="number"
            value={potency}
            onChange={(e) => onPotencyChange(parseInt(e.target.value) || 0)}
            min={0}
            max={50000}
            className="bg-white/10 border-white/20 text-white"
          />
          <div className="text-xs text-blue-200 mt-1">
            0 = Ursubstanz/Urtinktur
          </div>
        </div>
        <div>
          <Label htmlFor="potencyType" className="text-white">Typ</Label>
          <Select value={potencyType} onValueChange={onPotencyTypeChange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="D" className="text-white hover:bg-slate-700">D (Dezimal)</SelectItem>
              <SelectItem value="C" className="text-white hover:bg-slate-700">C (Centesimal)</SelectItem>
              <SelectItem value="LM" className="text-white hover:bg-slate-700">LM (50-Millesimal)</SelectItem>
              <SelectItem value="M" className="text-white hover:bg-slate-700">M (Millennial)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="alphabetType" className="text-white">Alphabet</Label>
          <Select value={alphabetType} onValueChange={onAlphabetTypeChange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {Object.entries(alphabetSystems).map(([key, system]) => (
                <SelectItem key={key} value={key} className="text-white hover:bg-slate-700">
                  {system.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-xs text-blue-200 mt-1">
            {alphabetSystems[alphabetType].description}
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onCalculate} 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        size="lg"
      >
        <Calculator className="h-4 w-4 mr-2" />
        Copen-Rate berechnen
      </Button>
    </div>
  );
};

export default SingleCalculationForm;
