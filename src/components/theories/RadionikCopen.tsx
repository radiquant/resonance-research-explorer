
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const RadionikCopen = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center text-blue-800">
            Radionik nach Bruce Copen - Detaillierte Raten-Sammlung
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Bruce Copen Anatomische Raten (Originalwerte)</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Herz-Kreislauf-System</h3>
          
          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Herz und Gefäße:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Herz allgemein:</strong> 5.7 - 8.2</li>
              <li><strong>Rechtes Herz:</strong> 6.1 - 7.8</li>
              <li><strong>Linkes Herz:</strong> 5.9 - 8.0</li>
              <li><strong>Herzklappen:</strong> 6.3 - 7.5</li>
              <li><strong>Herzmuskel:</strong> 5.8 - 7.9</li>
              <li><strong>Herzbeutel:</strong> 6.0 - 7.4</li>
              <li><strong>Koronararterien:</strong> 6.2 - 8.1</li>
              <li><strong>Aorta:</strong> 6.4 - 8.3</li>
              <li><strong>Arterien allgemein:</strong> 6.0 - 8.5</li>
              <li><strong>Venen allgemein:</strong> 5.5 - 7.8</li>
              <li><strong>Kapillaren:</strong> 5.2 - 7.2</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Verdauungssystem</h3>

          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Magen-Darm-Trakt:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Magen:</strong> 3.2 - 5.8</li>
              <li><strong>Magenwand:</strong> 3.4 - 5.6</li>
              <li><strong>Magenschleimhaut:</strong> 3.1 - 5.3</li>
              <li><strong>Zwölffingerdarm:</strong> 3.6 - 6.1</li>
              <li><strong>Dünndarm:</strong> 3.8 - 6.4</li>
              <li><strong>Dickdarm:</strong> 4.1 - 6.7</li>
              <li><strong>Blinddarm:</strong> 4.3 - 6.5</li>
              <li><strong>Rektum:</strong> 4.0 - 6.2</li>
              <li><strong>Leber:</strong> 2.4 - 6.8</li>
              <li><strong>Gallenblase:</strong> 2.7 - 5.9</li>
              <li><strong>Pankreas:</strong> 2.9 - 6.2</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Atmungssystem</h3>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Lunge und Atemwege:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Lunge allgemein:</strong> 4.6 - 7.2</li>
              <li><strong>Rechte Lunge:</strong> 4.8 - 7.0</li>
              <li><strong>Linke Lunge:</strong> 4.7 - 7.1</li>
              <li><strong>Bronchien:</strong> 4.9 - 7.3</li>
              <li><strong>Bronchiolen:</strong> 5.1 - 7.4</li>
              <li><strong>Alveolen:</strong> 5.0 - 7.2</li>
              <li><strong>Pleura:</strong> 4.5 - 6.8</li>
              <li><strong>Zwerchfell:</strong> 4.3 - 6.9</li>
              <li><strong>Kehlkopf:</strong> 5.2 - 7.6</li>
              <li><strong>Luftröhre:</strong> 5.0 - 7.4</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Nervensystem</h3>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Zentrales und peripheres Nervensystem:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Gehirn allgemein:</strong> 8.5 - 9.7</li>
              <li><strong>Großhirn:</strong> 8.7 - 9.5</li>
              <li><strong>Kleinhirn:</strong> 8.4 - 9.2</li>
              <li><strong>Hirnstamm:</strong> 8.6 - 9.4</li>
              <li><strong>Rückenmark:</strong> 8.2 - 9.1</li>
              <li><strong>Sympathisches NS:</strong> 8.1 - 9.3</li>
              <li><strong>Parasympathisches NS:</strong> 7.9 - 9.0</li>
              <li><strong>Vagusnerv:</strong> 8.0 - 8.8</li>
              <li><strong>Spinale Nerven:</strong> 7.8 - 8.9</li>
              <li><strong>Gehirn-Nerven:</strong> 8.3 - 9.6</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Urogenitalsystem</h3>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Nieren und Fortpflanzungsorgane:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Nieren:</strong> 5.9 - 7.1</li>
              <li><strong>Nebennieren:</strong> 6.1 - 7.3</li>
              <li><strong>Harnblase:</strong> 5.7 - 6.9</li>
              <li><strong>Harnleiter:</strong> 5.8 - 7.0</li>
              <li><strong>Harnröhre:</strong> 5.6 - 6.8</li>
              <li><strong>Prostata:</strong> 6.2 - 7.4</li>
              <li><strong>Hoden:</strong> 6.0 - 7.2</li>
              <li><strong>Gebärmutter:</strong> 6.3 - 7.5</li>
              <li><strong>Eierstöcke:</strong> 6.1 - 7.3</li>
              <li><strong>Eileiter:</strong> 5.9 - 7.1</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Pathologische Raten nach Copen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Infektionskrankheiten</h3>

          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Bakterielle Infektionen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Streptokokken:</strong> 16.2 - 18.7</li>
              <li><strong>Staphylokokken:</strong> 15.8 - 18.3</li>
              <li><strong>Pneumokokken:</strong> 16.5 - 19.1</li>
              <li><strong>E. coli:</strong> 17.2 - 19.8</li>
              <li><strong>Salmonellen:</strong> 16.9 - 19.4</li>
              <li><strong>Tuberkulose:</strong> 18.3 - 21.5</li>
              <li><strong>Borreliose:</strong> 17.7 - 20.2</li>
              <li><strong>Chlamydien:</strong> 16.4 - 18.9</li>
              <li><strong>Helicobacter:</strong> 17.1 - 19.6</li>
            </ul>
          </div>

          <div className="bg-orange-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Virale Infektionen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Influenza:</strong> 22.4 - 25.3</li>
              <li><strong>Herpes simplex:</strong> 21.8 - 24.6</li>
              <li><strong>Epstein-Barr:</strong> 23.1 - 26.2</li>
              <li><strong>Cytomegalievirus:</strong> 22.7 - 25.8</li>
              <li><strong>Hepatitis B:</strong> 24.2 - 27.1</li>
              <li><strong>HIV:</strong> 25.3 - 28.4</li>
              <li><strong>Varizellen:</strong> 21.5 - 24.3</li>
              <li><strong>Rhinovirus:</strong> 20.9 - 23.7</li>
            </ul>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Pilzinfektionen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Candida albicans:</strong> 28.5 - 31.7</li>
              <li><strong>Aspergillus:</strong> 29.2 - 32.4</li>
              <li><strong>Penicillium:</strong> 28.8 - 31.9</li>
              <li><strong>Tricophyton:</strong> 29.6 - 32.8</li>
              <li><strong>Cryptococcus:</strong> 30.1 - 33.2</li>
            </ul>
          </div>

          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Parasiten:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Giardia:</strong> 34.2 - 37.5</li>
              <li><strong>Entamoeba:</strong> 33.8 - 37.1</li>
              <li><strong>Toxoplasma:</strong> 35.1 - 38.4</li>
              <li><strong>Trichomonas:</strong> 34.7 - 37.9</li>
              <li><strong>Cryptosporidium:</strong> 35.5 - 38.8</li>
              <li><strong>Spulwürmer:</strong> 36.2 - 39.5</li>
              <li><strong>Bandwürmer:</strong> 36.8 - 40.1</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Copen Behandlungsraten</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Therapeutische Grundraten</h3>

          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Heilungsraten:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Regeneration allgemein:</strong> 1.2 - 3.8</li>
              <li><strong>Zellheilung:</strong> 1.5 - 4.1</li>
              <li><strong>Geweberegeneration:</strong> 1.8 - 4.4</li>
              <li><strong>Immunstärkung:</strong> 2.1 - 4.7</li>
              <li><strong>Entgiftung:</strong> 2.4 - 5.0</li>
              <li><strong>Durchblutung:</strong> 2.7 - 5.3</li>
              <li><strong>Lymphdrainage:</strong> 3.0 - 5.6</li>
              <li><strong>Schmerzlinderung:</strong> 3.3 - 5.9</li>
              <li><strong>Entzündungshemmung:</strong> 3.6 - 6.2</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Spezifische Behandlungsraten</h3>

          <div className="bg-purple-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Krebs-Behandlung:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Krebszellen allgemein:</strong> 42.3 - 47.8</li>
              <li><strong>Lungenkrebs:</strong> 43.1 - 48.6</li>
              <li><strong>Brustkrebs:</strong> 42.8 - 48.3</li>
              <li><strong>Prostatakrebs:</strong> 44.2 - 49.7</li>
              <li><strong>Darmkrebs:</strong> 43.7 - 49.2</li>
              <li><strong>Leukämie:</strong> 45.5 - 51.0</li>
              <li><strong>Lymphome:</strong> 44.9 - 50.4</li>
              <li><strong>Metastasen:</strong> 46.2 - 51.7</li>
            </ul>
          </div>

          <div className="bg-teal-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Allergien und Autoimmun:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Allergien allgemein:</strong> 52.4 - 57.9</li>
              <li><strong>Heuschnupfen:</strong> 53.1 - 58.6</li>
              <li><strong>Asthma:</strong> 52.8 - 58.3</li>
              <li><strong>Neurodermitis:</strong> 54.2 - 59.7</li>
              <li><strong>Rheumatoide Arthritis:</strong> 55.5 - 61.0</li>
              <li><strong>Multiple Sklerose:</strong> 56.2 - 61.7</li>
              <li><strong>Hashimoto:</strong> 54.9 - 60.4</li>
              <li><strong>Diabetes Typ I:</strong> 57.3 - 62.8</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Hormon-Raten</h3>

          <div className="bg-pink-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Endokrine Störungen:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Schilddrüse hyper:</strong> 62.5 - 68.0</li>
              <li><strong>Schilddrüse hypo:</strong> 61.8 - 67.3</li>
              <li><strong>Nebennieren-schwäche:</strong> 63.2 - 68.7</li>
              <li><strong>Wechseljahre:</strong> 64.5 - 70.0</li>
              <li><strong>Potenzprobleme:</strong> 65.1 - 70.6</li>
              <li><strong>Zyklusstörungen:</strong> 63.8 - 69.3</li>
              <li><strong>Osteoporose:</strong> 66.4 - 71.9</li>
            </ul>
          </div>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Copen Substanz-Raten</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Vitamine und Mineralien</h3>

          <div className="bg-emerald-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Vitamine:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Vitamin A:</strong> 72.1 - 75.8</li>
              <li><strong>Vitamin B1:</strong> 73.4 - 77.1</li>
              <li><strong>Vitamin B2:</strong> 72.8 - 76.5</li>
              <li><strong>Vitamin B6:</strong> 74.2 - 77.9</li>
              <li><strong>Vitamin B12:</strong> 75.5 - 79.2</li>
              <li><strong>Vitamin C:</strong> 71.7 - 75.4</li>
              <li><strong>Vitamin D:</strong> 76.3 - 80.0</li>
              <li><strong>Vitamin E:</strong> 73.9 - 77.6</li>
              <li><strong>Vitamin K:</strong> 77.1 - 80.8</li>
              <li><strong>Folsäure:</strong> 74.8 - 78.5</li>
            </ul>
          </div>

          <div className="bg-indigo-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Mineralien:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Calcium:</strong> 82.3 - 86.0</li>
              <li><strong>Magnesium:</strong> 81.7 - 85.4</li>
              <li><strong>Eisen:</strong> 83.5 - 87.2</li>
              <li><strong>Zink:</strong> 82.9 - 86.6</li>
              <li><strong>Kalium:</strong> 84.1 - 87.8</li>
              <li><strong>Natrium:</strong> 83.2 - 86.9</li>
              <li><strong>Jod:</strong> 85.4 - 89.1</li>
              <li><strong>Selen:</strong> 84.8 - 88.5</li>
              <li><strong>Chrom:</strong> 86.2 - 89.9</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Homöopathische Mittel-Raten</h3>

          <div className="bg-amber-100 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Klassische Mittel:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Aconitum:</strong> 92.1 - 95.8</li>
              <li><strong>Arnica:</strong> 91.5 - 95.2</li>
              <li><strong>Belladonna:</strong> 93.3 - 97.0</li>
              <li><strong>Bryonia:</strong> 92.7 - 96.4</li>
              <li><strong>Nux vomica:</strong> 94.2 - 97.9</li>
              <li><strong>Pulsatilla:</strong> 93.6 - 97.3</li>
              <li><strong>Rhus tox:</strong> 95.1 - 98.8</li>
              <li><strong>Sulphur:</strong> 94.5 - 98.2</li>
            </ul>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default RadionikCopen;
