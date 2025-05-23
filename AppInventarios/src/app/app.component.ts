import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BuildingComponent } from './views/building/building.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { NotfoundComponent } from './views/notfound/notfound.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, BuildingComponent, NotfoundComponent, UsuariosComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ← aquí estaba el error
})
export class AppComponent {
  title = 'AppInventarios';
}

