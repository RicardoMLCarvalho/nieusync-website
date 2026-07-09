/*
# Create trigger: auto-insert profile on signup

1. Purpose
   When a new user registers via Supabase Auth, a matching row in
   `profiles` is created automatically. This ensures the profile
   always exists before the user first visits the portal, even if
   the frontend insert in Registo.tsx fails or is skipped.

2. Changes
   - Creates function `handle_new_user()` that inserts a profile row
     with the user's id and email from the new auth.users record.
   - Creates trigger `on_auth_user_created` that fires AFTER INSERT
     on auth.users and calls the function for each row.
   - Drops the trigger and function first (idempotent).

3. Security
   - The function runs with SECURITY DEFINER (elevated privilege) so
     it can insert into the profiles table even though the caller
     (the auth system) might not have direct INSERT permission.
   - The function is owned by the postgres role and only inserts the
     minimal columns (id, email) — empresa_nome defaults to ''.

4. Important Notes
   - The frontend (Registo.tsx) also attempts to insert the profile
     with empresa_nome. If the trigger fires first (it does), the
     frontend insert will fail with a duplicate key error. The
     frontend code should use upsert or handle the conflict. This
     migration does NOT change the frontend — see code review step.
*/

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
