'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

/* ─────────────────── DATA ─────────────────── */

const metrics = [
  {
    label: 'Hook ideal (seg.)',
    value: '1–3s',
    sub: '84.3% de los videos virales usan un gancho psicológico en los primeros 3 segundos — Mediacube & InfluenceFlow 2026',
  },
  {
    label: 'Duración óptima TikTok',
    value: '15–34s',
    sub: 'Máxima Completion Rate en 21–34s (62% promedio). ASMR outdoor: 45–60s — OpusClip & Neal Schaffer 2026',
  },
  {
    label: 'Duración óptima IG Reels',
    value: '7–30s',
    sub: 'Demo de producto: 7–15s logra hasta 85% Engagement Rate. 26s = más comentarios — InfluenceFlow & Shorts Generator AI 2026',
  },
  {
    label: 'Duración YouTube outdoor',
    value: '15–35min',
    sub: 'Retención del 20–40% en videos de "acampe bajo lluvia". Shorts de apoyo: 30–60s — r/NewTubers & Uppbeat 2026',
  },
  {
    label: 'Completion Rate viral',
    value: '70–85%',
    sub: 'Superar el 85% multiplica 2.8x el potencial viral. Reemplazó al conteo de seguidores como señal principal — InfluenceFlow & SureShot 2026',
  },
  {
    label: '#camping / outdoor TikTok',
    value: '100M+ vistas',
    sub: '#popuptent, #glampinglife, #overlanding. Saves y Shares pesan más que Likes para catapultar el contenido — TikTok / IG nativo & Klap 2026',
  },
]

type Video = {
  platform: 'tiktok' | 'instagram' | 'youtube'
  url: string
  title: string
  creator: string
  views: string
  duration: string
  niche: string
  hook: string
  actions: string[]
  format: string
  audio: string
  cta: string
}

const tiktokVideos: Video[] = [
  {
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@luckyday.us/video/7588892440614997262',
    title: 'Inflatable Tent Setup — Autoensamblaje en segundos',
    creator: '@luckyday.us',
    views: 'Trending #inflatabletent',
    duration: '15–30 seg',
    niche: 'Transformación Visual / RTT',
    hook: 'Los primeros 3 segundos muestran la tienda inflándose sola al presionar un botón. Sin introducción ni voz. Pura transformación visual.',
    actions: [
      'Gancho: tienda armándose automática (0–3s)',
      'Texto overlay: destacar el poco peso del equipo',
      'Acción rápida sin cortes muertos',
      'Resolver el "dolor" del esfuerzo físico visualmente',
    ],
    format: 'Vertical 9:16 / Sin diálogo / Acción directa',
    audio: 'Sonido original del inflado + ambiente',
    cta: 'Texto overlay con beneficio clave en pantalla',
  },
  {
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@campiology/video/7520288957653929229',
    title: 'Inflatable Tent Setup — Campiology',
    creator: '@campiology',
    views: 'Trending #campsetup',
    duration: '15–30 seg',
    niche: 'Setup / Camping / Producto',
    hook: 'Apertura directa al proceso de armado. Sin presentación. El producto resuelve visualmente la fricción de armar carpa.',
    actions: [
      'POV desde el vehículo / suelo mirando el setup',
      'Textos en pantalla con beneficios clave',
      'Corte final al interior listo y cómodo',
      'Early Engagement Velocity: publicar en horario pico',
    ],
    format: 'Vertical / Talking head opcional + B-roll rápido',
    audio: 'Trending sound de fondo suave + sonido ambiente',
    cta: '"¿Lo harías?" o pregunta para impulsar comentarios',
  },
  {
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@leon.111219/video/7389250082748747054',
    title: 'ASMR Camp Cooking — Fuego de leña y comida premium',
    creator: '@leon.111219',
    views: 'Trending #asmrcamping',
    duration: '45–60 seg',
    niche: 'ASMR / Retención Pasiva',
    hook: 'Sin voz. Solo el crepitar del fuego de leña y el sonido de la preparación de comida premium. Inmersión sensorial total.',
    actions: [
      'Cero diálogo — 100% sonido ambiente (ASMR)',
      'Fuego de leña, cortes de carne, cafetera de camping',
      'Planos detalle: vapor, gotas, texturas',
      'Loop natural: el final invita a ver de nuevo',
    ],
    format: 'Vertical / ASMR puro / Planos detalle',
    audio: 'Sonido original: fuego, naturaleza, utensilios',
    cta: 'Pin de ubicación + link producto en bio',
  },
]

