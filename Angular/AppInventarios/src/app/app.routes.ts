import { Routes } from '@angular/router';
import { BuildingComponent } from './views/building/building.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { HomepageComponent } from './views/homepage/homepage.component';

export const routes: Routes = [
  { path: 'building', component: BuildingComponent , title : 'En construccion' },
  { path: 'homepage', component: HomepageComponent , title : 'Inicio' },
  { path: '', component: HomepageComponent , title : 'Inicio' },
  { path: '**', component: NotfoundComponent, title : 'Error'},
];
