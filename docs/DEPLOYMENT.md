# Static Vercel deployment and release runbook

## Source and scope

Deploy `site/` as a static website. The presentation is static, with a read-only TypeScript stats Function. No database or paid model is used. Install with `npm --prefix site ci`, build with `npm run build` and preview both layers with `npm run dev`. Source and proposed launch changes live on `docs/foa-launch`; human review is required before merging into develop or releasing to main.

## Vercel settings

- Team verified by the connector: `niket-main` (Hobby), ID `team_pSkdTdKbm1k9mDrLUlyWuPXO`.
- Intended NEW project: `foa-agents`. Do not modify another project or repository.
- Framework: Other. Prefer repository root with `vercel.json` (install `npm --prefix site ci --include=dev --ignore-scripts --no-audit --no-fund`, build `npm run build`, output `site/public`). Alternatively select Root Directory `site` with its own config, output `public`. Both have a Function entry for `/api/stats`; use Node.js 24.
- Intended production Git branch after human release review: main. Contributor branches get previews only. Do not connect broad repository access or expose secrets.

## Current blocker

The Vercel connector returned 403 forbidden on project creation on 26 October 2026. It did not create the project or deploy the site. No Vercel CLI is installed/authenticated in this environment. Deployment remains pending a supported authorized route. Do not treat a proposed hostname as a live URL. Ask before switching to the Vercel browser when the available connector is blocked.

## Publish procedure

1. Confirm the new project/team and source revision. Create only this project through a permitted route; no paid upgrades.
2. Obtain the actual assigned production hostname. Configure all SEO URLs with `scripts/configure_site.py` using that exact HTTPS origin.
3. Run `python3 scripts/check_site.py`; verify desktop/mobile routes, mascot loading, keyboard navigation, GitHub metrics unavailable state and external links.
4. Deploy the static output and Function. Poll deployment until READY or a terminal failure; inspect build logs on failure.
5. Open the actual public production URL, all routes, `/robots.txt`, `/sitemap.xml` and the social image without authentication. Canonical host and sitemap must match; production must be indexable.
6. Record actual project ID, deployment ID, commit SHA, verification time and URL. Update README/site links only to a verified live URL. Mark Git integration, Search Console and automated releases pending until configured.

The old GitHub Pages workflow in `.github/workflows/site.yml` is retained as an optional legacy path. Vercel is the requested production host. Do not claim Pages is deployed or silently enable dual production hosts with competing canonical URLs.

## Security and change control

Never share tokens in chat or commit `.vercel`, `.env`, credentials or private contact records. Keep public metrics tokenless with a visible unavailable state. Main/develop need the protection specification in BRANCHING.md; settings are not claimed active until verified. No self-approval, self-merge, force pushes or deleting repos. Rename approval does not grant new maintainers admin rights.

## Current production

The public landing page is https://foa-agents.vercel.app/. The initial launch promotes a checked `docs/foa-launch` build without merging its PR. Future releases should follow human review into `develop` and then `main`; the Vercel production Git branch remains `main`.
