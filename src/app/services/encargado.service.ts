import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environments';
import { IEncargado } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root',
})
export class EncargadoService {
  private baseUrl = environment.baseUrl;
  public identity: any;
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {}

  getEncargado(identification: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this._http.get<IEncargado>(`${this.baseUrl}encargado/${identification}`, { headers });
  }
}
