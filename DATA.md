# DATA — what was harvested from bodhinature.com

Harvested 2026-11-13 with `scripts/harvest.py` (stdlib Python, anonymous requests, 5 retries with back-off on
5xx/timeouts, up to 600 s per file). Everything lands in `harvest/` (git-ignored, ≈ 1.5 GB):

```
harvest/api/        raw REST responses, one JSON file per collection
harvest/sitemaps/   sitemap index + 9 child sitemaps
harvest/html/       rendered HTML of every sitemap URL (105 files)
harvest/files/      every downloaded file, mirroring the site's URL paths
harvest/blocks/     ordered block lists per page/post (scripts/extract.py) + _all.md, a readable dump
harvest/downloads.json, html_image_refs.json, urls.json, harvest.log
```

The site runs WordPress with Divi, WooCommerce, GiveWP, Smart Slider 3, Download Monitor and All in One SEO.

## 1. REST API

`/wp-json/` lists **1,098 routes** across 32 namespaces (the brief expected 1,099; the index returned 1,098 on
the day). Collections were paged with `per_page=100` until `X-WP-TotalPages`. One `_embed=1` URL was tested by
hand first (it returns a full list; a malformed query string would return `[]` silently).

| Endpoint | Items |
|---|---|
| `/wp/v2/pages?_embed=1` | 52 |
| `/wp/v2/posts?_embed=1` | 4 |
| `/wp/v2/media` | 811 (header `X-WP-Total: 817`) |
| `/wp/v2/categories` | 5 |
| `/wp/v2/tags` | 35 |
| `/wp/v2/users` | 2 |
| `/wp/v2/give_forms` | 1 |
| `/wp/v2/dlm_download` | 5 |
| `/wp/v2/comments` | 2 |
| `/wc/store/v1/products` | 1 |
| `/wp/v2/menus`, `/wp/v2/menu-items`, `/wp/v2/settings` | **401** anonymously |

## 2. Crawl

`sitemap.xml` (All in One SEO) is an index of **9 child sitemaps** (post, page, testimonial, give_forms,
product, dlm_download, post-archive, category, post_tag) listing **105 URLs**. All 105 were fetched and saved;
`<loc>` values are wrapped in CDATA and one page slug is percent-encoded Chinese (`无法访问`), both handled.

Every saved page was scanned for image references in `src`, `data-src`, `data-lazy-src`, `srcset`, `href`,
`content`, inline `style="background-image:url(…)"` and `<link>` tags: **362 distinct image URLs**, including
the **22 Smart Slider cache images** behind the homepage slideshow (`wp-content/uploads/slider/cache/…`) and
3 theme/plugin assets (Divi preloader, Smart Slider shadow, Woo Donations loader). None of those appear in the
media library.

Navigation was rebuilt from the rendered `<ul id="menu-primary-menu">`: Home, About, Program (Dharma Study,
Mindfulness, Tai Chi, Hospicecare, Happiness and Freedom, Wisdom Words), Community, Top Retreats, Donate,
Volunteer, Contact, CN/中文 (→ yimingzhiguang.com).

## 3. Files on disk

**9,460 files, 1.55 GB, 0 failures**:

| Source | Files |
|---|---|
| Media library originals | 811 |
| Media library intermediate sizes (every `media_details.sizes[*]`) | 8,618 |
| Found only in rendered HTML (slider cache, theme/plugin assets, others) | 30 |
| `favicon.ico` | 1 |

The 811 originals include every non-image upload the API exposes: 9 PDFs (the *Essence of Happiness and True
Freedom* book in EN/DE/FR/NL, plus Download Monitor copies), 5 MP4s, 3 ZIPs (`recite.zip`, `SINGAPORE.zip`,
`条状装饰.zip`) and the 32 MB `4月11日.mov`. Filenames with Chinese characters are fetched percent-encoded and
saved under their real names.

`favicon.ico` (32×32, 3,262 bytes) ships byte for byte: SHA-256
`7c073ade3d363286dd87cbd37a5b214dd17b947df8adec3d589032ddaa8332a8` matches between the download and
`public/favicon.ico`.

## 4. Turning Divi into content

