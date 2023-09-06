// Variables globales
const carrito = [];

// Función para agregar un producto al carrito
function agregar() {
  // Pido por prompt los datos del producto
  const nombre = prompt("Introduzca el nombre del producto:");
  const precio = prompt("Introduzca el precio del producto:");

  // Creo un objeto con los datos obtenidos del prompt
  const nuevoProducto = {
    nombre: nombre,
    precio: parseInt(precio),
    stock: 1,
  };

  // Push agrega el producto en el array
  carrito.push(nuevoProducto);

  // Mensaje de alert exitoso
  alert("El producto " + nombre + " fue agregado al carrito.");
}

// Función para listar los productos del carrito
function listar() {
  console.clear();
  console.log("Productos que hay en el carrito:");

  for (const producto of carrito) {
    console.log("-----------------------------------");
    console.log("Nombre:", producto.nombre);
    console.log("Precio:", producto.precio);
    console.log("Stock:", producto.stock);
  }
}

// Función para quitar un producto del carrito
function quitar() {
  const nombrePrompt = prompt("¿Qué producto querés sacar del carrito?");

  // Recorremos nuestro array elemento por elemento, para saber si existe un producto
  // con el nombre indicado en el prompt
  for (const producto of carrito) {
    if (producto.nombre == nombrePrompt) {
      // Encontrado
      // Necesitamos el índice y lo pedimos con indexOf
      const indiceProducto = carrito.indexOf(producto);
      // Una vez obtenemos el índice, lo volamos con splice
      carrito.splice(indiceProducto, 1);
      // Mostramos un mensaje al usuario que se ha borrado el producto del carrito
      alert("El producto " + producto.nombre + " fue borrado del carrito");
      return;
    }
  }
  alert("No se encontró el producto " + nombrePrompt + " en el carrito");
}
