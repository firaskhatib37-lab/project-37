import { useState, useRef, useEffect } from "react";

const BUSINESSES = [
  { id:1,  nameAR:"صيدلية الأمل",               nameEN:"Amal Pharmacy",               category:"pharmacy",    categoryAR:"صيدلية",    village:"Jiyye",      villageAR:"جية",       phone:"03 123 456", whatsapp:"03 123 456", hours:"8:00 - 21:00",               descAR:"صيدلية متكاملة، توصيل للمنزل، لقاحات ومستلزمات طبية.",         descEN:"Full pharmacy, home delivery, vaccinations & medical supplies.", lat:33.5580, lng:35.3720 },
  { id:2,  nameAR:"صيدلية النور",                nameEN:"Al Nour Pharmacy",            category:"pharmacy",    categoryAR:"صيدلية",    village:"Deir Mimas", villageAR:"دير ميماس", phone:"03 789 012", whatsapp:"03 789 012", hours:"9:00 - 20:00",               descAR:"مجموعة واسعة من الأدوية ومستحضرات التجميل.",                   descEN:"Wide range of medications and cosmetics.", lat:33.5450, lng:35.3800 },
  { id:3,  nameAR:"سوبرماركت الخروب",            nameEN:"Kharoub Supermarket",         category:"supermarket", categoryAR:"سوبرماركت", village:"Jiyye",      villageAR:"جية",       phone:"07 111 222", whatsapp:"07 111 222", hours:"7:00 - 22:00",               descAR:"سوبرماركت كبير، خضار طازجة، لحوم ومواد منزلية.",              descEN:"Large supermarket with fresh produce, meats, and household items.", lat:33.5590, lng:35.3730 },
  { id:4,  nameAR:"ميني ماركت أبو علي",          nameEN:"Abu Ali Mini Market",         category:"supermarket", categoryAR:"بقالة",     village:"Roum",       villageAR:"روم",       phone:"03 333 444", whatsapp:"03 333 444", hours:"8:00 - 23:00",               descAR:"بقالة محلية، خبز طازج وألبان يومياً.",                        descEN:"Local mini market, fresh bread and dairy daily.", lat:33.5510, lng:35.3850 },
  { id:5,  nameAR:"مطعم البحر",                  nameEN:"Al Bahr Restaurant",          category:"restaurant",  categoryAR:"مطعم",      village:"Jiyye",      villageAR:"جية",       phone:"05 444 555", whatsapp:"05 444 555", hours:"12:00 - 23:00",              descAR:"مأكولات بحرية طازجة ومازة لبنانية، تراس مطل على البحر.",      descEN:"Fresh seafood and Lebanese mezze, sea view terrace.", lat:33.5570, lng:35.3710 },
  { id:6,  nameAR:"مطعم أم طوني",                nameEN:"Um Toni Restaurant",          category:"restaurant",  categoryAR:"مطعم",      village:"Deir Mimas", villageAR:"دير ميماس", phone:"03 666 777", whatsapp:"03 666 777", hours:"11:00 - 22:00",              descAR:"أكل بيتي لبناني أصيل. مشهورة بالكبة.",                        descEN:"Authentic home-style Lebanese food. Famous for kibbeh.", lat:33.5440, lng:35.3810 },
  { id:7,  nameAR:"كافيه لبيبة",                 nameEN:"Labiba Café",                 category:"cafe",        categoryAR:"كافيه",     village:"Kfar Matta", villageAR:"كفر متى",   phone:"03 888 999", whatsapp:"03 888 999", hours:"8:00 - 00:00",               descAR:"كافيه مريح، قهوة مختصة، معجنات ووجبات خفيفة.",                descEN:"Cozy café, specialty coffee, pastries and light meals.", lat:33.5630, lng:35.3910 },
  { id:8,  nameAR:"كراج خليل",                   nameEN:"Garage Khalil",               category:"mechanic",    categoryAR:"ميكانيك",   village:"Jiyye",      villageAR:"جية",       phone:"03 456 789", whatsapp:"03 456 789", hours:"الإثنين-السبت 8:00-18:00",   descAR:"جميع إصلاحات السيارات، إطارات، تغيير زيت. خبرة 20 سنة.",      descEN:"All car repairs, tires, oil change. 20 years experience.", lat:33.5585, lng:35.3740 },
  { id:9,  nameAR:"كراج الإخوة",                 nameEN:"Al Ikhwa Garage",             category:"mechanic",    categoryAR:"ميكانيك",   village:"Roum",       villageAR:"روم",       phone:"03 321 654", whatsapp:"03 321 654", hours:"الإثنين-السبت 8:00-19:00",   descAR:"هيكلة، دهان وإصلاحات ميكانيكية.",                             descEN:"Bodywork, painting and mechanical repairs.", lat:33.5500, lng:35.3860 },
  { id:10, nameAR:"عيادة الدكتور سامي",          nameEN:"Dr. Sami Clinic",             category:"clinic",      categoryAR:"عيادة",     village:"Deir Mimas", villageAR:"دير ميماس", phone:"05 112 233", whatsapp:"05 112 233", hours:"الإثنين-الجمعة 9:00-17:00",  descAR:"طبيب عام. استشارات ووصفات طبية.",                              descEN:"General practitioner. Consultations and prescriptions.", lat:33.5445, lng:35.3805 },
  { id:11, nameAR:"عيادة الدكتورة ريما",         nameEN:"Dr. Rima Clinic",             category:"clinic",      categoryAR:"عيادة",     village:"Jiyye",      villageAR:"جية",       phone:"03 445 667", whatsapp:"03 445 667", hours:"ثلاثاء، خميس، سبت 10:00-16:00", descAR:"طب أطفال وطب عائلي.",                                      descEN:"Pediatrics and family medicine.", lat:33.5575, lng:35.3725 },
  { id:12, nameAR:"بقالة الحاج حسن",             nameEN:"Haj Hassan Grocery",          category:"supermarket", categoryAR:"بقالة",     village:"Kfar Matta", villageAR:"كفر متى",   phone:"03 777 888", whatsapp:"03 777 888", hours:"7:00 - 21:00",               descAR:"خضار وفاكهة طازجة ومواد غذائية أساسية.",                      descEN:"Fresh vegetables, fruits and grocery essentials.", lat:33.5620, lng:35.3900 },
  { id:13, nameAR:"المدرسة الرسمية في جية",      nameEN:"Jiyye Official School",       category:"education",   categoryAR:"مدرسة",     village:"Jiyye",      villageAR:"جية",       phone:"05 221 100", whatsapp:"05 221 100", hours:"الإثنين-الجمعة 7:30-14:00",  descAR:"مدرسة رسمية حكومية، ابتدائي ومتوسط وثانوي.",                  descEN:"Official government school, primary to secondary.", lat:33.5595, lng:35.3715 },
  { id:14, nameAR:"مدرسة دير ميماس الخاصة",     nameEN:"Deir Mimas Private School",   category:"education",   categoryAR:"مدرسة",     village:"Deir Mimas", villageAR:"دير ميماس", phone:"05 334 455", whatsapp:"05 334 455", hours:"الإثنين-الجمعة 7:00-14:30",  descAR:"مدرسة خاصة، مناهج لبنانية وأجنبية، كل المراحل.",             descEN:"Private school, Lebanese and foreign curricula.", lat:33.5455, lng:35.3795 },
  { id:15, nameAR:"معهد التدريب المهني",         nameEN:"Vocational Training Institute",category:"education",   categoryAR:"معهد",      village:"Kfar Matta", villageAR:"كفر متى",   phone:"03 556 677", whatsapp:"03 556 677", hours:"الإثنين-السبت 8:00-17:00",   descAR:"دورات مهنية: حلاقة، خياطة، حاسوب، لغات.",                    descEN:"Vocational courses: hairdressing, sewing, computer, languages.", lat:33.5610, lng:35.3895 },
  { id:16, nameAR:"روضة براعم الخروب",           nameEN:"Kharoub Kids Nursery",        category:"education",   categoryAR:"روضة",      village:"Roum",       villageAR:"روم",       phone:"03 998 877", whatsapp:"03 998 877", hours:"الإثنين-الجمعة 7:30-13:00",  descAR:"روضة أطفال معتمدة، برامج تعليمية وترفيهية.",                  descEN:"Licensed nursery, educational and recreational programs.", lat:33.5515, lng:35.3840 },
  { id:17, nameAR:"جمعية إقليم الخروب الخيرية",  nameEN:"Kharoub Charity Association", category:"association", categoryAR:"جمعية",     village:"Jiyye",      villageAR:"جية",       phone:"05 100 200", whatsapp:"05 100 200", hours:"الإثنين-الجمعة 9:00-15:00",  descAR:"دعم الأسر المحتاجة، مساعدات غذائية وطبية واجتماعية.",        descEN:"Supporting needy families with food, medical & social aid.", lat:33.5565, lng:35.3735 },
  { id:18, nameAR:"جمعية المرأة في الخروب",      nameEN:"Kharoub Women Association",   category:"association", categoryAR:"جمعية",     village:"Deir Mimas", villageAR:"دير ميماس", phone:"03 200 300", whatsapp:"03 200 300", hours:"الإثنين-الخميس 10:00-14:00", descAR:"تمكين المرأة، دورات تدريبية، دعم نفسي واجتماعي.",            descEN:"Women empowerment, training courses, social support.", lat:33.5460, lng:35.3820 },
  { id:19, nameAR:"نادي الشباب الخروبي",         nameEN:"Kharoub Youth Club",          category:"association", categoryAR:"نادي",      village:"Kfar Matta", villageAR:"كفر متى",   phone:"03 400 500", whatsapp:"03 400 500", hours:"يومياً 15:00-21:00",          descAR:"أنشطة رياضية وثقافية للشباب، ملاعب وصالة رياضية.",           descEN:"Sports and cultural activities for youth, gym & courts.", lat:33.5625, lng:35.3905 },
  { id:20, nameAR:"اتحاد بلديات إقليم الخروب",  nameEN:"Kharoub Municipalities Union",category:"association", categoryAR:"اتحاد",     village:"Jiyye",      villageAR:"جية",       phone:"05 300 400", whatsapp:"05 300 400", hours:"الإثنين-الجمعة 8:00-14:00",  descAR:"خدمات بلدية، تراخيص، شهادات وخدمات رسمية.",                  descEN:"Municipal services, permits, certificates and official services.", lat:33.5572, lng:35.3718 },
];

const CATS = [
  { key:"all",         ar:"الكل",       en:"All",          icon:"🏙️" },
  { key:"supermarket", ar:"أسواق",      en:"Markets",      icon:"🛒" },
  { key:"restaurant",  ar:"مطاعم",      en:"Restaurants",  icon:"🍽️" },
  { key:"cafe",        ar:"كافيهات",    en:"Cafés",        icon:"☕" },
  { key:"pharmacy",    ar:"صيدليات",    en:"Pharmacies",   icon:"💊" },
  { key:"clinic",      ar:"عيادات",     en:"Clinics",      icon:"🏥" },
  { key:"mechanic",    ar:"ميكانيك",    en:"Mechanics",    icon:"🔧" },
  { key:"education",   ar:"تعليم",      en:"Education",    icon:"🎓" },
  { key:"association", ar:"جمعيات",     en:"Associations", icon:"🤝" },
];

const CCOLOR = { pharmacy:"#e8f5ee", restaurant:"#fff3e0", cafe:"#fce4ec", supermarket:"#e3f2fd", mechanic:"#fff8e1", clinic:"#f3e5f5", education:"#e8eaf6", association:"#e0f7fa" };
const CICON  = { pharmacy:"💊", restaurant:"🍽️", cafe:"☕", supermarket:"🛒", mechanic:"🔧", clinic:"🏥", education:"🎓", association:"🤝" };

const buildSys = () =>
  `أنت مساعد دليل محلي ودود لإقليم الخروب في لبنان.
You are a friendly local directory assistant for Iqlim El Kharoub, Lebanon.
رد دائماً بنفس لغة المستخدم (عربي أو إنجليزي). كن مختصراً وودوداً.
Always reply in the user's language. Be brief and warm.
دائماً اذكر رقم الهاتف والقرية. إذا وجدت أكثر من 3 نتائج، اعرض الأنسب فقط.
Always include phone and village. List max 3 results.
لا تخترع أسماء أو أرقام غير موجودة. إذا لم تجد، اقترح "أضف محلاً".
Never invent data. If not found, suggest adding the business.

DATABASE:
${BUSINESSES.map(b=>`[${b.id}] ${b.nameAR}/${b.nameEN} | ${b.categoryAR} | ${b.villageAR} | ${b.phone} | ${b.hours} | ${b.descAR}`).join("\n")}`;

function sanitize(s){ return s.replace(/<[^>]*>/g,"").replace(/[{}$\\]/g,"").slice(0,400); }
const rl=(()=>{ let c=[]; return ()=>{ const n=Date.now(); c=c.filter(t=>n-t<60000); if(c.length>=10)return false; c.push(n); return true; }; })();

const T=(a,e,ar)=>ar?a:e;

