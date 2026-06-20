import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WA_GREEN = "#25D366";

interface Props {
  phone: string;
}

const WhatsAppIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182a8.182 8.182 0 01-4.177-1.144l-.3-.178-3.094.878.84-3.06-.194-.314A8.182 8.182 0 1112 20.182z" fill="white"/>
  </svg>
);

export default function WhatsAppButton({ phone }: Props) {
  const [labelOpen, setLabelOpen] = useState(false);
  const waUrl = `https://wa.me/${phone}`;

  const handleClick = () => {
    if (window.innerWidth >= 768) {
      setLabelOpen((prev) => !prev);
    } else {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed z-50 flex items-center gap-3 bottom-6 right-6">
      {/* Animated label — desktop only */}
      <AnimatePresence>
        {labelOpen && (
          <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 24, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex items-center font-serif font-semibold text-xs tracking-[0.18em] uppercase whitespace-nowrap px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
            style={{
              background: 'white',
              color: '#0a0a0a',
              border: '1px solid rgba(0,0,0,0.10)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            }}
          >
            Escríbenos
          </motion.a>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        aria-label="Contactar por WhatsApp"
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        className="w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: WA_GREEN, flexShrink: 0 }}
      >
        <span className="block md:hidden"><WhatsAppIcon size={22} /></span>
        <span className="hidden md:block"><WhatsAppIcon size={28} /></span>
      </motion.button>
    </div>
  );
}
