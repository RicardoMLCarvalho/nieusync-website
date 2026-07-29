const checkup = {
  eyebrow: 'Compliance Check-up · 2 minutes · free',
  titleBefore: 'What an inspection would find in your company ',
  titleHighlight: 'before it happens',
  lede:
    'Twelve questions. At the end, a picture of the risk by area and an estimate of your exposure to fines. No cost, no commitment.',
  metaQuestions: 'questions',
  metaInstant: 'Instant',
  metaInstantLabel: 'result',
  metaAuthorities: 'ACT · AT · CNPD · Social Security',

  quiz: {
    counter: (n: number, total: number) => `Question ${n} of ${total}`,
    back: '← Previous',
  },

  areas: {
    labour: 'Labour',
    hs: 'Health & Safety',
    tax: 'Tax',
    social: 'Social Security',
    gdpr: 'GDPR',
    consumer: 'Consumer',
    governance: 'Governance',
  },

  questions: [
    {
      text: 'Do you keep a record of working time for every employee, with start, end and break times?',
      hint: 'The ACT checks this almost every time. Its absence is a serious offence.',
      options: [
        'Yes, kept up to date and retained',
        'It exists, but is not always up to date',
        'We do not have one',
        "I don't know",
      ],
    },
    {
      text: 'Do fixed-term contracts always state the justifying reason in writing?',
      hint: 'Omitting the reason converts the contract into a permanent one — and is a very serious offence.',
      options: [
        'Yes, always',
        'In most cases',
        'No / we do not check',
        'We have no fixed-term contracts',
      ],
    },
    {
      text: 'Do you have work accident insurance with cover equal to the salaries actually paid?',
      hint: 'Insufficient cover leaves the company exposed where it matters most. Very serious offence.',
      options: [
        'Yes, reviewed annually',
        'We have insurance, but I am unsure the cover is right',
        'I am not sure we have valid insurance',
        "I don't know",
      ],
    },
    {
      text: 'Is the risk assessment per workstation done and up to date?',
      hint: 'The founding document of workplace safety. Its absence is a very serious offence.',
      options: [
        'Yes, up to date',
        'Done more than 3 years ago',
        'We do not have one',
        "I don't know",
      ],
    },
    {
      text: 'Do employees undergo occupational health examinations (on hiring and periodically)?',
      hint: 'Mandatory for everyone. The fitness records must exist.',
      options: ['Yes, up to date', 'Some are overdue', 'We do not do them'],
    },
    {
      text: 'Do you issue all invoices through certified software and file the SAF-T monthly?',
      hint: 'The tax authority cross-checks data automatically. Gaps are detected without an on-site inspection.',
      options: [
        'Yes, both',
        'Certified invoicing, unsure about SAF-T',
        "No / I don't know",
      ],
    },
    {
      text: 'Are withholding taxes (IRS/IRC) paid over by the 20th of the following month?',
      hint: 'Late payment of withheld tax can, above a certain amount, amount to a criminal offence.',
      options: [
        'Yes, always',
        'There have been occasional delays',
        'Frequently late',
        "I don't know",
      ],
    },
    {
      text: 'Are new hires reported to Social Security in the 24 hours before they start?',
      hint: 'Reporting after the start date is already an infringement. One of the most common checks.',
      options: [
        'Yes, always beforehand',
        'Sometimes on the day itself',
        'We report afterwards',
      ],
    },
    {
      text: 'Do you keep a record of processing activities and a privacy policy?',
      hint: 'The CNPD can impose high fines. The Article 30 record is the bare minimum.',
      options: ['Yes, both', 'Only one of them', 'Neither', 'I do not know what that is'],
    },
    {
      text: 'If you use CCTV: is it signposted, limited to 30 days and not pointed at workstations?',
      hint: 'Misconfigured CCTV is among the most frequent complaints to the CNPD.',
      options: [
        'Yes, fully compliant',
        'We have it, but I am not sure',
        'It is not compliant',
        'We have no CCTV',
      ],
    },
    {
      text: 'If you serve the public: do you have a physical and electronic complaints book, with the notice displayed?',
      hint: 'The ASAE checks this immediately. Its absence is sanctioned on the spot.',
      options: [
        'Yes, both and displayed',
        'Only the physical one',
        'No / not displayed',
        'We do not serve the public',
      ],
    },
    {
      text: 'Is the RCBE (beneficial owner register) confirmed and the IES filed on time?',
      hint: 'Simple annual obligations, but forgetting them triggers automatic fines.',
      options: [
        'Yes, both up to date',
        'One of them is overdue',
        'Both outstanding',
        "I don't know",
      ],
    },
  ],

  bands: [
    {
      label: 'Low risk',
      title: 'Your foundations are solid.',
      text: 'You meet the essential obligations. Even so, some areas can only be confirmed by a documentary review — and today’s compliance does not remove the need for upkeep.',
    },
    {
      label: 'Moderate risk',
      title: 'There are gaps to close.',
      text: 'You meet part of your obligations, but we identified points an inspection would flag. Most can be fixed at low cost — if handled before the inspection.',
    },
    {
      label: 'High risk',
      title: 'Significant exposure.',
      text: 'Several essential obligations appear unmet. The likelihood of a fine during an inspection is real, and the cost of putting things right now is a fraction of the risk.',
    },
    {
      label: 'Critical risk',
      title: 'You need to act urgently.',
      text: 'The assessment reveals serious gaps in the areas inspectors check first. We recommend a full audit as a priority.',
    },
  ],

  result: {
    exposureLabel: 'Estimated sanction exposure',
    exposureNone: 'No exposure flagged',
    exposureTo: 'to',
    exposureFine:
      'Indicative sum of the fine brackets associated with the at-risk answers, scaled to the reality of SMEs — in data protection, however, the legal maximums can reach 20 million euros or 4% of worldwide turnover. This is not a prediction of the amount that would be applied.',
    exposureNoneFine:
      'No answer flagged direct sanction risk. To be confirmed by documentary review.',
    pillOk: 'Compliant',
    pillMid: 'To review',
    pillBad: 'Non-compliant',
    pillNa: 'Not applicable',
    restart: '↺ Restart the assessment',
  },

  lead: {
    title: 'Get the detailed report',
    subtitle:
      'We will send the full picture by area and the priorities for putting things right. No cost, no commitment.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    companyLabel: 'Company',
    companyPlaceholder: 'Company name',
    emailLabel: 'Email',
    emailPlaceholder: 'name@company.com',
    phoneLabel: 'Phone',
    phoneOptional: '(optional)',
    phonePlaceholder: '+351 9XX XXX XXX',
    submit: 'Send me my report →',
    consent:
      'I authorise NIEUSYNC to contact me about this assessment. The data is processed for that purpose only, under the GDPR, and is not shared with third parties.',
    errorName: 'Please enter your name.',
    errorEmail: 'Please enter a valid email address.',
    errorConsent: 'You must authorise contact so we can send the report.',
  },

  done: {
    title: 'Request received',
    text: 'Thank you. We will prepare your detailed report and one of our consultants will be in touch within the next working days.',
    keepBefore: 'Keep your result: index ',
    keepMiddle: ' · estimated exposure ',
    keepAfter: '.',
  },

  disclaimerTitle: 'Methodological note.',
  disclaimer:
    'This self-assessment is an indicative awareness tool, not legal advice or an audit. The index and estimated exposure follow from the answers given and from abstract legal brackets whose concrete application depends on the degree of fault, turnover, recidivism and other factors. A favourable result does not guarantee the absence of a fine in the event of an inspection, nor does an unfavourable result mean a fine will be imposed. A rigorous assessment requires an audit with documentary verification. The data entered is processed under the GDPR and the duty of professional secrecy (Article 92 of the Statute of the Portuguese Bar Association).',
};

export type Checkup = typeof checkup;
export default checkup;
