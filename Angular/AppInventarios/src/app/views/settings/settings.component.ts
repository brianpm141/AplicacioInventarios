import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportdbComponent } from './exportdb/exportdb.component';
import { ImportdbComponent } from './importdb/importdb.component';
import { BuildingComponent } from '../building/building.component';
import { ProgrespComponent } from './progresp/progresp.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthService} from '../../services/auth/auth.service'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ExportdbComponent, ImportdbComponent, BuildingComponent, ProgrespComponent, CategoriesComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})

export class SettingsComponent {
  opcion: string = '';

  constructor( private authService: AuthService){}

  logout(){
    this.authService.logout();
  }

}
