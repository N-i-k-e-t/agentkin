import type {Stats, Contributor, Commit} from '../src/contracts.ts';
export const REPOSITORY = 'N-i-k-e-t/foa-agents';
export type Fetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
function count(value: unknown): number {
 if(typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0)throw new Error('Invalid upstream count');
 return value;
}
function record(value: unknown): Record<string,unknown> {
 if(!value || typeof value !== 'object' || Array.isArray(value))throw new Error('Invalid upstream record');
 return value as Record<string,unknown>;
}
function githubURL(value: unknown): string {
 if(typeof value!=='string')throw new Error('Missing URL');
 const url=new URL(value);if(url.protocol!=='https:' || url.hostname!=='github.com')throw new Error('Invalid upstream URL');return url.href;
}
export async function buildStats(fetcher: Fetcher=fetch, now:()=>Date=()=>new Date()):Promise<Stats>{
 const base='https://api.github.com/repos/'+REPOSITORY;
 const get=async(path:string):Promise<unknown>=>{
  const response=await fetcher(base+path,{headers:{Accept:'application/vnd.github+json','User-Agent':'FOA-Agents-site'},signal:AbortSignal.timeout(6000)});
  if(!response.ok)throw new Error('GitHub status '+response.status);
  return response.json();
 };
 const [repoResult,peopleResult,commitsResult]=await Promise.allSettled([get(''),get('/contributors?per_page=8'),get('/commits?per_page=8')]);
 if(repoResult.status!=='fulfilled')throw new Error('Repository data unavailable');
 const repo=record(repoResult.value);
 const contributors:Contributor[]=[];const commits:Commit[]=[];let partial=false;
 if(peopleResult.status==='fulfilled'&&Array.isArray(peopleResult.value)){
  for(const raw of peopleResult.value){try{const p=record(raw);if(p.type!=='User')continue;
   if(typeof p.login!=='string'||typeof p.avatar_url!=='string')throw new Error('Invalid profile');
   const avatar=new URL(p.avatar_url);if(avatar.protocol!=='https:'||avatar.hostname!=='avatars.githubusercontent.com')throw new Error('Invalid avatar');
   contributors.push({login:p.login,avatar:avatar.href,url:githubURL(p.html_url),contributions:count(p.contributions)});
  }catch{partial=true;}}
 }else partial=true;
 if(commitsResult.status==='fulfilled'&&Array.isArray(commitsResult.value)){
  for(const raw of commitsResult.value){try{const c=record(raw),details=record(c.commit),author=record(details.author);const user=c.author?record(c.author):null;
   if(typeof c.sha!=='string'||typeof details.message!=='string'||typeof author.date!=='string'||!Number.isFinite(Date.parse(author.date)))throw new Error('Invalid commit');
   commits.push({sha:c.sha.slice(0,7),message:details.message.split('\n')[0],author:typeof user?.login==='string'?user.login:null,url:githubURL(c.html_url),date:author.date});
  }catch{partial=true;}}
 }else partial=true;
 return {status:'ok',repository:REPOSITORY,observedAt:now().toISOString(),counts:{stars:count(repo.stargazers_count),forks:count(repo.forks_count),openIssuesAndPRs:count(repo.open_issues_count)},contributors,commits,partial};
}
