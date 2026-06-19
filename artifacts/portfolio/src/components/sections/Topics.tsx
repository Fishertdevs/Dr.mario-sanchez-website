import { motion } from "framer-motion";
import {
  Leaf, Home, Heart, Wind, Activity, Moon, Syringe, Stethoscope,
} from "lucide-react";

const GREEN = "#2d5a27";
const GREEN_LIGHT = "#3a7232";

const specializations = [
  {
    title: "Medicina Alternativa",
    desc: "Terapias complementarias integradas al cuidado convencional.",
    icon: Leaf,
  },
  {
    title: "Consulta Domiciliaria",
    desc: "Atención médica profesional en la comodidad de su hogar.",
    icon: Home,
  },
  {
    title: "Proceso Terapéutico",
    desc: "Acompañamiento integral en cada etapa del tratamiento.",
    icon: Heart,
  },
  {
    title: "Administración de Medicamentos Inhalados",
    desc: "Técnicas correctas y seguras para terapia inhalatoria.",
    icon: Wind,
  },
  {
    title: "Fisioterapia Respiratoria",
    desc: "Ejercicios y maniobras para optimizar la función pulmonar.",
    icon: Activity,
  },
  {
    title: "Manejo de Apnea del Sueño — CPAP & BPAP",
    desc: "Diagnóstico y manejo con equipos de última generación.",
    icon: Moon,
  },
  {
    title: "Rehabilitación Cardio Pulmonar",
    desc: "Programas de recuperación cardiovascular y respiratoria.",
    icon: Stethoscope,
  },
  {
    title: "Inyectología",
    desc: "Aplicación segura y profesional de medicamentos inyectables.",
    icon: Syringe,
  },
];

export default function Topics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="topics" className="relative" style={{ background: GREEN }} data-testid="section-topics">
      <div className="container mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            className="font-serif text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Especialidades &amp; Servicios
          </motion.p>
          <motion.h2
            className="font-serif font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Áreas de Especialización
          </motion.h2>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {specializations.map(({ title, desc, icon: Icon }, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden"
              style={{
                background: 'white',
                borderRadius: '2px 16px 2px 16px',
                borderTop: `3px solid ${GREEN}`,
                borderLeft: '1px solid rgba(45,90,39,0.15)',
                borderBottom: '1px solid rgba(45,90,39,0.15)',
                borderRight: '1px solid rgba(45,90,39,0.15)',
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease',
              }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.18)' }}
            >
              {/* Watermark number */}
              <span
                className="absolute bottom-2 right-3 font-serif font-black select-none pointer-events-none leading-none"
                style={{ fontSize: '4.5rem', color: GREEN, opacity: 0.06, lineHeight: 1 }}
              >
                {(index + 1).toString().padStart(2, '0')}
              </span>

              <div className="relative z-10 p-5 md:p-6 flex flex-col h-full">
                {/* Icon badge */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4 shrink-0 transition-colors duration-300 group-hover:scale-110"
                  style={{ background: GREEN, transition: 'transform 0.3s ease' }}
                >
                  <Icon size={18} color="white" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h4
                  className="font-serif font-semibold leading-snug mb-2"
                  style={{ color: '#0a0a0a', fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}
                >
                  {title}
                </h4>

                {/* Description */}
                <p
                  className="font-serif text-xs leading-relaxed mt-auto pt-3"
                  style={{ color: '#666', borderTop: '1px solid rgba(45,90,39,0.12)' }}
                >
                  {desc}
                </p>

                {/* Bottom accent line */}
                <div
                  className="h-0.5 mt-4 w-6 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: GREEN }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave bottom */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '90px' }}>
          <path d="M0,30 C360,90 1080,0 1440,60 L1440,90 L0,90 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
