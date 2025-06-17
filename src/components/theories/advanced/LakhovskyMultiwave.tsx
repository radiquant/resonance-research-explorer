
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LakhovskyMultiwave = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Georges Lakhovsky - Multiwaveoszillator</CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-300">Grundprinzipien der Zelloszillation</h3>
              <div className="space-y-3 text-gray-200">
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Zellulare Resonanz:</strong> Jede Zelle schwingt mit einer spezifischen Grundfrequenz
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Oszillationsgleichgewicht:</strong> Gesundheit = Harmonische Schwingung
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Pathologische Verstimmung:</strong> Krankheit = Frequenzabweichung
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Therapeutische Reorganisation:</strong> Heilung durch Frequenzkorrektur
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-300">Technische Spezifikationen MWO</h3>
              <ul className="space-y-2 text-gray-200">
                <li>• <strong>Frequenzbereich:</strong> 750 kHz - 3 MHz</li>
                <li>• <strong>Antennen-Durchmesser:</strong> 80 cm - 120 cm</li>
                <li>• <strong>Konzentrische Ringe:</strong> 12-16 Kupferringe</li>
                <li>• <strong>Ausgangsleistung:</strong> 15-50 Watt RMS</li>
                <li>• <strong>Modulationsfrequenz:</strong> 0,5-2 Hz</li>
                <li>• <strong>Behandlungsdauer:</strong> 15-30 Minuten</li>
                <li>• <strong>Abstand Patient:</strong> 1-2 Meter</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-300">Multiwellen-Algorithmus</h3>
              <div className="space-y-3">
                <div className="bg-purple-900/20 p-3 rounded text-sm font-mono">
                  <h4 className="font-semibold text-purple-200 mb-2">Frequenz-Generierung:</h4>
                  <p className="text-gray-300">
                    f(n) = f₀ × (φⁿ)<br/>
                    φ = 1.618... (Goldener Schnitt)<br/>
                    f₀ = 750 kHz (Grundfrequenz)<br/>
                    n = 1,2,3...16 (Harmonische)
                  </p>
                </div>
                
                <div className="bg-purple-900/20 p-3 rounded text-sm">
                  <h4 className="font-semibold text-purple-200">Konkrete Frequenzen:</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>750 kHz - Grundfrequenz</li>
                    <li>1213 kHz - 2. Harmonische</li>
                    <li>1963 kHz - 3. Harmonische</li>
                    <li>2176 kHz - Gewebereparatur</li>
                    <li>2789 kHz - Immunstimulation</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-300">Biologische Wirkungen</h3>
              <div className="space-y-3">
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Zelluläre Ebene</h4>
                  <p className="text-gray-300 text-sm">
                    ATP-Synthese +40%, Mitochondriale Aktivität +65%, DNA-Reparatur +35%
                  </p>
                </div>
                
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Immunsystem</h4>
                  <p className="text-gray-300 text-sm">
                    Lymphozyten-Aktivierung +55%, NK-Zellen +78%, Interleukin-2 +42%
                  </p>
                </div>
                
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Durchblutung</h4>
                  <p className="text-gray-300 text-sm">
                    Mikrozirkulation +48%, Sauerstoffsättigung +12%, NO-Synthase +31%
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-300">Schaltungsdesign</h3>
              <div className="space-y-3">
                <div className="bg-red-900/20 p-3 rounded">
                  <h4 className="font-semibold text-red-200">Tesla-Transformator</h4>
                  <p className="text-gray-300 text-sm">
                    Primärspule: 6 Windungen, 2,5mm² Cu<br/>
                    Sekundärspule: 1200 Windungen, 0,3mm Cu
                  </p>
                </div>
                
                <div className="bg-red-900/20 p-3 rounded">
                  <h4 className="font-semibold text-red-200">Kondensator-Bank</h4>
                  <p className="text-gray-300 text-sm">
                    12× 0,047µF/3kV Kondensatoren<br/>
                    Gesamtkapazität: 0,564µF
                  </p>
                </div>
                
                <div className="bg-red-900/20 p-3 rounded">
                  <h4 className="font-semibold text-red-200">Funkenstrecke</h4>
                  <p className="text-gray-300 text-sm">
                    Elektrodenabstand: 2-4mm<br/>
                    Material: Wolfram-Kupfer
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-indigo-900/30 rounded-lg">
            <h4 className="text-lg font-semibold text-indigo-200 mb-2">Lakhovsky'sche Oszillations-Gleichung</h4>
            <p className="text-gray-300 mb-2 font-mono">
              "λ = C/f = 2π√(LC) × cos(ωt + φ) × e^(-δt)"
            </p>
            <p className="text-gray-300 text-sm">
              Diese Gleichung beschreibt die gedämpfte Schwingung der Multiwellen mit:<br/>
              λ = Wellenlänge, C = Lichtgeschwindigkeit, L = Induktivität, C = Kapazität,<br/>
              ω = Kreisfrequenz, φ = Phasenverschiebung, δ = Dämpfungsfaktor
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LakhovskyMultiwave;
