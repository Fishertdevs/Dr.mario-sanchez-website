import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export default function Navbar({ onOpenAdmin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem("admin_token"));

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => setIsAdmin(!!localStorage.getItem("admin_token"));
    window.addEventListener("admin-auth-changed", checkAuth);
    return () => window.removeEventListener("admin-auth-changed", checkAuth);
  }, []);

  const links = [
    { name: "Inicio", id: "hero" },
    { name: "Especializaciones", id: "topics" },
    { name: "Perfil", id: "about" },
    { name: "Contacto", id: "contact" },
  ];

  const handleLink = (id: string) => {
    setMenuOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
      }, 120);
    }
  };

  const solid = !isHome || isScrolled;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-white/97 backdrop-blur-md border-b border-black/10 py-5 shadow-sm"
          : "bg-transparent border-b border-transparent py-7"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <button
          onClick={() => handleLink("hero")}
          className="font-serif font-bold text-[10px] md:text-sm tracking-[0.15em] uppercase text-black whitespace-nowrap"
          data-testid="link-logo"
        >
          Dr. Mario Sanchez
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-10 items-center" data-testid="nav-desktop">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLink(link.id)}
              data-testid={`link-nav-${link.name.toLowerCase()}`}
              className="font-serif text-sm tracking-[0.12em] uppercase transition-all duration-200 hover:text-[#009688] relative after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#009688] after:transition-all after:duration-200 hover:after:w-full"
              style={{ color: '#1565C0', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {link.name}
            </button>
          ))}

          {isAdmin && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              style={{
                display: "flex", alignItems: "center", gap: "7px",
                padding: "8px 18px",
                background: "#1565C0",
                border: "none", borderRadius: "9999px",
                color: "white",
                fontFamily: "serif", fontSize: "0.72rem",
                letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: "pointer", fontWeight: 700,
                boxShadow: "0 2px 10px rgba(21,101,192,0.25)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#0D47A1")}
              onMouseLeave={e => (e.currentTarget.style.background = "#1565C0")}
            >
              Bienvenido Admin
            </button>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="button-mobile-menu"
          aria-label="Abrir menú"
        >
          <span className={`block w-6 h-px bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-white border-t border-black/10 py-6 px-8 flex flex-col gap-5"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLink(link.id)}
              data-testid={`link-mobile-${link.name.toLowerCase()}`}
              className="font-serif text-xs tracking-[0.2em] uppercase transition-all duration-200 text-left hover:text-[#009688]"
              style={{ color: '#1565C0', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {link.name}
            </button>
          ))}
          {isAdmin && onOpenAdmin && (
            <button
              onClick={() => { setMenuOpen(false); onOpenAdmin(); }}
              style={{
                display: "flex", alignItems: "center", gap: "7px",
                padding: "10px 18px", background: "#1565C0",
                border: "none", borderRadius: "9999px", color: "white",
                fontFamily: "serif", fontSize: "0.72rem",
                letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: "pointer", fontWeight: 700, alignSelf: "flex-start",
              }}
            >
              Bienvenido Admin
            </button>
          )}
        </motion.div>
      )}
    </motion.header>
  );
}
