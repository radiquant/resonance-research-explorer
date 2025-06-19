
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnergyBar } from "@/components/ui/energy-bar";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Analysis } from "@/contexts/RadionikContext";
import { Activity, Clock, User, Zap } from "lucide-react";

interface AnalysisDetailDialogProps {
  analysis: Analysis | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AnalysisDetailDialog({ analysis, isOpen, onClose }: AnalysisDetailDialogProps) {
  if (!analysis) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-radionik-analysis" />
            Analyse Details
          </DialogTitle>
          <DialogDescription>
            Detaillierte Informationen zur bioenergetischen Analyse
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  Klient
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{analysis.clientName}</p>
                <p className="text-sm text-muted-foreground">ID: {analysis.clientId}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Activity className="h-4 w-4" />
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <StatusIndicator variant={analysis.status} />
                  <Badge className={getStatusColor(analysis.status)}>
                    {analysis.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4" />
                Fortschritt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{analysis.type}</span>
                  <span className="text-sm text-muted-foreground">{analysis.progress}%</span>
                </div>
                <EnergyBar 
                  value={analysis.progress}
                  type="analysis"
                  size="md"
                  showValue={false}
                />
              </div>
            </CardContent>
          </Card>

          {/* Timing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                Zeitplan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Startzeit:</span>
                  <span className="font-medium">{analysis.startTime}</span>
                </div>
                {analysis.estimatedEnd && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Geschätzte Fertigstellung:</span>
                    <span className="font-medium">{analysis.estimatedEnd}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results (if completed) */}
          {analysis.status === 'completed' && analysis.results && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Ergebnisse</CardTitle>
                <CardDescription>
                  Bioenergetische Messwerte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-radionik-energy">
                      {analysis.results.energy}%
                    </div>
                    <div className="text-xs text-muted-foreground">Energie</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-radionik-frequency">
                      {analysis.results.frequency}%
                    </div>
                    <div className="text-xs text-muted-foreground">Frequenz</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-radionik-harmony">
                      {analysis.results.harmony}%
                    </div>
                    <div className="text-xs text-muted-foreground">Harmonie</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
