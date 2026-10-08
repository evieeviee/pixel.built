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

// V6 clean goal selector + live preview
(()=>{
  const buttons=[...document.querySelectorAll('[data-v6goal]')];
  const live=document.getElementById('v6Live');
  if(!buttons.length||!live)return;
  const data={
    leads:{status:'ENQUIRY FOCUSED',eyebrow:'TURN VISITORS INTO CONVERSATIONS',title:'Make the next step<br><em>obvious.</em>',text:'Clear value, focused calls-to-action and a frictionless path from interest to enquiry.',cta:'Start a Conversation',card:'Enquire',path:'M55 210 C150 45 320 245 465 72'},
    trust:{status:'CREDIBILITY FOCUSED',eyebrow:'LOOK ESTABLISHED FROM THE FIRST CLICK',title:'Earn trust<br><em>before you speak.</em>',text:'Premium visual direction, stronger proof and a polished experience that makes your business feel credible.',cta:'Discover the Brand',card:'Trust',path:'M50 205 C145 210 190 55 290 80 C380 102 405 175 470 65'},
    clarity:{status:'CLARITY FOCUSED',eyebrow:'MAKE YOUR VALUE EASY TO UNDERSTAND',title:'Say more<br><em>with less.</em>',text:'A sharper content hierarchy helps people understand what you do, why it matters and where to go next.',cta:'Explore Services',card:'Understand',path:'M48 195 C125 70 200 72 270 150 C340 230 400 210 470 82'},
    sell:{status:'COMMERCE FOCUSED',eyebrow:'TURN ATTENTION INTO ACTION',title:'Make buying feel<br><em>effortless.</em>',text:'A focused shopping journey that keeps products clear, decisions simple and checkout within easy reach.',cta:'Shop the Collection',card:'Purchase',path:'M48 215 C110 160 175 220 235 130 C300 35 390 155 470 62'}
  };
  const status=document.getElementById('v6Status'), eyebrow=document.getElementById('v6Eyebrow'), title=document.getElementById('v6Title'), text=document.getElementById('v6Text'), cta=document.getElementById('v6Cta'), card=document.getElementById('v6CardText'), path=document.getElementById('v6Path');
  const setGoal=(key)=>{const d=data[key]; if(!d)return; buttons.forEach(b=>{const on=b.dataset.v6goal===key;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on))}); live.dataset.goal=key;live.classList.remove('is-switching');void live.offsetWidth;live.classList.add('is-switching');status.textContent=d.status;eyebrow.textContent=d.eyebrow;title.innerHTML=d.title;text.textContent=d.text;cta.innerHTML=d.cta+' <b>↗</b>';card.textContent=d.card;path.setAttribute('d',d.path)};
  buttons.forEach(b=>b.addEventListener('click',()=>setGoal(b.dataset.v6goal)));
  setGoal('leads');
})();
