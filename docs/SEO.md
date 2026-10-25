# Search visibility plan

Goal: make useful, truthful FOA pages crawlable and understandable. No ranking guarantee, artificial backlinks, keyword stuffing, doorway pages or fake reviews.

## Page intent map

| Route | Search intent | Distinct useful content |
|---|---|---|
| `/` | Family of AI Agents / FOA Agents | Project identity, stage, architecture, next action |
| `/agents/` | modular AI agent contracts | Required fields, hand-offs, template status |
| `/tools/` | typed tools for AI agents | Input/output boundaries and mock testing |
| `/integrations/` | agent integration contracts | Env names, read-only scope, retries and mocks |
| `/contribute/` | contribute to open-source AI agents | Branch/review flow and first task criteria |
| `/community/` | FOA community and student contributions | Opt-in pathway, channel policy, no false memberships |
| `/guides/first-contribution/` | first open-source agent contribution | Reproducible local contract/documentation workflow |
| `/about/` | FOA Agents project | Honest scope, license, mascot credits, contact |

Every route has a unique title, description, one H1 and descriptive internal links. Core copy is static HTML. Semantic headings, alt text, responsive layout, local assets and reduced-motion support are included. JSON-LD describes the website and software source; no fake ratings or product offers.

## Deployment gate

Use the exact Vercel production domain returned by deployment; run `python3 scripts/configure_site.py https://ACTUAL-DOMAIN` to set canonical/OG URLs, sitemap and robots. The unconfigured draft is deliberately noindex and its robots file disallows crawling. Check both are removed/configured for production. Do not index a preview hostname and later call it canonical.

## After public verification

Owner adds the production property to Google Search Console/Bing Webmaster Tools using their accounts, verifies ownership, submits `/sitemap.xml` and checks indexing status. This is pending, not performed automatically. Buying a domain needs approval. If a custom domain is added later, choose one canonical host, redirect the old host and regenerate sitemap/canonicals.

Track actual indexed pages, impressions, clicks and useful contributor conversions over 28-day periods when authorized analytics are available. No tracking scripts or cookies are included today. Build a genuine tested tutorial before seeking relevant editorial links; never buy backlinks or post links into unrelated issue trackers.
