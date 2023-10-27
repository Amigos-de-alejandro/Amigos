function generateCode() {
  var title = document.querySelector('h1').innerText;
  var firstParagraph = document.querySelector('p').innerText;
  var excerpt = firstParagraph.split(' ').slice(0, 34).join(' ');
  var featuredImage = document.querySelector('img:not(.site-logo)');
  var imageUrl = featuredImage.src;

  var code = '<div class="entrada">\n';
  code += '  <img src="' + imageUrl + '" alt="Imagen solo con fines ilustrativos y decorativos que busca hacer mas amena la lectura" width="100" height="100">\n';
  code += '  <h3>' + title + '</h3>\n';
  code += '  <p>' + excerpt + '...</p>\n';
  code += '  <p>Publicada: ' + new Date().toLocaleDateString() + '</p>\n';
  code += '  <button><a href="' + window.location.href + '">Leer entrada...</a></button>\n';
  code += '</div>';

  alert('Copia y pega este código donde quieras insertar esta entrada:\n\n' + code);
}
