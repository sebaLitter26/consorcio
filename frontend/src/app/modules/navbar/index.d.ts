/**
 * Item de la barra de navegación.
 */
 export interface NavbarItem {
    description: string;
    icon: string;
    navigationItems: NavigationItem[];
}

/**
 * Item de navegación dentro de un item de la barra de navegación.
 * 
 * Es el item que contiene la ruta.
 */
export interface NavigationItem {
    description: string;
    icon: string;
    route: string;
    checked: boolean;
}
