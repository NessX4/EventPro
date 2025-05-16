import { settings } from '../../js/settings.js';
import { loadComponent } from '../../js/providers/components.js';
import { authenticateUser, getUserRole, logoutUser } from '../../js/auth.js';
import API_URL from '../../apiConfig.js';

export function init() {
    const container = document.querySelector(".container");
    const btnSignIn = document.getElementById("btn-sign-in");
    const btnSignUp = document.getElementById("btn-sign-up");

    btnSignIn.addEventListener("click", () => {
        container.classList.remove("toggle");
    });

    btnSignUp.addEventListener("click", () => {
        container.classList.add("toggle");
    });

    // Manejo del inicio de sesión
    document.querySelector('.sign-in').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.querySelector('.sign-in input[type="email"]').value;
        const password = document.querySelector('.sign-in input[type="password"]').value;
        
        const user = await authenticateUser(email, password);
        
        if (user) {
            loadMainComponents(user.role);
        } else {
            alert('Email o contraseña incorrectos');
        }
    });

    // Manejo del registro
    document.querySelector('.sign-up').addEventListener('submit', async function(e) {
        e.preventDefault();
        const nombre = document.querySelector('#sign-up-nombre').value;
        const dirCalle = document.querySelector('#sign-up-dir-calle').value;
        const dirNum = document.querySelector('#sign-up-dir-num').value;
        const dirColonia = document.querySelector('#sign-up-dir-colonia').value;
        const numTel = document.querySelector('#sign-up-num-tel').value;
        const correo = document.querySelector('#sign-up-correo').value;
        const password = document.querySelector('#sign-up-password').value;
        const municipioId = document.querySelector('#sign-up-municipio-id').value;

        const response = await fetch(`${API_URL}/cliente/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
                nombre, 
                dirCalle, 
                dirNum, 
                dirColonia, 
                numTel, 
                correo, 
                password, 
                municipioId 
            })
        });

        if (response.ok) {
            alert('Registro exitoso');
            container.classList.remove("toggle");
        } else {
            const error = await response.text();
            alert('Error al registrarse: ' + error);
        }
    });
}

function loadMainComponents(role) {
    const main = document.getElementById('main');
    main.innerHTML = '';
    const components = role === 'admin' ? settings.load.adminComponents : settings.load.userComponents;
    components.forEach(c => {
        loadComponent(c);
    });
}
