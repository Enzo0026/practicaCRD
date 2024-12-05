//Traigo los elementos que necesito del html
let campoCodigo = document.getElementById("codigo");

console.log(campoCodigo);

let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoURL = document.getElementById("URL");

let formProductos = document.querySelector('#formProductos');
//Validaciones

const campoRequerido = (input) => {
  console.log("Desde campo requerido");
  console.log(input.value);
  if (input.value.trim().length > 0) {
    console.log("Aquí esta todo bien");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("Aquí muestro el error");
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarNumero = (input) => {
  //Vamos a usar o crear una expresión regular
  let patron = /^[0-9]{1,3}$/;
  //El metódo test permite comparar un string con el patrón y devuelve true o false
  //regex.test('string a validar')
  if (patron.test(input.value)) {
    //Cumple con la expresión regular
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarURL = (input) => {
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarGeneral = ()=>{
     
}

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
  validarNumero(campoCantidad);
});
campoURL.addEventListener("blur", () => {
  console.log("Desde URL");
  validarURL(campoURL)
});

formProductos.addEventListener('submit', )