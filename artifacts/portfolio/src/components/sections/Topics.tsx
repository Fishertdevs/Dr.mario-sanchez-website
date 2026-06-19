import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

const GREEN = "#2d5a27";
const GREEN_LIGHT = "#e8f0e7";
const GREEN_MID = "#3a7232";

/* ── Flat-design SVG illustrations ───────────────────────── */
const IllustracionMedicinaAlternativa = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Background blob */}
    <ellipse cx="65" cy="75" rx="48" ry="32" fill="#c8dfc6" opacity="0.45"/>
    {/* Pot */}
    <ellipse cx="65" cy="88" rx="22" ry="7" fill="#a0c49d" opacity="0.7"/>
    <rect x="46" y="78" width="38" height="16" rx="8" fill="#7ab87a"/>
    <ellipse cx="65" cy="78" rx="19" ry="6" fill="#8dc88d"/>
    {/* Big plant stem */}
    <path d="M65 78 Q65 60 65 50" stroke={GREEN} strokeWidth="3" strokeLinecap="round"/>
    {/* Leaves */}
    <path d="M65 62 Q50 55 48 44 Q58 43 65 57Z" fill={GREEN} opacity="0.9"/>
    <path d="M65 58 Q80 51 82 40 Q72 39 65 53Z" fill={GREEN_MID} opacity="0.85"/>
    <path d="M65 50 Q52 42 52 32 Q62 32 65 46Z" fill={GREEN} opacity="0.75"/>
    {/* Doctor figure */}
    <circle cx="98" cy="52" r="9" fill="#f5d5b0"/>
    {/* Hair */}
    <path d="M90 50 Q89 44 98 43 Q107 44 106 50" fill="#5a3e2b"/>
    {/* Body / coat */}
    <path d="M88 62 Q90 55 98 54 Q106 55 108 62 L106 82 L90 82 Z" fill="white"/>
    <rect x="91" y="62" width="7" height="12" rx="1" fill={GREEN_LIGHT} opacity="0.8"/>
    {/* Stethoscope */}
    <path d="M94 64 Q92 72 96 75 Q100 78 104 72" stroke={GREEN} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <circle cx="104" cy="71" r="3" fill={GREEN} opacity="0.8"/>
    {/* Arms */}
    <path d="M90 60 Q82 65 80 72" stroke="#f5d5b0" strokeWidth="5" strokeLinecap="round"/>
    <path d="M106 60 Q114 65 115 70" stroke="#f5d5b0" strokeWidth="5" strokeLinecap="round"/>
    {/* Sparkles */}
    <circle cx="42" cy="40" r="2.5" fill="#ffd700" opacity="0.85"/>
    <circle cx="36" cy="55" r="1.5" fill="#ffd700" opacity="0.6"/>
  </svg>
);

