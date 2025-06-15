
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BroersGrundlagen = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Dr. Dieter Broers - Wissenschaftliche Grundlagen</CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-300">Biophysiker & Bewusstseinsforscher</h3>
              <div className="space-y-3 text-gray-200">
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Studium:</strong> Physik, Biophysik
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Forschung:</strong> 40+ Jahre Elektromedizin
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Patente:</strong> Über 50 biomedizinische Erfindungen
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Publikationen:</strong> 300+ wissenschaftliche Arbeiten
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Bücher:</strong> "Der verratene Himmel", "Transformation der Erde"
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-300">Zentrale Forschungsthemen</h3>
              <ul className="space-y-2 text-gray-200">
                <li>• Bioelektromagnetische Wechselwirkungen</li>
                <li>• Solare Einflüsse auf das Bewusstsein</li>
                <li>• Frequenztherapie und Zellregeneration</li>
                <li>• Morphogenetische Felder</li>
                <li>• Quantenphysik des Bewusstseins</li>
                <li>• Elektromagnetische Hypersensitivität</li>
                <li>• Bewusstseinsevolution</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-300">Kernthesen nach Broers</h3>
              <div className="space-y-3">
                <div className="bg-purple-900/20 p-3 rounded">
                  <h4 className="font-semibold text-purple-200">1. Bewusstsein als Feld</h4>
                  <p className="text-gray-300 text-sm">
                    Bewusstsein ist ein elektromagnetisches Phänomen, das durch spezifische 
                    Frequenzmuster charakterisiert wird.
                  </p>
                </div>
                
                <div className="bg-purple-900/20 p-3 rounded">
                  <h4 className="font-semibold text-purple-200">2. Solare Steuerung</h4>
                  <p className="text-gray-300 text-sm">
                    Solare Aktivität beeinflusst direkt menschliche Bewusstseinszustände 
                    und evolutionäre Entwicklung.
                  </p>
                </div>
                
                <div className="bg-purple-900/20 p-3 rounded">
                  <h4 className="font-semibold text-purple-200">3. Frequenzmedizin</h4>
                  <p className="text-gray-300 text-sm">
                    Gezielte elektromagnetische Frequenzen können Heilungsprozesse 
                    aktivieren und Bewusstsein erweitern.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-300">Experimentelle Nachweise</h3>
              <div className="space-y-3">
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Zellstudien</h4>
                  <p className="text-gray-300 text-sm">
                    ELF-Felder (7,83 Hz) verstärken DNA-Reparatur und Zellregeneration 
                    um bis zu 400%.
                  </p>
                </div>
                
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">EEG-Messungen</h4>
                  <p className="text-gray-300 text-sm">
                    Schumann-Resonanz (7,83 Hz) synchronisiert Gehirnwellen und 
                    fördert Alpha-Zustände.
                  </p>
                </div>
                
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Korrelationsstudien</h4>
                  <p className="text-gray-300 text-sm">
                    Signifikante Zusammenhänge zwischen Sonnenaktivität und 
                    neurologischen Prozessen nachgewiesen.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-red-900/30 rounded-lg">
            <h4 className="text-lg font-semibold text-red-200 mb-2">Broers'sche Grundgleichung</h4>
            <p className="text-gray-300 mb-2">
              "Bewusstsein = f(Elektromagnetische Frequenz × Resonanz × Zeit)"
            </p>
            <p className="text-gray-300 text-sm">
              Diese Formel beschreibt die fundamentale Beziehung zwischen elektromagnetischen 
              Feldern und Bewusstseinszuständen als messbare, reproduzierbare Wechselwirkung.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BroersGrundlagen;
