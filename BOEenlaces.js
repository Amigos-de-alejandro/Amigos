// Definimos una función que busca un término jurídico en el BOE
function buscarTermino(term) {
  // Obtenemos el elemento donde mostraremos los resultados
  var resultados = document.getElementById("resultados");

  // Limpiamos el contenido anterior
  resultados.innerHTML = "";

  // Obtenemos la fecha actual
  var fecha = new Date();

  // Formateamos la fecha al formato YYYYMMDD
  var fechaStr = fecha.getFullYear() + ("0" + (fecha.getMonth() + 1)).slice(-2) + ("0" + fecha.getDate()).slice(-2);

  // Construimos la URL de la petición con nuestra clave de acceso y el término a buscar
  var url = "https://boe.es/diario_boe/xml.php?id=BOE-S-" + fechaStr + "&c=clave&q=" + term;

  // Hacemos la petición HTTP usando fetch
  fetch(url)
    .then(function(response) {
      // Si la respuesta es exitosa, la convertimos a texto
      if (response.ok) {
        return response.text();
      } else {
        // Si hay algún error, lo mostramos
        resultados.innerHTML = "Error al consultar el BOE: " + response.status;
      }
    })
    .then(function(data) {
      // Si tenemos datos, los parseamos como XML
      if (data) {
        var parser = new DOMParser();
        var xml = parser.parseFromString(data, "text/xml");

        // Obtenemos los elementos <item> que contienen las normas
        var items = xml.getElementsByTagName("item");

        // Si hay algún elemento <item>, los recorremos
        if (items.length > 0) {
          for (var i = 0; i < items.length; i++) {
            // Obtenemos el título, el resumen y el enlace de cada norma
            var titulo = items[i].getElementsByTagName("titulo")[0].textContent;
            var resumen = items[i].getElementsByTagName("resumen")[0].textContent;
            var enlace = items[i].getElementsByTagName("enlace")[0].textContent;

            // Creamos un elemento <div> para mostrar cada norma
            var div = document.createElement("div");

            // Creamos un elemento <h3> para mostrar el título como un enlace
            var h3 = document.createElement("h3");
            var a = document.createElement("a");
            a.href = enlace;
            a.target = "_blank";
            a.textContent = titulo;
            h3.appendChild(a);

            // Creamos un elemento <p> para mostrar el resumen
            var p = document.createElement("p");
            p.textContent = resumen;

            // Añadimos los elementos al div
            div.appendChild(h3);
            div.appendChild(p);

            // Añadimos el div al elemento de resultados
            resultados.appendChild(div);
          }
        } else {
          // Si no hay ningún elemento <item>, mostramos un mensaje
          resultados.innerHTML = "No se han encontrado normas que contengan el término '" + term + "' en el BOE del día " + fecha.toLocaleDateString();
        }
      }
    })
    .catch(function(error) {
      // Si hay algún error, lo mostramos
      resultados.innerHTML = "Error al consultar el BOE: " + error;
    });
}

// Obtenemos el elemento donde introduciremos el término a buscar
var input = document.getElementById("input");

// Añadimos un evento para llamar a la función cuando se pulse una tecla
input.addEventListener("keyup", function() {
  // Obtenemos el valor del input
  var term = input.value;

  // Si el valor no está vacío, llamamos a la función de buscar
  if (term) {
    buscarTermino(term);
  }
});
