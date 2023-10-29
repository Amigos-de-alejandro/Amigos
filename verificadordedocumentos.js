document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);
    var documento = formData.get('documento');

    var certificadoValido = verificarCertificado(documento);

    if (certificadoValido) {
        alert('Certificado correcto. En principio, tenga la precaución de que este mecanismo no es 100% certero. Le recomendamos verificación manual.');
    } else {
        alert('Firma digital no válida. Ese documento no es íntegro ni seguro. No es nuestro. Borrelo y descárguelo de nuevo.');
    }
});

function verificarCertificado(documento) {
    var certificadoEsperado = "92837485dc17f35701a3d2cc587716ead3ad920def970c5bf953f0a5e9a0d1b5";
    return documento === certificadoEsperado;
}
