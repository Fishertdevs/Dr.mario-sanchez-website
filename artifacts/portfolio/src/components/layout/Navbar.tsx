import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Inicio", id: "hero" },
    { name: "Especializaciones", id: "topics" },
    { name: "Perfil", id: "about" },
    { name: "Blog", id: "blog" },
    { name: "Contacto", id: "contact" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/97 backdrop-blur-md border-b border-black/10 py-5 shadow-sm"
          : "bg-transparent border-b border-transparent py-7"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <button
          onClick={() => scrollTo("hero")}
          className="font-serif font-bold text-[10px] md:text-sm tracking-[0.15em] uppercase text-black whitespace-nowrap"
          data-testid="link-logo"
        >
          Dr. Mario Sanchez
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-10" data-testid="nav-desktop">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              data-testid={`link-nav-${link.name.toLowerCase()}`}
              className="font-serif text-sm tracking-[0.12em] uppercase transition-all duration-200 hover:text-[#6aab5e] relative after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#6aab5e] after:transition-all after:duration-200 hover:after:w-full"
              style={{ color: '#2d5a27', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {link.name}
            </button>
          ))}
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
              onClick={() => scrollTo(link.id)}
              data-testid={`link-mobile-${link.name.toLowerCase()}`}
              className="font-serif text-xs tracking-[0.2em] uppercase transition-all duration-200 text-left hover:text-[#6aab5e]"
              style={{ color: '#2d5a27', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {link.name}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
