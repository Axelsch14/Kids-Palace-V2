import { useState, useEffect } from 'react';

const CONFIG = {
  name: 'Kids Palace',
  address: '39 rue du Moulin des Bruyères, 92400 Courbevoie',
  phone: '06 95 26 86 54',
  phoneLink: 'tel:0695268654',
  whatsapp: 'https://wa.me/33695268654?text=Bonjour%20Kids%20Palace%2C%20je%20souhaite%20avoir%20plus%20d%27informations%20%F0%9F%8E%AA',
  email: 'kidspalace@free.fr',
  googleMaps: 'https://maps.google.com/?q=39+rue+du+Moulin+des+Bruyeres+92400+Courbevoie',
};

const PHOTOS = [
  { src: '/photo1.jpeg', label: 'Toboggans géants' },
  { src: '/photo5.jpeg', label: 'Piscine à balles' },
  { src: '/photo2.jpeg', label: 'Parcours aventure' },
  { src: '/photo4.jpeg', label: 'Espace de jeux' },
  { src: '/photo3.jpeg', label: 'Structures de grimpe' },
];

const TARIFS = [
  { icon: '🌅', label: 'Matin', detail: 'Sortie avant 14h', price: '10€', sub: 'Adultes gratuit', bg: '#FFD93D', color: '#2D2D2D' },
  { icon: '☀️', label: 'Après-midi', detail: 'À partir de 14h', price: '12€', sub: 'Adultes gratuit', bg: '#FF6B35', color: '#fff', highlight: true },
  { icon: '🎟️', label: 'Abonnement', detail: '7 entrées valables', price: '69€', sub: 'Économisez 15€', bg: '#7C5CFF', color: '#fff' },
];

const FORMULES = [
  { id: 'birthday', icon: '🎂', name: 'Palace Birthday', price: 17, color: '#FF6B9D', features: ['À partir de 3 ans', 'Minimum 8 enfants', '2h30 de jeux', 'Salle privative 1h30', 'Boissons + gobelets', 'Invitations offertes'] },
  { id: 'inclusive', icon: '🎉', name: 'Palace All Inclusive', price: 20, color: '#FF6B35', highlight: true, features: ['À partir de 3 ans', 'Minimum 8 enfants', '2h30 de jeux', 'Salle privative 1h30', 'Gâteau + bougies inclus', 'Bonbons + boissons'] },
  { id: 'boum', icon: '🕺', name: 'Palace Boum', price: 18, color: '#7C5CFF', features: ['À partir de 3 ans', 'Minimum 15 enfants', 'Vendredi soir 19h30–22h', 'Piste de danse + jeux', '2h30 en soirée', 'Boissons + gobelets'] },
];

const CRENEAUX = ['10h00 – 12h30', '12h00 – 14h30', '14h00 – 16h30', '16h00 – 18h30'];

const HORAIRES_SCOLAIRE = [
  { jour: 'Mercredi', h: '10h–19h', open: true },
  { jour: 'Vendredi', h: '14h–19h', open: true },
  { jour: 'Samedi', h: '10h–19h', open: true },
  { jour: 'Dimanche', h: '10h–19h', open: true },
  { jour: 'Lundi · Mardi · Jeudi', h: 'Fermé', open: false },
];

const S = { maxW: { maxWidth: 1160, margin: '0 auto', padding: '0 24px' } };
const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS = ['Lu','Ma','Me','Je','Ve','Sa','Di'];

/* ── NAV ── */
function Nav({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const links = [['espaces','🎠 Le parc'],['tarifs','💰 Tarifs'],['anniversaires','🎂 Anniversaires'],['horaires','🕐 Horaires']];
  return (
    <>
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, background: scrolled||menuOpen ? 'rgba(255,253,247,0.97)':'transparent', backdropFilter: scrolled||menuOpen ? 'blur(20px)':'none', borderBottom: scrolled||menuOpen ? '2px solid var(--yellow)':'none', transition:'all 0.35s ease' }}>
        <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 20px', display:'flex', alignItems:'center', justifyContent:'space-between', height:66 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }} onClick={() => { window.scrollTo({top:0,behavior:'smooth'}); setMenuOpen(false); }}>
            <span style={{ fontSize:26, animation:'wiggle 2.5s ease-in-out infinite' }}>🎪</span>
            <div>
              <div style={{ fontFamily:'var(--baloo)', fontSize:18, fontWeight:800, color:'var(--orange)', lineHeight:1 }}>Kids Palace</div>
              <div style={{ fontSize:9, color:'var(--text-secondary)', letterSpacing:1 }}>COURBEVOIE · 0 – 11 ANS</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <a href={CONFIG.phoneLink} style={{ background:'var(--orange)', color:'white', borderRadius:24, padding:'8px 16px', fontSize:13, fontWeight:700, textDecoration:'none', fontFamily:'var(--baloo)' }}>📞 Appeler</a>
            <button onClick={() => setMenuOpen(o=>!o)} style={{ background: menuOpen ? 'var(--yellow)':'rgba(255,107,53,0.1)', border:'none', borderRadius:10, width:42, height:42, fontSize:18, cursor:'pointer', transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center' }}>{menuOpen ? '✕':'☰'}</button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background:'rgba(255,253,247,0.98)', borderTop:'1px solid var(--border)', padding:'12px 20px 20px' }}>
            {links.map(([id,label]) => (
              <button key={id} onClick={() => go(id)} style={{ display:'block', width:'100%', textAlign:'left', background:'none', border:'none', fontSize:16, fontWeight:600, color:'var(--text)', padding:'14px 12px', borderRadius:12, borderBottom:'1px solid var(--border)', cursor:'pointer', fontFamily:'var(--baloo)' }}>{label}</button>
            ))}
            <button onClick={() => go('reservation')} style={{ display:'block', width:'100%', marginTop:12, background:'var(--pink)', color:'white', border:'none', borderRadius:16, padding:'13px', fontSize:15, fontWeight:700, fontFamily:'var(--baloo)', cursor:'pointer' }}>🎂 Réserver un anniversaire</button>
          </div>
        )}
      </nav>
    </>
  );
}

