
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RadiationDetox = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Detoxifikation von Strahlungsbelastungen - 5G/6G/EMF</CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-300">Strahlungsarten & Frequenzen</h3>
              <div className="space-y-3 text-gray-200">
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">5G-Frequenzen:</strong> 700 MHz - 39 GHz (mmWave: 24-39 GHz)
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">6G-Prognose:</strong> 95 GHz - 3 THz (Terahertz-Bereich)
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Spherics (Sferics):</strong> 3-30 kHz atmosphärische Impulse
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Dirty Electricity:</strong> 2-150 kHz harmonische Verzerrungen
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-300">Biologische Wirkungsmechanismen</h3>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li>• <strong>Spannungsabhängige Ca²⁺-Kanäle (VGCC):</strong> Aktivierung bei 1-10 V/m</li>
                <li>• <strong>Oxidativer Stress:</strong> ROS-Erhöhung um 300-500%</li>
                <li>• <strong>DNA-Strangbrüche:</strong> Einzelstrang: 2-8× erhöht</li>
                <li>• <strong>Blut-Hirn-Schranke:</strong> Permeabilität +200% bei 915 MHz</li>
                <li>• <strong>Melatonin-Suppression:</strong> -40% bei 0,1-1,0 mW/cm²</li>
                <li>• <strong>Mitochondriale Dysfunktion:</strong> ATP-Synthese -25%</li>
                <li>• <strong>Protein-Faltungsstörungen:</strong> Heat-Shock-Protein-Induktion</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-300">Biophysikalische Detox-Methoden</h3>
              <div className="space-y-3">
                <div className="bg-purple-900/20 p-3 rounded">
                  <h4 className="font-semibold text-purple-200">Schumann-Resonanz-Therapie</h4>
                  <p className="text-gray-300 text-sm">
                    7,83 Hz Grundfrequenz + Harmonische<br/>
                    Regeneration der zirkadianen Rhythmik<br/>
                    EEG-Alpha-Synchronisation
                  </p>
                </div>
                
                <div className="bg-purple-900/20 p-3 rounded">
                  <h4 className="font-semibold text-purple-200">PEMF-Therapie</h4>
                  <p className="text-gray-300 text-sm">
                    0,5-30 Hz, 0,1-5000 µT<br/>
                    Zellmembran-Repolarisation<br/>
                    Mitochondriale ATP-Steigerung +40%
                  </p>
                </div>
                
                <div className="bg-purple-900/20 p-3 rounded">
                  <h4 className="font-semibold text-purple-200">Neutralisations-Frequenzen</h4>
                  <p className="text-gray-300 text-sm">
                    Gegen-Phasen-Signale<br/>
                    Destruktive Interferenz<br/>
                    EMF-Harmonisierung
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-300">Nutritive Detox-Strategien</h3>
              <div className="space-y-3">
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Antioxidantien</h4>
                  <p className="text-gray-300 text-sm">
                    Glutathion: 500-1000 mg/d<br/>
                    Vitamin E: 400-800 IE<br/>
                    Quercetin: 500-1000 mg<br/>
                    Resveratrol: 100-500 mg
                  </p>
                </div>
                
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Mineralstoffe</h4>
                  <p className="text-gray-300 text-sm">
                    Magnesium: 400-600 mg/d<br/>
                    Zink: 15-30 mg/d<br/>
                    Selen: 100-200 µg/d<br/>
                    Kalzium: 1000-1200 mg/d
                  </p>
                </div>
                
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Adaptogene</h4>
                  <p className="text-gray-300 text-sm">
                    Ashwagandha: 300-500 mg<br/>
                    Rhodiola: 200-400 mg<br/>
                    Ginseng: 100-200 mg<br/>
                    Schisandra: 500-1500 mg
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-300">Abschirmungs-Technologien</h3>
              <div className="space-y-3">
                <div className="bg-red-900/20 p-3 rounded">
                  <h4 className="font-semibold text-red-200">Faraday-Käfig-Prinzip</h4>
                  <p className="text-gray-300 text-sm">
                    Leitfähige Gewebe: Ag/Cu-Fasern<br/>
                    Abschirmung: 30-60 dB<br/>
                    Frequenzbereich: 10 MHz - 18 GHz
                  </p>
                </div>
                
                <div className="bg-red-900/20 p-3 rounded">
                  <h4 className="font-semibold text-red-200">Shungit-Technologie</h4>
                  <p className="text-gray-300 text-sm">
                    Fullerene C₆₀, C₇₀<br/>
                    Elektronen-Akzeptor-Eigenschaften<br/>
                    EMF-Absorption: 95-99%
                  </p>
                </div>
                
                <div className="bg-red-900/20 p-3 rounded">
                  <h4 className="font-semibold text-red-200">Skalar-Wellen-Generatoren</h4>
                  <p className="text-gray-300 text-sm">
                    Tesla-Bifilar-Spulen<br/>
                    Caduceus-Coil-Arrays<br/>
                    Vortex-Mathematik-Chips
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-cyan-300">Mess- und Detektionsverfahren</h3>
              <div className="space-y-3">
                <div className="bg-cyan-900/20 p-3 rounded">
                  <h4 className="font-semibold text-cyan-200">EMF-Messgeräte</h4>
                  <p className="text-gray-300 text-sm">
                    Breitband-Spektrum-Analyzer<br/>
                    50 Hz - 8 GHz Messbereich<br/>
                    ±1 dB Genauigkeit
                  </p>
                </div>
                
                <div className="bg-cyan-900/20 p-3 rounded">
                  <h4 className="font-semibold text-cyan-200">Biologische Marker</h4>
                  <p className="text-gray-300 text-sm">
                    8-OHdG (DNA-Oxidation)<br/>
                    Cortisol-Spiegel<br/>
                    HRV-Parameter<br/>
                    Melatonin-Metaboliten
                  </p>
                </div>
                
                <div className="bg-cyan-900/20 p-3 rounded">
                  <h4 className="font-semibold text-cyan-200">Elektrodermal-Screening</h4>
                  <p className="text-gray-300 text-sm">
                    Voll/Vega-Test-Verfahren<br/>
                    Akupunkturpunkt-Messungen<br/>
                    Bioenergetische Resonanz-Tests
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-pink-300">Fortgeschrittene Detox-Protokolle</h3>
              <div className="space-y-3">
                <div className="bg-pink-900/20 p-3 rounded">
                  <h4 className="font-semibold text-pink-200">Frequenz-Sequenz-Therapie</h4>
                  <p className="text-gray-300 text-sm">
                    Zuerst: Parasympathikus-Aktivierung (0,5-4 Hz)<br/>
                    Dann: Zellreparatur-Frequenzen (40-100 Hz)<br/>
                    Abschluss: Schumann-Harmonisierung (7,83 Hz)
                  </p>
                </div>
                
                <div className="bg-pink-900/20 p-3 rounded">
                  <h4 className="font-semibold text-pink-200">Licht-Therapie-Kombination</h4>
                  <p className="text-gray-300 text-sm">
                    Rotes Licht: 660-670 nm (Mitochondrial)<br/>
                    Nahinfrarot: 810-850 nm (Tiefenpenetration)<br/>
                    UV-B: 290-315 nm (Vitamin D-Synthese)
                  </p>
                </div>
                
                <div className="bg-pink-900/20 p-3 rounded">
                  <h4 className="font-semibold text-pink-200">Quantenfeld-Harmonisierung</h4>
                  <p className="text-gray-300 text-sm">
                    TimeWaver-Frequenz-Module<br/>
                    Informationsfeld-Optimierung<br/>
                    Morphogenetische Feld-Korrektur
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-indigo-900/30 rounded-lg">
            <h4 className="text-lg font-semibold text-indigo-200 mb-2">EMF-Detox-Algorithmus</h4>
            <p className="text-gray-300 mb-2 font-mono text-sm">
              "Detox-Rate = (Antioxidans-Kapazität × PEMF-Intensität) / (EMF-Belastung × Expositions-Zeit)"
            </p>
            <p className="text-gray-300 text-sm">
              Dieser Algorithmus kalkuliert die optimale Detox-Strategie basierend auf individueller 
              Strahlungsbelastung, antioxidativer Kapazität und therapeutischen Gegenmaßnahmen.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RadiationDetox;
