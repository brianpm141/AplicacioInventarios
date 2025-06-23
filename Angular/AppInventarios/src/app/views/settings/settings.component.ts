import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportdbComponent } from './exportdb/exportdb.component';
import { ImportdbComponent } from './importdb/importdb.component';
import { BuildingComponent } from '../building/building.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ExportdbComponent, ImportdbComponent, BuildingComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  opcion: string = '';
}
