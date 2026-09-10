import { Publicacion } from "../src/Publicacion.js";
import { PublicacionVenta } from "../src/PublicacionVenta.js";
import { PublicacionServicio } from "../src/PublicacionServicio.js";
import { Usuario } from "../src/Usuario.js";


describe("Publicacion", () => {
 test("una publicación nueva comienza activa y sin etiquetas", () => {
 const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
 expect(publicacion.activa).toBe(true);
 expect(publicacion.etiquetas).toEqual([]);
 });
 test("agregarEtiqueta incorpora una etiqueta normalizada", () => {
 const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
 publicacion.agregarEtiqueta(" redes ");
 expect(publicacion.etiquetas).toEqual(["redes"]);
 });
 test("darDeBaja cambia activa a false", () => {
 const publicacion = new Publicacion("Ana", "Apuntes de Redes", "...");
 publicacion.darDeBaja();
 expect(publicacion.activa).toBe(false);
 });
 test("una publicación nueva comienza activa y sin etiquetas", () => {
    const autor = new Usuario("Ana", "ana@example.com");
    const publicacion = new Publicacion(autor, "Apuntes de Redes", "...");
    
    expect(publicacion.activa).toBe(true);
    expect(publicacion.etiquetas).toEqual([]);
  });

  test("agregarEtiqueta incorpora una etiqueta normalizada", () => {
    const autor = new Usuario("Ana", "ana@example.com");
    const publicacion = new Publicacion(autor, "Apuntes de Redes", "...");
    
    publicacion.agregarEtiqueta(" redes ");
    expect(publicacion.etiquetas).toEqual(["redes"]);
  });

  test("darDeBaja cambia activa a false", () => {
    const autor = new Usuario("Ana", "ana@example.com");
    const publicacion = new Publicacion(autor, "Apuntes de Redes", "...");
    
    publicacion.darDeBaja();
    expect(publicacion.activa).toBe(false);
  });

  // --- PARTE 5: REGLAS DE ETIQUETAS ---
  test("una etiqueta repetida no se agrega dos veces", () => {
    const autor = new Usuario("Ana", "ana@example.com");
    const publicacion = new Publicacion(autor, "Apuntes de Redes", "...");
    
    publicacion.agregarEtiqueta("redes");
    publicacion.agregarEtiqueta("redes");
    
    expect(publicacion.etiquetas).toEqual(["redes"]);
  });

  test("una etiqueta vacía lanza el error esperado", () => {
    const autor = new Usuario("Ana", "ana@example.com");
    const publicacion = new Publicacion(autor, "Apuntes de Redes", "...");
    
    expect(() => publicacion.agregarEtiqueta(" ")).toThrow("Etiqueta inválida");
  });

  test("tieneEtiqueta ignora mayúsculas y minúsculas", () => {
    const autor = new Usuario("Ana", "ana@example.com");
    const publicacion = new Publicacion(autor, "Apuntes de Redes", "...");
    
    publicacion.agregarEtiqueta("Redes");
    
    expect(publicacion.tieneEtiqueta("redes")).toBe(true);
  });
  test("cada subclase arma su propio resumen", () => {
    const venta = new PublicacionVenta("Ana", "Calculadora", "...", 5000);
    const servicio = new PublicacionServicio("Luis", "Clases de Álgebra", "...");

    expect(venta.mostrarResumen()).toContain("$5000");
    expect(servicio.mostrarResumen()).toContain("Clases de Álgebra");
  });
});
