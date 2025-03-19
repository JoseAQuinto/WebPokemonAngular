import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Importar CommonModule para *ngIf
import { RouterModule } from '@angular/router'; // ✅ Importar RouterModule para router-outlet
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule] // ✅ Agregar CommonModule y RouterModule
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/']); // Redirige al inicio tras cerrar sesión
  }
}
