import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';
import { SeccionService } from '../../../services/secciones.service';
import { ProfesorService } from '../../../services/profesor.service';
import Inputmask from 'inputmask';

@Component({
  selector: 'app-crear-seccion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, NgSelectModule],
  templateUrl: './crear-seccion.component.html',
  styleUrl: './crear-seccion.component.scss',
})
export class CrearSeccionComponent implements OnInit {
  public seccionForm: FormGroup;
  public profesores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _seccionService: SeccionService,
    private _profesorService: ProfesorService,
    private _router: Router,
  ) {
    this.seccionForm = this.fb.group({
      seccion: ['', [Validators.required, Validators.pattern(/^\d-\d$/)]],
      profesor: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProfesores();
    this.applyInputMask();
  }

  private loadProfesores(): void {
    this._profesorService.getProfesor(0).subscribe({
      next: (data) => {
        this.profesores = data;
      },
      error: (error) => {
        console.error('Error al cargar profesores', error);
      },
    });
  }

  private applyInputMask(): void {
    const seccionInput = document.getElementById('seccion') as HTMLInputElement;
    Inputmask({ mask: '9-9' }).mask(seccionInput);
  }

  // Envía el formulario.
  submitForm(): void {
    if (this.seccionForm.valid) {
      const seccionData = {
        seccion: this.seccionForm.value.seccion,
        profesor: this.seccionForm.value.profesor,
      };

      this._seccionService.crearSeccion(seccionData).subscribe({
        next: (response) => {
          console.log('Sección creada exitosamente', response);
          this.seccionForm.reset();
          Swal.fire({
            icon: 'success',
            title: '¡Sección creada!',
            text: 'La sección se ha creado exitosamente.',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this._router.navigate(['secciones/seccion']);
          });
        },
        error: (error) => {
          console.error('Error al crear sección', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message,
            confirmButtonText: 'Aceptar',
          });
        },
        complete: () => {
          console.log('Creación de sección completada');
        },
      });
    } else {
      console.log('Formulario inválido');
      this.seccionForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: '¡Por favor, complete todos los campos requeridos!',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
