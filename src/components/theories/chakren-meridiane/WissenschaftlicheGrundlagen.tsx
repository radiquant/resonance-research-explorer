
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const WissenschaftlicheGrundlagen = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-800">
            Wissenschaftliche Grundlagen
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          
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

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.3 Meridian-Leitungssystem</h3>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Bioelektrische Leitungsbahnen:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-green-400 my-3">
              <strong>Meridian-Impedanz-Modell:</strong><br/>
              Z_meridian = R_längs + j(ωL_meridian - 1/(ωC_meridian))<br/>
              R_längs = Längswiderstand der Leitbahn<br/>
              L_meridian = Induktivität durch Spiralstruktur<br/>
              C_meridian = Kapazität zum umgebenden Gewebe<br/><br/>
              <strong>Ausbreitungsgeschwindigkeit:</strong><br/>
              v = 1/√(LC) = c/√(ε_r μ_r)<br/>
              Typisch: v = 50-200 m/s (viel langsamer als Nervenleitung)<br/><br/>
              <strong>Dämpfungskonstante:</strong><br/>
              α = R/(2Z₀), Z₀ = √(L/C)<br/>
              Bestimmt Reichweite der Signalübertragung
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default WissenschaftlicheGrundlagen;
