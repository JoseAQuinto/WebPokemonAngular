import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent {
  currentStep = 0;
  maxSteps = 3;
  answers: { [key: string]: string } = {
    pregunta1: '',
    pregunta2: '',
    pregunta3: ''
  };

  constructor(private router: Router, private testService: TestService) {}

  nextStep() {
    if (!this.isStepAnswered(this.currentStep)) {
      alert('Por favor, selecciona una opción antes de continuar.');
      return;
    }
    if (this.currentStep < this.maxSteps - 1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isStepAnswered(step: number): boolean {
    if (step === 0) {
      return !!this.answers['pregunta1'];
    } else if (step === 1) {
      return !!this.answers['pregunta2'];
    } else if (step === 2) {
      return !!this.answers['pregunta3'];
    }
    return false;
  }

  submitTest() {
    // Guarda las respuestas en el servicio
    this.testService.setAnswers(this.answers);
    // Navega al componente de resultados
    this.router.navigate(['/resultado']);
  }
}
