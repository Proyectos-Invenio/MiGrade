import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { VisibilidadMenuService } from '../../../services/visibilidad_menu.service';
import { IVisibilidadMenu } from '../../../interfaces/menu';

@Component({
  selector: 'app-visibilidad-menu',
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
  templateUrl: './visibilidad-menu.component.html',
  styleUrl: './visibilidad-menu.component.scss',
})
export class VisibilidadMenuComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public menu: IVisibilidadMenu[] = [];
  public loading: boolean = true;
  public selectedMenu: IVisibilidadMenu[] = [];

  constructor(
    private visibilidadmenuService: VisibilidadMenuService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getMenu();
  }

  // Obtener administradores
  getMenu(): void {
    this.visibilidadmenuService.getMenu(0).subscribe({
      next: (data) => {
        this.menu = data;
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
