(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  // First-home loader only.
  const loader=document.getElementById('homeLoader');
  if(loader){
    let seen=false;try{seen=sessionStorage.getItem('pixelbuilt-home-seen')==='1'}catch(e){}
    if(seen) loader.remove();
    else {try{sessionStorage.setItem('pixelbuilt-home-seen','1')}catch(e){} setTimeout(()=>{loader.classList.add('hide');setTimeout(()=>loader.remove(),520)},900)}
  }

  // Entrance and section reveals.
  const reveals=[...document.querySelectorAll('.motion-reveal,.motion-section')];
  if('IntersectionObserver' in window&&!reduced){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
    reveals.forEach((el,i)=>{el.style.transitionDelay=(i<5?i*70:0)+'ms';io.observe(el)});
  }else reveals.forEach(el=>el.classList.add('in'));

  // Kinetic hero: cursor depth on desktop, gentle auto drift on touch.
  const stage=document.getElementById('kineticStage');
  const planes=stage?[...stage.querySelectorAll('[data-depth]')]:[];
  const words=stage?[...stage.querySelectorAll('[data-parallax]')]:[];
  if(stage&&!reduced){
    if(matchMedia('(hover:hover) and (pointer:fine)').matches){
      stage.addEventListener('pointermove',e=>{
        const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        planes.forEach((el,i)=>{const d=+el.dataset.depth||20;const base=i===0?-8:i===1?8:-2;el.style.transform=`translate3d(${x*d}px,${y*d}px,${d/4}px) rotate(${base+x*4}deg) rotateX(${-y*5}deg) rotateY(${x*6}deg)`});
        words.forEach(el=>{const p=+el.dataset.parallax||0;el.style.transform=`translate3d(${x*220*p}px,${y*180*p}px,0)`});
      });
      stage.addEventListener('pointerleave',()=>{planes.forEach(el=>el.style.transform='');words.forEach(el=>el.style.transform='')});
    }else{
      let t=0;const drift=()=>{if(!stage.isConnected)return;t+=.008;planes.forEach((el,i)=>{const base=i===0?-8:i===1?8:-2;el.style.transform=`translate3d(${Math.sin(t+i)*4}px,${Math.cos(t*.9+i)*5}px,0) rotate(${base}deg)`});requestAnimationFrame(drift)};requestAnimationFrame(drift);
    }
  }

  // Interactive goal section.
  const goalData={
    enquiries:{no:'01',k:'CONVERSION-FOCUSED',title:'Turn interest<br>into action.',text:'A clear journey that makes the next step obvious and easy.',cta:'Start a conversation',foot:'ENQUIRY FLOW / ACTIVE'},
    trust:{no:'02',k:'TRUST-FIRST',title:'Look established.<br>Feel credible.',text:'Strong hierarchy and considered proof make confidence happen faster.',cta:'Build more trust',foot:'CREDIBILITY / ACTIVE'},
    clarity:{no:'03',k:'CLARITY-FIRST',title:'Make your value<br>easy to get.',text:'Structure complex services into something people understand in seconds.',cta:'Explain it clearly',foot:'CONTENT SYSTEM / ACTIVE'},
    sell:{no:'04',k:'COMMERCE-READY',title:'Make buying<br>feel effortless.',text:'A cleaner path from discovery to decision, designed around confidence.',cta:'Build a sales journey',foot:'COMMERCE FLOW / ACTIVE'}
  };
  const goalButtons=[...document.querySelectorAll('[data-goal]')],visual=document.getElementById('goalVisual');
  function setGoal(key){const d=goalData[key];if(!d||!visual)return;goalButtons.forEach(b=>{const on=b.dataset.goal===key;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on))});visual.dataset.goalState=key;const map={goalNo:d.no,goalKicker:d.k,goalTitle:d.title,goalText:d.text,goalFoot:d.foot};Object.entries(map).forEach(([id,val])=>{const el=document.getElementById(id);if(el){if(id==='goalTitle')el.innerHTML=val;else el.textContent=val}});const c=document.getElementById('goalCta');if(c)c.innerHTML=d.cta+' <b>↗</b>';if(!reduced)visual.animate([{opacity:.72,transform:'translateY(5px)'},{opacity:1,transform:'none'}],{duration:420,easing:'cubic-bezier(.2,.75,.2,1)'})}
  goalButtons.forEach(b=>{b.addEventListener('click',()=>setGoal(b.dataset.goal));if(matchMedia('(hover:hover) and (pointer:fine)').matches)b.addEventListener('mouseenter',()=>setGoal(b.dataset.goal))});

  // Process rows: click/tap focus + scroll focus.
  const steps=[...document.querySelectorAll('.v8-process-track article')],meter=document.querySelector('.v8-process-meter i');
  const setStep=i=>{steps.forEach((x,n)=>x.classList.toggle('active',n===i));if(meter)meter.style.width=((i+1)/steps.length*100)+'%'};
  steps.forEach((el,i)=>el.addEventListener('click',()=>setStep(i)));
  if('IntersectionObserver' in window&&steps.length){const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setStep(steps.indexOf(e.target))}),{threshold:.6});steps.forEach(s=>sio.observe(s))}

  // Package accordions.
  document.querySelectorAll('.v8-package-toggle').forEach(btn=>btn.addEventListener('click',()=>{const open=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!open));btn.closest('.v8-package')?.querySelector('.v8-package-more')?.classList.toggle('open',!open)}));

  // Lightweight tilt on fine pointers only.
  if(!reduced&&matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.querySelectorAll('.tilt-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1000px) rotateX(${-y*2.5}deg) rotateY(${x*3.5}deg) translateY(-2px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
  }
})();
