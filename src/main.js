// 1. IMPORTACIONES
/*import { Usuario } from "./Usuario.js";
import { PublicacionVenta } from "./PublicacionVenta.js";
import { PublicacionServicio } from "./PublicacionServicio.js";
import { repositorio } from "./RepositorioPublicaciones.js"; 

// 2. REFERENCIAS AL DOM
const formulario = document.querySelector("#form-publicacion");
const contenedorPublicaciones = document.querySelector("#lista-publicaciones");
const estado = document.querySelector("#estado");
const vistaPrevia = document.querySelector("#vista-previa");
const contadorContenido = document.querySelector("#contador");

const inputTitulo = document.querySelector("#titulo");
const inputDescripcion = document.querySelector("#descripcion");
const inputAutor = document.querySelector("#autor");
const inputEmail = document.querySelector("#email");
const selectTipo = document.querySelector("#tipo");
const inputPrecio = document.querySelector("#precio");

const botonEnviar = document.querySelector("#btn-enviar");
const botonActualizar = document.querySelector("#btn-actualizar");
const botonForzarError = document.querySelector("#btn-forzar-error");

const errorTitulo = document.querySelector("#error-titulo");
const errorAutor = document.querySelector("#error-autor");
const errorPrecio = document.querySelector("#error-precio");

// UTILERÍA
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 3. FÁBRICA DE OBJETOS
function crearPublicacionDesdeFormulario() {
  const usuario = new Usuario(inputAutor.value, inputEmail.value);

  if (selectTipo.value === "venta") {
    return new PublicacionVenta(
      inputTitulo.value,
      inputDescripcion.value,
      usuario,
      Number(inputPrecio ? inputPrecio.value : 0)
    );
  }

  const inputTarifa = document.querySelector("#tarifa");
  return new PublicacionServicio(
    inputTitulo.value,
    inputDescripcion.value,
    usuario,
    Number(inputTarifa ? inputTarifa.value : 0)
  );
}

// 4. RENDERING Y CARGA ASÍNCRONA
function renderizarPublicaciones() {
  contenedorPublicaciones.innerHTML = "";
  repositorio.obtenerTodas().forEach(pub => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-publicacion");
    tarjeta.dataset.id = pub.id;

    tarjeta.innerHTML = `
      <h3>${pub.titulo}</h3>
      <p><strong>Autor:</strong> ${pub.autor.nombre} (${pub.autor.email})</p>
      <p>${pub.descripcion}</p>
      <div class="resumen-polimorfico">${pub.mostrarResumen()}</div>
    `;
    contenedorPublicaciones.appendChild(tarjeta);
  });
}

async function cargarPublicaciones(forzarError = false) {
  estado.textContent = "Cargando publicaciones...";
  botonActualizar.disabled = true;

  try {
    const url = forzarError ? "/api/publicaciones?error=1" : "/api/publicaciones";
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
      throw new Error("La respuesta no fue exitosa");
    }

    const datos = await respuesta.json();
    repositorio.cargarDesde(datos);
    renderizarPublicaciones();
    estado.textContent = `${datos.length} publicaciones recibidas`;
  } catch (error) {
    estado.textContent = `Error: ${error.message}`;
  } finally {
    botonActualizar.disabled = false;
  }
}

// 5. VALIDACIONES REACTIVAS
function validarTitulo(mostrarError = true) {
  const valido = inputTitulo.value.trim().length >= 5;
  inputTitulo.classList.toggle("valido", valido);
  inputTitulo.classList.toggle("invalido", !valido && mostrarError);
  if (errorTitulo) {
    errorTitulo.textContent = !valido && mostrarError ? "Ingrese al menos 5 caracteres" : "";
  }
  return valido;
}

function validarAutor(mostrarError = true) {
  const valido = inputAutor.value.trim().length >= 3;
  inputAutor.classList.toggle("valido", valido);
  inputAutor.classList.toggle("invalido", !valido && mostrarError);
  if (errorAutor) {
    errorAutor.textContent = !valido && mostrarError ? "Ingrese al menos 3 caracteres" : "";
  }
  return valido;
}

function validarPrecio(mostrarError = true) {
  if (selectTipo.value !== "venta") {
    if (inputPrecio) inputPrecio.classList.remove("valido", "invalido");
    if (errorPrecio) errorPrecio.textContent = "";
    return true;
  }

  const valor = Number(inputPrecio ? inputPrecio.value : 0);
  const valido = !isNaN(valor) && valor > 0;

  if (inputPrecio) {
    inputPrecio.classList.toggle("valido", valido);
    inputPrecio.classList.toggle("invalido", !valido && mostrarError);
  }

  if (errorPrecio) {
    errorPrecio.textContent = !valido && mostrarError ? "El precio debe ser mayor a 0" : "";
  }
  return valido;
}

function formularioValido() {
  return validarTitulo(false) && validarAutor(false) && validarPrecio(false);
}

function actualizarEstadoFormulario() {
  botonEnviar.disabled = !formularioValido();
}

// 6. VISTA PREVIA INCREMENTAL
function actualizarVistaPrevia() {
  if (contadorContenido) {
    contadorContenido.textContent = inputDescripcion.value.length;
  }
  if (vistaPrevia) {
    const tituloTexto = inputTitulo.value || "Sin título";
    const autorTexto = inputAutor.value || "...";
    vistaPrevia.textContent = `${tituloTexto} — ${autorTexto} (${selectTipo.value})`;
  }
}

// 7. MANEJO DE ENVÍO ASÍNCRONO
async function manejarEnvio(evento) {
  evento.preventDefault();

  if (!validarTitulo(true) || !validarAutor(true) || !validarPrecio(true)) {
    return;
  }

  botonEnviar.disabled = true;
  estado.textContent = "Publicando...";

  try {
    await esperar(800);
    const publicacion = crearPublicacionDesdeFormulario();
    repositorio.agregar(publicacion);
    renderizarPublicaciones();
    
    estado.textContent = "Publicación agregada";
    formulario.reset();
    actualizarVistaPrevia();
  } catch (error) {
    estado.textContent = `Error: ${error.message}`;
  } finally {
    actualizarEstadoFormulario();
  }
}

// 8. REGISTRO DE EVENTOS CONSOLIDADO

// Carga asíncrona de publicaciones
botonActualizar?.addEventListener("click", () => cargarPublicaciones(false));
botonForzarError?.addEventListener("click", () => cargarPublicaciones(true));

// Actualización en tiempo real (input)
formulario.addEventListener("input", () => {
  actualizarEstadoFormulario();
});

[inputTitulo, inputAutor, inputDescripcion, selectTipo].forEach(control => {
  control?.addEventListener("input", () => {
    actualizarVistaPrevia();
  });
});

inputTitulo.addEventListener("input", () => validarTitulo(false));
inputAutor.addEventListener("input", () => validarAutor(false));

if (inputPrecio) {
  inputPrecio.addEventListener("input", () => validarPrecio(false));
}

selectTipo.addEventListener("change", () => {
  validarPrecio(false);
  actualizarEstadoFormulario();
  actualizarVistaPrevia();
});

// Muestra de errores al salir del campo (blur)
inputTitulo.addEventListener("blur", () => validarTitulo(true));
inputAutor.addEventListener("blur", () => validarAutor(true));

if (inputPrecio) {
  inputPrecio.addEventListener("blur", () => validarPrecio(true));
}
*/
/*
// main.js
import { Reporte } from "./Reporte.js";

// --- Caso Válido ---
try {
  const reporteValido = new Reporte("Carlos", " Contenido inapropiado ");
  console.log("✅ Reporte creado exitosamente:", reporteValido);
} catch (error) {
  console.error("❌ Error inesperado:", error.message);
}

// --- Caso Inválido (Motivo vacío) ---
try {
  const reporteInvalido = new Reporte("Ana", "   ");
  console.log("✅ Reporte creado exitosamente:", reporteInvalido);
} catch (error) {
  console.log("⚠️ Captura esperada:", error.message); 
  // Muestra: ⚠️ Captura esperada: Motivo inválido
}*/
 /*
// src/main.js
import { Publicacion } from "./Publicacion.js";

const pub = new Publicacion("Ana", "Calculadora", "En buen estado");

// 1. Primer reporte
pub.reportar("Carlos", "Spam");
console.log("Reportes actuales:", pub.reportes.length); // 1
console.log("¿Requiere revisión?:", pub.requiereRevision()); // false

// 2. Intento de reporte duplicado por el mismo usuario
try {
  pub.reportar("Carlos", "Otro motivo");
} catch (error) {
  console.log("⚠️ Captura esperada:", error.message); 
  // Muestra: ⚠️ Captura esperada: El usuario ya reportó esta publicación
}

// 3. Agregar 2 reportes de usuarios distintos para alcanzar el umbral (3)
pub.reportar("Laura", "Contenido ofensivo");
pub.reportar("Pedro", "Información falsa");

console.log("Reportes acumulados:", pub.reportes.length); // 3
console.log("¿Requiere revisión?:", pub.requiereRevision()); // true
*/


/*
// src/main.js
import { Publicacion } from "./Publicacion.js";
import { RepositorioPublicaciones } from "./RepositorioPublicaciones.js";

const repo = new RepositorioPublicaciones();

const pub1 = new Publicacion("Ana", "Calculadora", "...");
const pub2 = new Publicacion("Luis", "Libro de Álgebra", "...");

repo.agregar(pub1);
repo.agregar(pub2);

// Reportamos pub1 hasta que requiera revisión (3 reportes)
pub1.reportar("User1", "Spam");
pub1.reportar("User2", "Spam");
pub1.reportar("User3", "Spam");

console.log("Pendientes de revisión:", repo.pendientesDeRevision().length); // 1

// Si pub1 se da de baja, ya no debe figurar en la lista
pub1.darDeBaja();
console.log("Pendientes tras dar de baja:", repo.pendientesDeRevision().length); // 0
*/

// src/main.js
import { NotificadorWeb, NotificadorEmail } from "./Notificadores.js";

// Lista de notificadores que cumplen el contrato público
const canales = [new NotificadorWeb(), new NotificadorEmail()];

const mensaje = "Tu publicación requiere revisión";

// Probamos la invocación polimórfica
canales.forEach(canal => {
  console.log(canal.notificar(mensaje));
});