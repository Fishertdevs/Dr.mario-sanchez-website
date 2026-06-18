import { motion } from "framer-motion";
import doctorPhoto from "@assets/image_1781821171932.png";

const GREEN = "#2d5a27";
const BLACK = "#0a0a0a";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-white overflow-hidden"
      data-testid="section-hero"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* Left column */}
        <div className="flex flex-col items-center justify-center text-center px-8 md:px-12 pt-24 pb-16 md:pt-0 md:pb-0">

          <motion.p
            className="font-serif text-xs tracking-[0.3em] uppercase mb-1"
            style={{ color: BLACK, fontWeight: 500 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Terapeuta Respiratorio
          </motion.p>

          <motion.p
            className="font-serif text-xs tracking-[0.3em] uppercase mb-8"
            style={{ color: BLACK, fontWeight: 500 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Salubrista Público
          </motion.p>

          {/* Title — single line */}
          <motion.h1
            className="font-serif font-bold leading-none tracking-tight"
            style={{
              color: BLACK,
              fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
              whiteSpace: 'nowrap',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            DR. MARIO SANCHEZ
          </motion.h1>

          {/* Tagline */}
          <motion.div
            className="mt-6 flex items-center gap-3 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="w-7 h-px" style={{ backgroundColor: BLACK }} />
            <p
              className="font-serif text-[11px] tracking-[0.2em] uppercase"
              style={{ color: BLACK, fontWeight: 500 }}
            >
              Claves para una vida más saludable
            </p>
          </motion.div>

          {/* CTA Buttons — text only, dark green */}
          <motion.div
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
          >
            <a
              href="#about"
              data-testid="link-hero-conocer"
              className="font-serif text-sm tracking-[0.25em] uppercase hover:opacity-60 transition-opacity duration-200"
              style={{ color: GREEN, fontWeight: 600 }}
            >
              Conocer más
            </a>
            <span style={{ color: BLACK, opacity: 0.2 }} className="hidden sm:block select-none font-light">|</span>
            <a
              href="#contact"
              data-testid="link-hero-agendar"
              className="font-serif text-sm tracking-[0.25em] uppercase hover:opacity-60 transition-opacity duration-200"
              style={{ color: GREEN, fontWeight: 600 }}
            >
              Agendar consulta
            </a>
          </motion.div>
        </div>

        {/* Right column — doctor photo, anchored bottom */}
        <motion.div
          className="hidden md:flex items-end justify-center h-screen"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={doctorPhoto}
            alt="Dr. Mario Sanchez"
            data-testid="img-doctor-hero"
            className="w-auto object-contain object-bottom"
            style={{ maxHeight: '88vh' }}
          />
        </motion.div>

      </div>
    </section>
  );
}
