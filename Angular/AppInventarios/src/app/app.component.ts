import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BuildingComponent } from './views/building/building.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { PlantillaFormularioComponent } from './views/plantilla-formulario/plantilla-formulario.component';
import { PlantillaVistaComponent } from './views/plantilla-vista/plantilla-vista.component';
import { DepartmentsComponent } from './views/departments/departments.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    BuildingComponent,
    NotfoundComponent,
    PlantillaFormularioComponent,
    PlantillaVistaComponent,
    DepartmentsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentTitle: string = '';
  sidebarVisible: boolean = true;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.route;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot.data['title'] || route.snapshot.routeConfig?.title || '';
      })
    ).subscribe(title => {
      this.currentTitle = title;
    });
  }

}
