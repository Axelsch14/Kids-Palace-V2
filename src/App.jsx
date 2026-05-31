import { useState, useEffect, useRef } from 'react';

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

const ANNIVERSAIRES = [
  { icon: '🎂', name: 'Palace Birthday', price: '17€/enfant', color: '#FF6B9D', features: ['À partir de 3 ans', 'Minimum 8 enfants', '2h30 de jeux', 'Salle privative 1h30', 'Boissons + gobelets', 'Invitations offertes'] },
  { icon: '🎉', name: 'Palace All Inclusive', price: '20€/enfant', color: '#FF6B35', highlight: true, features: ['À partir de 3 ans', 'Minimum 8 enfants', '2h30 de jeux', 'Salle privative 1h30', 'Gâteau + bougies inclus', 'Bonbons + boissons'] },
  { icon: '🕺', name: 'Palace Boum', price: '18€/enfant', color: '#7C5CFF', features: ['À partir de 3 ans', 'Minimum 15 enfants', 'Vendredi soir 19h30–22h', 'Piste de danse + jeux', '2h30 en soirée', 'Boissons + gobelets'] },
];

const HORAIRES_SCOLAIRE = [
  { jour: 'Mercredi', h: '10h – 19h', open: true },
  { jour: 'Vendredi', h: '14h – 19h', open: true },
  { jour: 'Samedi', h: '10h – 19h', open: true },
  { jour: 'Dimanche', h: '10h – 19h', open: true },
  { jour: 'Lundi · Mardi · Jeudi', h: 'Fermé', open: false },
];

const S = { maxW: { maxWidth: 1160, margin: '0 auto', padding: '0 24px' } };

/* ── NAV ── */
function Nav({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const links = [['espaces', '🎠 Le parc'], ['tarifs', '💰 Tarifs'], ['anniversaires', '🎂 Anniversaires'], ['horaires', '🕐 Horaires']];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled || menuOpen ? 'rgba(255,253,247,0.97)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled || menuOpen ? '2px solid var(--yellow)' : 'none',
        transition: 'all 0.35s ease',
      }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 66 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}>
            <span style={{ fontSize: 26, animation: 'wiggle 2.5s ease-in-out infinite' }}>🎪</span>
            <div>
              <div style={{ fontFamily: 'var(--baloo)', fontSize: 18, fontWeight: 800, color: 'var(--orange)', lineHeight: 1 }}>Kids Palace</div>
              <div style={{ fontSize: 9, color: 'var(--text-secondary)', letterSpacing: 1 }}>COURBEVOIE · 0 – 11 ANS</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <a href={CONFIG.phoneLink} style={{
              background: 'var(--orange)', color: 'white', borderRadius: 24,
              padding: '8px 16px', fontSize: 13, fontWeight: 700, textDecoration: 'none',
              fontFamily: 'var(--baloo)',
            }}>📞 Appeler</a>
            <button onClick={() => setMenuOpen(o => !o)} style={{
              background: menuOpen ? 'var(--yellow)' : 'rgba(255,107,53,0.1)',
              border: 'none', borderRadius: 10, width: 42, height: 42,
              fontSize: 18, cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{menuOpen ? '✕' : '☰'}</button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: 'rgba(255,253,247,0.98)', borderTop: '1px solid var(--border)', padding: '12px 20px 20px' }}>
            {links.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: 'none', border: 'none', fontSize: 16, fontWeight: 600,
                color: 'var(--text)', padding: '14px 12px', borderRadius: 12,
                borderBottom: '1px solid var(--border)', cursor: 'pointer',
                fontFamily: 'var(--baloo)',
              }}>{label}</button>
            ))}
            <a href={CONFIG.whatsapp} target="_blank" rel="noopener noreferrer" style={{
              display: 'block', marginTop: 12, background: '#25D366', color: 'white',
              borderRadius: 16, padding: '13px', fontSize: 15, fontWeight: 700,
              textDecoration: 'none', fontFamily: 'var(--baloo)', textAlign: 'center',
            }}>💬 Nous écrire sur WhatsApp</a>
          </div>
        )}
      </nav>
    </>
  );
}

