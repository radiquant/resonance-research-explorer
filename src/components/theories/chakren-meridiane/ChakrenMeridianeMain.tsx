
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Zap, Target, Stethoscope, Settings } from "lucide-react";
import WissenschaftlicheGrundlagen from "./WissenschaftlicheGrundlagen";
import ChakraFrequenzen from "./ChakraFrequenzen";
import MeridianFrequenzen from "./MeridianFrequenzen";
import AkupunkturpunktFrequenzen from "./AkupunkturpunktFrequenzen";
import MesstechnikTherapie from "./MesstechnikTherapie";

const ChakrenMeridianeMain = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: "grundlagen",
      title: "Wissenschaftliche Grundlagen",
      description: "Bioelektrische Felder, Quantenphysik und Messprinzipien",
      icon: BookOpen,
      component: WissenschaftlicheGrundlagen
    },
    {
      id: "chakra-frequenzen",
      title: "Chakra-Frequenzen",
      description: "Mathematisch berechnete Frequenzen der 7 Hauptchakren",
      icon: Zap,
      component: ChakraFrequenzen
    },
    {
      id: "meridian-frequenzen",
      title: "Meridian-Frequenzen",
      description: "Wissenschaftlich ermittelte Frequenzen der 12 Hauptmeridiane",
      icon: Target,
      component: MeridianFrequenzen
    },
    {
      id: "akupunkturpunkt-frequenzen",
      title: "Akupunkturpunkt-Frequenzen",
      description: "Punkt-spezifische Resonanzfrequenzen wichtiger Akupunkturpunkte",
      icon: Target,
      component: AkupunkturpunktFrequenzen
    },
    {
      id: "messtechnik-therapie",
      title: "Messtechnik & Therapie",
      description: "Moderne Messverfahren und therapeutische Anwendungen",
      icon: Settings,
      component: MesstechnikTherapie
    }
  ];

  if (activeSection) {
    const section = sections.find(s => s.id === activeSection);
    if (section) {
      const Component = section.component;
      return (
        <div className="max-w-6xl mx-auto space-y-6">
          <Button 
            variant="outline" 
            onClick={() => setActiveSection(null)}
            className="mb-6"
          >
            ← Zurück zur Übersicht
          </Button>
          <Component />
        </div>
      );
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center text-blue-800">
            Chakren und Meridiane - Wissenschaftlich Fundiertes Kompendium
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-600 text-center mb-8">
            Umfassende Analyse der energetischen Systeme mit präzisen Frequenzberechnungen, 
            wissenschaftlichen Grundlagen und praktischen Anwendungen.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card 
                  key={section.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => setActiveSection(section.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-6 w-6 text-blue-600" />
                        <CardTitle className="text-lg group-hover:text-blue-800 transition-colors">
                          {section.title}
                        </CardTitle>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChakrenMeridianeMain;
