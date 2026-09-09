import Publicacion from "./Publicacion.js";

class PublicacionVenta extends Publicacion {
    constructor(titulo, descripcion, autor, precio) {
        super(titulo, descripcion,autor)

        this.precio = precio;
        this.stock = 1;
        
    }
    mostrarResumen(){
        return `${super.mostrarResumen()}, precio: ${this.precio}`;
    }
}

export default PublicacionVenta;