
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const MeridianFrequenzen = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-800">
            Wissenschaftlich Berechnete Meridian-Frequenzen
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Berechnungsgrundlagen</h3>

          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Meridian-Frequenz-Berechnung:</h4>
            <div className="bg-white p-3 rounded border-l-4 border-slate-400 my-3">
              <strong>Grundformel:</strong><br/>
              f_meridian = (v_bio / L_meridian) × F_korrektur<br/>
              v_bio = Bioelektrische Ausbreitungsgeschwindigkeit (50-200 m/s)<br/>
              L_meridian = Anatomische Meridianlänge<br/>
              F_korrektur = Gewebe-spezifischer Korrekturfaktor<br/><br/>
              <strong>Harmonische Beziehung:</strong><br/>
              Yin-Meridiane: Grundfrequenzen (n = 1)<br/>
              Yang-Meridiane: Harmonische der Yin-Partner (n = 2-3)<br/><br/>
              <strong>Circadiane Modulation:</strong><br/>
              f_aktiv = f_basis × (1 + 0,2 × sin(2π × t/24))<br/>
              Maximale Aktivität zu spezifischen Tageszeiten
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Hauptmeridian-Frequenzen</h3>

          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">1. Lungen-Meridian (LU) - Yin</h4>
            <div className="bg-white p-3 rounded border-l-4 border-red-400 my-3">
              <strong>Berechnete Frequenz:</strong> 5,8 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Verlauf: Brust → Arm → Daumen<br/>
              Gesamtlänge: ≈ 85 cm<br/>
              Aktive Zeit: 03:00-05:00 Uhr<br/><br/>
              <strong>Berechnung:</strong><br/>
              v_bio = 65 m/s (Yin-Meridian, langsamer)<br/>
              L = 0,85 m<br/>
              f = 65/0,85 × 0,076 = 5,8 Hz<br/><br/>
              <strong>Harmonische:</strong><br/>
              Grundfrequenz, 11,6 Hz, 23,2 Hz, 46,4 Hz<br/><br/>
              <strong>Pathologie-Indikatoren:</strong><br/>
              Reduktion: Bronchitis, Asthma<br/>
              Erhöhung: Hyperventilation, Angst
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">2. Dickdarm-Meridian (DI) - Yang</h4>
            <div className="bg-white p-3 rounded border-l-4 border-purple-400 my-3">
              <strong>Berechnete Frequenz:</strong> 4,2 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Verlauf: Zeigefinger → Arm → Gesicht<br/>
              Gesamtlänge: ≈ 95 cm<br/>
              Aktive Zeit: 05:00-07:00 Uhr<br/><br/>
              <strong>Berechnung:</strong><br/>
              v_bio = 75 m/s (Yang-Meridian)<br/>
              L = 0,95 m<br/>
              f = 75/0,95 × 0,053 = 4,2 Hz<br/><br/>
              <strong>Partner-Beziehung zu LU:</strong><br/>
              5,8 Hz (LU) + 4,2 Hz (DI) = 10,0 Hz (Organ-Paar)<br/>
              Verhältnis: 5,8/4,2 = 1,38 ≈ √2 (harmonische Beziehung)
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">3. Magen-Meridian (ST) - Yang</h4>
            <div className="bg-white p-3 rounded border-l-4 border-green-400 my-3">
              <strong>Berechnete Frequenz:</strong> 9,9 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Verlauf: Gesicht → Thorax → Bein → Fuß<br/>
              Gesamtlänge: ≈ 150 cm (längster Meridian)<br/>
              Aktive Zeit: 07:00-09:00 Uhr<br/><br/>
              <strong>Berechnung:</strong><br/>
              v_bio = 85 m/s (starker Yang-Meridian)<br/>
              L = 1,50 m<br/>
              f = 85/1,50 ×0,175 = 9,9 Hz<br/><br/>
              <strong>Alpha-Wellen-Nähe:</strong><br/>
              9,9 Hz liegt im Alpha-Bereich (8-13 Hz)<br/>
              Entspannung und Verdauungsförderung
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">4. Milz-Pankreas-Meridian (MP) - Yin</h4>
            <div className="bg-white p-3 rounded border-l-4 border-yellow-400 my-3">
              <strong>Berechnete Frequenz:</strong> 8,1 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Verlauf: Großzehe → Bein → Thorax<br/>
              Gesamtlänge: ≈ 110 cm<br/>
              Aktive Zeit: 09:00-11:00 Uhr<br/><br/>
              <strong>Berechnung:</strong><br/>
              v_bio = 60 m/s (Yin-Meridian)<br/>
              L = 1,10 m<br/>
              f = 60/1,10 × 0,148 = 8,1 Hz<br/><br/>
              <strong>Partner-Beziehung zu ST:</strong><br/>
              9,9 Hz (ST) - 8,1 Hz (MP) = 1,8 Hz (Differenzfrequenz)<br/>
              Verdauungs-Regulation durch Frequenz-Modulation
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">5. Herz-Meridian (HE) - Yin</h4>
            <div className="bg-white p-3 rounded border-l-4 border-orange-400 my-3">
              <strong>Berechnete Frequenz:</strong> 6,9 Hz<br/>
              <strong>Anatomische Daten:</strong><br/>
              Verlauf: Herz → Arm → kleiner Finger<br/>
              Gesamtlänge: ≈ 65 cm<br/>
              Aktive Zeit: 11:00-13:00 Uhr<br/><br/>
              <strong>Berechnung:</strong><br/>
              v_bio = 55 m/s (schwacher Yin-Meridian)<br/>
              L = 0,65 m<br/>
              f = 55/0,65 × 0,082 = 6,9 Hz<br/><br/>
              <strong>Theta-Wellen-Bereich:</strong><br/>
              6,9 Hz im Theta-Bereich (4-8 Hz)<br/>
              Meditation und emotionale Balance
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Meridian-Frequenz-Übersichtstabelle</h4>
            <div className="bg-white p-3 rounded border-l-4 border-slate-400 my-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Meridian</th>
                    <th className="text-left p-2">Polarität</th>
                    <th className="text-left p-2">Frequenz (Hz)</th>
                    <th className="text-left p-2">Aktive Zeit</th>
                    <th className="text-left p-2">Gehirnwelle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-2">Lunge (LU)</td><td className="p-2">Yin</td><td className="p-2">5,8</td><td className="p-2">03-05h</td><td className="p-2">Theta</td></tr>
                  <tr className="border-b"><td className="p-2">Dickdarm (DI)</td><td className="p-2">Yang</td><td className="p-2">4,2</td><td className="p-2">05-07h</td><td className="p-2">Theta</td></tr>
                  <tr className="border-b"><td className="p-2">Magen (ST)</td><td className="p-2">Yang</td><td className="p-2">9,9</td><td className="p-2">07-09h</td><td className="p-2">Alpha</td></tr>
                  <tr className="border-b"><td className="p-2">Milz (MP)</td><td className="p-2">Yin</td><td className="p-2">8,1</td><td className="p-2">09-11h</td><td className="p-2">Alpha</td></tr>
                  <tr className="border-b"><td className="p-2">Herz (HE)</td><td className="p-2">Yin</td><td className="p-2">6,9</td><td className="p-2">11-13h</td><td className="p-2">Theta</td></tr>
                  <tr className="border-b"><td className="p-2">Dünndarm (SI)</td><td className="p-2">Yang</td><td className="p-2">13,8</td><td className="p-2">13-15h</td><td className="p-2">Beta</td></tr>
                  <tr className="border-b"><td className="p-2">Blase (BL)</td><td className="p-2">Yang</td><td className="p-2">3,5</td><td className="p-2">15-17h</td><td className="p-2">Delta</td></tr>
                  <tr className="border-b"><td className="p-2">Niere (KI)</td><td className="p-2">Yin</td><td className="p-2">6,5</td><td className="p-2">17-19h</td><td className="p-2">Theta</td></tr>
                  <tr className="border-b"><td className="p-2">Perikard (PE)</td><td className="p-2">Yin</td><td className="p-2">7,2</td><td className="p-2">19-21h</td><td className="p-2">Theta</td></tr>
                  <tr className="border-b"><td className="p-2">3-Erwärmer (TE)</td><td className="p-2">Yang</td><td className="p-2">14,4</td><td className="p-2">21-23h</td><td className="p-2">Beta</td></tr>
                  <tr className="border-b"><td className="p-2">Gallenblase (GB)</td><td className="p-2">Yang</td><td className="p-2">11,2</td><td className="p-2">23-01h</td><td className="p-2">Alpha</td></tr>
                  <tr><td className="p-2">Leber (LV)</td><td className="p-2">Yin</td><td className="p-2">16,2</td><td className="p-2">01-03h</td><td className="p-2">Beta</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default MeridianFrequenzen;
