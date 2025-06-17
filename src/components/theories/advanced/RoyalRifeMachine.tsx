
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RoyalRifeMachine = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Royal Raymond Rife - Frequenztherapie & Mikroskopie</CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-300">Rife'sche Grundprinzipien</h3>
              <div className="space-y-3 text-gray-200">
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Mortal Oscillatory Rate (MOR):</strong> Jeder Mikroorganismus hat eine spezifische Zerstörungs-Frequenz
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Resonanz-Destruktion:</strong> Strukturelle Auflösung durch Eigenfrequenz
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Koordinatenfrequenzen:</strong> Präzise Frequenz-Kombinationen für spezifische Pathogene
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Frequenz-Sets:</strong> Sequentielle Anwendung für maximale Wirkung
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-300">Original Rife-Frequenzen (Hz)</h3>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li>• <strong>Krebszellen:</strong> 11,780,000 Hz</li>
                <li>• <strong>Tuberkulose:</strong> 1,552,000 Hz</li>
                <li>• <strong>Streptokokken:</strong> 880,000 Hz</li>
                <li>• <strong>Pneumokokken:</strong> 776,000 Hz</li>
                <li>• <strong>Staphylokokken:</strong> 728,000 Hz</li>
                <li>• <strong>Gonokokken:</strong> 712,000 Hz</li>
                <li>• <strong>Meningokokken:</strong> 676,000 Hz</li>
                <li>• <strong>Tetanus:</strong> 554,000 Hz</li>
                <li>• <strong>Influenza:</strong> 500,000 Hz</li>
                <li>• <strong>Typhus:</strong> 420,000 Hz</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-300">Rife-Frequenz-Algorithmus</h3>
              <div className="space-y-3">
                <div className="bg-purple-900/20 p-3 rounded text-sm font-mono">
                  <h4 className="font-semibold text-purple-200 mb-2">MOR-Berechnung:</h4>
                  <p className="text-gray-300">
                    f_MOR = C / (4 × d × n)<br/>
                    C = 299,792,458 m/s<br/>
                    d = Organismus-Durchmesser<br/>
                    n = Brechungsindex (1,33-1,45)
                  </p>
                </div>
                
                <div className="bg-purple-900/20 p-3 rounded text-sm">
                  <h4 className="font-semibold text-purple-200">Sideband-Frequenzen:</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>f₁ = MOR + (MOR × 0,04)</li>
                    <li>f₂ = MOR - (MOR × 0,04)</li>
                    <li>f₃ = MOR × 2 (2. Harmonische)</li>
                    <li>f₄ = MOR / 2 (Subharmonische)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-300">Rife-Mikroskop Spezifikationen</h3>
              <div className="space-y-3">
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Auflösung</h4>
                  <p className="text-gray-300 text-sm">
                    31,000× Vergrößerung bei 0,31 µm Auflösung<br/>
                    (Theoretisches Limit: λ/2 = 275 nm)
                  </p>
                </div>
                
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Beleuchtung</h4>
                  <p className="text-gray-300 text-sm">
                    Monochromatisches Licht: 5800 Å<br/>
                    Prisma-System: 14 Quarz-Prismen<br/>
                    Polarisierte Beleuchtung
                  </p>
                </div>
                
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Objektive</h4>
                  <p className="text-gray-300 text-sm">
                    Numerische Apertur: 1,40<br/>
                    Spezial-Quarzlinsen<br/>
                    Öl-Immersion: n = 1,515
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-300">Moderne Rife-Geräte</h3>
              <div className="space-y-3">
                <div className="bg-red-900/20 p-3 rounded">
                  <h4 className="font-semibold text-red-200">Kontakt-Modus</h4>
                  <p className="text-gray-300 text-sm">
                    Handheld-Elektroden<br/>
                    3,3V @ 1-3000 Hz<br/>
                    Rechteck-/Sinus-Wellen
                  </p>
                </div>
                
                <div className="bg-red-900/20 p-3 rounded">
                  <h4 className="font-semibold text-red-200">Plasma-Modus</h4>
                  <p className="text-gray-300 text-sm">
                    RF-Trägerfrequenz: 27,12 MHz<br/>
                    Plasma-Röhre: Argon/Helium<br/>
                    Reichweite: 3-8 Meter
                  </p>
                </div>
                
                <div className="bg-red-900/20 p-3 rounded">
                  <h4 className="font-semibold text-red-200">Remote-Modus</h4>
                  <p className="text-gray-300 text-sm">
                    DNA-Resonanz über Quantenfelder<br/>
                    Nail/Hair Sample<br/>
                    Entanglement-Theorie
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-green-900/20 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-green-200 mb-2">Frequenz-Sets nach Pathogen-Typ</h4>
              <div className="space-y-2 text-sm">
                <div><strong className="text-green-300">Bakterien:</strong> 20-50 kHz, 880 Hz, 728 Hz</div>
                <div><strong className="text-green-300">Viren:</strong> 15-500 Hz moduliert bei 2128 Hz</div>
                <div><strong className="text-green-300">Parasiten:</strong> 2-25 Hz, spezifische MOR-Frequenzen</div>
                <div><strong className="text-green-300">Pilze:</strong> 414-1130 Hz, Kombinations-Sets</div>
              </div>
            </div>
            
            <div className="bg-red-900/20 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-red-200 mb-2">Rife'sche Resonanz-Gleichung</h4>
              <p className="text-gray-300 mb-2 font-mono text-sm">
                "A(t) = A₀ × e^(-γt) × cos(ω₀t + φ)"
              </p>
              <p className="text-gray-300 text-sm">
                Beschreibt die Amplitude-Entwicklung bei Resonanz-Zerstörung:<br/>
                A₀ = Anfangsamplitude, γ = Dämpfungskonstante,<br/>
                ω₀ = Eigenfrequenz des Organismus, φ = Phase
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoyalRifeMachine;
