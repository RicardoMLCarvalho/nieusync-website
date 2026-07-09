/*
# Add cancelamentos_pendentes table and profiles columns

1. Purpose
   Adds two new columns to `profiles` (estado, data_cancelamento) and
   creates a new `cancelamentos_pendentes` table to track account
   cancellation requests with a scheduled deletion date.

2. Modified Tables
   - `profiles`
     - ADD COLUMN `estado` text NOT NULL DEFAULT 'ativa'
       CHECK (estado IN ('ativa','cancelada','suspensa'))
     - ADD COLUMN `data_cancelamento` timestamptz (nullable)
       — set when cancellation is confirmed

3. New Tables
   - `cancelamentos_pendentes`
     - id (uuid, PK, default gen_random_uuid())
     - profile_id (uuid, FK -> profiles, ON DELETE CASCADE)
     - empresa_nome (text) — snapshot at time of request
     - email (text) — snapshot at time of request
     - data_pedido (timestamptz, default now())
     - data_apagamento_prevista (timestamptz) — scheduled deletion date
     - estado (text, default 'pendente', CHECK pendente|processado|cancelado)

4. Security
   - RLS enabled on cancelamentos_pendentes.
   - 4 CRUD policies scoped TO authenticated with auth.uid() = profile_id.
   - profile_id defaults to auth.uid() so inserts that omit it pass RLS.

5. Trigger Update
   - handle_new_user() updated to set estado='ativa' on new profiles.

6. Important Notes
   - Uses ADD COLUMN IF NOT EXISTS (idempotent, safe to re-run).
   - No data loss — existing profiles get estado='ativa' by default.
*/

-- ── ADD COLUMNS TO profiles ───────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS estado text NOT NULL DEFAULT 'ativa';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS data_cancelamento timestamptz;

-- Add CHECK constraint on estado (drop first for idempotency)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_estado_check'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_estado_check
      CHECK (estado IN ('ativa','cancelada','suspensa'));
  END IF;
END $$;

-- ── CREATE cancelamentos_pendentes ────────────────────────────
CREATE TABLE IF NOT EXISTS cancelamentos_pendentes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  empresa_nome text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  data_pedido timestamptz NOT NULL DEFAULT now(),
  data_apagamento_prevista timestamptz,
  estado text NOT NULL DEFAULT 'pendente' CHECK (estado IN ('pendente','processado','cancelado')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cancelamentos_pendentes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_cancelamentos" ON cancelamentos_pendentes;
CREATE POLICY "select_own_cancelamentos" ON cancelamentos_pendentes FOR SELECT
  TO authenticated USING (auth.uid() = profile_id);

DROP POLICY IF EXISTS "insert_own_cancelamentos" ON cancelamentos_pendentes;
CREATE POLICY "insert_own_cancelamentos" ON cancelamentos_pendentes FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "update_own_cancelamentos" ON cancelamentos_pendentes;
CREATE POLICY "update_own_cancelamentos" ON cancelamentos_pendentes FOR UPDATE
  TO authenticated USING (auth.uid() = profile_id) WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "delete_own_cancelamentos" ON cancelamentos_pendentes;
CREATE POLICY "delete_own_cancelamentos" ON cancelamentos_pendentes FOR DELETE
  TO authenticated USING (auth.uid() = profile_id);

CREATE INDEX IF NOT EXISTS idx_cancelamentos_profile ON cancelamentos_pendentes(profile_id);

-- ── UPDATE TRIGGER FUNCTION ───────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, estado)
  VALUES (NEW.id, NEW.email, 'ativa')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
