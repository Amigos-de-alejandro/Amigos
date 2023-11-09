// login.js
// Este archivo contiene la lógica para validar el login del usuario

// Obtenemos los elementos del formulario
var form = document.getElementById("login-form");
var username = document.getElementById("username");
var password = document.getElementById("password");
var submit = document.getElementById("submit");

// Añadimos un evento al botón de enviar
submit.addEventListener("click", function(event) {
    // Evitamos que el formulario se envíe por defecto
    event.preventDefault();
    // Hacemos una petición al servidor para obtener el archivo json con los datos de verificación
    fetch("9_JS/user.json")
        .then(function(response) {
            // Convertimos la respuesta en un objeto javascript
            return response.json();
        })
        .then(function(data) {
            // Declaramos una variable para indicar si el login es correcto o no
            var loginSuccess = false;
            // Recorremos el array de objetos para validar el nombre de usuario y la contraseña
            for (var i = 0; i < data.length; i++) {
                var validUsername = data[i].username;
                var validPassword = data[i].password;
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
            // Si hay algún error en la petición, mostramos un mensaje de error
            alert("Ha ocurrido un error al obtener los datos de verificación. Inténtalo de nuevo.");
        });
});
