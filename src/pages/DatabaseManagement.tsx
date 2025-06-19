
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Plus } from "lucide-react";

const DatabaseManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Datenbankenverwaltung</h1>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre radionischen Datenbanken und Strukturen
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neue Datenbank
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon - Sprint 7-8</CardTitle>
          <CardDescription>
            Die Datenbankenverwaltung wird in den nächsten Sprints implementiert
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center space-y-4">
              <Database className="h-16 w-16 mx-auto opacity-50" />
              <div>
                <h3 className="text-lg font-medium">Datenbankenverwaltung</h3>
                <p className="text-sm">Wird in Sprint 7-8 implementiert</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseManagement;
