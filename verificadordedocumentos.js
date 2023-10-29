<script src="https://cdnjs.cloudflare.com/ajax/libs/pkijs/2.0.27/pkijs.js"></script>
document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    var formData = new FormData(this);
    var pdfFile = formData.get('documento');

    // Leer el archivo PDF
    var pdfData = await readFileAsync(pdfFile);

    // Decodificar el archivo PDF
    var asn1 = pkijs.fromBER(pdfData);
    var pdfContent = new Uint8Array(asn1.result.valueBlock.valueHex);

    // Crear un objeto CMS SignedData
    var cmsSignedData = new pkijs.SignedData({ schema: asn1.result });

    // Verificar la firma
    var verificationResult = await cmsSignedData.verify({
        signer: 0, // Índice del firmante, puede variar si hay múltiples firmantes
        trustedCerts: [], // Lista de certificados de confianza (opcional)
        data: pdfContent // Contenido del PDF
    });

    if (verificationResult) {
        alert('La firma digital es válida.');
    } else {
        alert('La firma digital no es válida.');
    }
});

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        }

        reader.onerror = reject;

        reader.readAsArrayBuffer(file);
    });
}
