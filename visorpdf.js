// Cargar la biblioteca PDF.js (insertado en web)

// Escribir el código JavaScript para detectar y reemplazar los iframes de PDF
<script>
  // Definir las variables globales
  var pdfDoc = null; // El documento PDF
  var pageNum = 1; // El número de página actual
  var scale = 1; // El factor de escala actual
  var viewport = null; // El viewport del canvas
  var renderTask = null; // La tarea de renderizado del canvas

  // Definir la función para cargar el archivo PDF
  function loadPDF(url, iframe) {
    // Obtener el documento PDF usando PDF.js
    PDFJS.getDocument(url).then(function (doc) {
      // Guardar el documento PDF en la variable global
      pdfDoc = doc;
      // Crear los elementos HTML para el visor de PDF dentro del iframe
      var viewer = document.createElement("canvas");
      viewer.id = "viewer";
      var controls = document.createElement("div");
      controls.id = "controls";
      var prev = document.createElement("button");
      prev.id = "prev";
      prev.textContent = "Anterior";
      var next = document.createElement("button");
      next.id = "next";
      next.textContent = "Siguiente";
      var zoomIn = document.createElement("button");
      zoomIn.id = "zoom-in";
      zoomIn.textContent = "Zoom +";
      var zoomOut = document.createElement("button");
      zoomOut.id = "zoom-out";
      zoomOut.textContent = "Zoom -";
      var pageInput = document.createElement("input");
      pageInput.id = "page-num";
      pageInput.type = "number";
      pageInput.value = "1";
      pageInput.min = "1";
      controls.appendChild(prev);
      controls.appendChild(pageInput);
      controls.appendChild(next);
      controls.appendChild(zoomIn);
      controls.appendChild(zoomOut);
      iframe.contentDocument.body.innerHTML = "";
      iframe.contentDocument.body.appendChild(viewer);
      iframe.contentDocument.body.appendChild(controls);
      
      // Mostrar el número total de páginas en el campo de entrada
      pageInput.max = pdfDoc.numPages;
      
      // Renderizar la primera página en el canvas
      renderPage(pageNum, viewer, pageInput);

      // Añadir los eventos a los botones y al campo de entrada
      prev.addEventListener("click", function () {
        changePage(-1, viewer, pageInput);
      });
      next.addEventListener("click", function () {
        changePage(1, viewer, pageInput);
      });
      zoomIn.addEventListener("click", function () {
        changeScale(0.25, viewer);
      });
      zoomOut.addEventListener("click", function () {
        changeScale(-0.25, viewer);
      });
      pageInput.addEventListener("change", function () {
        // Obtener el número de página introducido por el usuario
        var num = parseInt(this.value);
        // Comprobar si el número de página es válido
        if (num < 1) {
          num = 1;
        } else if (num > pdfDoc.numPages) {
          num = pdfDoc.numPages;
        }
        // Actualizar el número de página global
        pageNum = num;
        // Renderizar la página actual en el canvas
        renderPage(pageNum, viewer, pageInput);
      });

    });
  }

  // Definir la función para renderizar una página en el canvas
  function renderPage(num, viewer, pageInput) {
    // Cancelar la tarea de renderizado anterior si existe
    if (renderTask) {
      renderTask.cancel();
    }
    // Obtener la página del documento PDF usando PDF.js
    pdfDoc.getPage(num).then(function (page) {
      // Calcular el viewport del canvas usando el factor de escala
      viewport = page.getViewport(scale);
      
       // Ajustar el tamaño del canvas al viewport
       viewer.width = viewport.width;
       viewer.height = viewport.height;

       // Obtener el contexto del canvas
       var context = viewer.getContext("2d");

       // Limpiar el canvas
       context.clearRect(0, 0, viewport.width, viewport.height);

       // Renderizar la página en el canvas usando PDF.js
       renderTask = page.render({
         canvasContext: context,
         viewport: viewport,
       });
    });
  }

  // Definir la función para cambiar de página
  function changePage(offset, viewer, pageInput) {
    // Actualizar el número de página según el desplazamiento
    pageNum += offset;
    // Comprobar si el número de página es válido
    if (pageNum < 1) {
      pageNum = 1;
    } else if (pageNum > pdfDoc.numPages) {
      pageNum = pdfDoc.numPages;
    }
    // Mostrar el número de página actual en el campo de entrada
    pageInput.value = pageNum;
    // Renderizar la página actual en el canvas
    renderPage(pageNum, viewer, pageInput);
  }

  // Definir la función para cambiar el factor de escala
  function changeScale(offset, viewer) {
    // Actualizar el factor de escala según el desplazamiento
    scale += offset;
    // Comprobar si el factor de escala es válido
    if (scale < 0.25) {
      scale = 0.25;
    } else if (scale > 4) {
      scale = 4;
    }
    // Renderizar la página actual en el canvas con el nuevo factor de escala
    renderPage(pageNum, viewer);
  }

  // Habilitar el zoom mediante gestos en dispositivos móviles
  PDFJS.useOnlyCssZoom = true;

  // Detectar todos los iframes de la web que tengan un atributo src que termine en .pdf
  var iframes = document.querySelectorAll("iframe[src$='.pdf']");
  
  // Recorrer los iframes y comprobar si el navegador puede mostrar el .pdf de forma nativa
  for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];
    var url = iframe.src;
    
    // Comprobar si el navegador soporta el formato PDF nativamente
    if (PDFJS.disableWorker) {
      // El navegador no lo soporta, usar el visor personalizado
      loadPDF(url, iframe);
    } else {
      // El navegador lo soporta, no hacer nada
      continue;
    }
  }
</script>
