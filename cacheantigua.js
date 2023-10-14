// Obtener el número de milisegundos actuales usando Date.now()
let versionActual = Date.now();

// Obtener el número de milisegundos guardado en la caché del navegador usando localStorage
let versionCache = localStorage.getItem('version');

// Comparar los números de milisegundos y si la diferencia es mayor que 5 minutos (300000 milisegundos), recargar la página desde el servidor
if (versionActual - versionCache > 300000) {
  // Guardar el número de milisegundos actuales en la caché del navegador
  localStorage.setItem('version', versionActual);
  // Recargar la página desde el servidor usando el parámetro true
  window.location.reload(true);
}
