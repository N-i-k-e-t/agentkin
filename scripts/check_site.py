"""Check static page metadata, local links and asset references without dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json

ROOT = Path(__file__).resolve().parents[1] / 'site'


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.refs = []
        self.title = ''
        self.in_title = False
        self.description = None
        self.missing_alt = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'h1': self.h1 += 1
        if tag == 'title': self.in_title = True
        if tag == 'meta' and attrs.get('name') == 'description':
            self.description = attrs.get('content')
        if tag == 'img' and not attrs.get('alt'): self.missing_alt = True
        for key in ('src', 'href'):
            if key in attrs: self.refs.append(attrs[key])

    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False

    def handle_data(self, data):
        if self.in_title: self.title += data


titles = set()
errors = []
pages = [p for p in ROOT.rglob('*.html') if not any(part in {'public', 'node_modules'} for part in p.relative_to(ROOT).parts)]
for path in pages:
    page = Page()
    page.feed(path.read_text())
    if not page.title or page.title in titles: errors.append(f'{path}: missing/duplicate title')
    titles.add(page.title)
    if not page.description: errors.append(f'{path}: missing description')
    if page.h1 != 1: errors.append(f'{path}: expected one H1')
    if page.missing_alt: errors.append(f'{path}: missing image alt')
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc or not url.path: continue
        target = ROOT / url.path.lstrip('/') if url.path.startswith('/') else path.parent / url.path
        if target.is_dir(): target /= 'index.html'
        if not target.is_file(): errors.append(f'{path}: missing {ref}')
json.loads((ROOT/'vercel.json').read_text())
if errors: raise SystemExit('\n'.join(errors))
print(f'{len(pages)} static pages passed metadata, local-link and image checks')
