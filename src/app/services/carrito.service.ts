import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
    constructor(private http: HttpClient, private authService: AuthService) {}

  obtenerCarrito(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/obtener_carrito.php?usuario_id=${usuarioId}`);
  }

  agregarAlCarrito(productoId: number, cantidad: number): Observable<any> {
    const usuarioId = this.authService.obtenerUsuarioId();
    if (!usuarioId) {
      return throwError(() => new Error('Usuario no autenticado')); // Si no hay usuario, lanza un error
    }
  
    const data = { usuario_id: usuarioId, producto_id: productoId, cantidad };
    return this.http.post(`${environment.apiUrl}/agregar_al_carrito.php`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  

  vaciarCarrito(usuarioId: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/vaciar_carrito.php`, JSON.stringify({ usuario_id: usuarioId }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}