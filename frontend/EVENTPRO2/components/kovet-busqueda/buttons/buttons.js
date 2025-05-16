// Función init que inicializa la página
function init() {
    // Obtener el botón por su ID
    const button = document.getElementById('redirectButton');
    
    // Verificar si el botón existe antes de agregar el event listener
    if (button) {
        // Agregar el evento de click al botón
        button.addEventListener('click', redirectToFile);
    }
}

// Función para redirigir al usuario a otro archivo
function redirectToFile() {
    // Asegúrate de que esta ruta sea válida según tu estructura de directorios
    window.location.href = 'components/kovet-busqueda'; // Redirige a la ruta especificada
}

// Llamar a la función init cuando la página esté completamente cargada
window.onload = init;


//         const estadoAvanceOptions = [' ', 'INFORMACION COMPLETADA', 'ESTANDARIZADO', 'INCOMPLETO', 'INACTIVO'];
//         const generalOptions = [' ','DONE', 'PROCESS', 'HOLD', 'NO DATA', 'TALLER', 'TO DO', 'N/A'];
//         const versionOptions = [' ','1','2','3', '4', '5', '6', '7', '8', '9', 'BYE'];

     
//     function init() {
//         document.querySelectorAll('select').forEach(select => {
//             if (!select.value) {
//                 select.value = '';
//             }
//             updateCellColor(select.parentElement);
//         });
//     }
//     function updateCellColor(cell) {
//         const select = cell.querySelector('select');
//         const value = select.value;
        
//         const colors = {
//             'DONE': '#5FBF7A', // Verde vivo más claro
//             'PROCESS': '#FFD966', // Amarillo vivo más claro
//             'HOLD': '#EC7A7A', // Coral vivo más claro
//             'NO DATA': '#5B90C4', // Azul vivo más claro
//             'TALLER': '#A3A3A3', // Gris vivo más claro
//             'TO DO': '#60C2B2', // Cian vivo más claro
//             'N/A': '#5FBF7A', // Verde vivo más claro
//             'INFORMACION COMPLETADA': '#78A778', // Verde opaco más claro
//             'ESTANDARIZADO': '#88C157', // Verde brillante más claro
//             'INCOMPLETO': '#729AB6', // Azul grisáceo más claro
//             'INACTIVO': '#848484' // Gris oscuro más claro
//         };
//         // Si el valor tiene un color asignado
//         if (colors[value]) {
//             select.style.backgroundColor = colors[value];  // Cambia solo el fondo del select
            
//             // Cambia el color del texto dependiendo del color de fondo
//             if (value === 'INACTIVO') {
//                 select.style.color = 'white';  // Cambia el color del texto a blanco si el fondo es negro
//             } else {
//                 select.style.color = value === 'NO DATA' ? 'white' : 'black';  // Otros casos
//             }
//         } else {
//             select.style.backgroundColor = '';  // Sin color de fondo si no hay coincidencia
//             select.style.color = '';  // Restaura el color del texto
//         }
//     }
//         document.getElementById('uploadForm').addEventListener('submit', function(event) {
//             event.preventDefault();
//             const formData = new FormData(this);

//             fetch('http://192.168.30.208:3005/upload',{
//                 method: 'POST',
//                 body: formData,
//             })
//             .then(response => response.json())
//             .then(data => {
//                 document.getElementById('response').innerText = data.message;
//                 loadImages();
//             })
//             .catch(error => {
//                 document.getElementById('response').innerText = 'Error: ' + error;
//             });
//         });
//         function loadImages() {
//             fetch('http://192.168.30.208:3005/imagenes')
//                 .then(response => response.json())
//                 .then(images => {
//                     const tbody = document.getElementById('imageTable');
//                     tbody.innerHTML = '';
        
