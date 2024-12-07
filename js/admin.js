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

let listaProductos = [];

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
  guardarLocalStorage()
}

function limpiarFormulario(){
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

function guardarLocalStorage(){
  localStorage.setItem("arrayProductosKey", JSON.stringify(listaProductos))
}