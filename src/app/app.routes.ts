import { Routes } from '@angular/router';
import { TiendaComponent } from './components/tienda/tienda.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProductoComponent } from './components/producto/producto.component';  // ✅ Agregar esta línea
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { ResultadoComponent } from './components/resultado/resultado.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'preguntas', component: PreguntasComponent },
  { path: 'resultado', component: ResultadoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'producto/:id', component: ProductoComponent },
  { path: '**', redirectTo: '' } // Ahora siempre es la última
];


export default [
  provideRouter(routes, withComponentInputBinding())
];
