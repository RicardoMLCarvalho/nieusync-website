const nav = {
  logoAlt: 'NIEUSYNC',
  links: {
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    blog: 'Blog',
    checkup: 'Check-up',
    contact: 'Contact',
  },
  portal: 'Client Portal',
  bookConsultation: 'Book a Consultation',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  footer: {
    services: {
      title: 'Services',
      businessLaw: 'Corporate Law',
      management: 'Strategic Management',
      marketing: 'Digital Marketing',
      compliance: 'Compliance',
      technology: 'Information Technology',
    },
    contact: {
      title: 'Contact',
    },
    legal: {
      title: 'Legal',
      legalNotices: 'Legal Notices',
      codeOfConduct: 'Code of Conduct',
      terms: 'Terms and Conditions',
      cookiePolicy: 'Cookie Policy',
      privacy: 'Privacy Policy',
      acceptableUse: 'Acceptable Use Policy',
    },
    copyright: (year: number) =>
      `© ${year} NIEUSYNC, Sociedade Multidisciplinar de Advogados e Consultores SP, LDA. Bar Association Reg. 07/26 — All rights reserved.`,
  },
};

export type Nav = typeof nav;
export default nav;
