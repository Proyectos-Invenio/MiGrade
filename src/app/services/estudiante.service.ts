import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environments';
import { IEstudiante } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private baseUrl = environment.baseUrl;
  public identity: any;
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private _http: HttpClient, private _router: Router) {}

  getEstudiante(identification: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this._http.get<IEstudiante>(
      `${this.baseUrl}estudiante/${identification}`,
      { headers }
    );
  }
}
