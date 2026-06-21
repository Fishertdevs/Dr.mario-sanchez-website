import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const GREEN = "#2d5a27";
const DARK_GREEN = "#1e3d1a";
const BLACK = "#0a0a0a";

const BATCH = 3;
const CARD_DELAY = 1800;
const READ_PAUSE = 9000;
const FADE_DURATION = 700;

interface Review {
  id: number;
  authorName: string;
  authorRole: string | null;
  rating: number;
  content: string;
  createdAt: string;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

function ReviewCard({ review, index, fading }: { review: Review; index: number; fading: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={fading ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: fading ? FADE_DURATION / 1000 : 0.55, delay: fading ? 0 : index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: BLACK, borderRadius: "16px",
        padding: "28px 24px 24px",
        display: "flex", flexDirection: "column", height: "100%",
      }}
    >
      {/* Stars + Date */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <div style={{ display: "flex", gap: "3px" }}>
          {[1,2,3,4,5].map(i => (
            <span key={i} style={{ fontSize: "0.9rem", color: i <= review.rating ? "#ffd700" : "rgba(255,255,255,0.2)" }}>★</span>
          ))}
        </div>
        <span className="font-serif" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>
          {formatDate(review.createdAt)}
        </span>
      </div>

      {/* Content — centered */}
      <p className="font-serif" style={{
        fontSize: "0.82rem", lineHeight: 1.8,
        color: "rgba(255,255,255,0.72)", flex: 1, marginBottom: "20px",
        fontStyle: "italic", textAlign: "center",
      }}>
        "{review.content}"
      </p>

      {/* Footer — name · role on same line */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px" }}>
        <p className="font-serif" style={{ fontSize: "0.78rem", color: "white", fontWeight: 700, margin: 0 }}>
          {review.authorName}
          {review.authorRole && (
            <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.45)", fontSize: "0.65rem" }}> · {review.authorRole}</span>
          )}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Step-by-step review modal ── */
const STEPS = [
  { id: 0, subtitle: "Paso 1 de 3", hint: "¿Cómo calificarías tu experiencia?" },
  { id: 1, subtitle: "Paso 2 de 3", hint: "Cuéntanos quién eres" },
  { id: 2, subtitle: "Paso 3 de 3", hint: "Tu experiencia con el Dr. Sánchez" },
];

function SubmitModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState(0);
  const [stepDir, setStepDir] = useState(1);
  const [form, setForm] = useState({ authorName: "", authorRole: "", rating: 5, content: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const goStep = (next: number) => {
    setStepDir(next > step ? 1 : -1);
    setStep(next);
  };

  const submit = async () => {
    if (!form.authorName.trim() || !form.content.trim()) return;
    setSending(true);
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
      setTimeout(() => { onSuccess(); onClose(); }, 2200);
    } finally {
      setSending(false);
    }
  };

  const canNext1 = form.authorName.trim().length > 0;
  const canSubmit = form.content.trim().length > 0;

  const stepVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "10px",
    padding: "9px 13px",
    color: "white",
    fontSize: "0.8rem",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.52rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.45)",
    marginBottom: "7px",
    display: "block",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 8888,
        background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.94, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl overflow-hidden"
        style={{
          background: DARK_GREEN,
          width: "100%", maxWidth: "400px",
          boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
        }}
      >
        {sent ? (
          /* ── Éxito ── */
          <div style={{ padding: "40px 28px", textAlign: "center" }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px", fontSize: "1.3rem", color: "white",
            }}>✓</div>
            <p className="font-serif font-bold" style={{ color: "white", fontSize: "0.95rem", marginBottom: "6px" }}>
              ¡Gracias por tu reseña!
            </p>
            <p className="font-serif" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.72rem" }}>
              Será revisada antes de publicarse.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ padding: "22px 24px 0", textAlign: "center" }}>
              {/* Progress bar */}
              <div style={{ display: "flex", gap: "4px", marginBottom: "18px", justifyContent: "center" }}>
                {STEPS.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      height: "2px", flex: 1, maxWidth: "48px", borderRadius: "9999px",
                      background: s.id <= step ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </div>

              <p className="font-serif" style={{ fontSize: "0.5rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "5px" }}>
                {STEPS[step].subtitle}
              </p>
              <p className="font-serif font-bold" style={{ color: "white", fontSize: "0.9rem", marginBottom: "20px", lineHeight: 1.3 }}>
                {STEPS[step].hint}
              </p>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "0" }} />
            </div>

            {/* Step content */}
            <div style={{ overflow: "hidden", position: "relative" }}>
              <AnimatePresence custom={stepDir} mode="wait">
                <motion.div
                  key={step}
                  custom={stepDir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  style={{ padding: "20px 24px" }}
                >
                  {/* Step 0 — Rating */}
                  {step === 0 && (
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "8px" }}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            onClick={() => setForm(f => ({ ...f, rating: s }))}
                            onMouseEnter={() => setHoverRating(s)}
                            style={{
                              background: "none", border: "none", cursor: "pointer",
                              fontSize: "2rem", padding: 0,
                              color: s <= (hoverRating || form.rating) ? "#ffd700" : "rgba(255,255,255,0.2)",
                              transition: "color 0.12s, transform 0.12s",
                              transform: s === (hoverRating || form.rating) ? "scale(1.25)" : "scale(1)",
                            }}
                          >★</button>
                        ))}
                      </div>
                      <p className="font-serif" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.65rem", marginTop: "4px" }}>
                        {["", "Muy malo", "Malo", "Regular", "Bueno", "Excelente"][form.rating]}
                      </p>
                    </div>
                  )}

                  {/* Step 1 — Name & Role */}
                  {step === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div>
                        <p className="font-serif" style={labelStyle}>Nombre:</p>
                        <input
                          value={form.authorName}
                          onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))}
                          placeholder="Tu nombre completo"
                          className="font-serif"
                          style={inputStyle}
                          autoFocus
                        />
                      </div>
                      <div>
                        <p className="font-serif" style={labelStyle}>
                          Profesión / Rol <span style={{ opacity: 0.5 }}>(opcional)</span>
                        </p>
                        <input
                          value={form.authorRole}
                          onChange={e => setForm(f => ({ ...f, authorRole: e.target.value }))}
                          placeholder="Paciente, Médico, Familiar..."
                          className="font-serif"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2 — Content */}
                  {step === 2 && (
                    <div>
                      <p className="font-serif" style={labelStyle}>Tu experiencia:</p>
                      <textarea
                        value={form.content}
                        onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                        placeholder="Cuéntanos cómo fue tu experiencia..."
                        rows={4}
                        className="font-serif"
                        style={{ ...inputStyle, resize: "none" }}
                        autoFocus
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer actions */}
            <div style={{ padding: "0 24px 22px", display: "flex", gap: "6px", justifyContent: "center" }}>
              <button
                onClick={step === 0 ? onClose : () => goStep(step - 1)}
                className="font-serif"
                style={{
                  padding: "10px 20px",
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.5)", fontSize: "0.68rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                {step === 0 ? "Cancelar" : "Atrás"}
              </button>

              {step < 2 ? (
                <button
                  onClick={() => goStep(step + 1)}
                  disabled={step === 1 && !canNext1}
                  className="font-serif"
                  style={{
                    padding: "10px 20px",
                    background: "none",
                    border: "none",
                    color: (step === 1 && !canNext1) ? "rgba(255,255,255,0.3)" : "white",
                    fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    cursor: (step === 1 && !canNext1) ? "not-allowed" : "pointer",
                    fontWeight: 600,
                  }}
                >
                  Continuar
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={sending || !canSubmit}
                  className="font-serif"
                  style={{
                    padding: "10px 20px",
                    background: "none",
                    border: "none",
                    color: (!canSubmit) ? "rgba(255,255,255,0.3)" : "white",
                    fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    cursor: (sending || !canSubmit) ? "not-allowed" : "pointer",
                    fontWeight: 600,
                  }}
                >
                  {sending ? "Enviando..." : "Enviar reseña"}
                </button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

const MOBILE_CARD_H = 340;

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Desktop 3-at-a-time cycle state
  const [batchIdx, setBatchIdx] = useState(0);
  const [shownCount, setShownCount] = useState(0);
  const [fading, setFading] = useState(false);
  const [cycle, setCycle] = useState(0);

  // Mobile carousel state
  const [mobileIdx, setMobileIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    fetch("/api/reviews")
      .then(r => r.json())
      .then(d => setReviews(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* Desktop cycle: show BATCH cards one by one, pause, fade, next batch */
  useEffect(() => {
    if (!isInView || reviews.length === 0) return;
    const totalBatches = Math.ceil(reviews.length / BATCH);
    const currentBatch = reviews.slice(batchIdx * BATCH, (batchIdx + 1) * BATCH);
    const batchSize = currentBatch.length;

    const ts: ReturnType<typeof setTimeout>[] = [];
    const run = (fn: () => void, ms: number) => { const id = setTimeout(fn, ms); ts.push(id); };

    setShownCount(0);
    setFading(false);

    // Cards appear one by one
    for (let i = 0; i < batchSize; i++) {
      run(() => setShownCount(i + 1), i * CARD_DELAY + 150);
    }

    // Fade out after READ_PAUSE
    const endTime = (batchSize - 1) * CARD_DELAY + 150 + READ_PAUSE;
    run(() => setFading(true), endTime);

    // Next batch
    run(() => {
      setFading(false);
      if (totalBatches > 1) {
        setBatchIdx(prev => (prev + 1) % totalBatches);
        setCycle(c => c + 1);
      } else {
        // Single batch: just restart
        setCycle(c => c + 1);
      }
    }, endTime + FADE_DURATION + 200);

    return () => ts.forEach(clearTimeout);
  }, [isInView, cycle, reviews.length]);

  const currentBatch = reviews.slice(batchIdx * BATCH, (batchIdx + 1) * BATCH);

  const goMobile = (i: number) => setMobileIdx(Math.max(0, Math.min(reviews.length - 1, i)));

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="resenas" ref={sectionRef} style={{ background: GREEN, position: "relative" }}>

      {/* ── Content ── */}
      <div style={{ padding: "clamp(28px, 4vw, 48px) 0 clamp(56px, 9vw, 96px)" }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: "clamp(36px, 6vw, 60px)", padding: "0 clamp(16px, 5vw, 60px)" }}>
          <motion.p
            className="font-serif"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "clamp(0.6rem, 2.2vw, 0.75rem)", letterSpacing: "0.22em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "14px",
            }}
          >
            Testimonios
          </motion.p>

          <motion.h2
            className="font-serif font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: "min(calc((100vw - 32px) / 18.5), 3rem)",
              color: "white", lineHeight: 1.2, marginBottom: "18px", whiteSpace: "nowrap",
            }}
          >
            Lo que dicen nuestros pacientes
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ height: "2px", width: "40px", background: "rgba(255,255,255,0.4)", borderRadius: "9999px", margin: "0 auto" }}
          />
        </div>

        {/* Reviews content */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p className="font-serif" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Cargando reseñas...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <p className="font-serif" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", fontStyle: "italic" }}>
              Sé el primero en compartir tu experiencia.
            </p>
          </div>
        ) : (
          <>
            {/* ── Desktop: 3-at-a-time loop ── */}
            <div
              className="hidden md:grid"
              style={{
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                padding: "0 clamp(20px, 5vw, 60px)",
                marginBottom: "40px",
                minHeight: "260px",
                alignItems: "stretch",
              }}
            >
              <AnimatePresence mode="popLayout">
                {currentBatch.slice(0, shownCount).map((r, i) => (
                  <ReviewCard key={r.id} review={r} index={i} fading={fading} />
                ))}
              </AnimatePresence>
            </div>

            {/* Batch dots — desktop only */}
            {reviews.length > BATCH && (
              <div className="hidden md:flex" style={{ justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
                {Array.from({ length: Math.ceil(reviews.length / BATCH) }).map((_, i) => (
                  <div key={i} style={{
                    width: i === batchIdx ? "22px" : "7px", height: "7px", borderRadius: "9999px",
                    background: i === batchIdx ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)",
                    transition: "all 0.35s ease",
                  }} />
                ))}
              </div>
            )}

            {/* ── Mobile carousel — swipe only, no dots ── */}
            <div
              className="md:hidden"
              style={{ overflow: "hidden", marginBottom: "28px", userSelect: "none" }}
              onPointerDown={e => { dragStartX.current = e.clientX; setIsDragging(true); }}
              onPointerUp={e => {
                setIsDragging(false);
                const dx = e.clientX - dragStartX.current;
                if (Math.abs(dx) < 40) return;
                if (dx < 0) goMobile(mobileIdx + 1);
                else goMobile(mobileIdx - 1);
              }}
              onPointerLeave={() => setIsDragging(false)}
            >
              <div
                style={{
                  display: "flex",
                  transform: `translateX(-${mobileIdx * 100}%)`,
                  transition: isDragging ? "none" : "transform 0.42s cubic-bezier(0.16,1,0.3,1)",
                  willChange: "transform",
                }}
              >
                {reviews.map((r) => (
                  <div key={r.id} style={{ width: "100%", flexShrink: 0, flexBasis: "100%", boxSizing: "border-box", padding: "0 20px" }}>
                    <div style={{
                      background: BLACK, borderRadius: "16px",
                      padding: "24px 20px 20px",
                      display: "flex", flexDirection: "column",
                      minHeight: `${MOBILE_CARD_H}px`, boxSizing: "border-box",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                        <div style={{ display: "flex", gap: "3px" }}>
                          {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: "0.9rem", color: i <= r.rating ? "#ffd700" : "rgba(255,255,255,0.2)" }}>★</span>)}
                        </div>
                        <span className="font-serif" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.35)" }}>
                          {formatDate(r.createdAt)}
                        </span>
                      </div>
                      <p className="font-serif" style={{
                        fontSize: "0.82rem", lineHeight: 1.8, textAlign: "center",
                        color: "rgba(255,255,255,0.72)", flex: 1, fontStyle: "italic",
                        overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                      }}>
                        "{r.content}"
                      </p>
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px", marginTop: "10px" }}>
                        <p className="font-serif" style={{ fontSize: "0.78rem", color: "white", fontWeight: 700, margin: 0 }}>
                          {r.authorName}
                          {r.authorRole && <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.45)", fontSize: "0.65rem" }}> · {r.authorRole}</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* CTA — text with underline */}
        <div style={{ textAlign: "center", padding: "0 20px", marginTop: reviews.length > 0 ? "12px" : "0" }}>
          <button
            onClick={() => setShowModal(true)}
            className="font-serif"
            style={{
              background: "none", border: "none", padding: 0,
              cursor: "pointer", color: "white",
              fontSize: "0.72rem", letterSpacing: "0.18em",
              textTransform: "uppercase",
              borderBottom: "1px solid rgba(255,255,255,0.6)",
              paddingBottom: "3px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.65"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            Dejar una reseña
          </button>
        </div>

      </div>

      {/* ── Wave bottom — transitions to Contact white ── */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0, marginTop: "-1px" }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: "70px" }}>
          <path d="M0,30 C360,90 1080,0 1440,60 L1440,90 L0,90 Z" fill="white" />
        </svg>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <SubmitModal onClose={() => setShowModal(false)} onSuccess={() => {}} />
        )}
      </AnimatePresence>
    </section>
  );
}
