import { Link } from "wouter";

const GREEN = "#2d5a27";

export default function PoliticaCookies() {
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
        <h1 className="font-serif font-bold text-4xl mb-2" style={{ color: "#0a0a0a" }}>Política de Cookies</h1>
        <div className="h-[2px] w-16 mb-8" style={{ background: GREEN }} />
        <p className="font-serif text-sm mb-10" style={{ color: "#777" }}>Última actualización: junio de 2026</p>

        <div className="space-y-8 font-serif" style={{ color: "#444", lineHeight: 1.9, fontSize: "0.95rem" }}>
          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>1. ¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten que el sitio recuerde sus preferencias y mejora su experiencia de navegación.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>2. Cookies que utilizamos</h2>
            <p>Este sitio web puede utilizar los siguientes tipos de cookies:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Cookies técnicas o esenciales:</strong> necesarias para el funcionamiento básico del sitio. Sin ellas, algunos servicios no pueden prestarse correctamente.</li>
              <li><strong>Cookies de análisis:</strong> nos permiten conocer cómo los usuarios navegan por el sitio, para mejorar su funcionalidad. Los datos obtenidos son anónimos.</li>
              <li><strong>Cookies de terceros:</strong> servicios como Google Maps integrados en el sitio pueden establecer sus propias cookies. Consulte las políticas de privacidad de dichos servicios para más información.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>3. Gestión de cookies</h2>
            <p>Al acceder a este sitio, se le mostrará un aviso de cookies que le permite aceptarlas o rechazarlas. Además, puede configurar su navegador para bloquear o eliminar cookies en cualquier momento:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Google Chrome: Configuración → Privacidad y seguridad → Cookies</li>
              <li>Mozilla Firefox: Opciones → Privacidad y seguridad</li>
              <li>Safari: Preferencias → Privacidad</li>
              <li>Microsoft Edge: Configuración → Privacidad, búsqueda y servicios</li>
            </ul>
            <p className="mt-3">Tenga en cuenta que rechazar las cookies puede afectar la funcionalidad del sitio.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>4. Base legal</h2>
            <p>El uso de cookies se fundamenta en su consentimiento, otorgado a través del aviso que aparece al ingresar al sitio, de conformidad con la normativa colombiana vigente (Ley 1581 de 2012 y Decreto 1377 de 2013).</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>5. Actualización de esta política</h2>
            <p>Esta política puede actualizarse para reflejar cambios en las prácticas de cookies o en la legislación aplicable. Le recomendamos revisarla periódicamente.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-3" style={{ color: "#0a0a0a" }}>6. Contacto</h2>
            <p>Si tiene dudas sobre nuestra política de cookies, puede contactarnos en <a href="mailto:drterapia3@gmail.com" className="underline underline-offset-2" style={{ color: GREEN }}>drterapia3@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
