import { useState, useEffect, useRef } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const GREEN = "#2d5a27";
const DARK = "#1a2e17";
const MAX_REVIEWS = 50;

const GOOGLE_CLIENT_ID = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID ?? "";

const FIXED_NETWORKS = [
  { platform: "facebook",  label: "Facebook",  iconKey: "facebook",  placeholder: "https://www.facebook.com/..." },
  { platform: "instagram", label: "Instagram", iconKey: "instagram", placeholder: "https://www.instagram.com/..." },
  { platform: "tiktok",    label: "TikTok",    iconKey: "tiktok",    placeholder: "https://www.tiktok.com/@..." },
  { platform: "youtube",   label: "YouTube",   iconKey: "youtube",   placeholder: "https://www.youtube.com/@..." },
  { platform: "whatsapp",  label: "WhatsApp",  iconKey: "whatsapp",  placeholder: "https://wa.me/57..." },
];

const NET_ICONS: Record<string, React.ReactNode> = {
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80"/>
          <stop offset="30%" stopColor="#FCAF45"/>
          <stop offset="55%" stopColor="#F77737"/>
          <stop offset="75%" stopColor="#C13584"/>
          <stop offset="100%" stopColor="#833AB4"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)"/>
      <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
    </svg>
  ),
  tiktok: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="#010101">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.14 8.14 0 004.77 1.52V6.78a4.85 4.85 0 01-1-.09z"/>
    </svg>
  ),
  youtube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  whatsapp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="#25D366" strokeWidth="1.8" fill="none"/>
    </svg>
  ),
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

