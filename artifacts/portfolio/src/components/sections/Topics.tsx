import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import medAltImg        from "@assets/image_1781918088749.png";
import consultaImg     from "@assets/image_1781918588839.png";
import terapeuticoImg  from "@assets/image_1781919290751.png";
import inhaladosImg    from "@assets/image_1781920459455.png";
import fisioterapiaImg from "@assets/image_1781921271859.png";
import apneaImg        from "@assets/image_1781926041769.png";
import rehabImg        from "@assets/image_1781925230634.png";
import inyectologiaImg from "@assets/image_1781926059684.png";
import consultaImg2    from "@assets/image_1781927114542.png";
import terapeuticoImg2 from "@assets/image_1781926871196.png";

const GREEN = "#2d5a27";
const GREEN_LIGHT = "#dff0dc";
const SKIN = "#f5d5b0";
const DARK = "#2a1f1a";
const DARK_GREEN = "#1e3d1a";

/* ══════════════════════════════════════════════
   SVG ILLUSTRATIONS — flat-design, medical theme
══════════════════════════════════════════════ */

const Blob = ({ cx = 65, cy = 68, rx = 46, ry = 32 }: { cx?: number; cy?: number; rx?: number; ry?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={GREEN_LIGHT} />
);

/* 1 — Medicina Alternativa */
const IlluAlternativa = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <Blob />
    {/* Plant pot */}
    <path d="M55 95 L75 95 L72 78 L58 78 Z" fill="#7ab87a" />
    <ellipse cx="65" cy="78" rx="13" ry="5" fill="#8dc88d" />
    {/* Stems */}
    <path d="M65 78 Q65 65 65 52" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M65 65 Q52 58 48 46" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
    <path d="M65 60 Q78 53 82 42" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
    {/* Leaves */}
    <ellipse cx="47" cy="43" rx="10" ry="6" fill={GREEN} opacity="0.9" transform="rotate(-30 47 43)" />
    <ellipse cx="83" cy="39" rx="10" ry="6" fill={DARK_GREEN} opacity="0.85" transform="rotate(25 83 39)" />
    <ellipse cx="65" cy="50" rx="8" ry="5" fill={GREEN} opacity="0.8" transform="rotate(5 65 50)" />
    {/* Person figure */}
    <circle cx="97" cy="50" r="10" fill={SKIN} />
    <path d="M87 50 Q87 41 97 40 Q107 41 107 50" fill={DARK} />
    {/* White coat */}
    <path d="M87 62 Q88 56 97 55 Q106 56 107 62 L105 82 L89 82 Z" fill="white" />
    <path d="M90 62 L91 74 M94 62 L94 74" stroke={GREEN} strokeWidth="0.8" opacity="0.4" />
    {/* Stethoscope */}
    <path d="M93 65 Q90 73 95 77 Q100 80 105 74" stroke={GREEN} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <circle cx="105" cy="73" r="3" fill={GREEN} />
    {/* Arms */}
    <path d="M89 62 Q80 67 78 75" stroke={SKIN} strokeWidth="6" strokeLinecap="round" />
    <path d="M105 62 Q113 66 114 73" stroke={SKIN} strokeWidth="6" strokeLinecap="round" />
    {/* Sparkles */}
    <circle cx="38" cy="38" r="2.5" fill="#ffd700" opacity="0.9" />
    <circle cx="32" cy="52" r="1.5" fill="#ffd700" opacity="0.65" />
    <circle cx="42" cy="28" r="1.8" fill="#ffd700" opacity="0.55" />
  </svg>
);

