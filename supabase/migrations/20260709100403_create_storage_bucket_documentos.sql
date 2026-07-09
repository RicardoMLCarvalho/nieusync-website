/*
# Create Storage Bucket for Client Documents

1. Purpose
   Creates a private storage bucket `documentos-clientes` where each
   authenticated client can upload/download files under their own
   user-id prefix (e.g. "<uid>/filename.pdf").

2. Storage
   - Bucket `documentos-clientes` (private, not public).
   - RLS policies on `storage.objects` ensure each authenticated user
     can only manage objects whose path starts with their own user id.

3. Security
   - SELECT/INSERT/UPDATE/DELETE scoped to authenticated users, with
     the first path segment matching auth.uid().
   - Uses storage.foldername(name) to extract the owner folder.

4. Important Notes
   - The bucket is private so files are only accessible via signed URLs
     or through authenticated Supabase client calls.
   - All statements are idempotent.
*/

-- Create the bucket if it does not exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('documentos-clientes', 'documentos-clientes', false)
ON CONFLICT (id) DO NOTHING;

-- RLS policies on storage.objects for the documentos-clientes bucket
DROP POLICY IF EXISTS "select_own_documents_storage" ON storage.objects;
CREATE POLICY "select_own_documents_storage" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'documentos-clientes' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "insert_own_documents_storage" ON storage.objects;
CREATE POLICY "insert_own_documents_storage" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'documentos-clientes'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "update_own_documents_storage" ON storage.objects;
CREATE POLICY "update_own_documents_storage" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'documentos-clientes' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (
    bucket_id = 'documentos-clientes'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "delete_own_documents_storage" ON storage.objects;
CREATE POLICY "delete_own_documents_storage" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'documentos-clientes' AND (storage.foldername(name))[1] = auth.uid()::text);
