// En tu archivo Publicacion.js
import { Reporte } from "./Reporte.js"

export class Publicacion {
  constructor(titulo, descripcion, autor) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.autor = autor; // objeto Usuario
    this.activa = true;
    this.destacada = false;
    this.etiquetas = [];

    this.reportes = [];
    this.estado = "pendiente";
  }

  agregarEtiqueta(etiqueta){
    const normalizada = etiqueta.trim().toLowerCase();
    if (!normalizada) {
        throw new Error("Etiqueta inválida")
    }
    const yaExiste = this.tieneEtiqueta(normalizada);
    if (!yaExiste) {
        this.etiquetas.push(normalizada);
    }
}

  tieneEtiqueta(etiqueta){
    const buscada = etiqueta.trim().toLowerCase();
    return this.etiquetas.some(e => e.toLowerCase() === buscada);
  }

  darDeBaja(){
    this.activa = false;
  }

  mostrarResumen() {
    return this.resumen;
  }

  reportar(usuario, motivo){
    const yaReporto = this.reportes.some(r => r.usuario === usuario);
    if (yaReporto) {
      throw new Error("El usuario ya reporto esta publicacion")
    }
    this.reportes.push(new Reporte(usuario, motivo))
  }

  requiereRevision(){
    return this.reportes.length >= 3;
  }


  // Getter solicitado para la vista previa
  get resumen() {
    const estadoTexto = !this.activa ? "Baja" : (this.destacada ? "Destacada" : "Activa");
    const nombreAutor = this.autor?.nombre || this.autor || "Sin autor";
    return `${nombreAutor} — ${this.titulo || "Sin título"} (${estadoTexto})`;
  }
}
