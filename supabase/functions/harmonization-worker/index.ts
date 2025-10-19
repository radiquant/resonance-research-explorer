import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HarmonizationSession {
  id: string;
  user_id: string;
  status: string;
  duration_seconds: number;
  remaining_seconds: number | null;
  job_started_at: string | null;
  job_last_heartbeat: string | null;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🔄 Harmonization Worker gestartet');

    // 1. Pending Sessions auf "active" setzen (Start)
    const { data: pendingSessions, error: fetchPendingError } = await supabase
      .from('harmonization_sessions')
      .select('*')
      .eq('status', 'pending')
      .is('job_started_at', null)
      .limit(25);

    if (fetchPendingError) {
      console.error('❌ Fehler beim Abrufen der Pending-Sessions:', fetchPendingError);
      throw fetchPendingError;
    }

    console.log(`📊 Pending Sessions: ${pendingSessions?.length || 0}`);

    const startResults = await Promise.all(
      (pendingSessions || []).map(async (session: HarmonizationSession) => {
        try {
          console.log(`⚡ Starte Session ${session.id}`);
          const nowIso = new Date().toISOString();

          const { error: updateError } = await supabase
            .from('harmonization_sessions')
            .update({
              status: 'active',
              job_started_at: nowIso,
              job_last_heartbeat: nowIso,
              remaining_seconds: session.duration_seconds,
              started_at: nowIso,
              progress: 0,
            })
            .eq('id', session.id);

          if (updateError) {
            console.error(`❌ Update-Fehler für ${session.id}:`, updateError);
            throw updateError;
          }

          console.log(`✅ Session ${session.id} gestartet`);
          return { id: session.id, status: 'started' };
        } catch (error: any) {
          console.error(`❌ Fehler bei Session ${session.id}:`, error);
          return { id: session.id, status: 'error', error: error.message };
        }
      })
    );

    // 2. Aktive Sessions ticken lassen (Heartbeat, Restzeit, Abschluss)
    const { data: activeSessions, error: fetchActiveError } = await supabase
      .from('harmonization_sessions')
      .select('*')
      .eq('status', 'active')
      .limit(100);

    if (fetchActiveError) {
      console.error('❌ Fehler beim Abrufen der aktiven Sessions:', fetchActiveError);
      throw fetchActiveError;
    }

    console.log(`⏱️ Aktive Sessions: ${activeSessions?.length || 0}`);

    const tickResults = await Promise.all(
      (activeSessions || []).map(async (session: HarmonizationSession) => {
        try {
          const now = new Date();
          const last = session.job_last_heartbeat
            ? new Date(session.job_last_heartbeat)
            : (session.started_at ? new Date(session.started_at) : new Date());

          let elapsed = Math.floor((now.getTime() - last.getTime()) / 1000);
          if (!Number.isFinite(elapsed) || elapsed < 1) elapsed = 1;

          const prevRemaining = session.remaining_seconds ?? session.duration_seconds;
          const remaining = Math.max(0, (prevRemaining || 0) - elapsed);
          const duration = session.duration_seconds || 1;
          const progress = Math.min(100, Math.floor(((duration - remaining) / duration) * 100));

          if (remaining <= 0) {
            // Abschluss
            const { error: completeError } = await supabase
              .from('harmonization_sessions')
              .update({
                status: 'completed',
                remaining_seconds: 0,
                progress: 100,
                completed_at: now.toISOString(),
                job_last_heartbeat: now.toISOString(),
              })
              .eq('id', session.id);

            if (completeError) {
              console.error(`❌ Abschluss-Fehler für ${session.id}:`, completeError);
              throw completeError;
            }

            console.log(`✅ Session ${session.id} abgeschlossen`);
            return { id: session.id, status: 'completed' };
          } else {
            // Heartbeat + Fortschritt
            const { error: hbError } = await supabase
              .from('harmonization_sessions')
              .update({
                remaining_seconds: remaining,
                progress,
                job_last_heartbeat: now.toISOString(),
              })
              .eq('id', session.id);

            if (hbError) {
              console.error(`❌ Heartbeat-Fehler für ${session.id}:`, hbError);
              throw hbError;
            }

            return { id: session.id, status: 'ticked', remaining, progress } as any;
          }
        } catch (error: any) {
          console.error(`❌ Tick-Fehler bei Session ${session.id}:`, error);
          return { id: session.id, status: 'error', error: error.message };
        }
      })
    );

    const started = startResults.filter(r => r.status === 'started').length;
    const completed = tickResults.filter(r => r.status === 'completed').length;
    const ticked = tickResults.filter(r => r.status === 'ticked').length;

    console.log(`✅ Worker abgeschlossen: gestartet=${started}, getickt=${ticked}, abgeschlossen=${completed}`);

    return new Response(
      JSON.stringify({
        message: 'Harmonization Worker abgeschlossen',
        started,
        ticked,
        completed,
        startResults,
        tickResults,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Worker Fehler:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
