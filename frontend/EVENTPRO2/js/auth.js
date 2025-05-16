import API_URL from '../apiConfig.js';

export async function authenticateUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/cliente/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email, password: password })
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('userRole', 'user');
            localStorage.setItem('userName', user.Nombre);
            localStorage.setItem('userData', JSON.stringify(user)); // Guardar todos los datos del usuario
            console.log('User data saved:', user);
            return { role: 'user' };
        } else {
            console.log('Authentication failed');
            return null;
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return null;
    }
}

export function getUserRole() {
    return localStorage.getItem('userRole');
}

export function logoutUser() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userData'); // Eliminar los datos del usuario
    window.location.href = 'index.html'; // Redirigir a la página de login
}
