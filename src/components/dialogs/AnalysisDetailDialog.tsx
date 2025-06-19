
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { EnergyBar } from "@/components/ui/energy-bar";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Activity, Clock, Download, Eye, FileText, Play, Pause, TrendingUp } from "lucide-react";

interface AnalysisDetailDialogProps {
  analysis?: {
    id: string;
    client: string;
    type: string;
    progress: number;
    status: "active" | "processing" | "completed" | "harmonizing";
    startTime: string;
    estimatedEnd?: string;
    results?: any;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function AnalysisDetailDialog({ analysis, isOpen, onClose }: AnalysisDetailDialogProps) {
  if (!analysis) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-radionik-energy";
      case "processing": return "text-radionik-frequency";
      case "completed": return "text-radionik-harmony";
      case "harmonizing": return "text-radionik-analysis";
      default: return "text-muted-foreground";
    }
  };

  const mockResults = [
    { parameter: "Bioenergetisches Feld", value: "94%", status: "optimal" },
    { parameter: "Chakra-Harmonisierung", value: "87%", status: "gut" },
    { parameter: "Meridian-Flow", value: "76%", status: "verbesserungsbedürftig" },
    { parameter: "Frequenz-Resonanz", value: "92%", status: "sehr gut" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] glass max-h-[80vh] overflow-y-auto">
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
          {/* Analysis Overview */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{analysis.client}</span>
                <StatusIndicator variant={analysis.status} />
              </CardTitle>
              <CardDescription>{analysis.type}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Gestartet</p>
                  <p className="font-medium">{analysis.startTime}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(analysis.status)}>
                    {analysis.status}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Fortschritt</p>
                  <p className="text-sm text-muted-foreground">{analysis.progress}%</p>
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

          {/* Analysis Results */}
          {analysis.status === "completed" || analysis.progress > 50 ? (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-radionik-harmony" />
                  Analyse-Ergebnisse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30">
                      <div className="space-y-1">
                        <p className="font-medium">{result.parameter}</p>
                        <p className="text-sm text-muted-foreground">{result.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-radionik-analysis">{result.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center py-8 text-muted-foreground">
                  <div className="text-center space-y-2">
                    <Clock className="h-8 w-8 mx-auto" />
                    <p>Analyse läuft noch...</p>
                    <p className="text-sm">Ergebnisse werden angezeigt sobald verfügbar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between gap-3">
            <div className="flex gap-2">
              {analysis.status === "processing" ? (
                <GradientButton variant="energy" size="sm">
                  <Pause className="mr-2 h-4 w-4" />
                  Pausieren
                </GradientButton>
              ) : (
                <GradientButton variant="analysis" size="sm">
                  <Play className="mr-2 h-4 w-4" />
                  Fortsetzen
                </GradientButton>
              )}
            </div>
            
            <div className="flex gap-2">
              {analysis.status === "completed" && (
                <GradientButton variant="harmony" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Bericht herunterladen
                </GradientButton>
              )}
              <GradientButton variant="glass" size="sm" onClick={onClose}>
                <Eye className="mr-2 h-4 w-4" />
                Schließen
              </GradientButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
