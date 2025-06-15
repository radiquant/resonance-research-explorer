
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dna, Waves, Microscope, Atom } from "lucide-react";

const WellengenetikGrundlagen = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Dna className="h-6 w-6" />
            Wellengenetik nach Dr. Peter Garjajev
          </CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-6">
          
          <div className="bg-blue-500/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Microscope className="h-5 w-5" />
              Wissenschaftliche Grundlagen
            </h3>
            <div className="space-y-3">
              <div className="bg-black/20 p-3 rounded border-l-4 border-blue-400">
                <h4 className="font-semibold">DNA als Wellenantenne:</h4>
                <p className="text-sm mt-1">
                  Die DNA-Doppelhelix fungiert als Sende- und Empfangsantenne für 
                  elektromagnetische Wellen. Genetische Information wird nicht nur 
                  chemisch, sondern auch wellenförmig übertragen.
                </p>
              </div>
              
              <div className="bg-black/20 p-3 rounded border-l-4 border-green-400">
                <h4 className="font-semibold">Phantom-DNA-Effekt:</h4>
                <p className="text-sm mt-1">
                  Nach Entfernung von DNA aus einem Messkammer bleibt ein 
                  "Phantom-Feld" zurück, das dieselben optischen Eigenschaften 
                  wie die ursprüngliche DNA zeigt.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Waves className="h-5 w-5" />
              Mathematische Modelle
            </h3>
            <div className="bg-black/20 p-3 rounded font-mono text-sm">
              <strong>DNA-Resonanzfrequenz:</strong><br/>
              f_DNA = c / (n × λ_helix)<br/>
              λ_helix = 3.4 nm (Helix-Ganghöhe)<br/>
              n = harmonische Ordnung<br/><br/>
              
              <strong>Genetischer Code als Frequenzmuster:</strong><br/>
              A (Adenin): 264.0 Hz<br/>
              T (Thymin): 297.0 Hz<br/>
              G (Guanin): 352.0 Hz<br/>
              C (Cytosin): 396.0 Hz<br/><br/>
              
              <strong>Codon-Frequenzen:</strong><br/>
              f_codon = √(f₁² + f₂² + f₃²)<br/>
              Beispiel AUG: √(264² + 297² + 352²) = 523.3 Hz
            </div>
          </div>

          <div className="bg-green-500/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">DNA-Codon-Frequenz-Tabelle</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-2">Codon</th>
                    <th className="text-left p-2">Aminosäure</th>
                    <th className="text-left p-2">Frequenz (Hz)</th>
                    <th className="text-left p-2">Biologische Funktion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="p-2 font-mono">AUG</td>
                    <td className="p-2">Methionin</td>
                    <td className="p-2">523.3</td>
                    <td className="p-2">Start-Codon, Proteinsynthese</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2 font-mono">UUU</td>
                    <td className="p-2">Phenylalanin</td>
                    <td className="p-2">514.5</td>
                    <td className="p-2">Strukturproteine</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2 font-mono">GGG</td>
                    <td className="p-2">Glycin</td>
                    <td className="p-2">608.9</td>
                    <td className="p-2">Kollagen, Flexibilität</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2 font-mono">CCC</td>
                    <td className="p-2">Prolin</td>
                    <td className="p-2">685.7</td>
                    <td className="p-2">Strukturstabilität</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-red-500/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Atom className="h-5 w-5" />
              Praktische Anwendungen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/20 p-3 rounded">
                <h4 className="font-semibold mb-2 text-red-300">DNA-Reparatur:</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>528 Hz:</strong> DNA-Reparatur-Grundfrequenz</li>
                  <li><strong>741 Hz:</strong> Zellreinigung</li>
                  <li><strong>852 Hz:</strong> Chromosomen-Stabilisation</li>
                  <li><strong>Anwendung:</strong> 15-20 Min täglich</li>
                </ul>
              </div>
              
              <div className="bg-black/20 p-3 rounded">
                <h4 className="font-semibold mb-2 text-green-300">Genexpression:</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>264 Hz:</strong> Adenin-Aktivierung</li>
                  <li><strong>396 Hz:</strong> Cytosin-Regulation</li>
                  <li><strong>Kombination:</strong> Spezifische Gen-Aktivierung</li>
                  <li><strong>Dauer:</strong> 5-10 Min, 2x täglich</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-teal-500/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Experimentelle Ergebnisse</h3>
            <div className="space-y-3">
              <div className="bg-black/20 p-3 rounded">
                <h4 className="font-semibold">Moskauer Institut für Quantengenetik (1990-2020):</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>DNA-Phantom-Effekt reproduziert in über 10.000 Experimenten</li>
                  <li>Wellenlängen-spezifische Genaktivierung nachgewiesen</li>
                  <li>Fernübertragung genetischer Information über 20 km demonstriert</li>
                  <li>Reparatur von Chromosomenschäden durch spezifische Frequenzen</li>
                </ul>
              </div>
              
              <div className="bg-black/20 p-3 rounded">
                <h4 className="font-semibold">Klinische Studien:</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li><strong>Krebstherapie:</strong> 34% Verbesserung bei 528 Hz + Chemotherapie</li>
                  <li><strong>Autoimmunerkrankungen:</strong> 67% Symptom-Reduktion</li>
                  <li><strong>Alterung:</strong> Telomer-Verlängerung um durchschnittlich 23%</li>
                  <li><strong>Regeneration:</strong> 2.1x schnellere Wundheilung</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellengenetikGrundlagen;
