import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOCALE,
  DEFAULT_OG_IMAGE,
  GSC_TOKEN,
  BING_TOKEN,
} from './siteConfig';

export interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: object[];
  preloadImage?: string;
}

export function Seo({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  jsonLd,
  preloadImage,
}: SeoProps) {
  const { pathname } = useLocation();
  const url = canonical ?? `${SITE_URL}${pathname === '/' ? '' : pathname}`;
  const absOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
  const isHome = pathname === '/';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={absOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absOgImage} />

      {isHome && GSC_TOKEN && (
        <meta name="google-site-verification" content={GSC_TOKEN} />
      )}
      {isHome && BING_TOKEN && <meta name="msvalidate.01" content={BING_TOKEN} />}

      {preloadImage && <link rel="preload" as="image" href={preloadImage} />}

      {jsonLd?.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
