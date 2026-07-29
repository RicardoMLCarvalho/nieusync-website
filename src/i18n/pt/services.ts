import type { Services } from '../en/services';

const services: Services = {
  meta: {
    documentTitle:
      'NIEUSYNC - Serviços · Direito Empresarial, Gestão Estratégica, Marketing Digital, Compliance e Tecnologias de Informação',
  },
  hero: {
    label: 'O que fazemos',
    title: 'Os nossos serviços',
    subtitle: 'Cada área foi desenhada para se complementar e trabalhar em conjunto.',
  },
  highlightTitle: 'Precisa deste serviço se...',
  areas: {
    legal: {
      title: 'Direito Empresarial',
      description:
        'Protecção jurídica completa para o seu negócio, desde contratos comerciais até compliance regulatório. A nossa equipa garante que opera dentro da lei, com segurança e eficiência.',
      services: [
        'Contratos comerciais e de prestação de serviços',
        'Compliance RGPD e protecção de dados',
        'Direito do trabalho: contratos, ???, obrigações',
        'Estruturação e pactos societários',
        'Due diligence',
        'Resolução de conflitos comerciais',
        'Regulamentos internos e políticas empresariais',
        'Assessoria jurídica contínua',
      ],
      highlightItems: [
        'Tem acordos verbais com clientes ou fornecedores',
        'Nunca reviu os seus contratos de trabalho',
        'Não sabe se está em conformidade com o RGPD',
        'Está a admitir sócios ou parceiros pela primeira vez',
      ],
      ctaText: 'Falar com um especialista em Direito',
    },
    management: {
      title: 'Gestão Estratégica',
      description:
        'Organize, planeie e escale o seu negócio com dados e processos claros. Transformamos a complexidade em sistemas simples que a sua equipa consegue executar todos os dias.',
      services: [
        'Organização financeira e controlo de caixa',
        'Dashboards e KPIs personalizados por sector',
        'Processos operacionais e manuais internos',
        'Automação de tarefas recorrentes',
        'Planeamento estratégico e orçamentação',
        'Acompanhamento mensal com reporting',
        'Estruturação de equipas e organogramas',
        'Preparação para financiamento ou investimento',
      ],
      highlightItems: [
        'Não tem clareza sobre a rentabilidade real do negócio',
        'Os processos dependem demasiado de si pessoalmente',
        'Precisa de preparar a empresa para crescer ou captar investimento',
        'Quer tomar decisões com dados em vez de intuição',
      ],
      ctaText: 'Falar com um especialista em Gestão',
    },
    marketing: {
      title: 'Marketing Digital',
      description:
        'Estratégia e execução digital integradas para atrair, converter e fidelizar clientes B2B. Do posicionamento às campanhas pagas, gerimos tudo com foco em resultados.',
      services: [
        'Estratégia de marketing digital B2B',
        'Gestão de LinkedIn, Instagram e Facebook',
        'Google Ads (Search, Display, Performance Max)',
        'LinkedIn Ads e Meta Ads',
        'Criação e gestão de conteúdo',
        'SEO e optimização de website',
        'Email marketing e Newsletter',
        'Análise de dados e relatórios de performance',
      ],
      highlightItems: [
        'Tem pouca visibilidade digital no seu sector',
        'As campanhas pagas não estão a gerar ROI',
        'Não tem tempo para gerir redes sociais consistentemente',
        'Quer gerar leads qualificados de forma previsível',
      ],
      ctaText: 'Falar com um especialista em Marketing',
    },
    compliance: {
      title: 'Compliance',
      description:
        'Garantimos que a sua empresa cumpre as obrigações legais e regulatórias, com foco exclusivo em RGPD, proteção de dados, compliance regulatório, políticas internas de conformidade e auditorias de conformidade.',
      services: [
        'Implementação e auditoria RGPD',
        'Mapeamento e protecção de dados pessoais',
        'Compliance regulatório setorial',
        'Políticas internas de conformidade',
        'Códigos de conduta e ética empresarial',
        'Auditorias de conformidade',
        'Registos de tratamento e DPIA',
        'Formação em privacidade e proteção de dados',
      ],
      highlightItems: [
        'Ainda não tem um encarregado de tratamento de dados (DPO) designado',
        'Não sabe se está em conformidade com o RGPD',
        'Precisa de políticas internas de conformidade actualizadas',
        'Quer realizar uma auditoria de conformidade antes de uma operação relevante',
      ],
      ctaText: 'Falar com um especialista em Compliance',
    },
    technology: {
      title: 'Tecnologias de Informação',
      description:
        'Soluções tecnológicas que digitalizam, automatizam e escalam o seu negócio com as ferramentas certas.',
      services: [
        'Desenvolvimento e manutenção de websites',
        'Automação de processos com IA',
        'Integração de ferramentas digitais (CRM, ERP)',
        'Suporte técnico e consultoria IT',
        'Migração e gestão de dados na cloud',
        'Cibersegurança e protecção de dados',
        'Software à medida para PMEs',
        'Formação em ferramentas digitais',
      ],
      highlightItems: [
        'Os seus processos ainda dependem de email e folhas de cálculo',
        'O website não gera resultados nem reflecte a empresa',
        'Precisa de integrar ferramentas que não comunicam entre si',
        'Quer adoptar IA para ganhar eficiência operacional',
      ],
      ctaText: 'Falar com um especialista em IT',
    },
  },
  packages: {
    label: 'Pacotes',
    title: 'Escolha o seu ponto de entrada',
    subtitle:
      'Todos os pacotes são personalizados às suas necessidade, ao seu sector e à dimensão da sua empresa.',
    priceLabel: 'Sob consulta',
    ctaText: 'Solicitar proposta',
    tiers: [
      {
        name: 'Essencial',
        desc: 'Para empresas que precisam de resolver um desafio específico com rapidez.',
        includes: [
          'Diagnóstico inicial',
          '1 área de serviço',
          'Plano de acção personalizado',
          'Suporte por email',
          'Relatório mensal',
        ],
      },
      {
        name: 'Growth',
        desc: 'Para empresas em crescimento que precisam de apoio multidisciplinar contínuo.',
        includes: [
          'Diagnóstico 360º completo',
          '2-3 áreas de serviço',
          'Plano estratégico anual',
          'Reunião mensal dedicada',
          'Suporte directo à equipa',
          'Dashboard de KPIs',
          'Relatório quinzenal',
        ],
      },
      {
        name: 'Premium',
        desc: 'Para empresas que querem um parceiro estratégico de confiança a longo prazo.',
        includes: [
          'Todas as áreas de serviço',
          'Parceiro estratégico dedicado',
          'Reunião semanal',
          'Implementação directa',
          'Acesso prioritário à equipa',
          'Reporting semanal',
          'Preparação para financiamento',
        ],
      },
    ],
  },
};

export default services;
