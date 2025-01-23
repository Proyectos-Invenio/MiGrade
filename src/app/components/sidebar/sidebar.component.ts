import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ICategoria, IUsuarioMenu } from '../../interfaces/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public menu: IUsuarioMenu[] = [];
  protected identity: any;
  protected usuario: any;
  protected id_usuario: any;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this.identity = this._authService.getIdentity();
    this.usuario = this.identity[0].json_usuario;

    this.getUsuarioMenu();
  }

  get inicialesUsuario(): string {
    const nombre = this.usuario.nombre || '';
    return `${nombre.charAt(0)}`.toUpperCase();
  }

  getUsuarioMenu() {
    this._authService.getUsuarioMenu(this.usuario.rol_id).subscribe({
      next: (response: IUsuarioMenu[]) => {
        const menuArray = Array.isArray(response) ? response : [];
        this.menu = this.procesarMenu(menuArray);
      },
      error: (err) => {
        console.error('Error al obtener el menú del usuario:', err);
      },
    });
  }

  procesarMenu(menu: IUsuarioMenu[]): IUsuarioMenu[] {
    if (!Array.isArray(menu)) {
      throw new TypeError('El argumento "menu" debe ser un array');
    }

    return menu.map((item) => ({
      ...item,
      menu_json: item.menu_json.map((cat: ICategoria) => ({
        ...cat,
        url: cat.url,
      })),
    }));
  }

  normalizarUrl(url: string | null): string {
    console.log('URL:', url);

    if (!url) return '#'; // Si no hay URL, retorna un placeholder
    return url.startsWith('http') ? url : `http://localhost:s4200${url}`;
  }
}
