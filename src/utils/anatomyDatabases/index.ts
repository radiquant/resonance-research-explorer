// Anatomische Datenbanken - Zentraler Export
// Höchst detaillierte anatomische Strukturen basierend auf Terminologia Anatomica (TA2)

import ZNS_DATABASE, { getAllZNSEntries } from './znsDatabase';
import HERZ_KREISLAUF_DATABASE, { getAllHerzKreislaufEntries } from './herzKreislaufDatabase';

// Typ für anatomische Datenbanken
export interface AnatomyDatabase {
  name: string;
  category: string;
  totalEntries: number;
  subcategories: {
    [key: string]: {
      name: string;
      entries: string[];
    };
  };
}

// Alle verfügbaren anatomischen Datenbanken
export const ANATOMY_DATABASES: { [key: string]: AnatomyDatabase } = {
  zns: ZNS_DATABASE,
  herzKreislauf: HERZ_KREISLAUF_DATABASE,
};

// Statistik über alle Datenbanken
export const getAnatomyStatistics = () => {
  const stats = Object.entries(ANATOMY_DATABASES).map(([key, db]) => ({
    key,
    name: db.name,
    category: db.category,
    totalEntries: db.totalEntries,
    subcategoryCount: Object.keys(db.subcategories).length,
  }));
  
  const totalEntries = stats.reduce((sum, s) => sum + s.totalEntries, 0);
  
  return {
    databases: stats,
    totalDatabases: stats.length,
    totalEntries,
  };
};

// Export einzelner Datenbanken
export { 
  ZNS_DATABASE, 
  getAllZNSEntries,
  HERZ_KREISLAUF_DATABASE, 
  getAllHerzKreislaufEntries,
};

// Alle Einträge aller Datenbanken
export const getAllAnatomyEntries = (): string[] => {
  return [
    ...getAllZNSEntries(),
    ...getAllHerzKreislaufEntries(),
  ];
};

// Einträge einer spezifischen Datenbank abrufen
export const getEntriesForDatabase = (databaseKey: string): string[] => {
  switch (databaseKey) {
    case 'zns':
      return getAllZNSEntries();
    case 'herzKreislauf':
      return getAllHerzKreislaufEntries();
    default:
      return [];
  }
};

// Einträge einer Subkategorie abrufen
export const getEntriesForSubcategory = (databaseKey: string, subcategoryKey: string): string[] => {
  const db = ANATOMY_DATABASES[databaseKey];
  if (!db) return [];
  
  const subcategory = db.subcategories[subcategoryKey];
  if (!subcategory) return [];
  
  return subcategory.entries;
};

export default ANATOMY_DATABASES;
