// login.js
// Este archivo contiene la lógica para validar el login del usuario y los datos de verificación de varios usuarios

// Copiamos el contenido del archivo user.json y lo asignamos a una variable
var userData = [
    {
        "username": "admin",
        "password": "1234"
    },
    {
        "username": "user1",
        "password": "abcd"
    },
    {
        "username": "user2",
        "password": "efgh"
    }
];

// Obtenemos los elementos del formulario
var form = document.getElementById("login-form");
var username = document.getElementById("username");
var password = document.getElementById("password");
var submit = document.getElementById("submit");

// Añadimos un evento al botón de enviar
submit.addEventListener("click", function(event) {
    // Evitamos que el formulario se envíe por defecto
    event.preventDefault();
    // Declaramos una variable para indicar si el login es correcto o no
    var loginSuccess = false;
    // Recorremos el array de objetos para validar el nombre de usuario y la contraseña
    for (var i = 0; i < userData.length; i++) {
        var validUsername = userData[i].username;
        var validPassword = userData[i].password;
        if (username.value === validUsername && password.value === validPassword) {
            // Si el login es correcto, cambiamos el valor de la variable y salimos del bucle
            loginSuccess = true;
            break;
        }
    }
    if (loginSuccess) {
        // Si el login es correcto, cambiamos el valor de la variable loginStatus a "true" y lo guardamos en localStorage
        localStorage.setItem("loginStatus", "true");
        // Redirigimos al usuario a la página index2.htm
        window.location.href = form.action;
    } else {
        // Si el login es incorrecto, mostramos un mensaje de error
        alert("Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.");
    }
});
