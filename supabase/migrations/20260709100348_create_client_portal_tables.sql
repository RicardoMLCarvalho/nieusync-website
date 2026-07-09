/*
# Create Client Portal Schema (data tables)

1. Purpose
   Creates the data tables for the NIEUSYNC client portal ("Área Reservada").
   Each authenticated client sees only their own data: profile, packages,
   invoices, documents, and consultations.

2. New Tables
   - `profiles` — client company profile, 1:1 with auth.users
     - id (uuid, PK, references auth.users, ON DELETE CASCADE)
     - empresa_nome (text, not null)
     - nif (text)
     - telefone (text)
     - email (text)
     - cancelamento_pedido (boolean, default false)
     - created_at (timestamptz, default now())
   - `pacotes` — service packages a client has subscribed to
     - id (uuid, PK, default gen_random_uuid())
     - profile_id (uuid, FK -> profiles, ON DELETE CASCADE)
     - nome_pacote (text)
     - estado (text: ativo | expirado | pendente)
     - data_inicio (date)
     - data_fim (date)
     - valor (numeric)
   - `faturas` — invoices linked to a package
     - id (uuid, PK)
     - profile_id (uuid, FK -> profiles, ON DELETE CASCADE)
     - pacote_id (uuid, FK -> pacotes, ON DELETE SET NULL)
     - numero_fatura (text)
     - valor (numeric)
     - data_emissao (date)
     - ficheiro_url (text)
     - estado (text: paga | pendente)
   - `documentos` — files exchanged between client and NIEUSYNC
     - id (uuid, PK)
     - profile_id (uuid, FK -> profiles, ON DELETE CASCADE)
     - nome_ficheiro (text)
     - categoria (text: Direito Empresarial | Gestão Estratégica | Marketing Digital | Tecnologias de Informação | Compliance)
     - estado (text: pendente | em_analise | aprovado)
     - ficheiro_url (text)
     - enviado_por (text: cliente | admin)
     - created_at (timestamptz, default now())
   - `consultas` — scheduled consultations
     - id (uuid, PK)
     - profile_id (uuid, FK -> profiles, ON DELETE CASCADE)
     - data_hora (timestamptz)
     - estado (text: agendada | concluida | cancelada)
     - notas (text)

3. Security (Row Level Security)
   - RLS enabled on every table.
   - All policies scoped TO authenticated with ownership checks via
     `auth.uid() = profile_id`. The `profile_id` columns default to
     `auth.uid()` so inserts that omit the column still satisfy the
     INSERT policy's WITH CHECK.
   - `profiles` is keyed by `id = auth.uid()` (1:1 with auth.users).

4. Important Notes
   - Owner columns (`profile_id`) use `DEFAULT auth.uid()` so frontend
     inserts that omit the owner still pass RLS.
   - All statements are idempotent (IF NOT EXISTS / DROP POLICY IF EXISTS).
   - Storage bucket and policies are applied in a separate migration.
*/

-- ── PROFILES ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  empresa_nome text NOT NULL DEFAULT '',
  nif text DEFAULT '',
  telefone text DEFAULT '',
  email text DEFAULT '',
  cancelamento_pedido boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ── PACOTES ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pacotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  nome_pacote text NOT NULL DEFAULT '',
  estado text NOT NULL DEFAULT 'pendente' CHECK (estado IN ('ativo','expirado','pendente')),
  data_inicio date,
  data_fim date,
  valor numeric,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE pacotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_pacotes" ON pacotes;
CREATE POLICY "select_own_pacotes" ON pacotes FOR SELECT
  TO authenticated USING (auth.uid() = profile_id);

DROP POLICY IF EXISTS "insert_own_pacotes" ON pacotes;
CREATE POLICY "insert_own_pacotes" ON pacotes FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "update_own_pacotes" ON pacotes;
CREATE POLICY "update_own_pacotes" ON pacotes FOR UPDATE
  TO authenticated USING (auth.uid() = profile_id) WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "delete_own_pacotes" ON pacotes;
