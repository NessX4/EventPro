const API_URL = 'http://192.168.88.166:3005'; 

const estadoAvanceOptions = [' ', 'INFORMACION COMPLETADA', 'ESTANDARIZADO', 'INCOMPLETO', 'INACTIVO'];
        const generalOptions = [' ','DONE', 'PROCESS', 'HOLD', 'NO DATA', 'TALLER', 'TO DO', 'N/A'];
        const versionOptions = [' ','1','2','3', '4', '5', '6', '7', '8', '9', 'BYE'];

        function init() {
            document.querySelectorAll('select').forEach(select => {
                if (!select.value || !select.querySelector(`option[value="${select.value}"]`)) {
                    select.value = ''; 
                }
                updateCellColor(select.parentElement);
            });
        }

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------        
        //funcion para colocarle colores a los options dedicando un color diferente dependiento el estado del punto
        function updateCellColor(cell) {
            const select = cell.querySelector('select');
            const value = select.value;
        
            const colors = {
                'DONE': '#5FBF7A',
                'PROCESS': '#FFD966',
                'HOLD': '#EC7A7A',
                'NO DATA': '#5B90C4',
                'TALLER': '#A3A3A3',
                'TO DO': '#60C2B2',
                'N/A': '#5FBF7A',
                'INFORMACION COMPLETADA': '#78A778',
                'ESTANDARIZADO': '#88C157',
                'INCOMPLETO': '#729AB6',
                'INACTIVO': '#848484'
            };
        
            if (colors[value]) {
                select.style.backgroundColor = colors[value];
                select.style.color = value === 'NO DATA' || value === 'INACTIVO' ? 'white' : 'black';
            } else {
                select.style.backgroundColor = '#FFFFFF'; 
                select.style.color = 'black';
            }
        }
        
      document.addEventListener('DOMContentLoaded', function () {
    
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach(select => {
        if (!select.value) select.value = ' '; 
        updateCellColor(select.parentElement);
    });
});

