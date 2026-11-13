import { defineConfig } from 'astro/config';

// BASE_PATH: '/bodhinature/' by default (GitHub project pages); '/' for a custom domain.
const rawBase = process.env.BASE_PATH ?? '/bodhinature/';
const base = ('/' + rawBase.replace(/^\/+|\/+$/g, '') + '/').replace(/^\/\/$/, '/');
const site = process.env.SITE_URL ?? 'https://example.github.io';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never', assets: '_assets' },
  compressHTML: true,
  // Vite only honours allowedHosts under `server`, also for `astro preview`.
  server: { host: true, allowedHosts: true },
  vite: { server: { allowedHosts: true }, preview: { allowedHosts: true } },
});
