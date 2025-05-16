import { getUser } from "../../js/providers/users.js";
import { init as initSidemenu } from "../sidemenu/sidemenu.js";

let currentLanguage = 'EN';

export function setLanguage(language) {
    currentLanguage = language;
    initSidemenu();
}

export function getLanguage() {
    return currentLanguage;
}

export const init = () => {
    console.log('Inicializando encabezado...');

    getUser().then((response) => {
        if (response && response.status === 0) {
            showUser(response.user);
        }
    }).catch(error => {
        console.error('Error fetching user:', error);
    });

    const headerMenuElement = document.getElementById('i-header-menu');
    if (headerMenuElement) {
        headerMenuElement.addEventListener('click', toggleSideMenu);
    }

    const langButton = document.getElementById('lang');
    if (langButton) {
        langButton.addEventListener('click', function() {
            this.innerHTML = this.innerHTML === 'EN' ? 'ES' : 'EN';
            setLanguage(this.innerHTML);
        });
    }
};

function showUser(user) {
    console.log(user);
    const userPhoto = document.getElementById('img-user-photo');
    const userName = document.getElementById('label-user-name');
    const userRole = document.getElementById('label-user-role');
    if (userPhoto && userName && userRole) {
        userPhoto.src = user.photo;
        userName.textContent = user.name;
        userRole.textContent = user.role ? user.role.name : '';
    } else {
        console.error('User elements not found');
    }
}

function toggleSideMenu() {
    const sideMenu = document.getElementById('sidemenu');
    const header = document.querySelector('.header');

    if (sideMenu.classList.contains('visible')) {
        sideMenu.classList.remove('visible');
        header.classList.remove('menu-visible');
    } else {
        sideMenu.classList.add('visible');
        header.classList.add('menu-visible');
    }

    adjustSidemenuOptions();
}

function adjustSidemenuOptions() {
    const sideMenu = document.getElementById('sidemenu');
    const showText = sideMenu.classList.contains('visible');
    
    const sidemenuOptions = document.querySelectorAll('.sidemenu-option');
    sidemenuOptions.forEach(option => {
        const divTitle = option.querySelector('.sidemenu-title');
        if (divTitle) {
            divTitle.style.display = showText ? 'block' : 'none';
        }

        const divIcon = option.querySelector('.sidemenu-icon');
        const title = option.querySelector('.sidemenu-title')?.textContent || '';
        divIcon.setAttribute('title', title);
    });
}

document.addEventListener('DOMContentLoaded', init);
