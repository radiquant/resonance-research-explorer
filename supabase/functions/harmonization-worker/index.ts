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

    // 1. Finde Sessions die bereit für Processing sind
    const { data: sessions, error: fetchError } = await supabase
      .from('harmonization_sessions')
      .select('*')
      .eq('status', 'pending')
      .is('job_started_at', null)
      .limit(10);

    if (fetchError) {
      console.error('❌ Fehler beim Abrufen der Sessions:', fetchError);
      throw fetchError;
    }

    console.log(`📊 Gefundene Sessions: ${sessions?.length || 0}`);

    if (!sessions || sessions.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Keine ausstehenden Sessions', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Verarbeite jede Session
    const results = await Promise.all(
      sessions.map(async (session: HarmonizationSession) => {
        try {
          console.log(`⚡ Verarbeite Session ${session.id}`);

          // Markiere Session als gestartet
          const { error: updateError } = await supabase
            .from('harmonization_sessions')
            .update({
              status: 'active',
              job_started_at: new Date().toISOString(),
              job_last_heartbeat: new Date().toISOString(),
              remaining_seconds: session.duration_seconds,
              started_at: new Date().toISOString(),
            })
            .eq('id', session.id);

          if (updateError) {
            console.error(`❌ Update-Fehler für ${session.id}:`, updateError);
            throw updateError;
          }

          console.log(`✅ Session ${session.id} erfolgreich gestartet`);
          return { id: session.id, status: 'started' };

        } catch (error) {
          console.error(`❌ Fehler bei Session ${session.id}:`, error);
          return { id: session.id, status: 'error', error: error.message };
        }
      })
    );

    const successCount = results.filter(r => r.status === 'started').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    console.log(`✅ Worker abgeschlossen: ${successCount} erfolgreich, ${errorCount} Fehler`);

    return new Response(
      JSON.stringify({
        message: 'Harmonization Worker abgeschlossen',
        processed: sessions.length,
        successful: successCount,
        failed: errorCount,
        results,
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
