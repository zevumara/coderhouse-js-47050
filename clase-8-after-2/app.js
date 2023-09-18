/**
 * Objetivos del proyecto:
 * - Estructura HTML ✅
 * - Funciones ✅
 * - Objetos ✅
 * - Arrays ✅
 * - Algún método (funciones de orden superior) de los arrays ✅
 * - YAPA: Practicar DOM ✅
 */

// Clase "molde" para los items del juego
class Item {
  constructor(nombre, precio, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}

// Items del juego
const pocion = new Item("Poción de Vida", 100, "pocion.png");
const espada = new Item("Espada", 180, "espada.png");
const escudo = new Item("Escudo", 90, "escudo.png");

// Array para el inventario donde vamos a ir metiendo los items que compremos
const inventario = [];

// Oro del juego
let oro = 500;

// Elementos del DOM
const elOro = document.querySelector("#oro span");
elOro.innerText = oro; // Para que muestre el oro apenas carga la aplicación}
const elInventario = document.getElementById("inventario");

// Función para agregar items a nuestro inventario
function comprar(itemDelJuego) {
  // Verificamos si tenemos el oro disponible para la compra
  if (oro - itemDelJuego.precio >= 0) {
    inventario.push(itemDelJuego);
    oro -= itemDelJuego.precio; // Actualizamos el oro
    actualizarHTML();
  } else {
    alert(`No tenés el oro suficiente para comprar ${itemDelJuego.nombre}.`);
  }
}

// Función para vender un item
function vender(nombreDelItem) {
  // Buscamos el item con find
  const itemEncontrado = inventario.find((item) => item.nombre == nombreDelItem);

  // Si está en el inventario, lo volamos y actualizamos el HTML
  if (itemEncontrado) {
    // Actualizamos el oro
    oro += itemEncontrado.precio;
    // Lo volamos del inventario
    const indice = inventario.indexOf(itemEncontrado);
    inventario.splice(indice, 1);
    // Actualizamos el HTML
    actualizarHTML();
  }
}

// Función para actualizar el HTML de la aplicación (oro e items)
function actualizarHTML() {
  elInventario.innerHTML = "";
  for (const itemDelJuego of inventario) {
    const li = `
    <li onclick="vender('${itemDelJuego.nombre}')">
      <img src="img/${itemDelJuego.imagen}" alt="${itemDelJuego.imagen}" />
    </li>
    `;
    // Va a ir concatenando los li creados en el elemento #inventario (ul)
    elInventario.innerHTML += li;
  }

  elOro.innerText = oro;
}
