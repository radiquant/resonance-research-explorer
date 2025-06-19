
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Database, 
  Search, 
  Heart, 
  BarChart, 
  Activity,
  TrendingUp,
  Clock,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Aktive Klienten",
      value: "247",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Laufende Analysen",
      value: "18",
      change: "+3",
      changeType: "positive" as const,
      icon: Search,
    },
    {
      title: "Harmonisierungen heute",
      value: "42",
      change: "+8%",
      changeType: "positive" as const,
      icon: Heart,
    },
    {
      title: "Systemstatus",
      value: "Optimal",
      change: "99.9%",
      changeType: "neutral" as const,
      icon: Activity,
    },
  ];

  const quickActions = [
    {
      title: "Neue Analyse starten",
      description: "Beginnen Sie eine neue radionische Analyse",
      icon: Search,
      action: () => navigate("/analysis"),
      color: "bg-blue-500",
    },
    {
      title: "Harmonisierung",
      description: "Starten Sie eine Harmonisierungssitzung",
      icon: Heart,
      action: () => navigate("/harmonization"),
      color: "bg-green-500",
    },
    {
      title: "Klient hinzufügen",
      description: "Neuen Klienten zur Datenbank hinzufügen",
      icon: Users,
      action: () => navigate("/clients"),
      color: "bg-purple-500",
    },
    {
      title: "Bericht erstellen",
      description: "Generieren Sie einen detaillierten Bericht",
      icon: BarChart,
      action: () => navigate("/reports"),
      color: "bg-orange-500",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "analysis",
      description: "Frequenzanalyse für Max Mustermann abgeschlossen",
      timestamp: "vor 15 Min",
      status: "completed",
    },
    {
      id: 2,
      type: "harmonization",
      description: "Harmonisierung Gruppe A gestartet",
      timestamp: "vor 32 Min",
      status: "running",
    },
    {
      id: 3,
      type: "client",
      description: "Neuer Klient: Anna Schmidt hinzugefügt",
      timestamp: "vor 1 Std",
      status: "completed",
    },
    {
      id: 4,
      type: "report",
      description: "Monatsbericht generiert",
      timestamp: "vor 2 Std",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Willkommen zurück! Hier ist Ihre Übersicht über alle radionischen Aktivitäten.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Letztes Update: {new Date().toLocaleTimeString('de-DE', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Button>
          <Button onClick={() => navigate("/analysis")}>
            <Zap className="mr-2 h-4 w-4" />
            Neue Analyse
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={
                  stat.changeType === 'positive' 
                    ? 'text-green-600' 
                    : stat.changeType === 'negative' 
                    ? 'text-red-600' 
                    : 'text-muted-foreground'
                }>
                  {stat.change}
                </span>
                {stat.changeType !== 'neutral' && ' seit letztem Monat'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Schnelle Aktionen</CardTitle>
            <CardDescription>
              Häufig verwendete Funktionen mit einem Klick
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {quickActions.map((action) => (
              <div
                key={action.title}
                className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={action.action}
              >
                <div className={`p-2 rounded-md ${action.color} text-white`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Letzte Aktivitäten</CardTitle>
            <CardDescription>
              Ihre neuesten radionischen Aktivitäten
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
                <Badge 
                  variant={
                    activity.status === 'completed' 
                      ? 'default' 
                      : activity.status === 'running' 
                      ? 'secondary' 
                      : 'outline'
                  }
                  className="text-xs"
                >
                  {activity.status === 'completed' ? 'Abgeschlossen' : 
                   activity.status === 'running' ? 'Läuft' : 'Ausstehend'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
