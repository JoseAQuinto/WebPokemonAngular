// src/app/services/test.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  answers: { [key: string]: string } = {};

  setAnswers(answers: { [key: string]: string }): void {
    this.answers = answers;
  }
}
