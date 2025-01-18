import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUsuarioMenu } from '../../interfaces/auth';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'] // Cambié `styleUrl` a `styleUrls`
})
export class SidebarComponent {

    public menu: IUsuarioMenu[] = [];
    protected identity:any;
    protected usuario:any;
    protected id_usuario:any;

    constructor(private _authService: AuthService) {}

    ngOnInit() {
        this.identity = this._authService.getIdentity();
        this.usuario = this.identity[0].json_usuario;

        this.getUsuarioMenu();
    }

    get inicialesUsuario(): string {
        const nombre = this.usuario.name || '';
        return `${nombre.charAt(0)}`.toUpperCase();
    }

    getUsuarioMenu() {
        this._authService.getUsuarioMenu(this.usuario.id).subscribe({
            next: (response: IUsuarioMenu[]) => {
                // Verificamos que response sea un array antes de procesarlo
                const menuArray = Array.isArray(response) ? response : [];
                // Procesamos y ordenamos el menú antes de asignarlo
                this.menu = this.ordenarMenu(this.procesarMenu(menuArray));
            },
            error: (err) => {
                console.error('Error al obtener el menú del usuario:', err);
                // Aquí puedes manejar errores, como mostrar una notificación en la UI
            }
        });
    }

    /**
     * Ordena el menú, moviendo la sección 'Global' al final.
     * @param menu - Lista de menús recibidos del servicio
     * @returns Menú ordenado con 'Global' al final
     */
    ordenarMenu(menu: IUsuarioMenu[]): IUsuarioMenu[] {
        return menu.sort((a, b) => {
            if (a.menu_json.seccion === 'Global') return 1;
            if (b.menu_json.seccion === 'Global') return -1;
            return 0; // Mantener el orden de las demás secciones
        });
    }

    /**
     * Procesa el menú para normalizar o ajustar datos según sea necesario.
     * @param menu - Lista de menús sin procesar
     * @returns Lista de menús procesados
     */
    procesarMenu(menu: IUsuarioMenu[]): IUsuarioMenu[] {
        if (!Array.isArray(menu)) {
            throw new TypeError('El argumento "menu" debe ser un array');
        }

        return menu.map(item => ({
            ...item,
            menu_json: {
                ...item.menu_json,
                categorias: item.menu_json.categorias.map(cat => ({
                    ...cat,
                    url: cat.url
                }))
            }
        }));
    }

    /**
     * Normaliza la URL si es necesario.
     * @param url - URL de la categoría
     * @returns URL normalizada
     */
    normalizarUrl(url: string | null): string {
        console.log('URL:', url);

        if (!url) return '#'; // Si no hay URL, retorna un placeholder
        return url.startsWith('http') ? url : `http://localhost:s4200${url}`;
    }
}