export default function App(){
  const [lang,setLang]=useState("ar");
  const [tab,setTab]=useState("home");
  const [cat,setCat]=useState("all");
  const [search,setSearch]=useState("");
  const [sel,setSel]=useState(null);
  const [msgs,setMsgs]=useState([{role:"assistant",content:"مرحباً بك في دليل إقليم الخروب! 🌿 كيف فيني ساعدك اليوم؟\nWelcome to Kharoub Directory! How can I help you today?"}]);
  const [inp,setInp]=useState("");
  const [busy,setBusy]=useState(false);
  const endRef=useRef(null);
  const isAR=lang==="ar";

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  const hasQuery = search.trim().length > 0;
  const showResults = cat !== "all" || hasQuery;
  const list = !showResults ? [] : BUSINESSES.filter(b=>{
    const mc=cat==="all"||b.category===cat;
    const q=search.trim().toLowerCase();
    return mc&&(!q||b.nameAR.includes(q)||b.nameEN.toLowerCase().includes(q)||b.villageAR.includes(q)||b.village.toLowerCase().includes(q)||b.categoryAR.includes(q)||b.category.includes(q));
  });

  async function send(){
    const c=sanitize(inp.trim());
    if(!c||busy)return;
    if(!rl()){setMsgs(p=>[...p,{role:"assistant",content:T("رسائل كثيرة، انتظر لحظة.","Too many messages, wait a moment.",isAR)}]);setInp("");return;}
    const next=[...msgs,{role:"user",content:c}];
    setMsgs(next);setInp("");setBusy(true);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:buildSys(),messages:next.map(m=>({role:m.role,content:m.content}))})});
      const d=await r.json();
      setMsgs(p=>[...p,{role:"assistant",content:d.content?.[0]?.text||T("عذراً، حدث خطأ.","Sorry, error occurred.",isAR)}]);
    }catch{
      setMsgs(p=>[...p,{role:"assistant",content:T("تعذّر الاتصال.","Connection failed.",isAR)}]);
    }
    setBusy(false);
  }

  const dir=b=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`,"_blank");

  const G="#1a6b3a";
  const nav=[{key:"home",icon:"🏠",ar:"الدليل",en:"Directory"},{key:"map",icon:"🗺️",ar:"الخريطة",en:"Map"},{key:"chat",icon:"🤖",ar:"ذكاء اصطناعي",en:"AI Chat"},{key:"add",icon:"➕",ar:"أضف محل",en:"Add"}];

  return(
    <div style={{fontFamily:"'Segoe UI',Tahoma,Arial,sans-serif",maxWidth:430,margin:"0 auto",minHeight:"100vh",background:"#f5f3ee",direction:isAR?"rtl":"ltr"}}>

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#1a6b3a,#2d9555)",color:"#fff",padding:"14px 16px 10px",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 14px rgba(0,0,0,.18)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:15,fontWeight:800,letterSpacing:.5}}>🛍️ سوق إقليم الخروب</div>
            <div style={{fontSize:11,fontWeight:600,opacity:.9,letterSpacing:1}}>IKLIM KHAROUB SOUK</div>
          </div>
          <button onClick={()=>setLang(l=>l==="ar"?"en":"ar")} style={{background:"rgba(255,255,255,.2)",border:"none",color:"#fff",borderRadius:20,padding:"5px 13px",fontSize:13,cursor:"pointer",fontWeight:700}}>
            {isAR?"EN":"ع"}
          </button>
        </div>
        {tab==="home"&&!sel&&(
          <div style={{marginTop:10,position:"relative"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={T("ابحث عن محل أو خدمة...","Search businesses...",isAR)}
              style={{width:"100%",padding:"9px 14px 9px 36px",borderRadius:25,border:"none",fontSize:13,boxSizing:"border-box",outline:"none",background:"rgba(255,255,255,.95)",direction:isAR?"rtl":"ltr"}}/>
            <span style={{position:"absolute",[isAR?"right":"left"]:12,top:"50%",transform:"translateY(-50%)",fontSize:14,opacity:.5}}>🔍</span>
          </div>
        )}
      </div>

      <div style={{paddingBottom:72}}>

        {/* HOME LIST */}
        {tab==="home"&&!sel&&(
          <div style={{padding:"12px 12px 0"}}>
            <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:6,marginBottom:12,scrollbarWidth:"none"}}>
              {CATS.map(c=>(
                <button key={c.key} onClick={()=>setCat(c.key)}
                  style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"7px 11px",borderRadius:14,border:"none",cursor:"pointer",background:cat===c.key?G:"#fff",color:cat===c.key?"#fff":"#555",boxShadow:"0 1px 4px rgba(0,0,0,.07)",transition:"all .2s"}}>
                  <span style={{fontSize:18}}>{c.icon}</span>
                  <span style={{fontSize:10,fontWeight:600}}>{isAR?c.ar:c.en}</span>
                </button>
              ))}
            </div>
            {!showResults && (
              <div style={{textAlign:"center",paddingBottom:16}}>

                {/* ── HERO BANNER ── */}
                <div style={{position:"relative",overflow:"hidden",borderRadius:"0 0 28px 28px",marginBottom:16,background:"linear-gradient(160deg,#cc0000 0%,#cc0000 18%,#fff 18%,#fff 82%,#cc0000 82%,#cc0000 100%)"}}>
                  {/* Lebanese cedar SVG */}
                  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",display:"block"}}>
                    {/* red stripes */}
                    <rect x="0" y="0" width="400" height="220" fill="none"/>
                    {/* Map outline of Kharoub coastline (stylised) */}
                    <path d="M60,140 Q80,120 110,115 Q140,110 160,118 Q180,126 200,120 Q230,112 260,118 Q290,124 320,115 Q340,108 360,120 L360,170 Q320,160 280,165 Q240,170 200,162 Q160,155 120,165 Q90,172 60,165 Z" fill="#2d9555" opacity="0.18"/>
                    {/* sea */}
                    <path d="M60,165 Q90,172 120,165 Q160,155 200,162 Q240,170 280,165 Q320,160 360,170 L360,200 L60,200 Z" fill="#1565C0" opacity="0.13"/>
                    {/* Cedar tree */}
                    <g transform="translate(200,50)">
                      <polygon points="0,-38 28,10 -28,10" fill="#1a6b3a"/>
                      <polygon points="0,-22 22,14 -22,14" fill="#2d9555" transform="translate(0,10)"/>
                      <polygon points="0,-18 26,16 -26,16" fill="#1a6b3a" transform="translate(0,22)"/>
                      <rect x="-5" y="48" width="10" height="14" fill="#5d4037" rx="2"/>
                    </g>
                    {/* Village dots */}
                    {[[130,130,"جية"],[190,125,"دير ميماس"],[260,132,"روم"],[310,122,"كفر متى"]].map(([x,y,name],i)=>(
                      <g key={i}>
                        <circle cx={x} cy={y} r="5" fill="#cc0000" opacity="0.85"/>
                        <circle cx={x} cy={y} r="2.5" fill="#fff"/>
                        <text x={x} y={y-9} textAnchor="middle" fontSize="8" fill="#333" fontWeight="600">{name}</text>
                      </g>
                    ))}
                    {/* Tagline */}
                    <text x="200" y="195" textAnchor="middle" fontSize="11" fill="#cc0000" fontWeight="800" letterSpacing="1.5">IKLIM KHAROUB SOUK</text>
                  </svg>
                </div>

                {/* ── TAGLINE CARD ── */}
                <div style={{margin:"0 12px 16px",background:"linear-gradient(135deg,#cc0000,#a30000)",borderRadius:18,padding:"18px 16px",boxShadow:"0 4px 20px rgba(204,0,0,.25)",position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:-20,right:-20,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,.08)"}}/>
                  <div style={{position:"absolute",bottom:-30,left:-10,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,.05)"}}/>
                  <div style={{fontSize:22,marginBottom:6}}>🛍️</div>
                  <div style={{fontSize:16,fontWeight:800,color:"#fff",lineHeight:1.4,marginBottom:4}}>كل ما تحتاجه في</div>
                  <div style={{fontSize:20,fontWeight:900,color:"#fff",letterSpacing:.5,marginBottom:4}}>سوق إقليم الخروب</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.75)",letterSpacing:2,marginBottom:12}}>ALL YOU NEED IN MARKET IKILM KHAROUB</div>
                  <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                    {[["🏪","20+","محل"],["🏘️","4","قرى"],["🤖","AI","مساعد"]].map(([ic,n,lb],i)=>(
                      <div key={i} style={{background:"rgba(255,255,255,.15)",borderRadius:12,padding:"8px 14px",textAlign:"center"}}>
                        <div style={{fontSize:16}}>{ic}</div>
                        <div style={{fontSize:14,fontWeight:800,color:"#fff"}}>{n}</div>
                        <div style={{fontSize:9,color:"rgba(255,255,255,.8)"}}>{lb}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── CATEGORY GRID ── */}
                <div style={{margin:"0 12px",marginBottom:8}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#333",textAlign:isAR?"right":"left",marginBottom:10}}>
                    {T("تصفح حسب الفئة","Browse by category",isAR)}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                    {CATS.filter(c=>c.key!=="all").map((c,i)=>{
                      const bgs=["#ffeaea","#fff3e0","#fce4ec","#e3f2fd","#e8f5ee","#fff8e1","#e8eaf6","#e0f7fa"];
                      const bds=["#ffb3b3","#ffd180","#f48fb1","#90caf9","#a5d6a7","#fff176","#9fa8da","#80deea"];
                      const tcs=["#c62828","#e65100","#880e4f","#1565c0","#2e7d32","#f57f17","#283593","#00695c"];
                      return(
                        <button key={c.key} onClick={()=>setCat(c.key)}
                          style={{background:bgs[i]||"#f5f5f5",border:`1.5px solid ${bds[i]||"#ddd"}`,borderRadius:14,padding:"12px 6px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:"0 2px 8px rgba(0,0,0,.07)",transition:"transform .15s"}}
                          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                          <span style={{fontSize:24}}>{c.icon}</span>
                          <span style={{fontSize:10,fontWeight:700,color:tcs[i]||"#333"}}>{isAR?c.ar:c.en}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── LEBANESE FLAG STRIP ── */}
                <div style={{margin:"16px 12px 0",borderRadius:12,overflow:"hidden",display:"flex",height:6}}>
                  <div style={{flex:1,background:"#cc0000"}}/>
                  <div style={{flex:1,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <div style={{width:8,height:8,background:"#1a6b3a",clipPath:"polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"}}/>
                  </div>
                  <div style={{flex:1,background:"#cc0000"}}/>
                </div>

              </div>
            )}
            {showResults && <div style={{fontSize:11,color:"#999",marginBottom:8}}>{list.length} {T("نتيجة","results",isAR)}</div>}
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {list.map(b=>(
                <div key={b.id} onClick={()=>setSel(b)}
                  style={{background:"#fff",borderRadius:14,padding:"12px 14px",boxShadow:"0 1px 5px rgba(0,0,0,.06)",cursor:"pointer",display:"flex",alignItems:"center",gap:12,border:"1px solid #ede9e1",transition:"transform .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                  <div style={{width:46,height:46,borderRadius:12,background:CCOLOR[b.category]||"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{CICON[b.category]||"🏪"}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:14,color:"#111"}}>{isAR?b.nameAR:b.nameEN}</div>
                    <div style={{fontSize:11,color:"#888",marginTop:2}}>📍 {isAR?b.villageAR:b.village}</div>
                    <div style={{fontSize:11,color:"#bbb",marginTop:1}}>🕐 {b.hours}</div>
                  </div>
                  <span style={{color:"#ddd",fontSize:18}}>{isAR?"‹":"›"}</span>
                </div>
              ))}
              {list.length===0&&<div style={{textAlign:"center",padding:"40px 20px",color:"#aaa"}}><div style={{fontSize:36,marginBottom:8}}>🔍</div><div style={{fontSize:13}}>{T("لا توجد نتائج","No results found",isAR)}</div></div>}
            </div>
          </div>
        )}

        {/* DETAIL */}
        {tab==="home"&&sel&&(
          <div style={{padding:"12px 12px 0"}}>
            <button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:G,fontSize:13,fontWeight:700,cursor:"pointer",marginBottom:12,padding:0}}>{T("رجوع →","← Back",isAR)}</button>
            <div style={{background:"#fff",borderRadius:18,overflow:"hidden",boxShadow:"0 2px 14px rgba(0,0,0,.09)"}}>
              <div style={{background:CCOLOR[sel.category]||"#f5",padding:"24px 18px",display:"flex",alignItems:"center",gap:14}}>
                <div style={{fontSize:42}}>{CICON[sel.category]||"🏪"}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:17,color:"#111"}}>{isAR?sel.nameAR:sel.nameEN}</div>
                  <div style={{fontSize:12,color:"#666",marginTop:2}}>{isAR?sel.categoryAR:sel.category}</div>
                </div>
              </div>
              <div style={{padding:"16px 18px"}}>
                <R icon="📍" label={T("القرية","Village",isAR)} val={isAR?sel.villageAR:sel.village}/>
                <R icon="🕐" label={T("أوقات العمل","Hours",isAR)} val={sel.hours}/>
                <R icon="📞" label={T("هاتف","Phone",isAR)} val={sel.phone}/>
                <div style={{marginTop:14,background:"#f7f5f0",borderRadius:10,padding:"11px 13px",fontSize:13,color:"#555",lineHeight:1.65}}>{isAR?sel.descAR:sel.descEN}</div>
                {/* Embedded map */}
                <div style={{marginTop:14,borderRadius:12,overflow:"hidden",border:"1px solid #e5e0d8"}}>
                  <iframe title="loc" width="100%" height="160" style={{border:0,display:"block"}} loading="lazy"
                    src={`https://maps.google.com/maps?q=${sel.lat},${sel.lng}&z=16&output=embed`}/>
                </div>
                <div style={{display:"flex",gap:8,marginTop:14}}>
                  <a href={`tel:${sel.phone}`} style={{flex:1,background:G,color:"#fff",borderRadius:12,padding:"12px 6px",textAlign:"center",textDecoration:"none",fontWeight:700,fontSize:13}}>📞 {T("اتصل","Call",isAR)}</a>
                  <a href={`https://wa.me/961${sel.whatsapp.replace(/\s/g,"")}`} target="_blank" rel="noreferrer" style={{flex:1,background:"#25D366",color:"#fff",borderRadius:12,padding:"12px 6px",textAlign:"center",textDecoration:"none",fontWeight:700,fontSize:13}}>💬 WhatsApp</a>
                  <button onClick={()=>dir(sel)} style={{flex:1,background:"#1565C0",color:"#fff",borderRadius:12,padding:"12px 6px",border:"none",fontWeight:700,fontSize:13,cursor:"pointer"}}>🗺️ {T("الاتجاهات","Directions",isAR)}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MAP */}
        {tab==="map"&&(
          <div style={{padding:"12px 12px 0"}}>
            <div style={{borderRadius:14,overflow:"hidden",boxShadow:"0 2px 10px rgba(0,0,0,.1)",marginBottom:12}}>
              <iframe title="kharoub" width="100%" height="260" style={{border:0,display:"block"}} loading="lazy"
                src="https://maps.google.com/maps?q=Iqlim+El+Kharoub,Lebanon&z=13&output=embed"/>
            </div>
            <div style={{fontSize:11,color:"#999",textAlign:"center",marginBottom:10}}>{T("اضغط لفتح الاتجاهات في Google Maps","Tap to open directions in Google Maps",isAR)}</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {BUSINESSES.map(b=>(
                <div key={b.id} onClick={()=>dir(b)} style={{background:"#fff",borderRadius:12,padding:"10px 13px",display:"flex",alignItems:"center",gap:11,boxShadow:"0 1px 4px rgba(0,0,0,.06)",cursor:"pointer",border:"1px solid #ede9e1"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:CCOLOR[b.category]||"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{CICON[b.category]||"🏪"}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:13,color:"#111"}}>{isAR?b.nameAR:b.nameEN}</div>
                    <div style={{fontSize:11,color:"#999"}}>📍 {isAR?b.villageAR:b.village}</div>
                  </div>
                  <span style={{fontSize:15,color:"#1565C0"}}>🗺️</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHAT */}
        {tab==="chat"&&(
          <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 128px)"}}>
            <div style={{flex:1,overflowY:"auto",padding:"12px 12px 0"}}>
              <div style={{textAlign:"center",marginBottom:14}}>
                <div style={{display:"inline-block",background:"#e8f5ee",color:G,borderRadius:20,padding:"4px 14px",fontSize:11,fontWeight:700}}>🤖 {T("مساعد ذكي — بدعم كلود","AI Assistant — Powered by Claude",isAR)}</div>
              </div>
              {msgs.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?(isAR?"flex-start":"flex-end"):(isAR?"flex-end":"flex-start"),marginBottom:9}}>
                  {m.role==="assistant"&&<div style={{width:26,height:26,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,[isAR?"marginLeft":"marginRight"]:7,flexShrink:0,alignSelf:"flex-end"}}>🌿</div>}
                  <div style={{maxWidth:"76%",padding:"10px 13px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?G:"#fff",color:m.role==="user"?"#fff":"#111",fontSize:13,lineHeight:1.6,boxShadow:"0 1px 4px rgba(0,0,0,.07)",direction:"auto",whiteSpace:"pre-wrap"}}>
                    {m.content}
                  </div>
                </div>
              ))}
              {busy&&(
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
                  <div style={{width:26,height:26,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center"}}>🌿</div>
                  <div style={{background:"#fff",borderRadius:18,padding:"10px 14px",boxShadow:"0 1px 4px rgba(0,0,0,.07)"}}>
                    {[0,1,2].map(i=><span key={i} style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:G,margin:"0 2px",animation:`bounce 1s ${i*.2}s infinite`}}/>)}
                  </div>
                </div>
              )}
              <div ref={endRef}/>
            </div>
            <div style={{padding:"8px 12px 0",display:"flex",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
              {(isAR?["وين فيني لاقي صيدلية؟","أحسن مطعم بالجية؟","كراج قريب مني","مدارس بالخروب","جمعيات خيرية","روضة أطفال"]:["Where is a pharmacy?","Best restaurant in Jiyye?","Find a mechanic","Schools in Kharoub","Charity associations","Kids nursery"]).map(q=>(
                <button key={q} onClick={()=>setInp(q)} style={{flexShrink:0,background:"#e8f5ee",border:"none",color:G,borderRadius:20,padding:"5px 11px",fontSize:11,cursor:"pointer",fontWeight:600,whiteSpace:"nowrap"}}>{q}</button>
              ))}
            </div>
            <div style={{padding:"8px 12px 12px",display:"flex",gap:8}}>
              <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
                placeholder={T("اسأل عن الخروب...","Ask about Kharoub...",isAR)}
                style={{flex:1,padding:"10px 13px",borderRadius:25,border:"1.5px solid #ddd",fontSize:13,outline:"none",direction:isAR?"rtl":"ltr",background:"#fff"}}/>
              <button onClick={send} disabled={busy||!inp.trim()} style={{width:42,height:42,borderRadius:"50%",border:"none",background:busy||!inp.trim()?"#ccc":G,color:"#fff",fontSize:18,cursor:busy||!inp.trim()?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {isAR?"←":"→"}
              </button>
            </div>
          </div>
        )}

        {/* ADD */}
        {tab==="add"&&(
          <div style={{padding:"12px 12px 0"}}>
            <div style={{background:"#fff",borderRadius:18,padding:"18px 16px",boxShadow:"0 2px 12px rgba(0,0,0,.08)"}}>
              <h3 style={{margin:"0 0 4px",fontSize:16,color:"#111"}}>➕ {T("أضف محلك","Add Your Business",isAR)}</h3>
              <p style={{fontSize:12,color:"#888",marginBottom:16}}>{T("غير موجود في الدليل؟ أضفه مجاناً!","Not listed? Add it for free!",isAR)}</p>
              {[[T("اسم المحل بالعربي","Business Name (Arabic)",isAR),"text"],[T("اسم المحل بالإنجليزي","Business Name (English)",isAR),"text"],[T("رقم الهاتف / واتساب","Phone / WhatsApp",isAR),"tel"],[T("القرية / المنطقة","Village / Area",isAR),"text"],[T("أوقات العمل","Opening Hours",isAR),"text"]].map(([lbl,typ],i)=>(
                <div key={i} style={{marginBottom:12}}>
                  <label style={{fontSize:12,fontWeight:600,color:"#555",display:"block",marginBottom:4}}>{lbl}</label>
                  <input type={typ} style={{width:"100%",padding:"9px 12px",borderRadius:10,border:"1.5px solid #e5e5e5",fontSize:13,outline:"none",direction:isAR?"rtl":"ltr",boxSizing:"border-box"}}/>
                </div>
              ))}
              <div style={{marginBottom:12}}>
                <label style={{fontSize:12,fontWeight:600,color:"#555",display:"block",marginBottom:4}}>{T("الفئة","Category",isAR)}</label>
                <select style={{width:"100%",padding:"9px 12px",borderRadius:10,border:"1.5px solid #e5e5e5",fontSize:13,outline:"none",background:"#fff",direction:isAR?"rtl":"ltr"}}>
                  <option value="">{T("اختر الفئة","Select category",isAR)}</option>
                  {CATS.filter(c=>c.key!=="all").map(c=><option key={c.key} value={c.key}>{c.icon} {isAR?c.ar:c.en}</option>)}
                </select>
              </div>
              <div style={{marginBottom:16}}>
                <label style={{fontSize:12,fontWeight:600,color:"#555",display:"block",marginBottom:4}}>{T("وصف مختصر","Short Description",isAR)}</label>
                <textarea rows={3} style={{width:"100%",padding:"9px 12px",borderRadius:10,border:"1.5px solid #e5e5e5",fontSize:13,outline:"none",resize:"vertical",direction:isAR?"rtl":"ltr",boxSizing:"border-box"}}/>
              </div>
              <button style={{width:"100%",background:G,color:"#fff",border:"none",borderRadius:12,padding:13,fontWeight:700,fontSize:14,cursor:"pointer"}}>✅ {T("أرسل المعلومات","Submit",isAR)}</button>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"#fff",borderTop:"1px solid #eee",display:"flex",boxShadow:"0 -2px 14px rgba(0,0,0,.09)",zIndex:100}}>
        {nav.map(n=>(
          <button key={n.key} onClick={()=>{setTab(n.key);setSel(null);}} style={{flex:1,padding:"9px 5px 11px",border:"none",background:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,color:tab===n.key?G:"#bbb",transition:"color .2s"}}>
            <span style={{fontSize:20}}>{n.icon}</span>
            <span style={{fontSize:9,fontWeight:700}}>{isAR?n.ar:n.en}</span>
            {tab===n.key&&<div style={{width:18,height:2.5,borderRadius:2,background:G}}/>}
          </button>
        ))}
      </div>

      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}

function R({icon,label,val}){
  return(
    <div style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #f5f3ee"}}>
      <span style={{fontSize:13,color:"#888"}}>{icon} {label}</span>
      <span style={{fontSize:13,fontWeight:600,color:"#111"}}>{val}</span>
    </div>
  );
}
