const common = {
  whatsapp: {
    ariaLabel: 'Send a message on WhatsApp',
    tooltip: 'Talk to us',
    prefilledMessage: 'Hello, I would like to know more about NIEUSYNC',
  },
  cookieBanner: {
    textBefore: 'We use cookies to improve your experience. By continuing, you accept our',
    privacyLink: 'Privacy Policy',
    textAfter: '.',
    accept: 'Accept',
    reject: 'Decline',
  },
  legal: {
    backToAbout: '← About Us',
    tocTitle: 'Contents',
    questionsPrompt: 'Questions about this document?',
    contactCta: 'Contact Us',
    documentLabel: 'Document:',
    lastUpdatedLabel: 'Last updated:',
    footerContactBefore: 'For questions relating to this document, please contact us by email at',
    footerContactAfter: 'or by telephone on (+351) 269 030 096.',
  },
};

export type Common = typeof common;
export default common;
