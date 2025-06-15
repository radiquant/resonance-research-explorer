
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Calculator, Waves, Target } from "lucide-react";

const HarmonikaleFrequenzlehre = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Music className="h-6 w-6" />
            Harmonikale Frequenzlehre nach Alan E. Baklayan
          </CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-6">
          
          <div className="bg-blue-500/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Grundprinzipien der Harmonikalen Frequenzen</h3>
            <div className="space-y-3">
              <div className="bg-black/20 p-3 rounded border-l-4 border-blue-400">
                <h4 className="font-semibold">Musikalische Harmonielehre:</h4>
                <p className="text-sm mt-1">
                  Jede Krankheit und jedes Pathogen schwingt in einer bestimmten Frequenz. 
                  Diese kann durch harmonikale Gegenschwingungen neutralisiert werden.
                </p>
              </div>
              
              <div className="bg-black/20 p-3 rounded border-l-4 border-green-400">
                <h4 className="font-semibold">Oktav-Prinzip:</h4>
                <p className="text-sm mt-1">
                  Frequenzen wirken in allen Oktaven gleich (f, 2f, 4f, 8f...). 
                  Eine Grundfrequenz von 440 Hz wirkt auch bei 880 Hz, 1760 Hz etc.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Mathematische Grundlagen
            </h3>
            <div className="bg-black/20 p-3 rounded font-mono text-sm">
              <strong>Harmonische Reihe:</strong><br/>
              f_n = f_0 × n (n = 1, 2, 3, 4, ...)<br/><br/>
              
              <strong>Oktav-Beziehung:</strong><br/>
              f_oktav = f_grund × 2^n<br/><br/>
              
              <strong>Quintenzirkel-Frequenzen:</strong><br/>
              f_quint = f_grund × (3/2)^n<br/>
              Temperiert: f_quint = f_grund × 2^(7n/12)
            </div>
          </div>

          <div className="bg-green-500/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Pathogen-Frequenz-Tabelle</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-2">Pathogen/Krankheit</th>
                    <th className="text-left p-2">Grundfrequenz (Hz)</th>
                    <th className="text-left p-2">Harmonische</th>
                    <th className="text-left p-2">Therapiefrequenz</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="p-2">Candida albicans</td>
                    <td className="p-2">386.4</td>
                    <td className="p-2">772.8, 1545.6</td>
                    <td className="p-2">465.0 (Quinte)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2">Streptococcus</td>
                    <td className="p-2">394.5</td>
                    <td className="p-2">789.0, 1578.0</td>
                    <td className="p-2">473.4 (Quinte)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2">Borrelia burgdorferi</td>
                    <td className="p-2">432.0</td>
                    <td className="p-2">864.0, 1728.0</td>
                    <td className="p-2">518.4 (Quinte)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2">Epstein-Barr Virus</td>
                    <td className="p-2">417.5</td>
                    <td className="p-2">835.0, 1670.0</td>
                    <td className="p-2">501.0 (Quinte)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-yellow-500/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Waves className="h-5 w-5" />
              Frequenz-Kombinationen und Akkorde
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/20 p-3 rounded">
                <h4 className="font-semibold mb-2 text-yellow-300">Dur-Dreiklang (Stärkung):</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>Grundton:</strong> 440 Hz (A)</li>
                  <li><strong>Terz:</strong> 550 Hz (C#)</li>
                  <li><strong>Quinte:</strong> 660 Hz (E)</li>
                  <li><strong>Wirkung:</strong> Immunsystem-Stärkung</li>
                </ul>
              </div>
              
              <div className="bg-black/20 p-3 rounded">
                <h4 className="font-semibold mb-2 text-blue-300">Moll-Dreiklang (Beruhigung):</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>Grundton:</strong> 440 Hz (A)</li>
                  <li><strong>Kleine Terz:</strong> 528 Hz (C)</li>
                  <li><strong>Quinte:</strong> 660 Hz (E)</li>
                  <li><strong>Wirkung:</strong> Stress-Reduktion, Entspannung</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-500/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Praktische Anwendung
            </h3>
            <div className="space-y-3">
              <div className="bg-black/20 p-3 rounded">
                <h4 className="font-semibold">Schritt 1: Pathogen-Identifikation</h4>
                <p className="text-sm mt-1">
                  Mittels Bioresonanz-Test oder kinesiologischem Muskeltest wird die 
                  Grundfrequenz des störenden Pathogens ermittelt.
                </p>
              </div>
              
              <div className="bg-black/20 p-3 rounded">
                <h4 className="font-semibold">Schritt 2: Harmonikale Berechnung</h4>
                <p className="text-sm mt-1">
                  Berechnung der therapeutischen Frequenz über Quintenzirkel oder 
                  Oktav-Harmonische (meist Quinte = Pathogen-Frequenz × 1,5).
                </p>
              </div>
              
              <div className="bg-black/20 p-3 rounded">
                <h4 className="font-semibold">Schritt 3: Frequenz-Applikation</h4>
                <p className="text-sm mt-1">
                  Anwendung der therapeutischen Frequenz für 3-7 Minuten, 
                  kombiniert mit harmonischen Ober- und Untertönen.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HarmonikaleFrequenzlehre;
