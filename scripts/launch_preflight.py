#!/usr/bin/env python3
"""Offline launch checks and literal rendering; never prints secret values."""
import argparse
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SECRET_PATTERNS = [
    rb"-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----",
    rb"(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})",
    rb"AKIA[0-9A-Z]{16}",
    rb"sk-(?:proj-|ant-)?[A-Za-z0-9_-]{32,}",
]


def files():
    return sorted(p for p in ROOT.rglob('*') if p.is_file()
                  and not any(x in {'.git', 'node_modules', '__pycache__'} for x in p.relative_to(ROOT).parts))


def scan():
    errors = []
    for p in files():
        rel = p.relative_to(ROOT)
        if p.is_symlink():
            errors.append(f'{rel}: symlinks require review')
            continue
        if p.name.startswith('.env') and p.name != '.env.example':
            errors.append(f'{rel}: environment file is forbidden in the launch kit')
        raw = p.read_bytes()
        if any(re.search(pattern, raw) for pattern in SECRET_PATTERNS):
            errors.append(f'{rel}: possible credential; value suppressed')
        if p.name == '.env.example':
            for line in raw.decode().splitlines():
                if line.strip() and not line.lstrip().startswith('#'):
                    if '=' not in line or line.split('=', 1)[1].strip():
                        errors.append(f'{rel}: example values must be empty')
    if errors:
        raise ValueError('\n'.join(errors))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('owner')
    parser.add_argument('repo')
    parser.add_argument('security_email')
    parser.add_argument('conduct_email')
    parser.add_argument('--render', action='store_true')
    args = parser.parse_args()
    if not re.fullmatch(r'[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?', args.owner):
        raise ValueError('Supply a real GitHub owner handle')
    if args.repo != 'foa-agents':
        raise ValueError('Project repository name must stay foa-agents')
    for email in (args.security_email, args.conduct_email):
        if not re.fullmatch(r"[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", email):
            raise ValueError('Supply both real security and conduct email addresses')
        if email.lower().endswith(('@example.com', '@example.org', '@example.invalid')):
            raise ValueError('Example inboxes cannot be published')
    scan()
    print(f'Offline checks passed for {len(files())} files. Pattern scan is not a full-history gitleaks scan.')
    if not args.render:
        return
    replacements = {
        '{{PROJECT_NAME}}': 'Family of AI Agents (FOA Agents)', '{{ORG}}': args.owner, '{{REPO}}': args.repo,
        '{{SECURITY_EMAIL}}': args.security_email, '{{CONDUCT_EMAIL}}': args.conduct_email,
        '{{REPO_URL}}': f'https://github.com/{args.owner}/{args.repo}',
        '{{SITE_URL}}': f'https://{args.owner}.github.io/{args.repo}/',
    }
    # Protected policy templates are filled only with explicitly supplied launch inputs.
    for p in files():
        if p.suffix not in {'.md', '.html'} and p.name not in {'CODEOWNERS', 'LICENSE'}:
            continue
        text = p.read_text()
        for old, new in replacements.items():
            text = text.replace(old, new)
        if p.name == 'CODEOWNERS':
            text = re.sub(r'@' + re.escape(args.owner) + r'/(?:core|maintainers)\b', '@' + args.owner, text)
        p.write_text(text)


if __name__ == '__main__':
    try:
        main()
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        sys.exit(1)
