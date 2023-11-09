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
    // Usamos la función getCredential del objeto navigator para obtener las credenciales guardadas en el navegador
    navigator.credentials.get({
        password: true
    })
        .then(function(cred) {
            // Comprobamos si hay credenciales guardadas o no
            if (cred) {
                // Si hay credenciales guardadas, las usamos como valores del nombre de usuario y la contraseña
                username.value = cred.id;
                password.value = cred.password;
            }
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
                // Si el login es correcto, redirigimos al usuario a la página index2.htm
                window.location.href = form.action;
            } else {
                // Si el login es incorrecto, mostramos un mensaje de error
                alert("Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.");
            }
        })
        .catch(function(error) {
            // Si hay algún error al obtener las credenciales, mostramos un mensaje de error
            alert("Ha ocurrido un error al obtener las credenciales guardadas en el navegador. Inténtalo de nuevo.");
        });
});
