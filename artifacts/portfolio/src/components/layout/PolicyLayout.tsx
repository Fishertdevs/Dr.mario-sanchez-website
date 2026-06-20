import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const GREEN = "#2d5a27";

interface Section {
  title: string;
  content: React.ReactNode;
}

interface Props {
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

export default function PolicyLayout({ title, updated = "Junio de 2026", sections }: Props) {
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-16">

        {/* Header — fully centered, matching approved title sizes */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-serif italic font-bold leading-tight whitespace-nowrap"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "#0a0a0a" }}
          >
            {title}
          </h1>

          {/* Decorative line — centered */}
          <div className="flex justify-center mt-4 mb-4">
            <div className="h-[2px] w-16" style={{ background: GREEN }} />
          </div>

          <p
            className="font-serif"
            style={{ color: "#999", fontSize: "clamp(0.65rem, 2vw, 0.82rem)" }}
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

        {/* Back to home — bottom of content */}
        <motion.div
          className="mt-14 md:mt-16 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => navigate("/")}
            className="font-serif tracking-[0.2em] uppercase inline-flex items-center gap-2 hover:opacity-60 transition-opacity"
            style={{ color: GREEN, fontSize: "clamp(0.65rem, 2vw, 0.78rem)", background: "none", border: "none", cursor: "pointer" }}
          >
            ← Volver al inicio
          </button>
        </motion.div>
      </main>

      <Footer />
      <WhatsAppButton phone="573143127513" />
    </div>
  );
}
