"""Set the verified production origin and make static pages indexable."""
import argparse
from pathlib import Path
import re
from urllib.parse import urlsplit
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1] / 'site'


def configure(origin):
    parsed = urlsplit(origin)
    if (parsed.scheme != 'https' or not parsed.hostname or parsed.username
            or parsed.password or parsed.query or parsed.fragment or parsed.path not in ('', '/')):
        raise ValueError('Use the verified HTTPS production origin without a path or credentials')
    origin = origin.rstrip('/')
    urls = []
    for path in sorted(ROOT.rglob('*.html')):
        text = path.read_text()
        text = re.sub(r'<link rel="canonical"[^>]*>', '', text)
        text = re.sub(r'<meta property="og:(?:url|image)"[^>]*>', '', text)
        is_error = path.name == '404.html'
        route = '/' + str(path.relative_to(ROOT)).removesuffix('index.html')
        if is_error:
            route = '/404.html'
        else:
            urls.append(origin + route)
        text = text.replace('content="noindex,nofollow"',
                            'content="noindex,nofollow"' if is_error else 'content="index,follow"')
        meta = (f'<link rel="canonical" href="{escape(origin + route)}">'
                f'<meta property="og:url" content="{escape(origin + route)}">'
                f'<meta property="og:image" content="{origin}/assets/foa-mascot.webp">')
        path.write_text(text.replace('</head>', meta + '</head>'))
    (ROOT / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {origin}/sitemap.xml\n')
    (ROOT / 'sitemap.xml').write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        ''.join(f'<url><loc>{escape(url)}</loc></url>\n' for url in urls) + '</urlset>\n')
    print(f'Configured {len(urls)} indexable routes for {origin}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('origin')
    configure(parser.parse_args().origin)
