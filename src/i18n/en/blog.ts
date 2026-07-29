const blog = {
  documentTitle:
    'NIEUSYNC - Blog & Resources · Articles on Business Law, Compliance, Strategic Management, Digital Marketing, Information Technology and Artificial Intelligence',
  hero: {
    label: 'Knowledge',
    title: 'Blog & Resources',
    subtitle:
      'Practical articles on Business Law, Compliance, Strategic Management, Digital Marketing, Information Technology and Artificial Intelligence, for companies that want to grow on solid foundations.',
  },
  categories: {
    all: 'All',
    law: 'Law',
    marketing: 'Marketing',
    management: 'Management',
    finance: 'Finance',
    technology: 'Technology',
  },
  list: {
    loading: 'Loading articles...',
    empty: 'No articles found in this category.',
    readArticle: 'Read article →',
  },
  readTime: (min: number) => `${min} min read`,
  newsletter: {
    title: 'Monthly Newsletter',
    success: 'Thank you! Please check your inbox to confirm your subscription.',
    description:
      'Get our best articles on Business Law, Compliance, Strategic Management, Digital Marketing, Information Technology and Artificial Intelligence delivered straight to your inbox.',
    emailLabel: 'Work email',
    emailPlaceholder: 'email@company.com',
    duplicate: 'This email is already subscribed.',
    error: 'Something went wrong. Please try again.',
    submitting: 'Subscribing...',
    submit: 'Subscribe',
    disclaimer: 'No spam. Unsubscribe at any time.',
  },
  help: {
    title: 'Need help?',
    description: 'Talk to our team directly, with no obligation.',
    cta: 'Book a Consultation',
  },
  article: {
    documentTitle: (title: string) => `NIEUSYNC - ${title}`,
    loading: 'Loading article...',
    notFoundTitle: 'Article not found',
    notFoundCta: 'Back to Blog',
    backToBlog: '← Back to Blog',
    ctaText: 'Enjoyed this article? Talk to our team.',
    ctaButton: 'Book a free call →',
  },
};

export type Blog = typeof blog;
export default blog;