const IllustracionConsultaDomiciliaria = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="65" cy="90" rx="50" ry="18" fill="#c8dfc6" opacity="0.4"/>
    {/* House */}
    <polygon points="65,22 100,50 94,50 94,88 36,88 36,50 30,50" fill="white" stroke={GREEN} strokeWidth="2"/>
    {/* Roof fill */}
    <polygon points="65,22 100,50 30,50" fill={GREEN_LIGHT}/>
    {/* Door */}
    <rect x="55" y="66" width="20" height="22" rx="3" fill={GREEN_MID} opacity="0.25"/>
    <rect x="55" y="66" width="20" height="22" rx="3" stroke={GREEN} strokeWidth="1.5"/>
    <circle cx="72" cy="78" r="1.8" fill={GREEN}/>
    {/* Window */}
    <rect x="39" y="58" width="14" height="12" rx="2" fill="#a8d4a6" stroke={GREEN} strokeWidth="1.2"/>
    <line x1="46" y1="58" x2="46" y2="70" stroke={GREEN} strokeWidth="0.8"/>
    <line x1="39" y1="64" x2="53" y2="64" stroke={GREEN} strokeWidth="0.8"/>
    {/* Medical cross on door */}
    <rect x="62" y="72" width="6" height="2" rx="1" fill={GREEN}/>
    <rect x="64" y="70" width="2" height="6" rx="1" fill={GREEN}/>
    {/* Doctor walking figure */}
    <circle cx="108" cy="62" r="8" fill="#f5d5b0"/>
    <path d="M100 62 Q100 57 108 56 Q116 57 116 62" fill="#5a3e2b"/>
    <rect x="101" y="70" width="14" height="18" rx="4" fill={GREEN} opacity="0.85"/>
    <path d="M101 73 Q94 80 93 87" stroke="#f5d5b0" strokeWidth="4.5" strokeLinecap="round"/>
    <path d="M115 73 Q120 80 120 88" stroke="#f5d5b0" strokeWidth="4.5" strokeLinecap="round"/>
    <rect x="103" y="88" width="5" height="7" rx="2" fill="#5a3e2b"/>
    <rect x="111" y="88" width="5" height="7" rx="2" fill="#5a3e2b"/>
    {/* Medical bag */}
    <rect x="117" y="76" width="11" height="9" rx="3" fill="white" stroke={GREEN} strokeWidth="1.5"/>
    <path d="M119 76 Q122 72 124 76" stroke={GREEN} strokeWidth="1.2" fill="none"/>
    <rect x="120" y="79" width="4" height="1.5" rx="0.5" fill={GREEN}/>
    <rect x="121.5" y="77.5" width="1.5" height="4" rx="0.5" fill={GREEN}/>
  </svg>
);

const IllustracionProcesoTerapeutico = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="65" cy="95" rx="50" ry="16" fill="#c8dfc6" opacity="0.4"/>
    {/* Therapist */}
    <circle cx="42" cy="48" r="10" fill="#f5d5b0"/>
    <path d="M32 48 Q32 40 42 39 Q52 40 52 48" fill="#4a2c0a"/>
    <rect x="32" y="58" width="20" height="24" rx="5" fill={GREEN} opacity="0.9"/>
    <path d="M32 62 Q22 70 21 80" stroke="#f5d5b0" strokeWidth="5" strokeLinecap="round"/>
    <path d="M52 62 Q58 68 58 78" stroke="#f5d5b0" strokeWidth="5" strokeLinecap="round"/>
    <rect x="35" y="82" width="6" height="9" rx="3" fill="#4a2c0a"/>
    <rect x="42" y="82" width="6" height="9" rx="3" fill="#4a2c0a"/>
    {/* Clipboard */}
    <rect x="53" y="60" width="14" height="18" rx="2" fill="white" stroke={GREEN} strokeWidth="1.5"/>
    <line x1="56" y1="66" x2="64" y2="66" stroke={GREEN} strokeWidth="1"/>
    <line x1="56" y1="70" x2="64" y2="70" stroke={GREEN} strokeWidth="1"/>
    <line x1="56" y1="74" x2="60" y2="74" stroke={GREEN} strokeWidth="1"/>
    <rect x="58" y="58" width="6" height="4" rx="1" fill={GREEN} opacity="0.7"/>
    {/* Patient */}
    <circle cx="92" cy="52" r="10" fill="#f5c8a0"/>
    <path d="M82 52 Q82 44 92 43 Q102 44 102 52" fill="#c67c4a"/>
    <rect x="82" y="62" width="20" height="24" rx="5" fill="#e8f0e7" stroke={GREEN} strokeWidth="1.5"/>
    <path d="M82 66 Q74 74 74 84" stroke="#f5c8a0" strokeWidth="5" strokeLinecap="round"/>
    <path d="M102 66 Q108 72 108 82" stroke="#f5c8a0" strokeWidth="5" strokeLinecap="round"/>
    <rect x="85" y="86" width="6" height="9" rx="3" fill="#c67c4a"/>
    <rect x="92" y="86" width="6" height="9" rx="3" fill="#c67c4a"/>
    {/* Heart between them */}
    <path d="M67 52 Q62 47 62 43 Q62 38 66 38 Q68 38 68 41 Q68 38 70 38 Q74 38 74 43 Q74 47 67 52Z" fill={GREEN} opacity="0.9"/>
    {/* Floating hearts */}
    <path d="M58 35 Q55 32 55 30 Q55 27 57 27 Q58 27 58 29 Q58 27 59 27 Q61 27 61 30 Q61 32 58 35Z" fill="#ff8a8a" opacity="0.6"/>
    <path d="M76 32 Q74 30 74 28 Q74 26 76 26 Q76.8 26 77 27.5 Q77.2 26 78 26 Q80 26 80 28 Q80 30 77 32Z" fill="#ff8a8a" opacity="0.5"/>
  </svg>
);

