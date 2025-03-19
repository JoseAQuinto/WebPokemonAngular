import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service'; // Importa el servicio
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tienda',
  standalone: true,
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  imports: [CommonModule, RouterModule]
})
export class TiendaComponent {
  carrito: any[] = [];
  totalCarrito: number = 0;
  productos: any[] = [];
  usuarioId: number = 1; // Temporalmente asignado, cambiar cuando implementemos autenticación

  constructor(private http: HttpClient, private carritoService: CarritoService) {}

  ngOnInit() {
    this.cargarProductos();
    this.cargarCarrito();
  }

  toggleCarrito() {
    const panel = document.getElementById('cartPanel');
    if (panel) {
      panel.classList.toggle('open');
    }
  }

  cargarProductos() {
    this.http.get<any>(`${environment.apiUrl}/obtener_productos.php`)
      .subscribe(
        (data) => {
          if (Array.isArray(data)) {  
            this.productos = data;
          } else {
            console.error("Error: Datos recibidos no son un array:", data);
          }
        },
        (error) => {
          console.error("Error al obtener productos:", error);
        }
      );
  }

  cargarCarrito() {
    this.carritoService.obtenerCarrito(this.usuarioId)
      .subscribe(
        (data) => {
          console.log("Carrito actualizado:", data);
          this.carrito = data.carrito || [];
          this.totalCarrito = data.total || 0;
        },
        (error) => {
          console.error("Error al cargar el carrito:", error);
        }
      );
  }

  agregarAlCarrito(id: number) {
    this.carritoService.agregarAlCarrito(id, 1) // ✅ Solo pasamos 2 parámetros
      .subscribe(response => {
        console.log("Producto añadido al carrito:", response);
        this.cargarCarrito();
      }, error => {
        console.error("Error al añadir al carrito:", error);
      });
  }
  

  vaciarCarrito() {
    this.carritoService.vaciarCarrito(this.usuarioId)
      .subscribe(() => this.cargarCarrito());
  }
}
