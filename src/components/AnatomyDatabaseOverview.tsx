import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Heart, 
  Utensils, 
  Bone, 
  Wind, 
  Activity, 
  Gauge, 
  Eye, 
  Fingerprint,
  Shield,
  Database,
  Download,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ANATOMY_DATABASES, getEntriesForDatabase, getAnatomyStatistics, getAllAnatomyEntries } from '@/utils/anatomyDatabases';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface AnatomyDatabaseOverviewProps {
  onLoadDatabase: (entries: string[], name: string, count: number) => void;
  disabled?: boolean;
}

const DATABASE_ICONS: Record<string, React.ReactNode> = {
  zns: <Brain className="w-5 h-5" />,
  herzKreislauf: <Heart className="w-5 h-5" />,
  verdauung: <Utensils className="w-5 h-5" />,
  bewegungsapparat: <Bone className="w-5 h-5" />,
  respiration: <Wind className="w-5 h-5" />,
  urogenital: <Activity className="w-5 h-5" />,
  endokrines: <Gauge className="w-5 h-5" />,
  sinnesorgane: <Eye className="w-5 h-5" />,
  haut: <Fingerprint className="w-5 h-5" />,
  immunLymph: <Shield className="w-5 h-5" />,
};

const DATABASE_COLORS: Record<string, string> = {
  zns: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  herzKreislauf: 'text-red-500 bg-red-500/10 border-red-500/20',
  verdauung: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
  bewegungsapparat: 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20',
  respiration: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  urogenital: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
  endokrines: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
  sinnesorgane: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
  haut: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
  immunLymph: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
};

const AnatomyDatabaseOverview = ({ onLoadDatabase, disabled = false }: AnatomyDatabaseOverviewProps) => {
  const stats = getAnatomyStatistics();
  
  const handleLoadAll = () => {
    const allEntries = getAllAnatomyEntries();
    onLoadDatabase(allEntries, 'Alle anatomischen Systeme', allEntries.length);
  };

  const handleLoadSingle = (key: string) => {
    const db = ANATOMY_DATABASES[key];
    const entries = getEntriesForDatabase(key);
    onLoadDatabase(entries, db.name, entries.length);
  };

  // Berechne Verteilung für Visualisierung
  const maxEntries = Math.max(...stats.databases.map(d => d.totalEntries));

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Anatomische Datenbanken
            </CardTitle>
            <CardDescription>
              Terminologia Anatomica (TA2) - Systematische Organdatenbanken
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {stats.totalEntries.toLocaleString()} Einträge
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Gesamt-Statistik */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-primary">{stats.totalDatabases}</p>
              <p className="text-xs text-muted-foreground">Organsysteme</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-primary">{stats.totalEntries.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Anatomische Strukturen</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-primary">
                {stats.databases.reduce((sum, d) => sum + d.subcategoryCount, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Subkategorien</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-primary">
                {Math.round(stats.totalEntries / stats.totalDatabases)}
              </p>
              <p className="text-xs text-muted-foreground">Ø pro System</p>
            </CardContent>
          </Card>
        </div>

        {/* Alle Laden Button */}
        <Button
          onClick={handleLoadAll}
          disabled={disabled}
          className="w-full"
          size="lg"
        >
          <Layers className="w-5 h-5 mr-2" />
          Alle {stats.totalEntries.toLocaleString()} Strukturen laden
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>

        {/* Datenbank-Tabelle */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Organsystem</TableHead>
                <TableHead>Kategorie</TableHead>
                <TableHead className="text-right">Strukturen</TableHead>
                <TableHead className="text-right">Subkategorien</TableHead>
                <TableHead className="w-[150px]">Verteilung</TableHead>
                <TableHead className="text-right">Aktion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.databases.map((db) => (
                <TableRow key={db.key} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${DATABASE_COLORS[db.key] || 'bg-muted'}`}>
                        {DATABASE_ICONS[db.key] || <Database className="w-5 h-5" />}
                      </div>
                      <span className="font-medium">{db.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {db.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {db.totalEntries.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {db.subcategoryCount}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(db.totalEntries / maxEntries) * 100} 
                        className="h-2 flex-1" 
                      />
                      <span className="text-xs text-muted-foreground w-10 text-right">
                        {Math.round((db.totalEntries / stats.totalEntries) * 100)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLoadSingle(db.key)}
                      disabled={disabled}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Laden
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Subkategorien Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {stats.databases.slice(0, 3).map((db) => {
            const fullDb = ANATOMY_DATABASES[db.key];
            const subcatKeys = Object.keys(fullDb.subcategories).slice(0, 4);
            return (
              <Card key={db.key} className={`border ${DATABASE_COLORS[db.key]?.split(' ')[2] || 'border-muted'}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <div className={`p-1 rounded ${DATABASE_COLORS[db.key] || 'bg-muted'}`}>
                      {DATABASE_ICONS[db.key]}
                    </div>
                    {db.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    {subcatKeys.map((key) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-muted-foreground truncate max-w-[150px]">
                          {fullDb.subcategories[key].name}
                        </span>
                        <span className="font-mono">
                          {fullDb.subcategories[key].entries.length}
                        </span>
                      </div>
                    ))}
                    {Object.keys(fullDb.subcategories).length > 4 && (
                      <p className="text-[10px] text-muted-foreground text-right">
                        +{Object.keys(fullDb.subcategories).length - 4} weitere
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnatomyDatabaseOverview;
