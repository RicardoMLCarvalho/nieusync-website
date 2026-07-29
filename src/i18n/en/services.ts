const services = {
  meta: {
    documentTitle:
      'NIEUSYNC - Services · Corporate Law, Strategic Management, Digital Marketing, Compliance and Information Technology',
  },
  hero: {
    label: 'What we do',
    title: 'Our services',
    subtitle: 'Every area is designed to complement the others and work as one.',
  },
  highlightTitle: 'You need this service if...',
  areas: {
    legal: {
      title: 'Corporate Law',
      description:
        'Complete legal protection for your business, from commercial contracts to regulatory compliance. Our team makes sure you operate within the law, safely and efficiently.',
      services: [
        'Commercial and service agreements',
        'GDPR compliance and data protection',
        'Employment law: contracts, terminations, obligations',
        'Corporate structuring and shareholder agreements',
        'Due diligence',
        'Commercial dispute resolution',
        'Internal regulations and company policies',
        'Ongoing legal advisory',
      ],
      highlightItems: [
        'You have verbal agreements with clients or suppliers',
        'You have never reviewed your employment contracts',
        'You are unsure whether you are GDPR compliant',
        'You are bringing in shareholders or partners for the first time',
      ],
      ctaText: 'Talk to a legal specialist',
    },
    management: {
      title: 'Strategic Management',
      description:
        'Organise, plan and scale your business with clear data and processes. We turn complexity into simple systems your team can run every day.',
      services: [
        'Financial organisation and cash flow control',
        'Dashboards and KPIs tailored to your sector',
        'Operational processes and internal manuals',
        'Automation of recurring tasks',
        'Strategic planning and budgeting',
        'Monthly follow-up with reporting',
        'Team structuring and org charts',
        'Preparation for funding or investment',
      ],
      highlightItems: [
        'You lack clarity on the real profitability of the business',
        'Your processes depend too heavily on you personally',
        'You need to prepare the company to grow or raise investment',
        'You want to make decisions with data instead of intuition',
      ],
      ctaText: 'Talk to a management specialist',
    },
    marketing: {
      title: 'Digital Marketing',
      description:
        'Integrated digital strategy and execution to attract, convert and retain B2B clients. From positioning to paid campaigns, we manage it all with a focus on results.',
      services: [
        'B2B digital marketing strategy',
        'LinkedIn, Instagram and Facebook management',
        'Google Ads (Search, Display, Performance Max)',
        'LinkedIn Ads and Meta Ads',
        'Content creation and management',
        'SEO and website optimisation',
        'Email marketing and newsletters',
        'Data analysis and performance reporting',
      ],
      highlightItems: [
        'You have little digital visibility in your sector',
        'Your paid campaigns are not generating ROI',
        'You do not have time to manage social media consistently',
        'You want to generate qualified leads predictably',
      ],
      ctaText: 'Talk to a marketing specialist',
    },
    compliance: {
      title: 'Compliance',
      description:
        'We make sure your company meets its legal and regulatory obligations, with a dedicated focus on GDPR, data protection, regulatory compliance, internal compliance policies and compliance audits.',
      services: [
        'GDPR implementation and auditing',
        'Personal data mapping and protection',
        'Sector-specific regulatory compliance',
        'Internal compliance policies',
        'Codes of conduct and business ethics',
        'Compliance audits',
        'Records of processing activities and DPIAs',
        'Privacy and data protection training',
      ],
      highlightItems: [
        'You have not yet appointed a Data Protection Officer (DPO)',
        'You are unsure whether you are GDPR compliant',
        'You need up-to-date internal compliance policies',
        'You want a compliance audit ahead of a significant transaction',
      ],
      ctaText: 'Talk to a compliance specialist',
    },
    technology: {
      title: 'Information Technology',
      description:
        'Technology solutions that digitise, automate and scale your business with the right tools.',
      services: [
        'Website development and maintenance',
        'Process automation with AI',
        'Digital tool integration (CRM, ERP)',
        'Technical support and IT consultancy',
        'Cloud data migration and management',
        'Cybersecurity and data protection',
        'Custom software for SMEs',
        'Digital tools training',
      ],
      highlightItems: [
        'Your processes still run on email and spreadsheets',
        'Your website neither delivers results nor reflects the company',
        'You need to integrate tools that do not talk to each other',
        'You want to adopt AI to gain operational efficiency',
      ],
      ctaText: 'Talk to an IT specialist',
    },
  },
  packages: {
    label: 'Packages',
    title: 'Choose your starting point',
    subtitle:
      'Every package is tailored to your needs, your sector and the size of your company.',
    priceLabel: 'On request',
    ctaText: 'Request a proposal',
    tiers: [
      {
        name: 'Essential',
        desc: 'For companies that need to solve a specific challenge quickly.',
        includes: [
          'Initial assessment',
          'One service area',
          'Tailored action plan',
          'Email support',
          'Monthly report',
        ],
      },
      {
        name: 'Growth',
        desc: 'For growing companies that need ongoing multidisciplinary support.',
        includes: [
          'Full 360º assessment',
          '2-3 service areas',
          'Annual strategic plan',
          'Dedicated monthly meeting',
          'Direct support for your team',
          'KPI dashboard',
          'Fortnightly report',
        ],
      },
      {
        name: 'Premium',
        desc: 'For companies looking for a trusted long-term strategic partner.',
        includes: [
          'All service areas',
          'Dedicated strategic partner',
          'Weekly meeting',
          'Hands-on implementation',
          'Priority access to the team',
          'Weekly reporting',
          'Funding preparation',
        ],
      },
    ],
  },
};

export type Services = typeof services;
export default services;
