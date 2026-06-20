import { motion } from "framer-motion";
import doctorPhoto from "@assets/image_1781916620650.png";

const GREEN = "#2d5a27";
const BLACK = "#0a0a0a";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white"
    >
      {/* ── Desktop layout ─────────────────────────────────────── */}
      <div className="hidden lg:flex" style={{ height: '92vh' }}>

        {/* Photo — fills full column height, left-anchored like hero */}
        <motion.div
          className="relative flex-shrink-0 overflow-hidden"
          style={{ width: '50%', height: '92vh' }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={doctorPhoto}
            alt="Dr. Mario Sanchez"
            data-testid="img-doctor-about-desktop"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto"
            style={{ maxWidth: 'none' }}
          />
        </motion.div>

        {/* Text column */}
        <motion.div
          className="flex flex-col items-center justify-center text-center px-16 xl:px-24"
          style={{ width: '50%' }}
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
      </div>

      {/* ── Mobile layout — no image ────────────────────────────── */}
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
