/*
 Objetivos para la tercer pre-entrega:
 - Usar el DOM ✅
 - Usar eventos ✅
 - Usar storage ✅
 - MODO PRO: Simular una base de datos o API ✅
 - MODO DIOS: Buscador ✅
*/

// Clase "molde" para los productos de nuestra aplicación
class Producto {
  constructor(id, nombre, precio, categoria, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}

class BaseDeDatos {
  constructor() {
    // Array para el catálogo
    this.productos = [];
    // Empezar a cargar productos
    this.agregarRegistro(1, "Arroz integral", 400, "Alimentos", "arroz.jpg");
    this.agregarRegistro(2, "Fideos", 300, "Alimentos", "fideos.jpg");
    this.agregarRegistro(3, "Alfajor", 400, "Alimentos", "alfajor.jpg");
    this.agregarRegistro(4, "Pan", 200, "Alimentos", "pan.jpg");
  }

  // Método que crea el objeto producto y lo almacena en el catálogo (array)
  agregarRegistro(id, nombre, precio, categoria, imagen) {
    const producto = new Producto(id, nombre, precio, categoria, imagen);
    this.productos.push(producto);
  }

  // Nos devuelve todo el catálogo de productos
  traerRegistros() {
    return this.productos;
  }

  // Nos devuelve un producto según el ID
  registroPorId(id) {
    return this.productos.find((producto) => producto.id === id);
  }

  // Nos devuelve un array con todas las coincidencias que encuentre según el
  // nombre del producto con la palabra que el pasemos como parámetro
  registrosPorNombre(palabra) {
    return this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(palabra.toLowerCase())
    );
  }
}

class Carrito {
  constructor() {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    // Array donde van a estar almacenados todos los productos del carrito
    this.carrito = carritoStorage || [];
    this.total = 0; // Suma total de los precios de todos los productos
    this.cantidadProductos = 0; // La cantidad de productos que tenemos en el carrito
    this.listar();
  }

  //
  estaEnCarrito({ id }) {
    return this.carrito.find((producto) => producto.id === id);
  }

  // Agregar al carrito
  agregar(producto) {
    const productoEnCarrito = this.estaEnCarrito(producto);

    if (!productoEnCarrito) {
      this.carrito.push({ ...producto, cantidad: 1 });
    } else {
      productoEnCarrito.cantidad++;
    }
    // Actualizo el storage
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    //
    this.listar();
  }

  // Quitar del carrito
  quitar(id) {
    const indice = this.carrito.findIndex((producto) => producto.id === id);
    // Si la cantidad es mayor a 1, le resto la cantidad en 1
    if (this.carrito[indice].cantidad > 1) {
      this.carrito[indice].cantidad--;
    } else {
      // Y sino, borramos del carrito el producto a quitar
      this.carrito.splice(indice, 1);
    }
    // Actualizo el storage
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    //
    this.listar();
  }

  // Renderiza todos los productos en el HTML
  listar() {
    // Reiniciamos variables
    this.total = 0;
    this.cantidadProductos = 0;
    divCarrito.innerHTML = "";

    for (const producto of this.carrito) {
      divCarrito.innerHTML += `
        <div class="productoCarrito">
          <h2>${producto.nombre}</h2>
          <p>$${producto.precio}</p>
          <p>Cantidad: ${producto.cantidad}</p>
          <a href="#" class="btnQuitar" data-id="${producto.id}">Quitar del carrito</a>
        </div>
      `;
      // Actualizamos los totales
      this.total += producto.precio * producto.cantidad;
      this.cantidadProductos += producto.cantidad;
    }

    const botonesQuitar = document.querySelectorAll(".btnQuitar");
    for (const boton of botonesQuitar) {
      boton.addEventListener("click", (event) => {
        event.preventDefault();
        const idProducto = Number(boton.dataset.id);
        this.quitar(idProducto);
      });
    }

    spanCantidadProductos.innerText = this.cantidadProductos;
    spanTotalCarrito.innerText = this.total;
  }
}

// Instanciamos la base de datos
const bd = new BaseDeDatos();

// Elementos
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const inputBuscar = document.querySelector("#inputBuscar");

// Instaciamos la clase Carrito
const carrito = new Carrito();

//
cargarProductos(bd.traerRegistros());

function cargarProductos(productos) {
  // Vacíamos el div
  divProductos.innerHTML = "";
  //
  for (const producto of productos) {
    divProductos.innerHTML += `
      <div class="producto">
        <h2>${producto.nombre}</h2>
        <p class="precio">$${producto.precio}</p>
        <div class="imagen">
          <img src="img/${producto.imagen}" width="100" />
        </div>
        <a href="#" class="btnAgregar" data-id="${producto.id}">Agregar al carrito</a>
      </div>
    `;
  }

  // Lista dinámica con todos los botones que haya en nuestro catálogo
  const botonesAgregar = document.querySelectorAll(".btnAgregar");

  // Recorremos botón por botón de cada producto en el catálogo y le agregamos
  // el evento click a cada uno
  for (const boton of botonesAgregar) {
    boton.addEventListener("click", (event) => {
      // Evita el comportamiento default de HTML
      event.preventDefault();
      // Guardo el dataset ID que está en el HTML del botón Agregar al carrito
      const idProducto = Number(boton.dataset.id);
      // Uso el método de la base de datos para ubicar el producto según el ID
      const producto = bd.registroPorId(idProducto);
      //
      carrito.agregar(producto);
    });
  }
}

// Buscador
inputBuscar.addEventListener("input", (event) => {
  event.preventDefault();
  const palabra = inputBuscar.value;
  const productos = bd.registrosPorNombre(palabra);
  cargarProductos(productos);
});
