import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, Calculator, Zap, User, Play, Pause, RotateCcw, StopCircle, Plus, Trash2, Archive } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { ActiveHarmonization } from '@/types/patient';

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

interface CloudHarmonizationSession {
  id: string;
  user_id: string;
  patient_id: string;
  word: string;
  tested_potency: string | null;
  status: string;
  duration_seconds: number;
  progress: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}
import PatientManagerCloud from './PatientManagerCloud';
import HarmonizationArchiveCloud from './HarmonizationArchiveCloud';
import DatabaseManager from './DatabaseManager';
import KozyrevIndicators from './KozyrevIndicators';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const CopenAlgorithmVisualization: React.FC = () => {
  const [word, setWord] = useState('NUX VOMICA');
  const [potency, setPotency] = useState(6);
  const [potencyType, setPotencyType] = useState<'D' | 'C' | 'LM' | 'M' | 'F1' | 'F2' | 'F3'>('D');
  const [autoPotency, setAutoPotency] = useState(false);
  const [kozyrevEnabled, setKozyrevEnabled] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  // Ausgewählter Patient
  const [selectedPatient, setSelectedPatient] = useState<CloudPatient | null>(null);
  
  // Patient-Switch-Handler: nur Auswahl setzen, keine Mutation bestehender Sitzungen
  const handlePatientSwitch = (patient: CloudPatient | null) => {
    setSelectedPatient(patient);
  };
  
  const calculateClientRateFor = (patient: CloudPatient, wordEnergy: string): number => {
    const clientData = `${patient.first_name} ${patient.last_name} ${patient.birth_date} ${patient.birth_place}`;
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

  // Mehrere parallele Harmonisierungen
  const [harmonizations, setHarmonizations] = useState<ActiveHarmonization[]>([]);
  const [harmonizationDuration, setHarmonizationDuration] = useState(1);
  const [harmonizationUnit, setHarmonizationUnit] = useState<'seconds' | 'minutes' | 'hours'>('minutes');

  const { toast } = useToast();

  // Wortenergie-Normalisierung (nur Buchstaben)
  const normalizeWordEnergy = (word: string): string => {
    return word
      .toUpperCase()
      .replace(/Ä/g, 'AE')
      .replace(/Ö/g, 'OE') 
      .replace(/Ü/g, 'UE')
      .replace(/ß/g, 'SS')
      .replace(/\s*[DCLM]+\d+/g, '')
      .replace(/\d+/g, '')
      .replace(/[^A-Z\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Buchstabenwerte A=1, B=2, etc.
  const getLetterValue = (letter: string): number => {
    return letter.toUpperCase().charCodeAt(0) - 64;
  };

  const cleanWord = normalizeWordEnergy(word);

  // Auto-Potenz-Berechnung: Intelligente Ermittlung basierend auf Klientendaten
  const calculateAutoPotency = (): number => {
    if (!selectedPatient) return 6;

    // Kombinierte Datengrundlage: Wortenergie + Klientendaten
    const combinedData = `${word} ${selectedPatient.first_name} ${selectedPatient.last_name} ${selectedPatient.birth_date} ${selectedPatient.birth_place}`;
    
    // ASCII-Summe
    let sum = 0;
    for (const char of combinedData.toUpperCase().replace(/[^A-Z]/g, '')) {
      sum += char.charCodeAt(0) - 64;
    }

    // Geburtsjahr-Faktor (nur bei Kozyrev aktiv)
    const birthYear = parseInt(selectedPatient.birth_date.split('-')[0]);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    const ageModulator = kozyrevEnabled ? (1 + (age % 7) / 20) : 1; // 7-Jahres-Zyklus: +0% bis +35%
    
    // Ortsenergie (Anzahl Buchstaben im Geburtsort, nur bei Kozyrev aktiv)
    const placeEnergy = selectedPatient.birth_place.replace(/[^A-Z]/gi, '').length;
    const placeModulator = kozyrevEnabled ? (1 + (placeEnergy % 10) / 30) : 1; // +0% bis +30%
    
    // Kombinierte Summe mit Modulatoren
    const modulatedSum = Math.round(sum * ageModulator * placeModulator);

    // Alle verfügbaren Potenz-Bereiche mit F-Spektren
    const allRanges: { type: 'D' | 'C' | 'LM' | 'M' | 'F1' | 'F2' | 'F3', min: number, max: number, divisor: number }[] = [
      // Standard
      { type: 'D', min: 1, max: 100, divisor: 4 },
      { type: 'C', min: 1, max: 200, divisor: 3 },
      { type: 'LM', min: 1, max: 30, divisor: 12 },
      { type: 'M', min: 1, max: 100, divisor: 6 },
      // F1: 1MM - 10C·MMMM
      { type: 'F1', min: 30, max: 100, divisor: 3.5 },
      // F2: 100MM - 1CC·MMMM
      { type: 'F2', min: 50, max: 100, divisor: 2.5 },
      // F3: 10C·MM - 10MMMMM
      { type: 'F3', min: 80, max: 100, divisor: 1.8 },
    ];

    // Beste Potenz über alle Bereiche hinweg finden
    let bestMatch = { type: 'D' as 'D' | 'C' | 'LM' | 'M' | 'F1' | 'F2' | 'F3', potency: 1, score: Infinity };
    
    for (const range of allRanges) {
      const calculated = Math.max(range.min, Math.min(range.max, Math.floor(modulatedSum / range.divisor)));
      const targetValue = modulatedSum;
      const actualValue = calculated * range.divisor;
      const score = Math.abs(targetValue - actualValue);
      
      if (score < bestMatch.score) {
        bestMatch = { type: range.type, potency: calculated, score };
      }
    }
    
    // Typ und Potenz setzen
    if (autoPotency) {
      setPotencyType(bestMatch.type);
    }
    
    return bestMatch.potency;
  };

  const effectivePotency = autoPotency ? calculateAutoPotency() : potency;

  // Schritt 1: Buchstabenwerte berechnen
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
    
    const value = getLetterValue(char);
    
    letterValues.push({
      letter: char,
      value: value,
      position: position,
      weighted: value * position,
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

  // Schritt 4: Fibonacci-Modulation
  const fibonacciRate = Math.floor((baseRate / 21) * 34);

  // Schritt 5: Potenzanpassung
  const getPotencyModifier = () => {
    if (effectivePotency === 0) return 0;
    
    switch (potencyType) {
      case 'D':
        return Math.floor(fibonacciRate * (effectivePotency / 10));
      case 'C':
        return Math.floor(fibonacciRate * (effectivePotency / 5));
      case 'LM':
        return Math.floor(fibonacciRate * (effectivePotency / 2));
      case 'M':
        return Math.floor(fibonacciRate * effectivePotency);
      default:
        return 0;
    }
  };

  const potencyModifier = getPotencyModifier();
  const finalRate = fibonacciRate + potencyModifier;

  // KOZYREV-ERWEITERTE Klienten-Rate berechnen
  const calculateClientRate = () => {
    if (!selectedPatient) return 0;

    const clientData = `${selectedPatient.first_name} ${selectedPatient.last_name} ${selectedPatient.birth_date} ${selectedPatient.birth_place}`;
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
    let clientFibonacciRate = Math.floor((clientBaseRate / 21) * 34);
    
    // KOZYREV-HARDWARE-QUANTENEFFEKTE
    clientFibonacciRate = applyQuantumFluctuations(clientFibonacciRate);
    
    return clientFibonacciRate;
  };

  // Hardware-Quantum-Seed (CPU-Jitter)
  const getQuantumSeed = (): number => {
    const t1 = performance.now();
    const t2 = performance.now();
    const jitter = Math.abs(t2 - t1);
    return jitter * 1000000;
  };

  const applyQuantumFluctuations = (baseRate: number): number => {
    const quantumSeed = getQuantumSeed();
    const fluctuation = (quantumSeed % 100) / 1000;
    const modulatedRate = baseRate * (1 + fluctuation - 0.05);
    return Math.round(modulatedRate);
  };

  const clientRate = calculateClientRate();

  const handleCalculate = () => {
    setShowCalculation(true);
  };

  // Cloud-Persistenz: Harmonisierungen laden beim Mount UND bei Rückkehr zur App
  useEffect(() => {
    const loadActiveHarmonizations = async () => {
      if (!selectedPatient) return;
      
      try {
        const { data: sessions, error } = await supabase
          .from('harmonization_sessions')
          .select('*')
          .eq('patient_id', selectedPatient.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Fehler beim Laden der Harmonisierungen:', error);
          return;
        }
        
        if (sessions && sessions.length > 0) {
          console.log('Lade aktive Harmonisierungen aus Backend:', sessions);
          
          // Konvertiere zu ActiveHarmonization Format mit korrekten Raten
          const activeHarms: ActiveHarmonization[] = sessions.map(session => {
            // Wortenergie-Rate neu berechnen
            const normalizedWord = normalizeWordEnergy(session.word);
            let sum = 0;
            let pos = 1;
            for (let i = 0; i < normalizedWord.length; i++) {
              const char = normalizedWord[i];
              if (char === ' ') continue;
              const value = getLetterValue(char);
              sum += value * pos;
              pos++;
            }
            const baseRate = sum * 1000;
            const wordRate = Math.floor((baseRate / 21) * 34);
            
            return {
              id: session.id,
              patientId: session.patient_id,
              word: session.word,
              potency: parseInt(session.tested_potency || '6'),
              potencyType: 'D',
              wordRate: wordRate,
              clientRate: calculateClientRateFor(selectedPatient, session.word),
              duration: Math.floor(session.duration_seconds / 60),
              durationUnit: 'minutes',
              status: 'active',
              elapsedTime: session.progress || 0,
              progress: session.progress || 0
            };
          });
          
          setHarmonizations(activeHarms);
          
          toast({
            title: "Harmonisierungen geladen",
            description: `${activeHarms.length} aktive Session(s) wiederhergestellt`,
          });
        }
      } catch (err) {
        console.error('Fehler:', err);
      }
    };
    
    loadActiveHarmonizations();
    
    // Realtime-Subscription für Status-Updates
    const channel = supabase
      .channel('harmonization_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'harmonization_sessions',
          filter: selectedPatient ? `patient_id=eq.${selectedPatient.id}` : undefined,
        },
        (payload) => {
          console.log('Harmonization change detected:', payload);
          loadActiveHarmonizations();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedPatient]);

  // Harmonisierungs-Timer: nur Zeit/Progress, Raten bleiben konstant (Modulation beeinflusst nicht die Rate)
  useEffect(() => {
    const interval = setInterval(() => {
      setHarmonizations(prev => {
        const updated = prev.map(harm => {
          if (harm.status !== 'active') return harm;

          const durationInSeconds = harm.durationUnit === 'hours' 
            ? harm.duration * 3600 
            : harm.durationUnit === 'minutes' 
              ? harm.duration * 60 
              : harm.duration;

          const newElapsedTime = harm.elapsedTime + 0.1;

          if (newElapsedTime >= durationInSeconds) {
            const patient = selectedPatient;
            if (patient) {
              const combinedData = `${harm.word} ${patient.first_name} ${patient.last_name} ${patient.birth_date}`;
              let sum = 0;
              for (const char of combinedData.toUpperCase().replace(/[^A-Z]/g, '')) {
                sum += char.charCodeAt(0) - 64;
              }

              const ranges = {
                D: [1, 100],
                C: [1, 200],
                LM: [1, 30],
                M: [1, 100],
              } as const;
              const [min, max] = ranges[harm.potencyType];
              const testedPotency = Math.max(min, Math.min(max, Math.floor(sum / 10)));

              const completedSession = {
                id: harm.id,
                patientId: harm.patientId,
                word: harm.word,
                potency: harm.potency,
                potencyType: harm.potencyType,
                wordRate: harm.wordRate,
                clientRate: harm.clientRate,
                duration: harm.duration,
                durationUnit: harm.durationUnit,
                status: 'completed' as const,
                completedAt: new Date().toISOString(),
                testedPotency: testedPotency,
              };
              archiveSession(completedSession);

              toast({
                title: 'Harmonisierung abgeschlossen ✅',
                description: `${harm.word} • Getestete Potenz: ${harm.potencyType}${testedPotency}`,
              });
            } else {
              const completedSession = {
                id: harm.id,
                patientId: harm.patientId,
                word: harm.word,
                potency: harm.potency,
                potencyType: harm.potencyType,
                wordRate: harm.wordRate,
                clientRate: harm.clientRate,
                duration: harm.duration,
                durationUnit: harm.durationUnit,
                status: 'completed' as const,
                completedAt: new Date().toISOString(),
              };
              archiveSession(completedSession);

              toast({
                title: 'Harmonisierung abgeschlossen ✅',
                description: `${harm.word} ${harm.potencyType}${harm.potency}`,
              });
            }

            return { ...harm, status: 'completed' as const, elapsedTime: durationInSeconds, progress: 100 };
          }

          return {
            ...harm,
            elapsedTime: newElapsedTime,
            progress: (newElapsedTime / durationInSeconds) * 100,
          };
        });

        setTimeout(() => {
          setHarmonizations(current => current.filter(h => h.status !== 'completed'));
        }, 3000);

        return updated;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [selectedPatient, toast]);

  const archiveSession = async (session: any) => {
    // Cloud-Persistenz wird über HarmonizationArchiveCloud gehandhabt
  };

  const startNewHarmonization = () => {
    if (!selectedPatient) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie zuerst einen Patienten aus",
        variant: "destructive"
      });
      return;
    }

    const newHarmonization: ActiveHarmonization = {
      id: Date.now().toString(),
      patientId: selectedPatient.id,
      word: cleanWord,
      potency: effectivePotency,
      potencyType: potencyType,
      wordRate: finalRate,
      clientRate: clientRate,
      duration: harmonizationDuration,
      durationUnit: harmonizationUnit,
      status: 'active',
      elapsedTime: 0,
      progress: 0
    };

    setHarmonizations(prev => [...prev, newHarmonization]);
    toast({
      title: "Harmonisierung gestartet",
      description: `${cleanWord} ${potencyType}${effectivePotency}`,
    });
  };

  const pauseHarmonization = (id: string) => {
    setHarmonizations(prev => prev.map(h => 
      h.id === id ? { ...h, status: 'paused' as const } : h
    ));
  };

  const resumeHarmonization = (id: string) => {
    setHarmonizations(prev => prev.map(h => 
      h.id === id ? { ...h, status: 'active' as const } : h
    ));
  };

  const stopHarmonization = (id: string) => {
    const session = harmonizations.find(h => h.id === id);
    if (session) {
      const stoppedSession = {
        id: session.id,
        patientId: session.patientId,
        word: session.word,
        potency: session.potency,
        potencyType: session.potencyType,
        wordRate: session.wordRate,
        clientRate: session.clientRate,
        duration: session.duration,
        durationUnit: session.durationUnit,
        status: 'stopped' as const,
        completedAt: new Date().toISOString()
      };
      archiveSession(stoppedSession);
      
      setHarmonizations(prev => prev.filter(h => h.id !== id));
      toast({
        title: "Harmonisierung gestoppt",
        description: "Session wurde archiviert",
      });
    }
  };

  // Export erfolgt über Cloud-Komponenten

  // Export erfolgt über Cloud-Komponenten

  const removeHarmonization = (id: string) => {
    setHarmonizations(prev => prev.filter(h => h.id !== id));
  };

  const reactivateSession = (session: any) => {
    if (!selectedPatient || session.patient_id !== selectedPatient.id) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie den zugehörigen Patienten aus",
        variant: "destructive"
      });
      return;
    }

    const reactivatedHarmonization: ActiveHarmonization = {
      id: Date.now().toString(),
      patientId: session.patient_id,
      word: session.word,
      potency: parseInt(session.tested_potency || '0'),
      potencyType: 'D',
      wordRate: 0,
      clientRate: 0,
      duration: Math.floor(session.duration_seconds / 60),
      durationUnit: 'minutes',
      status: 'active',
      elapsedTime: 0,
      progress: 0
    };

    setHarmonizations(prev => [...prev, reactivatedHarmonization]);
    toast({
      title: "Harmonisierung reaktiviert",
      description: `${session.word} ${session.potencyType}${session.potency}`,
    });
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const getDurationInSeconds = (duration: number, unit: string) => {
    if (unit === 'hours') return duration * 3600;
    if (unit === 'minutes') return duration * 60;
    return duration;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Patientenverwaltung */}
      <PatientManagerCloud 
        onSelectPatient={handlePatientSwitch}
        selectedPatient={selectedPatient}
      />

      {/* Kozyrev-Indikatoren */}
      {kozyrevEnabled && selectedPatient && (
        <KozyrevIndicators 
          selectedPatient={selectedPatient}
          wordEnergy={cleanWord}
          autoPotency={kozyrevEnabled}
        />
      )}

      <Card>
        <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Zap className="h-6 w-6" />
            Bruce Copen Algorithmus
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground mt-2">
            ✓ Authentischer Algorithmus • ✓ Automatische Potenzermittlung • ✓ Parallele Harmonisierungen
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
                placeholder="z.B. Nux vomica"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Normalisiert: "{cleanWord}"
              </div>
            </div>
            <div>
              <Label htmlFor="potency">Potenz {autoPotency && '(Auto)'}</Label>
              <Input
                id="potency"
                type="number"
                value={autoPotency ? effectivePotency : potency}
                onChange={(e) => setPotency(parseInt(e.target.value) || 0)}
                min={0}
                max={50000}
                disabled={autoPotency}
              />
              <div className="text-xs text-muted-foreground mt-1">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={autoPotency}
                    onChange={(e) => setAutoPotency(e.target.checked)}
                    className="rounded"
                  />
                  Auto-Potenz
                </label>
              </div>
            </div>
            <div>
              <Label htmlFor="potencyType">Typ {autoPotency && '(Auto)'}</Label>
              <Select value={potencyType} onValueChange={(value) => setPotencyType(value as any)} disabled={autoPotency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="D">D (Dezimal 1-100)</SelectItem>
                  <SelectItem value="C">C (Centesimal 1-200)</SelectItem>
                  <SelectItem value="LM">LM (50-Millesimal 1-30)</SelectItem>
                  <SelectItem value="M">M (Millennial 1-100MM)</SelectItem>
                  <SelectItem value="F1">F/1 (1MM - 10C·MMMM)</SelectItem>
                  <SelectItem value="F2">F/2 (100MM - 1CC·MMMM)</SelectItem>
                  <SelectItem value="F3">F/3 (10C·MM - 10MMMMM)</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground mt-1">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={kozyrevEnabled}
                    onChange={(e) => setKozyrevEnabled(e.target.checked)}
                    className="rounded"
                  />
                  Kozyrev-Modulation
                </label>
              </div>
            </div>
          </div>
          <Button onClick={handleCalculate} className="w-full">
            <Calculator className="h-4 w-4 mr-2" />
            Algorithmus visualisieren
          </Button>
          
          {/* LIVE PREVIEW der finalen Rate */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/20 p-4 rounded-lg text-center border-2">
            <div className="text-lg mb-2">
              "{cleanWord}" {potencyType}{effectivePotency}{effectivePotency === 0 ? ' (Ursubstanz)' : ''}
              {kozyrevEnabled && ' • Kozyrev aktiv'}
            </div>
            <div className="text-3xl font-bold">
              {finalRate.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Live-Vorschau der Bruce Copen Rate
            </div>
          </div>

          {/* Klienten-Rate */}
          {selectedPatient && clientRate > 0 && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg text-center border-2 border-purple-300">
              <div className="text-lg mb-2">
                Persönliche Rate: {selectedPatient.first_name} {selectedPatient.last_name}
              </div>
              <div className="text-3xl font-bold text-purple-800">
                {clientRate.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Berechnet aus Klientendaten
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Parallele Harmonisierungen */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Zap className="h-6 w-6" />
            Parallele Harmonisierungen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Neue Harmonisierung starten */}
          <div className="border-2 border-dashed rounded-lg p-4 bg-muted/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <div>
                <Label>Dauer</Label>
                <Input
                  type="number"
                  value={harmonizationDuration}
                  onChange={(e) => setHarmonizationDuration(parseInt(e.target.value) || 1)}
                  min={1}
                  max={24}
                />
              </div>
              <div>
                <Label>Zeiteinheit</Label>
                <Select value={harmonizationUnit} onValueChange={(v) => setHarmonizationUnit(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seconds">Sekunden</SelectItem>
                    <SelectItem value="minutes">Minuten</SelectItem>
                    <SelectItem value="hours">Stunden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={startNewHarmonization} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Harmonisierung starten
              </Button>
            </div>
          </div>

          {/* Aktive Harmonisierungen */}
          {(selectedPatient ? harmonizations.filter(h => h.patientId === selectedPatient.id) : harmonizations).length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Keine aktiven Harmonisierungen
            </p>
          ) : (
            <div className="space-y-3">
              {(selectedPatient ? harmonizations.filter(h => h.patientId === selectedPatient.id) : harmonizations).map(harm => {
                const totalSeconds = getDurationInSeconds(harm.duration, harm.durationUnit);
                return (
                  <div key={harm.id} className={`border-2 rounded-lg p-4 ${
                    harm.status === 'completed' ? 'bg-green-50 border-green-400' :
                    harm.status === 'paused' ? 'bg-yellow-50 border-yellow-400' :
                    'bg-blue-50 border-blue-400'
                  }`}>
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                         <div>
                           <div className="font-semibold text-lg">
                             {harm.word} {harm.potencyType}{harm.potency}
                           </div>
                           {selectedPatient && harm.patientId === selectedPatient.id && (
                             <div className="text-sm text-muted-foreground">
                               🔵 Aktiver Patient: {selectedPatient.first_name} {selectedPatient.last_name}
                             </div>
                           )}
                           {selectedPatient && harm.patientId !== selectedPatient.id && (
                             <div className="text-sm text-orange-600">
                               ⚠️ Anderer Patient (nicht aktiv)
                             </div>
                           )}
                         </div>
                        <div className="flex gap-1">
                          {harm.status === 'active' && (
                            <Button onClick={() => pauseHarmonization(harm.id)} size="sm" variant="outline">
                              <Pause className="h-4 w-4" />
                            </Button>
                          )}
                          {harm.status === 'paused' && (
                            <Button onClick={() => resumeHarmonization(harm.id)} size="sm" variant="outline">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button onClick={() => stopHarmonization(harm.id)} size="sm" variant="outline">
                            <StopCircle className="h-4 w-4" />
                          </Button>
                          {harm.status === 'completed' && (
                            <Button onClick={() => removeHarmonization(harm.id)} size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-sm text-muted-foreground mb-1">
                          <span>{formatTime(harm.elapsedTime)} / {formatTime(totalSeconds)}</span>
                          <span>{harm.progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={harm.progress} className="h-2" />
                      </div>

                      {/* Raten */}
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-background/50 p-2 rounded">
                          <div className="text-muted-foreground">Wortenergie-Rate</div>
                          <div className={`font-bold ${harm.status === 'active' ? 'animate-pulse' : ''}`}>
                            {harm.wordRate.toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-background/50 p-2 rounded">
                          <div className="text-muted-foreground">Klienten-Rate</div>
                          <div className={`font-bold ${harm.status === 'active' ? 'animate-pulse' : ''}`}>
                            {harm.clientRate.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="text-center text-sm font-semibold">
                        {harm.status === 'active' && '⚡ Läuft...'}
                        {harm.status === 'paused' && '⏸️ Pausiert'}
                        {harm.status === 'completed' && '✅ Abgeschlossen'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Datenbank-Manager */}
      <DatabaseManager selectedPatient={selectedPatient} />

      {/* Archiv */}
      {selectedPatient && (
        <HarmonizationArchiveCloud 
          patientId={selectedPatient.id} 
          onReactivate={reactivateSession}
        />
      )}

      {showCalculation && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Schritt 1: Buchstabenwerte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                {letterValues.map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-lg text-center border text-sm ${
                      item.isSpace 
                        ? 'bg-muted border-muted' 
                        : /\d/.test(item.letter)
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-primary/10 border-primary/20'
                    }`}
                  >
                    {item.isSpace ? (
                      <>
                        <div className="text-lg text-muted-foreground">⎵</div>
                        <div className="text-xs text-muted-foreground">Leer</div>
                      </>
                    ) : (
                      <>
                        <div className="text-lg font-bold">{item.letter}</div>
                        <div className="text-xs text-muted-foreground">W: {item.value}</div>
                        <div className="text-xs text-muted-foreground">P: {item.position}</div>
                        <div className="text-sm font-semibold border-t pt-1 mt-1">
                          {item.weighted}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Schritt 2-5: Berechnungsschritte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Primärsumme</div>
                  <div className="text-2xl font-bold">{primarySum}</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Baserate (×1000)</div>
                  <div className="text-2xl font-bold">{baseRate.toLocaleString()}</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Fibonacci-Rate (÷21×34)</div>
                  <div className="text-2xl font-bold">{fibonacciRate.toLocaleString()}</div>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
                  <div className="text-sm text-muted-foreground">Finale Rate (+Potenz)</div>
                  <div className="text-2xl font-bold">{finalRate.toLocaleString()}</div>
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
