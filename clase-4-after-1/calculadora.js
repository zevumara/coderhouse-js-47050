/* Objetivos primer pre-entra:
- Condicionales ✅
- Ciclos ✅
- Funciones ✅
*/

// Operación sumar
function sumar(valor1, valor2) {
  const resultado = valor1 + valor2;
  return resultado;
}

// Operación restar
function restar(valor1, valor2) {
  const resultado = valor1 - valor2;
  return resultado;
}

// Operación multiplicar
function multiplicar(valor1, valor2) {
  const resultado = valor1 * valor2;
  return resultado;
}

// Operación dividir
function dividir(valor1, valor2) {
  const resultado = valor1 / valor2;
  return resultado;
}

// Paso 1: Que nos pida por prompt los dos valores que queremos calcular
// Paso 2: Elegir por prompt la operación a realizar (sumar, restar, multiplicar, dividir)
// Paso 3: Que se abra la calcular tocando en un botón
// Paso 4: Agregarle un ciclo para cumplir con los requisitos de la primer pre-entrega.
// Que calculadora se mantenga en ejecución (o sea que vuelva a salir el prompt de operación indefinidamente)
// hasta que el usuario ingrese "Salir" o "x"

function calculadora() {
  let operacion;

  while (operacion != "x" && operacion != "salir") {
    // Este bloque de código se va a repetir indefinidamente hasta que el usuario
    // ingrese "x" o "Salir" en el siguiente prompt
    operacion = prompt(
      "¿Qué operación querés hacer?\n+: Sumar\n-: Restar\n*: Multiplicar\n/: División\nx: Salir"
    );

    // Convierte el prompt del usuario en minúscula para aseguranos que siempre llegue en minúsculas
    operacion = operacion.toLowerCase();

    switch (operacion) {
      case "+":
        valor1 = parseInt(prompt("Ingrese el primer valor:"));
        valor2 = parseInt(prompt("Ingrese el segundo valor:"));
        alert("El resulado de la suma es " + sumar(valor1, valor2));
        break;
      case "-":
        valor1 = parseInt(prompt("Ingrese el primer valor:"));
        valor2 = parseInt(prompt("Ingrese el segundo valor:"));
        alert("El resultado de la resta es " + restar(valor1, valor2));
        break;
      case "*":
        valor1 = parseInt(prompt("Ingrese el primer valor:"));
        valor2 = parseInt(prompt("Ingrese el segundo valor:"));
        alert("El resultado de la multiplicación es " + multiplicar(valor1, valor2));
        break;
      case "/":
        valor1 = parseInt(prompt("Ingrese el primer valor:"));
        valor2 = parseInt(prompt("Ingrese el segundo valor:"));
        alert("El resultado de la división es " + dividir(valor1, valor2));
        break;
      case "x":
        break;
      case "salir":
        break;
      default:
        alert("La operación ingresada es inválida.");
    }
  }
}
