  // Obtener una referencia al elemento deslizante
var slider = document.querySelector(".slider");

// Hacer una petición al archivo HTML remoto
fetch("https://apdespanol.github.io/APdE.github.io/")
  .then(function(response) {
    // Devolver la respuesta como texto
    return response.text();
  })
  .then(function(html) {
    // Insertar el HTML en el deslizante
    slider.innerHTML = html;
  })
  .catch(function(error) {
    // Mostrar un mensaje de error si algo falla
    console.error("Ocurrió un error al obtener el archivo HTML:", error);
  });
  </script>
  
<div id="disqus_recommendations"></div>
  
   <script>
  // Obtener una referencia al elemento deslizante
var slider = document.querySelector(".slider");

// Hacer una petición al archivo HTML remoto
fetch("https://apdespanol.github.io/APdE.github.io/")
  .then(function(response) {
    // Devolver la respuesta como texto
    return response.text();
  })
  .then(function(html) {
    // Insertar el HTML en el deslizante
    slider.innerHTML = html;
  })
  .catch(function(error) {
    // Mostrar un mensaje de error si algo falla
    console.error("Ocurrió un error al obtener el archivo HTML:", error);
  });
