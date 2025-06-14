
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const RadionikGeneral = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center text-blue-800">
            Radionik Allgemein - Detaillierte Frequenzen und Raten
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Historische Radionik-Raten</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Albert Abrams Original-Raten (1900-1924)</h3>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Grundlegende Krankheits-Raten (Abrams):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Tuberkulose:</strong> 42 Ohm</li>
              <li><strong>Krebs:</strong> 50 Ohm</li>
              <li><strong>Syphilis:</strong> 55 Ohm</li>
              <li><strong>Gonorrhoe:</strong> 52 Ohm</li>
              <li><strong>Diabetes:</strong> 48 Ohm</li>
              <li><strong>Nephritis:</strong> 46 Ohm</li>
              <li><strong>Pneumonie:</strong> 44 Ohm</li>
              <li><strong>Malaria:</strong> 58 Ohm</li>
              <li><strong>Typhus:</strong> 56 Ohm</li>
              <li><strong>Epilepsie:</strong> 60 Ohm</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Ruth Drown Raten (1930-1965)</h3>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Fernbehandlungs-Raten:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Herz allgemein:</strong> 5-7</li>
              <li><strong>Leber:</strong> 2-4</li>
              <li><strong>Lunge:</strong> 4-6</li>
              <li><strong>Nieren:</strong> 5-9</li>
              <li><strong>Milz:</strong> 3-1</li>
              <li><strong>Magen:</strong> 3-5</li>
              <li><strong>Pankreas:</strong> 2-9</li>
              <li><strong>Gehirn:</strong> 8-5</li>
              <li><strong>Augen:</strong> 9-4</li>
              <li><strong>Ohren:</strong> 6-3</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">George de la Warr Raten (1940-1969)</h3>

          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Fotografische Radionik-Raten:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Vitamin A:</strong> 232-325</li>
              <li><strong>Vitamin B:</strong> 276-448</li>
              <li><strong>Vitamin C:</strong> 284-343</li>
              <li><strong>Vitamin D:</strong> 297-531</li>
              <li><strong>Calcium:</strong> 428-321</li>
              <li><strong>Eisen:</strong> 457-625</li>
              <li><strong>Phosphor:</strong> 432-567</li>
              <li><strong>Protein:</strong> 298-764</li>
              <li><strong>Fett:</strong> 312-456</li>
              <li><strong>Kohlenhydrate:</strong> 287-423</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Malcolm Rae Geometrische Raten</h3>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Magnetogeometrische Potenzierung:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Homöopathie 6C:</strong> 60° Winkelsegment</li>
              <li><strong>Homöopathie 12C:</strong> 120° Winkelsegment</li>
              <li><strong>Homöopathie 30C:</strong> 180° Winkelsegment</li>
              <li><strong>Homöopathie 200C:</strong> 240° Winkelsegment</li>
              <li><strong>Homöopathie 1M:</strong> 300° Winkelsegment</li>
              <li><strong>Bachblüten Essenz:</strong> 72° Winkelsegment</li>
              <li><strong>Edelstein-Energie:</strong> 144° Winkelsegment</li>
              <li><strong>Farb-Heilung:</strong> 36° Winkelsegment</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Moderne Radionik-Frequenzen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Quantenradionik-Frequenzen</h3>

          <div className="bg-teal-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Morphogenetische Feld-Frequenzen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfeld-Resonanz:</strong> 1,42 Hz</li>
              <li><strong>Zelluläres Morphisches Feld:</strong> 43,2 Hz</li>
              <li><strong>Organ-Morphisches Feld:</strong> 127,8 Hz</li>
              <li><strong>Körper-Morphisches Feld:</strong> 289,6 Hz</li>
              <li><strong>Bewusstseins-Feld:</strong> 432,0 Hz</li>
              <li><strong>Seelen-Feld:</strong> 888,0 Hz</li>
              <li><strong>Spirituelles Feld:</strong> 1296,0 Hz</li>
              <li><strong>Kosmisches Feld:</strong> 2368,0 Hz</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Zeitperioden-basierte Raten</h3>

          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Planetare und kosmische Zyklen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Erdrotation (24h):</strong> 0,0116 Hz</li>
              <li><strong>Mondmonat (29,5 Tage):</strong> 0,000393 Hz</li>
              <li><strong>Erdjahr (365,25 Tage):</strong> 0,0000317 Hz</li>
              <li><strong>Merkur-Jahr:</strong> 0,000129 Hz</li>
              <li><strong>Venus-Jahr:</strong> 0,0000513 Hz</li>
              <li><strong>Mars-Jahr:</strong> 0,0000169 Hz</li>
              <li><strong>Jupiter-Jahr:</strong> 0,00000268 Hz</li>
              <li><strong>Saturn-Jahr:</strong> 0,00000108 Hz</li>
              <li><strong>Präzession (26.000 Jahre):</strong> 0,00000000122 Hz</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Radionik-Substanz-Signaturen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Homöopathische Mittel-Signaturen</h3>

          <div className="bg-indigo-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Klassische Konstitutionsmittel:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Sulfur:</strong> 321-789 (Schwefel-Typ, heiß)</li>
              <li><strong>Calcium carbonicum:</strong> 234-567 (Kalk-Typ, kalt)</li>
              <li><strong>Lycopodium:</strong> 456-123 (Leber-Typ)</li>
              <li><strong>Pulsatilla:</strong> 345-678 (Wind-Typ, veränderlich)</li>
              <li><strong>Nux vomica:</strong> 567-234 (Stress-Typ)</li>
              <li><strong>Arsenicum album:</strong> 678-345 (Angst-Typ)</li>
              <li><strong>Phosphorus:</strong> 789-456 (Nerven-Typ)</li>
              <li><strong>Sepia:</strong> 432-198 (Hormon-Typ)</li>
              <li><strong>Natrium muriaticum:</strong> 543-876 (Salz-Typ)</li>
              <li><strong>Silicea:</strong> 654-321 (Kiesel-Typ)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Bachblüten-Essenzen</h3>

          <div className="bg-pink-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Original 38 Bach-Remedies:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Rescue Remedy:</strong> 444-555 (Notfall-Essenz)</li>
              <li><strong>Mimulus:</strong> 234-789 (Bekannte Ängste)</li>
              <li><strong>Aspen:</strong> 345-123 (Unbekannte Ängste)</li>
              <li><strong>Rock Rose:</strong> 456-234 (Terror, Panik)</li>
              <li><strong>Cherry Plum:</strong> 567-345 (Kontrollverlust)</li>
              <li><strong>Clematis:</strong> 678-456 (Tagträumer)</li>
              <li><strong>Honeysuckle:</strong> 789-567 (Vergangenheit)</li>
              <li><strong>Wild Rose:</strong> 321-678 (Resignation)</li>
              <li><strong>Olive:</strong> 432-789 (Erschöpfung)</li>
              <li><strong>White Chestnut:</strong> 543-234 (Gedankenkreisen)</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Farb-Radionik und Spektral-Raten</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Chakra-Farb-Korrespondenzen</h3>

          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Spektralbasierte Raten:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Rot (700 nm):</strong> 428 THz → Rate 42-8 (Wurzelchakra)</li>
              <li><strong>Orange (620 nm):</strong> 484 THz → Rate 48-4 (Sakralchakra)</li>
              <li><strong>Gelb (580 nm):</strong> 517 THz → Rate 51-7 (Solarplexus)</li>
              <li><strong>Grün (530 nm):</strong> 566 THz → Rate 56-6 (Herzchakra)</li>
              <li><strong>Blau (470 nm):</strong> 638 THz → Rate 63-8 (Halschakra)</li>
              <li><strong>Indigo (430 nm):</strong> 698 THz → Rate 69-8 (Stirnchakra)</li>
              <li><strong>Violett (400 nm):</strong> 750 THz → Rate 75-0 (Kronenchakra)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Heilsteine und Kristall-Raten</h3>

          <div className="bg-amber-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Kristall-Gitterstrukturen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Quarz (SiO₂):</strong> 32-768 (32,768 kHz Resonanz)</li>
              <li><strong>Amethyst:</strong> 28-456 (beruhigend)</li>
              <li><strong>Rosenquarz:</strong> 25-888 (Liebe)</li>
              <li><strong>Citrin:</strong> 24-321 (Manifestation)</li>
              <li><strong>Hämatit:</strong> 22-100 (Erdung)</li>
              <li><strong>Turmalin:</strong> 21-444 (Schutz)</li>
              <li><strong>Fluorit:</strong> 26-234 (Klarheit)</li>
              <li><strong>Malachit:</strong> 27-567 (Transformation)</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Moderne Computer-Radionik</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Digitale Raten-Bibliotheken</h3>

          <div className="bg-cyan-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Software-basierte Systeme:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>SuperTronic:</strong> 16-Bit digitale Raten (0-65535)</li>
              <li><strong>MARS III:</strong> Hexadezimale Raten (00-FF)</li>
              <li><strong>SE-5:</strong> Intrinsic Data Field (IDF) Zahlen</li>
              <li><strong>Quantec:</strong> Quanten-Rauschen-basierte Raten</li>
              <li><strong>CoRe:</strong> Bewusstseins-Resonanz-Werte</li>
              <li><strong>AuricaSoft:</strong> Multidimensionale Matrix-Codes</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Binaural Beat Integration</h3>

          <div className="bg-emerald-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Audio-Radionik-Frequenzen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Alpha-Induktion:</strong> 440 Hz + 450 Hz = 10 Hz Beat</li>
              <li><strong>Theta-Induktion:</strong> 440 Hz + 446 Hz = 6 Hz Beat</li>
              <li><strong>Delta-Induktion:</strong> 440 Hz + 442 Hz = 2 Hz Beat</li>
              <li><strong>Gamma-Induktion:</strong> 440 Hz + 480 Hz = 40 Hz Beat</li>
              <li><strong>Schumann-Sync:</strong> 256 Hz + 263,83 Hz = 7,83 Hz Beat</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Mathematische Radionik-Prinzipien</h2>

          <div className="bg-slate-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Berechnungsformeln:</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Bovis-Einheiten:</strong> BE = 6500 + (Rate × 100)</li>
              <li><strong>Potenzstufen:</strong> P = log₁₀(Verdünnung)</li>
              <li><strong>Resonanz-Faktor:</strong> R = Q × f₀ / Δf</li>
              <li><strong>Morphisches Feld:</strong> M = ∫ ψ(r,t) dr dt</li>
              <li><strong>Intentionsfeld:</strong> I = C × F × T (Bewusstsein × Fokus × Zeit)</li>
              <li><strong>Quantenvakuum-Kopplung:</strong> K = ℏω / kT</li>
            </ul>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default RadionikGeneral;
