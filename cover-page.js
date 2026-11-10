(function(){
if(sessionStorage.getItem('vcv')||/\/p\/[A-Za-z0-9_-]+/.test(location.pathname+location.hash+location.search))return;
var s=document.createElement('style');
s.textContent='.vcv{position:fixed;inset:0;width:100dvw;height:100dvh;z-index:90;background:linear-gradient(160deg,#1877F2,#0A4BB0);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px;font:19px/1.5 Roboto,system-ui,sans-serif;transition:opacity .4s}.vcv img{width:120px;height:120px;border-radius:50%;background:#ffffff33;object-fit:cover;margin-bottom:24px}.vcv h1{font-size:2rem;font-weight:700;margin-bottom:8px}.vcv p{font-size:1.1rem;margin-bottom:40px}.vcv button{min-height:56px;padding:0 40px;border:0;border-radius:28px;background:#fff;color:#1877F2;font:inherit;font-weight:600}';
document.head.appendChild(s);
var d=document.createElement('div');d.className='vcv';
d.innerHTML='<img src="https://YOUR-HOSTED-URL/icon-192.png" alt="Vision Poll logo"><h1>Vision Poll</h1><p>Ask. Vote. Connect with people across the world.</p><button>Get Started</button>';
d.querySelector('button').onclick=function(){sessionStorage.setItem('vcv','1');d.style.opacity=0;setTimeout(function(){d.remove()},400)};
document.body.appendChild(d);
})();
