import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const origin = (site?.toString() ?? '').replace(/\/$/, '');
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${origin}${base}sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain' } });
};
