
import { AnalysisTable } from "@/components/tables/AnalysisTable";
import { AnalysisChart } from "@/components/charts/AnalysisChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { useAnalyses } from "@/hooks/useAnalyses";
import { Activity, Clock, TrendingUp, CheckCircle2 } from "lucide-react";

const AnalysisCenter = () => {
  const { analyses } = useAnalyses();
  
  const activeCount = analyses.filter(a => a.status === 'active' || a.status === 'processing').length;
  const completedCount = analyses.filter(a => a.status === 'completed').length;
  const avgProgress = analyses.length > 0 ? 
    Math.round(analyses.reduce((sum, a) => sum + a.progress, 0) / analyses.length) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-radionik-analysis bg-clip-text text-transparent">
          Analyse-Center
        </h1>
        <p className="text-muted-foreground">
          Überwachen und verwalten Sie bioenergetische Analysen
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Aktive Analysen"
          value={activeCount}
          icon={Activity}
          color="radionik-analysis"
          description="laufende Prozesse"
        />
        <MetricCard
          title="Abgeschlossen"
          value={completedCount}
          icon={CheckCircle2}
          color="radionik-harmony"
          description="heute beendet"
        />
        <MetricCard
          title="Durchschnitt"
          value={`${avgProgress}%`}
          icon={TrendingUp}
          color="radionik-frequency"
          description="Fortschritt"
        />
        <MetricCard
          title="Laufzeit"
          value="2.3h"
          icon={Clock}
          color="radionik-energy"
          description="durchschnittlich"
        />
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <AnalysisTable />
        </div>
        <div className="space-y-6">
          <AnalysisChart 
            type="area"
            title="Analyse Performance"
            description="Bioenergetische Trends der letzten Stunden"
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisCenter;
