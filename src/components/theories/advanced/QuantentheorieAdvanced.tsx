
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuantentheorieAdvanced = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Quantentheorie - Fundamentale Prinzipien & Anwendungen</CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-300">Quantenmechanische Grundlagen</h3>
              <div className="space-y-3 text-gray-200">
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Wellenfunktion Ψ:</strong> Vollständige Beschreibung des Quantenzustands
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Unschärfeprinzip:</strong> ΔxΔp ≥ ℏ/2 (Heisenberg)
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Superposition:</strong> |Ψ⟩ = α|0⟩ + β|1⟩ (Kohärenz)
                </div>
                <div className="p-3 bg-blue-900/30 rounded">
                  <strong className="text-blue-200">Verschränkung:</strong> Non-lokale Korrelationen
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-300">Quantenkonstanten & Einheiten</h3>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li>• <strong>Planck-Konstante:</strong> h = 6,626 × 10⁻³⁴ J·s</li>
                <li>• <strong>Reduzierte Konstante:</strong> ℏ = h/2π = 1,055 × 10⁻³⁴ J·s</li>
                <li>• <strong>Elektronenladung:</strong> e = 1,602 × 10⁻¹⁹ C</li>
                <li>• <strong>Elektronenmasse:</strong> mₑ = 9,109 × 10⁻³¹ kg</li>
                <li>• <strong>Protonenmasse:</strong> mₚ = 1,673 × 10⁻²⁷ kg</li>
                <li>• <strong>Bohr-Radius:</strong> a₀ = 5,292 × 10⁻¹¹ m</li>
                <li>• <strong>Rydberg-Konstante:</strong> R∞ = 1,097 × 10⁷ m⁻¹</li>
                <li>• <strong>Feinstrukturkonstante:</strong> α = e²/(4πε₀ℏc) ≈ 1/137</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-300">Schrödinger-Gleichung</h3>
              <div className="space-y-3">
                <div className="bg-purple-900/20 p-3 rounded text-sm font-mono">
                  <h4 className="font-semibold text-purple-200 mb-2">Zeitabhängige Form:</h4>
                  <p className="text-gray-300">
                    iℏ ∂Ψ/∂t = ĤΨ<br/>
                    Ĥ = -ℏ²/(2m)∇² + V(r)
                  </p>
                </div>
                
                <div className="bg-purple-900/20 p-3 rounded text-sm font-mono">
                  <h4 className="font-semibold text-purple-200 mb-2">Zeitunabhängige Form:</h4>
                  <p className="text-gray-300">
                    ĤΨ = EΨ<br/>
                    [-ℏ²/(2m)∇² + V(r)]Ψ = EΨ
                  </p>
                </div>
                
                <div className="bg-purple-900/20 p-3 rounded text-sm">
                  <h4 className="font-semibold text-purple-200">Wasserstoff-Atom:</h4>
                  <p className="text-gray-300 text-xs">
                    Eₙ = -13,6 eV/n²<br/>
                    Ψₙₗₘ = RₙₗYₗᵐ<br/>
                    |Ψ|² = Aufenthaltswahrscheinlichkeit
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-300">Quantenfeldtheorie</h3>
              <div className="space-y-3">
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Zweite Quantisierung</h4>
                  <p className="text-gray-300 text-sm">
                    Feldoperatoren: Ψ̂(x,t)<br/>
                    Erzeugung: â†|n⟩ = √(n+1)|n+1⟩<br/>
                    Vernichtung: â|n⟩ = √n|n-1⟩
                  </p>
                </div>
                
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Vakuum-Fluktuationen</h4>
                  <p className="text-gray-300 text-sm">
                    Nullpunkt-Energie: E₀ = ½ℏω<br/>
                    Casimir-Effekt: F = -π²ℏc/(240a⁴)<br/>
                    Lamb-Shift: Δν = 1057 MHz (2s₁/₂-2p₁/₂)
                  </p>
                </div>
                
                <div className="bg-yellow-900/20 p-3 rounded">
                  <h4 className="font-semibold text-yellow-200">Dirac-Gleichung</h4>
                  <p className="text-gray-300 text-sm">
                    (iγᵘ∂ᵤ - m)Ψ = 0<br/>
                    Spin-½-Teilchen<br/>
                    Antimaterie-Vorhersage
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-300">Quantencomputing</h3>
              <div className="space-y-3">
                <div className="bg-red-900/20 p-3 rounded">
                  <h4 className="font-semibold text-red-200">Qubits</h4>
                  <p className="text-gray-300 text-sm">
                    |Ψ⟩ = α|0⟩ + β|1⟩<br/>
                    |α|² + |β|² = 1<br/>
                    Bloch-Sphäre-Darstellung
                  </p>
                </div>
                
                <div className="bg-red-900/20 p-3 rounded">
                  <h4 className="font-semibold text-red-200">Quantengatter</h4>
                  <p className="text-gray-300 text-sm">
                    Pauli-X: σₓ = [0 1; 1 0]<br/>
                    Hadamard: H = 1/√2[1 1; 1 -1]<br/>
                    CNOT, Toffoli, Fredkin
                  </p>
                </div>
                
                <div className="bg-red-900/20 p-3 rounded">
                  <h4 className="font-semibold text-red-200">Algorithmen</h4>
                  <p className="text-gray-300 text-sm">
                    Shor: Faktorisierung O((log N)³)<br/>
                    Grover: Suche O(√N)<br/>
                    Quantum Fourier Transform
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-cyan-300">Quantenbiologie</h3>
              <div className="space-y-3">
                <div className="bg-cyan-900/20 p-3 rounded">
                  <h4 className="font-semibold text-cyan-200">Photosynthese</h4>
                  <p className="text-gray-300 text-sm">
                    Quantenkohärenz in Lichtsammelkomplexen<br/>
                    Exziton-Transport über 95% Effizienz<br/>
                    Superposition vermeidet Energieverluste
                  </p>
                </div>
                
                <div className="bg-cyan-900/20 p-3 rounded">
                  <h4 className="font-semibold text-cyan-200">Enzymatik</h4>
                  <p className="text-gray-300 text-sm">
                    Quantentunneling durch Energiebarrieren<br/>
                    H-Transfer in 10⁻¹³ s (klassisch: Jahre)<br/>
                    Temperatur-unabhängige Kinetik
                  </p>
                </div>
                
                <div className="bg-cyan-900/20 p-3 rounded">
                  <h4 className="font-semibold text-cyan-200">Magnetrezeption</h4>
                  <p className="text-gray-300 text-sm">
                    Radikal-Paar-Mechanismus<br/>
                    Kryptochrom-Proteine<br/>
                    Erdmagnetfeld-Sensitivität: 50 µT
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-pink-300">Quantenmedizin</h3>
              <div className="space-y-3">
                <div className="bg-pink-900/20 p-3 rounded">
                  <h4 className="font-semibold text-pink-200">Mikrotubuli-Quantenprozesse</h4>
                  <p className="text-gray-300 text-sm">
                    Tubulin-Dimere als Quantencomputer<br/>
                    Kohärenz-Zeit: 10⁻¹³ - 10⁻²⁰ s<br/>
                    Orch-OR (Penrose-Hameroff)
                  </p>
                </div>
                
                <div className="bg-pink-900/20 p-3 rounded">
                  <h4 className="font-semibold text-pink-200">DNA-Quantenresonanz</h4>
                  <p className="text-gray-300 text-sm">
                    Soliton-Wellen: 10¹² - 10¹⁴ Hz<br/>
                    Phonon-Exziton-Kopplung<br/>
                    Kodon-Antikodon-Verschränkung
                  </p>
                </div>
                
                <div className="bg-pink-900/20 p-3 rounded">
                  <h4 className="font-semibold text-pink-200">Biophotonen</h4>
                  <p className="text-gray-300 text-sm">
                    Ultra-schwache Lichtemission<br/>
                    10-1000 Photonen/(cm²·s)<br/>
                    Kohärenz-Länge: 1-100 µm
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-indigo-900/30 rounded-lg">
            <h4 className="text-lg font-semibold text-indigo-200 mb-2">Fundamentale Quantengleichung</h4>
            <p className="text-gray-300 mb-2 font-mono">
              "⟨Ψ|Ô|Ψ⟩ = ∫ Ψ*(r,t) Ô Ψ(r,t) d³r"
            </p>
            <p className="text-gray-300 text-sm">
              Diese Born'sche Interpretations-Gleichung gibt die Wahrscheinlichkeit für Messwerte 
              von Observablen Ô im Quantenzustand |Ψ⟩ an - Grundlage aller Quantentechnologien.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuantentheorieAdvanced;
