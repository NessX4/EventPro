import { getLanguage } from "../../js/providers/language.js";
import { menu } from "./settings.js";
import { loadComponent } from "../../js/providers/components.js";
import { logoutUser } from "../../js/auth.js";
import API_URL from '../../apiConfig.js';

export function init() {
    console.log('Inicializando sidemenu...');
    const language = getLanguage();
    drawMenu(language);
  
}

function drawMenu(language) {
    const sidemenuElement = document.getElementById("sidemenu");
    if (!sidemenuElement) return;

    sidemenuElement.innerHTML = ''; 
    sidemenuElement.innerHTML += '<link rel="stylesheet" href="components/sidemenu/sidemenu.css">'; 

    menu.forEach(option => {
        drawMenuOption(option, language);
    });
}

function drawMenuOption(option, language) {
    console.log('Dibujando opción:', option);

    var parent = document.getElementById('sidemenu');

    var divOption = document.createElement('div');
    divOption.id = 'sidemenu-option-' + option.module;
    divOption.className = 'sidemenu-option tooltip';
    parent.appendChild(divOption);

    var divIcon = document.createElement('div');
    divIcon.className = 'sidemenu-icon';
    divIcon.style.background = 'var(--' + option.module + ')';
    divOption.appendChild(divIcon);

    var icon = document.createElement('i');
    icon.className = option.icon;
    divIcon.appendChild(icon);

    var divTitle = document.createElement('div');
    divTitle.className = 'sidemenu-title';
    divOption.appendChild(divTitle);

    var label = document.createElement('label');
    label.className = 'title';
    label.textContent = language === 'EN' ? option.title[1] : option.title[0];
    divTitle.appendChild(label);

    divIcon.setAttribute('title', label.textContent);

    if (option.submenuOptions && option.submenuOptions.length > 0) {
        var divArrow = document.createElement('div');
        divArrow.className = 'sidemenu-arrow';
        divOption.appendChild(divArrow);

        var arrowIcon = document.createElement('i');
        arrowIcon.className = 'fas fa-chevron-down';
        divArrow.appendChild(arrowIcon);

        var submenuContainer = document.createElement('div');
        submenuContainer.className = 'submenu-container';
        submenuContainer.style.maxHeight = '0';
        parent.appendChild(submenuContainer);

        option.submenuOptions.forEach(function(item) {
            var divItem = document.createElement('div');
            divItem.className = 'submenu-item';

            var divSubmenuIcon = document.createElement('div');
            divSubmenuIcon.className = 'submenu-icon';
            divSubmenuIcon.style.background = 'var(--' + option.module + ')';
            divItem.appendChild(divSubmenuIcon);

            var submenuIcon = document.createElement('i');
            submenuIcon.className = item.icon;
            divSubmenuIcon.appendChild(submenuIcon);

            var submenuTitle = document.createElement('label');
            submenuTitle.className = 'submenu-title';
            submenuTitle.textContent = language === 'EN' ? item.label[1] : item.label[0];
            divItem.appendChild(submenuTitle);

            submenuContainer.appendChild(divItem);
            divItem.addEventListener('click', function() {
                loadComponent({
                    url: item.url,
                    parent: 'content'
                });
            });
        });

        divArrow.addEventListener('click', function() {
            if (submenuContainer.style.maxHeight === '0px') {
                submenuContainer.style.maxHeight = submenuContainer.scrollHeight + 'px';
                arrowIcon.className = 'fas fa-chevron-up';
            } else {
                submenuContainer.style.maxHeight = '0';
                arrowIcon.className = 'fas fa-chevron-down';
            }
        });
    }

    if (option.module && option.url) {
        divOption.addEventListener('click', function() {
            loadComponent({
                url: option.url,
                parent: 'content'
            });
        });
    }
}




document.addEventListener('DOMContentLoaded', init);
