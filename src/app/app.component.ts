import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MenuComponent } from './components/menu/menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, SidebarComponent, FooterComponent],
})
export class AppComponent {
  public isLoggedIn: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {
    window.addEventListener('DOMContentLoaded', (event) => {
      // Toggle the side navigation
      const sidebarToggle = document.body.querySelector('#sidebarToggle');
      if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', (event) => {
          event.preventDefault();
          document.body.classList.toggle('sb-sidenav-toggled');
          localStorage.setItem(
            'sb|sidebar-toggle',
            document.body.classList.contains('sb-sidenav-toggled').toString(),
          );
        });
      }
    });
  }
  async ngOnInit() {
    this.isLoggedIn = this._authService.isLoggedIn();

    this._router.events.subscribe(() => {
      // Actualiza el estado cada vez que cambie la ruta
      this.updateAuthStatus();
    });
  }

  private updateAuthStatus() {
    this.isLoggedIn = this._authService.isLoggedIn();
  }
}
