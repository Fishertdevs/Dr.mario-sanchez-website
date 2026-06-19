import { useState, useEffect } from "react";

const BLACK = "#0a0a0a";
const GREEN = "#2d5a27";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100]" style={{ filter: 'drop-shadow(0 -4px 24px rgba(0,0,0,0.10))' }}>
      {/* Wave top of banner */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '40px' }}>
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="white" />
        </svg>
      </div>

      {/* Banner body */}
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-12 pb-5 pt-1"
        style={{ background: 'white', borderTop: '1px solid #eee' }}
      >
        <p className="font-serif text-sm text-center md:text-left" style={{ color: '#555' }}>
          Utilizamos cookies para mejorar su experiencia.{" "}
          <a href="#" className="underline underline-offset-2 transition-opacity hover:opacity-60" style={{ color: GREEN }}>
            Política de Cookies y Privacidad.
          </a>
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={reject}
            className="font-serif text-xs tracking-[0.2em] uppercase px-5 py-2.5 border transition-opacity hover:opacity-60"
            style={{ borderColor: BLACK, color: BLACK, background: 'white' }}
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="font-serif text-xs tracking-[0.2em] uppercase px-5 py-2.5 border transition-opacity hover:opacity-80"
            style={{ borderColor: BLACK, background: BLACK, color: 'white' }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
