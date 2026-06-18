import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Abstract Medical Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-muted text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Terapeuta Respiratorio &middot; Salubrista Público
          </h2>
        </motion.div>

        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold tracking-tight mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          DR. MARIO<br />SANCHEZ
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide leading-relaxed">
            "CLAVES PARA UNA VIDA MÁS SALUDABLE DESDE PROMOCIÓN Y PREVENCIÓN"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            className="flex flex-col items-center justify-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Descubrir</span>
            <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-white"
                animate={{ top: ["-50%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
