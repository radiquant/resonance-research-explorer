
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Search, Filter } from "lucide-react";

const ClientManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Klientenverwaltung</h1>
          <p className="text-muted-foreground">
            Verwalten Sie alle Ihre Klienten und deren Informationen
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neuer Klient
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon - Sprint 5-6</CardTitle>
          <CardDescription>
            Die Klientenverwaltung wird in den nächsten Sprints implementiert
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center space-y-4">
              <Users className="h-16 w-16 mx-auto opacity-50" />
              <div>
                <h3 className="text-lg font-medium">Klientenverwaltung</h3>
                <p className="text-sm">Wird in Sprint 5-6 implementiert</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientManagement;
