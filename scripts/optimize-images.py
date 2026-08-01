#!/usr/bin/env python3
"""Generate web-sized derivatives of src/assets images into src/assets/opt/.

`next.config.js` sets `images.unoptimized` (required by `output: "export"`), so
next/image serves whatever file it is handed at full resolution — there is no
build-time resizing or format conversion. This script fills that gap.

Originals in src/assets/** are never modified; they stay the lossless source so
derivatives can be regenerated at different sizes later. The app imports from
src/assets/opt/**, and those derivatives are committed because the deploy build
has no Python/Pillow available.

The favicon set in public/ is built here too — same source logo, same manifest,
so `--check` covers it as well.

Usage: python3 scripts/optimize-images.py [--check]
       --check exits non-zero if any derivative is missing or stale, judged
       by the content hashes in src/assets/opt/manifest.json.

Requires Pillow (pip install Pillow).
"""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets"
OUT = SRC / "opt"
PUBLIC_DIR = ROOT / "public"
# Records the source hash + encode settings behind each derivative, so
# --check can tell "already built" from "needs rebuilding" without mtimes.
MANIFEST = OUT / "manifest.json"

# (relative source path, max longest edge in px, WebP quality)
#
# Widths are ~2x the largest CSS size each image is displayed at, so they stay
# crisp on retina without shipping megabytes:
#   projects/*  -> accordion content images, <=50% of a ~1000px column
#   work/*      -> .right logo frame, clamp(72px, 15%, 120px)
#   me1         -> 320px square on /about
#   supersocial -> 35% of the resume column
JOBS: list[tuple[str, int, int]] = [
    ("projects/aadata.png", 1280, 82),
    ("projects/djbestie.jpg", 1280, 82),
    ("projects/djbestieteam.jpg", 1280, 82),
    ("projects/facial.png", 1024, 82),
    ("projects/fn1.jpg", 1280, 82),
    ("projects/interviewpro.png", 1280, 82),
    ("projects/interviewprodata.png", 1280, 82),
    ("projects/losalamos1.png", 1280, 82),
    ("projects/losalamos2.png", 1280, 82),
    ("projects/nsa1.png", 1280, 82),
    ("projects/nsa2.png", 1024, 82),
    ("projects/nsa3.png", 1024, 82),
    ("projects/personalsite.png", 1280, 82),
    ("projects/personalsite1.png", 1280, 82),
    ("projects/personalsite2.png", 1280, 82),
    ("projects/sandia.png", 1280, 82),
    ("projects/usnavy.png", 1280, 82),
    ("work/Mercy_Ships_Logo.jpg", 256, 88),
    ("work/creatorgames.png", 256, 88),
    ("work/firstfunlogo.jpeg", 256, 88),
    ("work/morsl.png", 256, 88),
    ("work/powerdb.png", 256, 88),
    ("work/samsclub.png", 256, 88),
    ("work/supersocial_inc_logo.jpeg", 256, 88),
    ("work/unt.png", 256, 88),
    ("me1.jpg", 640, 84),
    ("john_mo_supersocial.jpg", 700, 84),
]

# The header renders jm_logo at 56x56 with `object-fit: cover` and the footer at
# 80x60, so only the aspect ratio is visually significant. Keeping the original
# 2732x2048 ratio at 200x150 is pixel-identical in both spots at 2x DPR while
# dropping ~208KB off every page's critical path (it is `priority`, so it is
# preloaded site-wide).
LOGO = ("jm_logo.png", 200, 150)

# The logo glyph is white-on-transparent and occupies only ~48% of the original
# canvas width, so the OG card gets its own cropped mark.
#
# Cropped tight to the glyph with NO padding, and the aspect ratio preserved
# rather than squared off. Padding here becomes invisible margin on the card,
# which threw the divider off centre: the glyph->bar gap measured 91px against
# 57px for bar->text. generate-og.mjs reads this file's dimensions and sizes the
# logo from them, so the card's spacing is the real spacing.
#
# 512 rather than the card's ~207px render size: the glyph is thin line art, and
# the source (2732x2048, glyph bbox 1322x1610) has the resolution to spare, so
# there is no reason to hand satori a bitmap it might have to upscale.
OG_MARK_SIZE = 512

# --- Favicon -----------------------------------------------------------------
#
# The logo is white line art on transparency, which is the worst possible
# favicon: white-on-nothing vanished against Safari's light tab plate, so the tab
# read as an empty square. Painting the glyph onto an opaque purple tile fixes
# it in every browser chrome, light or dark, and it is the same figure/ground as
# the OG card (white mark on a purple panel).
#
# #2a1a38 is the dark theme's --dark from globals.css — the site's own page
# background, and the same plum the OG card is painted on, so a tab, a shared
# link, and the site itself all show the mark on one colour.
FAVICON_BG = (42, 26, 56)

