#!/usr/bin/env python3
"""Generate web-sized derivatives of src/assets images into src/assets/opt/.

`next.config.js` sets `images.unoptimized` (required by `output: "export"`), so
next/image serves whatever file it is handed at full resolution — there is no
build-time resizing or format conversion. This script fills that gap.

Originals in src/assets/** are never modified; they stay the lossless source so
derivatives can be regenerated at different sizes later. The app imports from
src/assets/opt/**, and those derivatives are committed because the deploy build
has no Python/Pillow available.

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

from PIL import Image

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
