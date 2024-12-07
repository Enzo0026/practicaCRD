import {
  campoRequerido,
  validarNumeros,
  validarURL,
  validarGeneral,
} from "./validaciones.js";

import { Producto } from "./productoClass.js";

//Traigo los elementos que necesito del html
let campoCodigo = document.getElementById("codigo");

let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoURL = document.getElementById("URL");

let formProductos = document.querySelector("#formProductos");

let productoExistente = false; //Variable bandera: si productoExistente es false, quiero crear,
//si es true, quiero modificar el producto existente

//Si hay productos en localStorage quiero guardarlos en listaProductos, si no listaProductos sea un array vacío
let listaProductos = JSON.parse(localStorage.getItem("arrayProductosKey")) || [];

//Asociar un evento a cada elemento obtenido

campoCodigo.addEventListener("blur", () => {
  console.log("Desde código");
  campoRequerido(campoCodigo);
});
campoProducto.addEventListener("blur", () => {
  console.log("Desde producto");
  campoRequerido(campoProducto);
});
campoDescripcion.addEventListener("blur", () => {
  console.log("Desde descripción");
  campoRequerido(campoDescripcion);
});
campoCantidad.addEventListener("blur", () => {
  console.log("Desde cantidad");
  validarNumeros(campoCantidad);
});
campoURL.addEventListener("blur", () => {
  console.log("Desde URL");
  validarURL(campoURL);
});

formProductos.addEventListener("submit", guardarProducto);

//Llamo a la función cargaInicial(): si tengo productos en el localStorage, los muestre en la tabla

cargaInicial()

//Empieza la lógica del CRUD

function guardarProducto(event) {
  //.preventDefault sirve para prevenir la actualización de la página
  event.preventDefault();
  //Verificar que todos los datos sean válidos
  if (
    validarGeneral(
      campoCodigo,
      campoProducto,
      campoDescripcion,
      campoCantidad,
      campoURL
    )
  ) {
    if (!productoExistente) {
      //Crear producto
      crearProducto();
    } else {
      //Modificar producto
      modificarProducto();
    }
  }
}

function crearProducto() {
  //crear un objeto producto
  let productoNuevo = new Producto(
    campoCodigo.value,
    campoProducto.value,
    campoDescripcion.value,
    campoCantidad.value,
    campoURL.value
  );
  //Guardar cada objeto (producto) en un array de productos
  listaProductos.push(productoNuevo);
  //Limpiar formulario
  limpiarFormulario();
  //Guardar el array de productos dentro de LocalStorage
  guardarLocalStorage();
  //Cargar el producto a la tabla
  crearFila(productoNuevo);
}

function limpiarFormulario() {
  //Limpiamos los value del formulario
  formProductos.reset();
  //Resetear las clases de los input
  campoCodigo.className = "form-control";
  campoProducto.className = "form-control";
  campoDescripcion.className = "form-control";
  campoCantidad.className = "form-control";
  campoURL.className = "form-control";
  //Resetear la variable bandera o booleana para el caso de modificarProducto
  productoExistente = false;
}

function guardarLocalStorage() {
  localStorage.setItem("arrayProductosKey", JSON.stringify(listaProductos));
}

function crearFila(producto) {
  let tablaProductos = document.querySelector("#tablaProductos");
  //Usando el operador de asignación de adición vamos a concatenar al contenido del tbody una fila
  tablaProductos.innerHTML += `<tr>
      <td scope="col">${producto.codigo}</td>
      <td scope="col">${producto.producto}</td>
      <td scope="col">${producto.descripcion}</td>
      <td scope="col">${producto.cantidad}</td>
      <td scope="col">${producto.url}</td>
      <td> <button class="btn btn-warning mb-3" onclick ="prepararEdicionProducto()">
          Editar
        </button>
        <button class="btn btn-danger mb-3" onclick="borrarProducto()">
          Eliminar
        </button>
      </td>
    </tr>`;
}


function cargaInicial(){
  if (listaProductos.length > 0) {
    //Crear las filas
    //listaProductos.forEach((itemProducto)=> crearFila(itemProducto))
    listaProductos.map((itemProducto)=> crearFila(itemProducto))
    
  }
}