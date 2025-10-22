import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock } from 'lucide-react';
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
}

export const SessionStatusList: React.FC = () => {
  const [sessions, setSessions] = useState<SessionStatus[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const loadSessions = async () => {
      const { data, error } = await supabase
        .from('harmonization_sessions_v2')
        .select('id, word, status, job_last_heartbeat, job_started_at, progress, patient_id')
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

  const getWorkerStatus = (session: SessionStatus): 'active' | 'idle' | 'pending' => {
    if (session.status === 'pending') return 'pending';
    if (!session.job_last_heartbeat) return 'idle';
    
    const heartbeat = new Date(session.job_last_heartbeat);
    const now = new Date();
    const diff = now.getTime() - heartbeat.getTime();
    
    return diff < 120000 ? 'active' : 'idle'; // 2 Minuten
  };

  const getStatusBadge = (status: 'active' | 'idle' | 'pending') => {
    const colors = {
      active: 'bg-green-500',
      idle: 'bg-yellow-500',
      pending: 'bg-blue-500'
    };
    const labels = {
      active: 'Aktiv',
      idle: 'Bereit',
      pending: 'Wartet'
    };
    return <Badge className={colors[status]}>{labels[status]}</Badge>;
  };

  if (sessions.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader className="py-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Worker-Status pro Session
        </CardTitle>
      </CardHeader>
      <CardContent className="py-3">
        <div className="space-y-1">
          {sessions.map(session => {
            const workerStatus = getWorkerStatus(session);
            return (
              <div key={session.id} className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded text-xs">
                <div className="flex-1 min-w-0 mr-2">
                  <div className="font-medium break-words">{session.word}</div>
                  <div className="text-muted-foreground flex items-center gap-2 mt-0.5">
                    <span>{session.progress}%</span>
                    {session.job_last_heartbeat && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(session.job_last_heartbeat).toLocaleTimeString('de-DE')}
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
      </CardContent>
    </Card>
  );
};