const igVideos: Video[] = [
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/p/DIFIazcNI0t/',
    title: 'POV Amanecer desde adentro de la tienda — Gatillo Aspiracional',
    creator: '@outdoor_lifestyle',
    views: 'Formato aspiracional #1 IG',
    duration: '7–10 seg',
    niche: 'Aspiracional / POV / Estética Premium',
    hook: 'Vista POV desde adentro de la tienda al abrir la lona al amanecer. El usuario proyecta su propio deseo de paz y escape.',
    actions: [
      'No se vende el producto, se vende el estilo de vida',
      'Audio viral trending de fondo (obligatorio)',
      'Exportar en 1080x1920px a más de 5000 kbps',
      'Video pixelado = percepción premium destruida',
    ],
    format: 'Vertical 9:16 / Cine estético / Sin cortes',
    audio: 'Audio viral trending (Folk / Ambient emocional)',
    cta: '"Would you wake up here?" — pregunta aspiracional',
  },
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/p/DUMbi8REUet/',
    title: 'Hacks y Tips de Equipamiento — Edición Hiperdinámica',
    creator: '@glamping.hacks',
    views: 'Alto engagement en nicho gear',
    duration: '30–45 seg',
    niche: 'Gear Hacks / Valor Técnico',
    hook: '"La optimización de espacio que nadie te enseña." Gran valor técnico + edición dinámica sincronizada al ritmo de la música.',
    actions: [
      'Cada truco ocupa 2–3 segundos máximo',
      'Cortes sincronizados al beat de la música',
      'Texto overlay con el beneficio de cada hack',
      '"Guardaló para tu próximo trip" al final (Saves = alcance)',
    ],
    format: 'Vertical / Edición hiperdinámica / Musical',
    audio: 'Trending Reel audio — cortes sincronizados al beat',
    cta: '"Guardaló" — los Saves tienen mayor peso algorítmico que los Likes',
  },
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/p/C_dDUJvyO9c/',
    title: 'Demo de Producto RTT — Punto dulce 7–15 seg',
    creator: '@rtt.life',
    views: 'Hasta 85% Engagement Rate',
    duration: '7–15 seg',
    niche: 'Demo / Producto / RTT',
    hook: 'Mostrar el funcionamiento real del equipo en el menor tiempo posible. Sin fricción. El producto habla solo.',
    actions: [
      'Setup completo en menos de 10 segundos de video',
      'Alta calidad visual: mínimo 1080x1920px / 5000 kbps',
      'Comparativa implícita: viejo método vs. este',
      'Plano final: interior listo desde afuera del vehículo',
    ],
    format: 'Vertical / Demo directa / Alta calidad exportación',
    audio: 'Audio trending IG + sonido original setup',
    cta: 'Link en bio + "¿Cuánto tardás en armar la tuya?"',
  },
]

