// Función para inicializar el evento de envío del formulario
function init() {
    document.getElementById('imageForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const imageInput = document.getElementById('imageInput');
        const file = imageInput.files[0];

        if (!file) {
            alert('Por favor selecciona una imagen');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            // Realizar la solicitud POST al servidor Flask con la imagen
            const response = await fetch('http://192.168.88.198:5000/buscar', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('No se pudo obtener la imagen');
            }

            const data = await response.json();

            // Limpiar resultados anteriores
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (data.similares && data.similares.length > 0) {
                data.similares.forEach(imageData => {
                    const imgElement = document.createElement('img');
                    imgElement.src = `data:image/jpeg;base64,${imageData.base64}`;
                    resultsDiv.appendChild(imgElement);
                });
            } else {
                resultsDiv.innerHTML = '<p>No se encontraron imágenes similares.</p>';
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al intentar buscar la imagen.');
        }
    });
}

// Llamar la función init cuando la página esté cargada
document.addEventListener('DOMContentLoaded', init);
