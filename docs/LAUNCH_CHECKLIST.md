# Launch Checklist

Tick these in order. Replace every `{{PLACEHOLDER}}` first:
`grep -rn "{{" .` should return nothing before you go public.

## 1. Before going public (day -7 to -1)

- [ ] Pick final name; set `Family of AI Agents (FOA Agents)`, `N-i-k-e-t`, `foa-agents`
- [ ] Check name is free: GitHub org, domain, X/Twitter, Discord, npm/PyPI
- [ ] Set `niketpatil1624@gmail.com` and `niketpatil1624@gmail.com` to real inboxes
- [ ] Run a secret scan on full history (`gitleaks detect`) and confirm `.env` is not tracked
- [ ] Turn on in repo settings: secret scanning, push protection, Dependabot, private vulnerability reporting
- [ ] Branch protection on `main` and `develop`
- [ ] Create labels from GOVERNANCE.md; create Project board (Proposed, Approved, In progress, In review, Merged, Released)
- [ ] Ship at least 1 working example agent, 1 tool, 1 integration (mocked) so newcomers see a real pattern
- [ ] Create 10 to 15 `good-first-issue` issues (see ideas below)
- [ ] Enable Discussions and (optional) a Discord with #welcome, #ideas, #show-and-tell, #help
- [ ] Fresh-clone test: a stranger can follow Quick start in under 10 minutes

## 2. Live site

- [ ] Settings > Pages > Source: GitHub Actions
- [ ] Add repo secret only if needed; the default `GITHUB_TOKEN` is enough for public stats
- [ ] Run workflow `site` manually once; confirm `docs/data/stats.json` has stars, contributors, commits
- [ ] Open the live URL on phone and desktop; check contributor wall, star wall, commit feed
- [ ] Add social preview image (1280x640) in repo settings

## 3. Launch day

- [ ] Show HN / Reddit / Product Hunt only after the site and example agents work
- [ ] Be online for the first 6 hours to answer issues and PRs fast
- [ ] Welcome every first PR by name

## 4. First 30 days

- [ ] Weekly digest each Monday
- [ ] Review SLA: first response 48h
- [ ] Promote active contributors to Triager at 5 merged PRs
- [ ] Release to `main` weekly with a changelog
- [ ] Feature a "contributor of the week" on the site and socials

## Good-first-issue ideas

1. Add a README to every `_template` folder
2. Write a `web-search` tool with a mock
3. Add a `summarizer` example agent
4. Add a GitHub integration (read issues) with mock
5. Add unit test harness for `agent.yaml` validation
6. Dark/light toggle on the landing page
7. Add a sample eval dataset (public domain)
8. Translate README to another language
9. Draw a new family member (see CHARACTER_BIBLE.md)
10. Add a CLI `new-agent` scaffolder
