import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import {
  Play,
  Pause,
  Square,
  Trash2,
  Clock,
  Timer,
  Zap,
  Activity,
  Save,
  FolderOpen,
  Plus,
  Loader2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  BookTemplate,
  Layers
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { getSessionTable, type SourceModule } from '@/utils/sessionTableRouter';

// ========================
// INTERFACES
// ========================

interface HarmonizationItem {
  word: string;
  rate: number;
  potency?: string;
}

interface SessionStatus {
  id: string;
  word: string;
  status: 'queued' | 'pending' | 'running' | 'paused' | 'completed' | 'cancelled';
  progress: number;
  remaining_seconds: number | null;
  duration_seconds: number;
  job_last_heartbeat: string | null;
  pulse_pause_active: boolean | null;
  pulse_seconds: number | null;
  pause_seconds: number | null;
  copen_rate: string | null;
  created_at: string;
}

interface Template {
  id: string;
  name: string;
  description: string | null;
  sessions: HarmonizationItem[];
  created_at: string;
}

interface HarmonizationManagerProps {
  patientId: string;
  clientName: string;
  clientRate?: string;
  analysisResults?: HarmonizationItem[];
  sourceModule?: string; // z.B. 'word_energy', 'morphic_field', 'copen_v2' - für Session-Isolation
}

// ========================
// SESSION CARD COMPONENT (memoized for realtime countdown)
// ========================

interface SessionCardProps {
  session: SessionStatus;
  nowTs: number;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onSelect: (session: SessionStatus) => void;
  formatDuration: (seconds: number | null) => string;
  getStatusBadge: (status: string) => React.ReactNode;
}

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  nowTs,
  onStart,
  onPause,
  onResume,
  onSelect,
  formatDuration,
  getStatusBadge
}) => {
  // Calculate remaining seconds with live countdown
  const getDisplayRemainingSeconds = (): number => {
    const base = session.remaining_seconds ?? session.duration_seconds;
    if (session.status !== 'running' || !session.job_last_heartbeat) return base;

    const heartbeatTs = new Date(session.job_last_heartbeat).getTime();
    let elapsed = Math.max(0, Math.floor((nowTs - heartbeatTs) / 1000));

    // Apply pulse/pause calculation
    if (session.pulse_pause_active && session.pulse_seconds && session.pause_seconds) {
      const cycleLength = session.pulse_seconds + session.pause_seconds;
      const cycles = Math.floor(elapsed / cycleLength);
      const remainder = elapsed % cycleLength;
      elapsed = cycles * session.pulse_seconds + Math.min(remainder, session.pulse_seconds);
    }

    return Math.max(0, base - elapsed);
  };

  // Determine if currently in pulse or pause phase
  const getPulsePhase = (): 'pulse' | 'pause' | null => {
    if (!session.pulse_pause_active || !session.pulse_seconds || !session.pause_seconds) return null;
    if (session.status !== 'running' || !session.job_last_heartbeat) return null;

    const heartbeatTs = new Date(session.job_last_heartbeat).getTime();
    const elapsed = Math.max(0, Math.floor((nowTs - heartbeatTs) / 1000));
    const cycleLength = session.pulse_seconds + session.pause_seconds;
    const positionInCycle = elapsed % cycleLength;

    return positionInCycle < session.pulse_seconds ? 'pulse' : 'pause';
  };

  const remaining = getDisplayRemainingSeconds();
  const progressPercent = session.duration_seconds > 0
    ? Math.round(((session.duration_seconds - remaining) / session.duration_seconds) * 100)
    : session.progress;
  const pulsePhase = getPulsePhase();

  return (
    <div
      className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={() => onSelect(session)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 min-w-0 mr-3">
          <p className="font-medium text-sm truncate">{session.word}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
            <span>{progressPercent}%</span>
            {session.pulse_pause_active && (
              <span className="flex items-center gap-1">
                {pulsePhase === 'pulse' ? (
                  <Zap className="w-3 h-3 text-green-400 animate-pulse" />
                ) : pulsePhase === 'pause' ? (
                  <Pause className="w-3 h-3 text-orange-400 animate-pulse" />
                ) : (
                  <Zap className="w-3 h-3 text-purple-400" />
                )}
                <span className={pulsePhase === 'pulse' ? 'text-green-400' : pulsePhase === 'pause' ? 'text-orange-400' : 'text-purple-400'}>
                  {session.pulse_seconds}s/{session.pause_seconds}s
                </span>
              </span>
            )}
          </div>
        </div>
        {/* Prominenter Timer */}
        <div className="flex items-center gap-2 mr-3">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md font-mono text-sm ${
            session.status === 'running' 
              ? 'bg-green-500/20 text-green-400' 
              : session.status === 'paused'
              ? 'bg-orange-500/20 text-orange-400'
              : 'bg-muted text-muted-foreground'
          }`}>
            <Timer className="w-4 h-4" />
            <span className="font-bold">{formatDuration(remaining)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(session.status)}
          
          {session.status === 'queued' && (
            <Button size="sm" variant="ghost" onClick={(e) => {
              e.stopPropagation();
              onStart(session.id);
            }}>
              <Play className="w-4 h-4" />
            </Button>
          )}
          {session.status === 'running' && (
            <Button size="sm" variant="ghost" onClick={(e) => {
              e.stopPropagation();
              onPause(session.id);
            }}>
              <Pause className="w-4 h-4" />
            </Button>
          )}
          {session.status === 'paused' && (
            <Button size="sm" variant="ghost" onClick={(e) => {
              e.stopPropagation();
              onResume(session.id);
            }}>
              <Play className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <Progress value={progressPercent} className="h-1" />
    </div>
  );
};

// ========================
// MAIN COMPONENT
// ========================

const HarmonizationManager: React.FC<HarmonizationManagerProps> = ({
  patientId,
  clientName,
  clientRate,
  analysisResults = [],
  sourceModule = 'harmonization_manager'
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Bestimme die korrekte Tabelle basierend auf dem Modul
  const sessionTable = getSessionTable(sourceModule as SourceModule);

  // ========================
  // STATE
  // ========================
  
  // Sessions State
  const [sessions, setSessions] = useState<SessionStatus[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  
  // New Session State
  const [manualInput, setManualInput] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [pulsePauseActive, setPulsePauseActive] = useState(false);
  const [pulseSeconds, setPulseSeconds] = useState(21);
  const [pauseSeconds, setPauseSeconds] = useState(42);
  const [itemCount, setItemCount] = useState<21 | 42 | 63>(21);
  const [isCreating, setIsCreating] = useState(false);
  
  // Templates State
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDesc, setNewTemplateDesc] = useState('');
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  
  // Dialog State
  const [selectedSession, setSelectedSession] = useState<SessionStatus | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  
  // Live Timer
  const [nowTs, setNowTs] = useState(() => Date.now());

  // ========================
  // DATA LOADING
  // ========================

  const loadSessions = useCallback(async () => {
    if (!user || !patientId) return;
    
    try {
      // Verwende die korrekte Tabelle basierend auf sourceModule
      // Für morphic_field: morphic_field_sessions, sonst: harmonization_sessions_v2
      const tableName = sourceModule === 'morphic_field' ? 'morphic_field_sessions' : 'harmonization_sessions_v2';
      
      const baseQuery = supabase
        .from(tableName as 'harmonization_sessions_v2')
        .select('id, word, status, progress, remaining_seconds, duration_seconds, job_last_heartbeat, pulse_pause_active, pulse_seconds, pause_seconds, copen_rate, created_at')
        .eq('user_id', user.id)
        .eq('patient_id', patientId)
        .in('status', ['queued', 'pending', 'running', 'paused'])
        .order('created_at', { ascending: false });

      // Filter nach source_module nur für harmonization_sessions_v2 (nicht für morphic_field_sessions)
      const query = tableName === 'harmonization_sessions_v2' && sourceModule
        ? baseQuery.eq('source_module', sourceModule)
        : baseQuery;

      const { data, error } = await query;

      if (error) throw error;
      setSessions(data as SessionStatus[] || []);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setIsLoadingSessions(false);
    }
  }, [user, patientId, sourceModule]);

  const loadTemplates = useCallback(async () => {
    if (!user || !patientId) return;
    
    setIsLoadingTemplates(true);
    try {
      const { data, error } = await supabase
        .from('harmonization_templates_v2')
        .select('*')
        .eq('user_id', user.id)
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates((data || []).map(t => ({
        ...t,
        sessions: t.sessions as unknown as HarmonizationItem[]
      })));
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setIsLoadingTemplates(false);
    }
  }, [user, patientId]);

  // ========================
  // EFFECTS
  // ========================

  // Load data on mount
  useEffect(() => {
    loadSessions();
    loadTemplates();
  }, [loadSessions, loadTemplates]);

  // Track previous active sessions to detect completions (without re-subscribing on every poll)
  const previousSessionIdsRef = useRef<Set<string>>(new Set());
  const completionToastIdsRef = useRef<Set<string>>(new Set());
  const completionNudgeIdsRef = useRef<Set<string>>(new Set());

  // Polling + Realtime for sessions with completion detection
  useEffect(() => {
    if (!user || !patientId) return;

    const checkForCompletions = async () => {
      try {
        const tableName = sourceModule === 'morphic_field' ? 'morphic_field_sessions' : 'harmonization_sessions_v2';
        
        const baseQuery = supabase
          .from(tableName as 'harmonization_sessions_v2')
          .select('id, word, status, progress, remaining_seconds, duration_seconds, job_last_heartbeat, pulse_pause_active, pulse_seconds, pause_seconds, copen_rate, created_at')
          .eq('user_id', user.id)
          .eq('patient_id', patientId)
          .in('status', ['queued', 'pending', 'running', 'paused'])
          .order('created_at', { ascending: false });

        const query = tableName === 'harmonization_sessions_v2' && sourceModule
          ? baseQuery.eq('source_module', sourceModule)
          : baseQuery;

        const { data, error } = await query;

        if (error) throw error;

        const newData = (data as SessionStatus[]) || [];
        const newIds = new Set(newData.map((s) => s.id));
        const prevIds = previousSessionIdsRef.current;
        const removedIds = Array.from(prevIds).filter((id) => !newIds.has(id));

        if (removedIds.length > 0) {
          const { data: removedSessions } = await supabase
            .from(tableName as 'harmonization_sessions_v2')
            .select('id, word, status')
            .in('id', removedIds);

          (removedSessions || []).forEach((s: any) => {
            if (s.status === 'completed' && !completionToastIdsRef.current.has(s.id)) {
              completionToastIdsRef.current.add(s.id);
              toast({
                title: '✅ Session abgeschlossen',
                description: `"${String(s.word || '').substring(0, 50)}..." ist fertig`,
              });
            }
          });
        }

        previousSessionIdsRef.current = newIds;
        setSessions(newData);
      } catch (error) {
        console.error('Error loading sessions:', error);
      } finally {
        setIsLoadingSessions(false);
      }
    };

    checkForCompletions();
    const interval = setInterval(checkForCompletions, 5000);

    const channel = supabase
      .channel(`harmonization-manager-${sourceModule}-${patientId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: sourceModule === 'morphic_field' ? 'morphic_field_sessions' : 'harmonization_sessions_v2',
          filter: `patient_id=eq.${patientId}`,
        },
        (payload) => {
          const updated = payload.new as any;

          // Only toast for the current user/patient
          if (
            updated?.user_id === user.id &&
            updated.status === 'completed' &&
            !completionToastIdsRef.current.has(updated.id)
          ) {
            completionToastIdsRef.current.add(updated.id);
            toast({
              title: '✅ Session abgeschlossen',
              description: `"${updated.word?.substring(0, 50) || 'Session'}..." ist fertig`,
            });
          }

          checkForCompletions();
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [user, patientId, toast, sourceModule]);

  // Live timer update
  useEffect(() => {
    const timer = setInterval(() => setNowTs(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // UI-Sync: Wenn der Countdown (UI) auf 0 ist, der Backend-Worker aber noch nicht getickt hat,
  // triggern wir EINMAL den Worker, damit Status/Queue sofort weiterläuft.
  useEffect(() => {
    if (!user || !patientId) return;

    // Clean up IDs that are no longer running
    const runningIds = new Set(sessions.filter((s) => s.status === 'running').map((s) => s.id));
    completionNudgeIdsRef.current.forEach((id) => {
      if (!runningIds.has(id)) completionNudgeIdsRef.current.delete(id);
    });

    const getRemainingForNudge = (session: SessionStatus) => {
      const base = session.remaining_seconds ?? session.duration_seconds;
      if (session.status !== 'running' || !session.job_last_heartbeat) return base;

      const heartbeatTs = new Date(session.job_last_heartbeat).getTime();
      let elapsed = Math.max(0, Math.floor((nowTs - heartbeatTs) / 1000));

      if (session.pulse_pause_active && session.pulse_seconds && session.pause_seconds) {
        const cycleLength = session.pulse_seconds + session.pause_seconds;
        const cycles = Math.floor(elapsed / cycleLength);
        const remainder = elapsed % cycleLength;
        elapsed = cycles * session.pulse_seconds + Math.min(remainder, session.pulse_seconds);
      }

      return Math.max(0, base - elapsed);
    };

    const shouldNudge = sessions.some((s) => {
      if (s.status !== 'running') return false;
      const remaining = getRemainingForNudge(s);
      return remaining <= 0 && !completionNudgeIdsRef.current.has(s.id);
    });

    if (!shouldNudge) return;

    sessions.forEach((s) => {
      if (s.status !== 'running') return;
      const remaining = getRemainingForNudge(s);
      if (remaining <= 0) completionNudgeIdsRef.current.add(s.id);
    });

    supabase.functions.invoke('harmonization-worker').catch((err) => {
      console.error('Failed to nudge harmonization-worker:', err);
    });
  }, [sessions, nowTs, user, patientId]);

  // ========================
  // SESSION ACTIONS
  // ========================

  const createSessions = async (items: HarmonizationItem[]) => {
    if (!user || !patientId || items.length === 0) return;
    
    setIsCreating(true);
    try {
      const totalDurationSeconds = durationMinutes * 60;
      const durationPerItem = Math.floor(totalDurationSeconds / items.length);

      const tableName = sourceModule === 'morphic_field' ? 'morphic_field_sessions' : 'harmonization_sessions_v2';
      
      const sessionsToCreate = items.map(item => {
        const baseSession = {
          user_id: user.id,
          patient_id: patientId,
          word: item.word,
          copen_rate: item.rate?.toString() || clientRate || '',
          tested_potency: item.potency || 'D0',
          duration_seconds: durationPerItem,
          remaining_seconds: durationPerItem,
          status: 'queued' as const,
          pulse_pause_active: pulsePauseActive,
          pulse_seconds: pulsePauseActive ? pulseSeconds : null,
          pause_seconds: pulsePauseActive ? pauseSeconds : null,
          progress: 0,
        };
        
        // Für morphic_field_sessions: kein source_module Feld
        if (tableName === 'morphic_field_sessions') {
          return baseSession;
        }
        
        // Für harmonization_sessions_v2: source_module hinzufügen
        return {
          ...baseSession,
          source_module: sourceModule
        };
      });
      
      const { error } = await supabase
        .from(tableName as 'harmonization_sessions_v2')
        .insert(sessionsToCreate);

      toast({
        title: "Sessions erstellt",
        description: `${items.length} Harmonisierungen vorbereitet (${Math.floor(durationPerItem / 60)}min je)`,
      });

      await loadSessions();
      setManualInput('');
    } catch (error: any) {
      console.error('Error creating sessions:', error);
      toast({
        title: "Fehler",
        description: error.message || "Sessions konnten nicht erstellt werden",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const startSession = async (sessionId: string) => {
    const tableName = sourceModule === 'morphic_field' ? 'morphic_field_sessions' : 'harmonization_sessions_v2';
    
    try {
      const nowIso = new Date().toISOString();
      
      const { data: session } = await supabase
        .from(tableName as 'harmonization_sessions_v2')
        .select('duration_seconds, remaining_seconds')
        .eq('id', sessionId)
        .maybeSingle();

      const { error } = await supabase
        .from(tableName as 'harmonization_sessions_v2')
        .update({
          status: 'running',
          job_started_at: nowIso,
          job_last_heartbeat: nowIso,
          started_at: nowIso,
          remaining_seconds: session?.remaining_seconds ?? session?.duration_seconds ?? 60,
          progress: 0
        })
        .eq('id', sessionId);

      if (error) throw error;

      // Trigger worker
      await supabase.functions.invoke('harmonization-worker');

      toast({
        title: "Session gestartet",
        description: "Harmonisierung läuft",
      });

      await loadSessions();
    } catch (error: any) {
      console.error('Error starting session:', error);
      toast({
        title: "Fehler",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const pauseSession = async (sessionId: string) => {
    const tableName = sourceModule === 'morphic_field' ? 'morphic_field_sessions' : 'harmonization_sessions_v2';
    
    try {
      const { error } = await supabase
        .from(tableName as 'harmonization_sessions_v2')
        .update({ status: 'paused' })
        .eq('id', sessionId);

      if (error) throw error;

      toast({ title: "Session pausiert" });
      await loadSessions();
    } catch (error: any) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    }
  };

  const resumeSession = async (sessionId: string) => {
    const tableName = sourceModule === 'morphic_field' ? 'morphic_field_sessions' : 'harmonization_sessions_v2';
    
    try {
      const { error } = await supabase
        .from(tableName as 'harmonization_sessions_v2')
        .update({ status: 'running' })
        .eq('id', sessionId);

      if (error) throw error;

      toast({ title: "Session fortgesetzt" });
      await loadSessions();
    } catch (error: any) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    }
  };

  const cancelSession = async (sessionId: string) => {
    const tableName = sourceModule === 'morphic_field' ? 'morphic_field_sessions' : 'harmonization_sessions_v2';
    
    try {
      const { error } = await supabase
        .from(tableName as 'harmonization_sessions_v2')
        .update({ status: 'cancelled', completed_at: new Date().toISOString() })
        .eq('id', sessionId);

      if (error) throw error;

      toast({ title: "Session abgebrochen" });
      setCancelDialogOpen(false);
      setDetailDialogOpen(false);
      setSelectedSession(null);
      await loadSessions();
    } catch (error: any) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    }
  };

  const cancelAllSessions = async () => {
    if (!user || !patientId) return;
    const tableName = sourceModule === 'morphic_field' ? 'morphic_field_sessions' : 'harmonization_sessions_v2';
    
    try {
      const { error } = await supabase
        .from(tableName as 'harmonization_sessions_v2')
        .update({ status: 'cancelled', completed_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('patient_id', patientId)
        .in('status', ['queued', 'pending', 'running', 'paused']);

      if (error) throw error;

      toast({ title: "Alle Sessions abgebrochen" });
      await loadSessions();
    } catch (error: any) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    }
  };

  const startAllQueued = async () => {
    const queuedSessions = sessions.filter(s => s.status === 'queued');
    if (queuedSessions.length === 0) return;

    const tableName = sourceModule === 'morphic_field' ? 'morphic_field_sessions' : 'harmonization_sessions_v2';
    const nowIso = new Date().toISOString();
    
    try {
      const { error } = await supabase
        .from(tableName as 'harmonization_sessions_v2')
        .update({
          status: 'running',
          job_started_at: nowIso,
          job_last_heartbeat: nowIso,
          started_at: nowIso,
          progress: 0
        })
        .eq('user_id', user?.id)
        .eq('patient_id', patientId)
        .eq('status', 'queued');

      if (error) throw error;

      // Trigger worker
      await supabase.functions.invoke('harmonization-worker');

      toast({
        title: "Alle Sessions gestartet",
        description: `${queuedSessions.length} Harmonisierungen laufen parallel`,
      });

      await loadSessions();
    } catch (error: any) {
      console.error('Error starting all sessions:', error);
      toast({
        title: "Fehler",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // ========================
  // TEMPLATE ACTIONS
  // ========================

  const saveAsTemplate = async () => {
    if (!user || !patientId || !newTemplateName.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie einen Template-Namen ein",
        variant: "destructive"
      });
      return;
    }

    const items = parseManualInput();
    if (items.length === 0 && analysisResults.length === 0) {
      toast({
        title: "Fehler",
        description: "Keine Items zum Speichern vorhanden",
        variant: "destructive"
      });
      return;
    }

    setIsSavingTemplate(true);
    try {
      const templateItems = items.length > 0 ? items : analysisResults.slice(0, itemCount);
      
      const { error } = await supabase
        .from('harmonization_templates_v2')
        .insert([{
          user_id: user.id,
          patient_id: patientId,
          name: newTemplateName.trim(),
          description: newTemplateDesc.trim() || null,
          sessions: templateItems as any
        }]);

      if (error) throw error;

      toast({
        title: "Template gespeichert",
        description: `"${newTemplateName}" mit ${templateItems.length} Items gespeichert`,
      });

      setNewTemplateName('');
      setNewTemplateDesc('');
      await loadTemplates();
    } catch (error: any) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    } finally {
      setIsSavingTemplate(false);
    }
  };

  const loadTemplate = (template: Template) => {
    createSessions(template.sessions);
    toast({
      title: "Template geladen",
      description: `${template.sessions.length} Sessions aus "${template.name}" erstellt`,
    });
  };

  const deleteTemplate = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('harmonization_templates_v2')
        .delete()
        .eq('id', templateId);

      if (error) throw error;

      toast({ title: "Template gelöscht" });
      await loadTemplates();
    } catch (error: any) {
      toast({ title: "Fehler", description: error.message, variant: "destructive" });
    }
  };

  // ========================
  // HELPERS
  // ========================

  const parseManualInput = (): HarmonizationItem[] => {
    return manualInput
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => ({
        word: `Kohärente Harmonisierung Regulation ${line}`,
        rate: 0 // Will use clientRate
      }));
  };

  const formatDuration = (seconds: number | null): string => {
    if (seconds === null || seconds === undefined) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDisplayRemainingSeconds = (session: SessionStatus): number => {
    const base = session.remaining_seconds ?? session.duration_seconds;
    if (session.status !== 'running' || !session.job_last_heartbeat) return base;

    const heartbeatTs = new Date(session.job_last_heartbeat).getTime();
    let elapsed = Math.max(0, Math.floor((nowTs - heartbeatTs) / 1000));

    // Apply pulse/pause calculation
    if (session.pulse_pause_active && session.pulse_seconds && session.pause_seconds) {
      const cycleLength = session.pulse_seconds + session.pause_seconds;
      const cycles = Math.floor(elapsed / cycleLength);
      const remainder = elapsed % cycleLength;
      elapsed = cycles * session.pulse_seconds + Math.min(remainder, session.pulse_seconds);
    }

    return Math.max(0, base - elapsed);
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { class: string; label: string }> = {
      queued: { class: 'bg-slate-500', label: 'Bereit' },
      pending: { class: 'bg-blue-500', label: 'Wartet' },
      running: { class: 'bg-green-500', label: 'Läuft' },
      paused: { class: 'bg-orange-500', label: 'Pausiert' },
      completed: { class: 'bg-emerald-600', label: 'Fertig' },
      cancelled: { class: 'bg-red-500', label: 'Abgebrochen' }
    };
    const { class: className, label } = config[status] || { class: 'bg-gray-500', label: status };
    return <Badge className={className}>{label}</Badge>;
  };

  // ========================
  // RENDER
  // ========================

  const runningCount = sessions.filter(s => s.status === 'running').length;
  const queuedCount = sessions.filter(s => s.status === 'queued').length;
  const pausedCount = sessions.filter(s => s.status === 'paused').length;

  // Calculate total remaining time for all active sessions
  const calculateTotalRemaining = (): number => {
    return sessions
      .filter(s => s.status === 'running' || s.status === 'paused' || s.status === 'queued')
      .reduce((total, session) => {
        const base = session.remaining_seconds ?? session.duration_seconds;
        if (session.status !== 'running' || !session.job_last_heartbeat) {
          return total + base;
        }
        const heartbeatTs = new Date(session.job_last_heartbeat).getTime();
        let elapsed = Math.max(0, Math.floor((nowTs - heartbeatTs) / 1000));
        if (session.pulse_pause_active && session.pulse_seconds && session.pause_seconds) {
          const cycleLength = session.pulse_seconds + session.pause_seconds;
          const cycles = Math.floor(elapsed / cycleLength);
          const remainder = elapsed % cycleLength;
          elapsed = cycles * session.pulse_seconds + Math.min(remainder, session.pulse_seconds);
        }
        return total + Math.max(0, base - elapsed);
      }, 0);
  };

  const totalRemainingSeconds = calculateTotalRemaining();
  const formatTotalDuration = (seconds: number): string => {
    if (seconds <= 0) return '00:00:00';
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          Harmonisierung
        </CardTitle>
        <CardDescription>
          Cloud-persistente Harmonisierung für {clientName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sessions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Sessions
              {sessions.length > 0 && (
                <Badge variant="secondary" className="ml-1">{sessions.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Erstellen
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <BookTemplate className="w-4 h-4" />
              Templates
            </TabsTrigger>
          </TabsList>

          {/* SESSIONS TAB */}
          <TabsContent value="sessions" className="space-y-4">
            {/* Total Time Overview */}
            {sessions.length > 0 && (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Gesamte Restlaufzeit</p>
                    <p className="text-2xl font-bold font-mono text-primary">
                      {formatTotalDuration(totalRemainingSeconds)}
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{runningCount + pausedCount + queuedCount} Sessions aktiv</p>
                  <p className="text-xs">
                    {runningCount} laufend • {pausedCount} pausiert • {queuedCount} wartend
                  </p>
                </div>
              </div>
            )}

            {/* Status Summary */}
            <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm">Aktiv: {runningCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-500" />
                <span className="text-sm">Wartend: {queuedCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-sm">Pausiert: {pausedCount}</span>
              </div>
              
              <div className="flex-1" />
              
              {queuedCount > 0 && (
                <Button size="sm" onClick={startAllQueued}>
                  <Play className="w-4 h-4 mr-1" />
                  Alle starten
                </Button>
              )}
              {sessions.length > 0 && (
                <Button size="sm" variant="destructive" onClick={cancelAllSessions}>
                  <XCircle className="w-4 h-4 mr-1" />
                  Alle abbrechen
                </Button>
              )}
            </div>

            {/* Session List */}
            {isLoadingSessions ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : sessions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Keine aktiven Harmonisierungen</p>
                <p className="text-xs mt-1">Erstellen Sie neue Sessions im Tab "Erstellen"</p>
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-2 pr-4">
                  {sessions.map(session => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      nowTs={nowTs}
                      onStart={startSession}
                      onPause={pauseSession}
                      onResume={resumeSession}
                      onSelect={(s) => {
                        setSelectedSession(s);
                        setDetailDialogOpen(true);
                      }}
                      formatDuration={formatDuration}
                      getStatusBadge={getStatusBadge}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          {/* CREATE TAB */}
          <TabsContent value="create" className="space-y-4">
            {/* From Analysis Results */}
            {analysisResults.length > 0 && (
              <Card className="border-primary/30">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Aus Analyse-Ergebnissen ({analysisResults.length} verfügbar)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Label className="text-sm">Anzahl:</Label>
                    <Select 
                      value={itemCount.toString()} 
                      onValueChange={(v) => setItemCount(parseInt(v) as 21 | 42 | 63)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="21">21</SelectItem>
                        <SelectItem value="42">42</SelectItem>
                        <SelectItem value="63">63</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-muted-foreground">
                      Top-Items nach Resonanz
                    </span>
                  </div>
                  <Button
                    onClick={() => createSessions(analysisResults.slice(0, itemCount))}
                    disabled={isCreating}
                    className="w-full"
                  >
                    {isCreating ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4 mr-2" />
                    )}
                    {Math.min(itemCount, analysisResults.length)} Sessions erstellen
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Manual Input */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Manuelle Eingabe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Wortenergien (eine pro Zeile)</Label>
                  <Textarea
                    placeholder="Arnica&#10;Belladonna&#10;Calcium carbonicum&#10;..."
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    rows={6}
                    className="font-mono text-sm mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {parseManualInput().length} Einträge erkannt
                  </p>
                </div>
                <Button
                  onClick={() => createSessions(parseManualInput())}
                  disabled={isCreating || parseManualInput().length === 0}
                  className="w-full"
                >
                  {isCreating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Sessions erstellen
                </Button>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Einstellungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Gesamtdauer (Minuten)</Label>
                    <Input
                      type="number"
                      min={1}
                      max={360}
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(Math.max(1, Math.min(360, parseInt(e.target.value) || 30)))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${pulsePauseActive ? 'text-purple-500' : 'text-muted-foreground'}`} />
                    <Label className="text-sm">Puls/Pause-Modus</Label>
                  </div>
                  <Switch
                    checked={pulsePauseActive}
                    onCheckedChange={setPulsePauseActive}
                  />
                </div>

                {pulsePauseActive && (
                  <div className="grid grid-cols-2 gap-4 pl-6">
                    <div>
                      <Label className="text-xs">Impuls (Sek.)</Label>
                      <Input
                        type="number"
                        min={1}
                        max={120}
                        value={pulseSeconds}
                        onChange={(e) => setPulseSeconds(parseInt(e.target.value) || 21)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Pause (Sek.)</Label>
                      <Input
                        type="number"
                        min={1}
                        max={120}
                        value={pauseSeconds}
                        onChange={(e) => setPauseSeconds(parseInt(e.target.value) || 42)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TEMPLATES TAB */}
          <TabsContent value="templates" className="space-y-4">
            {/* Save as Template */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Als Template speichern
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Name</Label>
                  <Input
                    placeholder="z.B. Akut-Protokoll"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Beschreibung (optional)</Label>
                  <Input
                    placeholder="Beschreibung..."
                    value={newTemplateDesc}
                    onChange={(e) => setNewTemplateDesc(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button
                  onClick={saveAsTemplate}
                  disabled={isSavingTemplate || !newTemplateName.trim()}
                  className="w-full"
                >
                  {isSavingTemplate ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Template speichern
                </Button>
              </CardContent>
            </Card>

            {/* Saved Templates */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookTemplate className="w-4 h-4" />
                  Gespeicherte Templates ({templates.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingTemplates ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                ) : templates.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4 text-sm">
                    Keine Templates gespeichert
                  </p>
                ) : (
                  <div className="space-y-2">
                    {templates.map(template => (
                      <div key={template.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{template.name}</h4>
                          <Badge variant="secondary">{template.sessions.length} Items</Badge>
                        </div>
                        {template.description && (
                          <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                        )}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => loadTemplate(template)}
                            className="flex-1"
                          >
                            <FolderOpen className="w-3 h-3 mr-1" />
                            Laden
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteTemplate(template.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Session Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Session-Details
            </DialogTitle>
          </DialogHeader>

          {selectedSession && (
            <div className="space-y-4">
              <div className="p-3 bg-muted/30 rounded-lg">
                <Label className="text-xs text-muted-foreground">Wort / Rate</Label>
                <p className="font-medium break-words">{selectedSession.word}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedSession.status)}</div>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <Label className="text-xs text-muted-foreground">Fortschritt</Label>
                  <p className="font-semibold">{selectedSession.progress}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    Verbleibend
                  </Label>
                  <p className="font-semibold text-lg">{formatDuration(getDisplayRemainingSeconds(selectedSession))}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Gesamtdauer
                  </Label>
                  <p className="font-semibold text-lg">{formatDuration(selectedSession.duration_seconds)}</p>
                </div>
              </div>

              {selectedSession.pulse_pause_active && (
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">Puls/Pause-Modus aktiv</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Impuls: {selectedSession.pulse_seconds}s, Pause: {selectedSession.pause_seconds}s
                  </p>
                </div>
              )}

              {selectedSession.copen_rate && (
                <div className="p-3 bg-muted/30 rounded-lg">
                  <Label className="text-xs text-muted-foreground">Klienten-Rate</Label>
                  <p className="font-mono">{selectedSession.copen_rate}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex gap-2">
            {selectedSession?.status === 'queued' && (
              <Button onClick={() => startSession(selectedSession.id)}>
                <Play className="w-4 h-4 mr-2" />
                Starten
              </Button>
            )}
            {selectedSession?.status === 'running' && (
              <Button variant="secondary" onClick={() => pauseSession(selectedSession.id)}>
                <Pause className="w-4 h-4 mr-2" />
                Pausieren
              </Button>
            )}
            {selectedSession?.status === 'paused' && (
              <Button onClick={() => resumeSession(selectedSession.id)}>
                <Play className="w-4 h-4 mr-2" />
                Fortsetzen
              </Button>
            )}
            <Button
              variant="destructive"
              onClick={() => setCancelDialogOpen(true)}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Abbrechen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session abbrechen?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Nein</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedSession && cancelSession(selectedSession.id)}
              className="bg-destructive text-destructive-foreground"
            >
              Ja, abbrechen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default HarmonizationManager;
