import { useState, useEffect } from "react";

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
    <div
      className="fixed bottom-0 left-0 right-0 z-[100]"
      style={{ borderTop: '1px solid #d4d4d4', background: 'white' }}
    >
      <div className="flex flex-row items-center justify-between gap-2 px-4 md:px-12 py-2">
        <p className="font-serif text-xs md:text-sm leading-snug" style={{ color: '#555' }}>
          Utilizamos cookies para mejorar su experiencia.{" "}
          <a href="#" className="underline underline-offset-2 transition-opacity hover:opacity-60 whitespace-nowrap" style={{ color: GREEN }}>
            Política de Cookies y Privacidad.
          </a>
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={reject}
            className="font-serif text-[10px] md:text-[11px] tracking-[0.12em] uppercase px-3 py-1 md:px-4 md:py-1.5 rounded-full transition-opacity hover:opacity-75 whitespace-nowrap"
            style={{ background: GREEN, color: 'white', border: 'none' }}
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="font-serif text-[10px] md:text-[11px] tracking-[0.12em] uppercase px-3 py-1 md:px-4 md:py-1.5 rounded-full transition-opacity hover:opacity-75 whitespace-nowrap"
            style={{ background: GREEN, color: 'white', border: 'none' }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
