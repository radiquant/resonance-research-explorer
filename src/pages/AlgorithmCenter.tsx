
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { EnergyBar } from "@/components/ui/energy-bar";
import { Calculator, Cpu, Zap, Play, Pause, Settings, Code, Brain } from "lucide-react";

const AlgorithmCenter = () => {
  const algorithmStats = [
    {
      title: "Aktive Algorithmen",
      value: "12",
      change: "+3",
      changeType: "positive" as const,
      icon: Calculator,
      color: "radionik-analysis" as const
    },
    {
      title: "CPU Auslastung",
      value: "67%",
      change: "-5%",
      changeType: "positive" as const,
      icon: Cpu,
      color: "radionik-frequency" as const
    },
    {
      title: "Berechnungen/Min",
      value: "1.2k",
      change: "+15%",
      changeType: "positive" as const,
      icon: Brain,
      color: "radionik-energy" as const
    },
    {
      title: "Erfolgsrate",
      value: "94%",
      change: "+2%",
      changeType: "positive" as const,
      icon: Zap,
      color: "radionik-harmony" as const
    }
  ];

  const algorithms = [
    {
      name: "Copen-Raten Generator",
      type: "Radionik Core",
      status: "active" as const,
      performance: 92,
      category: "energy" as const
    },
    {
      name: "Tesla Harmonisierung",
      type: "Frequenz-Engine",
      status: "processing" as const,
      performance: 87,
      category: "frequency" as const
    },
    {
      name: "Bioenergie Scanner",
      type: "Analyse-Algorithmus",
      status: "active" as const,
      performance: 95,
      category: "harmony" as const
    },
    {
      name: "Rife Frequenz Matrix",
      type: "Legacy System",
      status: "harmonizing" as const,
      performance: 78,
      category: "analysis" as const
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-radionik-analysis bg-clip-text text-transparent">
            Algorithmus-Center
          </h1>
          <p className="text-muted-foreground">
            Zentrale Verwaltung und Überwachung aller harmonischen Berechnungsalgorithmen
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
            description="Live-Monitoring"
            className="animate-slide-up"
          />
        ))}
      </div>

      {/* Algorithm Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Algorithm List */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-radionik-analysis" />
              Algorithmus-Status
            </CardTitle>
            <CardDescription>
              Echtzeitüberwachung aller aktiven Berechnungsengines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {algorithms.map((algo, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/20">
                <div className="flex items-center gap-3">
                  <StatusIndicator 
                    variant={algo.status}
                    size="sm"
                  />
                  <div className="space-y-1">
                    <p className="font-medium">{algo.name}</p>
                    <p className="text-sm text-muted-foreground">{algo.type}</p>
                  </div>
                </div>
                <div className="text-right space-y-2 flex items-center gap-3">
                  <div className="space-y-1">
                    <EnergyBar 
                      value={algo.performance}
                      type={algo.category}
                      size="sm"
                      showValue={false}
                      className="w-20"
                    />
                    <p className="text-xs text-muted-foreground text-center">{algo.performance}%</p>
                  </div>
                  <div className="flex gap-1">
                    <GradientButton variant="glass" size="icon" className="h-8 w-8">
                      <Play className="h-3 w-3" />
                    </GradientButton>
                    <GradientButton variant="glass" size="icon" className="h-8 w-8">
                      <Pause className="h-3 w-3" />
                    </GradientButton>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Algorithm Controls */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-radionik-energy" />
              Algorithmus-Steuerung
            </CardTitle>
            <CardDescription>
              Zentrale Kontrollzentrale für alle Berechnungsprozesse
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <GradientButton variant="energy" className="h-16 flex-col">
                <Play className="h-6 w-6 mb-1" />
                <span className="text-xs">Start All</span>
              </GradientButton>
              <GradientButton variant="analysis" className="h-16 flex-col">
                <Pause className="h-6 w-6 mb-1" />
                <span className="text-xs">Pause All</span>
              </GradientButton>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">System Performance</p>
                <EnergyBar 
                  value={82}
                  type="harmony"
                  size="md"
                  label="Gesamtleistung"
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Memory Usage</p>
                <EnergyBar 
                  value={67}
                  type="frequency"
                  size="md"
                  label="Speicherverbrauch"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/50 space-y-2">
              <GradientButton variant="glass" size="sm" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Erweiterte Einstellungen
              </GradientButton>
              <GradientButton variant="glass" size="sm" className="w-full justify-start">
                <Code className="mr-2 h-4 w-4" />
                Algorithmus Editor
              </GradientButton>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AlgorithmCenter;