/* 2 — Consulta Domiciliaria */
const IlluDomiciliaria = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <Blob cx="58" cy="75" rx="44" ry="30" />
    {/* House */}
    <polygon points="58,22 96,50 90,50 90,86 26,86 26,50 20,50" fill="white" stroke={GREEN} strokeWidth="2" />
    <polygon points="58,22 96,50 20,50" fill={GREEN_LIGHT} />
    <rect x="48" y="62" width="20" height="24" rx="3" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1.5" />
    <circle cx="66" cy="74" r="1.8" fill={GREEN} />
    <rect x="29" y="55" width="14" height="12" rx="2" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1.2" />
    <line x1="36" y1="55" x2="36" y2="67" stroke={GREEN} strokeWidth="0.8" />
    <line x1="29" y1="61" x2="43" y2="61" stroke={GREEN} strokeWidth="0.8" />
    {/* Cross on house */}
    <rect x="55" y="68" width="6" height="2" rx="1" fill={GREEN} />
    <rect x="57" y="66" width="2" height="6" rx="1" fill={GREEN} />
    {/* Doctor walking */}
    <circle cx="108" cy="56" r="9" fill={SKIN} />
    <path d="M99 56 Q99 48 108 47 Q117 48 117 56" fill={DARK} />
    <rect x="99" y="65" width="18" height="22" rx="5" fill={GREEN} opacity="0.9" />
    <path d="M99 70 Q90 76 89 84" stroke={SKIN} strokeWidth="5.5" strokeLinecap="round" />
    <path d="M117 70 Q123 76 123 84" stroke={SKIN} strokeWidth="5.5" strokeLinecap="round" />
    <rect x="102" y="87" width="6" height="8" rx="3" fill={DARK} />
    <rect x="110" y="87" width="6" height="8" rx="3" fill={DARK} />
    {/* Medical bag */}
    <rect x="118" y="72" width="11" height="10" rx="3" fill="white" stroke={GREEN} strokeWidth="1.5" />
    <path d="M120 72 Q123 68 125 72" stroke={GREEN} strokeWidth="1.2" fill="none" />
    <rect x="121" y="76" width="4" height="1.5" rx="0.5" fill={GREEN} />
    <rect x="122.5" y="74.5" width="1.5" height="4" rx="0.5" fill={GREEN} />
  </svg>
);

/* 3 — Proceso Terapéutico */
const IlluTerapeutico = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <Blob cx="65" cy="80" rx="50" ry="28" />
    {/* Therapist (left) */}
    <circle cx="38" cy="44" r="10" fill={SKIN} />
    <path d="M28 44 Q28 36 38 35 Q48 36 48 44" fill={DARK} />
    <rect x="29" y="54" width="18" height="26" rx="5" fill={GREEN} opacity="0.9" />
    <path d="M29 59 Q20 65 19 74" stroke={SKIN} strokeWidth="5.5" strokeLinecap="round" />
    <path d="M47 59 Q54 64 56 72" stroke={SKIN} strokeWidth="5.5" strokeLinecap="round" />
    <rect x="31" y="80" width="6" height="8" rx="3" fill={DARK} />
    <rect x="39" y="80" width="6" height="8" rx="3" fill={DARK} />
    {/* Clipboard */}
    <rect x="51" y="56" width="13" height="17" rx="2" fill="white" stroke={GREEN} strokeWidth="1.5" />
    <line x1="54" y1="62" x2="61" y2="62" stroke={GREEN} strokeWidth="1" />
    <line x1="54" y1="66" x2="61" y2="66" stroke={GREEN} strokeWidth="1" />
    <line x1="54" y1="70" x2="58" y2="70" stroke={GREEN} strokeWidth="1" />
    <rect x="56" y="54" width="5" height="4" rx="1" fill={GREEN} opacity="0.7" />
    {/* Heart */}
    <path d="M65 54 Q59 47 59 43 Q59 37 64 37 Q66.5 37 67 41 Q67.5 37 70 37 Q75 37 75 43 Q75 47 65 56Z" fill={GREEN} opacity="0.95" />
    {/* Patient (right) */}
    <circle cx="94" cy="44" r="10" fill="#f5c4a4" />
    <path d="M84 44 Q84 36 94 35 Q104 36 104 44" fill="#a06030" />
    <rect x="85" y="54" width="18" height="26" rx="5" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1.5" />
    <path d="M85 59 Q78 64 77 72" stroke="#f5c4a4" strokeWidth="5.5" strokeLinecap="round" />
    <path d="M103 59 Q109 63 110 70" stroke="#f5c4a4" strokeWidth="5.5" strokeLinecap="round" />
    <rect x="87" y="80" width="6" height="8" rx="3" fill="#a06030" />
    <rect x="95" y="80" width="6" height="8" rx="3" fill="#a06030" />
    {/* Floating mini hearts */}
    <path d="M63 30 Q60 27 60 24 Q60 21 62 21 Q63 21 63 23 Q63 21 64 21 Q66 21 66 24 Q66 27 63 30Z" fill="#ff9999" opacity="0.7" />
    <path d="M72 26 Q70 24 70 22 Q70 20 71.5 20 Q72 20 72 21.5 Q72 20 72.5 20 Q74 20 74 22 Q74 24 72 26Z" fill="#ff9999" opacity="0.5" />
  </svg>
);