const IllustracionMedicamentosInhalados = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="65" cy="95" rx="48" ry="16" fill="#c8dfc6" opacity="0.4"/>
    {/* Patient figure */}
    <circle cx="65" cy="40" r="12" fill="#f5d5b0"/>
    <path d="M53 40 Q53 30 65 29 Q77 30 77 40" fill="#4a2c0a"/>
    <rect x="52" y="52" width="26" height="30" rx="6" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1.5"/>
    {/* Inhaler in hand */}
    <path d="M52 58 Q38 62 34 70" stroke="#f5d5b0" strokeWidth="6" strokeLinecap="round"/>
    {/* Inhaler device */}
    <rect x="20" y="66" width="14" height="28" rx="5" fill="white" stroke={GREEN} strokeWidth="1.8"/>
    <rect x="22" y="70" width="10" height="8" rx="3" fill={GREEN_LIGHT}/>
    <rect x="18" y="86" width="18" height="8" rx="4" fill={GREEN} opacity="0.85"/>
    <rect x="25" y="60" width="8" height="6" rx="3" fill={GREEN} opacity="0.7"/>
    {/* Spray particles */}
    <circle cx="15" cy="78" r="3.5" fill={GREEN_MID} opacity="0.35"/>
    <circle cx="9" cy="72" r="2.5" fill={GREEN_MID} opacity="0.25"/>
    <circle cx="12" cy="65" r="2" fill={GREEN_MID} opacity="0.2"/>
    <circle cx="7" cy="82" r="2" fill={GREEN_MID} opacity="0.2"/>
    {/* Right arm */}
    <path d="M78 58 Q90 62 92 70" stroke="#f5d5b0" strokeWidth="6" strokeLinecap="round"/>
    {/* Legs */}
    <rect x="56" y="82" width="8" height="14" rx="4" fill="#4a2c0a"/>
    <rect x="66" y="82" width="8" height="14" rx="4" fill="#4a2c0a"/>
    {/* Breathing waves above head */}
    <path d="M55 22 Q58 18 62 22 Q65 18 68 22 Q71 18 74 22" stroke={GREEN} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const IllustracionFisioterapia = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="65" cy="95" rx="50" ry="16" fill="#c8dfc6" opacity="0.4"/>
    {/* Stretching figure */}
    <circle cx="65" cy="35" r="11" fill="#f5d5b0"/>
    <path d="M54 35 Q54 26 65 25 Q76 26 76 35" fill="#8b4513"/>
    {/* Body */}
    <rect x="55" y="46" width="20" height="26" rx="6" fill={GREEN} opacity="0.85"/>
    {/* Arms stretched wide */}
    <path d="M55 52 Q40 48 30 52" stroke="#f5d5b0" strokeWidth="6" strokeLinecap="round"/>
    <path d="M75 52 Q90 48 100 52" stroke="#f5d5b0" strokeWidth="6" strokeLinecap="round"/>
    {/* Lungs on torso */}
    <path d="M65 50 Q60 47 57 52 Q56 57 60 59 Q63 60 65 57" fill="white" opacity="0.5"/>
    <path d="M65 50 Q70 47 73 52 Q74 57 70 59 Q67 60 65 57" fill="white" opacity="0.5"/>
    {/* Legs */}
    <path d="M60 72 Q58 82 55 90" stroke="#4a2c0a" strokeWidth="7" strokeLinecap="round"/>
    <path d="M70 72 Q72 82 75 90" stroke="#4a2c0a" strokeWidth="7" strokeLinecap="round"/>
    {/* Breath waves */}
    <path d="M22 44 Q27 39 32 44 Q37 49 42 44" stroke={GREEN} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7"/>
    <path d="M88 44 Q93 39 98 44 Q103 49 108 44" stroke={GREEN} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.7"/>
    {/* Stars */}
    <circle cx="30" cy="56" r="2.5" fill="#ffd700" opacity="0.8"/>
    <circle cx="100" cy="56" r="2.5" fill="#ffd700" opacity="0.8"/>
  </svg>
);

