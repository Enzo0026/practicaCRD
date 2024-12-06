import {
  campoRequerido,
  validarNumeros,
  validarURL,
  validarGeneral,
} from "./validaciones.js";

//Traigo los elementos que necesito del html
let campoCodigo = document.getElementById("codigo");

console.log(campoCodigo);

let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoURL = document.getElementById("URL");

let formProductos = document.querySelector("#formProductos");

let productoExistente = false; //Variable bandera: si productoExistente es false, quiero crear, 
//si es true, quiero modificar el producto existente

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
      crearProducto()
    }else {
      //Modificar producto
      modificarProducto()
    }
  }
}
