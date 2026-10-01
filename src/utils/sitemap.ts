import { dealership } from '../data/dealership';
import type { Vehicle } from '../types/vehicle';

const STATIC_PATHS = ['/', '/inventory', '/financing', '/sell-trade', '/about', '/reviews', '/contact', '/privacy', '/terms', '/accessibility', '/disclaimers'];

/** Generates sitemap.xml at build/deploy time from the live inventory feed. */
export function buildSitemapXml(vehicles: Vehicle[]): string {
  const urls = [
  ...STATIC_PATHS.map((path) => ({ loc: `${dealership.siteUrl}${path}`, lastmod: new Date().toISOString().slice(0, 10) })),
  ...vehicles.filter((v) => v.status !== 'sold').map((v) => ({ loc: `${dealership.siteUrl}/inventory/${v.slug}`, lastmod: v.dateAdded }))];

  const body = urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
}

export const robotsTxt = `User-agent: *
Allow: /
Disallow: /saved
Disallow: /compare
Sitemap: ${dealership.siteUrl}/sitemap.xml`;