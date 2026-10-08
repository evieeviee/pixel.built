(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage=document.getElementById('v5Stage');
  const browser=document.getElementById('v5Browser');
  const body=document.getElementById('v5BrowserBody');
  const title=document.getElementById('v5PreviewTitle');
  const text=document.getElementById('v5PreviewText');
  const eyebrow=document.getElementById('v5Eyebrow');
  const cta=document.getElementById('v5PreviewCta');
  const status=document.getElementById('v5Status');
  const controls=[...document.querySelectorAll('.v5-controls button')];
  const modes={
    trust:{eyebrow:'TRUST-FIRST DESIGN',title:'Look established.<br>Feel unforgettable.',text:'A premium digital presence that makes the value behind your business easier to see.',cta:'Start a Conversation',bg:'#f3ede3',ink:'#19140f'},
    leads:{eyebrow:'CONVERSION-FIRST DESIGN',title:'Make the next step<br>feel obvious.',text:'Focused messaging and clear action points help the right visitors become real enquiries.',cta:'Get In Touch',bg:'#f7f3eb',ink:'#17120d'},
    sell:{eyebrow:'COMMERCE-FIRST DESIGN',title:'Make buying<br>feel effortless.',text:'Clear products, confident presentation and a smoother path from interest to checkout.',cta:'Shop the Collection',bg:'#efe9de',ink:'#17120d'}
  };
  function setMode(key){
    const d=modes[key]; if(!d) return;
    controls.forEach(b=>b.classList.toggle('active',b.dataset.mode===key));
    if(!reduced && browser?.animate) browser.animate([{opacity:.72,transform:'translateY(5px) scale(.992)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.2,.8,.2,1)'});
    status.textContent='BUILDING';
    setTimeout(()=>{
      eyebrow.textContent=d.eyebrow; title.innerHTML=d.title; text.textContent=d.text; cta.textContent=d.cta; body.style.background=d.bg; body.style.color=d.ink; status.textContent='READY';
    },110);
  }
  controls.forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
  if(stage&&browser&&!reduced&&matchMedia('(hover:hover) and (pointer:fine)').matches){
    stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;browser.style.transform=`rotateY(${x*7}deg) rotateX(${-y*6}deg) translate3d(${x*4}px,${y*3}px,0)`});
    stage.addEventListener('pointerleave',()=>browser.style.transform='');
  }

  const intentData={
    leads:['Conversion-focused website','Clear messaging, stronger calls-to-action and a simple path that makes the next step obvious.'],
    trust:['Credibility-first website','Premium presentation, stronger hierarchy and reassuring details that help your business feel established immediately.'],
    clarity:['Clarity-first website','A simpler structure that explains what you do, who it is for and why a customer should choose you.'],
    sell:['Commerce-focused website','A cleaner product journey that helps customers understand, trust and buy with less friction.']
  };
  const intentButtons=[...document.querySelectorAll('[data-intent]')],it=document.getElementById('intentTitle'),ip=document.getElementById('intentText'),result=document.querySelector('.v5-intent-result');
  intentButtons.forEach(b=>b.addEventListener('click',()=>{intentButtons.forEach(x=>x.classList.remove('active'));b.classList.add('active');const d=intentData[b.dataset.intent];if(result&&!reduced)result.animate([{opacity:.25,transform:'translateY(7px)'},{opacity:1,transform:'none'}],{duration:300});it.textContent=d[0];ip.textContent=d[1]}));

  const canvas=document.getElementById('v5Field');
  if(canvas && !reduced){
    const ctx=canvas.getContext('2d'); let w=0,h=0,dpr=Math.min(2,devicePixelRatio||1),mx=.72,my=.28,raf=0;
    const pts=Array.from({length:34},(_,i)=>({x:Math.random(),y:Math.random(),s:.4+Math.random()*1.2,p:Math.random()*Math.PI*2}));
    function resize(){const r=canvas.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
    function draw(t){ctx.clearRect(0,0,w,h);const px=mx*w,py=my*h;for(let i=0;i<pts.length;i++){const a=pts[i],ax=a.x*w+Math.sin(t*.0003+a.p)*9,ay=a.y*h+Math.cos(t*.00025+a.p)*8;ctx.beginPath();ctx.arc(ax,ay,a.s,0,Math.PI*2);ctx.fillStyle='rgba(226,189,125,.34)';ctx.fill();for(let j=i+1;j<pts.length;j++){const b=pts[j],bx=b.x*w,by=b.y*h,dx=ax-bx,dy=ay-by,dist=Math.hypot(dx,dy);if(dist<150){ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.strokeStyle=`rgba(201,150,77,${(1-dist/150)*.08})`;ctx.stroke()}}const dm=Math.hypot(ax-px,ay-py);if(dm<180){ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(px,py);ctx.strokeStyle=`rgba(241,207,142,${(1-dm/180)*.15})`;ctx.stroke()}}
      raf=requestAnimationFrame(draw)}
    addEventListener('resize',resize);addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();mx=(e.clientX-r.left)/Math.max(1,r.width);my=(e.clientY-r.top)/Math.max(1,r.height)},{passive:true});resize();raf=requestAnimationFrame(draw);
    document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf)}else raf=requestAnimationFrame(draw)})
  }
})();

