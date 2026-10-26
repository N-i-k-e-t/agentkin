# FOA Agents: connected website architecture

The public presentation remains static HTML and CSS. Browser JavaScript is generated from TypeScript. A small read-only Vercel Function supplies real public repository activity; this is not an AI-agent execution backend.

| File / folder | Purpose | Connected to |
|---|---|---|
| `site/index.html` and page folders | Static, crawlable content, semantic controls | CSS and generated JS module |
| `site/assets/site.css` | Retro field-guide style, responsive layouts and reduced-motion rules | All HTML pages |
| `site/src/main.ts` | Typed family filters, details, local walkthrough, motion controls and stats UI | `/api/stats`, family data, shared contracts |
| `site/src/family.ts` | Eight role definitions and truthful availability labels | Build-time cards and browser interaction |
| `site/src/contracts.ts` | Shared response and member types | Frontend and backend |
| `site/assets/site.js`, `family.js`, `contracts.js`, `stats-service.js` | Generated browser-ready JavaScript | HTML module script |
| `site/api/stats.ts` | Vercel GET handler; POST returns 405 | Fixed-repository stats service |
| `site/lib/stats.ts` | Validated public GitHub requests; partial-feed handling | GitHub public repository, contributor and commit endpoints |
| `api/stats.ts` | Repository-root deployment entry | Re-exports the shared site API handler |
| `site/dev/server.mjs` | Local HTTP server for static pages and the same API | Both frontend and backend on one local origin |
| `site/scripts/build.mjs` | Generate JS, family cards and public-only static output | `site/public/` |
| `vercel.json` | Repo-root build/output configuration | Static output plus root Vercel Function |
| `site/vercel.json` | Alternative configuration when Vercel Root Directory is `site` | Site output plus site API |
| `site/tests/stats.test.mjs` | No-key mocked API tests | Service and HTTP handler |

## Run the connected app

Node.js 24 is required. From the repository root:

```bash
npm --prefix site ci
npm run build
npm test
npm run dev
```

Open http://localhost:4173. The local server calls the same typed stats handler used on Vercel. Public GitHub rate limits or an outage may make metrics unavailable; page content and family interaction still work. A plain static file server does not execute `/api/stats`. The browser then uses the same fixed-repository validation code to request public GitHub data directly and explicitly labels that fallback. It never reports the API as connected when it is unavailable.

## Build and deployment

The compiler checks TypeScript strictly. Build output includes only public HTML, CSS, generated JS and assets. Source, test and private-operation folders are excluded from `site/public`. Vercel deploys the API separately as a Function. No database, user login, private repository access, paid model call or token is required. Root and site-root Vercel configurations support the same source; use only the configuration matching the selected project root.

The GET response has short browser caching and five-minute Vercel CDN caching. Counts must be nonnegative safe integers. Optional contributor/commit feed failures produce a partial response. If repository data cannot be verified, the handler returns 503 and no fabricated counts. The upstream repository is fixed; callers cannot use this endpoint as an arbitrary URL proxy.

## Interactions and honest limits

- Family cards, filters and detail panels work locally. The illustrated roles are concepts or generic templates, not running agents.
- The contract walkthrough is deterministic educational UI. Typed example tasks stay in the browser; it calls no model and invents no generated result.
- Motion can be paused, and the OS reduced-motion preference disables animations.
- Stats, contributor profiles and commit records come from actual GitHub responses.
- Public production deployment remains unverified until Vercel project access is resolved. Do not call a protected preview a publicly live production site.

## Source naming and review

Use Family of AI Agents / FOA Agents and repository slug `foa-agents`. The default integration branch is develop; human review is required before the feature PR merges. Protected policy files are not modified by this change. Documentation and API tests do not establish an agent runtime or model compatibility.
