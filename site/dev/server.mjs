import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname,sep} from 'node:path';
import {GET,POST} from '../api/stats.ts';
const root=fileURLToPath(new URL('../',import.meta.url));
const portArg=process.argv.indexOf('--port');const port=Number(portArg>=0?process.argv[portArg+1]:process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.txt':'text/plain','.xml':'application/xml'};
createServer(async(req,res)=>{
 try{
  const url=new URL(req.url||'/','http://localhost:'+port);
  if(url.pathname==='/api/stats'){
   const response=await (req.method==='GET'?GET(new Request(url)):POST());res.writeHead(response.status,Object.fromEntries(response.headers));res.end(await response.text());return;
  }
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
  let path=resolve(root,'.'+decodeURIComponent(url.pathname));
  if(path!==root.replace(/\/$/,'')&&!path.startsWith(root)){res.writeHead(403);res.end();return;}
  // Serve public website files only; source, tests and API implementation stay private.
  const allowed=url.pathname==='/'||url.pathname==='/404.html'||url.pathname==='/robots.txt'||url.pathname==='/sitemap.xml'||['/assets/','/about/','/agents/','/tools/','/integrations/','/contribute/','/community/','/guides/'].some(p=>url.pathname.startsWith(p));
  if(!allowed){res.writeHead(404);res.end('Not found');return;}
  try{if((await stat(path)).isDirectory())path=resolve(path,'index.html');const body=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(req.method==='HEAD'?undefined:body);}
  catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(root,'404.html')));}
 }catch{res.writeHead(400);res.end('Bad request');}
}).listen(port,'0.0.0.0',()=>console.log('FOA website + API ready at http://localhost:'+port));
