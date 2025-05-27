import { Routes } from '@angular/router';
import { BuildingComponent } from './views/building/building.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { RegistroComponent } from './views/usuarios/registro.component'; 

export const routes: Routes = [
  { path: 'building', component: BuildingComponent, title: 'En construcción' },
  { path: 'usuarios', component: UsuariosComponent, title: 'Usuarios' },
  { path: 'usuarios/registro', component: RegistroComponent, title: 'Registro de Usuarios' },
  { path: '', component: HomepageComponent, title: 'Inicio' },
  { path: '**', component: NotfoundComponent, title: 'Error' },
];