const ytVideos: Video[] = [
  {
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=7QFbt-SLWIw',
    title: 'SOLO Camping in HEAVY RAIN in a Giant Tent — Contraste Inmersivo',
    creator: 'Outdoor YouTuber',
    views: 'Formato #1 retención outdoor',
    duration: '15–30 min',
    niche: 'Contraste Supervivencia / Confort',
    hook: 'Thumbnail: clima hostil + tienda iluminada. Contraste entre tormenta exterior y confort interior. Ritmo lento y relajante.',
    actions: [
      'Instalación de tienda bajo lluvia intensa (apertura)',
      'Preparación de comida reconfortante bajo el toldo',
      'Ritmo lento: el usuario de YT no busca dopamina rápida',
      'Retención objetivo: 20–40% hasta el final (brutal para la plataforma)',
    ],
    format: 'Horizontal / Cinematic lento / ASMR ambiental',
    audio: 'ASMR: lluvia, fuego, cocción + música ambiental suave',
    cta: 'Suscribirse para "parte 2" + gear links en descripción',
  },
  {
    platform: 'youtube',
    url: 'https://www.youtube.com/@yasagurechan/videos',
    title: 'Canal Yasagure-chan — Acampe lento inmersivo',
    creator: '@yasagurechan',
    views: 'Retención excepcional 40–60%',
    duration: '20–35 min',
    niche: 'Inmersión / ASMR / Solo camping',
    hook: 'Ritmo lento sin voz. El ambiente natural es el protagonista. Genera sesiones de visualización ultra largas al priorizar AVD.',
    actions: [
      'AVD (Average View Duration) es la métrica clave en YouTube',
      'Sin voz: solo sonido ambiente y música suave',
      'Planos detalle: equipamiento, naturaleza, comida',
      'Retención del 40–60% = excepcional para el algoritmo YT',
    ],
    format: 'Horizontal / Cinematic ASMR / Sin narración',
    audio: 'ASMR naturaleza + piano ambiental / silencio intencional',
    cta: 'Playlist de serie + Patreon / gear links',
  },
  {
    platform: 'youtube',
    url: 'https://www.youtube.com/@Bushcraft_Tanya/videos',
    title: 'Canal Bushcraft Tanya — Validación de Autoridad Técnica',
    creator: '@Bushcraft_Tanya',
    views: 'Fondo de embudo de compra',
    duration: '10–20 min',
    niche: 'Validación / Review Técnico / Compra',
    hook: 'Reseña técnica detallada. El usuario de YouTube que llega desde TikTok/IG busca validación racional antes de una compra costosa.',
    actions: [
      'Formato lista: especificaciones, pros, contras, precio',
      'Análisis profundo vs. competencia',
      'Derivar tráfico desde Shorts / TikTok / IG al canal',
      'Ideal para fondo del embudo de ventas (conversión)',
    ],
    format: 'Horizontal / Talking head + B-roll producto',
    audio: 'Voz propia clara + música background suave',
    cta: '"Mirá la reseña completa" desde Shorts + links afiliado',
  },
]

type Social = { platform: string; url: string }

type Influencer = {
  initials: string
  color: string
  name: string
  handle: string
  platform: string
  followers: string
  engagement: string
  niche: string[]
  why: string
  contact: string
  hot: boolean
  socials: Social[]
}

