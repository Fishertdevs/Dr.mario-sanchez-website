import { motion } from "framer-motion";
import { SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";

const GREEN = "#2d5a27";
const BLACK = "#0a0a0a";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-white overflow-hidden" data-testid="section-contact">
      <div className="container relative z-10 mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-serif text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#aaa' }}>
              Agenda tu consulta
            </p>
            <h2 className="font-serif text-5xl md:text-7xl font-bold mb-12 leading-tight" style={{ color: BLACK }}>
              Hablemos de Prevención
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 mb-16"
          >
            <div className="flex flex-col items-center">
              <span className="uppercase text-xs tracking-widest mb-2" style={{ color: '#999' }}>Email</span>
              <a
                href="mailto:drterapia3@gmail.com"
                className="text-xl md:text-2xl font-light hover:underline underline-offset-8 decoration-1 font-serif"
                style={{ color: BLACK }}
              >
                drterapia3@gmail.com
              </a>
            </div>

            <div className="flex flex-col items-center">
              <span className="uppercase text-xs tracking-widest mb-2" style={{ color: '#999' }}>Teléfono</span>
              <a
                href="tel:3143127513"
                className="text-xl md:text-2xl font-light hover:underline underline-offset-8 decoration-1 font-serif"
                style={{ color: BLACK }}
              >
                314 312 7513
              </a>
            </div>

            <div className="flex flex-col items-center">
              <span className="uppercase text-xs tracking-widest mb-2" style={{ color: '#999' }}>Ubicación</span>
              <span className="text-xl md:text-2xl font-light font-serif" style={{ color: BLACK }}>
                Bogotá, Colombia
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-8"
          >
            <a
              href="https://instagram.com/drmariosanchez7124"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-4 border rounded-full transition-all duration-300 hover:scale-110"
              style={{ borderColor: BLACK, color: BLACK }}
            >
              <SiInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://tiktok.com/@dr..terapia"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="p-4 border rounded-full transition-all duration-300 hover:scale-110"
              style={{ borderColor: BLACK, color: BLACK }}
            >
              <SiTiktok className="w-6 h-6" />
            </a>
            <a
              href="https://wa.me/573143127513"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="p-4 border rounded-full transition-all duration-300 hover:scale-110"
              style={{ borderColor: BLACK, color: BLACK }}
            >
              <SiWhatsapp className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom — green fills into green Footer */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '90px' }}>
          <path d="M0,60 C480,0 960,90 1440,30 L1440,90 L0,90 Z" fill={GREEN} />
        </svg>
      </div>
    </section>
  );
}
