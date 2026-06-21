import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const GREEN = "#2d5a27";
const DARK_GREEN = "#1e3d1a";
const BLACK = "#0a0a0a";

interface Review {
  id: number;
  authorName: string;
  authorRole: string | null;
  rating: number;
  content: string;
  createdAt: string;
}

function Stars({ rating, size = "0.9rem" }: { rating: number; size?: string }) {
  return (
    <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ fontSize: size, color: i <= rating ? "#ffd700" : "rgba(255,255,255,0.2)" }}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: BLACK, borderRadius: "16px",
        padding: "28px 24px 24px",
        display: "flex", flexDirection: "column", height: "100%",
      }}
    >
      <Stars rating={review.rating} />
      <p className="font-serif" style={{
        fontSize: "0.82rem", lineHeight: 1.8,
        color: "rgba(255,255,255,0.72)", flex: 1, marginBottom: "20px",
        fontStyle: "italic",
      }}>
        "{review.content}"
      </p>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px" }}>
        <p className="font-serif" style={{ fontSize: "0.78rem", color: "white", fontWeight: 700, margin: 0 }}>
          {review.authorName}
        </p>
        {review.authorRole && (
          <p className="font-serif" style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", margin: "3px 0 0", letterSpacing: "0.06em" }}>
            {review.authorRole}
          </p>
        )}
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
            <div style={{ padding: "0 24px 22px", display: "flex", gap: "10px" }}>
              <button
                onClick={step === 0 ? onClose : () => goStep(step - 1)}
                className="font-serif"
                style={{
                  flex: 1, padding: "10px",
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
                    flex: 2, padding: "10px",
                    background: (step === 1 && !canNext1) ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.16)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "10px",
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
                    flex: 2, padding: "10px",
                    background: (!canSubmit) ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.16)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "10px",
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

const CARD_H = 355;
const CARD_INTERVAL = 4500;

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then(r => r.json())
      .then(setReviews)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (reviews.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIdx(i => (i + 1) % reviews.length);
    }, CARD_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [reviews.length]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx(i => (i + 1) % reviews.length);
    }, CARD_INTERVAL);
  };

  const goTo = (i: number) => { setActiveIdx(i); resetTimer(); };

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="resenas" style={{ background: GREEN, position: "relative" }}>

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
              color: "white",
              lineHeight: 1.2,
              marginBottom: "18px",
              whiteSpace: "nowrap",
            }}
          >
            Lo que dicen nuestros pacientes
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              height: "2px", width: "40px",
              background: "rgba(255,255,255,0.4)",
              borderRadius: "9999px", margin: "0 auto",
            }}
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
            {/* ── Desktop grid ── */}
            <div
              className="hidden md:grid"
              style={{
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                padding: "0 clamp(20px, 5vw, 60px)",
                marginBottom: "40px",
              }}
            >
              {reviews.map((r, i) => (
                <ReviewCard key={r.id} review={r} index={i} />
              ))}
            </div>

            {/* ── Mobile carousel ── */}
            <div className="md:hidden" style={{ position: "relative", overflow: "hidden", marginBottom: "28px" }}>
              <div
                style={{
                  display: "flex",
                  transform: `translateX(calc(-${activeIdx * 100}% - ${activeIdx * 16}px))`,
                  transition: isDragging ? "none" : "transform 0.42s cubic-bezier(0.16,1,0.3,1)",
                  padding: "0 20px",
                  gap: "16px",
                }}
                onPointerDown={e => { dragStartX.current = e.clientX; setIsDragging(true); }}
                onPointerMove={() => {}}
                onPointerUp={e => {
                  setIsDragging(false);
                  const dx = e.clientX - dragStartX.current;
                  if (Math.abs(dx) < 40) return;
                  if (dx < 0 && activeIdx < reviews.length - 1) goTo(activeIdx + 1);
                  else if (dx > 0 && activeIdx > 0) goTo(activeIdx - 1);
                }}
              >
                {reviews.map((r) => (
                  <div key={r.id} style={{ minWidth: "calc(100vw - 40px)", height: `${CARD_H}px`, flexShrink: 0 }}>
                    <div style={{
                      background: BLACK, borderRadius: "16px",
                      padding: "28px 24px 24px", height: "100%",
                      display: "flex", flexDirection: "column", boxSizing: "border-box",
                    }}>
                      <Stars rating={r.rating} />
                      <p className="font-serif" style={{
                        fontSize: "0.82rem", lineHeight: 1.8,
                        color: "rgba(255,255,255,0.72)", flex: 1, fontStyle: "italic",
                        overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 8,
                        WebkitBoxOrient: "vertical",
                      }}>
                        "{r.content}"
                      </p>
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px", marginTop: "12px" }}>
                        <p className="font-serif" style={{ fontSize: "0.78rem", color: "white", fontWeight: 700, margin: 0 }}>
                          {r.authorName}
                        </p>
                        {r.authorRole && (
                          <p className="font-serif" style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", margin: "3px 0 0" }}>
                            {r.authorRole}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      width: i === activeIdx ? "22px" : "7px",
                      height: "7px", borderRadius: "9999px",
                      background: i === activeIdx ? "white" : "rgba(255,255,255,0.3)",
                      border: "none", cursor: "pointer", padding: 0,
                      transition: "all 0.35s ease",
                    }}
                  />
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
