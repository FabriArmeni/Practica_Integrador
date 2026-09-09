class Publicacion {
    constructor(titulo, descripcion, autor){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.autor = autor //objeto Usuario;
        this.fechaPublicacion = new Date();
        this.activa = true;
        this.listaResenias = []
    }

    mostrarResumen(){
        return `Titulo: ${this.titulo}, Autor: ${this.autor.nombre}`
    }

    estaActiva(){
        return this.activa;
    }
    esDeAutor(nombre){
        return this.autor.nombre === nombre;
    }
    agregarResenia(resenia){
        this.listaResenias.push(resenia);
    }
    promedioPuntaje() {
        if (this.listaResenias.length === 0) return 0;

        let sumaTotal = 0;
        this.listaResenias.forEach(reseña => {
            sumaTotal += reseña.puntaje;
        });

        return sumaTotal / this.listaResenias.length;
    }
}


export default Publicacion;