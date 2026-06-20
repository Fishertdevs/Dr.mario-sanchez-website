import { useState, useEffect } from "react";

const GREEN = "#2d5a27";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => { localStorage.setItem("cookie_consent", "accepted"); setVisible(false); };
  const reject = () => { localStorage.setItem("cookie_consent", "rejected"); setVisible(false); };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100]"
      style={{ borderTop: '1px solid #d4d4d4', background: 'white' }}
    >
      {/* ── Mobile: ultra-compact centered ── */}
      <div className="flex md:hidden flex-col items-center justify-center gap-1 px-3 py-1.5">
        <p className="font-serif text-center leading-tight" style={{ color: '#777', fontSize: '0.6rem' }}>
          Este sitio usa cookies para mejorar tu experiencia.
        </p>
        <div className="flex items-center gap-2">
          <button onClick={reject} className="font-serif uppercase rounded-full hover:opacity-75 transition-opacity"
            style={{ background: GREEN, color: 'white', border: 'none', fontSize: '0.55rem', padding: '0.2rem 0.6rem' }}>
            Rechazar
          </button>
          <button onClick={accept} className="font-serif uppercase rounded-full hover:opacity-75 transition-opacity"
            style={{ background: GREEN, color: 'white', border: 'none', fontSize: '0.55rem', padding: '0.2rem 0.6rem' }}>
            Aceptar
          </button>
        </div>
      </div>

      {/* ── Desktop: original layout ── */}
      <div className="hidden md:flex flex-row items-center justify-between gap-2 px-12 py-2">
        <p className="font-serif leading-snug" style={{ color: '#555', fontSize: 'clamp(0.55rem, 2vw, 0.78rem)', minWidth: 0 }}>
          Este sitio utiliza cookies propias y de terceros para mejorar tu experiencia de navegación y mostrarte contenido relevante.
        </p>
        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={reject} className="font-serif tracking-[0.1em] uppercase rounded-full transition-opacity hover:opacity-75 whitespace-nowrap"
            style={{ background: GREEN, color: 'white', border: 'none', fontSize: 'clamp(0.55rem, 2vw, 0.7rem)', padding: '0.3rem 0.75rem' }}>
            Rechazar
          </button>
          <button onClick={accept} className="font-serif tracking-[0.1em] uppercase rounded-full transition-opacity hover:opacity-75 whitespace-nowrap"
            style={{ background: GREEN, color: 'white', border: 'none', fontSize: 'clamp(0.55rem, 2vw, 0.7rem)', padding: '0.3rem 0.75rem' }}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
