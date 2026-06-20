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
      "La Enfermedad Pulmonar Obstructiva Crónica afecta a millones sin que lo sepan. Aprende a identificar síntomas tempranos y estrategias de manejo.",
    body: [
      "La Enfermedad Pulmonar Obstructiva Crónica (EPOC) es una de las condiciones respiratorias más prevalentes en el mundo, y sin embargo, millones de personas la padecen sin saberlo. El diagnóstico tardío es uno de los principales problemas que enfrenta esta enfermedad.",
      "Los síntomas iniciales — tos persistente, producción de esputo matutino y ligera falta de aire al hacer esfuerzo — se confunden frecuentemente con el 'envejecimiento normal' o con efectos del tabaco que se consideran inevitables. Esta normalización del síntoma es un error costoso.",
      "La espirometría es la herramienta diagnóstica clave: un examen sencillo, no invasivo, que mide la función pulmonar en cuestión de minutos. Si fumas o fumaste, si tienes más de 40 años, o si tienes exposición crónica a humo o polvo, este examen debería ser parte de tus controles anuales.",
      "El tratamiento moderno de la EPOC incluye broncodilatadores inhalados, fisioterapia respiratoria y rehabilitación cardiopulmonar. Con un manejo adecuado, los pacientes pueden mantener una excelente calidad de vida y frenar significativamente la progresión de la enfermedad.",
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
      "Desde la salud respiratoria, el estrés tiene un impacto directo: la respiración se vuelve superficial y torácica, reduciendo la oxigenación efectiva. Con el tiempo, esto puede exacerbar condiciones como el asma, agravar el insomnio y contribuir al síndrome de hiperventilación.",
      "Las empresas que invierten en bienestar laboral reportan reducción en el ausentismo, mayor productividad y menor rotación de personal. El bienestar del trabajador no es un gasto — es una estrategia de negocio inteligente con ROI medible.",
      "Técnicas de respiración diafragmática practicadas durante 5-10 minutos diarios han demostrado reducir los niveles de cortisol en plasma, bajar la frecuencia cardíaca y mejorar la percepción subjetiva de bienestar. Son herramientas accesibles y gratuitas.",
      "Si identificas señales de alarma — insomnio persistente, irritabilidad constante, dolores de cabeza frecuentes o sensación de ahogo — no esperes a que el cuerpo hable más fuerte. La intervención temprana en salud mental y física laboral cambia trayectorias de vida.",
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
      "Los dispositivos de presión positiva son la solución más efectiva para la apnea del sueño. Descubre cómo funcionan y cómo adaptarte fácilmente.",
    body: [
      "La apnea obstructiva del sueño afecta a aproximadamente el 10% de la población adulta, aunque se estima que más del 80% de los casos moderados y severos permanecen sin diagnosticar. Las consecuencias van desde somnolencia diurna hasta hipertensión arterial, arritmias y mayor riesgo cardiovascular.",
      "Los dispositivos CPAP (Presión Positiva Continua) y BPAP (Presión Positiva de Dos Niveles) actúan como 'férulas neumáticas': generan un flujo de aire a presión que mantiene la vía aérea abierta durante el sueño, eliminando las pausas respiratorias que interrumpen el descanso.",
      "La adherencia al tratamiento es el factor más crítico para el éxito. Muchos pacientes abandonan el dispositivo en las primeras semanas por incomodidad. Sin embargo, con una titulación adecuada de presiones, una mascarilla bien ajustada y un seguimiento técnico personalizado, la mayoría de los pacientes se adapta satisfactoriamente en 2-4 semanas.",
      "Los beneficios documentados del tratamiento continuo incluyen: reducción significativa de la somnolencia diurna, mejora de la concentración y memoria, descenso de la presión arterial y reducción del riesgo de eventos cardiovasculares en pacientes de alto riesgo.",
      "Si tu pareja reporta que dejas de respirar durante el sueño, si roncas intensamente o si te despiertas sin sentirte descansado a pesar de dormir 7-8 horas, una evaluación de sueño es el siguiente paso. El diagnóstico temprano puede transformar literalmente la calidad de tu vida.",
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
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "white" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

/* ── Article Modal ── */
function ArticleModal({ post, onClose }: { post: Post; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "#0f0f0f", borderRadius: "22px", maxWidth: "680px", width: "100%",
            maxHeight: "88vh", overflowY: "auto", padding: "36px 32px 40px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "20px", right: "20px",
              background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%",
              width: "36px", height: "36px", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.7)",
            }}
          >
            <CloseIcon />
          </button>

          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            {post.featured && <span style={{ fontSize: "0.85rem" }}>★</span>}
            <span style={{
              fontFamily: "serif", fontSize: "0.58rem", letterSpacing: "0.14em",
              textTransform: "uppercase", background: "white", color: "#0a0a0a",
              padding: "3px 10px", borderRadius: "9999px", fontWeight: 700,
            }}>{post.tag}</span>
            <span style={{ fontFamily: "serif", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h2 style={{ fontFamily: "serif", fontWeight: 700, fontSize: "clamp(1.3rem, 4vw, 1.75rem)", color: "white", lineHeight: 1.3, marginBottom: "24px" }}>
            {post.title}
          </h2>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "24px" }} />

          {/* Body */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {post.body.map((para, i) => (
              <p key={i} style={{ fontFamily: "serif", fontSize: "0.9rem", lineHeight: 1.8, color: "rgba(255,255,255,0.72)", margin: 0 }}>
                {para}
              </p>
            ))}
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "28px 0 20px" }} />

          {/* Footer */}
          <p style={{ fontFamily: "serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textAlign: "center" }}>
            Dr. Mario Sánchez · Terapeuta Respiratorio & Salubrista Público
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
        padding: "24px 20px 20px",
        textAlign: "center",
      }}
    >
      {/* Featured star */}
      {post.featured && (
        <div style={{ position: "absolute", top: "14px", right: "14px" }}>
          <span style={{ fontSize: "0.85rem" }} title="Artículo destacado">★</span>
        </div>
      )}

      {/* Tag + Date — same row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "14px", flexWrap: "nowrap" }}>
        <span style={{
          fontFamily: "serif", fontSize: "0.56rem", letterSpacing: "0.14em",
          textTransform: "uppercase", background: "white", color: "#0a0a0a",
          padding: "3px 10px", borderRadius: "9999px", fontWeight: 700,
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {post.tag}
        </span>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.6rem" }}>·</span>
        <span style={{ fontFamily: "serif", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap", flexShrink: 0 }}>
          {post.date}
        </span>
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "14px" }} />

      {/* Title */}
      <h3 style={{ fontFamily: "serif", fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.35, color: "white", marginBottom: "10px" }}>
        {post.title}
      </h3>

      {/* Excerpt */}
      <p style={{ fontFamily: "serif", fontSize: "0.72rem", lineHeight: 1.65, color: "rgba(255,255,255,0.5)", marginBottom: "18px" }}>
        {post.excerpt}
      </p>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "14px" }} />

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "nowrap" }}>
        <button
          onClick={onLike}
          style={{
            display: "flex", alignItems: "center", gap: "4px",
            background: "none", border: "none", cursor: "pointer",
            color: liked ? "white" : "rgba(255,255,255,0.4)",
            fontFamily: "serif", fontSize: "0.6rem", letterSpacing: "0.08em",
            transition: "color 0.2s", padding: 0, whiteSpace: "nowrap",
          }}
        >
          <HeartIcon filled={liked} />
          <span>{likes}</span>
        </button>

        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>|</span>

        <button
          onClick={onShare}
          style={{
            display: "flex", alignItems: "center", gap: "4px",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.4)", fontFamily: "serif", fontSize: "0.6rem",
            letterSpacing: "0.08em", transition: "color 0.2s", padding: 0, whiteSpace: "nowrap",
          }}
        >
          <ShareIcon />
          <span>Compartir</span>
        </button>

        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>|</span>

        <button
          onClick={onRead}
          style={{
            display: "flex", alignItems: "center", gap: "4px",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.4)", fontFamily: "serif", fontSize: "0.6rem",
            letterSpacing: "0.14em", textTransform: "uppercase",
            transition: "color 0.2s", padding: 0, whiteSpace: "nowrap",
          }}
        >
          <span>Leer</span>
          <span>→</span>
        </button>
      </div>

      {/* Mobile card number */}
      <div className="md:hidden absolute bottom-3 right-4 select-none pointer-events-none" style={{ opacity: 0.3 }}>
        <span style={{ fontFamily: "serif", color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}>
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
    const text = `${post.title} — Dr. Mario Sánchez`;
    if (navigator.share) {
      navigator.share({ title: text, url: window.location.href }).catch(() => {});
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
      {/* Article modal */}
      {reading && <ArticleModal post={reading} onClose={() => setReading(null)} />}

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
                marginBottom: "1rem",
                whiteSpace: "nowrap",
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
              style={{
                fontSize: "min(calc((100vw - 64px) / 13.5), 3rem)",
                whiteSpace: "nowrap",
              }}
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

          {/* Desktop grid — 4 cols, items-start prevents empty stretch */}
          <div className="hidden md:grid grid-cols-4 gap-5 items-start">
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

          {/* Shared toast */}
          <AnimatePresence>
            {shared !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                style={{ background: "rgba(0,0,0,0.85)", color: "white", fontFamily: "serif", fontSize: "0.75rem", padding: "8px 20px", borderRadius: "9999px", letterSpacing: "0.08em" }}
              >
                Enlace copiado ✓
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile carousel */}
          <div
            className="md:hidden relative overflow-hidden"
            style={{ height: "350px" }}
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
