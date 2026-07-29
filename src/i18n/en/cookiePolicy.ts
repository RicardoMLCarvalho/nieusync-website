type Section = { title: string; content: string | string[] };

const sections: Section[] = [
  {
    title: 'Framework and scope',
    content:
      'This Policy explains how NIEUSYNC uses cookies and similar technologies on the website. We comply with Law no. 41/2004 (transposing the ePrivacy Directive) and with the GDPR. In Portugal, the placing of cookies that are not strictly necessary requires prior and informed consent; strictly necessary cookies may be used without consent. "The CNPD recalls that those responsible for websites must inform users and obtain consent where required, and are responsible for the cookies they authorise to be placed on users\' devices."',
  },
  {
    title: 'What cookies and similar technologies are',
    content:
      '“Cookies” are small files stored on your device when you visit our site. Similar technologies (e.g. Local Storage, pixels, SDKs) may serve equivalent purposes and are covered by the same ePrivacy “cookie rule”.',
  },
  {
    title: 'Categories of cookies we may use',
    content: [
      'Strictly necessary (no consent required): essential to the operation and security of the site (session management, load balancing, language preference).',
      'Analytics/Statistics cookies (consent required): they collect anonymous information about use of the website (pages visited, time spent, errors). We use Google Analytics for this purpose.',
      'Functional/Preference cookies (consent required): they remember the user’s choices and personalise the experience.',
      'Marketing/Advertising cookies (consent required): used to display relevant advertising. They may include Meta Pixel and Google Ads cookies.',
      'Note on valid consent: pre-ticked boxes for accepting cookies are not permitted; consent must be express (opt-in) and freely given, and it must be as easy to refuse as to accept.',
    ],
  },
  {
    title: 'Third-Party Cookies',
    content: [
      'Google Analytics: for the analysis of traffic and user behaviour.',
      'Google Ads: for measuring the effectiveness of advertising campaigns.',
      'Meta Pixel (Facebook): for remarketing and conversion analysis.',
      'LinkedIn Insight Tag: for the analysis of professional audiences.',
    ],
  },
  {
    title: 'Rights of data subjects',
    content: [
      'Strictly necessary: exempted from consent under ePrivacy (Article 5(3)).',
      'All other categories: dependent on consent. Legitimate interest is not a sufficient legal basis for placing cookies; it may be relevant for subsequent processing of data once the cookies have been lawfully placed.',
    ],
  },
  {
    title: 'How we manage your consent',
    content: [
      'Consent banner: on first access, we present clear “Accept all”, “Reject all” and “Configure preferences” options. The user may withdraw (or change) consent at any time via [Manage cookie preferences] (a permanent link in the footer). Principles aligned with the EDPB Report on Cookie Banners.',
      'Validity/expiry of consent: we renew the consent request periodically or whenever the purposes/third parties change.',
    ],
  },
  {
    title: 'Management of cookies by the user',
    content: [
      'On our site: change your choices at any time via [Manage cookie preferences].',
      'In your browser: you may block/delete cookies in your browser settings (please note that certain features may cease to work).',
      'Analytics/advertising opt-out: some providers offer their own opt-out mechanisms.',
    ],
  },
  {
    title: 'Cookie Duration',
    content: [
      'Session cookies: they are deleted when you close the browser.',
      'Persistent cookies: they remain on the device until they expire or are manually deleted. Their duration varies between 30 days and 2 years, depending on the type.',
      'The NIEUSYNC privacy preferences cookie has a duration of 12 months.',
    ],
  },
  {
    title: 'Third parties and transfers',
    content:
      'Certain tools (analytics, A/B testing, advertising) involve third-party cookies and the transfer of data outside the EEA. In such cases, we apply appropriate safeguards (contractual and technical) and only activate collection after consent has been given.',
  },
  {
    title: 'Retention and review',
    content:
      'We keep records of consent and periodically review the cookies, providers and purposes. We will update this Policy whenever there are relevant changes.',
  },
];

const cookiePolicy = {
  title: 'Cookie Policy',
  subtitle: 'How we use cookies and similar technologies',
  lastUpdated: 'January 2025',
  docTitle: 'Cookie Policy — NIEUSYNC',
  sections,
};

export type CookiePolicy = typeof cookiePolicy;
export default cookiePolicy;
