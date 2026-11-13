import { en } from './en';
import { zh } from './zh';
import { content } from '../data/content';
import { zhContent } from './zh-data';
import type { Content } from '../data/types';

export type Lang = 'en' | 'zh';
export const langs: Lang[] = ['en', 'zh'];

export const dict = (lang: Lang) => (lang === 'zh' ? zh : en);
export const data = (lang: Lang): Content => (lang === 'zh' ? zhContent : content);

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

/** Route keys → path segments (identical in both languages). */
export const routes = {
  home: '',
  about: 'about/',
  programmes: 'programmes/',
  wisdom: 'wisdom/',
  community: 'community/',
  events: 'events/',
  volunteer: 'volunteer/',
  donate: 'donate/',
  visit: 'visit/',
} as const;
export type RouteKey = keyof typeof routes;

/** Path for a route in a language, base-aware: url('zh', 'about') → /bodhinature/zh/about/ */
export function url(lang: Lang, path: RouteKey | string = 'home'): string {
  const seg = path in routes ? routes[path as RouteKey] : path.replace(/^\/+/, '');
  return BASE + (lang === 'zh' ? 'zh/' : '') + seg;
}

export const programmeUrl = (lang: Lang, slug: string) => url(lang, `programmes/${slug}/`);

/** Asset path under public/, base-aware. */
export const asset = (p: string) => BASE + p.replace(/^\/+/, '');

/** Strip the language prefix and base from a pathname → route-relative path. */
export function relPath(pathname: string): string {
  let p = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname.replace(/^\/+/, '');
  if (p.startsWith('zh/')) p = p.slice(3);
  else if (p === 'zh') p = '';
  return p;
}