function DonutChart({ value, max, color, accent, label }: {
  value: number; max: number; color: string; accent: string; label: string;
}) {
  const [filled, setFilled] = useState(false);
  const r = 26;
  const circ = 2 * Math.PI * r;
  const pct = max > 0 ? value / max : 0;
  const dash = filled ? pct * circ : 0;

  useEffect(() => {
    setFilled(false);
    const t = setTimeout(() => setFilled(true), 120);
    return () => clearTimeout(t);
  }, [value, max]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <div style={{ position: "relative", width: 64, height: 64 }}>
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke={accent} strokeWidth="8"/>
          <circle
            cx="32" cy="32" r={r} fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeLinecap="round"
            style={{
              transformOrigin: "32px 32px",
              transform: "rotate(-90deg)",
              transition: "stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "serif", fontSize: "0.82rem", fontWeight: 700, color }}>{value}</span>
        </div>
      </div>
      <span style={{ fontFamily: "serif", fontSize: "0.5rem", color: "#9ca3af", letterSpacing: "0.09em", textTransform: "uppercase", textAlign: "center" }}>
        {label}
      </span>
      <span style={{ fontFamily: "serif", fontSize: "0.6rem", fontWeight: 700, color }}>
        {Math.round(pct * 100)}%
      </span>
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

const sectionInputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  padding: "7px 10px",
  background: "#f9fafb",
  border: "1px solid #e2e8f0",
  borderRadius: "7px",
  fontFamily: "sans-serif", fontSize: "0.7rem",
  color: "#374151", outline: "none",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function GoogleButtonBlock({ loading, error, notConfigured, onLogin }: {
  loading: boolean; error: string; notConfigured: boolean; onLogin: () => void;
}) {
  if (notConfigured) {
    return (
      <p style={{ fontFamily: "serif", fontSize: "0.72rem", color: "#ef4444", textAlign: "center", margin: 0 }}>
        VITE_GOOGLE_CLIENT_ID no está configurado.
      </p>
    );
  }
  if (loading) {
    return (
      <p style={{ fontFamily: "serif", fontSize: "0.78rem", color: "#6b7c69", textAlign: "center", margin: 0 }}>
        Verificando con Google...
      </p>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "12px" }}>
      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ flex: 1, height: "1px", background: "#e2eae1" }} />
        <span style={{ fontFamily: "serif", fontSize: "0.58rem", color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          O continúa con
        </span>
        <div style={{ flex: 1, height: "1px", background: "#e2eae1" }} />
      </div>
      {/* Google Button */}
      <button
        onClick={onLogin}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
          width: "100%", padding: "11px 16px",
          background: "white", border: "1px solid #dadce0", borderRadius: "8px",
          cursor: "pointer", fontFamily: "sans-serif", fontSize: "0.88rem",
          color: "#3c4043", fontWeight: 500,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.2s, background 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.14)"; (e.currentTarget as HTMLButtonElement).style.background = "#f8f9fa"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)"; (e.currentTarget as HTMLButtonElement).style.background = "white"; }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continuar con Google
      </button>
      {error && (
        <p style={{ fontFamily: "serif", fontSize: "0.7rem", color: "#ef4444", textAlign: "center", margin: 0 }}>
          {error}
        </p>
      )}
    </div>
  );
}

function AdminPanelInner({ isOpen, onClose }: Props) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("admin_token"));
  const [loggedEmail, setLoggedEmail] = useState(() => localStorage.getItem("admin_logged_email") ?? "");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState<"reviews" | "configuracion" | "dashboard">("reviews");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  const [needsSetup, setNeedsSetup] = useState<boolean | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    fetch("/api/admin/status")
      .then(r => r.json())
      .then(d => setNeedsSetup(d.needsSetup === true))
      .catch(() => setNeedsSetup(false));
  }, [isOpen]);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [reviewsCollapsed, setReviewsCollapsed] = useState(false);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [socialLoading, setSocialLoading] = useState(false);
  const [netUrls, setNetUrls] = useState<Record<string, string>>({});
  const [contactPhone, setContactPhone] = useState("");
  const [savingConfig, setSavingConfig] = useState(false);

  const [dashStats, setDashStats] = useState<DashStats | null>(null);
  const [dashLoading, setDashLoading] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isLoggedIn = !!token;

  const applyToken = (t: string, emailUsed: string) => {
    localStorage.setItem("admin_token", t);
    localStorage.setItem("admin_logged_email", emailUsed);
    setToken(t);
    setLoggedEmail(emailUsed);
    window.dispatchEvent(new CustomEvent("admin-auth-changed"));
  };

  const handleGoogleSuccess = async (access_token: string) => {
    setLoginLoading(true);
    setLoginError("");
    try {
      const r = await fetch("/api/admin/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token }),
      });
      if (!r.ok) {
        const d = await r.json();
        setLoginError(d.error ?? "Error al iniciar sesión con Google");
        return;
      }
      const { token: t, email: emailUsed } = await r.json();
      setNeedsSetup(false);
      applyToken(t, emailUsed);
    } finally {
      setLoginLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (res) => handleGoogleSuccess(res.access_token),
    onError: () => setLoginError("Error al conectar con Google"),
  });

  const logout = async () => {
    try {
      if (token) {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {}
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_logged_email");
    setToken(null);
    setLoggedEmail("");
    window.dispatchEvent(new CustomEvent("admin-auth-changed"));
    onClose();
  };

  const authFetch = async (url: string, opts: RequestInit = {}): Promise<Response> => {
    const res = await fetch(url, {
      ...opts,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(opts.headers as Record<string, string> ?? {}) },
    });
    if (res.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_logged_email");
      setToken(null);
      setLoggedEmail("");
      window.dispatchEvent(new CustomEvent("admin-auth-changed"));
    }
    return res;
  };

  const loadReviews = async () => {
    setReviewsLoading(true);
    try {
      const r = await authFetch("/api/admin/reviews");
      if (!r.ok) return;
      const data = await r.json();
      setReviews(Array.isArray(data) ? data : []);
    } finally {
      setReviewsLoading(false);
    }
  };

  const loadSocialLinks = async () => {
    setSocialLoading(true);
    try {
      const [linksRes, settingsRes] = await Promise.all([
        authFetch("/api/admin/social-links"),
        authFetch("/api/admin/settings"),
      ]);
      if (linksRes.ok) {
        const data = await linksRes.json();
        setSocialLinks(Array.isArray(data) ? data : []);
      }
      if (settingsRes.ok) {
        const settings = await settingsRes.json();
        setContactPhone(settings.contact_phone ?? "");
      }
    } finally {
      setSocialLoading(false);
    }
  };

  const loadDashboard = async () => {
    setDashLoading(true);
    try {
      const r = await authFetch("/api/admin/reviews");
      if (!r.ok) return;
      const raw = await r.json();
      const data: Review[] = Array.isArray(raw) ? raw : [];
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
    await authFetch(`/api/admin/reviews/${id}/approve`, { method: "POST" });
    await loadReviews();
  };

  const deleteReview = async (id: number) => {
    if (!confirm("¿Eliminar esta reseña?")) return;
    await authFetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    await loadReviews();
  };

  const saveReview = async () => {
    if (!editingReview) return;
    await authFetch(`/api/admin/reviews/${editingReview.id}`, {
      method: "PUT",
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

  useEffect(() => {
    const urls: Record<string, string> = {};
    FIXED_NETWORKS.forEach(net => {
      const existing = Array.isArray(socialLinks) ? socialLinks.find(l => l.iconKey === net.iconKey) : undefined;
      urls[net.iconKey] = existing?.url ?? "";
    });
    setNetUrls(urls);
  }, [socialLinks]);

  const saveAllConfig = async () => {
    setSavingConfig(true);
    try {
      for (const net of FIXED_NETWORKS) {
        const url = netUrls[net.iconKey] ?? "";
        const existing = Array.isArray(socialLinks) ? socialLinks.find(l => l.iconKey === net.iconKey) : undefined;
        if (existing) {
          await authFetch(`/api/admin/social-links/${existing.id}`, {
            method: "PUT",
            body: JSON.stringify({ ...existing, url }),
          });
        } else if (url.trim()) {
          await authFetch("/api/admin/social-links", {
            method: "POST",
            body: JSON.stringify({ platform: net.platform, label: net.label, url, iconKey: net.iconKey, sortOrder: 0, isActive: true }),
          });
        }
      }
      await authFetch("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify({ key: "contact_phone", value: contactPhone }),
      });
      await loadSocialLinks();
    } finally {
      setSavingConfig(false);
    }
  };

  if (!isOpen) return null;

  const usedPct = dashStats ? Math.min(100, Math.round((dashStats.approved / MAX_REVIEWS) * 100)) : 0;

  const googleNotConfigured = !GOOGLE_CLIENT_ID;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: isMobile ? "stretch" : "flex-end",
        alignItems: isMobile ? "flex-end" : "stretch",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: isMobile ? "100%" : "min(620px, 100%)",
          height: isMobile ? "50vh" : "100%",
          background: "#ffffff",
          display: "flex", flexDirection: "column",
          boxShadow: isMobile ? "0 -8px 40px rgba(0,0,0,0.18)" : "-8px 0 40px rgba(0,0,0,0.18)",
          borderLeft: isMobile ? "none" : "1px solid #e2eae1",
          borderTop: isMobile ? "1px solid #e2eae1" : "none",
          borderRadius: isMobile ? 0 : "32px 0 0 32px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          background: "white", borderBottom: "1px solid #e2eae1",
          padding: "0 14px", minHeight: "60px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "8px", flexShrink: 0,
          boxShadow: "0 1px 4px rgba(45,90,39,0.06)",
        }}>
          <div style={{ minWidth: 0, flex: 1, overflow: "hidden" }}>
            {isLoggedIn ? (
              <>
                <p style={{ fontFamily: "serif", fontSize: "0.9rem", color: DARK, fontWeight: 700, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Bienvenido, Admin
                </p>
                <p style={{ fontFamily: "serif", fontSize: "0.56rem", color: "#9ca3af", margin: "2px 0 0", letterSpacing: "0.06em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {getGreeting()}{loggedEmail ? ` · ${loggedEmail}` : ""}
                </p>
              </>
            ) : null}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            {isLoggedIn && (
              <button onClick={logout} style={{
                fontFamily: "serif", fontSize: "0.55rem", letterSpacing: "0.08em",
                color: "#9ca3af", background: "none", border: "none",
                cursor: "pointer", textTransform: "uppercase", whiteSpace: "nowrap",
              }}>
                Cerrar sesión
              </button>
            )}
            <button onClick={onClose} style={{
              background: "#f3f4f6", border: "none", cursor: "pointer",
              width: "28px", height: "28px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#6b7280", fontSize: "0.8rem", flexShrink: 0,
            }}>
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 12px 40px" }}>
          <div style={{ width: "100%", maxWidth: "560px" }}>
            {needsSetup === null ? (
              <div style={{ display: "flex", justifyContent: "center", paddingTop: "60px" }}>
                <p style={{ fontFamily: "serif", color: "#9ca3af", fontSize: "0.82rem" }}>Cargando...</p>
              </div>
            ) : needsSetup ? (
              /* ── Primera Configuración con Google ── */
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: isMobile ? "12px" : "32px" }}>
                <h1 style={{ fontFamily: "serif", fontSize: isMobile ? "1.1rem" : "1.4rem", color: DARK, fontWeight: 700, marginBottom: "4px", textAlign: "center" }}>
                  Configurar Acceso
                </h1>
                <p style={{ fontFamily: "serif", color: "#6b7c69", fontSize: "0.72rem", marginBottom: "4px", textAlign: "center", maxWidth: "280px" }}>
                  Primera vez aquí. Inicia sesión con Google para activar el panel.
                </p>
                <p style={{ fontFamily: "serif", color: "#9ca3af", fontSize: "0.6rem", marginBottom: isMobile ? "16px" : "24px", textAlign: "center" }}>
                  Esa cuenta quedará como la única con acceso.
                </p>
                <div style={{ width: "100%", maxWidth: "360px", background: "white", borderRadius: "16px", padding: "24px 24px", boxShadow: "0 4px 24px rgba(45,90,39,0.08)", border: "1px solid #e2eae1" }}>
                  <GoogleButtonBlock
                    loading={loginLoading}
                    error={loginError}
                    notConfigured={googleNotConfigured}
                    onLogin={() => loginWithGoogle()}
                  />
                </div>
              </div>
            ) : !isLoggedIn ? (
              /* ── Login con Google ── */
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: isMobile ? "12px" : "32px" }}>
                <h1 style={{ fontFamily: "serif", fontSize: isMobile ? "1.2rem" : "1.6rem", color: DARK, fontWeight: 700, marginBottom: "4px", textAlign: "center" }}>
                  Panel de Administración
                </h1>
                <p style={{ fontFamily: "serif", color: "#6b7c69", fontSize: "0.75rem", marginBottom: isMobile ? "16px" : "28px", textAlign: "center" }}>
                  Ingresa con tu cuenta de Google autorizada
                </p>
                <div style={{ width: "100%", maxWidth: "360px", background: "white", borderRadius: "16px", padding: "24px 24px", boxShadow: "0 4px 24px rgba(45,90,39,0.08)", border: "1px solid #e2eae1" }}>
                  <GoogleButtonBlock
                    loading={loginLoading}
                    error={loginError}
                    notConfigured={googleNotConfigured}
                    onLogin={() => loginWithGoogle()}
                  />
                </div>
              </div>
            ) : (
              /* ── Admin content ── */
              <>
                {/* Tabs */}
                <div style={{ display: "flex", gap: "0", marginBottom: "28px", background: "#f0f5ef", borderRadius: "12px", padding: "4px", border: "1px solid #e2eae1" }}>
                  {(["reviews", "configuracion", "dashboard"] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      style={{
                        flex: 1, padding: "8px 4px", border: "none", cursor: "pointer",
                        borderRadius: "9px", fontFamily: "serif", fontSize: "0.58rem",
                        letterSpacing: "0.04em", textTransform: "uppercase",
                        background: tab === t ? GREEN : "transparent",
                        color: tab === t ? "white" : "#6b7c69",
                        transition: "all 0.2s", fontWeight: tab === t ? 700 : 400,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}
                    >
                      {t === "reviews" ? "Reseñas" : t === "configuracion" ? "Config." : "Dashboard"}
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
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <button
                        onClick={() => setReviewsCollapsed(v => !v)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          background: "white", border: "1px solid #e2eae1", borderRadius: "10px",
                          padding: "9px 14px", cursor: "pointer", width: "100%",
                        }}
                      >
                        <span style={{ fontFamily: "serif", fontSize: "0.72rem", color: DARK, fontWeight: 700 }}>
                          {reviews.length} reseña{reviews.length !== 1 ? "s" : ""}
                        </span>
                        <span style={{ fontSize: "0.7rem", color: "#9ca3af", transition: "transform 0.25s", display: "inline-block", transform: reviewsCollapsed ? "rotate(-90deg)" : "rotate(0deg)" }}>
                          ▾
                        </span>
                      </button>

                      {!reviewsCollapsed && reviews.map(r => (
                        <div key={r.id}>
                          {editingReview?.id === r.id ? (
                            <div style={{ background: "white", borderRadius: "12px", padding: "16px", border: "1px solid #d1dbd0", boxShadow: "0 2px 8px rgba(45,90,39,0.06)" }}>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
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
                              <div style={{ marginBottom: "8px" }}>
                                <label style={labelStyle}>Calificación</label>
                                <div style={{ display: "flex", gap: "4px" }}>
                                  {[1, 2, 3, 4, 5].map(s => (
                                    <button key={s} onClick={() => setEditingReview(v => v && ({ ...v, rating: s }))}
                                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: s <= editingReview.rating ? "#f59e0b" : "#d1d5db", padding: 0 }}>★</button>
                                  ))}
                                </div>
                              </div>
                              <div style={{ marginBottom: "10px" }}>
                                <label style={labelStyle}>Contenido</label>
                                <textarea rows={2} style={{ ...inputStyle, resize: "vertical" }} value={editingReview.content}
                                  onChange={e => setEditingReview(v => v && ({ ...v, content: e.target.value }))} />
                              </div>
                              <div style={{ display: "flex", gap: "6px" }}>
                                <button onClick={() => setEditingReview(null)} style={{ flex: 1, padding: "7px", background: "#f3f4f6", border: "none", borderRadius: "7px", color: "#6b7280", fontFamily: "serif", fontSize: "0.68rem", cursor: "pointer" }}>
                                  Cancelar
                                </button>
                                <button onClick={saveReview} style={{ flex: 2, padding: "7px", background: GREEN, border: "none", borderRadius: "7px", color: "white", fontFamily: "serif", fontSize: "0.68rem", cursor: "pointer", fontWeight: 600 }}>
                                  Guardar
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div style={{ background: "white", borderRadius: "10px", padding: "9px 12px", border: "1px solid #e2eae1", display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                                <div style={{ display: "flex", gap: "1px" }}>
                                  {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: "0.65rem", color: s <= r.rating ? "#f59e0b" : "#e5e7eb" }}>★</span>)}
                                </div>
                                {r.isApproved
                                  ? <span style={{ padding: "1px 6px", background: "#f0f5ef", borderRadius: "999px", fontFamily: "serif", fontSize: "0.46rem", color: GREEN, letterSpacing: "0.05em" }}>Aprobada</span>
                                  : <span style={{ padding: "1px 6px", background: "#fef9e7", borderRadius: "999px", fontFamily: "serif", fontSize: "0.46rem", color: "#d97706", letterSpacing: "0.05em" }}>Pendiente</span>
                                }
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontFamily: "serif", fontSize: "0.75rem", color: DARK, fontWeight: 700, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {r.authorName}{r.authorRole ? <span style={{ fontWeight: 400, color: "#9ca3af" }}> · {r.authorRole}</span> : null}
                                </p>
                                <p style={{ fontFamily: "serif", fontSize: "0.66rem", color: "#6b7280", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {r.content}
                                </p>
                              </div>
                              <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                                {!r.isApproved && (
                                  <button onClick={() => approveReview(r.id)} title="Aprobar" style={{ width: "28px", height: "28px", background: "#f0f5ef", border: "none", borderRadius: "6px", color: GREEN, cursor: "pointer", fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✓</button>
                                )}
                                <button onClick={() => setEditingReview(r)} title="Editar" style={{ width: "28px", height: "28px", background: "#f8f9fa", border: "none", borderRadius: "6px", color: "#6b7280", cursor: "pointer", fontSize: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✏</button>
                                <button onClick={() => deleteReview(r.id)} title="Eliminar" style={{ width: "28px", height: "28px", background: "#fef2f2", border: "none", borderRadius: "6px", color: "#dc2626", cursor: "pointer", fontSize: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {socialLoading ? (
                      <p style={{ fontFamily: "serif", color: "#9ca3af", fontSize: "0.8rem", textAlign: "center", padding: "40px 0" }}>Cargando...</p>
                    ) : (
                      <>
                        {/* Contacto */}
                        <div style={{ background: "white", borderRadius: "12px", padding: "14px", border: "1px solid #e2eae1", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                          <h3 style={{ fontFamily: "serif", fontSize: "0.8rem", color: DARK, fontWeight: 700, margin: "0 0 10px", textAlign: "center" }}>
                            Contacto
                          </h3>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#6b7c69"/>
                            </svg>
                            <span style={{ fontFamily: "serif", fontSize: "0.7rem", color: DARK, fontWeight: 600 }}>
                              Teléfono de contacto
                            </span>
                          </div>
                          <input
                            type="tel"
                            value={contactPhone}
                            onChange={e => setContactPhone(e.target.value)}
                            placeholder="+57 314 312 7513"
                            style={sectionInputStyle}
                          />
                        </div>

                        {/* Redes Sociales */}
                        <div style={{ background: "white", borderRadius: "12px", padding: "14px", border: "1px solid #e2eae1", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                          <h3 style={{ fontFamily: "serif", fontSize: "0.8rem", color: DARK, fontWeight: 700, margin: "0 0 12px", textAlign: "center" }}>
                            Redes Sociales
                          </h3>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {FIXED_NETWORKS.map(net => (
                              <div key={net.iconKey}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                                  {NET_ICONS[net.iconKey]}
                                  <span style={{ fontFamily: "serif", fontSize: "0.7rem", color: DARK, fontWeight: 600 }}>
                                    {net.label}
                                  </span>
                                </div>
                                <input
                                  type="url"
                                  value={netUrls[net.iconKey] ?? ""}
                                  onChange={e => setNetUrls(v => ({ ...v, [net.iconKey]: e.target.value }))}
                                  placeholder={net.placeholder}
                                  style={sectionInputStyle}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={saveAllConfig}
                          disabled={savingConfig}
                          style={{
                            background: "none", border: "none",
                            color: savingConfig ? "#9ca3af" : GREEN,
                            fontFamily: "serif", fontSize: "0.68rem",
                            cursor: savingConfig ? "not-allowed" : "pointer",
                            letterSpacing: "0.1em", textTransform: "uppercase",
                            fontWeight: 700, padding: "8px 0", width: "100%",
                          }}
                        >
                          {savingConfig ? "Guardando..." : "Guardar Configuración"}
                        </button>

                        {/* Cuenta Google autorizada */}
                        <div style={{ background: "#f8faf8", borderRadius: "12px", padding: "14px", border: "1px solid #e2eae1" }}>
                          <h3 style={{ fontFamily: "serif", fontSize: "0.75rem", color: DARK, fontWeight: 700, margin: "0 0 6px", textAlign: "center" }}>
                            Cuenta Google Autorizada
                          </h3>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span style={{ fontFamily: "serif", fontSize: "0.72rem", color: "#6b7c69" }}>
                              {loggedEmail || "—"}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* ── Dashboard ── */}
                {tab === "dashboard" && (
                  dashLoading && !dashStats ? (
                    <p style={{ fontFamily: "serif", color: "#9ca3af", fontSize: "0.8rem", textAlign: "center", padding: "40px 0" }}>Cargando...</p>
                  ) : dashStats ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div style={{ background: "white", borderRadius: "12px", padding: "14px", border: "1px solid #e2eae1", boxShadow: "0 1px 6px rgba(45,90,39,0.06)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#f0f5ef", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <ellipse cx="12" cy="5" rx="9" ry="3" stroke={GREEN} strokeWidth="1.8"/>
                              <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" stroke={GREEN} strokeWidth="1.8"/>
                              <path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" stroke={GREEN} strokeWidth="1.8"/>
                            </svg>
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <p style={{ fontFamily: "serif", fontSize: "0.52rem", color: "#9ca3af", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Almacenamiento</p>
                            <p style={{ fontFamily: "serif", fontSize: "0.82rem", color: DARK, margin: 0, fontWeight: 700 }}>Espacio de Reseñas</p>
                          </div>
                          <span style={{ marginLeft: "auto", fontFamily: "serif", fontSize: "0.9rem", fontWeight: 700, color: GREEN, flexShrink: 0 }}>{usedPct}%</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <span style={{ fontFamily: "serif", fontSize: "0.62rem", color: "#6b7c69" }}>{dashStats.approved} de {MAX_REVIEWS} reseñas aprobadas</span>
                        </div>
                        <div style={{ background: "#e8f0e7", borderRadius: "9999px", height: "7px", overflow: "hidden", marginBottom: "6px" }}>
                          <div style={{
                            height: "100%", width: `${usedPct}%`,
                            background: `linear-gradient(90deg, ${GREEN}, #4a8f42)`,
                            borderRadius: "9999px", transition: "width 0.8s ease",
                          }} />
                        </div>
                        <p style={{ fontFamily: "serif", fontSize: "0.58rem", color: "#9ca3af", margin: 0 }}>
                          {MAX_REVIEWS - dashStats.approved} espacios disponibles
                        </p>
                      </div>

                      <div style={{ background: "white", borderRadius: "12px", padding: "16px 14px", border: "1px solid #e2eae1", boxShadow: "0 1px 6px rgba(45,90,39,0.06)" }}>
                        <p style={{ fontFamily: "serif", fontSize: "0.52rem", color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 16px", textAlign: "center" }}>
                          Distribución de Reseñas
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
                          <DonutChart value={dashStats.approved} max={MAX_REVIEWS} color="#2d5a27" accent="#e8f5e4" label="Aprobadas" />
                          <DonutChart value={dashStats.pending} max={MAX_REVIEWS} color="#d97706" accent="#fef9e7" label="Pendientes" />
                          <DonutChart value={dashStats.total} max={MAX_REVIEWS} color="#6b7280" accent="#f3f4f6" label="Total" />
                        </div>
                      </div>

                      <div style={{ background: "white", borderRadius: "12px", padding: "14px", border: "1px solid #e2eae1", boxShadow: "0 1px 6px rgba(45,90,39,0.06)" }}>
                        <p style={{ fontFamily: "serif", fontSize: "0.52rem", color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 12px", textAlign: "center" }}>
                          Estado del Sistema
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                          {[
                            { label: "API", status: "online", color: GREEN },
                            { label: "Base de datos", status: "online", color: GREEN },
                            { label: "Autenticación", status: "Google", color: "#4285F4" },
                            { label: "Actualizado", status: dashStats.lastUpdated.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }), color: "#6b7280" },
                          ].map(item => (
                            <div key={item.label} style={{ background: "#f8faf8", borderRadius: "8px", padding: "8px 10px", display: "flex", flexDirection: "column", gap: "2px" }}>
                              <span style={{ fontFamily: "serif", fontSize: "0.5rem", color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.label}</span>
                              <span style={{ fontFamily: "serif", fontSize: "0.72rem", color: item.color, fontWeight: 700 }}>{item.status}</span>
                            </div>
                          ))}
                        </div>
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

export default function AdminPanel({ isOpen, onClose }: Props) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || "placeholder.apps.googleusercontent.com"}>
      <AdminPanelInner isOpen={isOpen} onClose={onClose} />
    </GoogleOAuthProvider>
  );
}
