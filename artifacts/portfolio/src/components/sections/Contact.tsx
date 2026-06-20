import { motion } from "framer-motion";

const GREEN = "#2d5a27";
const DARK_GREEN = "#1e3d1a";

const infoItems = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),
    label: "UBICACIÓN",
    value: "Bogotá, Colombia",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),
    label: "CORREO",
    value: "drterapia3@gmail.com",
    href: "mailto:drterapia3@gmail.com",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),
    label: "TELÉFONO",
    value: "314 312 7513",
    href: "tel:3143127513",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="rgba(255,255,255,0.7)"/>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182a8.182 8.182 0 01-4.177-1.144l-.3-.178-3.094.878.84-3.06-.194-.314A8.182 8.182 0 1112 20.182z" fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),
    label: "WHATSAPP",
    value: "+57 314 312 7513",
    href: "https://wa.me/573143127513",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative bg-white overflow-hidden" data-testid="section-contact">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center pt-16 pb-10 px-6"
      >
        <p className="font-serif text-xs tracking-[0.28em] uppercase mb-3" style={{ color: '#aaa' }}>
          Agenda tu consulta
        </p>
        <h2 className="font-serif italic font-bold leading-tight" style={{ color: '#0a0a0a', fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}>
          Estamos para ayudarle.
        </h2>
        {/* decorative dot */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-1 h-1 rounded-full" style={{ background: '#bbb' }} />
          <div className="w-1 h-1 rounded-full" style={{ background: GREEN }} />
          <div className="w-1 h-1 rounded-full" style={{ background: '#bbb' }} />
        </div>
      </motion.div>

      {/* Two-column body */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="flex flex-col md:flex-row mx-auto w-full max-w-5xl px-4 md:px-8 pb-0 gap-4"
      >
        {/* Left: info panel */}
        <div
          className="w-full md:w-[38%] rounded-xl p-7 flex flex-col gap-5"
          style={{ background: DARK_GREEN }}
        >
          <h3 className="font-serif text-xl font-semibold mb-1" style={{ color: 'white' }}>
            Contáctenos
          </h3>

          {/* Hours */}
          <div>
            <p className="font-serif text-[0.6rem] tracking-[0.18em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Horarios de atención
            </p>
            <p className="font-serif text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Lun – Vie: <span style={{ color: 'white' }}>8:00 am – 6:00 pm</span>
            </p>
            <p className="font-serif text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Sábados: <span style={{ color: 'white' }}>9:00 am – 1:00 pm</span>
            </p>
            <p className="font-serif text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Domingos: <em>Cerrado</em>
            </p>
          </div>

          {/* Contact items */}
          <div className="flex flex-col gap-4">
            {infoItems.map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">{icon}</div>
                <div>
                  <p className="font-serif text-[0.58rem] tracking-[0.18em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="font-serif text-sm hover:underline underline-offset-4" style={{ color: 'white' }}>
                      {value}
                    </a>
                  ) : (
                    <p className="font-serif text-sm" style={{ color: 'white' }}>{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Google Map */}
        <div className="w-full md:w-[62%] rounded-xl overflow-hidden" style={{ minHeight: '340px' }}>
          <iframe
            title="Ubicación Dr. Mario Sánchez"
            src="https://maps.google.com/maps?q=Bogot%C3%A1,+Colombia&output=embed&z=13"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '340px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </motion.div>

      {/* Wave bottom */}
      <div className="w-full overflow-hidden mt-0" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '90px' }}>
          <path d="M0,60 C480,0 960,90 1440,30 L1440,90 L0,90 Z" fill={GREEN} />
        </svg>
      </div>
    </section>
  );
}
