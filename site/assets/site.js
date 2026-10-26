// Generated from src/main.ts; run npm run build.
import {FAMILY} from './family.js';

import {buildStats} from './stats-service.js';
const $=                                   (id       )=>document.getElementById(id)          ;
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function detail(id       )     {
 const member=FAMILY.find(m=>m.id===id);if(!member)return;
 for(const [target,value] of [['family-name',member.name],['family-role',member.role],['family-description',member.description],['family-contract',member.contract],['family-handoff',member.handoff],['family-status',member.status==='template'?'Generic template available · role not implemented':'Concept · not an implemented agent']]){const el=$(target);if(el)el.textContent=value;}
 document.querySelectorAll                   ('[data-member]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.member===id)));
}
document.querySelectorAll                   ('[data-member]').forEach(button=>button.addEventListener('click',()=>detail(button.dataset.member||'')));
document.querySelectorAll                   ('[data-family-filter]').forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.familyFilter;
 document.querySelectorAll                   ('[data-family-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.querySelectorAll             ('[data-member-card]').forEach(card=>card.hidden=filter!=='all'&&card.dataset.kind!==filter);
 const first=FAMILY.find(m=>filter==='all'||m.kind===filter);if(first)detail(first.id);
}));
const stepButton=$                   ('demo-step');
const resetButton=$                   ('demo-reset');
let stage=-1;
const stages=[
 {name:'Declare the task',text:'Conductor would choose a declared role. This local walkthrough does not send your text or call an AI model.'},
 {name:'Validate the contract',text:'Check that the task has non-empty input and an explicit output shape. This is a contract demonstration, not an agent runtime.'},
 {name:'Inspect the tool boundary',text:'An agent would call a typed tool. That tool would use an integration with explicit permission scope.'},
 {name:'Return for human review',text:'The contract can describe a sourced result and limitations. A person still reviews real work. No generated result is invented here.'}
];
function resetDemo()     {stage=-1;const out=$('demo-output');if(out)out.textContent='Ready. Type an example task, then step through the contract.';if(stepButton){stepButton.disabled=false;stepButton.textContent='Start walkthrough →';}document.querySelectorAll('[data-demo-stage]').forEach(el=>el.classList.remove('current'));}
stepButton?.addEventListener('click',()=>{
 const task=$                  ('demo-task');if(!task?.value.trim()){const out=$('demo-output');if(out)out.textContent='Enter a short example task first.';task?.focus();return;}
 stage=Math.min(stage+1,stages.length-1);const out=$('demo-output');if(out)out.textContent=stages[stage].name+': '+stages[stage].text;
 document.querySelectorAll             ('[data-demo-stage]').forEach((el,i)=>el.classList.toggle('current',i===stage));
 stepButton.textContent=stage===stages.length-1?'Walkthrough complete':'Next contract step →';stepButton.disabled=stage===stages.length-1;
});
resetButton?.addEventListener('click',resetDemo);
let animationPaused=false;
const motionButton=$                   ('motion-toggle');
function motionState()     {document.documentElement.classList.toggle('motion-paused',animationPaused||reduceMotion.matches);if(motionButton){motionButton.textContent=animationPaused?'Enable gentle motion':'Pause motion';motionButton.setAttribute('aria-pressed',String(animationPaused));}}
motionButton?.addEventListener('click',()=>{animationPaused=!animationPaused;motionState();});reduceMotion.addEventListener('change',motionState);motionState();
async function loadStats()              {
 if(!$('stars'))return;
 const status=$('connection-status');if(status)status.textContent='Connecting to /api/stats…';
 try{
  let data      ;let transport               ='api';
  try{
   const response=await fetch('/api/stats',{headers:{Accept:'application/json'},signal:AbortSignal.timeout(8000)});
   const result=await response.json()               ;
   if(!response.ok||result.status!=='ok')throw new Error('Stats service unavailable');
   data=result;
  }catch{
   // Static-only previews may have no Function or restricted server egress.
   // Reuse validation, fetch only the fixed public repository and disclose fallback.
   data=await buildStats((input,init)=>fetch(input,{...init,headers:{Accept:'application/vnd.github+json'}}));
   transport='direct';
  }
  const counts=[data.counts.stars,data.counts.forks,data.counts.openIssuesAndPRs];
  if(!counts.every(n=>Number.isSafeInteger(n)&&n>=0))throw new Error('Invalid stats response');
  ['stars','forks','issues'].forEach((id,i)=>{const el=$(id);if(el)el.textContent=counts[i].toLocaleString();});
  const note=$('metric-note');if(note)note.textContent=(transport==='api'?'GitHub data via the FOA stats API · observed ':'GitHub data via direct browser fallback · observed ')+new Date(data.observedAt).toLocaleString()+'. Open issues include PRs.';
  if(status)status.textContent=transport==='direct'?'Direct GitHub fallback · stats API unavailable in this preview':data.partial?'API connected · some feeds unavailable':'Website → stats API → GitHub: connected';
  const wall=$('contributors');if(wall){wall.replaceChildren();for(const p of data.contributors){const a=document.createElement('a');a.href=p.url;a.textContent='@'+p.login;a.rel='noopener';wall.append(a);}if(!data.contributors.length)wall.textContent='No contributor profiles available in this response.';}
  const feed=$('commit-feed');if(feed){feed.replaceChildren();for(const c of data.commits.slice(0,4)){const li=document.createElement('li');const a=document.createElement('a');a.href=c.url;a.textContent=c.sha+' · '+c.message;li.append(a);feed.append(li);}if(!data.commits.length)feed.textContent='Commit feed unavailable.';}
 }catch{
  ['stars','forks','issues'].forEach(id=>{const el=$(id);if(el)el.textContent='—';});
  const note=$('metric-note');if(note)note.textContent='Live metrics unavailable. The static site still works; open GitHub for current activity.';
  if(status)status.textContent='API unavailable in this environment · static content ready';
 }
}
void loadStats();
