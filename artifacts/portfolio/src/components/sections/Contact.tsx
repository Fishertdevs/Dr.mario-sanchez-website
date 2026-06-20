import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";

const GREEN = "#2d5a27";
const DARK_GREEN = "#1e3d1a";
const PHONE = "573143127513";

const infoItems = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),
    label: "UBICACIÓN",
    value: "Bogotá, Colombia",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),
    label: "CORREO",
    value: "drterapia3@gmail.com",
    href: "mailto:drterapia3@gmail.com",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),
    label: "TELÉFONO",
    value: "314 312 7513",
    href: "tel:3143127513",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="rgba(255,255,255,0.7)"/>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182a8.182 8.182 0 01-4.177-1.144l-.3-.178-3.094.878.84-3.06-.194-.314A8.182 8.182 0 1112 20.182z" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),
    label: "WHATSAPP",
    value: "+57 314 312 7513",
    href: "",
  },
];

interface BookingForm {
  nombre: string; email: string; telefono: string;
  tipo: string; area: string; fecha: string; hora: string; mensaje: string;
}
const INIT: BookingForm = {
  nombre: "", email: "", telefono: "",
  tipo: "Presencial", area: "Terapia Respiratoria",
  fecha: "", hora: "Mañana (8 am – 12 pm)", mensaje: "",
};

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Buenos días";
  if (h >= 12 && h < 19) return "Buenas tardes";
  return "Buenas noches";
}

const inputCls = "w-full font-serif text-xs px-3 py-2.5 rounded-xl border outline-none transition-all duration-200 focus:ring-1";
const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  borderColor: "rgba(255,255,255,0.2)",
  color: "white",
};
const labelCls = "block font-serif tracking-[0.14em] uppercase mb-1.5";
const labelStyle: React.CSSProperties = { color: "rgba(255,255,255,0.5)", fontSize: "0.57rem" };

const TABS = ["Contáctenos", "Agendar Cita"];

const STEPS = [
  { id: 0, title: "Datos personales", subtitle: "Paso 1 de 4" },
  { id: 1, title: "Tipo de consulta", subtitle: "Paso 2 de 4" },
  { id: 2, title: "Fecha y horario", subtitle: "Paso 3 de 4" },
  { id: 3, title: "Información adicional", subtitle: "Paso 4 de 4" },
];

