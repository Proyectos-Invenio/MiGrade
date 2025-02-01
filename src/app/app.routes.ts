import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';

// ! Auth
import { LoginComponent } from './pages/auth/login/login.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { RolComponent } from './pages/roles/rol/rol.component';

// ! Administrador
import { AdministradorComponent } from './pages/administradores/administrador/administrador.component';
// ! Profesor
import { ProfeComponent } from './pages/profesores/profe/profe.component';
// ! Encargado
import { EncargadoComponent } from './pages/encargados/encargado/encargado.component';
// ! Estudiante
import { EstudianteComponent } from './pages/estudiantes/estudiante/estudiante.component';
// ! Menu
import { VisibilidadMenuComponent } from './pages/visibilidad_menus/visibilidad-menu/visibilidad-menu.component';
// ! Academico
import { AsignaturaComponent } from './pages/asignaturas/asignatura/asignatura.component';


// ! Secciones
import { SeccionComponent } from './pages/secciones/seccion/seccion.component';
import { CrearSeccionComponent } from './pages/secciones/crear-seccion/crear-seccion.component';
import { EditarSeccionComponent } from './pages/secciones/editar-seccion/editar-seccion.component';

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
    path: 'encargados/encargado',
    component: EncargadoComponent,
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
    path: 'secciones/seccion',
    component: SeccionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'secciones/seccion/crear-seccion',
    component: CrearSeccionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'secciones/seccion/editar-seccion/:id',
    component: EditarSeccionComponent,
    canActivate: [AuthGuard],
  },
];
