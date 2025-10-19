import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Archive, Trash2, Eye, Play, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface HarmonizationSession {
  id: string;
  user_id: string;
  word: string;
  tested_potency: string | null;
  duration_seconds: number;
  status: string;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

interface HarmonizationArchiveCloudProps {
  patientId?: string;
  onReactivate?: (session: HarmonizationSession) => void;
}

const HarmonizationArchiveCloud: React.FC<HarmonizationArchiveCloudProps> = ({ 
  patientId, 
  onReactivate 
}) => {
  const [sessions, setSessions] = useState<HarmonizationSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadSessions();

      // Realtime-Updates
      const channel = supabase
        .channel('harmonization-sessions-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'harmonization_sessions',
          },
          () => {
            loadSessions();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, patientId]);

  const loadSessions = async () => {
    try {
      let query = supabase
        .from('harmonization_sessions')
        .select('*')
        .in('status', ['completed', 'cancelled'])
        .order('completed_at', { ascending: false });

      if (patientId) {
        query = query.eq('patient_id', patientId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSessions(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sitzung wirklich löschen? (DSGVO-konform)')) return;

    try {
      const { error } = await supabase
        .from('harmonization_sessions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Erfolg",
        description: "Sitzung gelöscht",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message,
      });
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}min`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)}h`;
    return `${Math.round(seconds / 86400)} Tage`;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      cancelled: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
      paused: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
      running: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
    };
    return badges[status as keyof typeof badges] || badges.completed;
  };

  const getStatusText = (status: string) => {
    const texts = {
      completed: 'Abgeschlossen',
      cancelled: 'Abgebrochen',
      paused: 'Pausiert',
      running: 'Läuft'
    };
    return texts[status as keyof typeof texts] || status;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Archive className="h-5 w-5" />
          Harmonisierungs-Archiv (Cloud)
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ({sessions.length} Sitzungen)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Keine archivierten Sitzungen vorhanden
          </p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {sessions.map(session => (
              <div key={session.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{session.word}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${getStatusBadge(session.status)}`}>
                        {getStatusText(session.status)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Dauer: {formatDuration(session.duration_seconds)} •{' '}
                      {session.completed_at && new Date(session.completed_at).toLocaleString('de-DE')}
                    </div>
                    {expandedId === session.id && (
                      <div className="mt-2 p-2 bg-muted rounded text-sm space-y-1">
                        <div>Status: <strong>{getStatusText(session.status)}</strong></div>
                        {session.tested_potency && (
                          <div className="pt-1 border-t border-border">
                            Getestete Potenz: <strong className="text-primary">{session.tested_potency}</strong>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {onReactivate && (
                      <Button
                        onClick={() => onReactivate(session)}
                        variant="ghost"
                        size="sm"
                        title="Harmonisierung reaktivieren"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      onClick={() => setExpandedId(expandedId === session.id ? null : session.id)}
                      variant="ghost"
                      size="sm"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(session.id)}
                      variant="ghost"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HarmonizationArchiveCloud;
