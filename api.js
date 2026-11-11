/* Vision Poll - GAS backend endpoint and API functions. */
(function(){
'use strict';
/* PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BETWEEN THE QUOTES BELOW */
var URL_='PASTE_YOUR_GAS_WEB_APP_URL_HERE';
window.VPAPI={
call:function(a,d){d=d||{};d.action=a;
return fetch(URL_,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(d)}).then(function(r){return r.json()}).catch(function(){return{ok:false,msg:'Could not reach the server. Check your connection.'}})},
geo:function(){return fetch('https://ipapi.co/json/').then(function(r){return r.json()}).then(function(j){return{city:j.city||'',region:j.region||'',country:j.country_name||'',isp:j.org||'',tz:j.timezone||''}}).catch(function(){return{}})}
};
})();
