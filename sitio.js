/* Lukychill · cosas compartidas por todas las páginas:
   1) Botón flotante "¿Tenés dudas?" con mini formulario de contacto (llega al Google Form "Consultas - Lukychill").
   2) Medición de visitas (Google Analytics y píxel de Meta): se activan solas al completar los IDs. */
(function(){
  'use strict';
  var GA_ID = 'G-0G12FMTX84';
  var META_PIXEL = ''; // ej. '123456789012345'

  var FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSdwqnwxtazSo2gX3Osrmec153HugQfeaCkZHfUoXNYrTL3XHQ/formResponse';
  var E = {motivo:1648442326, nombre:1215366356, mail:1371425894, mensaje:38499804};
  var MOTIVOS = ['Consulta','Soporte de mi sistema','Arrepentimiento de compra','Mis datos personales'];

  /* ---------- Medición ---------- */
  function track(ev, params){
    try{ if(window.gtag) window.gtag('event', ev, params||{}); }catch(e){}
    try{ if(window.fbq){ var map={compra:'Purchase',inicio_pago:'InitiateCheckout',diagnostico:'Lead',contacto:'Contact'}; window.fbq(map[ev]?'track':'trackCustom', map[ev]||ev, params||{}); } }catch(e){}
  }
  window.lkTrack = track;
  if(GA_ID){
    var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(GA_ID);document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config',GA_ID,{anonymize_ip:true});
  }
  if(META_PIXEL){
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init',META_PIXEL);window.fbq('track','PageView');
  }

  /* ---------- Contacto ---------- */
  var css = ''+
  '.lk-fab{position:fixed;right:16px;bottom:16px;z-index:60;display:inline-flex;align-items:center;gap:8px;padding:12px 18px;border-radius:999px;border:1px solid var(--line,#2c2c35);background:var(--surface,#1a1a20);color:var(--ink,#f4f2ec);font:600 .95rem Inter,system-ui,sans-serif;cursor:pointer;box-shadow:0 12px 32px rgba(0,0,0,.28);transition:transform .15s}'+
  '.lk-fab:hover{transform:translateY(-2px)}'+
  '.lk-fab svg{width:18px;height:18px;fill:none;stroke:var(--accent,#ff6a2b);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}'+
  '@media (max-width:760px){.lk-fab{bottom:84px;padding:12px}.lk-fab span{display:none}}'+
  '.lk-ov{position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.55);display:flex;align-items:flex-end;justify-content:center;padding:16px}'+
  '@media (min-width:600px){.lk-ov{align-items:center}}'+
  '.lk-ov[hidden]{display:none}'+
  '.lk-box{position:relative;width:100%;max-width:440px;max-height:calc(100vh - 32px);overflow:auto;background:var(--surface,#1a1a20);color:var(--ink,#f4f2ec);border:1px solid var(--line,#2c2c35);border-radius:22px;padding:24px;font-family:Inter,system-ui,sans-serif;box-shadow:0 30px 80px rgba(0,0,0,.4)}'+
  '.lk-box h3{font:800 1.45rem/1.15 "Bricolage Grotesque",Inter,sans-serif;letter-spacing:-.02em;margin:0 0 6px}'+
  '.lk-box p{margin:0 0 16px;color:var(--muted,#a2a1ab);font-size:.95rem}'+
  '.lk-box label{display:block;font-weight:600;font-size:.88rem;margin:0 0 6px}'+
  '.lk-in{width:100%;padding:13px 14px;margin:0 0 12px;border:1.5px solid var(--line,#2c2c35);border-radius:12px;background:var(--bg2,#141418);color:var(--ink,#f4f2ec);font:inherit;font-size:1rem}'+
  '.lk-in:focus{outline:none;border-color:var(--accent,#ff6a2b)}'+
  'textarea.lk-in{min-height:110px;resize:vertical}'+
  '.lk-x{position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;border:0;background:transparent;color:var(--muted,#a2a1ab);font-size:1.5rem;cursor:pointer}'+
  '.lk-send{width:100%;padding:14px;border:0;border-radius:999px;background:var(--accent,#ff6a2b);color:var(--accent-ink,#14100c);font:700 1rem Inter,sans-serif;cursor:pointer}'+
  '.lk-send:disabled{opacity:.5;cursor:wait}'+
  '.lk-err{color:var(--bad,#ff5d5d);font-size:.88rem;min-height:1.1em;margin:-4px 0 10px}'+
  '.lk-ok{text-align:center;padding:10px 0}'+
  '.lk-ok .ic{width:56px;height:56px;border-radius:50%;margin:0 auto 14px;display:grid;place-items:center;background:color-mix(in srgb,var(--good,#35d07f) 16%,transparent)}'+
  '.lk-ok svg{width:26px;height:26px;fill:none;stroke:var(--good,#35d07f);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}'+
  '.lk-code{display:inline-block;font:700 1.05rem ui-monospace,monospace;letter-spacing:.04em;background:var(--bg2,#141418);border:1px dashed var(--line,#2c2c35);border-radius:10px;padding:8px 14px;margin:0 0 14px}';

  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function code(){var d=new Date(),p=function(n){return(n<10?'0':'')+n};return 'ARR-'+d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+Math.random().toString(36).slice(2,6).toUpperCase()}

  function send(motivo,nombre,mail,mensaje){
    var b=new URLSearchParams();
    b.append('entry.'+E.motivo,motivo);b.append('entry.'+E.nombre,nombre);b.append('entry.'+E.mail,mail);b.append('entry.'+E.mensaje,mensaje);
    return fetch(FORM,{method:'POST',mode:'no-cors',body:b});
  }
  window.lkEnviarContacto = send;

  function init(){
    if(document.body.hasAttribute('data-sin-contacto')) return;
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var fab=document.createElement('button');fab.type='button';fab.className='lk-fab';fab.setAttribute('aria-label','¿Tenés dudas? Escribime');
    fab.innerHTML='<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg><span>¿Tenés dudas?</span>';
    var ov=document.createElement('div');ov.className='lk-ov';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-labelledby','lk-t');
    document.body.appendChild(fab);document.body.appendChild(ov);

    function form(motivo){
      ov.innerHTML='<div class="lk-box"><button type="button" class="lk-x" aria-label="Cerrar">×</button>'+
        '<h3 id="lk-t">¿Tenés dudas?</h3><p>Escribime y te respondo por mail, normalmente en el día.</p>'+
        '<form novalidate><label for="lk-m">Motivo</label><select class="lk-in" id="lk-m">'+MOTIVOS.map(function(m){return '<option'+(m===motivo?' selected':'')+'>'+esc(m)+'</option>'}).join('')+'</select>'+
        '<label for="lk-n">Tu nombre</label><input class="lk-in" id="lk-n" autocomplete="name" maxlength="80">'+
        '<label for="lk-e">Tu mail</label><input class="lk-in" id="lk-e" type="email" autocomplete="email" maxlength="120">'+
        '<label for="lk-q">Tu consulta</label><textarea class="lk-in" id="lk-q" maxlength="2000" placeholder="Contame en qué te puedo ayudar"></textarea>'+
        '<div class="lk-err" role="alert"></div><button class="lk-send" type="submit">Enviar</button></form></div>';
      var f=ov.querySelector('form');
      f.addEventListener('submit',function(e){
        e.preventDefault();
        var m=ov.querySelector('#lk-m').value,n=ov.querySelector('#lk-n').value.trim(),em=ov.querySelector('#lk-e').value.trim(),q=ov.querySelector('#lk-q').value.trim(),er=ov.querySelector('.lk-err');
        if(!n){er.textContent='Decime tu nombre.';return}
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){er.textContent='Revisá tu mail, así te puedo responder.';return}
        if(q.length<3){er.textContent='Escribí tu consulta.';return}
        var bt=ov.querySelector('.lk-send');bt.disabled=true;bt.textContent='Enviando…';
        send(m,n,em,q).then(function(){
          track('contacto',{motivo:m});
          ov.querySelector('.lk-box').innerHTML='<button type="button" class="lk-x" aria-label="Cerrar">×</button><div class="lk-ok"><div class="ic"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg></div><h3 id="lk-t">¡Recibido!</h3><p>Te respondo a '+esc(em)+' lo antes posible.</p></div>';
        }).catch(function(){bt.disabled=false;bt.textContent='Enviar';er.textContent='No se pudo enviar. Revisá tu conexión y probá de nuevo.'});
      });
    }
    function open(motivo){form(motivo||'Consulta');ov.hidden=false;document.documentElement.style.overflow='hidden';setTimeout(function(){var i=ov.querySelector('#lk-n');i&&i.focus()},50)}
    function close(){ov.hidden=true;document.documentElement.style.overflow=''}
    window.lkContacto = open;
    fab.addEventListener('click',function(){open()});
    ov.addEventListener('click',function(e){if(e.target===ov||e.target.closest('.lk-x'))close()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!ov.hidden)close()});
    document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-contacto]');if(a){e.preventDefault();open(a.getAttribute('data-contacto'))}});
    if(location.hash==='#contacto')open();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();

  /* Código de trámite para el botón de arrepentimiento (lo usa arrepentimiento.html). */
  window.lkCodigoArrepentimiento = code;
})();
