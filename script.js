const $=s=>document.querySelector(s),rs=n=>"₹"+n,P=(s,f)=>s.split(",").map(f);
const J=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},S=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const MN={b:"Breakfast",l:"Lunch",s:"Snacks",d:"Dinner"};
const MEALS=[["b","Breakfast","Idli, neer dosa, buns and filter coffee.","☕"],["l","Lunch","Meals, fish thali, biryani and more.","🍛"],["s","Snacks","Goli baje, cutlets, juices and sundaes.","🥭"],["d","Dinner","Ghee roast, kori rotti, pizza and more.","🍗"]];
const AREAS=["Hampankatta","Kadri","Bejai","Kodialbail","Bendoorwell","Lalbagh","Kankanady","Balmatta","Surathkal","Derebail","Other"];
/* ===== EDIT DATA HERE =====
Restaurant: [name, area, cuisine, rating, delivery mins, emoji, banner colours, offer, price for two, "dish:price:veg(1/0):meals(b l s d),..."] */
const BR=[
["Gajalee","Hampankatta","Seafood",4.5,25,"🐟","#0e7490,#67e8f9","₹40 off above ₹399",800,"Fish Ghee Roast:280:0:ld,Neer Dosa (2):60:1:bld,Prawns Gassi:340:0:ld,Bangude Fry:240:0:ld,Fish Thali:220:0:l"],
["Machali","Kadri","Seafood",4.4,25,"🦀","#1d4ed8,#93c5fd","₹50 off first order",700,"Kane Rava Fry:420:0:ld,Anjal Tawa Fry:380:0:ld,Crab Masala:360:0:ld,Appam (3):90:1:bd,Bangude Pulimunchi:210:0:l"],
["Shetty Lunch Home","Hampankatta","Mangalorean",4.3,22,"🍗","#b45309,#fcd34d","10% off",600,"Chicken Ghee Roast:290:0:ld,Kori Rotti:260:0:ld,Chicken Sukka:270:0:ld,Pathrode (2):80:1:bs,Fish Meals:200:0:l"],
["Hotel Navaratna","Hampankatta","Veg meals",4.2,18,"🍛","#15803d,#86efac","Unlimited thali",300,"Veg Meals:150:1:l,Idli Vada:70:1:b,Masala Dosa:95:1:bs,Neer Dosa Set:80:1:bd,Filter Coffee:30:1:bs"],
["Giri Manja's","Hampankatta","Tiffin & gadbad",4.4,15,"🍨","#be185d,#f9a8d4","Gadbad combo ₹20 off",250,"Gadbad Ice Cream:140:1:sd,Idli Sambar:60:1:b,Buns:45:1:bs,Goli Baje (6):50:1:s,Chai:20:1:bs"],
["Taj Mahal Cafe","Bunder","Cafe & snacks",4.1,15,"☕","#92400e,#fdba74","Chai + snack ₹10 off",200,"Mangalore Buns:40:1:bs,Goli Baje:50:1:s,Masala Chai:20:1:bs,Veg Cutlet:60:1:s,Bajji Platter:70:1:s"],
["Pabbas","Hampankatta","Juice & ice cream",4.6,15,"🥭","#c2410c,#fdba74","Fresh juice ₹10 off",250,"Mango Sundae:140:1:sd,Mixed Fruit Salad:120:1:s,Pabbas Special:190:1:sd,Fresh Lime Soda:50:1:ls,Badam Milk:70:1:bs"],
["Ideal Ice Cream","Hampankatta","Ice cream & snacks",4.5,15,"🍦","#7c3aed,#c4b5fd","Family packs",250,"Gadbad:130:1:sd,Butterscotch Scoop:70:1:sd,Hot Fudge Sundae:150:1:sd,Veg Sandwich:80:1:s,Cold Coffee:90:1:s"],
["Mangalore Pearl","Hampankatta","Biryani & North Indian",4.1,25,"🍚","#9f1239,#fda4af","Biryani + raita ₹30 off",700,"Chicken Biryani:260:0:ld,Mutton Biryani:340:0:ld,Butter Chicken:320:0:ld,Paneer Tikka Masala:260:1:ld,Butter Naan (2):70:1:ld"],
["Domino's Pizza","Mangaluru City","Pizza",4.0,22,"🍕","#b91c1c,#fca5a5","Combos from ₹199",500,"Margherita:139:1:lsd,Peppy Paneer:249:1:lsd,Chicken Dominator:379:0:ld,Garlic Bread:109:1:sd,Choco Lava Cake:109:1:sd"],
["Pizza Hut","Mangaluru City","Pizza",4.0,25,"🍕","#dc2626,#fecaca","Value meals",550,"Veg Supreme (Medium):399:1:lsd,Chicken Supreme (Medium):459:0:lsd,Cheesy Garlic Bread:149:1:sd,Pasta Alfredo:229:1:ld"],
["KFC","Mangaluru City","Fried chicken",4.1,22,"🍟","#b91c1c,#fdba74","Bucket deals",500,"Zinger Burger:179:0:lsd,Popcorn Chicken:149:0:sd,Veg Zinger:159:1:lsd,Fries (Large):99:1:sd,Pepsi:60:1:lsd"],
["Subway","Mangaluru City","Sandwiches & salads",4.0,18,"🥪","#15803d,#bbf7d0","Sub of the day",300,"Paneer Tikka Sub:220:1:lsd,Chicken Tikka Sub:240:0:lsd,Veggie Delite Sub:180:1:lsd,Choco Chip Cookie:50:1:s"],
["Cafe Coffee Day","Mangaluru City","Cafe",4.0,18,"🥤","#78350f,#d6b48a","Combo deals",350,"Cappuccino:150:1:bs,Cold Coffee:170:1:s,Veg Sandwich:140:1:bs,Chocolate Brownie:120:1:sd"]
].map(a=>({n:a[0],a:a[1],c:a[2],r:a[3],t:a[4],e:a[5],g:a[6],o:a[7],f:a[8],m:P(a[9],x=>{const[n,p,v,k]=x.split(":");return{n,p:+p,v:+v,k}})}));
/* Grocery aisle: [name, emoji, description, "emoji Item unit:price,..."] */
const BG=[
["Fruits & vegetables","🥬","Sourced daily from local markets.","🍅 Tomato 1kg:28,🧅 Onion 1kg:38,🥔 Potato 1kg:32,🥒 Mangalore Southekayi 500g:30,🍆 Udupi Gulla Brinjal 500g:60,🥥 Tender Coconut 1pc:45,🍌 Nendran Banana 1kg:70,🍎 Apple 1kg:180,🍈 Papaya 1kg:50,🍋 Lemon 250g:20"],
["Dairy & eggs","🥛","Milk, curd, paneer and eggs, chilled on delivery.","🥛 Nandini Toned Milk 500ml:27,🥣 Nandini Curd 500g:30,🧃 Nandini Buttermilk 200ml:12,🧈 Nandini Butter 100g:58,🧀 Amul Cheese Slices 200g:140,🧀 Paneer 200g:90,🥚 Eggs 6pc:48,🫙 Nandini Ghee 500ml:310"],
["Staples","🌾","Rice, atta, oil and pulses in family packs.","🍚 Matta Rice 5kg:340,🍚 Boiled Rice 5kg:290,🌾 Wheat Atta 5kg:250,🫘 Toor Dal 1kg:165,🥣 Avalakki (Poha) 500g:38,🥥 Coconut Oil 1L:230,🌻 Sunflower Oil 1L:140,🍬 Sugar 1kg:46"],
["Fresh fish & meat","🐟","Bunder market catch, cleaned and cut.","🐟 Bangude (Mackerel) 500g:125,🐠 Anjal (Kingfish) 500g:450,🐟 Boothai (Sardine) 500g:90,🦐 Prawns Medium 500g:320,🐡 Pomfret 500g:380,🍗 Chicken Curry Cut 500g:140,🥩 Mutton 500g:400,🥚 Country Eggs 6pc:60"],
["Spices & masala","🌶️","Coastal Karnataka kitchen essentials.","🌶️ Byadgi Chilli 200g:120,🟡 Turmeric Powder 100g:30,🌿 Coriander Powder 200g:55,🍋 Tamarind 250g:55,🟤 Jaggery 500g:48,🧂 Salt 1kg:28,🫘 Mustard Seeds 100g:25,🥘 Garam Masala 50g:60"],
["Household","🧴","Cleaning supplies and everyday essentials.","🧺 Detergent Powder 1kg:125,🍽️ Dishwash Gel 500ml:99,🪥 Toothpaste 200g:110,🧼 Bathing Soap 3pc:120,🚽 Toilet Cleaner 500ml:95,🛍️ Garbage Bags 30pc:99,🧻 Tissue Rolls 4pc:90,🧽 Scrub Pads 3pc:45"]
].map(a=>({n:a[0],e:a[1],d:a[2],i:P(a[3],x=>{const j=x.lastIndexOf(":"),s=x.slice(0,j),h=s.indexOf(" ");return{e:s.slice(0,h),n:s.slice(h+1),p:+x.slice(j+1)}})}));

