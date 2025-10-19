-- Enable required extensions for scheduling and HTTP
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Unschedule existing job if present
select cron.unschedule('harmonization-worker-every-minute')
where exists (select 1 from cron.job where jobname = 'harmonization-worker-every-minute');

-- Schedule the harmonization worker to run every minute
select
  cron.schedule(
    'harmonization-worker-every-minute',
    '* * * * *',
    $$
    select
      net.http_post(
        url:='https://pybrcpnoryoabuxqtgau.supabase.co/functions/v1/harmonization-worker',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5YnJjcG5vcnlvYWJ1eHF0Z2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MDE5OTEsImV4cCI6MjA3NjM3Nzk5MX0.f0ezeatrrdzGfubKK56-J3r6ATgTS4jJXTLHBvDa7h4"}'::jsonb,
        body:='{}'::jsonb
      );
    $$
  );