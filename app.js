(function(){
'use strict';
var API=localStorage.getItem('vp_api')||'PASTE_YOUR_GAS_WEB_APP_URL_HERE';
var BASE=new URL('./',document.currentScript.src).href;
var V=document.getElementById('view'),U=null,tab='home',tm=0,dp=null,Q=[],P={pt:'',pd:'',pv:'Public'};
try{U=JSON.parse(localStorage.getItem('vp_user'))}catch(e){}
function $(s,r){return(r||document).querySelector(s)}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function ic(n){return '<svg viewBox="0 0 24 24"><use href="#i-'+n+'"/></svg>'}
function key(){var k=localStorage.getItem('vp_key');if(!k){k=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('vp_key',k)}return k}
function link(id){return BASE+'p/'+id}
function dlg(t,m,b){b=b||['OK'];return new Promise(function(r){var d=document.createElement('div');d.className='dlg';d.innerHTML='<div class="card"><h2>'+t+'</h2><p>'+m+'</p><div class="row"></div></div>';var w=$('.row',d);b.forEach(function(x,i){var e=document.createElement('button');e.className='btn '+(i==b.length-1?'pri':'txt');e.textContent=x;e.onclick=function(){d.remove();r(i)};w.appendChild(e)});document.body.appendChild(d)})}
function call(a,d){d=d||{};d.action=a;return fetch(API,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(d)}).then(function(r){return r.json()}).catch(function(){return{ok:false,msg:'Could not reach the server. Check your connection and the backend URL.'}})}
function load(){V.innerHTML='<div class="pad"><div class="spin"></div></div>'}
function fail(r){V.innerHTML='<div class="pad"><div class="card"><h2>Something went wrong</h2><p>'+esc(r.msg)+'</p></div></div>'}
var T=[['home','home','Explore'],['mine','poll','My Polls'],['create','add','Create'],['acct','person','Account']];
function nav(){$('#nav').innerHTML=T.map(function(t){return'<button data-t="'+t[0]+'" class="'+(tab==t[0]?'on':'')+'">'+ic(t[1])+t[2]+'</button>'}).join('')}
$('#nav').onclick=function(e){var b=e.target.closest('button');if(b)go(b.dataset.t)};
function go(t,a){clearInterval(tm);tab=t;nav();V.scrollTop=0;({home:home,mine:mine,create:create,acct:acct,vote:vote,res:res})[t](a)}
function need(f){if(!U){dlg('Login needed','Please log in or register first.').then(function(){go('acct')});return}
call('login',U).then(function(r){if(!r.ok||r.status!='Active'){go('acct');return}f()})}
function pc(p,own){return'<div class="card"><h2>'+esc(p.title)+'</h2><p>'+esc(p.desc||'')+'</p><p>'+p.votes+' votes &middot; '+esc(p.status)+'</p><div class="row"><button class="btn pri" data-v="'+p.id+'">Vote</button><button class="btn tonal" data-r="'+p.id+'">Results</button><button class="btn" data-share-poll="'+p.id+'" data-title="'+esc(p.title)+'">'+ic('share')+'Share</button>'+(own?'<button class="btn" data-s="'+p.id+'" data-st="'+p.status+'">'+(p.status=='Live'?'Close':'Reopen')+'</button>':'')+'</div></div>'}
function home(){load();call('publicPolls').then(function(r){if(!r.ok)return fail(r);V.innerHTML='<div class="pad">'+(U?'':'<div class="card"><h2>Welcome to Vision Poll</h2><p>Vote on any poll. To create polls, register for a free account. New accounts are approved by the admin.</p><button class="btn pri" data-t2="acct">Log in or register</button></div>')+(r.polls.map(function(p){return pc(p)}).join('')||'<p class="mut">No public polls yet. Be the first to create one.</p>')+'</div>'})}
function mine(){need(function(){load();call('myPolls',U).then(function(r){if(!r.ok)return fail(r);V.innerHTML='<div class="pad">'+(r.polls.map(function(p){return pc(p,1)}).join('')||'<p class="mut">You have no polls yet. Tap Create to make one.</p>')+'</div>'})})}
function form(reg){V.innerHTML='<div class="pad"><div class="card"><h2>'+(reg?'Create account':'Welcome back')+'</h2>'+(reg?'<label>Full name<input id="n"></label><label>Country<input id="c"></label>':'')+'<label>Email<input id="e" type="email"></label><label>Password<input id="p" type="password"></label><button class="btn pri" id="go">'+(reg?'Register':'Log in')+'</button><button class="btn txt" id="sw">'+(reg?'I already have an account':'New here? Register')+'</button></div></div>';
$('#sw').onclick=function(){form(!reg)};
$('#go').onclick=function(){var d={email:$('#e').value.trim(),password:$('#p').value};if(reg){d.name=$('#n').value.trim();d.country=$('#c').value.trim()}
if(!d.email||!d.password||(reg&&!d.name))return dlg('Missing details','Please fill in every field.');
call(reg?'register':'login',d).then(function(r){if(!r.ok)return dlg('Could not continue',esc(r.msg));U={email:d.email,password:d.password};localStorage.setItem('vp_user',JSON.stringify(U));if(reg)dlg('Registration received','Your account is waiting for admin approval. You can start as soon as it is approved.').then(acct);else acct()})}}
function acct(){if(!U)return form(0);load();call('login',U).then(function(r){
if(!r.ok){U=null;localStorage.removeItem('vp_user');return form(0)}
var s=r.status,h='';
if(s=='Pending'){h='<div class="card" style="text-align:center"><div class="spin"></div><h2>Waiting for approval</h2><p>Your account is being reviewed. This page checks automatically.</p></div>';tm=setInterval(function(){call('login',U).then(function(x){if(x.ok&&x.status!='Pending'){clearInterval(tm);acct();if(x.status=='Active')dlg('Approved','Your account is active. You can now create polls.')}})},8000)}
else if(s=='Active')h='<div class="card"><h2>'+esc(r.name)+'</h2><p>'+esc(U.email)+'</p><p>Status: Active</p></div>';
else h='<div class="card"><h2>Account '+esc(s)+'</h2><p>Please contact support for help.</p></div>';
V.innerHTML='<div class="pad">'+h+'<button class="btn" id="lo">Log out</button></div>';$('#lo').onclick=function(){U=null;localStorage.removeItem('vp_user');form(0)}})}
function create(){need(function(){Q=[{t:'',y:'single',o:''}];P={pt:'',pd:'',pv:'Public'};draw()})}
function draw(){var Y=[['single','Single choice'],['multi','Multiple choice'],['rating','Star rating'],['text','Written answer']];
V.innerHTML='<div class="pad"><div class="card"><h2>New poll</h2><label>Title<input id="pt" value="'+esc(P.pt)+'"></label><label>Description<textarea id="pd">'+esc(P.pd)+'</textarea></label><label>Visibility<select id="pv"><option value="Public"'+(P.pv=='Public'?' selected':'')+'>Public (listed in Explore)</option><option value="Link"'+(P.pv=='Link'?' selected':'')+'>Link only</option></select></label></div>'+Q.map(function(q,i){return'<div class="card" data-i="'+i+'"><h2>Question '+(i+1)+'</h2><label>Question<input data-k="t" value="'+esc(q.t)+'"></label><label>Type<select data-k="y">'+Y.map(function(x){return'<option value="'+x[0]+'"'+(q.y==x[0]?' selected':'')+'>'+x[1]+'</option>'}).join('')+'</select></label>'+(q.y=='single'||q.y=='multi'?'<label>Options (one per line)<textarea data-k="o">'+esc(q.o)+'</textarea></label>':'')+(Q.length>1?'<button class="btn" data-x="'+i+'">'+ic('del')+'Remove</button>':'')+'</div>'}).join('')+'<button class="btn tonal" id="aq">'+ic('add')+'Add question</button><button class="btn pri" id="pub">Publish poll</button></div>'}
function publish(){var qs=Q.map(function(q){return{t:q.t.trim(),y:q.y,o:(q.o||'').split('\n').map(function(s){return s.trim()}).filter(Boolean)}});
if(!P.pt.trim())return dlg('Title needed','Give your poll a title.');
for(var i=0;i<qs.length;i++){if(!qs[i].t)return dlg('Question needed','Question '+(i+1)+' has no text.');if((qs[i].y=='single'||qs[i].y=='multi')&&qs[i].o.length<2)return dlg('Options needed','Question '+(i+1)+' needs at least two options.')}
call('createPoll',Object.assign({title:P.pt.trim(),desc:P.pd.trim(),vis:P.pv,qs:qs},U)).then(function(r){if(!r.ok)return dlg('Could not publish',esc(r.msg));dlg('Poll published','Your poll link:<br><b>'+esc(link(r.id))+'</b><br>Open My Polls to share it.',['View poll']).then(function(){go('vote',r.id)})})}
function vote(id){load();call('getPoll',{id:id,key:key()}).then(function(r){if(!r.ok)return fail(r);var p=r.poll,h='<div class="pad"><div class="card"><h2>'+esc(p.title)+'</h2><p>'+esc(p.desc)+'</p></div>';
if(p.voted||p.status!='Live'){V.innerHTML=h+'<div class="card"><p>'+(p.voted?'You have already voted on this poll.':'This poll is closed.')+'</p><button class="btn pri" data-r="'+id+'">See results</button></div></div>';return}
p.qs.forEach(function(q,i){h+='<div class="card" data-q="'+i+'"><h2>'+esc(q.t)+'</h2>';
if(q.y=='single'||q.y=='multi')q.o.forEach(function(o,k){h+='<label class="opt"><input type="'+(q.y=='single'?'radio':'checkbox')+'" name="q'+i+'" value="'+k+'"><span>'+esc(o)+'</span></label>'});
else if(q.y=='rating'){h+='<div class="stars">';for(var s=1;s<6;s++)h+='<button data-star="'+s+'" aria-label="'+s+' stars">'+ic('star')+'</button>';h+='</div>'}
else h+='<textarea placeholder="Type your answer"></textarea>';h+='</div>'});
V.innerHTML=h+'<button class="btn pri" id="sub">Submit vote</button></div>';
$('#sub').onclick=function(){var a=[];for(var i=0;i<p.qs.length;i++){var q=p.qs[i],c=$('[data-q="'+i+'"]'),v;
if(q.y=='single'){var s=$('input:checked',c);v=s?+s.value:null}
else if(q.y=='multi')v=[].map.call(c.querySelectorAll('input:checked'),function(x){return+x.value});
else if(q.y=='rating')v=+c.dataset.val||null;
else v=$('textarea',c).value.trim()||null;
if(q.y!='text'&&(v===null||(v.length===0)))return dlg('Answer needed','Please answer question '+(i+1)+'.');a.push(v)}
call('vote',{id:id,key:key(),a:a}).then(function(x){if(!x.ok)return dlg('Could not vote',esc(x.msg));dlg('Thank you','Your vote has been recorded.',['See results']).then(function(){go('res',id)})})}})}
function res(id){load();call('results',{id:id}).then(function(r){if(!r.ok)return fail(r);var h='<div class="pad"><div class="card"><h2>'+esc(r.title)+'</h2><p>'+r.total+' responses</p></div>';
r.res.forEach(function(q){h+='<div class="card"><h2>'+esc(q.t)+'</h2>';
if(q.c)q.o.forEach(function(o,k){var pc=q.n?Math.round(q.c[k]*100/q.n):0;h+='<div>'+esc(o)+' &mdash; '+q.c[k]+' ('+pc+'%)</div><div class="track"><div class="fill" style="width:'+pc+'%"></div></div>'});
else if(q.y=='rating')h+='<p>Average '+q.avg+' / 5 from '+q.n+' ratings</p><div class="track"><div class="fill" style="width:'+q.avg*20+'%"></div></div>';
else h+=(q.x.map(function(t){return'<div class="opt"><span>'+esc(t)+'</span></div>'}).join('')||'<p>No written answers yet.</p>');h+='</div>'});
V.innerHTML=h+'<button class="btn" data-share-poll="'+id+'" data-title="'+esc(r.title)+'">'+ic('share')+'Share poll</button></div>'})}
V.onclick=function(e){var b=e.target.closest('button');if(!b)return;var d=b.dataset;
if(d.v)go('vote',d.v);else if(d.r)go('res',d.r);else if(d.t2)go(d.t2);
else if(d.s)call('setPoll',Object.assign({id:d.s,status:d.st=='Live'?'Closed':'Live'},U)).then(function(){go('mine')});
else if(d.x){Q.splice(+d.x,1);draw()}
else if(b.id=='aq'){Q.push({t:'',y:'single',o:''});draw()}
else if(b.id=='pub')publish();
else if(d.star){var c=b.closest('[data-q]');c.dataset.val=d.star;[].forEach.call(c.querySelectorAll('[data-star]'),function(x){x.classList.toggle('on',+x.dataset.star<=+d.star)})}};
V.oninput=function(e){var t=e.target;if(t.id&&t.id in P)P[t.id]=t.value;var c=t.closest('[data-i]');if(c&&t.dataset.k)Q[c.dataset.i][t.dataset.k]=t.value};
V.onchange=function(e){var t=e.target;if(t.id=='pv')P.pv=t.value;if(t.dataset.k=='y'){Q[t.closest('[data-i]').dataset.i].y=t.value;draw()}};
var dh=0,skip=0;
function tg(el,on){el.classList.toggle('on',on);var any=$('#left').classList.contains('on')||$('#right').classList.contains('on');$('#scrim').classList.toggle('on',any);if(on&&!dh){history.pushState({d:1},'');dh=1}else if(!any)dh=0}
function closeD(){var had=dh;tg($('#left'),false);tg($('#right'),false);if(had){skip=1;history.back()}}
addEventListener('popstate',function(){if(skip){skip=0;return}if(dh){dh=0;tg($('#left'),false);tg($('#right'),false)}});
$('#menuBtn').onclick=function(){tg($('#right'),false);tg($('#left'),true)};
$('#dotsBtn').onclick=function(){tg($('#left'),false);tg($('#right'),true)};
$('#scrim').onclick=closeD;
$('#left').onclick=function(e){var b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-close'))closeD();else tg($('#left'),false)};
function page(title,html){var p=document.createElement('div');p.className='page';p.innerHTML='<div class="bar"><button class="ib back" aria-label="Back">'+ic('back')+'</button><h1>'+title+'</h1><span style="width:48px"></span></div><div class="body">'+html+'</div>';document.body.appendChild(p);history.pushState({vp:1},'');
var c=function(){removeEventListener('popstate',c);p.classList.add('vo');setTimeout(function(){p.remove()},350);tg($('#right'),true)};addEventListener('popstate',c);$('.back',p).onclick=function(){history.back()};return p}
function todo(){var L=[];try{L=JSON.parse(localStorage.getItem('vp_todo'))||[]}catch(e){}
var p=page('To-Do List','<div class="row" style="flex-wrap:nowrap;gap:8px"><input id="ti" placeholder="Add a task"><button class="btn pri" id="ta" style="margin:0" aria-label="Add task">'+ic('add')+'</button></div><div id="tl"></div>');
function sv(){localStorage.setItem('vp_todo',JSON.stringify(L));$('#tl',p).innerHTML=L.map(function(t,i){return'<div class="opt"><input type="checkbox" data-c="'+i+'"'+(t.d?' checked':'')+'><span style="'+(t.d?'text-decoration:line-through;color:var(--t2)':'')+'">'+esc(t.t)+'</span><button class="ib" data-d="'+i+'" style="color:var(--er)" aria-label="Delete">'+ic('del')+'</button></div>'}).join('')||'<p class="mut" style="margin-top:16px">No tasks yet. Add your first one above.</p>'}
function add(){var i=$('#ti',p),v=i.value.trim();if(v){L.push({t:v,d:0});i.value='';sv()}}
$('#ta',p).onclick=add;$('#ti',p).onkeydown=function(e){if(e.key=='Enter')add()};
p.onclick=function(e){var b=e.target.closest('[data-d]');if(b){L.splice(+b.dataset.d,1);sv()}};
p.onchange=function(e){var c=e.target.dataset.c;if(c!=null){L[+c].d=e.target.checked?1:0;sv()}};sv()}
$('#right').onclick=function(e){var b=e.target.closest('button');if(!b)return;var a=b.dataset.a;
if(b.hasAttribute('data-close'))closeD();
else if(a=='todo'){tg($('#right'),false);todo()}
else if(a=='install'){tg($('#right'),false);if(dp){dp.prompt();dp=null}else if(matchMedia('(display-mode:standalone)').matches)dlg('Already installed','Vision Poll is installed on this phone.');else dlg('Install Vision Poll','Open the Chrome menu and tap <b>Add to Home screen</b> or <b>Install app</b>.')}
else if(a=='share'){tg($('#right'),false);if(navigator.share)navigator.share({title:'Vision Poll',text:'Create, share and vote on polls with Vision Poll.',url:BASE}).catch(function(){});else if(navigator.clipboard)navigator.clipboard.writeText(BASE).then(function(){dlg('Link copied','The app link is ready to paste:<br><b>'+esc(BASE)+'</b>')});else dlg('Share Vision Poll','Copy this link:<br><b>'+esc(BASE)+'</b>')}};
addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e});
function theme(d){document.documentElement.dataset.theme=d?'dark':'';$('#dk').checked=d;localStorage.setItem('vp_theme',d?1:0)}
function fsz(n){document.documentElement.style.setProperty('--fs',n+'px');$('#fs').value=n;$('#fv').textContent=n+'px';localStorage.setItem('vp_fs',n)}
$('#dk').onchange=function(){theme(this.checked)};$('#fs').oninput=function(){fsz(this.value)};
theme(localStorage.getItem('vp_theme')=='1');fsz(Math.min(22,Math.max(19,+localStorage.getItem('vp_fs')||19)));
function route(){var m=(location.pathname+location.hash).match(/\/p\/([A-Za-z0-9_-]+)/);m?go('vote',m[1]):go('home')}
var r=new URLSearchParams(location.search).get('r');if(r)history.replaceState(null,'',BASE+r.replace(/^\//,''));
addEventListener('hashchange',route);route();
if('serviceWorker' in navigator)navigator.serviceWorker.register(BASE+'sw.js').catch(function(){});
})();
