(function(){
var ua=navigator.userAgent||'',small=Math.min(screen.width,screen.height)<700;
if(/Android/i.test(ua)&&small)return;
var s=document.createElement('style');
s.textContent='.vcb{position:fixed;inset:0;width:100dvw;height:100dvh;z-index:2147483647;background:#1877F2;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px;font:19px/1.5 Roboto,system-ui,sans-serif}.vcb svg{width:96px;height:96px;fill:#fff;margin-bottom:24px}.vcb h1{font-size:1.5rem;margin-bottom:12px}.vcb p{font-size:1rem}';
document.head.appendChild(s);
var d=document.createElement('div');d.className='vcb';
d.innerHTML='<svg viewBox="0 0 24 24"><path d="M17 1H7a2 2 0 00-2 2v18a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2zm0 18H7V5h10v14z"/></svg><h1>Android phones only</h1><p>Vision Poll is built for Android phones. Please open this link on your Android phone to continue.</p>';
document.body.appendChild(d);document.documentElement.style.overflow='hidden';
})();
