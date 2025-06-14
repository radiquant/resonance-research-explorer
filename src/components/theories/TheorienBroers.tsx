
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TheorienBroers = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center text-blue-800">
            Theorien und Prinzipien nach Dieter Broers - Detaillierte Frequenz-Kompendien
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Bewusstseins-Frequenzen (Detailliert)</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Gehirnwellen-Spektrum (Erweitert)</h3>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Delta-Wellen (0,1-4 Hz):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>0,1-0,5 Hz:</strong> Tiefste Regeneration, Zell-Reparatur</li>
              <li><strong>0,5-1 Hz:</strong> Bewusstlose Zustände, Koma-Therapie</li>
              <li><strong>1-1,5 Hz:</strong> Tiefschlaf, Wachstumshormon-Ausschüttung</li>
              <li><strong>1,5-2 Hz:</strong> REM-Schlaf-Induktion, Traumaktivität</li>
              <li><strong>2-2,5 Hz:</strong> Schmerz-Analgesie, Endorphin-Freisetzung</li>
              <li><strong>2,5-3 Hz:</strong> Tiefe Meditation, Samadhi-Zustände</li>
              <li><strong>3-3,5 Hz:</strong> Hypnose-Induktion, Suggestionsfähigkeit</li>
              <li><strong>3,5-4 Hz:</strong> Übergang zu Theta, erwachende Intuition</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Theta-Wellen (4-8 Hz):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>4-4,5 Hz:</strong> Schamanische Trance, Astralprojektion</li>
              <li><strong>4,5-5 Hz:</strong> Kreativitäts-Boost, Künstlerische Inspiration</li>
              <li><strong>5-5,5 Hz:</strong> Lernfähigkeit, Gedächtnis-Konsolidierung</li>
              <li><strong>5,5-6 Hz:</strong> Intuitions-Verstärkung, Eingebungen</li>
              <li><strong>6-6,5 Hz:</strong> Meditation, innere Ruhe</li>
              <li><strong>6,5-7 Hz:</strong> Visualisierung, mentale Bilder</li>
              <li><strong>7-7,5 Hz:</strong> Paranormale Wahrnehmung, ESP</li>
              <li><strong>7,5-8 Hz:</strong> Übergang zu Alpha, entspannte Wachheit</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Alpha-Wellen (8-13 Hz):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>8-8,5 Hz:</strong> Entspanntes Wachbewusstsein, Stressabbau</li>
              <li><strong>8,5-9 Hz:</strong> Mentale Klarheit, Fokussierung</li>
              <li><strong>9-9,5 Hz:</strong> Emotionale Ausgeglichenheit</li>
              <li><strong>9,5-10 Hz:</strong> Erhöhte Serotoninproduktion</li>
              <li><strong>10-10,5 Hz:</strong> Optimale Lernfähigkeit</li>
              <li><strong>10,5-11 Hz:</strong> Verstärkte Konzentration</li>
              <li><strong>11-11,5 Hz:</strong> Meditation, spirituelle Verbindung</li>
              <li><strong>11,5-12 Hz:</strong> Harmonische Stimmung</li>
              <li><strong>12-13 Hz:</strong> Übergang zu Beta, aktive Aufmerksamkeit</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Beta-Wellen (13-30 Hz):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>13-15 Hz:</strong> Entspannte Aufmerksamkeit, SMR (Sensorimotor Rhythm)</li>
              <li><strong>15-18 Hz:</strong> Normale Wachheit, Alltagsbewusstsein</li>
              <li><strong>18-21 Hz:</strong> Erhöhte Konzentration, Problemlösung</li>
              <li><strong>21-24 Hz:</strong> Analytisches Denken, Logik</li>
              <li><strong>24-27 Hz:</strong> Stress-Reaktion, Anspannung</li>
              <li><strong>27-30 Hz:</strong> Übergang zu Gamma, höhere Verarbeitung</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Gamma-Wellen (30-100+ Hz):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>30-35 Hz:</strong> Bewusstseinsbindung, Wahrnehmungsintegration</li>
              <li><strong>35-40 Hz:</strong> Höhere kognitive Funktionen</li>
              <li><strong>40-45 Hz:</strong> Aha-Erlebnisse, Erkenntnismomente</li>
              <li><strong>45-50 Hz:</strong> Mystische Erfahrungen</li>
              <li><strong>50-60 Hz:</strong> Erweiterte Bewusstseinszustände</li>
              <li><strong>60-80 Hz:</strong> Transzendente Erfahrungen</li>
              <li><strong>80-100 Hz:</strong> Höchste dokumentierte Bewusstseinszustände</li>
              <li><strong>100+ Hz:</strong> Hyper-Gamma, außergewöhnliche Zustände</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Schumann-Resonanz-System (Detailliert)</h2>

          <div className="bg-teal-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Haupt-Resonanzen und Obertöne:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>7,83 Hz:</strong> Grundfrequenz (1. Mode)
                <ul className="list-disc pl-6 mt-1">
                  <li>Amplitude: ~1 pT (Picotesla)</li>
                  <li>Q-Faktor: ~4-6</li>
                  <li>Tagesvariation: ±0,2 Hz</li>
                  <li>Jahreszeitvariation: ±0,5 Hz</li>
                  <li>Biologische Wirkung: Alpha-Synchronisation</li>
                </ul>
              </li>
              <li><strong>14,3 Hz:</strong> 2. Mode
                <ul className="list-disc pl-6 mt-1">
                  <li>Verstärkung bei Gewittern</li>
                  <li>Korrelation mit Beta-Aktivität</li>
                  <li>Aufmerksamkeits-Fokussierung</li>
                </ul>
              </li>
              <li><strong>20,8 Hz:</strong> 3. Mode
                <ul className="list-disc pl-6 mt-1">
                  <li>Höhere Beta-Korrelation</li>
                  <li>Stress-Indikator</li>
                  <li>Kampf-oder-Flucht-Response</li>
                </ul>
              </li>
              <li><strong>27,3 Hz:</strong> 4. Mode
                <ul className="list-disc pl-6 mt-1">
                  <li>Gamma-Übergang</li>
                  <li>Bewusstseins-Integration</li>
                </ul>
              </li>
              <li><strong>33,8 Hz:</strong> 5. Mode
                <ul className="list-disc pl-6 mt-1">
                  <li>Gamma-Bereich</li>
                  <li>Höhere Wahrnehmung</li>
                </ul>
              </li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Megawave-Therapiefrequenzen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Basis-Programme</h3>

          <div className="bg-indigo-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Entspannungs-Protokolle:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Programm 1 - Deep Relax:</strong>
                <ul className="list-disc pl-6 mt-1">
                  <li>Start: 14 Hz → 7 Hz (5 Min)</li>
                  <li>Plateau: 7,83 Hz (15 Min)</li>
                  <li>Abschluss: 4 Hz → 2 Hz (5 Min)</li>
                  <li>Binaural Beats: 6,3 Hz (Theta-Induktion)</li>
                </ul>
              </li>
              <li><strong>Programm 2 - Meditation Plus:</strong>
                <ul className="list-disc pl-6 mt-1">
                  <li>Vorbereitung: 20 Hz → 10 Hz (3 Min)</li>
                  <li>Meditation: 6,3 Hz (20 Min)</li>
                  <li>Vertiefung: 4,5 Hz (10 Min)</li>
                  <li>Integration: 10 Hz (2 Min)</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="bg-cyan-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Lern-Programme:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Super Learning:</strong>
                <ul className="list-disc pl-6 mt-1">
                  <li>Aktivierung: 15-18 Hz (Beta)</li>
                  <li>Aufnahme: 8-10 Hz (Alpha)</li>
                  <li>Integration: 5-7 Hz (Theta)</li>
                  <li>Konsolidierung: 10 Hz (Alpha)</li>
                </ul>
              </li>
              <li><strong>Memory Enhancement:</strong>
                <ul className="list-disc pl-6 mt-1">
                  <li>Retrieval: 13-15 Hz</li>
                  <li>Encoding: 4-6 Hz</li>
                  <li>Consolidation: 10-12 Hz</li>
                </ul>
              </li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Solare Einfluss-Frequenzen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Sonnenaktivitäts-Korrelationen</h3>

          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Solarzyklen und Bewusstsein:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>11-Jahres-Zyklus:</strong> 2,9 × 10⁻⁹ Hz
                <ul className="list-disc pl-6 mt-1">
                  <li>Sonnenflecken-Maximum: Erhöhte Kreativität</li>
                  <li>Sonnenflecken-Minimum: Introspektion</li>
                  <li>Bewusstseins-Phasen: Expansion/Kontraktion</li>
                </ul>
              </li>
              <li><strong>27-Tage-Rotation:</strong> 4,3 × 10⁻⁷ Hz
                <ul className="list-disc pl-6 mt-1">
                  <li>Emotionale Zyklen</li>
                  <li>Stimmungsschwankungen</li>
                  <li>Schlaf-Wach-Rhythmus-Variationen</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Geomagnetische Frequenzen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Pc1-Schwingungen:</strong> 0,2-5 Hz
                <ul className="list-disc pl-6 mt-1">
                  <li>Korrelation mit Delta-Wellen</li>
                  <li>Schlafqualität-Beeinflussung</li>
                  <li>Melatonin-Produktion</li>
                </ul>
              </li>
              <li><strong>Pc3-4-Schwingungen:</strong> 10-100 mHz
                <ul className="list-disc pl-6 mt-1">
                  <li>Ultra-niedrige Frequenzen</li>
                  <li>Langzeit-Biorhythmus</li>
                  <li>Zelluläre Resonanz</li>
                </ul>
              </li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Bewusstseins-Evolutions-Frequenzen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2012-Übergang-Spektrum</h3>

          <div className="bg-violet-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Evolutionäre Frequenzen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Homo Sapiens (Basis):</strong> 7,23 Hz (Durchschnitt)</li>
              <li><strong>Homo Spiritualis (Ziel):</strong> 13,8 Hz
                <ul className="list-disc pl-6 mt-1">
                  <li>Erweiterte Wahrnehmung</li>
                  <li>Telepathische Fähigkeiten</li>
                  <li>Intuitive Erkenntnis</li>
                </ul>
              </li>
              <li><strong>Übergangs-Frequenzen:</strong>
                <ul className="list-disc pl-6 mt-1">
                  <li>Phase 1: 8,5 Hz (Erwachen)</li>
                  <li>Phase 2: 10,2 Hz (Integration)</li>
                  <li>Phase 3: 12,1 Hz (Transformation)</li>
                  <li>Phase 4: 13,8 Hz (Neue Spezies)</li>
                </ul>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">DNA-Aktivierungs-Frequenzen</h3>

          <div className="bg-pink-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Dormante DNA-Aktivierung:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Junk-DNA Aktivierung:</strong> 528 Hz (Solfeggio)
                <ul className="list-disc pl-6 mt-1">
                  <li>DNA-Reparatur-Frequenz</li>
                  <li>Liebe und Transformation</li>
                  <li>Herzchakra-Resonanz</li>
                </ul>
              </li>
              <li><strong>12-Strang-DNA (Theorie):</strong>
                <ul className="list-disc pl-6 mt-1">
                  <li>Strang 3-4: 741 Hz (Erwachen der Intuition)</li>
                  <li>Strang 5-6: 852 Hz (Rückkehr zur spirituellen Ordnung)</li>
                  <li>Strang 7-8: 963 Hz (Verbindung zum Göttlichen)</li>
                  <li>Strang 9-10: 174 Hz (Stärkung der Energie)</li>
                  <li>Strang 11-12: 285 Hz (Multi-dimensionales Bewusstsein)</li>
                </ul>
              </li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Quantenfeld-Resonanzen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Morphogenetische Feld-Frequenzen</h3>

          <div className="bg-emerald-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Kollektives Bewusstsein:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Gruppen-Kohärenz:</strong> 0,1 Hz (Global Consciousness Project)
                <ul className="list-disc pl-6 mt-1">
                  <li>Collective Events: Verstärkte Kohärenz</li>
                  <li>Meditation Groups: Synchronisation</li>
                  <li>Global Crises: Kohärenz-Anomalien</li>
                </ul>
              </li>
              <li><strong>Spezies-Feld:</strong> 40 Hz (Gamma-Binding)
                <ul className="list-disc pl-6 mt-1">
                  <li>Bewusstseins-Bindung</li>
                  <li>Kollektive Intelligenz</li>
                  <li>Morphische Resonanz</li>
                </ul>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Technologie-Bewusstsein-Interface</h3>

          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Brain-Computer-Interface (BCI):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Neurofeedback-Frequenzen:</strong>
                <ul className="list-disc pl-6 mt-1">
                  <li>SMR-Training: 12-15 Hz</li>
                  <li>Beta-Training: 15-18 Hz</li>
                  <li>Alpha-Training: 8-12 Hz</li>
                  <li>Theta-Training: 4-8 Hz</li>
                </ul>
              </li>
              <li><strong>Bewusstseins-Upload (Theorie):</strong>
                <ul className="list-disc pl-6 mt-1">
                  <li>Sampling-Rate: 40-100 kHz</li>
                  <li>Bewusstseins-Bandbreite: 10¹⁶ bit/s</li>
                  <li>Quantencomputer-Interface: THz-Bereich</li>
                </ul>
              </li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Mathematische Grundlagen (Broers-Formeln)</h2>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Bewusstseins-Mathematik:</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Kohärenz-Index:</strong> C = |⟨Ψ₁|Ψ₂⟩|²</li>
              <li><strong>Bewusstseins-Entropie:</strong> S = -Σ pᵢ log pᵢ</li>
              <li><strong>Resonanz-Güte:</strong> Q = f₀/Δf</li>
              <li><strong>Frequenz-Transformation:</strong> f(t) = ∫ F(ω)e^(iωt) dω</li>
              <li><strong>Neuronale Synchronisation:</strong> PLV = |⟨e^(iΔφ)⟩|</li>
              <li><strong>Morphisches Feld:</strong> Ψ(r,t) = Ae^(ikr-iωt)</li>
              <li><strong>Bewusstseins-Wellenfunktion:</strong> |Ψ⟩ = Σ cᵢ|φᵢ⟩</li>
            </ul>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default TheorienBroers;
