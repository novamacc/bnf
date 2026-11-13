# Bodhisattva Nature Foundation — modern rebuild

A static, bilingual (English / 简体中文) rebuild of [bodhinature.com](https://bodhinature.com), made from the
foundation's own content and imagery. Astro 5, no client framework, ready for GitHub Pages.

- English at `/`, Simplified Chinese at `/zh/` — 15 routes each (home, about, programmes index, five programme
  pages, wisdom, community, events, volunteer, donate, visit/contact, 404).
- About 3 KB of inline JS per page (header state, mobile drawer, ⌘K search palette, quote rotator). No JS bundles.
- Search runs over a JSON index built at build time (`/search-index.json`, `/zh/search-index.json`). No service, no key.
- Build ≈ 7.3 MB; home page ≈ 0.98 MB transferred at 1440 px (uncompressed; less over gzip).

See [DATA.md](DATA.md) for what was harvested from the original site, how, and what could not be.

## Run it

Requires Node ≥ 22.12 (Astro 5).

```bash
npm ci
```

```bash
npm run dev        # http://localhost:4321/bodhinature/
```

```bash
npm run build      # → dist/
```

```bash
npm run preview    # serves dist/ at http://localhost:4321/bodhinature/
```

With the preview server running, check every route, link, image, fragment, `hreflang` and the size budget:

```bash
npm run check:site
```

### Base path and site URL

| Variable    | Default                   | Purpose                                              |
|-------------|---------------------------|------------------------------------------------------|
| `BASE_PATH` | `/bodhinature/`           | Sub-path the site is served from. Use `/` for a custom domain. |
| `SITE_URL`  | `https://example.github.io` | Origin used for canonicals, `hreflang`, `og:image`, sitemap and robots. |

```bash
BASE_PATH=/ SITE_URL=https://bodhinature.org npm run build
```

The preview server accepts requests by hostname (`server.allowedHosts: true` in `astro.config.mjs`); Vite
reads that from `server`, not `preview`, and otherwise answers 403 to anything but the IP.

## Deploy (GitHub Pages)

1. Push to a repository and set **Settings → Pages → Source: GitHub Actions**.
2. Push to `main`. `.github/workflows/deploy.yml` builds and deploys. It derives `BASE_PATH` from the
   repository name (`/<repo>/`, or `/` for a `<owner>.github.io` repository) and `SITE_URL` from Pages.

`public/.nojekyll`, `robots.txt` and a sitemap listing both language trees (with reciprocal `hreflang`) ship
with every build. GitHub Pages serves only the root `404.html`; it forwards misses under `/zh/` to the
Chinese 404.

## Where things live

```
src/
  views/            one view per page, taking a `lang` prop (Home, About, Programme, …)
  pages/            three-line route wrappers; pages/zh/ mirrors pages/
  components/       Header, Footer, Img, EventCard, PageHead, Mandala, Lotus, PrayerFlags
  layouts/Base.astro  <head>, hreflang, fonts, search dialog, the inline script
  i18n/en.ts, zh.ts   interface copy
  i18n/zh-data.ts     Chinese collections (text only; images inherited from the English data by index)
  data/content.ts     English collections: programmes, teachers, testimonials, sayings, branches, events, …
  data/site.ts        global contact data, rebuilt once from the boilerplate footer every page carried
  data/images.json    generated image manifest (sizes, widths, alpha)
  styles/global.css   design tokens and all styles
public/img/         generated WebP set
public/fonts/       Fraunces + Inter, self-hosted latin subsets
scripts/
  harvest.py        REST API + sitemap crawl + media download  → harvest/ (git-ignored, ~1.5 GB)
  extract.py        Divi HTML → ordered, de-duplicated block lists → harvest/blocks/
  images.py         originals → WebP set + manifest + favicon set
  check-site.mjs    route / link / hreflang / size checks
```

### Re-harvesting and regenerating images

Python 3.11+ with Pillow. The scripts take the harvest folder as an argument.

```bash
python -E -P scripts/harvest.py harvest
```

```bash
python -E -P scripts/extract.py harvest
```

```bash
python -E -P scripts/images.py harvest
```

`images.py` scans `src/` for every upload key it references (e.g. `'2024/08/dharma-.png'`), so adding an image
to the content is: put its key in `src/data/content.ts`, run `images.py`, build.

Image rules: WebP at 480 / 900 / 1600 with per-slot caps (content images stop at 900; only the hero and
full-width banners get 1600; portraits, QR codes and the PayPal mark stop at 160–480), `srcset` + `sizes`
everywhere, `loading="lazy"` except the hero and page-head images. The header logo ships at 180 / 360.
`bodhisattva.png` is flood-filled from its border to transparency. The favicon is copied byte for byte
(SHA-256 verified) with nearest-neighbour 180 / 192 / 512 PNGs.

## Content notes

- Facts come from the original site. Where it gives no date, time or address, the row is omitted.
- The two home-page events (Walk for Peace; Online Meditation Centre) and the Sweden branch came from the
  project brief, not the site. The Online Meditation Centre's details and its four themes are confirmed by the
  foundation's own poster (`2024/04/4-1.png`). Walk for Peace has no photo yet; its card shows a dated
  mandala tile. To add one, put the image key on the event in `src/data/content.ts` (keep
  `crop: 'watermark'`), and if it carries a phone watermark add the key to `CROPS` in `scripts/images.py`
  with the fraction of height to trim from the bottom, e.g. `{'2026/11/walk.jpg': 0.08}`.
- The Chinese name 菩萨性基金会 is this rebuild's rendering; the original site does not state one.