/* ── HERO ── */
function Hero() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Background photo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/photo1.jpeg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.35)',
      }} />
      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,26,46,0.95) 50%, rgba(26,26,46,0.4) 100%)' }} />

      {/* Floating emojis */}
      {[
        { e: '⭐', t: '15%', l: '55%', s: 36, d: '0s' },
        { e: '🎈', t: '20%', l: '75%', s: 44, d: '0.7s' },
        { e: '🌈', t: '65%', l: '60%', s: 40, d: '1.2s' },
        { e: '🎊', t: '75%', l: '80%', s: 32, d: '0.3s' },
      ].map(({ e, t, l, s, d }) => (
        <div key={e} style={{ position: 'absolute', top: t, left: l, fontSize: s, animation: `float 3s ease-in-out ${d} infinite`, pointerEvents: 'none', zIndex: 2 }}>{e}</div>
      ))}

      <div style={{ ...S.maxW, width: '100%', position: 'relative', zIndex: 3, padding: '140px 24px 80px' }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,217,61,0.15)', border: '1px solid rgba(255,217,61,0.4)', borderRadius: 24, padding: '8px 20px', marginBottom: 32 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6BCB77', display: 'inline-block', boxShadow: '0 0 8px #6BCB77' }} />
            <span style={{ fontFamily: 'var(--baloo)', fontSize: 14, fontWeight: 600, color: 'var(--yellow)' }}>Ouvert aujourd'hui · Venez jouer ! 🎉</span>
          </div>

          <h1 style={{ fontFamily: 'var(--baloo)', fontSize: 'clamp(38px, 7vw, 72px)', fontWeight: 800, lineHeight: 1.1, color: 'white', marginBottom: 20 }}>
            Le paradis des<br />
            <span style={{ color: 'var(--yellow)' }}>petits aventuriers</span><br />
            à Courbevoie ! 🎪
          </h1>

          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 40, maxWidth: 480 }}>
            Parc de jeux intérieur pour les <strong style={{ color: 'white' }}>0 à 11 ans</strong>. Toboggans géants, piscine à balles, parcours d'aventure… et les parents se détendent au café ! ☕
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}>
            <button onClick={() => go('anniversaires')} style={{
              background: 'var(--orange)', color: 'white', border: 'none',
              padding: '15px 32px', borderRadius: 32, fontSize: 16, fontWeight: 700,
              boxShadow: '0 8px 32px rgba(255,107,53,0.5)',
              transition: 'transform 0.2s, box-shadow 0.2s', fontFamily: 'var(--baloo)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(255,107,53,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,107,53,0.5)'; }}
            >🎂 Organiser un anniversaire</button>
            <button onClick={() => go('tarifs')} style={{
              background: 'var(--yellow)', color: 'var(--dark)', border: 'none',
              padding: '15px 32px', borderRadius: 32, fontSize: 16, fontWeight: 700,
              fontFamily: 'var(--baloo)', transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >💰 Voir les tarifs</button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[['🧒', '0 – 11 ans'], ['🎢', 'Toboggans géants'], ['🎱', 'Piscine à balles'], ['🎂', '3 formules anniv.']].map(([icon, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 3 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Découvrir</div>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,217,61,0.6), transparent)', margin: '0 auto' }} />
      </div>
    </section>
  );
}

/* ── GALERIE ── */
function Galerie() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="espaces" style={{ padding: '96px 24px', background: 'var(--dark)' }}>
      <div style={S.maxW}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: 'var(--yellow)', color: 'var(--dark)', borderRadius: 12, padding: '4px 16px', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Le parc en images</div>
          <h2 style={{ fontFamily: 'var(--baloo)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: 'white', marginBottom: 12 }}>
            Une aventure à chaque coin ! 🗺️
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto' }}>
            Glisser, grimper, plonger dans la piscine à balles… Le Kids Palace c'est des heures de bonheur garanti !
          </p>
        </div>

        {/* Masonry grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto', gap: 12 }}>
          {PHOTOS.map((photo, i) => {
            const configs = [
              { col: '1 / 8', row: '1 / 3', height: 420 },
              { col: '8 / 13', row: '1 / 2', height: 200 },
              { col: '8 / 13', row: '2 / 3', height: 200 },
              { col: '1 / 5', row: '3 / 4', height: 220 },
              { col: '5 / 13', row: '3 / 4', height: 220 },
            ];
            const cfg = configs[i];
            return (
              <div key={i} onClick={() => setSelected(photo)} style={{
                gridColumn: cfg.col, gridRow: cfg.row,
                height: cfg.height, borderRadius: 16, overflow: 'hidden',
                cursor: 'pointer', position: 'relative',
                transition: 'transform 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={photo.src} alt={photo.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(26,26,46,0.8) 0%, transparent 50%)',
                  opacity: 0, transition: 'opacity 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                >
                  <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: 'var(--baloo)', fontSize: 16, fontWeight: 700, color: 'white' }}>{photo.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox */}
        {selected && (
          <div onClick={() => setSelected(null)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out',
          }}>
            <img src={selected.src} alt={selected.label} style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 16, objectFit: 'contain' }} />
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', fontSize: 24, width: 48, height: 48, borderRadius: '50%', cursor: 'pointer' }}>✕</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── TARIFS ── */
function Tarifs() {
  return (
    <section id="tarifs" style={{ padding: '96px 24px', background: 'var(--light)' }}>
      <div style={S.maxW}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', background: 'var(--orange)', color: 'white', borderRadius: 12, padding: '4px 16px', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Tarifs</div>
          <h2 style={{ fontFamily: 'var(--baloo)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, marginBottom: 8 }}>Des prix pour toute la famille 💛</h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Les adultes accompagnateurs entrent <strong>gratuitement</strong> !</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 32 }}>
          {TARIFS.map(({ icon, label, detail, price, sub, bg, color, highlight }) => (
            <div key={label} style={{
              background: bg, borderRadius: 28, padding: '2.5rem 2rem', textAlign: 'center',
              boxShadow: highlight ? `0 16px 48px ${bg}60` : `0 6px 24px ${bg}30`,
              transform: highlight ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.25s',
            }}
              onMouseEnter={e => !highlight && (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={e => !highlight && (e.currentTarget.style.transform = 'scale(1)')}
            >
              {highlight && <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>⭐ Le plus populaire</div>}
              <div style={{ fontSize: 52, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontFamily: 'var(--baloo)', fontSize: 22, fontWeight: 800, color, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, color, opacity: 0.75, marginBottom: 20 }}>{detail}</div>
              <div style={{ fontFamily: 'var(--baloo)', fontSize: 60, fontWeight: 800, color, lineHeight: 1, marginBottom: 8 }}>{price}</div>
              <div style={{ fontSize: 13, color, opacity: 0.75, fontWeight: 500 }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 20, padding: '1.25rem 2rem', border: '2px dashed var(--border)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 32 }}>🧦</span>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text)' }}>N'oubliez pas vos chaussettes !</strong> Obligatoires pour accéder aux structures. En vente sur place si besoin.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── ANNIVERSAIRES ── */
function Anniversaires() {
  return (
    <section id="anniversaires" style={{ padding: '96px 24px', background: 'white' }}>
      <div style={S.maxW}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', background: 'var(--pink)', color: 'white', borderRadius: 12, padding: '4px 16px', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Anniversaires</div>
          <h2 style={{ fontFamily: 'var(--baloo)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, marginBottom: 12 }}>Un anniversaire inoubliable ! 🎉</h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}>
            Choisis ta formule et passe le plus merveilleux des anniversaires avec tes copains !
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 24, marginBottom: 32 }}>
          {ANNIVERSAIRES.map(({ icon, name, price, color, highlight, features }) => (
            <div key={name} style={{
              borderRadius: 24, overflow: 'hidden',
              border: highlight ? 'none' : '2px solid var(--border)',
              boxShadow: highlight ? `0 20px 60px ${color}40` : '0 4px 20px rgba(0,0,0,0.06)',
              transform: highlight ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => { if (!highlight) { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = `0 12px 40px ${color}30`; } }}
              onMouseLeave={e => { if (!highlight) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; } }}
            >
              <div style={{ background: color, padding: '2rem', textAlign: 'center' }}>
                {highlight && <div style={{ fontSize: 11, letterSpacing: 2, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', marginBottom: 8 }}>⭐ Le plus choisi</div>}
                <div style={{ fontSize: 52, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontFamily: 'var(--baloo)', fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 6 }}>{name}</div>
                <div style={{ fontFamily: 'var(--baloo)', fontSize: 36, fontWeight: 800, color: 'white' }}>{price}</div>
              </div>
              <div style={{ background: 'white', padding: '1.75rem' }}>
                {features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                    <span style={{ color, fontSize: 16, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
                <a href={CONFIG.whatsapp} target="_blank" rel="noopener noreferrer" style={{
                  display: 'block', textAlign: 'center', marginTop: 20,
                  background: color, color: 'white', borderRadius: 16,
                  padding: '12px', fontSize: 14, fontWeight: 700,
                  textDecoration: 'none', fontFamily: 'var(--baloo)',
                  transition: 'opacity 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >💬 Réserver sur WhatsApp</a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #FFE8F0, #FFF0D0)', borderRadius: 20, padding: '1.25rem 2rem', border: '2px solid #FFD0E8', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 32 }}>👨‍👩‍👧</span>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text)' }}>2 adultes accompagnateurs acceptés.</strong> Minimum 8 enfants (15 pour Palace Boum). Les invitations sont téléchargeables gratuitement.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── HORAIRES ── */
function Horaires() {
  return (
    <section id="horaires" style={{ padding: '96px 24px', background: 'var(--dark2)' }}>
      <div style={S.maxW}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', background: 'var(--blue)', color: 'white', borderRadius: 12, padding: '4px 16px', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Infos pratiques</div>
          <h2 style={{ fontFamily: 'var(--baloo)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: 'white', marginBottom: 12 }}>On vous attend ! 🗓️</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Période scolaire */}
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: '1.75rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily: 'var(--baloo)', fontSize: 16, fontWeight: 700, color: 'var(--yellow)', marginBottom: 16 }}>📚 Période scolaire</div>
              {HORAIRES_SCOLAIRE.map(({ jour, h, open }) => (
  <div key={jour} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', gap: 8 }}>
    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}>{jour}</span>
    <span style={{ fontFamily: 'var(--baloo)', fontSize: 14, fontWeight: 700, color: open ? 'var(--yellow)' : '#FF6B9D', whiteSpace: 'nowrap' }}>{h}</span>
  </div>
))}
              ))}
            </div>
            {/* Vacances */}
            <div style={{ background: 'linear-gradient(135deg, rgba(255,217,61,0.12), rgba(255,107,53,0.12))', borderRadius: 20, padding: '1.75rem', border: '1px solid rgba(255,217,61,0.2)' }}>
              <div style={{ fontFamily: 'var(--baloo)', fontSize: 16, fontWeight: 700, color: 'var(--yellow)', marginBottom: 12 }}>🌞 Vacances & Jours fériés</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>Tous les jours</span>
                <span style={{ fontFamily: 'var(--baloo)', fontSize: 18, fontWeight: 800, color: 'var(--yellow)' }}>10h – 19h</span>
              </div>
            </div>
          </div>

          {/* Contact & Accès */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: '1.75rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily: 'var(--baloo)', fontSize: 16, fontWeight: 700, color: 'var(--yellow)', marginBottom: 16 }}>📍 Nous trouver</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 16 }}>{CONFIG.address}</p>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 2, marginBottom: 20 }}>
                <div>🚇 RER A → Bécon les Bruyères</div>
                <div>🚌 Bus 167, 278 → Moulin des Bruyères</div>
                <div>🚗 5 min depuis Porte de Champerret</div>
              </div>
              <a href={CONFIG.googleMaps} target="_blank" rel="noopener noreferrer" style={{
                display: 'block', textAlign: 'center', background: 'var(--blue)', color: 'white',
                borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 700,
                textDecoration: 'none', fontFamily: 'var(--baloo)',
              }}>📍 Ouvrir dans Google Maps</a>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: '1.75rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily: 'var(--baloo)', fontSize: 16, fontWeight: 700, color: 'var(--yellow)', marginBottom: 16 }}>📞 Nous contacter</div>
              <a href={CONFIG.phoneLink} style={{ display: 'block', fontFamily: 'var(--baloo)', fontSize: 28, fontWeight: 800, color: 'white', textDecoration: 'none', marginBottom: 10 }}>{CONFIG.phone}</a>
              <a href={`mailto:${CONFIG.email}`} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'block', marginBottom: 20 }}>{CONFIG.email}</a>
              <a href={CONFIG.whatsapp} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: '#25D366', color: 'white', borderRadius: 12,
                padding: '12px', fontSize: 14, fontWeight: 700,
                textDecoration: 'none', fontFamily: 'var(--baloo)',
              }}>💬 Écrire sur WhatsApp</a>
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
    <section style={{ padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/photo5.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.25)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,107,53,0.85), rgba(255,107,157,0.85))' }} />
      <div style={{ ...S.maxW, textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 60, marginBottom: 16, animation: 'wiggle 2s infinite' }}>🎪</div>
        <h2 style={{ fontFamily: 'var(--baloo)', fontSize: 'clamp(28px, 5vw, 52px)', color: 'white', fontWeight: 800, marginBottom: 12 }}>
          Prêts pour l'aventure ?
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
          Venez vivre une expérience magique au Kids Palace ! Réservez votre anniversaire ou venez simplement jouer.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={CONFIG.whatsapp} target="_blank" rel="noopener noreferrer" style={{
            background: '#25D366', color: 'white', borderRadius: 32,
            padding: '15px 36px', fontSize: 16, fontWeight: 800,
            textDecoration: 'none', fontFamily: 'var(--baloo)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>💬 WhatsApp</a>
          <a href={CONFIG.phoneLink} style={{
            background: 'white', color: 'var(--orange)', borderRadius: 32,
            padding: '15px 36px', fontSize: 16, fontWeight: 800,
            textDecoration: 'none', fontFamily: 'var(--baloo)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>📞 {CONFIG.phone}</a>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{ background: '#0D0D1A', padding: '40px 24px 24px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ ...S.maxW, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>🎪</span>
          <div>
            <div style={{ fontFamily: 'var(--baloo)', fontSize: 16, fontWeight: 800, color: 'var(--orange)' }}>Kids Palace</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>Courbevoie · 0 – 11 ans</div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2025 Kids Palace · 39 rue du Moulin des Bruyères</p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)' }}>Site réalisé par <span style={{ color: 'var(--orange)' }}>Tonel</span></p>
      </div>
    </footer>
  );
}

/* ── FLOATING BUTTONS ── */
function FloatingButtons() {
  return (
    <>
      <a href={CONFIG.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 999,
        width: 60, height: 60, borderRadius: '50%',
        background: '#25D366', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, boxShadow: '0 6px 24px rgba(37,211,102,0.5)',
        textDecoration: 'none', transition: 'transform 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >💬</a>
      <a href={CONFIG.phoneLink} title="Appeler" style={{
        position: 'fixed', bottom: 96, right: 24, zIndex: 999,
        width: 60, height: 60, borderRadius: '50%',
        background: 'var(--orange)', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, boxShadow: '0 6px 24px rgba(255,107,53,0.5)',
        textDecoration: 'none', transition: 'transform 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
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
      <Horaires />
      <CTA />
      <Footer />
    </>
  );
}
