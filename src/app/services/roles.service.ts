import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environments';
import { IRoles } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private baseUrl = environment.baseUrl;
  public identity: any;
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {}

  getRoles(id: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this._http.get<IRoles>(`${this.baseUrl}rol/${id}`, { headers });
  }
}