//                     images.forEach((image, index) => {
//                         const tr = document.createElement('tr');
//                         tr.innerHTML = `
//                             <td style="font-weight: bold;" contenteditable="true">${index + 1}</td>
//                       <td><img src="http://192.168.30.208:3005/imagen/${image.id}" alt="${image.nombre}" width="100" class="image-bordered" onclick="openModal('http://192.168.30.208:3005/imagen/${image.id}')"></td>

//                             <td contenteditable="true">${image.familia || ''}</td>
//                             <td contenteditable="true">${image.codigoInterno || ''}</td>
//                             <td contenteditable="true">${image.description || ''}</td>
//                             <td>
//                                 <select class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${estadoAvanceOptions.map(option => `<option value="${option}" ${image.estadoAvance === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>
//                             <td contenteditable="true">${image.w || ''}</td>
//                             <td contenteditable="true">${image.d || ''}</td>
//                             <td contenteditable="true">${image.h || ''}</td>
//                             <td contenteditable="true">${image.ah || ''}</td>
//                             <td contenteditable="true">${image.sh || ''}</td>
//                             <td contenteditable="true">${image.igualdadOrden || ''}</td>
//                             <td>
//                                 <select  class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${generalOptions.map(option => `<option value="${option}" ${image.cad === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>
//                             <td>
//                                 <select  class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${generalOptions.map(option => `<option value="${option}" ${image.nube === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>
//                             <td>
//                                 <select class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${versionOptions.map(option => `<option value="${option}" ${image.version === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>
//                             <td>
//                                 <select class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${generalOptions.map(option => `<option value="${option}" ${image.frameEnsamble === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>
//                             <td>
//                                 <select class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${generalOptions.map(option => `<option value="${option}" ${image.maderaExpuesta === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>
//                             <td>
//                                 <select class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${generalOptions.map(option => `<option value="${option}" ${image.cnc === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>
//                             <td>
//                                 <select class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${generalOptions.map(option => `<option value="${option}" ${image.kaizen === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>
//                             <td  contenteditable="true">${image.comentarios || ''}</td>
//                             <td>
//                                 <select class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${generalOptions.map(option => `<option value="${option}" ${image.tela === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>
//                             <td>
//                                 <select class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${generalOptions.map(option => `<option value="${option}" ${image.foam === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>
//                             <td>
//                                 <select class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${generalOptions.map(option => `<option value="${option}" ${image.kuris === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>
//                             <td>
//                                 <select class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${generalOptions.map(option => `<option value="${option}" ${image.boms === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>
//                             <td>
//                                 <select class="text" onchange="updateCellColor(this.parentElement)">
//                                     ${generalOptions.map(option => `<option value="${option}" ${image.qcValidacion === option ? 'selected' : ''}>${option}</option>`).join('')}
//                                 </select>
//                             </td>`;
//                         tbody.appendChild(tr);
        
//                         // Llamar a la función updateCellColor para cada select y actualizar el color de la celda
//                         tr.querySelectorAll('select').forEach(select => {
//                             updateCellColor(select.parentElement);
//                         });
//                     });
//                 })
//                 .catch(error => {
//                     console.error('Error al cargar las imágenes:', error);
//                 });
//         }
//       function openModal(imageUrl) {
//             // Guardar la posición de desplazamiento actual
//             scrollPosition = window.scrollY;
        
//             // Ocultar los encabezados fijos
//             const stickyElements = document.querySelectorAll('.s2, .s4, .s5, .s6, .s7, .s8');
//             stickyElements.forEach(element => {
//                 element.style.visibility = 'hidden'; // Cambiar `display: none` a `visibility: hidden`
//             });
        
//             // Mostrar el modal
//             const modal = document.getElementById('myModal');
//             const modalImage = document.getElementById('modalImage');
//             modal.style.display = 'block';
//             modalImage.src = imageUrl;
//         }
        
//         function closeModal() {
//             const modal = document.getElementById('myModal');
//             modal.style.display = 'none';
        
