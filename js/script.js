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

// Cargar los productos desde el archivo JSON
fetch("./js/productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data.productos.map(producto => new Producto(producto.nombre, producto.precio))
    console.log(productos);
  })
  .catch(error => console.log(error));


class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = 0;
  }
}


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

    // Agregar botón eliminar al li
    const eliminarButton = document.createElement("button");
    eliminarButton.innerText = "Eliminar";
    eliminarButton.addEventListener("click", () => eliminarProducto(productoEncontrado));
    li.appendChild(eliminarButton);

    // Escuchar el evento click del botón eliminar
    eliminarButton.addEventListener("click", () => eliminarProducto(productoEncontrado));

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
  if (carritoElement.innerHTML === "") {
    // Si estaba vacío, eliminar el mensaje de carrito vacío
    document.getElementById("mensaje").innerText = "";
  }

}

// Escuchar el evento click del botón agregar al carrito
document.getElementById("agregar").addEventListener("click", agregarProducto);

function eliminarProducto(producto) {
  const index = productos.indexOf(producto);
  if (index > -1) {
      if (producto.cantidad > 1) { // Si hay más de 1 producto, disminuir la cantidad en 1
          producto.cantidad--;
      } else { // Si solo hay 1 producto, eliminarlo por completo del array
          productos.splice(index, 1);
      }
      total -= producto.precio; // Restar el precio del producto eliminado del total
  }

  // Actualizar el carrito en el DOM
  carritoElement.innerHTML = "";
  productos.forEach(producto => {
      if (producto.cantidad > 0) {
          const li = document.createElement("li");
          li.innerText = `${producto.cantidad} ${producto.nombre}(s) - Precio: $${producto.precio.toFixed(2)}`;

          // Agregar botón eliminar al li
          const eliminarButton = document.createElement("button");
          eliminarButton.innerText = "Eliminar";
          eliminarButton.addEventListener("click", () => eliminarProducto(producto));
          li.appendChild(eliminarButton);

          carritoElement.appendChild(li);
      }
  });

  // Actualizar total del carrito
  totalElement.innerText = "Total: $" + total.toFixed(2);

  // Guardar el carrito actualizado en el local storage
  const carrito = {
      productos: productos,
      total: total,
      html: carritoElement.innerHTML,
  };
  localStorage.setItem("carrito", JSON.stringify(carrito));
}



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
    mensaje += "\n\nTotal: $" + total.toFixed(2);
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

const btnComprar = document.querySelector('#btn-comprar');

btnComprar.addEventListener('click', () => {
    Swal.fire({
        icon: 'success',
        title: 'Tu compra fue exitosa',
        text: 'Gracias por tu compra.',
      });
    });
    
    const selectProducto = document.getElementById("nombre");
const imagenProducto1 = document.getElementById("imagen-mat");
const imagenProducto2 = document.getElementById("imagen-bolster");
const imagenProducto3 = document.getElementById("imagen-zafu");
const imagenProducto4 = document.getElementById("imagen-bloque");

selectProducto.addEventListener('change', () => {

  const valorSeleccionado = selectProducto.value;
  // Ocultar todas las imágenes
  imagenProducto1.style.display = 'none';
  imagenProducto2.style.display = 'none';
  imagenProducto3.style.display = 'none';
  imagenProducto4.style.display = 'none';
  // Mostrar la imagen correspondiente
  if (valorSeleccionado === 'Mat') {
      imagenProducto1.style.display = 'block';
  } else if (valorSeleccionado === 'Bolster') {
      imagenProducto2.style.display = 'block';
  } else if (valorSeleccionado === 'Zafu') {
      imagenProducto3.style.display = 'block';
  } else if (valorSeleccionado === 'Bloque') {
      imagenProducto4.style.display = 'block';
  }
});

