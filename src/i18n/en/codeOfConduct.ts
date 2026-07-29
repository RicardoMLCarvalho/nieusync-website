type Section = { title: string; content: string | string[] };

const sections: Section[] = [
  {
    title: 'Purpose and Scope',
    content:
      'This Code of Conduct sets out the ethical and professional principles that govern the conduct of NIEUSYNC, its staff, partners and service providers. It applies to all professional interactions, internal and external, including relationships with clients, partners, suppliers and the wider community.',
  },
  {
    title: 'Integrity and Professional Ethics',
    content: [
      'We always act with honesty, transparency and integrity in all our interactions.',
      'We neither accept nor offer bribes, gifts or any form of improper benefit.',
      'We declare potential conflicts of interest and adopt appropriate measures to manage them.',
      'We strictly comply with all legislation applicable to our activity.',
    ],
  },
  {
    title: 'Client Relationships',
    content: [
      'We always put our clients’ interests first.',
      'We provide clear, complete and truthful information about our services and their respective costs.',
      'We maintain the confidentiality of all information shared by clients.',
      'We do not make commitments that we cannot honour.',
      'We manage expectations realistically and on the basis of data.',
    ],
  },
  {
    title: 'Diversity, Inclusion and Respect',
    content: [
      'We value diversity and treat all people with equality and respect.',
      'We do not tolerate any form of discrimination, harassment or offensive behaviour.',
      'We promote an inclusive and psychologically safe working environment.',
      'We respect cultural and religious differences and differences of opinion.',
    ],
  },
  {
    title: 'Environmental and Social Responsibility',
    content: [
      'We adopt responsible and sustainable working practices.',
      'We promote remote and digital working in order to reduce our environmental footprint.',
      'We actively support the Portuguese business ecosystem, in particular SMEs and Startups.',
      'We take part in social responsibility initiatives whenever possible.',
    ],
  },
  {
    title: 'Data Protection and Privacy',
    content:
      'We process personal data with the utmost rigour and in compliance with the General Data Protection Regulation (GDPR). We do not share confidential client information with third parties without express consent.',
  },
  {
    title: 'Responsible Communication',
    content: [
      'We communicate clearly, respectfully and constructively across all channels.',
      'We do not disseminate false, misleading or harmful information.',
      'We respect intellectual property and cite sources correctly.',
      'On social media, we clearly distinguish personal opinions from institutional positions.',
    ],
  },
  {
    title: 'Reporting Breaches',
    content:
      'Any breach of this Code of Conduct must be reported to geral@nieusync.com. We guarantee the confidentiality of the reporting person and do not permit retaliation against anyone who reports breaches in good faith.',
  },
];

const codeOfConduct = {
  title: 'Code of Conduct',
  subtitle: 'The principles and values that guide our activity',
  lastUpdated: 'August 2025',
  docTitle: 'Code of Conduct — NIEUSYNC',
  sections,
};

export type CodeOfConduct = typeof codeOfConduct;
export default codeOfConduct;
