const GREEN = "#2d5a27";

export default function Footer() {
  return (
    <footer className="relative" style={{ background: GREEN }}>
      <div className="flex flex-col items-center px-6 pb-12 pt-12">
        {/* Social icons — YouTube, TikTok, WhatsApp, Instagram */}
        <div className="flex items-center gap-6 mb-8">
          {/* YouTube */}
          <a href="https://youtube.com/@drmariosanchez" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
            className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:scale-110"
            style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" stroke="white" strokeWidth="1.8" fill="none"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
            </svg>
          </a>

          {/* TikTok */}
          <a href="https://tiktok.com/@dr..terapia" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
            className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:scale-110"
            style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/573143127513" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:scale-110"
            style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182a8.182 8.182 0 01-4.177-1.144l-.3-.178-3.094.878.84-3.06-.194-.314A8.182 8.182 0 1112 20.182z" fill="white"/>
            </svg>
          </a>

          {/* Instagram */}
          <a href="https://instagram.com/drmariosanchez7124" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:scale-110"
            style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8" fill="none"/>
              <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8" fill="none"/>
              <circle cx="17.5" cy="6.5" r="1" fill="white"/>
            </svg>
          </a>
        </div>

        {/* Tagline */}
        <p className="font-serif italic text-base mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Salud pública y bienestar respiratorio con vocación.
        </p>

        {/* Divider */}
        <div className="w-full max-w-md h-px mb-8" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* Legal links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
          {[
            { label: "Política de Cookies", href: "#" },
            { label: "Política de Privacidad", href: "#" },
            { label: "Términos y Condiciones", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-serif text-xs tracking-[0.18em] uppercase transition-opacity hover:opacity-60"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="font-serif text-xs tracking-[0.1em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
          © drmario sanchezsalubrista 2026
        </p>
      </div>
    </footer>
  );
}
