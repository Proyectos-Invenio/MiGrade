import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProfesorService } from '../../../services/profesor.service';
import { IProfesor } from '../../../interfaces/usuarios';

@Component({
  selector: 'app-profe',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TableModule, InputTextModule, IconFieldModule, InputIconModule, TagModule],
  templateUrl: './profe.component.html',
  styleUrl: './profe.component.scss'
})
export class ProfeComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public profesores: IProfesor[] = [];
  public loading: boolean = true;
  public selectedProfesores: IProfesor[] = [];

  constructor(private profesorService: ProfesorService, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getProfesor();
  }

  // Obtener administradores
  getProfesor(): void {
    this.profesorService.getProfesor(0).subscribe({
      next: (data) => {
        this.profesores = data;
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