const IllustracionApnea = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="20" y="60" width="90" height="40" rx="10" fill="#d4e8d4" opacity="0.6"/>
    {/* Pillow */}
    <ellipse cx="65" cy="64" rx="38" ry="12" fill="white" stroke={GREEN} strokeWidth="1.5"/>
    {/* Sleeping figure */}
    <circle cx="42" cy="56" r="10" fill="#f5d5b0"/>
    <path d="M32 56 Q32 48 42 47 Q52 48 52 56" fill="#5a3e2b"/>
    {/* Body horizontal */}
    <path d="M50 62 Q70 62 90 65" stroke="#f5d5b0" strokeWidth="14" strokeLinecap="round"/>
    {/* CPAP mask */}
    <path d="M35 56 Q33 59 35 62 Q38 65 44 63 Q48 61 48 58" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round"/>
    {/* Tube */}
    <path d="M35 59 Q25 58 18 50" stroke={GREEN_MID} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" fill="none"/>
    {/* CPAP machine */}
    <rect x="10" y="42" width="16" height="10" rx="3" fill="white" stroke={GREEN} strokeWidth="1.5"/>
    <circle cx="14" cy="47" r="2" fill={GREEN} opacity="0.7"/>
    {/* Moon */}
    <path d="M95 28 Q106 36 104 50 Q102 62 91 65 Q78 63 72 54 Q82 58 90 52 Q102 44 95 28Z" fill={GREEN} opacity="0.85"/>
    {/* Stars */}
    <circle cx="82" cy="30" r="2.5" fill="#ffd700" opacity="0.9"/>
    <circle cx="110" cy="38" r="2" fill="#ffd700" opacity="0.7"/>
    <circle cx="72" cy="42" r="1.5" fill="#ffd700" opacity="0.6"/>
    {/* Zzz */}
    <text x="94" y="22" fontFamily="Georgia, serif" fontSize="10" fill={GREEN_MID} opacity="0.8" fontWeight="bold">z</text>
    <text x="100" y="16" fontFamily="Georgia, serif" fontSize="13" fill={GREEN_MID} opacity="0.7" fontWeight="bold">z</text>
    <text x="108" y="10" fontFamily="Georgia, serif" fontSize="16" fill={GREEN_MID} opacity="0.6" fontWeight="bold">z</text>
  </svg>
);

const IllustracionRehabilitacion = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="65" cy="98" rx="50" ry="14" fill="#c8dfc6" opacity="0.4"/>
    {/* Treadmill base */}
    <rect x="28" y="80" width="74" height="12" rx="6" fill={GREEN_MID} opacity="0.7"/>
    <ellipse cx="42" cy="80" rx="10" ry="6" fill={GREEN} opacity="0.6"/>
    <ellipse cx="88" cy="80" rx="10" ry="6" fill={GREEN} opacity="0.6"/>
    {/* Running figure */}
    <circle cx="68" cy="38" r="11" fill="#f5d5b0"/>
    <path d="M57 38 Q57 29 68 28 Q79 29 79 38" fill="#c67c4a"/>
    {/* Body leaning forward */}
    <path d="M62 49 Q65 49 72 50 Q76 52 74 68 L62 68 Q60 52 62 49Z" fill={GREEN} opacity="0.9"/>
    {/* Arms running */}
    <path d="M62 54 Q52 50 46 56" stroke="#f5d5b0" strokeWidth="5.5" strokeLinecap="round"/>
    <path d="M72 56 Q82 52 86 58" stroke="#f5d5b0" strokeWidth="5.5" strokeLinecap="round"/>
    {/* Legs */}
    <path d="M64 68 Q60 74 56 80" stroke="#c67c4a" strokeWidth="6" strokeLinecap="round"/>
    <path d="M70 68 Q76 74 80 80" stroke="#c67c4a" strokeWidth="6" strokeLinecap="round"/>
    {/* Big heart + ECG */}
    <path d="M32 44 Q24 36 24 30 Q24 22 30 22 Q33 22 35 26 Q37 22 40 22 Q46 22 46 30 Q46 36 35 48Z" fill={GREEN} opacity="0.85"/>
    <polyline points="20,34 24,34 27,28 30,40 33,28 36,40 39,34 48,34" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    {/* Speed lines */}
    <line x1="86" y1="42" x2="96" y2="42" stroke={GREEN} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <line x1="88" y1="48" x2="100" y2="48" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="84" y1="54" x2="95" y2="54" stroke={GREEN} strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

