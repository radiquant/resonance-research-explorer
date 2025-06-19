
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { EnergyBar } from "@/components/ui/energy-bar";
import { Folder, FileText, Clock, Users, Plus, Save, Share2, Archive } from "lucide-react";

const Workspace = () => {
  const workspaceStats = [
    {
      title: "Aktive Projekte",
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: Folder,
      color: "radionik-harmony" as const
    },
    {
      title: "Offene Sessions",
      value: "5",
      change: "+1",
      changeType: "positive" as const,
      icon: Clock,
      color: "radionik-frequency" as const
    },
    {
      title: "Team-Mitglieder",
      value: "12",
      change: "±0",
      changeType: "neutral" as const,
      icon: Users,
      color: "radionik-analysis" as const
    },
    {
      title: "Gespeicherte Docs",
      value: "143",
      change: "+18",
      changeType: "positive" as const,
      icon: FileText,
      color: "radionik-energy" as const
    }
  ];

  const recentProjects = [
    {
      name: "Klient Analysis 2024-03",
      type: "Bioenergetische Studie",
      status: "active" as const,
      progress: 76,
      lastModified: "vor 2 Std.",
      category: "harmony" as const
    },
    {
      name: "Frequenz-Mapping Projekt",
      type: "Tesla Algorithmus Test",
      status: "processing" as const,
      progress: 45,
      lastModified: "vor 4 Std.",
      category: "frequency" as const
    },
    {
      name: "Harmonisierung Template",
      type: "Therapie-Protokoll",
      status: "completed" as const,
      progress: 100,
      lastModified: "gestern",
      category: "energy" as const
    },
    {
      name: "Copen-Raten Validation",
      type: "Algorithmus-Review",
      status: "pending" as const,
      progress: 23,
      lastModified: "vor 6 Std.",
      category: "analysis" as const
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-radionik-harmony bg-clip-text text-transparent">
            Arbeitsbereich
          </h1>
          <p className="text-muted-foreground">
            Ihr persönlicher Workspace für Projekte, Sessions und Kollaboration
          </p>
        </div>
        <div className="flex gap-3">
          <GradientButton variant="harmony" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Neues Projekt
          </GradientButton>
          <GradientButton variant="glass" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Teilen
          </GradientButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {workspaceStats.map((stat, index) => (
          <MetricCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            color={stat.color}
            description="aktueller Stand"
            className="animate-slide-up"
          />
        ))}
      </div>

      {/* Workspace Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Recent Projects */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5 text-radionik-harmony" />
              Aktuelle Projekte
            </CardTitle>
            <CardDescription>
              Ihre zuletzt bearbeiteten Arbeitsräume und Sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/20">
                <div className="flex items-center gap-3">
                  <StatusIndicator 
                    variant={project.status}
                    size="sm"
                  />
                  <div className="space-y-1">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.type}</p>
                    <p className="text-xs text-muted-foreground">{project.lastModified}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <EnergyBar 
                    value={project.progress}
                    type={project.category}
                    size="sm"
                    showValue={true}
                    className="w-24"
                  />
                  <div className="flex gap-1">
                    <GradientButton variant="glass" size="sm" className="text-xs">
                      Öffnen
                    </GradientButton>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Workspace Tools */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-radionik-frequency" />
              Workspace-Tools
            </CardTitle>
            <CardDescription>
              Schnelle Aktionen und Arbeitsbereich-Funktionen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <GradientButton variant="harmony" className="h-16 flex-col">
                <Plus className="h-6 w-6 mb-1" />
                <span className="text-xs">Neu erstellen</span>
              </GradientButton>
              <GradientButton variant="frequency" className="h-16 flex-col">
                <Save className="h-6 w-6 mb-1" />
                <span className="text-xs">Speichern</span>
              </GradientButton>
              <GradientButton variant="analysis" className="h-16 flex-col">
                <Share2 className="h-6 w-6 mb-1" />
                <span className="text-xs">Kollaboration</span>
              </GradientButton>
              <GradientButton variant="energy" className="h-16 flex-col">
                <Archive className="h-6 w-6 mb-1" />
                <span className="text-xs">Archivieren</span>
              </GradientButton>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Speicherplatz</p>
                <EnergyBar 
                  value={67}
                  type="harmony"
                  size="md"
                  label="Workspace Storage"
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Team-Aktivität</p>
                <EnergyBar 
                  value={84}
                  type="frequency"
                  size="md"
                  label="Kollaboration"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/50 space-y-2">
              <GradientButton variant="glass" size="sm" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Team-Verwaltung
              </GradientButton>
              <GradientButton variant="glass" size="sm" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Session-Historie
              </GradientButton>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Workspace;