# The glyph is dilated and downsampled at 8x, so a dilation of a fraction of an
# output pixel is still a whole-pixel morphological op at working resolution.
# It also means `dilate_px` below quantises to eighths — 0.10 and 0.14 are the
# same file. Widening a stroke is only expressible in 1/8px steps.
FAVICON_SUPERSAMPLE = 8

# (output size, padding as a fraction of the tile, stroke dilation in output px,
# alpha gain).
#
# The glyph's stroke is ~1.5% of its height, so a straight downscale leaves a
# sub-pixel line that LANCZOS renders as barely-there grey. Each size therefore
# gets its strokes dilated before the downsample and its alpha lifted after. The
# two do different jobs and are traded off by eye: dilation adds real weight but
# closes the loops of a script monogram, gain adds contrast without touching the
# shape. So weight comes from dilation while the loops still have room for it,
# and from gain once they do not — which is why 16px, where the loops are ~1px
# apart, gets the *least* dilation of the set and by far the most gain.
#
# Resulting stroke widths: 0.47px at 16, 0.90px at 32, 1.08px at 48.
#
# 16px cannot resolve "Jm" no matter how it is tuned. It is tuned to keep the
# swash and the lower loop distinguishable as a mark; 32px up is where it reads
# as the signature. Padding shrinks as the tile does, because at 16px every pixel
# of margin is 6% of the width.
FAVICON_SPECS: list[tuple[int, float, float, float]] = [
    (16, 0.06, 0.125, 1.70),
    (32, 0.10, 0.250, 1.15),
    (48, 0.11, 0.250, 1.05),
]

# Apple touch icon: iOS rounds and (on older versions) adds its own gloss, so it
# gets the most padding of the set to keep the glyph clear of the corner radius.
# 180 is the largest size iOS asks for; it downscales this for the rest. At this
# size the glyph's own stroke is already ~2px, so it needs no gain — the dilation
# is only there to keep the hairlines from looking accidental.
APPLE_ICON = (180, 0.15, 0.250, 1.0)


def resize(im: Image.Image, max_edge: int) -> Image.Image:
    w, h = im.size
    if max(w, h) <= max_edge:
        return im.copy()
    scale = max_edge / max(w, h)
    return im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)


def has_alpha(im: Image.Image) -> bool:
    return im.mode in ("RGBA", "LA", "PA") or "transparency" in im.info


def save_webp(im: Image.Image, dest: Path, quality: int) -> None:
    """Write the smaller of lossy and lossless WebP.

    Lossy wins on photographs, but flat UI screenshots with large uniform areas
    (charts, slide exports) can encode smaller — and sharper — losslessly. Both
    land on the same .webp extension, so imports stay uniform either way.
    """
    dest.parent.mkdir(parents=True, exist_ok=True)
    prepared = im.convert("RGBA") if has_alpha(im) else im.convert("RGB")

    lossy = dest.with_suffix(".lossy.tmp")
    lossless = dest.with_suffix(".lossless.tmp")
    prepared.save(lossy, "WEBP", quality=quality, method=6)
    prepared.save(lossless, "WEBP", lossless=True, method=6)

    winner = min((lossy, lossless), key=lambda p: p.stat().st_size)
    winner.replace(dest)
    for leftover in (lossy, lossless):
        leftover.unlink(missing_ok=True)


def og_mark(source: Path, dest: Path) -> None:
    """Crop the logo tight to its glyph for the OG card, preserving aspect ratio.

    No padding and no squaring off: either would reappear on the card as
    invisible margin around the mark, which is what pushed the divider off
    centre. The longest edge lands on OG_MARK_SIZE.
    """
    im = Image.open(source).convert("RGBA")
    box = im.getchannel("A").getbbox()
    glyph = im.crop(box) if box else im

    scale = OG_MARK_SIZE / max(glyph.size)
    target = (
        max(1, round(glyph.width * scale)),
        max(1, round(glyph.height * scale)),
    )

    dest.parent.mkdir(parents=True, exist_ok=True)
    glyph.resize(target, Image.LANCZOS).save(dest, "PNG", optimize=True)


