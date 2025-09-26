import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  constructor(private _authServices: AuthService) {}

  ngOnInit() {}

  /**
   * Método para cerrar la sesión del usuario
   */
  logout() {
    // Lógica para cerrar la sesión
    this._authServices.logout(); // No olvides manejar errores
  }
}
