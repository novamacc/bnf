"""Parse each page/post's Divi HTML into an ordered, deduplicated block list.

Usage: python -I scripts/extract.py <harvest_dir>
Writes <harvest_dir>/blocks/<slug>.json and blocks/_all.md (human-readable dump).
"""
import json, os, re, sys, html
from html.parser import HTMLParser

H = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else "harvest")
SKIP = {"nav", "footer", "header", "form", "script", "style", "noscript", "svg", "iframe"}
BLOCK = {"h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "blockquote", "figcaption", "td"}
INLINE = {"a", "span", "strong", "em", "b", "i", "u", "sup", "sub", "font", "small", "mark", "abbr", "code"}
VOID = {"img", "br", "hr", "input", "meta", "link", "source", "area", "col", "embed", "wbr"}

# boilerplate footer that every page carries
FOOTER_PAT = re.compile(r"(info@bodhinature|connection points|toronto|vancouver|montreal|copyright|all rights reserved)", re.I)

def norm(s):
    return re.sub(r"\s+", " ", html.unescape(s)).strip()

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocks, self.stack, self.skip, self.cur = [], [], 0, None
    def flush(self):
        if self.cur is not None:
            self.cur["text"] = "\n".join(norm(l) for l in self.cur["text"].split("\n")).strip()
            if self.cur["text"]: self.blocks.append(self.cur)
            self.cur = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag not in INLINE and tag != "br":
            self.flush()
        if tag in VOID:
            if self.skip: return
            if tag == "img":
                src = a.get("src") or a.get("data-src") or ""
                if src and not src.startswith("data:"):
                    self.blocks.append({"t": "img", "src": src, "alt": norm(a.get("alt") or ""),
                                        "w": a.get("width"), "h": a.get("height")})
            elif tag == "br" and self.cur is not None:
                self.cur["text"] += "\n"
            return
        self.stack.append(tag)
        cls = a.get("class") or ""
        if tag in SKIP or "et_pb_contact_form" in cls or "et_pb_menu" in cls:
            self.skip += 1; self.stack[-1] = "#skip:" + tag; return
        if self.skip: return
        if "background-image" in (a.get("style") or ""):
            m = re.search(r"url\(['\"]?([^'\")]+)", a["style"])
            if m: self.blocks.append({"t": "bg", "src": m.group(1)})
        if tag == "a" and ("et_pb_button" in cls or "button" in cls):
            self.btn = {"t": "button", "href": a.get("href", ""), "text": ""}
            self.blocks.append(self.btn)
            self.stack[-1] = "#btn"
            return
        if tag in BLOCK and self.cur is None:
            self.cur = {"t": tag, "text": ""}
            self.curtag = tag
            self.stack[-1] = "#blk:" + tag
        elif tag == "a" and self.cur is not None and a.get("href"):
            self.cur.setdefault("links", []).append(a["href"])
    def handle_endtag(self, tag):
        if tag in VOID or not self.stack: return
        if tag not in INLINE: self.flush()
        # pop to matching
        for i in range(len(self.stack) - 1, -1, -1):
            s = self.stack[i]
            if s == tag or s.endswith(":" + tag) or (s == "#btn" and tag == "a"):
                for x in self.stack[i:]:
                    if x.startswith("#skip:"): self.skip -= 1
                    if x.startswith("#blk:") and self.cur is not None:
                        self.cur["text"] = "\n".join(norm(l) for l in self.cur["text"].split("\n")).strip()
                        if self.cur["text"]: self.blocks.append(self.cur)
                        self.cur = None
                    if x == "#btn": self.btn["text"] = norm(self.btn["text"])
                del self.stack[i:]
                return
    def handle_data(self, d):
        if self.skip: return
        if self.stack and self.stack[-1] == "#btn" or getattr(self, "btn", None) and "#btn" in self.stack:
            self.btn["text"] += d; return
        if self.cur is not None:
            self.cur["text"] += d
        elif d.strip():
            self.blocks.append({"t": "text", "text": norm(d)})

def dedupe(blocks):
    out, seen = [], set()
    for b in blocks:
        key = (b["t"] if b["t"] not in ("img", "bg") else "img", b.get("text") or re.sub(r"-\d+x\d+(?=\.\w+$)", "", b.get("src", "")) or b.get("href"))
        if b["t"] in ("text", "p", "li", "td") and len(b.get("text", "")) < 2: continue
        if key in seen: continue
        seen.add(key)
        if b["t"] != "img" and b["t"] != "bg" and FOOTER_PAT.search(b.get("text", "")) and len(b.get("text", "")) < 200:
            continue
        out.append(b)
    return out

def shortcode_to_html(s):
    # Divi raw shortcode pages: keep inner content of text modules, pull image src attrs
    s = re.sub(r'\[et_pb_image[^\]]*src="([^"]+)"[^\]]*\]', r'<img src="\1">', s)
    s = re.sub(r'\[et_pb_button[^\]]*button_url="([^"]*)"[^\]]*button_text="([^"]*)"[^\]]*\]', r'<a class="et_pb_button" href="\1">\2</a>', s)
    s = re.sub(r'background_image="([^"]+)"', r'><div style="background-image:url(\1)"></div><', s)
    s = re.sub(r"\[/?[a-z_]+[^\]]*\]", "\n", s)
    return s

def main():
    os.makedirs(os.path.join(H, "blocks"), exist_ok=True)
    items = []
    for kind in ("pages", "posts"):
        for x in json.load(open(os.path.join(H, "api", f"wp_v2_{kind}.json"), encoding="utf-8")):
            items.append((kind, x))
    dump = []
    for kind, x in items:
        body = x["content"]["rendered"]
        raw = bool(re.search(r"\[et_pb_(section|row|text)", body))
        if raw: body = shortcode_to_html(body)
        p = P(); p.feed(body); p.close()
        blocks = dedupe(p.blocks)
        feat = None
        emb = x.get("_embedded", {}).get("wp:featuredmedia")
        if emb and isinstance(emb, list) and emb[0].get("source_url"): feat = emb[0]["source_url"]
        rec = {"id": x["id"], "kind": kind, "slug": x["slug"], "title": norm(x["title"]["rendered"]),
               "link": x["link"], "raw_shortcodes": raw, "featured": feat, "blocks": blocks}
        json.dump(rec, open(os.path.join(H, "blocks", x["slug"][:60] + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        dump.append(f"\n\n######## {kind}:{x['slug']}  — {rec['title']}  {'[RAW SHORTCODES]' if raw else ''}\nfeatured: {feat}\n")
        for b in blocks:
            if b["t"] in ("img", "bg"): dump.append(f"  [{b['t']}] {b['src']}  {b.get('alt','')}")
            elif b["t"] == "button": dump.append(f"  [button] {b['text']} -> {b['href']}")
            else: dump.append(f"  <{b['t']}> {b['text']}")
    open(os.path.join(H, "blocks", "_all.md"), "w", encoding="utf-8").write("\n".join(dump))
    print("extracted", len(items))

if __name__ == "__main__":
    main()
