
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Plus } from "lucide-react";

const AlgorithmCenter = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Algorithmen & Formeln</h1>
          <p className="text-muted-foreground">
            Zentrale Verwaltung aller radionischen Algorithmen und Formeln
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neuer Algorithmus
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon - Sprint 9-10</CardTitle>
          <CardDescription>
            Das Algorithmus-Center wird in den nächsten Sprints implementiert
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center space-y-4">
              <Calculator className="h-16 w-16 mx-auto opacity-50" />
              <div>
                <h3 className="text-lg font-medium">Algorithmus-Center</h3>
                <p className="text-sm">Wird in Sprint 9-10 implementiert</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlgorithmCenter;
