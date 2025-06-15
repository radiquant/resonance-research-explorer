
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FrequenzKompendium = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            Paul Schmidt Frequenz-Kompendium
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            
            <AccordionItem value="grundregulation" className="bg-white/5 border-white/20 rounded-lg">
              <AccordionTrigger className="text-white px-4">
                Grundregulation (0,1-10 Hz)
              </AccordionTrigger>
              <AccordionContent className="text-white px-4 pb-4">
                <div className="bg-blue-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Vitalenergie und Grundversorgung:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div><strong>0,1 Hz:</strong> Grundenergie, Lebenskraft (Qi/Prana)</div>
                    <div><strong>0,6 Hz:</strong> Zellenergie, ATP-Synthese</div>
                    <div><strong>1,2 Hz:</strong> Immunsystem-Grundfrequenz</div>
                    <div><strong>2,4 Hz:</strong> Stress-Regulation, Nebennieren</div>
                    <div><strong>3,2 Hz:</strong> Stoffwechsel-Grundfrequenz</div>
                    <div><strong>4,8 Hz:</strong> Hormon-Regulation</div>
                    <div><strong>6,4 Hz:</strong> Nervensystem-Grundregulation</div>
                    <div><strong>7,8 Hz:</strong> Gehirn-Grundfrequenz (Alpha-Bereich)</div>
                    <div><strong>9,6 Hz:</strong> Biorhythmus, circadiane Steuerung</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="herz-kreislauf" className="bg-white/5 border-white/20 rounded-lg">
              <AccordionTrigger className="text-white px-4">
                Herz-Kreislauf-System (10-20 Hz)
              </AccordionTrigger>
              <AccordionContent className="text-white px-4 pb-4">
                <div className="bg-red-500/20 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div><strong>10,0 Hz:</strong> Herz-Grundfrequenz</div>
                    <div><strong>11,5 Hz:</strong> Herzrhythmus-Regulation</div>
                    <div><strong>13,0 Hz:</strong> Blutdruck-Regulation</div>
                    <div><strong>14,5 Hz:</strong> Arterien, Durchblutung</div>
                    <div><strong>16,0 Hz:</strong> Venen, Rückfluss</div>
                    <div><strong>17,5 Hz:</strong> Kapillaren, Mikrozirkulation</div>
                    <div><strong>19,0 Hz:</strong> Lymphsystem</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="verdauung" className="bg-white/5 border-white/20 rounded-lg">
              <AccordionTrigger className="text-white px-4">
                Verdauungssystem (20-32 Hz)
              </AccordionTrigger>
              <AccordionContent className="text-white px-4 pb-4">
                <div className="bg-yellow-500/20 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div><strong>20,5 Hz:</strong> Magen-Grundfrequenz</div>
                    <div><strong>22,0 Hz:</strong> Magensäure-Regulation</div>
                    <div><strong>23,5 Hz:</strong> Dünndarm</div>
                    <div><strong>25,0 Hz:</strong> Dickdarm</div>
                    <div><strong>26,5 Hz:</strong> Leber-Grundfrequenz</div>
                    <div><strong>28,0 Hz:</strong> Gallenblase</div>
                    <div><strong>29,5 Hz:</strong> Bauchspeicheldrüse</div>
                    <div><strong>31,0 Hz:</strong> Milz</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="schwermetalle" className="bg-white/5 border-white/20 rounded-lg">
              <AccordionTrigger className="text-white px-4">
                Schwermetall-Detox
              </AccordionTrigger>
              <AccordionContent className="text-white px-4 pb-4">
                <div className="bg-orange-500/20 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div><strong>47,5 Hz:</strong> Quecksilber (Amalgam, Fisch)</div>
                    <div><strong>71,5 Hz:</strong> Blei (Rohre, Farben)</div>
                    <div><strong>44,0 Hz:</strong> Cadmium (Zigaretten, Batterien)</div>
                    <div><strong>12,5 Hz:</strong> Aluminium (Deos, Kochgeschirr)</div>
                    <div><strong>75,0 Hz:</strong> Arsen (Pestizide, Holzschutzmittel)</div>
                    <div><strong>58,5 Hz:</strong> Kupfer (Wasserrohre, Spirale)</div>
                    <div><strong>82,0 Hz:</strong> Nickel (Schmuck, Prothesen)</div>
                    <div><strong>91,5 Hz:</strong> Chrom (Leder, Farben)</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pathogene" className="bg-white/5 border-white/20 rounded-lg">
              <AccordionTrigger className="text-white px-4">
                Pathogene Mikroorganismen
              </AccordionTrigger>
              <AccordionContent className="text-white px-4 pb-4">
                <div className="space-y-4">
                  <div className="bg-green-500/20 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Bakterien:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div><strong>380,0 Hz:</strong> Streptococcus pyogenes</div>
                      <div><strong>382,5 Hz:</strong> Staphylococcus aureus</div>
                      <div><strong>385,0 Hz:</strong> Escherichia coli</div>
                      <div><strong>390,0 Hz:</strong> Pseudomonas aeruginosa</div>
                      <div><strong>400,0 Hz:</strong> Borrelia burgdorferi (Lyme)</div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-500/20 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Viren:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div><strong>410,0 Hz:</strong> Influenza A</div>
                      <div><strong>415,0 Hz:</strong> Rhinovirus (Erkältung)</div>
                      <div><strong>420,0 Hz:</strong> Herpes simplex 1</div>
                      <div><strong>427,5 Hz:</strong> Epstein-Barr-Virus</div>
                    </div>
                  </div>

                  <div className="bg-amber-500/20 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Pilze:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div><strong>440,0 Hz:</strong> Candida albicans</div>
                      <div><strong>442,5 Hz:</strong> Aspergillus niger</div>
                      <div><strong>445,0 Hz:</strong> Penicillium</div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default FrequenzKompendium;
