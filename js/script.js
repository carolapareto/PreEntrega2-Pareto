let total = 0;
let productos = [];
let mensaje = "";

class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = 0;
  }
}

productos.push(new Producto("Mat", 3500));
productos.push(new Producto("Bolster", 4000));
productos.push(new Producto("Zafu", 4500));
productos.push(new Producto("Bloque", 1500));

function agregarProducto() {
  let nombreProducto = prompt("Ingrese el nombre del producto:\n- Mat\n- Bolster\n- Zafu\n- Bloque");
  let productoEncontrado = productos.find(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());

  if (productoEncontrado) {
    let cantidadProducto = parseInt(prompt("Ingrese la cantidad de productos que desea agregar: "));
    productoEncontrado.cantidad += cantidadProducto;
    total += productoEncontrado.precio * cantidadProducto;
    mensaje = cantidadProducto + " " + nombreProducto + "(s) se agregó al carrito.";
    alert(mensaje);
  } else {
    mensaje = "Producto inválido.";
    alert(mensaje);
  }
}


function verCarrito() {
  if (productos.every(producto => producto.cantidad === 0)) {
    mensaje = "El carrito está vacío.";
  } else {
    let productosTexto = productos.filter(producto => producto.cantidad > 0).map(producto => producto.nombre + " - Precio: $" + producto.precio.toFixed(2) + "- Cantidad " + producto.cantidad).join("\n");
    mensaje = "Productos en el carrito:\n\n" + productosTexto + "\nTotal: $" + total.toFixed(2);
  }
    alert(mensaje);
}

function buscarProducto() {
  let nombreProducto = prompt("Ingrese el nombre del producto a buscar:");
  let productoEncontrado = productos.find(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());

  if (productoEncontrado) {
    mensaje = "Producto encontrado:\n\n" + productoEncontrado.nombre + " - Precio: $" + productoEncontrado.precio.toFixed(2);
  } else {
    mensaje = "Producto no encontrado.";
  }
  alert(mensaje);
}

function filtrarProductos() {
  let precioMinimo = parseInt(prompt("Ingrese el precio mínimo:"));
  let productosFiltrados = productos.filter(producto => producto.precio >= precioMinimo);

  if (productosFiltrados.length > 0) {
    let productosFiltradosTexto = productosFiltrados.map(producto => producto.nombre + " - Precio: $" + producto.precio.toFixed(2)).join("\n");
    mensaje = "Productos filtrados: \n\n" + productosFiltradosTexto;
  } else {
    mensaje = "No se encontraron productos con el precio mínimo especificado.";
  }
  alert(mensaje);
}

function vaciarCarrito() {
  productos.forEach(producto => {
    producto.cantidad = 0;
  });
  total = 0;
  mensaje = "El carrito ha sido vaciado.";
  alert(mensaje);
}

let continuar = true;

while (continuar) {
  let opcion = prompt("Bienvenido/a a la tienda de productos\nSeleccione una opción:\n1. Agregar un producto\n2. Ver el carrito \n3. Buscar producto\n4. Filtrar productos por precio mínimo\n5. Vaciar carrito\n6. Salir");

  switch (opcion) {
    case "1":
      agregarProducto();
      break;
    case "2":
      verCarrito();
      break;
    case "3":
      buscarProducto();
      break;
    case "4":
      filtrarProductos();
      break;
    case "5":
      vaciarCarrito();
      continuar = false;
      break;
      case "6":
      continuar = false;
      break;
    default:
      mensaje = "Opción inválida.";
      alert(mensaje);
      break;
  }
}

