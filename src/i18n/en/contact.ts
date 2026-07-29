const contact = {
  documentTitle: 'NIEUSYNC - Contact · Book a Consultation',

  hero: {
    label: 'Contact',
    title: 'Talk to us',
    subtitle: 'A 30-minute consultation can change the way you run your business.',
  },

  info: {
    title: 'Get in touch',
    body: 'Our team is on hand to answer any question and help you work out the best path forward for your business.',
    labels: {
      phone: 'Phone',
      mobile: 'Mobile / WhatsApp',
      email: 'Email',
      website: 'Website',
    },
  },

  whatsapp: {
    cta: 'Send a message on WhatsApp',
    prefill: 'Hello, I would like to know more about NIEUSYNC',
  },

  schedule: {
    title: 'Prefer to book directly?',
    body: 'Pick the time that best suits your schedule and we will confirm availability as quickly as possible. Meetings in person, by video call or by phone.',
    cta: 'Book in the Calendar',
  },

  form: {
    title: 'Book a 30-minute consultation',
    subtitle: 'Fill in the form and we will get back to you as soon as possible.',
    name: {
      label: 'Full name *',
      placeholder: 'Your name',
    },
    email: {
      label: 'Work email *',
      placeholder: 'name@company.com',
    },
    phone: {
      label: 'Phone *',
      placeholder: '+351 912 345 678',
    },
    company: {
      label: 'Company name',
      placeholder: 'Your company',
    },
    sector: {
      label: 'Industry sector *',
      placeholder: 'Select your sector',
      options: {
        technology: 'Technology',
        commerce: 'Retail & Commerce',
        services: 'Services',
        construction: 'Construction',
        agriculture: 'Agriculture',
        tourism: 'Tourism',
        health: 'Healthcare',
        other: 'Other',
      },
    },
    challenge: {
      label: 'Main challenge *',
      placeholder: 'Select your main challenge',
      options: {
        legal: 'Legal matters',
        compliance: 'Compliance and data protection',
        marketing: 'Marketing and growth',
        processes: 'Processes and automation',
        unsure: 'I am not sure where to start',
      },
    },
    message: {
      label: 'Message',
      placeholder: 'Tell us more about your business...',
    },
    consent: {
      before: 'I have read and accept the ',
      privacyLink: 'Privacy Policy',
      after: ' and I consent to the processing of my data so that you may contact me.',
    },
    submit: 'Send request →',
    note: 'Guaranteed response within 24 business hours.',
  },

  success: {
    title: 'Request sent!',
    body: 'We will get back to you as soon as possible.',
  },
};

export type Contact = typeof contact;
export default contact;
