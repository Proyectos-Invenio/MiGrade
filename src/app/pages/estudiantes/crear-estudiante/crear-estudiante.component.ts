import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';
import { EstudianteService } from '../../../services/estudiante.service';
import { SeccionService } from '../../../services/secciones.service';
import { EncargadoService } from '../../../services/encargado.service';
import Inputmask from 'inputmask';

@Component({
  selector: 'app-crear-estudiante',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
  ],
  templateUrl: './crear-estudiante.component.html',
  styleUrl: './crear-estudiante.component.scss',
})
export class CrearEstudianteComponent implements OnInit {
  public estudianteForm: FormGroup;
  public secciones: any[] = [];
  public encargados: any[] = [];
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _estudianteService: EstudianteService,
    private _seccionService: SeccionService,
    private _encargadoService: EncargadoService,
    private _router: Router
  ) {
    // Inicializar el formulario con validaciones
    this.estudianteForm = this.fb.group({
      identification: ['', Validators.required],
      nombre: ['', Validators.required],
      encargado: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)]],
      sexo: ['', Validators.required],
      seccion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSecciones();
    this.loadEncargados();
    this.applyInputMask();
    const togglePassword = document.querySelector('.togglePassword') as HTMLElement;
    togglePassword.addEventListener('click', () => this.togglePasswordVisibility());
  }

  // Cargar secciones desde el servicio
  private loadSecciones(): void {
    this._seccionService.getSeccion(0).subscribe({
      next: (data) => {
        this.secciones = data;
      },
      error: (error) => {
        console.error('Error al cargar secciones', error);
      },
    });
  }

  // Cargar encargados desde el servicio
  private loadEncargados(): void {
    this._encargadoService.getEncargado(0).subscribe({
      next: (data) => {
        this.encargados = data;
      },
      error: (error) => {
        console.error('Error al cargar encargados', error);
      },
    });
  }

  // Aplicar máscara de entrada al campo de identificación
  private applyInputMask(): void {
    const identificationInput = document.getElementById('identification') as HTMLInputElement;
    Inputmask({ mask: '9-9999-9999' }).mask(identificationInput);
  }

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
    const icon = document.querySelector('.togglePassword i') as HTMLElement;
    icon.classList.toggle('pi-eye');
    icon.classList.toggle('pi-eye-slash');
  }

  // Obtener errores del campo de contraseña
  getPasswordErrors() {
    const passwordControl = this.estudianteForm.controls['password'];
    if (passwordControl.touched && passwordControl.invalid) {
      if (passwordControl.errors?.['pattern']) {
        return 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.';
      }
      if (passwordControl.errors?.['minlength']) {
        return 'La contraseña debe tener al menos 8 caracteres.';
      }
    }
    return null;
  }

  // Enviar el formulario
  submitForm(): void {
    if (this.estudianteForm.valid) {
      const estudianteData = this.estudianteForm.value;
      // Limpiar el valor de identificación
      estudianteData.identification = estudianteData.identification.replace(/\D/g, '');

      this._estudianteService.crearEstudiante(estudianteData).subscribe({
        next: (response) => {
          console.log('Estudiante creado exitosamente', response);
          this.estudianteForm.reset();
          Swal.fire({
            icon: 'success',
            title: '¡Estudiante creado!',
            text: 'El estudiante se ha creado exitosamente.',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this._router.navigate(['estudiantes/estudiante']);
          });
        },
        error: (error) => {
          console.error('Error al crear estudiante', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message,
            confirmButtonText: 'Aceptar',
          });
        },
        complete: () => {
          console.log('Creación de estudiante completada');
        },
      });
    } else {
      console.log('Formulario inválido');
      this.estudianteForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: '¡Por favor, complete todos los campos requeridos!',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
