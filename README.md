# AgentKin

> An open family of AI agents, tools and integrations, built in public by the people who use them.

[![Stars](https://img.shields.io/github/stars/N-i-k-e-t/agentkin?style=social)](https://github.com/N-i-k-e-t/agentkin)
[![Contributors](https://img.shields.io/github/contributors/N-i-k-e-t/agentkin)](https://github.com/N-i-k-e-t/agentkin/graphs/contributors)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Live site:** https://N-i-k-e-t.github.io/agentkin/ (shows every star, contributor and commit as it happens)

## What is this?

AgentKin is a family of cooperating AI agents. Each agent has one job, a personality, and a clear contract so agents can be combined, swapped and extended.

| Part | What lives there | Folder |
|---|---|---|
| Agents | The family members (each = one role) | `agents/` |
| Tools | Reusable abilities agents can call | `tools/` |
| Integrations | Connections to outside services and APIs | `integrations/` |
| Data | Sample datasets, evals, prompts | `data/` |
| Site | The live landing page | `docs/` |

## Repo structure

```
.
├── agents/
│   └── _template/            copy this to start a new agent
├── tools/
├── integrations/
│   └── _template/            copy this to start a new integration
├── data/                     samples only, never private data
├── docs/                     landing page + project docs (GitHub Pages)
│   ├── index.html
│   ├── data/stats.json       generated hourly by CI
│   └── *.md
├── scripts/build_stats.mjs   pulls stars, contributors, commits
├── .github/                  templates, CODEOWNERS, workflows
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── SECURITY.md
└── .env.example              names of keys only, never values
```

## Quick start

```bash
git clone https://github.com/N-i-k-e-t/agentkin.git
cd agentkin
cp .env.example .env        # add your own keys locally; never commit .env
```

## Contribute

Read [CONTRIBUTING.md](CONTRIBUTING.md). Every contributor and every star is shown on the live site.

## Docs

- [Name and naming system](docs/NAME.md)
- [Branching and integration](docs/BRANCHING.md)
- [Launch checklist](docs/LAUNCH_CHECKLIST.md)
- [Outreach messages](docs/OUTREACH.md)
- [Graphics list and count](docs/ASSETS.md)
- [Character bible](docs/CHARACTER_BIBLE.md)
- [Video baseline](docs/VIDEO_BASELINE.md)
- [Daily work prompt](docs/DAILY_PROMPT.md)
