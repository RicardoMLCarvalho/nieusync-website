import type { Nav } from '../en/nav';

const nav: Nav = {
  logoAlt: 'NIEUSYNC',
  links: {
    home: 'Início',
    about: 'Sobre Nós',
    services: 'Serviços',
    blog: 'Blog',
    contact: 'Contactos',
  },
  portal: 'Área Reservada',
  bookConsultation: 'Agendar Consulta',
  openMenu: 'Abrir menu',
  closeMenu: 'Fechar menu',
  footer: {
    services: {
      title: 'Serviços',
      businessLaw: 'Direito Empresarial',
      management: 'Gestão Estratégica',
      marketing: 'Marketing Digital',
      compliance: 'Compliance',
      technology: 'Tecnologias de Informação',
    },
    contact: {
      title: 'Contacto',
    },
    legal: {
      title: 'Legal',
      legalNotices: 'Avisos Legais',
      codeOfConduct: 'Código de Conduta',
      terms: 'Termos e Condições',
      cookiePolicy: 'Política de Cookies',
      privacy: 'Política de Privacidade',
      acceptableUse: 'Política de Uso Aceitável',
    },
    copyright: (year: number) =>
      `© ${year} NIEUSYNC, Sociedade Multidisciplinar de Advogados e Consultores SP, LDA. Registo OA 07/26 — Todos os direitos reservados.`,
  },
};

export default nav;
