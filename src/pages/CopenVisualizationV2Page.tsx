import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CopenAlgorithmVisualizationV2 from "@/components/CopenAlgorithmVisualizationV2";
import { WorkerStatusMonitor } from "@/components/WorkerStatusMonitor";
import { SessionStatusList } from "@/components/SessionStatusList";
import AnalysisArchiveCloud from "@/components/AnalysisArchiveCloud";
import SessionRecoveryDashboard from "@/components/SessionRecoveryDashboard";

const CopenVisualizationV2Page = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          ← Zurück zur Übersicht
        </Button>
        
        {/* Modul-spezifisches Session Dashboard */}
        <div className="mb-6">
          <SessionRecoveryDashboard 
            sourceModuleFilter={['copen_v2', 'word_energy', 'session_transfer']}
            showControls={true}
            title="Copen V2 & Wortenergie Sessions"
            compact={true}
          />
        </div>
        
        <CopenAlgorithmVisualizationV2 />
        
        <div className="mt-6 space-y-4">
          <AnalysisArchiveCloud />
          <SessionStatusList />
          <WorkerStatusMonitor />
        </div>
      </div>
    </div>
  );
};

export default CopenVisualizationV2Page;