const influencers: Influencer[] = [
  {
    initials: 'YC', color: 'av-orange',
    name: 'Yasagure-chan', handle: '@yasagurechan',
    platform: 'YouTube', followers: '25.4K+', engagement: 'AVD alto',
    niche: ['Solo camping', 'ASMR inmersivo', 'Retención larga'],
    why: 'Formato de ritmo lento sin voz que genera retención de 40–60% en YouTube. Ideal para collab inmersiva con RTT inflable en ambiente natural. Audiencia: entusiastas outdoor que buscan escapar mentalmente.',
    contact: 'YouTube About section',
    hot: true,
    socials: [
      { platform: 'YouTube', url: 'https://www.youtube.com/@yasagurechan/videos' },
    ],
  },
  {
    initials: 'BT', color: 'av-teal',
    name: 'Bushcraft Tanya', handle: '@Bushcraft_Tanya',
    platform: 'YouTube', followers: '5.54K+', engagement: 'Alto en nicho bushcraft',
    niche: ['Bushcraft', 'Validación técnica', 'Reviews'],
    why: 'Canal de validación de autoridad técnica. El usuario que llegó desde TikTok/IG busca acá la reseña racional antes de comprar. RTT inflable = review detallado de specs, pros y contras.',
    contact: 'YouTube About section',
    hot: true,
    socials: [
      { platform: 'YouTube', url: 'https://www.youtube.com/@Bushcraft_Tanya/videos' },
    ],
  },
  {
    initials: 'LC', color: 'av-amber',
    name: 'Lucky Day Camping', handle: '@luckyday.us',
    platform: 'TikTok', followers: '174.4K+', engagement: 'Alto (setup viral)',
    niche: ['Setup rápido', 'Transformación visual', 'Producto'],
    why: 'Su video de autoensamblaje de tienda inflable es exactamente el formato #1 del doc. RTT inflable = collab natural de "un botón, tienda lista". Fórmula de transformación visual inmediata 15–30s.',
    contact: 'DM TikTok directo',
    hot: true,
    socials: [
      { platform: 'TikTok', url: 'https://www.tiktok.com/@luckyday.us' },
    ],
  },
  {
    initials: 'CP', color: 'av-green',
    name: 'Campiology', handle: '@campiology',
    platform: 'TikTok', followers: '125.5K+', engagement: 'Engagement orgánico',
    niche: ['Setup camping', 'Producto outdoor', 'Tips'],
    why: 'Creador de contenido de setup camping enfocado en productos. Formato de 15–30s de transformación visual. Audiencia compradora de gear.',
    contact: 'DM TikTok / Bio link',
    hot: false,
    socials: [
      { platform: 'TikTok', url: 'https://www.tiktok.com/@campiology' },
    ],
  },
  {
    initials: 'SC', color: 'av-purple',
    name: 'Silent Camping', handle: '@silentcamping',
    platform: 'TikTok / YT', followers: '1.88K+', engagement: 'Muy alto (Saves)',
    niche: ['ASMR', 'Rain Camping', 'Solo Outdoor'],
    why: 'Especialista en "silencio intencional". Sus videos bajo lluvia intensa generan el contraste supervivencia/confort que el doc señala como clave para retención larga. Ideal para mostrar la impermeabilidad y el confort acústico de la RTT.',
    contact: 'Linktree en Bio',
    hot: true, // Lo marcamos como HOT por su alta tasa de "Saves"
    socials: [
      { platform: 'Instagram', url: 'https://www.instagram.com/silentcamping/' },
      { platform: 'YouTube', url: 'https://www.youtube.com/@SilentCamping' },
    ],
  },
  // Reemplaza el bloque anterior en el array 'influencers' con este:

  {
    initials: 'MP', color: 'av-orange',
    name: 'Matthew Posa', handle: '@matthewposa',
    platform: 'YouTube / IG', followers: '1.4M+', engagement: 'Extremo (Viralidad)',
    niche: ['Extreme Camping', 'Rain/Snow ASMR', 'Dog Camping'],
    why: 'Es el "Rey" del camping bajo condiciones adversas. Sus videos de 30 minutos acampando bajo tormentas son el estándar de oro de retención. Ver una Cmax Air en uno de sus videos bajo lluvia torrencial sería la validación técnica definitiva para el mercado global.',
    contact: 'Business Email en YT /  DM  IG  ',
    hot: true, 
    socials: [
      { platform: 'YouTube', url: 'https://www.youtube.com/@MatthewPosa' },
      { platform: 'Instagram', url: 'https://www.instagram.com/matthewposa' },
    ],
  },
]

