// En tu archivo Publicacion.js
class Publicacion {
  constructor(titulo, descripcion, autor) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.autor = autor; // objeto Usuario
    this.activa = true;
    this.destacada = false;
  }

  // Getter solicitado para la vista previa
  get resumen() {
    const estadoTexto = !this.activa ? "Baja" : (this.destacada ? "Destacada" : "Activa");
    const nombreAutor = this.autor?.nombre || this.autor || "Sin autor";
    return `${nombreAutor} — ${this.titulo || "Sin título"} (${estadoTexto})`;
  }
}