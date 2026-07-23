/*
# Profiles: add nome_completo, relax empresa_nome, revoke handle_new_user execute

1. Columns
- profiles.nome_completo (text, nullable) — stores the user's full name.
2. Modified columns
- profiles.empresa_nome — dropped NOT NULL constraint so it now accepts blank/null values.
3. Security
- REVOKE EXECUTE on function public.handle_new_user() FROM anon and authenticated,
  so unauthenticated/client roles can no longer invoke the trigger function directly.
4. No tables, data, RLS policies, triggers, or other functions are touched.
*/

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS nome_completo text;

ALTER TABLE profiles ALTER COLUMN empresa_nome DROP NOT NULL;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;
