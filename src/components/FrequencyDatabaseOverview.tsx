import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Radio, 
  Waves, 
  Music, 
  Flower2, 
  Pill,
  Bug,
  Database,
  Download,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  FREQUENCY_DATABASES, 
  getEntriesForFrequencyDatabase, 
  getFrequencyStatistics, 
  getAllFrequencyEntries 
} from '@/utils/frequencyDatabases';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface FrequencyDatabaseOverviewProps {
  onLoadDatabase: (entries: string[], name: string, count: number) => void;
  disabled?: boolean;
}

const DATABASE_ICONS: Record<string, React.ReactNode> = {
  paulSchmidt: <Radio className="w-5 h-5" />,
  rife: <Waves className="w-5 h-5" />,
  solfeggio: <Music className="w-5 h-5" />,
  bachBlueten: <Flower2 className="w-5 h-5" />,
  schuesslerSalze: <Pill className="w-5 h-5" />,
  nosoden: <Bug className="w-5 h-5" />,
};

const DATABASE_COLORS: Record<string, string> = {
  paulSchmidt: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  rife: 'text-green-500 bg-green-500/10 border-green-500/20',
  solfeggio: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  bachBlueten: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
  schuesslerSalze: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  nosoden: 'text-red-500 bg-red-500/10 border-red-500/20',
};

const FrequencyDatabaseOverview = ({ onLoadDatabase, disabled = false }: FrequencyDatabaseOverviewProps) => {
  const stats = getFrequencyStatistics();
  
  const handleLoadAll = () => {
    const allEntries = getAllFrequencyEntries();
    onLoadDatabase(allEntries, 'Alle Frequenz-Datenbanken', allEntries.length);
  };

  const handleLoadSingle = (key: string) => {
    const db = FREQUENCY_DATABASES[key];
    const entries = getEntriesForFrequencyDatabase(key);
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
              <Sparkles className="w-5 h-5 text-primary" />
              Frequenz-Datenbanken
            </CardTitle>
            <CardDescription>
              Bioresonanz, Rife, Solfeggio, Bach-Blüten, Schüssler-Salze & Nosoden
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
              <p className="text-xs text-muted-foreground">Systeme</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-primary">{stats.totalEntries.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Frequenzen/Einträge</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold text-primary">
                {stats.databases.reduce((sum, d) => sum + d.subcategoryCount, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Kategorien</p>
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
          Alle {stats.totalEntries.toLocaleString()} Einträge laden
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>

        {/* Datenbank-Tabelle */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">System</TableHead>
                <TableHead>Kategorie</TableHead>
                <TableHead className="text-right">Einträge</TableHead>
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

        {/* Subkategorien Info für Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {stats.databases.slice(0, 3).map((db) => {
            const fullDb = FREQUENCY_DATABASES[db.key];
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

export default FrequencyDatabaseOverview;
