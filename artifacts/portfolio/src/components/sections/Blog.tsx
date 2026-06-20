import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

const GREEN = "#2d5a27";

interface Post {
  id: number;
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  body: string[];
  featured?: boolean;
  initialLikes: number;
}

const posts: Post[] = [
  {
    id: 1,
    date: "Marzo 2025",
    tag: "Prevención",
    title: "Por qué la prevención es tu mejor medicina",
    excerpt:
      "Conoce cómo pequeñas acciones diarias pueden reducir drásticamente el riesgo de enfermedades cardiovasculares, respiratorias y metabólicas.",
    body: [
      "La medicina preventiva no es un lujo — es la estrategia más inteligente y eficiente para proteger tu salud a largo plazo. Numerosos estudios demuestran que hasta el 80% de las enfermedades crónicas más comunes son prevenibles con cambios sostenidos en el estilo de vida.",
      "La actividad física regular, incluso 30 minutos diarios de caminata moderada, tiene un impacto medible en la presión arterial, el control glucémico y la capacidad pulmonar. No se necesita un gimnasio ni un plan costoso — la constancia es el ingrediente más valioso.",
      "La alimentación balanceada, el sueño reparador y la gestión del estrés forman el trío esencial de la prevención. Cada hábito que construyes hoy es una inversión directa en tu calidad de vida a los 50, 60 y más años.",
      "Como profesional de la salud respiratoria y pública, mi enfoque siempre prioriza la educación del paciente. Un paciente informado es un paciente empoderado — capaz de tomar decisiones que impactan positivamente su salud mucho antes de que aparezcan los síntomas.",
      "Si tienes historia familiar de enfermedades cardiovasculares, diabetes o enfermedades pulmonares, consultar con un especialista para diseñar un plan preventivo personalizado puede marcar la diferencia entre una vida plena y años de tratamientos reactivos.",
    ],
    featured: true,
    initialLikes: 34,
  },
  {
    id: 2,
    date: "Abril 2025",
    tag: "Salud Respiratoria",
    title: "EPOC: lo que debes saber antes de que robe tu aliento",
    excerpt:
      "La EPOC afecta a millones sin que lo sepan. Aprende a identificar síntomas tempranos y estrategias de manejo que marcan la diferencia.",
    body: [
      "La Enfermedad Pulmonar Obstructiva Crónica (EPOC) es una de las condiciones respiratorias más prevalentes en el mundo, y sin embargo, millones de personas la padecen sin saberlo. El diagnóstico tardío es uno de los principales problemas que enfrenta esta enfermedad.",
      "Los síntomas iniciales — tos persistente, producción de esputo matutino y ligera falta de aire al hacer esfuerzo — se confunden frecuentemente con el 'envejecimiento normal'. Esta normalización del síntoma es un error costoso.",
      "La espirometría es la herramienta diagnóstica clave: un examen sencillo, no invasivo, que mide la función pulmonar en cuestión de minutos. Si fumas o fumaste, si tienes más de 40 años, o si tienes exposición crónica a humo o polvo, este examen debería ser parte de tus controles anuales.",
      "El tratamiento moderno de la EPOC incluye broncodilatadores inhalados, fisioterapia respiratoria y rehabilitación cardiopulmonar. Con un manejo adecuado, los pacientes pueden mantener una excelente calidad de vida y frenar la progresión de la enfermedad.",
      "El abandono del tabaco sigue siendo la intervención más poderosa: detiene el deterioro acelerado de la función pulmonar y mejora la respuesta a todos los demás tratamientos. Nunca es tarde para dejar de fumar.",
    ],
    initialLikes: 21,
  },
  {
    id: 3,
    date: "Mayo 2025",
    tag: "Bienestar Laboral",
    title: "Estrés laboral: ¿mito o realidad que destruye tu salud?",
    excerpt:
      "El estrés crónico tiene consecuencias físicas medibles. Descubre qué dice la ciencia y qué puedes hacer hoy para protegerte.",
    body: [
      "El estrés laboral crónico no es una debilidad ni una exageración — es un estado fisiológico con consecuencias orgánicas documentadas. El cortisol elevado de forma sostenida afecta el sistema inmune, aumenta la presión arterial y deteriora la calidad del sueño.",
      "Desde la salud respiratoria, el estrés tiene un impacto directo: la respiración se vuelve superficial y torácica, reduciendo la oxigenación efectiva. Con el tiempo, esto puede exacerbar condiciones como el asma y contribuir al síndrome de hiperventilación.",
      "Las empresas que invierten en bienestar laboral reportan reducción en el ausentismo, mayor productividad y menor rotación de personal. El bienestar del trabajador no es un gasto — es una estrategia de negocio con ROI medible.",
      "Técnicas de respiración diafragmática practicadas durante 5-10 minutos diarios han demostrado reducir los niveles de cortisol en plasma, bajar la frecuencia cardíaca y mejorar la percepción subjetiva de bienestar.",
      "Si identificas señales de alarma — insomnio persistente, irritabilidad constante o sensación de ahogo — no esperes a que el cuerpo hable más fuerte. La intervención temprana en salud laboral cambia trayectorias de vida.",
    ],
    featured: true,
    initialLikes: 48,
  },
  {
    id: 4,
    date: "Junio 2025",
    tag: "Terapia Respiratoria",
    title: "CPAP y BPAP: todo lo que necesitas para dormir mejor",
    excerpt:
      "Los dispositivos de presión positiva son la solución más efectiva para la apnea del sueño. Descubre cómo funcionan y cómo adaptarte.",
    body: [
      "La apnea obstructiva del sueño afecta a aproximadamente el 10% de la población adulta, aunque se estima que más del 80% de los casos moderados y severos permanecen sin diagnosticar. Las consecuencias van desde somnolencia diurna hasta hipertensión y mayor riesgo cardiovascular.",
      "Los dispositivos CPAP y BPAP actúan como 'férulas neumáticas': generan un flujo de aire a presión que mantiene la vía aérea abierta durante el sueño, eliminando las pausas respiratorias que interrumpen el descanso.",
      "La adherencia al tratamiento es el factor más crítico para el éxito. Con una titulación adecuada de presiones, una mascarilla bien ajustada y un seguimiento técnico personalizado, la mayoría de los pacientes se adapta satisfactoriamente en 2-4 semanas.",
      "Los beneficios documentados del tratamiento continuo incluyen: reducción de la somnolencia diurna, mejora de la concentración, descenso de la presión arterial y reducción del riesgo de eventos cardiovasculares.",
      "Si tu pareja reporta que dejas de respirar durante el sueño, o si te despiertas sin sentirte descansado a pesar de dormir 7-8 horas, una evaluación de sueño es el siguiente paso.",
    ],
    initialLikes: 17,
  },
];

