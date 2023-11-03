// Obtenemos el formulario, el campo de archivo, el botón y el div de resultado
var formulario = document.getElementById("miFormulario");
var archivo = document.getElementById("archivo");
var boton = formulario.querySelector("button");
var resultado = document.getElementById("resultado");
var igualitydifrent = 0
// Definimos una matriz o lista con las direcciones de los archivos que queremos comparar
var matriz = [
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Administrativo%20III.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Teoría del Derecho.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/inst basicas del derecho.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/historia%20del%20derecho.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/derecho%20romano.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Constitucional.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Financiero%20y%20Tributario%20I.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Civil%20II.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Civil%201.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Instbas%20civil.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Mercantil%20I,%20Tomo%20I.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Mercantil%20I,%20Tomo%20II.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Penal%20II.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Penal%20I.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Introduci%C3%B3n%20al%20Derecho%20Penal.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Instituciones%20y%20Derecho%20de%20la%20Union%20Europea.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Internacional%20Publico%20I.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Internacional%20Publico%20II.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Administrativo%20I.pdf",
  "https://apdespanol.github.io/APdE.github.io/doc/Derecho%20Administrativo%20II.pdf"
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
                var igualitydifrent = 1;
              } 
            };
            reader2.readAsArrayBuffer(blob);
          });
      }
      if (igualitydifrent == 1) {
                resultado.innerHTML += "<p>Los archivos son iguales<p>";
              } else {
                resultado.innerHTML += "<p>Los archivos son diferentes</p>";
              }
    };
    reader.readAsArrayBuffer(archivoSeleccionado);
  } else {
    // Mostramos un mensaje de error si no se ha seleccionado ningún archivo
    resultado.innerHTML = "<h3>No se ha seleccionado ningún archivo</h3>";
  }
}
