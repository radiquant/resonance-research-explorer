
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { EnergyBar } from "@/components/ui/energy-bar";
import { Calculator, Code, Play, Pause, Settings, Zap, Brain, TrendingUp } from "lucide-react";

const CopenAlgorithms = () => {
  const algorithmStats = [
    {
      title: "Copen-Raten Aktiv",
      value: "156",
      change: "+12",
      changeType: "positive" as const,
      icon: Calculator,
      color: "radionik-analysis" as const
    },
    {
      title: "Berechnungen/Min",
      value: "2.4k",
      change: "+8%",
      changeType: "positive" as const,
      icon: Brain,
      color: "radionik-frequency" as const
    },
    {
      title: "Erfolgsrate",
      value: "96%",
      change: "+2%",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "radionik-energy" as const
    },
    {
      title: "Algorithmus-Effizienz",
      value: "94%",
      change: "+1%",
      changeType: "positive" as const,
      icon: Zap,
      color: "radionik-harmony" as const
    }
  ];

  const copenAlgorithms = [
    {
      name: "Klassische Copen-Raten",
      category: "Standard",
      performance: 96,
      status: "active" as const,
      calculations: "1.2k/min",
      type: "analysis" as const
    },
    {
      name: "Erweiterte Bioenergie",
      category: "Advanced",
      performance: 89,
      status: "processing" as const,
      calculations: "890/min",
      type: "energy" as const
    },
    {
      name: "Harmonische Resonanz",
      category: "Harmonic",
      performance: 92,
      status: "active" as const,
      calculations: "1.1k/min",
      type: "harmony" as const
    },
    {
      name: "Quantenfeld-Analyse",
      category: "Quantum",
      performance: 87,
      status: "harmonizing" as const,
      calculations: "756/min",
      type: "frequency" as const
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-radionik-analysis bg-clip-text text-transparent">
            Copen-Raten Algorithmen
          </h1>
          <p className="text-muted-foreground">
            Spezialisierte Algorithmen für die Berechnung harmonischer Copen-Raten
          </p>
        </div>
        <div className="flex gap-3">
          <GradientButton variant="analysis" size="sm">
            <Code className="mr-2 h-4 w-4" />
            Neuer Algorithmus
          </GradientButton>
          <GradientButton variant="glass" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Konfiguration
          </GradientButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {algorithmStats.map((stat, index) => (
          <MetricCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            color={stat.color}
            description="Live-Performance"
            className="animate-slide-up"
          />
        ))}
      </div>

      {/* Algorithm Details */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Algorithm List */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-radionik-analysis" />
              Copen-Algorithmen
            </CardTitle>
            <CardDescription>
              Aktive Berechnungsalgorithmen für harmonische Raten
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {copenAlgorithms.map((algo, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/20">
                <div className="flex items-center gap-3">
                  <StatusIndicator 
                    variant={algo.status}
                    size="sm"
                  />
                  <div className="space-y-1">
                    <p className="font-medium">{algo.name}</p>
                    <p className="text-sm text-muted-foreground">{algo.category}</p>
                    <p className="text-xs text-muted-foreground">{algo.calculations}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <EnergyBar 
                    value={algo.performance}
                    type={algo.type}
                    size="sm"
                    showValue={false}
                    className="w-20"
                  />
                  <p className="text-xs text-muted-foreground text-center">{algo.performance}%</p>
                  <div className="flex gap-1">
                    <GradientButton variant="glass" size="icon" className="h-6 w-6">
                      <Play className="h-3 w-3" />
                    </GradientButton>
                    <GradientButton variant="glass" size="icon" className="h-6 w-6">
                      <Pause className="h-3 w-3" />
                    </GradientButton>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Algorithm Control */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-radionik-frequency" />
              Copen-Steuerung
            </CardTitle>
            <CardDescription>
              Zentrale Kontrolle für alle Copen-Berechnungen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <GradientButton variant="analysis" className="h-16 flex-col">
                <Play className="h-6 w-6 mb-1" />
                <span className="text-xs">Alle starten</span>
              </GradientButton>
              <GradientButton variant="energy" className="h-16 flex-col">
                <Pause className="h-6 w-6 mb-1" />
                <span className="text-xs">Stoppen</span>
              </GradientButton>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Gesamt-Performance</p>
                <EnergyBar 
                  value={93}
                  type="analysis"
                  size="md"
                  label="Copen-Engine"
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Berechnungskapazität</p>
                <EnergyBar 
                  value={78}
                  type="frequency"
                  size="md"
                  label="CPU Auslastung"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/50 space-y-2">
              <GradientButton variant="glass" size="sm" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Algorithmus-Parameter
              </GradientButton>
              <GradientButton variant="glass" size="sm" className="w-full justify-start">
                <Code className="mr-2 h-4 w-4" />
                Code-Editor
              </GradientButton>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default CopenAlgorithms;
