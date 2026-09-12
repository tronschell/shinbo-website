"""Check screenshot files, provenance and HTML references after a production build."""
import hashlib
import json
import re
import struct
from pathlib import Path

root = Path(__file__).resolve().parents[1]
shots = root / "public/shots"
manifest = json.loads((shots / "manifest.json").read_text())
assert manifest["captured"] == "2026-09-12"
assert {p.name for p in shots.glob("*.png")} == set(manifest["files"])
for name, meta in manifest["files"].items():
    data = (shots / name).read_bytes()
    assert hashlib.sha256(data).hexdigest() == meta["sha256"], name
    assert struct.unpack(">II", data[16:24]) == (meta["width"], meta["height"]), name
for page in (root / "dist").rglob("*.html"):
    for src in re.findall(r'(?:src|href)="(/shots/[^"?#]+)', page.read_text()):
        assert (root / "public" / src.lstrip("/")).is_file(), (page, src)
print(f"Verified {len(manifest['files'])} fresh screenshots, dimensions, hashes and page references.")
