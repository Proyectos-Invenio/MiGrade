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
  imports: [CommonModule, FormsModule, RouterModule, TableModule, InputTextModule, IconFieldModule, InputIconModule, TagModule, LazyLoadImageModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.scss'
})
export class EstudianteComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public estudiantes: IEstudiante[] = [];
  public loading: boolean = true;
  public selectedEstudiantes: IEstudiante[] = [];

  constructor(private estudianteService: EstudianteService, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getEstudiante();
  }

  // Obtener administradores
  getEstudiante(): void {
    this.estudianteService.getEstudiante(0).subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar los administradores:', error);
      },
    });
  }

  // Aplicar filtro global
  applyFilterGlobal(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dt?.filterGlobal(filterValue, 'contains');
  }
}
