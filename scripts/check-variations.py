from html.parser import HTMLParser
from pathlib import Path
import json


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.tags = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))


dist = Path(__file__).resolve().parent.parent / "dist"
for number in range(1, 7):
    path = f"/variations/{number}"
    text = (dist / path.lstrip("/") / "index.html").read_text()
    page = Page(text)
    ids = [attrs["id"] for _, attrs in page.tags if "id" in attrs]
    assert len(ids) == len(set(ids)), (path, "duplicate IDs")
    assert sum(tag == "h1" for tag, _ in page.tags) == 1, (path, "one main heading")
    assert any(tag == "meta" and a.get("name") == "robots" and a.get("content") == "noindex, follow" for tag, a in page.tags)
    assert any(tag == "link" and a.get("rel") == "canonical" and a.get("href") == "https://shinbo.app" + path for tag, a in page.tags)
    assert not any(tag == "script" and a.get("type") == "application/ld+json" for tag, a in page.tags), "No stale homepage schema in previews"
    links = [a["href"] for tag, a in page.tags if tag == "a" and "href" in a]
    for link in links:
        if link.startswith("#"):
            assert link[1:] in ids, (path, "missing anchor", link)
        elif link.startswith("/") and not link.startswith("//"):
            target = dist / link.lstrip("/").split("#")[0]
            assert target.exists() or (target / "index.html").exists(), (path, "missing route", link)
    for slug in ["harness", "delegation", "plan", "models", "control", "surfaces", "knowledge", "jobs", "agent", "tools"]:
        assert f"/docs/{slug}" in links, (path, "missing feature", slug)
    assert any(link.endswith("Emma-v0.7.1-darwin-arm64.dmg") for link in links), (path, "verified Mac download")
    assert any(link.endswith("Emma-v0.7.1-win32-x64-Setup.exe") for link in links), (path, "verified Windows download")
    options = [a.get("value") for tag, a in page.tags if tag == "option"]
    assert any(tag == "option" and a.get("value") == "unknown" and "selected" in a for tag, a in page.tags), (path, "SSR starts without guessing OS")
    assert set(["unknown", "mac", "windows", "windowsArm", "windows32", "intel", "linux", "mobile"]).issubset(options), (path, "platform choices")
    for tag, attrs in page.tags:
        if tag == "img":
            assert "alt" in attrs, (path, "image alt")
            src = attrs.get("src", "")
            if src.startswith("/"):
                assert (dist / src.lstrip("/")).is_file(), (path, "missing image", src)

assert "/variations" not in (dist / "sitemap.xml").read_text()
gallery = Page((dist / "variations/index.html").read_text())
assert sum(tag == "iframe" for tag, _ in gallery.tags) == 6
print(json.dumps({"result": "passed", "variations": 6, "checks": "HTML, anchors, assets, downloads, feature routes, preview indexing"}))