export default function Contact() {
  const waUrl = getWhatsAppUrl();
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState<BookingForm>(INIT);
  const [sent, setSent] = useState(false);
  const [tabDir, setTabDir] = useState(0);
  const [step, setStep] = useState(0);
  const [stepDir, setStepDir] = useState(1);
  const [calOpen, setCalOpen] = useState(false);

  const switchTab = (i: number) => {
    setTabDir(i > activeTab ? 1 : -1);
    setActiveTab(i);
    setStep(0);
  };

  const goStep = (next: number) => {
    setStepDir(next > step ? 1 : -1);
    setStep(next);
  };

  const set = (k: keyof BookingForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    const g = getGreeting();
    const msg =
      `${g}, Dr. Mario Sánchez. Le escribo para solicitar una consulta formal.\n\n` +
      `📋 *DATOS DEL PACIENTE*\n• Nombre: ${form.nombre}\n• Correo: ${form.email}\n• Teléfono: ${form.telefono}\n\n` +
      `🩺 *DETALLES DE LA CONSULTA*\n• Tipo: ${form.tipo}\n• Área: ${form.area}\n• Fecha preferida: ${form.fecha || "A convenir"}\n• Horario: ${form.hora}` +
      (form.mensaje ? `\n\n💬 *INFO ADICIONAL*\n${form.mensaje}` : "") +
      `\n\nQuedo atento/a a su confirmación. Muchas gracias.`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => { setSent(false); setForm(INIT); setStep(0); switchTab(0); }, 3000);
  };

  const infoWithWa = infoItems.map(item =>
    item.label === "WHATSAPP" ? { ...item, href: waUrl } : item
  );

  const tabVariants = {
    enter: (d: number) => ({ y: d > 0 ? 28 : -28, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (d: number) => ({ y: d > 0 ? -28 : 28, opacity: 0 }),
  };

  const stepVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const canNext0 = form.nombre.trim() && form.email.trim() && form.telefono.trim();

  return (
    <section id="contact" className="relative bg-white overflow-hidden" data-testid="section-contact">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center pt-6 pb-8 px-6"
      >
        <h2 className="font-serif italic font-bold leading-tight" style={{ color: '#0a0a0a', fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
          Estamos para ayudarle.
        </h2>
        <div className="flex justify-center mt-5">
          <div className="h-[2px] w-20" style={{ background: GREEN }} />
        </div>
      </motion.div>

      {/* Card — wider */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mx-auto w-full max-w-5xl px-4 md:px-8 pb-0"
      >
        <div className="rounded-3xl overflow-hidden" style={{ background: DARK_GREEN }}>

          {/* ── Tab bar — centered within left column width ── */}
          <div className="flex pt-4 pb-1 px-6">
            <div className="w-full md:w-[40%] flex justify-center">
            <div
              className="relative flex rounded-full p-0.5 gap-0.5"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => switchTab(i)}
                  className="relative z-10 font-serif tracking-[0.14em] uppercase transition-colors duration-300"
                  style={{
                    fontSize: "0.6rem",
                    padding: "5px 14px",
                    color: activeTab === i ? DARK_GREEN : "rgba(255,255,255,0.6)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "9999px",
                    fontWeight: 600,
                    minWidth: "auto",
                  }}
                >
                  {activeTab === i && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "white" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
            </div>
          </div>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col md:flex-row">

            {/* Left column */}
            <div className="w-full md:w-[40%] overflow-hidden relative" style={{ minHeight: '380px' }}>
              <AnimatePresence mode="wait" custom={tabDir} initial={false}>
                {activeTab === 0 ? (

                  /* ── Contact info ── */
                  <motion.div
                    key="info-panel"
                    custom={tabDir}
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 p-7 md:p-8 flex flex-col gap-4"
                  >
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-center" style={{ color: 'white' }}>
                      Contáctenos
                    </h3>
                    <div className="text-center">
                      <p className="font-serif tracking-[0.18em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.55rem' }}>
                        Horarios de atención
                      </p>
                      <p className="font-serif leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.78rem' }}>
                        Lun – Vie: <span style={{ color: 'white' }}>8:00 am – 6:00 pm</span>
                      </p>
                      <p className="font-serif leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.78rem' }}>
                        Sábados: <span style={{ color: 'white' }}>9:00 am – 1:00 pm</span>
                      </p>
                      <p className="font-serif leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem' }}>
                        Domingos: <em>Cerrado</em>
                      </p>
                    </div>
                    <div className="flex flex-col gap-3.5">
                      {infoWithWa.map(({ icon, label, value, href }) => (
                        <div key={label} className="flex items-start gap-2.5">
                          <div className="mt-0.5 shrink-0">{icon}</div>
                          <div>
                            <p className="font-serif tracking-[0.16em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.52rem' }}>{label}</p>
                            {href ? (
                              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="font-serif hover:underline underline-offset-4" style={{ color: 'white', fontSize: '0.82rem' }}>
                                {value}
                              </a>
                            ) : (
                              <p className="font-serif" style={{ color: 'white', fontSize: '0.82rem' }}>{value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                ) : (

                  /* ── Step wizard ── */
                  <motion.div
                    key="booking-panel"
                    custom={tabDir}
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 p-7 md:p-8 flex flex-col"
                  >
                    {sent ? (
                      <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "#25D366" }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                        </div>
                        <p className="font-serif font-bold text-lg text-center" style={{ color: 'white' }}>¡Solicitud enviada!</p>
                        <p className="font-serif text-sm text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>Abrimos WhatsApp con su información.</p>
                      </div>
                    ) : (
                      <>
                        {/* Step progress dots */}
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <p className="font-serif font-semibold" style={{ color: 'white', fontSize: '0.85rem' }}>{STEPS[step].title}</p>
                            <p className="font-serif" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', letterSpacing: '0.12em' }}>{STEPS[step].subtitle.toUpperCase()}</p>
                          </div>
                          <div className="flex gap-1.5">
                            {STEPS.map((s) => (
                              <div
                                key={s.id}
                                className="rounded-full transition-all duration-300"
                                style={{
                                  width: step === s.id ? '18px' : '7px',
                                  height: '7px',
                                  background: step === s.id ? 'white' : 'rgba(255,255,255,0.25)',
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Sliding step cards */}
                        <div className="flex-1 relative overflow-hidden">
                          <AnimatePresence mode="wait" custom={stepDir} initial={false}>

                            {step === 0 && (
                              <motion.div
                                key="step-0"
                                custom={stepDir}
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 flex flex-col gap-3.5"
                              >
                                <div>
                                  <label className={labelCls} style={labelStyle}>Nombre completo:</label>
                                  <input required value={form.nombre} onChange={set("nombre")} placeholder="Tu nombre" className={inputCls} style={inputStyle} />
                                </div>
                                <div>
                                  <label className={labelCls} style={labelStyle}>Correo electrónico:</label>
                                  <input required type="email" value={form.email} onChange={set("email")} placeholder="correo@email.com" className={inputCls} style={inputStyle} />
                                </div>
                                <div>
                                  <label className={labelCls} style={labelStyle}>Teléfono / WhatsApp:</label>
                                  <input required type="tel" value={form.telefono} onChange={set("telefono")} placeholder="323 456 789" className={inputCls} style={inputStyle} />
                                </div>
                              </motion.div>
                            )}

                            {step === 1 && (
                              <motion.div
                                key="step-1"
                                custom={stepDir}
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 flex flex-col gap-3.5"
                              >
                                <div>
                                  <label className={labelCls} style={labelStyle}>Tipo de consulta:</label>
                                  <Select value={form.tipo} onValueChange={(v) => setForm(f => ({ ...f, tipo: v }))}>
                                    <SelectTrigger className="w-full rounded-xl border text-xs font-serif" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)", color: "white", height: "36px" }}>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Presencial">Presencial</SelectItem>
                                      <SelectItem value="Virtual">Virtual</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className={labelCls} style={labelStyle}>Área de consulta:</label>
                                  <Select value={form.area} onValueChange={(v) => setForm(f => ({ ...f, area: v }))}>
                                    <SelectTrigger className="w-full rounded-xl border text-xs font-serif" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)", color: "white", height: "36px" }}>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Terapia Respiratoria">Terapia Respiratoria</SelectItem>
                                      <SelectItem value="CPAP / BPAP">CPAP / BPAP</SelectItem>
                                      <SelectItem value="Salud Pública">Salud Pública</SelectItem>
                                      <SelectItem value="Inyectología">Inyectología</SelectItem>
                                      <SelectItem value="Vacunación">Vacunación</SelectItem>
                                      <SelectItem value="Otra">Otra</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </motion.div>
                            )}

                            {step === 2 && (
                              <motion.div
                                key="step-2"
                                custom={stepDir}
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 flex flex-col gap-3.5"
                              >
                                <div>
                                  <label className={labelCls} style={labelStyle}>Fecha preferida:</label>
                                  <Popover open={calOpen} onOpenChange={setCalOpen}>
                                    <PopoverTrigger asChild>
                                      <button
                                        type="button"
                                        className="w-full font-serif text-xs px-3 py-2.5 rounded-xl border outline-none text-left flex items-center justify-between"
                                        style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)", color: form.fecha ? "white" : "rgba(255,255,255,0.35)", cursor: "pointer" }}
                                      >
                                        <span>{form.fecha ? new Date(form.fecha + "T12:00:00").toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" }) : "Seleccionar fecha"}</span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5, flexShrink: 0 }}>
                                          <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="2"/>
                                          <path d="M3 9h18M8 2v4M16 2v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                      </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      side="bottom"
                                      align="start"
                                      sideOffset={4}
                                      className="p-0 shadow-xl overflow-hidden"
                                      style={{ width: "var(--radix-popover-trigger-width)" }}
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={form.fecha ? new Date(form.fecha + "T12:00:00") : undefined}
                                        onSelect={(d) => {
                                          if (d) {
                                            const iso = d.toISOString().split("T")[0];
                                            setForm(f => ({ ...f, fecha: iso }));
                                            setCalOpen(false);
                                          }
                                        }}
                                        locale={es}
                                        className="w-full"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                <div>
                                  <label className={labelCls} style={labelStyle}>Horario preferido:</label>
                                  <Select value={form.hora} onValueChange={(v) => setForm(f => ({ ...f, hora: v }))}>
                                    <SelectTrigger className="w-full rounded-xl border text-xs font-serif" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)", color: "white", height: "36px" }}>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Mañana (8 am – 12 pm)">Mañana (8 am – 12 pm)</SelectItem>
                                      <SelectItem value="Tarde (12 pm – 6 pm)">Tarde (12 pm – 6 pm)</SelectItem>
                                      <SelectItem value="Sábados (9 am – 1 pm)">Sábados (9 am – 1 pm)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </motion.div>
                            )}

                            {step === 3 && (
                              <motion.div
                                key="step-3"
                                custom={stepDir}
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 flex flex-col gap-3.5"
                              >
                                <div className="flex flex-col" style={{ flex: "1 1 0", minHeight: 0 }}>
                                  <label className={labelCls + " text-center w-full"} style={labelStyle}>Información adicional</label>
                                  <textarea
                                    value={form.mensaje}
                                    onChange={set("mensaje")}
                                    placeholder="Describa brevemente su motivo de consulta…"
                                    className={inputCls + " resize-none"}
                                    style={{ ...inputStyle, flex: "1 1 0", minHeight: 0 }}
                                  />
                                </div>
                                <p className="font-serif" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.62rem', flexShrink: 0 }}>
                                  Al continuar se abrirá WhatsApp con su solicitud completa.
                                </p>
                              </motion.div>
                            )}

                          </AnimatePresence>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex items-center gap-2 mt-5">
                          {step > 0 && (
                            <button
                              onClick={() => goStep(step - 1)}
                              className="font-serif tracking-[0.14em] uppercase transition-colors duration-200 hover:opacity-60"
                              style={{ background: "none", color: "rgba(255,255,255,0.45)", fontSize: "0.62rem", border: "none", cursor: "pointer", fontWeight: 600, padding: 0 }}
                            >
                              Atrás
                            </button>
                          )}
                          {step < 3 ? (
                            <button
                              onClick={() => goStep(step + 1)}
                              disabled={step === 0 && !canNext0}
                              className="font-serif tracking-[0.14em] uppercase transition-all duration-200"
                              style={{
                                background: "none",
                                color: step === 0 && !canNext0 ? "rgba(255,255,255,0.25)" : "white",
                                fontSize: "0.68rem",
                                border: "none",
                                borderBottom: step === 0 && !canNext0 ? "1px solid rgba(255,255,255,0.2)" : "1px solid white",
                                cursor: step === 0 && !canNext0 ? "not-allowed" : "pointer",
                                fontWeight: 700,
                                padding: "0 0 2px 0",
                                marginLeft: "auto",
                              }}
                            >
                              Continuar
                            </button>
                          ) : (
                            <button
                              onClick={handleSubmit}
                              className="font-serif tracking-[0.14em] uppercase transition-all duration-200 hover:opacity-70 active:scale-[0.98] flex items-center gap-1.5"
                              style={{ background: "none", color: "white", fontSize: "0.68rem", border: "none", borderBottom: "1px solid white", cursor: "pointer", fontWeight: 700, padding: "0 0 2px 0", marginLeft: "auto" }}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white"/>
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182a8.182 8.182 0 01-4.177-1.144l-.3-.178-3.094.878.84-3.06-.194-.314A8.182 8.182 0 1112 20.182z" fill="white"/>
                              </svg>
                              Enviar
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right column — map always visible */}
            <div className="w-full md:w-[60%] h-[120px] md:h-auto" style={{ minHeight: undefined }}>
              <iframe
                title="Ubicación Dr. Mario Sánchez"
                src="https://maps.google.com/maps?q=Bogot%C3%A1,+Colombia&output=embed&z=13"
                width="100%" height="100%"
                style={{ border: 0, display: 'block', minHeight: '120px', height: '100%' }}
                className="md:min-h-[380px]"
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </motion.div>

      {/* Wave → Footer */}
      <div className="w-full overflow-hidden mt-0" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '90px' }}>
          <path d="M0,60 C480,0 960,90 1440,30 L1440,90 L0,90 Z" fill={GREEN} />
        </svg>
      </div>
    </section>
  );
}
