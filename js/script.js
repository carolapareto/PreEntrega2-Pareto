let total = 0;
let productos = [];
let mensaje = "";

// Elementos del DOM que se van a utilizar
const carritoElement = document.getElementById("carrito");
const totalElement = document.getElementById("total");


if (localStorage.getItem("carrito")) {
  const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
  productos = carritoGuardado.productos;
  total = carritoGuardado.total;
  carritoElement.innerHTML = carritoGuardado.html;
  totalElement.innerText = "Total: $" + total.toFixed(2);
}

class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = 0;
  }
}

// Agregar productos al array productos
productos.push(new Producto("Mat", 3500));
productos.push(new Producto("Bolster", 4000));
productos.push(new Producto("Zafu", 4500));
productos.push(new Producto("Bloque", 1500));

function agregarProducto() {
  const nombreElement = document.getElementById("nombre");
  const cantidadElement = document.getElementById("cantidad");
  const nombreProducto = nombreElement.value;

  // Buscar el producto en el array productos
  const productoEncontrado = productos.find(
    producto =>
    producto.nombre.toLowerCase() === nombreProducto.toLowerCase()
  );
  

  if (productoEncontrado) {
    const cantidadProducto = parseInt(cantidadElement.value);
    productoEncontrado.cantidad += cantidadProducto;
    total += productoEncontrado.precio * cantidadProducto;
    mensaje = cantidadProducto + " " + nombreProducto + "(s) se agregó al carrito.";
    // Agregar mensaje al carrito
    const li = document.createElement("li");
    li.innerText = mensaje;
    carritoElement.appendChild(li);

    // Actualizar total del carrito
    totalElement.innerText = "Total: $" + total.toFixed(2);

    // Ocultar mensaje de carrito vacío si se agregan productos al carrito
    document.getElementById("mensaje").innerText = "";
  } else {
    mensaje = "Producto inválido.";
    document.getElementById("mensaje").innerText = mensaje;
  }


// Guardar el carrito en el local storage
const carrito = {
  productos: productos,
  total: total,
  html: carritoElement.innerHTML,
};
localStorage.setItem("carrito", JSON.stringify(carrito));

// Verificar si el carrito estaba vacío antes de agregar un producto
if(carritoElement.innerHTML === "") {
  // Si estaba vacío, eliminar el mensaje de carrito vacío
  document.getElementById("mensaje").innerText = "";
}

}

// Escuchar el evento click del botón agregar al carrito
document.getElementById("agregar").addEventListener("click", agregarProducto);


function verCarrito() {
  if (carritoElement.innerHTML === "") {
    mensaje = "El carrito está vacío.";
    document.getElementById("mensaje").innerText = mensaje;
  } else {
    mensaje = "Productos en el carrito:";
    productos.forEach(producto => {
      if (producto.cantidad > 0) {
        mensaje += "\n- " + producto.nombre + ": " + producto.cantidad + " unidad(es) - Precio: $" + producto.precio.toFixed(2);
      }
    });
    mensaje += "\n\nTotal: $" + total.toFixed (2);
    document.getElementById("mensaje").innerText = mensaje;
  }
}

document.getElementById("ver").addEventListener("click", verCarrito);

function vaciarCarrito() {
  total = 0;
  productos.forEach(producto => (producto.cantidad = 0));
  carritoElement.innerHTML = "";
  totalElement.innerText = "Total: $" + total.toFixed(2);
  mensaje = "El carrito está vacío.";
  document.getElementById("mensaje").innerText = mensaje;
  
  // Borrar el carrito del local storage
  localStorage.removeItem("carrito");
}

document.getElementById("vaciar").addEventListener("click", vaciarCarrito);

