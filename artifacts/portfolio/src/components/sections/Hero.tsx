import { motion } from "framer-motion";
import doctorPhoto from "@assets/image_1781821171932.png";

const GREEN = "#2d5a27";
const BLACK = "#0a0a0a";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-white flex flex-col overflow-hidden"
      data-testid="section-hero"
    >
      {/* ── Desktop layout: two columns ─────────────────────────────── */}
      <div className="hidden md:grid flex-1 min-h-screen" style={{ gridTemplateColumns: '58% 42%' }}>

        {/* Left: text content */}
        <motion.div
          className="flex flex-col items-center justify-center text-center pl-8 pr-4 lg:pl-12 lg:pr-6 pt-20"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Main headline — the titles become the heading */}
          <motion.h1
            className="font-serif font-bold leading-[1.1] mb-6"
            style={{ color: BLACK, fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Terapeuta Respiratorio<br />Salubrista Público
          </motion.h1>

          {/* Decorative separator — green */}
          <motion.div
            className="flex items-center justify-center gap-3 w-full max-w-xs mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <div className="flex-1 h-px" style={{ backgroundColor: GREEN }} />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill={GREEN} />
            </svg>
            <div className="flex-1 h-px" style={{ backgroundColor: GREEN }} />
          </motion.div>

          {/* Description */}
          <motion.p
            className="font-serif text-lg leading-relaxed mb-8 max-w-sm"
            style={{ color: '#444', fontWeight: 300 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
          >
            Bienvenido al portafolio del Dr. Mario Sanchez. Especialista en terapia respiratoria
            y salud pública, comprometido con la prevención y el bienestar integral de sus pacientes
            en Bogotá.
          </motion.p>

          {/* Two buttons — same line */}
          <motion.div
            className="flex flex-row items-center justify-center gap-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <a
              href="#topics"
              data-testid="link-hero-especialidades"
              className="font-serif text-sm tracking-[0.28em] uppercase hover:opacity-60 transition-opacity duration-200"
              style={{ color: GREEN, fontWeight: 600 }}
            >
              Especialidades
            </a>
            <a
              href="#contact"
              data-testid="link-hero-agendar"
              className="font-serif text-sm tracking-[0.28em] uppercase hover:opacity-60 transition-opacity duration-200"
              style={{ color: GREEN, fontWeight: 600 }}
            >
              Agendar consulta
            </a>
          </motion.div>
        </motion.div>

        {/* Right: photo */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', height: '92vh', overflow: 'hidden' }}
        >
          <img
            src={doctorPhoto}
            alt="Dr. Mario Sanchez"
            data-testid="img-doctor-hero-desktop"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '65% top',
            }}
          />
        </motion.div>
      </div>

      {/* Green wave — desktop only, replaces the black one */}
      <div className="absolute bottom-0 left-0 w-full hidden md:block" style={{ lineHeight: 0, zIndex: 10 }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '90px' }}>
          <path d="M0,60 C480,0 960,90 1440,30 L1440,90 L0,90 Z" fill={GREEN} />
        </svg>
      </div>

      {/* ── Mobile layout: stacked ───────────────────────────────────── */}
      <div className="flex md:hidden flex-col min-h-screen">
        {/* Text block */}
        <motion.div
          className="flex flex-col items-center text-center px-7 pt-28 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-serif font-bold leading-[1.15] mb-5 w-full"
            style={{ color: BLACK }}
          >
            <span className="block text-center whitespace-nowrap" style={{ fontSize: 'min(calc((100vw - 64px) / 13.5), 2.5rem)' }}>
              Terapeuta Respiratorio
            </span>
            <span className="block text-center whitespace-nowrap" style={{ fontSize: 'min(calc((100vw - 64px) / 13.5), 2.5rem)' }}>
              Salubrista Público
            </span>
          </h1>

          {/* Separator — green */}
          <div className="flex items-center justify-center gap-3 w-full max-w-[200px] mb-5">
            <div className="flex-1 h-px" style={{ backgroundColor: GREEN }} />
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill={GREEN} />
            </svg>
            <div className="flex-1 h-px" style={{ backgroundColor: GREEN }} />
          </div>

          <p
            className="font-serif text-sm leading-relaxed mb-7 max-w-xs"
            style={{ color: '#555', fontWeight: 300 }}
          >
            Especialista en terapia respiratoria y salud pública, comprometido con la prevención
            y el bienestar integral de sus pacientes.
          </p>

          {/* Buttons — one line */}
          <div className="flex flex-row items-center justify-center gap-7">
            <a
              href="#topics"
              data-testid="link-hero-especialidades-mobile"
              className="font-serif text-[11px] tracking-[0.25em] uppercase hover:opacity-60 transition-opacity"
              style={{ color: GREEN, fontWeight: 600 }}
            >
              Áreas de especialización
            </a>
            <a
              href="#contact"
              data-testid="link-hero-agendar-mobile"
              className="font-serif text-[11px] tracking-[0.25em] uppercase hover:opacity-60 transition-opacity"
              style={{ color: GREEN, fontWeight: 600 }}
            >
              Agendar consulta
            </a>
          </div>
        </motion.div>

        {/* Doctor photo — fixed 55vh, green wave at the bottom */}
        <motion.div
          className="relative w-full"
          style={{ height: '55vh' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <img
            src={doctorPhoto}
            alt="Dr. Mario Sanchez"
            data-testid="img-doctor-hero-mobile"
            className="absolute bottom-0 left-0 w-full h-full object-contain object-bottom"
          />
          {/* Mobile wave — green, always at the true bottom of the image container */}
          <div className="absolute bottom-0 left-0 w-full" style={{ lineHeight: 0, zIndex: 10 }}>
            <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '90px' }}>
              <path d="M0,60 C480,0 960,90 1440,30 L1440,90 L0,90 Z" fill={GREEN} />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
