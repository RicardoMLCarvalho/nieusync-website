import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import type { Pacote, Consulta, Documento } from '../../types/portal';

const formatDate = (d: string | null) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatDateTime = (d: string) => {
  return new Date(d).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const estadoLabel: Record<string, string> = {
  ativo: 'Ativo',
  expirado: 'Expirado',
  pendente: 'Pendente',
  agendada: 'Agendada',
  concluida: 'Concluída',
  cancelada: 'Cancelada',
  pendente_doc: 'Pendente',
  em_analise: 'Em análise',
  aprovado: 'Aprovado',
};

const estadoBadgeClass = (estado: string): string => {
  switch (estado) {
    case 'ativo':
    case 'aprovado':
    case 'concluida':
      return 'badge badge-blue';
    case 'pendente':
    case 'pendente_doc':
    case 'agendada':
      return 'badge badge-purple';
    case 'em_analise':
      return 'badge badge-light';
    case 'expirado':
    case 'cancelada':
      return 'badge badge-outline';
    default:
      return 'badge badge-light';
  }
};

export default function Resumo() {
  const { user } = useAuth();
  const [pacote, setPacote] = useState<Pacote | null>(null);
  const [proximaConsulta, setProximaConsulta] = useState<Consulta | null>(null);
  const [docsPendentes, setDocsPendentes] = useState<Documento[]>([]);
  const [ultimosDocs, setUltimosDocs] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const [{ data: pacotes }, { data: consultas }, { data: pendentes }, { data: recentes }] = await Promise.all([
        supabase.from('pacotes').select('*').eq('profile_id', user.id).order('created_at', { ascending: false }).limit(1).maybeSingle(),
        supabase.from('consultas').select('*').eq('profile_id', user.id).eq('estado', 'agendada').gte('data_hora', new Date().toISOString()).order('data_hora', { ascending: true }).limit(1).maybeSingle(),
        supabase.from('documentos').select('*').eq('profile_id', user.id).in('estado', ['pendente', 'em_analise']).order('created_at', { ascending: false }),
        supabase.from('documentos').select('*').eq('profile_id', user.id).order('created_at', { ascending: false }).limit(3),
      ]);

      setPacote(pacotes as Pacote | null);
      setProximaConsulta(consultas as Consulta | null);
      setDocsPendentes((pendentes as Documento[]) ?? []);
      setUltimosDocs((recentes as Documento[]) ?? []);
      setLoading(false);
    })();
  }, [user]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: 'var(--purple)', fontFamily: 'Montserrat, sans-serif' }}>
        A carregar...
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '32px', color: 'var(--blue)', marginBottom: '8px' }}>Resumo</h1>
      <p style={{ color: 'rgba(35,56,119,0.60)', marginBottom: '32px' }}>
        Bem-vindo à sua área reservada. Aqui está o estado atual da sua conta.
      </p>

      {/* ── PACOTE ACTUAL ── */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--purple)', marginBottom: '8px' }}>
              Pacote actual
            </p>
            <h3 style={{ fontSize: '22px', color: 'var(--blue)', marginBottom: '6px' }}>
              {pacote?.nome_pacote || 'Nenhum pacote atribuído'}
            </h3>
            {pacote && (
              <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)' }}>
                {formatDate(pacote.data_inicio)} — {formatDate(pacote.data_fim)}
              </p>
            )}
          </div>
          {pacote && <span className={estadoBadgeClass(pacote.estado)}>{estadoLabel[pacote.estado]}</span>}
        </div>
        <Link to="/portal/pacotes" className="btn-gradient btn-sm" style={{ marginTop: '20px', display: 'inline-flex' }}>
          Ver pacotes
        </Link>
      </div>

      {/* ── GRID 2 colunas ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="resumo-grid">
        {/* ── PRÓXIMA CONSULTA ── */}
        <div className="card">
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--purple)', marginBottom: '12px' }}>
            Próxima consulta
          </p>
          {proximaConsulta ? (
            <>
              <h3 style={{ fontSize: '18px', color: 'var(--blue)', marginBottom: '6px' }}>
                {formatDateTime(proximaConsulta.data_hora)}
              </h3>
              {proximaConsulta.notas && (
                <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginTop: '8px' }}>
                  {proximaConsulta.notas}
                </p>
              )}
            </>
          ) : (
            <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.55)' }}>
              Não tem consultas agendadas.
            </p>
          )}
          <Link to="/portal/consultas" className="btn-gradient btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>
            Gerir consultas
          </Link>
        </div>

        {/* ── DOCUMENTOS PENDENTES ── */}
        <div className="card">
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--purple)', marginBottom: '12px' }}>
            Documentos pendentes de análise
          </p>
          {docsPendentes.length === 0 ? (
            <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.55)' }}>
              Não há documentos pendentes.
            </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {docsPendentes.slice(0, 4).map((d) => (
                <li key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(159,142,194,0.12)' }}>
                  <span style={{ fontSize: '14px', color: 'var(--blue)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                    {d.nome_ficheiro}
                  </span>
                  <span className={estadoBadgeClass(d.estado === 'pendente' ? 'pendente_doc' : d.estado)}>{estadoLabel[d.estado === 'pendente' ? 'pendente_doc' : d.estado]}</span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/portal/documentos" className="btn-gradient btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>
            Ver documentos
          </Link>
        </div>
      </div>

      {/* ── ÚLTIMOS DOCUMENTOS ── */}
      <div className="card" style={{ marginTop: '24px' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--purple)', marginBottom: '16px' }}>
          Últimos documentos trocados
        </p>
        {ultimosDocs.length === 0 ? (
          <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.55)' }}>
            Ainda não trocou documentos connosco.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(159,142,194,0.20)' }}>
                  <th style={{ textAlign: 'left', padding: '10px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Ficheiro</th>
                  <th style={{ textAlign: 'left', padding: '10px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Categoria</th>
                  <th style={{ textAlign: 'left', padding: '10px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Enviado por</th>
                  <th style={{ textAlign: 'left', padding: '10px 8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Data</th>
                </tr>
              </thead>
              <tbody>
                {ultimosDocs.map((d) => (
                  <tr key={d.id} style={{ borderBottom: '1px solid rgba(159,142,194,0.12)' }}>
                    <td style={{ padding: '12px 8px', fontSize: '14px', color: 'var(--blue)' }}>{d.nome_ficheiro}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', color: 'rgba(35,56,119,0.70)' }}>{d.categoria}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', color: 'rgba(35,56,119,0.70)' }}>{d.enviado_por === 'cliente' ? 'Cliente' : 'NIEUSYNC'}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', color: 'rgba(35,56,119,0.70)' }}>{formatDate(d.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .resumo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
