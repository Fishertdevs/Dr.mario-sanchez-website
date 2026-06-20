import PolicyLayout from "@/components/layout/PolicyLayout";

const GREEN = "#2d5a27";

const link = (href: string, text: string) => (
  <a href={href} className="underline underline-offset-2" style={{ color: GREEN }}>{text}</a>
);

export default function PoliticaPrivacidad() {
  return (
    <PolicyLayout
      title="Política de Privacidad"
      sections={[
        {
          title: "1. Responsable del tratamiento",
          content: <p>El responsable del tratamiento de sus datos personales es el Dr. Mario Sánchez, Terapeuta Respiratorio y Salubrista Público, con correo de contacto {link("mailto:drterapia3@gmail.com", "drterapia3@gmail.com")}, con sede en Bogotá, Colombia.</p>,
        },
        {
          title: "2. Datos que recopilamos",
          content: (
            <>
              <p>Podemos recopilar los siguientes datos personales cuando usted utiliza nuestros servicios o se comunica con nosotros:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono o WhatsApp</li>
                <li>Información de salud relacionada con su consulta médica</li>
                <li>Fecha y motivo de la consulta solicitada</li>
              </ul>
            </>
          ),
        },
        {
          title: "3. Finalidad del tratamiento",
          content: (
            <>
              <p>Sus datos personales son utilizados exclusivamente para:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Gestionar y confirmar citas médicas</li>
                <li>Brindar orientación en salud respiratoria y pública</li>
                <li>Enviar información relevante sobre su tratamiento o seguimiento</li>
                <li>Cumplir con obligaciones legales aplicables en Colombia</li>
              </ul>
            </>
          ),
        },
        {
          title: "4. Base legal",
          content: <p>El tratamiento de sus datos se realiza con base en su consentimiento expreso, la ejecución de una relación de atención en salud y el cumplimiento de obligaciones legales conforme a la Ley 1581 de 2012 (Ley de Protección de Datos Personales de Colombia).</p>,
        },
        {
          title: "5. Conservación de datos",
          content: <p>Sus datos serán conservados durante el tiempo necesario para cumplir con las finalidades descritas y conforme a los plazos establecidos por la normativa colombiana en materia de registros clínicos y de salud.</p>,
        },
        {
          title: "6. Sus derechos",
          content: <p>Conforme a la Ley 1581 de 2012, usted tiene derecho a conocer, actualizar, rectificar y suprimir sus datos personales. Para ejercer sus derechos, escríbanos a {link("mailto:drterapia3@gmail.com", "drterapia3@gmail.com")}.</p>,
        },
        {
          title: "7. Cambios en esta política",
          content: <p>Nos reservamos el derecho de actualizar esta política en cualquier momento. Cualquier cambio será publicado en esta misma página con la fecha de actualización correspondiente.</p>,
        },
      ]}
    />
  );
}
