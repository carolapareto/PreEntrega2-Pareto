let total = 0;
let productos = "";
let mensaje = "";

function agregarProducto() {
    let nombreProducto = prompt("Ingrese el nombre del producto:\n- Mat\n- Bolster\n- Zafu\n- Bloque");
    let precioProducto = 0;

    switch (nombreProducto.toLowerCase()) {
        case "mat":
            precioProducto = 3500;
            break;
        case "bolster":
            precioProducto = 4000;
            break;
        case "zafu":
            precioProducto = 4500;
            break;
        case "bloque":
            precioProducto = 1500;
            break;
        default:
            mensaje = "Producto inválido.";
            alert(mensaje);
            return;
    }

    productos += nombreProducto + " - Precio: $" + precioProducto.toFixed(2) + "\n";
    total += precioProducto;

    mensaje = nombreProducto + " se agregó al carrito.";
    alert(mensaje);
}

function verCarrito() {
    if (productos === "") {
        mensaje = "El carrito está vacío.";
    } else {
        mensaje = "Productos en el carrito:\n\n" + productos + "Total: $" + total.toFixed(2);
    }
    alert(mensaje);
}

let continuar = true;

while (continuar) {
    let opcion = prompt("Bienvenido/a a la tienda de productos\nSeleccione una opción:\n1. Agregar un producto\n2. Ver el carrito \n3. Salir");

  switch (opcion) {
    case "1":
      agregarProducto();
      break;
    case "2":
      verCarrito();
      break;
    case "3":
      continuar = false;
      break;
    default:
      mensaje = "Opción inválida.";
      alert(mensaje);
      break;
  }
}
