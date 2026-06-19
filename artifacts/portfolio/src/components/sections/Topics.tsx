import { motion } from "framer-motion";

const GREEN = "#2d5a27";

const topics = [
  "Riesgo cardiovascular a un latido de ti",
  "Que tu única adicción sea el amor propio",
  "¿Cuál es tu planificación familiar?",
  "Con prevención no hay lesión",
  "Que tu puesto se ajuste a ti y no tú a tu puesto",
  "ITS a un paso de ti",
  "Un útero y un seno para la vida — porque al cáncer hay que ponerle el pecho",
  "Estrés laboral: ¿mito o verdad?",
  "Que la silicosis no contamine tu vida",
  "Que el EPOC no te robe el aliento",
  "Primer respondiente: una tarea que da vida",
  "Que la única fiebre amarilla sea la selección",
];

export default function Topics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="topics" className="relative" style={{ background: GREEN }} data-testid="section-topics">
      <div className="container mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            className="font-serif text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Especialidades & Charlas
          </motion.p>
          <motion.h2
            className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Temas de Salud y Prevención
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className="font-serif text-5xl font-bold absolute top-4 right-6 opacity-10 group-hover:opacity-5 transition-opacity"
                style={{ color: GREEN }}
              >
                {(index + 1).toString().padStart(2, '0')}
              </div>
              <h4 className="font-serif text-lg font-medium relative z-10 leading-snug pr-8" style={{ color: '#0a0a0a' }}>
                {topic}
              </h4>
              <div className="w-8 h-[1px] mt-6 transition-all duration-300 group-hover:w-16" style={{ background: GREEN }} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave bottom — white fills down into white About section */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '90px' }}>
          <path d="M0,30 C360,90 1080,0 1440,60 L1440,90 L0,90 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
