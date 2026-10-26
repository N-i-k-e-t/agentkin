import {buildStats,REPOSITORY} from '../lib/stats.ts';
export async function GET(_request:Request):Promise<Response>{
 try{
  const stats=await buildStats();
  return Response.json(stats,{headers:{'Cache-Control':'public, max-age=30','Vercel-CDN-Cache-Control':'public, s-maxage=300, stale-while-revalidate=600','X-Content-Type-Options':'nosniff'}});
 }catch(error){
  console.warn('foa_stats_unavailable',error instanceof Error?error.message:'upstream failure');
  return Response.json({status:'unavailable',repository:REPOSITORY,message:'GitHub data is temporarily unavailable.'},{status:503,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
 }
}
export function POST():Response{return Response.json({message:'Read-only endpoint'},{status:405,headers:{Allow:'GET'}});}
