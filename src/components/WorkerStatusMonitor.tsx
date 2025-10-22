import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Cpu, HardDrive, Network, Clock, Zap } from 'lucide-react';
import { collectHardwareMetrics, type HardwareMetrics } from '@/utils/hardwareAlgorithms';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const WorkerStatusMonitor: React.FC = () => {
  const [hardwareMetrics, setHardwareMetrics] = useState<HardwareMetrics | null>(null);
  const [activeSessions, setActiveSessions] = useState<number>(0);
  const [workerStatus, setWorkerStatus] = useState<'active' | 'idle' | 'error'>('idle');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { user } = useAuth();

  useEffect(() => {
    // Hardware-Metriken alle 5 Sekunden aktualisieren
    const updateHardwareMetrics = async () => {
      try {
        const metrics = await collectHardwareMetrics();
        setHardwareMetrics(metrics);
      } catch (error) {
        console.error('Fehler beim Sammeln der Hardware-Metriken:', error);
      }
    };

    updateHardwareMetrics();
    const hwInterval = setInterval(updateHardwareMetrics, 5000);

    return () => clearInterval(hwInterval);
  }, []);

  useEffect(() => {
    if (!user) return;

    // Worker-Status und aktive Sessions überwachen
    const checkWorkerStatus = async () => {
      try {
        const { data: sessions, error } = await supabase
          .from('harmonization_sessions_v2')
          .select('id, status, job_last_heartbeat')
          .eq('user_id', user.id)
          .in('status', ['running', 'pending']);

        if (error) throw error;

        setActiveSessions(sessions?.length || 0);
        
        // Worker-Status basierend auf Heartbeat-Aktivität
        if (sessions && sessions.length > 0) {
          const recentHeartbeat = sessions.some(s => {
            if (!s.job_last_heartbeat) return false;
            const heartbeat = new Date(s.job_last_heartbeat);
            const now = new Date();
            return (now.getTime() - heartbeat.getTime()) < 120000; // Letzte 2 Minuten
          });
          
          setWorkerStatus(recentHeartbeat ? 'active' : 'idle');
        } else {
          setWorkerStatus('idle');
        }

        setLastUpdate(new Date());
      } catch (error) {
        console.error('Fehler beim Abrufen des Worker-Status:', error);
        setWorkerStatus('error');
      }
    };

    checkWorkerStatus();
    const statusInterval = setInterval(checkWorkerStatus, 10000);

    // Realtime-Subscription für Session-Updates
    const channel = supabase
      .channel('worker-status-monitor')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'harmonization_sessions_v2',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          checkWorkerStatus();
        }
      )
      .subscribe();

    return () => {
      clearInterval(statusInterval);
      supabase.removeChannel(channel);
    };
  }, [user]);

  const getStatusColor = (status: typeof workerStatus) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: typeof workerStatus) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'idle': return 'Bereit';
      case 'error': return 'Fehler';
      default: return 'Unbekannt';
    }
  };

  const formatMetric = (value: number) => {
    return (value * 100).toFixed(1);
  };

  return (
    <Card className="w-full">
      <CardHeader className="py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="w-4 h-4" />
            System-Monitor
          </CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <Zap className="w-3 h-3" />
              <span className="font-semibold">{activeSessions}</span>
              <span className="text-muted-foreground">Sessions</span>
            </div>
            <Badge className={getStatusColor(workerStatus)}>
              {getStatusLabel(workerStatus)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-3">
        {/* Hardware-Metriken - Kompakt */}
        {hardwareMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Cpu className="w-3 h-3 text-blue-500" />
                <span>CPU</span>
              </div>
              <div className="font-mono text-sm font-semibold">{formatMetric(hardwareMetrics.cpuQuantumJitter)}%</div>
              <Progress value={hardwareMetrics.cpuQuantumJitter * 100} className="h-1" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <HardDrive className="w-3 h-3 text-purple-500" />
                <span>RAM</span>
              </div>
              <div className="font-mono text-sm font-semibold">{formatMetric(hardwareMetrics.ramEntropy)}%</div>
              <Progress value={hardwareMetrics.ramEntropy * 100} className="h-1" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3 text-green-500" />
                <span>Zeit</span>
              </div>
              <div className="font-mono text-sm font-semibold">{formatMetric(hardwareMetrics.timeSourceCoherence)}%</div>
              <Progress value={hardwareMetrics.timeSourceCoherence * 100} className="h-1" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Network className="w-3 h-3 text-orange-500" />
                <span>Netzwerk</span>
              </div>
              <div className="font-mono text-sm font-semibold">{formatMetric(hardwareMetrics.networkLatency)}%</div>
              <Progress value={hardwareMetrics.networkLatency * 100} className="h-1" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Activity className="w-3 h-3 text-primary" />
                <span>Score</span>
              </div>
              <div className="font-mono text-sm font-semibold text-primary">{formatMetric(hardwareMetrics.combinedScore)}%</div>
              <Progress value={hardwareMetrics.combinedScore * 100} className="h-1" />
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
          Hardware-Metriken • Aktualisiert: {lastUpdate.toLocaleTimeString('de-DE')}
        </div>
      </CardContent>
    </Card>
  );
};