// V7 interactive playground
(()=>{
  const buttons=[...document.querySelectorAll('[data-v7mode]')], demo=document.getElementById('v7Demo'), stage=document.getElementById('v7Stage'), brand=document.getElementById('v7Brand'), hint=document.getElementById('v7Hint');
  if(!buttons.length||!demo)return;
  const nav=(name,right)=>`<div class="v7-site-nav"><strong>${name}</strong><span>STUDIO / DIGITAL EXPERIENCE</span><button type="button">${right}</button></div>`;
  const views={
    leads:()=>`${nav('NORTH /','CONTACT')}<div class="v7-leads"><div class="v7-lead-copy"><span class="v7-label">Strategic growth advisory</span><h3>Move forward<br><em>with clarity.</em></h3><p>A focused digital presence designed to turn interest into meaningful conversations.</p></div><div class="v7-book"><div class="v7-book-top"><b>Book a consultation</b><span>● AVAILABLE</span></div><div class="v7-date">October 14</div><p>Select a time that works for you.</p><div class="v7-times"><button type="button">10:00 AM</button><button type="button">11:30 AM</button><button type="button">2:00 PM</button><button type="button">3:30 PM</button></div><button class="v7-confirm" type="button" disabled>SELECT A TIME</button></div></div>`,
    trust:()=>`${nav('APEX /','ABOUT')}<div class="v7-trust"><div class="v7-trust-copy"><span class="v7-label">Established through experience</span><h3>Credibility you can<br><em>feel immediately.</em></h3><p>Strong proof, considered hierarchy and confident presentation make expertise easier to trust.</p></div><div class="v7-metrics"><div class="v7-metric"><b data-count="12">0+</b><span>YEARS EXPERIENCE</span></div><div class="v7-metric"><b data-count="180">0+</b><span>PROJECTS DELIVERED</span></div><div class="v7-metric"><b data-count="96">0%</b><span>CLIENT RETENTION</span></div></div><div class="v7-quote"><q id="v7Quote">They made a complex business feel simple, confident and established.</q><small id="v7QuoteBy">— OPERATIONS DIRECTOR</small></div></div>`,
    clarity:()=>`${nav('FORM /','SERVICES')}<div class="v7-services"><div class="v7-service-menu"><small>SELECT A CAPABILITY</small><button class="active" type="button" data-service="strategy">Brand Strategy <span>01</span></button><button type="button" data-service="web">Web Design <span>02</span></button><button type="button" data-service="dev">Development <span>03</span></button><button type="button" data-service="growth">Growth Systems <span>04</span></button></div><div class="v7-service-detail"><span class="v7-label" id="v7ServiceLabel">01 / BRAND STRATEGY</span><h3 id="v7ServiceTitle">Make the value<br>easy to understand.</h3><p id="v7ServiceText">Positioning, hierarchy and messaging shaped into a digital direction people can understand quickly.</p><div class="v7-tech-tags" id="v7Tags"><span>POSITIONING</span><span>MESSAGING</span><span>USER FLOW</span></div></div></div>`,
    sell:()=>`${nav('NØVA','BAG')}<div class="v7-shop"><div class="v7-shop-copy"><span class="v7-label">NØVA / OBJECT 01</span><h3>Designed to be<br><em>desired.</em></h3><p>A tactile commerce experience that makes discovering, choosing and buying feel effortless.</p><div class="v7-shop-actions"><div class="v7-variants"><button class="active" type="button" aria-label="Black"></button><button type="button" aria-label="Sand"></button><button type="button" aria-label="Stone"></button></div><button class="v7-add" type="button">ADD TO BAG · $128</button></div></div><div class="v7-product-zone"><span class="v7-bag">BAG <b>0</b></span><div class="v7-product-orbit"></div><div class="v7-product"><small>OBJECT / 01</small></div></div></div><aside class="v7-cart" aria-label="Shopping bag"><div class="v7-cart-top"><b>Your bag</b><button type="button" class="v7-cart-close" aria-label="Close bag">×</button></div><div class="v7-cart-item"><strong>NØVA / OBJECT 01</strong><span>$128</span></div><div class="v7-cart-total"><span>Subtotal</span><span>$128</span></div><button class="v7-checkout" type="button">CONTINUE TO CHECKOUT</button></aside>`
  };
  const meta={leads:['NORTH / ADVISORY','Choose a time to see the booking flow'],trust:['APEX / PARTNERS','Watch credibility build in real time'],clarity:['FORM / STUDIO','Tap a service to change the experience'],sell:['NØVA / COMMERCE','Choose a finish, then add it to the bag']};
  function wire(mode){
    if(mode==='leads'){
      const times=[...demo.querySelectorAll('.v7-times button')], confirm=demo.querySelector('.v7-confirm');
      times.forEach(b=>b.addEventListener('click',()=>{times.forEach(x=>x.classList.remove('selected'));b.classList.add('selected');confirm.disabled=false;confirm.classList.add('ready');confirm.textContent='BOOK '+b.textContent}));
      confirm.addEventListener('click',()=>{if(!confirm.disabled){confirm.textContent='TIME RESERVED ✓';confirm.classList.remove('ready')}});
    }
    if(mode==='trust'){
      demo.querySelectorAll('[data-count]').forEach(el=>{const target=+el.dataset.count,suffix=el.textContent.includes('%')?'%':'+';let n=0;const step=Math.max(1,Math.ceil(target/34));const t=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n+suffix;if(n>=target)clearInterval(t)},28)});
      const quotes=[['They made a complex business feel simple, confident and established.','— OPERATIONS DIRECTOR'],['The experience finally reflects the quality of the company behind it.','— MANAGING PARTNER'],['Clear, considered and immediately more credible.','— FOUNDER']];let qi=0;const q=demo.querySelector('#v7Quote'),by=demo.querySelector('#v7QuoteBy');
      const timer=setInterval(()=>{if(!q||!q.isConnected){clearInterval(timer);return}qi=(qi+1)%quotes.length;q.animate([{opacity:.2,transform:'translateY(5px)'},{opacity:1,transform:'none'}],{duration:350});q.textContent=quotes[qi][0];by.textContent=quotes[qi][1]},3200);
    }
    if(mode==='clarity'){
      const info={strategy:['01 / BRAND STRATEGY','Make the value<br>easy to understand.','Positioning, hierarchy and messaging shaped into a digital direction people can understand quickly.',['POSITIONING','MESSAGING','USER FLOW']],web:['02 / WEB DESIGN','Turn attention<br>into action.','A distinctive interface built around clarity, trust and the moments that move people forward.',['UI SYSTEM','MOTION','RESPONSIVE']],dev:['03 / DEVELOPMENT','Make every detail<br>feel effortless.','Fast, responsive implementation where interaction supports the experience instead of distracting from it.',['FRONT-END','PERFORMANCE','CMS']],growth:['04 / GROWTH SYSTEMS','Build for what<br>comes next.','Conversion paths, measurement and scalable components designed to keep improving after launch.',['CONVERSION','ANALYTICS','SCALE']]};
      const bs=[...demo.querySelectorAll('[data-service]')];bs.forEach(b=>b.addEventListener('click',()=>{bs.forEach(x=>x.classList.remove('active'));b.classList.add('active');const d=info[b.dataset.service];demo.querySelector('#v7ServiceLabel').textContent=d[0];demo.querySelector('#v7ServiceTitle').innerHTML=d[1];demo.querySelector('#v7ServiceText').textContent=d[2];demo.querySelector('#v7Tags').innerHTML=d[3].map(x=>`<span>${x}</span>`).join('');demo.querySelector('.v7-service-detail').animate([{opacity:.35,transform:'translateX(10px)'},{opacity:1,transform:'none'}],{duration:380,easing:'ease-out'})}));
    }
    if(mode==='sell'){
      const vars=[...demo.querySelectorAll('.v7-variants button')], product=demo.querySelector('.v7-product'),add=demo.querySelector('.v7-add'),bag=demo.querySelector('.v7-bag'),cart=demo.querySelector('.v7-cart');
      vars.forEach((b,i)=>b.addEventListener('click',()=>{vars.forEach(x=>x.classList.remove('active'));b.classList.add('active');product.style.background=i===0?'linear-gradient(145deg,#2b2927,#111)':i===1?'linear-gradient(145deg,#b49a78,#5e5142)':'linear-gradient(145deg,#e2ddd4,#8f8980)'}));
      const zone=demo.querySelector('.v7-product-zone');zone.addEventListener('pointermove',e=>{if(matchMedia('(hover:hover)').matches){const r=zone.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;product.style.transform=`rotateY(${x*14}deg) rotateX(${-y*10}deg) translateY(-4px)`}});zone.addEventListener('pointerleave',()=>product.style.transform='');
      add.addEventListener('click',()=>{bag.querySelector('b').textContent='1';bag.classList.remove('bump');void bag.offsetWidth;bag.classList.add('bump');product.animate([{transform:'scale(1)'},{transform:'scale(.9) translate(80px,-30px)'},{transform:'scale(1)'}],{duration:520,easing:'ease-in-out'});setTimeout(()=>cart.classList.add('open'),360)});
      demo.querySelector('.v7-cart-close').addEventListener('click',()=>cart.classList.remove('open'));demo.querySelector('.v7-checkout').addEventListener('click',()=>{demo.querySelector('.v7-checkout').textContent='CHECKOUT EXPERIENCE ✓'});
    }
  }
  function setMode(mode){buttons.forEach(b=>{const on=b.dataset.v7mode===mode;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on))});stage.dataset.mode=mode;brand.textContent=meta[mode][0];hint.textContent=meta[mode][1];demo.classList.add('switching');demo.innerHTML=views[mode]();wire(mode);setTimeout(()=>demo.classList.remove('switching'),450)}
  buttons.forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.v7mode)));setMode('leads');
})();
