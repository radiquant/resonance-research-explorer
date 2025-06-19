
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { EnergyBar } from "@/components/ui/energy-bar";
import { Search, Activity, Clock, TrendingUp, Eye, Play, FileText, BarChart } from "lucide-react";

const AnalysisCenter = () => {
  const analysisStats = [
    {
      title: "Laufende Analysen",
      value: "23",
      change: "+8",
      changeType: "positive" as const,
      icon: Activity,
      color: "radionik-analysis" as const
    },
    {
      title: "Warteschlange",
      value: "7",
      change: "-3",
      changeType: "positive" as const,
      icon: Clock,
      color: "radionik-frequency" as const
    },
    {
      title: "Heute abgeschlossen",
      value: "156",
      change: "+23%",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "radionik-energy" as const
    },
    {
      title: "Erfolgsrate",
      value: "96%",
      change: "+1%",
      changeType: "positive" as const,
      icon: BarChart,
      color: "radionik-harmony" as const
    }
  ];

  const activeAnalyses = [
    {
      client: "Max Mustermann",
      type: "Bioenergetische Vollanalyse",
      progress: 78,
      status: "processing" as const,
      startTime: "14:23",
      category: "analysis" as const
    },
    {
      client: "Anna Schmidt",
      type: "Chakra-Harmonisierung",
      progress: 45,
      status: "active" as const,
      startTime: "14:45",
      category: "harmony" as const
    },
    {
      client: "Dr. Weber",
      type: "Frequenz-Mapping",
      progress: 92,
      status: "harmonizing" as const,
      startTime: "13:15",
      category: "frequency" as const
    },
    {
      client: "Maria Klein",
      type: "Energetische Diagnose",
      progress: 23,
      status: "processing" as const,
      startTime: "15:02",
      category: "energy" as const
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-radionik-analysis bg-clip-text text-transparent">
            Analyse-Center
          </h1>
          <p className="text-muted-foreground">
            Zentrale Überwachung und Steuerung aller bioenergetischen Analyseprozesse
          </p>
        </div>
        <div className="flex gap-3">
          <GradientButton variant="analysis" size="sm">
            <Play className="mr-2 h-4 w-4" />
            Neue Analyse
          </GradientButton>
          <GradientButton variant="glass" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Berichte
          </GradientButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analysisStats.map((stat, index) => (
          <MetricCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            color={stat.color}
            description="Live-Status"
            className="animate-slide-up"
          />
        ))}
      </div>

      {/* Analysis Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Active Analyses */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-radionik-analysis" />
              Aktive Analysen
            </CardTitle>
            <CardDescription>
              Echtzeitüberwachung aller laufenden Analyseprozesse
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeAnalyses.map((analysis, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/20">
                <div className="flex items-center gap-3">
                  <StatusIndicator 
                    variant={analysis.status}
                    size="sm"
                  />
                  <div className="space-y-1">
                    <p className="font-medium">{analysis.client}</p>
                    <p className="text-sm text-muted-foreground">{analysis.type}</p>
                    <p className="text-xs text-muted-foreground">Start: {analysis.startTime}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <EnergyBar 
                    value={analysis.progress}
                    type={analysis.category}
                    size="sm"
                    showValue={true}
                    className="w-24"
                  />
                  <GradientButton variant="glass" size="sm" className="text-xs">
                    <Eye className="mr-1 h-3 w-3" />
                    Details
                  </GradientButton>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Analysis Controls */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-radionik-frequency" />
              Analyse-Steuerung
            </CardTitle>
            <CardDescription>
              Schnelle Aktionen und Systemkontrolle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <GradientButton variant="analysis" className="h-16 flex-col">
                <Search className="h-6 w-6 mb-1" />
                <span className="text-xs">Schnellanalyse</span>
              </GradientButton>
              <GradientButton variant="harmony" className="h-16 flex-col">
                <Activity className="h-6 w-6 mb-1" />
                <span className="text-xs">Batch-Analyse</span>
              </GradientButton>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">System-Auslastung</p>
                <EnergyBar 
                  value={74}
                  type="frequency"
                  size="md"
                  label="Analyse-Engine"
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Queue Status</p>
                <EnergyBar 
                  value={28}
                  type="energy"
                  size="md"
                  label="Warteschlange"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/50 space-y-2">
              <GradientButton variant="glass" size="sm" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Analyse-Vorlagen
              </GradientButton>
              <GradientButton variant="glass" size="sm" className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4" />
                Statistiken anzeigen
              </GradientButton>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AnalysisCenter;
