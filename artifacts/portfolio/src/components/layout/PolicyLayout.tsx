import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const GREEN = "#2d5a27";

interface Section {
  title: string;
  content: React.ReactNode;
}

interface Props {
  eyebrow?: string;
  title: string;
  updated?: string;
  sections: Section[];
}

function AnimatedSection({ title, content, index }: Section & { index: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2
        className="font-serif font-bold mb-2 md:mb-3"
        style={{ color: "#0a0a0a", fontSize: "clamp(0.82rem, 3vw, 1.1rem)" }}
      >
        {title}
      </h2>
      <div
        className="font-serif"
        style={{ color: "#555", lineHeight: 1.85, fontSize: "clamp(0.72rem, 2.5vw, 0.93rem)" }}
      >
        {content}
      </div>
    </motion.section>
  );
}

export default function PolicyLayout({ eyebrow = "Dr. Mario Sánchez", title, updated = "Junio de 2026", sections }: Props) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-serif tracking-[0.22em] uppercase mb-2 md:mb-3"
            style={{ color: "#aaa", fontSize: "clamp(0.55rem, 2vw, 0.72rem)" }}
          >
            {eyebrow}
          </p>

          {/* Title — single line on mobile, scales down */}
          <h1
            className="font-serif font-bold leading-tight whitespace-nowrap overflow-hidden text-ellipsis text-center md:text-left"
            style={{ fontSize: "clamp(1.15rem, 5.5vw, 2.8rem)", color: "#0a0a0a" }}
          >
            {title}
          </h1>

          <div className="h-[2px] w-12 md:w-16 mt-3 mb-5 md:mb-6" style={{ background: GREEN }} />

          <p
            className="font-serif mb-8 md:mb-12"
            style={{ color: "#999", fontSize: "clamp(0.68rem, 2.2vw, 0.85rem)" }}
          >
            Última actualización: {updated}
          </p>
        </motion.div>

        {/* Sections — each animates in/out on scroll */}
        <div className="space-y-7 md:space-y-10">
          {sections.map((s, i) => (
            <AnimatedSection key={s.title} title={s.title} content={s.content} index={i} />
          ))}
        </div>
      </main>

      <Footer />
      <WhatsAppButton phone="573143127513" />
    </div>
  );
}
