import { Usuario } from "./Usuario.js";
import { Publicacion } from "./Publicacion.js";
import { PublicacionVenta } from "./PublicacionVenta.js";
import { PublicacionServicio } from "./PublicacionServicio.js";

export class RepositorioPublicaciones {
  constructor() {
    this.publicaciones = [];
  }

  cargarDesde(datosJSON) {
    this.publicaciones = datosJSON.map(item => {
      // Recreamos la instancia de Usuario
      const usuario = new Usuario(item.autor.nombre, item.autor.email);

      // Reconstruimos la subclase adecuada según la propiedad 'tipo' del JSON
      switch (item.tipo) {
        case "venta":
          return new PublicacionVenta(
            item.titulo,
            item.descripcion,
            usuario,
            item.precio
          );
        case "servicio":
          return new PublicacionServicio(
            item.titulo,
            item.descripcion,
            usuario,
            item.tarifa
          );
        default:
          return new Publicacion(
            item.titulo,
            item.descripcion,
            usuario
          );
      }
    });
  }

  obtenerTodas() {
    return this.publicaciones;
  }
}