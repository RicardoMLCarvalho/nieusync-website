type Section = { title: string; content: string | string[] };

const sections: Section[] = [
  {
    title: 'Purpose and Acceptance',
    content: [
      'These Terms govern access to and use of the website [www.nieusync.com] and of the content, features or services made available on it.',
      'By accessing or using the Website, the User declares that they have read, understood and accept these Terms. If you do not agree, you must cease using the Website.',
      'The NIEUSYNC IT Team may update these Terms. Material changes will be announced on the Website. Continued use after publication constitutes acceptance.',
      'NIEUSYNC reserves the right to refuse the provision of services to any client.',
    ],
  },
  {
    title: 'Definitions',
    content: [
      '“User” means any person who accesses the Website.',
      '“Content” includes text, images, graphics, logos, videos, software and other materials.',
    ],
  },
  {
    title: 'Eligibility and Account',
    content: [
      'The Website is intended for persons over 18 years of age, or for minors acting with the consent and supervision of their legal representative.',
      'Where applicable, creating an account requires accurate and complete information. The User is responsible for maintaining the confidentiality of their credentials and for all activity carried out on the account.',
    ],
  },
  {
    title: 'Permitted Use',
    content: [
      'The User is granted a personal, limited, non-exclusive and revocable licence to access and use the Website in accordance with the law and these Terms.',
      'Prohibited conduct: (i) reverse engineering, scraping or unauthorised automated data mining; (ii) uploading malicious code; (iii) infringement of third-party rights; (iv) interference with security or availability; (v) use of the Website for unlawful, deceptive or fraudulent purposes.',
    ],
  },
  {
    title: 'Intellectual Property Rights',
    content: [
      'Unless otherwise stated, the Content is owned by the NIEUSYNC IT Team or by its licensors and is protected by copyright, trade mark and other rights.',
      'Copying, modification, distribution, commercial exploitation or the creation of derivative works is not permitted without prior written authorisation.',
      'The trade marks and logos displayed are registered trade marks of their respective owners; no licence is granted.',
    ],
  },
  {
    title: 'User Content (where applicable)',
    content: [
      'The User warrants that they hold the necessary rights over any content they submit (“User Content”) and that such content infringes neither the law nor third-party rights.',
      'By submitting it, the User grants the NIEUSYNC IT Team a worldwide, non-exclusive, royalty-free licence, for the entire term of protection, to host, reproduce and display that content for the operation of the Website.',
      'Notification mechanism: requests for removal on grounds of alleged unlawfulness may be sent to [geral@nieusync.com], with sufficient reasons and evidence. This approach complies with the “notice-and-action” mechanism obligations laid down in Regulation (EU) 2022/2065 – Digital Services Act (applicable since 17.02.2024).',
      'The NIEUSYNC IT Team may moderate, remove or block User Content that infringes these Terms.',
    ],
  },
  {
    title: 'Third-Party Links and Services',
    content: [
      'The Website may contain hyperlinks to third-party websites. The NIEUSYNC IT Team neither controls nor is responsible for their content or practices.',
      'The use of third-party services is subject to their own terms and policies.',
    ],
  },
  {
    title: 'Privacy and Cookies',
    content: [
      'The processing of personal data is described in the Privacy Policy and complies with the GDPR and the national implementing law (Law no. 58/2019).',
      'The use of cookies and similar technologies is described in the Cookie Policy, in accordance with Law no. 41/2004 (as amended).',
    ],
  },
  {
    title: 'Information, Professional Content and Disclaimer',
    content: [
      'The Content of the Website is informative in nature. Unless expressly stated otherwise, it does not constitute legal, tax, financial or any other advice.',
      'The NIEUSYNC IT Team uses reasonable efforts to ensure accuracy and currency, but does not warrant that the Content is free from errors, omissions or interruptions.',
    ],
  },
  {
    title: 'Purchases, Subscriptions and Right of Withdrawal (where applicable)',
    content: [
      'Commercial terms (prices, taxes, renewals, cancellations) will be presented at the time of purchase.',
      'EU consumers: may benefit from the right of withdrawal within 14 days for distance contracts, subject to the statutory exceptions (for example, where performance of the services has begun with the consumer’s express consent). Based on Directive 2011/83/EU (applicable national implementations).',
      'Refunds will be processed using the same means of payment, unless otherwise agreed.',
    ],
  },
  {
    title: 'Security and Responsible Disclosure',
    content: [
      'Testing or circumventing security controls without written authorisation is not permitted.',
      'The NIEUSYNC IT Team encourages the responsible disclosure of vulnerabilities via [geral@nieusync.com]; no payment is due, except under programmes that have been explicitly announced.',
    ],
  },
  {
    title: 'Warranties and Limitation of Liability',
    content: [
      'The Website is provided “as is” and “as available”. To the fullest extent permitted by law, implied warranties of merchantability, fitness for a particular purpose and non-infringement are excluded.',
      'NIEUSYNC shall not be liable for (i) loss of profits, (ii) loss of data, (iii) indirect, consequential or punitive damages; liabilities which the law does not permit to be excluded (e.g. death or personal injury caused by negligence) are excepted.',
      'Where the User is a consumer, the above limitations do not affect their non-waivable statutory rights.',
    ],
  },
  {
    title: 'Indemnity',
    content:
      'The User agrees to indemnify NIEUSYNC against any losses, costs and expenses (including legal fees) arising from a breach of these Terms or from unlawful use of the Website.',
  },
  {
    title: 'Force Majeure',
    content:
      'NIEUSYNC shall not be liable for failures to perform resulting from events beyond its reasonable control (e.g. network failures, cyber attacks, natural disasters, among others).',
  },
  {
    title: 'Governing Law and Jurisdiction',
    content: [
      'These Terms are governed by Portuguese law, including Decree-Law no. 7/2004 (information society services / electronic commerce). ',
      'The courts of the judicial district of Santiago do Cacém shall have exclusive jurisdiction, without prejudice to the consumer protection rules and the mandatory rules on territorial jurisdiction applicable in the EU/EEA.',
      'Consumer Dispute Resolution: the former EU ODR Platform was discontinued on 20/07/2025; for assistance and alternative dispute resolution channels, please consult the European Commission’s updated resources.',
    ],
  },
  {
    title: 'General Provisions',
    content: [
      'Termination: The NIEUSYNC IT Team may suspend or terminate the User’s access for breach of these Terms.',
      'Assignment: the User may not assign their rights without NIEUSYNC’s written consent.',
      'Severability: the invalidity of any clause does not affect the validity of the remaining clauses.',
      'No Waiver: tolerance of a breach does not constitute a waiver.',
      'Language Precedence: In the event of any discrepancy, the Portuguese version shall prevail.',
    ],
  },
];

const terms = {
  title: 'Terms and Conditions',
  subtitle: 'General terms of use and of the provision of services',
  lastUpdated: 'October 2025',
  docTitle: 'General Terms and Conditions — NIEUSYNC',
  sections,
};

export type Terms = typeof terms;
export default terms;