const IllustracionInyectologia = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="65" cy="95" rx="50" ry="16" fill="#c8dfc6" opacity="0.4"/>
    {/* Nurse figure */}
    <circle cx="42" cy="42" r="11" fill="#f5d5b0"/>
    <path d="M31 42 Q31 33 42 32 Q53 33 53 42" fill="#4a2c0a"/>
    {/* Nurse cap */}
    <rect x="35" y="31" width="14" height="6" rx="2" fill="white"/>
    <rect x="40" y="29" width="4" height="2" rx="1" fill={GREEN}/>
    {/* Body */}
    <rect x="32" y="53" width="20" height="28" rx="5" fill="white" stroke={GREEN} strokeWidth="1.5"/>
    <rect x="36" y="57" width="5" height="8" rx="1" fill={GREEN_LIGHT} opacity="0.8"/>
    {/* Arms */}
    <path d="M32 58 Q22 64 20 74" stroke="#f5d5b0" strokeWidth="5.5" strokeLinecap="round"/>
    <path d="M52 58 Q64 62 68 68" stroke="#f5d5b0" strokeWidth="5.5" strokeLinecap="round"/>
    {/* Syringe — large, held */}
    <g transform="rotate(-30, 80, 70)">
      <rect x="62" y="60" width="36" height="14" rx="5" fill="white" stroke={GREEN} strokeWidth="1.8"/>
      <rect x="64" y="62" width="22" height="10" rx="3" fill={GREEN_LIGHT}/>
      <rect x="64" y="62" width="12" height="10" rx="3" fill={GREEN} opacity="0.45"/>
      {/* Plunger */}
      <rect x="96" y="62" width="10" height="10" rx="3" fill={GREEN} opacity="0.8"/>
      {/* Scale */}
      <line x1="72" y1="60" x2="72" y2="74" stroke={GREEN} strokeWidth="0.8" opacity="0.5"/>
      <line x1="80" y1="60" x2="80" y2="74" stroke={GREEN} strokeWidth="0.8" opacity="0.5"/>
      <line x1="88" y1="60" x2="88" y2="74" stroke={GREEN} strokeWidth="0.8" opacity="0.5"/>
      {/* Needle */}
      <rect x="48" y="64.5" width="14" height="3" rx="1.5" fill="#aaa"/>
      <path d="M48 66 L40 66" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
    </g>
    {/* Legs */}
    <rect x="35" y="81" width="7" height="12" rx="3.5" fill="#4a2c0a"/>
    <rect x="43" y="81" width="7" height="12" rx="3.5" fill="#4a2c0a"/>
    {/* Droplets */}
    <circle cx="110" cy="55" r="3" fill={GREEN_MID} opacity="0.5"/>
    <circle cx="115" cy="63" r="2" fill={GREEN_MID} opacity="0.35"/>
    <circle cx="106" cy="62" r="1.5" fill={GREEN_MID} opacity="0.3"/>
  </svg>
);

