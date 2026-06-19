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

      {/* Content — desktop: two columns, mobile: stacked */}
      <div className="flex flex-col lg:flex-row items-stretch min-h-[80vh]">

        {/* Photo column — fills height like hero */}
        <motion.div
          className="flex items-end justify-center w-full lg:w-[45%] pt-8 lg:pt-0"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={doctorPhoto}
            alt="Dr. Mario Sanchez"
            data-testid="img-doctor-about"
            className="w-auto object-contain object-bottom"
            style={{ maxHeight: '80vh', maxWidth: '100%' }}
          />
        </motion.div>

        {/* Text column */}
        <motion.div
          className="flex flex-col items-center justify-center text-center w-full lg:w-[55%] px-8 md:px-16 lg:px-20 py-16 lg:py-24"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Title — same size as Topics heading */}
          <h2
            className="font-serif font-bold text-4xl md:text-5xl leading-tight mb-10"
            style={{ color: '#ffffff' }}
          >
            Perfil Profesional
          </h2>

          {/* Bio paragraphs */}
          <div
            className="space-y-5 font-serif leading-relaxed max-w-lg text-left"
            style={{ color: 'rgba(255,255,255,0.80)', fontWeight: 300, fontSize: '1.05rem' }}
          >
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
