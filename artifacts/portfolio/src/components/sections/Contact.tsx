import { motion } from "framer-motion";
import { SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";
import serviceBg from "@/assets/service-bg.jpg";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={serviceBg} 
          alt="Contact background" 
          className="w-full h-full object-cover opacity-10 grayscale mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-primary/90"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-primary-foreground/60 uppercase mb-4">
              Agenda tu consulta
            </h2>
            <h3 className="font-serif text-5xl md:text-7xl font-bold mb-12">
              Hablemos de Prevención
            </h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 mb-16"
          >
            <div className="flex flex-col items-center">
              <span className="text-primary-foreground/60 uppercase text-xs tracking-widest mb-2">Email</span>
              <a href="mailto:drterapia3@gmail.com" className="text-xl md:text-2xl font-light hover:underline underline-offset-8 decoration-1">
                drterapia3@gmail.com
              </a>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-primary-foreground/60 uppercase text-xs tracking-widest mb-2">Teléfono</span>
              <a href="tel:3143127513" className="text-xl md:text-2xl font-light hover:underline underline-offset-8 decoration-1">
                314 312 7513
              </a>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-primary-foreground/60 uppercase text-xs tracking-widest mb-2">Ubicación</span>
              <span className="text-xl md:text-2xl font-light">
                Bogotá, Colombia
              </span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-8"
          >
            <a 
              href="https://instagram.com/drmariosanchez7124" 
              target="_blank" 
              rel="noreferrer"
              className="p-4 border border-primary-foreground/20 rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-300 group"
            >
              <SiInstagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="https://tiktok.com/@dr..terapia" 
              target="_blank" 
              rel="noreferrer"
              className="p-4 border border-primary-foreground/20 rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-300 group"
            >
              <SiTiktok className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="https://wa.me/573143127513" 
              target="_blank" 
              rel="noreferrer"
              className="p-4 border border-primary-foreground/20 rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-300 group"
            >
              <SiWhatsapp className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
          </motion.div>

          <div className="mt-24 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/50 tracking-wider">
            <p>&copy; {new Date().getFullYear()} Dr. Mario Sanchez. Todos los derechos reservados.</p>
            <p className="mt-4 md:mt-0">@drterapia3 &middot; @drmariosanchez7124</p>
          </div>
        </div>
      </div>
    </section>
  );
}
