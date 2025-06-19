
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive as ArchiveIcon } from "lucide-react";

const Archive = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Archiv</h1>
        <p className="text-muted-foreground">
          Verwaltung aller archivierten Daten und historischen Informationen
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            Das Archiv wird in den kommenden Sprints implementiert
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center space-y-4">
              <ArchiveIcon className="h-16 w-16 mx-auto opacity-50" />
              <div>
                <h3 className="text-lg font-medium">Archiv</h3>
                <p className="text-sm">Wird bald implementiert</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Archive;
