const PHONE = "573143127513";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Buenos días";
  if (hour >= 12 && hour < 19) return "Buenas tardes";
  return "Buenas noches";
}

export function getWhatsAppUrl(): string {
  const greeting = getGreeting();
  const message =
    `${greeting}, me comunico para solicitar información sobre los servicios del Dr. Mario Sánchez. ` +
    `Me gustaría agendar una consulta y conocer la disponibilidad para programar una cita. ` +
    `Quedo atento/a a su respuesta. Muchas gracias.`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
