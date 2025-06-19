
import { useEffect } from 'react';
import { useRadionik } from '@/contexts/RadionikContext';
import { useToast } from '@/components/ui/use-toast';

export function useAnalyses() {
  const { state, actions } = useRadionik();
  const { toast } = useToast();

  useEffect(() => {
    if (state.analyses.length === 0) {
      actions.loadAnalyses();
    }
  }, []);

  const startAnalysis = async (clientId: string, type: string) => {
    try {
      await actions.startAnalysis(clientId, type);
      toast({
        title: "Analyse gestartet",
        description: `${type} wurde erfolgreich gestartet.`,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Analyse konnte nicht gestartet werden.",
        variant: "destructive",
      });
    }
  };

  const updateAnalysisProgress = (analysisId: string, progress: number) => {
    const analysis = state.analyses.find(a => a.id === analysisId);
    if (analysis) {
      const updatedAnalysis = { ...analysis, progress };
      if (progress >= 100) {
        updatedAnalysis.status = 'completed';
      }
      actions.updateAnalysis(updatedAnalysis);
    }
  };

  return {
    analyses: state.analyses,
    isLoading: state.isLoading,
    error: state.error,
    startAnalysis,
    updateAnalysisProgress,
    selectedAnalysis: state.selectedAnalysis,
  };
}
