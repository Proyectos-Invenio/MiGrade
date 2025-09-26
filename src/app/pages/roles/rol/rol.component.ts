import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RolesService } from '../../../services/roles.service';
import { IRoles } from '../../../interfaces/auth';

@Component({
  selector: 'app-rol',
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
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss',
})
export class RolComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public roles: IRoles[] = [];
  public loading: boolean = true;
  public selectedRoles: IRoles[] = [];

  constructor(
    private rolesService: RolesService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  // Obtener administradores
  getRoles(): void {
    this.rolesService.getRoles(0).subscribe({
      next: (data) => {
        this.roles = data;
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
