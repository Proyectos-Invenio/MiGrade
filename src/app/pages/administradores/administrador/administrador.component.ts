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
import { AdministradoresService } from '../../../services/administrador.service';
import { IAdministrador } from '../../../interfaces/usuarios';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TableModule, InputTextModule, IconFieldModule, InputIconModule, TagModule, LazyLoadImageModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss',
})
export class AdministradorComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public administradores: IAdministrador[] = [];
  public loading: boolean = true;
  public selectedAdministradores: IAdministrador[] = [];

  constructor(private administradoresService: AdministradoresService, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAdministradores();
  }

  // Obtener administradores
  getAdministradores(): void {
    this.administradoresService.getAdministradores(0).subscribe({
      next: (data) => {
        this.administradores = data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar los administradores:', error);
      }
    });
  }

  // Aplicar filtro global
  applyFilterGlobal(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dt?.filterGlobal(filterValue, 'contains');
  }



}
