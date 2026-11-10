var C='vision-poll-v2',F=['./','index.html','styles.css','app.js','computer-block.js','cover-page.js','more.js','poll.js','api.js','manifest.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(f){return c.add(f).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!=C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!='GET'||new URL(r.url).origin!=location.origin)return;
if(r.mode=='navigate'){e.respondWith(fetch(r).then(function(x){return x.status==404?caches.match('index.html'):x}).catch(function(){return caches.match('index.html')}));return}
e.respondWith(fetch(r).then(function(x){var y=x.clone();caches.open(C).then(function(c){c.put(r,y)});return x}).catch(function(){return caches.match(r)}))});