CREATE POLICY "delete_own_pacotes" ON pacotes FOR DELETE
  TO authenticated USING (auth.uid() = profile_id);

-- ── FATURAS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faturas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  pacote_id uuid REFERENCES pacotes(id) ON DELETE SET NULL,
  numero_fatura text NOT NULL DEFAULT '',
  valor numeric,
  data_emissao date,
  ficheiro_url text DEFAULT '',
  estado text NOT NULL DEFAULT 'pendente' CHECK (estado IN ('paga','pendente')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE faturas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_faturas" ON faturas;
CREATE POLICY "select_own_faturas" ON faturas FOR SELECT
  TO authenticated USING (auth.uid() = profile_id);

DROP POLICY IF EXISTS "insert_own_faturas" ON faturas;
CREATE POLICY "insert_own_faturas" ON faturas FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "update_own_faturas" ON faturas;
CREATE POLICY "update_own_faturas" ON faturas FOR UPDATE
  TO authenticated USING (auth.uid() = profile_id) WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "delete_own_faturas" ON faturas;
CREATE POLICY "delete_own_faturas" ON faturas FOR DELETE
  TO authenticated USING (auth.uid() = profile_id);

-- ── DOCUMENTOS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS documentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  nome_ficheiro text NOT NULL DEFAULT '',
  categoria text NOT NULL DEFAULT 'Direito Empresarial' CHECK (categoria IN ('Direito Empresarial','Gestão Estratégica','Marketing Digital','Tecnologias de Informação','Compliance')),
  estado text NOT NULL DEFAULT 'pendente' CHECK (estado IN ('pendente','em_analise','aprovado')),
  ficheiro_url text DEFAULT '',
  enviado_por text NOT NULL DEFAULT 'cliente' CHECK (enviado_por IN ('cliente','admin')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_documentos" ON documentos;
CREATE POLICY "select_own_documentos" ON documentos FOR SELECT
  TO authenticated USING (auth.uid() = profile_id);

DROP POLICY IF EXISTS "insert_own_documentos" ON documentos;
CREATE POLICY "insert_own_documentos" ON documentos FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "update_own_documentos" ON documentos;
CREATE POLICY "update_own_documentos" ON documentos FOR UPDATE
  TO authenticated USING (auth.uid() = profile_id) WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "delete_own_documentos" ON documentos;
CREATE POLICY "delete_own_documentos" ON documentos FOR DELETE
  TO authenticated USING (auth.uid() = profile_id);

-- ── CONSULTAS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS consultas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  data_hora timestamptz NOT NULL DEFAULT now(),
  estado text NOT NULL DEFAULT 'agendada' CHECK (estado IN ('agendada','concluida','cancelada')),
  notas text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE consultas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_consultas" ON consultas;
CREATE POLICY "select_own_consultas" ON consultas FOR SELECT
  TO authenticated USING (auth.uid() = profile_id);

DROP POLICY IF EXISTS "insert_own_consultas" ON consultas;
CREATE POLICY "insert_own_consultas" ON consultas FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "update_own_consultas" ON consultas;
CREATE POLICY "update_own_consultas" ON consultas FOR UPDATE
  TO authenticated USING (auth.uid() = profile_id) WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "delete_own_consultas" ON consultas;
CREATE POLICY "delete_own_consultas" ON consultas FOR DELETE
  TO authenticated USING (auth.uid() = profile_id);

-- ── INDEXES for common queries ────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_pacotes_profile ON pacotes(profile_id);
CREATE INDEX IF NOT EXISTS idx_faturas_profile ON faturas(profile_id);
CREATE INDEX IF NOT EXISTS idx_documentos_profile ON documentos(profile_id);
CREATE INDEX IF NOT EXISTS idx_consultas_profile ON consultas(profile_id);
CREATE INDEX IF NOT EXISTS idx_documentos_created ON documentos(created_at DESC);
