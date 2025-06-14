
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ChakrenMeridiane = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center text-blue-800">
            Erweiterte Theorien zu Chakren und Meridianen
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Detaillierte Chakra-Frequenzen</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Haupt-Chakren (Exakte Frequenzen)</h3>
          
          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">1. Muladhara (Wurzel-Chakra):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 194,18 Hz (entspricht Note C)</li>
              <li><strong>Planetenfrequenz:</strong> 256 Hz (C, Erde)</li>
              <li><strong>Solfeggio:</strong> 396 Hz (Befreiung von Angst)</li>
              <li><strong>Obertöne:</strong> 388,36 Hz, 582,54 Hz, 776,72 Hz</li>
              <li><strong>Binaural Beats:</strong> 7,83 Hz (Schumann-Resonanz)</li>
              <li><strong>Kristall-Resonanz:</strong> Hämatit 2000-4000 Hz</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">2. Svadhisthana (Sakral-Chakra):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 210,42 Hz (entspricht Note D)</li>
              <li><strong>Planetenfrequenz:</strong> 288 Hz (D, Mond)</li>
              <li><strong>Solfeggio:</strong> 417 Hz (Resonierung mit Veränderung)</li>
              <li><strong>Obertöne:</strong> 420,84 Hz, 631,26 Hz, 841,68 Hz</li>
              <li><strong>Binaural Beats:</strong> 9,0 Hz (Alpha-Wellen)</li>
              <li><strong>Kristall-Resonanz:</strong> Karneol 1800-3600 Hz</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">3. Manipura (Solarplexus-Chakra):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 126,22 Hz (entspricht Note E)</li>
              <li><strong>Planetenfrequenz:</strong> 320 Hz (E, Sonne)</li>
              <li><strong>Solfeggio:</strong> 528 Hz (Transformation, DNA-Reparatur)</li>
              <li><strong>Obertöne:</strong> 252,44 Hz, 378,66 Hz, 504,88 Hz</li>
              <li><strong>Binaural Beats:</strong> 10,0 Hz (Alpha-Wellen)</li>
              <li><strong>Kristall-Resonanz:</strong> Citrin 1500-3000 Hz</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">4. Anahata (Herz-Chakra):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 341,3 Hz (entspricht Note F)</li>
              <li><strong>Planetenfrequenz:</strong> 360 Hz (F, Venus)</li>
              <li><strong>Solfeggio:</strong> 639 Hz (Verbindende Beziehungen)</li>
              <li><strong>Obertöne:</strong> 682,6 Hz, 1023,9 Hz, 1365,2 Hz</li>
              <li><strong>Binaural Beats:</strong> 10,5 Hz (Alpha-Theta Übergang)</li>
              <li><strong>Kristall-Resonanz:</strong> Rosenquarz 1200-2400 Hz</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">5. Vishuddha (Hals-Chakra):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 141,27 Hz (entspricht Note G)</li>
              <li><strong>Planetenfrequenz:</strong> 384 Hz (G, Merkur)</li>
              <li><strong>Solfeggio:</strong> 741 Hz (Erwachen der Intuition)</li>
              <li><strong>Obertöne:</strong> 282,54 Hz, 423,81 Hz, 565,08 Hz</li>
              <li><strong>Binaural Beats:</strong> 12,0 Hz (Alpha-Wellen)</li>
              <li><strong>Kristall-Resonanz:</strong> Sodalith 1000-2000 Hz</li>
            </ul>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">6. Ajna (Stirn-Chakra/Drittes Auge):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 221,23 Hz (entspricht Note A)</li>
              <li><strong>Planetenfrequenz:</strong> 426,7 Hz (A, Jupiter)</li>
              <li><strong>Solfeggio:</strong> 852 Hz (Rückkehr zur spirituellen Ordnung)</li>
              <li><strong>Obertöne:</strong> 442,46 Hz, 663,69 Hz, 884,92 Hz</li>
              <li><strong>Binaural Beats:</strong> 6,3 Hz (Theta-Wellen)</li>
              <li><strong>Kristall-Resonanz:</strong> Lapislazuli 800-1600 Hz</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">7. Sahasrara (Kronen-Chakra):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 172,06 Hz (entspricht Note H)</li>
              <li><strong>Planetenfrequenz:</strong> 480 Hz (H, Neptun)</li>
              <li><strong>Solfeggio:</strong> 963 Hz (Rückkehr zur Einheit)</li>
              <li><strong>Obertöne:</strong> 344,12 Hz, 516,18 Hz, 688,24 Hz</li>
              <li><strong>Binaural Beats:</strong> 4,0 Hz (Theta-Wellen)</li>
              <li><strong>Kristall-Resonanz:</strong> Amethyst 600-1200 Hz</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Erweiterte Chakra-Systeme</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Höhere Chakren (8-12)</h3>
          
          <div className="bg-teal-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">8. Stern-Chakra (Soul Star):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 272,2 Hz</li>
              <li><strong>Position:</strong> 15-20 cm über dem Kopf</li>
              <li><strong>Funktion:</strong> Verbindung zur Seelen-Essenz</li>
              <li><strong>Binaural Beats:</strong> 2,0 Hz (Delta-Wellen)</li>
            </ul>
          </div>

          <div className="bg-cyan-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">9. Geist-Chakra (Spirit Chakra):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 315,8 Hz</li>
              <li><strong>Position:</strong> 30-35 cm über dem Kopf</li>
              <li><strong>Funktion:</strong> Kosmisches Bewusstsein</li>
              <li><strong>Binaural Beats:</strong> 1,5 Hz (Delta-Wellen)</li>
            </ul>
          </div>

          <div className="bg-sky-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">10. Universelles Chakra:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 384,0 Hz</li>
              <li><strong>Position:</strong> 50 cm über dem Kopf</li>
              <li><strong>Funktion:</strong> Universelle Verbindung</li>
              <li><strong>Binaural Beats:</strong> 1,0 Hz (Delta-Wellen)</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Detailliertes Meridian-System</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">12 Haupt-Meridiane mit Frequenzen</h3>

          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">1. Lungen-Meridian (LU) - Tai Yin:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 4,6-7,2 Hz</li>
              <li><strong>Optimale Frequenz:</strong> 5,8 Hz</li>
              <li><strong>Elementzuordnung:</strong> Metall</li>
              <li><strong>Tageszeit:</strong> 3-5 Uhr</li>
              <li><strong>Wichtige Punkte:</strong></li>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>LU-1 (Zhongfu): 5,8 Hz - Zentrum der Brust</li>
                <li>LU-5 (Chize): 6,2 Hz - Ellbogen-Falte</li>
                <li>LU-9 (Taiyuan): 5,4 Hz - Handgelenk-Puls</li>
                <li>LU-11 (Shaoshang): 7,0 Hz - Daumen-Nagel</li>
              </ul>
            </ul>
          </div>

          <div className="bg-orange-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">2. Dickdarm-Meridian (LI) - Yang Ming:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 6,8-9,4 Hz</li>
              <li><strong>Optimale Frequenz:</strong> 8,1 Hz</li>
              <li><strong>Elementzuordnung:</strong> Metall</li>
              <li><strong>Tageszeit:</strong> 5-7 Uhr</li>
              <li><strong>Wichtige Punkte:</strong></li>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>LI-1 (Shangyang): 8,1 Hz - Zeigefinger-Nagel</li>
                <li>LI-4 (Hegu): 7,8 Hz - Hand-Rücken (wichtigster Punkt)</li>
                <li>LI-11 (Quchi): 8,4 Hz - Ellbogen-Außenseite</li>
                <li>LI-20 (Yingxiang): 9,0 Hz - Nasenflügel</li>
              </ul>
            </ul>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">3. Magen-Meridian (ST) - Yang Ming:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 8,1-11,7 Hz</li>
              <li><strong>Optimale Frequenz:</strong> 9,9 Hz</li>
              <li><strong>Elementzuordnung:</strong> Erde</li>
              <li><strong>Tageszeit:</strong> 7-9 Uhr</li>
              <li><strong>Wichtige Punkte:</strong></li>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>ST-6 (Jiache): 9,5 Hz - Kiefer-Muskel</li>
                <li>ST-25 (Tianshu): 10,2 Hz - Nabel-Seite</li>
                <li>ST-36 (Zusanli): 9,9 Hz - Unterschenkel (wichtigster Punkt)</li>
                <li>ST-44 (Neiting): 11,1 Hz - Fuß-Zehen</li>
              </ul>
            </ul>
          </div>

          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">4. Milz-Pankreas-Meridian (SP) - Tai Yin:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 5,3-8,9 Hz</li>
              <li><strong>Optimale Frequenz:</strong> 7,1 Hz</li>
              <li><strong>Elementzuordnung:</strong> Erde</li>
              <li><strong>Tageszeit:</strong> 9-11 Uhr</li>
              <li><strong>Wichtige Punkte:</strong></li>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>SP-1 (Yinbai): 7,1 Hz - Großzehen-Innenrand</li>
                <li>SP-3 (Taibai): 6,8 Hz - Fuß-Innenrand</li>
                <li>SP-6 (Sanyinjiao): 7,4 Hz - Unterschenkel-Innen</li>
                <li>SP-21 (Dabao): 8,2 Hz - Seitliche Rippen</li>
              </ul>
            </ul>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">5. Herz-Meridian (HE) - Shao Yin:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 5,7-8,2 Hz</li>
              <li><strong>Optimale Frequenz:</strong> 6,9 Hz</li>
              <li><strong>Elementzuordnung:</strong> Feuer</li>
              <li><strong>Tageszeit:</strong> 11-13 Uhr</li>
              <li><strong>Wichtige Punkte:</strong></li>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>HE-1 (Jiquan): 6,9 Hz - Achselhöhle</li>
                <li>HE-3 (Shaohai): 7,2 Hz - Ellbogen-Innen</li>
                <li>HE-7 (Shenmen): 6,6 Hz - Handgelenk-Innen</li>
                <li>HE-9 (Shaochong): 8,0 Hz - Kleinfinger-Nagel</li>
              </ul>
            </ul>
          </div>

          <div className="bg-indigo-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">6. Dünndarm-Meridian (SI) - Tai Yang:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 7,4-10,1 Hz</li>
              <li><strong>Optimale Frequenz:</strong> 8,7 Hz</li>
              <li><strong>Elementzuordnung:</strong> Feuer</li>
              <li><strong>Tageszeit:</strong> 13-15 Uhr</li>
              <li><strong>Wichtige Punkte:</strong></li>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>SI-1 (Shaoze): 8,7 Hz - Kleinfinger-Außenrand</li>
                <li>SI-3 (Houxi): 8,4 Hz - Hand-Außenrand</li>
                <li>SI-19 (Tinggong): 9,3 Hz - Ohr-Öffnung</li>
              </ul>
            </ul>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">7. Blasen-Meridian (BL) - Tai Yang:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 6,2-9,8 Hz</li>
              <li><strong>Optimale Frequenz:</strong> 8,0 Hz</li>
              <li><strong>Elementzuordnung:</strong> Wasser</li>
              <li><strong>Tageszeit:</strong> 15-17 Uhr</li>
              <li><strong>Wichtige Punkte:</strong></li>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>BL-1 (Jingming): 8,0 Hz - Augen-Innenwinkel</li>
                <li>BL-23 (Shenshu): 7,7 Hz - Nieren-Shu-Punkt</li>
                <li>BL-40 (Weizhong): 8,3 Hz - Knie-Rückseite</li>
                <li>BL-67 (Zhiyin): 9,1 Hz - Kleinzehen-Außenrand</li>
              </ul>
            </ul>
          </div>

          <div className="bg-teal-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">8. Nieren-Meridian (KI) - Shao Yin:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 5,9-7,1 Hz</li>
              <li><strong>Optimale Frequenz:</strong> 6,5 Hz</li>
              <li><strong>Elementzuordnung:</strong> Wasser</li>
              <li><strong>Tageszeit:</strong> 17-19 Uhr</li>
              <li><strong>Wichtige Punkte:</strong></li>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>KI-1 (Yongquan): 6,5 Hz - Fuß-Sohle</li>
                <li>KI-3 (Taixi): 6,2 Hz - Knöchel-Innen</li>
                <li>KI-27 (Shufu): 7,0 Hz - Schlüsselbein-Unter</li>
              </ul>
            </ul>
          </div>

          <div className="bg-pink-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">9. Perikard-Meridian (PC) - Jue Yin:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 6,1-8,7 Hz</li>
              <li><strong>Optimale Frequenz:</strong> 7,4 Hz</li>
              <li><strong>Elementzuordnung:</strong> Feuer (Minister)</li>
              <li><strong>Tageszeit:</strong> 19-21 Uhr</li>
              <li><strong>Wichtige Punkte:</strong></li>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>PC-1 (Tianchi): 7,4 Hz - Brust-Seite</li>
                <li>PC-6 (Neiguan): 7,1 Hz - Unterarm-Innen</li>
                <li>PC-9 (Zhongchong): 8,5 Hz - Mittelfinger-Nagel</li>
              </ul>
            </ul>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">10. Dreifach-Erwärmer-Meridian (TE) - Shao Yang:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 7,8-10,4 Hz</li>
              <li><strong>Optimale Frequenz:</strong> 9,1 Hz</li>
              <li><strong>Elementzuordnung:</strong> Feuer (Minister)</li>
              <li><strong>Tageszeit:</strong> 21-23 Uhr</li>
              <li><strong>Wichtige Punkte:</strong></li>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>TE-1 (Guanchong): 9,1 Hz - Ringfinger-Außenrand</li>
                <li>TE-5 (Waiguan): 8,8 Hz - Unterarm-Außen</li>
                <li>TE-23 (Sizhukong): 9,7 Hz - Augenbrauen-Ende</li>
              </ul>
            </ul>
          </div>

          <div className="bg-emerald-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">11. Gallenblasen-Meridian (GB) - Shao Yang:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 8,3-11,9 Hz</li>
              <li><strong>Optimale Frequenz:</strong> 10,1 Hz</li>
              <li><strong>Elementzuordnung:</strong> Holz</li>
              <li><strong>Tageszeit:</strong> 23-1 Uhr</li>
              <li><strong>Wichtige Punkte:</strong></li>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>GB-1 (Tongziliao): 10,1 Hz - Augen-Außenwinkel</li>
                <li>GB-21 (Jianjing): 9,8 Hz - Schulter-Höchster Punkt</li>
                <li>GB-34 (Yanglingquan): 10,4 Hz - Unterschenkel-Außen</li>
                <li>GB-44 (Zuqiaoyin): 11,6 Hz - Vierte Zehe-Außenrand</li>
              </ul>
            </ul>
          </div>

          <div className="bg-lime-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">12. Leber-Meridian (LR) - Jue Yin:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 2,4-6,8 Hz</li>
              <li><strong>Optimale Frequenz:</strong> 4,6 Hz</li>
              <li><strong>Elementzuordnung:</strong> Holz</li>
              <li><strong>Tageszeit:</strong> 1-3 Uhr</li>
              <li><strong>Wichtige Punkte:</strong></li>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>LR-1 (Dadun): 4,6 Hz - Großzehen-Außenrand</li>
                <li>LR-3 (Taichong): 4,3 Hz - Fuß-Rücken (wichtigster Punkt)</li>
                <li>LR-14 (Qimen): 5,9 Hz - Rippen-Bogen</li>
              </ul>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Sonder-Meridiane (Außerordentliche Gefäße)</h2>

          <div className="bg-violet-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Du Mai (Lenkergefäß):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 3,5 Hz</li>
              <li><strong>28 Punkte</strong> entlang der Wirbelsäule</li>
              <li><strong>Wichtige Punkte:</strong> DU-20 (Baihui): 3,8 Hz - Scheitel</li>
            </ul>
          </div>

          <div className="bg-rose-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Ren Mai (Konzeptionsgefäß):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Grundfrequenz:</strong> 2,8 Hz</li>
              <li><strong>24 Punkte</strong> entlang der Körper-Vorderseite</li>
              <li><strong>Wichtige Punkte:</strong> REN-17 (Danzhong): 3,1 Hz - Herz-Zentrum</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Ohr-Akupunktur Frequenzen</h2>

          <div className="bg-amber-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Nogier-Frequenzen (Auriculo-Therapie):</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>A-Frequenz:</strong> 2,28 Hz - Ektoderm (Nervensystem)</li>
              <li><strong>B-Frequenz:</strong> 4,56 Hz - Endoderm (Innere Organe)</li>
              <li><strong>C-Frequenz:</strong> 9,12 Hz - Mesoderm (Bewegungsapparat)</li>
              <li><strong>D-Frequenz:</strong> 18,25 Hz - Gemischte Gewebe</li>
              <li><strong>E-Frequenz:</strong> 36,5 Hz - Degenerative Prozesse</li>
              <li><strong>F-Frequenz:</strong> 73 Hz - Psychosomatische Störungen</li>
              <li><strong>G-Frequenz:</strong> 146 Hz - Traumata und Schock</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Wissenschaftliche Korrelationen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Gehirnwellen-Entsprechungen</h3>
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Delta (0,5-4 Hz):</strong> Entspricht Nieren-Meridian, tiefe Regeneration</li>
              <li><strong>Theta (4-8 Hz):</strong> Entspricht meisten Yin-Meridianen, meditative Zustände</li>
              <li><strong>Alpha (8-13 Hz):</strong> Entspricht Yang-Meridianen, Wachbewusstsein</li>
              <li><strong>Beta (13-30 Hz):</strong> Höhere Meridian-Harmonics, aktive Konzentration</li>
              <li><strong>Gamma (30-100 Hz):</strong> Chakra-Obertöne, erweiterte Bewusstseinszustände</li>
            </ul>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default ChakrenMeridiane;