/* 4 — Medicamentos Inhalados */
const IlluInhalados = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <Blob cx="65" cy="82" rx="48" ry="28" />
    {/* Person */}
    <circle cx="72" cy="36" r="11" fill={SKIN} />
    <path d="M61 36 Q61 27 72 26 Q83 27 83 36" fill={DARK} />
    <rect x="62" y="47" width="20" height="26" rx="6" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1.5" />
    {/* Left arm holding inhaler */}
    <path d="M62 53 Q48 56 40 62" stroke={SKIN} strokeWidth="6.5" strokeLinecap="round" />
    {/* Right arm */}
    <path d="M82 53 Q90 58 93 65" stroke={SKIN} strokeWidth="6.5" strokeLinecap="round" />
    {/* Legs */}
    <rect x="64" y="73" width="8" height="14" rx="4" fill={DARK} />
    <rect x="73" y="73" width="8" height="14" rx="4" fill={DARK} />
    {/* Inhaler */}
    <rect x="28" y="56" width="13" height="26" rx="5" fill="white" stroke={GREEN} strokeWidth="2" />
    <rect x="30" y="60" width="9" height="8" rx="3" fill={GREEN_LIGHT} />
    <rect x="26" y="75" width="17" height="7" rx="3.5" fill={GREEN} opacity="0.9" />
    <rect x="32" y="50" width="7" height="6" rx="3" fill={GREEN} opacity="0.8" />
    {/* Spray cloud */}
    <ellipse cx="18" cy="64" rx="6" ry="4" fill={GREEN_LIGHT} opacity="0.7" />
    <ellipse cx="11" cy="60" rx="4" ry="3" fill={GREEN_LIGHT} opacity="0.5" />
    <ellipse cx="14" cy="70" rx="3.5" ry="2.5" fill={GREEN_LIGHT} opacity="0.45" />
    <ellipse cx="6" cy="64" rx="3" ry="2" fill={GREEN_LIGHT} opacity="0.35" />
    {/* Breath line */}
    <path d="M60 22 Q63 18 67 22 Q70 18 74 22 Q77 18 80 22" stroke={GREEN} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.55" />
  </svg>
);

/* 5 — Fisioterapia Respiratoria */
const IlluFisioterapia = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <Blob cx="65" cy="80" rx="50" ry="28" />
    {/* Person standing, arms wide */}
    <circle cx="65" cy="36" r="11" fill={SKIN} />
    <path d="M54 36 Q54 27 65 26 Q76 27 76 36" fill="#8b4513" />
    <rect x="55" y="47" width="20" height="26" rx="6" fill={GREEN} opacity="0.9" />
    {/* Arms stretched */}
    <path d="M55 54 Q38 50 26 56" stroke={SKIN} strokeWidth="6.5" strokeLinecap="round" />
    <path d="M75 54 Q92 50 104 56" stroke={SKIN} strokeWidth="6.5" strokeLinecap="round" />
    {/* Lungs on shirt */}
    <path d="M65 51 Q59 48 56 54 Q55 59 60 61 Q63 62 65 59" fill="white" opacity="0.45" />
    <path d="M65 51 Q71 48 74 54 Q75 59 70 61 Q67 62 65 59" fill="white" opacity="0.45" />
    {/* Legs */}
    <path d="M60 73 Q58 82 55 90" stroke={DARK} strokeWidth="7" strokeLinecap="round" />
    <path d="M70 73 Q72 82 75 90" stroke={DARK} strokeWidth="7" strokeLinecap="round" />
    {/* Breath waves left */}
    <path d="M20 44 Q24 40 28 44 Q32 48 36 44" stroke={GREEN} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75" />
    <path d="M20 50 Q24 46 28 50 Q32 54 36 50" stroke={GREEN} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5" />
    {/* Breath waves right */}
    <path d="M94 44 Q98 40 102 44 Q106 48 110 44" stroke={GREEN} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75" />
    <path d="M94 50 Q98 46 102 50 Q106 54 110 50" stroke={GREEN} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5" />
    <circle cx="26" cy="60" r="2.5" fill="#ffd700" opacity="0.8" />
    <circle cx="104" cy="60" r="2.5" fill="#ffd700" opacity="0.8" />
  </svg>
);

