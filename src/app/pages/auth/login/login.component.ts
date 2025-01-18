import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

    public LoginForm: FormGroup;
    public errorMessage: string = '';

    constructor(private router: Router, private _formBuilder: FormBuilder, private _authService: AuthService) {
        this.LoginForm = this._formBuilder.group({
          identification: ['', [Validators.required]],
          password: ['', [Validators.required]],
        });
    }

    ngOnInit() {}

    login() {
        if (this.LoginForm.valid) {
            const { identification, password } = this.LoginForm.value;
            this._authService
              .login(identification, password)
              .subscribe((success) => {
                console.log(success);

                if (success) {
                  this.LoginForm.reset();
                  this.router.navigate(['/']); // Redirige a home si el inicio de sesión es exitoso
                } else {
                  this.errorMessage =
                    'Credenciales inválidas. Inténtalo de nuevo.';
                }
              });
        }
    }
}
