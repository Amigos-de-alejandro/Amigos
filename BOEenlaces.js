// Crear una variable que almacene la ruta del archivo JSON
var ruta = "diccionario.json";
// Crear una variable que almacene el objeto diccionario vacío
var diccionario = {};
// Crear una función asíncrona que lea el archivo JSON y lo guarde en el diccionario
async function leerArchivo() {
  // Usar la función fetch para obtener el archivo
  var respuesta = await fetch(ruta);
  // Comprobar si la respuesta es correcta
  if (respuesta.ok) {
    // Convertir la respuesta en un objeto JavaScript usando JSON.parse
    var datos = await respuesta.json();
    // Asignar los datos al diccionario
    diccionario = datos;
    // Llamar a la función insertarEnlaces
    insertarEnlaces();
  } else {
    // Mostrar un mensaje de error
    console.log("Error al leer el archivo");
  }
}

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

// Llamar a la función leerArchivo cuando se cargue la página
window.onload = leerArchivo;
