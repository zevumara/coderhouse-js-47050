// Botones navbar
const botonesNavbar = document.querySelectorAll(".nav-link");
// Secciones
const secciones = document.querySelectorAll(".seccion");

// Recorro los botones del navbar
botonesNavbar.forEach((botonNavbar) => {
  // Le agrego un evento detector de click a cada botón
  botonNavbar.addEventListener("click", () => {
    // Le quito la clase active a todos los elementos del navbar
    botonesNavbar.forEach((boton) => {
      // Quito la clase CSS .active que marca el link del navbar en blanco
      boton.classList.remove("active");
    });
    // Oculto TODAS las secciones
    secciones.forEach((seccion) => {
      // Les agrego la clase CSS .ocultar que es un display: none
      seccion.classList.add("ocultar");
    });
    // Muestro la sección que necesito (puede ser: index, caracteristicas o contacto)
    const elementoAMostrar = document.querySelector(`#${botonNavbar.dataset.mostrar}`);
    // Al sacarle la clase .ocultar la sección aparece
    elementoAMostrar.classList.remove("ocultar");
    // En el navbar marco la sección que está activa agregándole la clase .active
    botonNavbar.classList.add("active");
  });
});

// Botón Características del index
const btnCaracteristicasIndex = document.querySelector("#btnCaracteristicasIndex");

btnCaracteristicasIndex.addEventListener("click", function (e) {
  // Prevengo el comportamiento por defecto del link
  e.preventDefault();
  // Elementos
  const index = document.querySelector("#index");
  const btnIndex = document.querySelector("#btnIndex");
  const caracteristicas = document.querySelector("#caracteristicas");
  const btnCaracteristicas = document.querySelector("#btnCaracteristicas");
  // Oculto la sección Portada
  index.classList.add("ocultar");
  btnIndex.classList.remove("active");
  // Muestro la sección Características
  caracteristicas.classList.remove("ocultar");
  btnCaracteristicas.classList.add("active");
});
