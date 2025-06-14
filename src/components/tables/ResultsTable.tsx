
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';
import { alphabetSystems } from '@/utils/alphabetSystems';
import { type CopenRateResult } from '@/utils/copenRateGenerator';

interface ResultsTableProps {
  results: CopenRateResult[];
  onExport: () => void;
  onClear: () => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
  onExport,
  onClear
}) => {
  if (results.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Berechnete Copen-Raten ({results.length})
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              CSV Export
            </Button>
            <Button variant="outline" size="sm" onClick={onClear}>
              <Trash2 className="h-4 w-4 mr-2" />
              Löschen
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Wortenergie</th>
                <th className="text-left p-2">Potenz</th>
                <th className="text-left p-2">Typ</th>
                <th className="text-left p-2">Alphabet</th>
                <th className="text-left p-2">Copen-Rate</th>
                <th className="text-left p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">{result.word}</td>
                  <td className="p-2">{result.potency}</td>
                  <td className="p-2">{result.potencyType}</td>
                  <td className="p-2 text-xs">
                    {alphabetSystems[result.alphabetType].name}
                  </td>
                  <td className="p-2 font-mono text-blue-600">{result.rate.toLocaleString()}</td>
                  <td className="p-2 text-xs text-gray-500">
                    Σ:{result.calculation.letterSum} → 
                    Base:{result.calculation.baseRate.toLocaleString()} → 
                    Fib:{result.calculation.fibonacciRate.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsTable;