document.addEventListener('change', function (event) {
    if (event.target.tagName === 'SELECT') {
        updateCellColor(event.target.parentElement);
    }
});
        document.getElementById('uploadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);

            fetch(`${API_URL}/upload`,{
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('response').innerText = data.message;
                loadImages();
            })
            .catch(error => {
                document.getElementById('response').innerText = 'Error: ' + error;
            });
        });
        



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //funcion para cargar los datos de la tabla jalados del back y de ahi jaladode la base de datos
        async function cargarDatos() {
            const response = await fetch(`${API_URL}/imagenes`);
            const datos = await response.json();
      
            const datosAgrupados = datos.reduce((grupos, dato) => {
              
                const familiaLower = dato.familia ? dato.familia.toLowerCase() : 'sf';
                
                if (!grupos[familiaLower]) {
                    grupos[familiaLower] = [];
                }
                grupos[familiaLower].push(dato);
                return grupos;
            }, {});
            
            const familiasOriginales = Object.keys(datosAgrupados).map(familia => familia.toUpperCase());
            
                               
            
            const familiasNombres = {
                'a': 'ottomans / bench',
                'b': 'lounge chairs',
                'c': 'recliners',
                'd': 'sofas / sectionals',
                'e': 'chaise',
                'f': 'chairs',
                'g': 'bar stools',
                'h': 'headboards',
                'i': 'banquettes',
                'j': 'task chairs',
                'sf': 'sin familia'
            };
            
           
            function obtenerNombreFamilia(letra) {
                return familiasNombres[letra.toLowerCase()] || 'Sin Familia';
            }
            
            const tbody = document.getElementById('imageTable');
            tbody.innerHTML = '';
            
            // Parámetros para la paginación
            const familias = Object.keys(datosAgrupados);
            const elementosPorPagina = 1; 
            let paginaActual = 1;
            

            window.mostrarPagina = function(pagina) {
                tbody.innerHTML = ''; 

                const inicio = (pagina - 1) * elementosPorPagina;
                const fin = inicio + elementosPorPagina;
                const familiasPorPagina = familias.slice(inicio, fin);
  
                familiasPorPagina.forEach((familia) => {
                    const grupo = datosAgrupados[familia];
            
                    
                    const nombreFamilia = obtenerNombreFamilia(familia);
            
                    const encabezado = document.createElement('tr');
                    encabezado.innerHTML = `
                      <style>
                            @keyframes slideInFromLeft {
                                0% {
                                    transform: translateX(-100%);
                                    opacity: 0;
                                }
                                100% {
                                    transform: translateX(0);
                                    opacity: 1;
                                }
                            }

                            .animated-text {
                                display: inline-block;
                                overflow: hidden;
                                white-space: nowrap;
                            }

                            .animated-text span {
                                display: inline-block;
                                opacity: 0;
                                animation: slideInFromLeft 1.5s ease forwards;
                                animation-delay: calc(0.1s * var(--i));
                            }
                        </style>

                        <td colspan="27" style="font-weight: bold; background-color: #8f8df0; color: #1F618D; text-align: center; border: 6px solid #5c5aec; font-size: 28px; padding: 25px; border-radius: 10px; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);">
                            <p class="animated-text" style="color: white; font-size: 45px; font-family: 'Arial', sans-serif; letter-spacing: 1.5px; line-height: 1.5; margin: 0;">
                                <span style="font-weight: bold; color: white; text-transform: uppercase;" class="letter">${nombreFamilia}</span>
                            </p>
                        </td>

                        <script>
                            // Dividir el texto en letras individuales
                            document.querySelectorAll('.animated-text').forEach(function (element) {
                                const text = element.innerText;
                                element.innerHTML = '';
                                
                                text.split('').forEach(function (letter, index) {
                                    const span = document.createElement('span');
                                    span.style.setProperty('--i', index);  // Establecer un retraso para cada letra
                                    span.innerText = letter;
                                    element.appendChild(span);
                                });
                            });
                        </script>
                        `;
            
                    tbody.appendChild(encabezado);
        
                grupo.forEach((dato, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML =   `
                    <td>
                        <button class="bin-button" onclick="deleteImage(${dato.id})">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 39 7"
                            class="bin-top"
                        >
                            <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                            <line
                            stroke-width="3"
                            stroke="white"
                            y2="1.5"
                            x2="26.0357"
                            y1="1.5"
                            x1="12"
                            ></line>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 33 39"
                            class="bin-bottom"
                        >
                            <mask fill="white" id="path-1-inside-1_8_19">
                            <path
                                d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                            ></path>
                            </mask>
                            <path
                            mask="url(#path-1-inside-1_8_19)"
                            fill="white"
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                            ></path>
                            <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                            <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 89 80"
                            class="garbage"
                        >
                            <path
                            fill="white"
                            d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                            ></path>
                        </svg>
                        </button>
                    </td>
                    <td style="font-weight: bold;" contenteditable="flase">${index + 1}</td>
                   <td>
                    <img src="${API_URL}/imagenVizual/${dato.id}" alt="${dato.nombre}" width="100"  class="image-bordered"    data-id="${dato.id}"  onclick="openModal('${dato.id}')"> </td>
                    <td contenteditable="true" data-field="familia" data-id="${dato.id}">${dato.familia || ''}</td>
                    <td contenteditable="true" data-field="codigoInterno" data-id="${dato.id}">${dato.codigoInterno || ''}</td>
                    <td contenteditable="true" data-field="description" data-id="${dato.id}">${dato.description || ''}</td>
                    <td>
                        <select class="text" data-field="estadoAvance" data-id="${dato.id}" onchange="manejarCambio(event); updateCellColor(this.parentElement)">
    
                            ${estadoAvanceOptions.map(option => `<option value="${option}" ${dato.estadoAvance === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                    <td contenteditable="true" data-field="SeatType" data-id="${dato.id}">${dato.SeatType || ''}</td>
                    <td contenteditable="true" data-field="w" data-id="${dato.id}">${dato.w || ''}</td>
                    <td contenteditable="true" data-field="d" data-id="${dato.id}">${dato.d || ''}</td>
                    <td contenteditable="true" data-field="h" data-id="${dato.id}">${dato.h || ''}</td>
                    <td contenteditable="true" data-field="ah" data-id="${dato.id}">${dato.ah || ''}</td>
                    <td contenteditable="true" data-field="sh" data-id="${dato.id}">${dato.sh || ''}</td>
                    <td contenteditable="true" data-field="igualdadOrden" data-id="${dato.id}">${dato.igualdadOrden || ''}</td>
                    <td>
                        <select class="text" data-field="cad" data-id="${dato.id}" onchange="manejarCambio(event)">
                            ${generalOptions.map(option => `<option value="${option}" ${dato.cad === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <select class="text" data-field="nube" data-id="${dato.id}" onchange="manejarCambio(event)">
                            ${generalOptions.map(option => `<option value="${option}" ${dato.nube === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <select class="text" data-field="version" data-id="${dato.id}" onchange="manejarCambio(event)">
                            ${versionOptions.map(option => `<option value="${option}" ${dato.version === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <select class="text" data-field="frameEnsamble" data-id="${dato.id}" onchange="manejarCambio(event)">
                            ${generalOptions.map(option => `<option value="${option}" ${dato.frameEnsamble === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <select class="text" data-field="maderaExpuesta" data-id="${dato.id}" onchange="manejarCambio(event)">
                            ${generalOptions.map(option => `<option value="${option}" ${dato.maderaExpuesta === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <select class="text" data-field="cnc" data-id="${dato.id}" onchange="manejarCambio(event)">
                            ${generalOptions.map(option => `<option value="${option}" ${dato.cnc === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <select class="text" data-field="kaizen" data-id="${dato.id}" onchange="manejarCambio(event)">
                            ${generalOptions.map(option => `<option value="${option}" ${dato.kaizen === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                    <td contenteditable="true" data-field="comentarios" data-id="${dato.id}">${dato.comentarios || ''}</td>
                    <td>
                        <select class="text" data-field="tela" data-id="${dato.id}" onchange="manejarCambio(event)">
                            ${generalOptions.map(option => `<option value="${option}" ${dato.tela === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <select class="text" data-field="foam" data-id="${dato.id}" onchange="manejarCambio(event)">
                            ${generalOptions.map(option => `<option value="${option}" ${dato.foam === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <select class="text" data-field="kuris" data-id="${dato.id}" onchange="manejarCambio(event)">
                            ${generalOptions.map(option => `<option value="${option}" ${dato.kuris === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <select class="text" data-field="boms" data-id="${dato.id}" onchange="manejarCambio(event)">
                            ${generalOptions.map(option => `<option value="${option}" ${dato.boms === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <select class="text" data-field="qcValidacion" data-id="${dato.id}" onchange="manejarCambio(event)">
                            ${generalOptions.map(option => `<option value="${option}" ${dato.qcValidacion === option ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </td>
                `;
                    tbody.appendChild(row);
                    const selects = row.querySelectorAll('select');
                    selects.forEach(select => updateCellColor(select.parentElement));
                });
            });

            actualizarPaginacion(pagina);
            
        }
   
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 // Definición de familiasNombres (única vez)
const familiasNombre = {
    'a': 'Ottomans / bench',
    'b': 'Lounge chairs',
    'c': 'Recliners',
    'd': 'Sofas / Sectionals',
    'e': 'Chaise',
    'f': 'Chairs',
    'g': 'Bar stools',
    'h': 'Headboards',
    'i': 'Banquettes',
    'j': 'Task chairs',
    'sf': 'Sin familia'
};

function actualizarPaginacion(pagina) {
    const totalFamilias = Object.keys(datosAgrupados).length; 
    const totalPaginas = Math.ceil(totalFamilias / elementosPorPagina);
    const paginacion = document.getElementById('pagination');
    paginacion.innerHTML = '';


    const letrasFamilias = Object.keys(datosAgrupados);

    
    for (let i = 0; i < totalPaginas; i++) {
        const letraFamilia = letrasFamilias[i]; 
        if (familiasNombre[letraFamilia]) { 
            const nombreFamilia = familiasNombre[letraFamilia]; 
            const seleccionado = pagina === i + 1 ? 'seleccionado' : '';
            const deshabilitado = pagina === i + 1 ? 'disabled' : ''; 
            paginacion.innerHTML += `<button class="paginacion-btn ${seleccionado} ${deshabilitado}" onclick="mostrarPagina(${i + 1})" ${deshabilitado ? 'disabled' : ''}>${nombreFamilia}</button>`;
        }
    }
}

// Mostrar la primera página
mostrarPagina(paginaActual);

    }        
    // Asegurarnos de que la función se ejecute una vez que el DOM esté cargado
    document.addEventListener('DOMContentLoaded', cargarDatos );
    
    document.addEventListener("input", (event) => {
        const celda = event.target;
    
        if (celda.hasAttribute("contenteditable") && celda.getAttribute("data-id") && celda.getAttribute("data-field")) {
            manejarCambio(event);
        }
        
    });
    

 //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            let scrollPosition = 0;  
            //funcion para abrir la modal y mostrar la informacion de cada fila individualmente de forma odernada
            function openModal(id) {

                scrollPosition = window.scrollY;
            
                document.body.style.overflow = 'hidden';  
            
                const stickyElements = document.querySelectorAll('.s2, .s4, .s5, .s6, .s7, .s8 ,.borrar , .s9');
                stickyElements.forEach(element => {
                    element.style.visibility = 'hidden';  
                });
            
                fetch(`${API_URL}/datos/${id}`)
                    .then(response => response.json())
                    .then(data => {
                        const modal = document.getElementById('myModal');
                        const modalImage = document.getElementById('modalImage');
                        const modalInfo = document.getElementById('modalInfo');
                        
                        modal.style.display = 'block';

                        const newImageSrc = `${API_URL}/imagenVizual/${id}?t=${new Date().getTime()}`;
                        modalImage.src = newImageSrc;
            
                        const getValue = (value) => (value === "" || value === null || value === undefined ? 'N/A' : value);
                        
                        modalInfo.innerHTML = `
                        <div class="modalInfo">
                            <p><strong class="modal-label">Familia:</strong> ${getValue(data.familia)}</p>
                            <p><strong class="modal-label">Código Interno:</strong> ${getValue(data.codigoInterno)}</p>
                            <p><strong class="modal-label">Descripción:</strong> ${getValue(data.description)}</p>
                            <p><strong class="modal-label">Orden:</strong> ${getValue(data.igualdadOrden)}</p>
                            <p><strong class="modal-label">Seat Type:</strong> ${getValue(data.SeatType)}</p>
                            <p><strong class="modal-label">Ancho:</strong> ${getValue(data.w)}″</p>
                            <p><strong class="modal-label">Profundidad:</strong> ${getValue(data.d)}″</p>
                            <p><strong class="modal-label">Altura:</strong> ${getValue(data.h)}″</p>
                            <p><strong class="modal-label">Altura del Brazo:</strong> ${getValue(data.ah)}″</p>
                            <p><strong class="modal-label">Altura del Asiento:</strong> ${getValue(data.sh)}″</p>
                        </div>
                    `;

            
                    })
                    .catch(error => {
                        console.error('Error al cargar los datos:', error);
                    });
            }
     
 //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------          
     // Función para eliminar la imagen individualmente
function deleteImage(id) {
    // Usar SweetAlert2 para la confirmación de eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Realizar la petición DELETE
            fetch(`${API_URL}/deleteImage/${id}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Imagen eliminada exitosamente.') {
                    // Alerta de éxito con SweetAlert2
                    Swal.fire({
                        title: 'Éxito',
                        text: 'Imagen eliminada con éxito.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    // Eliminar la fila correspondiente en la tabla
                    const row = document.querySelector(`tr[data-id="${id}"]`);
                    if (row) {
                        row.remove();  
                    }
                    cargarDatos();  // Recargar los datos
                } else {
                    // Alerta de error con SweetAlert2
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al eliminar la imagen.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            })
            .catch(error => {
                console.error('Error al eliminar la imagen:', error);
                // Alerta de error en caso de fallo de la petición
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al eliminar la imagen.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });
        }
    });
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //funcion para cerrar la modal 
        function closeModal() {
            const modal = document.getElementById('myModal');
            modal.style.display = 'none';  

            
            const stickyElements = document.querySelectorAll('.s2, .s4, .s5, .s6, .s7, .s8 , .s9 , .borrar');
            stickyElements.forEach(element => {
                element.style.visibility = 'visible';  
            });
            
            document.body.style.overflow = 'auto';  
            
            window.scrollTo(0, scrollPosition);
        }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //funcion para actualizar campos de la tabla tipo texto solamente
        async function manejarCambio(event) {
            const elemento = event.target;
            const id = elemento.getAttribute('data-id');
            const campo = elemento.getAttribute('data-field');

            let nuevoValor;

            if (elemento.tagName === "SELECT") {
                nuevoValor = elemento.value; 
            } else {
                nuevoValor = elemento.textContent.trim(); 
            }

            try {
                const response = await fetch(`${API_URL}/imagen/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ [campo]: nuevoValor }),
                });

                if (!response.ok) {
                    throw new Error(`Error al actualizar el campo ${campo} para el ID ${id}`);
                }

                console.log(`Actualizado: ${campo} => ${nuevoValor}`);
            } catch (error) {
                console.error("Error en la actualización:", error);
                alert("No se pudo actualizar el campo. Inténtalo nuevamente.");
            }
            
        }

            
            const selectElements = document.querySelectorAll('select');
            selectElements.forEach(updateCellColor);
        
                
               
            const modalImage = document.getElementById('modalImage');
            modalImage.addEventListener('dragover', (e) => {
                e.preventDefault();
                modalImage.classList.add('drag-over');
            });
            modalImage.addEventListener('dragleave', () => {
                modalImage.classList.remove('drag-over'); 
            });

            modalImage.addEventListener('drop', (e) => {
                e.preventDefault();
                modalImage.classList.remove('drag-over'); 
            
                const file = e.dataTransfer.files[0];
            
                if (!file) {
                    alert('Por favor, selecciona una imagen válida.');
                    return;
                }
            
                const reader = new FileReader();
                reader.onload = function (event) {
                    modalImage.src = event.target.result;
                };
                reader.readAsDataURL(file);
    updateImage(file);
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Función para actualizar la imagen en el servidor
function updateImage(file) {
    const id = modalImage.src.split('/').pop().split('?')[0]; 

    const formData = new FormData();
    formData.append('imagen', file); 
    formData.append('id', id); 

    fetch(`${API_URL}/imagen/${id}`, {
        method: 'PATCH',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            // Mostrar alerta de éxito con SweetAlert2
            Swal.fire({
                title: 'Éxito',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            // Actualizar la imagen en el modal
            modalImage.src = `${API_URL}/imagenVizual/${id}?t=${new Date().getTime()}`;

            // Actualizar la tabla de imágenes
            updateTableImage(id);
        } else {
            // Mostrar alerta de error con SweetAlert2
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar la imagen.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Mostrar alerta de error con SweetAlert2 en caso de fallo en la petición
        Swal.fire({
            title: 'Error',
            text: 'Hubo un error en la conexión al servidor.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    });
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function updateTableImage(id) {
    const tableImage = document.querySelector(`img[src*='${id}']`);

    if (tableImage) {
        tableImage.src = `${API_URL}/imagenVizual/${id}?t=${new Date().getTime()}`;
    } else {
        console.log('No se encontró la imagen en la tabla');
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Función para abrir el modal
function abrirInsertModal() {
    document.getElementById("insertModal").style.display = "block";
    scrollPosition = window.scrollY;  // Guarda la posición del scroll al abrir el modal

    // Bloquear el scroll al abrir el modal
    document.body.style.overflow = 'hidden';  

    // Ocultar los elementos sticky
    const stickyElements = document.querySelectorAll('.s2, .s4, .s5, .s6, .s7, .s8, .s9, .borrar');
    stickyElements.forEach(element => {
        element.style.visibility = 'hidden';  // Ocultar los elementos sticky
    });
    limpiarImagen();

}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Función para cerrar el modal
function cerrarInsertModal() {
    document.getElementById("insertModal").style.display = "none";
    document.body.style.overflow = '';  
    const stickyElements = document.querySelectorAll('.s2, .s4, .s5, .s6, .s7, .s8, .s9, .borrar');
    stickyElements.forEach(element => {
        element.style.visibility = 'visible';  
    });
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function enviarDatos() {
    const form = document.getElementById('formInsert');
    const formData = new FormData(form);
    const imagenInput = document.getElementById('imagen');

    // Verificar si se seleccionó una imagen
    if (imagenInput.files.length > 0) {
        formData.append("imagen", imagenInput.files[0]);
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, selecciona una imagen.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return; 
    }

    fetch(`${API_URL}/insertImage`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Mostrar alerta de éxito
        Swal.fire({
            title: 'Éxito',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Limpiar el formulario después de la inserción
        form.reset();

        // Limpiar el campo de imagen (si deseas también resetearlo)
        imagenInput.value = '';

        // Cerrar el modal
        cerrarInsertModal();  
    })
    .catch(error => {
        console.error('Error:', error);
        // Mostrar alerta de error
        Swal.fire({
            title: 'Error',
            text: 'Hubo un error al enviar los datos. Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    });

    cargarDatos();  // Recargar los datos
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Permitir soltar elementos en el área
function allowDrop(event) {
    event.preventDefault();
    const dragArea = document.getElementById('dragArea');
    dragArea.classList.add('drag-over');
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Remover la clase al salir del área
function handleDragLeave(event) {
    const dragArea = document.getElementById('dragArea');
    dragArea.classList.remove('drag-over'); 
    
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Manejar el archivo soltado
function handleDrop(event) {
    event.preventDefault();
    const dragArea = document.getElementById('dragArea');
    dragArea.classList.remove('drag-over'); 
    const file = event.dataTransfer.files[0]; 
    if (file && file.type.startsWith('image/')) {
        mostrarImagen(file); 
        document.getElementById('imagen').files = event.dataTransfer.files; 
    } else {
        alert('Por favor, suelta una imagen válida.');
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Manejar cambio desde el input file
function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        mostrarImagen(file); 
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Mostrar la imagen en el contenedor
function mostrarImagen(file) {
    const previewImage = document.getElementById('previewImage');
    const reader = new FileReader();
    reader.onload = function(event) {
        previewImage.src = event.target.result;
        previewImage.style.display = 'block'; // Hacer visible la imagen
    };
    if (file) {
        reader.readAsDataURL(file); // Leer la imagen como URL
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Función para obtener la fecha actual en formato MM/DD/YYYY
function obtenerFecha() {
    const hoy = new Date();
    const mes = hoy.getMonth() + 1; // Los meses en JavaScript empiezan en 0
    const dia = hoy.getDate();
    const anio = hoy.getFullYear();

    // Formatear la fecha en MM/DD/YYYY
    const fechaFormateada = `${mes < 10 ? '0' + mes : mes}/${dia < 10 ? '0' + dia : dia}/${anio}`;

    // Asignar la fecha al elemento con id "fecha"
    document.getElementById("fecha").textContent = "Fecha: " + fechaFormateada;
}

// Llamar a la función para establecer la fecha
obtenerFecha();

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Función para limpiar la imagen cargada y el input de archivo
function limpiarImagen() {
    const previewImage = document.getElementById('previewImage');
    previewImage.src = '';
    previewImage.style.backgroundColor = 'white'; 
    previewImage.style.display = 'block'; 
}
cargarDatos();

  init();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------