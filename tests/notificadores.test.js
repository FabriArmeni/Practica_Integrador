// tests/notificaciones.test.js
import { GestorNotificaciones } from "../src/GestorNotificaciones.js";
import { NotificadorWeb, NotificadorEmail } from "../src/Notificadores.js"; // Ajustá la ruta si los tenés por separado

test.each([
  [new NotificadorWeb(), "Notificación web: Tu publicación fue aprobada"],
  [new NotificadorEmail(), "Email enviado: Tu publicación fue aprobada"],
])("cada canal notifica según su propio formato", (notificador, esperado) => {
  const gestor = new GestorNotificaciones();
  expect(gestor.enviar(notificador, "Tu publicación fue aprobada")).toBe(esperado);
});