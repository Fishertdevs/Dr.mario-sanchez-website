import { useState, useEffect } from "react";

const GREEN = "#2d5a27";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => { localStorage.setItem("cookie_consent", "accepted"); setVisible(false); };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100]"
      style={{ borderTop: '1px solid #d4d4d4', background: 'white' }}
    >
      <div className="flex flex-row items-center justify-center gap-4 px-3 md:px-12 py-2">

        {/* Text — centered */}
        <p className="font-serif leading-snug text-center" style={{ color: '#555', fontSize: 'clamp(0.6rem, 2vw, 0.82rem)' }}>
          Este sitio usa cookies
        </p>

        {/* Single accept button */}
        <button
          onClick={accept}
          className="font-serif tracking-[0.1em] uppercase rounded-full transition-opacity hover:opacity-75 whitespace-nowrap shrink-0"
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
  );
}
