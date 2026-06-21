import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const GREEN = "#2d5a27";
const BLACK = "#0a0a0a";

interface Review {
  id: number;
  authorName: string;
  authorRole: string | null;
  rating: number;
  content: string;
  createdAt: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ fontSize: "0.9rem", color: i <= rating ? "#ffd700" : "rgba(255,255,255,0.2)" }}>★</span>
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
        background: BLACK, borderRadius: "12px",
        padding: "28px 24px 24px",
        display: "flex", flexDirection: "column", height: "100%",
      }}
    >
      <Stars rating={review.rating} />
      <p style={{
        fontFamily: "serif", fontSize: "0.82rem", lineHeight: 1.8,
        color: "rgba(255,255,255,0.72)", flex: 1, marginBottom: "20px",
        fontStyle: "italic",
      }}>
        "{review.content}"
      </p>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px" }}>
        <p style={{ fontFamily: "serif", fontSize: "0.78rem", color: "white", fontWeight: 700, margin: 0 }}>
          {review.authorName}
        </p>
        {review.authorRole && (
          <p style={{ fontFamily: "serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", margin: "3px 0 0", letterSpacing: "0.06em" }}>
            {review.authorRole}
          </p>
        )}
      </div>
    </motion.div>
  );
}

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
      setTimeout(() => { onSuccess(); onClose(); }, 1800);
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 8888,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        style={{
          background: "#111", borderRadius: "16px",
          padding: "36px 32px", width: "100%", maxWidth: "480px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {sent ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <p style={{ fontSize: "2rem", marginBottom: "12px" }}>✓</p>
            <p style={{ fontFamily: "serif", color: "white", fontSize: "1rem" }}>¡Gracias por tu reseña!</p>
            <p style={{ fontFamily: "serif", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "8px" }}>Será revisada antes de publicarse.</p>
          </div>
        ) : (
          <>
            <h3 style={{ fontFamily: "serif", color: "white", fontSize: "1.1rem", marginBottom: "24px" }}>Dejar una reseña</h3>

            <label style={{ fontFamily: "serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Calificación</label>
            <div style={{ display: "flex", gap: "8px", margin: "8px 0 20px" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setForm(f => ({ ...f, rating: s }))}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.4rem", color: s <= form.rating ? "#ffd700" : "rgba(255,255,255,0.2)", padding: 0, transition: "color 0.15s" }}>
                  ★
                </button>
              ))}
            </div>

            <label style={{ fontFamily: "serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Nombre *</label>
            <input
              value={form.authorName}
              onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))}
              placeholder="Tu nombre"
              style={{
                width: "100%", marginTop: "6px", marginBottom: "16px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px", padding: "10px 14px", color: "white", fontFamily: "serif",
                fontSize: "0.85rem", outline: "none", boxSizing: "border-box",
              }}
            />

            <label style={{ fontFamily: "serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Profesión / Rol (opcional)</label>
            <input
              value={form.authorRole}
              onChange={e => setForm(f => ({ ...f, authorRole: e.target.value }))}
              placeholder="Ej: Paciente, Médico..."
              style={{
                width: "100%", marginTop: "6px", marginBottom: "16px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px", padding: "10px 14px", color: "white", fontFamily: "serif",
                fontSize: "0.85rem", outline: "none", boxSizing: "border-box",
              }}
            />

            <label style={{ fontFamily: "serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Tu experiencia *</label>
            <textarea
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="Cuéntanos tu experiencia con el Dr. Sánchez..."
              rows={4}
              style={{
                width: "100%", marginTop: "6px", marginBottom: "24px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px", padding: "10px 14px", color: "white", fontFamily: "serif",
                fontSize: "0.85rem", outline: "none", resize: "vertical", boxSizing: "border-box",
              }}
            />

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={onClose}
                style={{
                  flex: 1, padding: "12px", background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px",
                  color: "rgba(255,255,255,0.5)", fontFamily: "serif", fontSize: "0.8rem",
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={submit}
                disabled={sending || !form.authorName.trim() || !form.content.trim()}
                style={{
                  flex: 2, padding: "12px", background: GREEN,
                  border: "none", borderRadius: "8px",
                  color: "white", fontFamily: "serif", fontSize: "0.8rem",
                  cursor: sending ? "not-allowed" : "pointer",
                  opacity: (!form.authorName.trim() || !form.content.trim()) ? 0.5 : 1,
                  transition: "all 0.2s",
                }}
              >
                {sending ? "Enviando..." : "Enviar reseña"}
              </button>
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
    <section id="resenas" style={{ background: GREEN, padding: "clamp(60px, 10vw, 100px) 0" }}>
      <AnimatePresence>
        {showModal && (
          <SubmitModal onClose={() => setShowModal(false)} onSuccess={() => {}} />
        )}
      </AnimatePresence>

      {/* Header */}
      <div ref={headerRef} style={{ textAlign: "center", marginBottom: "clamp(36px, 6vw, 60px)", padding: "0 clamp(20px, 5vw, 60px)" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "serif", fontSize: "0.62rem", letterSpacing: "0.22em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "12px",
          }}
        >
          Testimonios
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "serif", fontWeight: 700,
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            color: "white", lineHeight: 1.2, marginBottom: "16px",
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

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ fontFamily: "serif", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Cargando reseñas...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ fontFamily: "serif", color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", fontStyle: "italic" }}>
            Sé el primero en compartir tu experiencia.
          </p>
        </div>
      ) : (
        <>
          {/* ── Desktop grid ─────────────────────────────────── */}
          <div
            className="hidden md:grid"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              padding: "0 clamp(20px, 5vw, 60px)",
              marginBottom: "36px",
            }}
          >
            {reviews.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>

          {/* ── Mobile carousel ──────────────────────────────── */}
          <div className="md:hidden" style={{ position: "relative", overflow: "hidden", marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                transform: `translateX(calc(-${activeIdx * 100}% - ${activeIdx * 16}px))`,
                transition: isDragging ? "none" : "transform 0.42s cubic-bezier(0.16,1,0.3,1)",
                padding: "0 20px",
                gap: "16px",
              }}
              onPointerDown={e => { dragStartX.current = e.clientX; setIsDragging(true); }}
              onPointerMove={e => { if (!isDragging) return; }}
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
                    background: BLACK, borderRadius: "12px",
                    padding: "28px 24px 24px", height: "100%",
                    display: "flex", flexDirection: "column", boxSizing: "border-box",
                  }}>
                    <Stars rating={r.rating} />
                    <p style={{
                      fontFamily: "serif", fontSize: "0.82rem", lineHeight: 1.8,
                      color: "rgba(255,255,255,0.72)", flex: 1, fontStyle: "italic",
                      overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 8,
                      WebkitBoxOrient: "vertical",
                    }}>
                      "{r.content}"
                    </p>
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px", marginTop: "12px" }}>
                      <p style={{ fontFamily: "serif", fontSize: "0.78rem", color: "white", fontWeight: 700, margin: 0 }}>{r.authorName}</p>
                      {r.authorRole && (
                        <p style={{ fontFamily: "serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", margin: "3px 0 0" }}>{r.authorRole}</p>
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
                    height: "7px",
                    borderRadius: "9999px",
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

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "0 20px", marginTop: reviews.length > 0 ? "8px" : "0" }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            fontFamily: "serif", fontSize: "0.72rem", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "white",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.45)",
            borderRadius: "9999px",
            padding: "12px 32px",
            cursor: "pointer",
            transition: "all 0.25s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "white";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.45)";
          }}
        >
          Dejar una reseña
        </button>
      </div>
    </section>
  );
}
