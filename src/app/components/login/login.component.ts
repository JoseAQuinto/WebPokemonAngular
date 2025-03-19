import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule para ngModel
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule] // ✅ Agregar CommonModule y FormsModule
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        if (response.success) {
          this.authService.guardarSesion(response.usuario_id, response.token);
          this.router.navigate(['/tienda']); // Redirigir a la tienda tras el login
        } else {
          this.errorMessage = response.error;
        }
      },
      error => {
        this.errorMessage = 'Error al iniciar sesión';
      }
    );
  }
}
