
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

const ReportsAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Berichte & Analytics</h1>
        <p className="text-muted-foreground">
          Umfassende Auswertungen und Berichte Ihrer radionischen Aktivitäten
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon - Sprint 15-16</CardTitle>
          <CardDescription>
            Berichte & Analytics werden in den nächsten Sprints implementiert
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center space-y-4">
              <BarChart className="h-16 w-16 mx-auto opacity-50" />
              <div>
                <h3 className="text-lg font-medium">Berichte & Analytics</h3>
                <p className="text-sm">Wird in Sprint 15-16 implementiert</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsAnalytics;
