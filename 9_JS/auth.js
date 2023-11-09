// auth.js
// Este archivo contiene la lógica para verificar si el usuario ha pasado el login y crear un botón de cerrar sesión

// Declaramos una variable para almacenar el estado del login del usuario
// Podemos usar localStorage, sessionStorage o cookies para guardar este valor
// En este caso, usamos localStorage por simplicidad
var loginStatus = localStorage.getItem("loginStatus");

// Comprobamos si el valor de la variable es "true" o no
if (loginStatus === "true") {
    // Si el valor es "true", significa que el usuario ha pasado el login
    // Podemos mostrar el contenido de la página o hacer lo que queramos
    console.log("El usuario ha pasado el login");
    // Creamos un elemento HTML con el botón de cerrar sesión y lo añadimos al final del body
    var logoutButton = document.createElement("div");
    logoutButton.innerHTML = "<button id='logout'>Cerrar sesión (" + username.value + ")</button>";
    document.body.appendChild(logoutButton);
    // Usamos CSS para darle estilo al botón y hacer que se posicione en una esquina
    logoutButton.style.position = "fixed";
    logoutButton.style.bottom = "10px";
    logoutButton.style.right = "10px";
    // Añadimos un evento al botón para que borre el valor de la variable loginStatus y recargue la página
    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("loginStatus");
        window.location.reload();
    });
} else {
    // Si el valor no es "true", significa que el usuario no ha pasado el login
    // Podemos redirigirlo a la página del login o mostrar un mensaje de error
    window.location.href = "https://amigos-de-alejandro.github.io/Amigos/";
}
