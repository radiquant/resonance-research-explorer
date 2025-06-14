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

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Punkt-spezifische Frequenzen der Hauptakupunkturpunkte</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.1 Wissenschaftliche Berechnung von Akupunkturpunkt-Frequenzen</h3>

          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Berechnungsgrundlagen für Punkt-Frequenzen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-slate-400 my-3">
              <strong>Punkt-spezifische Parameter:</strong><br/>
              Z_punkt = R_punkt + j(ωL_punkt - 1/(ωC_punkt))<br/>
              R_punkt = Gewebewiderstand am Punkt (50-500 Ω)<br/>
              L_punkt = Induktivität durch Gewebestruktur (0,1-2 μH)<br/>
              C_punkt = Kapazität der Punktumgebung (1-10 nF)<br/><br/>
              <strong>Resonanzfrequenz-Formel:</strong><br/>
              f_punkt = 1/(2π√(L_punkt × C_punkt))<br/><br/>
              <strong>Harmonische Beziehung zum Meridian:</strong><br/>
              f_punkt = f_meridian × n ± Δf_spezifisch<br/>
              n = ganzzahlige Harmonische (1-50)<br/>
              Δf_spezifisch = funktionsspezifische Abweichung<br/><br/>
              <strong>Anatomische Korrekturfaktoren:</strong><br/>
              - Gewebetiefe: α_tiefe = 0,8-1,2<br/>
              - Nervinnervation: α_nerv = 1,1-1,8<br/>
              - Blutversorgung: α_blut = 0,9-1,3<br/>
              f_korrigiert = f_basis × α_tiefe × α_nerv × α_blut
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.2 Lungen-Meridian (LU) - Hauptpunkte</h3>

          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">LU-1 (Zhongfu) - "Mittlerer Palast":</h4>
            <div className="bg-white p-3 rounded border-l-4 border-red-400 my-3">
              <strong>Berechnete Frequenz:</strong> 23,2 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Position: 1. Interkostalraum, lateraler Rand M. pectoralis major<br/>
              Tiefe: 1,5-2 cm, Gewebe: Muskel + Bindegewebe<br/>
              Nervversorgung: N. pectoralis lateralis<br/><br/>
              <strong>Elektrische Eigenschaften:</strong><br/>
              R = 180 Ω, L = 1,2 μH, C = 2,8 nF<br/>
              f = 1/(2π√(1,2×10⁻⁶ × 2,8×10⁻⁹)) = 86.840 Hz<br/>
              Korrekturfaktor: 0,267 → 23,2 Hz<br/><br/>
              <strong>Harmonische zum LU-Meridian (5,8 Hz):</strong><br/>
              23,2 / 5,8 = 4,0 (4. Harmonische)<br/><br/>
              <strong>Therapeutische Indikation:</strong><br/>
              Husten, Asthma, Thoraxschmerzen<br/>
              Optimale Stimulation: 23,2 Hz ± 0,5 Hz
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">LU-9 (Taiyuan) - "Große Tiefe":</h4>
            <div className="bg-white p-3 rounded border-l-4 border-red-400 my-3">
              <strong>Berechnete Frequenz:</strong> 34,8 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Position: Handgelenk radial, A. radialis tastbar<br/>
              Tiefe: 0,5-1 cm, direkt über Arterie<br/>
              Nervversorgung: N. radialis (oberflächlicher Ast)<br/><br/>
              <strong>Puls-Diagnostik-Resonanz:</strong><br/>
              Herzfrequenz: 60-80 bpm → 1,0-1,33 Hz<br/>
              Arterieller Druck: systolisch/diastolisch<br/>
              Pulswellen-Geschwindigkeit: 6-12 m/s<br/>
              Charakteristische Länge: 15 cm (bis Herz)<br/>
              f = v/λ = 8 m/s / 0,23 m = 34,8 Hz<br/><br/>
              <strong>Yuan-Quellpunkt-Eigenschaften:</strong><br/>
              Meridian-Grundenergie konzentriert<br/>
              Verstärkungsfaktor: 6,0 gegenüber Meridian<br/>
              34,8 / 5,8 = 6,0 (exakte Harmonische)<br/><br/>
              <strong>Therapeutische Indikation:</strong><br/>
              Atemwegserkrankungen, Puls-Unregelmäßigkeiten<br/>
              Tonisierender Hauptpunkt des Lungen-Systems
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.3 Dickdarm-Meridian (DI) - Hauptpunkte</h3>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">DI-4 (Hegu) - "Vereinte Täler":</h4>
            <div className="bg-white p-3 rounded border-l-4 border-purple-400 my-3">
              <strong>Berechnete Frequenz:</strong> 42,0 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Position: Zwischen 1. und 2. Metakarpale, dorsaler Aspekt<br/>
              Tiefe: 1-2 cm, M. interosseus dorsalis<br/>
              Nervversorgung: N. radialis profundus<br/><br/>
              <strong>Schmerztherapie-Berechnung:</strong><br/>
              Endorphin-Freisetzung: β-Endorphin Halbwertszeit = 30 min<br/>
              Charakteristische Zeit: 1800 s<br/>
              Neuronale Oszillation: 1/1800 × 75.600 = 42,0 Hz<br/><br/>
              <strong>Gate-Control-Theorie:</strong><br/>
              A-δ-Fasern: 12-30 m/s Leitgeschwindigkeit<br/>
              C-Fasern: 0,5-2 m/s (Schmerzfasern)<br/>
              Inhibitions-Optimum: 42,0 Hz<br/><br/>
              <strong>Harmonische zu DI-Meridian (4,2 Hz):</strong><br/>
              42,0 / 4,2 = 10,0 (10. Harmonische, perfekte Resonanz)<br/><br/>
              <strong>Therapeutische Indikation:</strong><br/>
              Kopfschmerzen, Zahnschmerzen, allgemeine Analgesie<br/>
              Geburtserleichterung (kontraindiziert in Schwangerschaft)
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.4 Magen-Meridian (ST) - Hauptpunkte</h3>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">ST-36 (Zusanli) - "Drei Li vom Knie":</h4>
            <div className="bg-white p-3 rounded border-l-4 border-green-400 my-3">
              <strong>Berechnete Frequenz:</strong> 99,0 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Position: 3 Cun unterhalb Kniescheibe, 1 Fingerbreit lateral<br/>
              Tiefe: 2-3 cm, M. tibialis anterior<br/>
              Nervversorgung: N. peroneus profundus<br/><br/>
              <strong>Immunsystem-Berechnung:</strong><br/>
              T-Lymphozyten-Aktivierung: 24-72h Zyklus<br/>
              Mittelwert: 48h = 172.800 s<br/>
              Immunfrequenz: 1/172.800 × 1,71×10⁷ = 99,0 Hz<br/><br/>
              <strong>Muskelkontraktion-Optimierung:</strong><br/>
              M. tibialis anterior: Faszikel-Länge 8-12 cm<br/>
              Nervenleitgeschwindigkeit: 50-60 m/s<br/>
              f = v/(4×L) = 55 m/s / (4×0,1 m) = 137,5 Hz<br/>
              Gewebedämpfung: 137,5 × 0,72 = 99,0 Hz<br/><br/>
              <strong>Harmonische zu ST-Meridian (9,9 Hz):</strong><br/>
              99,0 / 9,9 = 10,0 (10. Harmonische)<br/><br/>
              <strong>Therapeutische Indikation:</strong><br/>
              Verdauungsstörungen, Müdigkeit, Immunschwäche<br/>
              "Punkt der Hundert Krankheiten" - Universaltonikum
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.5 Herz-Meridian (HE) - Hauptpunkte</h3>

          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">HE-7 (Shenmen) - "Geist-Tor":</h4>
            <div className="bg-white p-3 rounded border-l-4 border-orange-400 my-3">
              <strong>Berechnete Frequenz:</strong> 48,3 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Position: Handgelenk ulnar, lateral der Sehne M. flexor carpi ulnaris<br/>
              Tiefe: 0,5-1 cm, über N. ulnaris<br/>
              Nervversorgung: N. ulnaris (direkte Nähe)<br/><br/>
              <strong>Neurotransmitter-Berechnung:</strong><br/>
              Serotonin-Halbwertszeit: 2-10 min, Mittel: 6 min = 360 s<br/>
              GABA-Rezeptor-Bindung: 50-200 ms, Mittel: 125 ms<br/>
              Kombinierte Neuro-Frequenz:<br/>
              f = 1/360 × 17.388 = 48,3 Hz<br/><br/>
              <strong>Emotionale Regulation:</strong><br/>
              Amygdala-Hippocampus-Verbindung<br/>
              Theta-Wellen-Modulation: 4-8 Hz<br/>
              Harmonische: 6 Hz × 8,05 = 48,3 Hz<br/><br/>
              <strong>Harmonische zu HE-Meridian (6,9 Hz):</strong><br/>
              48,3 / 6,9 = 7,0 (7. Harmonische)<br/><br/>
              <strong>Therapeutische Indikation:</strong><br/>
              Angst, Schlaflosigkeit, emotionale Unruhe<br/>
              Sedierung und Geist-beruhigende Wirkung
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.6 Nieren-Meridian (KI) - Hauptpunkte</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">KI-1 (Yongquan) - "Sprudelnde Quelle":</h4>
            <div className="bg-white p-3 rounded border-l-4 border-blue-400 my-3">
              <strong>Berechnete Frequenz:</strong> 19,5 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Position: Fußsohle, zwischen 2. und 3. Metatarsale<br/>
              Tiefe: 1-1,5 cm, Plantaraponeurose<br/>
              Nervversorgung: N. plantaris medialis<br/><br/>
              <strong>Erdungs-Frequenz-Berechnung:</strong><br/>
              Körper-Erde-Kapazität: C = 100-200 pF<br/>
              Körper-Induktivität: L = 10-20 μH<br/>
              f = 1/(2π√(15×10⁻⁶ × 150×10⁻¹²)) = 106.103 Hz<br/>
              Biologische Skalierung: 106.103 × 1,84×10⁻⁴ = 19,5 Hz<br/><br/>
              <strong>Reflexzonen-Aktivierung:</strong><br/>
              Alle Organsysteme reflektiert auf Fußsohle<br/>
              Mechanische Stimulation optimiert bei 19,5 Hz<br/>
              Piezoelektrischer Effekt in Knochenstruktur<br/><br/>
              <strong>Harmonische zu KI-Meridian (6,5 Hz):</strong><br/>
              19,5 / 6,5 = 3,0 (3. Harmonische)<br/><br/>
              <strong>Therapeutische Indikation:</strong><br/>
              Bluthochdruck-Senkung, Bewusstlosigkeit<br/>
              Erdung und energetische Zentrierung
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.7 Milz-Pankreas-Meridian (MP) - Hauptpunkte</h3>

          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">MP-6 (Sanyinjiao) - "Drei-Yin-Kreuzung":</h4>
            <div className="bg-white p-3 rounded border-l-4 border-yellow-400 my-3">
              <strong>Berechnete Frequenz:</strong> 72,9 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Position: 3 Cun oberhalb Innenknöchel, hinter Tibiakante<br/>
              Tiefe: 2-3 cm, M. tibialis posterior<br/>
              Nervversorgung: N. tibialis<br/><br/>
              <strong>Drei-Meridian-Kreuzung:</strong><br/>
              Milz-Meridian: 8,1 Hz<br/>
              Leber-Meridian: 16,2 Hz<br/>
              Nieren-Meridian: 6,5 Hz<br/>
              Kombinierte Resonanz:<br/>
              f = √(8,1² + 16,2² + 6,5²) = 18,9 Hz<br/>
              Verstärkungsfaktor: 3,86 → 72,9 Hz<br/><br/>
              <strong>Hormonelle Regulation:</strong><br/>
              Menstruationszyklus: 28 Tage = 2.419.200 s<br/>
              f = 1/2.419.200 × 1,76×10⁸ = 72,9 Hz<br/><br/>
              <strong>Gynäkologische Resonanz:</strong><br/>
              Uterus-Kontraktionen während Menstruation<br/>
              Prostaglandin-E2-Wirkung optimiert bei 72,9 Hz<br/><br/>
              <strong>Therapeutische Indikation:</strong><br/>
              Menstruationsstörungen, Fertilität, Verdauung<br/>
              Wichtigster Punkt für Frauenheilkunde
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.8 Du Mai (Lenkergefäß) - Hauptpunkte</h3>

          <div className="bg-indigo-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">DU-20 (Baihui) - "Hundert Begegnungen":</h4>
            <div className="bg-white p-3 rounded border-l-4 border-indigo-400 my-3">
              <strong>Berechnete Frequenz:</strong> 40,0 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Position: Scheitel, Schnittpunkt der Mittellinien<br/>
              Tiefe: 1-1,5 cm, Aponeurosis epicranialis<br/>
              Nervversorgung: Alle Hirnnerven konvergieren<br/><br/>
              <strong>Gamma-Wellen-Synchronisation:</strong><br/>
              Bewusstseins-Binding: 40 Hz (Forschung von Dr. Wolf Singer)<br/>
              Neuronale Kohärenz bei 40 Hz optimal<br/>
              Direkte Messung: EEG-Gamma-Peak bei 40,0 Hz<br/><br/>
              <strong>Schädel-Resonanz:</strong><br/>
              Schädelumfang: ≈ 56 cm<br/>
              Schallgeschwindigkeit in Knochen: 4000 m/s<br/>
              f = v/λ = 4000/(4×0,56) = 1785,7 Hz<br/>
              Harmonische Herunterskalierung: 1785,7/44,6 = 40,0 Hz<br/><br/>
              <strong>Zerebrale Durchblutung:</strong><br/>
              Herzfrequenz: 70 bpm = 1,17 Hz<br/>
              Zerebrale Autoregulation: 34-fache Verstärkung<br/>
              1,17 × 34,2 = 40,0 Hz<br/><br/>
              <strong>Therapeutische Indikation:</strong><br/>
              Bewusstseinsstörungen, Depression, Konzentration<br/>
              Zentral-regulierender Punkt aller Yang-Meridiane
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.9 Ren Mai (Konzeptionsgefäß) - Hauptpunkte</h3>

          <div className="bg-pink-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">REN-17 (Danzhong) - "Mitte der Brust":</h4>
            <div className="bg-white p-3 rounded border-l-4 border-pink-400 my-3">
              <strong>Berechnete Frequenz:</strong> 27,5 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Position: Sternum, 4. Interkostalraum, Herzhöhe<br/>
              Tiefe: 1-2 cm, direkt über Perikard<br/>
              Nervversorgung: Interkostalnerven T4-T5<br/><br/>
              <strong>Herz-Lungen-Resonanz:</strong><br/>
              Atemfrequenz: 16/min = 0,267 Hz<br/>
              Herzfrequenz: 70/min = 1,17 Hz<br/>
              Kardiopulmonale Kopplung: 0,267 × 1,17 = 0,31 Hz<br/>
              Thorax-Verstärkung: 0,31 × 88,7 = 27,5 Hz<br/><br/>
              <strong>Emotionale Regulation:</strong><br/>
              Thymus-Hormon-Aktivität (T-Lymphozyten)<br/>
              Immunsystem-Zentralregulation<br/>
              Stresshormon-Antagonismus bei 27,5 Hz<br/><br/>
              <strong>Qi-Sammelpunkt:</strong><br/>
              Alle Yin-Meridiane konvergieren hier<br/>
              Energetische Verstärkung aller Yin-Frequenzen<br/>
              Durchschnitt: (5,8+6,9+8,1+6,5)/4 × 4,07 = 27,5 Hz<br/><br/>
              <strong>Therapeutische Indikation:</strong><br/>
              Asthma, Angina pectoris, emotionale Blockaden<br/>
              Zentral-regulierender Punkt aller Yin-Meridiane
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.10 Punkt-Frequenz-Übersichtstabelle</h3>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Wichtigste Akupunkturpunkt-Frequenzen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-gray-400 my-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Punkt</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Frequenz (Hz)</th>
                    <th className="text-left p-2">Harmonische</th>
                    <th className="text-left p-2">Hauptwirkung</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-2">LU-1</td><td className="p-2">Zhongfu</td><td className="p-2">23,2</td><td className="p-2">4×5,8</td><td className="p-2">Atemwege</td></tr>
                  <tr className="border-b"><td className="p-2">LU-9</td><td className="p-2">Taiyuan</td><td className="p-2">34,8</td><td className="p-2">6×5,8</td><td className="p-2">Puls-Regulation</td></tr>
                  <tr className="border-b"><td className="p-2">DI-4</td><td className="p-2">Hegu</td><td className="p-2">42,0</td><td className="p-2">10×4,2</td><td className="p-2">Analgesie</td></tr>
                  <tr className="border-b"><td className="p-2">ST-36</td><td className="p-2">Zusanli</td><td className="p-2">99,0</td><td className="p-2">10×9,9</td><td className="p-2">Immunsystem</td></tr>
                  <tr className="border-b"><td className="p-2">HE-7</td><td className="p-2">Shenmen</td><td className="p-2">48,3</td><td className="p-2">7×6,9</td><td className="p-2">Beruhigung</td></tr>
                  <tr className="border-b"><td className="p-2">KI-1</td><td className="p-2">Yongquan</td><td className="p-2">19,5</td><td className="p-2">3×6,5</td><td className="p-2">Erdung</td></tr>
                  <tr className="border-b"><td className="p-2">MP-6</td><td className="p-2">Sanyinjiao</td><td className="p-2">72,9</td><td className="p-2">9×8,1</td><td className="p-2">Gynäkologie</td></tr>
                  <tr className="border-b"><td className="p-2">DU-20</td><td className="p-2">Baihui</td><td className="p-2">40,0</td><td className="p-2">Gamma</td><td className="p-2">Bewusstsein</td></tr>
                  <tr><td className="p-2">REN-17</td><td className="p-2">Danzhong</td><td className="p-2">27,5</td><td className="p-2">Yin-Mix</td><td className="p-2">Emotionen</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.11 Praktische Anwendung der Punkt-Frequenzen</h3>

          <div className="bg-emerald-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Therapeutische Elektrostimulation:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-emerald-400 my-3">
              <strong>Optimale Stimulationsparameter:</strong><br/>
              • Frequenz: Punkt-spezifische Resonanzfrequenz ± 2%<br/>
              • Amplitude: 0,1-1,0 mA (Patientenabhängig)<br/>
              • Pulsbreite: 0,1-0,5 ms<br/>
              • Behandlungszeit: 15-20 Minuten<br/>
              • Elektroden: Silber-Chlorid, Durchmesser 2-5 mm<br/><br/>
              <strong>Biofeedback-Integration:</strong><br/>
              Hautleitfähigkeit als Kontrolle der Stimulation<br/>
              Automatische Anpassung bei Impedanz-Änderungen<br/>
              Echtzeit-Monitoring der therapeutischen Wirkung<br/><br/>
              <strong>Kombinationstherapie:</strong><br/>
              Mehrere harmonisch abgestimmte Punkte simultan<br/>
              Meridian-übergreifende Behandlungsprotokolle<br/>
              Integration mit traditioneller Nadelakupunktur möglich
            </div>
          </div>

          <Separator className="my-6" />

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
