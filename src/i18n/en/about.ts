const about = {
  documentTitle: 'NIEUSYNC - About Us',

  hero: {
    label: 'Our story',
    title: 'Who we are',
    subtitle:
      'A cornerstone partner that brings every part of your business into sync, with the closeness SMEs deserve.',
  },

  mission: {
    label: 'Our mission',
    title: 'Real expertise, fair pricing.',
    quote:
      '"We were founded on the firm belief that start-ups and SMEs deserve the same level of expertise as large corporations — without the prohibitive price tags or the unnecessary bureaucracy."',
    body: 'NIEUSYNC works with companies in Portugal and abroad. We believe sustainable growth starts with a solid foundation: legal, compliance, digital and technology.',
    stats: [
      { value: '360º', label: 'Multidisciplinary view' },
      { value: '5', label: 'Specialist practice areas' },
      { value: 'B2B', label: 'Exclusive focus on business' },
      { value: '100%', label: 'Focused on results' },
    ],
  },

  values: {
    label: 'Our values',
    title: 'What guides us every day',
    items: [
      {
        title: 'Integration',
        description:
          'Legal, compliance and digital never work in silos. We treat your business as a single system.',
      },
      {
        title: 'Transparency',
        description:
          'We communicate clearly, without needless jargon. You always know what we are doing and why.',
      },
      {
        title: 'Agility',
        description:
          'We respond as quickly as possible and adapt easily as your business and the market change.',
      },
      {
        title: 'Results',
        description:
          'Everything we do is measured. Concrete results, reported with data, from the very first month.',
      },
    ],
  },

  why: {
    label: 'Why NIEUSYNC?',
    title: 'Everything you need, in a single partnership.',
    body: "NIEUSYNC focuses on the creation, growth and turnaround of start-ups and SMEs. Close at hand, agile and entirely geared towards your real results.",
    items: [
      { title: 'Multidisciplinary 360º', description: 'Legal, compliance and digital in one place' },
      { title: 'Agile response', description: 'Direct access to the team, no intermediaries' },
      { title: 'Decisions backed by data', description: 'Straightforward reporting for smarter choices' },
      { title: 'Transparent pricing', description: 'No surprises, no small print' },
    ],
  },

  cta: {
    title: 'Ready to work with us?',
    subtitle:
      'A no-obligation consultation is all we need to understand how we can help.',
    button: 'Book a Consultation →',
  },
};

export type About = typeof about;
export default about;
