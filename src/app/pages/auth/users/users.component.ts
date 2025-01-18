import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IUsuarios } from '../../../interfaces/auth';
import { IconFieldModule, IconField } from 'primeng/iconfield';
import { InputIconModule, InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FormsModule, InputTextModule, InputIconModule, TagModule, IconFieldModule, InputIcon, IconField, TableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, AfterViewInit  {
    @ViewChild('dt') dt: Table | undefined;

    public usuarios: IUsuarios[] = [];
    public crearUsuarioForm: FormGroup;
    public loading: boolean = true;

    constructor(protected _authServices: AuthService, private _formBuilder: FormBuilder) {

        this.crearUsuarioForm = this._formBuilder.group({
            nombre: ['', [Validators.required]],
            usuario: ['', [Validators.required]],
            password: ['', [Validators.required]],
            email: ['', [Validators.required]],
            pais: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        console.log('UsersComponent initialized');
        
    }

    ngAfterViewInit() {
        this.getUsuarios(); // Llama a getUsuarios al inicializar
    }

    getUsuarios() {
        // Llamada al servicio
        this._authServices.getUsuarios(0).subscribe((data: any) => {
            this.usuarios = data;
            this.loading = false;
        });
    }

    crearUsuario() {
        if (this.crearUsuarioForm.valid) {
            this._authServices.crearUsuario(this.crearUsuarioForm.value).subscribe(
                success => {
                    if (success) {
                        this.crearUsuarioForm.reset();
                        this.getUsuarios(); // Actualiza la tabla después de crear un usuario
                    }
                }
            );
        }
    }

    applyFilterGlobal(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dt?.filterGlobal(filterValue, 'contains'); // Incluye ambos argumentos
    }

    getPais(pais: string)  {
        if (pais == 'Costa Rica') return 'danger';
        else if (pais == 'Nicaragua') return 'info'
        else return 'success';
    }
}
