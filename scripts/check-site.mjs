// Crawl the built site through a running server and verify every internal URL.
// Usage: node scripts/check-site.mjs [origin] [base]   (defaults: http://localhost:4321 /bodhinature/)
// Checks: every route in both languages returns 200; every internal href/src/srcset resolves;
// every #fragment exists on its target page; <html lang> and reciprocal hreflang are present;
// the build fits the size budgets.
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const origin = process.argv[2] ?? 'http://localhost:4321';
const base = process.argv[3] ?? '/bodhinature/';
const routes = ['', 'about/', 'programmes/', 'programmes/dharma-study/', 'programmes/mindfulness/', 'programmes/tai-chi/',
  'programmes/hospice-care/', 'programmes/happiness-freedom/', 'wisdom/', 'community/', 'events/', 'volunteer/', 'donate/', 'visit/'];
const pages = routes.flatMap((r) => [base + r, base + 'zh/' + r]);
const errors = [];
const seen = new Map();   // url -> status
const ids = new Map();    // page path -> Set(ids)
const frags = [];         // [from, path, id]

async function get(u) {
  if (seen.has(u)) return seen.get(u);
  const res = await fetch(origin + u);
  const body = /\.(html?|json|xml|txt)$|\/$/.test(u) ? await res.text() : (await res.arrayBuffer(), '');
  const out = { status: res.status, body, type: res.headers.get('content-type') ?? '' };
  seen.set(u, out);
  return out;
}

const attr = (html, re) => [...html.matchAll(re)].map((m) => m[1].replace(/&amp;/g, '&'));
for (const p of pages) {
  const { status, body: raw } = await get(p);
  const body = raw.replace(/<script[\s\S]*?<\/script>/g, '');
  if (status !== 200) { errors.push(`${p} → ${status}`); continue; }
  const lang = body.match(/<html[^>]*\slang="([^"]+)"/)?.[1];
  if (lang !== (p.includes('/zh/') ? 'zh-Hans' : 'en')) errors.push(`${p}: html lang="${lang}"`);
  for (const h of ['en', 'zh-Hans', 'x-default']) if (!body.includes(`hreflang="${h}"`)) errors.push(`${p}: missing hreflang ${h}`);
  ids.set(p, new Set(attr(body, /\sid="([^"]+)"/g)));
  const refs = [
    ...attr(body, /\shref="([^"]+)"/g), ...attr(body, /\ssrc="([^"]+)"/g), ...attr(body, /\sdata-index="([^"]+)"/g),
    ...attr(body, /\ssrcset="([^"]+)"/g).flatMap((s) => s.split(',').map((x) => x.trim().split(/\s+/)[0])),
  ];
  for (const r of refs) {
    if (/^(https?:|mailto:|tel:|data:)/.test(r) || r.startsWith('#')) {
      if (r.startsWith('#') && r.length > 1) frags.push([p, p, r.slice(1)]);
      continue;
    }
    const [path, frag] = r.split('#');
    if (!path.startsWith(base)) { errors.push(`${p}: link outside base: ${r}`); continue; }
    const { status: s } = await get(path);
    if (s !== 200) errors.push(`${p}: ${path} → ${s}`);
    if (frag) frags.push([p, path, frag]);
  }
}
for (const [from, path, id] of frags) {
  if (!ids.has(path)) { const { body } = await get(path); ids.set(path, new Set(attr(body, /\sid="([^"]+)"/g))); }
  if (!ids.get(path).has(id)) errors.push(`${from}: missing #${id} on ${path}`);
}
for (const f of ['404.html', 'zh/404/', 'robots.txt', 'sitemap.xml', 'search-index.json', 'zh/search-index.json', '.nojekyll', 'favicon.ico']) {
  const { status } = await get(base + f);
  if (status !== 200) errors.push(`${base + f} → ${status}`);
}
const sm = (await get(base + 'sitemap.xml')).body;
const locs = (sm.match(/<loc>/g) ?? []).length;
if (locs !== pages.length) errors.push(`sitemap lists ${locs} URLs, expected ${pages.length}`);

const du = (d) => readdirSync(d).reduce((n, f) => { const p = join(d, f); const s = statSync(p); return n + (s.isDirectory() ? du(p) : s.size); }, 0);
const total = du('dist');
if (total > 8 * 1024 * 1024) errors.push(`build is ${(total / 1048576).toFixed(2)} MB (> 8 MB)`);

console.log(`pages: ${pages.length}, internal URLs checked: ${seen.size}, fragments: ${frags.length}, sitemap URLs: ${locs}, build: ${(total / 1048576).toFixed(2)} MB`);
if (errors.length) { console.log(`\n${errors.length} problem(s):\n` + errors.join('\n')); process.exit(1); }
console.log('All checks passed.');
