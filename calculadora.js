// Funciones para las operaciones

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

function calculadora() {
  const valor1 = parseInt(prompt("Ingrese el primer valor:"));
  const valor2 = parseInt(prompt("Ingrese el segundo valor:"));
  const operacion = prompt("¿Qué operación querés hacer? (+ - * /)");

  switch (operacion) {
    case "+":
      alert("El resulado de la suma es " + sumar(valor1, valor2));
      break;
    case "-":
      alert("El resultado de la resta es " + restar(valor1, valor2));
      break;
    case "*":
      alert("El resultado de la multiplicación es " + multiplicar(valor1, valor2));
      break;
    case "/":
      alert("El resultado de la división es " + dividir(valor1, valor2));
      break;
    default:
      alert("La operación ingresada es inválida.");
  }
}
