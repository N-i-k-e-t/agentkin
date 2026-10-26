export interface Contributor { login: string; avatar: string; url: string; contributions: number }
export interface Commit { sha: string; message: string; author: string | null; url: string; date: string }
export interface Stats {
  status: 'ok'; repository: string; observedAt: string;
  counts: { stars: number; forks: number; openIssuesAndPRs: number };
  contributors: Contributor[]; commits: Commit[]; partial: boolean;
}
export interface Unavailable { status: 'unavailable'; repository: string; message: string }
export type StatsResult = Stats | Unavailable;
export interface FamilyMember {id: string;name: string;role: string;kind: 'agent'|'tool'|'integration';shape: string;color: string;status: 'concept'|'template';description: string;contract: string;handoff: string}
