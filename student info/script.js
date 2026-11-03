const PRODUCTS=[
{id:1,name:'Carbon fiber side mirror caps',cat:'carbon',price:8999,desc:'Real 2x2 twill weave, gloss clear coat, clip-on fit.'},
{id:2,name:'Carbon fiber rear spoiler',cat:'carbon',price:18999,desc:'Lightweight ducktail spoiler with 3M tape install.'},
{id:3,name:'Carbon fiber front lip',cat:'carbon',price:15499,desc:'Subtle aero lip that sharpens the front end.'},
{id:4,name:'Chrome delete wrap kit',cat:'exterior',price:4999,desc:'Satin black vinyl pre-cut for window trim and grille.'},
{id:5,name:'LED headlight bulbs (pair)',cat:'exterior',price:3499,desc:'6000K white output, plug-and-play H4/H7.'},
{id:6,name:'Alloy wheel center caps (set of 4)',cat:'exterior',price:1999,desc:'Matte black caps with red accent ring.'},
{id:7,name:'Carbon-look steering wheel cover',cat:'interior',price:2299,desc:'Stitched grip cover, fits 37–39 cm wheels.'},
{id:8,name:'All-weather floor mats',cat:'interior',price:5499,desc:'Deep-channel, custom-cut rubber mats.'},
{id:9,name:'Ambient interior light strip',cat:'interior',price:2799,desc:'App-controlled RGB strip with USB power.'},
{id:10,name:'Ceramic wrap coating',cat:'wrap',price:3999,desc:'Protects vinyl and paint from UV and stains.'},
{id:11,name:'Microfiber detailing kit',cat:'wrap',price:1499,desc:'Wash mitt, drying towel and 5 buffing cloths.'},
{id:12,name:'Matte & satin wrap cleaner',cat:'wrap',price:899,desc:'pH-neutral spray that leaves no gloss patches.'}];
const $=s=>document.querySelector(s);
const inr=n=>'₹'+n.toLocaleString('en-IN');
let filter='all',sort='featured',query='';
let cart=[];try{cart=JSON.parse(localStorage.getItem('velocity-cart'))||[]}catch(e){}
const save=()=>{try{localStorage.setItem('velocity-cart',JSON.stringify(cart))}catch(e){}};
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2200)}
function renderProducts(){
 let list=PRODUCTS.filter(p=>(filter==='all'||p.cat===filter)&&(p.name+p.desc+p.cat).toLowerCase().includes(query));
 if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);
 $('#product-grid').innerHTML=list.length?list.map(p=>`<article class="product"><div class="product-img">${p.cat.toUpperCase()}</div><div class="product-body"><small>${p.cat}</small><h3>${p.name}</h3><p>${p.desc}</p><div class="product-foot"><strong>${inr(p.price)}</strong><button class="add-btn" data-id="${p.id}">Add to bag</button></div></div></article>`).join(''):'<p class="empty">No products match your search. Try a different word or clear the filter.</p>';
}
function renderCart(){
 const count=cart.reduce((s,i)=>s+i.qty,0),total=cart.reduce((s,i)=>s+i.qty*PRODUCTS.find(p=>p.id===i.id).price,0);
 $('#cart-count').textContent=count;$('#drawer-count').textContent=`(${count})`;$('#subtotal').textContent=inr(total);
 $('#cart-items').innerHTML=cart.length?cart.map(i=>{const p=PRODUCTS.find(x=>x.id===i.id);return `<div class="cart-item"><strong>${p.name}</strong><span>${inr(p.price*i.qty)}</span><div class="qty"><button data-dec="${i.id}" aria-label="Decrease">−</button>${i.qty}<button data-inc="${i.id}" aria-label="Increase">+</button></div><button class="rm" data-rm="${i.id}">Remove</button></div>`}).join(''):'<p class="empty">Your bag is empty. Add a product to get started.</p>';
 save();
}
function setCart(open){['#cart-drawer','#overlay'].forEach(s=>$(s).classList.toggle('open',open))}
$('#product-grid').addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(!b)return;const id=+b.dataset.id,it=cart.find(i=>i.id===id);it?it.qty++:cart.push({id,qty:1});renderCart();toast('Added to bag')});
$('#cart-items').addEventListener('click',e=>{const t=e.target,g=k=>+t.dataset[k];
 if(t.dataset.inc)cart.find(i=>i.id===g('inc')).qty++;
 else if(t.dataset.dec){const i=cart.find(i=>i.id===g('dec'));if(--i.qty<1)cart=cart.filter(x=>x!==i)}
 else if(t.dataset.rm)cart=cart.filter(i=>i.id!==g('rm'));else return;renderCart()});
$('#filters').addEventListener('click',e=>{const b=e.target.closest('.filter');if(!b)return;document.querySelectorAll('.filter').forEach(f=>f.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;renderProducts()});
$('#sort').addEventListener('change',e=>{sort=e.target.value;renderProducts()});
const doSearch=()=>{query=$('#search-input').value.trim().toLowerCase();renderProducts();location.hash='#shop'};
$('#search-submit').addEventListener('click',doSearch);$('#search-input').addEventListener('keydown',e=>e.key==='Enter'&&doSearch());
$('#search-toggle').addEventListener('click',()=>{$('#search-bar').classList.toggle('open');$('#search-input').focus()});
$('#menu-toggle').addEventListener('click',()=>$('#nav').classList.toggle('open'));
$('#nav').addEventListener('click',()=>$('#nav').classList.remove('open'));
$('#cart-open').addEventListener('click',()=>setCart(true));$('#cart-close').addEventListener('click',()=>setCart(false));
$('#clear-cart').addEventListener('click',()=>{cart=[];renderCart()});
const modal=o=>{$('#checkout-modal').classList.toggle('open',o);$('#overlay').classList.toggle('open',o);if(o)$('#cart-drawer').classList.remove('open')};
$('#checkout').addEventListener('click',()=>cart.length?modal(true):toast('Your bag is empty'));
['#checkout-close','#checkout-done'].forEach(s=>$(s).addEventListener('click',()=>modal(false)));
$('#overlay').addEventListener('click',()=>{setCart(false);modal(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){setCart(false);modal(false)}});
$('#quote-form').addEventListener('submit',e=>{e.preventDefault();$('#form-message').textContent='Thanks! Your request is noted. This demo form does not send data anywhere yet.';e.target.reset()});
$('#year').textContent=new Date().getFullYear();
renderProducts();renderCart();