/* 6 — Apnea del Sueño */
const IlluApnea = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="65" cy="85" rx="52" ry="22" fill={GREEN_LIGHT} />
    {/* Bed */}
    <rect x="20" y="72" width="90" height="28" rx="8" fill="white" stroke={GREEN} strokeWidth="1.5" />
    <rect x="20" y="60" width="90" height="16" rx="6" fill={GREEN_LIGHT} opacity="0.8" />
    {/* Pillow */}
    <ellipse cx="50" cy="64" rx="24" ry="8" fill="white" stroke={GREEN} strokeWidth="1" />
    {/* Sleeping person */}
    <circle cx="45" cy="58" r="10" fill={SKIN} />
    <path d="M35 58 Q35 50 45 49 Q55 50 55 58" fill={DARK} />
    {/* Body lying */}
    <path d="M54 64 Q72 64 92 67" stroke={SKIN} strokeWidth="13" strokeLinecap="round" />
    {/* CPAP mask */}
    <path d="M37 58 Q35 61 37 65 Q40 68 46 66 Q50 64 50 60" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" />
    {/* Tube */}
    <path d="M37 62 Q27 60 20 52" stroke={DARK_GREEN} strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="3 2" />
    {/* CPAP device */}
    <rect x="10" y="44" width="16" height="10" rx="3" fill="white" stroke={GREEN} strokeWidth="1.5" />
    <circle cx="14" cy="49" r="2.2" fill={GREEN} opacity="0.7" />
    <rect x="18" y="47" width="5" height="4" rx="1" fill={GREEN_LIGHT} />
    {/* Moon */}
    <path d="M98 22 Q112 32 110 48 Q108 62 96 66 Q80 64 74 54 Q86 58 94 52 Q107 43 98 22Z" fill={GREEN} opacity="0.9" />
    {/* Stars */}
    <circle cx="84" cy="26" r="2.5" fill="#ffd700" opacity="0.95" />
    <circle cx="114" cy="35" r="2" fill="#ffd700" opacity="0.75" />
    <circle cx="76" cy="40" r="1.5" fill="#ffd700" opacity="0.6" />
    <text x="86" y="20" fontFamily="Georgia" fontSize="9" fill={DARK_GREEN} opacity="0.8" fontWeight="bold">z</text>
    <text x="93" y="14" fontFamily="Georgia" fontSize="12" fill={DARK_GREEN} opacity="0.7" fontWeight="bold">z</text>
    <text x="102" y="8" fontFamily="Georgia" fontSize="15" fill={DARK_GREEN} opacity="0.6" fontWeight="bold">z</text>
  </svg>
);

