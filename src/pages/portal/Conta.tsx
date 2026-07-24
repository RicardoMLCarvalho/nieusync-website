import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import type { Profile } from '../../types/portal';

export default function Conta() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [form, setForm] = useState({ nome_completo: '', empresa_nome: '', nif: '', telefone: '', email: '' });
  const [pwd, setPwd] = useState({ current: '', new: '', confirm: '' });
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelSaving, setCancelSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('*').eq('id', user.id).maybeSingle().then(({ data, error }) => {
      if (error || !data) { setLoading(false); return; }
      setProfile(data as Profile);
      setForm({
        nome_completo: data.nome_completo || '',
        empresa_nome: data.empresa_nome || '',
        nif: data.nif || '',
        telefone: data.telefone || '',
        email: data.email || user.email || '',
      });
      setLoading(false);
    });
  }, [user]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true); setSavedMsg('');
    const { error } = await supabase.from('profiles').update({
      nome_completo: form.nome_completo,
      empresa_nome: form.empresa_nome || null,
      nif: form.nif,
      telefone: form.telefone,
      email: form.email,
    }).eq('id', user.id);
    if (error) setSavedMsg('Erro ao guardar. Tente novamente.');
    else { setSavedMsg('Alterações guardadas com sucesso.'); setProfile((p) => p ? { ...p, ...form } : p); }
    setSaving(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError(''); setPwdMsg('');
    if (pwd.new.length < 6) { setPwdError('A nova palavra-passe deve ter pelo menos 6 caracteres.'); return; }
    if (pwd.new !== pwd.confirm) { setPwdError('As palavras-passe não coincidem.'); return; }
    setPwdSaving(true);
    const { error: verifyError } = await supabase.auth.signInWithPassword({ email: user?.email ?? '', password: pwd.current });
    if (verifyError) { setPwdError('Palavra-passe actual incorreta.'); setPwdSaving(false); return; }
    const { error: updateError } = await supabase.auth.updateUser({ password: pwd.new });
    if (updateError) setPwdError('Não foi possível actualizar a palavra-passe.');
    else { setPwdMsg('Palavra-passe actualizada com sucesso.'); setPwd({ current: '', new: '', confirm: '' }); }
    setPwdSaving(false);
  };

  const handleCancelAccount = async () => {
    if (!user) return;
    setCancelSaving(true);

    const { error } = await supabase.rpc('solicitar_cancelamento');

    if (error) {
      setCancelSaving(false);
      setSavedMsg('Erro ao processar o cancelamento. Tente novamente ou contacte-nos.');
      setShowCancelModal(false);
      return;
    }

    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: 'var(--purple)', fontFamily: 'Montserrat, sans-serif' }}>A carregar...</div>;

  return (
    <div style={{ maxWidth: '720px' }}>
      <h1 style={{ fontSize: '32px', color: 'var(--blue)', marginBottom: '8px' }}>Conta</h1>
      <p style={{ color: 'rgba(35,56,119,0.60)', marginBottom: '32px' }}>Gerir os seus dados e a sua palavra-passe.</p>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--blue)', marginBottom: '20px' }}>Dados pessoais</h3>
        {savedMsg && (
  <div style={{
    background: savedMsg.startsWith('Erro') ? 'rgba(229,62,62,0.10)' : 'rgba(34,139,87,0.10)',
    border: `1px solid ${savedMsg.startsWith('Erro') ? 'rgba(229,62,62,0.30)' : 'rgba(34,139,87,0.30)'}`,
    borderRadius: '8px', padding: '10px 14px', marginBottom: '16px',
  }}>
    <p style={{ color: savedMsg.startsWith('Erro') ? '#e53e3e' : '#228B57', fontSize: '14px', margin: 0 }}>{savedMsg}</p>
  </div>
)}
        <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="nome_completo">Nome completo</label>
            <input id="nome_completo" type="text" value={form.nome_completo} onChange={(e) => setForm((p) => ({ ...p, nome_completo: e.target.value }))} required />
          </div>
          <div>
            <label htmlFor="empresa_nome">
              Nome da empresa <span style={{ textTransform: 'none', fontWeight: 400, letterSpacing: 'normal', color: 'rgba(35,56,119,0.45)' }}>(opcional)</span>
            </label>
            <input id="empresa_nome" type="text" value={form.empresa_nome} onChange={(e) => setForm((p) => ({ ...p, empresa_nome: e.target.value }))} placeholder="Deixe em branco se não aplicável" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="conta-grid">
            <div><label htmlFor="nif">NIF</label><input id="nif" type="text" value={form.nif} onChange={(e) => setForm((p) => ({ ...p, nif: e.target.value }))} placeholder="500000000" /></div>
            <div><label htmlFor="telefone">Telefone</label><input id="telefone" type="tel" value={form.telefone} onChange={(e) => setForm((p) => ({ ...p, telefone: e.target.value }))} placeholder="+351 912 345 678" /></div>
          </div>
          <div><label htmlFor="email">Email</label><input id="email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required /></div>
          <button type="submit" className="btn-gradient" disabled={saving} style={{ alignSelf: 'flex-start' }}>{saving ? 'A guardar...' : 'Guardar alterações'}</button>
        </form>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--blue)', marginBottom: '20px' }}>Alterar palavra-passe</h3>
        {pwdError && <div style={{ background: 'rgba(229,62,62,0.10)', border: '1px solid rgba(229,62,62,0.30)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' }}><p style={{ color: '#e53e3e', fontSize: '14px', margin: 0 }}>{pwdError}</p></div>}
        {pwdMsg && <div style={{ background: 'rgba(34,139,87,0.10)', border: '1px solid rgba(34,139,87,0.30)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' }}><p style={{ color: '#228B57', fontSize: '14px', margin: 0 }}>{pwdMsg}</p></div>}
        <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label htmlFor="current">Palavra-passe actual</label><input id="current" type="password" value={pwd.current} onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))} required autoComplete="current-password" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="conta-grid">
            <div><label htmlFor="new">Nova palavra-passe</label><input id="new" type="password" value={pwd.new} onChange={(e) => setPwd((p) => ({ ...p, new: e.target.value }))} required autoComplete="new-password" /></div>
            <div><label htmlFor="confirm">Confirmar nova</label><input id="confirm" type="password" value={pwd.confirm} onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))} required autoComplete="new-password" /></div>
          </div>
          <button type="submit" className="btn-gradient" disabled={pwdSaving} style={{ alignSelf: 'flex-start' }}>{pwdSaving ? 'A actualizar...' : 'Actualizar palavra-passe'}</button>
        </form>
      </div>

      <div className="card" style={{ borderLeft: '4px solid #e53e3e' }}>
        <h3 style={{ fontSize: '20px', color: '#e53e3e', marginBottom: '10px' }}>Cancelar conta</h3>
        <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '20px' }}>
          Ao confirmar, a sua conta será desativada de imediato e os dados serão eliminados de forma definitiva ao fim de 30 dias. Faturas emitidas são mantidas de acordo com obrigações legais de conservação fiscal. Durante os 30 dias pode contactar-nos para reverter este pedido.
        </p>
        <button onClick={() => setShowCancelModal(true)} className="btn-secondary" style={{ borderColor: '#e53e3e', color: '#e53e3e' }}>Cancelar conta</button>
      </div>

      {showCancelModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '32px' }}>
            <h3 style={{ fontSize: '22px', color: 'var(--blue)', marginBottom: '12px' }}>Confirmar cancelamento</h3>
            <p style={{ fontSize: '15px', color: 'rgba(35,56,119,0.70)', marginBottom: '24px' }}>
              Tem a certeza que pretende cancelar a sua conta? O acesso é bloqueado de imediato e os dados são eliminados permanentemente ao fim de 30 dias.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowCancelModal(false)} className="btn-secondary btn-sm">Voltar</button>
              <button onClick={handleCancelAccount} disabled={cancelSaving} className="btn-gradient btn-sm" style={{ background: '#e53e3e' }}>{cancelSaving ? 'A processar...' : 'Confirmar pedido'}</button>
            </div>
          </div>
        </div>
      )}

      <style>{`@media (max-width: 768px) { .conta-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}