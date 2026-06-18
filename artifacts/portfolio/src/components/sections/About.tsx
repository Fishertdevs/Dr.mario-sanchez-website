import { motion } from "framer-motion";
import aboutBg from "@/assets/about-bg.jpg";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm w-full max-w-md mx-auto lg:mx-0">
              <img
                src={aboutBg}
                alt="Healthcare abstract"
                className="w-full h-full object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 className="font-serif text-3xl md:text-4xl text-white font-bold leading-tight">
                  "POR QUE LA PREVENCIÓN ES TU MEJOR MEDICINA."
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-muted-foreground uppercase mb-6">
              Sobre Mí
            </h2>
            <div className="space-y-6 text-foreground/80 leading-relaxed font-light text-lg">
              <p>
                Terapeuta Respiratorio con 2 años de experiencia en gestión de equipos biomédicos (CPAP, BPAP). Experto en teleorientación y capacitación remota de pacientes.
              </p>
              <p>
                Sólida formación en valoración terapéutica, diseño de programas educativos y gestión de citas. Amplia experiencia en sistemas de registro clínico y CRM.
              </p>
              <p>
                Habilidades adicionales en atención a víctimas de violencia sexual, promoción de la salud, donación de sangre y vacunación. Mi enfoque integral garantiza no solo el tratamiento, sino la educación y prevención como pilares fundamentales del bienestar.
              </p>
            </div>
            
            <div className="mt-10 pt-10 border-t border-border">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-foreground mb-2">02+</h4>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Años de Experiencia</p>
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-bold text-foreground mb-2">100%</h4>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Compromiso Humano</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
