import { SITE_URL } from '../siteConfig';

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[], pagePath: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${pagePath}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
