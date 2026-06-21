import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const GREEN = "#2d5a27";
const DARK = "#1a2e17";

const FIXED_NETWORKS = [
  { platform: "youtube",   label: "YouTube",   iconKey: "youtube",   placeholder: "https://youtube.com/@..." },
  { platform: "tiktok",    label: "TikTok",    iconKey: "tiktok",    placeholder: "https://tiktok.com/@..." },
  { platform: "instagram", label: "Instagram", iconKey: "instagram", placeholder: "https://instagram.com/..." },
  { platform: "whatsapp",  label: "WhatsApp",  iconKey: "whatsapp",  placeholder: "https://wa.me/57..." },
];

const NET_ICONS: Record<string, React.ReactNode> = {
  youtube:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" stroke={GREEN} strokeWidth="1.8" fill="none"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={GREEN}/></svg>,
  tiktok:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  instagram: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke={GREEN} strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke={GREEN} strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1" fill={GREEN}/></svg>,
  whatsapp:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill={GREEN}/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke={GREEN} strokeWidth="1.8" fill="none"/></svg>,
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

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

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= rating ? "#f59e0b" : "#d1d5db", fontSize: "0.8rem" }}>★</span>
      ))}
    </span>
  );
}

const inputStyle: React.CSSProperties = {
  background: "#f8faf8", border: "1px solid #d1dbd0",
  borderRadius: "8px", padding: "9px 12px", color: "#1a1a1a",
  fontFamily: "serif", fontSize: "0.82rem", outline: "none",
  width: "100%", boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "serif", fontSize: "0.58rem", color: "#6b7c69",
  letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "5px",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: Props) {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("admin_token"));
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState<"reviews" | "social">("reviews");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [socialLoading, setSocialLoading] = useState(false);
  const [editingNetKey, setEditingNetKey] = useState<string | null>(null);
  const [editingUrl, setEditingUrl] = useState("");
  const [savingNet, setSavingNet] = useState(false);

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
      localStorage.setItem("admin_token", t);
      setToken(t);
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setEmail("");
    navigate("/");
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

  const startEditNet = (iconKey: string) => {
    const existing = socialLinks.find(l => l.iconKey === iconKey);
    setEditingNetKey(iconKey);
    setEditingUrl(existing?.url ?? "");
  };

  const saveNet = async (iconKey: string) => {
    setSavingNet(true);
    try {
      const network = FIXED_NETWORKS.find(n => n.iconKey === iconKey)!;
      const existing = socialLinks.find(l => l.iconKey === iconKey);
      if (existing) {
        await fetch(`/api/admin/social-links/${existing.id}`, {
          method: "PUT", headers,
          body: JSON.stringify({ ...existing, url: editingUrl }),
        });
      } else {
        await fetch("/api/admin/social-links", {
          method: "POST", headers,
          body: JSON.stringify({ platform: network.platform, label: network.label, url: editingUrl, iconKey, sortOrder: 0, isActive: true }),
        });
      }
      setEditingNetKey(null);
      await loadSocialLinks();
    } finally {
      setSavingNet(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#f5f7f5",
      display: "flex", flexDirection: "column",
      overflowY: "auto",
    }}>
      {/* Header */}
      <div style={{
        background: "white", borderBottom: "1px solid #e2eae1",
        padding: "0 32px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0, position: "sticky", top: 0, zIndex: 10,
        boxShadow: "0 1px 4px rgba(45,90,39,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: GREEN }} />
          <span style={{ fontFamily: "serif", fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", color: DARK, fontWeight: 700 }}>
            Panel Admin
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {isLoggedIn && (
            <button onClick={logout} style={{
              fontFamily: "serif", fontSize: "0.62rem", letterSpacing: "0.1em",
              color: "#9ca3af", background: "none", border: "none",
              cursor: "pointer", textTransform: "uppercase",
            }}>
              Cerrar sesión
            </button>
          )}
          <button onClick={onClose} style={{
            background: "#f3f4f6", border: "none", cursor: "pointer",
            width: "32px", height: "32px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#6b7280", fontSize: "0.9rem",
          }}>
            ✕
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px 60px" }}>
        <div style={{ width: "100%", maxWidth: "640px" }}>
          {!isLoggedIn ? (
            /* ── Login ── */
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "32px" }}>
              <h1 style={{ fontFamily: "serif", fontSize: "1.6rem", color: DARK, fontWeight: 700, marginBottom: "6px", textAlign: "center" }}>
                Panel de Administración
              </h1>
              <p style={{ fontFamily: "serif", color: "#6b7c69", fontSize: "0.82rem", marginBottom: "36px", textAlign: "center" }}>
                Ingresa con tu correo de administrador
              </p>

              <div style={{ width: "100%", maxWidth: "360px", background: "white", borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 24px rgba(45,90,39,0.08)", border: "1px solid #e2eae1" }}>
                <label style={labelStyle}>Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setLoginError(""); }}
                  onKeyDown={e => { if (e.key === "Enter") login(); }}
                  placeholder="correo@ejemplo.com"
                  style={{ ...inputStyle, marginBottom: "16px", fontSize: "0.9rem" }}
                  autoFocus
                />
                {loginError && (
                  <p style={{ fontFamily: "serif", fontSize: "0.72rem", color: "#ef4444", marginBottom: "12px", textAlign: "center" }}>
                    {loginError}
                  </p>
                )}
                <button
                  onClick={login}
                  disabled={loginLoading || !email.trim()}
                  style={{
                    width: "100%", padding: "12px",
                    background: !email.trim() ? "#e2eae1" : GREEN,
                    border: "none", borderRadius: "10px",
                    color: !email.trim() ? "#9ca3af" : "white",
                    fontFamily: "serif", fontSize: "0.8rem",
                    cursor: loginLoading || !email.trim() ? "not-allowed" : "pointer",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    transition: "all 0.25s", fontWeight: 600,
                  }}
                >
                  {loginLoading ? "Verificando..." : email.trim() ? "Bienvenido Admin" : "Ingresar"}
                </button>
              </div>
            </div>
          ) : (
            /* ── Admin content ── */
            <>
              {/* Greeting */}
              <div style={{ marginBottom: "32px" }}>
                <p style={{ fontFamily: "serif", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "4px" }}>
                  {getGreeting()}
                </p>
                <h1 style={{ fontFamily: "serif", fontSize: "1.8rem", color: DARK, fontWeight: 700, margin: 0 }}>
                  Bienvenido, Admin
                </h1>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: "0", marginBottom: "28px", background: "white", borderRadius: "12px", padding: "4px", border: "1px solid #e2eae1", boxShadow: "0 1px 4px rgba(45,90,39,0.04)" }}>
                {(["reviews", "social"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      flex: 1, padding: "10px", border: "none", cursor: "pointer",
                      borderRadius: "9px", fontFamily: "serif", fontSize: "0.72rem",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      background: tab === t ? GREEN : "transparent",
                      color: tab === t ? "white" : "#6b7c69",
                      transition: "all 0.2s", fontWeight: tab === t ? 700 : 400,
                    }}
                  >
                    {t === "reviews" ? "Reseñas" : "Redes Sociales"}
                  </button>
                ))}
              </div>

              {/* ── Reviews tab ── */}
              {tab === "reviews" && (
                reviewsLoading ? (
                  <p style={{ fontFamily: "serif", color: "#9ca3af", fontSize: "0.8rem", textAlign: "center", padding: "40px 0" }}>Cargando...</p>
                ) : reviews.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 20px", background: "white", borderRadius: "16px", border: "1px solid #e2eae1" }}>
                    <p style={{ fontFamily: "serif", color: "#9ca3af", fontSize: "0.85rem", fontStyle: "italic" }}>
                      No hay reseñas todavía.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {reviews.map(r => (
                      <div key={r.id}>
                        {editingReview?.id === r.id ? (
                          <div style={{ background: "white", borderRadius: "12px", padding: "20px", border: "1px solid #d1dbd0", boxShadow: "0 2px 8px rgba(45,90,39,0.06)" }}>
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
                                {[1, 2, 3, 4, 5].map(s => (
                                  <button key={s} onClick={() => setEditingReview(v => v && ({ ...v, rating: s }))}
                                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem", color: s <= editingReview.rating ? "#f59e0b" : "#d1d5db", padding: 0 }}>★</button>
                                ))}
                              </div>
                            </div>
                            <div style={{ marginBottom: "14px" }}>
                              <label style={labelStyle}>Contenido</label>
                              <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={editingReview.content}
                                onChange={e => setEditingReview(v => v && ({ ...v, content: e.target.value }))} />
                            </div>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button onClick={() => setEditingReview(null)} style={{ flex: 1, padding: "9px", background: "#f3f4f6", border: "none", borderRadius: "8px", color: "#6b7280", fontFamily: "serif", fontSize: "0.72rem", cursor: "pointer" }}>
                                Cancelar
                              </button>
                              <button onClick={saveReview} style={{ flex: 2, padding: "9px", background: GREEN, border: "none", borderRadius: "8px", color: "white", fontFamily: "serif", fontSize: "0.72rem", cursor: "pointer", fontWeight: 600 }}>
                                Guardar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ background: "white", borderRadius: "12px", padding: "16px 20px", border: `1px solid ${r.isApproved ? "#b8d5b4" : "#fde68a"}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
                              <div>
                                <p style={{ fontFamily: "serif", fontSize: "0.85rem", color: DARK, margin: "0 0 2px", fontWeight: 700 }}>{r.authorName}</p>
                                {r.authorRole && <p style={{ fontFamily: "serif", fontSize: "0.65rem", color: "#9ca3af", margin: 0 }}>{r.authorRole}</p>}
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                                <Stars rating={r.rating} />
                                <span style={{
                                  fontFamily: "serif", fontSize: "0.55rem", letterSpacing: "0.1em",
                                  padding: "3px 10px", borderRadius: "9999px",
                                  background: r.isApproved ? "#dcfce7" : "#fef9c3",
                                  color: r.isApproved ? "#15803d" : "#ca8a04",
                                  textTransform: "uppercase", fontWeight: 700,
                                }}>
                                  {r.isApproved ? "Aprobada" : "Pendiente"}
                                </span>
                              </div>
                            </div>
                            <p style={{ fontFamily: "serif", fontSize: "0.78rem", color: "#4b5563", fontStyle: "italic", margin: "0 0 14px", lineHeight: 1.7 }}>
                              "{r.content.length > 120 ? r.content.slice(0, 120) + "…" : r.content}"
                            </p>
                            <div style={{ display: "flex", gap: "8px" }}>
                              {!r.isApproved && (
                                <button onClick={() => approveReview(r.id)} style={{ padding: "7px 16px", background: GREEN, border: "none", borderRadius: "7px", color: "white", fontFamily: "serif", fontSize: "0.65rem", cursor: "pointer", fontWeight: 600 }}>
                                  ✓ Aprobar
                                </button>
                              )}
                              <button onClick={() => setEditingReview(r)} style={{ padding: "7px 16px", background: "#f3f4f6", border: "none", borderRadius: "7px", color: "#374151", fontFamily: "serif", fontSize: "0.65rem", cursor: "pointer" }}>
                                Editar
                              </button>
                              <button onClick={() => deleteReview(r.id)} style={{ padding: "7px 16px", background: "#fef2f2", border: "none", borderRadius: "7px", color: "#dc2626", fontFamily: "serif", fontSize: "0.65rem", cursor: "pointer" }}>
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
                    <p style={{ fontFamily: "serif", color: "#9ca3af", fontSize: "0.8rem", textAlign: "center", padding: "40px 0" }}>Cargando...</p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <p style={{ fontFamily: "serif", fontSize: "0.72rem", color: "#6b7c69", marginBottom: "4px" }}>
                        Edita la URL de redirección para cada red social del sitio.
                      </p>
                      {FIXED_NETWORKS.map(net => {
                        const existing = socialLinks.find(l => l.iconKey === net.iconKey);
                        const isEditing = editingNetKey === net.iconKey;
                        return (
                          <div key={net.iconKey} style={{ background: "white", borderRadius: "12px", padding: "16px 20px", border: "1px solid #e2eae1", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: isEditing ? "14px" : "0" }}>
                              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#f0f5ef", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                {NET_ICONS[net.iconKey]}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontFamily: "serif", fontSize: "0.85rem", color: DARK, margin: "0 0 2px", fontWeight: 700 }}>{net.label}</p>
                                <p style={{ fontFamily: "serif", fontSize: "0.62rem", color: "#9ca3af", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {existing?.url || <span style={{ fontStyle: "italic" }}>Sin URL configurada</span>}
                                </p>
                              </div>
                              {!isEditing && (
                                <button onClick={() => startEditNet(net.iconKey)} style={{ padding: "7px 16px", background: "#f0f5ef", border: "none", borderRadius: "7px", color: GREEN, fontFamily: "serif", fontSize: "0.65rem", cursor: "pointer", fontWeight: 600, flexShrink: 0 }}>
                                  Editar URL
                                </button>
                              )}
                            </div>
                            {isEditing && (
                              <>
                                <input
                                  type="url"
                                  value={editingUrl}
                                  onChange={e => setEditingUrl(e.target.value)}
                                  placeholder={net.placeholder}
                                  style={{ ...inputStyle, marginBottom: "12px" }}
                                  autoFocus
                                />
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <button onClick={() => setEditingNetKey(null)} style={{ flex: 1, padding: "9px", background: "#f3f4f6", border: "none", borderRadius: "8px", color: "#6b7280", fontFamily: "serif", fontSize: "0.72rem", cursor: "pointer" }}>
                                    Cancelar
                                  </button>
                                  <button onClick={() => saveNet(net.iconKey)} disabled={savingNet} style={{ flex: 2, padding: "9px", background: GREEN, border: "none", borderRadius: "8px", color: "white", fontFamily: "serif", fontSize: "0.72rem", cursor: "pointer", fontWeight: 600 }}>
                                    {savingNet ? "Guardando..." : "Guardar"}
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
