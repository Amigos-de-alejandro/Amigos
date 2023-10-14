// Leer el archivo JSON que contiene la comparativa de palabras con enlaces
let request = new XMLHttpRequest();
request.open('GET', 'diccionario.json'); // Asumiendo que el archivo se llama comparativa.json
request.responseType = 'text';
request.onload = function() {
  let comparativa = JSON.parse(request.response); // Convertir el texto en un objeto JavaScript

  // Obtener el texto de la página web y dividirlo en palabras
  let texto = document.body.innerText;
  let palabras = texto.split(/\s|\b/); // Separar por espacios o signos de puntuación

  // Recorrer las palabras y compararlas con las claves del objeto JSON
  for (let i = 0; i < palabras.length; i++) {
    let palabra = palabras[i];
    if (comparativa.hasOwnProperty(palabra)) { // Si hay una coincidencia
      // Crear un elemento <a> con el atributo href igual al valor del objeto JSON
      let enlace = document.createElement('a');
      enlace.href = comparativa[palabra];
      enlace.innerText = palabra;
      // Reemplazar la palabra original por el elemento <a>
      palabras[i] = enlace.outerHTML;
    }
  }

  // Unir las palabras modificadas en un nuevo texto
  let nuevoTexto = palabras.join('');

  // Reemplazar el texto original de la página por el nuevo texto
  document.body.innerHTML = nuevoTexto;
};
request.send();
