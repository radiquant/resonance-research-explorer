
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GradientButton } from '@/components/ui/gradient-button';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { EnergyBar } from '@/components/ui/energy-bar';
import { AnalysisDetailDialog } from '@/components/dialogs/AnalysisDetailDialog';
import { useAnalyses } from '@/hooks/useAnalyses';
import { 
  Activity, 
  Play, 
  Pause, 
  Eye, 
  Clock,
  Plus
} from 'lucide-react';
import { Analysis } from '@/contexts/RadionikContext';

export function AnalysisTable() {
  const { analyses, isLoading, startAnalysis, updateAnalysisProgress } = useAnalyses();
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (analysis: Analysis) => {
    setSelectedAnalysis(analysis);
    setIsDialogOpen(true);
  };

  const handleProgressUpdate = (analysisId: string, newProgress: number) => {
    updateAnalysisProgress(analysisId, newProgress);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-radionik-energy';
      case 'processing': return 'text-radionik-frequency';
      case 'completed': return 'text-radionik-harmony';
      case 'harmonizing': return 'text-radionik-analysis';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <>
      <Card className="glass">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-radionik-analysis" />
                Aktive Analysen
              </CardTitle>
              <CardDescription>
                Überwachen Sie laufende bioenergetische Analysen
              </CardDescription>
            </div>
            <GradientButton variant="analysis">
              <Plus className="mr-2 h-4 w-4" />
              Neue Analyse
            </GradientButton>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <StatusIndicator variant={analysis.status} />
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{analysis.clientName}</h3>
                          <p className="text-sm text-muted-foreground">{analysis.type}</p>
                        </div>
                        <Badge className={getStatusColor(analysis.status)}>
                          {analysis.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Fortschritt</span>
                          <span>{analysis.progress}%</span>
                        </div>
                        <EnergyBar 
                          value={analysis.progress}
                          type="analysis"
                          size="sm"
                          showValue={false}
                        />
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Start: {analysis.startTime}
                        </div>
                        {analysis.estimatedEnd && (
                          <div>Ende: {analysis.estimatedEnd}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {analysis.status === 'processing' ? (
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : analysis.status !== 'completed' ? (
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    ) : null}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(analysis)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {analyses.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Keine aktiven Analysen</p>
                  <p className="text-sm">Starten Sie eine neue Analyse um zu beginnen</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <AnalysisDetailDialog
        analysis={selectedAnalysis}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
