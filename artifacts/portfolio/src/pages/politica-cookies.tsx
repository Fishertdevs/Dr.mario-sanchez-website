import PolicyLayout from "@/components/layout/PolicyLayout";

const GREEN = "#1565C0";

const link = (href: string, text: string) => (
  <a href={href} className="underline underline-offset-2" style={{ color: GREEN }}>{text}</a>
);

export default function PoliticaCookies() {
  return (
    <PolicyLayout
      title="Política de Cookies"
      sections={[
        {
          title: "1. ¿Qué son las cookies?",
          content: <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten que el sitio recuerde sus preferencias y mejoran su experiencia de navegación.</p>,
        },
        {
          title: "2. Cookies que utilizamos",
          content: (
            <>
              <p>Este sitio web puede utilizar los siguientes tipos de cookies:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Cookies técnicas o esenciales:</strong> necesarias para el funcionamiento básico del sitio.</li>
                <li><strong>Cookies de análisis:</strong> nos permiten conocer cómo los usuarios navegan por el sitio para mejorarlo. Los datos obtenidos son anónimos.</li>
                <li><strong>Cookies de terceros:</strong> servicios como Google Maps integrados en el sitio pueden establecer sus propias cookies.</li>
              </ul>
            </>
          ),
        },
        {
          title: "3. Gestión de cookies",
          content: (
            <>
              <p>Al acceder a este sitio, se le mostrará un aviso de cookies. Además, puede configurar su navegador para bloquear o eliminar cookies:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Google Chrome: Configuración → Privacidad y seguridad → Cookies</li>
                <li>Mozilla Firefox: Opciones → Privacidad y seguridad</li>
                <li>Safari: Preferencias → Privacidad</li>
                <li>Microsoft Edge: Configuración → Privacidad, búsqueda y servicios</li>
              </ul>
              <p className="mt-2">Tenga en cuenta que rechazar las cookies puede afectar la funcionalidad del sitio.</p>
            </>
          ),
        },
        {
          title: "4. Base legal",
          content: <p>El uso de cookies se fundamenta en su consentimiento, otorgado a través del aviso que aparece al ingresar al sitio, de conformidad con la normativa colombiana vigente (Ley 1581 de 2012 y Decreto 1377 de 2013).</p>,
        },
        {
          title: "5. Actualización de esta política",
          content: <p>Esta política puede actualizarse para reflejar cambios en las prácticas de cookies o en la legislación aplicable. Le recomendamos revisarla periódicamente.</p>,
        },
        {
          title: "6. Contacto",
          content: <p>Si tiene dudas sobre nuestra política de cookies, puede contactarnos en {link("mailto:drterapia3@gmail.com", "drterapia3@gmail.com")}.</p>,
        },
      ]}
    />
  );
}
