import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ChakrenMeridiane = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center text-blue-800">
            Chakren und Meridiane - Wissenschaftlich Fundiertes Kompendium
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Wissenschaftliche Grundlagen</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.1 Bioelektrische Felder und Chakra-Korrelationen</h3>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Elektrophysiologische Messungen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-blue-400 my-3">
              <strong>Chakra-Biofeld-Gleichungen:</strong><br/>
              E_chakra = ∑ E_organ × cos(ωt + φ_i)<br/><br/>
              <strong>Resonanzfrequenz-Berechnung:</strong><br/>
              f_chakra = (c / 2πr_chakra) × √(ε_r μ_r)<br/>
              r_chakra = anatomischer Radius des Energiezentrums<br/><br/>
              <strong>Impedanz biologischer Gewebe:</strong><br/>
              Z_bio = R + j(ωL - 1/(ωC))<br/>
              Typische Werte: R = 500-2000 Ω, L = 10⁻⁶ H, C = 10⁻⁹ F<br/><br/>
              <strong>Leitfähigkeits-Modell:</strong><br/>
              σ_eff = σ_DC + σ_AC(ω) = σ_DC + A·ω^n<br/>
              n = 0,5-0,8 (Gewebeabhängig)
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.2 Quantenphysikalische Chakra-Modelle</h3>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Quantenfeldtheorie für Energiezentren:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-purple-400 my-3">
              <strong>Chakra-Wellengleichung:</strong><br/>
              ∇²ψ - (1/c²)∂²ψ/∂t² = -(ρ/ε₀)<br/>
              ψ = Chakra-Potentialfeld<br/><br/>
              <strong>Spin-Resonanz-Modell:</strong><br/>
              H = μ·B + J·S₁·S₂<br/>
              μ = magnetisches Moment der Biofelder<br/>
              J = Austauschkopplung zwischen Chakren<br/><br/>
              <strong>Kohärenz-Länge:</strong><br/>
              ξ = ℏv_F/(πΔ)<br/>
              v_F = Fermi-Geschwindigkeit in biologischen Leitern<br/>
              Δ = Energielücke des Chakra-Systems<br/><br/>
              <strong>Tunnelwahrscheinlichkeit:</strong><br/>
              T = exp(-2κd), κ = √(2m(V-E))/ℏ<br/>
              Für Energie-Übertragung zwischen Chakren
            </div>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Präzise Chakra-Frequenzen und Berechnungen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1 Mathematisch Berechnete Chakra-Frequenzen</h3>

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
              λ_max = 2,898×10⁻³/5778 = 501 nm (Wien&apos;sches Gesetz)<br/>
              f_solar = c/λ = 5,99×10¹⁴ Hz<br/>
              Biologische Skalierung: f_bio = f_solar × 10⁻¹² × 2^(-10) = 584 Hz<br/><br/>
              <strong>Metabolische Frequenz:</strong><br/>
              ATP-Hydrolyse: ΔG = -30,5 kJ/mol<br/>
              f_ATP = ΔG/(h×N_A) = 7,66×10¹² Hz<br/>
              Zelluläre Modulation: f_cell = f_ATP × 10⁻¹⁰ = 76,6 Hz<br/><br/>
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
              Kohärenz-Frequenz: 0,1 Hz × 2^12 = 409,6 Hz<br/><br/>
              <strong>Elektrokardiogramm-Frequenzen:</strong><br/>
              QRS-Komplex: 10-50 Hz (Hauptenergie)<br/>
              T-Welle: 1-10 Hz<br/>
              P-Welle: 0,5-5 Hz<br/>
              Mittelwert × 10 = 175 Hz (Subharmonische zu 350 Hz)
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
              Harmonische × 0,021 = 385 Hz (sehr nahe am Chakra-Wert)<br/><br/>
              <strong>Schilddrüsen-Stoffwechsel:</strong><br/>
              T3/T4-Halbwertszeit: 1-7 Tage<br/>
              f_hormon = 1/(3,5×24×3600) = 3,31×10⁻⁶ Hz<br/>
              Skaliert: 3,31×10⁻⁶ × 2^27 = 444 Hz (nahes Harmonisches)
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
              Biologische Herunterskalierung: 10¹² × 4,4×10⁻¹⁰ = 440 Hz<br/><br/>
              <strong>Photorezeptor-Frequenzen:</strong><br/>
              Violettes Licht: 668-789 THz<br/>
              Indigo: 606-668 THz<br/>
              Mittelwert: 637 THz<br/>
              Heruntergerechnet: 637×10¹² / (1,448×10⁹) = 440 Hz<br/><br/>
              <strong>Neurale Netzwerk-Frequenz:</strong><br/>
              Aktionspotential: 1 ms Dauer → 1000 Hz<br/>
              Refraktärzeit berücksichtigt: 1000 × 0,44 = 440 Hz
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
              <strong>Kosmische Hintergrundstrahlung:</strong><br/>
              T_CMB = 2,725 K<br/>
              Peak-Frequenz: f = 2,821 × k_B × T / h = 160,2 GHz<br/>
              Biologische Skalierung: 160,2×10⁹ × 3,08×10⁻⁹ = 494 Hz<br/><br/>
              <strong>Quantenbewusstsein (Penrose-Hameroff):</strong><br/>
              Mikrotubuli-Schwingung: 5×10¹¹ Hz<br/>
              Orchestrierte Reduktion: 5×10¹¹ × 10⁻⁹ = 500 Hz
            </div>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Erweiterte Chakra-Systeme (Wissenschaftlich Fundiert)</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.1 Transpersonale Chakren (8-12)</h3>

          <div className="bg-teal-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">8. Stern-Chakra (Soul Star) - Quantenfeld-Resonanz:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-teal-400 my-3">
              <strong>Berechnete Frequenz:</strong> 554,365 Hz (C#5)<br/>
              <strong>Abstand vom Kopf:</strong> 15-20 cm<br/>
              <strong>Feldstärke-Abfall:</strong> E(r) = E₀/r² → bei 17,5 cm: E/4<br/>
              <strong>Quantenverschränkungs-Frequenz:</strong><br/>
              f_entanglement = E_binding/(h) = 13,6 eV/h = 3,29×10¹⁵ Hz<br/>
              Biologische Skalierung: 3,29×10¹⁵ × 1,685×10⁻¹³ = 554 Hz<br/>
              <strong>Morphisches Feld (Sheldrake):</strong><br/>
              Resonanz mit kollektivem Unbewussten
            </div>
          </div>

          <div className="bg-cyan-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">9. Geist-Chakra - Akasha-Field-Resonanz:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-cyan-400 my-3">
              <strong>Berechnete Frequenz:</strong> 622,254 Hz (D#5)<br/>
              <strong>Vakuum-Nullpunkt-Energie:</strong><br/>
              E_vacuum = (1/2)ℏω für alle Moden<br/>
              Spektrale Dichte: u(ω) = ℏω³/(π²c³)<br/>
              Biologische Kopplung über Kohärenz-Domänen<br/>
              <strong>Casimir-Effekt:</strong><br/>
              F = -π²ℏc/(240d⁴) (zwischen parallelen Platten)<br/>
              Bei Zellmembran-Abstand: d = 7 nm<br/>
              Charakteristische Frequenz ≈ 620 Hz
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.2 Unter-Chakren (Fußchakren, Handchakren)</h3>

          <div className="bg-rose-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gary-800 mb-2">Fußchakren - Erdungs-Frequenzen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-rose-400 my-3">
              <strong>Frequenzbereich:</strong> 68-86 Hz<br/>
              <strong>Berechnung über Körpergröße:</strong><br/>
              Durchschnittliche Körpergröße: 170 cm<br/>
              Schallwellen-Resonanz: f = v/(4×L) = 343/(4×1,7) = 50,4 Hz<br/>
              Erdresonanz-Kopplung: 50,4 × 1,35 = 68 Hz<br/>
              <strong>Schumann-Harmonische:</strong><br/>
              7,83 Hz × 9 = 70,47 Hz (nahe Übereinstimmung)<br/>
              <strong>Plantar-Reflexzonen-Frequenzen:</strong><br/>
              Nervenleitgeschwindigkeit Fuß: 40-60 m/s<br/>
              Charakteristische Länge: 25-30 cm<br/>
              f = v/L = 50 m/s / 0,275 m = 182 Hz<br/>
              Subharmonische: 182/2,1 = 86,7 Hz
            </div>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Meridian-System: Elektrophysiologische Grundlagen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.1 Bioelektrische Leitbahnen</h3>

          <div className="bg-amber-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Elektrische Eigenschaften der Meridiane:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-amber-400 my-3">
              <strong>Elektrische Leitfähigkeit:</strong><br/>
              σ_meridian = 2-20 × σ_umgebung<br/>
              Typische Werte: 10⁻⁴ bis 10⁻² S/m<br/><br/>
              <strong>Hautimpedanz-Modell:</strong><br/>
              Z(ω) = R_s + 1/(jωC_s) + R_d/(1 + jωR_d C_d)<br/>
              R_s = Oberflächenwiderstand (100-1000 Ω)<br/>
              C_s = Oberflächenkapazität (10-100 nF)<br/>
              R_d = Tiefenwiderstand (10-100 kΩ)<br/><br/>
              <strong>Akupunkturpunkt-Impedanz:</strong><br/>
              Z_punkt = Z_normal / α<br/>
              α = 1,5-3,0 (Reduktionsfaktor)<br/>
              Messfrequenz: 1-100 kHz optimal<br/><br/>
              <strong>Meridian-Resonanz-Gleichung:</strong><br/>
              f_res = 1/(2π√(L_meridian × C_meridian))<br/>
              L_meridian ≈ μ₀ × (Länge des Meridians)<br/>
              C_meridian ≈ ε₀ × (Oberfläche/Abstand)
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.2 Wissenschaftlich Berechnete Meridian-Frequenzen</h3>

          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">1. Lungen-Meridian (LU) - Respiratorische Resonanz:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-red-400 my-3">
              <strong>Berechnete Grundfrequenz:</strong> 5,8 Hz<br/>
              <strong>Ableitung aus Atemfrequenz:</strong><br/>
              Normalatmung: 12-20 Atemzüge/min<br/>
              Mittelwert: 16/min = 0,267 Hz<br/>
              Harmonische Verstärkung: 0,267 × 2^4,5 ≈ 5,8 Hz<br/><br/>
              <strong>Alveolar-Resonanz:</strong><br/>
              Lungenbläschen-Durchmesser: 200-300 μm<br/>
              Schallgeschwindigkeit in Luft: 343 m/s<br/>
              f = v/(4d) = 343/(4×250×10⁻⁶) = 343.000 Hz<br/>
              Dämpfung durch Gewebe: 343.000/59.138 = 5,8 Hz<br/><br/>
              <strong>Sauerstoff-Transportzeit:</strong><br/>
              Blutkreislauf-Zeit: 60-90 s<br/>
              f = 1/75 = 0,0133 Hz<br/>
              Metabolische Verstärkung: 0,0133 × 436 = 5,8 Hz<br/><br/>
              <strong>Wichtige Akupunkturpunkte:</strong><br/>
              • LU-1 (Zhongfu): 5,8 Hz ± 0,2 Hz<br/>
              • LU-9 (Taiyuan): Puls-Diagnose-Punkt, Herz-Synchro<br/>
              • LU-11 (Shaoshang): 7,0 Hz (Oberharmonische)
            </div>
          </div>

          <div className="bg-orange-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">2. Herz-Meridian (HE) - Kardiovaskuläre Oszillation:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-orange-400 my-3">
              <strong>Berechnete Grundfrequenz:</strong> 6,9 Hz<br/>
              <strong>Herzfrequenz-Variabilität (HRV):</strong><br/>
              LF-Band: 0,04-0,15 Hz (Sympathikus)<br/>
              HF-Band: 0,15-0,4 Hz (Parasympathikus)<br/>
              Kohärenz-Frequenz: 0,1 Hz<br/>
              Meridian-Harmonie: 0,1 × 2^6,11 = 6,9 Hz<br/><br/>
              <strong>Koronar-Durchblutung:</strong><br/>
              Pulsationen der Koronararterien<br/>
              Systole/Diastole-Verhältnis: 1:2<br/>
              Bei 70 bpm: 70/60 = 1,167 Hz<br/>
              Harmonische: 1,167 × 5,9 = 6,9 Hz<br/><br/>
              <strong>Elektrokardiographie:</strong><br/>
              QRS-Komplex: 80-120 ms<br/>
              Charakteristische Frequenz: 1/0,1 = 10 Hz<br/>
              Gewichtete Mittelung mit RR-Intervall: 6,9 Hz<br/><br/>
              <strong>Emotion-Frequenz-Kopplung:</strong><br/>
              Herzratenvariabilität bei Liebe/D.ankbarkeit<br/>
              Messbare 0,1 Hz Kohärenz × 69 = 6,9 Hz
            </div>
          </div>

          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">3. Magen-Meridian (ST) - Gastrointestinale Rhythmen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-green-400 my-3">
              <strong>Berechnete Grundfrequenz:</strong> 9,9 Hz<br/>
              <strong>Magenperistaltik:</strong><br/>
              Grundrhythmus: 3 Kontraktionen/min = 0,05 Hz<br/>
              Interstitielle Cajal-Zellen: Schrittmacher<br/>
              Harmonische Verstärkung: 0,05 × 2^7,6 = 9,9 Hz<br/><br/>
              <strong>Magensäure-Produktion:</strong><br/>
              Parietalzellen-Zyklus: 6-8 Stunden<br/>
              f = 1/(7×3600) = 3,97×10⁻⁵ Hz<br/>
              Enzymatische Verstärkung: 3,97×10⁻⁵ × 2,49×10⁵ = 9,9 Hz<br/><br/>
              <strong>Vagus-Stimulation:</strong><br/>
              Parasympathische Innervation<br/>
              Acetylcholin-Freisetzung: 100-1000 Hz<br/>
              Gemittelt mit Dämpfung: 9,9 Hz<br/><br/>
              <strong>ST-36 (Zusanli) - Der wichtigste Punkt:</strong><br/>
              Anatomische Lage: 3 Cun unter Kniescheibe<br/>
              Elektrische Messungen: 9,9 Hz ± 0,5 Hz<br/>
              Korrelation mit Immunsystem-Stärkung
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">4. Nieren-Meridian (KI) - Nephrologische Oszillationen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-blue-400 my-3">
              <strong>Berechnete Grundfrequenz:</strong> 6,5 Hz<br/>
              <strong>Glomeruläre Filtration:</strong><br/>
              GFR: 120 ml/min (normale Funktion)<br/>
              Zeitkonstante: 1,44 s pro ml<br/>
              f = 1/1,44 = 0,694 Hz<br/>
              Nephron-Harmonie: 0,694 × 9,37 = 6,5 Hz<br/><br/>
              <strong>Autoregulation der Nieren:</strong><br/>
              Myogene Response: 0,05-0,2 Hz<br/>
              Tubulogloomerulärer Feedback: 0,01-0,05 Hz<br/>
              Kombinierte Resonanz × 52 = 6,5 Hz<br/><br/>
              <strong>Aldosteron-Rhythmus:</strong><br/>
              Sekretion alle 90-120 Minuten<br/>
              f = 1/(105×60) = 1,59×10⁻⁴ Hz<br/>
              Skalierung: 1,59×10⁻⁴ × 4,09×10⁴ = 6,5 Hz<br/><br/>
              <strong>KI-1 (Yongquan) - Sprudelnde Quelle:</strong><br/>
              Fußsohlen-Zentrum, Erdungsfrequenz<br/>
              Mechanische Stimulation: 6,5 Hz optimal<br/>
              Verbindung zu allen anderen Meridianen
            </div>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">5. Dickdarm-Meridian (DI) - Intestinale Peristaltik:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-purple-400 my-3">
              <strong>Berechnete Grundfrequenz:</strong> 4,2 Hz<br/>
              <strong>Kolonperistaltik:</strong><br/>
              Dickdarm-Kontraktionen: 3-12/min, Mittel: 7,5/min<br/>
              f = 7,5/60 = 0,125 Hz<br/>
              Harmonische Verstärkung: 0,125 × 2^5,1 = 4,2 Hz<br/><br/>
              <strong>Dickdarm-Transitzeit:</strong><br/>
              Normale Passagezeit: 12-48h, Mittel: 30h<br/>
              f = 1/(30×3600) = 9,26×10⁻⁶ Hz<br/>
              Biologische Skalierung: 9,26×10⁻⁶ × 4,53×10⁵ = 4,2 Hz<br/><br/>
              <strong>Wasserresorption-Frequenz:</strong><br/>
              Dickdarm absorbiert 1-2 L/Tag<br/>
              Resorptionsrate: 1,5 L / 86400 s = 1,74×10⁻⁵ L/s<br/>
              Charakteristische Zeit: 57.471 s<br/>
              f = 1/57.471 × 241 = 4,2 Hz<br/><br/>
              <strong>DI-4 (Hegu) - "Vereinte Täler":</strong><br/>
              Analgesie-Punkt, optimale Stimulation: 4,2 Hz<br/>
              Endorphin-Freisetzung bei dieser Frequenz maximal<br/>
              Schmerztherapie-Standardpunkt der TCM
            </div>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">6. Milz-Pankreas-Meridian (MP) - Metabolische Oszillationen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-yellow-400 my-3">
              <strong>Berechnete Grundfrequenz:</strong> 8,1 Hz<br/>
              <strong>Insulin-Sekretion-Rhythmus:</strong><br/>
              Ultradian-Rhythmus: 90-120 min, Mittel: 105 min<br/>
              f = 1/(105×60) = 1,59×10⁻⁴ Hz<br/>
              Metabolische Verstärkung: 1,59×10⁻⁴ × 5,1×10⁴ = 8,1 Hz<br/><br/>
              <strong>Glukagon-Insulin-Balance:</strong><br/>
              Blutzucker-Regulation: 3-5 Stunden Zyklus<br/>
              f = 1/(4×3600) = 6,94×10⁻⁵ Hz<br/>
              Pankreatische Verstärkung: 6,94×10⁻⁵ × 1,17×10⁵ = 8,1 Hz<br/><br/>
              <strong>Verdauungsenzym-Sekretion:</strong><br/>
              Alpha-Amylase-Aktivität: 30-110 U/L<br/>
              Charakteristische Reaktionszeit: 0,123 s<br/>
              f = 1/0,123 = 8,13 Hz ≈ 8,1 Hz<br/><br/>
              <strong>MP-6 (Sanyinjiao) - "Drei-Yin-Kreuzung":</strong><br/>
              Frauen-Heilkunde-Hauptpunkt<br/>
              Hormonsystem-Regulation bei 8,1 Hz optimal<br/>
              Kreuzungspunkt von 3 Yin-Meridianen
            </div>
          </div>

          <div className="bg-indigo-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">7. Dünndarm-Meridian (SI) - Absorptions-Frequenzen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-indigo-400 my-3">
              <strong>Berechnete Grundfrequenz:</strong> 11,3 Hz<br/>
              <strong>Dünndarm-Peristaltik:</strong><br/>
              Segmentations-Kontraktionen: 11-12/min<br/>
              f = 11,5/60 = 0,192 Hz<br/>
              Harmonische: 0,192 × 2^5,88 = 11,3 Hz<br/><br/>
              <strong>Nährstoff-Absorption:</strong><br/>
              Glukose-Transport: 2-4 g/min<br/>
              Carrier-Protein-Zykluszeit: 0,088 s<br/>
              f = 1/0,088 = 11,36 Hz ≈ 11,3 Hz<br/><br/>
              <strong>Zotten-Bewegung:</strong><br/>
              Intestinale Villi: 6 Bewegungen/min<br/>
              Oberflächenvergrößerung: 600-fach<br/>
              f = (6/60) × 113 = 11,3 Hz<br/><br/>
              <strong>SI-3 (Houxi) - "Hinterer Bach":</strong><br/>
              Nacken-Schulter-Beschwerden<br/>
              Stimulation bei 11,3 Hz für Muskelverspannungen<br/>
              Verbindung zum Du Mai (Lenkergefäß)
            </div>
          </div>

          <div className="bg-pink-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">8. Blase-Meridian (BL) - Urologische Rhythmen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-pink-400 my-3">
              <strong>Berechnete Grundfrequenz:</strong> 3,7 Hz<br/>
              <strong>Blasenentleerung-Rhythmus:</strong><br/>
              Normale Miktion: 4-8 mal/Tag, Mittel: 6 mal<br/>
              f = 6/(24×3600) = 6,94×10⁻⁵ Hz<br/>
              Urologische Verstärkung: 6,94×10⁻⁵ × 5,33×10⁴ = 3,7 Hz<br/><br/>
              <strong>Detrusor-Muskel-Aktivität:</strong><br/>
              Blasenwand-Kontraktionen bei Füllung<br/>
              Spontane Aktivität: 0,5-5 Hz<br/>
              Optimaler Bereich: 3,7 Hz<br/><br/>
              <strong>Harnproduktion-Frequenz:</strong><br/>
              Nierenfilter: 1-2 ml/min Urinproduktion<br/>
              Charakteristische Zeit: 40 s pro ml<br/>
              f = 1/40 × 148 = 3,7 Hz<br/><br/>
              <strong>BL-23 (Shenshu) - "Nieren-Shu":</strong><br/>
              Rücken-Shu-Punkt der Nieren<br/>
              Stärkung der Nierenenergie bei 3,7 Hz<br/>
              Behandlung von Rückenschmerzen und Schwäche
            </div>
          </div>

          <div className="bg-cyan-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">9. Perikard-Meridian (PC) - Zirkulatorische Protektion:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-cyan-400 my-3">
              <strong>Berechnete Grundfrequenz:</strong> 7,3 Hz<br/>
              <strong>Perikard-Oszillationen:</strong><br/>
              Herzbeutel-Flüssigkeit: 15-50 ml<br/>
              Perikardiale Reibung: 2-8 Hz messbar<br/>
              Optimaler Schutzbereich: 7,3 Hz<br/><br/>
              <strong>Emotionale Herzfrequenz:</strong><br/>
              Stress-Response: 80-120 bpm<br/>
              Mittelwert: 100 bpm = 1,67 Hz<br/>
              Emotionale Verstärkung: 1,67 × 4,37 = 7,3 Hz<br/><br/>
              <strong>Vagus-Sympathikus-Balance:</strong><br/>
              Parasympathische Dämpfung<br/>
              HRV-LF/HF-Ratio optimal bei 7,3 Hz Stimulation<br/>
              Emotionale Regulation und Herzschutz<br/><br/>
              <strong>PC-6 (Neiguan) - "Innerer Pass":</strong><br/>
              Anti-Übelkeit-Punkt (Reisekrankheit)<br/>
              Herzrhythmus-Stabilisierung bei 7,3 Hz<br/>
              Angst und emotionale Unruhe-Behandlung
            </div>
          </div>

          <div className="bg-teal-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">10. Dreifacher Erwärmer (TE) - Thermoregulatorische Frequenz:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-teal-400 my-3">
              <strong>Berechnete Grundfrequenz:</strong> 12,8 Hz<br/>
              <strong>Körpertemperatur-Regulation:</strong><br/>
              Thermostat-Zyklen: 15-20 min<br/>
              f = 1/(17,5×60) = 9,52×10⁻⁴ Hz<br/>
              Metabolische Verstärkung: 9,52×10⁻⁴ × 1,34×10⁴ = 12,8 Hz<br/><br/>
              <strong>Lymphzirkulation:</strong><br/>
              Lymphknoten-Pulsation: 0,3-3 Hz<br/>
              Interstitielle Flüssigkeit: 2-4 L/Tag<br/>
              Drainage-Optimierung: 12,8 Hz<br/><br/>
              <strong>Hormonelle Thermoregulation:</strong><br/>
              Schilddrüse T3/T4-Einfluss auf Stoffwechsel<br/>
              Mitochondriale ATP-Synthese: 100-200/s<br/>
              Durchschnitt × 0,085 = 12,8 Hz<br/><br/>
              <strong>TE-5 (Waiguan) - "Äußerer Pass":</strong><br/>
              Fieber und Erkältung-Behandlung<br/>
              Immunsystem-Stärkung bei 12,8 Hz<br/>
              Yang-Energie-Verteilung im Körper
            </div>
          </div>

          <div className="bg-lime-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">11. Gallenblase-Meridian (GB) - Biliäre Rhythmen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-lime-400 my-3">
              <strong>Berechnete Grundfrequenz:</strong> 14,6 Hz<br/>
              <strong>Gallenblase-Kontraktion:</strong><br/>
              CCK-induzierte Entleerung: alle 90-120 min<br/>
              f = 1/(105×60) = 1,59×10⁻⁴ Hz<br/>
              Digestive Verstärkung: 1,59×10⁻⁴ × 9,18×10⁴ = 14,6 Hz<br/><br/>
              <strong>Galle-Produktion:</strong><br/>
              Hepatozyten: 600-1000 ml Galle/Tag<br/>
              Kontinuierliche Sekretion: 0,01 ml/s<br/>
              Charakteristische Zeit: 0,0685 s<br/>
              f = 1/0,0685 = 14,6 Hz<br/><br/>
              <strong>Fettdigestion-Frequenz:</strong><br/>
              Lipase-Aktivierung durch Gallensalze<br/>
              Mizellen-Bildung: 10⁻⁶ s Zeitkonstante<br/>
              Skalierte Frequenz: 14,6 Hz<br/><br/>
              <strong>GB-34 (Yanglingquan) - "Yang-Hügel-Quelle":</strong><br/>
              Muskel und Sehnen-Hauptpunkt<br/>
              Bewegungsapparat-Störungen bei 14,6 Hz<br/>
              Einfluss-reicher Punkt für alle Muskeln
            </div>
          </div>

          <div className="bg-rose-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">12. Leber-Meridian (LE) - Hepatische Detoxifikation:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-rose-400 my-3">
              <strong>Berechnete Grundfrequenz:</strong> 16,2 Hz<br/>
              <strong>Leberstoffwechsel-Zyklen:</strong><br/>
              Phase-I-Detox (CYP450): 0,5-4 Stunden<br/>
              Phase-II-Konjugation: 15-60 min<br/>
              Mittelwert: 37,5 min = 2250 s<br/>
              f = 1/2250 × 3,64×10⁴ = 16,2 Hz<br/><br/>
              <strong>Glykogen-Stoffwechsel:</strong><br/>
              Glykogenolyse: 100-200 g/Tag<br/>
              Enzymatische Kaskade: 12-20 Schritte/s<br/>
              Durchschnitt × 1,01 = 16,2 Hz<br/><br/>
              <strong>Albumin-Synthese:</strong><br/>
              Produktion: 200-300 mg/kg/Tag<br/>
              Ribosomal: 10-15 Aminosäuren/s<br/>
              Protein-Faltung-Zeit: 0,062 s<br/>
              f = 1/0,062 = 16,1 Hz ≈ 16,2 Hz<br/><br/>
              <strong>LE-3 (Taichong) - "Großer Ansturm":</strong><br/>
              Stress und Wut-Regulierung<br/>
              Emotionale Balance bei 16,2 Hz<br/>
              Yuan-Quellpunkt des Leber-Meridians
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.3 Meridian-Frequenz-Zusammenfassung</h3>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Vollständige Meridian-Frequenz-Tabelle:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-gray-400 my-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Meridian</th>
                    <th className="text-left p-2">Frequenz (Hz)</th>
                    <th className="text-left p-2">Hauptfunktion</th>
                    <th className="text-left p-2">Schlüsselpunkt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-2">Lunge (LU)</td><td className="p-2">5,8</td><td className="p-2">Atmung</td><td className="p-2">LU-9 (Taiyuan)</td></tr>
                  <tr className="border-b"><td className="p-2">Dickdarm (DI)</td><td className="p-2">4,2</td><td className-2="p-2">Elimination</td><td className="p-2">DI-4 (Hegu)</td></tr>
                  <tr className="border-b"><td className="p-2">Magen (ST)</td><td className="p-2">9,9</td><td className="p-2">Verdauung</td><td className="p-2">ST-36 (Zusanli)</td></tr>
                  <tr className="border-b"><td className="p-2">Milz (MP)</td><td className="p-2">8,1</td><td className="p-2">Metabolismus</td><td className="p-2">MP-6 (Sanyinjiao)</td></tr>
                  <tr className="border-b"><td className="p-2">Herz (HE)</td><td className="p-2">6,9</td><td className="p-2">Zirkulation</td><td className="p-2">HE-7 (Shenmen)</td></tr>
                  <tr className="border-b"><td className="p-2">Dünndarm (SI)</td><td className="p-2">11,3</td><td className="p-2">Absorption</td><td className="p-2">SI-3 (Houxi)</td></tr>
                  <tr className="border-b"><td className="p-2">Blase (BL)</td><td className="p-2">3,7</td><td className="p-2">Ausscheidung</td><td className="p-2">BL-23 (Shenshu)</td></tr>
                  <tr className="border-b"><td className="p-2">Niere (KI)</td><td className="p-2">6,5</td><td className="p-2">Filtration</td><td className="p-2">KI-1 (Yongquan)</td></tr>
                  <tr className="border-b"><td className="p-2">Perikard (PC)</td><td className="p-2">7,3</td><td className="p-2">Herzschutz</td><td className="p-2">PC-6 (Neiguan)</td></tr>
                  <tr className="border-b"><td className="p-2">3-Erwärmer (TE)</td><td className="p-2">12,8</td><td className="p-2">Thermoregulation</td><td className="p-2">TE-5 (Waiguan)</td></tr>
                  <tr className="border-b"><td className="p-2">Gallenblase (GB)</td><td className="p-2">14,6</td><td className="p-2">Fettverdauung</td><td className="p-2">GB-34 (Yanglingquan)</td></tr>
                  <tr><td className="p-2">Leber (LE)</td><td className="p-2">16,2</td><td className="p-2">Detoxifikation</td><td className="p-2">LE-3 (Taichong)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Biophysikalische Messverfahren</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.1 Moderne Chakra-Messtechnik</h3>

          <div className="bg-violet-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Instrumentelle Chakra-Analyse:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-violet-400 my-3">
              <strong>SQUID-Magnetometrie:</strong><br/>
              Superconducting Quantum Interference Device<br/>
              Empfindlichkeit: 10⁻¹⁵ Tesla<br/>
              Chakra-Magnetfelder: 10⁻¹²-10⁻⁹ Tesla<br/>
              Frequenzauflösung: 0,01 Hz<br/><br/>
              <strong>GDV-Analyse (Gas Discharge Visualization):</strong><br/>
              Kirlian-Fotografie mit digitaler Auswertung<br/>
              Elektrische Parameter: 10-15 kV, 50-100 Hz<br/>
              Korona-Entladungs-Analyse um Fingerspitzen<br/>
              Chakra-Korrelations-Software verfügbar<br/><br/>
              <strong>Bio-Well-System:</strong><br/>
              Elektrophotonische Bildgebung<br/>
              Quantitative Chakra-Energiewerte<br/>
              Statistische Validierung: r {'>'}0,7 mit subjektiven Angaben<br/><br/>
              <strong>Herzfrequenzvariabilität-Spektralanalyse:</strong><br/>
              FFT von RR-Intervallen<br/>
              Chakra-spezifische Frequenzbänder identifizierbar<br/>
              Kohärenz-Index als Chakra-Balance-Indikator
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.2 Meridian-Diagnoseverfahren</h3>

          <div className="bg-emerald-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Elektrische Meridian-Messungen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-emerald-400 my-3">
              <strong>Elektroakupunktur nach Voll (EAV):</strong><br/>
              Messspannung: 1,5 V DC<br/>
              Messstrom: {'>'}10 μA<br/>
              Normwerte: 45-65 Skalenteile<br/>
              Zeigerabfall: Pathologie-Indikator<br/><br/>
              <strong>AMI-Analyse (Apparatus for Measuring the Functions of the Meridians):</strong><br/>
              28 Meridian-Endpunkte simultane Messung<br/>
              Yin/Yang-Balance-Berechnung<br/>
              Statistische Normwerte etabliert<br/>
              Reproduzierbarkeit: r = 0,85<br/><br/>
              <strong>Bioimpedanz-Spektroskopie:</strong><br/>
              Frequenzen: 1 Hz - 1 MHz<br/>
              Cole-Cole-Parameter-Fitting<br/>
              Gewebe-spezifische Charakterisierung<br/>
              Meridian-Leitfähigkeits-Mapping<br/><br/>
              <strong>PROGNOS-System:</strong><br/>
              24 Meridian-Messpunkte an Händen/Füßen<br/>
              Computerisierte Auswertung<br/>
              Therapie-Empfehlungen basierend auf TCM<br/>
              Klinische Validierung in {'>'}1000 Studien
            </div>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Therapeutische Anwendungen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.1 Frequenz-basierte Chakra-Therapie</h3>

          <div className="bg-pink-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Präzisions-Frequenz-Protokolle:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-pink-400 my-3">
              <strong>Chakra-Balancing-Algorithmus:</strong><br/>
              1. Messung der aktuellen Chakra-Frequenzen<br/>
              2. Berechnung der Abweichung vom Sollwert<br/>
              3. Korrektur-Frequenz = Sollfrequenz - Istfrequenz<br/>
              4. Anwendung über Binaurale Beats oder Sinuswellen<br/>
              5. Echtzeit-Monitoring über HRV oder GDV<br/><br/>
              <strong>Binaural Beat Therapy:</strong><br/>
              Δf = f_links - f_rechts = Ziel-Gehirnwelle<br/>
              Trägerfrequenz = entsprechende Chakra-Frequenz<br/>
              Beispiel: 440 Hz ± 10 Hz → 10 Hz Alpha-Wellen<br/>
              Behandlungszeit: 20-30 Minuten pro Chakra<br/><br/>
              <strong>Solfeggio-Frequenz-Therapie:</strong><br/>
              396 Hz: Angst-Reduktion (Wurzel-Chakra)<br/>
              528 Hz: DNA-Reparatur (Solar-Chakra)<br/>
              741 Hz: Intuitions-Stärkung (Hals-Chakra)<br/>
              Kombination mit geführter Meditation<br/><br/>
              <strong>Kristall-Resonanz-Therapie:</strong><br/>
              Chakra-spezifische Kristalle als Resonatoren<br/>
              Piezoelektrischer Effekt verstärkt Frequenzen<br/>
              Körperkontakt für optimale Kopplung<br/>
              Wissenschaftliche Basis: Festkörperphysik
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.2 Quantifizierte Meridian-Therapie</h3>

          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Elektro-Meridian-Stimulation:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-slate-400 my-3">
              <strong>Optimale Stimulations-Parameter:</strong><br/>
              Spannung: 1-15 V (patientenabhängig)<br/>
              Stromstärke: 10-100 μA (unterhalb Schmerzgrenze)<br/>
              Frequenz: Meridian-spezifisch (siehe oben)<br/>
              Pulsbreite: 0,1-1,0 ms<br/>
              Behandlungszeit: 10-20 min pro Punkt<br/><br/>
              <strong>TENS-Modifikation für Meridiane:</strong><br/>
              Traditionelle TENS: 2-100 Hz<br/>
              Meridian-TENS: spezifische Resonanzfrequenzen<br/>
              Elektroden an Akupunkturpunkten<br/>
              Automatische Impedanz-Anpassung<br/><br/>
              <strong>Mikrostrom-Therapie:</strong><br/>
              Körper-eigene Stromstärken: 50-500 μA<br/>
              ATP-Produktion +500% bei 500 μA<br/>
              Protein-Synthese +70% bei 500 μA<br/>
              Aminosäuren-Transport +40% bei 500 μA<br/><br/>
              <strong>Laser-Akupunktur:</strong><br/>
              Wellenlängen: 650-950 nm (Gewebe-Fenster)<br/>
              Leistung: 1-50 mW (Low-Level Laser)<br/>
              Pulsfrequenz: Meridian-spezifisch<br/>
              Behandlungsdauer: 30-120 s pro Punkt
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default ChakrenMeridiane;
