// Constructor "molde" para pokemones
// function Pokemon(nombre, nivel, energia) {
//   this.nombre = nombre;
//   this.nivel = nivel;
//   this.energia = energia; // La energía máxima es 10
// }

// Sintaxis clase "molde"
class Pokemon {
  constructor(nombre, nivel, energia) {
    this.nombre = nombre;
    this.nivel = nivel;
    this.energia = energia; // La energía máxima es 10
  }

  // 1. Que me suba el nivel del pokemon
  // 2. Que me reste (1) de energía
  // 3. Que no pueda entrenar si la energía del pokemon es igual o menor a 1
  entrenar() {
    if (this.energia <= 1) {
      console.log("No podés entrenar a " + this.nombre + " porque tiene poca energía.");
    } else {
      // La energía es mayor que 1
      this.nivel = this.nivel + 1;
      this.energia = this.energia - 1;
      console.log("¡" + this.nombre + " ha subido a nivel " + this.nivel + "!");
      console.log("La energía de " + this.nombre + " es " + this.energia + ".");
    }
  }

  // 1. Sube (1) de energía
  // 2. Limitar la energía a 10
  alimentar() {
    if (this.energia < 10) {
      this.energia = this.energia + 1;
      console.log("La energía de " + this.nombre + " es " + this.energia + ".");
    } else {
      console.log("La energía de " + this.nombre + " está al máximo.");
    }
  }

  // 1. Que le reste energía al pokemon enemigo
  // 2. Que reste la cantidad de energía según el nivel del pokemon que ataca
  atacar(objetivo) {
    objetivo.restarEnergia(this.nivel);
  }

  // 1. Que reste energía al pokemon según la cantidad
  // 2. Que si la energía es menor que 1, muestre un mensaje de que el pokemon la quedó
  restarEnergia(cantidad) {
    if (this.energia > 1) {
      this.energia = this.energia - cantidad;
      console.log("La energía de " + this.nombre + " es " + this.energia + ".");
    } else {
      console.log(this.nombre + " está incapacitado.");
    }
  }
}

const charmander = new Pokemon("Charmander", 1, 10);
const pikachu = new Pokemon("Pikachu", 1, 10);
