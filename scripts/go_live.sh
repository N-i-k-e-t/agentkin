#!/usr/bin/env bash
# One-shot: turn this folder into a live public GitHub repo with Pages, labels,
# protection, security settings and starter issues.
#
# Prereqs: git, gh (GitHub CLI), and `gh auth login` done with a token that has
# repo, workflow and admin:org (if using an org) scopes.
#
# Usage:
#   ./scripts/go_live.sh <owner> <repo> <security-email> <conduct-email> [--dry-run]
# Example:
#   ./scripts/go_live.sh my-handle agentkin me@example.com me@example.com
set -euo pipefail

OWNER="${1:?owner (GitHub user or org)}"
REPO="${2:?repo name}"
SEC_EMAIL="${3:?security email}"
CONDUCT_EMAIL="${4:?conduct email}"
DRY="${5:-}"
FULL="$OWNER/$REPO"
NAME="AgentKin"

run() { if [ "$DRY" = "--dry-run" ]; then echo "[dry-run] $*"; else "$@"; fi; }
say() { printf "\n==> %s\n" "$*"; }

cd "$(dirname "$0")/.."
command -v python3 >/dev/null || { echo "Install Python 3"; exit 1; }
python3 scripts/launch_preflight.py "$OWNER" "$REPO" "$SEC_EMAIL" "$CONDUCT_EMAIL"

# A rehearsal must never render files, initialize git, commit or call GitHub.
if [ "$DRY" = "--dry-run" ]; then
  printf '%s\n' "[dry-run] Preflight passed; no files or remote state changed." \
    "[dry-run] Target: $FULL; default: develop; Pages: https://$OWNER.github.io/$REPO/" \
    "[dry-run] Real launch requires authenticated gh, confirmed contact inboxes and git identity."
  exit 0
fi
[ -z "$DRY" ] || { echo "Unknown option: $DRY"; exit 1; }
command -v gh >/dev/null || { echo "Install GitHub CLI: https://cli.github.com"; exit 1; }
command -v git >/dev/null || { echo "Install git"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Run: gh auth login"; exit 1; }
# Never push this kit over an existing repository or reuse unrelated local history.
if [ -d .git ] || gh repo view "$FULL" >/dev/null 2>&1; then
  echo "Existing repository detected. Inspect its history and resume individual launch steps; no push performed."
  exit 1
fi

say "1. Fill placeholders"
python3 scripts/launch_preflight.py "$OWNER" "$REPO" "$SEC_EMAIL" "$CONDUCT_EMAIL" --render

say "3. Init git, first commit on main, create develop"
[ -d .git ] || git init -q -b main
git add -A
git -c user.name="${GIT_AUTHOR_NAME:-$(git config user.name || echo "$OWNER")}" \
    -c user.email="${GIT_AUTHOR_EMAIL:-$(git config user.email || echo "$OWNER@users.noreply.github.com")}" \
    commit -q -s -m "chore: initial launch scaffold for $NAME"
git branch -M main
git branch develop 2>/dev/null || true

say "4. Create public repo and push main + develop"
if gh repo view "$FULL" >/dev/null 2>&1; then
  echo "Repo $FULL already exists; pushing to it."
  git remote get-url origin >/dev/null 2>&1 || run git remote add origin "https://github.com/$FULL.git"
else
  run gh repo create "$FULL" --public --description "An open family of AI agents, tools and integrations, built in public." --source=. --remote=origin
fi
run git push -u origin main
run git push -u origin develop

say "5. Repo settings: topics, features, merge options"
run gh repo edit "$FULL" --enable-issues --enable-discussions --enable-projects \
  --delete-branch-on-merge --enable-squash-merge --enable-merge-commit=false --enable-rebase-merge=false \
  --homepage "https://$OWNER.github.io/$REPO/" \
  --add-topic ai-agents --add-topic open-source --add-topic agents --add-topic llm --add-topic good-first-issue --add-topic hacktoberfest
run gh repo edit "$FULL" --default-branch develop || true   # contributors land on develop by default

say "6. Security: secret scanning, push protection, Dependabot, private vuln reporting"
run gh api -X PATCH "repos/$FULL" --input - >/dev/null <<'JSON' || echo "MANUAL: verify secret scanning and push protection"
{"security_and_analysis":{"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"}}}
JSON
run gh api -X PUT "repos/$FULL/vulnerability-alerts" >/dev/null || true
run gh api -X PUT "repos/$FULL/automated-security-fixes" >/dev/null || true
run gh api -X PUT "repos/$FULL/private-vulnerability-reporting" >/dev/null || true

