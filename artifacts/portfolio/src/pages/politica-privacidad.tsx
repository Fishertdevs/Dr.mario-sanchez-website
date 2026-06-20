import { Link } from "wouter";

const GREEN = "#2d5a27";

export default function PoliticaPrivacidad() {
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
        <h1 className="font-serif font-bold text-4xl mb-2" style={{ color: "#0a0a0a" }}>Política de Privacidad</h1>
        <div className="h-[2px] w-16 mb-8" style={{ background: GREEN }} />
        <p className="font-serif text-sm mb-10" style={{ color: "#777" }}>Última actualización: junio de 2026</p>

        <div className="space-y-8 font-serif" style={{ color: "#444", lineHeight: 1.9, fontSize: "0.95rem" }}>
          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>1. Responsable del tratamiento</h2>
            <p>El responsable del tratamiento de sus datos personales es el Dr. Mario Sánchez, Terapeuta Respiratorio y Salubrista Público, con correo de contacto <a href="mailto:drterapia3@gmail.com" className="underline underline-offset-2" style={{ color: GREEN }}>drterapia3@gmail.com</a>, con sede en Bogotá, Colombia.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>2. Datos que recopilamos</h2>
            <p>Podemos recopilar los siguientes datos personales cuando usted utiliza nuestros servicios o se comunica con nosotros:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono o WhatsApp</li>
              <li>Información de salud relacionada con su consulta médica</li>
              <li>Fecha y motivo de la consulta solicitada</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>3. Finalidad del tratamiento</h2>
            <p>Sus datos personales son utilizados exclusivamente para:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Gestionar y confirmar citas médicas</li>
              <li>Brindar orientación en salud respiratoria y pública</li>
              <li>Enviar información relevante sobre su tratamiento o seguimiento</li>
              <li>Cumplir con obligaciones legales aplicables en Colombia</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>4. Base legal</h2>
            <p>El tratamiento de sus datos se realiza con base en su consentimiento expreso, la ejecución de una relación de atención en salud y el cumplimiento de obligaciones legales conforme a la Ley 1581 de 2012 (Ley de Protección de Datos Personales de Colombia).</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>5. Conservación de datos</h2>
            <p>Sus datos serán conservados durante el tiempo necesario para cumplir con las finalidades descritas y conforme a los plazos establecidos por la normativa colombiana en materia de registros clínicos y de salud.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>6. Sus derechos</h2>
            <p>Conforme a la Ley 1581 de 2012, usted tiene derecho a conocer, actualizar, rectificar y suprimir sus datos personales. Para ejercer sus derechos, escríbanos a <a href="mailto:drterapia3@gmail.com" className="underline underline-offset-2" style={{ color: GREEN }}>drterapia3@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>7. Cambios en esta política</h2>
            <p>Nos reservamos el derecho de actualizar esta política en cualquier momento. Cualquier cambio será publicado en esta misma página con la fecha de actualización correspondiente.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
