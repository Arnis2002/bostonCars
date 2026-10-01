import { useEffect } from 'react';
import { dealership } from '../data/dealership';
import { dealerSchema } from '../utils/schema';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'product';
  schema?: object[];
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Per-route title, description, canonical, Open Graph and JSON-LD structured data. */
export function useSeo({ title, description, path, image, type = 'website', schema = [], noindex }: SeoOptions) {
  const schemaKey = JSON.stringify(schema);

  useEffect(() => {
    const url = `${dealership.siteUrl}${path}`;
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', dealership.name);
    setMeta('property', 'og:image', image ?? dealership.ogImage);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setCanonical(url);

    let script = document.getElementById('seo-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify([dealerSchema(), ...(JSON.parse(schemaKey) as object[])]);
  }, [title, description, path, image, type, schemaKey, noindex]);
}