
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Users, Plus, Settings, UserCheck, UserX, Crown } from "lucide-react";

const ClientGroups = () => {
  const groupStats = [
    {
      title: "Aktive Gruppen",
      value: "12",
      change: "+3",
      changeType: "positive" as const,
      icon: Users,
      color: "radionik-harmony" as const
    },
    {
      title: "Gruppenmitglieder",
      value: "148",
      change: "+12",
      changeType: "positive" as const,
      icon: UserCheck,
      color: "radionik-frequency" as const
    },
    {
      title: "VIP Gruppen",
      value: "4",
      change: "+1",
      changeType: "positive" as const,
      icon: Crown,
      color: "radionik-analysis" as const
    },
    {
      title: "Inaktive Mitglieder",
      value: "8",
      change: "-2",
      changeType: "positive" as const,
      icon: UserX,
      color: "radionik-energy" as const
    }
  ];

  const clientGroups = [
    {
      name: "Premium Klienten",
      memberCount: 45,
      status: "active" as const,
      description: "VIP-Klienten mit erweiterten Services"
    },
    {
      name: "Neue Klienten 2024",
      memberCount: 23,
      status: "processing" as const,
      description: "Onboarding-Gruppe für neue Registrierungen"
    },
    {
      name: "Langzeit-Therapie",
      memberCount: 67,
      status: "active" as const,
      description: "Klienten in kontinuierlicher Behandlung"
    },
    {
      name: "Test-Gruppe",
      memberCount: 13,
      status: "pending" as const,
      description: "Beta-Tester für neue Algorithmen"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-radionik-harmony bg-clip-text text-transparent">
            Klientengruppen
          </h1>
          <p className="text-muted-foreground">
            Verwaltung und Organisation Ihrer Klientengruppen
          </p>
        </div>
        <div className="flex gap-3">
          <GradientButton variant="harmony" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Neue Gruppe
          </GradientButton>
          <GradientButton variant="glass" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Einstellungen
          </GradientButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {groupStats.map((stat, index) => (
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

      {/* Groups Overview */}
      <Card className="glass animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-radionik-harmony" />
            Gruppenliste
          </CardTitle>
          <CardDescription>
            Übersicht aller Klientengruppen und deren Status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {clientGroups.map((group, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/20">
              <div className="flex items-center gap-3">
                <StatusIndicator 
                  variant={group.status}
                  size="sm"
                />
                <div className="space-y-1">
                  <p className="font-medium">{group.name}</p>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
              </div>
              <div className="text-right space-y-2">
                <p className="font-medium">{group.memberCount} Mitglieder</p>
                <GradientButton variant="glass" size="sm">
                  Verwalten
                </GradientButton>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientGroups;
