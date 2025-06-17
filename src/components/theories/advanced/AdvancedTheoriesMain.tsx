
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Zap, Waves, Cpu, Globe, ShieldCheck, Microscope } from 'lucide-react';

import LakhovskyMultiwave from './LakhovskyMultiwave';
import RoyalRifeMachine from './RoyalRifeMachine';
import TeslaTechnologies from './TeslaTechnologies';
import QuantentheorieAdvanced from './QuantentheorieAdvanced';
import HolographicUniverse from './HolographicUniverse';
import RadiationDetox from './RadiationDetox';

const AdvancedTheoriesMain = () => {
  const [activeTab, setActiveTab] = useState("lakhovsky");

  const theories = [
    {
      id: "lakhovsky",
      title: "Lakhovsky",
      subtitle: "Multiwaveoszillator",
      icon: Waves,
      color: "blue",
      component: LakhovskyMultiwave
    },
    {
      id: "rife",
      title: "Royal R. Rife",
      subtitle: "Frequenztherapie",
      icon: Microscope,
      color: "green",
      component: RoyalRifeMachine
    },
    {
      id: "tesla",
      title: "Nikola Tesla",
      subtitle: "Energie & Spulen",
      icon: Zap,
      color: "yellow",
      component: TeslaTechnologies
    },
    {
      id: "quantum",
      title: "Quantentheorie",
      subtitle: "Fundamentale Physik",
      icon: Cpu,
      color: "purple",
      component: QuantentheorieAdvanced
    },
    {
      id: "holographic",
      title: "Holographisches Universum",
      subtitle: "Realitäts-Struktur",
      icon: Globe,
      color: "cyan",
      component: HolographicUniverse
    },
    {
      id: "detox",
      title: "Strahlungs-Detox",
      subtitle: "5G/6G/EMF-Schutz",
      icon: ShieldCheck,
      color: "red",
      component: RadiationDetox
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-3xl mb-2">
            Erweiterte Wissenschafts-Theorien
          </CardTitle>
          <CardDescription className="text-blue-200 text-lg">
            Detaillierte Analyse fundamentaler Prinzipien, Algorithmen und wissenschaftlicher Zusammenhänge
          </CardDescription>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {theories.map((theory) => (
              <Badge 
                key={theory.id} 
                variant="outline" 
                className={`bg-${theory.color}-900/30 border-${theory.color}-500/50 text-${theory.color}-200`}
              >
                {theory.title}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-white/10 border-white/20">
          {theories.map((theory) => {
            const Icon = theory.icon;
            return (
              <TabsTrigger 
                key={theory.id}
                value={theory.id} 
                className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white flex flex-col gap-1 p-3"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{theory.title}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        
        {theories.map((theory) => {
          const Component = theory.component;
          return (
            <TabsContent key={theory.id} value={theory.id} className="mt-6">
              <Component />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default AdvancedTheoriesMain;