let R,G,view="home",mode="f",meal="a",veg=0,sort="r",aisle=-1,ri=0,tid="",pending=0,lastS=-1,speed=J("bb3_speed",10);
let users=J("bb3_users",[]),user=J("bb3_user",null),cart=J("bb3_cart",{}),vendors=J("bb3_vendors",[]).filter(v=>v.w&&v.items),orders=J("bb3_orders",[]).filter(o=>o.placedAt),vsess=J("bb3_vsess",null),addrs=J("bb3_addrs",{}),coupon=J("bb3_coupon","");
const FREE=199,FEE=30,notified={},VT=t=>/Restaurant|Cafe/.test(t);
const COUPONS={WELCOME50:{min:299,off:50,d:"₹50 off above ₹299"},MANGALURU20:{min:399,pct:20,max:100,d:"20% off up to ₹100 above ₹399"},BITE10:{min:149,pct:10,max:40,d:"10% off up to ₹40 above ₹149"}};
let cf={sel:"",l:"Home",z:AREAS[0],a:"",save:true,pay:"UPI",code:"",msg:""};
const STG=[["Order placed",0,"We've received your order."],["Order confirmed",.06,"{f} accepted your order."],["Preparing your order",.12,"Your order is being cooked and packed."],["Delivery partner assigned",.4,"{a} is heading to pick up your order."],["Out for delivery",.62,"{a} has picked up your order and is on the way."],["Delivered",1,"Your order has arrived. Enjoy!"]];
const AG=["Suresh K","Prakash S","Imran A","Ravi N","Harish B"],agent=o=>({n:AG[+o.id.slice(-1)%5],v:"KA-19 EQ "+o.id.slice(-4)});
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1),first=()=>cap(user.n.split(" ")[0]);
const toast=t=>{const e=$("#toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),2200)};
const modal=h=>{$("#mb").innerHTML=`<button class="x" data-x aria-label="Close">×</button>`+h;$("#ov").classList.add("open")},close=()=>$("#ov").classList.remove("open");
const stp=(k,q)=>`<span class="stp"><button data-d="${k}" aria-label="Remove one">−</button>${q}<button data-u="${k}" aria-label="Add one">+</button></span>`;
const meta=r=>`${r.r?"⭐ "+r.r:"🆕 New"} · ${r.t} min${r.f?" · "+rs(r.f)+" for two":""}`;
const addrOf=()=>addrs[user.m]||(addrs[user.m]=[]),curV=()=>vendors.find(v=>v.id==vsess);
const prog=o=>Math.min(1,Math.max(0,(Date.now()-o.placedAt)/60000*o.sp/o.T)),stIdx=o=>{const p=prog(o);let s=0;STG.forEach((x,i)=>{if(p>=x[1])s=i});return s};
const fmt=t=>new Date(t).toLocaleTimeString("en-IN",{hour:"numeric",minute:"2-digit"});

function rebuild(){
 const L=vendors.filter(v=>v.open&&v.items.length);
 R=[...BR,...L.filter(v=>VT(v.t)).map(v=>({n:v.b,a:v.z,c:v.t,r:0,t:25,e:"🍽️",g:"#475569,#cbd5e1",o:"New on Basket & Bite",f:Math.round(v.items.reduce((a,i)=>a+i.p,0)/v.items.length*2),m:v.items}))];
 const S2=L.filter(v=>!VT(v.t)).flatMap(v=>v.items.map(i=>({e:"🛍️",n:i.n,p:i.p,s:v.b})));
 G=S2.length?[...BG,{n:"Local stores",e:"🏪",d:"Items from neighbourhood shops on Basket & Bite.",i:S2}]:BG;
}
const VIEWS=["home","food","rest","groc","cart","track","dash"];
function go(v,a){view=v;if(a!==undefined)tid=a;VIEWS.forEach(x=>$("#v-"+x).hidden=x!=v);scrollTo(0,0);({home:drawHome,food:drawFood,rest:drawRest,groc:drawGroc,cart:drawCartView,track:drawTrack,dash:drawDash})[v]();bar()}
function jump(id){if(view!="home")go("home");setTimeout(()=>$("#"+id).scrollIntoView(),40)}
function bar(){const n=Object.values(cart).reduce((a,l)=>a+l.q,0),b=$("#gb");$("#cc").textContent=n;
 if(!n||!["food","rest","groc"].includes(view)){b.hidden=true;return}
 b.hidden=false;b.innerHTML=`<span>🛒 ${n} item${n>1?"s":""} · ${rs(sub())}</span><button class="or" data-go="cart">Go to cart →</button>`}
const card=(at,e,t,d,f)=>`<button class="cc" ${at}><div class="ic">${e}</div><h3>${t}</h3><p>${d}</p><div class="fr">${f}</div></button>`;
function drawHome(){
 $("#tg").innerHTML=[["f","Food"],["g","Grocery"]].map(([k,v])=>`<button class="${k==mode?"on":""}" data-mode="${k}">${v}</button>`).join("");
 $("#cg").innerHTML=mode=="f"?MEALS.map(([k,t,d,e])=>card(`data-meal="${k}"`,e,t,d,"From "+rs(Math.min(...R.flatMap(r=>r.m.filter(i=>i.k.includes(k)).map(i=>i.p)))))).join(""):G.map((a,i)=>card(`data-aisle="${i}"`,a.e,a.n,a.d,"From "+rs(Math.min(...a.i.map(x=>x.p))))).join("");
 $("#facts").innerHTML=`<span>🍽️ ${R.length} restaurants live</span><span>🥬 ${G.length} grocery aisles</span><span>⏱️ Delivery in up to 25 min</span>`;$("#vk").textContent=R.length;
 $("#vbtn").textContent=curV()?"Open dashboard":"Register as a vendor";$("#vlg").hidden=!!curV();
}
function drawFood(){
 $("#fm").innerHTML=[["a","All"],...Object.entries(MN)].map(([k,v])=>`<button class="${k==meal?"on":""}" data-meal="${k}">${v}</button>`).join("");
 $("#fv").classList.toggle("on",!!veg);$("#fs").value=sort;
 const q=$("#fq").value.toLowerCase(),F={r:(a,b)=>b.r-a.r,t:(a,b)=>a.t-b.t,p:(a,b)=>a.f-b.f};
 const L=R.filter(r=>(meal=="a"||r.m.some(i=>i.k.includes(meal)))&&(!veg||r.m.some(i=>i.v))&&(r.n+r.c+r.a+r.m.map(i=>i.n).join()).toLowerCase().includes(q)).sort(F[sort]);
 $("#fc").textContent=`${L.length} kitchens${meal!="a"?" serving "+MN[meal].toLowerCase():""}. Delivery in up to 25 min. Tap one to see its menu.`;
 $("#rg").innerHTML=L.map(r=>`<button class="rcard" data-r="${R.indexOf(r)}"><div class="bn" style="background:linear-gradient(145deg,${r.g})">${r.e}</div><div class="bd"><h3>${r.n}</h3><p class="mu">${r.c} · ${r.a}</p><p style="margin-top:10px">${meta(r)}</p><span class="of">${r.o}</span></div></button>`).join("")||"<p class='mu'>Nothing matches. Try another meal or turn off Veg only.</p>";
}
function drawRest(){
 const r=R[ri];if(!r)return go("food");
 $("#rh").innerHTML=`<div class="bn" style="background:linear-gradient(145deg,${r.g})">${r.e}</div><div><h1 style="font-size:40px">${r.n}</h1><p class="mu">${r.c} · ${r.a}, Mangaluru</p><p>${meta(r)}</p><span class="of">${r.o}</span></div>`;
 $("#rm").innerHTML=r.m.filter(i=>!veg||i.v).map(i=>{const k=i.n+"|"+r.n,c=cart[k];return `<div class="mi"><div><span class="vdot ${i.v?"v1":""}"></span>${i.n}<small>${i.k.length==4?"Any time":[...i.k].map(x=>MN[x]).join(", ")}</small></div><div style="display:flex;gap:20px;align-items:center"><span class="pr">${rs(i.p)}</span>${c?stp(k,c.q):`<button class="ad" data-a="${i.n}|${i.p}|${r.n}">Add</button>`}</div></div>`}).join("");
}
function drawGroc(){
 if(aisle>=G.length)aisle=-1;const q=$("#gq").value.toLowerCase();
 $("#sb").innerHTML=[["All items",-1,"🧺"],...G.map((a,i)=>[a.n,i,a.e])].map(([n,i,e])=>`<button class="${i==aisle?"on":""}" data-aisle="${i}">${e} ${n}</button>`).join("");
 const S2=G.map((a,i)=>({a,L:a.i.filter(x=>(aisle<0||aisle==i)&&x.n.toLowerCase().includes(q))})).filter(s=>s.L.length);
 $("#gp").innerHTML=S2.map(s=>`<h2 class="gh">${s.a.e} ${s.a.n}</h2><div class="pgrid">${s.L.map(i=>{const sr=i.s||"Groceries",k=i.n+"|"+sr,c=cart[k];return `<div class="pt"><div class="e">${i.e}</div><b>${i.n}</b>${i.s?`<small class="mu">${i.s}</small>`:""}<div class="bt"><span class="pr">${rs(i.p)}</span>${c?stp(k,c.q):`<button class="ad" data-a="${i.n}|${i.p}|${sr}">Add</button>`}</div></div>`}).join("")}</div>`).join("")||"<p class='mu'>No groceries match that search.</p>";
}
const lines=()=>Object.values(cart),sub=()=>lines().reduce((a,l)=>a+l.p*l.q,0),fee=()=>sub()==0||sub()>=FREE?0:FEE;
const disc=()=>{const c=COUPONS[coupon],s=sub();if(!c||s<c.min)return 0;return c.off||Math.min(Math.round(s*c.pct/100),c.max)},total=()=>sub()+fee()-disc();
const etaT=()=>Math.min(25,Math.max(15,...lines().map(l=>(R.find(r=>r.n==l.s)||{t:20}).t)));
function drawCart(){S("bb3_cart",cart);bar();if(view=="rest")drawRest();if(view=="groc")drawGroc();if(view=="cart")drawCartView()}
function add(n,p,s){const k=n+"|"+s;cart[k]=cart[k]||{n,p,s,q:0};cart[k].q++;drawCart();toast(n+" added to cart")}

function drawCartView(){
 const el=$("#v-cart"),L=Object.entries(cart);
 if(!L.length){el.innerHTML=`<div class="w" style="padding:120px 32px;text-align:center"><div style="font-size:64px">🛒</div><h1 style="font-size:42px;margin:16px 0 12px">Your cart is empty</h1><p class="mu">Add a dish or some groceries to get started.</p><div class="cta" style="justify-content:center;margin-top:36px"><button class="dark" data-go="food">Browse restaurants</button><button class="pill" data-go="groc">Shop groceries</button></div></div>`;return}
 const g={};L.forEach(([k,l])=>(g[l.s]=g[l.s]||[]).push([k,l]));
 const A=user?addrOf():[],T=etaT(),s=sub(),c=COUPONS[coupon],d=disc(),left=Math.max(0,FREE-s);
 if(cf.sel===""||(cf.sel!="new"&&!A[+cf.sel]))cf.sel=A.length?"0":"new";
 el.innerHTML=`<div class="w"><div class="ph" style="padding-top:64px"><div class="eb">Cart</div><h1>Review your order</h1></div><div class="cv"><div>
 <div class="cp"><h2>Items</h2>${Object.entries(g).map(([n,a])=>`<h3 style="font:600 16px Inter;margin-top:12px;color:var(--mu)">${n}</h3>${a.map(([k,l])=>`<div class="li"><div>${l.n}<small>${rs(l.p)} each</small></div><div style="display:flex;gap:24px;align-items:center">${stp(k,l.q)}<span class="pr" style="min-width:64px;text-align:right">${rs(l.p*l.q)}</span></div></div>`).join("")}`).join("")}
 <div class="cta" style="margin-top:28px"><button class="pill" data-go="food">+ Add food</button><button class="pill" data-go="groc">+ Add groceries</button></div></div>
 <div class="cp"><h2>Delivery address</h2>${user?"":`<p class="mu" style="margin-bottom:16px">Log in to use your saved addresses.</p>`}
 ${A.map((x,i)=>`<label class="al ${cf.sel==i?"on":""}"><input type="radio" name="ad" data-f="sel" value="${i}" ${cf.sel==i?"checked":""}><div><b>${x.l}</b><div class="mu">${x.a}, ${x.z}, Mangaluru</div></div></label>`).join("")}
 ${A.length?`<label class="al ${cf.sel=="new"?"on":""}"><input type="radio" name="ad" data-f="sel" value="new" ${cf.sel=="new"?"checked":""}><b>Use a new address</b></label>`:""}
 ${cf.sel=="new"?`<div class="f2c" style="margin-top:16px"><select class="fi" data-f="l" aria-label="Label">${["Home","Work","Other"].map(x=>`<option ${cf.l==x?"selected":""}>${x}</option>`).join("")}</select><select class="fi" data-f="z" aria-label="Area">${AREAS.map(x=>`<option ${cf.z==x?"selected":""}>${x}</option>`).join("")}</select></div><input class="fi" data-f="a" placeholder="House no, street, landmark" value="${cf.a}" style="margin-top:14px"><label style="display:flex;gap:10px;margin-top:16px;align-items:center"><input type="checkbox" data-f="save" ${cf.save?"checked":""}> Save this address for next time</label>`:""}</div>
 <div class="cp"><h2>Payment</h2><div class="seg">${["UPI","Cash on delivery","Card"].map(x=>`<button class="${cf.pay==x?"on":""}" data-pay="${x}">${x}</button>`).join("")}</div></div></div>
 <aside class="sum cp"><div class="eb2">🛵 Estimated delivery: ${Math.max(15,T-5)}–${T} min</div>
 ${left?`<div class="mu">Add ${rs(left)} more for free delivery</div><div class="bar2"><i style="width:${s/FREE*100}%"></i></div>`:`<div style="color:var(--g);font-weight:600">✓ Free delivery unlocked</div><div class="bar2"><i style="width:100%"></i></div>`}
 <h3 style="font:600 17px Inter;margin-bottom:12px">Coupon</h3><div class="cpn"><input class="fi" placeholder="Enter code" value="${cf.code}" data-f="code" aria-label="Coupon code"><button class="pill" data-apply>Apply</button></div>
 ${cf.msg?`<p class="err" style="margin-top:8px">${cf.msg}</p>`:""}
 <div class="chips">${Object.keys(COUPONS).map(k=>`<button data-cp="${k}" title="${COUPONS[k].d}">${k}</button>`).join("")}</div>
 ${c?`<p style="font-size:14px;margin-top:8px;color:${d?"var(--g)":"#c0392b"}">${d?c.d+" applied":"Add "+rs(c.min-s)+" more to use "+coupon}</p>`:""}
 <div style="margin-top:24px"><div class="sr"><span>Subtotal</span><span>${rs(s)}</span></div><div class="sr"><span>Delivery</span><span>${fee()?rs(fee()):"Free"}</span></div>${d?`<div class="sr d"><span>Discount</span><span>−${rs(d)}</span></div>`:""}<div class="sr t"><span>Total</span><span>${rs(total())}</span></div></div>
 <div class="err" id="ce" style="margin-top:12px"></div><button class="dark" id="po" style="width:100%">${user?"Place order":"Log in to place order"}</button></aside></div></div>`;
}
function setCoupon(code){code=code.trim().toUpperCase();cf.code=code;
 if(!code){coupon="";cf.msg=""}else if(!COUPONS[code])cf.msg="That code isn't valid.";else{coupon=code;cf.msg=""}
 S("bb3_coupon",coupon);drawCartView()}
function placeOrder(){
 if(!user)return auth("in","Log in to place your order.");
 const E=$("#ce"),A=addrOf();let ad;
 if(cf.sel!="new"&&A[+cf.sel])ad=A[+cf.sel];
 else{if(cf.a.trim().length<6)return E.textContent="Enter your delivery address.";ad={l:cf.l,z:cf.z,a:cf.a.trim()};if(cf.save){A.push(ad);S("bb3_addrs",addrs)}}
 const o={id:"BB-"+Math.floor(10000+Math.random()*90000),m:user.m,cn:user.n,items:lines().map(l=>({...l})),sub:sub(),fee:fee(),disc:disc(),total:total(),from:[...new Set(lines().map(l=>l.s))].join(", "),addr:ad.a+", "+ad.z+" ("+ad.l+")",z:ad.z,pay:cf.pay,placedAt:Date.now(),T:etaT(),sp:speed};
 orders.push(o);S("bb3_orders",orders);cart={};coupon="";S("bb3_cart",cart);S("bb3_coupon","");cf.a="";cf.code="";cf.sel="";go("track",o.id);
}
function drawTrack(){
 const o=orders.find(x=>x.id==tid),el=$("#v-track");if(!o)return go("home");
 const s=stIdx(o),ag=agent(o),done=s==5;lastS=s;
 const sd=(t)=>t.replace("{f}",o.from).replace("{a}",ag.n);
 el.innerHTML=`<div class="w"><div class="ph" style="padding-top:56px"><div class="eb">Order #${o.id}</div><h1 style="font-size:clamp(34px,4.5vw,54px)">${done?"Delivered. Enjoy your order!":STG[s][0]}</h1><p>From ${o.from}</p></div>
 <div class="tv"><div class="cp"><div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px"><span id="eta" class="eta2"></span><span class="mu">Delivering to ${o.z}</span></div>
 <div class="pb"><div class="pf" id="pf"></div><span class="sc" id="sc">🛵</span></div><div class="pe"><span>🍽️ ${o.from.split(", ")[0]}</span><span>🏠 You</span></div>
 <div class="tl">${STG.map((x,i)=>`<div class="ts ${i<=s?"dn":""} ${i==s&&!done?"cur":""}"><div class="dt"></div><div><b>${x[0]}</b>${i<=s?`<small>${sd(x[2])}</small>`:""}</div>${i<=s?`<time>${fmt(o.placedAt+x[1]*o.T*60000)}</time>`:""}</div>`).join("")}</div></div>
 <div>${s>=3?`<div class="cp"><h2>Your delivery partner</h2><div class="ag"><div class="av2">🛵</div><div><b>${ag.n}</b><div class="mu">⭐ 4.8 · ${ag.v}</div></div><button class="pill" style="margin-left:auto" data-call>Call</button></div></div>`:""}
 <div class="cp"><h2>Order summary</h2>${o.items.map(l=>`<div class="sr"><span>${l.n} × ${l.q}</span><span>${rs(l.p*l.q)}</span></div>`).join("")}
 <div class="sr"><span>Delivery</span><span>${o.fee?rs(o.fee):"Free"}</span></div>${o.disc?`<div class="sr d"><span>Discount</span><span>−${rs(o.disc)}</span></div>`:""}<div class="sr t"><span>Total</span><span>${rs(o.total)}</span></div>
 <p class="mu" style="margin-top:20px;font-size:15px">📍 ${o.addr}<br>💳 ${o.pay}</p></div>
 <button class="pill" data-speed>⏱ Demo speed: ${o.sp>1?"Fast ("+o.sp+"x)":"Real time"}</button><p class="mu" style="font-size:14px;margin-top:10px">Fast mode plays the full delivery in about ${Math.round(o.T/o.sp*10)/10} min so you can show it live.</p></div></div></div>`;
 updTrack(o);
}
function updTrack(o){const e=$("#eta");if(!e)return;const p=prog(o),rem=Math.max(0,Math.ceil(o.T*(1-p))),t=fmt(o.placedAt+o.T*60000);
 e.textContent=p>=1?"Delivered at "+t:`Arriving in ${rem} min · by ${t}`;$("#pf").style.width=p*100+"%";$("#sc").style.left=p*100+"%";$("#sc").textContent=p>=1?"✅":"🛵"}

function navUser(){$("#lbtn").innerHTML=user?`<span class="av">${first()[0]}</span>${first()}`:"Log in"}
function auth(tab,note){
 modal(`<h2>${tab=="in"?"Welcome back":"Create your account"}</h2><p class="mu">${note||(tab=="in"?"Log in to place orders and see your order history.":"It takes a minute. Your details stay in this browser.")}</p>
 <div class="tabs"><button class="${tab=="in"?"on":""}" data-tab="in">Log in</button><button class="${tab=="up"?"on":""}" data-tab="up">Sign up</button></div>`+
 (tab=="in"?`<label>Email or mobile number</label><input id="ai" autocomplete="username">`:`<label>Full name</label><input id="an"><label>Mobile number</label><input id="ap" inputmode="numeric" maxlength="10"><label>Email</label><input id="am" type="email">`)+
 `<label>Password</label><input id="aw" type="password" autocomplete="current-password"><div class="err" id="ae"></div><button class="dark" style="width:100%" data-auth="${tab}">${tab=="in"?"Log in":"Create account"}</button>`);
}
function doAuth(tab){
 const v=id=>($("#"+id)?.value||"").trim(),e=$("#ae"),w=v("aw");
 if(tab=="up"){const n=v("an"),p=v("ap"),m=v("am").toLowerCase();
  if(n.length<2)return e.textContent="Enter your name.";
  if(!/^[6-9]\d{9}$/.test(p))return e.textContent="Enter a valid 10-digit mobile number.";
  if(!/^\S+@\S+\.\S+$/.test(m))return e.textContent="Enter a valid email address.";
  if(w.length<6)return e.textContent="Password needs at least 6 characters.";
  if(users.some(u=>u.m==m||u.p==p))return e.textContent="This email or mobile is already registered. Please log in.";
  users.push({n,p,m,w});S("bb3_users",users);user={n,p,m};
 }else{const i=v("ai").toLowerCase(),u=users.find(u=>(u.m==i||u.p==i)&&u.w==w);
  if(!u)return e.textContent="Wrong email, mobile or password.";user={n:u.n,p:u.p,m:u.m}}
 S("bb3_user",user);close();navUser();toast("Welcome, "+first());if(view=="cart")drawCartView();
}
function account(){
 const mine=orders.filter(o=>o.m==user.m).reverse(),A=addrOf();
 modal(`<h2>${first()}</h2><p class="mu">${user.m} · ${user.p}</p><h3 style="margin:28px 0 4px;font-size:20px">Your orders</h3>`+
 (mine.map(o=>`<div class="li"><div>#${o.id}<small>${rs(o.total)} · ${STG[stIdx(o)][0]}</small></div><button class="ad" data-trk="${o.id}">Track</button></div>`).join("")||"<p class='mu'>No orders yet.</p>")+
 `<h3 style="margin:28px 0 4px;font-size:20px">Saved addresses</h3>`+(A.map((x,i)=>`<div class="li"><div>${x.l}<small>${x.a}, ${x.z}</small></div><button class="ad" style="color:#c0392b;border-color:#c0392b" data-deladdr="${i}">Delete</button></div>`).join("")||"<p class='mu'>None yet. You can save one while placing an order.</p>")+
 `<button class="pill" style="margin-top:28px" data-out>Log out</button>`);
}
function vendorReg(){
 modal(`<h2>Register as a vendor</h2><p class="mu" style="margin-bottom:20px">Create your vendor account, then add your menu from the dashboard.</p>
 <label>Business name</label><input id="vb"><label>Owner name</label><input id="vo"><label>Mobile number</label><input id="vp" inputmode="numeric" maxlength="10">
 <label>Business type</label><select id="vt"><option>Restaurant</option><option>Cafe or bakery</option><option>Grocery store</option><option>Fish and meat shop</option></select>
 <label>Area</label><select id="vz">${AREAS.map(a=>`<option>${a}</option>`).join("")}</select><label>Password</label><input id="vw" type="password">
 <div class="err" id="ve"></div><button class="dark" style="width:100%" data-vreg>Create vendor account</button>
 <p class="mu" style="margin-top:16px;font-size:15px">Already registered? <button style="text-decoration:underline;font-weight:600" data-vlog>Vendor login</button></p>`);
}
function doVreg(){
 const v=id=>$("#"+id).value.trim(),e=$("#ve"),b=v("vb"),o=v("vo"),p=v("vp"),w=v("vw");
 if(b.length<2||o.length<2)return e.textContent="Enter the business and owner names.";
 if(!/^[6-9]\d{9}$/.test(p))return e.textContent="Enter a valid 10-digit mobile number.";
 if(w.length<6)return e.textContent="Password needs at least 6 characters.";
 if(vendors.some(x=>x.p==p))return e.textContent="This mobile is already registered. Use Vendor login.";
 const n={id:"VR-"+Math.floor(1000+Math.random()*9000),b,o,p,w,t:v("vt"),z:v("vz"),items:[],open:true};
 vendors.push(n);S("bb3_vendors",vendors);vsess=n.id;S("bb3_vsess",vsess);close();rebuild();go("dash");toast("Vendor account created");
}
function vendorLogin(){
 modal(`<h2>Vendor login</h2><p class="mu" style="margin-bottom:20px">Log in to manage your menu and orders.</p><label>Mobile number</label><input id="lp" inputmode="numeric" maxlength="10"><label>Password</label><input id="lw" type="password"><div class="err" id="le"></div><button class="dark" style="width:100%" data-vlogin>Log in</button>`);
}
function drawDash(){
 const v=curV();if(!v){go("home");return vendorLogin()}
 $("#v-dash").innerHTML=`<div class="w" style="padding:64px 32px 96px"><div class="dh"><div><div class="eb">Vendor dashboard</div><h1 style="font-size:clamp(34px,4vw,48px)">${v.b}</h1><p class="mu">${v.t} · ${v.z}, Mangaluru · Ref ${v.id}</p></div><div class="na"><button class="pill" data-vopen>${v.open?"🟢 Open for orders":"🔴 Closed"}</button><button class="pill" data-vout>Log out</button></div></div>
 ${v.items.length?"":`<div class="eb2">Add at least one menu item below. Your ${VT(v.t)?"restaurant will then appear in Food":"items will then appear under Groceries"}.</div>`}
 <div class="cg" id="vst" style="margin-bottom:64px"></div><h2 style="font-size:30px;margin-bottom:24px">Incoming orders</h2><div id="do" style="margin-bottom:64px"></div>
 <h2 style="font-size:30px;margin-bottom:24px">Your menu</h2><div class="cp"><div id="dm"></div></div>
 <div class="cp"><h2>Add an item</h2><div class="f2c"><input class="fi" id="mn" placeholder="Item name" aria-label="Item name"><input class="fi" id="mp" type="number" min="1" placeholder="Price (₹)" aria-label="Price"><select class="fi" id="mv" aria-label="Veg"><option value="1">Veg</option><option value="0">Non-veg</option></select><select class="fi" id="mk" aria-label="Available"><option value="bsld">Any time</option><option value="b">Breakfast</option><option value="l">Lunch</option><option value="s">Snacks</option><option value="d">Dinner</option></select></div><div class="err" id="me" style="margin-top:8px"></div><button class="dark" data-additem style="margin-top:8px">Add to menu</button></div></div>`;
 drawDashOrders();drawDashMenu();
}
function drawDashOrders(){
 const v=curV();if(!v||!$("#do"))return;const O=orders.filter(o=>o.items.some(i=>i.s==v.b)).reverse(),mine=o=>o.items.filter(i=>i.s==v.b),amt=o=>mine(o).reduce((a,i)=>a+i.p*i.q,0),rev=O.reduce((a,o)=>a+amt(o),0);
 $("#vst").innerHTML=[["Orders",O.length],["Revenue",rs(rev)],["Average order",rs(O.length?Math.round(rev/O.length):0)],["Menu items",v.items.length]].map(([k,x])=>`<div class="st"><span class="mu">${k}</span><b>${x}</b></div>`).join("");
 $("#do").innerHTML=O.map(o=>`<div class="cp" style="margin-bottom:16px;display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap"><div><b>#${o.id}</b><span class="chp">${STG[stIdx(o)][0]}</span><div class="mu" style="margin-top:6px">${mine(o).map(i=>i.n+" × "+i.q).join(", ")}</div><div class="mu" style="font-size:14px">${cap(o.cn.split(" ")[0])} · ${o.z}</div></div><b class="pr">${rs(amt(o))}</b></div>`).join("")||`<p class="mu">No orders yet. ${v.items.length?"Orders for your items will show up here live.":"Add menu items so customers can find you."}</p>`;
}
function drawDashMenu(){const v=curV();$("#dm").innerHTML=v.items.map((i,x)=>`<div class="li"><div><span class="vdot ${i.v?"v1":""}"></span>${i.n}<small>${i.k.length==4?"Any time":[...i.k].map(c=>MN[c]).join(", ")}</small></div><div style="display:flex;gap:20px;align-items:center"><span class="pr">${rs(i.p)}</span><button class="ad" style="color:#c0392b;border-color:#c0392b" data-rmi="${x}">Remove</button></div></div>`).join("")||"<p class='mu'>No items yet.</p>"}

document.addEventListener("click",e=>{
 const t=e.target.closest("[data-go],[data-j],[data-mode],[data-meal],[data-aisle],[data-r],[data-a],[data-u],[data-d],[data-x],[data-tab],[data-auth],[data-trk],[data-out],[data-pay],[data-apply],[data-cp],[data-speed],[data-call],[data-deladdr],[data-vopen],[data-vout],[data-additem],[data-rmi],[data-vreg],[data-vlog],[data-vlogin]");
 if(t){const d=t.dataset,v=curV();
  if(d.a){const[n,p,s]=d.a.split("|");add(n,+p,s)}
  else if(d.go)go(d.go);
  else if(d.j)jump(d.j);
  else if(d.mode){mode=d.mode;drawHome()}
  else if(d.meal){meal=d.meal;view=="food"?drawFood():go("food")}
  else if(d.aisle!==undefined){aisle=+d.aisle;view=="groc"?drawGroc():go("groc")}
  else if(d.r!==undefined){ri=+d.r;go("rest")}
  else if(d.u){cart[d.u].q++;drawCart()}
  else if(d.d){if(--cart[d.d].q<=0)delete cart[d.d];drawCart()}
  else if(d.tab)auth(d.tab);
  else if(d.auth)doAuth(d.auth);
  else if(d.trk){close();go("track",d.trk)}
  else if(d.pay){cf.pay=d.pay;drawCartView()}
  else if("apply" in d)setCoupon(cf.code);
  else if(d.cp)setCoupon(d.cp);
  else if("speed" in d){const o=orders.find(x=>x.id==tid),el=(Date.now()-o.placedAt)/60000*o.sp;o.sp=o.sp>1?1:10;speed=o.sp;o.placedAt=Date.now()-el/o.sp*60000;S("bb3_orders",orders);S("bb3_speed",speed);drawTrack()}
  else if("call" in d)toast("Calling is turned off in this demo");
  else if(d.deladdr!==undefined){addrOf().splice(+d.deladdr,1);S("bb3_addrs",addrs);account()}
  else if("out" in d){user=null;S("bb3_user",null);navUser();close();if(view=="cart")drawCartView();toast("Logged out")}
  else if("vopen" in d){v.open=!v.open;S("bb3_vendors",vendors);rebuild();drawDash()}
  else if("vout" in d){vsess=null;S("bb3_vsess",null);go("home");toast("Vendor logged out")}
  else if("additem" in d){const n=$("#mn").value.trim(),p=+$("#mp").value;
   if(n.length<2||!(p>0))return $("#me").textContent="Enter an item name and a price above 0.";
   v.items.push({n,p,v:+$("#mv").value,k:$("#mk").value});S("bb3_vendors",vendors);rebuild();$("#mn").value=$("#mp").value="";$("#me").textContent="";drawDashMenu();drawDashOrders();toast(n+" added to your menu")}
  else if(d.rmi!==undefined){v.items.splice(+d.rmi,1);S("bb3_vendors",vendors);rebuild();drawDashMenu();drawDashOrders()}
  else if("vreg" in d)doVreg();
  else if("vlog" in d)vendorLogin();
  else if("vlogin" in d){const u=vendors.find(x=>x.p==$("#lp").value.trim()&&x.w==$("#lw").value);
   if(!u)return $("#le").textContent="Wrong mobile number or password.";vsess=u.id;S("bb3_vsess",vsess);close();go("dash")}
  else if("x" in d)close();return}
 if(e.target.id=="ov")close();if(e.target.id=="po")placeOrder();
});
document.addEventListener("input",e=>{const f=e.target.dataset.f;if(!f)return;cf[f]=e.target.type=="checkbox"?e.target.checked:e.target.value;if(f=="sel")drawCartView()});
$("#fq").oninput=drawFood;$("#gq").oninput=drawGroc;$("#fs").onchange=e=>{sort=e.target.value;drawFood()};$("#fv").onclick=()=>{veg=!veg;view=="food"&&drawFood()};
$("#lbtn").onclick=()=>user?account():auth("in");
$("#vbtn").onclick=()=>curV()?go("dash"):vendorReg();$("#vlg").onclick=vendorLogin;
document.addEventListener("keydown",e=>{if(e.key=="Escape")close()});
rebuild();orders.forEach(o=>{if(stIdx(o)==5)notified[o.id]=1});navUser();drawHome();bar();
setInterval(()=>{
 const o=orders.find(x=>x.id==tid);
 if(view=="track"&&o){stIdx(o)!=lastS?drawTrack():updTrack(o)}
 if(view=="dash")drawDashOrders();
 orders.forEach(x=>{if(!notified[x.id]&&stIdx(x)==5){notified[x.id]=1;if(user&&x.m==user.m&&!(view=="track"&&tid==x.id))toast("Order #"+x.id+" delivered")}})
},1000);
