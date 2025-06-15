
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const GrundlagenUndTheorie = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            1. Historische Entwicklung und Paul Schmidt
          </CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-4">
          <div className="bg-blue-500/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Paul Schmidt (1922-2018):</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Biophysiker und Ingenieur</strong> - Über 40 Jahre Forschung</li>
              <li><strong>Entwicklungszeit:</strong> 1976 - 2018</li>
              <li><strong>Grundidee:</strong> Dipol-Antennen-System zur Frequenz-Resonanz-Messung</li>
              <li><strong>Innovation:</strong> Rayonex-Geräte-Serie (PS 10, PS 1000 polar)</li>
              <li><strong>Patente:</strong> Über 50 internationale Patente</li>
            </ul>
          </div>

          <Separator className="bg-white/20" />

          <div className="bg-green-500/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Wissenschaftliche Einflüsse:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Royal Rife:</strong> Resonante Frequenz-Destruktion von Pathogenen</li>
              <li><strong>Georges Lakhovsky:</strong> Multi-Wave-Oscillator, zelluläre Schwingungen</li>
              <li><strong>Reinhold Voll:</strong> Elektroakupunktur nach Voll (EAV)</li>
              <li><strong>Franz Morell & Erich Rasche:</strong> MORA-Therapie</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            2. Theoretische Fundamente
          </CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-4">
          <div className="bg-purple-500/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Dipol-Antennen-Theorie:</h4>
            <div className="bg-black/20 p-3 rounded border-l-4 border-purple-400 my-3 font-mono text-sm">
              <strong>Dipol-Resonanzfrequenz:</strong><br/>
              f₀ = c / (2L_eff)<br/><br/>
              <strong>Effektive Antennenlänge:</strong><br/>
              L_eff = L_phys × k_eff<br/>
              k_eff = 0,95-0,98 (Verkürzungsfaktor)<br/><br/>
              <strong>Biologische Anpassung:</strong><br/>
              f_bio = f₀ × ε_r^(-1/2)
            </div>
          </div>

          <div className="bg-yellow-500/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Harmonische Frequenz-Spektren:</h4>
            <div className="bg-black/20 p-3 rounded border-l-4 border-yellow-400 my-3 font-mono text-sm">
              <strong>Grundfrequenz-System:</strong><br/>
              f_n = f₀ × 2^n (n = 0, 1, 2, 3, ...)<br/>
              f₀ = 0,1 Hz (Basis-Biorhythmus)<br/><br/>
              <strong>Dezimal-Harmonie:</strong><br/>
              f_dec = f_basis × 10^(n/10)<br/>
              Beispiel: 0,1 → 1,26 → 15,85 → 199,5 Hz
            </div>
          </div>

          <div className="bg-teal-500/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Biofeld-Wellengleichung:</h4>
            <div className="bg-black/20 p-3 rounded border-l-4 border-teal-400 my-3 font-mono text-sm">
              ∇²E - μσ∂E/∂t - με∂²E/∂t² = 0<br/><br/>
              <strong>Komplexe Permittivität:</strong><br/>
              ε* = ε' - jε" = ε₀(εᵣ' - jεᵣ")<br/><br/>
              <strong>Eindringtiefe:</strong><br/>
              δ = 1/√(πfμσ)<br/>
              Für biologisches Gewebe bei f = 10 MHz: δ ≈ 16 mm
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrundlagenUndTheorie;
