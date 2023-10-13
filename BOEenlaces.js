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
      resultados.innerHTML = "No se han encontrado normas que contengan el término '" + term + "' en el BOE del día " + fecha.toLocaleDateString("es-ES");
    }
  }
})
.catch(function(error) {
  // Si hay algún error, lo mostramos
  resultados.innerHTML = "Error al consultar el BOE: " + error;
});
