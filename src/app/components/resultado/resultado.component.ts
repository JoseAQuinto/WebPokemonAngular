// src/app/resultado/resultado.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
  answers: { [key: string]: string } = {};
  resultado: { pokemon: string; imageUrl: string; descripcion: string } | null = null;

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    // Recupera las respuestas desde el servicio
    this.answers = this.testService.answers;
    if (!this.answers || Object.keys(this.answers).length === 0) {
      // Si no hay respuestas, redirige al test
      this.router.navigate(['/preguntas']);
      return;
    }
    this.calcularResultado();
  }

  calcularResultado(): void {
    // Ejemplo de lógica para determinar el resultado.
    // Puedes personalizar las condiciones según tus criterios.
    if (
      this.answers['pregunta1'] === 'aventura' &&
      this.answers['pregunta2'] === 'valiente' &&
      this.answers['pregunta3'] === 'sol'
    ) {
      this.resultado = {
        pokemon: 'Charizard',
        imageUrl: 'assets/charizard.png', // Asegúrate de tener la imagen en la carpeta assets
        descripcion: 'Eres un aventurero valiente y enérgico, ¡como Charizard!'
      };
    } else if (
      this.answers['pregunta1'] === 'relax' &&
      this.answers['pregunta2'] === 'calmado' &&
      this.answers['pregunta3'] === 'nublado'
    ) {
      this.resultado = {
        pokemon: 'Blastoise',
        imageUrl: 'assets/blastoise.png',
        descripcion: 'Eres calmado y reflexivo, similar a Blastoise.'
      };
    } else {
      // Caso por defecto
      this.resultado = {
        pokemon: 'Pikachu',
        imageUrl: 'assets/pikachu.png',
        descripcion: 'Tienes una personalidad única y adaptable, ¡como Pikachu!'
      };
    }
  }
}
