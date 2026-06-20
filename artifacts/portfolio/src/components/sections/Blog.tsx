import { motion } from "framer-motion";

const GREEN = "#2d5a27";

const posts = [
  {
    id: 1,
    date: "Marzo 2025",
    tag: "Prevención",
    title: "Por qué la prevención es tu mejor medicina",
    excerpt:
      "Conoce cómo pequeñas acciones diarias pueden reducir drásticamente el riesgo de enfermedades cardiovasculares, respiratorias y metabólicas. La salud se construye un hábito a la vez.",
  },
  {
    id: 2,
    date: "Abril 2025",
    tag: "Salud Respiratoria",
    title: "EPOC: lo que debes saber antes de que robe tu aliento",
    excerpt:
      "La Enfermedad Pulmonar Obstructiva Crónica afecta a millones de personas sin que lo sepan. Aprende a identificar los síntomas tempranos y las estrategias de manejo que marcan la diferencia.",
  },
  {
    id: 3,
    date: "Mayo 2025",
    tag: "Bienestar Laboral",
    title: "Estrés laboral: ¿mito o realidad que destruye tu salud?",
    excerpt:
      "El estrés crónico en el trabajo no es exageración — tiene consecuencias físicas medibles. Descubre qué dice la ciencia y qué puedes hacer hoy para protegerte.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Blog() {
  return (
    <section id="blog" className="relative" style={{ background: GREEN }} data-testid="section-blog">

      <div className="container mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Header */}
        <div className="border-b pb-10 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
          <div>
            <motion.p
              className="font-serif text-xs tracking-[0.25em] uppercase mb-3"
              style={{ color: 'rgba(255,255,255,0.55)' }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Artículos & Reflexiones
            </motion.p>
            <motion.h2
              className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Blog
            </motion.h2>
          </div>
          <motion.p
            className="font-serif text-base max-w-xs leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Información práctica sobre prevención, salud respiratoria y bienestar.
          </motion.p>
        </div>

        {/* Posts grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border"
          style={{ borderColor: 'rgba(255,255,255,0.2)' }}
        >
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              data-testid={`card-blog-${post.id}`}
              className={`group p-8 md:p-10 flex flex-col gap-6 cursor-pointer bg-white transition-all duration-500 hover:bg-black ${
                index < posts.length - 1 ? "border-b md:border-b-0 md:border-r" : ""
              }`}
              style={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-xs tracking-[0.2em] uppercase opacity-50 text-black group-hover:text-white">
                  {post.date}
                </span>
                <span className="font-serif text-xs tracking-[0.15em] uppercase border border-current px-3 py-1 opacity-40 text-black group-hover:text-white">
                  {post.tag}
                </span>
              </div>

              <div className="w-full h-px bg-black opacity-10 group-hover:bg-white" />

              <h3 className="font-serif text-xl md:text-2xl font-bold leading-snug text-black group-hover:text-white">
                {post.title}
              </h3>

              <p className="font-serif text-sm leading-relaxed opacity-60 flex-1 text-black group-hover:text-white">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-3 font-serif text-xs tracking-[0.2em] uppercase opacity-50 group-hover:opacity-100 transition-opacity text-black group-hover:text-white">
                <span>Leer más</span>
                <span>→</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Wave bottom — white fills into white Contact section */}
      <div className="w-full overflow-hidden" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '90px' }}>
          <path d="M0,30 C360,90 1080,0 1440,60 L1440,90 L0,90 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
