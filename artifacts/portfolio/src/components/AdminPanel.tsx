import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GREEN = "#2d5a27";

interface Review {
  id: number;
  authorName: string;
  authorRole: string | null;
  rating: number;
  content: string;
  isApproved: boolean;
  createdAt: string;
}

interface SocialLink {
  id: number;
  platform: string;
  label: string;
  url: string;
  iconKey: string;
  isActive: boolean;
  sortOrder: number;
}

const PLATFORM_ICONS: Record<string, string> = {
  youtube: "▶",
  tiktok: "♪",
  instagram: "◉",
  whatsapp: "✆",
  facebook: "f",
  twitter: "✕",
  linkedin: "in",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= rating ? "#ffd700" : "rgba(255,255,255,0.2)", fontSize: "0.8rem" }}>★</span>
      ))}
    </span>
  );
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("admin_token"));
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState<"reviews" | "social">("reviews");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [socialLoading, setSocialLoading] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [newLink, setNewLink] = useState({ platform: "", label: "", url: "", iconKey: "" });
  const [showNewLink, setShowNewLink] = useState(false);

  const isLoggedIn = !!token;

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const login = async () => {
    if (!email.trim()) return;
    setLoginLoading(true);
    setLoginError("");
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!r.ok) {
        const d = await r.json();
        setLoginError(d.error ?? "Correo no autorizado");
        return;
      }
      const { token: t } = await r.json();
      sessionStorage.setItem("admin_token", t);
      setToken(t);
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setEmail("");
  };

  const loadReviews = async () => {
    setReviewsLoading(true);
    try {
      const r = await fetch("/api/admin/reviews", { headers });
      setReviews(await r.json());
    } finally {
      setReviewsLoading(false);
    }
  };

  const loadSocialLinks = async () => {
    setSocialLoading(true);
    try {
      const r = await fetch("/api/admin/social-links", { headers });
      setSocialLinks(await r.json());
    } finally {
      setSocialLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && isOpen) {
      if (tab === "reviews") loadReviews();
      else loadSocialLinks();
    }
  }, [isLoggedIn, isOpen, tab]);

  const approveReview = async (id: number) => {
    await fetch(`/api/admin/reviews/${id}/approve`, { method: "POST", headers });
    await loadReviews();
  };

  const deleteReview = async (id: number) => {
    if (!confirm("¿Eliminar esta reseña?")) return;
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE", headers });
    await loadReviews();
  };

  const saveReview = async () => {
    if (!editingReview) return;
    await fetch(`/api/admin/reviews/${editingReview.id}`, {
      method: "PUT", headers,
      body: JSON.stringify({
        authorName: editingReview.authorName,
        authorRole: editingReview.authorRole,
        rating: editingReview.rating,
        content: editingReview.content,
        isApproved: editingReview.isApproved,
      }),
    });
    setEditingReview(null);
    await loadReviews();
  };

  const deleteLink = async (id: number) => {
    if (!confirm("¿Eliminar esta red social?")) return;
    await fetch(`/api/admin/social-links/${id}`, { method: "DELETE", headers });
    await loadSocialLinks();
  };

  const saveLink = async () => {
    if (!editingLink) return;
    await fetch(`/api/admin/social-links/${editingLink.id}`, {
      method: "PUT", headers,
      body: JSON.stringify(editingLink),
    });
    setEditingLink(null);
    await loadSocialLinks();
  };

  const addLink = async () => {
    if (!newLink.platform || !newLink.url) return;
    await fetch("/api/admin/social-links", {
      method: "POST", headers,
      body: JSON.stringify({ ...newLink, iconKey: newLink.iconKey || newLink.platform }),
    });
    setNewLink({ platform: "", label: "", url: "", iconKey: "" });
    setShowNewLink(false);
    await loadSocialLinks();
  };

  const toggleLink = async (link: SocialLink) => {
    await fetch(`/api/admin/social-links/${link.id}`, {
      method: "PUT", headers,
      body: JSON.stringify({ ...link, isActive: !link.isActive }),
    });
    await loadSocialLinks();
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px", padding: "8px 12px", color: "white", fontFamily: "serif",
    fontSize: "0.8rem", outline: "none", width: "100%", boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontFamily: "serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.1em", textTransform: "uppercase" as const, display: "block", marginBottom: "5px",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 9999,
              width: "min(520px, 100vw)",
              background: "#0d0d0d",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              display: "flex", flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 24px", height: "60px", flexShrink: 0,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "#0d0d0d",
            }}>
              <span style={{ fontFamily: "serif", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                Panel Admin
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {isLoggedIn && (
                  <button onClick={logout} style={{
                    fontFamily: "serif", fontSize: "0.62rem", letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.35)", background: "none", border: "none",
                    cursor: "pointer", textTransform: "uppercase", transition: "color 0.2s",
                  }}>
                    Cerrar sesión
                  </button>
                )}
                <button onClick={onClose} style={{
                  background: "rgba(255,255,255,0.06)", border: "none", cursor: "pointer",
                  width: "32px", height: "32px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.5)", fontSize: "1rem",
                }}>
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
              {!isLoggedIn ? (
                /* ── Login ── */
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "0" }}>
                  <div style={{ width: "100%", maxWidth: "320px" }}>
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                      <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: GREEN, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                        🔐
                      </div>
                      <p style={{ fontFamily: "serif", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>
                        Ingresa con tu correo de administrador
                      </p>
                    </div>
                    <label style={labelStyle}>Correo electrónico</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") login(); }}
                      placeholder="correo@ejemplo.com"
                      style={{ ...inputStyle, marginBottom: "16px", fontSize: "0.9rem" }}
                      autoFocus
                    />
                    {loginError && (
                      <p style={{ fontFamily: "serif", fontSize: "0.72rem", color: "#ff6b6b", marginBottom: "12px", textAlign: "center" }}>
                        {loginError}
                      </p>
                    )}
                    <button
                      onClick={login}
                      disabled={loginLoading || !email.trim()}
                      style={{
                        width: "100%", padding: "12px", background: GREEN,
                        border: "none", borderRadius: "8px",
                        color: "white", fontFamily: "serif", fontSize: "0.8rem",
                        cursor: loginLoading ? "not-allowed" : "pointer",
                        opacity: !email.trim() ? 0.5 : 1,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        transition: "opacity 0.2s",
                      }}
                    >
                      {loginLoading ? "Verificando..." : "Ingresar"}
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Admin content ── */
                <>
                  {/* Tabs */}
                  <div style={{ display: "flex", gap: "4px", marginBottom: "24px", background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "4px" }}>
                    {(["reviews", "social"] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setTab(t)}
                        style={{
                          flex: 1, padding: "9px", border: "none", cursor: "pointer",
                          borderRadius: "8px", fontFamily: "serif", fontSize: "0.7rem",
                          letterSpacing: "0.08em", textTransform: "uppercase",
                          background: tab === t ? GREEN : "transparent",
                          color: tab === t ? "white" : "rgba(255,255,255,0.4)",
                          transition: "all 0.2s",
                        }}
                      >
                        {t === "reviews" ? "Reseñas" : "Redes Sociales"}
                      </button>
                    ))}
                  </div>

                  {/* ── Reviews tab ── */}
                  {tab === "reviews" && (
                    reviewsLoading ? (
                      <p style={{ fontFamily: "serif", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", textAlign: "center", padding: "40px 0" }}>Cargando...</p>
                    ) : reviews.length === 0 ? (
                      <p style={{ fontFamily: "serif", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", textAlign: "center", padding: "40px 0", fontStyle: "italic" }}>
                        No hay reseñas todavía.
                      </p>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {reviews.map(r => (
                          <div key={r.id}>
                            {editingReview?.id === r.id ? (
                              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "16px", border: "1px solid rgba(255,255,255,0.1)" }}>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                                  <div>
                                    <label style={labelStyle}>Nombre</label>
                                    <input style={inputStyle} value={editingReview.authorName}
                                      onChange={e => setEditingReview(v => v && ({ ...v, authorName: e.target.value }))} />
                                  </div>
                                  <div>
                                    <label style={labelStyle}>Rol</label>
                                    <input style={inputStyle} value={editingReview.authorRole ?? ""}
                                      onChange={e => setEditingReview(v => v && ({ ...v, authorRole: e.target.value }))} />
                                  </div>
                                </div>
                                <div style={{ marginBottom: "10px" }}>
                                  <label style={labelStyle}>Calificación</label>
                                  <div style={{ display: "flex", gap: "6px" }}>
                                    {[1,2,3,4,5].map(s => (
                                      <button key={s} onClick={() => setEditingReview(v => v && ({ ...v, rating: s }))}
                                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: s <= editingReview.rating ? "#ffd700" : "rgba(255,255,255,0.2)", padding: 0 }}>★</button>
                                    ))}
                                  </div>
                                </div>
                                <div style={{ marginBottom: "10px" }}>
                                  <label style={labelStyle}>Contenido</label>
                                  <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={editingReview.content}
                                    onChange={e => setEditingReview(v => v && ({ ...v, content: e.target.value }))} />
                                </div>
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <button onClick={() => setEditingReview(null)} style={{ flex: 1, padding: "8px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "rgba(255,255,255,0.5)", fontFamily: "serif", fontSize: "0.72rem", cursor: "pointer" }}>
                                    Cancelar
                                  </button>
                                  <button onClick={saveReview} style={{ flex: 2, padding: "8px", background: GREEN, border: "none", borderRadius: "6px", color: "white", fontFamily: "serif", fontSize: "0.72rem", cursor: "pointer" }}>
                                    Guardar
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "14px 16px", border: `1px solid ${r.isApproved ? "rgba(45,90,39,0.4)" : "rgba(255,200,0,0.15)"}` }}>
                                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
                                  <div>
                                    <p style={{ fontFamily: "serif", fontSize: "0.82rem", color: "white", margin: "0 0 2px", fontWeight: 700 }}>{r.authorName}</p>
                                    {r.authorRole && <p style={{ fontFamily: "serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", margin: 0 }}>{r.authorRole}</p>}
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                                    <Stars rating={r.rating} />
                                    <span style={{
                                      fontFamily: "serif", fontSize: "0.55rem", letterSpacing: "0.1em",
                                      padding: "2px 8px", borderRadius: "9999px",
                                      background: r.isApproved ? "rgba(45,90,39,0.4)" : "rgba(255,200,0,0.15)",
                                      color: r.isApproved ? "#a8d5a2" : "#ffd700",
                                      textTransform: "uppercase",
                                    }}>
                                      {r.isApproved ? "Aprobada" : "Pendiente"}
                                    </span>
                                  </div>
                                </div>
                                <p style={{ fontFamily: "serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", fontStyle: "italic", margin: "0 0 12px", lineHeight: 1.6 }}>
                                  "{r.content.length > 120 ? r.content.slice(0, 120) + "…" : r.content}"
                                </p>
                                <div style={{ display: "flex", gap: "8px" }}>
                                  {!r.isApproved && (
                                    <button onClick={() => approveReview(r.id)} style={{ padding: "6px 14px", background: GREEN, border: "none", borderRadius: "6px", color: "white", fontFamily: "serif", fontSize: "0.65rem", cursor: "pointer", letterSpacing: "0.06em" }}>
                                      ✓ Aprobar
                                    </button>
                                  )}
                                  <button onClick={() => setEditingReview(r)} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "rgba(255,255,255,0.6)", fontFamily: "serif", fontSize: "0.65rem", cursor: "pointer" }}>
                                    Editar
                                  </button>
                                  <button onClick={() => deleteReview(r.id)} style={{ padding: "6px 14px", background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.2)", borderRadius: "6px", color: "#ff8080", fontFamily: "serif", fontSize: "0.65rem", cursor: "pointer" }}>
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  )}

                  {/* ── Social links tab ── */}
                  {tab === "social" && (
                    <div>
                      {socialLoading ? (
                        <p style={{ fontFamily: "serif", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", textAlign: "center", padding: "40px 0" }}>Cargando...</p>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                          {socialLinks.map(link => (
                            <div key={link.id}>
                              {editingLink?.id === link.id ? (
                                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "14px", border: "1px solid rgba(255,255,255,0.1)" }}>
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                                    <div>
                                      <label style={labelStyle}>Plataforma</label>
                                      <input style={inputStyle} value={editingLink.platform}
                                        onChange={e => setEditingLink(v => v && ({ ...v, platform: e.target.value }))} />
                                    </div>
                                    <div>
                                      <label style={labelStyle}>Etiqueta</label>
                                      <input style={inputStyle} value={editingLink.label}
                                        onChange={e => setEditingLink(v => v && ({ ...v, label: e.target.value }))} />
                                    </div>
                                  </div>
                                  <div style={{ marginBottom: "10px" }}>
                                    <label style={labelStyle}>URL</label>
                                    <input style={inputStyle} value={editingLink.url}
                                      onChange={e => setEditingLink(v => v && ({ ...v, url: e.target.value }))} />
                                  </div>
                                  <div style={{ display: "flex", gap: "8px" }}>
                                    <button onClick={() => setEditingLink(null)} style={{ flex: 1, padding: "8px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "rgba(255,255,255,0.5)", fontFamily: "serif", fontSize: "0.72rem", cursor: "pointer" }}>
                                      Cancelar
                                    </button>
                                    <button onClick={saveLink} style={{ flex: 2, padding: "8px", background: GREEN, border: "none", borderRadius: "6px", color: "white", fontFamily: "serif", fontSize: "0.72rem", cursor: "pointer" }}>
                                      Guardar
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: "12px" }}>
                                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "white", flexShrink: 0 }}>
                                    {PLATFORM_ICONS[link.iconKey] ?? link.platform[0]?.toUpperCase()}
                                  </div>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontFamily: "serif", fontSize: "0.78rem", color: "white", margin: "0 0 2px", fontWeight: 700 }}>{link.label}</p>
                                    <p style={{ fontFamily: "serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.url}</p>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                                    <button onClick={() => toggleLink(link)} style={{
                                      width: "36px", height: "20px", borderRadius: "9999px", border: "none", cursor: "pointer",
                                      background: link.isActive ? GREEN : "rgba(255,255,255,0.15)",
                                      position: "relative", transition: "background 0.2s",
                                    }}>
                                      <span style={{
                                        position: "absolute", top: "3px",
                                        left: link.isActive ? "18px" : "3px",
                                        width: "14px", height: "14px", borderRadius: "50%",
                                        background: "white", transition: "left 0.2s",
                                      }} />
                                    </button>
                                    <button onClick={() => setEditingLink(link)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "rgba(255,255,255,0.5)", fontFamily: "serif", fontSize: "0.62rem", cursor: "pointer", padding: "5px 10px" }}>
                                      Editar
                                    </button>
                                    <button onClick={() => deleteLink(link.id)} style={{ background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.2)", borderRadius: "6px", color: "#ff8080", fontFamily: "serif", fontSize: "0.62rem", cursor: "pointer", padding: "5px 10px" }}>
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {showNewLink ? (
                        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "14px", border: "1px solid rgba(255,255,255,0.1)" }}>
                          <p style={{ fontFamily: "serif", fontSize: "0.72rem", color: "white", marginBottom: "12px", fontWeight: 700 }}>Nueva red social</p>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                            <div>
                              <label style={labelStyle}>Plataforma</label>
                              <input style={inputStyle} placeholder="instagram" value={newLink.platform}
                                onChange={e => setNewLink(v => ({ ...v, platform: e.target.value }))} />
                            </div>
                            <div>
                              <label style={labelStyle}>Etiqueta</label>
                              <input style={inputStyle} placeholder="Instagram" value={newLink.label}
                                onChange={e => setNewLink(v => ({ ...v, label: e.target.value }))} />
                            </div>
                          </div>
                          <div style={{ marginBottom: "10px" }}>
                            <label style={labelStyle}>URL</label>
                            <input style={inputStyle} placeholder="https://instagram.com/..." value={newLink.url}
                              onChange={e => setNewLink(v => ({ ...v, url: e.target.value }))} />
                          </div>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button onClick={() => { setShowNewLink(false); setNewLink({ platform: "", label: "", url: "", iconKey: "" }); }} style={{ flex: 1, padding: "8px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "rgba(255,255,255,0.5)", fontFamily: "serif", fontSize: "0.72rem", cursor: "pointer" }}>
                              Cancelar
                            </button>
                            <button onClick={addLink} style={{ flex: 2, padding: "8px", background: GREEN, border: "none", borderRadius: "6px", color: "white", fontFamily: "serif", fontSize: "0.72rem", cursor: "pointer" }}>
                              Agregar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowNewLink(true)}
                          style={{
                            width: "100%", padding: "12px", background: "transparent",
                            border: "1px dashed rgba(255,255,255,0.2)", borderRadius: "10px",
                            color: "rgba(255,255,255,0.45)", fontFamily: "serif", fontSize: "0.72rem",
                            cursor: "pointer", transition: "all 0.2s",
                          }}
                        >
                          + Agregar red social
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
