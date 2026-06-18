import { motion } from "framer-motion";

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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section id="topics" className="py-24 md:py-32 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm font-bold tracking-[0.2em] text-muted-foreground uppercase mb-4"
          >
            Especialidades & Charlas
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight"
          >
            Temas de Salud y Prevención
          </motion.h3>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-background p-8 border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div className="text-primary/20 font-serif text-5xl font-bold absolute top-4 right-6 opacity-30 group-hover:opacity-10 transition-opacity">
                {(index + 1).toString().padStart(2, '0')}
              </div>
              <h4 className="font-serif text-lg font-medium text-foreground relative z-10 leading-snug pr-8">
                {topic}
              </h4>
              <div className="w-8 h-[1px] bg-primary mt-6 transition-all duration-300 group-hover:w-16"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