const CARD_INTERVAL = 4000;
const READ_PAUSE    = 4000;
const FADE_DURATION = 600;

/* ── Icons ── */
function ShareIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill={filled ? "white" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}
function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  );
}

/* ── Full-page Article View ── */
function ArticlePage({ post, onClose }: { post: Post; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#080808", overflowY: "auto",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Sticky top bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(8,8,8,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(20px, 5vw, 80px)", height: "64px", flexShrink: 0,
      }}>
        <button
          onClick={onClose}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.6)", fontFamily: "serif",
            fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase",
            transition: "color 0.2s", padding: 0,
          }}
        >
          <ArrowLeftIcon />
          <span>Volver</span>
        </button>

        <span style={{
          fontFamily: "serif", fontSize: "0.62rem", letterSpacing: "0.18em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
        }}>
          Dr. Mario Sánchez
        </span>
      </div>

      {/* Article content */}
      <div style={{
        flex: 1, maxWidth: "760px", width: "100%",
        margin: "0 auto", padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 48px) 80px",
      }}>

        {/* Meta row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
          {post.featured && <span style={{ fontSize: "1rem", color: "#ffd700" }}>★</span>}
          <span style={{
            fontFamily: "serif", fontSize: "0.6rem", letterSpacing: "0.14em",
            textTransform: "uppercase", background: "white", color: "#0a0a0a",
            padding: "4px 12px", borderRadius: "9999px", fontWeight: 700,
          }}>{post.tag}</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{
            fontFamily: "serif", fontSize: "0.65rem", letterSpacing: "0.16em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
          }}>{post.date}</span>
        </div>

        {/* Title — left on desktop, centered on mobile */}
        <h1 className="text-center md:text-left" style={{
          fontFamily: "serif", fontWeight: 700,
          fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)",
          color: "white", lineHeight: 1.25, marginBottom: "28px",
        }}>
          {post.title}
        </h1>

        {/* Decorative line — centered on mobile, left on desktop */}
        <div className="mx-auto md:mx-0" style={{ height: "2px", width: "40px", background: GREEN, borderRadius: "9999px", marginBottom: "32px" }} />

        {/* Body paragraphs — left-aligned, small text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {post.body.map((para, i) => (
            <p key={i} style={{
              fontFamily: "serif", fontSize: "0.82rem",
              lineHeight: 1.85, color: "rgba(255,255,255,0.68)", margin: 0,
              textAlign: "left",
            }}>
              {para}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontFamily: "serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em", margin: 0 }}>
            Dr. Mario Sánchez · Terapeuta Respiratorio &amp; Salubrista Público
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Blog Card ── */
function BlogCard({
  post, num, liked, likes, onLike, onShare, onRead,
}: {
  post: Post; num: number; liked: boolean; likes: number;
  onLike: () => void; onShare: () => void; onRead: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 52 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 52 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -7, transition: { duration: 0.3 } }}
      className="relative flex flex-col overflow-hidden shrink-0"
      style={{
        background: "#0a0a0a",
        borderRadius: "22px",
        boxShadow: "0 6px 28px rgba(0,0,0,0.3)",
        width: "100%",
        height: "100%",
        padding: "22px 18px 18px",
        textAlign: "center",
      }}
    >
      {/* Featured star */}
      {post.featured && (
        <div style={{ position: "absolute", top: "13px", right: "13px" }}>
          <span style={{ fontSize: "0.8rem", color: "#ffd700" }}>★</span>
        </div>
      )}

      {/* Tag + Date row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "8px", marginBottom: "12px", flexWrap: "nowrap",
      }}>
        <span style={{
          fontFamily: "serif", fontSize: "0.54rem", letterSpacing: "0.14em",
          textTransform: "uppercase", background: "white", color: "#0a0a0a",
          padding: "2px 9px", borderRadius: "9999px", fontWeight: 700,
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {post.tag}
        </span>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.55rem" }}>·</span>
        <span style={{
          fontFamily: "serif", fontSize: "0.58rem", letterSpacing: "0.12em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {post.date}
        </span>
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "12px" }} />

      {/* Title */}
      <h3 style={{
        fontFamily: "serif", fontWeight: 700, fontSize: "0.88rem",
        lineHeight: 1.35, color: "white", marginBottom: "10px",
      }}>
        {post.title}
      </h3>

      {/* Excerpt — flex:1 fills remaining space like SpecCard text area */}
      <p style={{
        fontFamily: "serif", fontSize: "0.72rem", lineHeight: 1.65,
        color: "rgba(255,255,255,0.5)", marginBottom: "14px", flex: 1,
      }}>
        {post.excerpt}
      </p>

      {/* Green accent line — mirrors SpecCard bottom line */}
      <div style={{
        height: "1.5px", width: "32px", borderRadius: "9999px",
        background: GREEN, margin: "0 auto 14px",
      }} />

      <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "12px" }} />

      {/* Actions */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "10px", flexWrap: "nowrap",
      }}>
        <button onClick={onLike} style={{
          display: "flex", alignItems: "center", gap: "3px",
          background: "none", border: "none", cursor: "pointer",
          color: liked ? "white" : "rgba(255,255,255,0.38)",
          fontFamily: "serif", fontSize: "0.58rem", letterSpacing: "0.06em",
          transition: "color 0.2s", padding: 0, whiteSpace: "nowrap",
        }}>
          <HeartIcon filled={liked} />
          <span>{likes}</span>
        </button>

        <span style={{ color: "rgba(255,255,255,0.13)", fontSize: "0.65rem" }}>|</span>

        <button onClick={onShare} style={{
          display: "flex", alignItems: "center", gap: "3px",
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.38)", fontFamily: "serif",
          fontSize: "0.58rem", letterSpacing: "0.06em",
          transition: "color 0.2s", padding: 0, whiteSpace: "nowrap",
        }}>
          <ShareIcon />
          <span>Compartir</span>
        </button>

        <span style={{ color: "rgba(255,255,255,0.13)", fontSize: "0.65rem" }}>|</span>

        <button onClick={onRead} style={{
          display: "flex", alignItems: "center", gap: "3px",
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.38)", fontFamily: "serif",
          fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase",
          transition: "color 0.2s", padding: 0, whiteSpace: "nowrap",
        }}>
          <span>Leer</span>
          <span>→</span>
        </button>
      </div>

      {/* Mobile card number */}
      <div className="md:hidden absolute bottom-2.5 right-3.5 select-none pointer-events-none" style={{ opacity: 0.28 }}>
        <span style={{ fontFamily: "serif", color: "rgba(255,255,255,0.7)", fontSize: "0.7rem" }}>
          {num.toString()}
        </span>
      </div>
    </motion.article>
  );
}

