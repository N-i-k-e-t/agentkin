// Builds docs/data/stats.json for the live site.
// Run in CI: GITHUB_REPOSITORY=owner/repo GITHUB_TOKEN=... node scripts/build_stats.mjs
// Node 20+ (global fetch). No dependencies.
import { mkdir, writeFile } from "node:fs/promises";

const repo = process.env.GITHUB_REPOSITORY;
if (!repo) {
  console.error("Set GITHUB_REPOSITORY=owner/repo");
  process.exit(1);
}
const token = process.env.GITHUB_TOKEN;
const base = `https://api.github.com/repos/${repo}`;

async function gh(path, accept = "application/vnd.github+json") {
  const res = await fetch(path.startsWith("http") ? path : `${base}${path}`, {
    headers: {
      Accept: accept,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${path}`);
  return { json: await res.json(), link: res.headers.get("link") || "" };
}

function lastPage(link) {
  const m = link.match(/[?&]page=(\d+)>; rel="last"/);
  return m ? Number(m[1]) : 1;
}

// Stars: total count, plus the most recent stargazers (last page is newest)
const info = (await gh("")).json;
const starsTotal = info.stargazers_count;
let recentStars = [];
try {
  const first = await gh("/stargazers?per_page=30", "application/vnd.github.star+json");
  const last = lastPage(first.link);
  const page = last > 1
    ? (await gh(`/stargazers?per_page=30&page=${last}`, "application/vnd.github.star+json")).json
    : first.json;
  recentStars = page
    .slice()
    .reverse()
    .map((s) => ({
      login: s.user.login,
      avatar: s.user.avatar_url,
      url: s.user.html_url,
      starred_at: s.starred_at,
    }));
} catch (e) {
  console.warn("stargazers skipped:", e.message);
}

// Contributors (people with commits on the default branch)
const contributors = (await gh("/contributors?per_page=100")).json
  .filter((c) => c.type === "User")
  .map((c) => ({
    login: c.login,
    avatar: c.avatar_url,
    url: c.html_url,
    contributions: c.contributions,
  }));

// Recent commits
const commits = (await gh("/commits?per_page=15")).json.map((c) => ({
  sha: c.sha.slice(0, 7),
  message: c.commit.message.split("\n")[0],
  author: c.author?.login || c.commit.author.name,
  avatar: c.author?.avatar_url || "",
  url: c.html_url,
  date: c.commit.author.date,
}));

// Recently merged pull requests
const prs = (await gh("/pulls?state=closed&sort=updated&direction=desc&per_page=30")).json
  .filter((p) => p.merged_at)
  .slice(0, 10)
  .map((p) => ({
    number: p.number,
    title: p.title,
    author: p.user.login,
    avatar: p.user.avatar_url,
    url: p.html_url,
    merged_at: p.merged_at,
  }));

// Open PR count for the "in review" number
const openPrs = (await gh("/pulls?state=open&per_page=1")).link
  ? lastPage((await gh("/pulls?state=open&per_page=1")).link)
  : (await gh("/pulls?state=open&per_page=100")).json.length;

const stats = {
  repo,
  generated_at: new Date().toISOString(),
  stars: starsTotal,
  forks: info.forks_count,
  open_issues: info.open_issues_count,
  open_prs: openPrs,
  contributors_count: contributors.length,
  contributors,
  recent_stars: recentStars,
  recent_commits: commits,
  merged_prs: prs,
};

await mkdir("docs/data", { recursive: true });
await writeFile("docs/data/stats.json", JSON.stringify(stats, null, 2));
console.log(`stats.json written: ${starsTotal} stars, ${contributors.length} contributors`);
