import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SeccionService } from '../../../services/secciones.service';
import { ProfesorService } from '../../../services/profesor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-seccion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, NgSelectModule],
  templateUrl: './editar-seccion.component.html',
  styleUrl: './editar-seccion.component.scss',
})
export class EditarSeccionComponent implements OnInit {
  public seccionForm: FormGroup;
  public profesores: any[] = [];
  private seccionId: string;

  constructor(
    private fb: FormBuilder,
    private _seccionService: SeccionService,
    private _profesorService: ProfesorService,
    private _router: Router,
    private route: ActivatedRoute,
  ) {
    this.seccionForm = this.fb.group({
      seccion: ['', Validators.required],
      profesor: ['', Validators.required],
    });
    this.seccionId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadProfesores();
    this.loadSeccion();
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

  private loadSeccion(): void {
    this._seccionService.getSeccion(this.seccionId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const seccionData = data[0];
          this.seccionForm.patchValue({
            seccion: seccionData.seccion,
            profesor: seccionData.identification,
          });
          console.log('Formulario actualizado:', this.seccionForm.value);
        }
      },
      error: (error) => {
        console.error('Error al cargar la sección', error);
      },
    });
  }

  submitForm(): void {
    if (this.seccionForm.valid) {
      const seccionData = {
        seccion: this.seccionForm.value.seccion,
        profesor: this.seccionForm.value.profesor,
      };

      this._seccionService.updateSeccion(this.seccionId, seccionData).subscribe({
        next: (response) => {
          console.log('Sección actualizada exitosamente', response);
          Swal.fire({
            icon: 'success',
            title: '¡Sección actualizada!',
            text: 'La sección se ha actualizado exitosamente.',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this._router.navigate(['secciones/seccion']);
          });
        },
        error: (error) => {
          console.error('Error al actualizar sección', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message || 'Ocurrió un error al actualizar la sección.',
            confirmButtonText: 'Aceptar',
          });
        },
        complete: () => {
          console.log('Actualización de sección completada');
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
