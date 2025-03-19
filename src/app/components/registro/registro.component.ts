import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule para ngModel
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [CommonModule, FormsModule] // ✅ Agregar CommonModule y FormsModule
})
export class RegistroComponent {
  email: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    this.authService.registrar(this.email, this.password).subscribe(
      response => {
        if (response.success) {
          this.mensaje = 'Usuario registrado. Ahora puedes iniciar sesión.';
          this.router.navigate(['/login']);
        } else {
          this.mensaje = response.error;
        }
      },
      error => {
        this.mensaje = 'Error al registrarse';
      }
    );
  }
}
