// Función para formatear la fecha y la hora
function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}

// Función para añadir el texto al imprimir la página web
function addPrintText() {
  // Crear un elemento div para contener el texto
  let printDiv = document.createElement("div");
  printDiv.id = "print-text";
  printDiv.style.position = "fixed";
  printDiv.style.top = "0";
  printDiv.style.left = "0";
  printDiv.style.width = "100%";
  printDiv.style.height = "100%";
  printDiv.style.zIndex = "9999";

  // Crear un elemento span para el texto superior izquierdo
  let topLeftSpan = document.createElement("span");
  topLeftSpan.style.position = "absolute";
  topLeftSpan.style.top = "0";
  topLeftSpan.style.left = "0";
  topLeftSpan.style.padding = "10px";
  topLeftSpan.style.fontFamily = "Arial, sans-serif";
  topLeftSpan.style.fontSize = "12px";
  topLeftSpan.textContent =
    "https://apuntesdederechoespanol.blogspot.com";

  // Crear un elemento span para el texto superior derecho
  let topRightSpan = document.createElement("span");
  topRightSpan.style.position = "absolute";
  topRightSpan.style.top = "0";
  topRightSpan.style.right = "0";
  topRightSpan.style.padding = "10px";
  topRightSpan.style.fontFamily = "Arial, sans-serif";
  topRightSpan.style.fontSize = "12px";
  
  // Obtener la fecha y la hora actual
  let now = new Date();
  
  // Formatear la fecha y la hora
  let formattedDate = formatDate(now);
  
  // Asignar el texto con la fecha y la hora al elemento span
  topRightSpan.textContent =
    `Fecha y hora de creación del PDF: ${formattedDate}`;

  // Crear un elemento span para el texto inferior central
  let bottomCenterSpan = document.createElement("span");
  bottomCenterSpan.style.position = "absolute";
  bottomCenterSpan.style.bottom = "0";
  bottomCenterSpan.style.left = "50%";
  bottomCenterSpan.style.transform = "translateX(-50%)";
  bottomCenterSpan.style.padding = "10px";
  bottomCenterSpan.style.fontFamily = "Arial, sans-serif";
  bottomCenterSpan.style.fontSize = "12px";
  
   // Asignar el texto con la licencia al elemento span
   bottomCenterSpan.textContent =
    `Apuntes de Derecho Español by MBC is licensed under CC BY-NC-ND 4.0`;

   // Añadir los elementos span al elemento div
   printDiv.appendChild(topLeftSpan);
   printDiv.appendChild(topRightSpan);
   printDiv.appendChild(bottomCenterSpan);

   // Añadir el elemento div al cuerpo de la página web
   document.body.appendChild(printDiv);
}

// Añadir un evento al imprimir la página web
window.addEventListener("beforeprint", addPrintText);

// Añadir un evento al terminar de imprimir la página web
window.addEventListener("afterprint", function () {
  
   // Eliminar el elemento div del cuerpo de la página web
   let printDiv = document.getElementById("print-text");
   document.body.removeChild(printDiv);
});
