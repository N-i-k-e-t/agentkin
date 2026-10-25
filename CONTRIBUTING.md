# Contributing to AgentKin

Thanks for building this with us. Your name, avatar and commits appear on the live site once your first PR is merged.

## Ways to contribute

- **Agent**: a new family member (one role, one contract)
- **Tool**: a reusable ability an agent can call
- **Integration**: a connection to an external service, API or data source
- **Docs, design, tests, bug fixes**

## Flow

1. Open an issue (use a template) and say what you want to build. Wait for the `approved-to-build` label for anything bigger than a small fix.
2. Fork, then branch from `develop` using the naming in [docs/BRANCHING.md](docs/BRANCHING.md).
3. Build. Copy `agents/_template` or `integrations/_template` as your starting point.
4. Open a PR into `develop`. Fill the PR template fully.
5. CI runs: lint, tests, secret scan, license check. Fix anything red.
6. A reviewer responds within 48 hours (see [GOVERNANCE.md](GOVERNANCE.md)).
7. Merge. You show up on the live site within the hour.

## Rules for keys and data

- Never commit real API keys, tokens or private data. Put key **names** in `.env.example`.
- Sample data must be public-domain or your own, with the source and license noted in the folder README.
- If you leak a key by accident, revoke it first, then tell us (see [SECURITY.md](SECURITY.md)).

## Commit style

`type(scope): short summary`, for example `feat(agent-scout): add web search tool`.
Types: feat, fix, docs, test, chore, refactor.

## Sign-off

Add `Signed-off-by: Your Name <email>` (use `git commit -s`). This confirms you have the right to submit the work under the MIT license.
