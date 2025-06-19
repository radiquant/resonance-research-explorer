
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder } from "lucide-react";

const Workspace = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Arbeitsbereich</h1>
        <p className="text-muted-foreground">
          Ihr persönlicher Arbeitsbereich für laufende Projekte
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            Der Arbeitsbereich wird in den kommenden Sprints implementiert
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center space-y-4">
              <Folder className="h-16 w-16 mx-auto opacity-50" />
              <div>
                <h3 className="text-lg font-medium">Arbeitsbereich</h3>
                <p className="text-sm">Wird bald implementiert</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Workspace;
