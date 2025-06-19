
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { EnergyBar } from "@/components/ui/energy-bar";
import { Database, Plus, Upload, Download, Search, Filter, FileText, HardDrive, Zap } from "lucide-react";

const DatabaseManagement = () => {
  const databaseStats = [
    {
      title: "Aktive Datenbanken",
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: Database,
      color: "radionik-frequency" as const
    },
    {
      title: "Gesamt Einträge",
      value: "12.4k",
      change: "+340",
      changeType: "positive" as const,
      icon: FileText,
      color: "radionik-analysis" as const
    },
    {
      title: "Speicherplatz",
      value: "2.1 GB",
      change: "+15%",
      changeType: "positive" as const,
      icon: HardDrive,
      color: "radionik-harmony" as const
    },
    {
      title: "Synchronisation",
      value: "98%",
      change: "+2%",
      changeType: "positive" as const,
      icon: Zap,
      color: "radionik-energy" as const
    }
  ];

  const databases = [
    {
      name: "Copen-Raten Master",
      entries: 3420,
      status: "active" as const,
      syncLevel: 98,
      type: "frequency" as const
    },
    {
      name: "Bioenergie Datenbank",
      entries: 2840,
      status: "processing" as const,
      syncLevel: 87,
      type: "energy" as const
    },
    {
      name: "Meridian Frequenzen",
      entries: 1650,
      status: "active" as const,
      syncLevel: 95,
      type: "harmony" as const
    },
    {
      name: "Tesla Algorithmen",
      entries: 890,
      status: "harmonizing" as const,
      syncLevel: 76,
      type: "analysis" as const
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-radionik-frequency bg-clip-text text-transparent">
            Datenbank-Verwaltung
          </h1>
          <p className="text-muted-foreground">
            Zentrale Verwaltung aller harmonischen Datenbanken und Frequenzsammlungen
          </p>
        </div>
        <div className="flex gap-3">
          <GradientButton variant="frequency" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Neue Datenbank
          </GradientButton>
          <GradientButton variant="glass" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </GradientButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {databaseStats.map((stat, index) => (
          <MetricCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            color={stat.color}
            description="aktueller Status"
            className="animate-slide-up"
          />
        ))}
      </div>

      {/* Database Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Database List */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-radionik-frequency" />
              Aktive Datenbanken
            </CardTitle>
            <CardDescription>
              Übersicht aller verfügbaren Frequenz-Datenbanken
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {databases.map((db, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/20">
                <div className="flex items-center gap-3">
                  <StatusIndicator 
                    variant={db.status}
                    size="sm"
                  />
                  <div className="space-y-1">
                    <p className="font-medium">{db.name}</p>
                    <p className="text-sm text-muted-foreground">{db.entries.toLocaleString()} Einträge</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <EnergyBar 
                    value={db.syncLevel}
                    type={db.type}
                    size="sm"
                    showValue={false}
                    className="w-20"
                  />
                  <p className="text-xs text-muted-foreground">{db.syncLevel}% sync</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Database Actions */}
        <Card className="glass animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-radionik-energy" />
              Schnellaktionen
            </CardTitle>
            <CardDescription>
              Häufig verwendete Datenbank-Operationen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <GradientButton variant="frequency" className="h-16 flex-col">
                <Search className="h-6 w-6 mb-1" />
                <span className="text-xs">Suchen</span>
              </GradientButton>
              <GradientButton variant="harmony" className="h-16 flex-col">
                <Filter className="h-6 w-6 mb-1" />
                <span className="text-xs">Filter</span>
              </GradientButton>
              <GradientButton variant="analysis" className="h-16 flex-col">
                <Upload className="h-6 w-6 mb-1" />
                <span className="text-xs">Import</span>
              </GradientButton>
              <GradientButton variant="energy" className="h-16 flex-col">
                <Download className="h-6 w-6 mb-1" />
                <span className="text-xs">Export</span>
              </GradientButton>
            </div>
            
            <div className="pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-3">Erweiterte Funktionen:</p>
              <div className="space-y-2">
                <GradientButton variant="glass" size="sm" className="w-full justify-start">
                  <Database className="mr-2 h-4 w-4" />
                  Datenbank-Synchronisation
                </GradientButton>
                <GradientButton variant="glass" size="sm" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Batch-Operationen
                </GradientButton>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default DatabaseManagement;
