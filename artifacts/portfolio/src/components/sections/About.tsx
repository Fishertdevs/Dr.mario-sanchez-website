import { motion } from "framer-motion";
import doctorPhoto from "@assets/image-Photoroom_(14)_1781833343312.png";

export default function About() {
  return (
    <section id="about" className="relative" style={{ background: '#0a0a0a' }}>

      {/* Wave top */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0, marginTop: '-2px' }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '90px' }}>
          <path d="M0,0 C480,90 960,0 1440,60 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      {/* ── Desktop layout ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex min-h-screen">

        {/* Photo — same treatment as hero */}
        <motion.div
          className="flex items-end justify-center"
          style={{ width: '45%' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={doctorPhoto}
            alt="Dr. Mario Sanchez"
            data-testid="img-doctor-about-desktop"
            className="w-auto object-contain object-bottom"
            style={{ maxHeight: '88vh' }}
          />
        </motion.div>

        {/* Text column */}
        <motion.div
          className="flex flex-col items-center justify-center text-center px-16 xl:px-24"
          style={{ width: '55%' }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif font-bold text-5xl leading-tight mb-10 text-white">
            Perfil Profesional
          </h2>
          <p
            className="font-serif leading-relaxed max-w-lg text-base"
            style={{ color: 'rgba(255,255,255,0.80)', fontWeight: 300 }}
          >
            Terapeuta Respiratorio con 2 años de experiencia en gestión de equipos biomédicos (CPAP, BPAP).
            Experto en teleorientación y capacitación remota de pacientes. Sólida formación en valoración
            terapéutica, diseño de programas educativos y gestión de citas, con amplia experiencia en sistemas
            de registro clínico y CRM. Habilidades adicionales en atención a víctimas de violencia sexual,
            promoción de la salud, donación de sangre y vacunación. Mi enfoque integral garantiza no solo
            el tratamiento, sino la educación y prevención como pilares fundamentales del bienestar.
          </p>
        </motion.div>
      </div>

      {/* ── Mobile layout ──────────────────────────────────────────────── */}
      <div className="flex lg:hidden flex-col items-center px-6 pt-10 pb-6">

        {/* Title */}
        <motion.h2
          className="font-serif font-bold text-4xl text-white text-center mb-8 leading-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Perfil Profesional
        </motion.h2>

        {/* Single unified paragraph — small, centered, text-balance avoids orphans */}
        <motion.p
          className="font-serif text-sm leading-relaxed text-center mb-8 max-w-xs"
          style={{ color: 'rgba(255,255,255,0.80)', fontWeight: 300, textWrap: 'balance' } as React.CSSProperties}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Terapeuta Respiratorio con 2 años de experiencia en gestión de equipos biomédicos (CPAP, BPAP).
          Experto en teleorientación y capacitación remota de pacientes. Sólida formación en valoración
          terapéutica, diseño de programas educativos y gestión de citas, con amplia experiencia en registros
          clínicos y CRM. Habilidades en promoción de la salud, donación de sangre y vacunación. Mi enfoque
          garantiza la educación y prevención como pilares del bienestar.
        </motion.p>

        {/* Photo — visible on mobile, bottom-aligned */}
        <motion.div
          className="flex justify-center w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src={doctorPhoto}
            alt="Dr. Mario Sanchez"
            data-testid="img-doctor-about-mobile"
            className="w-auto object-contain"
            style={{ maxHeight: '55vh', maxWidth: '80%' }}
          />
        </motion.div>
      </div>

      {/* Wave bottom */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0, marginBottom: '-2px' }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '90px' }}>
          <path d="M0,30 C360,90 1080,0 1440,50 L1440,90 L0,90 Z" fill="white" />
        </svg>
      </div>

    </section>
  );
}
