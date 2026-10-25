# Branching, review and releases

## Branch contract

| Branch | Use | Merge authority |
|---|---|---|
| `develop` | Default branch; integration and all contributor PRs | Human maintainers |
| `main` | Reviewed releases; intended Vercel production source after Git integration is configured | Core |
| `agent/<name>` | One agent feature | PR into develop |
| `tool/<name>` | One typed tool | PR into develop |
| `integration/<service>` | Auth/retries/rate-limited external connection | PR into develop |
| `docs/<topic>` | Documentation, site and brand changes | PR into develop |
| `fix/<issue>-<slug>` | Bounded bug fix | PR into develop |
| `release/YYYY-MM-DD` | Tested weekly release candidate | Core approval to main |
| `data` | Clearly attributed metric snapshots only | Automation; never code |

## First contribution

1. Read CONTRIBUTING.md and GOVERNANCE.md; use a small unclaimed issue.
2. For substantial work, wait for `approved-to-build`; do not mark your own proposal approved.
3. Fork, add the upstream remote and branch from current `upstream/develop`.
4. Keep one purpose per PR; add contracts, README, version bump and mock tests where relevant.
5. Run checks. Use `git commit -s`; sign-off is DCO attestation, distinct from cryptographic signing.
6. Open a PR into develop with the provided template and actual test evidence.
7. Address feedback. Only human-approved, passing changes may merge. Never approve/merge your own PR.

```bash
git remote add upstream https://github.com/N-i-k-e-t/foa-agents.git
git fetch upstream
git switch -c tool/my-tool upstream/develop
# edit and test
git add tools/my-tool
git commit -s -m "feat(my-tool): add mocked capability"
git push origin tool/my-tool
```

## Protection specification — verify in Settings

These are required target settings, not a claim they are already enabled:

- Protect main and develop; require PRs, passing `secret-scan` and `hygiene`, up-to-date branches, dismissal of stale approvals and CODEOWNER review. Disallow force-push and deletion; apply to admins.
- Governance requires one human approval for small/docs changes and two including CODEOWNER for agents/tools/integrations. A single global approval count does not implement the category distinction; enforce the second approval in review or a policy check.
- Do not reduce existing protection. Repo merge methods and automatic branch deletion remain unchanged because their modification was not approved in the prior automatic review.
- Set up actual maintainers before relying on review turnaround targets. The sole author cannot satisfy the no-self-approval rule.

## Release sequence

Cut release/YYYY-MM-DD from develop; compile changelog; run tests, secret scan, license/provenance review and browser checks. Obtain human Core approval. Merge to main and tag the version; verify the exact production commit and public Vercel URL. Never deploy arbitrary contributor branches with secrets. Roll back a failed release to the last known good deployment without rewriting Git history.

## Component boundaries

Integration owns network/auth; tool exposes typed input/output; agent composes tools and declares hand-offs. Use mocked service responses and public sample data. Templates are not working integrations until code and tests are present.