/* ── Main Section ── */
export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-120px" });

  const [pcVisible, setPcVisible] = useState<number[]>([]);
  const [cycle, setCycle]         = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);
  const touchStartX               = useRef(0);

  const [likedMap, setLikedMap]   = useState<Record<number, boolean>>({});
  const [likesMap, setLikesMap]   = useState<Record<number, number>>(
    Object.fromEntries(posts.map(p => [p.id, p.initialLikes]))
  );
  const [shared, setShared]       = useState<number | null>(null);
  const [reading, setReading]     = useState<Post | null>(null);

  const handleLike = (id: number) => {
    const wasLiked = likedMap[id];
    setLikedMap(m => ({ ...m, [id]: !wasLiked }));
    setLikesMap(m => ({ ...m, [id]: m[id] + (wasLiked ? -1 : 1) }));
  };

  const handleShare = (post: Post) => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href).catch(() => {});
    }
    setShared(post.id);
    setTimeout(() => setShared(null), 2000);
  };

  useEffect(() => {
    if (!isInView) return;
    const ts: ReturnType<typeof setTimeout>[] = [];
    const run = (t: () => void, ms: number) => { const id = setTimeout(t, ms); ts.push(id); };
    setPcVisible([]);
    for (let i = 0; i < posts.length; i++) {
      run(() => setPcVisible(prev => [...prev, i]), i * CARD_INTERVAL);
    }
    const endBatch = (posts.length - 1) * CARD_INTERVAL + READ_PAUSE;
    run(() => setPcVisible([]), endBatch);
    run(() => setCycle(c => c + 1), endBatch + FADE_DURATION + 200);
    return () => ts.forEach(clearTimeout);
  }, [isInView, cycle]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) {
      if (dx > 0) setMobileIdx(p => (p + 1) % posts.length);
      else        setMobileIdx(p => (p - 1 + posts.length) % posts.length);
    }
  };

  return (
    <>
      {/* Full-page article view */}
      <AnimatePresence>
        {reading && <ArticlePage post={reading} onClose={() => setReading(null)} />}
      </AnimatePresence>

      {/* Shared toast */}
      <AnimatePresence>
        {shared !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            style={{
              background: "rgba(0,0,0,0.85)", color: "white",
              fontFamily: "serif", fontSize: "0.75rem",
              padding: "8px 20px", borderRadius: "9999px", letterSpacing: "0.08em",
            }}
          >
            Enlace copiado ✓
          </motion.div>
        )}
      </AnimatePresence>

      <section id="blog" ref={sectionRef} className="relative" style={{ background: GREEN }} data-testid="section-blog">
        {/* Wave top — mobile only */}
        <div className="md:hidden w-full overflow-hidden" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: "90px" }}>
            <path d="M0,60 C480,0 960,90 1440,30 L1440,0 L0,0 Z" fill="white" />
          </svg>
        </div>

        <div className="container mx-auto px-6 md:px-12 pt-10 pb-10 md:pt-14 md:pb-28">

          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-14">
            <motion.p
              className="font-serif uppercase"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "clamp(0.6rem, 2.2vw, 0.75rem)",
                letterSpacing: "clamp(0.08em, 1.5vw, 0.25em)",
                marginBottom: "1rem", whiteSpace: "nowrap",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Artículos &amp; Reflexiones
            </motion.p>
            <motion.h2
              className="font-serif font-bold text-white leading-tight text-center"
              style={{ fontSize: "min(calc((100vw - 64px) / 13.5), 3rem)", whiteSpace: "nowrap" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Espacio de Salud
            </motion.h2>
            <div className="flex justify-center mt-5">
              <div className="h-px w-16" style={{ background: "rgba(255,255,255,0.45)" }} />
            </div>
          </div>

          {/* Desktop grid — same min-h as Topics, no items-start → CSS grid equalizes heights */}
          <div className="hidden md:grid grid-cols-4 gap-5 min-h-[340px]">
            <AnimatePresence mode="popLayout">
              {posts.map((post, i) =>
                pcVisible.includes(i) ? (
                  <BlogCard
                    key={post.id}
                    post={post}
                    num={i + 1}
                    liked={!!likedMap[post.id]}
                    likes={likesMap[post.id]}
                    onLike={() => handleLike(post.id)}
                    onShare={() => handleShare(post)}
                    onRead={() => setReading(post)}
                  />
                ) : null
              )}
            </AnimatePresence>
          </div>

          {/* Mobile carousel — same height as Topics (355px) */}
          <div
            className="md:hidden relative overflow-hidden"
            style={{ height: "355px" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={mobileIdx}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 px-2"
              >
                <BlogCard
                  post={posts[mobileIdx]}
                  num={mobileIdx + 1}
                  liked={!!likedMap[posts[mobileIdx].id]}
                  likes={likesMap[posts[mobileIdx].id]}
                  onLike={() => handleLike(posts[mobileIdx].id)}
                  onShare={() => handleShare(posts[mobileIdx])}
                  onRead={() => setReading(posts[mobileIdx])}
                />
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-[-28px] left-0 right-0 flex justify-center gap-2">
              {posts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIdx(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === mobileIdx ? "18px" : "7px",
                    height: "7px",
                    background: i === mobileIdx ? "white" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Mobile text below dots */}
          <div className="md:hidden flex flex-col items-center gap-2 mt-10">
            <p className="font-serif text-center text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)", maxWidth: "280px" }}>
              Información práctica sobre prevención, salud respiratoria y bienestar.
            </p>
            <div className="h-[1.5px] w-10 rounded-full" style={{ background: "rgba(255,255,255,0.35)" }} />
          </div>

        </div>

        {/* Wave bottom */}
        <div className="w-full overflow-hidden" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: "90px" }}>
            <path d="M0,30 C360,90 1080,0 1440,60 L1440,90 L0,90 Z" fill="white" />
          </svg>
        </div>
      </section>
    </>
  );
}
