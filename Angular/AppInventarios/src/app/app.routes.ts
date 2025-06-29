import { Routes } from '@angular/router';
import { BuildingComponent } from './views/building/building.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { DepartmentsComponent } from './views/departments/departments.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { SettingsComponent } from './views/settings/settings.component';
import { HistoryComponent } from './views/history/history.component';
import { LogginComponent } from './views/loggin/loggin.component';
import { UnauthorizedComponent } from './views/unauthorized/unauthorized.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: 'building', component: BuildingComponent , title : 'En construccion', canActivate: [authGuard] },
  { path: 'homepage', component: HomepageComponent , title : 'Inicio', canActivate: [authGuard]},
  { path: 'departments', component: DepartmentsComponent , title : 'Departamentos', canActivate: [authGuard, roleGuard([1,2,3])]},
  { path: 'usuarios', component: UsuariosComponent , title : 'Usuarios' , canActivate: [authGuard, roleGuard([1])]},
  { path: 'settings', component: SettingsComponent , title : 'Configuracion' , canActivate: [authGuard] },
  { path: 'history', component: HistoryComponent , title : 'Historial', canActivate: [authGuard, roleGuard([1])]},
  { path: 'login' , component: LogginComponent , title : 'login'},
  { path: 'unauthorized' , component: UnauthorizedComponent, title : 'Advertencia'},
  { path: '', component: HomepageComponent , title : 'Inicio' },
  { path: '**', component: NotfoundComponent, title : 'Error'},
];
