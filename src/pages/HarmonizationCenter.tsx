
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { EnergyBar } from "@/components/ui/energy-bar";
import { Heart, Waves, Play, Pause, Music, Zap, Target, BarChart } from "lucide-react";

const HarmonizationCenter = () => {
  const harmonizationStats = [
    {
      title: "Aktive Sessions",
      value: "18",
      change: "+6",
      changeType: "positive" as const,
      icon: Heart,
      color: "radionik-harmony" as const
    },
    {
      title: "Harmonisierungsrate",
      value: "92%",
      change: "+4%",
      changeType: "positive" as const,
      icon: Target,
      color: "radionik-energy" as const
    },
    {
      title: "Behandlungen heute",
      value: "47",
      change: "+12",
      changeType: "positive" as const,
      icon: Waves,
      color: "radionik-frequency" as const
    },
    {
      title: "Energielevel Ø",
      value: "87%",
      change: "+8%",
      changeType: "positive" as const,
      icon: Zap,
      color: "radionik-analysis" as const
    }
  ];

  const activeSessions = [
    {
      client: "Anna Schmidt",
      protocol: "Chakra-Harmonisierung",
      progress: 67,
      status: "harmonizing" as const,
      duration: "25 Min",
      energyLevel: 84,
      category: "harmony" as const
    },
    {
      client: "Dr. Weber",
      protocol: "Frequenz-Therapie",
      progress: 89,
      status: "active" as const,
      duration: "18 Min",
      energyLevel: 91,
      category: "frequency" as const
    },
    {
      client: "Maria Klein",
      protocol: "Bioenergie-Balance",
      progress: 34,
      status: "processing" as const,
      duration: "8 Min",
      energyLevel: 67,
      category: "energy" as const
    },
    {
      client: "Thomas Müller",
      protocol: "Tesla-Harmonisierung",
      progress: 78,
      status: "harmonizing" as const,
      duration: "32 Min",
      energyLevel: 88,
      category: "analysis" as const
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-radionik-harmony bg-clip-text text-transparent">
            Harmonisierungs-Center
          </h1>
          <p className="text-muted-foreground">
            Zentrale Steuerung aller bioenergetischen Harmonisierungsprozesse
          </p>
        </div>
        <div className="flex gap-3">
          <GradientButton variant="harmony" size="sm">
            <Play className="mr-2 h-4 w-4" />
            Neue Session
          </GradientButton>
          <GradientButton variant="glass" size="sm">
            <Music className="mr-2 h-4 w-4" />
            Protokolle
          </GradientButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {harmonizationStats.map((stat, index) => (
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

      {/* Harmonization Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Active Sessions */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-radionik-harmony" />
              Aktive Sessions
            </CardTitle>
            <CardDescription>
              Echtzeitüberwachung aller laufenden Harmonisierungen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/20">
                <div className="flex items-center gap-3">
                  <StatusIndicator 
                    variant={session.status}
                    size="sm"
                  />
                  <div className="space-y-1">
                    <p className="font-medium">{session.client}</p>
                    <p className="text-sm text-muted-foreground">{session.protocol}</p>
                    <p className="text-xs text-muted-foreground">Dauer: {session.duration}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="space-y-1">
                    <EnergyBar 
                      value={session.progress}
                      type={session.category}
                      size="sm"
                      showValue={false}
                      className="w-20"
                    />
                    <p className="text-xs text-muted-foreground text-center">{session.progress}%</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Zap className="h-3 w-3 text-radionik-energy" />
                    <span>{session.energyLevel}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Harmonization Controls */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-radionik-frequency" />
              Harmonisierungs-Steuerung
            </CardTitle>
            <CardDescription>
              Zentrale Kontrolle aller Therapiesessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <GradientButton variant="harmony" className="h-16 flex-col">
                <Play className="h-6 w-6 mb-1" />
                <span className="text-xs">Start Session</span>
              </GradientButton>
              <GradientButton variant="energy" className="h-16 flex-col">
                <Pause className="h-6 w-6 mb-1" />
                <span className="text-xs">Pause All</span>
              </GradientButton>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Globales Energielevel</p>
                <EnergyBar 
                  value={87}
                  type="harmony"
                  size="md"
                  label="Harmonische Resonanz"
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Therapie-Effizienz</p>
                <EnergyBar 
                  value={92}
                  type="energy"
                  size="md"
                  label="Behandlungserfolg"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/50 space-y-2">
              <GradientButton variant="glass" size="sm" className="w-full justify-start">
                <Music className="mr-2 h-4 w-4" />
                Therapie-Protokolle
              </GradientButton>
              <GradientButton variant="glass" size="sm" className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4" />
                Erfolgsstatistiken
              </GradientButton>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default HarmonizationCenter;