//             // Volver a mostrar los encabezados fijos
//             const stickyElements = document.querySelectorAll('.s2, .s4, .s5, .s6, .s7, .s8');
//             stickyElements.forEach(element => {
//                 element.style.visibility = 'visible'; // Cambiar `display: block` a `visibility: visible`
//             });
//             // Volver a la posición de desplazamiento anterior
//             window.scrollTo(0, scrollPosition);
//         }
//         document.querySelectorAll('.status-select').forEach(select => {
//             select.addEventListener("change", function() {
//                 const cell = this.closest("td");  // Obtener la celda (td) del select
//                 updateCellColor(cell);  // Llamar a la función para actualizar el color de la celda
//             });
//         });
//      // Cambia la URL si es necesario

        
//     //  const socket = io('http://192.168.30.208:3005');

//     //     // Función para actualizar los datos en la tabla
//     //     function updateData(data) {
//     //         console.log('Actualizando tabla con datos:', data);

//     //         // Verifica si los datos son válidos (deben ser un array)
//     //         if (data && Array.isArray(data)) {
//     //             const imageTable = document.getElementById('imageTable');
//     //             imageTable.innerHTML = ''; // Limpiar tabla antes de agregar nuevos datos

//     //             // Recorre los datos y agrega filas a la tabla
//     //             data.forEach((item, index) => {
//     //                 const row = document.createElement('tr');
//     //                 row.innerHTML = `
//     //                     <td>${item.no}</td>
//     //                     <td><img src="${item.imageUrl}" alt="Imagen" style="width: 100px; height: auto;" onclick="showModal('${item.imageUrl}')"></td>
//     //                     <td>${item.familia}</td>
//     //                     <td>${item.codigoInterno}</td>
//     //                     <td>${item.description}</td>
//     //                     <td>${item.estadoAvance}</td>
//     //                     <td>${item.w}</td>
//     //                     <td>${item.d}</td>
//     //                     <td>${item.h}</td>
//     //                     <td>${item.ah}</td>
//     //                     <td>${item.sh}</td>
//     //                     <td>${item.maderaExpuesta}</td>
//     //                     <td>${item.cad}</td>
//     //                     <td>${item.nube}</td>
//     //                     <td>${item.version}</td>
//     //                     <td>${item.frameEnsamble}</td>
//     //                     <td>${item.cnc}</td>
//     //                     <td>${item.kaizen}</td>
//     //                     <td>${item.comentarios}</td>
//     //                     <td>${item.tela}</td>
//     //                     <td>${item.foam}</td>
//     //                     <td>${item.kuris}</td>
//     //                     <td>${item.boms}</td>
//     //                     <td>${item.qcValidacion}</td>
//     //                 `;
//     //                 imageTable.appendChild(row);
//     //             });
//     //         } else {
//     //             console.error('Error: Los datos recibidos no son un array válido');
//     //         }
//     //     }

//     //     // Función para solicitar actualizaciones al servidor
//     //     function requestUpdate() {
//     //         socket.emit('requestUpdate', { id: 'all' }); // Solicita actualización de todos los elementos
//     //     }

//     //     // Escuchar el evento 'updateData' emitido por el servidor
//     //     socket.on('updateData', (data) => {
//     //         updateData(data);
//     //     });
//         // Función para generar dinámicamente las opciones en el select
//         function populateSelect() {
//             const selectElements = document.querySelectorAll('.status-select');
            
//             // Añadir las opciones desde el array generalOptions a cada select
//             selectElements.forEach(selectElement => {
//                 generalOptions.forEach(option => {
//                     const optionElement = document.createElement("option");
//                     optionElement.value = option;
//                     optionElement.textContent = option;
//                     selectElement.appendChild(optionElement);
//                 });
//             });
//         }
//         document.addEventListener('DOMContentLoaded', init);
//         // Llamar a la función para llenar las opciones cuando se carga la página
//         populateSelect();
//         loadImages();
// init();


// //falto hacer que actualice en tiempo real tods los campos

