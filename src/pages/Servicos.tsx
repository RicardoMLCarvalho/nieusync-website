import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function ServiceSection({
  id, bg, iconEl, title, description, services, highlight, ctaText, reverse,
}: {
  id: string; bg: string; iconEl: React.ReactNode; title: string; description: string;
  services: string[]; highlight: { title: string; items: string[] }; ctaText: string; reverse?: boolean;
}) {
  return (
    <section id={id} style={{ background: bg, padding: '100px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start', direction: reverse ? 'rtl' : 'ltr' }} className="service-layout">
          <div style={{ direction: 'ltr' }} className="animate-on-scroll">
            {iconEl}
            <h2 style={{ color: 'var(--blue)', marginBottom: '10px', marginTop: '20px' }}>{title}</h2>
            <div className="accent-line" style={{ width: '15%', background: 'var(--purple)', backgroundImage: 'none' }} />
            <p style={{ color: 'rgba(35,56,119,0.75)', marginBottom: '24px' }}>{description}</p>
            <ul style={{ listStyle: 'none', marginBottom: '28px' }}>
              {services.map((s) => (
                <li key={s} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '15px', color: 'rgba(35,56,119,0.80)', padding: '6px 0', paddingLeft: '20px', position: 'relative', borderBottom: '1px solid rgba(159,142,194,0.12)' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--purple)', fontWeight: 700, fontSize: '18px' }}>·</span>
                  {s}
                </li>
              ))}
            </ul>
            <Link to="/contacto" className="btn-gradient">{ctaText}</Link>
          </div>

          <div style={{ direction: 'ltr' }} className="animate-on-scroll">
            <div style={{ background: 'rgba(159,142,194,0.08)', borderLeft: '4px solid var(--purple)', borderRadius: '0 12px 12px 0', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--blue)', marginBottom: '14px' }}>
                {highlight.title}
              </p>
              <ul style={{ listStyle: 'none' }}>
                {highlight.items.map((item) => (
                  <li key={item} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', color: 'rgba(35,56,119,0.70)', padding: '6px 0', paddingLeft: '18px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--purple)', fontWeight: 700 }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .service-layout { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>
    </section>
  );
}

export default function Servicos() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'NIEUSYNC - Serviços · Direito Empresarial, Gestão Financeira, Marketing Digital e Tecnologia de Informação';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.stagger-child').forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * 0.10}s`;
              child.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.10 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  const legalIcon = (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M3 9l4 4-4 4M21 9l-4 4 4 4" />
      <path d="M3 13h5M16 13h5" />
      <circle cx="12" cy="21" r="1" fill="var(--blue)" stroke="none" />
    </svg>
  );

  const gestaoIcon = (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );

  const mktIcon = (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  );

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ background: 'var(--grad-subtle)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label section-label-white">O que fazemos</span>
          <div className="accent-line accent-line-white accent-line-center" />
          <h1 style={{ color: 'var(--white)', marginBottom: '16px' }}>Os nossos serviços</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '560px', margin: '0 auto', fontSize: '18px' }}>
            Cada área foi desenhada para se complementar e trabalhar em conjunto.
          </p>
        </div>
      </section>

      <ServiceSection
        id="direito"
        bg="var(--white)"
        iconEl={legalIcon}
        title="Direito Empresarial"
        description="Protecção jurídica completa para o seu negócio, desde contratos comerciais até compliance regulatório. A nossa equipa garante que opera dentro da lei, com segurança e eficiência."
        services={[
          'Contratos comerciais e de prestação de serviços',
          'Compliance RGPD e protecção de dados',
          'Direito do trabalho: contratos, ???, obrigações',
          'Estruturação e pactos societários',
          'Due diligence',
          'Resolução de conflitos comerciais',
          'Regulamentos internos e políticas empresariais',
          'Assessoria jurídica contínua',
        ]}
        highlight={{
          title: 'Precisa deste serviço se...',
          items: [
            'Tem acordos verbais com clientes ou fornecedores',
            'Nunca reviu os seus contratos de trabalho',
            'Não sabe se está em conformidade com o RGPD',
            'Está a admitir sócios ou parceiros pela primeira vez',
          ],
        }}
        ctaText="Falar com um especialista em Direito"
      />

      <ServiceSection
        id="gestao"
        bg="var(--bg)"
        iconEl={gestaoIcon}
        title="Gestão Estratégica"
        description="Organize, planeie e escale o seu negócio com dados e processos claros. Transformamos a complexidade em sistemas simples que a sua equipa consegue executar todos os dias."
        services={[
          'Organização financeira e controlo de caixa',
          'Dashboards e KPIs personalizados por sector',
          'Processos operacionais e manuais internos',
          'Automação de tarefas recorrentes',
          'Planeamento estratégico e orçamentação',
          'Acompanhamento mensal com reporting',
          'Estruturação de equipas e organogramas',
          'Preparação para financiamento ou investimento',
        ]}
        highlight={{
          title: 'Precisa deste serviço se...',
          items: [
            'Não tem clareza sobre a rentabilidade real do negócio',
            'Os processos dependem demasiado de si pessoalmente',
            'Precisa de preparar a empresa para crescer ou captar investimento',
            'Quer tomar decisões com dados em vez de intuição',
          ],
        }}
        ctaText="Falar com um especialista em Gestão"
        reverse
      />

      <ServiceSection
        id="marketing"
        bg="var(--white)"
        iconEl={mktIcon}
        title="Marketing Digital"
        description="Estratégia e execução digital integradas para atrair, converter e fidelizar clientes B2B. Do posicionamento às campanhas pagas, gerimos tudo com foco em resultados."
        services={[
          'Estratégia de marketing digital B2B',
          'Gestão de LinkedIn, Instagram e Facebook',
          'Google Ads (Search, Display, Performance Max)',
          'LinkedIn Ads e Meta Ads',
          'Criação e gestão de conteúdo',
          'SEO e optimização de website',
          'Email marketing e Newsletter',
          'Análise de dados e relatórios de performance',
        ]}
        highlight={{
          title: 'Precisa deste serviço se...',
          items: [
            'Tem pouca visibilidade digital no seu sector',
            'As campanhas pagas não estão a gerar ROI',
            'Não tem tempo para gerir redes sociais consistentemente',
            'Quer gerar leads qualificados de forma previsível',
          ],
        }}
        ctaText="Falar com um especialista em Marketing"
      />

      <ServiceSection
        id="financas"
        bg="var(--bg)"
        iconEl={(
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2"/>
            <line x1="8" y1="7" x2="16" y2="7"/>
            <line x1="8" y1="11" x2="16" y2="11"/>
            <line x1="8" y1="15" x2="12" y2="15"/>
          </svg>
        )}
        title="Finanças & Contabilidade"
        description="Contabilidade integrada, gestão fiscal e financeira para ter controlo total sobre os números do seu negócio."
        services={[
          'Contabilidade organizada e actualizada',
          'Declarações fiscais e obrigações legais',
          'Controlo de caixa e tesouraria',
          'Relatórios financeiros mensais',
          'Preparação para auditoria ou investimento',
          'Gestão de salários e recursos humanos',
          'Optimização fiscal e redução de custos',
          'Apoio a candidaturas e financiamentos',
        ]}
        highlight={{
          title: 'Precisa deste serviço se...',
          items: [
            'Não tem clareza sobre o que entra e sai da empresa',
            'As obrigações fiscais causam ansiedade e atrasos',
            'Quer preparar a empresa para receber investimento',
            'Precisa de optimizar custos e melhorar a margem',
          ],
        }}
        ctaText="Falar com um especialista em Finanças"
        reverse
      />

      <ServiceSection
        id="tecnologias"
        bg="var(--white)"
        iconEl={(
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        )}
        title="Tecnologias de Informação"
        description="Soluções tecnológicas que digitalizam, automatizam e escalam o seu negócio com as ferramentas certas."
        services={[
          'Desenvolvimento e manutenção de websites',
          'Automação de processos com IA',
          'Integração de ferramentas digitais (CRM, ERP)',
          'Suporte técnico e consultoria IT',
          'Migração e gestão de dados na cloud',
          'Cibersegurança e protecção de dados',
          'Software à medida para PMEs',
          'Formação em ferramentas digitais',
        ]}
        highlight={{
          title: 'Precisa deste serviço se...',
          items: [
            'Os seus processos ainda dependem de email e folhas de cálculo',
            'O website não gera resultados nem reflecte a empresa',
            'Precisa de integrar ferramentas que não comunicam entre si',
            'Quer adoptar IA para ganhar eficiência operacional',
          ],
        }}
        ctaText="Falar com um especialista em IT"
      />

      {/* Packages */}
      <section style={{ background: 'var(--grad-subtle)', padding: '100px 0' }}>
        <div className="container">
          <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label section-label-white">Pacotes</span>
            <div className="accent-line accent-line-white accent-line-center" />
            <h2 style={{ color: 'var(--white)', marginBottom: '16px' }}>Escolha o seu ponto de entrada</h2>
            <p style={{ color: 'rgba(255,255,255,0.70)', maxWidth: '520px', margin: '0 auto' }}>
              Todos os pacotes são personalizados às suas necessidade, ao seu sector e à dimensão da sua empresa.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="packages-grid animate-on-scroll">
            {[
              {
                name: 'Essencial',
                desc: 'Para empresas que precisam de resolver um desafio específico com rapidez.',
                includes: ['Diagnóstico inicial', '1 área de serviço', 'Plano de acção personalizado', 'Suporte por email', 'Relatório mensal'],
              },
              {
                name: 'Growth',
                desc: 'Para empresas em crescimento que precisam de apoio multidisciplinar contínuo.',
                includes: ['Diagnóstico 360º completo', '2-3 áreas de serviço', 'Plano estratégico anual', 'Reunião mensal dedicada', 'Suporte directo à equipa', 'Dashboard de KPIs', 'Relatório quinzenal'],
              },
              {
                name: 'Premium',
                desc: 'Para empresas que querem um parceiro estratégico de confiança a longo prazo.',
                includes: ['Todas as áreas de serviço', 'Parceiro estratégico dedicado', 'Reunião semanal', 'Implementação directa', 'Acesso prioritário à equipa', 'Reporting semanal', 'Preparação para financiamento'],
              },
            ].map(({ name, desc, includes }) => (
              <div key={name} className="card stagger-child animate-on-scroll" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'var(--blue)', marginBottom: '8px', textAlign: 'center' }}>{name}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '20px', minHeight: '80px' }}>{desc}</p>
                <ul style={{ listStyle: 'none', marginBottom: '24px', flex: 1 }}>
                  {includes.map((item) => (
                    <li key={item} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', color: 'rgba(35,56,119,0.75)', padding: '5px 0', paddingLeft: '18px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--purple)' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--blue)' }}>Sob consulta</span>
                </div>
                <Link to="/contacto" className="btn-gradient" style={{ width: '100%', justifyContent: 'center' }}>
                  Solicitar proposta
                </Link>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .packages-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </main>
  );
}