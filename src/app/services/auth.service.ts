import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Router } from '@angular/router';
import { environment } from '../environments/environments';
import { IUsuarios } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  public identity: any;
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private _http: HttpClient, private _router: Router) {}

  login(identification: string, password: string): Observable<boolean> {
    return this._http
      .post<any>(`${this.baseUrl}auth/login`, { identification, password })
      .pipe(
        map((response: { info: any; token: string }) => {
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('auth_info', JSON.stringify(response.info));
            return true;
          } else {
            return false;
          }
        })
      );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_info');
    this._router.navigate(['/auth']); // Redirige a la página de inicio de sesión
  }

  getUsuarios(id_usurio: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this._http.get<IUsuarios>(`${this.baseUrl}auth/user/${id_usurio}`, {
      headers,
    });
  }

  getUsuarioMenu(id_usuario: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this._http.get<any>(`${this.baseUrl}auth/user/menu/${id_usuario}`, {
      headers,
    });
  }

  crearUsuario(datos: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    let params = JSON.stringify(datos);
    return this._http.post<any>(`${this.baseUrl}auth/user/create`, params, {
      headers,
    });
  }

  getIdentity(): Observable<any> {
    let identity = localStorage.getItem('auth_info');

    if (identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return JSON.parse(this.identity);
  }
}
