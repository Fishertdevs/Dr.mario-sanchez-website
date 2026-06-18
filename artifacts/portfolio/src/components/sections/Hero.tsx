import { motion } from "framer-motion";
import doctorPhoto from "@assets/image_1781821171932.png";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-white flex items-stretch overflow-hidden"
      data-testid="section-hero"
    >
      <div className="container mx-auto px-6 md:px-12 pt-20 flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-center min-h-[calc(100vh-5rem)]">

          {/* Left: Text content */}
          <motion.div
            className="flex flex-col justify-center py-16 md:py-0"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              className="font-serif text-xs md:text-sm tracking-[0.35em] uppercase text-black/50 mb-2 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              Terapeuta Respiratorio
            </motion.p>
            <motion.p
              className="font-serif text-xs md:text-sm tracking-[0.35em] uppercase text-black/50 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              Salubrista Público
            </motion.p>

            <motion.h1
              className="font-serif text-[3.5rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-bold text-black leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              DR.&nbsp;MARIO<br />SANCHEZ
            </motion.h1>

            <motion.div
              className="mt-12 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="w-12 h-px bg-black/30" />
              <p className="font-serif text-xs tracking-[0.2em] uppercase text-black/40">
                Claves para una vida más saludable
              </p>
            </motion.div>

            <motion.a
              href="#about"
              data-testid="link-hero-cta"
              className="mt-12 inline-flex items-center gap-3 font-serif text-sm tracking-[0.2em] uppercase text-black border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-300 w-fit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Conocer más
              <span className="text-lg leading-none">→</span>
            </motion.a>
          </motion.div>

          {/* Right: Doctor photo */}
          <motion.div
            className="relative flex items-end justify-center md:justify-end h-full min-h-[420px] md:min-h-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={doctorPhoto}
              alt="Dr. Mario Sanchez"
              data-testid="img-doctor-hero"
              className="w-full max-w-xs sm:max-w-sm md:max-w-none md:w-auto md:h-[85vh] object-contain object-bottom"
              style={{ maxHeight: "85vh" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
