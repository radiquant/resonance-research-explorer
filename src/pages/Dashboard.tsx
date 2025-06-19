
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  ArrowRight
} from "lucide-react";

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: "Aktive Klienten",
      value: "142",
      change: "+12%",
      trend: "positive" as const,
      icon: Users
    },
    {
      title: "Laufende Analysen",
      value: "23",
      change: "+5",
      trend: "positive" as const,
      icon: Activity
    },
    {
      title: "Datenbanken",
      value: "8",
      change: "±0",
      trend: "neutral" as const,
      icon: Database
    },
    {
      title: "Harmonisierungen",
      value: "67",
      change: "+8%",
      trend: "positive" as const,
      icon: Zap
    }
  ];

  const recentActivities = [
    {
      id: 1,
      client: "Max Mustermann",
      action: "Bioenergetische Analyse",
      status: "completed" as const,
      time: "vor 2 Std."
    },
    {
      id: 2,
      client: "Anna Schmidt",
      action: "Chakra-Harmonisierung",
      status: "in_progress" as const,
      time: "läuft seit 45 Min."
    },
    {
      id: 3,
      client: "Dr. Weber",
      action: "Meridian-Analyse",
      status: "pending" as const,
      time: "geplant für 14:00"
    }
  ];

  const algorithms = [
    {
      name: "Copen-Raten Generator",
      usage: 87,
      status: "active" as const
    },
    {
      name: "Bioenergie-Scanner",
      usage: 92,
      status: "active" as const
    },
    {
      name: "Frequenz-Harmonisierer",
      usage: 76,
      status: "maintenance" as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Willkommen zurück! Hier ist Ihre Übersicht für heute.
          </p>
        </div>
        <div className="flex gap-3">
          <Button size="sm">
            <Zap className="mr-2 h-4 w-4" />
            Neue Analyse
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            Berichte
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={`inline-flex items-center ${
                    stat.trend === "positive" ? "text-green-600" :
                    stat.trend === "neutral" ? "text-gray-600" : "text-red-600"
                  }`}>
                    {stat.change}
                  </span>
                  {" "}gegenüber letztem Monat
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Recent Activities */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Aktuelle Aktivitäten
            </CardTitle>
            <CardDescription>
              Ihre neuesten Analysen und Harmonisierungen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${
                      activity.status === "completed" ? "bg-green-500" :
                      activity.status === "in_progress" ? "bg-blue-500" : "bg-yellow-500"
                    }`} />
                    <div>
                      <p className="font-medium">{activity.client}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      activity.status === "completed" ? "default" :
                      activity.status === "in_progress" ? "secondary" : "outline"
                    }>
                      {activity.status === "completed" ? "Abgeschlossen" :
                       activity.status === "in_progress" ? "Läuft" : "Geplant"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              Alle Aktivitäten anzeigen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Algorithm Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
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
                    {algo.status === "active" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="text-xs text-muted-foreground">{algo.usage}%</span>
                  </div>
                </div>
                <Progress value={algo.usage} className="h-2" />
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4">
              Alle Algorithmen verwalten
            </Button>
          </CardContent>
        </Card>

      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Schnellaktionen</CardTitle>
          <CardDescription>
            Häufig verwendete Funktionen für den schnellen Zugriff
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-8 w-8 mb-2" />
              <span>Neuer Klient</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Activity className="h-8 w-8 mb-2" />
              <span>Schnellanalyse</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Database className="h-8 w-8 mb-2" />
              <span>Daten Import</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-8 w-8 mb-2" />
              <span>Bericht erstellen</span>
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default Dashboard;
