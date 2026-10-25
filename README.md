# Family of AI Agents · FOA Agents

> One agent. One clear job. A family built together.

<img src="docs/assets/foa-mascot.png" width="240" alt="Foa, our original organic companion mascot with a petal crown and connecting arc" align="right">

An MIT-licensed community project for modular agents, reusable tools and service integrations.

**Stage: foundation / pre-alpha.** Today the repository provides contracts, templates, governance, contribution guides, launch checks and website source. There is no published agent runtime, package or production-ready agent yet. Proposed work is marked as planned.

- [Start contributing](CONTRIBUTING.md)
- [Branch and release guide](docs/BRANCHING.md)
- [Outreach playbook](docs/OUTREACH.md)
- [Community targets and verified rules](docs/outreach/CHANNELS.md)
- [Student contributor pathway](docs/IMMERSION.md)
- [Vercel site and SEO runbook](docs/DEPLOYMENT.md)

## The pieces

| Component | Responsibility | Today |
|---|---|---|
| `agents/` | One task, declared inputs/outputs and hand-offs | Contract template |
| `tools/` | One reusable typed capability | Contribution contract |
| `integrations/` | Auth, rate limits, retries and external access | Contract template |
| `data/` | Public, licensed samples and evaluations | Data policy |
| `site/` | Responsive public website, mascot and guides | Static source, prepared for Vercel |

## Start locally

```bash
git clone https://github.com/N-i-k-e-t/foa-agents.git
cd foa-agents
git checkout develop
git switch -c docs/your-small-improvement
python3 -m unittest discover -s scripts -p 'test_launch.py' -v
python3 -m http.server 8000 --directory site
```

Open http://localhost:8000 for the website. Contracts are starting points, not executable agents. No API keys are required to preview the site or run launch tests. If a future integration requires credentials, keep them in an ignored local environment file.

## Propose → build → review

For substantial work, open a proposal and wait for `approved-to-build`. Branch from `develop`, include mock-based tests for new functionality, sign off every commit and open a PR into `develop`. One human maintainer approval is required for small documentation fixes; agent/tool/integration changes need two approvals, including a CODEOWNER. The operator never approves or merges its own PR.

`main` is the release branch. An open PR is pending review, not shipped. See [GOVERNANCE.md](GOVERNANCE.md).

## Project honesty

No fake stars, users, benchmarks, partnerships or testimonials. External projects mentioned in our outreach research are prospective communities, not partners. Website metrics use GitHub's public API and show an unavailable state on failure.

## License and credits

Code and repository content: [MIT](LICENSE), with original terms retained. The original Foa mascot was generated with OpenAI image generation; see [asset credits](docs/assets/CREDITS.md). Brand identity is not an endorsement by any framework or model provider.
