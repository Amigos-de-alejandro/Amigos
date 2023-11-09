 <script src="login.js"></script> <!-- Este es el archivo JavaScript con el código de validación -->
  <script>
    // Crear una función que se ejecuta al cargar el documento
    document.addEventListener("DOMContentLoaded", function() {
      // Ocultar el contenido de la página usando el método document.write
      document.write("<div style='display: none'>");
      // Llamar a la función createLogin del script login.js
      createLogin();
      // Mostrar el contenido de la página usando el método document.write
      document.write("</div>");
    });
  </script>