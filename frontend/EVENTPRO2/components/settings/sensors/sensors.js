import API_URL from '../../../apiConfig.js';

export async function init() {
    const clientList = document.getElementById('client-list');

    let clients = [];

    async function fetchClients() {
        try {
            const response = await fetch(`${API_URL}/Cliente`);
            if (!response.ok) {
                throw new Error(`Error fetching clients: ${response.statusText}`);
            }
            const data = await response.json();
            clients = data;
            renderClients();
        } catch (error) {
            console.error("Error fetching clients:", error);
            alert("Error fetching clients: " + error.message);
        }
    }

    function renderClients() {
        clientList.innerHTML = '';
        clients.forEach((client, index) => {
            setTimeout(() => {
                const li = document.createElement('li');
                li.textContent = client.nombre; // Mostrar el nombre del cliente
                li.setAttribute('data-username', client.correo); // Usar el correo como username si no tienes una propiedad específica
                li.addEventListener('click', () => {
                    window.location.href = `components/settings/users/users.html?user=${client.correo}`;
                });
                li.style.opacity = 0;
                clientList.appendChild(li);
                setTimeout(() => {
                    li.style.opacity = 1;
                    li.style.transition = 'opacity 0.5s ease-in-out';
                }, 50);
            }, index * 100);
        });
    }

    // Fetch and render clients when the page loads
    fetchClients();
}

document.addEventListener('DOMContentLoaded', init);
