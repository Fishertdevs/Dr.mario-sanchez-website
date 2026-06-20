import { motion } from "framer-motion";
import doctorPhoto from "@assets/image_1781916620650.png";

const BLACK = "#0a0a0a";
const GREEN = "#2d5a27";

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-white"
    >
      {/* ── Desktop layout ─────────────────────────────────────── */}
      <div className="hidden lg:flex" style={{ height: '92vh', position: 'relative', overflow: 'hidden' }}>

        {/* Photo column — slightly narrower so image appears smaller */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '36%',
            height: '92vh',
            flexShrink: 0,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img
            src={doctorPhoto}
            alt="Dr. Mario Sanchez"
            data-testid="img-doctor-about-desktop"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </motion.div>

        {/* Text column */}
        <motion.div
          className="flex flex-col items-center justify-center text-center px-16 xl:px-24"
          style={{ flex: 1 }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif font-bold text-5xl leading-tight mb-10" style={{ color: BLACK }}>
            Perfil Profesional
          </h2>
          <div className="space-y-5 font-serif leading-relaxed max-w-lg text-left" style={{ color: '#444', fontWeight: 300, fontSize: '1.05rem' }}>
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

        {/* Green wave — overlays bottom of image, connects to Blog */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ lineHeight: 0, zIndex: 10 }}
        >
          <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '90px' }}>
            <path d="M0,30 C480,90 960,0 1440,60 L1440,90 L0,90 Z" fill={GREEN} />
          </svg>
        </div>
      </div>

      {/* Green fill — connects About wave to Blog */}
      <div className="hidden lg:block" style={{ background: GREEN, height: '2px', marginTop: '-1px' }} />

      {/* ── Mobile layout ────────────────────────────── */}
      <div className="flex lg:hidden flex-col items-center px-6 pt-10 pb-24">
        <motion.h2
          className="font-serif font-bold text-center mb-8 leading-tight whitespace-nowrap"
          style={{ fontSize: 'min(calc((100vw - 64px) / 13.5), 2.5rem)', color: BLACK }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Perfil Profesional
        </motion.h2>
        <motion.p
          className="font-serif text-sm leading-relaxed text-center max-w-xs"
          style={{ color: '#555', fontWeight: 300, textWrap: 'balance' } as React.CSSProperties}
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
      </div>

    </section>
  );
}
