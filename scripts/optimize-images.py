"""Regenerate WebP delivery assets without changing source PNGs.

Run with Python 3 + Pillow (WebP enabled): python3 scripts/optimize-images.py
Generated files are committed; Pillow is not a website build dependency.
"""

import hashlib
from pathlib import Path

from PIL import Image, features

public = Path(__file__).resolve().parents[1] / "public"
assert features.check("webp"), "Pillow requires WebP support"
sources = sorted(public.glob("bg/*.png")) + sorted(public.glob("shots/*.png"))
sources += sorted(public.glob("shots/thumbs/*.png"))
before = {p: hashlib.sha256(p.read_bytes()).digest() for p in sources}
outputs = []
for source in sources:
    with Image.open(source) as original:
        image = original.convert("RGBA" if "A" in original.getbands() else "RGB")
        widths = [360, 720] if source.parent.name == "thumbs" else [None]
        if source.name == "workspace-thread.png":
            widths += [480, 960, 1440]
        for width in widths:
            resized = image
            if width is not None:
                assert width <= image.width, f"Do not upscale {source}"
                resized = image.resize(
                    (width, round(image.height * width / image.width)),
                    Image.Resampling.LANCZOS,
                )
            suffix = f"-{width}" if width is not None else ""
            target = source.with_name(f"{source.stem}{suffix}.webp")
            resized.save(
                target, "WEBP", quality=90, method=6, exact=True,
                lossless=source.parent.name == "bg",
            )
            with Image.open(target) as decoded:
                assert decoded.size == resized.size and decoded.format == "WEBP"
                decoded.load()
                if source.parent.name == "bg":
                    assert decoded.convert(image.mode).tobytes() == image.tobytes()
            outputs.append(target)
assert all(hashlib.sha256(p.read_bytes()).digest() == digest for p, digest in before.items())
print(f"Verified {len(outputs)} WebP assets; {len(sources)} source PNGs unchanged.")
print(f"Source PNG bytes: {sum(p.stat().st_size for p in sources):,}")
print(f"WebP bytes (all variants): {sum(p.stat().st_size for p in outputs):,}")
