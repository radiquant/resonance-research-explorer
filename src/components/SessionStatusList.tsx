import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Activity, Clock, Zap, Timer, Pause, Play, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface SessionStatus {
  id: string;
  word: string;
  status: string;
  job_last_heartbeat: string | null;
  job_started_at: string | null;
  progress: number;
  patient_id: string;
  remaining_seconds: number | null;
  duration_seconds: number;
  pulse_pause_active: boolean | null;
  pulse_seconds: number | null;
  pause_seconds: number | null;
  copen_rate: string | null;
  tested_potency: string | null;
  created_at: string;
}

interface PatientInfo {
  id: string;
  first_name: string;
  last_name: string;
}

export const SessionStatusList: React.FC = () => {
  const [sessions, setSessions] = useState<SessionStatus[]>([]);
  const [selectedSession, setSelectedSession] = useState<SessionStatus | null>(null);
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const loadSessions = async () => {
      const { data, error } = await supabase
        .from('harmonization_sessions_v2')
        .select('id, word, status, job_last_heartbeat, job_started_at, progress, patient_id, remaining_seconds, duration_seconds, pulse_pause_active, pulse_seconds, pause_seconds, copen_rate, tested_potency, created_at')
        .eq('user_id', user.id)
        .in('status', ['running', 'pending', 'paused'])
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSessions(data as SessionStatus[]);
      }
    };

    loadSessions();
    const interval = setInterval(loadSessions, 5000);

    // Realtime subscription
    const channel = supabase
      .channel('session-status-list')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'harmonization_sessions_v2',
          filter: `user_id=eq.${user.id}`
        },
        () => loadSessions()
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Lade Patienteninfo wenn Session ausgewählt wird
  useEffect(() => {
    if (!selectedSession) {
      setPatientInfo(null);
      return;
    }

    const loadPatient = async () => {
      const { data } = await supabase
        .from('patients_v2')
        .select('id, first_name, last_name')
        .eq('id', selectedSession.patient_id)
        .maybeSingle();
      
      if (data) {
        setPatientInfo(data);
      }
    };

    loadPatient();
  }, [selectedSession]);

  const getWorkerStatus = (session: SessionStatus): 'active' | 'idle' | 'pending' | 'paused' => {
    if (session.status === 'pending') return 'pending';
    if (session.status === 'paused') return 'paused';
    if (!session.job_last_heartbeat) return 'idle';
    
    const heartbeat = new Date(session.job_last_heartbeat);
    const now = new Date();
    const diff = now.getTime() - heartbeat.getTime();
    
    return diff < 120000 ? 'active' : 'idle';
  };

  const getStatusBadge = (status: 'active' | 'idle' | 'pending' | 'paused') => {
    const colors = {
      active: 'bg-green-500',
      idle: 'bg-yellow-500',
      pending: 'bg-blue-500',
      paused: 'bg-orange-500'
    };
    const labels = {
      active: 'Aktiv',
      idle: 'Bereit',
      pending: 'Wartet',
      paused: 'Pausiert'
    };
    return <Badge className={colors[status]}>{labels[status]}</Badge>;
  };

  const formatDuration = (seconds: number | null): string => {
    if (seconds === null || seconds === undefined) return '--:--:--';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const handleSessionClick = (session: SessionStatus) => {
    setSelectedSession(session);
    setDialogOpen(true);
  };

  if (sessions.length === 0) return null;

  return (
    <>
      <Card className="w-full">
        <CardHeader className="py-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Session-Status ({sessions.length} aktiv)
          </CardTitle>
        </CardHeader>
        <CardContent className="py-3">
          <div className="space-y-1">
            {sessions.map(session => {
              const workerStatus = getWorkerStatus(session);
              return (
                <div 
                  key={session.id} 
                  className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded text-xs cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSessionClick(session)}
                >
                  <div className="flex-1 min-w-0 mr-2">
                    <div className="font-medium break-words line-clamp-1">{session.word}</div>
                    <div className="text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span>{session.progress}%</span>
                      <span className="flex items-center gap-1">
                        <Timer className="w-3 h-3" />
                        {formatDuration(session.remaining_seconds)}
                      </span>
                      {session.pulse_pause_active && (
                        <span className="flex items-center gap-1 text-purple-400">
                          <Zap className="w-3 h-3" />
                          P/P
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(workerStatus)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            Klicken für Details
          </div>
        </CardContent>
      </Card>

      {/* Session Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Session-Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedSession && (
            <div className="space-y-4">
              {/* Wort/Rate */}
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Wort / Rate</div>
                <div className="font-medium break-words">{selectedSession.word}</div>
              </div>

              {/* Patient */}
              {patientInfo && (
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <User className="w-4 h-4 text-blue-500" />
                  <div>
                    <div className="text-xs text-muted-foreground">Patient</div>
                    <div className="font-medium">{patientInfo.first_name} {patientInfo.last_name}</div>
                  </div>
                </div>
              )}

              {/* Fortschritt */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fortschritt</span>
                  <span className="font-semibold">{selectedSession.progress}%</span>
                </div>
                <Progress value={selectedSession.progress} className="h-3" />
              </div>

              {/* Zeit-Informationen */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Timer className="w-3 h-3" />
                    Verbleibend
                  </div>
                  <div className="font-semibold text-lg">{formatDuration(selectedSession.remaining_seconds)}</div>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Clock className="w-3 h-3" />
                    Gesamtdauer
                  </div>
                  <div className="font-semibold text-lg">{formatDuration(selectedSession.duration_seconds)}</div>
                </div>
              </div>

              {/* Pulse/Pause Modus */}
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className={`w-4 h-4 ${selectedSession.pulse_pause_active ? 'text-purple-500' : 'text-muted-foreground'}`} />
                  <span className="text-sm font-medium">Pulse/Pause Modus</span>
                  <Badge className={selectedSession.pulse_pause_active ? 'bg-purple-500' : 'bg-muted'}>
                    {selectedSession.pulse_pause_active ? 'Aktiv' : 'Inaktiv'}
                  </Badge>
                </div>
                
                {selectedSession.pulse_pause_active && (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Play className="w-4 h-4 text-green-500" />
                      <span>Impuls: {selectedSession.pulse_seconds}s</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Pause className="w-4 h-4 text-orange-500" />
                      <span>Pause: {selectedSession.pause_seconds}s</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Zusätzliche Infos */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {selectedSession.copen_rate && (
                  <div className="p-2 bg-muted/30 rounded">
                    <div className="text-xs text-muted-foreground">Klienten-Rate</div>
                    <div className="font-mono font-medium">{selectedSession.copen_rate}</div>
                  </div>
                )}
                {selectedSession.tested_potency && (
                  <div className="p-2 bg-muted/30 rounded">
                    <div className="text-xs text-muted-foreground">Potenz</div>
                    <div className="font-medium">{selectedSession.tested_potency}</div>
                  </div>
                )}
              </div>

              {/* Worker-Status */}
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="text-sm">Worker-Status</div>
                {getStatusBadge(getWorkerStatus(selectedSession))}
              </div>

              {/* Letzter Heartbeat */}
              {selectedSession.job_last_heartbeat && (
                <div className="text-xs text-muted-foreground text-center">
                  Letzter Heartbeat: {new Date(selectedSession.job_last_heartbeat).toLocaleString('de-DE')}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
