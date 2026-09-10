// src/Notificadores.js

export class NotificadorWeb {
  notificar(mensaje) {
    return `Notificación web: ${mensaje}`;
  }
}

export class NotificadorEmail {
  notificar(mensaje) {
    return `Email enviado: ${mensaje}`;
  }
}