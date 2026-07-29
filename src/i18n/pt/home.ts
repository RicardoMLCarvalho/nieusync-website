import type { Home } from '../en/home';

const newsAreas: Record<string, string> = {
  'Direito': 'Direito',
  'Gestão': 'Gestão',
  'Marketing': 'Marketing',
  'Tecnologia': 'Tecnologia',
  'Negócios': 'Negócios',
  'Compliance': 'Compliance',
};

const home: Home = {
  meta: {
    documentTitle:
      'NIEUSYNC - Consultora B2B · Direito Empresarial, Compliance, Gestão Estratégica, Marketing Digital e Tecnologias de Informação',
    dateLocale: 'pt-PT',
  },

  hero: {
    badge: 'Consultora B2B · Portugal',
    titleStart: 'WE ARE THE BASIS FOR',
    titleHighlight: 'YOUR BUSINESS',
    titleEnd: 'TO FLY',
    subtitle:
      'Direito Empresarial, Compliance, Gestão Estratégica, Marketing Digital e Tecnologia de Informação integrados num único parceiro de confiança.',
    ctaPrimary: 'Agendar Consulta →',
    ctaSecondary: 'Conhecer os Serviços',
    trustPoints: ['Parceiro Estratégico', 'Online ou presencial', 'Sem compromisso'],
    stats: [
      { value: '360°', label: 'Abordagem integrada' },
      { value: '5', label: 'Áreas especializadas' },
      { value: 'B2B', label: 'Foco exclusivo em empresas' },
      { value: '100%', label: 'Compromisso com resultados' },
    ],
  },

  news: {
    heading: 'Notícias relevantes para o seu negócio',
    prevLabel: 'Notícias anteriores',
    nextLabel: 'Próximas notícias',
    readArticle: 'Ler artigo →',
    defaultSource: 'Notícias',
    areas: newsAreas,
  },

  services: {
    label: 'Os nossos serviços',
    title: 'Cinco áreas. Uma visão integrada.',
    subtitle: 'Não isole os seus problemas. Sincronize o seu negócio.',
    logoAlt: 'NIEUSYNC',
    orbit: [
      'Direito Empresarial',
      'Gestão Estratégica',
      'Marketing Digital',
      'Compliance',
      'Tecnologias de Informação',
    ],
    cta: 'Ver todos os serviços →',
  },

  methodology: {
    label: 'Como trabalhamos',
    title: 'Do diagnóstico ao resultado.',
    subtitle: 'Um processo claro, sem surpresas, com entrega de valor em cada fase.',
    stepsTop: [
      {
        num: '01',
        title: 'Diagnóstico',
        desc: 'Mapeamos a situação actual da empresa: legal, estratégica, digital e operacional.',
      },
      {
        num: '02',
        title: 'Estratégia',
        desc: 'Definimos prioridades, objetivos e um plano de ação à medida do negócio.',
      },
      {
        num: '03',
        title: 'Implementação',
        desc: 'Executamos em coordenação com a sua equipa, integrando processos e ferramentas.',
      },
    ],
    stepsBottom: [
      {
        num: '04',
        title: 'Acompanhamento',
        desc: 'Monitorizamos o progresso com indicadores claros e reuniões periódicas.',
      },
      {
        num: '05',
        title: 'Optimização',
        desc: 'Revemos, ajustamos e evoluímos a estratégia com base nos resultados obtidos.',
      },
    ],
  },

  persona: {
    headingBefore: 'A ',
    headingBrand: 'NIEUSYNC',
    headingAfter: ' foi criada para si se...',
    cards: [
      'Tem uma ideia de negócio mas não sabe como avançar',
      'Precisa de crescer mas tem receio de avançar sem estrutura sólida',
      'A empresa cresceu e agora a gestão parece um caos constante',
    ],
    quote: '"Caso se identifique com algum destes cenários, temos exactamente o que precisa."',
    cta: 'Falar com um especialista →',
  },

  leadMagnet: {
    badge: 'Download gratuito',
    title: 'Guia: As 5 Protecções Legais que Toda a PME Precisa',
    checklist: [
      'Contratos que não pode dispensar',
      'Como evitar multas RGPD',
      'Direito do trabalho: o essencial',
      'Due diligence antes de assinar',
      'Check-list de compliance anual',
    ],
    formTitle: 'Descarregar guia gratuito',
    successTitle: 'Muito obrigado!',
    successText: 'Clique no botão abaixo para descarregar o guia.',
    downloadCta: 'Descarregar PDF →',
    nameLabel: 'Nome completo',
    namePlaceholder: 'O seu nome',
    emailLabel: 'Email profissional',
    emailPlaceholder: 'email@empresa.pt',
    companyLabel: 'Nome da empresa',
    companyPlaceholder: 'A sua empresa',
    consent:
      'Aceito receber a newsletter da NIEUSYNC com novidades sobre Direito Empresarial, Gestão, Compliance, Marketing Digital e Tecnologia. *',
    duplicateError: 'Este email já está registado. Verifica a tua caixa de entrada.',
    genericError: 'Ocorreu um erro. Tenta novamente ou contacta-nos directamente.',
    submit: 'Descarregar agora →',
    submitting: 'A enviar...',
    disclaimer: 'Sem spam. Pode cancelar a qualquer momento.',
  },

  blog: {
    label: 'Blog & Recursos',
    title: 'Conhecimento que transforma',
    subtitle:
      'Artigos práticos de Direito Empresarial, Compliance, Gestão Estratégica, Marketing Digital, Tecnologia e Inteligência Artificial, focados especialmente em empresas.',
    loading: 'A carregar artigos...',
    minutesSuffix: 'min',
    readArticle: 'Ler artigo →',
    cta: 'Ver todos os artigos →',
  },

  cta: {
    title: 'Pronto para sincronizar o seu negócio?',
    subtitle:
      'Uma consulta de 30 minutos sem compromisso. Analisamos a sua situação e indicamos exactamente o que pode melhorar.',
    primary: 'Agendar Consulta →',
    whatsapp: 'Enviar mensagem no WhatsApp',
    whatsappMessage: 'Olá, gostaria de saber mais sobre a NIEUSYNC',
  },
};

export default home;
