import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const email = "aktiv@webdesign-pur.de";
  const password = "RadiQuant2026!Admin";
  const { data: list } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const user = list?.users.find((u) => u.email === email);
  let id = user?.id;
  if (user) {
    const { error } = await admin.auth.admin.updateUserById(user.id, { password, email_confirm: true });
    if (error) return new Response(error.message, { status: 500 });
  } else {
    const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
    if (error) return new Response(error.message, { status: 500 });
    id = data.user.id;
  }
  await admin.from("user_roles").upsert({ user_id: id, role: "admin" }, { onConflict: "user_id,role" });
  return new Response(JSON.stringify({ ok: true, id }));
});
