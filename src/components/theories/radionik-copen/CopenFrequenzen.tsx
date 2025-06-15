
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CopenFrequenzen = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Copen Frequenz-Kompendium</CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-cyan-300">Standard Copen-Raten</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-cyan-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-cyan-200">LEBER (D6):</span>
                  <span className="text-gray-300">50.398.960</span>
                </div>
                <div className="bg-cyan-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-cyan-200">NIERE (D6):</span>
                  <span className="text-gray-300">32.951.280</span>
                </div>
                <div className="bg-cyan-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-cyan-200">HERZ (D6):</span>
                  <span className="text-gray-300">28.657.320</span>
                </div>
                <div className="bg-cyan-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-cyan-200">LUNGE (D6):</span>
                  <span className="text-gray-300">42.635.520</span>
                </div>
                <div className="bg-cyan-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-cyan-200">GEHIRN (D6):</span>
                  <span className="text-gray-300">60.466.176</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-300">Pathogen-Raten</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-orange-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-orange-200">CANDIDA (C12):</span>
                  <span className="text-gray-300">8.239.584.000</span>
                </div>
                <div className="bg-orange-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-orange-200">BAKTERIEN (C6):</span>
                  <span className="text-gray-300">936.747.600</span>
                </div>
                <div className="bg-orange-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-orange-200">VIREN (C30):</span>
                  <span className="text-gray-300">1.847×10¹²</span>
                </div>
                <div className="bg-orange-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-orange-200">PARASITEN (C15):</span>
                  <span className="text-gray-300">2.156×10¹¹</span>
                </div>
                <div className="bg-orange-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-orange-200">TOXINE (LM6):</span>
                  <span className="text-gray-300">4.521×10¹⁸</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-300">Emotional-Mentale Raten</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-green-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-green-200">ANGST (D12):</span>
                  <span className="text-gray-300">46.368.000</span>
                </div>
                <div className="bg-green-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-green-200">STRESS (D30):</span>
                  <span className="text-gray-300">174.960.000</span>
                </div>
                <div className="bg-green-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-green-200">TRAUMA (C6):</span>
                  <span className="text-gray-300">621.831.600</span>
                </div>
                <div className="bg-green-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-green-200">DEPRESSION (C12):</span>
                  <span className="text-gray-300">1.447×10¹⁰</span>
                </div>
                <div className="bg-green-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-green-200">BLOCKADE (LM3):</span>
                  <span className="text-gray-300">7.896×10¹⁶</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-300">Therapeutische Raten</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-purple-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-purple-200">HEILUNG (C30):</span>
                  <span className="text-gray-300">4.813×10²⁰</span>
                </div>
                <div className="bg-purple-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-purple-200">REGENERATION (C15):</span>
                  <span className="text-gray-300">6.241×10¹⁵</span>
                </div>
                <div className="bg-purple-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-purple-200">ENERGIE (D6):</span>
                  <span className="text-gray-300">57.239.520</span>
                </div>
                <div className="bg-purple-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-purple-200">BALANCE (C6):</span>
                  <span className="text-gray-300">433.494.000</span>
                </div>
                <div className="bg-purple-900/20 p-2 rounded grid grid-cols-2">
                  <span className="text-purple-200">HARMONIE (LM6):</span>
                  <span className="text-gray-300">1.247×10²¹</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-indigo-900/30 rounded-lg">
            <h4 className="text-lg font-semibold text-indigo-200 mb-2">Anwendungshinweise</h4>
            <p className="text-gray-300">
              Die hier aufgeführten Copen-Raten sind authentische Berechnungen basierend auf dem 
              Original-Algorithmus von 1978. Sie dienen als Referenz für radionische Praktiker 
              und sollten stets individuell überprüft und an den Patienten angepasst werden.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CopenFrequenzen;
