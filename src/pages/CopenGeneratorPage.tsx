
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { calculateCopenRate, validateWordEnergy, exportCopenRatesToCSV, type CopenRateResult } from '@/utils/copenRateGenerator';
import { type AlphabetType } from '@/utils/alphabetSystems';
import SingleCalculationForm from '@/components/forms/SingleCalculationForm';
import ResultsTable from '@/components/tables/ResultsTable';
import PatientManagerCloud from '@/components/PatientManagerCloud';
import HarmonizationArchiveCloud from '@/components/HarmonizationArchiveCloud';
import AnalysisArchiveCloud from '@/components/AnalysisArchiveCloud';
import UserMenu from '@/components/UserMenu';

// Cloud Patient Type (from database)
interface CloudPatient {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  birth_place: string;
  created_at: string;
  updated_at: string;
}

const CopenGeneratorPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [singleWord, setSingleWord] = useState('');
  const [singlePotency, setSinglePotency] = useState(6);
  const [singlePotencyType, setSinglePotencyType] = useState<'D' | 'C' | 'LM' | 'M'>('D');
  const [singleAlphabetType, setSingleAlphabetType] = useState<AlphabetType>('latin');
  const [results, setResults] = useState<CopenRateResult[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<CloudPatient | null>(null);

  const handleSingleCalculation = () => {
    const validation = validateWordEnergy(singleWord);
    if (!validation.valid) {
      toast({
        title: 'Eingabefehler',
        description: validation.error,
        variant: 'destructive'
      });
      return;
    }

    const result = calculateCopenRate(singleWord, singlePotency, singlePotencyType, singleAlphabetType);
    setResults(prev => [result, ...prev]);
    
    toast({
      title: 'Rate berechnet',
      description: `${result.word} ${result.potencyType}${result.potency}: ${result.rate}`
    });
  };

  const handleExport = () => {
    if (results.length === 0) {
      toast({
        title: 'Keine Daten',
        description: 'Keine Ergebnisse zum Exportieren vorhanden',
        variant: 'destructive'
      });
      return;
    }

    const csvContent = exportCopenRatesToCSV(results);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `copen-raten-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast({
      title: 'Export erfolgreich',
      description: `${results.length} Raten exportiert`
    });
  };

  const clearResults = () => {
    setResults([]);
    toast({
      title: 'Ergebnisse gelöscht',
      description: 'Alle berechneten Raten wurden entfernt'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Übersicht
          </Button>
          <UserMenu />
        </div>

        <Card className="mb-8 bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-white flex items-center justify-center gap-3">
              <Zap className="h-8 w-8 text-blue-300" />
              Bruce Copen Raten-Generator
            </CardTitle>
            <p className="text-center text-blue-200 text-lg">
              Authentische Umwandlung von Wortenergien nach Original Copen-Algorithmus (1978-1995)
            </p>
          </CardHeader>
        </Card>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <SingleCalculationForm
                word={singleWord}
                potency={singlePotency}
                potencyType={singlePotencyType}
                alphabetType={singleAlphabetType}
                onWordChange={setSingleWord}
                onPotencyChange={setSinglePotency}
                onPotencyTypeChange={setSinglePotencyType}
                onAlphabetTypeChange={setSingleAlphabetType}
                onCalculate={handleSingleCalculation}
              />
            </CardContent>
          </Card>

          <ResultsTable
            results={results}
            onExport={handleExport}
            onClear={clearResults}
          />

          {/* Cloud-Patientenverwaltung */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <PatientManagerCloud
              selectedPatient={selectedPatient}
              onSelectPatient={setSelectedPatient}
            />
            <HarmonizationArchiveCloud
              patientId={selectedPatient?.id}
            />
          </div>

          {/* Analysearchiv (12+1 Ebenen) */}
          <AnalysisArchiveCloud />
        </div>
      </div>
    </div>
  );
};

export default CopenGeneratorPage;