`scripts/extract.py` parses each page's `content.rendered` into an ordered block list (h1–h6, p, li,
blockquote, img, background images, buttons). It drops everything inside `nav`, `header`, `footer`, `form`,
`script`, `style`, `svg`, `iframe` and Divi contact-form or menu modules; unescapes entities and collapses
whitespace; closes paragraphs that Divi leaves implicitly open; and de-duplicates repeated headings, text and
images (Divi repeats whole sections for mobile and desktop).

Two items come back as raw shortcodes and were converted by hand (text modules, image `src`, button URLs and
section backgrounds pulled out of the attributes): the **`top-course` page** and the **`weekend-retreat`
post**.

The per-page footer boilerplate ("Connect with us", the email and the city list) was stripped and rebuilt once
as `src/data/site.ts`. The page copy was then edited into a structured model rather than pasted:
`src/data/content.ts` (5 programmes, 5 testimonials, 14 sayings, 8 branches, events, 4 volunteer roles,
3 commitments, 2 teachers, stats, schedule, retreat precepts and rules, online classes, community
programmes). The Chinese (`src/i18n/zh-data.ts`) was written natively, not translated word for word.

### Images used by the rebuild

126 originals, all from the foundation's own uploads, become 271 WebP files (6.9 MB): the hero
`2022/06/Bodhi-Nature-Meditation-Courses.jpg`; the five programme icons (`2024/08/dharma-.png`,
`mindfulness-.png`, `taijiquan-.png`, `hospice-.png`, `happy-fish.png`, 1080² with alpha); the country
banners (Canada `2024/03/3-6.png`, United States `2-8.png`, Australia `1-11.png`, Singapore `4-2.png`, Japan
`2024/04/Japan-.png`); the CONTACT US banner and whale-earth illustration; PayPal and both QR codes; the
four-language book covers; and the event posters from the slider (`2026/10/…`) and the upcoming-events page
(`2024/04/4-1.png`).

## 5. Gaps and judgement calls

- **6 media records** (817 reported, 811 returned) are filtered out of the public collection and could not be
  fetched.
- **Menus and settings** are 401 anonymously; navigation comes from rendered HTML (above).
- **Sweden** appears nowhere on the site; it is only a country in WooCommerce's checkout dropdown. It is
  listed because the brief asks for it, with "Details to be announced". **Thailand** and **Malaysia** have no
  branch pages; their cities come from the contact page. These three use a mandala-and-lotus tile instead of a
  banner.
- **Walk for Peace** (Sunday 15 November, New York City) is not on the site; it comes from the brief. The
  brief mentions a supplied photo, but none was available to this build, so the card uses a dated mandala
  tile. No start time is known, so there is no time row.
- **Online Meditation Centre**: confirmed by the foundation's poster `2024/04/4-1.png` (空中禅堂·欧洲站):
  Saturdays and Sundays, 07:00 CET / 06:00 UK, about 1.5–2 hours. Its four themes are 情绪管理, 慈心冥想,
  放松疗愈, 滋养身心 (emotion management, loving-kindness meditation, relaxation and healing, nourishing body
  and mind).
- **The daily schedule** (06:00 / 08:45 / 14:30 / 17:00 / 19:00) comes from the brief. The site's own
  posters show a different Monday–Friday Zoom schedule in Pacific time (`2026/10/西海岸时间-入门-进阶-精进.jpg`).
- **The four upcoming retreats** on the Events page (The Dawn I, Journey to Mindfulness 11th edition,
  Awakening 2, Bodhi Class) were read from their slider posters; the site has no text version of them.
- **Chinese name.** The site never gives the foundation's Chinese name; 菩萨性基金会 is this rebuild's rendering.
- **Not carried over:** WooCommerce shop, cart and checkout; GiveWP donor dashboard and confirmation pages;
  "coming soon" stubs (natural healing, traditional culture, translation, an online weekend); the
  natural-food recipes; and the image-only pages (Tibetan Book quote cards, branch teacher sheets), which
  appear only as thumbnails. Videos stay on YouTube and are linked, not embedded. The PDFs are linked at
  their original URLs to keep the build under 8 MB.
- **Contact form.** The original Divi form posts to WordPress; a static site cannot, so the rebuild offers
  `mailto:` links instead.
