"""Build the site's image set from the harvested originals.

Usage: python -I scripts/images.py <harvest_dir>

* Scans src/ for every referenced upload key ("2024/08/dharma-.png", "slider/cache/<hash>/<file>").
* Writes WebP at 480/900/1600 (never upscaling, capped per slot) to public/img/,
  and src/data/images.json with dimensions + available widths.
* Special cases: header logo at 180/360; bodhisattva.png flood-filled to transparency;
  phone-watermark crop on event photos; favicon copied byte for byte + nearest-neighbour PNGs.
"""
import hashlib, json, os, re, shutil, sys
from collections import deque
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
H = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "harvest"))
UP = os.path.join(H, "files", "wp-content", "uploads")
OUT = os.path.join(ROOT, "public", "img")
MANIFEST = os.path.join(ROOT, "src", "data", "images.json")
WIDTHS = [480, 900, 1600]

KEY_RE = re.compile(r"""['"]((?:20\d\d/\d\d|slider/cache/[0-9a-f]{32})/[^'"]+?\.(?:png|jpe?g|webp|gif))['"]""", re.I)

# Width caps per slot (largest file worth shipping). Keys not listed get DEFAULT_CAP:
# content images never display wider than ~600 CSS px, so 900 covers 1.5x screens.
DEFAULT_CAP = 900
WIDE = re.compile(r"Bodhi-Nature-Meditation-Courses|Contact-Us-new|programs-new|community-bodhinature")
CAPS = [
    (WIDE, 1600),
    (re.compile(r"75x75_auto"), 160),           # testimonial portraits (originals are tiny)
    (re.compile(r"2024/08/(dharma|mindfulness|taijiquan|hospice|happy-fish)-?\.png"), 900),  # programme icons
    (re.compile(r"paypal|微信图片_20260515"), 480),  # PayPal mark, QR codes
    (re.compile(r"Learning|Reflecting|Practicing"), 900),
    (re.compile(r"Branch-[Tt]eachers|teachers|SCHEDULE|schedual|regular-activities|course-2"), 900),
    (re.compile(r"2024/05/(195913178|Germany|fr-|e24236)"), 900),  # book covers
]
# Phone watermark crops: fraction of height removed from the bottom.
CROPS = {}
TRANSPARENT = {"2024/08/bodhisattva.png"}
LOGO = "2022/05/logo-1.png"


def cap_for(key):
    for pat, cap in CAPS:
        if pat.search(key):
            return cap
    return DEFAULT_CAP


def slug(key):
    base = re.sub(r"\.[a-z]+$", "", key.split("/")[-1], flags=re.I)
    ascii_part = re.sub(r"[^A-Za-z0-9]+", "-", base).strip("-").lower()[:40] or "img"
    return f"{ascii_part}-{hashlib.sha1(key.encode()).hexdigest()[:6]}"


def flood_transparent(im, tol=26):
    """Make the white background transparent by flood-filling from every border pixel."""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    seen = bytearray(w * h)
    q = deque()
    for x in range(w):
        q.append((x, 0)); q.append((x, h - 1))
    for y in range(h):
        q.append((0, y)); q.append((w - 1, y))
    while q:
        x, y = q.popleft()
        i = y * w + x
        if seen[i]:
            continue
        seen[i] = 1
        r, g, b, a = px[x, y]
        if a == 0 or (r > 255 - tol and g > 255 - tol and b > 255 - tol):
            # soften the edge a little: near-white becomes transparent
            px[x, y] = (r, g, b, 0)
            if x > 0: q.append((x - 1, y))
            if x < w - 1: q.append((x + 1, y))
            if y > 0: q.append((x, y - 1))
            if y < h - 1: q.append((x, y + 1))
    return im


def has_alpha(im):
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        a = im.convert("RGBA").getchannel("A")
        return a.getextrema()[0] < 255
    return False


def find_keys():
    keys = set()
    for dp, _, fns in os.walk(os.path.join(ROOT, "src")):
        for fn in fns:
            if fn.endswith((".ts", ".astro", ".mjs", ".js")):
                keys.update(KEY_RE.findall(open(os.path.join(dp, fn), encoding="utf-8").read()))
    keys.add(LOGO)
    return sorted(keys)


def main():
    os.makedirs(OUT, exist_ok=True)
    manifest, missing = {}, []
    for key in find_keys():
        src = os.path.join(UP, *key.split("/"))
        if not os.path.exists(src):
            missing.append(key); continue
        im = Image.open(src)
        im = ImageOps.exif_transpose(im)
        if key in TRANSPARENT:
            im = flood_transparent(im)
        if key in CROPS:
            w, h = im.size
            im = im.crop((0, 0, w, int(h * (1 - CROPS[key]))))
        alpha = has_alpha(im)
        im = im.convert("RGBA" if alpha else "RGB")
        w, h = im.size
        name = slug(key)
        if key == LOGO:
            widths = [180, 360]
        else:
            # standard steps below the cap, then the cap itself (no upscaling, no near-duplicates)
            cap = min(cap_for(key), w)
            widths = [x for x in WIDTHS if x < cap - 120] + [cap]
        made = []
        for tw in widths:
            tw = min(tw, w)
            th = round(h * tw / w)
            out = os.path.join(OUT, f"{name}-{tw}.webp")
            if not os.path.exists(out):
                im.resize((tw, th), Image.LANCZOS).save(out, "WEBP", quality=64 if not alpha else 72, method=6)
            made.append(tw)
        manifest[key] = {"src": f"img/{name}", "w": w, "h": h, "widths": sorted(set(made)), "alpha": alpha}
    json.dump(manifest, open(MANIFEST, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"images: {len(manifest)} processed, {len(missing)} missing")
    for m in missing:
        print("  MISSING", m)

    # favicon: byte-for-byte copy + crisp nearest-neighbour PNGs
    fav = os.path.join(H, "files", "favicon.ico")
    if os.path.exists(fav):
        dst = os.path.join(ROOT, "public", "favicon.ico")
        shutil.copyfile(fav, dst)
        a = hashlib.sha256(open(fav, "rb").read()).hexdigest()
        b = hashlib.sha256(open(dst, "rb").read()).hexdigest()
        print("favicon sha256", a, "match" if a == b else "MISMATCH")
        ico = Image.open(fav)
        ico = ico.convert("RGBA")
        for s, n in ((180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
            ico.resize((s, s), Image.NEAREST).save(os.path.join(ROOT, "public", n))
    else:
        print("favicon not harvested yet")


if __name__ == "__main__":
    main()
