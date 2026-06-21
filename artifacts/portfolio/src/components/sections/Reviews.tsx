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

/* ── Review submission modal — aesthetic matches Contact/Agendar Cita ── */
function SubmitModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ authorName: "", authorRole: "", rating: 5, content: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "12px",
    padding: "10px 14px",
    color: "white",
    fontSize: "0.82rem",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
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
        initial={{ scale: 0.93, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.93, y: 24, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl overflow-hidden"
        style={{
          background: DARK_GREEN,
          width: "100%", maxWidth: "520px",
          maxHeight: "90dvh",
          overflowY: "auto",
          boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header bar */}
        <div style={{ padding: "28px 28px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
            <div>
              <p className="font-serif" style={{ fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "4px" }}>
                TESTIMONIOS
              </p>
              <h3 className="font-serif font-bold" style={{ color: "white", fontSize: "1.05rem", margin: 0, lineHeight: 1.2 }}>
                {sent ? "¡Reseña enviada!" : "Dejar una reseña"}
              </h3>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%",
                width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: "1rem", flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "24px" }} />
        </div>

        {sent ? (
          <div style={{ textAlign: "center", padding: "20px 28px 40px" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "rgba(255,255,255,0.12)", display: "flex",
              alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px", fontSize: "1.5rem",
            }}>
              ✓
            </div>
            <p className="font-serif" style={{ color: "white", fontSize: "0.95rem", marginBottom: "8px" }}>
              ¡Gracias por compartir tu experiencia!
            </p>
            <p className="font-serif" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem" }}>
              Tu reseña será revisada antes de publicarse.
            </p>
          </div>
        ) : (
          <div style={{ padding: "0 28px 28px" }}>

            {/* Rating */}
            <div style={{ marginBottom: "20px" }}>
              <p className="font-serif" style={{ fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "10px" }}>
                Calificación
              </p>
              <div style={{ display: "flex", gap: "6px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm(f => ({ ...f, rating: s }))}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: "1.6rem", padding: 0,
                      color: s <= form.rating ? "#ffd700" : "rgba(255,255,255,0.18)",
                      transition: "color 0.15s, transform 0.1s",
                      transform: s === form.rating ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Nombre */}
            <div style={{ marginBottom: "16px" }}>
              <p className="font-serif" style={{ fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "8px" }}>
                Nombre *
              </p>
              <input
                value={form.authorName}
                onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))}
                placeholder="Tu nombre completo"
                className="font-serif"
                style={inputStyle}
              />
            </div>

            {/* Rol */}
            <div style={{ marginBottom: "16px" }}>
              <p className="font-serif" style={{ fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "8px" }}>
                Profesión / Rol <span style={{ opacity: 0.5, fontSize: "0.5rem" }}>(opcional)</span>
              </p>
              <input
                value={form.authorRole}
                onChange={e => setForm(f => ({ ...f, authorRole: e.target.value }))}
                placeholder="Ej: Paciente, Médico, Familiar..."
                className="font-serif"
                style={inputStyle}
              />
            </div>

            {/* Experiencia */}
            <div style={{ marginBottom: "28px" }}>
              <p className="font-serif" style={{ fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "8px" }}>
                Tu experiencia *
              </p>
              <textarea
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                placeholder="Cuéntanos cómo fue tu experiencia con el Dr. Sánchez..."
                rows={4}
                className="font-serif"
                style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={onClose}
                className="font-serif"
                style={{
                  flex: 1, padding: "11px 16px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "12px",
                  color: "rgba(255,255,255,0.55)", fontSize: "0.75rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={submit}
                disabled={sending || !form.authorName.trim() || !form.content.trim()}
                className="font-serif"
                style={{
                  flex: 2, padding: "11px 16px",
                  background: (!form.authorName.trim() || !form.content.trim()) ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "12px",
                  color: (!form.authorName.trim() || !form.content.trim()) ? "rgba(255,255,255,0.35)" : "white",
                  fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: (sending || !form.authorName.trim() || !form.content.trim()) ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  fontWeight: 600,
                }}
              >
                {sending ? "Enviando..." : "Enviar reseña"}
              </button>
            </div>
          </div>
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

      {/* ── Wave top — transitions from About's white content ── */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0, marginBottom: "-1px" }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: "70px" }}>
          <path d="M0,0 L1440,0 L1440,60 C1080,0 360,90 0,30 Z" fill="white" />
        </svg>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "clamp(48px, 8vw, 88px) 0 clamp(56px, 9vw, 96px)" }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: "clamp(36px, 6vw, 60px)", padding: "0 clamp(20px, 5vw, 60px)" }}>
          <motion.p
            className="font-serif"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "0.58rem", letterSpacing: "0.22em",
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
              fontSize: "min(calc((100vw - 64px) / 13.5), 3rem)",
              color: "white",
              lineHeight: 1.2,
              marginBottom: "18px",
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

        {/* CTA — text button with underline, no border */}
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
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
              (e.currentTarget as HTMLButtonElement).style.borderBottomColor = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = "white";
              (e.currentTarget as HTMLButtonElement).style.borderBottomColor = "rgba(255,255,255,0.6)";
            }}
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
