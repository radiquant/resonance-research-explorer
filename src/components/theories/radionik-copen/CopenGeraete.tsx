
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CopenGeraete = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Bruce Copen Radionische Geräte</CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-300">Historische Copen-Geräte</h3>
              <div className="space-y-3">
                <div className="bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-200 mb-2">Copen Mark I (1960)</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• 3-Dial System mit Stick-Pad</li>
                    <li>• Analoge Potentiometer</li>
                    <li>• Manueller Raten-Input</li>
                    <li>• Kupfer-Detektorplatten</li>
                  </ul>
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-200 mb-2">Copen Mark VI (1975)</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• 10-Dial Präzisions-System</li>
                    <li>• Integrierte Rate-Bibliothek</li>
                    <li>• Automatische Kalibrierung</li>
                    <li>• Verstärker-Schaltung</li>
                  </ul>
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-200 mb-2">Copen 2000 (1995)</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Computer-Interface</li>
                    <li>• Digitale Raten-Eingabe</li>
                    <li>• Automatischer Algorithmus</li>
                    <li>• Remote-Behandlung</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-300">Technische Spezifikationen</h3>
              <div className="space-y-3">
                <div className="bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-200 mb-2">Elektronische Komponenten</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Hochimpedanz-Verstärker (>10 MΩ)</li>
                    <li>• Präzisions-Potentiometer (0,1% Toleranz)</li>
                    <li>• Kapazitive Koppler</li>
                    <li>• Phasen-Lock-Schaltungen</li>
                  </ul>
                </div>
                
                <div className="bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-200 mb-2">Messtechnik</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Stick-Pad Taktil-Sensor</li>
                    <li>• Bioimpedanz-Messung</li>
                    <li>• Resonanz-Detektion</li>
                    <li>• Automatisc​he Nullung</li>
                  </ul>
                </div>
                
                <div className="bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-200 mb-2">Kalibrierung</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Quarz-Referenz-Oszillator</li>
                    <li>• Standard-Testsubstanzen</li>
                    <li>• Bekannte Raten-Verifikation</li>
                    <li>• Temperatur-Kompensation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-900/30 rounded-lg">
            <h4 className="text-lg font-semibold text-yellow-200 mb-2">Moderne Copen-Nachbauten</h4>
            <p className="text-gray-300">
              Heutige radionische Geräte basieren oft auf Copens Grundprinzipien, integrieren jedoch 
              moderne Mikroelektronik, digitale Signalverarbeitung und Software-basierte Algorithmen 
              für präzisere Messungen und erweiterte Funktionalitäten.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CopenGeraete;
