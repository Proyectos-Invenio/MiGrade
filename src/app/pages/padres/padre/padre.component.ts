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
import { PadreService } from '../../../services/padre.service';
import { IPadre } from '../../../interfaces/usuarios';


@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TableModule, InputTextModule, IconFieldModule, InputIconModule, TagModule, LazyLoadImageModule],
  templateUrl: './padre.component.html',
  styleUrl: './padre.component.scss'
})
export class PadreComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public padres: IPadre[] = [];
  public loading: boolean = true;
  public selectedPadres: IPadre[] = [];

  constructor(private padreService: PadreService, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getPadre();
  }

  // Obtener administradores
  getPadre(): void {
    this.padreService.getPadre(0).subscribe({
      next: (data) => {
        this.padres = data;
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
