/*
 Objetivos:
 - Aplicar API de Mercado Libre ✅
 - Usar un loading fachero ✅
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

// Clase para que simula la base de datos del e-commerce, acá van a estar
// todos los productos de nuestro catálogo
class BaseDeDatos {
  constructor() {
    //
    this.categoriaSeleccionada = "MLA438566";
    this.limiteProductos = 12;
    this.cargarRegistrosPorCategoria();
  }

  // Carga los productos por categorías en la API
  async cargarRegistrosPorCategoria(categoria = this.categoriaSeleccionada) {
    // Loader
    mostrarLoader();
    this.categoriaSeleccionada = categoria;
    // Array para el catálogo
    this.productos = [];
    const respuesta = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?category=${categoria}&limit=${this.limiteProductos}&offset=2`
    );
    const resultado = await respuesta.json();
    const productosML = resultado.results;
    for (const productoML of productosML) {
      const producto = new Producto(
        productoML.id,
        productoML.title,
        productoML.price,
        categoria,
        productoML.thumbnail_id
      );
      this.productos.push(producto);
    }
    cargarProductos(this.productos);
    // Cierra todos los sweet alert que estén activos
    Swal.close();
  }

  // Para el buscador, buscar productos por nombre en la API
  async cargarRegistrosPorNombre(palabra) {
    // Loader
    mostrarLoader();
    // Array para el catálogo
    this.productos = [];
    const respuesta = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?category=${this.categoriaSeleccionada}&q=${palabra}&limit=${this.limiteProductos}&offset=0
      `
    );
    const resultado = await respuesta.json();
    const productosML = resultado.results;
    for (const productoML of productosML) {
      const producto = new Producto(
        productoML.id,
        productoML.title,
        productoML.price,
        this.categoriaSeleccionada,
        productoML.thumbnail_id
      );
      this.productos.push(producto);
    }
    cargarProductos(this.productos);
    // Cierra todos los sweet alert que estén activos
    Swal.close();
  }

  // Nos devuelve todo el catálogo de productos
  traerRegistros() {
    return this.productos;
  }

  // Nos devuelve un producto según el ID
  registroPorId(id) {
    return this.productos.find((producto) => producto.id === id);
  }
}

// Clase carrito que nos sirve para manipular los productos de nuestro carrito
class Carrito {
  constructor() {
    // Storage
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    // Array donde van a estar almacenados todos los productos del carrito
    this.carrito = carritoStorage || [];
    this.total = 0; // Suma total de los precios de todos los productos
    this.cantidadProductos = 0; // La cantidad de productos que tenemos en el carrito
    // Llamo a listar apenas de instancia el carrito para aplicar lo que
    // hay en el storage (en caso de que haya algo)
    this.listar();
  }

  // Método para saber si el producto ya se encuentra en el carrito
  estaEnCarrito({ id }) {
    return this.carrito.find((producto) => producto.id === id);
  }

  // Agregar al carrito
  agregar(producto) {
    const productoEnCarrito = this.estaEnCarrito(producto);
    // Si no está en el carrito, le mando eun push y le agrego
    // la propiedad "cantidad"
    if (!productoEnCarrito) {
      this.carrito.push({ ...producto, cantidad: 1 });
    } else {
      // De lo contrario, si ya está en el carrito, le sumo en 1 la cantidad
      productoEnCarrito.cantidad++;
    }
    // Actualizo el storage
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    // Muestro los productos en el HTML
    this.listar();
  }

  // Quitar del carrito
  quitar(id) {
    // Obento el índice de un producto según el ID, porque el
    // método splice requiere el índice
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
    // Muestro los productos en el HTML
    this.listar();
  }

  // Vaciar el carrito
  vaciar() {
    this.total = 0;
    this.cantidadProductos = 0;
    this.carrito = [];
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    this.listar();
  }

  // Renderiza todos los productos en el HTML
  listar() {
    // Reiniciamos variables
    this.total = 0;
    this.cantidadProductos = 0;
    divCarrito.innerHTML = "";
    // Recorro producto por producto del carrito, y los dibujo en el HTML
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
    if (this.cantidadProductos > 0) {
      // Botón comprar visible
      botonComprar.style.display = "block";
    } else {
      // Botón comprar invisible
      botonComprar.style.display = "none";
    }
    // Como no se cuantos productos tengo en el carrito, debo
    // asignarle los eventos de forma dinámica a cada uno
    // Primero hago una lista de todos los botones con .querySelectorAll
    const botonesQuitar = document.querySelectorAll(".btnQuitar");
    // Después los recorro uno por uno y les asigno el evento a cada uno
    for (const boton of botonesQuitar) {
      boton.addEventListener("click", (event) => {
        event.preventDefault();
        // Obtengo el id por el dataset (está asignado en this.listar())
        const idProducto = boton.dataset.id;
        // Llamo al método quitar pasándole el ID del producto
        this.quitar(idProducto);
      });
    }
    // Actualizo los contadores del HTML
    spanCantidadProductos.innerText = this.cantidadProductos;
    spanTotalCarrito.innerText = this.total;
  }
}

// Elementos
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const inputBuscar = document.querySelector("#inputBuscar");
const botonCarrito = document.querySelector("section h1");
const botonComprar = document.querySelector("#botonComprar");
const botonesCategorias = document.querySelectorAll(".btnCategoria");

// Instanciamos la base de datos
const bd = new BaseDeDatos();

// Instaciamos la clase Carrito
const carrito = new Carrito();

// Botones de categorías
botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", () => {
    const categoria = boton.dataset.categoria;
    // Quitar seleccionado anterior
    const botonSeleccionado = document.querySelector(".seleccionado");
    botonSeleccionado.classList.remove("seleccionado");
    // Se lo agrego a este botón
    boton.classList.add("seleccionado");
    bd.cargarRegistrosPorCategoria(categoria);
  });
});

// Mostramos el catálogo de la base de datos apenas carga la página
cargarProductos(bd.traerRegistros());

// Función para mostrar para renderizar productos del catálogo o buscador
function cargarProductos(productos) {
  // Vacíamos el div
  divProductos.innerHTML = "";
  // Recorremos producto por producto y lo dibujamos en el HTML
  for (const producto of productos) {
    divProductos.innerHTML += `
      <div class="producto">
        <h2>${producto.nombre}</h2>
        <p class="precio">$${producto.precio}</p>
        <div class="imagen">
          <img src="https://http2.mlstatic.com/D_604790-${producto.imagen}-V.webp" />
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
      const idProducto = boton.dataset.id;
      // Uso el método de la base de datos para ubicar el producto según el ID
      const producto = bd.registroPorId(idProducto);
      // Llama al método agregar del carrito
      carrito.agregar(producto);
      // Toastify
      Toastify({
        text: `Se ha añadido ${producto.nombre} al carrito`,
        gravity: "bottom",
        position: "center",
        style: {
          background: "linear-gradient(to right, #d15280, #244ced)",
        },
      }).showToast();
    });
  }
}

// Función para mostrar el loader
function mostrarLoader() {
  Swal.fire({
    title: "Cargando",
    html: "Estamos buscando productos...",
    timer: 1000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}

// Buscador
formBuscar.addEventListener("submit", (event) => {
  event.preventDefault();
  const palabra = inputBuscar.value;
  bd.cargarRegistrosPorNombre(palabra);
});

// Toggle para ocultar/mostrar el carrito
botonCarrito.addEventListener("click", (event) => {
  document.querySelector("section").classList.toggle("ocultar");
});

// Botón comprar
botonComprar.addEventListener("click", (event) => {
  event.preventDefault();

  Swal.fire({
    title: "¿Seguro que desea comprar los productos?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, seguro",
    cancelButtonText: "No, no quiero",
  }).then((result) => {
    if (result.isConfirmed) {
      carrito.vaciar();
      Swal.fire({
        title: "¡Compra realizada!",
        icon: "success",
        text: "Su compra fue realizada con éxito.",
        timer: 1500,
      });
    }
  });
});
