(function(){
var BASE=new URL('./',document.currentScript.src).href;
var s=document.createElement('style');
s.textContent='.vpd{position:fixed;inset:0;width:100dvw;height:100dvh;z-index:98;background:#000a;display:grid;place-items:center;padding:24px;font:19px/1.5 Roboto,system-ui,sans-serif}.vpd div{width:100%;background:#fff;color:#1A1D24;border-radius:28px;padding:24px}.vpd h2{font-size:1.2rem;margin-bottom:12px}.vpd input{width:100%;min-height:52px;padding:0 14px;margin:6px 0 12px;font:inherit;border:1px solid #C5CEDD;border-radius:14px;background:#F5F8FF;color:#1A1D24}.vpd label{color:#4B5565;display:block}.vpd .r{display:flex;flex-wrap:wrap;gap:8px}.vpd button,.vpd a{min-height:48px;padding:0 20px;border:0;border-radius:24px;font:inherit;font-weight:500;background:#E8EEFA;color:#1A1D24;display:inline-flex;align-items:center;text-decoration:none}.vpd .p{background:#1877F2;color:#fff}.vpd .w{background:#25D366;color:#fff}';
document.head.appendChild(s);
function open(id,title){var u=BASE+'p/'+id,f=BASE+'#/p/'+id,t='Vote on this poll: '+(title||'Vision Poll');
var d=document.createElement('div');d.className='vpd';
d.innerHTML='<div><h2>Share this poll</h2><label>Poll link<input readonly value="'+u+'"></label><label>Backup link (if the main link fails)<input readonly value="'+f+'"></label><div class="r"><button class="p" id="vc">Copy link</button><a class="w" target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent(t+' '+u)+'">WhatsApp</a><a class="p" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(u)+'">Facebook</a>'+(navigator.share?'<button id="vn">More</button>':'')+'<button id="vx">Close</button></div></div>';
document.body.appendChild(d);
d.querySelector('#vx').onclick=function(){d.remove()};
d.querySelector('#vc').onclick=function(){var b=this;(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){b.textContent='Copied'}).catch(function(){d.querySelector('input').select();b.textContent='Select and copy'})};
var n=d.querySelector('#vn');if(n)n.onclick=function(){navigator.share({title:title,text:t,url:u}).catch(function(){})};}
document.addEventListener('click',function(e){var b=e.target.closest('[data-share-poll]');if(b)open(b.dataset.sharePoll,b.dataset.title)});
})();
