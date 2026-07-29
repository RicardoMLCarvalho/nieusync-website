type Section = { title: string; content: string | string[] };

const sections: Section[] = [
  {
    title: 'Framework and scope',
    content: [
      'This Legal Notice must be read together with the website’s Terms and Conditions, Privacy Policy and Cookie Policy.',
      'NIEUSYNC makes information available on the website for informational purposes only. Unless expressly stated otherwise, such information does not constitute legal, tax, accounting, financial, technological, cybersecurity, marketing or management advice.',
      'Wherever the law so requires, we ensure that the service provider information prescribed by the Portuguese information society services regime is permanently available.',
    ],
  },
  {
    title: 'Absence of a professional relationship and confidentiality',
    content: [
      'Contacting us through the website does not, in itself, establish any client‑consultant relationship (legal, tax, financial, technological or otherwise). Such a relationship is only deemed to exist following formal written acceptance of the terms of service between NIEUSYNC and the Client.',
      'Do not send confidential information through the website’s general forms. NIEUSYNC cannot guarantee the confidentiality of unsolicited or unencrypted communications.',
    ],
  },
  {
    title: 'Accuracy, currency and availability',
    content: [
      'We make reasonable efforts to ensure that the content is accurate and up to date; nevertheless, errors, omissions or outdated information may occur. Content may be amended, suspended or discontinued without prior notice.',
      'Functional/Preference (consent): remember the user’s choices and personalise the experience.',
    ],
  },
  {
    title: 'Rights of data subjects',
    content: [
      'The website may contain hyperlinks to third-party sites. NIEUSYNC neither controls nor is responsible for their content, policies or practices. The inclusion of links does not imply endorsement.',
      'Third-party trade marks, logos and designations displayed are the property of their respective holders and are referred to for identification purposes only; no licence is granted.',
      'Where NIEUSYNC acts as an intermediary service provider (e.g. hosting comments or submissions), European and Portuguese law imposes no general obligation to monitor; however, we will act diligently under a notice‑and‑action regime to remove or block unlawful content of which we become aware.',
    ],
  },
  {
    title: 'Case studies, insights and results',
    content: [
      'Case studies, testimonials and indicators presented illustrate specific experiences; they do not guarantee identical results. Actual performance depends on contextual factors (sector, organisational maturity, data, team, technology, budget and timeline).',
      'Forward-looking statements (expectations, targets, intentions) reflect our understanding as at the relevant date and are subject to change without notice.',
    ],
  },
  {
    title: 'Security and responsible disclosure',
    content: [
      'Circumventing or testing security controls without written authorisation is prohibited.',
      'We encourage the responsible disclosure of vulnerabilities to geral@nieusync.com, with sufficient detail to allow reproduction. Submissions confer no entitlement to remuneration, save under programmes announced by us.',
    ],
  },
  {
    title: 'Limitation of liability',
    content: [
      'To the fullest extent permitted by law, NIEUSYNC shall not be liable for (i) loss of profits, (ii) loss of data, or (iii) indirect, consequential, special or punitive damages arising from the use of, or inability to use, the website or its content.',
      'Nothing in this Notice excludes liabilities that cannot be excluded by law (e.g. wilful misconduct, death or personal injury caused by negligence). Consumers’ non‑waivable statutory rights remain unaffected.',
    ],
  },
  {
    title: 'Regulatory compliance and legal references',
    content: [
      'The processing of personal data is governed by the GDPR and by Lei n.º 58/2019 (national implementing law). Please refer to our Privacy Policy for further details.',
      'The use of cookies and similar technologies follows Lei n.º 41/2004 (ePrivacy) and our Cookie Policy.',
      'As regards the provision of online services, we comply with Decreto‑Lei n.º 7/2004, including information duties and the principle that there is no general obligation to monitor third-party content.',
      'At Union level, the Digital Services Act (Regulation (EU) 2022/2065) maintains the principle that intermediary service providers are under no general monitoring obligation.',
    ],
  },
];

const legalNotices = {
  title: 'Legal Notices',
  subtitle: 'Mandatory legal information',
  lastUpdated: 'October 2025',
  docTitle: 'Legal Notices — NIEUSYNC',
  sections,
};

export type LegalNotices = typeof legalNotices;
export default legalNotices;
