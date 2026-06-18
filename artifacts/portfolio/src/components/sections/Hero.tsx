import { motion } from "framer-motion";
import doctorPhoto from "@assets/image_1781821171932.png";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-white flex items-stretch overflow-hidden"
      data-testid="section-hero"
    >
      <div className="container mx-auto px-6 md:px-12 pt-20 flex items-center w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-center min-h-[calc(100vh-5rem)]">

          {/* Left: Text content — centered on all screens */}
          <motion.div
            className="flex flex-col items-center text-center justify-center py-14 md:py-0"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtitles — visible black */}
            <motion.p
              className="font-serif text-[10px] sm:text-xs tracking-[0.3em] uppercase text-black mb-1 leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              Terapeuta Respiratorio
            </motion.p>
            <motion.p
              className="font-serif text-[10px] sm:text-xs tracking-[0.3em] uppercase text-black mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              Salubrista Público
            </motion.p>

            {/* Main title — reduced size */}
            <motion.h1
              className="font-serif text-[2.8rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] font-bold text-black leading-[0.92] tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              DR.&nbsp;MARIO<br />SANCHEZ
            </motion.h1>

            {/* Tagline — visible black */}
            <motion.div
              className="mt-8 flex items-center gap-3 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <div className="w-8 h-px bg-black" />
              <p className="font-serif text-[10px] sm:text-xs tracking-[0.22em] uppercase text-black">
                Claves para una vida más saludable
              </p>
            </motion.div>

            {/* Two CTA buttons */}
            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95 }}
            >
              <a
                href="#about"
                data-testid="link-hero-conocer"
                className="font-serif text-xs tracking-[0.22em] uppercase text-black border border-black px-7 py-3.5 hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto text-center"
              >
                Conocer más &nbsp;→
              </a>
              <a
                href="#contact"
                data-testid="link-hero-agendar"
                className="font-serif text-xs tracking-[0.22em] uppercase text-black border border-black px-7 py-3.5 hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto text-center"
              >
                Agendar consulta
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Doctor photo — hidden on small mobile, visible md+ */}
          <motion.div
            className="hidden md:flex items-end justify-center md:justify-end h-full"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={doctorPhoto}
              alt="Dr. Mario Sanchez"
              data-testid="img-doctor-hero"
              className="w-auto object-contain object-bottom"
              style={{ maxHeight: "82vh" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
