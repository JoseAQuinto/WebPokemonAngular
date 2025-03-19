import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  // ✅ Para manejar rutas
    provideHttpClient()  // ✅ Nueva forma de manejar HTTP en Angular 19
  ]
};
