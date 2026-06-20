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
    initialLikes: 21,
  },
  {
    id: 3,
    date: "Mayo 2025",
    tag: "Bienestar Laboral",
    title: "Estrés laboral: ¿mito o realidad que destruye tu salud?",
    excerpt:
      "El estrés crónico tiene consecuencias físicas medibles. Descubre qué dice la ciencia y qué puedes hacer hoy para protegerte.",
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
    initialLikes: 17,
  },
];

const CARD_INTERVAL = 4000;
const READ_PAUSE    = 4000;
const FADE_DURATION = 600;

function ShareIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "white" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function BlogCard({
  post, num, liked, likes, onLike, onShare,
}: {
  post: Post; num: number; liked: boolean; likes: number;
  onLike: () => void; onShare: () => void;
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

      {/* Tag — filled white pill, no border */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <span style={{
          fontFamily: "serif", fontSize: "0.56rem", letterSpacing: "0.14em",
          textTransform: "uppercase", background: "white", color: "#0a0a0a",
          padding: "3px 10px", borderRadius: "9999px", fontWeight: 700,
        }}>
          {post.tag}
        </span>
      </div>

      {/* Date */}
      <p style={{ fontFamily: "serif", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "12px" }}>
        {post.date}
      </p>

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        {/* Like */}
        <button
          onClick={onLike}
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            background: "none", border: "none", cursor: "pointer",
            color: liked ? "white" : "rgba(255,255,255,0.4)",
            fontFamily: "serif", fontSize: "0.62rem", letterSpacing: "0.08em",
            transition: "color 0.2s",
            padding: 0,
          }}
          title="Me gusta"
        >
          <HeartIcon filled={liked} />
          <span>{likes}</span>
        </button>

        {/* Divider */}
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.75rem" }}>|</span>

        {/* Share */}
        <button
          onClick={onShare}
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "serif", fontSize: "0.62rem", letterSpacing: "0.08em",
            transition: "color 0.2s",
            padding: 0,
          }}
          title="Compartir"
        >
          <ShareIcon />
          <span>Compartir</span>
        </button>

        {/* Divider */}
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.75rem" }}>|</span>

        {/* Leer más */}
        <span style={{
          display: "flex", alignItems: "center", gap: "4px",
          fontFamily: "serif", fontSize: "0.62rem", letterSpacing: "0.16em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.4)", cursor: "pointer",
        }}>
          <span>Leer</span>
          <span>→</span>
        </span>
      </div>

      {/* Mobile card number */}
      <div className="md:hidden absolute bottom-3 right-4 select-none pointer-events-none" style={{ opacity: 0.35 }}>
        <span style={{ fontFamily: "serif", color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}>
          {num.toString()}
        </span>
      </div>
    </motion.article>
  );
}

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
            className="font-serif uppercase whitespace-nowrap"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "clamp(0.6rem, 2.2vw, 0.75rem)",
              letterSpacing: "clamp(0.08em, 1.5vw, 0.25em)",
              marginBottom: "1rem",
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
            style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}
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
  );
}
