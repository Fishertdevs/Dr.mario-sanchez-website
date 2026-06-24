import PolicyLayout from "@/components/layout/PolicyLayout";

const GREEN = "#1565C0";

const link = (href: string, text: string) => (
  <a href={href} className="underline underline-offset-2" style={{ color: GREEN }}>{text}</a>
);

export default function Terminos() {
  return (
    <PolicyLayout
      title="Términos y Condiciones"
      sections={[
        {
          title: "1. Aceptación de los términos",
          content: <p>Al acceder y utilizar el sitio web del Dr. Mario Sánchez, usted acepta cumplir con estos Términos y Condiciones. Si no está de acuerdo con alguno de ellos, le pedimos que se abstenga de usar este sitio.</p>,
        },
        {
          title: "2. Naturaleza del contenido",
          content: <p>El contenido publicado en este sitio web tiene carácter informativo y educativo. La información sobre terapia respiratoria, salud pública y servicios médicos no sustituye una consulta médica profesional ni debe interpretarse como diagnóstico o prescripción.</p>,
        },
        {
          title: "3. Servicios ofrecidos",
          content: (
            <>
              <p>El Dr. Mario Sánchez ofrece servicios de:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Terapia respiratoria (presencial y teleorientación)</li>
                <li>Gestión y capacitación en equipos CPAP/BPAP</li>
                <li>Inyectología y vacunación</li>
                <li>Promoción de la salud y salud pública</li>
              </ul>
              <p className="mt-2">La prestación efectiva del servicio queda sujeta a disponibilidad y previa confirmación de la cita.</p>
            </>
          ),
        },
        {
          title: "4. Propiedad intelectual",
          content: <p>Todo el contenido de este sitio, incluyendo textos, imágenes, logotipos y diseño, es propiedad del Dr. Mario Sánchez o de sus respectivos titulares. Queda prohibida su reproducción, distribución o uso sin autorización expresa y por escrito.</p>,
        },
        {
          title: "5. Limitación de responsabilidad",
          content: <p>El Dr. Mario Sánchez no será responsable de los daños o perjuicios derivados del uso indebido de la información publicada en este sitio, ni de la interrupción temporal del servicio por causas técnicas ajenas a su control.</p>,
        },
        {
          title: "6. Cancelación de citas",
          content: <p>En caso de necesitar cancelar o reprogramar una cita, le solicitamos comunicarse con al menos 24 horas de anticipación mediante WhatsApp al +57 314 312 7513 o por correo a {link("mailto:drterapia3@gmail.com", "drterapia3@gmail.com")}.</p>,
        },
        {
          title: "7. Legislación aplicable",
          content: <p>Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia derivada del uso de este sitio será resuelta conforme a la normativa colombiana vigente.</p>,
        },
        {
          title: "8. Contacto",
          content: <p>Para cualquier consulta relacionada con estos términos, puede contactarnos en {link("mailto:drterapia3@gmail.com", "drterapia3@gmail.com")} o al WhatsApp {link("https://wa.me/573143127513", "+57 314 312 7513")}.</p>,
        },
      ]}
    />
  );
}
