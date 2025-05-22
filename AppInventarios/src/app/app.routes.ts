import { Routes } from '@angular/router';
import { BuildingComponent } from './views/building/building.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { HomepageComponent } from './views/homepage/homepage.component';

export const routes: Routes = [
  { path: 'building', component: BuildingComponent },
  { path: '', component: HomepageComponent },
  { path: '**', component: NotfoundComponent }
];
