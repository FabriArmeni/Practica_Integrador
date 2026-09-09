// 1. IMPORTACIÓN DE CLASES DEL DOMINIO
import { Usuario } from "./Usuario.js";
import { PublicacionVenta } from "./PublicacionVenta.js";
import { PublicacionServicio } from "./PublicacionServicio.js";

// 2. REFERENCIAS Y COLECCIÓN (Coincidentes con el HTML de la Parte 1)
const publicaciones = [];

const formulario = document.querySelector("#form-publicacion");
const contenedorPublicaciones = document.querySelector("#lista-publicaciones");

const inputTitulo = document.querySelector("#titulo");
const inputDescripcion = document.querySelector("#descripcion");
const inputAutor = document.querySelector("#autor");
const inputEmail = document.querySelector("#email");
const selectTipo = document.querySelector("#tipo");
const camposEspecificos = document.querySelector("#campos-especificos");

function observarClick(evento) {
 console.log("target", evento.target);
 console.log("currentTarget", evento.currentTarget);
}
lista.addEventListener("click", observarClick);


// 3. FUNCIÓN QUE INSTANCIA MODELOS (FABRICA OBJETOS SEGÚN EL TIPO)
function crearPublicacionDesdeFormulario() {
  const usuario = new Usuario(inputAutor.value, inputEmail.value);

  if (selectTipo.value === "venta") {
    const inputPrecio = document.querySelector("#precio");
    return new PublicacionVenta(
      inputTitulo.value,
      inputDescripcion.value,
      usuario,
      Number(inputPrecio ? inputPrecio.value : 0)
    );
  }

  // Si es servicio
  const inputTarifa = document.querySelector("#tarifa");
  return new PublicacionServicio(
    inputTitulo.value,
    inputDescripcion.value,
    usuario,
    Number(inputTarifa ? inputTarifa.value : 0)
  );
}

// 4. RENDERING POLIMÓRFICO
function agregarTarjeta(publicacion) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta-publicacion");

  tarjeta.innerHTML = `
    <h3>${publicacion.titulo}</h3>
    <p><strong>Autor:</strong> ${publicacion.autor.nombre} (${publicacion.autor.email})</p>
    <p>${publicacion.descripcion}</p>
    <div class="resumen-polimorfico">
      ${publicacion.mostrarResumen()}
    </div>
  `;

  contenedorPublicaciones.appendChild(tarjeta);
}

// 5. HANDLER DEL FORMULARIO
function manejarEnvio(evento) {
  evento.preventDefault();

  const publicacion = crearPublicacionDesdeFormulario();
  publicaciones.push(publicacion);

  agregarTarjeta(publicacion);

  formulario.reset();
}

// 6. REGISTRO DE EVENTO SUBMIT
formulario.addEventListener("submit", manejarEnvio);