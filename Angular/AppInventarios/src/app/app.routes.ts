import { Routes } from '@angular/router';
import { BuildingComponent } from './views/building/building.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { PlantillaFormularioComponent } from './views/plantilla-formulario/plantilla-formulario.component';
import { PlantillaVistaComponent } from './views/plantilla-vista/plantilla-vista.component';
import { DepartmentsComponent } from './views/departments/departments.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { SettingsComponent } from './views/settings/settings.component';
import { HistoryComponent } from './views/history/history.component';

export const routes: Routes = [
  { path: 'building', component: BuildingComponent , title : 'En construccion' },
  { path: 'homepage', component: HomepageComponent , title : 'Inicio' },
  { path: 'plantillaf', component: PlantillaFormularioComponent , title : 'Formulario'},
  { path: 'plantillav', component: PlantillaVistaComponent , title : 'Vista'},
  { path: 'departments', component: DepartmentsComponent , title : 'Departamentos'},
  { path: 'usuarios', component: UsuariosComponent , title : 'Usuarios'},
  { path: 'settings', component: SettingsComponent , title : 'Configuracion'},
  { path: 'history', component: HistoryComponent , title : 'Historial'},
  { path: '', component: HomepageComponent , title : 'Inicio' },
  { path: '**', component: NotfoundComponent, title : 'Error'},
];
