const imagen1 = document.getElementById("imagen1");
const imagen2 = document.getElementById("imagen2");
const tiempoDeEspera = 3000; // 10 segundos en milisegundos

imagen1.addEventListener("click", () => {
    // Cambia a la imagen 2 al hacer clic en la imagen 1
    imagen1.style.display = "none";
    imagen2.style.display = "block";

    // Después de 10 segundos, vuelve a la imagen 1
    setTimeout(() => {
        imagen1.style.display = "block";
        imagen2.style.display = "none";
    }, tiempoDeEspera);
});

// Función que carga las animaciones de las habilidades
function cargarAnimaciones() {
  // Función para manejar la animación de un elemento
  function manejarAnimacion(element, iniciarAnimacion) {
    const chart = $(element);

    if (iniciarAnimacion) {
      chart.easyPieChart({
        size: 160,
        barColor: "#ff5b00",
        scaleLength: 0,
        lineWidth: 15,
        tackColor: "#525151",
        lineCap: "circle",
        animate: 2000,
      });
    } else {
      // Detener la animación y restablecer el valor a cero cuando está fuera de la vista
      chart.data('easyPieChart').stopAnimation();
      chart.data('easyPieChart').update(0);
    }
  }

  // Función para crear el observador de intersección
  function crearObservador() {
    const opciones = {
      threshold: 0.5, // El 50% del elemento debe estar visible.
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // El elemento está visible, inicia la animación.
          manejarAnimacion(entry.target, true);
        } else {
          // El elemento está fuera de la vista, detén la animación.
          manejarAnimacion(entry.target, false);
        }
      });
    }, opciones);

    // Observa cada elemento con clase 'chart'
    $('.chart').each(function () {
      observer.observe(this);
    });
  }

  // Llama a la función para crear el observador cuando el documento está listo.
  $(document).ready(function () {
    crearObservador();
  });
}

// Llama a la función para cargar las animaciones cuando el documento está listo.
$(document).ready(function () {
  cargarAnimaciones();
});

