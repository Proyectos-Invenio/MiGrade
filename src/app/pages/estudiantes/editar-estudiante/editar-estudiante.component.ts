import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante.service';
import { SeccionService } from '../../../services/secciones.service';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { EncargadoService } from '../../../services/encargado.service';
import { ISeccion } from '../../../interfaces/academico';
import { IEncargado } from '../../../interfaces/usuarios';
import Inputmask from 'inputmask';

@Component({
  selector: 'app-editar-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, NgSelectModule],
  templateUrl: './editar-estudiante.component.html',
  styleUrl: './editar-estudiante.component.scss',
})
export class EditarEstudianteComponent implements OnInit {
  // Definición de variables y formulario
  public estudianteForm: FormGroup;
  public secciones: ISeccion[] = [];
  public encargados: IEncargado[] = [];
  private estudianteId: string;
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _estudianteService: EstudianteService,
    private _seccionService: SeccionService,
    private _encargadoService: EncargadoService,
    private _router: Router,
    private route: ActivatedRoute,
  ) {
    // Inicialización del formulario y obtención del ID del estudiante desde la URL
    this.estudianteForm = this.createForm();
    this.estudianteId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    // Cargar datos del estudiante, secciones y encargados al inicializar el componente
    this.loadEstudiante();
    this.loadSecciones();
    this.loadEncargados();
    this.applyInputMask();
  }

  // Crear el formulario con validaciones
  private createForm(): FormGroup {
    return this.fb.group({
      identification: ['', [Validators.required, this.identificationValidator]],
      nombre: ['', Validators.required],
      encargado: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sexo: ['', Validators.required],
      seccion: ['', Validators.required],
    });
  }

  // Cargar datos del estudiante desde el servicio
  private loadEstudiante(): void {
    this._estudianteService.getEstudiante(this.estudianteId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const estudiante = data[0];
          // Actualizar el formulario con los datos del estudiante
          this.estudianteForm.patchValue({
            identification: estudiante.identification,
            nombre: estudiante.nombre,
            encargado: estudiante.encargado_id,
            email: estudiante.email,
            sexo: estudiante.sexo,
            seccion: estudiante.seccion,
          });
        }
      },
      error: (error) => {
        console.error('Error al cargar el estudiante', error);
      },
    });
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

  // Método personalizado para validar el campo identification
  private identificationValidator(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value) {
      return { invalidIdentification: true }; // Retorna error si el valor es nulo o indefinido
    }

    const value = control.value.toString().replace(/\D/g, ''); // Convertir a cadena y eliminar caracteres no numéricos
    return value.length === 9 ? null : { invalidIdentification: true };
  }

  // Método para enviar el formulario
  submitForm(): void {
    // Verificar si el formulario es válido
    if (this.estudianteForm.valid) {
      const estudianteData = this.estudianteForm.value;
      // Limpiar el valor de identificación eliminando caracteres no numéricos
      estudianteData.identification = estudianteData.identification.toString().replace(/\D/g, '');

      // Llamar al servicio para actualizar los datos del estudiante
      this._estudianteService.updateEstudiante(this.estudianteId, estudianteData).subscribe({
        // Manejar la respuesta exitosa
        next: (response) => {
          console.log('Estudiante actualizado exitosamente', response);
          // Mostrar mensaje de éxito y redirigir al usuario
          Swal.fire({
            icon: 'success',
            title: '¡Estudiante actualizado!',
            text: 'El estudiante se ha actualizado exitosamente.',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this._router.navigate(['estudiantes/estudiante']);
          });
        },
        // Manejar errores en la actualización
        error: (error) => {
          console.error('Error al actualizar estudiante', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message,
            confirmButtonText: 'Aceptar',
          });
        },
      });
    } else {
      // Si el formulario es inválido, marcar todos los campos como tocados y mostrar mensaje de error
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
