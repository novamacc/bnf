import { dict, data, url, programmeUrl, type Lang } from '../i18n';

export interface Entry { t: string; u: string; k: string; s?: string; x?: string }

/** Build-time search index for one language: pages, programmes, sections, sayings, places, events, roles. */
export function buildIndex(lang: Lang): Entry[] {
  const t = dict(lang); const d = data(lang);
  const K = lang === 'zh'
    ? { page: '页面', prog: '项目', topic: '主题', saying: '法语', place: '地点', event: '活动', role: '义工' }
    : { page: 'Page', prog: 'Programme', topic: 'Topic', saying: 'Wisdom', place: 'Place', event: 'Event', role: 'Volunteer' };
  const out: Entry[] = [];
  const pages: [string, string, string][] = [
    ['home', t.nav.home, t.description], ['about', t.nav.about, t.about.lead], ['programmes', t.nav.programmes, t.programmes.lead],
    ['wisdom', t.nav.wisdom, t.wisdom.lead], ['community', t.nav.community, t.community.lead], ['events', t.nav.events, t.events.lead],
    ['volunteer', t.nav.volunteer, t.volunteer.intro], ['donate', t.nav.donate, t.donate.intro.join(' ')], ['visit', t.nav.visit, t.visit.lead],
  ];
  for (const [k, title, s] of pages) out.push({ t: title, u: url(lang, k), k: K.page, s });
  for (const p of d.programmes) {
    const u = programmeUrl(lang, p.slug);
    out.push({ t: p.title, u, k: K.prog, s: p.short, x: [p.lead, ...p.intro].join(' ') });
    for (const s of p.sections) out.push({ t: s.title, u: u + (s.id ? '#' + s.id : ''), k: K.topic, s: p.title, x: [...(s.body ?? []), ...(s.list ?? []), s.quote ?? ''].join(' ') });
    for (const x of p.practices?.items ?? []) if (x.text) out.push({ t: x.title, u, k: K.topic, s: p.title, x: x.text });
  }
  d.sayings.forEach((s) => out.push({ t: s.title, u: url(lang, 'wisdom'), k: K.saying, s: s.text.slice(0, 90), x: s.text }));
  for (const b of d.branches) out.push({ t: b.country, u: url(lang, 'visit') + '#' + b.id, k: K.place, s: b.cities ?? b.note, x: [b.address, b.email, b.phone].filter(Boolean).join(' ') });
  for (const e of d.events) out.push({ t: e.title, u: url(lang, 'events') + '#' + e.id, k: K.event, s: `${e.date} · ${e.place}`, x: e.text });
  for (const r of d.volunteerRoles) out.push({ t: r.title, u: url(lang, 'volunteer'), k: K.role, s: r.tags, x: r.text.join(' ') });
  for (const c of d.community) out.push({ t: c.title, u: url(lang, 'community'), k: K.topic, s: t.nav.community, x: c.text.join(' ') });
  return out;
}
