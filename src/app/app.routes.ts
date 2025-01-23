import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';

// ! Auth
import { LoginComponent } from './pages/auth/login/login.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { RolComponent } from './pages/roles/rol/rol.component';
import { SoporteTecnicoComponent } from './pages/soporte-tecnico/soporte-tecnico.component';

// ! Administrador
import { AdministradorComponent } from './pages/administradores/administrador/administrador.component';
// ! Profesor
import { ProfeComponent } from './pages/profesores/profe/profe.component';
// ! Padre
import { PadreComponent } from './pages/padres/padre/padre.component';
// ! Estudiante
import { EstudianteComponent } from './pages/estudiantes/estudiante/estudiante.component';
// ! Menu
import { VisibilidadMenuComponent } from './pages/visibilidad_menus/visibilidad-menu/visibilidad-menu.component';
// ! Academico
import { AsignaturaComponent } from './pages/asignaturas/asignatura/asignatura.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'auth/reset',
    component: ResetPasswordComponent,
  },
  {
    path: 'auth/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'administradores/administrador',
    component: AdministradorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profesores/profe',
    component: ProfeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'padres/padre',
    component: PadreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'estudiantes/estudiante',
    component: EstudianteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'roles/rol',
    component: RolComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'visibilidad_menus/visibilidad-menu',
    component: VisibilidadMenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'asignaturas/asignatura',
    component: AsignaturaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'soporte-tecnico',
    component: SoporteTecnicoComponent,
    canActivate: [AuthGuard],
  },
];
