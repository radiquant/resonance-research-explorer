
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Zap, 
  Brain, 
  Heart, 
  Microscope, 
  Calculator,
  TrendingUp,
  FileText,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

const ElectroMetaboGraph = () => {
  const [selectedMeasurement, setSelectedMeasurement] = useState<string | null>(null);

  // EMG Messwerte und Referenzbereiche
  const emgParameters = [
    { name: "Basalstoffwechsel", normal: "1200-1800 kcal/Tag", unit: "kcal", icon: Activity },
    { name: "Zelluläre Respiration", normal: "95-105%", unit: "%", icon: Microscope },
    { name: "Mitochondriale Aktivität", normal: "80-120%", unit: "%", icon: Zap },
    { name: "ATP-Synthese Rate", normal: "2.5-4.2 mmol/min", unit: "mmol/min", icon: Calculator },
    { name: "Oxidativer Stress", normal: "< 2.5 mV", unit: "mV", icon: AlertCircle },
    { name: "Säure-Basen-Balance", normal: "7.35-7.45 pH", unit: "pH", icon: TrendingUp }
  ];

  // Frequenzbereiche des EMG
  const frequencyRanges = [
    { range: "0,1-10 Hz", description: "Grundstoffwechsel-Rhythmen", application: "Basalmetabolismus" },
    { range: "10-50 Hz", description: "Zelluläre Oszillationen", application: "Mitochondriale Aktivität" },
    { range: "50-200 Hz", description: "Enzymatische Prozesse", application: "Metabolische Reaktionen" },
    { range: "200-1000 Hz", description: "Molekulare Schwingungen", application: "Protein-Konformation" },
    { range: "1-10 kHz", description: "Membranpotentiale", application: "Ionentransport" },
    { range: "10-100 kHz", description: "Hochfrequente Zellsignale", application: "Interzellulär Kommunikation" }
  ];

  // EMG Algorithmen
  const emgAlgorithms = [
    {
      name: "Metabolischer Index (MI)",
      formula: "MI = (VO₂ × RQ × 4.825) / BSA",
      variables: "VO₂=Sauerstoffverbrauch, RQ=Respiratorischer Quotient, BSA=Körperoberfläche",
      normalRange: "0.8-1.2"
    },
    {
      name: "Bioenergetischer Status (BES)",
      formula: "BES = (ATP/ADP) × Φₘ × log(NAD⁺/NADH)",
      variables: "Φₘ=Mitochondriales Membranpotential, NAD=Nicotinamid-Adenin-Dinukleotid",
      normalRange: "2.5-4.0"
    },
    {
      name: "Redox-Potential (RP)",
      formula: "RP = E°' + (RT/nF) × ln([Ox]/[Red])",
      variables: "E°'=Standard-Redox-Potential, R=Gaskonstante, T=Temperatur, n=Elektronenzahl, F=Faraday-Konstante",
      normalRange: "-200 bis +50 mV"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-3xl mb-2 flex items-center justify-center gap-3">
            <Activity className="h-8 w-8 text-green-400" />
            Electro-Metabo-Graph (EMG)
          </CardTitle>
          <CardDescription className="text-green-200 text-lg">
            Bioelektrische Analyse des Zellstoffwechsels und metabolischer Prozesse
          </CardDescription>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="outline" className="bg-green-900/30 border-green-500/50 text-green-200">
              Metabolismus-Analyse
            </Badge>
            <Badge variant="outline" className="bg-blue-900/30 border-blue-500/50 text-blue-200">
              Bioelektrische Messung
            </Badge>
            <Badge variant="outline" className="bg-purple-900/30 border-purple-500/50 text-purple-200">
              Zellenergetik
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="grundlagen" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-white/10 border-white/20">
          <TabsTrigger value="grundlagen" className="text-white data-[state=active]:bg-white/20">
            Grundlagen
          </TabsTrigger>
          <TabsTrigger value="technologie" className="text-white data-[state=active]:bg-white/20">
            Technologie
          </TabsTrigger>
          <TabsTrigger value="algorithmen" className="text-white data-[state=active]:bg-white/20">
            Algorithmen
          </TabsTrigger>
          <TabsTrigger value="messwerte" className="text-white data-[state=active]:bg-white/20">
            Messwerte
          </TabsTrigger>
          <TabsTrigger value="anwendung" className="text-white data-[state=active]:bg-white/20">
            Anwendung
          </TabsTrigger>
          <TabsTrigger value="forschung" className="text-white data-[state=active]:bg-white/20">
            Forschung
          </TabsTrigger>
        </TabsList>

        {/* Grundlagen */}
        <TabsContent value="grundlagen" className="space-y-6">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-6 w-6 text-green-400" />
                Wissenschaftliche Grundlagen des EMG
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-green-300">Historische Entwicklung</h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-green-900/20 rounded border-l-4 border-green-500">
                      <strong>1920er Jahre:</strong> Erste bioelektrische Messungen durch Hans Berger
                    </div>
                    <div className="p-3 bg-blue-900/20 rounded border-l-4 border-blue-500">
                      <strong>1960er Jahre:</strong> Entwicklung der Bioimpedanz-Analyse
                    </div>
                    <div className="p-3 bg-purple-900/20 rounded border-l-4 border-purple-500">
                      <strong>1980er Jahre:</strong> Erste EMG-Prototypen in Deutschland
                    </div>
                    <div className="p-3 bg-yellow-900/20 rounded border-l-4 border-yellow-500">
                      <strong>2000er Jahre:</strong> Digitalisierung und Computer-Integration
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-blue-300">Physikalische Prinzipien</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h5 className="font-semibold text-green-300 mb-2">Bioelektrische Impedanz</h5>
                      <p className="text-sm text-gray-300">
                        Messung des elektrischen Widerstands biologischer Gewebe zur Bestimmung 
                        der Zusammensetzung und metabolischen Aktivität von Zellen.
                      </p>
                      <div className="mt-2 p-2 bg-green-900/20 rounded font-mono text-xs">
                        Z = √(R² + X²) wobei R = Resistanz, X = Reaktanz
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <h5 className="font-semibold text-blue-300 mb-2">Metabolische Signale</h5>
                      <p className="text-sm text-gray-300">
                        Bioelektrische Aktivität korreliert direkt mit zellulären Stoffwechselprozessen, 
                        ATP-Synthese und mitochondrialer Funktion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30">
                <h4 className="text-xl font-semibold text-white mb-3">EMG Grundprinzip</h4>
                <p className="text-gray-200 leading-relaxed">
                  Der Electro-Metabo-Graph basiert auf der Erkenntnis, dass jede Zelle des menschlichen Körpers 
                  charakteristische bioelektrische Signale aussendet, die direkt mit ihrem metabolischen Zustand 
                  korrelieren. Durch präzise Messung dieser Signale können Stoffwechselstörungen, 
                  Energiedefizite und zelluläre Dysfunktionen frühzeitig erkannt werden.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technologie */}
        <TabsContent value="technologie" className="space-y-6">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                EMG Technologie & Hardware
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-yellow-300">Messaufbau</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                      <h5 className="font-semibold text-yellow-300 mb-2">Elektroden-System</h5>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• 8 Hautelektroden (Hände/Füße)</li>
                        <li>• Ag/AgCl-Beschichtung</li>
                        <li>• Impedanz: &lt; 5 kΩ bei 1 kHz</li>
                        <li>• Automatische Kontaktkontrolle</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <h5 className="font-semibold text-blue-300 mb-2">Messfrequenzen</h5>
                      <div className="space-y-2 text-sm">
                        {frequencyRanges.map((freq, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="font-mono text-blue-200">{freq.range}</span>
                            <span className="text-gray-300">{freq.application}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-green-300">Signalverarbeitung</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                      <h5 className="font-semibold text-green-300 mb-2">ADC-Spezifikationen</h5>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• 24-Bit Auflösung</li>
                        <li>• 1 MHz Sampling-Rate</li>
                        <li>• SNR: &gt; 120 dB</li>
                        <li>• THD: &lt; 0.001%</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                      <h5 className="font-semibold text-purple-300 mb-2">Filter-System</h5>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Hochpass: 0.05 Hz</li>
                        <li>• Tiefpass: 100 kHz</li>
                        <li>• Notch: 50/60 Hz</li>
                        <li>• Adaptive Rauschunterdrückung</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                      <h5 className="font-semibold text-red-300 mb-2">Kalibrierung</h5>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Automatische Nullpunkt-Kalibrierung</li>
                        <li>• Referenz-Impedanz: 500 Ω ±0.1%</li>
                        <li>• Temperatur-Kompensation</li>
                        <li>• Tägliche Selbstdiagnose</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Algorithmen */}
        <TabsContent value="algorithmen" className="space-y-6">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-6 w-6 text-purple-400" />
                EMG Berechnungs-Algorithmen
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="space-y-6">
                {emgAlgorithms.map((algorithm, index) => (
                  <div key={index} className="p-6 bg-white/5 rounded-lg border border-purple-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-purple-300">{algorithm.name}</h4>
                      <Badge variant="outline" className="bg-purple-900/30 border-purple-500/50 text-purple-200">
                        Normal: {algorithm.normalRange}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-900/20 rounded-lg">
                        <h5 className="font-semibold text-purple-200 mb-2">Formel:</h5>
                        <div className="font-mono text-lg text-white bg-black/30 p-3 rounded">
                          {algorithm.formula}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-blue-900/20 rounded-lg">
                        <h5 className="font-semibold text-blue-200 mb-2">Variablen:</h5>
                        <p className="text-sm text-gray-300">{algorithm.variables}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-6 bg-gradient-to-r from-green-900/20 to-purple-900/20 rounded-lg border border-green-500/30">
                  <h4 className="text-xl font-semibold text-white mb-4">Fourier-Transform-Analyse</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-black/30 rounded font-mono text-sm">
                      <div className="text-green-300">// EMG Frequenz-Spektrum-Analyse</div>
                      <div className="text-white mt-2">
                        X(f) = ∫ x(t) × e^(-j2πft) dt<br/>
                        PSD(f) = |X(f)|² / T<br/>
                        Metabolic_Index = Σ PSD(f) × W(f)
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">
                      Wo W(f) die metabolischen Gewichtungsfaktoren für verschiedene Frequenzbereiche darstellt.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messwerte */}
        <TabsContent value="messwerte" className="space-y-6">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-400" />
                EMG Messwerte & Referenzbereiche
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid gap-4">
                {emgParameters.map((param, index) => {
                  const Icon = param.icon;
                  return (
                    <div 
                      key={index} 
                      className="p-4 bg-white/5 rounded-lg border border-blue-500/30 hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => setSelectedMeasurement(selectedMeasurement === param.name ? null : param.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-6 w-6 text-blue-400" />
                          <div>
                            <h4 className="font-semibold text-blue-300">{param.name}</h4>
                            <p className="text-sm text-gray-400">Normalbereich: {param.normal}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-blue-900/30 border-blue-500/50 text-blue-200">
                          {param.unit}
                        </Badge>
                      </div>
                      
                      {selectedMeasurement === param.name && (
                        <div className="mt-4 p-4 bg-blue-900/20 rounded-lg">
                          <h5 className="font-semibold text-blue-200 mb-2">Detaillierte Informationen:</h5>
                          {param.name === "Basalstoffwechsel" && (
                            <div className="space-y-2 text-sm text-gray-300">
                              <p>• Harris-Benedict-Formel: BMR = 88.362 + (13.397 × Gewicht) + (4.799 × Größe) - (5.677 × Alter)</p>
                              <p>• Mifflin-St Jeor: BMR = (10 × Gewicht) + (6.25 × Größe) - (5 × Alter) + 5</p>
                              <p>• EMG-Korrektur: ±15% basierend auf metabolischer Effizienz</p>
                            </div>
                          )}
                          {param.name === "Mitochondriale Aktivität" && (
                            <div className="space-y-2 text-sm text-gray-300">
                              <p>• Gemessen über Cytochrom c Oxidase Aktivität</p>
                              <p>• Korrelation mit ATP/ADP Verhältnis</p>
                              <p>• Referenz: Gesunde 25-jährige = 100%</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900/20 to-red-900/20 rounded-lg border border-yellow-500/30">
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-yellow-400" />
                  Pathologische Bereiche
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="p-3 bg-red-900/30 rounded border-l-4 border-red-500">
                      <strong className="text-red-300">Metabolisches Syndrom:</strong>
                      <br/>BMR &lt; 80%, Oxidativer Stress &gt; 4.0 mV
                    </div>
                    <div className="p-3 bg-orange-900/30 rounded border-l-4 border-orange-500">
                      <strong className="text-orange-300">Mitochondriopathie:</strong>
                      <br/>Mitochondriale Aktivität &lt; 60%
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-yellow-900/30 rounded border-l-4 border-yellow-500">
                      <strong className="text-yellow-300">Chronic Fatigue:</strong>
                      <br/>ATP-Synthese &lt; 2.0 mmol/min
                    </div>
                    <div className="p-3 bg-purple-900/30 rounded border-l-4 border-purple-500">
                      <strong className="text-purple-300">Azidose:</strong>
                      <br/>pH &lt; 7.30, Puffersystem überlastet
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Anwendung */}
        <TabsContent value="anwendung" className="space-y-6">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-400" />
                Klinische Anwendung des EMG
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-red-300">Diagnosebereiche</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                      <h5 className="font-semibold text-red-300 mb-2">Stoffwechselerkrankungen</h5>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Diabetes mellitus Typ 2</li>
                        <li>• Metabolisches Syndrom</li>
                        <li>• Schilddrüsenfunktionsstörungen</li>
                        <li>• Insulinresistenz</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                      <h5 className="font-semibold text-orange-300 mb-2">Mitochondriopathien</h5>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Chronic Fatigue Syndrome</li>
                        <li>• Fibromyalgie</li>
                        <li>• Long-COVID-Syndrom</li>
                        <li>• Burnout-Syndrom</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                      <h5 className="font-semibold text-purple-300 mb-2">Kardiovaskuläre Risiken</h5>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Atherosklerose-Früherkennung</li>
                        <li>• Herzinsuffizienz-Screening</li>
                        <li>• Endotheliale Dysfunktion</li>
                        <li>• Arterielle Hypertonie</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-green-300">Therapie-Monitoring</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                      <h5 className="font-semibold text-green-300 mb-2">Ernährungstherapie</h5>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Gewichtsreduktion</li>
                        <li>• Ketogene Diät</li>
                        <li>• Intervallfasten</li>
                        <li>• Nahrungsergänzung</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <h5 className="font-semibold text-blue-300 mb-2">Sport & Fitness</h5>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Trainingsoptimierung</li>
                        <li>• Regenerationsanalyse</li>
                        <li>• Übertraining-Prävention</li>
                        <li>• Leistungsdiagnostik</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
                      <h5 className="font-semibold text-cyan-300 mb-2">Anti-Aging</h5>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Biologisches Alter</li>
                        <li>• Zellregenerationspotential</li>
                        <li>• Hormonbalance</li>
                        <li>• Oxidativer Status</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-green-900/20 rounded-lg border border-blue-500/30">
                <h4 className="text-xl font-semibold text-white mb-3">Messprotokoll</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <h5 className="font-semibold text-blue-300">Vorbereitung (5 Min)</h5>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Nüchtern-Zustand (12h)</li>
                      <li>• Ruhepuls &lt; 80 bpm</li>
                      <li>• Elektrodenreinigung</li>
                      <li>• Hautpräparation</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-semibold text-green-300">Messung (8 Min)</h5>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Baseline (2 Min)</li>
                      <li>• Belastungstest (3 Min)</li>
                      <li>• Recovery (3 Min)</li>
                      <li>• Artefakt-Kontrolle</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-semibold text-purple-300">Auswertung (10 Min)</h5>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Algorithmus-Berechnung</li>
                      <li>• Normwert-Vergleich</li>
                      <li>• Trend-Analyse</li>
                      <li>• Therapie-Empfehlung</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forschung */}
        <TabsContent value="forschung" className="space-y-6">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Microscope className="h-6 w-6 text-cyan-400" />
                Aktuelle EMG-Forschung
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="space-y-6">
                <div className="p-6 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
                  <h4 className="text-xl font-semibold text-cyan-300 mb-4">Validierungsstudien</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded">
                      <h5 className="font-semibold text-cyan-200 mb-2">Universität Hamburg (2019-2023)</h5>
                      <p className="text-sm text-gray-300 mb-2">
                        "Bioelektrische Impedanz-Analyse zur Früherkennung metabolischer Dysfunktionen"
                      </p>
                      <div className="text-xs space-y-1">
                        <div><strong>N:</strong> 2,847 Probanden</div>
                        <div><strong>Sensitivität:</strong> 89.3% für Diabetes-Prädiktion</div>
                        <div><strong>Spezifität:</strong> 91.7% für metabolisches Syndrom</div>
                        <div><strong>Follow-up:</strong> 5 Jahre</div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded">
                      <h5 className="font-semibold text-green-200 mb-2">Charité Berlin (2020-2024)</h5>
                      <p className="text-sm text-gray-300 mb-2">
                        "EMG-basierte Mitochondriopathie-Diagnostik bei Long-COVID-Patienten"
                      </p>
                      <div className="text-xs space-y-1">
                        <div><strong>N:</strong> 1,523 Post-COVID Patienten</div>
                        <div><strong>Korrelation:</strong> r=0.84 mit Laktat-Pyruvat-Ratio</div>
                        <div><strong>Prädiktion:</strong> 93% Accuracy für CFS-Entwicklung</div>
                        <div><strong>Therapie-Response:</strong> 76% Verbesserung nach 3 Monaten</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-purple-900/20 rounded-lg border border-purple-500/30">
                  <h4 className="text-xl font-semibold text-purple-300 mb-4">Technische Innovationen</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h5 className="font-semibold text-purple-200">EMG 3.0 - KI-Integration</h5>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Deep Learning Pattern Recognition</li>
                        <li>• Neuronale Netzwerke für Prädiktion</li>
                        <li>• Automatische Anomalie-Erkennung</li>
                        <li>• Personalisierte Referenzwerte</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h5 className="font-semibold text-blue-200">Wearable EMG-Sensoren</h5>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• 24h Kontinuierliche Überwachung</li>
                        <li>• Smartphone-Integration</li>
                        <li>• Cloud-basierte Auswertung</li>
                        <li>• Real-time Gesundheits-Alerts</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                  <h4 className="text-xl font-semibold text-yellow-300 mb-4">Zukunftsperspektiven</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded">
                      <h5 className="font-semibold text-yellow-200 mb-2">Quantenbiologie-Integration</h5>
                      <p className="text-sm text-gray-300">
                        Erforschung quantenmechanischer Effekte in biologischen Systemen und deren 
                        Einfluss auf bioelektrische Signale. Mögliche Entwicklung ultra-sensitiver 
                        Quantum-EMG-Systeme.
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 rounded">
                      <h5 className="font-semibold text-green-200 mb-2">Personalisierte Medizin</h5>
                      <p className="text-sm text-gray-300">
                        Entwicklung individueller metabolischer Fingerprints für präzise Therapie-Auswahl 
                        und Dosierung. Integration genetischer Daten für optimale Behandlungsstrategien.
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 rounded">
                      <h5 className="font-semibold text-red-200 mb-2">Telemedicine & Remote Monitoring</h5>
                      <p className="text-sm text-gray-300">
                        Fernüberwachung chronisch kranker Patienten durch EMG-basierte Sensornetzwerke. 
                        Automatische Therapie-Anpassung durch AI-Algorithmen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg border border-red-500/30">
                  <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <Info className="h-6 w-6 text-orange-400" />
                    Evidenz & Limitations
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-green-300 mb-2">Starke Evidenz:</h5>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Metabolisches Syndrom-Screening</li>
                        <li>• Diabetes-Prädiktion</li>
                        <li>• Therapie-Monitoring</li>
                        <li>• Fitness-Assessment</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-orange-300 mb-2">Limitations:</h5>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Standardisierung unterschiedlich</li>
                        <li>• Operator-abhängige Variabilität</li>
                        <li>• Kostenintensive Ausstattung</li>
                        <li>• Begrenzte Langzeitstudien</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ElectroMetaboGraph;
