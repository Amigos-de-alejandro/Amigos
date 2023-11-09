// Importar el módulo crypto de Node.js
const crypto = require('crypto');

// Crear una función para generar una clave pública y privada usando el algoritmo RSA
// La función recibe un parámetro opcional que es la longitud del módulo en bits, por defecto es 2048
// La función devuelve un objeto con las propiedades publicKey y privateKey, que son cadenas en formato PEM y codificadas en base64
function generateKeyPair(modulusLength = 2048) {
  // Usar el método generateKeyPairSync de crypto para generar una clave pública y privada
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength,
  });
  // Devolver el objeto con las claves
  return { publicKey, privateKey };
}

// Crear una función para crear un usuario y una contraseña
// La función recibe un parámetro que es el nombre de usuario
// La función genera una clave pública y privada usando la función anterior
// La función devuelve un objeto con las propiedades username y password, donde la contraseña es la clave pública del usuario
function createUser(username) {
  // Generar una clave pública y privada
  const { publicKey, privateKey } = generateKeyPair();
  // Devolver el objeto con el usuario y la contraseña
  return { username, password: publicKey };
}

// Crear una función para mostrar el usuario y la contraseña por consola
// La función recibe un parámetro que es el objeto con el usuario y la contraseña
// La función imprime el usuario y la contraseña por consola
function showUser(user) {
  // Imprimir el usuario y la contraseña por consola
  console.log(`Usuario: ${user.username}`);
  console.log(`Contraseña: ${user.password}`);
}

// Crear una función para escribir el usuario y la contraseña en la página
// La función recibe un parámetro que es el objeto con el usuario y la contraseña
// La función usa el método document.write para escribir el usuario y la contraseña en la página
function writeUser(user) {
  // Escribir el usuario y la contraseña en la página
  document.write(`<p>Usuario: ${user.username}</p>`);
  document.write(`<p>Contraseña: ${user.password}</p>`);
}

// Crear un usuario y una contraseña para cada uno de los siguientes nombres de usuario
const usernames = ['alice', 'bob', 'charlie'];
// Recorrer el array de nombres de usuario
for (let username of usernames) {
  // Crear un usuario y una contraseña para cada nombre de usuario
  const user = createUser(username);
  // Mostrar el usuario y la contraseña por consola
  showUser(user);
  // Escribir el usuario y la contraseña en la página
  writeUser(user);
}
