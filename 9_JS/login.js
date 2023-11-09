// Importar el módulo crypto de Node.js
const crypto = require('crypto');

// Crear una matriz de usuario y contraseña, donde la contraseña es la clave pública del usuario
// Se asume que la clave pública está en formato PEM y codificada en base64
// Se asume que la clave pública tiene una longitud de 2048 bits y usa el algoritmo RSA
// Se puede generar una clave pública y privada usando el método generateKeyPairSync de crypto
// Por ejemplo: const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
const loginData = [
  {
    username: 'alice',
    password: '-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAL4k+0fY1wq5m7l4XK9yX0w0aR8gq6lL\n0cX2z4WQrGZ7UjJ0x3YFQ7sXZ0tZm6xHm5xY5Z3iQ0N4ZwQZ0YyV0xMCAwEAAQ==\n-----END PUBLIC KEY-----\n',
  },
  {
    username: 'bob',
    password: '-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMKZkXZJQyY0Z3Z0oQZ0YyV0xMCAwEAAQ==\n-----END PUBLIC KEY-----\n',
  },
];

// Crear una función para verificar si el usuario y la clave privada coinciden con algún elemento de la matriz de datos de inicio de sesión
function verifyUser(username, privateKey, loginData) {
  // Recorrer la matriz de datos de inicio de sesión
  for (let item of loginData) {
    // Si el usuario coincide con algún elemento, intentar cifrar y descifrar un mensaje con la clave pública y la clave privada
    if (item.username === username) {
      // Crear un mensaje aleatorio de 32 bytes
      const message = crypto.randomBytes(32);
      // Cifrar el mensaje con la clave pública usando el método publicEncrypt de crypto
      const encrypted = crypto.publicEncrypt(item.password, message);
      // Intentar descifrar el mensaje cifrado con la clave privada usando el método privateDecrypt de crypto
      try {
        const decrypted = crypto.privateDecrypt(privateKey, encrypted);
        // Si el mensaje descifrado es igual al mensaje original, devolver verdadero
        if (decrypted.equals(message)) {
          return true;
        }
      } catch (error) {
        // Si ocurre un error al descifrar, significa que la clave privada no es válida, devolver falso
        return false;
      }
    }
  }
  // Si no hay coincidencia, devolver falso
  return false;
}

// Crear una función para guardar el usuario y la clave privada en el almacenamiento local del navegador
function saveUser(username, privateKey) {
  // Usar el método setItem para guardar el usuario y la clave privada como cadenas
  localStorage.setItem('username', username);
  localStorage.setItem('privateKey', privateKey);
}

// Crear una función para obtener el usuario y la clave privada del almacenamiento local del navegador
function getUser() {
  // Usar el método getItem para obtener el usuario y la clave privada como cadenas
  const username = localStorage.getItem('username');
  const privateKey = localStorage.getItem('privateKey');
  // Devolver un objeto con el usuario y la clave privada
  return { username, privateKey };
}

// Crear una función para borrar el usuario y la clave privada del almacenamiento local del navegador
function clearUser() {
  // Usar el método removeItem para borrar el usuario y la clave privada
  localStorage.removeItem('username');
  localStorage.removeItem('privateKey');
}

// Crear una función para crear un inicio de sesión
async function createLogin() {
  // Obtener el usuario y la clave privada del almacenamiento local del navegador
  const { username, privateKey } = getUser();
  // Si el usuario y la clave privada existen en el almacenamiento local, verificar si coinciden con algún elemento de la matriz de datos de inicio de sesión
  if (username && privateKey) {
    // Si hay coincidencia, mostrar un mensaje de bienvenida y salir de la función
    if (verifyUser(username, privateKey, loginData)) {
      alert(`Bienvenido ${username}`);
      return;
    }
    // Si no hay coincidencia, borrar el usuario y la clave privada del almacenamiento local y continuar con el proceso de inicio de sesión
    else {
      clearUser();
    }
  }
  // Si el usuario y la clave privada no existen en el almacenamiento local, pedir al usuario que introduzca su usuario y clave privada mediante el método prompt
  const inputUsername = prompt('Introduzca su usuario');
  const inputPrivateKey = prompt('Introduzca su clave privada');
  // Si el usuario y la clave privada introducidos no son nulos, verificar si coinciden con algún elemento de la matriz de datos de inicio de sesión
  if (inputUsername && inputPrivateKey) {
    // Si hay coincidencia, mostrar un mensaje de bienvenida, guardar el usuario y la clave privada en el almacenamiento local y salir de la función
    if (verifyUser(inputUsername, inputPrivateKey, loginData)) {
      alert(`Bienvenido ${inputUsername}`);
      saveUser(inputUsername, inputPrivateKey);
      return;
    }
    // Si no hay coincidencia, mostrar un mensaje de acceso denegado y salir de la función
    else {
      alert('Acceso denegado');
      return;
    }
  }
  // Si el usuario y la clave privada introducidos son nulos, mostrar un mensaje de que se requiere el usuario y la clave privada y salir de la función
  else {
    alert('Se requiere el usuario y la clave privada');
    return;
  }
}

// Llamar a la función createLogin para crear un inicio de sesión
createLogin();
