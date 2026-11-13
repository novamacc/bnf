"""Harvest bodhinature.com: REST API collections, sitemap crawl, all referenced media.

Usage: python -I scripts/harvest.py <outdir>
Stdlib only. Idempotent: skips files already on disk.
"""
import json, os, re, sys, time, html, hashlib
import urllib.request, urllib.error, urllib.parse
from concurrent.futures import ThreadPoolExecutor

BASE = "https://bodhinature.com"
OUT = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else "harvest")
UA = "Mozilla/5.0 (site-rebuild harvester)"
LOG = []

def log(*a):
    s = " ".join(str(x) for x in a)
    print(s, flush=True)
    LOG.append(s)

def iri(url):
    """Percent-encode non-ASCII characters (Chinese filenames) without double-encoding."""
    return urllib.parse.quote(url, safe=":/?&=%#+,;@!$'()*[]~")

def get(url, timeout=90, tries=5):
    last = None
    url = iri(url)
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.status, dict(r.headers), r.read()
        except urllib.error.HTTPError as e:
            if e.code < 500:
                return e.code, dict(e.headers or {}), e.read() if hasattr(e, "read") else b""
            last = e
        except Exception as e:
            last = e
        time.sleep(2 * (i + 1))
    log("FAIL", url, last)
    return None, {}, b""

