# FOA Agents outreach operating playbook

Prepared 26 October 2026. This is a PLAN and draft library, not a contact history. No contacts or partner commitments are implied.

## Positioning and proof

**FOA Agents — Family of AI Agents** is an early-stage MIT-licensed foundation for modular agents, typed tools and service integrations. Today: contract templates, contribution process, launch checks and static website source. Not yet: executable agent runtime, published package, production reliability claims or benchmarks. Link a runnable example only after one exists and passes its tests. Do not call external projects partners or integrations before compatible code is shipped and maintainers agree.

Primary ask: help review one contract or choose one bounded contribution. Avoid asking strangers to work for free on an undefined project. A clear issue should include the user problem, scope, acceptance criteria, mock fixtures, estimated complexity and an available reviewer.

## Read these next

- [Channel directory and current rule evidence](outreach/CHANNELS.md)
- [Prospect research queue and personalized draft examples](outreach/PROSPECTS.md)
- [Discord, Reddit, X, developer and club messages](outreach/MESSAGES.md)
- [Student contribution pathway](IMMERSION.md)
- [Public contact audit log](outreach-log.md)

## Sending decision

1. Confirm the repo/site links and the advertised feature work. A scaffold launch must say scaffold.
2. Identify a specific role: mock-test contributor, tool builder, adapter author, docs reviewer, designer, accessibility contributor or club coordinator.
3. Record one real public artifact: exact URL, date, author's handle, relevant observation and why the task matches. Do not infer an email or private identity from commits.
4. Read the current community's rules and permitted channel. A public repo does not authorize promotional issues or unsolicited DMs. Use an allowed showcase area, an explicit request for collaborators or an opt-in contact route.
5. Deduplicate using normalized handle plus platform and any voluntarily known cross-platform identity. Check do-not-contact entries. Use one unsolicited message per person ever; no silence follow-ups. Replies can continue the conversation.
6. Personalize the first line to the artifact; explain the actual contribution; make one low-pressure request. Disclose that you are the FOA project coordinator or an automated operator acting for it. Do not impersonate the owner or imply friendship.
7. Send at most TEN personalized individual messages per day across ALL channels; this is a ceiling, not a target. Count public community announcements separately; cap at one per community per launch milestone and respect stricter local limits. Never post identical text across groups.
8. HN, Product Hunt and Reddit need owner approval for the exact final copy and destination. This plan does not grant that approval. No sending is authorized merely by writing a draft.
9. Log actual sends, replies, opt-outs and outcome with a permalink when permitted. Open a branch and PR for the public log. Keep private contact details and messages out of public Git.

## First 30 days — evidence gates, not activity quotas

| Stage | Deliverable | Gate before progressing |
|---|---|---|
| Days 1–3 | Verified landing page, clear README, scoped issues | Public links load; actual review capacity exists |
| Days 4–7 | First mocked example and test documentation | Example runs; identify one relevant community, ask permission if unclear |
| Week 2 | One technical showcase and up to five artifact-specific invitations | Links and rules rechecked; no duplicate contacts |
| Week 3 | Opt-in student contribution session | Confirmed mentor availability and voluntary participation |
| Week 4 | Publish an honest retrospective with merged work and lessons | Separate PRs opened from merged; obtain contributor permission for highlights |

Do not post to manufacture momentum when the useful milestone is missing. A zero-send day is appropriate. Review unanswered issues within 24h when actual operator coverage allows; record missed targets honestly.

## Team and intern-based operation

Assign named roles only after a real person accepts: coordinator checks channel rules; researcher records evidence; technical mentor scopes tasks; reviewer assesses PRs; owner approves restricted posts. One person may cover multiple roles. Student researchers draft and verify; they must not scrape member lists, mass-DM, buy lists, promise employment or collect private IDs. Use the opt-in pathway and private populated tracker described in IMMERSION.md.

## Tracking schemas

`outreach-tracker.csv` and `immersion-tracker.csv` are EMPTY templates. Keep populated versions private. Public `outreach-log.md` contains only consented handles/public community names, actual message permalink, template version, outcome and opt-out status; never email addresses, DMs, applications or personal evaluation. Use `P-001` internally before consent to public attribution.

States: researched → rules-checked → draft-ready → approval-required/ready → sent → replied → interested → issue-claimed → PR-open → merged → closed. Terminal states: declined, do-not-contact, unsuitable. Do not treat no response as interest.

## Metrics and weekly review

- Reply rate = people who replied / successfully delivered unique individual messages. Report denominator and window; unavailable delivery is unknown.
- Contribution conversion = contacted people with a first merged PR / successfully delivered unique messages. Attribute only with consent and direct evidence.
- Median first-response time, claimed-to-PR time and PR-to-merge time from timestamps; separate bots and humans.
- Stars today = current total minus previous recorded total. First run is baseline, not growth. Stars are a signal, never compensation or a prerequisite.
- Each Monday: useful work merged, unresolved blockers, new consenting contributors, PRs over five days old and next week's single focus. Do not rank students by publicity volume.

## OSS relationship strategy

Contribute relevant bug reports, docs or tests upstream according to their rules. A genuine fix is not a pretext to advertise FOA. For an adapter: read upstream license and API docs, create a FOA proposal, use a mock first, record the version and limits, test compatibility, then seek listing only via the upstream's documented submission route. No blanket issue campaigns or automatic cross-posting.