const formulaRows = [
  {
    platform: 'TikTok — Transformación Visual',
    best: true,
    duration: '15–30 seg',
    hook: '0–3s: tienda armándose sola (botón). Resolver el dolor del esfuerzo físico visualmente.',
    format: 'Vertical 9:16 / Sin voz / Acción directa',
    audio: 'Sonido original del inflado + ambient',
    retention: '62% Completion Rate promedio. Early Engagement Velocity en primera hora.',
    cta: 'Texto overlay con beneficio clave. "¿Lo harías?" en caption.',
    fuente: 'OpusClip, Neal Schaffer 2026',
  },
  {
    platform: 'TikTok — ASMR Campamento',
    best: false,
    duration: '45–60 seg',
    hook: 'Sin voz. Fuego de leña, carne premium, cafetera. Pura estimulación sensorial desde el frame 1.',
    format: 'Vertical / ASMR puro / Planos detalle',
    audio: 'Sonido ambiente 100%: fuego, lluvia, naturaleza',
    retention: 'Retención pasiva altísima. Loop natural incentiva re-watch.',
    cta: 'Pin de ubicación + link bio. Sin CTA verbal.',
    fuente: 'SocialRails, InfluenceFlow 2026',
  },
  {
    platform: 'Instagram Reels — POV Aspiracional',
    best: false,
    duration: '7–10 seg',
    hook: 'Vista desde adentro de la tienda al abrir la lona al amanecer. Puro estilo de vida.',
    format: 'Vertical / Estético / Sin cortes / Cine',
    audio: 'Audio viral trending (Folk / Ambient emocional)',
    retention: '85% Engagement Rate en demo de producto 7–15s.',
    cta: '"Would you wake up here?" — Saves tienen más peso que Likes.',
    fuente: 'Meta vía InfluenceFlow, Shorts Generator AI 2026',
  },
  {
    platform: 'Instagram Reels — Hacks Dinámicos',
    best: false,
    duration: '30–45 seg',
    hook: '"La optimización de espacio que nadie te enseña." Valor técnico + edición hiperdinámica.',
    format: 'Vertical / Cortes al beat / Musical',
    audio: 'Trending Reel audio — cortes sincronizados al ritmo',
    retention: 'Retención visual por edición. Calidad: 1080x1920 / +5000 kbps obligatorio.',
    cta: '"Guardaló para tu próximo trip" — Saves = alcance orgánico.',
    fuente: 'Meta vía InfluenceFlow, Shorts Generator AI 2026',
  },
  {
    platform: 'YouTube — Contraste Inmersivo',
    best: false,
    duration: '15–35 min',
    hook: 'Clima hostil (lluvia) + confort interior. Ritmo lento. Thumbnail: tormenta + luz cálida dentro.',
    format: 'Horizontal / Cinematic / ASMR ambiental',
    audio: 'Lluvia, fuego, cocción + música suave. Sin narración obligatoria.',
    retention: 'AVD: 20–40% hasta el final = brutal para YT. 40–60% = excepcional.',
    cta: 'Suscribirse para serie. Gear links en descripción. Patreon.',
    fuente: 'r/NewTubers, Uppbeat, Epidemic Sound 2026',
  },
  {
    platform: 'YouTube Shorts',
    best: false,
    duration: '30–60 seg',
    hook: 'Clip más impactante del video largo. Resultado visible en primeros 2s.',
    format: 'Vertical / Loop / Reutilizar contenido largo',
    audio: 'Trending YouTube Shorts audio',
    retention: 'Loop = re-watch sube retention score. Deriva tráfico al canal largo.',
    cta: '"Mirá la reseña completa en el canal" — embudo hacia YouTube largo.',
    fuente: 'r/NewTubers, Uppbeat 2026',
  },
]

/* ─────────────────── COMPONENTS ─────────────────── */

type Tab = 'videos' | 'formula' | 'influencers'

function PlatformBadge({ platform }: { platform: 'tiktok' | 'instagram' | 'youtube' }) {
  const map = {
    tiktok:    { cls: 'pb-tiktok', label: 'TikTok' },
    instagram: { cls: 'pb-ig',     label: 'Instagram' },
    youtube:   { cls: 'pb-yt',     label: 'YouTube' },
  }
  const { cls, label } = map[platform]
  return <span className={`pbadge ${cls}`}>{label}</span>
}

