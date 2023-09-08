// Variables globales
const carrito = [];

const arroz = {
  nombre: "Arroz blanco",
  precio: 100,
  cantidad: 1,
};
const arrozIntegral = {
  nombre: "Arroz integral",
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
carrito.push(arrozIntegral);
carrito.push(fideos);
carrito.push(alfajor);

// Función que se encargue de buscar si un producto existe en nuestro carrito (array)
function enCarrito(nombrePrompt) {
  // Find: busca un elemento que cumpla la condición (en este caso el nombre del
  // del producto con el nombre introducido en el prompt) y devuelve el elemento
  // o undefined si no lo encuentra
  return carrito.find((producto) => producto.nombre == nombrePrompt);
}

// Función para buscar productos
function buscar() {
  const keyword = prompt("¿Qué producto desea buscar?");

  const arrayResultados = carrito.filter((el) =>
    el.nombre.toLowerCase().includes(keyword.toLowerCase())
  );
  console.log(arrayResultados);
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
    productoEncontrado.cantidad++;
    productoEncontrado.precio = productoEncontrado.precio * productoEncontrado.cantidad;
  } else {
    // Push agrega el producto en el array
    carrito.push(nuevoProducto);
  }

  // Mensaje de alert exitoso
  alert("El producto " + nombrePrompt + " fue agregado al carrito.");
  listar();
}

// Función para listar los productos del carrito
function listar() {
  console.clear();
  console.log("Productos que hay en el carrito:");

  // Recorremos los elementos del array carrito
  carrito.forEach((producto) => {
    console.log("----------");
    console.log("Nombre:", producto.nombre);
    console.log("Precio:", producto.precio);
    console.log("Cantidad:", producto.cantidad);
  });

  // Reduce: Recorre cada elemento y va acumulando una suma de una propiedad
  // del elemento, en este caso el precio
  const totalCarrito = carrito.reduce((acu, el) => acu + el.precio, 0);
  console.log("TOTAL DEL CARRITO: $", totalCarrito);

  // Map: crea un nuevo array transformando los elementos. En este caso
  // le agregamos el IVA a los precios
  const preciosActualizados = carrito.map((producto) => {
    return {
      nombre: producto.nombre,
      precio: producto.precio * 1.25,
      cantidad: producto.cantidad,
    };
  });
  console.log("Precios actualizados:", preciosActualizados);

  // Sort: crea un nuevo array reordenando los elementos
  // En este caso de mayor a menor según el precio
  const nuevoArrayReordenado = carrito.sort((el1, el2) => {
    if (el1.precio < el2.precio) {
      return 1;
    }
    if (el1.precio > el2.precio) {
      return -1;
    }
    return 0;
  });
  console.log("Nuevo array reordenado:", resultado);
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
}