def favicon_tile(
    source: Path, size: int, pad: float, dilate_px: float, gain: float
) -> Image.Image:
    """Paint the logo glyph white, centred, on an opaque FAVICON_BG tile.

    Only the source's alpha channel is used: the glyph is pure white already, so
    its alpha *is* the shape, and reading it as a mask means the white is applied
    at full strength rather than composited from a resized RGBA bitmap.
    """
    with Image.open(source) as im:
        alpha = im.convert("RGBA").getchannel("A")
    box = alpha.getbbox()
    glyph = alpha.crop(box) if box else alpha

    # Fit the glyph into the padded box at 8x, dilate, then downsample once.
    work = size * FAVICON_SUPERSAMPLE
    target_edge = int(work * (1 - 2 * pad))
    scale = target_edge / max(glyph.size)
    resized = glyph.resize(
        (max(1, round(glyph.width * scale)), max(1, round(glyph.height * scale))),
        Image.LANCZOS,
    )

    radius = round(dilate_px * FAVICON_SUPERSAMPLE)
    if radius >= 1:
        resized = resized.filter(ImageFilter.MaxFilter(2 * radius + 1))

    mask = Image.new("L", (work, work), 0)
    mask.paste(
        resized,
        ((work - resized.width) // 2, (work - resized.height) // 2),
    )
    mask = mask.resize((size, size), Image.LANCZOS)
    if gain != 1.0:
        mask = mask.point(lambda v: min(255, round(v * gain)))

    tile = Image.new("RGB", (size, size), FAVICON_BG)
    tile.paste(Image.new("RGB", (size, size), (255, 255, 255)), (0, 0), mask)
    return tile


def write_favicon(source: Path, dest: Path) -> None:
    """Write a multi-resolution .ico, one hand-tuned tile per size.

    Pillow's ICO writer will happily generate the smaller sizes itself by
    resizing the largest, which is exactly what has to be avoided here — the
    whole point of FAVICON_SPECS is that each size is dilated differently. So the
    tiles are rendered independently and handed over via append_images.
    """
    tiles = [favicon_tile(source, *spec) for spec in FAVICON_SPECS]
    largest, *rest = sorted(tiles, key=lambda t: t.width, reverse=True)
    dest.parent.mkdir(parents=True, exist_ok=True)
    largest.save(
        dest,
        "ICO",
        sizes=[(t.width, t.height) for t in tiles],
        append_images=rest,
    )


def write_apple_icon(source: Path, dest: Path) -> None:
    """Write the 180x180 tile as a palette PNG.

    Two colours blended over ~64 antialiasing levels is well under 256 distinct
    values, so ADAPTIVE quantisation is lossless here (verified: zero channel
    delta against the RGB encode) while halving the file, 8.4KB -> 4.3KB.
    """
    tile = favicon_tile(source, *APPLE_ICON)
    dest.parent.mkdir(parents=True, exist_ok=True)
    tile.convert("P", palette=Image.ADAPTIVE, colors=256).save(
        dest, "PNG", optimize=True
    )


def optimize_og_cards() -> tuple[int, int]:
    """Re-compress the cards from scripts/generate-og.mjs losslessly, in place.

    The cards stay PNG: the artwork is a rounded panel on a transparent
    surround, and JPEG has no alpha channel. Cards live next to the page they
    belong to (public/og.png, public/experience/og.png, ...), so this walks
    public/ for them rather than reading a single directory.

    Deterministic, so re-running produces byte-identical files and no git churn.
    """
    before = after = 0
    for png in sorted(PUBLIC_DIR.rglob("og.png")):
        size_before = png.stat().st_size
        with Image.open(png) as im:
            im.convert("RGBA").save(png, "PNG", optimize=True)
        size_after = png.stat().st_size
        before += size_before
        after += size_after
        label = png.relative_to(PUBLIC_DIR).as_posix()
        print(
            f"  {label:44} {size_before / 1024:8.0f} KB -> "
            f"{size_after / 1024:7.0f} KB"
        )
    return before, after


def source_digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:16]


def load_manifest() -> dict[str, str]:
    if MANIFEST.exists():
        try:
            return json.loads(MANIFEST.read_text())
        except json.JSONDecodeError:
            return {}
    return {}


def save_manifest(entries: dict[str, str]) -> None:
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(dict(sorted(entries.items())), indent=2) + "\n")


