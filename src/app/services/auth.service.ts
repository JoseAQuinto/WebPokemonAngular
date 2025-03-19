import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioId: number | null = null;
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  registrar(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/registro.php`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login.php`, { email, password });
  }

  guardarSesion(usuarioId: number, token: string) {
    this.usuarioId = usuarioId;
    this.token = token;
    localStorage.setItem('usuarioId', usuarioId.toString());
    localStorage.setItem('token', token);
  }

  obtenerUsuarioId(): number | null {
    if (!this.usuarioId) {
      const id = localStorage.getItem('usuarioId');
      this.usuarioId = id ? parseInt(id, 10) : null;
    }
    return this.usuarioId;
  }

  logout() {
    this.usuarioId = null;
    this.token = null;
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('token');
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('usuarioId'); // Devuelve true si hay usuario logueado
  }
  
}
