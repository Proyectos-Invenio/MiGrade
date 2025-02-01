import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SeccionService } from '../../../services/secciones.service';
import { ISeccion } from '../../../interfaces/academico';

@Component({
    selector: 'app-seccion',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TableModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        TagModule
    ],
    templateUrl: './seccion.component.html',
    styleUrl: './seccion.component.scss',
})
export class SeccionComponent implements OnInit {
    @ViewChild('dt') dt: Table | undefined;
    public secciones: ISeccion[] = [];
    public loading: boolean = true;
    public selectedSecciones: ISeccion[] = [];

    constructor(
        private seccionService: SeccionService,
        private _cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.getSecciones();
    }

    getSecciones(): void {
        this.seccionService.getSeccion(0).subscribe({
            next: (data) => {
                this.secciones = data.map((seccion: ISeccion) => ({
                    ...seccion,
                    informacion_contacto: seccion.informacion_contacto
                        ? this.formatContactInfo(
                                String(seccion.informacion_contacto)
                            )
                        : '',
                }));
                this.loading = false;
                this._cdr.detectChanges();
            },
            error: (error) => {
                console.error('Error al cargar las secciones:', error);
            },
        });
    }

    formatContactInfo(contactInfo: string): string {
        if (!contactInfo) {
            return '';
        }
        return `+506 ${contactInfo.slice(0, 4)}-${contactInfo.slice(4)}`;
    }

    // Aplicar filtro global
    applyFilterGlobal(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dt?.filterGlobal(filterValue, 'contains');
    }
}
