import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const id = "53faf163-3976-4232-a4a1-8b7c450fedfa";
  const { error } = await admin.auth.admin.updateUserById(id, { password: "RadiQuant2026!Admin", email_confirm: true });
  if (error) return new Response(error.message, { status: 500 });
  await admin.from("user_roles").upsert({ user_id: id, role: "admin" }, { onConflict: "user_id,role" });
  return new Response(JSON.stringify({ ok: true }));
});
