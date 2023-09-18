// Variables globales
const carrito = [];

const arroz = {
  nombre: "Arroz",
  precio: 100,
  cantidad: 1,
};
const fideos = {
  nombre: "Fideos",
  precio: 200,
  cantidad: 1,
};
const alfajor = {
  nombre: "Alfajor",
  precio: 50,
  cantidad: 1,
};

carrito.push(arroz);
carrito.push(fideos);
carrito.push(alfajor);

// Función que se encargue de buscar si un producto existe en nuestro carrito (array)
function enCarrito(nombrePrompt) {
  for (const producto of carrito) {
    if (producto.nombre == nombrePrompt) {
      return producto;
    }
  }
  return false;
}

// Función para agregar un producto al carrito
function agregar() {
  // Pido por prompt los datos del producto
  const nombrePrompt = prompt("Introduzca el nombre del producto:");
  const precioPrompt = prompt("Introduzca el precio del producto:");

  // Creo un objeto con los datos obtenidos del prompt
  const nuevoProducto = {
    nombre: nombrePrompt,
    precio: parseInt(precioPrompt),
    cantidad: 1,
  };

  const productoEncontrado = enCarrito(nombrePrompt);

  if (productoEncontrado) {
    producto.cantidad++;
    producto.precio = producto.precio * producto.cantidad;
  } else {
    // Push agrega el producto en el array
    carrito.push(nuevoProducto);
  }

  // Mensaje de alert exitoso
  alert("El producto " + nombrePrompt + " fue agregado al carrito.");
  listar();

  // for (const producto of carrito) {
  //   // Si lo encuentra, solo actualizo la cantidad
  //   if (producto.nombre == nombrePrompt) {
  //     producto.cantidad++;
  //     producto.precio = producto.precio * producto.cantidad;
  //     // Mensaje de alert exitoso
  //     alert("El producto " + nombrePrompt + " fue agregado al carrito.");
  //     listar();
  //     return;
  //   }
  // }
  // // Push agrega el producto en el array
  // carrito.push(nuevoProducto);
  // // Mensaje de alert exitoso
  // alert("El producto " + nombrePrompt + " fue agregado al carrito.");
  // listar();
}

// Función para listar los productos del carrito
function listar() {
  console.clear();
  console.log("Productos que hay en el carrito:");

  // Recorremos los elementos del array carrito
  for (const producto of carrito) {
    console.log("----------");
    console.log("Nombre:", producto.nombre);
    console.log("Precio:", producto.precio);
    console.log("Cantidad:", producto.cantidad);
  }
}

// Función para quitar un producto del carrito
function quitar() {
  const nombrePrompt = prompt("¿Qué producto querés quitar?");

  const productoEncontrado = enCarrito(nombrePrompt);

  if (productoEncontrado) {
    const indiceProducto = carrito.indexOf(productoEncontrado);
    // Una vez obtenemos el índice, lo volamos con splice
    carrito.splice(indiceProducto, 1);
    // Mostramos un mensaje al usuario que se ha borrado el producto del carrito
    alert("El producto " + productoEncontrado.nombre + " fue borrado del carrito.");
    listar();
  } else {
    alert("No se encontró el producto " + nombrePrompt + " en el carrito.");
  }

  // Recorremos nuestro array elemento por elemento, para saber si existe un producto
  // con el nombre indicado en el prompt
  // for (const producto of carrito) {
  //   if (producto.nombre == nombrePrompt) {
  //     // Encontrado
  //     // Necesitamos el índice y lo pedimos con indexOf
  //     const indiceProducto = carrito.indexOf(producto);
  //     // Una vez obtenemos el índice, lo volamos con splice
  //     carrito.splice(indiceProducto, 1);
  //     // Mostramos un mensaje al usuario que se ha borrado el producto del carrito
  //     alert("El producto " + producto.nombre + " fue borrado del carrito.");
  //     return; // El return vacío sale del ciclo y de la función, corta le algoritmo
  //   }
  // }
  // Solo va a llegar a acá si no encontró ningún producto, porque no
  // entró en el condicional anterior (return)
  // alert("No se encontró el producto " + nombrePrompt + " en el carrito.");
}
