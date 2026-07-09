import { useEffect, useState } from 'react';
import { supabase, STORAGE_BUCKET } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { CATEGORIAS_DOCUMENTOS, type Documento, type CategoriaDocumento } from '../../types/portal';

const formatDate = (d: string) => new Date(d).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
const estadoBadgeClass = (estado: string): string => estado === 'aprovado' ? 'badge badge-blue' : estado === 'em_analise' ? 'badge badge-light' : 'badge badge-purple';
const estadoLabel: Record<string, string> = { pendente: 'Pendente', em_analise: 'Em análise', aprovado: 'Aprovado' };

export default function Documentos() {
  const { user } = useAuth();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<'Todos' | CategoriaDocumento>('Todos');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCategoria, setUploadCategoria] = useState<CategoriaDocumento>('Direito Empresarial');
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');
  const [uploadError, setUploadError] = useState('');

  const loadDocumentos = async () => {
    if (!user) return;
    const { data, error } = await supabase.from('documentos').select('*').eq('profile_id', user.id).order('created_at', { ascending: false });
    if (!error && data) setDocumentos(data as Documento[]);
    setLoading(false);
  };

  useEffect(() => { loadDocumentos(); }, [user]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !uploadFile) return;
    setUploading(true); setUploadError(''); setUploadMsg('');
    const fileExt = uploadFile.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
    const { error: storageError } = await supabase.storage.from(STORAGE_BUCKET).upload(fileName, uploadFile, { upsert: false });
    if (storageError) { setUploadError('Erro ao enviar o ficheiro. Tente novamente.'); setUploading(false); return; }
    const { error: dbError } = await supabase.from('documentos').insert({ profile_id: user.id, nome_ficheiro: uploadFile.name, categoria: uploadCategoria, ficheiro_url: fileName, estado: 'pendente', enviado_por: 'cliente' });
    if (dbError) { setUploadError('Ficheiro enviado, mas houve um erro a registar. Contacte-nos.'); setUploading(false); return; }
    setUploadMsg('Ficheiro enviado com sucesso. A nossa equipa irá analisá-lo.');
    setUploadFile(null); setUploading(false); loadDocumentos();
  };

  const handleDownload = async (doc: Documento) => {
    if (!doc.ficheiro_url) return;
    const { data, error } = await supabase.storage.from(STORAGE_BUCKET).createSignedUrl(doc.ficheiro_url, 60);
    if (error || !data) return;
    window.open(data.signedUrl, '_blank');
  };

  const filtered = filtro === 'Todos' ? documentos : documentos.filter((d) => d.categoria === filtro);

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: 'var(--purple)', fontFamily: 'Montserrat, sans-serif' }}>A carregar...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '32px', color: 'var(--blue)', marginBottom: '8px' }}>Documentação</h1>
      <p style={{ color: 'rgba(35,56,119,0.60)', marginBottom: '32px' }}>Troque documentos connosco e acompanhe o estado de cada ficheiro.</p>

      <div className="card" style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--blue)', marginBottom: '16px' }}>Enviar documento</h3>
        {uploadError && <div style={{ background: 'rgba(229,62,62,0.10)', border: '1px solid rgba(229,62,62,0.30)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' }}><p style={{ color: '#e53e3e', fontSize: '14px', margin: 0 }}>{uploadError}</p></div>}
        {uploadMsg && <div style={{ background: 'rgba(34,139,87,0.10)', border: '1px solid rgba(34,139,87,0.30)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' }}><p style={{ color: '#228B57', fontSize: '14px', margin: 0 }}>{uploadMsg}</p></div>}
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label htmlFor="categoria">Categoria</label><select id="categoria" value={uploadCategoria} onChange={(e) => setUploadCategoria(e.target.value as CategoriaDocumento)}>{CATEGORIAS_DOCUMENTOS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
          <div><label htmlFor="file">Ficheiro</label><input id="file" type="file" onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)} required style={{ padding: '10px' }} />{uploadFile && <p style={{ fontSize: '13px', color: 'rgba(35,56,119,0.60)', marginTop: '8px' }}>Selecionado: {uploadFile.name} ({(uploadFile.size / 1024).toFixed(0)} KB)</p>}</div>
          <button type="submit" className="btn-gradient" disabled={uploading || !uploadFile} style={{ alignSelf: 'flex-start' }}>{uploading ? 'A enviar...' : 'Enviar documento'}</button>
        </form>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {(['Todos', ...CATEGORIAS_DOCUMENTOS] as const).map((cat) => (
          <button key={cat} onClick={() => setFiltro(cat)} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 18px', borderRadius: '100px', cursor: 'pointer', minHeight: '40px', transition: 'all 0.2s ease', ...(filtro === cat ? { background: 'var(--purple)', color: 'var(--white)', border: 'none' } : { background: 'transparent', border: '1.5px solid var(--purple)', color: 'var(--purple)' }) }}>{cat}</button>
        ))}
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <p style={{ fontSize: '15px', color: 'rgba(35,56,119,0.55)', textAlign: 'center', padding: '20px 0' }}>{filtro === 'Todos' ? 'Ainda não há documentos.' : 'Nenhum documento nesta categoria.'}</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ borderBottom: '2px solid rgba(159,142,194,0.20)' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Nome</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Categoria</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Enviado por</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Estado</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Data</th>
                <th style={{ textAlign: 'right', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Ação</th>
              </tr></thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id} style={{ borderBottom: '1px solid rgba(159,142,194,0.12)' }}>
                    <td style={{ padding: '14px 8px', fontSize: '14px', color: 'var(--blue)', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.nome_ficheiro}</td>
                    <td style={{ padding: '14px 8px', fontSize: '14px', color: 'rgba(35,56,119,0.70)' }}>{d.categoria}</td>
                    <td style={{ padding: '14px 8px', fontSize: '14px', color: 'rgba(35,56,119,0.70)' }}>{d.enviado_por === 'cliente' ? 'Cliente' : 'NIEUSYNC'}</td>
                    <td style={{ padding: '14px 8px' }}><span className={estadoBadgeClass(d.estado)}>{estadoLabel[d.estado]}</span></td>
                    <td style={{ padding: '14px 8px', fontSize: '14px', color: 'rgba(35,56,119,0.70)' }}>{formatDate(d.created_at)}</td>
                    <td style={{ padding: '14px 8px', textAlign: 'right' }}>{d.ficheiro_url ? <button onClick={() => handleDownload(d)} className="btn-secondary btn-sm" style={{ padding: '8px 16px' }}>Descarregar</button> : <span style={{ fontSize: '13px', color: 'rgba(35,56,119,0.40)' }}>—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
