import { useState, useEffect, useRef } from "react";

const GREEN = "#2d5a27";
const DARK = "#1a2e17";
const MAX_REVIEWS = 50;

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

interface DashStats {
  total: number;
  approved: number;
  pending: number;
  lastUpdated: Date;
}

function DonutChart({ approved, pending, max }: { approved: number; pending: number; max: number }) {
  const r = 64;
  const cx = 90;
  const cy = 90;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * r;
  const available = Math.max(0, max - approved - pending);

  const segments = [
    { value: approved, color: "#2d5a27", label: "Aprobadas" },
    { value: pending,  color: "#f59e0b", label: "Pendientes" },
    { value: available, color: "#e2eae1", label: "Disponibles" },
  ];

  let cumulative = 0;
  const arcs = segments.map(seg => {
    const length = max > 0 ? (seg.value / max) * circumference : 0;
    const dashOffset = circumference / 4 - cumulative;
    cumulative += length;
    return { ...seg, length, dashOffset };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <div style={{ position: "relative", width: 180, height: 180 }}>
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e8f0e7" strokeWidth={strokeWidth} />
          {arcs.map((arc, i) =>
            arc.length > 0.5 ? (
              <circle
                key={i}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={arc.color}
                strokeWidth={strokeWidth}
                strokeLinecap="butt"
                strokeDasharray={`${arc.length} ${circumference - arc.length}`}
                strokeDashoffset={arc.dashOffset}
                style={{ transition: "stroke-dasharray 0.9s ease, stroke-dashoffset 0.9s ease" }}
              />
            ) : null
          )}
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontFamily: "serif", fontSize: "2rem", fontWeight: 700, color: DARK, lineHeight: 1 }}>
            {approved + pending}
          </span>
          <span style={{ fontFamily: "serif", fontSize: "0.58rem", color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "3px" }}>
            Reseñas
          </span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        {[
          { color: "#2d5a27", label: "Aprobadas", value: approved },
          { color: "#f59e0b", label: "Pendientes", value: pending },
          { color: "#c8d8c6", label: "Disponibles", value: available },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", minWidth: "72px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: item.color }} />
            <span style={{ fontFamily: "serif", fontSize: "1.2rem", fontWeight: 700, color: DARK, lineHeight: 1 }}>{item.value}</span>
            <span style={{ fontFamily: "serif", fontSize: "0.58rem", color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
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
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("admin_token"));
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState<"reviews" | "configuracion" | "dashboard">("reviews");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [socialLoading, setSocialLoading] = useState(false);
  const [editingNetKey, setEditingNetKey] = useState<string | null>(null);
  const [editingUrl, setEditingUrl] = useState("");
  const [savingNet, setSavingNet] = useState(false);

  const [dashStats, setDashStats] = useState<DashStats | null>(null);
  const [dashLoading, setDashLoading] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      window.dispatchEvent(new CustomEvent("admin-auth-changed"));
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setEmail("");
    window.dispatchEvent(new CustomEvent("admin-auth-changed"));
    onClose();
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

  const loadDashboard = async () => {
    setDashLoading(true);
    try {
      const r = await fetch("/api/admin/reviews", { headers });
      const data: Review[] = await r.json();
      setDashStats({
        total: data.length,
        approved: data.filter(rv => rv.isApproved).length,
        pending: data.filter(rv => !rv.isApproved).length,
        lastUpdated: new Date(),
      });
    } finally {
      setDashLoading(false);
    }
  };

  useEffect(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    if (isLoggedIn && isOpen) {
      if (tab === "reviews") loadReviews();
      else if (tab === "configuracion") loadSocialLinks();
      else if (tab === "dashboard") {
        loadDashboard();
        pollRef.current = setInterval(loadDashboard, 30000);
      }
    }
    return () => { if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; } };
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

  const usedPct = dashStats ? Math.min(100, Math.round((dashStats.approved / MAX_REVIEWS) * 100)) : 0;

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.45)", display: "flex", justifyContent: "flex-end" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(620px, 100%)", height: "100%", background: "#ffffff",
          display: "flex", flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.18)",
          borderLeft: "1px solid #e2eae1",
          borderRadius: "32px 0 0 32px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          background: "white", borderBottom: "1px solid #e2eae1",
          padding: "0 28px", height: "64px",
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          flexShrink: 0,
          boxShadow: "0 1px 4px rgba(45,90,39,0.06)",
        }}>
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
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px 60px" }}>
          <div style={{ width: "100%", maxWidth: "560px" }}>
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
                    {loginLoading ? "Verificando..." : "Ingresar"}
                  </button>
                </div>
              </div>
            ) : (
              /* ── Admin content ── */
              <>
                {/* Greeting */}
                <div style={{ marginBottom: "28px" }}>
                  <p style={{ fontFamily: "serif", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "4px" }}>
                    {getGreeting()}
                  </p>
                  <h1 style={{ fontFamily: "serif", fontSize: "1.8rem", color: DARK, fontWeight: 700, margin: 0 }}>
                    Bienvenido, Admin
                  </h1>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", gap: "0", marginBottom: "28px", background: "#f0f5ef", borderRadius: "12px", padding: "4px", border: "1px solid #e2eae1" }}>
                  {(["reviews", "configuracion", "dashboard"] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      style={{
                        flex: 1, padding: "9px 6px", border: "none", cursor: "pointer",
                        borderRadius: "9px", fontFamily: "serif", fontSize: "0.68rem",
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        background: tab === t ? GREEN : "transparent",
                        color: tab === t ? "white" : "#6b7c69",
                        transition: "all 0.2s", fontWeight: tab === t ? 700 : 400,
                      }}
                    >
                      {t === "reviews" ? "Reseñas" : t === "configuracion" ? "Configuración" : "Dashboard"}
                    </button>
                  ))}
                </div>

                {/* ── Reseñas ── */}
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

                {/* ── Configuración ── */}
                {tab === "configuracion" && (
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

                {/* ── Dashboard ── */}
                {tab === "dashboard" && (
                  dashLoading && !dashStats ? (
                    <p style={{ fontFamily: "serif", color: "#9ca3af", fontSize: "0.8rem", textAlign: "center", padding: "40px 0" }}>Cargando...</p>
                  ) : dashStats ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {/* Review space card */}
                      <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e2eae1", boxShadow: "0 1px 6px rgba(45,90,39,0.06)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#f0f5ef", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <ellipse cx="12" cy="5" rx="9" ry="3" stroke={GREEN} strokeWidth="1.8"/>
                              <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" stroke={GREEN} strokeWidth="1.8"/>
                              <path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" stroke={GREEN} strokeWidth="1.8"/>
                            </svg>
                          </div>
                          <div>
                            <p style={{ fontFamily: "serif", fontSize: "0.65rem", color: "#9ca3af", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Almacenamiento</p>
                            <p style={{ fontFamily: "serif", fontSize: "1rem", color: DARK, margin: 0, fontWeight: 700 }}>Espacio de Reseñas</p>
                          </div>
                          <span style={{ marginLeft: "auto", fontFamily: "serif", fontSize: "1.1rem", fontWeight: 700, color: GREEN }}>{usedPct}%</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <span style={{ fontFamily: "serif", fontSize: "0.78rem", color: "#6b7c69" }}>{dashStats.approved} de {MAX_REVIEWS} reseñas aprobadas</span>
                        </div>
                        <div style={{ background: "#e8f0e7", borderRadius: "9999px", height: "10px", overflow: "hidden", marginBottom: "8px" }}>
                          <div style={{
                            height: "100%",
                            width: `${usedPct}%`,
                            background: `linear-gradient(90deg, ${GREEN}, #4a8f42)`,
                            borderRadius: "9999px",
                            transition: "width 0.8s ease",
                          }} />
                        </div>
                        <p style={{ fontFamily: "serif", fontSize: "0.72rem", color: "#9ca3af", margin: 0 }}>
                          {MAX_REVIEWS - dashStats.approved} espacios disponibles
                        </p>
                      </div>

                      {/* Donut chart */}
                      <div style={{ background: "white", borderRadius: "16px", padding: "28px 20px", border: "1px solid #e2eae1", boxShadow: "0 1px 6px rgba(45,90,39,0.06)" }}>
                        <DonutChart
                          approved={dashStats.approved}
                          pending={dashStats.pending}
                          max={MAX_REVIEWS}
                        />
                      </div>

                      {/* Real-time indicator */}
                      <div style={{ background: "#f0f5ef", borderRadius: "12px", padding: "14px 18px", border: "1px solid #d1dbd0", display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", flexShrink: 0, boxShadow: "0 0 0 3px rgba(34,197,94,0.25)" }} />
                        <div>
                          <p style={{ fontFamily: "serif", fontSize: "0.72rem", color: GREEN, margin: 0, fontWeight: 600 }}>
                            Actualización en tiempo real
                          </p>
                          <p style={{ fontFamily: "serif", fontSize: "0.62rem", color: "#9ca3af", margin: 0 }}>
                            Última actualización: {dashStats.lastUpdated.toLocaleTimeString("es-CO")} · cada 30 seg
                          </p>
                        </div>
                        <button
                          onClick={loadDashboard}
                          disabled={dashLoading}
                          style={{ marginLeft: "auto", padding: "6px 14px", background: "white", border: "1px solid #d1dbd0", borderRadius: "8px", color: GREEN, fontFamily: "serif", fontSize: "0.62rem", cursor: "pointer", flexShrink: 0 }}
                        >
                          {dashLoading ? "..." : "↻ Actualizar"}
                        </button>
                      </div>
                    </div>
                  ) : null
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
