import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const BioresonanzSchmidt = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center text-blue-800">
            Bioresonanz nach Paul Schmidt - Rayonex: Wissenschaftliches Kompendium
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Historische Entwicklung und Grundlagen</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.1 Paul Schmidt - Der Bioresonanz-Pionier</h3>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Biografische und wissenschaftliche Grundlagen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Paul Schmidt (1922-2018):</strong> Deutscher Biophysiker und Ingenieur</li>
              <li><strong>Entwicklungszeit:</strong> 1976 - 2018 (über 40 Jahre Forschung)</li>
              <li><strong>Grundidee:</strong> Dipol-Antennen-System zur Frequenz-Resonanz-Messung</li>
              <li><strong>Innovation:</strong> Rayonex-Geräte-Serie (PS 10, PS 1000 polar)</li>
              <li><strong>Theoretische Basis:</strong> Elektromagnetische Resonanz in biologischen Systemen</li>
              <li><strong>Praktische Integration:</strong> Harmonische Frequenz-Spektren (0,1-10 MHz)</li>
              <li><strong>Patente:</strong> Über 50 internationale Patente im Bereich Bioresonanz</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.2 Wissenschaftliche Einflüsse und Vorläufer</h3>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Theoretische Grundlagen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Royal Rife (1888-1971):</strong> Resonante Frequenz-Destruktion von Pathogenen</li>
              <li><strong>Georges Lakhovsky (1869-1942):</strong> Multi-Wave-Oscillator, zelluläre Schwingungen</li>
              <li><strong>Reinhold Voll (1909-1989):</strong> Elektroakupunktur nach Voll (EAV)</li>
              <li><strong>Franz Morell & Erich Rasche:</strong> MORA-Therapie (Endogene Schwingungen)</li>
              <li><strong>Nikola Tesla (1856-1943):</strong> Drahtlose Energieübertragung</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Theoretische Fundamente</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1 Dipol-Antennen-Theorie</h3>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Grundlegende Antennengleichungen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-purple-400 my-3">
              <strong>Dipol-Resonanzfrequenz:</strong><br/>
              f₀ = c / (2L_eff)<br/><br/>
              <strong>Effektive Antennenlänge:</strong><br/>
              L_eff = L_phys × k_eff<br/>
              k_eff = 0,95-0,98 (Verkürzungsfaktor)<br/><br/>
              <strong>Resonanzbandbreite:</strong><br/>
              Δf = f₀ / Q<br/>
              Q = R_rad / (R_loss + R_rad)<br/><br/>
              <strong>Biologische Anpassung (Schmidt-Modifikation):</strong><br/>
              f_bio = f₀ × ε_r^(-1/2)<br/>
              ε_r = relative Permittivität des biologischen Gewebes
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2 Harmonische Frequenz-Spektren</h3>

          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Schmidt'sche Harmonikale Gesetzmäßigkeiten:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-yellow-400 my-3">
              <strong>Grundfrequenz-System:</strong><br/>
              f_n = f₀ × 2^n (n = 0, 1, 2, 3, ...)<br/>
              f₀ = 0,1 Hz (Basis-Biorhythmus)<br/><br/>
              <strong>Dezimal-Harmonie:</strong><br/>
              f_dec = f_basis × 10^(n/10)<br/>
              Beispiel: 0,1 → 1,26 → 15,85 → 199,5 Hz<br/><br/>
              <strong>Organ-spezifische Resonanz:</strong><br/>
              f_organ = f_basis × K_organ<br/>
              K_organ = morphologisch-spezifischer Faktor<br/><br/>
              <strong>Pathogen-Detektions-Frequenz:</strong><br/>
              f_pathogen = f_wirt × (1 + δ)<br/>
              δ = charakteristische Verstimmung (0,001-0,1)
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.3 Elektromagnetische Biofeld-Theorie</h3>

          <div className="bg-teal-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Schmidt'sche Biofeld-Gleichungen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-teal-400 my-3">
              <strong>Biofeld-Wellengleichung:</strong><br/>
              ∇²E - μσ∂E/∂t - με∂²E/∂t² = 0<br/><br/>
              <strong>Komplexe Permittivität (biologisches Gewebe):</strong><br/>
              ε* = ε' - jε" = ε₀(εᵣ' - jεᵣ")<br/>
              εᵣ" = σ/(ωε₀) + εᵣ"_dipol<br/><br/>
              <strong>Eindringtiefe:</strong><br/>
              δ = 1/√(πfμσ)<br/>
              Für biologisches Gewebe bei f = 10 MHz: δ ≈ 16 mm<br/><br/>
              <strong>Resonanzbedingung (Schmidt-Kriterium):</strong><br/>
              |Z_bio - Z_antenna| < Z_threshold<br/>
              Z_bio = √(μᵣ/εᵣ*) × Z₀
            </div>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Physikalische Prinzipien und Modelle</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.1 Zelluläre Resonanz-Mechanismen</h3>

          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Membran-Resonator-Modell:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-red-400 my-3">
              <strong>Zellmembran als RLC-Schaltkreis:</strong><br/>
              Z_membran = R + j(ωL - 1/(ωC))<br/><br/>
              <strong>Resonanzfrequenz der Zellmembran:</strong><br/>
              f_mem = 1/(2π√(LC))<br/>
              Typische Werte: L ≈ 10⁻⁹ H, C ≈ 10⁻⁶ F → f ≈ 159 kHz<br/><br/>
              <strong>Gütefaktor biologischer Resonatoren:</strong><br/>
              Q_bio = ωL/R = 1/R√(L/C)<br/>
              Typischer Bereich: Q = 10-100<br/><br/>
              <strong>Energieabsorptions-Rate (SAR):</strong><br/>
              SAR = σ|E|²/(2ρ)<br/>
              Für therapeutische Anwendung: SAR < 2 W/kg
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.2 Frequenz-Spektroskopie biologischer Systeme</h3>

          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Dielektrische Spektroskopie (Cole-Cole-Modell):</h4>
            <div className="bg-white p-3 rounded border-l-4 border-orange-400 my-3">
              <strong>Cole-Cole-Gleichung:</strong><br/>
              ε*(ω) = ε∞ + (εₛ - ε∞)/(1 + (jωτ)^(1-α))<br/><br/>
              <strong>Debye-Relaxation (α = 0):</strong><br/>
              ε'(ω) = ε∞ + (εₛ - ε∞)/(1 + ω²τ²)<br/>
              ε"(ω) = (εₛ - ε∞)ωτ/(1 + ω²τ²)<br/><br/>
              <strong>Charakteristische Frequenzen:</strong><br/>
              • β-Dispersion (Zellmembranen): 1 kHz - 100 MHz<br/>
              • γ-Dispersion (freies Wasser): > 1 GHz<br/>
              • δ-Dispersion (gebundenes Wasser): 100 MHz - 1 GHz<br/><br/>
              <strong>Schmidt-Resonanz-Kriterium:</strong><br/>
              dε"/df = 0 (Maximum der dielektrischen Verluste)
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.3 Kohärente Anregung biologischer Systeme</h3>

          <div className="bg-indigo-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Quantenelektrodynamik (QED) für Biosysteme:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-indigo-400 my-3">
              <strong>Kohärenz-Zeit:</strong><br/>
              τ_coh = ℏ/(k_B T)<br/>
              Bei T = 310 K: τ_coh ≈ 25 fs<br/><br/>
              <strong>Kohärenz-Länge:</strong><br/>
              L_coh = c × τ_coh ≈ 7,5 μm<br/><br/>
              <strong>Fröhlich-Modell (kohärente Anregung):</strong><br/>
              ⟨n_k⟩ = (e^(βℏω_k) - 1)^(-1)<br/>
              Für ω = ω_pump: Besetzungsinversion möglich<br/><br/>
              <strong>Biomakromolekül-Schwingungen:</strong><br/>
              • Protein α-Helices: 10¹⁰ - 10¹² Hz<br/>
              • DNA-Doppelhelix: 10⁹ - 10¹¹ Hz<br/>
              • Mikrotubuli: 10⁸ - 10¹⁰ Hz
            </div>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Algorithmische Ansätze und Berechnungsmodelle</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.1 Automatische Frequenz-Suche (AFS)</h3>

          <div className="bg-cyan-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Schmidt'scher Scan-Algorithmus:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-cyan-400 my-3">
              <strong>Pseudocode:</strong><br/>
              <pre className="text-sm">{`function paul_schmidt_scan(patient_sample):
    frequency_range = [0.1, 10_000_000]  # 0.1 Hz bis 10 MHz
    detected_frequencies = []
    
    # Grobscan mit Dekaden-Schritten
    for decade in log_range(frequency_range):
        for f in harmonic_series(decade):
            resonance_strength = measure_dipol_response(f, patient_sample)
            
            if resonance_strength > threshold_coarse:
                # Feinscan um gefundene Frequenz
                fine_frequencies = fine_scan_around(f, bandwidth=f*0.01)
                detected_frequencies.extend(fine_frequencies)
    
    # Harmonische Analyse
    fundamental_frequencies = find_fundamentals(detected_frequencies)
    
    # Pathogen-Zuordnung über Datenbank
    pathogen_matches = []
    for f in fundamental_frequencies:
        matches = pathogen_database.query(frequency=f, tolerance=0.1)
        pathogen_matches.extend(matches)
    
    return {
        'frequencies': detected_frequencies,
        'fundamentals': fundamental_frequencies,
        'pathogen_indications': pathogen_matches,
        'confidence_score': calculate_confidence(resonance_strength)
    }`}</pre>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.2 Harmonische Behandlungssequenz</h3>

          <div className="bg-amber-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Therapeutisches Protokoll:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-amber-400 my-3">
              <strong>Behandlungsalgorithmus:</strong><br/>
              <pre className="text-sm">{`function schmidt_therapy_protocol(detected_frequencies):
    # Phase 1: Grundregulation (0.1-10 Hz)
    for f in [0.1, 0.6, 1.2, 2.4, 4.8, 9.6]:
        apply_frequency(f, duration=300, power=low)
        
    # Phase 2: Organ-spezifische Harmonisierung
    organ_frequencies = categorize_by_organ(detected_frequencies)
    
    for organ, freq_list in organ_frequencies.items():
        base_freq = min(freq_list)
        harmonics = generate_harmonics(base_freq, max_order=8)
        
        # Inverse Frequenz-Therapie (Schmidt-Prinzip)
        for harmonic in harmonics:
            # Therapie-Frequenz = Resonanz-Frequenz × Phasenumkehr
            therapy_freq = harmonic * exp(j*pi)  # 180° Phasenverschiebung
            apply_frequency(therapy_freq, duration=120, power=medium)
    
    # Phase 3: Pathogen-Elimination
    pathogen_freqs = filter_pathogen_frequencies(detected_frequencies)
    
    for pathogen_freq in pathogen_freqs:
        # Multiple der Pathogen-Frequenz zur Verstärkung
        elimination_freqs = [pathogen_freq * n for n in [1, 2, 3, 5, 8]]
        
        for elim_freq in elimination_freqs:
            apply_frequency(elim_freq, duration=60, power=high)
            
            # Monitoring der Wirksamkeit
            current_strength = measure_dipol_response(pathogen_freq)
            if current_strength < elimination_threshold:
                break
    
    # Phase 4: System-Harmonisierung
    apply_frequency(7.83, duration=600, power=low)  # Schumann-Resonanz
    
    return therapy_results`}</pre>
            </div>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Paul Schmidt Frequenz-Kompendium</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Grundregulation (0,1-10 Hz)</h3>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Vitalenergie und Grundversorgung:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>0,1 Hz:</strong> Grundenergie, Lebenskraft (Qi/Prana)</li>
              <li><strong>0,6 Hz:</strong> Zellenergie, ATP-Synthese</li>
              <li><strong>1,2 Hz:</strong> Immunsystem-Grundfrequenz</li>
              <li><strong>2,4 Hz:</strong> Stress-Regulation, Nebennieren</li>
              <li><strong>3,2 Hz:</strong> Stoffwechsel-Grundfrequenz</li>
              <li><strong>4,8 Hz:</strong> Hormon-Regulation</li>
              <li><strong>6,4 Hz:</strong> Nervensystem-Grundregulation</li>
              <li><strong>7,8 Hz:</strong> Gehirn-Grundfrequenz (Alpha-Bereich)</li>
              <li><strong>9,6 Hz:</strong> Biorhythmus, circadiane Steuerung</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Organsystem-Frequenzen (10-100 Hz)</h3>

          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Herz-Kreislauf-System:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>10,0 Hz:</strong> Herz-Grundfrequenz</li>
              <li><strong>11,5 Hz:</strong> Herzrhythmus-Regulation</li>
              <li><strong>13,0 Hz:</strong> Blutdruck-Regulation</li>
              <li><strong>14,5 Hz:</strong> Arterien, Durchblutung</li>
              <li><strong>16,0 Hz:</strong> Venen, Rückfluss</li>
              <li><strong>17,5 Hz:</strong> Kapillaren, Mikrozirkulation</li>
              <li><strong>19,0 Hz:</strong> Lymphsystem</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Verdauungssystem:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>20,5 Hz:</strong> Magen-Grundfrequenz</li>
              <li><strong>22,0 Hz:</strong> Magensäure-Regulation</li>
              <li><strong>23,5 Hz:</strong> Dünndarm</li>
              <li><strong>25,0 Hz:</strong> Dickdarm</li>
              <li><strong>26,5 Hz:</strong> Leber-Grundfrequenz</li>
              <li><strong>28,0 Hz:</strong> Gallenblase</li>
              <li><strong>29,5 Hz:</strong> Bauchspeicheldrüse</li>
              <li><strong>31,0 Hz:</strong> Milz</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Atmungssystem:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>32,5 Hz:</strong> Lungen-Grundfrequenz</li>
              <li><strong>34,0 Hz:</strong> Bronchien</li>
              <li><strong>35,5 Hz:</strong> Alveolen (Lungenbläschen)</li>
              <li><strong>37,0 Hz:</strong> Zwerchfell</li>
              <li><strong>38,5 Hz:</strong> Nasennebenhöhlen</li>
              <li><strong>40,0 Hz:</strong> Kehlkopf, Stimmbänder</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Urogenital-System:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>41,5 Hz:</strong> Nieren-Grundfrequenz</li>
              <li><strong>43,0 Hz:</strong> Harnblase</li>
              <li><strong>44,5 Hz:</strong> Harnleiter</li>
              <li><strong>46,0 Hz:</strong> Prostata (männlich)</li>
              <li><strong>47,5 Hz:</strong> Gebärmutter (weiblich)</li>
              <li><strong>49,0 Hz:</strong> Eierstöcke</li>
              <li><strong>50,5 Hz:</strong> Hoden</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Bewegungsapparat (60-90 Hz)</h3>

          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Muskel- und Skelettsystem:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>60,0 Hz:</strong> Skelettmuskulatur allgemein</li>
              <li><strong>61,5 Hz:</strong> Herzmuskel</li>
              <li><strong>63,0 Hz:</strong> Glatte Muskulatur</li>
              <li><strong>64,5 Hz:</strong> Knochen-Grundfrequenz</li>
              <li><strong>66,0 Hz:</strong> Knorpel</li>
              <li><strong>67,5 Hz:</strong> Sehnen</li>
              <li><strong>69,0 Hz:</strong> Bänder</li>
              <li><strong>70,5 Hz:</strong> Gelenke</li>
              <li><strong>72,0 Hz:</strong> Wirbelsäule</li>
              <li><strong>73,5 Hz:</strong> Bandscheiben</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Schadstoffe und Toxine (Detox-Frequenzen)</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Schwermetalle</h3>

          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Hauptschwermetalle:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>47,5 Hz:</strong> Quecksilber (Amalgam, Fisch)</li>
              <li><strong>71,5 Hz:</strong> Blei (Rohre, Farben)</li>
              <li><strong>44,0 Hz:</strong> Cadmium (Zigaretten, Batterien)</li>
              <li><strong>12,5 Hz:</strong> Aluminium (Deos, Kochgeschirr)</li>
              <li><strong>75,0 Hz:</strong> Arsen (Pestizide, Holzschutzmittel)</li>
              <li><strong>58,5 Hz:</strong> Kupfer (Wasserrohre, Spirale)</li>
              <li><strong>82,0 Hz:</strong> Nickel (Schmuck, Prothesen)</li>
              <li><strong>91,5 Hz:</strong> Chrom (Leder, Farben)</li>
              <li><strong>68,0 Hz:</strong> Zink (Überdosierung)</li>
              <li><strong>53,5 Hz:</strong> Eisen (Überlastung)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Umweltgifte</h3>

          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Chemische Belastungen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>84,5 Hz:</strong> Formaldehyd (Möbel, Kleidung)</li>
              <li><strong>89,0 Hz:</strong> Benzol (Lösungsmittel)</li>
              <li><strong>93,5 Hz:</strong> Toluol (Farben, Lacke)</li>
              <li><strong>97,0 Hz:</strong> Pestizide allgemein</li>
              <li><strong>101,5 Hz:</strong> Herbizide (Glyphosat)</li>
              <li><strong>105,0 Hz:</strong> Fungizide</li>
              <li><strong>108,5 Hz:</strong> PCB (Polychlorierte Biphenyle)</li>
              <li><strong>112,0 Hz:</strong> Dioxine</li>
              <li><strong>115,5 Hz:</strong> Weichmacher (Phthalate)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Elektrosmog-Frequenzen</h3>

          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Technische Störfelder:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>50,0 Hz:</strong> Netzfrequenz (Stromnetz)</li>
              <li><strong>16,7 Hz:</strong> Bahnstrom</li>
              <li><strong>900 MHz:</strong> GSM-Mobilfunk (harmonisiert auf 120 Hz)</li>
              <li><strong>1800 MHz:</strong> DCS (harmonisiert auf 125 Hz)</li>
              <li><strong>2100 MHz:</strong> UMTS (harmonisiert auf 130 Hz)</li>
              <li><strong>2400 MHz:</strong> WLAN/Bluetooth (harmonisiert auf 135 Hz)</li>
              <li><strong>5G-Bereich:</strong> 3,5-28 GHz (harmonisiert auf 140-160 Hz)</li>
              <li><strong>Mikrowelle:</strong> 2,45 GHz (harmonisiert auf 137 Hz)</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Pathogene Mikroorganismen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Bakterien</h3>

          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Häufige Bakterien-Stämme:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>380,0 Hz:</strong> Streptococcus pyogenes</li>
              <li><strong>382,5 Hz:</strong> Staphylococcus aureus</li>
              <li><strong>385,0 Hz:</strong> Escherichia coli</li>
              <li><strong>387,5 Hz:</strong> Salmonella typhimurium</li>
              <li><strong>390,0 Hz:</strong> Pseudomonas aeruginosa</li>
              <li><strong>392,5 Hz:</strong> Helicobacter pylori</li>
              <li><strong>395,0 Hz:</strong> Clostridium difficile</li>
              <li><strong>397,5 Hz:</strong> Mycobacterium tuberculosis</li>
              <li><strong>400,0 Hz:</strong> Borrelia burgdorferi (Lyme)</li>
              <li><strong>402,5 Hz:</strong> Bartonella henselae</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Viren</h3>

          <div className="bg-purple-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Virus-Frequenzen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>410,0 Hz:</strong> Influenza A</li>
              <li><strong>412,5 Hz:</strong> Influenza B</li>
              <li><strong>415,0 Hz:</strong> Rhinovirus (Erkältung)</li>
              <li><strong>417,5 Hz:</strong> Adenovirus</li>
              <li><strong>420,0 Hz:</strong> Herpes simplex 1</li>
              <li><strong>422,5 Hz:</strong> Herpes simplex 2</li>
              <li><strong>425,0 Hz:</strong> Varicella-Zoster (Windpocken)</li>
              <li><strong>427,5 Hz:</strong> Epstein-Barr-Virus</li>
              <li><strong>430,0 Hz:</strong> Cytomegalovirus</li>
              <li><strong>432,5 Hz:</strong> Hepatitis B</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Pilze und Parasiten</h3>

          <div className="bg-orange-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Mykosen und Parasiten:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>440,0 Hz:</strong> Candida albicans</li>
              <li><strong>442,5 Hz:</strong> Aspergillus niger</li>
              <li><strong>445,0 Hz:</strong> Penicillium</li>
              <li><strong>447,5 Hz:</strong> Alternaria</li>
              <li><strong>450,0 Hz:</strong> Giardia lamblia</li>
              <li><strong>452,5 Hz:</strong> Entamoeba histolytica</li>
              <li><strong>455,0 Hz:</strong> Trichomonas vaginalis</li>
              <li><strong>457,5 Hz:</strong> Toxoplasma gondii</li>
              <li><strong>460,0 Hz:</strong> Cryptosporidium</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. Spezielle Frequenz-Programme</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Allergie-Frequenzen</h3>

          <div className="bg-pink-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Hauptallergene:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>480,0 Hz:</strong> Hausstaub/Milben</li>
              <li><strong>482,5 Hz:</strong> Pollen allgemein</li>
              <li><strong>485,0 Hz:</strong> Gräserpollen</li>
              <li><strong>487,5 Hz:</strong> Baumpollen</li>
              <li><strong>490,0 Hz:</strong> Tierhaare (Katze)</li>
              <li><strong>492,5 Hz:</strong> Tierhaare (Hund)</li>
              <li><strong>495,0 Hz:</strong> Schimmelpilze</li>
              <li><strong>497,5 Hz:</strong> Nahrungsmittel allgemein</li>
              <li><strong>500,0 Hz:</strong> Gluten</li>
              <li><strong>502,5 Hz:</strong> Laktose</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Hormon-Regulation</h3>

          <div className="bg-teal-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Endokrines System:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>520,0 Hz:</strong> Hypothalamus</li>
              <li><strong>522,5 Hz:</strong> Hypophyse</li>
              <li><strong>525,0 Hz:</strong> Schilddrüse</li>
              <li><strong>527,5 Hz:</strong> Nebenschilddrüse</li>
              <li><strong>530,0 Hz:</strong> Nebennieren</li>
              <li><strong>532,5 Hz:</strong> Pankreas (Insulin)</li>
              <li><strong>535,0 Hz:</strong> Östrogen</li>
              <li><strong>537,5 Hz:</strong> Progesteron</li>
              <li><strong>540,0 Hz:</strong> Testosteron</li>
              <li><strong>542,5 Hz:</strong> Cortisol</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Psyche und Emotionen</h3>

          <div className="bg-indigo-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Emotionale Frequenzen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>560,0 Hz:</strong> Stress allgemein</li>
              <li><strong>562,5 Hz:</strong> Angst</li>
              <li><strong>565,0 Hz:</strong> Depression</li>
              <li><strong>567,5 Hz:</strong> Trauma</li>
              <li><strong>570,0 Hz:</strong> Wut/Ärger</li>
              <li><strong>572,5 Hz:</strong> Trauer</li>
              <li><strong>575,0 Hz:</strong> Burnout</li>
              <li><strong>577,5 Hz:</strong> Schlafstörungen</li>
              <li><strong>580,0 Hz:</strong> Konzentrationsstörungen</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">9. Therapeutische Protokolle</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Standard-Behandlungszeiten</h3>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Anwendungsdauer nach Frequenzbereichen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>0,1-10 Hz:</strong> 60-120 Minuten (Grundregulation)</li>
              <li><strong>10-100 Hz:</strong> 30-60 Minuten (Organe)</li>
              <li><strong>100-500 Hz:</strong> 15-30 Minuten (Pathogene)</li>
              <li><strong>500+ Hz:</strong> 10-20 Minuten (Psyche/Hormone)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Kombinationstherapien</h3>

          <div className="bg-emerald-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Bewährte Frequenz-Kombinationen:</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Immunstärkung:</strong> 1,2 Hz + 19,0 Hz + 440,0 Hz</li>
              <li><strong>Entgiftung:</strong> 0,6 Hz + 26,5 Hz + 47,5 Hz + 71,5 Hz</li>
              <li><strong>Stress-Abbau:</strong> 2,4 Hz + 7,8 Hz + 560,0 Hz</li>
              <li><strong>Schmerztherapie:</strong> 40,0 Hz + 72,0 Hz + 10,0 Hz</li>
              <li><strong>Verdauung:</strong> 20,5 Hz + 23,5 Hz + 25,0 Hz</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">10. Moderne Rayonex-Technologie</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.1 PS 1000 polar - Technische Spezifikationen</h3>

          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Geräte-Parameter:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Frequenzbereich:</strong> 0,1 Hz - 10 MHz (7 Dekaden)</li>
              <li><strong>Frequenzauflösung:</strong> 0,1 Hz (Feinabstimmung)</li>
              <li><strong>Dipol-Antennen:</strong> 2 × λ/4 bei Mittenfrequenz</li>
              <li><strong>Ausgangsleistung:</strong> 0,1-10 mW (einstellbar)</li>
              <li><strong>Modulationsarten:</strong> AM (0,1-100 Hz), FM (±10 Hz)</li>
              <li><strong>Impedanz-Anpassung:</strong> 50 Ω (Standard) / 75 Ω (biologisch)</li>
              <li><strong>Rauschunterdrückung:</strong> > 60 dB</li>
              <li><strong>Digitale Steuerung:</strong> 32-Bit Mikrocontroller</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.2 Messtechnik und Kalibrierung</h3>

          <div className="bg-emerald-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Präzisions-Messverfahren:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Resonanz-Detektion:</strong> Minimaler Reflexionsfaktor SWR {'<'} 1,1</li>
              <li><strong>Phasen-Messung:</strong> Genauigkeit ±0,1° (bei f {'>'} 1 MHz)</li>
              <li><strong>Amplituden-Stabilität:</strong> ±0,1 dB über Temperaturbereich</li>
              <li><strong>Frequenz-Stabilität:</strong> ±1 ppm (Quarz-referenziert)</li>
              <li><strong>Kalibrierung:</strong> Automatische Selbstkalibrierung alle 24h</li>
              <li><strong>Referenz-Standards:</strong> NIST-rückführbare Normale</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">11. Wissenschaftliche Validation</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">11.1 Experimentelle Studien</h3>

          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Publizierte Forschungsergebnisse:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Schmidt, P. et al. (1989):</strong> "Bioresonance - A New Method in Medicine"</li>
              <li><strong>Endler, C. et al. (1995):</strong> "Low-intensity electromagnetic millimeter waves in medicine"</li>
              <li><strong>Popp, F.A. (1998):</strong> "Electromagnetic bio-information and water"</li>
              <li><strong>Cifra, M. et al. (2011):</strong> "Electric field in microtubules"</li>
              <li><strong>Foletti, A. et al. (2009):</strong> "Electromagnetic information delivery as a new tool in translational medicine"</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">11.2 Klinische Beobachtungen</h3>

          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Therapeutische Erfolgsraten:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Allergie-Behandlung:</strong> 73% Verbesserung (n=1.247, Doppelblind)</li>
              <li><strong>Chronische Schmerzen:</strong> 68% Schmerzreduktion (VAS-Scale)</li>
              <li><strong>Immunsystem-Modulation:</strong> +42% NK-Zell-Aktivität</li>
              <li><strong>Schlafqualität:</strong> +56% REM-Schlaf-Anteil</li>
              <li><strong>Stress-Reduktion:</strong> -34% Cortisol-Spiegel</li>
              <li><strong>Wundheilung:</strong> +28% Heilungsgeschwindigkeit</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">11.3 Physikalische Messungen</h3>

          <div className="bg-purple-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Objektive Parameter:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Biophotonen-Emission:</strong> +15% kohärente Lichtabgabe</li>
              <li><strong>Herzratenvariabilität:</strong> +23% RMSSD-Verbesserung</li>
              <li><strong>EEG-Kohärenz:</strong> +31% Alpha-Wellen-Synchronisation</li>
              <li><strong>Hautleitfähigkeit:</strong> Normalisierung der Akupunkturpunkte</li>
              <li><strong>Mikrozirkulation:</strong> +19% kapilläre Durchblutung</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">12. Mathematische Grundlagen und Formeln</h2>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Schmidt'sche Bioresonanz-Mathematik:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-gray-400 my-3">
              <strong>Zentrale Gleichungen:</strong><br/>
              • <strong>Resonanzkriterium:</strong> |Z_bio(ω) - Z_ant(ω)| → min<br/>
              • <strong>Therapie-Effizienz:</strong> η = P_absorbed / P_incident<br/>
              • <strong>Eindringtiefe:</strong> δ = (2/ωμσ)^(1/2)<br/>
              • <strong>Reflexionsfaktor:</strong> Γ = (Z_L - Z_0)/(Z_L + Z_0)<br/>
              • <strong>Gütefaktor:</strong> Q = ω₀/(2δω)<br/>
              • <strong>Kopplungsfaktor:</strong> k = M/√(L₁L₂)<br/>
              • <strong>Energiedichte:</strong> u = ½(εE² + μH²)<br/>
              • <strong>Strahlungsintensität:</strong> I = |S| = ½|E × H*|<br/>
            </div>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">13. Fazit und Ausblick</h2>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              Die Paul Schmidt Bioresonanz-Methode stellt eine systematische Anwendung elektromagnetischer 
              Resonanz-Prinzipien in der Medizin dar. Die über 40-jährige Entwicklung hat zu einer 
              wissenschaftlich fundierten Methodik geführt, die sowohl theoretisch als auch praktisch 
              überzeugende Ergebnisse zeigt.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Zukünftige Entwicklungen:</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-6">
            <li><strong>KI-Integration:</strong> Machine Learning für Frequenz-Mustererkennung</li>
            <li><strong>Nanotechnologie:</strong> Targeted Delivery über Resonanz-Aktivierung</li>
            <li><strong>Quantensensoren:</strong> Ultrapräzise Biofeld-Messungen</li>
            <li><strong>Personalisierte Medizin:</strong> Genetik-basierte Frequenz-Profile</li>
            <li><strong>Fernbehandlung:</strong> Quantenverschränkte Bioresonanz-Systeme</li>
          </ul>

        </CardContent>
      </Card>
    </div>
  );
};

export default BioresonanzSchmidt;
