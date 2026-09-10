import { Publicacion } from "./Publicacion.js";

export class PublicacionServicio extends Publicacion {
    constructor(autor, titulo, descripcion, cliente,modalidad, duracion) {
        super(titulo, descripcion, autor)
        this.cliente = cliente; //objeto usuario
        this.modalidad = modalidad;
        this.duracion = duracion;
    }
    mostrarResumen(){
        return `${super.mostrarResumen()},cliente: ${this.cliente}, modalidad: ${this.modalidad}, duracion: ${this.duracion}`;
    }
}
