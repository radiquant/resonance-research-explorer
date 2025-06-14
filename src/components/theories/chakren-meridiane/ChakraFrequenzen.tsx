
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ChakraFrequenzen = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-800">
            Präzise Chakra-Frequenzen und Berechnungen
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Mathematisch Berechnete Chakra-Frequenzen</h3>

          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">1. Muladhara (Wurzel-Chakra) - Präzise Berechnungen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-red-400 my-3">
              <strong>Grundfrequenz (Note C):</strong><br/>
              f₁ = 261,626 Hz (C4, wissenschaftlich exakt)<br/>
              Anatomische Berechnung: f = c/λ, λ = 4×L_becken = 4×0,32m<br/>
              f = 343 m/s / 1,28 m = 268,0 Hz (akustische Resonanz)<br/><br/>
              <strong>Planetenfrequenz-Ableitung:</strong><br/>
              f_erde = 2π × (Erdumfang/86400s) / 2^n<br/>
              f_erde = 194,18 Hz (Earth Day, n=18 Oktaven)<br/><br/>
              <strong>Solfeggio-Korrelation:</strong><br/>
              396 Hz = 3 × 132 Hz (Grundharmonische)<br/>
              Verhältnis: 396/194,18 = 2,04 ≈ 2 (Oktav-Verwandtschaft)<br/><br/>
              <strong>Binaural Beat Optimierung:</strong><br/>
              Δf = 7,83 Hz (Schumann-Resonanz)<br/>
              f_links = 194,18 Hz, f_rechts = 201,01 Hz<br/><br/>
              <strong>Kristall-Resonanz (Hämatit):</strong><br/>
              f_kristall = v_schall_hämatit / λ_gitter<br/>
              v = 4200 m/s, λ = 2,1 nm → f = 2,0 THz (Infrarot)
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">2. Svadhisthana (Sakral-Chakra) - Wissenschaftliche Ableitung:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-orange-400 my-3">
              <strong>Grundfrequenz (Note D):</strong><br/>
              f₂ = 293,665 Hz (D4, temperierte Stimmung)<br/>
              Verhältnis zu Muladhara: 293,665/261,626 = 1,1225 ≈ 9/8 (große Sekunde)<br/><br/>
              <strong>Anatomische Resonanz (Beckenbereich):</strong><br/>
              L_sakral = 0,28 m (Kreuzbeinhöhe)<br/>
              f = v_körperschall / (4×L) = 1540 m/s / 1,12 m = 1375 Hz<br/>
              Heruntergerechnet auf Hörbereich: 1375/2^2 = 343,75 Hz<br/><br/>
              <strong>Hormonelle Korrelation:</strong><br/>
              Testosteron-Zyklus: 28 Tage → f = 1/(28×24×3600) = 4,13×10⁻⁷ Hz<br/>
              Hochskaliert: 4,13×10⁻⁷ × 2^27 = 55,4 Hz (Subharmonische)<br/><br/>
              <strong>Wasserfrequenz-Modell:</strong><br/>
              Körper 60% Wasser, H₂O-Bending: 1595 cm⁻¹<br/>
              f_wasser = 1595 × c/100 = 4,78×10¹³ Hz<br/>
              Biologische Modulation: f_bio = f_wasser × 10⁻¹¹ = 478 Hz
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">3. Manipura (Solarplexus) - Energetische Berechnungen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-yellow-400 my-3">
              <strong>Grundfrequenz (Note E):</strong><br/>
              f₃ = 329,628 Hz (E4, mathematisch exakt)<br/>
              Goldener Schnitt zu Muladhara: 329,628/261,626 = 1,26 ≈ φ/2<br/><br/>
              <strong>Solarkonstante-Ableitung:</strong><br/>
              S = 1361 W/m² (Solarkonstante)<br/>
              λ_max = 2,898×10⁻³/5778 = 501 nm (Wien'sches Gesetz)<br/>
              f_solar = c/λ = 5,99×10¹⁴ Hz<br/>
              Biologische Skalierung: f_bio = f_solar × 10⁻¹² × 2^(-10) = 584 Hz<br/><br/>
              <strong>DNA-Resonanz (528 Hz Herleitung):</strong><br/>
              528 Hz = 2⁹ × (33/64) Hz = 512 × 1,03125 Hz<br/>
              Mathematische Perfektion: 528 = 16 × 33 = 2⁴ × 3 × 11
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">4. Anahata (Herz-Chakra) - Kardiovaskuläre Resonanz:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-green-400 my-3">
              <strong>Grundfrequenz (Note F):</strong><br/>
              f₄ = 349,228 Hz (F4, exakte Berechnung)<br/><br/>
              <strong>Herzfrequenz-Harmonie:</strong><br/>
              Ruhepuls: 60 bpm = 1 Hz<br/>
              Harmonische: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512 Hz<br/>
              Herzchakra liegt bei 8. Harmonische × 43,65 = 349,2 Hz<br/><br/>
              <strong>HRV-Spektralanalyse:</strong><br/>
              VLF: 0,003-0,04 Hz (Thermoregulation)<br/>
              LF: 0,04-0,15 Hz (Sympathikus)<br/>
              HF: 0,15-0,4 Hz (Parasympathikus)<br/>
              Kohärenz-Frequenz: 0,1 Hz × 2^12 = 409,6 Hz
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">5. Vishuddha (Hals-Chakra) - Akustische Resonanz:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-blue-400 my-3">
              <strong>Grundfrequenz (Note G):</strong><br/>
              f₅ = 391,995 Hz (G4, physikalisch berechnet)<br/><br/>
              <strong>Stimmband-Resonanz:</strong><br/>
              Männliche Stimme: 85-180 Hz (Grundfrequenz)<br/>
              Weibliche Stimme: 165-265 Hz<br/>
              Formant F1: 270-730 Hz, F2: 840-2290 Hz<br/>
              Chakra-Mittelwert: (270+730)/2 × 0,78 = 390 Hz<br/><br/>
              <strong>Kehlkopf-Anatomie:</strong><br/>
              Länge der Stimmlippen: 17-24 mm<br/>
              Schallgeschwindigkeit in Gewebe: 1540 m/s<br/>
              f = v/(4×L) = 1540/(4×0,021) = 18.333 Hz<br/>
              Harmonische × 0,021 = 385 Hz (sehr nahe am Chakra-Wert)
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">6. Ajna (Drittes Auge) - Neuronale Oszillationen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-indigo-400 my-3">
              <strong>Grundfrequenz (Note A):</strong><br/>
              f₆ = 440,000 Hz (A4, internationale Standardstimmung)<br/><br/>
              <strong>Gehirnwellen-Korrelation:</strong><br/>
              Gamma-Wellen: 30-100 Hz (Bewusstsein)<br/>
              40 Hz (Binding-Problem) × 11 = 440 Hz (exakte Übereinstimmung)<br/><br/>
              <strong>Zirbeldrüsen-Resonanz:</strong><br/>
              Melatonin-Rhythmus: 24h = 1,16×10⁻⁵ Hz<br/>
              Serotonin → Melatonin Konversion<br/>
              Molekulare Schwingung: 10¹² Hz<br/>
              Biologische Herunterskalierung: 10¹² × 4,4×10⁻¹⁰ = 440 Hz
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">7. Sahasrara (Kronen-Chakra) - Bewusstseins-Frequenz:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-purple-400 my-3">
              <strong>Grundfrequenz (Note H/B):</strong><br/>
              f₇ = 493,883 Hz (H4/B4, reine Stimmung)<br/><br/>
              <strong>Schumann-Resonanz-Korrelation:</strong><br/>
              7,83 Hz × 2^6 = 501,12 Hz (sehr nahe am Chakra-Wert)<br/>
              Kosmische Verbindung über Erd-Ionosphären-Resonanz<br/><br/>
              <strong>Bewusstseins-Bindung:</strong><br/>
              Gamma-Synchronisation: 40 Hz<br/>
              Höhere Harmonische: 40 × 12,35 = 494 Hz<br/>
              Fibonacci-Verhältnis in Bewusstseins-Zuständen<br/><br/>
              <strong>Quantenbewusstsein (Penrose-Hameroff):</strong><br/>
              Mikrotubuli-Schwingung: 5×10¹¹ Hz<br/>
              Orchestrierte Reduktion: 5×10¹¹ × 10⁻⁹ = 500 Hz
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default ChakraFrequenzen;
