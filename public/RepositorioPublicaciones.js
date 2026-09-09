/*import { EventEmitter } from "node:events";*/

class RepositorioPublicaciones /*extends EventEmitter*/{
    constructor(){
        super()
        this.publicaciones = []
    }
    agregar(publicacion){
        this.publicaciones.push(publicacion);
        this.emit("publicacionAgregada", publicacion)
    }
    buscarPorUsuario(nombre){
        return this.publicaciones.filter(publis => {
            return publis.autor.nombre === nombre
        })
        }
    filtrarActivas(){
        return this.publicaciones.filter(publis => publis.estaActiva())
    }
    cantidadTotal(){
        return this.publicaciones.length;   
    }
    publicacionesRecientesYActivas(publicaciones, dias) {
    const ahora = new Date();
    const fechaLimite = new Date(ahora.getTime() - (dias * 24 * 60 * 60 * 1000));

    return publicaciones
        .filter(publi => publi.estaActiva())
        .filter(publi => new Date(publi.fechaPublicacion) >= fechaLimite);
    }

    listarPorTipo(claseConstructor) {
        return this.publicaciones.filter(publi => publi instanceof claseConstructor);
    }

    listarResumenes() {
        return this.publicaciones.map(publi => publi.mostrarResumen());
    }

    filtrarPorTipo(claseConstructor) {
        return this.publicaciones.filter(p => p instanceof claseConstructor)
    }
}


export default RepositorioPublicaciones;