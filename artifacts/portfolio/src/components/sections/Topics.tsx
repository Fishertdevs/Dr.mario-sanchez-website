import { motion } from "framer-motion";

const GREEN = "#2d5a27";
const GREEN_LIGHT = "#e8f0e7";
const GREEN_MID = "#3a7232";

const specializations = [
  {
    title: "Medicina Alternativa",
    desc: "Terapias complementarias integradas al cuidado convencional para un bienestar integral.",
    illustration: (
      <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="60" cy="55" r="38" fill="#c8dfc6" opacity="0.5"/>
        <ellipse cx="60" cy="78" rx="22" ry="6" fill="#a0c49d" opacity="0.4"/>
        {/* Leaf */}
        <path d="M60 30 Q80 45 72 68 Q60 62 50 50 Q40 38 60 30Z" fill={GREEN} opacity="0.9"/>
        <path d="M60 30 Q45 50 60 68" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Sparkles */}
        <circle cx="82" cy="35" r="3" fill="#ffd700" opacity="0.9"/>
        <circle cx="40" cy="42" r="2" fill="#ffd700" opacity="0.7"/>
        <circle cx="88" cy="55" r="2" fill="#ffd700" opacity="0.6"/>
        <line x1="82" y1="29" x2="82" y2="32" stroke="#ffd700" strokeWidth="1.5"/>
        <line x1="78" y1="35" x2="86" y2="35" stroke="#ffd700" strokeWidth="1.5"/>
        {/* Small herbs */}
        <path d="M48 72 Q44 62 50 58" stroke={GREEN_MID} strokeWidth="2" strokeLinecap="round" fill="none"/>
        <ellipse cx="50" cy="58" rx="4" ry="5" fill={GREEN_MID} opacity="0.8" transform="rotate(-20 50 58)"/>
        <path d="M70 70 Q74 60 70 56" stroke={GREEN_MID} strokeWidth="2" strokeLinecap="round" fill="none"/>
        <ellipse cx="70" cy="56" rx="4" ry="5" fill={GREEN_MID} opacity="0.8" transform="rotate(20 70 56)"/>
      </svg>
    ),
  },
  {
    title: "Consulta Domiciliaria",
    desc: "Atención médica profesional en la comodidad y seguridad de su hogar.",
    illustration: (
      <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="60" cy="55" r="38" fill="#c8dfc6" opacity="0.5"/>
        {/* House */}
        <polygon points="60,22 88,44 82,44 82,76 38,76 38,44 32,44" fill="white" stroke={GREEN} strokeWidth="2"/>
        <rect x="52" y="56" width="16" height="20" rx="3" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1.5"/>
        {/* Door knob */}
        <circle cx="65" cy="67" r="1.5" fill={GREEN}/>
        {/* Window */}
        <rect x="40" y="50" width="12" height="10" rx="2" fill="#a8d4a6" stroke={GREEN} strokeWidth="1"/>
        {/* Cross / medical */}
        <rect x="56" y="36" width="8" height="2.5" rx="1" fill={GREEN}/>
        <rect x="58.75" y="33" width="2.5" height="8" rx="1" fill={GREEN}/>
        {/* Small doctor figure */}
        <circle cx="78" cy="58" r="5" fill="#f5d5b0"/>
        <path d="M72 76 Q73 64 78 63 Q83 64 84 76" fill={GREEN} opacity="0.85"/>
        {/* Bag */}
        <rect x="83" y="67" width="7" height="6" rx="2" fill="white" stroke={GREEN} strokeWidth="1"/>
        <path d="M84.5 67 Q86 64 87.5 67" stroke={GREEN} strokeWidth="1" fill="none"/>
      </svg>
    ),
  },
  {
    title: "Proceso Terapéutico",
    desc: "Acompañamiento integral y personalizado en cada etapa de su tratamiento.",
    illustration: (
      <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="60" cy="55" r="38" fill="#c8dfc6" opacity="0.5"/>
        {/* Two hands cradling a heart */}
        <path d="M32 68 Q28 55 36 50 Q42 46 46 54 L60 42 L74 54 Q78 46 84 50 Q92 55 88 68 L60 82 Z" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1.5"/>
        {/* Heart */}
        <path d="M60 68 Q48 58 48 51 Q48 43 56 43 Q60 43 60 47 Q60 43 64 43 Q72 43 72 51 Q72 58 60 68Z" fill={GREEN} opacity="0.95"/>
        {/* Pulse line */}
        <polyline points="44,57 49,57 52,50 55,63 59,50 62,63 65,57 76,57" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    title: "Administración de Medicamentos Inhalados",
    desc: "Técnicas correctas y seguras para una terapia inhalatoria efectiva.",
    illustration: (
      <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="60" cy="55" r="38" fill="#c8dfc6" opacity="0.5"/>
        {/* Inhaler body */}
        <rect x="50" y="40" width="20" height="32" rx="6" fill="white" stroke={GREEN} strokeWidth="2"/>
        <rect x="54" y="44" width="12" height="8" rx="3" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1"/>
        {/* Mouthpiece */}
        <rect x="44" y="64" width="32" height="8" rx="4" fill={GREEN} opacity="0.9"/>
        {/* Puff / spray particles */}
        <circle cx="38" cy="52" r="3.5" fill={GREEN_MID} opacity="0.4"/>
        <circle cx="32" cy="45" r="2.5" fill={GREEN_MID} opacity="0.3"/>
        <circle cx="36" cy="40" r="2" fill={GREEN_MID} opacity="0.25"/>
        <circle cx="30" cy="55" r="2" fill={GREEN_MID} opacity="0.3"/>
        <circle cx="25" cy="48" r="1.5" fill={GREEN_MID} opacity="0.2"/>
        {/* Button on top */}
        <rect x="55" y="34" width="10" height="6" rx="3" fill={GREEN} opacity="0.8"/>
      </svg>
    ),
  },
  {
    title: "Fisioterapia Respiratoria",
    desc: "Ejercicios y maniobras especializadas para optimizar la función pulmonar.",
    illustration: (
      <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="60" cy="55" r="38" fill="#c8dfc6" opacity="0.5"/>
        {/* Lungs */}
        <path d="M60 38 L60 70" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round"/>
        {/* Left lung */}
        <path d="M60 42 Q50 38 42 46 Q36 54 40 64 Q44 72 52 70 Q58 68 60 62" fill={GREEN} opacity="0.85"/>
        {/* Right lung */}
        <path d="M60 42 Q70 38 78 46 Q84 54 80 64 Q76 72 68 70 Q62 68 60 62" fill={GREEN_MID} opacity="0.85"/>
        {/* Breath waves */}
        <path d="M28 80 Q34 74 40 80 Q46 86 52 80 Q58 74 64 80 Q70 86 76 80 Q82 74 88 80" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Stars */}
        <circle cx="44" cy="54" r="2" fill="white" opacity="0.6"/>
        <circle cx="76" cy="54" r="2" fill="white" opacity="0.6"/>
      </svg>
    ),
  },
  {
    title: "Manejo de Apnea del Sueño — CPAP & BPAP",
    desc: "Diagnóstico y control con equipos de última generación para el sueño reparador.",
    illustration: (
      <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="60" cy="55" r="38" fill="#c8dfc6" opacity="0.5"/>
        {/* Moon */}
        <path d="M70 28 Q82 38 80 55 Q78 70 65 74 Q50 74 42 62 Q52 66 62 60 Q76 52 70 28Z" fill={GREEN} opacity="0.9"/>
        {/* Stars */}
        <circle cx="38" cy="36" r="2.5" fill="#ffd700" opacity="0.9"/>
        <circle cx="84" cy="40" r="2" fill="#ffd700" opacity="0.7"/>
        <circle cx="44" cy="72" r="1.5" fill="#ffd700" opacity="0.6"/>
        <circle cx="86" cy="68" r="1.5" fill="#ffd700" opacity="0.6"/>
        {/* CPAP device */}
        <rect x="35" y="76" width="32" height="12" rx="5" fill="white" stroke={GREEN} strokeWidth="1.5"/>
        <rect x="39" y="79" width="8" height="6" rx="2" fill={GREEN_LIGHT}/>
        {/* Tube */}
        <path d="M67 82 Q76 78 82 72" stroke={GREEN} strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="3 2"/>
        {/* Zzz */}
        <text x="50" y="59" fontFamily="serif" fontSize="10" fill="white" opacity="0.7" fontWeight="bold">Zzz</text>
      </svg>
    ),
  },
  {
    title: "Rehabilitación Cardio Pulmonar",
    desc: "Programas especializados de recuperación cardiovascular y respiratoria.",
    illustration: (
      <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="60" cy="55" r="38" fill="#c8dfc6" opacity="0.5"/>
        {/* Heart */}
        <path d="M60 75 Q38 60 38 47 Q38 36 48 36 Q55 36 60 43 Q65 36 72 36 Q82 36 82 47 Q82 60 60 75Z" fill={GREEN} opacity="0.95"/>
        {/* ECG pulse line */}
        <polyline points="30,55 38,55 43,44 47,65 52,44 57,65 62,55 90,55" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Small arrow up (rehabilitation) */}
        <path d="M60 26 L56 32 L59 32 L59 38 L61 38 L61 32 L64 32 Z" fill="#ffd700" opacity="0.85"/>
      </svg>
    ),
  },
  {
    title: "Inyectología",
    desc: "Aplicación segura y profesional de medicamentos inyectables en un entorno controlado.",
    illustration: (
      <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="60" cy="55" r="38" fill="#c8dfc6" opacity="0.5"/>
        {/* Syringe body — angled */}
        <g transform="rotate(-40, 60, 55)">
          <rect x="46" y="44" width="28" height="13" rx="4" fill="white" stroke={GREEN} strokeWidth="1.8"/>
          {/* Liquid inside */}
          <rect x="48" y="46" width="16" height="9" rx="2" fill={GREEN_LIGHT}/>
          <rect x="48" y="46" width="10" height="9" rx="2" fill={GREEN} opacity="0.5"/>
          {/* Plunger */}
          <rect x="74" y="46" width="8" height="9" rx="2" fill={GREEN} opacity="0.7"/>
          {/* Needle */}
          <rect x="38" y="49" width="8" height="3" rx="1" fill="#aaa"/>
          <path d="M38 50.5 L32 50.5" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
          {/* Scale marks */}
          <line x1="56" y1="44" x2="56" y2="57" stroke={GREEN} strokeWidth="0.8" opacity="0.5"/>
          <line x1="62" y1="44" x2="62" y2="57" stroke={GREEN} strokeWidth="0.8" opacity="0.5"/>
          <line x1="68" y1="44" x2="68" y2="57" stroke={GREEN} strokeWidth="0.8" opacity="0.5"/>
        </g>
        {/* Drops */}
        <circle cx="82" cy="38" r="2.5" fill={GREEN_MID} opacity="0.5"/>
        <circle cx="86" cy="45" r="1.8" fill={GREEN_MID} opacity="0.4"/>
        <circle cx="79" cy="44" r="1.5" fill={GREEN_MID} opacity="0.3"/>
      </svg>
    ),
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Topics() {
  return (
    <section id="topics" className="relative" style={{ background: GREEN }} data-testid="section-topics">
      <div className="container mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
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

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <div className="overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          <div
            className="flex md:grid gap-5 md:gap-5"
            style={{
              gridTemplateColumns: 'repeat(4, 1fr)',
              minWidth: 'max-content',
            }}
          >
            {specializations.map(({ title, desc, illustration }, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative flex flex-col overflow-hidden"
                style={{
                  width: '220px',
                  minWidth: '220px',
                  background: 'white',
                  borderRadius: '24px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                }}
              >
                {/* Illustration area */}
                <div
                  className="w-full flex items-center justify-center"
                  style={{
                    background: GREEN_LIGHT,
                    borderRadius: '24px 24px 0 0',
                    height: '150px',
                    padding: '16px',
                  }}
                >
                  <div style={{ width: '110px', height: '110px' }}>
                    {illustration}
                  </div>
                </div>

                {/* Text area */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Number badge */}
                  <span
                    className="font-serif font-black text-4xl absolute bottom-4 right-4 leading-none select-none pointer-events-none"
                    style={{ color: GREEN, opacity: 0.07 }}
                  >
                    {(index + 1).toString().padStart(2, '0')}
                  </span>

                  <h4 className="font-serif font-bold text-sm leading-snug mb-3" style={{ color: '#0a0a0a' }}>
                    {title}
                  </h4>
                  <p className="font-serif text-xs leading-relaxed" style={{ color: '#666' }}>
                    {desc}
                  </p>
                  <div className="h-0.5 w-7 mt-4 rounded-full" style={{ background: GREEN }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