say "7. GitHub Pages from Actions"
run gh api -X POST "repos/$FULL/pages" -f build_type=workflow >/dev/null 2>&1 \
  || run gh api -X PUT "repos/$FULL/pages" -f build_type=workflow >/dev/null 2>&1 || echo "(Pages may already be set)"

say "8. Labels"
mk() { run gh label create "$1" --color "$2" --description "$3" --repo "$FULL" --force; }
mk status:triage             ededed "New, waiting for triage"
mk status:approved           0e8a16 "approved-to-build"
mk approved-to-build         0e8a16 "Maintainer approved this proposal"
mk status:in-review          1d76db "PR under review"
mk status:changes-requested  fbca04 "Contributor to update PR"
mk status:blocked            b60205 "Blocked"
mk type:agent                8b6cff "New agent"
mk type:tool                 ff6b5e "New tool"
mk type:integration          3ddc97 "New integration"
mk type:docs                 4da8ff "Docs and design"
mk good-first-issue          7057ff "Good for newcomers"
mk help-wanted               008672 "Extra hands welcome"
mk security                  d93f0b "Security related"
mk digest                    c5def5 "Weekly digest"

say "9. Branch protection (main strict, develop reviewed)"
protect() { # branch approvals
  run gh api -X PUT "repos/$FULL/branches/$1/protection" --input - >/dev/null <<EOF
{
  "required_status_checks": {"strict": true, "contexts": ["secret-scan", "hygiene"]},
  "enforce_admins": true,
  "required_pull_request_reviews": {"required_approving_review_count": $2, "dismiss_stale_reviews": true, "require_code_owner_reviews": true},
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF
}
# Checks only exist after CI has run once; if this fails, rerun this step after the first PR.
protect main 1    || echo "(protect main: rerun after first CI run)"
protect develop 1 || echo "(protect develop: rerun after first CI run)"

say "10. Daily data branch (unprotected, bot-only snapshots)"
if ! git ls-remote --exit-code --heads origin data >/dev/null 2>&1; then
  tmp="$(mktemp -d)"; git worktree add -q --detach "$tmp" HEAD
  ( cd "$tmp" && git checkout -q --orphan data && git rm -rq -f . && echo '[]' > history.json \
    && git add history.json && git -c user.name=agentkin-bot -c user.email=bot@users.noreply.github.com commit -q -s -m "chore(data): init history" \
    && run git push -q origin data )
  git worktree remove --force "$tmp"
fi

say "11. Seed good-first-issues"
while IFS='|' read -r title labels body; do
  [ -z "$title" ] && continue
  run gh issue create --repo "$FULL" --title "$title" --label "$labels" --body "$body"
done < scripts/seed_issues.txt

say "12. Discussions welcome + first site build"
run gh workflow run site.yml --repo "$FULL" || echo "(run the 'site' workflow from the Actions tab)"

cat <<DONE

TARGET URLS (verify deployment and settings before reporting live):
  Repo: https://github.com/$FULL
  Site: https://$OWNER.github.io/$REPO/

Manual steps GitHub does not allow by script:
  - Settings > Social preview: upload the 1280x640 image
  - Create a Project board (Projects tab) with Proposed/Approved/In progress/In review/Merged/Released
  - If step 9 warned, rerun it after the first CI run
  - Add repo secret ANTHROPIC_API_KEY only if you enable the optional AI daily-edit workflow
DONE
