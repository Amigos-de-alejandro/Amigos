// Función para crear una cookie con un nombre y un valor dados
function crearCookie(nombre, valor) {
  document.cookie = nombre + "=" + valor + ";path=/";
}

// Función para leer el valor de una cookie dado su nombre
function leerCookie(nombre) {
  var nombreCookie = nombre + "=";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(nombreCookie) == 0) {
      return cookie.substring(nombreCookie.length, cookie.length);
    }
  }
  return "";
}

// Función para descargar una página web en el almacenamiento local del usuario
function descargarPagina(url) {
  // Crear un objeto XMLHttpRequest para hacer una petición GET al servidor
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    // Si la petición se completó con éxito y se obtuvo una respuesta
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Guardar el contenido de la respuesta en el almacenamiento local con la clave igual al url
      localStorage.setItem(url, xhr.responseText);
    }
  };
  // Enviar la petición
  xhr.send();
}

// Función para mostrar la página web guardada en el almacenamiento local del usuario
function mostrarPagina(url) {
  // Obtener el contenido de la página web del almacenamiento local con la clave igual al url
  var contenido = localStorage.getItem(url);
  // Si hay contenido guardado
  if (contenido) {
    // Reemplazar el contenido del documento actual por el contenido guardado
    document.open();
    document.write(contenido);
    document.close();
  }
}

// Función para comprobar si la página web guardada en el almacenamiento local está desactualizada
function comprobarActualizacion(url) {
  // Crear un objeto XMLHttpRequest para hacer una petición HEAD al servidor
  var xhr = new XMLHttpRequest();
  xhr.open("HEAD", url, true);
  xhr.onreadystatechange = function () {
    // Si la petición se completó con éxito y se obtuvo una respuesta
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Obtener la fecha de modificación de la página web del servidor
      var fechaServidor = new Date(xhr.getResponseHeader("Last-Modified"));
      // Obtener la fecha de modificación de la página web guardada en el almacenamiento local
      var fechaLocal = new Date(localStorage.getItem(url + "_fecha"));
      // Si la fecha del servidor es posterior a la fecha local
      if (fechaServidor > fechaLocal) {
        // Mostrar una alerta indicando que la versión guardada está desactualizada
        alert("Esta versión está desactualizada. Recargue para ver la versión actual.");
      }
    }
  };
  // Enviar la petición
  xhr.send();
}

// Función para mostrar un icono flotante en la esquina superior derecha indicando que no se puede conectar al servidor
function mostrarIcono() {
  // Crear un elemento div con el estilo adecuado para que sea flotante y tenga un icono de advertencia
  var div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "0";
  div.style.right = "0";
  div.style.zIndex = "9999";
  div.style.backgroundColor = "red";
  div.style.color = "white";
  div.style.padding = "10px";
  div.style.fontSize = "20px";
  div.innerHTML = "&#9888; Imposible conectar con el servidor";

  // Añadir el elemento div al cuerpo del documento
  document.body.appendChild(div);
}

// Obtener el url de la página web actual
var urlActual = window.location.href;

// Comprobar si existe la cookie llamada "quieroguardarestaweb"
var cookie = leerCookie("quieroguardarestaweb");

// Si no existe la cookie
if (cookie == "") {
 // Crear un elemento botón con el texto "Guardar esta web"
  var boton = document.createElement("button");
  boton.textContent = "Guardar esta web";

  // Añadir algunas propiedades de estilo al botón para que sea flotante y esté en la esquina izquierda superior
  boton.style.position = "fixed";
  boton.style.top = "0";
  boton.style.left = "0";
  boton.style.zIndex = "9999";
  boton.style.backgroundColor = "blue";
  boton.style.color = "white";
  boton.style.padding = "10px";
  boton.style.fontSize = "20px";

  // Añadir un evento al botón para que al hacer clic se cree la cookie y se descargue la página web actual
  boton.addEventListener("click", function () {
    // Crear la cookie con el nombre "quieroguardarestaweb" y el valor "si"
    crearCookie("quieroguardarestaweb", "si");
    // Descargar la página web actual
    descargarPagina(urlActual);
    // Guardar la fecha actual en el almacenamiento local con la clave igual al url más "_fecha"
    localStorage.setItem(urlActual + "_fecha", new Date().toString());
    // Eliminar el botón del documento
    document.body.removeChild(boton);
  });

  // Añadir el botón al cuerpo del documento
  document.body.appendChild(boton);
} else {
  // Si existe la cookie
  // Mostrar la página web guardada en el almacenamiento local
  mostrarPagina(urlActual);
  // Comprobar si la página web guardada está desactualizada
  comprobarActualizacion(urlActual);
  // Intentar descargar la página web actual en segundo plano
  try {
    descargarPagina(urlActual);
    // Si se descarga con éxito, guardar la fecha actual en el almacenamiento local con la clave igual al url más "_fecha"
    localStorage.setItem(urlActual + "_fecha", new Date().toString());
  } catch (error) {
    // Si ocurre un error al descargar, mostrar el icono flotante indicando que no se puede conectar al servidor
    mostrarIcono();
  }
}

