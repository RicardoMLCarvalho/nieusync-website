import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import type { Consulta } from '../../types/portal';

const formatDateTime = (d: string) => new Date(d).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const estadoBadgeClass = (estado: string): string => estado === 'concluida' ? 'badge badge-blue' : estado === 'cancelada' ? 'badge badge-outline' : 'badge badge-purple';
const estadoLabel: Record<string, string> = { agendada: 'Agendada', concluida: 'Concluída', cancelada: 'Cancelada' };

export default function Consultas() {
  const { user } = useAuth();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [novaData, setNovaData] = useState('');
  const [novaNotas, setNovaNotas] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadConsultas = async () => {
    if (!user) return;
    const { data, error: queryError } = await supabase.from('consultas').select('*').eq('profile_id', user.id).order('data_hora', { ascending: false });
    if (!queryError && data) setConsultas(data as Consulta[]);
    setLoading(false);
  };

  useEffect(() => { loadConsultas(); }, [user]);

  const handleAgendar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !novaData) return;
    setSaving(true); setError('');
    const { error: insertError } = await supabase.from('consultas').insert({ profile_id: user.id, data_hora: new Date(novaData).toISOString(), estado: 'agendada', notas: novaNotas });
    if (insertError) { setError('Erro ao agendar a consulta. Tente novamente.'); setSaving(false); return; }
    setShowModal(false); setNovaData(''); setNovaNotas(''); setSaving(false); loadConsultas();
  };

  const handleCancelar = async (consulta: Consulta) => {
    const { error: updateError } = await supabase.from('consultas').update({ estado: 'cancelada' }).eq('id', consulta.id);
    if (!updateError) loadConsultas();
  };

  const futuras = consultas.filter((c) => c.estado === 'agendada' && new Date(c.data_hora) >= new Date());
  const passadas = consultas.filter((c) => c.estado === 'concluida' || (c.estado === 'agendada' && new Date(c.data_hora) < new Date()) || c.estado === 'cancelada');

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: 'var(--purple)', fontFamily: 'Montserrat, sans-serif' }}>A carregar...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', color: 'var(--blue)', marginBottom: '8px' }}>Consultas</h1>
          <p style={{ color: 'rgba(35,56,119,0.60)' }}>As suas consultas agendadas e o histórico de reuniões.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-gradient">Agendar nova consulta</button>
      </div>

      <h2 style={{ fontSize: '22px', color: 'var(--blue)', marginBottom: '16px' }}>Próximas consultas</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }} className="consultas-grid">
        {futuras.length === 0 ? (
          <div className="card" style={{ gridColumn: '1 / -1' }}><p style={{ fontSize: '15px', color: 'rgba(35,56,119,0.55)', textAlign: 'center', padding: '20px 0' }}>Não tem consultas agendadas. Clique em "Agendar nova consulta" para marcar.</p></div>
        ) : futuras.map((c) => (
          <div key={c.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--blue)' }}>{formatDateTime(c.data_hora)}</h3>
              <span className={estadoBadgeClass(c.estado)}>{estadoLabel[c.estado]}</span>
            </div>
            {c.notas && <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '16px' }}>{c.notas}</p>}
            <button onClick={() => handleCancelar(c)} className="btn-secondary btn-sm" style={{ borderColor: '#e53e3e', color: '#e53e3e' }}>Cancelar consulta</button>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '22px', color: 'var(--blue)', marginBottom: '16px' }}>Histórico</h2>
      <div className="card">
        {passadas.length === 0 ? (
          <p style={{ fontSize: '15px', color: 'rgba(35,56,119,0.55)', textAlign: 'center', padding: '20px 0' }}>Ainda não há consultas no histórico.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ borderBottom: '2px solid rgba(159,142,194,0.20)' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Data e hora</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Notas</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Estado</th>
              </tr></thead>
              <tbody>
                {passadas.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(159,142,194,0.12)' }}>
                    <td style={{ padding: '14px 8px', fontSize: '14px', color: 'var(--blue)', fontWeight: 700, whiteSpace: 'nowrap' }}>{formatDateTime(c.data_hora)}</td>
                    <td style={{ padding: '14px 8px', fontSize: '14px', color: 'rgba(35,56,119,0.70)', maxWidth: '300px' }}>{c.notas || '—'}</td>
                    <td style={{ padding: '14px 8px' }}><span className={estadoBadgeClass(c.estado)}>{estadoLabel[c.estado]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '32px' }}>
            <h3 style={{ fontSize: '22px', color: 'var(--blue)', marginBottom: '8px' }}>Agendar nova consulta</h3>
            <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '20px' }}>Escolha a data e hora preferidas. A equipa NIEUSYNC confirmará por email.</p>
            {error && <div style={{ background: 'rgba(229,62,62,0.10)', border: '1px solid rgba(229,62,62,0.30)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px' }}><p style={{ color: '#e53e3e', fontSize: '14px', margin: 0 }}>{error}</p></div>}
            <form onSubmit={handleAgendar} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div><label htmlFor="data">Data e hora</label><input id="data" type="datetime-local" value={novaData} onChange={(e) => setNovaData(e.target.value)} required min={new Date().toISOString().slice(0, 16)} /></div>
              <div><label htmlFor="notas">Notas (opcional)</label><textarea id="notas" value={novaNotas} onChange={(e) => setNovaNotas(e.target.value)} rows={3} placeholder="Tópicos que gostaria de abordar..." style={{ resize: 'vertical' }} /></div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary btn-sm">Cancelar</button>
                <button type="submit" className="btn-gradient btn-sm" disabled={saving}>{saving ? 'A agendar...' : 'Confirmar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`@media (max-width: 768px) { .consultas-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
