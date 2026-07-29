// News areas double as lookup keys for the colour map, so they are typed as a
// loose record rather than a literal union.
const newsAreas: Record<string, string> = {
  'Direito': 'Law',
  'Gestão': 'Management',
  'Marketing': 'Marketing',
  'Tecnologia': 'Technology',
  'Negócios': 'Business',
  'Compliance': 'Compliance',
};

const home = {
  meta: {
    documentTitle:
      'NIEUSYNC - B2B Consultancy · Corporate Law, Compliance, Strategic Management, Digital Marketing and Information Technology',
    dateLocale: 'en-GB',
  },

  hero: {
    badge: 'B2B Consultancy · Portugal',
    titleStart: 'WE ARE THE BASIS FOR',
    titleHighlight: 'YOUR BUSINESS',
    titleEnd: 'TO FLY',
    subtitle:
      'Corporate Law, Compliance, Strategic Management, Digital Marketing and Information Technology, brought together under one trusted partner.',
    ctaPrimary: 'Book a Consultation →',
    ctaSecondary: 'Explore Our Services',
    trustPoints: ['Strategic partner', 'Online or in person', 'No obligation'],
    stats: [
      { value: '360°', label: 'Integrated approach' },
      { value: '5', label: 'Specialist areas' },
      { value: 'B2B', label: 'Exclusive focus on companies' },
      { value: '100%', label: 'Commitment to results' },
    ],
  },

  news: {
    heading: 'News that matters to your business',
    prevLabel: 'Previous news',
    nextLabel: 'Next news',
    readArticle: 'Read article →',
    defaultSource: 'News',
    areas: newsAreas,
  },

  services: {
    label: 'Our services',
    title: 'Five areas. One integrated view.',
    subtitle: 'Do not tackle your problems in isolation. Sync your business.',
    logoAlt: 'NIEUSYNC',
    orbit: [
      'Corporate Law',
      'Strategic Management',
      'Digital Marketing',
      'Compliance',
      'Information Technology',
    ],
    cta: 'View all services →',
  },

  methodology: {
    label: 'How we work',
    title: 'From diagnosis to results.',
    subtitle: 'A clear process, with no surprises and value delivered at every stage.',
    stepsTop: [
      {
        num: '01',
        title: 'Diagnosis',
        desc: 'We map where your company stands today: legally, strategically, digitally and operationally.',
      },
      {
        num: '02',
        title: 'Strategy',
        desc: 'We set the priorities, objectives and an action plan tailored to your business.',
      },
      {
        num: '03',
        title: 'Implementation',
        desc: 'We deliver alongside your team, integrating processes and tools.',
      },
    ],
    stepsBottom: [
      {
        num: '04',
        title: 'Follow-up',
        desc: 'We track progress with clear indicators and regular review meetings.',
      },
      {
        num: '05',
        title: 'Optimisation',
        desc: 'We review, adjust and evolve the strategy based on the results achieved.',
      },
    ],
  },

  persona: {
    headingBefore: '',
    headingBrand: 'NIEUSYNC',
    headingAfter: ' was built for you if...',
    cards: [
      'You have a business idea but are not sure how to move forward',
      'You need to grow but are wary of scaling without solid foundations',
      'Your company has grown and management now feels like constant chaos',
    ],
    quote: '"If any of these sound familiar, we have exactly what you need."',
    cta: 'Talk to a specialist →',
  },

  leadMagnet: {
    badge: 'Free download',
    title: 'Guide: The 5 Legal Safeguards Every SME Needs',
    checklist: [
      'The contracts you cannot do without',
      'How to avoid GDPR fines',
      'Employment law: the essentials',
      'Due diligence before you sign',
      'An annual compliance checklist',
    ],
    formTitle: 'Download the free guide',
    successTitle: 'Thank you!',
    successText: 'Click the button below to download the guide.',
    downloadCta: 'Download PDF →',
    nameLabel: 'Full name',
    namePlaceholder: 'Your name',
    emailLabel: 'Work email',
    emailPlaceholder: 'email@company.com',
    companyLabel: 'Company name',
    companyPlaceholder: 'Your company',
    consent:
      'I agree to receive the NIEUSYNC newsletter with updates on Corporate Law, Management, Compliance, Digital Marketing and Technology. *',
    duplicateError: 'This email is already registered. Please check your inbox.',
    genericError: 'Something went wrong. Please try again or contact us directly.',
    submit: 'Download now →',
    submitting: 'Sending...',
    disclaimer: 'No spam. Unsubscribe at any time.',
  },

  blog: {
    label: 'Blog & Resources',
    title: 'Knowledge that transforms',
    subtitle:
      'Practical articles on Corporate Law, Compliance, Strategic Management, Digital Marketing, Technology and Artificial Intelligence, written with companies in mind.',
    loading: 'Loading articles...',
    minutesSuffix: 'min',
    readArticle: 'Read article →',
    cta: 'View all articles →',
  },

  cta: {
    title: 'Ready to sync your business?',
    subtitle:
      'A 30-minute consultation with no obligation. We review your situation and show you exactly what can be improved.',
    primary: 'Book a Consultation →',
    whatsapp: 'Message us on WhatsApp',
    whatsappMessage: 'Hello, I would like to know more about NIEUSYNC',
  },
};

export type Home = typeof home;
export default home;
