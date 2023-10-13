// Crear un objeto que almacene las palabras, frases y abreviaciones como claves y los enlaces como valores
var diccionario = {
  "Bing": "https://www.bing.com/",
  "JS": "https://developer.mozilla.org/es/docs/Web/JavaScript",
  "HTML": "https://developer.mozilla.org/es/docs/Web/HTML",
  "CSS": "https://developer.mozilla.org/es/docs/Web/CSS",
  // Añadir más pares clave-valor según se desee
};

// Crear una función que busque las palabras del diccionario en el contenido de la web y les añada el enlace correspondiente
function insertarEnlaces() {
  // Obtener el elemento que contiene el contenido de la web
  var contenido = document.getElementById("contenido");
  // Obtener el texto del contenido
  var texto = contenido.textContent;
  // Recorrer las claves del diccionario
  for (var palabra in diccionario) {
    // Crear una expresión regular que busque la palabra en el texto, ignorando mayúsculas y minúsculas
    var regex = new RegExp("\\b" + palabra + "\\b", "gi");
    // Reemplazar la palabra por un elemento <a> con el enlace correspondiente
    var reemplazo = "<a href='" + diccionario[palabra] + "'>" + palabra + "</a>";
    // Actualizar el texto con el reemplazo
    texto = texto.replace(regex, reemplazo);
  }
  // Actualizar el contenido de la web con el nuevo texto
  contenido.innerHTML = texto;
}

// Llamar a la función cuando se cargue la página
window.onload = insertarEnlaces;

// Crear una variable que almacene el elemento que contiene el contenido de la web
var contenido = document.getElementById("contenido");
// Crear una función que busque las palabras del diccionario en el contenido de la web y les añada el enlace correspondiente
function insertarEnlaces() {
  // Obtener el texto del contenido
  var texto = contenido.textContent;
  // Recorrer las claves del diccionario
  for (var palabra in diccionario) {
    // Crear una expresión regular que busque la palabra en el texto, ignorando mayúsculas y minúsculas
    var regex = new RegExp("\\b" + palabra + "\\b", "gi");
    // Reemplazar la palabra por un elemento <a> con el enlace correspondiente
    var reemplazo = "<a href='" + diccionario[palabra] + "'>" + palabra + "</a>";
    // Actualizar el texto con el reemplazo
    texto = texto.replace(regex, reemplazo);
  }
  // Actualizar el contenido de la web con el nuevo texto
  contenido.innerHTML = texto;
}
// Crear una función que cree un observador de mutaciones para el elemento contenido
function crearObservador() {
  // Crear una instancia de MutationObserver
  var observador = new MutationObserver(function(mutaciones) {
    // Recorrer las mutaciones
    for (var mutacion of mutaciones) {
      // Comprobar si la mutación es de tipo caracterData
      if (mutacion.type === "characterData") {
        // Llamar a la función insertarEnlaces
        insertarEnlaces();
        // Salir del bucle
        break;
      }
    }
  });
  // Configurar las opciones del observador
  var opciones = {childList: true, characterData: true, subtree: true};
  // Iniciar la observación del elemento contenido
  observador.observe(contenido, opciones);
}
// Llamar a la función insertarEnlaces cuando se cargue la página
window.onload = insertarEnlaces;
// Llamar a la función crearObservador cuando se cargue la página
window.onload = crearObservador;
