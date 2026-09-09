import Publicacion from "./Publicacion.js";

class PublicacionServicio extends Publicacion {
    constructor(titulo, descripcion, autor, cliente,modalidad, duracion) {
        super(titulo, descripcion, autor)
        this.cliente = cliente; //objeto usuario
        this.modalidad = modalidad;
        this.duracion = duracion;
    }
    mostrarResumen(){
        return `${super.mostrarResumen()},cliente: ${this.cliente}, modalidad: ${this.modalidad}, duracion: ${this.duracion}`;
    }
}

export default PublicacionServicio;