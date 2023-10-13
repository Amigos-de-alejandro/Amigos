// Obtenemos el elemento que contiene el blog
var blog = document.getElementById("blog");

// Obtenemos el ancho de la pantalla
var anchoPantalla = window.innerWidth;

// Definimos una función que ajusta el ancho del blog según el ancho de la pantalla
function ajustarAnchoBlog() {
  // Si el ancho de la pantalla es menor o igual a 768px, hacemos que el blog ocupe el 90% del ancho
  if (anchoPantalla <= 768) {
    blog.style.width = "90%";
  }
  // Si el ancho de la pantalla es mayor que 768px y menor o igual que 1024px, hacemos que el blog ocupe el 80% del ancho
  else if (anchoPantalla > 768 && anchoPantalla <= 1024) {
    blog.style.width = "80%";
  }
  // Si el ancho de la pantalla es mayor que 1024px, hacemos que el blog ocupe el 70% del ancho
  else {
    blog.style.width = "70%";
  }
}

// Llamamos a la función al cargar la página
ajustarAnchoBlog();

// Añadimos un evento para llamar a la función cada vez que se cambie el tamaño de la ventana
window.addEventListener("resize", ajustarAnchoBlog);
