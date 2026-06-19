import { motion } from "framer-motion";
import doctorPhoto from "@assets/image-Photoroom_(14)_1781833343312.png";

const GREEN = "#2d5a27";
const BLACK = "#0a0a0a";

export default function About() {
  return (
    <section id="about" className="relative" style={{ background: BLACK }}>

      {/* Wave top — white cuts into black */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0, marginTop: '-2px' }}>
        <svg
          viewBox="0 0 1440 90"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: '90px' }}
        >
          <path d="M0,0 C480,90 960,0 1440,60 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-16 py-16 md:py-24">

        {/* Section label */}
        <motion.p
          className="font-serif text-center text-xs tracking-[0.3em] uppercase font-bold mb-14"
          style={{ color: GREEN }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Perfil Profesional
        </motion.p>

        {/* Desktop: two columns — Mobile: stacked */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

          {/* Photo */}
          <motion.div
            className="flex justify-center w-full lg:w-auto"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={doctorPhoto}
              alt="Dr. Mario Sanchez"
              data-testid="img-doctor-about"
              className="w-56 sm:w-64 md:w-72 lg:w-80 object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Bio text */}
          <motion.div
            className="max-w-xl text-center lg:text-left"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-5 font-serif leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)', fontWeight: 300, fontSize: '1.05rem' }}>
              <p>
                Terapeuta Respiratorio con 2 años de experiencia en gestión de equipos biomédicos
                (CPAP, BPAP). Experto en teleorientación y capacitación remota de pacientes.
              </p>
              <p>
                Sólida formación en valoración terapéutica, diseño de programas educativos y
                gestión de citas. Amplia experiencia en sistemas de registro clínico y CRM.
              </p>
              <p>
                Habilidades adicionales en atención a víctimas de violencia sexual, promoción de
                la salud, donación de sangre y vacunación. Mi enfoque integral garantiza no solo
                el tratamiento, sino la educación y prevención como pilares fundamentales del
                bienestar.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Wave bottom — white emerges from black */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0, marginBottom: '-2px' }}>
        <svg
          viewBox="0 0 1440 90"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: '90px' }}
        >
          <path d="M0,30 C360,90 1080,0 1440,50 L1440,90 L0,90 Z" fill="white" />
        </svg>
      </div>

    </section>
  );
}
