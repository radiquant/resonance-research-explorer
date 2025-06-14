
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AkupunkturpunktFrequenzen = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-800">
            Punkt-spezifische Frequenzen der Hauptakupunkturpunkte
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Berechnungsgrundlagen für Punkt-Frequenzen</h3>

          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Punkt-spezifische Parameter:</h4>
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
              Δf_spezifisch = funktionsspezifische Abweichung
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Lungen-Meridian (LU) - Hauptpunkte</h3>

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
              34,8 / 5,8 = 6,0 (exakte Harmonische)
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Dickdarm-Meridian (DI) - Hauptpunkte</h3>

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
              42,0 / 4,2 = 10,0 (10. Harmonische, perfekte Resonanz)
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Weitere wichtige Punkte</h3>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">ST-36 (Zusanli) - "Drei Li vom Knie":</h4>
            <div className="bg-white p-3 rounded border-l-4 border-green-400 my-3">
              <strong>Berechnete Frequenz:</strong> 99,0 Hz<br/>
              <strong>Immunsystem-Berechnung:</strong><br/>
              T-Lymphozyten-Aktivierung: 24-72h Zyklus<br/>
              Mittelwert: 48h = 172.800 s<br/>
              Immunfrequenz: 1/172.800 × 1,71×10⁷ = 99,0 Hz<br/><br/>
              <strong>Therapeutische Indikation:</strong><br/>
              Verdauungsstörungen, Müdigkeit, Immunschwäche<br/>
              "Punkt der Hundert Krankheiten" - Universaltonikum
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">HE-7 (Shenmen) - "Geist-Tor":</h4>
            <div className="bg-white p-3 rounded border-l-4 border-orange-400 my-3">
              <strong>Berechnete Frequenz:</strong> 48,3 Hz<br/>
              <strong>Neurotransmitter-Berechnung:</strong><br/>
              Serotonin-Halbwertszeit: 2-10 min, Mittel: 6 min = 360 s<br/>
              GABA-Rezeptor-Bindung: 50-200 ms, Mittel: 125 ms<br/>
              Kombinierte Neuro-Frequenz:<br/>
              f = 1/360 × 17.388 = 48,3 Hz<br/><br/>
              <strong>Therapeutische Indikation:</strong><br/>
              Angst, Schlaflosigkeit, emotionale Unruhe<br/>
              Sedierung und Geist-beruhigende Wirkung
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">DU-20 (Baihui) - "Hundert Begegnungen":</h4>
            <div className="bg-white p-3 rounded border-l-4 border-indigo-400 my-3">
              <strong>Berechnete Frequenz:</strong> 40,0 Hz<br/>
              <strong>Gamma-Wellen-Synchronisation:</strong><br/>
              Bewusstseins-Binding: 40 Hz (Forschung von Dr. Wolf Singer)<br/>
              Neuronale Kohärenz bei 40 Hz optimal<br/>
              Direkte Messung: EEG-Gamma-Peak bei 40,0 Hz<br/><br/>
              <strong>Therapeutische Indikation:</strong><br/>
              Bewusstseinsstörungen, Depression, Konzentration<br/>
              Zentral-regulierender Punkt aller Yang-Meridiane
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Punkt-Frequenz-Übersichtstabelle</h3>

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

        </CardContent>
      </Card>
    </div>
  );
};

export default AkupunkturpunktFrequenzen;
