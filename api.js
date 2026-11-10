(function(){
/* Admin shortcut: tap the app title 5 times to set the backend (Google Apps Script) URL. */
var n=0,t=0,s=document.createElement('style');
s.textContent='.vad{position:fixed;inset:0;width:100dvw;height:100dvh;z-index:97;background:#000a;display:grid;place-items:center;padding:24px;font:19px/1.5 Roboto,system-ui,sans-serif}.vad div{width:100%;background:#fff;color:#1A1D24;border-radius:28px;padding:24px}.vad h2{font-size:1.2rem;margin-bottom:8px}.vad input{width:100%;min-height:52px;padding:0 14px;margin:12px 0;font:inherit;border:1px solid #C5CEDD;border-radius:14px;background:#F5F8FF;color:#1A1D24}.vad button{min-height:48px;padding:0 22px;margin-right:8px;border:0;border-radius:24px;font:inherit;font-weight:500;background:#E8EEFA;color:#1A1D24}.vad .p{background:#1877F2;color:#fff}';
document.head.appendChild(s);
document.addEventListener('click',function(e){var h=e.target.closest('header h1');if(!h)return;n++;clearTimeout(t);t=setTimeout(function(){n=0},1500);if(n<5)return;n=0;
var d=document.createElement('div');d.className='vad';
d.innerHTML='<div><h2>Backend connection</h2><p>Paste your Google Apps Script Web App URL.</p><input id="vu" placeholder="https://script.google.com/macros/s/.../exec"><button class="p" id="vs">Save</button><button id="vr">Reset</button><button id="vx">Cancel</button></div>';
document.body.appendChild(d);var i=d.querySelector('#vu');i.value=localStorage.getItem('vp_api')||'';
d.querySelector('#vx').onclick=function(){d.remove()};
d.querySelector('#vr').onclick=function(){localStorage.removeItem('vp_api');location.reload()};
d.querySelector('#vs').onclick=function(){var v=i.value.trim();if(!/^https:\/\/script\.google\.com\//.test(v)){i.style.borderColor='#BA1A1A';return}localStorage.setItem('vp_api',v);location.reload()}});
})();
