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
import { EncargadoService } from '../../../services/encargado.service';
import { IEncargado } from '../../../interfaces/usuarios';


@Component({
  selector: 'app-encargado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TableModule, InputTextModule, IconFieldModule, InputIconModule, TagModule, LazyLoadImageModule],
  templateUrl: './encargado.component.html',
  styleUrl: './encargado.component.scss'
})
export class EncargadoComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public encargados: IEncargado[] = [];
  public loading: boolean = true;
  public selectedEncargados: IEncargado[] = [];

  constructor(private encargadoService: EncargadoService, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getEncargados();
  }

  // Obtener administradores
  getEncargados(): void {
    this.encargadoService.getEncargado(0).subscribe({
      next: (data) => {
        this.encargados = data;
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
