import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { EstudianteService } from '../../../services/estudiante.service';
import { IEstudiante } from '../../../interfaces/usuarios';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule, TableModule, InputTextModule, IconFieldModule, InputIconModule, TagModule, LazyLoadImageModule,],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.scss',
})
export class EstudianteComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public estudiantes: IEstudiante[] = [];
  public loading: boolean = true;
  public selectedEstudiantes: IEstudiante[] = [];

  constructor(
    private estudianteService: EstudianteService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEstudiante();
  }

  // Obtener estudiantes
  getEstudiante(): void {
    this.estudianteService.getEstudiante(0).subscribe({
      next: (data) => {
        // Mapear los datos de los estudiantes y formatear la información de contacto e identificación
        this.estudiantes = data.map((estudiante: IEstudiante) => ({
          ...estudiante,
          rawIdentification: estudiante.identification,
          informacion_contacto: estudiante.informacion_contacto
            ? this.formatContactInfo(String(estudiante.informacion_contacto))
            : '',
          identification: estudiante.identification
            ? this.formatIdentification(String(estudiante.identification))
            : '',
        }));
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar los administradores:', error);
      },
    });
  }

  // Formatear la información de contacto
  formatContactInfo(contactInfo: string): string {
    if (!contactInfo) {
      return '';
    }
    return `+506 ${contactInfo.slice(0, 4)}-${contactInfo.slice(4)}`;
  }

  // Formatear la identificación
  formatIdentification(identification: string): string {
    return `${identification.charAt(0)}-${identification.slice(1, 5)}-${identification.slice(5)}`;
  }

  // Aplicar filtro global
  applyFilterGlobal(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dt?.filterGlobal(filterValue, 'contains');
  }
}
