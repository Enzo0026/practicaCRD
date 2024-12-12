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
let btnNuevo = document.getElementById("btnNuevo");
let btnDatosPrueba = document.getElementById("btnDatosPrueba")

let productoExistente = false; //Variable bandera: si productoExistente es false, quiero crear,
//si es true, quiero modificar el producto existente

//Si hay productos en localStorage quiero guardarlos en listaProductos, si no listaProductos sea un array vacío
let listaProductos =
  JSON.parse(localStorage.getItem("arrayProductosKey")) || [];

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
btnNuevo.addEventListener("click", limpiarFormulario);
btnDatosPrueba.addEventListener("click", cargarDatosPrueba)
//Llamo a la función cargaInicial(): si tengo productos en el localStorage, los muestre en la tabla

cargaInicial();

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
  //Tarea: invocar una función codigoUnico() ---> retornar un código único
  //const codUnico = codigoUnico
  //El input código tiene que ser de solo lectura ---> agregar disable

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
  //Mostrar cartel al usuario.
  Swal.fire({
    title: "Producto creado",
    text: "Su producto fue creado correctamente!",
    icon: "success",
  });
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
      <td><button class="btn btn-warning mb-3" onclick="prepararEdicionProducto('${producto.codigo}')">
          Editar
        </button>
        <button class="btn btn-danger mb-3" onclick="borrarProducto('${producto.codigo}')">
          Eliminar
        </button>
      </td>
    </tr>`;
}

function cargaInicial() {
  if (listaProductos.length > 0) {
    //Crear las filas
    //listaProductos.forEach((itemProducto)=> crearFila(itemProducto))
    listaProductos.map((itemProducto) => crearFila(itemProducto));
  }
}
//Como quiero invocar a la función desde HTML, no puedo acceder a ella => la agrego como metódo de
//el objeto global window, así este accesible a todos los documentos
/* function prepararEdicionProducto(){
} */

window.prepararEdicionProducto = function (codigo) {
  //Buscar el producto en el array de productos
  let productoBuscado = listaProductos.find(
    (itemProducto) => itemProducto.codigo === codigo
  );
  //Mostrar el producto en el formulario. No se debe poder editar el código
  campoCodigo.value = productoBuscado.codigo;
  campoProducto.value = productoBuscado.producto;
  campoDescripcion.value = productoBuscado.descripcion;
  campoCantidad.value = productoBuscado.cantidad;
  campoURL.value = productoBuscado.url;

  //Modificar la variable bandera productoExistente
  productoExistente = true;
};

function modificarProducto() {
  Swal.fire({
    title: "Seguro que desea editar este producto?",
    text: "Puede volve a editar este producto si lo desea!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //Encontrar la posición del elemento que quiero modificar dentro de mi array de productos
      let indiceProducto = listaProductos.findIndex(
        (itemProducto) => itemProducto.codigo === campoCodigo.value
      );
      //Modificar los valores del elemento del array
      listaProductos[indiceProducto].producto = campoProducto.value;
      listaProductos[indiceProducto].descripcion = campoDescripcion.value;
      listaProductos[indiceProducto].cantidad = campoCantidad.value;
      listaProductos[indiceProducto].url = campoURL.value;

      //Actualizar el localStorage
      guardarLocalStorage();
      //Actualizar la tabla
      borrarTabla();
      cargaInicial();

      //Mostrar un cartel al usuario
      Swal.fire({
        title: "Producto modificado",
        text: "Su producto fue modificado correctamente!",
        icon: "success",
      });

      //Limpiar el formulario y resetear la variable bandera
      limpiarFormulario();
    }
  });
}

function borrarTabla() {
  let tablaProductos = document.querySelector("#tablaProductos");
  tablaProductos.innerHTML = "";
}

window.borrarProducto = function (codigo) {
  Swal.fire({
    title: "Seguro que desea eliminar este producto?",
    text: "La acción no podrá revertirse!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //Opción 1: encontrar la posición o el índice del elemento en el array y borrarlo
      //1ero: encontrar el índice con findIndex y usar splice(indiceEncontrado, 1)
      //Opción 2: usando filter
      let nuevaListaProductos = listaProductos.filter(
        (itemProducto) => itemProducto.codigo !== codigo
      );
      //Actualizar el array original y localStorage
      listaProductos = nuevaListaProductos;
      guardarLocalStorage();

      //Actualizar la tabla
      borrarTabla();
      cargaInicial();

      //Mostrar cartel al usuario
      Swal.fire({
        title: "Producto eliminado",
        text: "Su producto fue eliminado correctamente!",
        icon: "success",
      });
    }
  });
};

function cargarDatosPrueba(){
  const datos = [
    {
      codigo:"123",
      producto:"Ironman",
      cantindad:"1",
      descripcion:"SuperHéroe Avenger",
      url:"https://pixabay.com/es/illustrations/hombre-de-acero-bebe-ironman-7775599/",
    },
    {
      codigo:"321",
      producto:"StarLord",
      cantindad:"1",
      descripcion:"SupeHéroe Guardianes de la Galaxia",
      url:"https://images.app.goo.gl/cRQEkYXfT7C9ABx49",
    }
  ];
  if (!localStorage.getItem("arrayProductosKey")) {
    //Quiero agregar los datos de productos
    localStorage.setItem("arrayProductosKey", JSON.stringify(datos));
    listaProductos = datos;
    //Mostrar en la tabla
    listaProductos.forEach(itemProducto => {
      crearFila(itemProducto);
    })
  }
};