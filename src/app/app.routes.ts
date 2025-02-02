import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';

// ! Administrador
import { AdministradorComponent } from './pages/administradores/administrador/administrador.component';
import { CrearAdministradorComponent } from './pages/administradores/crear-administrador/crear-administrador.component';
import { EditarAdministradorComponent } from './pages/administradores/editar-administrador/editar-administrador.component';

// ! Asignaturas
import { AsignaturaComponent } from './pages/asignaturas/asignatura/asignatura.component';
import { CrearAsignaturaComponent } from './pages/asignaturas/crear-asignatura/crear-asignatura.component';
import { EditarAsignaturaComponent } from './pages/asignaturas/editar-asignatura/editar-asignatura.component';

// ! Auth
import { LoginComponent } from './pages/auth/login/login.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';

// ! Encargado
import { CrearEncargadoComponent } from './pages/encargados/crear-encargado/crear-encargado.component';
import { EditarEncargadoComponent } from './pages/encargados/editar-encargado/editar-encargado.component';
import { EncargadoComponent } from './pages/encargados/encargado/encargado.component';

// ! Estudiante
import { CrearEstudianteComponent } from './pages/estudiantes/crear-estudiante/crear-estudiante.component';
import { EditarEstudianteComponent } from './pages/estudiantes/editar-estudiante/editar-estudiante.component';
import { EstudianteComponent } from './pages/estudiantes/estudiante/estudiante.component';

// ! Menu
import { CrearVisibilidadMenuComponent } from './pages/visibilidad_menus/crear-visibilidad-menu/crear-visibilidad-menu.component';
import { EditarVisibilidadMenuComponent } from './pages/visibilidad_menus/editar-visibilidad-menu/editar-visibilidad-menu.component';
import { VisibilidadMenuComponent } from './pages/visibilidad_menus/visibilidad-menu/visibilidad-menu.component';

// ! Profesor
import { CrearProfesorComponent } from './pages/profesores/crear-profesor/crear-profesor.component';
import { EditarProfesorComponent } from './pages/profesores/editar-profesor/editar-profesor.component';
import { ProfeComponent } from './pages/profesores/profe/profe.component';

// ! Roles
import { CrearRolComponent } from './pages/roles/crear-rol/crear-rol.component';
import { EditarRolComponent } from './pages/roles/editar-rol/editar-rol.component';
import { RolComponent } from './pages/roles/rol/rol.component';

// ! Secciones
import { CrearSeccionComponent } from './pages/secciones/crear-seccion/crear-seccion.component';
import { EditarSeccionComponent } from './pages/secciones/editar-seccion/editar-seccion.component';
import { SeccionComponent } from './pages/secciones/seccion/seccion.component';

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
    path: 'administradores/administrador',
    component: AdministradorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'administradores/crear-administrador',
    component: CrearAdministradorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'administradores/editar-administrador/:id',
    component: EditarAdministradorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'asignaturas/asignatura',
    component: AsignaturaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'asignaturas/crear-asignatura',
    component: CrearAsignaturaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'asignaturas/editar-asignatura/:id',
    component: EditarAsignaturaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'auth/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth/reset',
    component: ResetPasswordComponent,
  },
  {
    path: 'encargados/crear-encargado',
    component: CrearEncargadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'encargados/editar-encargado/:id',
    component: EditarEncargadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'encargados/encargado',
    component: EncargadoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'estudiantes/crear-estudiante',
    component: CrearEstudianteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'estudiantes/editar-estudiante/:id',
    component: EditarEstudianteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'estudiantes/estudiante',
    component: EstudianteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profesores/crear-profesor',
    component: CrearProfesorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profesores/editar-profesor/:id',
    component: EditarProfesorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profesores/profe',
    component: ProfeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'roles/crear-rol',
    component: CrearRolComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'roles/editar-rol/:id',
    component: EditarRolComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'roles/rol',
    component: RolComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'secciones/crear-seccion',
    component: CrearSeccionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'secciones/editar-seccion/:id',
    component: EditarSeccionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'secciones/seccion',
    component: SeccionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'visibilidad_menus/crear-visibilidad-menu',
    component: CrearVisibilidadMenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'visibilidad_menus/editar-visibilidad-menu/:id',
    component: EditarVisibilidadMenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'visibilidad_menus/visibilidad-menu',
    component: VisibilidadMenuComponent,
    canActivate: [AuthGuard],
  },
];
