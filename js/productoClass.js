export class Producto {
  constructor(
    parametroCodigo,
    parametroProducto,
    parametroDescripcion,
    parametroCantidad,
    parametroURL
  ) {
    this.codigo = parametroCodigo;
    this.producto = parametroProducto;
    this.descripcion = parametroDescripcion;
    this.cantidad = parametroCantidad;
    this.url = parametroURL;
  }

  //getters y setters
  
  get mostrarCodigo(){
    return this.codigo
  }
  get mostrarProducto(){
    return this.producto
  }
  get mostrarDescripcion(){
    return this.descripcion
  }
  get mostrarCantidad(){
    return this.cantidad
  }
  get mostrarUrl(){
    return this.url
  }
  
  set modificarCodigo(nuevoCodigo){
    this.codigo = nuevoCodigo;
  }
  set modificarProducto(nuevoProducto){
    this.producto = nuevoProducto;
  }
  set modificarCantidad(nuevoCantidad){
    this.cantidad = nuevoCantidad;
  }
  set modificarDescripcion(nuevoDescripcion){
    this.descripcion = nuevoDescripcion;
  }
  set modificarUrl(nuevoUrl){
    this.url = nuevoUrl;
  }
}
