resultado.innerHTML = "<h2>Analizando archivo</h2>"
// Obtenemos el formulario, el campo de archivo, el botón y el div de resultado
var formulario = document.getElementById("miFormulario");
var archivo = document.getElementById("archivo");
var boton = formulario.querySelector("button");
var resultado = document.getElementById("resultado");

// Definimos una matriz o lista con las direcciones de los archivos que queremos comparar
var matriz = [
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Administrativo%20III.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Teoría del Derecho.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/inst basicas del derecho.pdf"
];

// Añadimos un evento al botón para que al pulsarlo se ejecute la función comparar
boton.addEventListener("click", comparar);

// Definimos la función comparar, que recibe un evento como parámetro
function comparar(evento) {
  // Evitamos que el formulario se envíe al servidor
  evento.preventDefault();
  // Obtenemos el archivo seleccionado por el usuario
  var archivoSeleccionado = archivo.files[0];
  // Comprobamos si se ha seleccionado algún archivo
  if (archivoSeleccionado) {
    // Calculamos el hash del archivo seleccionado usando la librería CryptoJS
    var reader = new FileReader();
    reader.onload = function() {
      var hash1 = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(reader.result)).toString();
      // Recorremos la matriz con un bucle for
      for (var i = 0; i < matriz.length; i++) {
        // Obtenemos la dirección del archivo de cada elemento
        var direccion = matriz[i];
        // Descargamos el archivo de la web usando la función fetch
        fetch(direccion)
          .then(function(respuesta) {
            return respuesta.blob();
          })
          .then(function(blob) {
            // Calculamos el hash del archivo descargado usando la librería CryptoJS
            var reader2 = new FileReader();
            reader2.onload = function() {
              var hash2 = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(reader2.result)).toString();
              // Comparamos los hashes y mostramos el resultado en el div
              if (hash1 == hash2) {
                resultado.innerHTML += "<h3>Los archivos son iguales</h3>";
              } else {
                resultado.innerHTML += "<h3>Los archivos son diferentes</h3>";
              }
            };
            reader2.readAsArrayBuffer(blob);
          });
      }
    };
    reader.readAsArrayBuffer(archivoSeleccionado);
  } else {
    // Mostramos un mensaje de error si no se ha seleccionado ningún archivo
    resultado.innerHTML = "<h3>No se ha seleccionado ningún archivo</h3>";
  }
}
