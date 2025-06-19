
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { EnergyBar } from "@/components/ui/energy-bar";
import { 
  Activity, 
  Users, 
  Database, 
  Zap, 
  BarChart3, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Waves,
  Heart,
  Search
} from "lucide-react";

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: "Aktive Klienten",
      value: "142",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      color: "radionik-harmony" as const
    },
    {
      title: "Laufende Analysen",
      value: "23",
      change: "+5",
      changeType: "positive" as const,
      icon: Activity,
      color: "radionik-analysis" as const
    },
    {
      title: "Datenbanken",
      value: "8",
      change: "±0",
      changeType: "neutral" as const,
      icon: Database,
      color: "radionik-frequency" as const
    },
    {
      title: "Harmonisierungen",
      value: "67",
      change: "+8%",
      changeType: "positive" as const,
      icon: Zap,
      color: "radionik-energy" as const
    }
  ];

  const recentActivities = [
    {
      id: 1,
      client: "Max Mustermann",
      action: "Bioenergetische Analyse",
      status: "completed" as const,
      time: "vor 2 Std.",
      energyLevel: 85
    },
    {
      id: 2,
      client: "Anna Schmidt", 
      action: "Chakra-Harmonisierung",
      status: "processing" as const,
      time: "läuft seit 45 Min.",
      energyLevel: 67
    },
    {
      id: 3,
      client: "Dr. Weber",
      action: "Meridian-Analyse",
      status: "pending" as const,
      time: "geplant für 14:00",
      energyLevel: 92
    }
  ];

  const algorithms = [
    {
      name: "Copen-Raten Generator",
      usage: 87,
      status: "active" as const,
      type: "energy" as const
    },
    {
      name: "Bioenergie-Scanner",
      usage: 92,
      status: "active" as const,
      type: "frequency" as const
    },
    {
      name: "Frequenz-Harmonisierer",
      usage: 76,
      status: "harmonizing" as const,
      type: "harmony" as const
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-radionik-harmony bg-clip-text text-transparent">
            Radionik Dashboard
          </h1>
          <p className="text-muted-foreground">
            Willkommen zurück! Hier ist Ihre harmonische Übersicht für heute.
          </p>
        </div>
        <div className="flex gap-3">
          <GradientButton variant="radionik" size="sm">
            <Zap className="mr-2 h-4 w-4" />
            Neue Analyse
          </GradientButton>
          <GradientButton variant="glass" size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            Berichte
          </GradientButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <MetricCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            color={stat.color}
            description="gegenüber letztem Monat"
            className="animate-slide-up"
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Recent Activities */}
        <Card className="col-span-2 glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-radionik-harmony" />
              Aktuelle Aktivitäten
            </CardTitle>
            <CardDescription>
              Ihre neuesten Analysen und Harmonisierungen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/20">
                  <div className="flex items-center gap-3">
                    <StatusIndicator 
                      variant={activity.status}
                      size="sm"
                    />
                    <div className="space-y-1">
                      <p className="font-medium">{activity.client}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <EnergyBar 
                      value={activity.energyLevel}
                      type="harmony"
                      size="sm"
                      showValue={false}
                      className="w-20"
                    />
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 group">
              Alle Aktivitäten anzeigen
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Algorithm Status */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-radionik-frequency" />
              Algorithmus-Status
            </CardTitle>
            <CardDescription>
              Leistung Ihrer Analyse-Engines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {algorithms.map((algo, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{algo.name}</span>
                  <div className="flex items-center gap-2">
                    <StatusIndicator 
                      variant={algo.status}
                      size="sm"
                      showDot={true}
                    />
                    <span className="text-xs text-muted-foreground">{algo.usage}%</span>
                  </div>
                </div>
                <EnergyBar 
                  value={algo.usage}
                  type={algo.type}
                  size="sm"
                  showValue={false}
                />
              </div>
            ))}
            <GradientButton variant="outline" size="sm" className="w-full mt-4">
              Alle Algorithmen verwalten
            </GradientButton>
          </CardContent>
        </Card>

      </div>

      {/* Quick Actions */}
      <Card className="glass animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Waves className="h-5 w-5 text-radionik-energy" />
            Harmonische Schnellaktionen
          </CardTitle>
          <CardDescription>
            Häufig verwendete Funktionen für den schnellen Zugriff
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GradientButton variant="harmony" className="h-20 flex-col">
              <Users className="h-8 w-8 mb-2" />
              <span>Neuer Klient</span>
            </GradientButton>
            <GradientButton variant="analysis" className="h-20 flex-col">
              <Search className="h-8 w-8 mb-2" />
              <span>Schnellanalyse</span>
            </GradientButton>
            <GradientButton variant="frequency" className="h-20 flex-col">
              <Database className="h-8 w-8 mb-2" />
              <span>Daten Import</span>
            </GradientButton>
            <GradientButton variant="energy" className="h-20 flex-col">
              <BarChart3 className="h-8 w-8 mb-2" />
              <span>Bericht erstellen</span>
            </GradientButton>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default Dashboard;
