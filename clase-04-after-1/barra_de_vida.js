/*
Objetivos:
- Condicional ✅
- Ciclos ✅
- Funciones ✅

Vamos a hacer un simulador de barra de vida de personajes, que posiblemente se pueda
adaptar a nuestra aplicación de Pokemon que hicimos la clase anterior
*/

// Variables globales
const nombre = "Charmander";
let vida = 5;
const vidaMaxima = 100;

// 1. Que sume vida según el parámetro cantidad, SIEMPRE Y CUANDO la suma sea menor que la vida máxima
function sumarVida(cantidad) {
  if (vida < vidaMaxima) {
    vida = vida + cantidad;
  }
  // Tope de vida
  if (vida > vidaMaxima) {
    vida = vidaMaxima;
  }
  console.log(nombre + ": " + barra());
}

// 1. Que reste la cantidad de vida SIEMPRE Y CUANDO la vida sea mayor que 0
// 2. Asegurarnos de que nunca sea menor que 0
function restarVida(cantidad) {
  if (vida > 0) {
    vida = vida - cantidad;
  }
  // Piso de vida: GAME OVER
  if (vida < 0) {
    vida = 0;
  }
  console.log(nombre + ": " + barra());
}

/*
  1. Que nos genere una barra de vida, según la cantidad de vida que tenga.
  | sería vida
  - sería daño
  Charmander: |||||----- 50%
              |||||||||| 100%
              ||-------- 20%
*/

function barra() {
  let barra = "";
  // Dibujo las barritas verticales (|) según la cantidad de vida que tenga el personaje
  for (let i = 0; i < vida; i++) {
    barra = barra + "|";
  }
  // Dibujo las barritas horizontales (-) según la cantidad de daño que tenga el personaje
  let danio = vidaMaxima - vida;
  for (let i = 0; i < danio; i++) {
    barra = barra + "-";
  }
  return barra;
}
