import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AsignaturasService } from './../../../services/asignaturas.service';
import { IAsignaturas } from '../../../interfaces/academico';

@Component({
  selector: 'app-asignatura',
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
  ],
  templateUrl: './asignatura.component.html',
  styleUrl: './asignatura.component.scss',
})
export class AsignaturaComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public asignaturas: IAsignaturas[] = [];
  public loading: boolean = true;
  public selectedAsignaturas: IAsignaturas[] = [];

  constructor(
    private asignaturasService: AsignaturasService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getAsignaturas();
  }

  // Obtener administradores
  getAsignaturas(): void {
    this.asignaturasService.getAsignaturas(0).subscribe({
      next: (data) => {
        this.asignaturas = data;
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
