import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ProductoComponent {
  producto: any = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.obtenerProducto(id);
  }

  obtenerProducto(id: string | null) {
    if (!id) return;

    this.http.get<any>(`${environment.apiUrl}/obtener_producto.php?id=${id}`)
      .subscribe(
        data => {
          if (data.error) {
            console.error('Error:', data.error);
            this.producto = null;
          } else {
            this.producto = data;
          }
        },
        error => {
          console.error('Error al obtener producto:', error);
          this.producto = null;
        }
      );
  }

  agregarAlCarrito(id: number, nombre: string, precio: number) {
    const data = { id, nombre, precio };

    this.http.post(`${environment.apiUrl}/agregar_al_carrito.php`, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(response => {
      console.log("Producto añadido al carrito:", response);
    }, error => {
      console.error("Error al añadir al carrito:", error);
    });
  }
}
