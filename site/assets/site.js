(() => {
const repo='N-i-k-e-t/foa-agents';
const metricIds=['stars','forks','issues'];
if(!document.getElementById('stars'))return;
fetch('https://api.github.com/repos/'+repo,{headers:{Accept:'application/vnd.github+json'}})
.then(r=>{if(!r.ok)throw Error(r.status);return r.json()})
.then(d=>{const data=[d.stargazers_count,d.forks_count,d.open_issues_count];metricIds.forEach((id,i)=>{document.getElementById(id).textContent=Number.isFinite(data[i])?data[i].toLocaleString():'—'});document.getElementById('metric-note').textContent='Public GitHub data · checked '+new Date().toLocaleString()+'. Open issues include pull requests. Counts are not endorsements.';})
.catch(()=>{metricIds.forEach(id=>document.getElementById(id).textContent='—');document.getElementById('metric-note').textContent='Live GitHub metrics are unavailable. Visit the repository for current activity.';});
})();
