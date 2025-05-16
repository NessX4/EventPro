export var menu = [
    {
        module: 'homeScreen',
        icon: 'fas fa-home',
        title: ['Inicio', 'Home'],
        url: 'components/homeScreen',
        submenu: 'fas fa-chevron-down',
        submenuOptions: []
    },
    {
        module: "userManagement",
        icon: 'fas fa-user-cog',
        title: ['Gestión de Usuarios', 'User Management'],
        url: 'components/userManagement',
        submenu: 'fas fa-chevron-down',
        submenuOptions: []
    },
    
    {
        module: "dashboard",
        icon: 'fas fa-chart-bar',
        title: ['Tablero', 'Dashboard'],
        submenu: 'fas fa-chevron-down',
        url: 'components/settings/sensors',
        submenuOptions: []
    },
    
    {
        module: 'myevents',
        icon: 'fas fa-calendar-alt',
        title: ['Eventos', 'Events'],
        url: 'components/myevents', 
        submenu: 'fas fa-chevron-down',
        submenuOptions: []
    },
    {
        module: "services",
        icon: "fas fa-concierge-bell",
        title: ["Servicios", "Services"],
        url: 'components/services',
        submenu: "fas fa-chevron-down",
        submenuOptions: [
            {
                module: "packages",
                icon: "fas fa-box-open",
                title: ["Paquetes", "Packages"],
                url: "components/packages",
                label: ["Paquetes", "Packages"]
            },
            {
                module: "Transportation",
                icon: "fas fa-shuttle-van",
                title: ["Transportes", "Transportation"],
                url: "components/Transportation",
                label: ["Transportes", "Transportation"]
            },
            {
                module: "salons",
                icon: "fas fa-door-open",
                title: ["Salones", "Salons"],
                url: "components/salons",
                label: ["Salones", "Salons"]
            },
            {
                module: "hotels",
                icon: "fas fa-hotel",
                title: ["Hoteles", "Hotels"],
                url: "components/hotels",
                label: ["Hoteles", "Hotels"]

            }
        ]
    },
    
    {
        module: "comments",
        icon: 'fas fa-comments',
        title: ['Comentarios', 'Comments'],
        url: 'components/comments',
        submenu: 'fas fa-chevron-down',
        submenuOptions: []
    },
 
    {
        module: "payments",
        icon: 'fas fa-money-bill-wave', 
        title: ['Pagos', 'Payments'],
        url: 'components/payments', 
        submenu: 'fas fa-chevron-down',
        submenuOptions: []
    },

    {
        module: "salon",
        icon: 'fas fa-chair',
        title: ['Salón', 'Salon'],
        url: 'components/salon',
        submenu: 'fas fa-chevron-down',
        submenuOptions: []
    },
    {
        module: "pdf",
        icon: 'fas fa-file-pdf',
        title: ['pdf', 'pdf'],
        url: 'components/pdf',
        submenu: 'fas fa-chevron-down',
        submenuOptions: []
    },
    {
        module: "pdf2",
        icon: 'fas fa-file-pdf',
        title: ['pdf2', 'pdf2'],
        url: 'components/kovet-busqueda/buttons',
        submenu: 'fas fa-chevron-down',
        submenuOptions: []
    }

];
