import { Link } from "wouter";

const GREEN = "#2d5a27";

export default function Terminos() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="font-serif text-xs tracking-[0.2em] uppercase mb-10 inline-flex items-center gap-2 hover:opacity-60 transition-opacity"
          style={{ color: GREEN }}
        >
          ← Volver al inicio
        </Link>

        <p className="font-serif text-xs tracking-[0.22em] uppercase mb-3" style={{ color: "#aaa" }}>Dr. Mario Sánchez</p>
        <h1 className="font-serif font-bold text-4xl mb-2" style={{ color: "#0a0a0a" }}>Términos y Condiciones</h1>
        <div className="h-[2px] w-16 mb-8" style={{ background: GREEN }} />
        <p className="font-serif text-sm mb-10" style={{ color: "#777" }}>Última actualización: junio de 2026</p>

        <div className="space-y-8 font-serif" style={{ color: "#444", lineHeight: 1.9, fontSize: "0.95rem" }}>
          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>1. Aceptación de los términos</h2>
            <p>Al acceder y utilizar el sitio web del Dr. Mario Sánchez, usted acepta cumplir con estos Términos y Condiciones. Si no está de acuerdo con alguno de ellos, le pedimos que se abstenga de usar este sitio.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>2. Naturaleza del contenido</h2>
            <p>El contenido publicado en este sitio web tiene carácter informativo y educativo. La información sobre terapia respiratoria, salud pública y servicios médicos no sustituye una consulta médica profesional ni debe interpretarse como diagnóstico o prescripción.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>3. Servicios ofrecidos</h2>
            <p>El Dr. Mario Sánchez ofrece servicios de:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Terapia respiratoria (presencial y teleorientación)</li>
              <li>Gestión y capacitación en equipos CPAP/BPAP</li>
              <li>Inyectología y vacunación</li>
              <li>Promoción de la salud y salud pública</li>
            </ul>
            <p className="mt-3">La prestación efectiva del servicio queda sujeta a disponibilidad y previa confirmación de la cita.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>4. Propiedad intelectual</h2>
            <p>Todo el contenido de este sitio, incluyendo textos, imágenes, logotipos y diseño, es propiedad del Dr. Mario Sánchez o de sus respectivos titulares. Queda prohibida su reproducción, distribución o uso sin autorización expresa y por escrito.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>5. Limitación de responsabilidad</h2>
            <p>El Dr. Mario Sánchez no será responsable de los daños o perjuicios derivados del uso indebido de la información publicada en este sitio, ni de la interrupción temporal del servicio por causas técnicas ajenas a su control.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>6. Cancelación de citas</h2>
            <p>En caso de necesitar cancelar o reprogramar una cita, le solicitamos comunicarse con al menos 24 horas de anticipación mediante WhatsApp al +57 314 312 7513 o por correo a <a href="mailto:drterapia3@gmail.com" className="underline underline-offset-2" style={{ color: GREEN }}>drterapia3@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>7. Legislación aplicable</h2>
            <p>Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia derivada del uso de este sitio será resuelta conforme a la normativa colombiana vigente.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>8. Contacto</h2>
            <p>Para cualquier consulta relacionada con estos términos, puede contactarnos en <a href="mailto:drterapia3@gmail.com" className="underline underline-offset-2" style={{ color: GREEN }}>drterapia3@gmail.com</a> o al WhatsApp <a href="https://wa.me/573143127513" className="underline underline-offset-2" style={{ color: GREEN }}>+57 314 312 7513</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