/* 7 — Rehabilitación Cardio Pulmonar */
const IlluRehabilitacion = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <Blob cx="65" cy="90" rx="52" ry="22" />
    {/* Treadmill */}
    <rect x="28" y="82" width="74" height="12" rx="6" fill={DARK_GREEN} opacity="0.7" />
    <ellipse cx="42" cy="82" rx="9" ry="5.5" fill={GREEN} opacity="0.65" />
    <ellipse cx="88" cy="82" rx="9" ry="5.5" fill={GREEN} opacity="0.65" />
    <rect x="52" y="70" width="5" height="12" rx="2" fill={GREEN} opacity="0.6" />
    <rect x="73" y="70" width="5" height="12" rx="2" fill={GREEN} opacity="0.6" />
    <rect x="50" y="66" width="30" height="6" rx="2" fill={GREEN} opacity="0.5" />
    {/* Running figure */}
    <circle cx="67" cy="36" r="10" fill={SKIN} />
    <path d="M57 36 Q57 28 67 27 Q77 28 77 36" fill="#a06030" />
    <rect x="58" y="46" width="18" height="22" rx="5" fill={GREEN} opacity="0.9" />
    {/* Arms running position */}
    <path d="M58 51 Q48 47 42 54" stroke={SKIN} strokeWidth="6" strokeLinecap="round" />
    <path d="M76 51 Q86 47 90 54" stroke={SKIN} strokeWidth="6" strokeLinecap="round" />
    {/* Legs running */}
    <path d="M61 68 Q56 75 50 82" stroke={DARK} strokeWidth="7" strokeLinecap="round" />
    <path d="M69 68 Q76 74 80 82" stroke={DARK} strokeWidth="7" strokeLinecap="round" />
    {/* Heart ECG on left */}
    <path d="M24 44 Q18 36 18 31 Q18 22 24 22 Q27 22 28 26 Q29 22 32 22 Q38 22 38 31 Q38 36 28 47Z" fill={GREEN} opacity="0.9" />
    <polyline points="14,33 18,33 21,27 24,39 27,27 30,39 33,33 42,33" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Speed lines */}
    <line x1="90" y1="40" x2="102" y2="40" stroke={GREEN} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
    <line x1="91" y1="46" x2="105" y2="46" stroke={GREEN} strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
    <line x1="88" y1="52" x2="100" y2="52" stroke={GREEN} strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
  </svg>
);

/* 8 — Inyectología */
const IlluInyectologia = () => (
  <svg viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <Blob cx="65" cy="82" rx="48" ry="28" />
    {/* Nurse */}
    <circle cx="42" cy="40" r="10" fill={SKIN} />
    <path d="M32 40 Q32 32 42 31 Q52 32 52 40" fill={DARK} />
    {/* Nurse cap */}
    <rect x="35" y="30" width="14" height="5" rx="2" fill="white" />
    <rect x="40" y="28" width="4" height="2" rx="1" fill={GREEN} />
    {/* Coat */}
    <rect x="32" y="50" width="20" height="28" rx="5" fill="white" stroke={GREEN} strokeWidth="1.5" />
    <rect x="36" y="54" width="5" height="8" rx="1" fill={GREEN_LIGHT} />
    {/* Cross on coat */}
    <rect x="43" y="57" width="4" height="1.5" rx="0.5" fill={GREEN} />
    <rect x="44.25" y="55.75" width="1.5" height="4" rx="0.5" fill={GREEN} />
    {/* Arms */}
    <path d="M32 55 Q22 60 20 70" stroke={SKIN} strokeWidth="5.5" strokeLinecap="round" />
    <path d="M52 55 Q62 58 68 64" stroke={SKIN} strokeWidth="5.5" strokeLinecap="round" />
    {/* Legs */}
    <rect x="35" y="78" width="7" height="11" rx="3.5" fill={DARK} />
    <rect x="43" y="78" width="7" height="11" rx="3.5" fill={DARK} />
    {/* Large syringe — angled */}
    <g transform="translate(70,45) rotate(-35)">
      <rect x="0" y="0" width="40" height="14" rx="5" fill="white" stroke={GREEN} strokeWidth="1.8" />
      <rect x="2" y="2" width="24" height="10" rx="3" fill={GREEN_LIGHT} />
      <rect x="2" y="2" width="12" height="10" rx="3" fill={GREEN} opacity="0.4" />
      <rect x="38" y="2" width="10" height="10" rx="3" fill={GREEN} opacity="0.8" />
      <line x1="10" y1="0" x2="10" y2="14" stroke={GREEN} strokeWidth="0.8" opacity="0.5" />
      <line x1="18" y1="0" x2="18" y2="14" stroke={GREEN} strokeWidth="0.8" opacity="0.5" />
      <line x1="26" y1="0" x2="26" y2="14" stroke={GREEN} strokeWidth="0.8" opacity="0.5" />
      <rect x="-16" y="4.5" width="16" height="3" rx="1.5" fill="#bbb" />
      <line x1="-16" y1="6" x2="-24" y2="6" stroke="#999" strokeWidth="2" strokeLinecap="round" />
    </g>
    {/* Droplets */}
    <circle cx="112" cy="50" r="3" fill={GREEN_LIGHT} opacity="0.8" />
    <circle cx="118" cy="58" r="2.2" fill={GREEN_LIGHT} opacity="0.65" />
    <circle cx="108" cy="58" r="1.8" fill={GREEN_LIGHT} opacity="0.55" />
  </svg>
);

