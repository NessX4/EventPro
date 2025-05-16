// Función para abrir el modal
function abrirBuscador() {
    document.getElementById("model-buscador").style.display = "block"; 
    scrollPosition = window.scrollY;  


    document.body.style.overflow = 'hidden';  

    const stickyElements = document.querySelectorAll('.s2, .s4, .s5, .s6, .s7, .s8, .s9, .borrar');
    stickyElements.forEach(element => {
        element.style.visibility = 'hidden';  
    });
    limpiarImagen();
}

// Función para cerrar el modal
function cerrarBuscador() {  
    document.getElementById("model-buscador").style.display = "none"; 
    document.body.style.overflow = '';  

    const stickyElements = document.querySelectorAll('.s2, .s4, .s5, .s6, .s7, .s8, .s9, .borrar');
    stickyElements.forEach(element => {
        element.style.visibility = 'visible';  
    });
}

// Función para actualizar el nombre del archivo seleccionado
function updateFileName() {
    var input = document.querySelector('#file-input');
    var label = document.querySelector('.custom-file-upload');

    if (input.files && input.files[0]) {
        label.innerHTML = input.files[0].name; 
    } else {
        label.innerHTML = 'Choose a file'; 
    }
}

document.querySelector('.custom-file-upload').addEventListener('click', function() {
    var fileInput = document.getElementById("file-input");
    
    // Restablecer el valor del input siempre que se haga clic
    fileInput.value = '';  
});


