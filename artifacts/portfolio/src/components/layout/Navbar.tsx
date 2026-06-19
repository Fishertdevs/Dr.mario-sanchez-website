import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Inicio", href: "#hero" },
    { name: "Especializaciones", href: "#topics" },
    { name: "Perfil", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-black/10 py-3 shadow-sm"
          : "bg-transparent border-b border-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a
          href="#hero"
          className="font-serif font-bold text-[10px] md:text-sm tracking-[0.15em] uppercase text-black whitespace-nowrap"
          data-testid="link-logo"
        >
          Dr. Mario Sanchez
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-10" data-testid="nav-desktop">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              data-testid={`link-nav-${link.name.toLowerCase()}`}
              className="font-serif text-sm tracking-[0.12em] uppercase transition-colors duration-200"
              style={{ color: '#2d5a27' }}
            >
              {link.name}
            </a>
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
        <div className="md:hidden bg-white border-t border-black/10 py-6 px-8 flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              data-testid={`link-mobile-${link.name.toLowerCase()}`}
              className="font-serif text-xs tracking-[0.2em] uppercase transition-colors"
              style={{ color: '#2d5a27' }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </motion.header>
  );
}