const specializations = [
  { title: "Medicina Alternativa",            desc: "Terapias complementarias integradas al cuidado convencional para un bienestar integral.",              Illus: IllustracionMedicinaAlternativa },
  { title: "Consulta Domiciliaria",            desc: "Atención médica profesional en la comodidad y seguridad de su hogar.",                                  Illus: IllustracionConsultaDomiciliaria },
  { title: "Proceso Terapéutico",              desc: "Acompañamiento integral y personalizado en cada etapa de su tratamiento.",                              Illus: IllustracionProcesoTerapeutico },
  { title: "Administración de Medicamentos Inhalados", desc: "Técnicas correctas y seguras para una terapia inhalatoria efectiva.",                         Illus: IllustracionMedicamentosInhalados },
  { title: "Fisioterapia Respiratoria",        desc: "Ejercicios y maniobras especializadas para optimizar la función pulmonar.",                             Illus: IllustracionFisioterapia },
  { title: "Manejo de Apnea del Sueño — CPAP & BPAP", desc: "Diagnóstico y control con equipos de última generación para el sueño reparador.",             Illus: IllustracionApnea },
  { title: "Rehabilitación Cardio Pulmonar",   desc: "Programas especializados de recuperación cardiovascular y respiratoria.",                              Illus: IllustracionRehabilitacion },
  { title: "Inyectología",                     desc: "Aplicación segura y profesional de medicamentos inyectables en un entorno controlado.",                 Illus: IllustracionInyectologia },
];

const BATCH = 4;        // cards per batch
const CARD_STAGGER = 0.18;  // seconds between cards
const READ_PAUSE = 3.0;     // seconds after first batch finishes before second starts

/* slide-up variant per card */
const cardVariant = {
  hidden: { opacity: 0, y: 56 },
  visible: (custom: { delay: number }) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, delay: custom.delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Topics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });
  const [batch, setBatch] = useState(0); // 0 = none shown, 1 = first 4, 2 = all 8

  useEffect(() => {
    if (!isInView) return;
    // Show first batch immediately
    setBatch(1);
    // After first batch fully animates + reading time, show second batch
    const firstBatchDuration = (BATCH - 1) * CARD_STAGGER + 0.72; // last card finishes
    const total = (firstBatchDuration + READ_PAUSE) * 1000;
    const t = setTimeout(() => setBatch(2), total);
    return () => clearTimeout(t);
  }, [isInView]);

  return (
    <section
      id="topics"
      ref={sectionRef}
      className="relative"
      style={{ background: GREEN }}
      data-testid="section-topics"
    >
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

        {/* Grid — 4 cols on desktop, 2 on tablet, scrollable on mobile */}
        <div className="overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-2 px-2">
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: 'repeat(4, minmax(200px, 1fr))',
            }}
          >
            <AnimatePresence>
              {specializations.map(({ title, desc, Illus }, index) => {
                const visible = batch >= 1 && index < BATCH
                  ? true
                  : batch >= 2 && index >= BATCH
                    ? true
                    : false;
                const batchIndex = index < BATCH ? index : index - BATCH;
                const delay = batchIndex * CARD_STAGGER;

                return visible ? (
                  <motion.div
                    key={title}
                    custom={{ delay }}
                    variants={cardVariant}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="relative flex flex-col overflow-hidden"
                    style={{
                      background: 'white',
                      borderRadius: '24px',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                      minWidth: '200px',
                    }}
                  >
                    {/* Illustration area */}
                    <div
                      className="w-full flex items-center justify-center"
                      style={{
                        background: GREEN_LIGHT,
                        borderRadius: '24px 24px 0 0',
                        height: '160px',
                        padding: '12px',
                      }}
                    >
                      <div style={{ width: '120px', height: '120px' }}>
                        <Illus />
                      </div>
                    </div>

                    {/* Text area — centered */}
                    <div className="flex flex-col flex-1 items-center text-center px-5 py-5">
                      <h4
                        className="font-serif font-bold leading-snug mb-2"
                        style={{ color: '#0a0a0a', fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)' }}
                      >
                        {title}
                      </h4>
                      <p
                        className="font-serif text-xs leading-relaxed"
                        style={{ color: '#666' }}
                      >
                        {desc}
                      </p>
                      <div className="h-0.5 w-8 mt-4 rounded-full" style={{ background: GREEN }} />
                    </div>

                    {/* Number — visible, bottom-right */}
                    <span
                      className="absolute bottom-3 right-4 font-serif font-black leading-none select-none pointer-events-none"
                      style={{ fontSize: '2.8rem', color: GREEN, opacity: 0.12 }}
                    >
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </motion.div>
                ) : null;
              })}
            </AnimatePresence>
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