/* ═══════════════════════════════════
   DATA
═══════════════════════════════════ */
const specializations = [
  {
    title: "Medicina Alternativa",
    desc: "Terapias complementarias integradas al cuidado convencional para un bienestar integral.",
    descLong: "Integración de fitoterapia, acupresión y técnicas holísticas al plan de tratamiento convencional, potenciando la recuperación y el bienestar integral del paciente desde una perspectiva integrativa y personalizada.",
    Illus: IlluAlternativa, imgSrc: medAltImg,
  },
  {
    title: "Consulta Domiciliaria",
    desc: "Atención médica profesional en la comodidad y seguridad de su hogar.",
    descLong: "Atención terapéutica especializada en su propio domicilio, con evaluación clínica completa, seguimiento personalizado y todos los recursos necesarios para su comodidad, seguridad y tranquilidad.",
    Illus: IlluDomiciliaria, imgSrc: consultaImg2,
  },
  {
    title: "Proceso Terapéutico",
    desc: "Acompañamiento integral y personalizado en cada etapa de su tratamiento.",
    descLong: "Acompañamiento continuo desde el diagnóstico hasta la recuperación, asegurando adherencia, seguimiento periódico y ajuste oportuno del plan terapéutico para obtener resultados óptimos y duraderos.",
    Illus: IlluTerapeutico, imgSrc: terapeuticoImg2,
  },
  {
    title: "Administración de Medicamentos Inhalados",
    desc: "Técnicas correctas y seguras para una terapia inhalatoria efectiva.",
    descLong: "Instrucción y supervisión de técnicas inhalatorias correctas, manejo adecuado de dispositivos, educación al paciente y ajuste de dosis para maximizar la efectividad del tratamiento respiratorio.",
    Illus: IlluInhalados, imgSrc: inhaladosImg,
  },
  {
    title: "Fisioterapia Respiratoria",
    desc: "Ejercicios y maniobras especializadas para optimizar la función pulmonar.",
    descLong: "Programa de drenaje bronquial, reeducación respiratoria y maniobras terapéuticas especializadas para optimizar la mecánica ventilatoria, mejorar la tolerancia al ejercicio y recuperar la capacidad funcional pulmonar.",
    Illus: IlluFisioterapia, imgSrc: fisioterapiaImg,
  },
  {
    title: "Manejo de Apnea del Sueño — CPAP & BPAP",
    desc: "Diagnóstico y control con equipos de última generación para el sueño reparador.",
    descLong: "Evaluación y titulación con equipos CPAP y BPAP de última generación, con seguimiento técnico y clínico para garantizar la adherencia al tratamiento y lograr un sueño verdaderamente reparador.",
    Illus: IlluApnea, imgSrc: apneaImg,
  },
  {
    title: "Rehabilitación Cardio Pulmonar",
    desc: "Programas especializados de recuperación cardiovascular y respiratoria.",
    descLong: "Diseño de programas individualizados para mejorar la capacidad cardiorrespiratoria, reducir síntomas, fortalecer el sistema cardiovascular y promover hábitos de vida saludables y sostenibles.",
    Illus: IlluRehabilitacion, imgSrc: rehabImg,
  },
  {
    title: "Inyectología",
    desc: "Aplicación segura y profesional de medicamentos inyectables en un entorno controlado.",
    descLong: "Administración profesional de medicamentos por vía intramuscular, subcutánea o intravenosa con asepsia rigurosa, garantizando seguridad, comodidad y bienestar del paciente en cada sesión.",
    Illus: IlluInyectologia, imgSrc: inyectologiaImg,
  },
];

