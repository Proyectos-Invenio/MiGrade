import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProfesorService } from '../../../services/profesor.service';
import { IProfesor } from '../../../interfaces/usuarios';

@Component({
  selector: 'app-profe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TagModule,
    LazyLoadImageModule,
  ],
  templateUrl: './profe.component.html',
  styleUrl: './profe.component.scss',
})
export class ProfeComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public profesores: IProfesor[] = [];
  public loading: boolean = true;
  public selectedProfesores: IProfesor[] = [];

  constructor(
    private profesorService: ProfesorService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProfesor();
  }

  // Obtener administradores
  getProfesor(): void {
    this.profesorService.getProfesor(0).subscribe({
      next: (data) => {
        this.profesores = data.map((profesor: IProfesor) => ({
          ...profesor,
          informacion_contacto: profesor.informacion_contacto
            ? this.formatContactInfo(String(profesor.informacion_contacto))
            : '',
          identification: profesor.identification
            ? this.formatIdentification(String(profesor.identification))
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

  formatContactInfo(contactInfo: string): string {
    if (!contactInfo) {
      return '';
    }
    return `+506 ${contactInfo.slice(0, 4)}-${contactInfo.slice(4)}`;
  }

  formatIdentification(identification: string): string {
    return `${identification.charAt(0)}-${identification.slice(
      1,
      5
    )}-${identification.slice(5)}`;
  }

  // Aplicar filtro global
  applyFilterGlobal(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dt?.filterGlobal(filterValue, 'contains');
  }
}
