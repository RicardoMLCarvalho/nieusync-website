type Section = { title: string; content: string | string[] };

const sections: Section[] = [
  {
    title: 'Data Controller',
    content:
      'NIEUSYNC is the entity responsible for the processing of your personal data. To exercise your rights or to raise any privacy-related question, please contact: geral@nieusync.com | (+351) 269 030 096.',
  },
  {
    title: 'Personal Data Collected',
    content: [
      'Identification data: First name, surname, business email address and telephone number.',
      'Professional data: Company name, industry sector and job title.',
      'Communication data: Messages sent through the contact form.',
      'Browsing data: IP address, browser type, pages visited (via analytics cookies).',
      'Newsletter data: Email address for sending communications, where subscribed.',
    ],
  },
  {
    title: 'Purposes and Lawful Basis for Processing',
    content: [
      'Responding to contact and information requests: Performance of pre-contractual steps (Art. 6(1)(b) GDPR).',
      'Provision of contracted services: Performance of a contract (Art. 6(1)(b) GDPR).',
      'Sending the newsletter: Consent of the data subject (Art. 6(1)(a) GDPR).',
      'Analysis of website usage: Legitimate interests (Art. 6(1)(f) GDPR).',
      'Compliance with legal obligations: Legal obligation (Art. 6(1)(c) GDPR).',
    ],
  },
  {
    title: 'Sharing Data with Third Parties',
    content: [
      'We do not sell your personal data to third parties.',
      'We may share data with service providers (hosting, email, analytics) who act as processors and are bound by a data processing agreement.',
      'We may disclose data where required by law or by a competent authority.',
      'In the event of a merger or acquisition, data may be transferred, subject to prior notice.',
    ],
  },
  {
    title: 'Retention Period',
    content: [
      'Contact and client data: 5 years after the end of the contractual relationship.',
      'Newsletter data: Until the subscription is cancelled.',
      'Analytics data (analytics cookies): A maximum of 26 months.',
      'Invoicing data: 10 years, in accordance with tax obligations.',
    ],
  },
  {
    title: 'Rights of Data Subjects',
    content: [
      'Right of access: To obtain confirmation of the processing and a copy of the data.',
      'Right to rectification: To correct inaccurate or incomplete data.',
      'Right to erasure: To request the deletion of the data (right to be forgotten).',
      'Right to data portability: To receive your data in a structured format.',
      'Right to object: To object to processing based on legitimate interests.',
      'Right to restriction: To request the restriction of processing in certain circumstances.',
      'Right to withdraw consent: At any time, without affecting the lawfulness of processing carried out beforehand.',
    ],
  },
  {
    title: 'Exercising Rights and Complaints',
    content:
      'To exercise your rights, please contact geral@nieusync.com. We will respond within 30 days. You also have the right to lodge a complaint with the Portuguese Data Protection Authority (CNPD), at www.cnpd.pt.',
  },
  {
    title: 'Data Security',
    content:
      'We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, destruction or disclosure. We use SSL/TLS encryption in all communications.',
  },
  {
    title: 'International Transfers',
    content:
      'Some of our service providers may be located outside the EU/EEA. In such cases, we ensure that transfers are carried out with appropriate safeguards, including standard contractual clauses approved by the European Commission.',
  },
];

const privacy = {
  title: 'Privacy Policy',
  subtitle: 'How we collect, use and protect your personal data',
  lastUpdated: 'January 2025',
  docTitle: 'Privacy Policy (GDPR) — NIEUSYNC',
  sections,
};

export type Privacy = typeof privacy;
export default privacy;
