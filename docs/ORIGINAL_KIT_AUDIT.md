# Original ZIP and launch-prompt audit — 26 October 2026

The original kit contains 38 files. All were read at the start of the task. The renamed public repository is `N-i-k-e-t/foa-agents`, with `develop` default and `main` retained. This audit distinguishes verified work from preparation and remaining requirements.

| Original requirement | Evidence / current state | Status |
|---|---|---|
| Read README, governance, contribution and launch docs first | Completed before original launch preparation | Done |
| No real keys or environment files | Empty `.env.example`; local pattern checks; PR secret-scan passed | Verified on reviewed PR; continue monitoring |
| Safe dry-run, then real script | Dry-run corrected and tested; real script stopped because gh CLI is unavailable; native/browser steps used instead | Partial; no claim script completed end-to-end |
| Public repo and develop default | GitHub metadata verified after rename | Done |
| Owner and contact inputs | N-i-k-e-t; both reporting inboxes owner-confirmed | Done |
| Name changes only with owner approval | Owner explicitly requested FOA rename; repo renamed, brand changes in PR | Repo done; PR review pending |
| LICENSE, GOVERNANCE, SECURITY remain protected | No PR changes to these files; LICENSE copyright placeholder preserved | Verified unchanged; separate approval needed to fill placeholder |
| Main/develop branch protection | Specification in BRANCHING.md; native settings not verified/enforced in this session | Pending |
| Labels and ten seed issues | Seed definitions remain; labels/issues not created or verified | Pending |
| Working example agent/tool/integration | Only templates exist; website states that explicitly | Pending, do not market as working runtime |
| Site workflow / GitHub Pages | Original legacy Pages workflow has a failed deployment; Vercel is now requested production host | Superseded hosting route; not claimed fixed |
| Public Vercel landing page | Static source and browser preview complete; connector creation denied 403; GitHub bot reports a protected Vercel preview, but connector cannot inspect it | Production not verified; project access required |
| Stats and contributor truthfulness | Static site fetches real public GitHub metrics; unavailable state implemented; no invented users/stars | Browser preview verified |
| Social preview and mascot | Revised original mascot in repo/site assets with credits; repo settings social preview upload not completed | Mascot done on PR; social preview pending |
| Project board with six columns | Documented desired workflow; no board created | Pending |
| Contributor branch/sign-off/PR flow | docs/foa-launch created from develop, signed-off commits, PR #1 into develop | Done; human approval/merge pending |
| Required checks | Existing secret-scan and hygiene passed; static-site workflow added to PR | Check current PR head before any merge |
| One real improvement per day, no self-merge | This is the requested launch/rebrand change; no automated daily runner configured | Recurrence pending; no self-approval/merge performed |
| Outreach personalization, channel rules and limits | OUTREACH.md plus CHANNELS/MESSAGES/PROSPECTS, source URLs and caps | Planning done; no sends |
| Reddit/HN/Product Hunt approval | Drafts only; explicit final-copy/destination approval still required | Not approved/sent |
| Outreach and student tracking | Empty CSV schemas; public audit log says no contacts; populated private records excluded | Prepared; no participants invented |
| Issue/PR replies within 24h and Monday summary | Workflow target documented; active human/automated coverage not established | Pending |
| Daily workflow/security/secret/PR/metric monitoring | Original prompts retained; no recurring automation or new security-alert access configured | Pending |
| SEO and useful related pages | Eight content routes, 404, unique titles/descriptions, internal links, schema, production-origin configuration and checks | Source done; production indexing blocked until live host verified |
| No unrelated repo changes | All remote writes were limited to foa-agents | Honored |

An opened PR, a protected preview and a static source directory are not a verified public production launch. Never turn pending rows into completed claims without evidence. Follow governance and owner approval gates when completing the remaining work.