def save(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(data)

def collection(route, extra="", name=None):
    name = name or route.strip("/").replace("/", "_")
    items, page, total_pages = [], 1, 1
    while page <= total_pages:
        sep = "&" if "?" in route else "?"
        url = f"{BASE}/wp-json{route}{sep}per_page=100&page={page}{extra}"
        st, hd, body = get(url, timeout=180)
        if st != 200:
            log("collection", route, "status", st)
            break
        total_pages = int(hd.get("X-WP-TotalPages") or hd.get("x-wp-totalpages") or 1)
        data = json.loads(body)
        if isinstance(data, dict):
            data = [data]
        items += data
        page += 1
    save(os.path.join(OUT, "api", name + ".json"), json.dumps(items, ensure_ascii=False, indent=1).encode())
    log(f"api {route}: {len(items)} items")
    return items

def main():
    os.makedirs(OUT, exist_ok=True)
    st, hd, body = get(BASE + "/wp-json/", timeout=120)
    save(os.path.join(OUT, "api", "index.json"), body)
    idx = json.loads(body)
    log("routes:", len(idx.get("routes", {})))

    def cached(route, extra=""):
        fp = os.path.join(OUT, "api", route.strip("/").replace("/", "_") + ".json")
        if os.path.exists(fp) and os.path.getsize(fp) > 2:
            d = json.load(open(fp, encoding="utf-8")); log(f"api {route}: {len(d)} items (cached)"); return d
        return collection(route, extra)
    pages = cached("/wp/v2/pages", "&_embed=1")
    posts = cached("/wp/v2/posts", "&_embed=1")
    media = cached("/wp/v2/media")
    for r in ["/wp/v2/categories", "/wp/v2/tags", "/wp/v2/users", "/wp/v2/give_forms",
              "/wp/v2/dlm_download", "/wp/v2/comments", "/wc/store/v1/products"]:
        collection(r)
    for r in ["/wp/v2/menus", "/wp/v2/menu-items", "/wp/v2/settings"]:
        s, _, _ = get(f"{BASE}/wp-json{r}", tries=1)
        log("restricted", r, s)

    # sitemap crawl
    urls, sitemaps, seen = [], [BASE + "/sitemap.xml"], set()
    while sitemaps:
        sm = sitemaps.pop(0)
        if sm in seen: continue
        seen.add(sm)
        s, _, b = get(sm)
        if s != 200:
            # WordPress core sitemap fallback
            if sm.endswith("/sitemap.xml"):
                sitemaps.append(BASE + "/wp-sitemap.xml")
            continue
        save(os.path.join(OUT, "sitemaps", re.sub(r"[^\w.-]", "_", sm.split("//")[1]) ), b)
        locs = re.findall(r"<loc>\s*(.*?)\s*</loc>", b.decode("utf-8", "replace"))
        for l in locs:
            l = html.unescape(re.sub(r"^<!\[CDATA\[(.*)\]\]>$", r"\1", l.strip())).strip()
            if not l.startswith("http"): continue
            (sitemaps if l.endswith(".xml") or "sitemap" in l.split("/")[-1] else urls).append(l)
    log("child sitemaps:", len(seen) - 1, "urls:", len(urls))
    for p in pages + posts:
        if p.get("link") and p["link"] not in urls:
            urls.append(p["link"])
    urls = list(dict.fromkeys(urls))
    json.dump(urls, open(os.path.join(OUT, "urls.json"), "w"), indent=1)

    def fetch_page(u):
        slug = urllib.parse.urlparse(u).path.strip("/").replace("/", "__") or "home"
        fp = os.path.join(OUT, "html", slug + ".html")
        if os.path.exists(fp): return u, open(fp, "rb").read()
        s, _, b = get(u)
        if s == 200: save(fp, b)
        else: log("html", u, s)
        return u, b if s == 200 else b""
    with ThreadPoolExecutor(6) as ex:
        htmls = list(ex.map(fetch_page, urls))
    log("html saved:", sum(1 for _, b in htmls if b))

    # image refs from HTML
    refs = {}
    pat_attr = re.compile(r'''(?:src|data-src|data-lazy-src|href|content|data-desktop|data-bg)\s*=\s*["']([^"']+)["']''', re.I)
    pat_srcset = re.compile(r'''srcset\s*=\s*["']([^"']+)["']''', re.I)
    pat_url = re.compile(r'''url\(\s*['"]?([^'")]+)['"]?\s*\)''', re.I)
    ext = re.compile(r"\.(jpe?g|png|gif|webp|svg|ico|avif)(\?|$)", re.I)
    for u, b in htmls:
        t = b.decode("utf-8", "replace")
        cands = pat_attr.findall(t) + pat_url.findall(t)
        for ss in pat_srcset.findall(t):
            cands += [x.strip().split(" ")[0] for x in ss.split(",")]
        for c in cands:
            c = html.unescape(c).replace("\\/", "/")
            full = urllib.parse.urljoin(u, c)
            if "bodhinature.com" in full and ext.search(full):
                refs.setdefault(full.split("?")[0], set()).add(u)
    log("html image refs:", len(refs))

    allfiles = {}
    for m in media:
        if m.get("source_url"):
            allfiles[m["source_url"]] = "media"
        for sz in (m.get("media_details") or {}).get("sizes", {}).values():
            if sz.get("source_url"):
                allfiles.setdefault(sz["source_url"], "media-size")
    for r in refs:
        allfiles.setdefault(r, "html")
    allfiles.setdefault(BASE + "/favicon.ico", "favicon")
    json.dump({k: sorted(v) for k, v in refs.items()}, open(os.path.join(OUT, "html_image_refs.json"), "w"), indent=1)

    def dl(item):
        url, src = item
        p = urllib.parse.urlparse(url).path.lstrip("/")
        fp = os.path.join(OUT, "files", urllib.parse.unquote(p))
        if os.path.exists(fp) and os.path.getsize(fp) > 0: return url, "cached", src
        s, _, b = get(url, timeout=600)
        if s == 200 and b:
            save(fp, b); return url, "ok", src
        return url, f"fail {s}", src
    with ThreadPoolExecutor(8) as ex:
        res = list(ex.map(dl, allfiles.items()))
    json.dump(res, open(os.path.join(OUT, "downloads.json"), "w"), indent=1)
    ok = sum(1 for r in res if r[1] in ("ok", "cached"))
    log(f"downloads: {ok}/{len(res)} ok; failures: {[r for r in res if r[1] not in ('ok','cached')][:30]}")
    open(os.path.join(OUT, "harvest.log"), "w", encoding="utf-8").write("\n".join(LOG))

if __name__ == "__main__":
    main()
