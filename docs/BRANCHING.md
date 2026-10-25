# Branching and Integration

## Branches

| Branch | Purpose | Who merges |
|---|---|---|
| `main` | Released, stable. Site deploys from here. | Core only, weekly |
| `develop` | Integration branch. All PRs land here first. | Maintainers |
| `agent/<name>` | New agent work | Contributor |
| `tool/<name>` | New tool work | Contributor |
| `integration/<service>` | New integration (API, data source, keys) | Contributor |
| `fix/<issue-number>-<slug>` | Bug fix | Contributor |
| `docs/<slug>` | Docs and design | Contributor |
| `release/<yyyy-mm-dd>` | Weekly release candidate cut from `develop` | Core |

Branch protection (set in GitHub settings):
- `main`: PR required, 1 Core approval, all checks green, no force push.
- `develop`: PR required, 1-2 approvals (see GOVERNANCE.md), all checks green.

## How the pieces connect

```
 integration/<service>  --provides-->  tools/<tool>  --called by-->  agents/<agent>
        |                                   |                              |
   env key names                      JSON schema in/out            agent.yaml contract
   (.env.example)                     (tool.yaml)                   (hands_off_to other agents)
```

Rules:
1. An **integration** owns the connection: auth, rate limits, retries. It reads keys only from environment variables and lists their names in `.env.example`.
2. A **tool** wraps one capability, with a typed input and output, and uses an integration if it needs outside access.
3. An **agent** declares in `agent.yaml` which tools and integrations it uses and which family members it can hand work to. It never talks to an outside service directly.
4. Shared data lives in `data/` (samples only).

Each integration folder includes: `README.md`, `integration.yaml`, a `mock/` folder so tests run with no real keys, and `tests/`.

## Flow of a change

```
fork -> branch from develop -> commit (-s) -> PR to develop -> CI -> review -> merge
develop -> release/<date> -> smoke test -> merge to main -> tag vX.Y.Z -> site redeploys
```

## Versioning

Semantic versioning on the repo (`vX.Y.Z`). Each agent, tool and integration carries its own `version` in its yaml; bump it in the same PR as a change.

## Commands

```bash
git checkout develop && git pull upstream develop
git checkout -b integration/notion
# work, then
git commit -s -m "feat(integration-notion): add page read tool"
git push origin integration/notion
```