def main() -> int:
    check_only = "--check" in sys.argv
    stale: list[str] = []
    saved_before = saved_after = 0

    # Freshness is keyed on a hash of the source plus the encode settings, not on
    # mtimes: git does not preserve mtimes, so after a clone or branch switch the
    # timestamps are checkout order and a comparison would pass or fail at
    # random — including passing while shipping stale derivatives.
    manifest = load_manifest()
    expected: dict[str, str] = {}

    for rel, max_edge, quality in JOBS:
        source = SRC / rel
        dest = (OUT / rel).with_suffix(".webp")

        if not source.exists():
            print(f"  MISSING SOURCE  {rel}")
            stale.append(rel)
            continue

        stamp = f"{source_digest(source)}:{max_edge}:{quality}"
        expected[rel] = stamp
        fresh = dest.exists() and manifest.get(rel) == stamp

        if check_only:
            if not fresh:
                stale.append(rel)
            continue
        if fresh:
            continue

        with Image.open(source) as im:
            save_webp(resize(im, max_edge), dest, quality)

        before = source.stat().st_size
        after = dest.stat().st_size
        saved_before += before
        saved_after += after
        print(f"  {rel:44} {before / 1024:8.0f} KB -> {after / 1024:7.0f} KB")

    # Logo: fixed dimensions rather than a max edge, plus the OG mark.
    rel, w, h = LOGO
    source = SRC / rel
    logo_dest = (OUT / rel).with_suffix(".png")
    mark_dest = OUT / "og-mark.png"

    # `kind` is part of the manifest stamp, so it must describe how the file was
    # produced, not just its size — "tight" is what invalidates the old padded,
    # squared-off mark even though OG_MARK_SIZE is unchanged.
    for dest, kind in (
        (logo_dest, f"logo:{w}x{h}"),
        (mark_dest, f"mark:{OG_MARK_SIZE}:tight"),
    ):
        key = dest.relative_to(SRC).as_posix()
        stamp = f"{source_digest(source)}:{kind}"
        expected[key] = stamp
        fresh = dest.exists() and manifest.get(key) == stamp

        if check_only:
            if not fresh:
                stale.append(key)
            continue
        if fresh:
            continue

        if dest == logo_dest:
            with Image.open(source) as im:
                im.convert("RGBA").resize((w, h), Image.LANCZOS).save(
                    dest, "PNG", optimize=True
                )
        else:
            og_mark(source, dest)

        before = source.stat().st_size
        after = dest.stat().st_size
        saved_before += before
        saved_after += after
        print(
            f"  {key:44} {before / 1024:8.0f} KB -> {after / 1024:7.0f} KB"
        )

    # Favicon set: same logo source, but the output is a browser asset rather than
    # something the app imports, so it lands in public/ and is keyed from ROOT.
    #
    # The stamp folds in a digest of the tile recipe as well as the source, so
    # retuning FAVICON_SPECS or repainting the background rebuilds the files even
    # though jm_logo.png has not changed.
    recipe = hashlib.sha256(
        f"{FAVICON_BG}:{FAVICON_SPECS}:{APPLE_ICON}:{FAVICON_SUPERSAMPLE}".encode()
    ).hexdigest()[:8]
    # Named rather than inherited from the loop above: both blocks happen to read
    # the same file, and a silent dependency on a leftover loop variable would
    # hash the wrong source the moment either block moves.
    logo_source = SRC / LOGO[0]
    # As with the OG mark above, `kind` names how the file was produced, not just
    # what it is: `recipe` covers the tile geometry but not the encoder, so
    # switching the touch icon to a palette PNG would otherwise leave the old
    # RGB one on disk looking fresh.
    for dest, kind, build in (
        (PUBLIC_DIR / "favicon.ico", "favicon:ico16-32-48", write_favicon),
        (PUBLIC_DIR / "apple-touch-icon.png", "apple:p256", write_apple_icon),
    ):
        key = dest.relative_to(ROOT).as_posix()
        stamp = f"{source_digest(logo_source)}:{kind}:{recipe}"
        expected[key] = stamp
        fresh = dest.exists() and manifest.get(key) == stamp

        if check_only:
            if not fresh:
                stale.append(key)
            continue
        if fresh:
            continue

        build(logo_source, dest)
        # No before/after: these are tiles rendered from scratch, not
        # re-encodings of the source, so a saving against 208KB of logo would be
        # a meaningless number in the total below. Padded to land in the same
        # column as every other line's output size.
        print(f"  {key:44} {dest.stat().st_size / 1024:22.0f} KB")

    if not check_only:
        save_manifest(expected)

    if not check_only and PUBLIC_DIR.exists():
        og_before, og_after = optimize_og_cards()
        saved_before += og_before
        saved_after += og_after

    if check_only:
        if stale:
            print("Stale or missing derivatives:")
            for rel in stale:
                print(f"  {rel}")
            print("Run: python3 scripts/optimize-images.py")
            return 1
        print("All image derivatives are up to date.")
        return 0

    if saved_before:
        print(
            f"\nTotal: {saved_before / 1024 / 1024:.2f} MB -> "
            f"{saved_after / 1024 / 1024:.2f} MB "
            f"({100 - saved_after / saved_before * 100:.1f}% smaller)"
        )
    else:
        print("Nothing to do — all derivatives are up to date.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
