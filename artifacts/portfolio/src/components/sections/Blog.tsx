import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

const GREEN = "#2d5a27";

const posts = [
  {
    id: 1,
    date: "Marzo 2025",
    tag: "Prevención",
    title: "Por qué la prevención es tu mejor medicina",
    excerpt:
      "Conoce cómo pequeñas acciones diarias pueden reducir drásticamente el riesgo de enfermedades cardiovasculares, respiratorias y metabólicas. La salud se construye un hábito a la vez.",
  },
  {
    id: 2,
    date: "Abril 2025",
    tag: "Salud Respiratoria",
    title: "EPOC: lo que debes saber antes de que robe tu aliento",
    excerpt:
      "La Enfermedad Pulmonar Obstructiva Crónica afecta a millones de personas sin que lo sepan. Aprende a identificar los síntomas tempranos y las estrategias de manejo que marcan la diferencia.",
  },
  {
    id: 3,
    date: "Mayo 2025",
    tag: "Bienestar Laboral",
    title: "Estrés laboral: ¿mito o realidad que destruye tu salud?",
    excerpt:
      "El estrés crónico en el trabajo no es exageración — tiene consecuencias físicas medibles. Descubre qué dice la ciencia y qué puedes hacer hoy para protegerte.",
  },
  {
    id: 4,
    date: "Junio 2025",
    tag: "Terapia Respiratoria",
    title: "CPAP y BPAP: todo lo que necesitas para dormir mejor",
    excerpt:
      "Los dispositivos de presión positiva son la solución más efectiva para la apnea del sueño. Descubre cómo funcionan, quiénes los necesitan y cómo adaptarse a ellos con facilidad.",
  },
];

const CARD_INTERVAL = 4000;
const READ_PAUSE    = 4000;
const FADE_DURATION = 600;

function BlogCard({ post, num }: { post: typeof posts[0]; num: number }) {
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
        padding: "26px 22px 22px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <span style={{ fontFamily: "serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          {post.date}
        </span>
        <span style={{ fontFamily: "serif", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.22)", padding: "3px 9px", color: "rgba(255,255,255,0.4)", borderRadius: "2px" }}>
          {post.tag}
        </span>
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "14px" }} />

      <h3 style={{ fontFamily: "serif", fontWeight: 700, fontSize: "0.92rem", lineHeight: 1.35, color: "white", marginBottom: "12px" }}>
        {post.title}
      </h3>

      <p style={{ fontFamily: "serif", fontSize: "0.73rem", lineHeight: 1.65, color: "rgba(255,255,255,0.52)", flex: 1, marginBottom: "18px" }}>
        {post.excerpt}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontFamily: "serif", fontSize: "0.63rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
          Leer más
        </span>
        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem" }}>→</span>
      </div>

      <div
        className="md:hidden absolute bottom-3 right-4 select-none pointer-events-none"
        style={{ opacity: 0.45 }}
      >
        <span style={{ fontFamily: "serif", color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>
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
            Blog
          </motion.h2>
          <div className="flex justify-center mt-5">
            <div className="h-px w-16" style={{ background: "rgba(255,255,255,0.45)" }} />
          </div>
        </div>

        {/* Desktop grid — 4 columns, animated reveal */}
        <div className="hidden md:grid grid-cols-4 gap-5 min-h-[340px]">
          <AnimatePresence mode="popLayout">
            {posts.map((post, i) =>
              pcVisible.includes(i) ? (
                <BlogCard key={post.id} post={post} num={i + 1} />
              ) : null
            )}
          </AnimatePresence>
        </div>

        {/* Mobile carousel — 1 card at a time, swipe */}
        <div
          className="md:hidden relative overflow-hidden"
          style={{ height: "310px" }}
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
              <BlogCard post={posts[mobileIdx]} num={mobileIdx + 1} />
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
          <p
            className="font-serif text-center text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)", maxWidth: "280px" }}
          >
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