function VideoCard({ v }: { v: Video }) {
  return (
    <a className="vcard-link" href={v.url} target="_blank" rel="noopener noreferrer">
      <span className="vcard-link-label">Ver ↗</span>
      <div className="vcard">
        <div className="vcard-top">
          <div className="vcard-title">{v.title}</div>
          <div className="vcard-views">{v.views}</div>
        </div>
        <div className="vcard-meta">
          <PlatformBadge platform={v.platform} />
          <span className="vtag">{v.creator}</span>
          <span className="vtag vtag-orange">{v.niche}</span>
        </div>
        <div className="vcard-divider" />
        <div className="vcard-kpi">
          <div className="kpi-item"><div className="kpi-label">Duración</div><div className="kpi-val">{v.duration}</div></div>
          <div className="kpi-item"><div className="kpi-label">Formato</div><div className="kpi-val">{v.format.split('/')[0].trim()}</div></div>
          <div className="kpi-item"><div className="kpi-label">Audio</div><div className="kpi-val">{v.audio.slice(0, 30)}</div></div>
          <div className="kpi-item"><div className="kpi-label">CTA clave</div><div className="kpi-val">{v.cta.slice(0, 30)}</div></div>
        </div>
        <div className="vcard-hook"><strong style={{ color: '#2A9BA6' }}>Hook: </strong>{v.hook}</div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.06em' }}>Acciones clave</div>
        <div className="vcard-actions">
          {v.actions.map((a, i) => (
            <div key={i} className="action-item">
              <div className="action-dot" />
              <span>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </a>
  )
}

function InfluencerCard({ inf }: { inf: Influencer }) {
  const [open, setOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="icard">
      <div className="icard-header">
        <div className={`icard-avatar ${inf.color}`}>{inf.initials}</div>
        <div style={{ flex: 1 }}>
          <div className="icard-name-wrap" ref={dropRef}>
            <button className="icard-name-btn" onClick={() => setOpen(o => !o)} type="button">
              {inf.name}
              {inf.hot && (
                <span style={{ fontSize: 10, background: '#FF5722', color: '#fff', borderRadius: 10, padding: '1px 7px', fontWeight: 700 }}>
                  HOT
                </span>
              )}
              <span className={`icard-name-arrow ${open ? 'open' : ''}`}>▼</span>
            </button>
            {open && (
              <div className="icard-dropdown">
                {inf.socials.map(s => (
                  <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.platform}
                    <span className="icard-dropdown-arrow">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="icard-handle">{inf.handle} · {inf.platform}</div>
        </div>
      </div>

      <div className="icard-stats">
        <div className="istat"><div className="istat-val">{inf.followers.split(' ')[0]}</div><div className="istat-lbl">Seguidores</div></div>
        <div className="istat"><div className="istat-val">{inf.engagement}</div><div className="istat-lbl">Eng.</div></div>
        <div className="istat"><div className="istat-val">{inf.niche.length}</div><div className="istat-lbl">Nichos</div></div>
      </div>

      <div className="icard-tags">
        {inf.niche.map(n => <span key={n} className="icard-tag">{n}</span>)}
      </div>

      <div className="icard-why">{inf.why}</div>
      <div className="icard-contact">Contacto: {inf.contact}</div>
    </div>
  )
}

/* ─────────────────── PAGE ─────────────────── */

export default function Page() {
  const [tab, setTab] = useState<Tab>('videos')

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo-wrap">
          {/* <Image
            src="/logo.png" alt="Cmax Air" width={64} height={64}
            style={{ objectFit: 'contain', mixBlendMode: 'multiply', filter: 'drop-shadow(0 2px 6px rgba(255,87,34,.18))' }}
            priority
          /> */}
          <span className="logo-name">Cmax Air</span>
        </div>
        <h1>Content Strategy — <span className="hl">Fórmulas Virales Outdoor</span></h1>
        <p>
          <span className="hl">TikTok · Instagram · YouTube</span> — videos, fórmulas y creadores con fuentes verificadas 2026
        </p>
      </header>

      <main className="wrap">

        {/* MÉTRICAS */}
        <div className="metric-grid">
          {metrics.map(m => (
            <div key={m.label} className="mcard">
              <div className="mlabel">{m.label}</div>
              <div className="mvalue">{m.value}</div>
              <div className="msub">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="nav-tabs">
          {([
            { id: 'videos',      label: 'Videos de Referencia' },
            { id: 'formula',     label: 'Fórmulas Virales' },
            { id: 'influencers', label: 'Creadores Clave' },
          ] as { id: Tab; label: string }[]).map(t => (
            <button key={t.id} className={`tab-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: VIDEOS ── */}
        {tab === 'videos' && (
          <>
            <div className="card">
              <div className="stitle">TikTok — Videos de Referencia Verificados</div>
              <div className="video-grid">
                {tiktokVideos.map(v => <VideoCard key={v.title} v={v} />)}
              </div>
            </div>

            <div className="card">
              <div className="stitle">Instagram Reels — Referencias por Formato</div>
              <div className="video-grid">
                {igVideos.map(v => <VideoCard key={v.title} v={v} />)}
              </div>
            </div>

            <div className="card">
              <div className="stitle">YouTube — Canales de Referencia (Largo y Shorts)</div>
              <div className="video-grid">
                {ytVideos.map(v => <VideoCard key={v.title} v={v} />)}
              </div>
            </div>
          </>
        )}

        {/* ── TAB: FÓRMULAS ── */}
        {tab === 'formula' && (
          <>
            <div className="card">
              <div className="stitle">Fórmulas virales por plataforma y formato — fuentes 2026</div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Plataforma / Fórmula</th>
                      <th>Duración</th>
                      <th>Hook (0–3s)</th>
                      <th>Formato</th>
                      <th>Audio</th>
                      <th>Retention Target</th>
                      <th>CTA</th>
                      <th>Fuente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formulaRows.map(r => (
                      <tr key={r.platform} className={r.best ? 'tr-best' : ''}>
                        <td>
                          <strong>{r.platform}</strong>
                          {r.best && (
                            <span style={{ fontSize: 9, marginLeft: 4, background: '#FF5722', color: '#fff', borderRadius: 8, padding: '1px 6px', fontWeight: 700 }}>
                              BEST
                            </span>
                          )}
                        </td>
                        <td>{r.duration}</td>
                        <td>{r.hook}</td>
                        <td>{r.format}</td>
                        <td>{r.audio}</td>
                        <td>{r.retention}</td>
                        <td>{r.cta}</td>
                        <td><span className="source-tag">{r.fuente}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 8, textAlign: 'right' }}>← deslizá para ver completa</p>
            </div>

            <div className="card">
              <div className="stitle">Claves y trucos de retención — por formato (doc completo)</div>
              <div className="tips-grid">
                {[
                  {
                    title: 'El silencio intencional (ASMR)',
                    body: <span>En lugar de hablar a la cámara, apoyate en la estimulación sensorial. Deja el video sin voz dominado por lluvia, fuego de leña o cafetera. <span className="tip-highlight">Genera retención pasiva altísima</span> y elimina barreras de idioma con audiencias internacionales. — Fuente: Doc / SocialRails 2026</span>,
                  },
                  {
                    title: 'Transformación visual inmediata',
                    body: <span>En 15–30s, el gancho es mostrar el armado automático apretando un solo botón. <span className="tip-highlight">Retiene porque resuelve el dolor del esfuerzo físico</span> visualmente. Apoyate en texto overlay con beneficios clave como el poco peso de la tienda. — Fuente: Doc / InfluenceFlow 2026</span>,
                  },
                  {
                    title: 'El gatillo aspiracional (POV)',
                    body: <span>Para 7–10s, no vendas el producto: vendé el estilo de vida. Vista POV al abrir la tienda al amanecer. <span className="tip-highlight">El usuario proyecta su propio deseo de paz y escape.</span> Audio viral trending = obligatorio para potenciar. — Fuente: Doc / Shorts Generator AI 2026</span>,
                  },
                  {
                    title: '¿Por qué casi todos los videos son en la lluvia?',
                    body: <span>Contraste de supervivencia y confort: clima hostil afuera + comodidad adentro. <span className="tip-highlight">Un video de 30min de acampe bajo lluvia retiene al 20–40% de los espectadores hasta el final</span>, lo cual es brutal para YouTube. — Fuente: Doc / r/NewTubers 2026</span>,
                  },
                  {
                    title: 'Early Engagement Velocity (TikTok)',
                    body: <span>La métrica secreta de TikTok. Un video que consigue interacciones rápidas en su <span className="tip-highlight">primera o segunda hora de publicación</span> tiene muchas más posibilidades de escalar al FYP que uno con interacciones lentas, incluso si tienen la misma calidad. — Fuente: Doc / Neal Schaffer 2026</span>,
                  },
                  {
                    title: 'Calidad de exportación en IG (obligatorio)',
                    body: <span>En el nicho glamping, la percepción premium es todo. Reels subidos a <span className="tip-highlight">1080x1920px con bitrate superior a 5000 kbps</span> sufren un 28% menos de degradación visual. Un video pixelado destruye inmediatamente la percepción premium de tu marca. — Fuente: Doc / Meta vía InfluenceFlow 2026</span>,
                  },
                  {
                    title: 'Saves y Shares > Likes (IG 2026)',
                    body: <span>Los "Guardados" (Saves) y "Compartidas" (Shares) tienen <span className="tip-highlight">peso algorítmico mucho mayor que un Like</span> para catapultar el contenido. Diseñá contenido "de referencia": gear lists, campsite setups, packing guides. Terminá siempre con "Guardaló para tu próximo trip". — Fuente: Doc / Klap 2026</span>,
                  },
                  {
                    title: 'Edición hiperdinámica musical (IG Hacks)',
                    body: <span>Cuando mostrás hacks o trucos, la clave de retención es <span className="tip-highlight">cortes sincronizados al ritmo de la música</span>. Cada truco no debe ocupar más de 2–3 segundos. La energía del beat mantiene al espectador enganchado visualmente de principio a fin. — Fuente: Doc / Shorts Generator AI 2026</span>,
                  },
                ].map((tip, i) => (
                  <div key={i} className="tip-card">
                    <div className="tip-title">{tip.title}</div>
                    <div className="tip-body">{tip.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── TAB: CREADORES ── */}
        {tab === 'influencers' && (
          <div className="card">
            <div className="stitle">Creadores clave identificados en el documento — haz clic en el nombre para ver sus redes</div>
            <div className="inf-grid">
              {influencers.map(inf => <InfluencerCard key={inf.handle} inf={inf} />)}
            </div>
            <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(77,184,196,.07)', borderRadius: 8, fontSize: 13, color: '#374151', lineHeight: 1.7 }}>
              <strong style={{ color: '#2A9BA6' }}>Estrategia de embudo multi-plataforma (doc):</strong>{' '}
              TikTok e Instagram Reels generan el tráfico inicial con formatos cortos de dopamina rápida (15–30s). Ese tráfico se deriva a YouTube, donde el usuario busca validación racional antes de una compra costosa. Los Shorts de YouTube actúan como puente entre el corto y el largo. Los creadores de ASMR y POV son los más eficientes para la fase de descubrimiento; los canales técnicos de review son los más eficientes para la fase de conversión.
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="footer">
          <div className="footer-inner">
            <Image
              src="/logo.png" alt="Cmax Air" width={48} height={48}
              className="footer-logo"
              style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
            />
            <div className="footer-text">
              <p>Content Strategy para</p>
              <strong>Cmax Air</strong>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
