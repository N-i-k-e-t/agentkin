import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {stripTypeScriptTypes} from 'node:module';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
await mkdir(root+'assets',{recursive:true});
for(const [source,target] of [['contracts.ts','contracts.js'],['family.ts','family.js'],['main.ts','site.js']]){
 const text=await readFile(root+'src/'+source,'utf8');
 await writeFile(root+'assets/'+target,'// Generated from src/'+source+'; run npm run build.\n'+stripTypeScriptTypes(text,{mode:'strip'}).replace("'../lib/stats.js'","'./stats-service.js'").split('\n').map(line=>line.trimEnd()).join('\n'));
}
const service=await readFile(root+'lib/stats.ts','utf8');
await writeFile(root+'assets/stats-service.js','// Generated public GitHub response validation; no secrets.\n'+stripTypeScriptTypes(service,{mode:'strip'}).split('\n').map(line=>line.trimEnd()).join('\n'));
console.log('Frontend TypeScript compiled to browser JavaScript.');
// Vercel transpiles entry files but does not retain imported .ts paths.
// Generate self-contained typed entry points from the same tested source.
const contracts=await readFile(root+'src/contracts.ts','utf8');
const handler=await readFile(root+'server/stats-handler.ts','utf8');
const bundle='// Generated from src/contracts.ts, lib/stats.ts and server/stats-handler.ts.\n// Run npm run build; do not edit this generated entry point.\n'+contracts+'\n'+service.replace(/^import type .*;\n/m,'')+'\n'+handler.replace(/^import .*;\n/m,'');
for(const target of [root+'api/stats.ts',root+'../api/stats.ts'])await writeFile(target,bundle);

const {FAMILY}=await import('../src/family.ts');
const esc=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const familyHTML=`<section class="section family-section" id="family"><div class="sectionhead"><div><div class="eyebrow">THE FAMILY / FIELD NOTES 001–008</div><h2>Different shapes.<br>A shared purpose.</h2></div><p>Eight original companions illustrate the planned roles. Explore the contracts below. These are concepts and generic templates, not eight running AI agents.</p></div><figure class="family-art"><img src="/assets/foa-family.webp" width="1600" height="600" loading="lazy" alt="Eight original FOA companions: research, writing, tool making, coordination, connections, memory, validation and creativity"><figcaption>Original concept artwork · roles are planned, with generic agent and integration templates available.</figcaption></figure><div class="family-filters" aria-label="Filter family roles">${[['all','All roles'],['agent','Agents'],['tool','Tools'],['integration','Integrations']].map(([value,label],i)=>`<button type="button" data-family-filter="${value}" aria-pressed="${i===0}">${label}</button>`).join('')}</div><div class="family-grid">${FAMILY.map((m,i)=>`<article class="member-card" data-member-card data-kind="${m.kind}"><button type="button" data-member="${m.id}" aria-pressed="${i===0}"><span class="member-index">0${i+1} / ${esc(m.kind)}</span><span class="member-glyph ${m.shape} ${m.color}" aria-hidden="true"><span>· ·</span></span><strong>${esc(m.name)}</strong><span>${esc(m.role)}</span><small>${m.status==='template'?'Generic template':'Planned concept'}</small></button></article>`).join('')}</div><div class="family-detail" aria-live="polite" aria-labelledby="family-name"><div><div class="eyebrow" id="family-role">Coordinate</div><h3 id="family-name">Foa / Conductor</h3><span class="pill" id="family-status">Concept · not an implemented agent</span><p id="family-description">${esc(FAMILY[0].description)}</p></div><div><span class="micro">CONTRACT</span><p class="contract-value" id="family-contract">${esc(FAMILY[0].contract)}</p><span class="micro">HAND-OFF</span><p id="family-handoff">${esc(FAMILY[0].handoff)}</p></div></div></section>`;
for(const rel of ['index.html','agents/index.html']){
 const path=root+rel;const text=await readFile(path,'utf8');
 await writeFile(path,text.replace(/<!-- FOA_FAMILY_START -->[\s\S]*?<!-- FOA_FAMILY_END -->/,'<!-- FOA_FAMILY_START -->'+familyHTML+'<!-- FOA_FAMILY_END -->'));
}
const {cp,rm,access}=await import('node:fs/promises');
await rm(root+'public',{recursive:true,force:true});await mkdir(root+'public',{recursive:true});
for(const name of ['index.html','404.html','robots.txt','sitemap.xml','assets','about','agents','tools','integrations','contribute','community','guides']){
 try{await access(root+name);await cp(root+name,root+'public/'+name,{recursive:true});}catch(error){if(name!=='sitemap.xml')throw error;}
}
console.log('Public-only static output exported to site/public; API source is deployed as a Vercel Function.');
