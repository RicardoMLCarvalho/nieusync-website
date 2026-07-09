import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import type { Pacote, Fatura } from '../../types/portal';

const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const formatValor = (v: number | null) => v !== null && v !== undefined ? new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(Number(v)) : '—';

const WHATSAPP_URL = 'https://wa.me/351933644596?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20pacotes%20NIEUSYNC';
const MAILTO_URL = 'mailto:geral@nieusync.com?subject=Informa%C3%A7%C3%A3o%20sobre%20pacotes%20NIEUSYNC';

const PACOTES_DISPONIVEIS = [
  { name: 'Essencial', desc: 'Para empresas que precisam de resolver um desafio específico com rapidez.', includes: ['Diagnóstico inicial', '1 área de serviço', 'Plano de acção personalizado', 'Suporte por email', 'Relatório mensal'] },
  { name: 'Growth', desc: 'Para empresas em crescimento que precisam de apoio multidisciplinar contínuo.', includes: ['Diagnóstico 360º completo', '2-3 áreas de serviço', 'Plano estratégico anual', 'Reunião mensal dedicada', 'Suporte directo à equipa', 'Dashboard de KPIs', 'Relatório quinzenal'] },
  { name: 'Premium', desc: 'Para empresas que querem um parceiro estratégico de confiança a longo prazo.', includes: ['Todas as áreas de serviço', 'Parceiro estratégico dedicado', 'Reunião semanal', 'Implementação directa', 'Acesso prioritário à equipa', 'Reporting semanal', 'Preparação para financiamento'] },
];

export default function PacotesFaturacao() {
  const { user } = useAuth();
  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [faturas, setFaturas] = useState<Fatura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: p }, { data: f }] = await Promise.all([
        supabase.from('pacotes').select('*').eq('profile_id', user.id).order('created_at', { ascending: false }),
        supabase.from('faturas').select('*').eq('profile_id', user.id).order('data_emissao', { ascending: false }),
      ]);
      setPacotes((p as Pacote[]) ?? []);
      setFaturas((f as Fatura[]) ?? []);
      setLoading(false);
    })();
  }, [user]);

  const handleDownload = async (fatura: Fatura) => {
    if (!fatura.ficheiro_url) return;
    const { data, error } = await supabase.storage.from('documentos-clientes').createSignedUrl(fatura.ficheiro_url, 60);
    if (error || !data) return;
    window.open(data.signedUrl, '_blank');
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: 'var(--purple)', fontFamily: 'Montserrat, sans-serif' }}>A carregar...</div>;

  const pacoteActual = pacotes.find((p) => p.estado === 'ativo') ?? pacotes[0] ?? null;

  return (
    <div>
      <h1 style={{ fontSize: '32px', color: 'var(--blue)', marginBottom: '8px' }}>Pacotes & Faturação</h1>
      <p style={{ color: 'rgba(35,56,119,0.60)', marginBottom: '32px' }}>Consulte o seu pacote actual, explore pacotes disponíveis e descarregue as suas faturas.</p>

      <div className="card" style={{ marginBottom: '32px' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--purple)', marginBottom: '12px' }}>Pacote actual</p>
        {pacoteActual ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 style={{ fontSize: '22px', color: 'var(--blue)', marginBottom: '6px' }}>{pacoteActual.nome_pacote}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)' }}>{formatDate(pacoteActual.data_inicio)} — {formatDate(pacoteActual.data_fim)}</p>
              {pacoteActual.valor !== null && <p style={{ fontSize: '16px', color: 'var(--blue)', fontWeight: 700, marginTop: '8px' }}>{formatValor(pacoteActual.valor)}</p>}
            </div>
            <span className={`badge ${pacoteActual.estado === 'ativo' ? 'badge-blue' : pacoteActual.estado === 'expirado' ? 'badge-outline' : 'badge-purple'}`}>{pacoteActual.estado === 'ativo' ? 'Ativo' : pacoteActual.estado === 'expirado' ? 'Expirado' : 'Pendente'}</span>
          </div>
        ) : <p style={{ fontSize: '15px', color: 'rgba(35,56,119,0.55)' }}>Não tem nenhum pacote atribuído. Contacte-nos para saber mais.</p>}
      </div>

      <h2 style={{ fontSize: '24px', color: 'var(--blue)', marginBottom: '20px' }}>Pacotes disponíveis</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }} className="pacotes-grid">
        {PACOTES_DISPONIVEIS.map((p) => (
          <div key={p.name} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '20px', color: 'var(--blue)', marginBottom: '8px', textAlign: 'center' }}>{p.name}</h3>
            <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '20px', minHeight: '60px' }}>{p.desc}</p>
            <ul style={{ listStyle: 'none', marginBottom: '24px', flex: 1, padding: 0 }}>
              {p.includes.map((item) => <li key={item} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(35,56,119,0.75)', padding: '5px 0', paddingLeft: '18px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--purple)' }}>✓</span>{item}</li>)}
            </ul>
            <div style={{ marginBottom: '16px', textAlign: 'center' }}><span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--blue)' }}>Sob consulta</span></div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gradient btn-sm" style={{ flex: 1, justifyContent: 'center' }}>WhatsApp</a>
              <a href={MAILTO_URL} className="btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Email</a>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '24px', color: 'var(--blue)', marginBottom: '20px' }}>Faturas</h2>
      <div className="card">
        {faturas.length === 0 ? (
          <p style={{ fontSize: '15px', color: 'rgba(35,56,119,0.55)', textAlign: 'center', padding: '20px 0' }}>Não há faturas disponíveis.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ borderBottom: '2px solid rgba(159,142,194,0.20)' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Nº Fatura</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Data</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Valor</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Estado</th>
                <th style={{ textAlign: 'right', padding: '12px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Ação</th>
              </tr></thead>
              <tbody>
                {faturas.map((f) => (
                  <tr key={f.id} style={{ borderBottom: '1px solid rgba(159,142,194,0.12)' }}>
                    <td style={{ padding: '14px 8px', fontSize: '14px', color: 'var(--blue)', fontWeight: 700 }}>{f.numero_fatura || '—'}</td>
                    <td style={{ padding: '14px 8px', fontSize: '14px', color: 'rgba(35,56,119,0.70)' }}>{formatDate(f.data_emissao)}</td>
                    <td style={{ padding: '14px 8px', fontSize: '14px', color: 'var(--blue)', fontWeight: 700 }}>{formatValor(f.valor)}</td>
                    <td style={{ padding: '14px 8px' }}><span className={`badge ${f.estado === 'paga' ? 'badge-blue' : 'badge-purple'}`}>{f.estado === 'paga' ? 'Paga' : 'Pendente'}</span></td>
                    <td style={{ padding: '14px 8px', textAlign: 'right' }}>{f.ficheiro_url ? <button onClick={() => handleDownload(f)} className="btn-secondary btn-sm" style={{ padding: '8px 16px' }}>Descarregar</button> : <span style={{ fontSize: '13px', color: 'rgba(35,56,119,0.40)' }}>—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`@media (max-width: 1024px) { .pacotes-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 768px) { .pacotes-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
