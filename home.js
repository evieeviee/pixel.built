(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  const loader=document.getElementById('homeLoader');
  if(loader){
    let seen=false;try{seen=sessionStorage.getItem('pb-home-seen')==='1'}catch(e){}
    if(seen) loader.remove();
    else {try{sessionStorage.setItem('pb-home-seen','1')}catch(e){} setTimeout(()=>{loader.classList.add('hide');setTimeout(()=>loader.remove(),780)},900)}
  }

  const stage=document.querySelector('.hero-stage');
  const orbit=document.getElementById('heroOrbit');
  const cards=[...document.querySelectorAll('.hero-card')];
  if(stage&&orbit&&!reduced&&fine){
    stage.addEventListener('pointermove',e=>{
      const r=stage.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      orbit.style.transform=`translate3d(${x*18}px,${y*16}px,0) rotate(${x*5}deg)`;
      cards[0].style.transform=`translate3d(${x*-12}px,${y*-9}px,25px)`;
      cards[1].style.transform=`translate3d(${x*14}px,${y*10}px,40px)`;
    });
    stage.addEventListener('pointerleave',()=>{orbit.style.transform='';cards.forEach(c=>c.style.transform='')});
  }

  const stackCards=[...document.querySelectorAll('.stack-card')];
  const setActive=()=>{
    if(innerWidth<810){stackCards.forEach(c=>c.classList.remove('is-active'));return}
    const target=innerHeight*.42;
    let best=null,dist=Infinity;
    stackCards.forEach(c=>{const r=c.getBoundingClientRect();const d=Math.abs(r.top-target);if(d<dist&&r.bottom>120){dist=d;best=c}});
    stackCards.forEach(c=>c.classList.toggle('is-active',c===best));
  };
  let ticking=false;
  const scrollMotion=()=>{
    if(!ticking){requestAnimationFrame(()=>{
      if(!reduced&&innerWidth>=810){
        stackCards.forEach((c,i)=>{
          const r=c.getBoundingClientRect();
          const p=Math.max(0,Math.min(1,(92-r.top)/Math.max(1,r.height*.56)));
          c.style.transform=`scale(${1-p*.025}) translateY(${p*i*2}px)`;
          c.style.filter=`brightness(${1-p*.08})`;
        });
      } else stackCards.forEach(c=>{c.style.transform='';c.style.filter=''});
      setActive();ticking=false;
    });ticking=true}
  };
  addEventListener('scroll',scrollMotion,{passive:true});addEventListener('resize',scrollMotion);scrollMotion();

  const data={
    enquiries:{k:'CONVERSION / 01',t:'Make the next step impossible to miss.',p:'Clear hierarchy, purposeful calls-to-action and frictionless enquiry paths that turn browsing into action.',chips:['Clear CTA','Smart enquiry','Mobile-first']},
    trust:{k:'CREDIBILITY / 02',t:'Look established before you say a word.',p:'A considered visual system that helps customers feel confidence in your business faster.',chips:['Authority','Proof','Premium feel']},
    clarity:{k:'CLARITY / 03',t:'Make complex services easy to understand.',p:'Structure, hierarchy and interaction that guide visitors without overwhelming them.',chips:['Service flow','Hierarchy','Simple choices']},
    sell:{k:'COMMERCE / 04',t:'Make buying feel natural.',p:'Product journeys that reduce friction from discovery through decision and checkout.',chips:['Discovery','Decision','Checkout']}
  };
  const canvas=document.getElementById('playCanvas');
  const tabs=[...document.querySelectorAll('.play-tab')];
  let current='enquiries';
  function setState(key){
    const d=data[key];if(!d||!canvas||key===current)return;current=key;
    canvas.dataset.state=key;tabs.forEach(b=>b.classList.toggle('active',b.dataset.state===key));
    const nodes=[canvas.querySelector('.play-kicker'),canvas.querySelector('h3'),canvas.querySelector('.play-copy p')];
    if(!reduced) nodes.forEach((n,i)=>n?.animate([{opacity:.15,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:420+i*50,easing:'cubic-bezier(.22,.78,.25,1)'}));
    nodes[0].textContent=d.k;nodes[1].textContent=d.t;nodes[2].textContent=d.p;
    [...canvas.querySelectorAll('.demo-chip')].forEach((x,i)=>x.textContent=d.chips[i]);
  }
  tabs.forEach(b=>{b.addEventListener('click',()=>setState(b.dataset.state));if(fine)b.addEventListener('mouseenter',()=>setState(b.dataset.state))});

  const rows=[...document.querySelectorAll('.process-row')];
  rows.forEach(r=>r.addEventListener('click',()=>{rows.forEach(x=>x.classList.remove('active'));r.classList.add('active')}));
})();
