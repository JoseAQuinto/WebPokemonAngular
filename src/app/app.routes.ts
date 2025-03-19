import { Routes } from '@angular/router';
import { TiendaComponent } from './components/tienda/tienda.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProductoComponent } from './components/producto/producto.component';  // ✅ Agregar esta línea
import { provideRouter, withComponentInputBinding } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: '' }, // Redirigir a la tienda si la ruta no existe
  { path: 'producto/:id', component: ProductoComponent }  // ProductoComponent
];

export default [
  provideRouter(routes, withComponentInputBinding())
];