const CARD_INTERVAL = 4000; // ms between each card appearing
const READ_PAUSE    = 4000; // ms after batch done before fade-out
const FADE_DURATION = 600;  // ms fade transition

/* ═══════════════════════════════════
   CARD COMPONENT
═══════════════════════════════════ */
function SpecCard({ title, desc, descLong, Illus, num, imgSrc }: { title: string; desc: string; descLong?: string; Illus: () => JSX.Element; num: number; imgSrc?: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 52 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 52 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -7, transition: { duration: 0.3 } }}
      className="relative flex flex-col overflow-hidden shrink-0"
      style={{
        background: 'white',
        borderRadius: '22px',
        boxShadow: '0 6px 28px rgba(0,0,0,0.09)',
        width: '100%',
      }}
    >
      {/* Illustration / Photo */}
      {imgSrc ? (
        <div style={{ height: '175px', borderRadius: '22px 22px 0 0', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={imgSrc}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center" style={{ background: 'white', borderRadius: '22px 22px 0 0', height: '155px', padding: '10px' }}>
          <div style={{ width: '125px', height: '125px' }}>
            <Illus />
          </div>
        </div>
      )}

      {/* Divider */}
      <div style={{ height: '1px', background: GREEN_LIGHT, margin: '0 20px' }} />

      {/* Text */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '6px 16px 8px' }}>
        <h4 style={{ fontFamily: 'serif', fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.3, color: '#0e0e0e', marginBottom: '5px' }}>
          {title}
        </h4>
        {/* Desktop: long description */}
        {descLong && (
          <p className="hidden md:block" style={{ fontFamily: 'serif', fontSize: '0.73rem', lineHeight: 1.6, color: '#666', marginBottom: '6px' }}>
            {descLong}
          </p>
        )}
        {/* Mobile: short description */}
        <p className={descLong ? 'md:hidden' : ''} style={{ fontFamily: 'serif', fontSize: '0.73rem', lineHeight: 1.6, color: '#666', marginBottom: '6px' }}>
          {desc}
        </p>
        <div style={{ height: '1.5px', width: '32px', borderRadius: '9999px', background: GREEN, marginTop: 'auto' }} />
      </div>

      {/* Page-number — mobile only, no leading zero */}
      <div
        className="md:hidden absolute bottom-2 right-3 select-none pointer-events-none"
        style={{ opacity: 0.7 }}
      >
        <span style={{ fontFamily: 'serif', color: '#7ecb72', fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.05em' }}>
          {num.toString()}
        </span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════ */
export default function Topics() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const isInView     = useInView(sectionRef, { once: true, margin: '-120px' });

  // PC state
  const [pcVisible, setPcVisible] = useState<number[]>([]);
  const [pcBatch, setPcBatch]     = useState<1|2>(1);
  const [cycle, setCycle]         = useState(0);

  // Mobile state
  const [mobileIdx, setMobileIdx]   = useState(0);
  const touchStartX                 = useRef(0);

  /* ─── PC timer logic — infinite loop via cycle counter ─── */
  useEffect(() => {
    if (!isInView) return;

    const ts: ReturnType<typeof setTimeout>[] = [];
    const run = (t: () => void, ms: number) => { const id = setTimeout(t, ms); ts.push(id); };

    // Reset to batch 1
    setPcBatch(1);
    setPcVisible([]);

    // Batch 1: cards 0-3, one every CARD_INTERVAL
    for (let i = 0; i < 4; i++) {
      run(() => setPcVisible(prev => [...prev, i]), i * CARD_INTERVAL);
    }

    // Fade out after batch 1
    const endBatch1 = 3 * CARD_INTERVAL + READ_PAUSE;
    run(() => setPcVisible([]), endBatch1);

    // Switch to batch 2
    run(() => setPcBatch(2), endBatch1 + FADE_DURATION + 200);

    // Batch 2: cards 4-7, one every CARD_INTERVAL
    for (let i = 0; i < 4; i++) {
      run(() => setPcVisible(prev => [...prev, i + 4]), endBatch1 + FADE_DURATION + 400 + i * CARD_INTERVAL);
    }

    // Fade out after batch 2 → trigger next cycle (restart from batch 1)
    const endBatch2 = endBatch1 + FADE_DURATION + 400 + 3 * CARD_INTERVAL + READ_PAUSE;
    run(() => setPcVisible([]), endBatch2);
    run(() => setCycle(c => c + 1), endBatch2 + FADE_DURATION + 200);

    return () => ts.forEach(clearTimeout);
  }, [isInView, cycle]);

  /* ─── Mobile: touch swipe (no auto-slide) ─── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) {
      if (dx > 0) setMobileIdx(p => (p + 1) % specializations.length);
      else         setMobileIdx(p => (p - 1 + specializations.length) % specializations.length);
    }
  };

  const batch1Cards = specializations.slice(0, 4);
  const batch2Cards = specializations.slice(4, 8);
  const currentBatchCards = pcBatch === 1 ? batch1Cards : batch2Cards;
  const batchOffset = pcBatch === 1 ? 0 : 4;

  return (
    <section id="topics" ref={sectionRef} className="relative" style={{ background: GREEN }} data-testid="section-topics">
      <div className="container mx-auto px-6 md:px-12 pt-10 pb-10 md:pt-14 md:pb-28">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.p
            className="font-serif uppercase whitespace-nowrap"
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 'clamp(0.6rem, 2.2vw, 0.75rem)',
              letterSpacing: 'clamp(0.08em, 1.5vw, 0.25em)',
              marginBottom: '1rem',
            }}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            Especialidades &amp; Servicios
          </motion.p>
          <motion.h2
            className="font-serif font-bold text-white leading-tight whitespace-nowrap"
            style={{ fontSize: 'min(calc((100vw - 56px) / 15.5), 3.2rem)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          >
            Áreas de Especialización
          </motion.h2>
        </div>

        {/* ── PC grid (hidden on mobile) ── */}
        <div className="hidden md:grid grid-cols-4 gap-5 min-h-[340px]">
          <AnimatePresence mode="popLayout">
            {currentBatchCards.map((s, i) => {
              const globalIdx = batchOffset + i;
              return pcVisible.includes(globalIdx) ? (
                <SpecCard key={s.title} {...s} num={globalIdx + 1} />
              ) : null;
            })}
          </AnimatePresence>
        </div>

        {/* ── Mobile carousel (hidden on desktop) ── */}
        <div
          className="md:hidden relative overflow-hidden"
          style={{ height: '380px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={mobileIdx}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 px-2"
            >
              {(() => { const s = specializations[mobileIdx]; return <SpecCard {...s} num={mobileIdx + 1} />; })()}
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="absolute bottom-[-28px] left-0 right-0 flex justify-center gap-2">
            {specializations.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === mobileIdx ? '18px' : '7px', height: '7px', background: i === mobileIdx ? 'white' : 'rgba(255,255,255,0.4)' }}
              />
            ))}
          </div>
        </div>

        {/* Mobile — text below dots */}
        <div className="md:hidden flex flex-col items-center gap-2 -mt-4">
          <p className="font-serif text-center text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '280px', fontWeight: 400 }}>
            Atención médica integral con enfoque humano, técnico y preventivo para cada etapa de tu salud respiratoria.
          </p>
          <p className="font-serif text-center text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '280px' }}>
            Servicios especializados en terapia respiratoria, manejo de equipos biomédicos y atención domiciliaria, orientados a la prevención y el bienestar integral de cada paciente.
          </p>
          <div className="h-[1.5px] w-10 rounded-full" style={{ background: 'rgba(255,255,255,0.35)' }} />
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
