import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Waves, Zap, Dna, Sparkles, Heart, Brain, Calculator } from "lucide-react";
import RadionikGeneral from "@/components/theories/RadionikGeneral";
import RadionikCopen from "@/components/theories/RadionikCopen";
import HarmonikaleBaklayan from "@/components/theories/HarmonikaleBaklayan";
import BioresonanzSchmidt from "@/components/theories/BioresonanzSchmidt";
import WellengenetikGarjajev from "@/components/theories/WellengenetikGarjajev";
import ChakrenMeridiane from "@/components/theories/ChakrenMeridiane";
import TheorienBroers from "@/components/theories/TheorienBroers";
import CopenAlgorithmVisualization from "@/components/CopenAlgorithmVisualization";
import CopenRateGenerator from "@/components/CopenRateGenerator";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheory, setSelectedTheory] = useState<string | null>(null);

  const theories = [
    {
      id: "copen-rate-generator",
      title: "Bruce Copen Raten-Generator",
      description: "Praktischer Generator für Copen-Raten mit Alphabet-Auswahl",
      icon: Calculator,
      component: CopenRateGenerator
    },
    {
      id: "copen-algorithm",
      title: "Bruce Copen Algorithmus Visualisierung",
      description: "Grafische Darstellung des authentischen Copen-Algorithmus",
      icon: Zap,
      component: CopenAlgorithmVisualization
    },
    {
      id: "radionik-general",
      title: "Radionik Allgemein",
      description: "Grundlagen und Prinzipien der Radionik als energetische Heilmethode",
      icon: Waves,
      component: RadionikGeneral
    },
    {
      id: "radionik-copen",
      title: "Radionik nach Bruce Copen",
      description: "Spezifische Methoden und Geräte nach Bruce Copen",
      icon: Zap,
      component: RadionikCopen
    },
    {
      id: "harmonikale-baklayan",
      title: "Harmonikale Frequenzanwendung nach Alan Baklayan",
      description: "Frequenztherapie und harmonikale Prinzipien",
      icon: Sparkles,
      component: HarmonikaleBaklayan
    },
    {
      id: "bioresonanz-schmidt",
      title: "Bioresonanz nach Paul Schmidt - Rayonex",
      description: "Bioresonanz-Methoden und Rayonex-Technologie",
      icon: Heart,
      component: BioresonanzSchmidt
    },
    {
      id: "wellengenetik-garjajev",
      title: "Wellengenetik nach Dr. Pjotr Garjajev",
      description: "DNA-Wellengenetik und Quantenbiologie",
      icon: Dna,
      component: WellengenetikGarjajev
    },
    {
      id: "chakren-meridiane",
      title: "Erweiterte Theorien zu Chakren und Meridianen",
      description: "Energiezentren, Frequenzen und spirituelle Ebenen",
      icon: Brain,
      component: ChakrenMeridiane
    },
    {
      id: "theorien-broers",
      title: "Theorien und Prinzipien nach Dieter Broers",
      description: "Bewusstseinsforschung und elektromagnetische Felder",
      icon: BookOpen,
      component: TheorienBroers
    }
  ];

  const filteredTheories = theories.filter(theory =>
    theory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theory.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedTheory) {
    const theory = theories.find(t => t.id === selectedTheory);
    if (theory) {
      const Component = theory.component;
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-8">
            <Button 
              variant="outline" 
              onClick={() => setSelectedTheory(null)}
              className="mb-6"
            >
              ← Zurück zur Übersicht
            </Button>
            <Component />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Resonanz Forschungs-Explorer
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Umfassende Sammlung energetischer und frequenzbasierter Theorien
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Theorien durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTheories.map((theory) => {
            const Icon = theory.icon;
            return (
              <Card 
                key={theory.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setSelectedTheory(theory.id)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Icon className="h-8 w-8 text-blue-600 group-hover:text-blue-800 transition-colors" />
                    <div>
                      <CardTitle className="text-lg group-hover:text-blue-800 transition-colors">
                        {theory.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {theory.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTheories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Keine Theorien gefunden für "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
