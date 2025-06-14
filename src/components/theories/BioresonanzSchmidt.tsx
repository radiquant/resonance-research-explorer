
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const BioresonanzSchmidt = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center text-blue-800">
            Bioresonanz nach Paul Schmidt - Rayonex
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Paul Schmidt Frequenz-Kompendium</h2>
          
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

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Schadstoffe und Toxine (Detox-Frequenzen)</h2>

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

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Pathogene Mikroorganismen</h2>

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

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Spezielle Frequenz-Programme</h2>

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

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Therapeutische Protokolle</h2>

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

        </CardContent>
      </Card>
    </div>
  );
};

export default BioresonanzSchmidt;
