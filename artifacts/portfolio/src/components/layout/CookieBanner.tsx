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
      <div className="flex flex-row items-center justify-between gap-2 px-3 md:px-12 py-2">

        {/* Text — one line on mobile */}
        <p className="font-serif leading-snug" style={{ color: '#555', fontSize: 'clamp(0.6rem, 2.2vw, 0.8rem)', minWidth: 0 }}>
          Usamos cookies.{" "}
          <a
            href="#"
            className="underline underline-offset-2 hover:opacity-60 transition-opacity whitespace-nowrap"
            style={{ color: GREEN }}
          >
            Política de Privacidad.
          </a>
        </p>

        {/* Buttons — always visible, never wrap */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={reject}
            className="font-serif tracking-[0.1em] uppercase rounded-full transition-opacity hover:opacity-75 whitespace-nowrap"
            style={{
              background: GREEN,
              color: 'white',
              border: 'none',
              fontSize: 'clamp(0.55rem, 2vw, 0.7rem)',
              padding: '0.3rem 0.75rem',
            }}
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="font-serif tracking-[0.1em] uppercase rounded-full transition-opacity hover:opacity-75 whitespace-nowrap"
            style={{
              background: GREEN,
              color: 'white',
              border: 'none',
              fontSize: 'clamp(0.55rem, 2vw, 0.7rem)',
              padding: '0.3rem 0.75rem',
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
