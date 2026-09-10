import { RepositorioPublicaciones } from "../src/RepositorioPublicaciones.js";
import { Publicacion } from "../src/Publicacion.js";


describe("RepositorioPublicaciones", () => {
    /*test("buscarPorEtiqueta devuelve coincidencias activas", () => {
        const repositorio = new RepositorioPublicaciones();
        const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
        publicacion.agregarEtiqueta("redes");
        repositorio.agregar(publicacion);
        expect(repositorio.buscarPorEtiqueta("redes")).toEqual([publicacion]);
    });
    test("una publicación dada de baja queda excluida", () => {
        const repositorio = new RepositorioPublicaciones();
        const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
        publicacion.agregarEtiqueta("redes");
        publicacion.darDeBaja();
        repositorio.agregar(publicacion);
        expect(repositorio.buscarPorEtiqueta("redes")).toEqual([]);
    });
        test("una etiqueta inexistente devuelve un arreglo vacío", () => {
        const repositorio = new RepositorioPublicaciones();
        expect(repositorio.buscarPorEtiqueta("inexistente")).toEqual([]);
    });*/
    test("pendientesDeRevision devuelve solo publicaciones activas que requieren revisión", () => {
  const repo = new RepositorioPublicaciones();
  const pub = new Publicacion("Ana", "Apuntes", "...");
  
  pub.reportar("U1", "Motivo 1");
  pub.reportar("U2", "Motivo 2");
  pub.reportar("U3", "Motivo 3");
  repo.agregar(pub);

  expect(repo.pendientesDeRevision()).toEqual([pub]);
});

test("pendientesDeRevision excluye publicaciones dadas de baja", () => {
  const repo = new RepositorioPublicaciones();
  const pub = new Publicacion("Ana", "Apuntes", "...");
  
  pub.reportar("U1", "Motivo 1");
  pub.reportar("U2", "Motivo 2");
  pub.reportar("U3", "Motivo 3");
  pub.darDeBaja();
  repo.agregar(pub);

  expect(repo.pendientesDeRevision()).toEqual([]);
});
});
