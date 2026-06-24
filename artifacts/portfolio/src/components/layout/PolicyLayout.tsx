import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const GREEN = "#1565C0";

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
        style={{ color: "#0a0a0a", fontSize: "clamp(0.78rem, 2.5vw, 1.05rem)" }}
      >
        {title}
      </h2>
      <div
        className="font-serif"
        style={{ color: "#555", lineHeight: 1.85, fontSize: "clamp(0.68rem, 2vw, 0.9rem)" }}
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

        {/* Header — fully centered */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Title — small on mobile, approved size on desktop */}
          <h1
            className="font-serif italic font-bold leading-tight"
            style={{ fontSize: "clamp(1.3rem, 5vw, 3rem)", color: "#0a0a0a" }}
          >
            {title}
          </h1>

          {/* Decorative line */}
          <div className="flex justify-center mt-4 mb-4">
            <div className="h-[2px] w-16" style={{ background: GREEN }} />
          </div>

          <p
            className="font-serif"
            style={{ color: "#999", fontSize: "clamp(0.62rem, 1.8vw, 0.82rem)" }}
          >
            Última actualización: {updated}
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-7 md:space-y-10">
          {sections.map((s, i) => (
            <AnimatedSection key={s.title} title={s.title} content={s.content} index={i} />
          ))}
        </div>

        {/* Back to home */}
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
            style={{ color: GREEN, fontSize: "clamp(0.62rem, 1.8vw, 0.78rem)", background: "none", border: "none", cursor: "pointer" }}
          >
            ← Volver al inicio
          </button>
        </motion.div>
      </main>

      {/* Wave → Footer transition (same as home page) */}
      <div className="w-full overflow-hidden bg-white" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '90px' }}>
          <path d="M0,60 C480,0 960,90 1440,30 L1440,90 L0,90 Z" fill={GREEN} />
        </svg>
      </div>

      <Footer />
      <WhatsAppButton phone="573143127513" />
    </div>
  );
}
