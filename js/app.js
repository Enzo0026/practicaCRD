//Recuperar los datos de localStorage
let listaProductos =
  JSON.parse(localStorage.getItem("arrayProductosKey")) || [];

listaProductos.map((item) => crearColumna(item));
//listaProductos.forEach((item)=> crearColumna(item))

function crearColumna(producto) {
  let grilla = document.getElementById("grilla");

  grilla.innerHTML += `<div class="col-sm-12 col-md-4 col-lg-3 mb-3 mx-3">
            <div class="card h-100">
              <img src="${producto.url}" class="card-img-top" alt="${producto.producto}">
              <div class="card-body">
                <h5 class="card-title">${producto.producto}</h5>
                <p class="card-text">${producto.descripcion}</p>
              </div>
            </div>
          </div>`;
}
