import type { Blog } from '../en/blog';

const blog: Blog = {
  documentTitle:
    'NIEUSYNC - Blog & Recursos · Artigos sobre Direito Empresarial, Compliance, Gestão Estratégica, Marketing Digital, Tecnologias de Informação e Inteligência Artificial',
  hero: {
    label: 'Conhecimento',
    title: 'Blog & Recursos',
    subtitle:
      'Artigos práticos de Direito Empresarial, Compliance, Gestão Estratégica, Marketing Digital, Tecnologias de Informação e Inteligência Artificial, para empresas que querem crescer com solidez.',
  },
  categories: {
    all: 'Todos',
    law: 'Direito',
    marketing: 'Marketing',
    management: 'Gestão',
    finance: 'Financeiro',
    technology: 'Tecnologia',
  },
  list: {
    loading: 'A carregar artigos...',
    empty: 'Nenhum artigo encontrado para esta categoria.',
    readArticle: 'Ler artigo →',
  },
  readTime: (min: number) => `${min} min de leitura`,
  newsletter: {
    title: 'Newsletter Mensal',
    success: 'Obrigado! Verifica o teu email para confirmar a subscrição.',
    description:
      'Receba os melhores artigos sobre Direito Empresarial, Compliance, Gestão Estratégica, Marketing Digital, Tecnologias de Informação e Inteligência Artificial directamente no seu email.',
    emailLabel: 'Email profissional',
    emailPlaceholder: 'email@empresa.pt',
    duplicate: 'Este email já está subscrito.',
    error: 'Ocorreu um erro. Tenta novamente.',
    submitting: 'A subscrever...',
    submit: 'Subscrever',
    disclaimer: 'Sem spam. Pode cancelar a qualquer momento.',
  },
  help: {
    title: 'Precisa de ajuda?',
    description: 'Fale directamente com a nossa equipa, sem qualquer compromisso.',
    cta: 'Agendar Consulta',
  },
  article: {
    documentTitle: (title: string) => `NIEUSYNC - ${title}`,
    loading: 'A carregar artigo...',
    notFoundTitle: 'Artigo não encontrado',
    notFoundCta: 'Voltar ao Blog',
    backToBlog: '← Voltar ao Blog',
    ctaText: 'Gostou do artigo? Fale com a nossa equipa.',
    ctaButton: 'Marcar chamada gratuita →',
  },
};

export default blog;
