import type { APIRoute } from 'astro';
import { url, programmeUrl, routes, langs } from '../i18n';
import { content } from '../data/content';

/** Both language trees, with reciprocal hreflang alternates. */
export const GET: APIRoute = ({ site }) => {
  const origin = (site?.toString() ?? '').replace(/\/$/, '');
  const keys: string[] = [...Object.keys(routes), ...content.programmes.map((p) => `programmes/${p.slug}/`)];
  const href = (lang: 'en' | 'zh', k: string) => origin + (k.startsWith('programmes/') && k !== 'programmes' ? programmeUrl(lang, k.split('/')[1]) : url(lang, k));
  const body = keys.flatMap((k) => langs.map((lang) => `<url><loc>${href(lang, k)}</loc>` +
    `<xhtml:link rel="alternate" hreflang="en" href="${href('en', k)}"/>` +
    `<xhtml:link rel="alternate" hreflang="zh-Hans" href="${href('zh', k)}"/></url>`)).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } });
};
