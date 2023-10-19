// Este es el código JavaScript para manejar los eventos de los logos
// Debes guardar este código en un archivo .js y enlazarlo desde tu HTML

// Estas son las URLs de tus perfiles de redes sociales
var instagramURL = "https://www.instagram.com/apderechoespanol/";
var twitterURL = "https://twitter.com/APdEspanol";
var whatsappURL = "https://whatsapp.com/channel/0029Va7YT69EquiT2tM2F22p";

// Esta función se encarga de preguntar al usuario si quiere ver tu perfil y redirigirlo si acepta
function goToProfile(url) {
  var answer = confirm("¿Quieres ver nuestro perfil?");
  if (answer) {
    window.location.href = url;
  }
}

// Estos son los elementos HTML de los logos
var instagram = document.getElementById("instagram");
var twitter = document.getElementById("twitter");
var whatsapp = document.getElementById("whatsapp");

// Estos son los eventos que se disparan cuando el usuario hace clic en los logos
instagram.addEventListener("click", function() {
  goToProfile(instagramURL);
});
twitter.addEventListener("click", function() {
  goToProfile(twitterURL);
});
whatsapp.addEventListener("click", function() {
  goToProfile(whatsappURL);
});