/* ── HERO ── */
function Hero() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
  const jour = new Date().getDay();
  const joursOuverts = [0,3,5,6];
  const isOpen = joursOuverts.includes(jour);
  return (
    <section style={{ minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'url(/photo1.jpeg)', backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.35)' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(26,26,46,0.95) 50%, rgba(26,26,46,0.4) 100%)' }} />
      {[{e:'⭐',t:'15%',l:'55%',s:36,d:'0s'},{e:'🎈',t:'20%',l:'75%',s:44,d:'0.7s'},{e:'🌈',t:'65%',l:'60%',s:40,d:'1.2s'},{e:'🎊',t:'75%',l:'80%',s:32,d:'0.3s'}].map(({e,t,l,s,d}) => (
        <div key={e} style={{ position:'absolute', top:t, left:l, fontSize:s, animation:`float 3s ease-in-out ${d} infinite`, pointerEvents:'none', zIndex:2 }}>{e}</div>
      ))}
      <div style={{ ...S.maxW, width:'100%', position:'relative', zIndex:3, padding:'140px 24px 80px' }}>
        <div style={{ maxWidth:640 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,217,61,0.15)', border:'1px solid rgba(255,217,61,0.4)', borderRadius:24, padding:'8px 20px', marginBottom:32 }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background: isOpen ? '#6BCB77':'#FF6B9D', display:'inline-block', boxShadow: isOpen ? '0 0 8px #6BCB77':'0 0 8px #FF6B9D' }} />
            <span style={{ fontFamily:'var(--baloo)', fontSize:14, fontWeight:600, color:'var(--yellow)' }}>
              {isOpen ? "Ouvert aujourd'hui · Venez jouer ! 🎉" : "Fermé aujourd'hui · On se retrouve bientôt ! 👋"}
            </span>
          </div>
          <h1 style={{ fontFamily:'var(--baloo)', fontSize:'clamp(38px, 7vw, 72px)', fontWeight:800, lineHeight:1.1, color:'white', marginBottom:20 }}>
            Le paradis des<br /><span style={{ color:'var(--yellow)' }}>petits aventuriers</span><br />à Courbevoie ! 🎪
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.65)', lineHeight:1.8, marginBottom:40, maxWidth:480 }}>
            Parc de jeux intérieur pour les <strong style={{ color:'white' }}>0 à 11 ans</strong>. Toboggans géants, piscine à balles, parcours d'aventure… et les parents se détendent au café ! ☕
          </p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:56 }}>
            <button onClick={() => go('reservation')} style={{ background:'var(--pink)', color:'white', border:'none', padding:'15px 32px', borderRadius:32, fontSize:16, fontWeight:700, boxShadow:'0 8px 32px rgba(255,107,157,0.5)', transition:'transform 0.2s', fontFamily:'var(--baloo)' }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
            >🎂 Réserver un anniversaire</button>
            <button onClick={() => go('tarifs')} style={{ background:'var(--yellow)', color:'var(--dark)', border:'none', padding:'15px 32px', borderRadius:32, fontSize:16, fontWeight:700, fontFamily:'var(--baloo)', transition:'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
            >💰 Voir les tarifs</button>
          </div>
          <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
            {[['🧒','0 – 11 ans'],['🎢','Toboggans géants'],['🎱','Piscine à balles'],['🎂','3 formules anniv.']].map(([icon,label]) => (
              <div key={label} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:20 }}>{icon}</span>
                <span style={{ fontSize:13, color:'rgba(255,255,255,0.65)', fontWeight:500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', textAlign:'center', zIndex:3 }}>
        <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', letterSpacing:2, textTransform:'uppercase', marginBottom:8 }}>Découvrir</div>
        <div style={{ width:1, height:40, background:'linear-gradient(to bottom, rgba(255,217,61,0.6), transparent)', margin:'0 auto' }} />
      </div>
    </section>
  );
}

/* ── GALERIE ── */
function Galerie() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="espaces" style={{ padding:'96px 24px', background:'var(--dark)' }}>
      <div style={S.maxW}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ display:'inline-block', background:'var(--yellow)', color:'var(--dark)', borderRadius:12, padding:'4px 16px', fontSize:11, fontWeight:700, letterSpacing:2, textTransform:'uppercase', marginBottom:12 }}>Le parc en images</div>
          <h2 style={{ fontFamily:'var(--baloo)', fontSize:'clamp(28px, 5vw, 44px)', fontWeight:800, color:'white', marginBottom:12 }}>Une aventure à chaque coin ! 🗺️</h2>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.45)', maxWidth:480, margin:'0 auto' }}>Glisser, grimper, plonger dans la piscine à balles… des heures de bonheur garanti !</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(12, 1fr)', gap:12 }}>
          {PHOTOS.map((photo, i) => {
            const configs = [{col:'1/8',row:'1/3',height:420},{col:'8/13',row:'1/2',height:200},{col:'8/13',row:'2/3',height:200},{col:'1/5',row:'3/4',height:220},{col:'5/13',row:'3/4',height:220}];
            const cfg = configs[i];
            return (
              <div key={i} onClick={() => setSelected(photo)} style={{ gridColumn:cfg.col, gridRow:cfg.row, height:cfg.height, borderRadius:16, overflow:'hidden', cursor:'pointer', position:'relative', transition:'transform 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.transform='scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
              >
                <img src={photo.src} alt={photo.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
            );
          })}
        </div>
        {selected && (
          <div onClick={() => setSelected(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', padding:24, cursor:'zoom-out' }}>
            <img src={selected.src} alt={selected.label} style={{ maxWidth:'90vw', maxHeight:'85vh', borderRadius:16, objectFit:'contain' }} />
            <button onClick={() => setSelected(null)} style={{ position:'absolute', top:24, right:24, background:'rgba(255,255,255,0.15)', border:'none', color:'white', fontSize:24, width:48, height:48, borderRadius:'50%', cursor:'pointer' }}>✕</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── TARIFS ── */
function Tarifs() {
  return (
    <section id="tarifs" style={{ padding:'96px 24px', background:'var(--light)' }}>
      <div style={S.maxW}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ display:'inline-block', background:'var(--orange)', color:'white', borderRadius:12, padding:'4px 16px', fontSize:11, fontWeight:700, letterSpacing:2, textTransform:'uppercase', marginBottom:12 }}>Tarifs</div>
          <h2 style={{ fontFamily:'var(--baloo)', fontSize:'clamp(28px, 5vw, 44px)', fontWeight:800, marginBottom:8 }}>Des prix pour toute la famille 💛</h2>
          <p style={{ fontSize:15, color:'var(--text-secondary)' }}>Les adultes accompagnateurs entrent <strong>gratuitement</strong> !</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:24, marginBottom:32 }}>
          {TARIFS.map(({ icon, label, detail, price, sub, bg, color, highlight }) => (
            <div key={label} style={{ background:bg, borderRadius:28, padding:'2.5rem 2rem', textAlign:'center', boxShadow: highlight ? `0 16px 48px ${bg}60`:`0 6px 24px ${bg}30`, transform: highlight ? 'scale(1.05)':'scale(1)', transition:'transform 0.2s' }}
              onMouseEnter={e => !highlight && (e.currentTarget.style.transform='scale(1.03)')}
              onMouseLeave={e => !highlight && (e.currentTarget.style.transform='scale(1)')}
            >
              <div style={{ fontSize:52, marginBottom:12 }}>{icon}</div>
              <div style={{ fontFamily:'var(--baloo)', fontSize:22, fontWeight:800, color, marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:13, color, opacity:0.75, marginBottom:20 }}>{detail}</div>
              <div style={{ fontFamily:'var(--baloo)', fontSize:60, fontWeight:800, color, lineHeight:1, marginBottom:8 }}>{price}</div>
              <div style={{ fontSize:13, color, opacity:0.75, fontWeight:500 }}>{sub}</div>
            </div>
          ))}
        </div>
        <div style={{ background:'white', borderRadius:20, padding:'1.25rem 2rem', border:'2px dashed var(--border)', display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
          <span style={{ fontSize:32 }}>🧦</span>
          <p style={{ fontSize:14, color:'var(--text-secondary)' }}><strong style={{ color:'var(--text)' }}>N'oubliez pas vos chaussettes !</strong> Obligatoires pour accéder aux structures. En vente sur place si besoin.</p>
        </div>
      </div>
    </section>
  );
}

/* ── ANNIVERSAIRES ── */
function Anniversaires() {
  const go = () => document.getElementById('reservation')?.scrollIntoView({ behavior:'smooth' });
  return (
    <section id="anniversaires" style={{ padding:'96px 24px', background:'white' }}>
      <div style={S.maxW}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ display:'inline-block', background:'var(--pink)', color:'white', borderRadius:12, padding:'4px 16px', fontSize:11, fontWeight:700, letterSpacing:2, textTransform:'uppercase', marginBottom:12 }}>Anniversaires</div>
          <h2 style={{ fontFamily:'var(--baloo)', fontSize:'clamp(28px, 5vw, 44px)', fontWeight:800, marginBottom:12 }}>Un anniversaire inoubliable ! 🎉</h2>
          <p style={{ fontSize:15, color:'var(--text-secondary)', maxWidth:520, margin:'0 auto' }}>Choisis ta formule et passe le plus merveilleux des anniversaires avec tes copains !</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(290px, 1fr))', gap:24, marginBottom:32 }}>
          {FORMULES.map(({ icon, name, price, color, highlight, features }) => (
            <div key={name} style={{ borderRadius:24, overflow:'hidden', border: highlight ? 'none':'2px solid var(--border)', boxShadow: highlight ? `0 20px 60px ${color}40`:'0 4px 20px rgba(0,0,0,0.06)', transform: highlight ? 'scale(1.04)':'scale(1)', transition:'transform 0.25s' }}>
              <div style={{ background:color, padding:'2rem', textAlign:'center' }}>
                {highlight && <div style={{ fontSize:11, letterSpacing:2, color:'rgba(255,255,255,0.8)', textTransform:'uppercase', marginBottom:8 }}>⭐ Le plus choisi</div>}
                <div style={{ fontSize:52, marginBottom:10 }}>{icon}</div>
                <div style={{ fontFamily:'var(--baloo)', fontSize:20, fontWeight:800, color:'white', marginBottom:6 }}>{name}</div>
                <div style={{ fontFamily:'var(--baloo)', fontSize:36, fontWeight:800, color:'white' }}>{price}€<span style={{ fontSize:14, fontWeight:500 }}>/enfant</span></div>
              </div>
              <div style={{ background:'white', padding:'1.75rem' }}>
                {features.map(f => (
                  <div key={f} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:10 }}>
                    <span style={{ color, fontSize:16, flexShrink:0, marginTop:1 }}>✓</span>
                    <span style={{ fontSize:14, color:'var(--text)', lineHeight:1.4 }}>{f}</span>
                  </div>
                ))}
                <button onClick={go} style={{ display:'block', width:'100%', textAlign:'center', marginTop:20, background:color, color:'white', borderRadius:16, padding:'12px', fontSize:14, fontWeight:700, border:'none', fontFamily:'var(--baloo)', cursor:'pointer', transition:'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity='0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity='1'}
                >📅 Réserver cette formule</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:'linear-gradient(135deg, #FFE8F0, #FFF0D0)', borderRadius:20, padding:'1.25rem 2rem', border:'2px solid #FFD0E8', display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
          <span style={{ fontSize:32 }}>👨‍👩‍👧</span>
          <p style={{ fontSize:14, color:'var(--text-secondary)' }}><strong style={{ color:'var(--text)' }}>2 adultes accompagnateurs acceptés.</strong> Minimum 8 enfants (15 pour Palace Boum). Les invitations sont téléchargeables gratuitement.</p>
        </div>
      </div>
    </section>
  );
}

/* ── CALENDRIER ── */
function Calendrier({ selectedDate, onSelect }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const isAvailable = (year, month, day) => {
    const date = new Date(year, month, day);
    const dow = date.getDay();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (date < todayStart) return false;
    return dow === 0 || dow === 3 || dow === 5 || dow === 6;
  };

  const isSameDay = (year, month, day) => {
    if (!selectedDate) return false;
    return selectedDate.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === day;
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  return (
    <div style={{ background:'white', borderRadius:16, border:'2px solid var(--border)', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', background:'var(--dark)', color:'white' }}>
        <button onClick={prevMonth} style={{ background:'rgba(255,255,255,0.1)', border:'none', color:'white', borderRadius:8, width:32, height:32, cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>‹</button>
        <span style={{ fontFamily:'var(--baloo)', fontSize:16, fontWeight:700 }}>{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} style={{ background:'rgba(255,255,255,0.1)', border:'none', color:'white', borderRadius:8, width:32, height:32, cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>›</button>
      </div>
      {/* Légende */}
      <div style={{ display:'flex', gap:16, padding:'10px 16px', background:'#f9f8f6', borderBottom:'1px solid var(--border)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}><div style={{ width:12, height:12, borderRadius:'50%', background:'var(--green)' }}/><span style={{ fontSize:11, color:'var(--text-secondary)' }}>Disponible</span></div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}><div style={{ width:12, height:12, borderRadius:'50%', background:'#ddd' }}/><span style={{ fontSize:11, color:'var(--text-secondary)' }}>Indisponible</span></div>
      </div>
      {/* Jours de la semaine */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7, 1fr)', padding:'8px 8px 0' }}>
        {DAYS.map(d => <div key={d} style={{ textAlign:'center', fontSize:11, fontWeight:600, color:'var(--text-secondary)', padding:'4px 0' }}>{d}</div>)}
      </div>
      {/* Jours */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:2, padding:'4px 8px 12px' }}>
        {Array(firstDay).fill(null).map((_,i) => <div key={`e${i}`} />)}
        {Array(daysInMonth).fill(null).map((_,i) => {
          const day = i + 1;
          const avail = isAvailable(viewYear, viewMonth, day);
          const selected = isSameDay(viewYear, viewMonth, day);
          const isPast = new Date(viewYear, viewMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          return (
            <button key={day} onClick={() => avail && onSelect(new Date(viewYear, viewMonth, day))}
              style={{
                aspectRatio:'1', borderRadius:8, border:'none', cursor: avail ? 'pointer':'default',
                fontFamily:'var(--baloo)', fontSize:14, fontWeight: avail ? 700:400,
                background: selected ? 'var(--orange)' : avail ? 'var(--green)' : isPast ? 'transparent' : '#f0f0f0',
                color: selected ? 'white' : avail ? 'white' : isPast ? '#ccc' : '#aaa',
                transition:'transform 0.1s',
              }}
              onMouseEnter={e => avail && (e.currentTarget.style.transform='scale(1.1)')}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
            >{day}</button>
          );
        })}
      </div>
    </div>
  );
}

/* ── RÉSERVATION ── */
function Reservation() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCreneau, setSelectedCreneau] = useState('');
  const [selectedFormule, setSelectedFormule] = useState('');
  const [nbEnfants, setNbEnfants] = useState(8);
  const [form, setForm] = useState({ nom:'', prenom:'', tel:'', email:'', commune:'', enfantPrenom:'', enfantAge:'' });
  const [sent, setSent] = useState(false);

  const set = k => e => setForm(f => ({...f, [k]: e.target.value}));

  const formuleObj = FORMULES.find(f => f.id === selectedFormule);
  const total = formuleObj ? formuleObj.price * nbEnfants : 0;

  const formatDate = d => d ? `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}` : '';

  const canStep2 = selectedDate && selectedCreneau && selectedFormule;
  const canStep3 = form.nom && form.prenom && form.tel && form.email;

  const handleSubmit = () => {
    const msg = `Bonjour Kids Palace ! 🎂%0A%0AJe souhaite réserver un anniversaire :%0A%0A📅 Date : ${formatDate(selectedDate)}%0A🕐 Créneau : ${selectedCreneau}%0A🎉 Formule : ${formuleObj?.name} (${formuleObj?.price}€/enfant)%0A👧 Nombre d'enfants : ${nbEnfants}%0A💰 Total estimé : ${total}€%0A%0A👤 Nom : ${form.prenom} ${form.nom}%0A📞 Tél : ${form.tel}%0A📧 Email : ${form.email}%0A📍 Commune : ${form.commune}%0A🎈 Enfant : ${form.enfantPrenom}, ${form.enfantAge} ans%0A%0AMerci !`;
    window.open(`https://wa.me/33695268654?text=${msg}`, '_blank');
    setSent(true);
  };

  const inputStyle = { width:'100%', padding:'12px 14px', border:'2px solid var(--border)', borderRadius:12, fontSize:14, color:'var(--text)', fontFamily:'var(--sans)', outline:'none', transition:'border-color 0.2s' };

  return (
    <section id="reservation" style={{ padding:'96px 24px', background:'linear-gradient(135deg, #FFF8E7, #FFE8F0)' }}>
      <div style={{ ...S.maxW, maxWidth:800 }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ display:'inline-block', background:'var(--pink)', color:'white', borderRadius:12, padding:'4px 16px', fontSize:11, fontWeight:700, letterSpacing:2, textTransform:'uppercase', marginBottom:12 }}>Réservation</div>
          <h2 style={{ fontFamily:'var(--baloo)', fontSize:'clamp(28px, 5vw, 44px)', fontWeight:800, marginBottom:8 }}>Réserver un anniversaire 🎂</h2>
          <p style={{ fontSize:14, color:'var(--text-secondary)' }}>Confirmation par WhatsApp · Annulation gratuite 48h avant</p>
        </div>

        {/* Étapes */}
        <div style={{ display:'flex', gap:8, marginBottom:40, justifyContent:'center' }}>
          {[['1','📅 Date & formule'],['2','👤 Vos infos'],['3','✅ Confirmation']].map(([n,label],i) => (
            <div key={n} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:32, height:32, borderRadius:'50%', background: step >= i+1 ? 'var(--orange)':'var(--border)', color: step >= i+1 ? 'white':'var(--text-secondary)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--baloo)', fontWeight:700, fontSize:14, transition:'all 0.3s' }}>{n}</div>
                <span style={{ fontSize:13, fontWeight: step === i+1 ? 600:400, color: step === i+1 ? 'var(--orange)':'var(--text-secondary)', display:'none' }}>{label}</span>
              </div>
              {i < 2 && <div style={{ width:24, height:2, background: step > i+1 ? 'var(--orange)':'var(--border)', transition:'background 0.3s' }} />}
            </div>
          ))}
        </div>

        {sent ? (
          <div style={{ background:'white', borderRadius:24, padding:'3rem', textAlign:'center', boxShadow:'0 8px 32px rgba(0,0,0,0.08)', animation:'fadeIn 0.4s ease' }}>
            <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
            <h3 style={{ fontFamily:'var(--baloo)', fontSize:28, fontWeight:800, marginBottom:12, color:'var(--dark)' }}>Demande envoyée !</h3>
            <p style={{ fontSize:15, color:'var(--text-secondary)', lineHeight:1.7, marginBottom:24 }}>
              Votre demande a été envoyée sur WhatsApp.<br />Kids Palace vous confirmera votre réservation rapidement !
            </p>
            <div style={{ background:'var(--light)', borderRadius:16, padding:'1rem 1.5rem', display:'inline-block', textAlign:'left' }}>
              <div style={{ fontSize:14, color:'var(--text)', lineHeight:2 }}>
                📅 <strong>{formatDate(selectedDate)}</strong><br />
                🕐 <strong>{selectedCreneau}</strong><br />
                🎉 <strong>{formuleObj?.name}</strong><br />
                👧 <strong>{nbEnfants} enfants · {total}€ estimés</strong>
              </div>
            </div>
            <button onClick={() => { setSent(false); setStep(1); setSelectedDate(null); setSelectedCreneau(''); setSelectedFormule(''); setNbEnfants(8); setForm({nom:'',prenom:'',tel:'',email:'',commune:'',enfantPrenom:'',enfantAge:''}); }} style={{ display:'block', margin:'24px auto 0', background:'none', border:'2px solid var(--border)', borderRadius:12, padding:'10px 24px', fontSize:14, color:'var(--text-secondary)', cursor:'pointer', fontFamily:'var(--sans)' }}>Nouvelle réservation</button>
          </div>
        ) : (
          <div style={{ background:'white', borderRadius:24, padding:'2rem', boxShadow:'0 8px 32px rgba(0,0,0,0.08)' }}>

            {/* ÉTAPE 1 */}
            {step === 1 && (
              <div style={{ animation:'fadeIn 0.3s ease' }}>
                <h3 style={{ fontFamily:'var(--baloo)', fontSize:20, fontWeight:700, marginBottom:24, color:'var(--dark)' }}>📅 Choisissez votre date</h3>

                <Calendrier selectedDate={selectedDate} onSelect={setSelectedDate} />

                {selectedDate && (
                  <div style={{ marginTop:24, animation:'fadeIn 0.3s ease' }}>
                    <div style={{ background:'var(--light)', borderRadius:12, padding:'12px 16px', marginBottom:20, display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ fontSize:20 }}>📅</span>
                      <span style={{ fontFamily:'var(--baloo)', fontWeight:700, color:'var(--orange)' }}>Date sélectionnée : {formatDate(selectedDate)}</span>
                    </div>

                    <h4 style={{ fontFamily:'var(--baloo)', fontSize:16, fontWeight:700, marginBottom:12, color:'var(--dark)' }}>🕐 Créneau horaire</h4>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:10, marginBottom:24 }}>
                      {CRENEAUX.map(c => (
                        <button key={c} onClick={() => setSelectedCreneau(c)} style={{ padding:'12px', borderRadius:12, border:'2px solid', borderColor: selectedCreneau === c ? 'var(--orange)':'var(--border)', background: selectedCreneau === c ? 'rgba(255,107,53,0.08)':'white', fontFamily:'var(--baloo)', fontSize:14, fontWeight: selectedCreneau === c ? 700:400, color: selectedCreneau === c ? 'var(--orange)':'var(--text)', cursor:'pointer', transition:'all 0.2s' }}>{c}</button>
                      ))}
                    </div>

                    <h4 style={{ fontFamily:'var(--baloo)', fontSize:16, fontWeight:700, marginBottom:12, color:'var(--dark)' }}>🎉 Formule souhaitée</h4>
                    <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
                      {FORMULES.map(f => (
                        <button key={f.id} onClick={() => setSelectedFormule(f.id)} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', borderRadius:12, border:'2px solid', borderColor: selectedFormule === f.id ? f.color:'var(--border)', background: selectedFormule === f.id ? `${f.color}12`:'white', cursor:'pointer', transition:'all 0.2s' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                            <span style={{ fontSize:24 }}>{f.icon}</span>
                            <span style={{ fontFamily:'var(--baloo)', fontSize:15, fontWeight:700, color: selectedFormule === f.id ? f.color:'var(--text)' }}>{f.name}</span>
                          </div>
                          <span style={{ fontFamily:'var(--baloo)', fontSize:16, fontWeight:800, color: f.color }}>{f.price}€/enfant</span>
                        </button>
                      ))}
                    </div>

                    <h4 style={{ fontFamily:'var(--baloo)', fontSize:16, fontWeight:700, marginBottom:12, color:'var(--dark)' }}>👧 Nombre d'enfants estimé</h4>
                    <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:8 }}>
                      <button onClick={() => setNbEnfants(n => Math.max(8, n-1))} style={{ width:40, height:40, borderRadius:'50%', border:'2px solid var(--border)', background:'white', fontSize:20, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--baloo)', fontWeight:700 }}>-</button>
                      <span style={{ fontFamily:'var(--baloo)', fontSize:28, fontWeight:800, color:'var(--orange)', minWidth:40, textAlign:'center' }}>{nbEnfants}</span>
                      <button onClick={() => setNbEnfants(n => Math.min(50, n+1))} style={{ width:40, height:40, borderRadius:'50%', border:'2px solid var(--orange)', background:'var(--orange)', color:'white', fontSize:20, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--baloo)', fontWeight:700 }}>+</button>
                      <div style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.5 }}>
                        {formuleObj && <span style={{ fontFamily:'var(--baloo)', fontWeight:700, color:'var(--orange)' }}>≈ {formuleObj.price * nbEnfants}€ estimés</span>}
                      </div>
                    </div>
                    <p style={{ fontSize:12, color:'var(--text-secondary)', fontStyle:'italic', marginBottom:24 }}>* Le nombre peut varier. Vous réglez le nombre de présents le jour J. Minimum 8 enfants.</p>
                  </div>
                )}

                <button onClick={() => setStep(2)} disabled={!canStep2} style={{ width:'100%', padding:'15px', borderRadius:16, border:'none', background: canStep2 ? 'var(--orange)':'var(--border)', color: canStep2 ? 'white':'var(--text-secondary)', fontFamily:'var(--baloo)', fontSize:16, fontWeight:700, cursor: canStep2 ? 'pointer':'not-allowed', transition:'all 0.2s', marginTop:8 }}>
                  Continuer → Vos informations
                </button>
              </div>
            )}

            {/* ÉTAPE 2 */}
            {step === 2 && (
              <div style={{ animation:'fadeIn 0.3s ease' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
                  <button onClick={() => setStep(1)} style={{ background:'var(--light)', border:'none', borderRadius:10, width:36, height:36, cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>←</button>
                  <h3 style={{ fontFamily:'var(--baloo)', fontSize:20, fontWeight:700, color:'var(--dark)' }}>👤 Vos informations</h3>
                </div>

                {/* Récap */}
                <div style={{ background:'var(--light)', borderRadius:12, padding:'12px 16px', marginBottom:24, display:'flex', gap:16, flexWrap:'wrap' }}>
                  <span style={{ fontSize:13, color:'var(--text-secondary)' }}>📅 {formatDate(selectedDate)}</span>
                  <span style={{ fontSize:13, color:'var(--text-secondary)' }}>🕐 {selectedCreneau}</span>
                  <span style={{ fontSize:13, color:'var(--text-secondary)' }}>🎉 {formuleObj?.name}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:'var(--orange)' }}>≈ {total}€</span>
                </div>

                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:'var(--text-secondary)', marginBottom:6, display:'block' }}>Prénom *</label>
                      <input style={inputStyle} placeholder="Votre prénom" value={form.prenom} onChange={set('prenom')} onFocus={e => e.target.style.borderColor='var(--orange)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                    </div>
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:'var(--text-secondary)', marginBottom:6, display:'block' }}>Nom *</label>
                      <input style={inputStyle} placeholder="Votre nom" value={form.nom} onChange={set('nom')} onFocus={e => e.target.style.borderColor='var(--orange)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize:12, fontWeight:600, color:'var(--text-secondary)', marginBottom:6, display:'block' }}>Téléphone *</label>
                    <input style={inputStyle} type="tel" placeholder="06 XX XX XX XX" value={form.tel} onChange={set('tel')} onFocus={e => e.target.style.borderColor='var(--orange)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                  </div>
                  <div>
                    <label style={{ fontSize:12, fontWeight:600, color:'var(--text-secondary)', marginBottom:6, display:'block' }}>Email *</label>
                    <input style={inputStyle} type="email" placeholder="votre@email.fr" value={form.email} onChange={set('email')} onFocus={e => e.target.style.borderColor='var(--orange)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                  </div>
                  <div>
                    <label style={{ fontSize:12, fontWeight:600, color:'var(--text-secondary)', marginBottom:6, display:'block' }}>Commune</label>
                    <input style={inputStyle} placeholder="Votre ville" value={form.commune} onChange={set('commune')} onFocus={e => e.target.style.borderColor='var(--orange)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:14 }}>
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:'var(--text-secondary)', marginBottom:6, display:'block' }}>Prénom de l'enfant fêté</label>
                      <input style={inputStyle} placeholder="Prénom" value={form.enfantPrenom} onChange={set('enfantPrenom')} onFocus={e => e.target.style.borderColor='var(--orange)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                    </div>
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:'var(--text-secondary)', marginBottom:6, display:'block' }}>Âge</label>
                      <input style={inputStyle} type="number" placeholder="Âge" min="3" max="11" value={form.enfantAge} onChange={set('enfantAge')} onFocus={e => e.target.style.borderColor='var(--orange)'} onBlur={e => e.target.style.borderColor='var(--border)'} />
                    </div>
                  </div>
                </div>

                <button onClick={() => setStep(3)} disabled={!canStep3} style={{ width:'100%', padding:'15px', borderRadius:16, border:'none', background: canStep3 ? 'var(--orange)':'var(--border)', color: canStep3 ? 'white':'var(--text-secondary)', fontFamily:'var(--baloo)', fontSize:16, fontWeight:700, cursor: canStep3 ? 'pointer':'not-allowed', transition:'all 0.2s', marginTop:20 }}>
                  Continuer → Confirmation
                </button>
              </div>
            )}

            {/* ÉTAPE 3 */}
            {step === 3 && (
              <div style={{ animation:'fadeIn 0.3s ease' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
                  <button onClick={() => setStep(2)} style={{ background:'var(--light)', border:'none', borderRadius:10, width:36, height:36, cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>←</button>
                  <h3 style={{ fontFamily:'var(--baloo)', fontSize:20, fontWeight:700, color:'var(--dark)' }}>✅ Récapitulatif</h3>
                </div>

                <div style={{ background:'var(--light)', borderRadius:16, padding:'1.5rem', marginBottom:24 }}>
                  <h4 style={{ fontFamily:'var(--baloo)', fontSize:16, fontWeight:700, marginBottom:16, color:'var(--dark)' }}>Votre réservation</h4>
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    {[
                      ['📅 Date', formatDate(selectedDate)],
                      ['🕐 Créneau', selectedCreneau],
                      ['🎉 Formule', `${formuleObj?.name} — ${formuleObj?.price}€/enfant`],
                      ['👧 Enfants', `${nbEnfants} enfants estimés`],
                      ['💰 Total estimé', `${total}€`],
                      ['👤 Contact', `${form.prenom} ${form.nom}`],
                      ['📞 Téléphone', form.tel],
                      ['📧 Email', form.email],
                      ['🎈 Enfant fêté', `${form.enfantPrenom}${form.enfantAge ? `, ${form.enfantAge} ans`:''}`],
                    ].map(([label, val]) => (
                      <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', paddingBottom:8, borderBottom:'1px solid var(--border)', gap:16 }}>
                        <span style={{ fontSize:13, color:'var(--text-secondary)', flexShrink:0 }}>{label}</span>
                        <span style={{ fontSize:13, fontWeight:600, color:'var(--text)', textAlign:'right' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background:'rgba(37,211,102,0.08)', borderRadius:12, padding:'12px 16px', marginBottom:20, border:'1px solid rgba(37,211,102,0.2)' }}>
                  <p style={{ fontSize:13, color:'var(--text-secondary)' }}>💬 En cliquant sur le bouton, votre demande sera envoyée directement sur WhatsApp de Kids Palace. Ils vous confirmeront la réservation rapidement !</p>
                </div>

                <button onClick={handleSubmit} style={{ width:'100%', padding:'16px', borderRadius:16, border:'none', background:'#25D366', color:'white', fontFamily:'var(--baloo)', fontSize:17, fontWeight:800, cursor:'pointer', transition:'opacity 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}
                  onMouseEnter={e => e.currentTarget.style.opacity='0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity='1'}
                >💬 Envoyer la demande sur WhatsApp</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── HORAIRES ── */
function Horaires() {
  return (
    <section id="horaires" style={{ padding:'96px 24px', background:'var(--dark2)' }}>
      <div style={S.maxW}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ display:'inline-block', background:'var(--blue)', color:'white', borderRadius:12, padding:'4px 16px', fontSize:11, fontWeight:700, letterSpacing:2, textTransform:'uppercase', marginBottom:12 }}>Infos pratiques</div>
          <h2 style={{ fontFamily:'var(--baloo)', fontSize:'clamp(28px, 5vw, 44px)', fontWeight:800, color:'white', marginBottom:12 }}>On vous attend ! 🗓️</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:20, padding:'1.75rem', border:'1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily:'var(--baloo)', fontSize:16, fontWeight:700, color:'var(--yellow)', marginBottom:16 }}>📚 Période scolaire</div>
              {HORAIRES_SCOLAIRE.map(({ jour, h, open }) => (
                <div key={jour} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.05)', gap:8 }}>
                  <span style={{ fontSize:13, color:'rgba(255,255,255,0.6)', flexShrink:0 }}>{jour}</span>
                  <span style={{ fontFamily:'var(--baloo)', fontSize:14, fontWeight:700, color: open ? 'var(--yellow)':'#FF6B9D', whiteSpace:'nowrap' }}>{h}</span>
                </div>
              ))}
            </div>
            <div style={{ background:'linear-gradient(135deg, rgba(255,217,61,0.12), rgba(255,107,53,0.12))', borderRadius:20, padding:'1.75rem', border:'1px solid rgba(255,217,61,0.2)' }}>
              <div style={{ fontFamily:'var(--baloo)', fontSize:16, fontWeight:700, color:'var(--yellow)', marginBottom:12 }}>🌞 Vacances & Jours fériés</div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:14, color:'rgba(255,255,255,0.65)' }}>Tous les jours</span>
                <span style={{ fontFamily:'var(--baloo)', fontSize:18, fontWeight:800, color:'var(--yellow)' }}>10h – 19h</span>
              </div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:20, padding:'1.75rem', border:'1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily:'var(--baloo)', fontSize:16, fontWeight:700, color:'var(--yellow)', marginBottom:16 }}>📍 Nous trouver</div>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.6)', lineHeight:1.8, marginBottom:16 }}>{CONFIG.address}</p>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.4)', lineHeight:2, marginBottom:20 }}>
                <div>🚇 RER A → Bécon les Bruyères</div>
                <div>🚌 Bus 167, 278 → Moulin des Bruyères</div>
                <div>🚗 5 min depuis Porte de Champerret</div>
              </div>
              <a href={CONFIG.googleMaps} target="_blank" rel="noopener noreferrer" style={{ display:'block', textAlign:'center', background:'var(--blue)', color:'white', borderRadius:12, padding:'12px', fontSize:14, fontWeight:700, textDecoration:'none', fontFamily:'var(--baloo)' }}>📍 Ouvrir dans Google Maps</a>
            </div>
            <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:20, padding:'1.75rem', border:'1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily:'var(--baloo)', fontSize:16, fontWeight:700, color:'var(--yellow)', marginBottom:16 }}>📞 Nous contacter</div>
              <a href={CONFIG.phoneLink} style={{ display:'block', fontFamily:'var(--baloo)', fontSize:28, fontWeight:800, color:'white', textDecoration:'none', marginBottom:10 }}>{CONFIG.phone}</a>
              <a href={`mailto:${CONFIG.email}`} style={{ fontSize:13, color:'rgba(255,255,255,0.4)', textDecoration:'none', display:'block', marginBottom:20 }}>{CONFIG.email}</a>
              <a href={CONFIG.whatsapp} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'#25D366', color:'white', borderRadius:12, padding:'12px', fontSize:14, fontWeight:700, textDecoration:'none', fontFamily:'var(--baloo)' }}>💬 Écrire sur WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  return (
    <section style={{ padding:'96px 24px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'url(/photo5.jpeg)', backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.25)' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(255,107,53,0.85), rgba(255,107,157,0.85))' }} />
      <div style={{ ...S.maxW, textAlign:'center', position:'relative', zIndex:2 }}>
        <div style={{ fontSize:60, marginBottom:16, animation:'wiggle 2s infinite' }}>🎪</div>
        <h2 style={{ fontFamily:'var(--baloo)', fontSize:'clamp(28px, 5vw, 52px)', color:'white', fontWeight:800, marginBottom:12 }}>Prêts pour l'aventure ?</h2>
        <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', marginBottom:40, maxWidth:480, margin:'0 auto 40px' }}>Venez vivre une expérience magique au Kids Palace !</p>
        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <a href={CONFIG.whatsapp} target="_blank" rel="noopener noreferrer" style={{ background:'#25D366', color:'white', borderRadius:32, padding:'15px 36px', fontSize:16, fontWeight:800, textDecoration:'none', fontFamily:'var(--baloo)', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>💬 WhatsApp</a>
          <a href={CONFIG.phoneLink} style={{ background:'white', color:'var(--orange)', borderRadius:32, padding:'15px 36px', fontSize:16, fontWeight:800, textDecoration:'none', fontFamily:'var(--baloo)', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>📞 {CONFIG.phone}</a>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{ background:'#0D0D1A', padding:'40px 24px 24px', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ ...S.maxW, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:24 }}>🎪</span>
          <div>
            <div style={{ fontFamily:'var(--baloo)', fontSize:16, fontWeight:800, color:'var(--orange)' }}>Kids Palace</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.2)' }}>Courbevoie · 0 – 11 ans</div>
          </div>
        </div>
        <p style={{ fontSize:12, color:'rgba(255,255,255,0.2)' }}>© 2025 Kids Palace · 39 rue du Moulin des Bruyères</p>
        <p style={{ fontSize:12, color:'rgba(255,255,255,0.15)' }}>Site réalisé par <span style={{ color:'var(--orange)' }}>Tonel</span></p>
      </div>
    </footer>
  );
}

/* ── FLOATING BUTTONS ── */
function FloatingButtons() {
  return (
    <>
      <a href={CONFIG.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{ position:'fixed', bottom:24, right:24, zIndex:999, width:60, height:60, borderRadius:'50%', background:'#25D366', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, boxShadow:'0 6px 24px rgba(37,211,102,0.5)', textDecoration:'none', transition:'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform='scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
      >💬</a>
      <a href={CONFIG.phoneLink} title="Appeler" style={{ position:'fixed', bottom:96, right:24, zIndex:999, width:60, height:60, borderRadius:'50%', background:'var(--orange)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, boxShadow:'0 6px 24px rgba(255,107,53,0.5)', textDecoration:'none', transition:'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform='scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
      >📞</a>
    </>
  );
}

/* ── APP ── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <>
      <FloatingButtons />
      <Nav scrolled={scrolled} />
      <Hero />
      <Galerie />
      <Tarifs />
      <Anniversaires />
      <Reservation />
      <Horaires />
      <CTA />
      <Footer />
    </>
  );
}
