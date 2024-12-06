//Validaciones

export const campoRequerido = (input) => {
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

export const validarNumeros = (input) => {
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

export const validarURL = (input) => {
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

export const validarGeneral = (
  campoCodigo,
  campoProducto,
  campoDescripcion,
  campoCantidad,
  campoURL
) => {
  let alerta = document.querySelector("#mjeAlerta");
  //Comprobar que pasen cada una de las validaciones y si no pasan mostrar el alert
  if (
    campoRequerido(campoCodigo) &&
    campoRequerido(campoProducto) &&
    campoRequerido(campoDescripcion) &&
    validarNumeros(campoCantidad) &&
    validarURL(campoURL)
  ) {
    alerta.className = "alert alert-danger my-3 d-none";
    return true;
  } else {
    alerta.className = "alert alert-danger my-3";
    return false;
  }
};

//Pueden usar export general como el siguiente o anteponer la palabra 
//export en cada definición de función a exportar

/* export {
    campoRequerido,
    validarNumeros,
    validarURL,
    validarGeneral,
  } */
