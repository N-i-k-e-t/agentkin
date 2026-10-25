# Governance and Approval Process

## Roles

| Role | How you get it | Can do |
|---|---|---|
| Contributor | First merged PR | Open issues and PRs |
| Triager | 5 merged PRs, invited | Label, assign, close duplicates |
| Maintainer | Sustained work, nominated by 2 maintainers | Review and merge to `develop` |
| Core | Founders and long-term stewards | Merge to `main`, cut releases, change governance |

## Approval pipeline

```
Idea -> Issue -> approved-to-build -> Branch -> PR -> Automated checks -> Review -> Merge to develop -> Weekly release to main
```

| Stage | Gate | Owner | Target time |
|---|---|---|---|
| Issue triage | Label + response | Triager | 48h |
| Proposal approval | `approved-to-build` | Maintainer | 5 days |
| Automated checks | lint, tests, secret scan, license | CI | minutes |
| Review (docs/small fix) | 1 approval | Maintainer | 48h |
| Review (agent/tool/integration) | 2 approvals, one from CODEOWNER | Maintainers | 5 days |
| Release to `main` | Changelog + smoke test | Core | weekly |

Stale rule: a PR with no contributor activity for 14 days gets a nudge, then is closed at 30 days (can be reopened).

## Labels

`status:triage`, `status:approved`, `status:in-review`, `status:changes-requested`, `status:blocked`, `type:agent`, `type:tool`, `type:integration`, `type:docs`, `good-first-issue`, `help-wanted`, `security`.

## Tracking and monitoring (continuous)

- **Project board** (GitHub Projects) with columns: Proposed, Approved, In progress, In review, Merged, Released. Auto-add every issue and PR.
- **Live site** shows merged PRs, commits and contributors, rebuilt hourly by `.github/workflows/site.yml`.
- **Weekly digest**: every Monday, Core posts open PRs older than 5 days, new contributors to welcome, and stars gained.
- **Metrics to watch**: time to first response, time to merge, PRs per contributor, return rate (contributors with 2+ PRs), stars per week.
- **Security**: Dependabot, secret scanning and push protection switched on in repo settings.

## Decisions

Normal changes: maintainer approval. Governance, license or naming changes: Core vote, public discussion for 7 days first.
