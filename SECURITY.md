# Security Policy

## Reporting a vulnerability

Do not open a public issue. Use GitHub's private "Report a vulnerability" button on the Security tab, or email niketpatil1624@gmail.com. We reply within 72 hours.

## Keys, tokens and data

- `.env` is git-ignored. Only `.env.example` (names, no values) is committed.
- Secret scanning and push protection must stay enabled.
- If a key leaks: revoke it immediately, rotate it, then notify us. Do not rely on deleting the commit.
- Integrations must read keys from environment variables only.
- No personal or private data in `data/`.
