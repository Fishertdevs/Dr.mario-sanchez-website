import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GREEN = "#1565C0";
const DARK_GREEN = "#0D47A1";
const PHONE = "573143127513";

interface Form {
  nombre: string;
  email: string;
  telefono: string;
  tipo: string;
  area: string;
  fecha: string;
  hora: string;
  mensaje: string;
}

const INIT: Form = { nombre: "", email: "", telefono: "", tipo: "Presencial", area: "Terapia Respiratoria", fecha: "", hora: "Mañana (8 am – 12 pm)", mensaje: "" };

interface Props { open: boolean; onClose: () => void; }

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Buenos días";
  if (h >= 12 && h < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function ConsultaModal({ open, onClose }: Props) {
  const [form, setForm] = useState<Form>(INIT);
  const [sent, setSent] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const g = getGreeting();
    const msg =
      `${g}, Dr. Mario Sánchez. Le escribo para solicitar una consulta formal.\n\n` +
      `📋 *DATOS DEL PACIENTE*\n` +
      `• Nombre: ${form.nombre}\n` +
      `• Correo: ${form.email}\n` +
      `• Teléfono: ${form.telefono}\n\n` +
      `🩺 *DETALLES DE LA CONSULTA*\n` +
      `• Tipo: ${form.tipo}\n` +
      `• Área: ${form.area}\n` +
      `• Fecha preferida: ${form.fecha || "A convenir"}\n` +
      `• Horario preferido: ${form.hora}\n` +
      (form.mensaje ? `\n💬 *INFORMACIÓN ADICIONAL*\n${form.mensaje}\n` : "") +
      `\nQuedo atento/a a su confirmación. Muchas gracias.`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => { setSent(false); setForm(INIT); onClose(); }, 2000);
  };

  const labelCls = "block font-serif text-[0.65rem] tracking-[0.15em] uppercase mb-1";
  const inputCls = "w-full font-serif text-sm px-3 py-2 rounded-lg border outline-none transition-all duration-200 focus:ring-2";
  const inputStyle = { borderColor: "rgba(21,101,192,0.25)", color: "#0a0a0a", background: "#fafaf9" };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} />

          {/* Panel */}
          <motion.div
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl"
            style={{ background: "#ffffff" }}
            initial={{ y: 40, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="px-7 pt-7 pb-5 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <button onClick={onClose} className="absolute top-5 right-6 text-gray-400 hover:text-gray-600 text-xl font-light transition-colors" aria-label="Cerrar">✕</button>
              <p className="font-serif text-[0.6rem] tracking-[0.22em] uppercase mb-1" style={{ color: "#aaa" }}>Dr. Mario Sánchez</p>
              <h2 className="font-serif font-bold text-2xl" style={{ color: DARK_GREEN }}>Agendar Consulta</h2>
              <p className="font-serif text-xs mt-1" style={{ color: "#777" }}>Complete el formulario y le contactaremos para confirmar su cita.</p>
            </div>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 px-7">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "#25D366" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                </div>
                <p className="font-serif font-bold text-lg text-center" style={{ color: DARK_GREEN }}>¡Solicitud enviada!</p>
                <p className="font-serif text-sm text-center mt-1" style={{ color: "#666" }}>Abrimos WhatsApp con su información.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
                {/* Nombre */}
                <div>
                  <label className={labelCls} style={{ color: GREEN }}>Nombre completo *</label>
                  <input required value={form.nombre} onChange={set("nombre")} placeholder="Ej: Juan García" className={inputCls} style={inputStyle} />
                </div>

                {/* Email + Teléfono */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls} style={{ color: GREEN }}>Correo electrónico *</label>
                    <input required type="email" value={form.email} onChange={set("email")} placeholder="correo@email.com" className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelCls} style={{ color: GREEN }}>Teléfono / WhatsApp *</label>
                    <input required type="tel" value={form.telefono} onChange={set("telefono")} placeholder="300 000 0000" className={inputCls} style={inputStyle} />
                  </div>
                </div>

                {/* Tipo + Área */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls} style={{ color: GREEN }}>Tipo de consulta</label>
                    <select value={form.tipo} onChange={set("tipo")} className={inputCls} style={inputStyle}>
                      <option>Presencial</option>
                      <option>Teleorientación</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} style={{ color: GREEN }}>Área de consulta</label>
                    <select value={form.area} onChange={set("area")} className={inputCls} style={inputStyle}>
                      <option>Terapia Respiratoria</option>
                      <option>CPAP / BPAP</option>
                      <option>Salud Pública</option>
                      <option>Inyectología</option>
                      <option>Vacunación</option>
                      <option>Otra</option>
                    </select>
                  </div>
                </div>

                {/* Fecha + Hora */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls} style={{ color: GREEN }}>Fecha preferida</label>
                    <input type="date" value={form.fecha} onChange={set("fecha")} className={inputCls} style={inputStyle} min={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div>
                    <label className={labelCls} style={{ color: GREEN }}>Horario preferido</label>
                    <select value={form.hora} onChange={set("hora")} className={inputCls} style={inputStyle}>
                      <option>Mañana (8 am – 12 pm)</option>
                      <option>Tarde (12 pm – 6 pm)</option>
                      <option>Sábados (9 am – 1 pm)</option>
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className={labelCls} style={{ color: GREEN }}>Información adicional</label>
                  <textarea value={form.mensaje} onChange={set("mensaje")} placeholder="Describa brevemente su motivo de consulta o cualquier información relevante…" rows={3} className={inputCls + " resize-none"} style={inputStyle} />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full font-serif text-sm tracking-[0.18em] uppercase py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2 mt-1"
                  style={{ background: "#25D366", color: "white", fontWeight: 600 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182a8.182 8.182 0 01-4.177-1.144l-.3-.178-3.094.878.84-3.06-.194-.314A8.182 8.182 0 1112 20.182z" fill="white"/>
                  </svg>
                  Enviar por WhatsApp
                </button>

                <p className="font-serif text-[0.62rem] text-center" style={{ color: "#aaa" }}>
                  Al enviar abriremos WhatsApp con su solicitud. Lun–Vie 8am–6pm · Sáb 9am–1pm
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
